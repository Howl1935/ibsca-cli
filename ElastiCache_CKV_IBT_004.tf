resource "aws_elasticache_subnet_group" "svc_redis_subnet_group" {
  name = "${var.replication_group_name}-sgl"

  subnet_ids = var.redis_subnet_id_list
}

resource "aws_elasticache_replication_group" "svc_redis_replication_group" {
  replication_group_id          = var.replication_group_name
  replication_group_description = var.replication_group_description
  engine                        = "redis"
  engine_version                = var.engine_version
  node_type                     = var.cache_node_type
  port                          = var.redis_port
  parameter_group_name          = var.parameter_group_name
  subnet_group_name             = aws_elasticache_subnet_group.svc_redis_subnet_group.name
  maintenance_window            = var.maintenance_window
  automatic_failover_enabled    = var.auto_failover
  apply_immediately             = var.apply_immediately

  cluster_mode {
    replicas_per_node_group = var.additional_replicas
    num_node_groups         = var.cluster_shards
  }

  security_group_ids = var.security_group_id_list

  tags = var.tags
}

# Required Parameters
variable "replication_group_name" {
  type = string
}

# NOTE: Subnets must exist in same VPC as `security_group_access_list`
variable "redis_subnet_id_list" {
  type = list(string)
}

# NOTE: Sec Groups must be in the same VPC as subnets in the `redis_subnet_id_list`
variable "security_group_id_list" {
  type = list(string)
}

variable "tags" {
  type = map(string)
}

variable "cache_node_type" {
  type = string
}

variable "additional_replicas" {
  type = number
}

variable "cluster_shards" {
  type = number
}

# Optional Parameters
variable "auto_failover" {
  type    = bool
  default = true
}

variable "maintenance_window" {
  type    = string
  default = "fri:10:00-fri:11:00"
}

variable "parameter_group_name" {
  type    = string
  default = "default.redis3.2.cluster.on"
}

variable "replication_group_description" {
  type    = string
  default = "Terraform Managed Redis Cluster Replication Group"
}

variable "redis_port" {
  type    = number
  default = 6379
}

variable "apply_immediately" {
  type    = string
  default = "false"
}

variable "engine_version" {
  type    = string
  default = "3.2.10"
}