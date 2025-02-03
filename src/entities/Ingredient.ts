import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("tbl_Ingredients")
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  Ing_id: string;

  @Column()
  Ing_name: string;

  @Column({ nullable: true })
  Ing_brand: string;

  @Column("text", { array: true, nullable: true })
  Ing_keywords: string[];

  @Column("text", { array: true, nullable: true })
  Ing_units: string[];

  @Column({ nullable: true })
  Ing_barcode: string;
}