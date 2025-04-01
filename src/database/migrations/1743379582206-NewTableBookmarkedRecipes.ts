import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTableBookmarkedRecipes1743379582206 implements MigrationInterface {
    name = 'NewTableBookmarkedRecipes1743379582206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookmarked_recipes" ("user_id" uuid NOT NULL, "recipe_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4de0a691225618ac2e90219f4d6" PRIMARY KEY ("user_id", "recipe_id"))`);
        await queryRunner.query(`ALTER TABLE "bookmarked_recipes" ADD CONSTRAINT "FK_b794c76ed39049f1642fac0e327" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarked_recipes" ADD CONSTRAINT "FK_3e226c57a81879bf6780f56a9c1" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmarked_recipes" DROP CONSTRAINT "FK_3e226c57a81879bf6780f56a9c1"`);
        await queryRunner.query(`ALTER TABLE "bookmarked_recipes" DROP CONSTRAINT "FK_b794c76ed39049f1642fac0e327"`);
        await queryRunner.query(`DROP TABLE "bookmarked_recipes"`);
    }

}
