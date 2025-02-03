import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1738608389559 implements MigrationInterface {
    name = 'InitialDatabase1738608389559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_email" character varying NOT NULL, "user_password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0347ceb8e0bef62029064fe0493" UNIQUE ("user_email"), CONSTRAINT "PK_cfbcdcc1a279167103bbda66bd6" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "brand" character varying, "keywords" text array, "units" text array, "barcode" character varying, CONSTRAINT "PK_86fa9c8f988c5026a49b01e907a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tbl_ingredient"`);
        await queryRunner.query(`DROP TABLE "tbl_user"`);
    }

}
