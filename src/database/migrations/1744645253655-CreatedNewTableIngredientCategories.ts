import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedNewTableIngredientCategories1744645253655 implements MigrationInterface {
    name = 'CreatedNewTableIngredientCategories1744645253655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_c46e6d713bc0107af340db99c8a" UNIQUE ("name"), CONSTRAINT "PK_c8efa29d4848b2abaea47237a87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_78cffcca39dfbf7958936c750f6" FOREIGN KEY ("category_id") REFERENCES "ingredient_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_78cffcca39dfbf7958936c750f6"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "ingredient_categories"`);
    }

}
