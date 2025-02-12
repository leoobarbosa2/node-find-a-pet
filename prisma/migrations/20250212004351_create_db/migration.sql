-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('PUPPY', 'YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "LevelsOfEnergy" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "DependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('INDOOR', 'OUTDOOR', 'BOTH');

-- CreateTable
CREATE TABLE "ongs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "ongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "PetAge" NOT NULL,
    "breed" TEXT NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy_level" "LevelsOfEnergy" NOT NULL,
    "dependency_level" "DependencyLevel" NOT NULL,
    "environment" "PetEnvironment" NOT NULL,
    "pictures" BYTEA[],
    "adoption_requirements" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adopted_at" TIMESTAMP(3),
    "ong_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ongs_email_key" ON "ongs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ongs_zip_code_key" ON "ongs"("zip_code");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
