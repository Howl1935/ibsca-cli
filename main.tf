# # Snippet from  main.tf
# resource "aws_s3_bucket" "credit_cards_bucket" {
#   region        = var.region
#   bucket        = local.bucket_name
#   acl           = "public-read"
#   force_destroy = true

#   tags = {
#     Scope = "PCI",

#   }
# }
# #testing CKV_IBT_002
# resource "aws_elasticache_cluster" "example" {
#   cluster_id           = "cluster-example"
#   engine               = "memcached"
#   node_type            = "cache.t2.medium"
#   num_cache_nodes      = 2
#   parameter_group_name = "default.memcached1.4"
#   port                 = 11211
# }

//testing CKV_IBT_003
resource "aws_elasticache_cluster" "example2" {
  cluster_id           = "cluster-example2"
  engine               = "redis"
  node_type            = "cache.m4.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "1.0"
  port                 = 6379
}

resource "aws_instance" "foo" {
  ami           = "ami-0ff8a91507f77f867"
  instance_type = "t1.2xlarge" # invalid type!
}