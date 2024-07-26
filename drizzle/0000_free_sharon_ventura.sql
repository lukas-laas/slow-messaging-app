CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid DEFAULT gen_random_uuid(),
	"message" text,
	"time" timestamp DEFAULT now(),
	"userId" uuid
);
