import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("ingredient_categories")
export class IngredientCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}
