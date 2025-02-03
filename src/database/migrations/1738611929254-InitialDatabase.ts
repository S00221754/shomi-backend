import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1738611929254 implements MigrationInterface {
    name = 'InitialDatabase1738611929254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_Users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_email" character varying NOT NULL, "user_password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_61649f6f26a1931a0f42bf97fc7" UNIQUE ("user_email"), CONSTRAINT "PK_a438491ef70f45efb5d2c31859a" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_Ingredients" ("Ing_id" SERIAL NOT NULL, "Ing_name" character varying NOT NULL, "Ing_brand" character varying, "Ing_keywords" text array, "Ing_units" text array, "Ing_barcode" character varying, CONSTRAINT "PK_1f49c898c974d5921b81620d75e" PRIMARY KEY ("Ing_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tbl_Ingredients"`);
        await queryRunner.query(`DROP TABLE "tbl_Users"`);
    }

}
