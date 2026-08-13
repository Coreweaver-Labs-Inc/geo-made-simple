CREATE TABLE `case_study_intakes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientLabel` varchar(160) NOT NULL,
	`sourceReference` text NOT NULL,
	`supportableFinding` text NOT NULL,
	`scope` text NOT NULL,
	`reportingStart` varchar(10) NOT NULL,
	`reportingEnd` varchar(10) NOT NULL,
	`reviewDate` varchar(10) NOT NULL,
	`publicationAuthorization` text NOT NULL,
	`replyEmail` varchar(320),
	`authorizationConfirmed` boolean NOT NULL DEFAULT false,
	`status` enum('received','under_review','approved','declined') NOT NULL DEFAULT 'received',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `case_study_intakes_id` PRIMARY KEY(`id`)
);
