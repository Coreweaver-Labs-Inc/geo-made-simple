CREATE TABLE `gateway_audit_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provider` enum('hostinger','vapi') NOT NULL,
	`eventKey` varchar(255) NOT NULL,
	`eventType` varchar(120) NOT NULL,
	`mailbox` enum('ops','dev','hr') NOT NULL,
	`senderReference` varchar(320),
	`contentDigest` varchar(128),
	`route` enum('ops','dev','hr','manual_review','human_escalation','ignored') NOT NULL,
	`validationStatus` enum('accepted','rejected','duplicate','manual_review','failed') NOT NULL,
	`actionStatus` enum('none','draft_task_created','human_review_required','ignored','failed') NOT NULL,
	`manusTaskId` varchar(128),
	`manusTaskUrl` varchar(320),
	`errorCode` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gateway_audit_records_id` PRIMARY KEY(`id`),
	CONSTRAINT `gateway_audit_records_provider_event_key_unique` UNIQUE(`provider`,`eventKey`)
);
