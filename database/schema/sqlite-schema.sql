CREATE TABLE IF NOT EXISTS "migrations"(
  "id" integer primary key autoincrement not null,
  "migration" varchar not null,
  "batch" integer not null
);
CREATE TABLE IF NOT EXISTS "password_reset_tokens"(
  "email" varchar not null,
  "token" varchar not null,
  "created_at" datetime,
  primary key("email")
);
CREATE TABLE IF NOT EXISTS "sessions"(
  "id" varchar not null,
  "user_id" integer,
  "ip_address" varchar,
  "user_agent" text,
  "payload" text not null,
  "last_activity" integer not null,
  primary key("id")
);
CREATE INDEX "sessions_user_id_index" on "sessions"("user_id");
CREATE INDEX "sessions_last_activity_index" on "sessions"("last_activity");
CREATE TABLE IF NOT EXISTS "cache"(
  "key" varchar not null,
  "value" text not null,
  "expiration" integer not null,
  primary key("key")
);
CREATE TABLE IF NOT EXISTS "cache_locks"(
  "key" varchar not null,
  "owner" varchar not null,
  "expiration" integer not null,
  primary key("key")
);
CREATE TABLE IF NOT EXISTS "jobs"(
  "id" integer primary key autoincrement not null,
  "queue" varchar not null,
  "payload" text not null,
  "attempts" integer not null,
  "reserved_at" integer,
  "available_at" integer not null,
  "created_at" integer not null
);
CREATE INDEX "jobs_queue_index" on "jobs"("queue");
CREATE TABLE IF NOT EXISTS "job_batches"(
  "id" varchar not null,
  "name" varchar not null,
  "total_jobs" integer not null,
  "pending_jobs" integer not null,
  "failed_jobs" integer not null,
  "failed_job_ids" text not null,
  "options" text,
  "cancelled_at" integer,
  "created_at" integer not null,
  "finished_at" integer,
  primary key("id")
);
CREATE TABLE IF NOT EXISTS "failed_jobs"(
  "id" integer primary key autoincrement not null,
  "uuid" varchar not null,
  "connection" text not null,
  "queue" text not null,
  "payload" text not null,
  "exception" text not null,
  "failed_at" datetime not null default CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "failed_jobs_uuid_unique" on "failed_jobs"("uuid");
CREATE TABLE IF NOT EXISTS "categories"(
  "id" integer primary key autoincrement not null,
  "name" varchar not null,
  "slug" varchar not null,
  "description" text,
  "icon" varchar,
  "gradient_from" varchar,
  "gradient_to" varchar,
  "sort_order" integer not null default '0',
  "is_active" tinyint(1) not null default '1',
  "created_at" datetime,
  "updated_at" datetime,
  "image_url" varchar
);
CREATE UNIQUE INDEX "categories_slug_unique" on "categories"("slug");
CREATE TABLE IF NOT EXISTS "products"(
  "id" integer primary key autoincrement not null,
  "category_id" integer not null,
  "artist_id" integer not null,
  "name" varchar not null,
  "slug" varchar not null,
  "description" text not null,
  "short_description" text,
  "price" numeric not null,
  "original_price" numeric,
  "sku" varchar,
  "stock_quantity" integer not null default '0',
  "manage_stock" tinyint(1) not null default '1',
  "in_stock" tinyint(1) not null default '1',
  "stock_status" varchar check("stock_status" in('in_stock', 'out_of_stock', 'on_backorder')) not null default 'in_stock',
  "colors" text,
  "material" varchar,
  "size" varchar check("size" in('Small', 'Medium', 'Large', 'Extra Large')),
  "dimensions" text,
  "weight" numeric,
  "meta_title" varchar,
  "meta_description" text,
  "tags" text,
  "status" varchar check("status" in('draft', 'active', 'inactive', 'archived')) not null default 'draft',
  "badges" text,
  "is_featured" tinyint(1) not null default '0',
  "is_custom_order" tinyint(1) not null default '0',
  "rating" numeric not null default '0',
  "total_reviews" integer not null default '0',
  "total_sales" integer not null default '0',
  "view_count" integer not null default '0',
  "featured_until" datetime,
  "created_at" datetime,
  "updated_at" datetime,
  "deleted_at" datetime,
  "featured_image" varchar,
  "finish_type" varchar check("finish_type" in('glossy', 'matte', 'clear', 'opaque', 'metallic', 'pearl', 'shimmer')),
  "theme" text,
  "processing_time_days" integer,
  "care_instructions" text,
  "ideal_for" text,
  "inclusions" text,
  "safety_notes" text,
  "page_title" varchar,
  foreign key("category_id") references "categories"("id") on delete cascade,
  foreign key("artist_id") references "artists"("id") on delete cascade
);
CREATE INDEX "products_category_id_status_index" on "products"(
  "category_id",
  "status"
);
CREATE INDEX "products_artist_id_status_index" on "products"(
  "artist_id",
  "status"
);
CREATE INDEX "products_is_featured_status_index" on "products"(
  "is_featured",
  "status"
);
CREATE INDEX "products_rating_index" on "products"("rating");
CREATE INDEX "products_price_index" on "products"("price");
CREATE UNIQUE INDEX "products_slug_unique" on "products"("slug");
CREATE UNIQUE INDEX "products_sku_unique" on "products"("sku");
CREATE TABLE IF NOT EXISTS "product_images"(
  "id" integer primary key autoincrement not null,
  "product_id" integer not null,
  "image_url" varchar not null,
  "alt_text" varchar,
  "sort_order" integer not null default '0',
  "is_primary" tinyint(1) not null default '0',
  "type" varchar check("type" in('main', 'gallery', 'thumbnail')) not null default 'gallery',
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("product_id") references "products"("id") on delete cascade
);
CREATE INDEX "product_images_product_id_sort_order_index" on "product_images"(
  "product_id",
  "sort_order"
);
CREATE TABLE IF NOT EXISTS "orders"(
  "id" integer primary key autoincrement not null,
  "order_number" varchar not null,
  "user_id" integer,
  "customer_email" varchar not null,
  "customer_name" varchar not null,
  "customer_phone" varchar,
  "billing_address" text not null,
  "shipping_address" text not null,
  "subtotal" numeric not null,
  "tax_amount" numeric not null default '0',
  "shipping_amount" numeric not null default '0',
  "discount_amount" numeric not null default '0',
  "total_amount" numeric not null,
  "status" varchar check("status" in('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')) not null default 'pending',
  "payment_status" varchar check("payment_status" in('pending', 'paid', 'failed', 'refunded', 'partial_refund')) not null default 'pending',
  "payment_method" varchar,
  "payment_reference" varchar,
  "tracking_number" varchar,
  "customer_notes" text,
  "admin_notes" text,
  "shipped_at" datetime,
  "delivered_at" datetime,
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("user_id") references "users"("id") on delete set null
);
CREATE INDEX "orders_order_number_index" on "orders"("order_number");
CREATE INDEX "orders_user_id_status_index" on "orders"("user_id", "status");
CREATE INDEX "orders_status_index" on "orders"("status");
CREATE INDEX "orders_payment_status_index" on "orders"("payment_status");
CREATE UNIQUE INDEX "orders_order_number_unique" on "orders"("order_number");
CREATE TABLE IF NOT EXISTS "order_items"(
  "id" integer primary key autoincrement not null,
  "order_id" integer not null,
  "product_id" integer not null,
  "artist_id" integer not null,
  "product_name" varchar not null,
  "product_description" text,
  "product_sku" varchar,
  "product_options" text,
  "quantity" integer not null,
  "unit_price" numeric not null,
  "total_price" numeric not null,
  "customization_details" text,
  "custom_options" text,
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("order_id") references "orders"("id") on delete cascade,
  foreign key("product_id") references "products"("id") on delete cascade,
  foreign key("artist_id") references "artists"("id") on delete cascade
);
CREATE INDEX "order_items_order_id_index" on "order_items"("order_id");
CREATE INDEX "order_items_product_id_index" on "order_items"("product_id");
CREATE INDEX "order_items_artist_id_index" on "order_items"("artist_id");
CREATE TABLE IF NOT EXISTS "product_reviews"(
  "id" integer primary key autoincrement not null,
  "product_id" integer not null,
  "user_id" integer not null,
  "order_id" integer,
  "rating" integer not null,
  "title" varchar,
  "comment" text,
  "images" text,
  "is_verified_purchase" tinyint(1) not null default '0',
  "is_approved" tinyint(1) not null default '1',
  "helpful_count" integer not null default '0',
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("product_id") references "products"("id") on delete cascade,
  foreign key("user_id") references "users"("id") on delete cascade,
  foreign key("order_id") references "orders"("id") on delete set null
);
CREATE INDEX "product_reviews_product_id_is_approved_index" on "product_reviews"(
  "product_id",
  "is_approved"
);
CREATE INDEX "product_reviews_user_id_rating_index" on "product_reviews"(
  "user_id",
  "rating"
);
CREATE UNIQUE INDEX "product_reviews_product_id_user_id_order_id_unique" on "product_reviews"(
  "product_id",
  "user_id",
  "order_id"
);
CREATE TABLE IF NOT EXISTS "cart_items"(
  "id" integer primary key autoincrement not null,
  "user_id" integer,
  "session_id" varchar,
  "product_id" integer not null,
  "quantity" integer not null,
  "product_options" text,
  "customization_details" text,
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("user_id") references "users"("id") on delete cascade,
  foreign key("product_id") references "products"("id") on delete cascade
);
CREATE INDEX "cart_items_user_id_product_id_index" on "cart_items"(
  "user_id",
  "product_id"
);
CREATE INDEX "cart_items_session_id_product_id_index" on "cart_items"(
  "session_id",
  "product_id"
);
CREATE TABLE IF NOT EXISTS "wishlists"(
  "id" integer primary key autoincrement not null,
  "user_id" integer not null,
  "product_id" integer not null,
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("user_id") references "users"("id") on delete cascade,
  foreign key("product_id") references "products"("id") on delete cascade
);
CREATE UNIQUE INDEX "wishlists_user_id_product_id_unique" on "wishlists"(
  "user_id",
  "product_id"
);
CREATE INDEX "wishlists_user_id_index" on "wishlists"("user_id");
CREATE TABLE IF NOT EXISTS "users"(
  "id" integer primary key autoincrement not null,
  "name" varchar not null,
  "email" varchar not null,
  "email_verified_at" datetime,
  "password" varchar not null,
  "remember_token" varchar,
  "created_at" datetime,
  "updated_at" datetime,
  "role" varchar check("role" in('customer', 'artist', 'admin')) not null default 'customer',
  "phone" varchar,
  "address" text
);
CREATE UNIQUE INDEX "users_email_unique" on "users"("email");
CREATE TABLE IF NOT EXISTS "artists"(
  "id" integer primary key autoincrement not null,
  "bio" text,
  "specialization" varchar,
  "cover_image_url" varchar,
  "rating" numeric not null default('0'),
  "total_reviews" integer not null default('0'),
  "total_sales" integer not null default('0'),
  "is_featured" tinyint(1) not null default('0'),
  "is_active" tinyint(1) not null default('1'),
  "social_links" text,
  "created_at" datetime,
  "updated_at" datetime,
  "name" varchar not null,
  "email" varchar not null,
  "phone" varchar not null,
  "username" varchar not null,
  "country" varchar not null,
  "address" text,
  "profile_image" varchar
);
CREATE UNIQUE INDEX "artists_email_unique" on "artists"("email");
CREATE UNIQUE INDEX "artists_username_unique" on "artists"("username");
CREATE TABLE IF NOT EXISTS "tags"(
  "id" integer primary key autoincrement not null,
  "name" varchar not null,
  "slug" varchar not null,
  "color" varchar not null default '#6B7280',
  "description" text,
  "usage_count" integer not null default '0',
  "is_active" tinyint(1) not null default '1',
  "created_at" datetime,
  "updated_at" datetime
);
CREATE INDEX "tags_is_active_usage_count_index" on "tags"(
  "is_active",
  "usage_count"
);
CREATE UNIQUE INDEX "tags_name_unique" on "tags"("name");
CREATE UNIQUE INDEX "tags_slug_unique" on "tags"("slug");
CREATE TABLE IF NOT EXISTS "product_tags"(
  "id" integer primary key autoincrement not null,
  "product_id" integer not null,
  "tag_id" integer not null,
  "created_at" datetime,
  "updated_at" datetime,
  foreign key("product_id") references "products"("id") on delete cascade,
  foreign key("tag_id") references "tags"("id") on delete cascade
);
CREATE UNIQUE INDEX "product_tags_product_id_tag_id_unique" on "product_tags"(
  "product_id",
  "tag_id"
);
CREATE INDEX "product_tags_product_id_index" on "product_tags"("product_id");
CREATE INDEX "product_tags_tag_id_index" on "product_tags"("tag_id");
CREATE INDEX "products_finish_type_index" on "products"("finish_type");
CREATE INDEX "products_processing_time_days_index" on "products"(
  "processing_time_days"
);

INSERT INTO migrations VALUES(1,'0001_01_01_000000_create_users_table',1);
INSERT INTO migrations VALUES(2,'0001_01_01_000001_create_cache_table',1);
INSERT INTO migrations VALUES(3,'0001_01_01_000002_create_jobs_table',1);
INSERT INTO migrations VALUES(4,'2025_12_03_105736_create_categories_table',2);
INSERT INTO migrations VALUES(5,'2025_12_03_105741_create_products_table',2);
INSERT INTO migrations VALUES(6,'2025_12_03_105746_create_product_images_table',2);
INSERT INTO migrations VALUES(7,'2025_12_03_105751_create_artists_table',2);
INSERT INTO migrations VALUES(8,'2025_12_03_105755_create_orders_table',2);
INSERT INTO migrations VALUES(9,'2025_12_03_105800_create_order_items_table',2);
INSERT INTO migrations VALUES(10,'2025_12_03_110029_create_product_reviews_table',2);
INSERT INTO migrations VALUES(11,'2025_12_03_110030_create_cart_items_table',2);
INSERT INTO migrations VALUES(12,'2025_12_03_110030_create_wishlists_table',2);
INSERT INTO migrations VALUES(13,'2025_12_03_110055_add_role_to_users_table',2);
INSERT INTO migrations VALUES(14,'2025_12_03_112004_add_image_url_to_categories_table',3);
INSERT INTO migrations VALUES(15,'2025_12_03_114512_modify_artists_table_for_admin_panel',4);
INSERT INTO migrations VALUES(18,'2025_12_03_114653_add_featured_image_to_products_table',5);
INSERT INTO migrations VALUES(19,'2025_12_03_145318_create_tags_table',6);
INSERT INTO migrations VALUES(20,'2025_12_03_145338_create_product_tags_table',6);
INSERT INTO migrations VALUES(21,'2025_12_04_133000_add_resin_specific_fields_to_products_table',7);
