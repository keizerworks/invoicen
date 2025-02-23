CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_number" text NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text,
	"issued_date" timestamp DEFAULT now() NOT NULL,
	"due_date" timestamp NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"items" jsonb NOT NULL,
	"total_amount" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"notes" text,
	"template_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"template_data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "logo_url" varchar(255);--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;