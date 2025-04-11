import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotifiedAtToUserIngredients1744393336342 implements MigrationInterface {
    name = 'AddNotifiedAtToUserIngredients1744393336342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ingredients" ADD "notified_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ingredients" DROP COLUMN "notified_at"`);
    }

}
