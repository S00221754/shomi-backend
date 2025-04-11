import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpoTokenToNotifyUserInProfiletable1744393538636 implements MigrationInterface {
    name = 'AddExpoTokenToNotifyUserInProfiletable1744393538636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "expo_push_token" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "expo_push_token"`);
    }

}
