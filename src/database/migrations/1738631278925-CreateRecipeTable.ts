import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeTable1738631278925 implements MigrationInterface {
    name = 'CreateRecipeTable1738631278925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_Recipes" ("recipe_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipe_name" character varying NOT NULL, "recipe_description" text NOT NULL, "recipe_instructions" text, "ingredients" jsonb NOT NULL, "cooking_time" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" uuid, CONSTRAINT "PK_29afdd0fb364f2c1ae227bc926d" PRIMARY KEY ("recipe_id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_Recipes" ADD CONSTRAINT "FK_0bcae093401e7a1ebda95ce6272" FOREIGN KEY ("author_id") REFERENCES "tbl_Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_Recipes" DROP CONSTRAINT "FK_0bcae093401e7a1ebda95ce6272"`);
        await queryRunner.query(`DROP TABLE "tbl_Recipes"`);
    }

}
