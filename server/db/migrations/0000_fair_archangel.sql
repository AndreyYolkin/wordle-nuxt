CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`word` text NOT NULL,
	`createdAt` integer NOT NULL,
	`expiresAt` integer
);
--> statement-breakpoint
CREATE INDEX `ix_rooms_created_at` ON `rooms` (`createdAt`);--> statement-breakpoint
CREATE TABLE `user_identities` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`provider` text NOT NULL,
	`providerId` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_user_identities_provider` ON `user_identities` (`provider`);--> statement-breakpoint
CREATE INDEX `ix_user_identities_provider_id` ON `user_identities` (`providerId`);--> statement-breakpoint
CREATE INDEX `ix_user_identities_user_provider` ON `user_identities` (`userId`,`provider`);--> statement-breakpoint
CREATE TABLE `user_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`roomId` text NOT NULL,
	`attempts` integer NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_user_rooms_user_id` ON `user_rooms` (`userId`);--> statement-breakpoint
CREATE INDEX `ix_user_rooms_room_id` ON `user_rooms` (`roomId`);--> statement-breakpoint
CREATE INDEX `ix_user_rooms_user_room` ON `user_rooms` (`userId`,`roomId`);--> statement-breakpoint
CREATE UNIQUE INDEX `uq_user_rooms_user_room` ON `user_rooms` (`userId`,`roomId`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`displayName` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ix_users_username` ON `users` (`username`);