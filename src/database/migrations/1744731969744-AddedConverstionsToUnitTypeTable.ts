import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedConverstionsToUnitTypeTable1744731969744 implements MigrationInterface {
    name = 'AddedConverstionsToUnitTypeTable1744731969744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_types" ADD "label" character varying`);
        await queryRunner.query(`ALTER TABLE "unit_types" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit_types" ADD "base_unit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit_types" ADD "multiplier_to_base" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_types" DROP COLUMN "multiplier_to_base"`);
        await queryRunner.query(`ALTER TABLE "unit_types" DROP COLUMN "base_unit"`);
        await queryRunner.query(`ALTER TABLE "unit_types" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "unit_types" DROP COLUMN "label"`);
    }

}
