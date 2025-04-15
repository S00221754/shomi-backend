import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("unit_types")
@Unique(["name"])
export class UnitType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  label?: string;

  @Column()
  type: "mass" | "volume";

  @Column({ name: "base_unit" })
  baseUnit: string;

  @Column({ name: "multiplier_to_base", type: "float" })
  multiplierToBase: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
