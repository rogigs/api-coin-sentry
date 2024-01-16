import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("email_index")
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
