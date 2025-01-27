CREATE TYPE "public"."email_recipient_type" AS ENUM('primary', 'cc', 'bcc');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('draft', 'finalized', 'archived');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" varchar(34) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"name" varchar NOT NULL,
	"logo" varchar NOT NULL,
	"billingAddress" text
);
--> statement-breakpoint
CREATE TABLE "email_recipients" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoiceEmailId" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"type" "email_recipient_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"title" varchar(255) NOT NULL,
	"subject" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_template" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"name" varchar(255) NOT NULL,
	"thumbnail" text,
	"description" text,
	"structure" jsonb NOT NULL,
	CONSTRAINT "invoice_template_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "invoice_items" (
	"id" varchar(34) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"invoiceId" varchar NOT NULL,
	"description" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"pricePerUnit" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar(34) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"file" varchar NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"templateId" integer NOT NULL,
	"clientId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(34) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "email_recipients" ADD CONSTRAINT "email_recipients_invoiceEmailId_invoice_emails_id_fk" FOREIGN KEY ("invoiceEmailId") REFERENCES "public"."invoice_emails"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_invoices_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_templateId_invoice_template_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."invoice_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;