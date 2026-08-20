CREATE TABLE `market_research_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`lane` enum('market_conditions','buyer_and_category','channel_and_platform','competitive_context','authority_and_content') NOT NULL,
	`sourceReference` varchar(500) NOT NULL,
	`sourceScope` text NOT NULL,
	`observation` text NOT NULL,
	`limitation` text NOT NULL,
	`interpretation` text NOT NULL,
	`decision` enum('hold','investigate','content_brief','improve_public_explanation','defer') NOT NULL DEFAULT 'hold',
	`ownerName` varchar(160) NOT NULL,
	`reviewTrigger` varchar(320) NOT NULL,
	`status` enum('draft','reviewed','archived') NOT NULL DEFAULT 'draft',
	`reviewerName` varchar(220),
	`reviewConfirmed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `market_research_records_id` PRIMARY KEY(`id`)
);
