resource "aws_secretsmanager_secret" "master_password" {
  name                    = "secrets/partner-ledger/partner-ledger-db-secrets"
  recovery_window_in_days = 0
  policy                  = data.aws_iam_policy_document.secretsmanager.json
  tags                    = local.resolved_tags
}

resource "aws_secretsmanager_secret_version" "master_password" {
  secret_id     = aws_secretsmanager_secret.master_password.id
  secret_string = jsonencode(local.master_password_secret_shape)
}

resource "aws_db_subnet_group" "partner_ledger_db_subgroup" {
  name       = "partner-ledger-subnet-group"
  subnet_ids = split(",", data.aws_ssm_parameter.private_subnets.value)
  tags       = local.resolved_tags
}

resource "aws_security_group" "partner_ledger_db_security_group" {
  name        = "partner-ledger-db-sg"
  description = "security group for partner ledger db"
  vpc_id      = data.aws_ssm_parameter.vpc_id.value
  tags        = local.resolved_tags

  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"
    self      = true

    prefix_list_ids = [
      data.aws_ssm_parameter.vpn_prefix_list.value,
    ]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
}

resource "aws_rds_cluster" "partner_ledger_aurora_db" {
  tags = local.resolved_tags

  cluster_identifier           = "${local.zone_framework_prefix}-partner-ledger-aurora"
  database_name                = "partner_ledger"
  master_username              = "ibotta"
  master_password              = local.master_password
  engine                       = "aurora-mysql"
  engine_version               = "5.7.mysql_aurora.2.10.0"
  allow_major_version_upgrade  = true
  preferred_backup_window      = "02:00-04:00"
  preferred_maintenance_window = "sun:05:25-sun:05:55"
  db_cluster_instance_class    = "db.r6g.large"

  apply_immediately                   = true
  storage_encrypted                   = true
  storage_type                        = "io1"
  allocated_storage                   = 100
  iops                                = 1000
  db_subnet_group_name                = aws_db_subnet_group.partner_ledger_db_subgroup.name
  final_snapshot_identifier           = "${local.zone_framework_prefix}-partner-ledger-deleted"
  skip_final_snapshot                 = true
  iam_database_authentication_enabled = true

  backtrack_window        = 259200
  backup_retention_period = 7


  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.partner_ledger_parameter_group.name

  vpc_security_group_ids = [
    aws_security_group.partner_ledger_db_security_group.id,
  ]

  lifecycle {
    ignore_changes = [
      # engine_version,
      db_cluster_parameter_group_name,
    ]
  }
}

resource "aws_rds_cluster_instance" "instance" {
  count                      = 1
  identifier                 = "${local.zone_framework_prefix}-partner-ledger-${count.index}"
  cluster_identifier         = aws_rds_cluster.partner_ledger_aurora_db.id
  instance_class             = "db.r5.large"
  auto_minor_version_upgrade = true
  # publicly_accessible        = true
  engine                  = aws_rds_cluster.partner_ledger_aurora_db.engine
  engine_version          = aws_rds_cluster.partner_ledger_aurora_db.engine_version
  db_subnet_group_name    = aws_db_subnet_group.partner_ledger_db_subgroup.id
  db_parameter_group_name = aws_db_parameter_group.partner_ledger_instance_parameter_group.name
  ca_cert_identifier      = "rds-ca-2019"
  tags                    = local.resolved_tags
}

resource "aws_rds_cluster_parameter_group" "partner_ledger_parameter_group" {
  name   = "partner-ledger-cluster-parameter-group"
  family = "aurora-mysql5.7"
  tags   = local.resolved_tags

  parameter {
    name  = "tx_isolation"
    value = "SERIALIZABLE"
  }

  parameter {
    name  = "aurora_select_into_s3_role"
    value = var.invoice_generator_role_arn
  }

  parameter {
    name  = "require_secure_transport"
    value = "ON"
  }

  parameter {
    name  = "max_execution_time"
    value = 600000
  }
}

resource "aws_db_parameter_group" "partner_ledger_instance_parameter_group" {
  name   = "partner-ledger-instance-parameter-group"
  family = "aurora-mysql5.7"
  tags   = local.resolved_tags

  parameter {
    name  = "max_execution_time"
    value = 600000
  }
}

resource "aws_rds_cluster_role_association" "partner_ledger_aurora_s3_role_association" {
  db_cluster_identifier = aws_rds_cluster.partner_ledger_aurora_db.id
  feature_name          = ""
  role_arn              = var.invoice_generator_role_arn
}

resource "aws_appautoscaling_target" "replicas" {
  service_namespace  = "rds"
  scalable_dimension = "rds:cluster:ReadReplicaCount"
  resource_id        = "cluster:${aws_rds_cluster.partner_ledger_aurora_db.id}"
  min_capacity       = 1
  max_capacity       = 15
}

resource "aws_appautoscaling_policy" "replicas" {
  name               = "cpu-auto-scaling"
  service_namespace  = aws_appautoscaling_target.replicas.service_namespace
  scalable_dimension = aws_appautoscaling_target.replicas.scalable_dimension
  resource_id        = aws_appautoscaling_target.replicas.resource_id
  policy_type        = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "RDSReaderAverageCPUUtilization"
    }

    target_value       = 75
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}