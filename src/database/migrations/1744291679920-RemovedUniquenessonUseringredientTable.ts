import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUniquenessonUseringredientTable1744291679920 implements MigrationInterface {
    name = 'RemovedUniquenessonUseringredientTable1744291679920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ingredients" DROP CONSTRAINT "UQ_9d6f21472f5897e7964af9fbf77"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ingredients" ADD CONSTRAINT "UQ_9d6f21472f5897e7964af9fbf77" UNIQUE ("ingredient_id", "user_id")`);
    }

}
