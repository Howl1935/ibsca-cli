module "campaign-lifecycle-event-observer-service-role" {
  source = "git::ssh://git@github.com/Ibotta/terraform-modules.git//service/ibotta-service-role?ref=ibotta-service-role-0.1.1"

  service_name     = "campaign-lifecycle-event-observer-service"
  ibotta_eng_group = var.tags["group"]
}

module "campaign-lifecycle-event-observer-admin-role" {
  source           = "git::ssh://git@github.com/Ibotta/terraform-modules.git//service/ibotta-service-admin-role?ref=ibotta-service-admin-role-0.1.0"
  ibotta_eng_group = var.tags["group"]
  service_name     = "campaign-lifecycle-event-observer-admin-role"
}

# KMS Key for encryption
module "campaign-lifecycle-event-observer-kms-key" {
  source           = "git::ssh://git@github.com/Ibotta/terraform-modules.git//service/kms?ref=kms-0.4.0"
  key_name         = var.tags["service"]
  ibotta_eng_group = var.tags["group"]
  tags             = var.tags
}

# SQS
# Additional configuration:
# https://github.com/Ibotta/terraform-modules/blob/master/service/sqs/README.md

module "campaign-lifecycle-event-observer-sqs" {
  source           = "git::ssh://git@github.com/Ibotta/terraform-modules.git//service/sqs?ref=sqs-0.2.1"
  service_name     = "campaign-lifecycle"
  queue_name       = "event-observer"
  fifo_queue       = "false"
  ibotta_eng_group = var.tags["group"]
  tags             = var.tags

  # optional parameters
  redrive_max_receive_count = var.sqs_max_receive_count

  # optional parameters
  # https://github.com/Ibotta/terraform-modules/blob/sqs-stable/service/sqs/README.md
}

resource "aws_sqs_queue_policy" "campaign-lifecycle-event-observer-sqs-policy" {
  queue_url = module.campaign-lifecycle-event-observer-sqs.sqs_queue_id
  policy    = data.aws_iam_policy_document.allow_sns_publish_to_sqs_policy.json
}

###
# SQS/SNS subscriptions
###
resource "aws_sns_topic_subscription" "subscribe_campaign_created_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-created-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

resource "aws_sns_topic_subscription" "subscribe_campaign_updated_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-updated-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

resource "aws_sns_topic_subscription" "subscribe_campaign_budget_settings_changed_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-budget-settings-changed-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

resource "aws_sns_topic_subscription" "subscribe_campaign_billing_created_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-billing-created-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

resource "aws_sns_topic_subscription" "subscribe_campaign_billing_updated_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-billing-updated-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

resource "aws_sns_topic_subscription" "subscribe_campaign_billing_budget_settings_changed_sns_sqs" {
  topic_arn = var.campaign-lifecycle-campaign-billing-budget-settings-changed-event-topic-arn
  protocol  = "sqs"
  endpoint  = module.campaign-lifecycle-event-observer-sqs.sqs_queue_arn

  depends_on = [
    "aws_sqs_queue_policy.campaign-lifecycle-event-observer-sqs-policy",
    "module.campaign-lifecycle-event-observer-sqs",
  ]
}

###
# cloudwatch resources
###
resource "aws_cloudwatch_log_stream" "campaign-lifecycle-event-kinesis-log-stream" {
  name           = var.campaign-lifecycle-kinesis-firehose-log-stream
  log_group_name = var.campaign-lifecycle-kinesis-firehose-log-group
}

###
# kinesis stream resources
###
resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-created-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-created-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}

resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-updated-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-updated-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}

resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-budget-settings-changed-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-budget-settings-changed-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}

resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-billing-created-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-billing-created-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}

resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-billing-updated-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-billing-updated-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}

resource "aws_kinesis_stream" "campaign-lifecycle-event-observer-campaign-billing-budget-settings-changed-stream" {
  name             = "campaign-lifecycle-event-observer-campaign-billing-budget-settings-changed-kinesis-stream"
  shard_count      = var.stream_shard_count
  retention_period = var.stream_retention_period

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = var.tags
}


###
# firehose resources
###
resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-campaign-created-firehose" {
  name        = "campaign-lifecycle-event-observer-cmpgn-created-kinesis-firehose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-created-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_created_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}

resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-campaign-updated-firehose" {
  name        = "campaign-lifecycle-event-observer-cmpgn-updtd-kinesis-firehose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-updated-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_updated_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}

resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-cmpn-bdgt-stngs-chngd-firehose" {
  name        = "cmpgn-lfecycle-evnt-obsrvr-cmpgn-bdgt-stngs-chngd-knesis-frhose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-budget-settings-changed-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_budget_settings_changed_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}

resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-cb-created-firehose" {
  name        = "campaign-lifecycle-evnt-obsrvr-cmpgn-bllng-crted-knesis-firehose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-billing-created-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_billing_created_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}

resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-cb-updated-firehose" {
  name        = "campaign-lifecycle-event-obsrvr-cmpgn-blng-updted-knesis-frehose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-billing-updated-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_billing_updated_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}

resource "aws_kinesis_firehose_delivery_stream" "campaign-lifecycle-event-observer-cb-bdgt-sttngs-chngd-firehose" {
  name        = "campaign-lifecycle-event-observer-cb-bdgt-sttngs-chngd-firehose"
  destination = "extended_s3"

  kinesis_source_configuration {
    kinesis_stream_arn = aws_kinesis_stream.campaign-lifecycle-event-observer-campaign-billing-budget-settings-changed-stream.arn
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
  }

  extended_s3_configuration {
    role_arn           = aws_iam_role.campaign-lifecycle-event-observer-firehose-role.arn
    bucket_arn         = var.firehose_output_s3_bucket_arn
    prefix             = var.firehose_output_s3_campaign_billing_budget_settings_changed_prefix
    buffer_size        = var.firehose_buffer_size
    buffer_interval    = var.firehose_buffer_interval
    compression_format = var.firehose_compression_format

    cloudwatch_logging_options {
      enabled         = true
      log_stream_name = var.campaign-lifecycle-kinesis-firehose-log-stream
      log_group_name  = var.campaign-lifecycle-kinesis-firehose-log-group
    }
  }
}


variable "stream_shard_count" {
  type    = string
  default = "1"
}

variable "stream_retention_period" {
  type    = string
  default = "24"
}