import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserIngredient } from "./UserIngredient";
import { IngredientCategory } from "./IngredientCategories";

@Entity("ingredients")
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  Ing_id: string;

  @Column()
  Ing_name: string;

  @Column({ nullable: true })
  Ing_brand: string;

  @Column("text", { array: true, nullable: true })
  Ing_keywords: string[];

  @Column({ nullable: true })
  Ing_quantity: number;

  @Column("text", { nullable: true })
  Ing_quantity_units: string;

  @Column({ nullable: true })
  Ing_barcode: string;

  @ManyToOne(() => IngredientCategory, { nullable: true })
  @JoinColumn({ name: "category_id" })
  category: IngredientCategory;

  @OneToMany(
    () => UserIngredient,
    (userIngredient) => userIngredient.ingredient
  )
  userIngredients: UserIngredient[];
}
