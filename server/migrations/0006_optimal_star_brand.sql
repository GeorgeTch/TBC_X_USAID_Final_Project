ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_productVariantID_productVariants_id_fk";
--> statement-breakpoint
ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_productID_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productVariantID_productVariants_id_fk" FOREIGN KEY ("productVariantID") REFERENCES "public"."productVariants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;