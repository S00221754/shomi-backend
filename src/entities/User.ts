import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("tbl_Users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  user_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column()
  user_password: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
