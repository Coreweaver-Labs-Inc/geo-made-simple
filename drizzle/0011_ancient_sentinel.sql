CREATE TABLE `gateway_role_projects` (
	`role` enum('ops','dev','hr') NOT NULL,
	`projectId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gateway_role_projects_role` PRIMARY KEY(`role`)
);
