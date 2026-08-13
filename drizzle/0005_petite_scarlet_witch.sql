ALTER TABLE `case_study_intakes` ADD `sourceOwnerApprovedBy` varchar(220);--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `swellReviewer` varchar(220);--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `privacyReviewedBy` varchar(220);--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `plannedPublicationDate` varchar(10);--> statement-breakpoint
ALTER TABLE `case_study_intakes` ADD `handoffStatus` enum('pending','returned','ready') DEFAULT 'pending' NOT NULL;