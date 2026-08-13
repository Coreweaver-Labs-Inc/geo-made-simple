ALTER TABLE `case_studies` ADD `sourceName` varchar(220) NOT NULL;--> statement-breakpoint
ALTER TABLE `case_studies` ADD `metricDefinition` text;--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `sourceName` varchar(220) NOT NULL;--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `metricDefinition` text;--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `sourceOwnerApproval` text NOT NULL;--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `privacyReviewConfirmed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `claimReviewConfirmed` boolean DEFAULT false NOT NULL;