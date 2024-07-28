CREATE TABLE IF NOT EXISTS "fetches" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text,
	"time" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL
);
