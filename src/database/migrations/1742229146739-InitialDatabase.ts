import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1742229146739 implements MigrationInterface {
    name = 'InitialDatabase1742229146739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_Ingredients" ("Ing_id" SERIAL NOT NULL, "Ing_name" character varying NOT NULL, "Ing_brand" character varying, "Ing_keywords" text array, "Ing_quantity" integer, "Ing_quantity_units" text, "Ing_barcode" character varying, CONSTRAINT "PK_1f49c898c974d5921b81620d75e" PRIMARY KEY ("Ing_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_UserIngredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitQuantity" integer NOT NULL DEFAULT '1', "totalAmount" numeric(10,2), "unitType" character varying(50), "expiry_date" TIMESTAMP, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying(50), "ingredient_id" integer, CONSTRAINT "UQ_e90aeaceb1cc1da7a0272518563" UNIQUE ("user_id", "ingredient_id"), CONSTRAINT "CHK_1ef44a66f44b5da9be3ea4f1f5" CHECK ("totalAmount" >= 0), CONSTRAINT "CHK_90181a01be4fc97d6cff89afbe" CHECK ("unitQuantity" >= 0), CONSTRAINT "PK_8f14ecc19afa39d131111d42623" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_Recipes" ("recipe_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipe_name" character varying NOT NULL, "recipe_description" text NOT NULL, "recipe_instructions" text, "ingredients" jsonb NOT NULL, "cooking_time" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" character varying(50), CONSTRAINT "PK_29afdd0fb364f2c1ae227bc926d" PRIMARY KEY ("recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_Users" ("user_id" character varying(50) NOT NULL, "user_name" character varying NOT NULL, "user_email" character varying NOT NULL, "user_password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_61649f6f26a1931a0f42bf97fc7" UNIQUE ("user_email"), CONSTRAINT "PK_a438491ef70f45efb5d2c31859a" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" ADD CONSTRAINT "FK_48a1d7528b5ba394959cd9bbf7f" FOREIGN KEY ("user_id") REFERENCES "tbl_Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" ADD CONSTRAINT "FK_0aa7584512ba0d1680850db1c90" FOREIGN KEY ("ingredient_id") REFERENCES "tbl_Ingredients"("Ing_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_Recipes" ADD CONSTRAINT "FK_0bcae093401e7a1ebda95ce6272" FOREIGN KEY ("author_id") REFERENCES "tbl_Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_Recipes" DROP CONSTRAINT "FK_0bcae093401e7a1ebda95ce6272"`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" DROP CONSTRAINT "FK_0aa7584512ba0d1680850db1c90"`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" DROP CONSTRAINT "FK_48a1d7528b5ba394959cd9bbf7f"`);
        await queryRunner.query(`DROP TABLE "tbl_Users"`);
        await queryRunner.query(`DROP TABLE "tbl_Recipes"`);
        await queryRunner.query(`DROP TABLE "tbl_UserIngredients"`);
        await queryRunner.query(`DROP TABLE "tbl_Ingredients"`);
    }

}
