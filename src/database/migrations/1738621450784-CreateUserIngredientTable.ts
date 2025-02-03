import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserIngredientTable1738621450784 implements MigrationInterface {
    name = 'CreateUserIngredientTable1738621450784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_UserIngredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "expiry_date" TIMESTAMP, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "ingredient_id" integer, CONSTRAINT "UQ_e90aeaceb1cc1da7a0272518563" UNIQUE ("user_id", "ingredient_id"), CONSTRAINT "PK_8f14ecc19afa39d131111d42623" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" ADD CONSTRAINT "FK_48a1d7528b5ba394959cd9bbf7f" FOREIGN KEY ("user_id") REFERENCES "tbl_Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" ADD CONSTRAINT "FK_0aa7584512ba0d1680850db1c90" FOREIGN KEY ("ingredient_id") REFERENCES "tbl_Ingredients"("Ing_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" DROP CONSTRAINT "FK_0aa7584512ba0d1680850db1c90"`);
        await queryRunner.query(`ALTER TABLE "tbl_UserIngredients" DROP CONSTRAINT "FK_48a1d7528b5ba394959cd9bbf7f"`);
        await queryRunner.query(`DROP TABLE "tbl_UserIngredients"`);
    }

}
