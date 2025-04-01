import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeImagesColumn1743104593621 implements MigrationInterface {
    name = 'RecipeImagesColumn1743104593621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "recipe_images" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "recipe_images"`);
    }

}
