CREATE TABLE `gtm_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`website` varchar(320),
	`segment` varchar(120),
	`status` enum('prospect','client','inactive') NOT NULL DEFAULT 'prospect',
	`ownerName` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gtm_contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountId` int,
	`fullName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`roleTitle` varchar(160),
	`status` enum('active','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gtm_opportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountId` int NOT NULL,
	`contactId` int,
	`serviceLine` enum('signal_intelligence_audit','gtm_enablement_sprint','representation_operations','custom') NOT NULL,
	`title` varchar(220) NOT NULL,
	`stage` enum('inquiry','qualified','discovery','proposal','won','lost') NOT NULL DEFAULT 'inquiry',
	`ownerName` varchar(160),
	`nextStep` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_opportunities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gtm_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestType` enum('service_inquiry','support_request') NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organization` varchar(160),
	`website` varchar(320),
	`serviceInterest` varchar(100),
	`subject` varchar(220),
	`message` text NOT NULL,
	`urgency` enum('standard','high') NOT NULL DEFAULT 'standard',
	`status` enum('new','triaged','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gtm_support_cases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountId` int,
	`contactId` int,
	`subject` varchar(220) NOT NULL,
	`detail` text NOT NULL,
	`priority` enum('standard','high','urgent') NOT NULL DEFAULT 'standard',
	`status` enum('new','open','waiting','resolved','closed') NOT NULL DEFAULT 'new',
	`ownerName` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_support_cases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gtm_work_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountId` int,
	`opportunityId` int,
	`supportCaseId` int,
	`title` varchar(220) NOT NULL,
	`detail` text,
	`functionalArea` enum('sales','support','operations','marketing','research','design') NOT NULL,
	`status` enum('planned','in_progress','blocked','review','done') NOT NULL DEFAULT 'planned',
	`ownerName` varchar(160),
	`dueDate` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gtm_work_items_id` PRIMARY KEY(`id`)
);
