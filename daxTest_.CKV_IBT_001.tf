resource "aws_dax_cluster" "dax_cluster" {
  count                            = var.rep_factor > 0 ? 1 : 0
  cluster_name                     = "${var.zone_id}-umf-clustr"
  tags                             = merge(var.tags, local.module_tags)
  iam_role_arn                     = aws_iam_role.assume_dax[0].arn
  node_type                        = var.dax_node_type
  replication_factor               = var.rep_factor
  subnet_group_name                = aws_dax_subnet_group.dax_subnet[0].id
  security_group_ids               = [aws_security_group.dax_security_group[0].id]
  cluster_endpoint_encryption_type = "TLS"
  server_side_encryption {
    enabled = true
  }
}

resource "aws_dax_subnet_group" "dax_subnet" {
  count      = local.create_dax_sg ? 1 : 0
  name       = "dax-subnets"
  subnet_ids = split(",", data.aws_ssm_parameter.private_subnets.value)
}

resource "aws_iam_role" "assume_dax" {
  count              = local.create_dax_sg ? 1 : 0
  name               = "assume_dax_role"
  assume_role_policy = data.aws_iam_policy_document.user-map-dax-assume-role.json
}

resource "aws_iam_role_policy" "dax_role_policy" {
  count  = local.create_dax_sg ? 1 : 0
  name   = "dax_policy"
  role   = aws_iam_role.assume_dax[0].id
  policy = data.aws_iam_policy_document.user-map-dax-access.json
}

resource "aws_security_group" "dax_security_group" {
  count  = local.create_dax_sg ? 1 : 0
  name   = "dax-cluster-security-group"
  vpc_id = data.aws_ssm_parameter.vpc_id.value
}

resource "aws_security_group_rule" "dax_ingress_security_group_rule" {
  count                    = local.create_dax_sg ? 1 : 0
  type                     = "ingress"
  from_port                = 9111
  to_port                  = 9111
  protocol                 = "tcp"
  security_group_id        = aws_security_group.dax_security_group[0].id
  source_security_group_id = var.lambda_security_group
}

resource "aws_security_group_rule" "dax_egress_security_group_rule" {
  count             = local.create_dax_sg ? 1 : 0
  type              = "egress"
  from_port         = 443
  to_port           = 443
  cidr_blocks       = data.aws_vpc_endpoint.dynamo_vpc_endpoint.cidr_blocks
  prefix_list_ids   = [data.aws_vpc_endpoint.dynamo_vpc_endpoint.prefix_list_id]
  protocol          = "tcp"
  security_group_id = aws_security_group.dax_security_group[0].id

}
