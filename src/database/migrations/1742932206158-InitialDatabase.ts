import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1742932206158 implements MigrationInterface {
    name = 'InitialDatabase1742932206158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("Ing_id" SERIAL NOT NULL, "Ing_name" character varying NOT NULL, "Ing_brand" character varying, "Ing_keywords" text array, "Ing_quantity" integer, "Ing_quantity_units" text, "Ing_barcode" character varying, CONSTRAINT "PK_493045d50280bee2349f314027e" PRIMARY KEY ("Ing_id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL, "username" character varying, "full_name" character varying, "avatar_url" character varying, "website" character varying, "updated_at" TIMESTAMP, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitQuantity" integer NOT NULL DEFAULT '1', "totalAmount" numeric(10,2), "unitType" character varying(50), "expiry_date" TIMESTAMP, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "ingredient_id" integer, CONSTRAINT "UQ_9d6f21472f5897e7964af9fbf77" UNIQUE ("user_id", "ingredient_id"), CONSTRAINT "CHK_e71658c5aa6bf39669ff28a353" CHECK ("totalAmount" >= 0), CONSTRAINT "CHK_56cfc10f849156ea6d2bf4e9ba" CHECK ("unitQuantity" >= 0), CONSTRAINT "PK_771b252ad11843b0e61d77d9525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3fdb879fb0a22acc11945777b7a" UNIQUE ("name"), CONSTRAINT "PK_105c42fcf447c1da21fd20bcb85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("recipe_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipe_name" character varying NOT NULL, "recipe_description" text NOT NULL, "recipe_instructions" text, "ingredients" jsonb NOT NULL, "cooking_time" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" uuid, CONSTRAINT "PK_df6485530f24cbcbc4c57171067" PRIMARY KEY ("recipe_id"))`);
        await queryRunner.query(`ALTER TABLE "user_ingredients" ADD CONSTRAINT "FK_edfc48c99960b6534282fdaa58d" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ingredients" ADD CONSTRAINT "FK_ae72af3782e1aa371093767226a" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("Ing_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_266ecb7f0041e1327919f36f964" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_266ecb7f0041e1327919f36f964"`);
        await queryRunner.query(`ALTER TABLE "user_ingredients" DROP CONSTRAINT "FK_ae72af3782e1aa371093767226a"`);
        await queryRunner.query(`ALTER TABLE "user_ingredients" DROP CONSTRAINT "FK_edfc48c99960b6534282fdaa58d"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "unit_types"`);
        await queryRunner.query(`DROP TABLE "user_ingredients"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
