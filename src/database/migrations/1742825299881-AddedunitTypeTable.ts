import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedunitTypeTable1742825299881 implements MigrationInterface {
    name = 'AddedunitTypeTable1742825299881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tblref_UnitTypes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79d48d82edc4bc842ac5d5f45ff" UNIQUE ("name"), CONSTRAINT "PK_e05c7ad3e7bb8399fbdebf4d4b1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tblref_UnitTypes"`);
    }

}
