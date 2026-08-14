ALTER TABLE `insights` ADD `contentType` enum('article','research_brief','field_brief') DEFAULT 'article' NOT NULL;--> statement-breakpoint
ALTER TABLE `insights` ADD `sourceReferences` text;--> statement-breakpoint
ALTER TABLE `insights` ADD `methodNote` text;--> statement-breakpoint
ALTER TABLE `insights` ADD `claimReviewer` varchar(220);--> statement-breakpoint
ALTER TABLE `insights` ADD `claimReviewConfirmed` boolean DEFAULT false NOT NULL;