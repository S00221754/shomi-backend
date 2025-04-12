import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeShoppingListTable1744458812445 implements MigrationInterface {
    name = 'MadeShoppingListTable1744458812445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_list" ("Shop_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "ingredient_id" integer NOT NULL, "Shop_quantity" double precision, "Shop_added_automatically" boolean NOT NULL DEFAULT false, "Shop_reason" text, "Shop_created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b212cf3218fbdf842ef56d7f56" PRIMARY KEY ("Shop_id"))`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_b11478773d3223c61cf98a6d064" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_f0f2a36a2ce66ff59011413df0e" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("Ing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_f0f2a36a2ce66ff59011413df0e"`);
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_b11478773d3223c61cf98a6d064"`);
        await queryRunner.query(`DROP TABLE "shopping_list"`);
    }

}
