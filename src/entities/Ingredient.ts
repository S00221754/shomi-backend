import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class tbl_Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column("text", { array: true, nullable: true })
  keywords: string[];

  @Column("text", { array: true, nullable: true })
  units: string[];

  @Column({ nullable: true })
  barcode: string;
}
