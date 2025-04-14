import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumnDescriptionToIngredientCategories1744652227198 implements MigrationInterface {
    name = 'AddedColumnDescriptionToIngredientCategories1744652227198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_categories" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_categories" DROP COLUMN "description"`);
    }

}
