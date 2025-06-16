-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "push_token" TEXT,
    "profile_photo" VARCHAR(200),
    "timezone" VARCHAR(20),

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_password_resets" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "reset_code" VARCHAR(200) NOT NULL,
    "reset_token" VARCHAR(200),

    CONSTRAINT "admin_password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "care_home_id" INTEGER,
    "city_id" INTEGER,
    "short_order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verifications" (
    "id" SERIAL NOT NULL,
    "otp" INTEGER NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(200),

    CONSTRAINT "otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(200) NOT NULL,
    "desc" TEXT,
    "city" VARCHAR(200),
    "image" VARCHAR(200),
    "sort_order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "alternative_phone" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "city" VARCHAR(200),
    "postal_cdoe" VARCHAR(200),
    "country" VARCHAR(200),
    "is_billing_address" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "partner_id" INTEGER,
    "care_home_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "otp" VARCHAR(10) NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" VARCHAR(200),
    "description" TEXT,
    "content" TEXT,
    "sku" VARCHAR(200),
    "price" DOUBLE PRECISION,
    "discount_id" INTEGER,
    "cost_pert_item" DOUBLE PRECISION,
    "barcode" VARCHAR(200),
    "stock_status" VARCHAR(200),
    "stock_quantity" INTEGER,
    "weight" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "wide" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "status" VARCHAR(200),
    "store_id" INTEGER,
    "is_featured" BOOLEAN,
    "category_id" INTEGER,
    "brand_id" INTEGER,
    "featured_image" TEXT,
    "collection_tag" VARCHAR(200),
    "label" VARCHAR(200),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(200),
    "password" TEXT NOT NULL,
    "status" VARCHAR(200),
    "profile_image" TEXT,
    "private_notes" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "description" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(200),
    "password" TEXT,

    CONSTRAINT "test_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" TEXT,
    "description" VARCHAR(200),
    "content" VARCHAR(200),
    "status" VARCHAR(200),
    "templete" VARCHAR(200),
    "image" VARCHAR(200),

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER,
    "question" TEXT,
    "answer" TEXT,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author_name" TEXT,
    "category" VARCHAR(200),
    "short_desc" VARCHAR(200),
    "description" VARCHAR(200),
    "content" VARCHAR(200),
    "author_image" VARCHAR(200),
    "blog_image" VARCHAR(200),

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_password_resets_email_key" ON "admin_password_resets"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otp_verifications_email_key" ON "otp_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_email_key" ON "reset_password"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
