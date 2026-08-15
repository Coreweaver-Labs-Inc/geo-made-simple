CREATE TABLE `content_brief_queues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`isEnabled` boolean NOT NULL DEFAULT false,
	`cronExpression` varchar(64) NOT NULL,
	`scheduleCronTaskUid` varchar(65),
	`model` varchar(80) NOT NULL DEFAULT 'gpt-5-mini',
	`lastRunAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_brief_queues_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_brief_queues_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `content_brief_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`queueId` int NOT NULL,
	`signalId` int NOT NULL,
	`draftInsightId` int,
	`model` varchar(80) NOT NULL,
	`status` enum('draft_created','reviewed','rejected','failed') NOT NULL,
	`errorCode` varchar(180),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_brief_records_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_brief_records_signal_id_unique` UNIQUE(`signalId`)
);
--> statement-breakpoint
CREATE TABLE `content_trend_signals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fingerprint` varchar(128) NOT NULL,
	`sourceType` enum('manual_trend_snapshot','search_console','analytics','research') NOT NULL,
	`sourceReference` varchar(320) NOT NULL,
	`silo` enum('website_clarity','buyer_enablement','paid_message_learning','ai_representation','content_governance') NOT NULL,
	`buyerQuestion` varchar(500) NOT NULL,
	`summary` text NOT NULL,
	`sourceWindow` varchar(120) NOT NULL,
	`status` enum('pending','approved','queued','rejected') NOT NULL DEFAULT 'pending',
	`approvedBy` varchar(220),
	`approvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_trend_signals_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_trend_signals_fingerprint_unique` UNIQUE(`fingerprint`)
);
