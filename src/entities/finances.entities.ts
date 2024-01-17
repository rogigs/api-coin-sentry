import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entities";

@Entity("finances")
@Check(`"operation" IN ('entrada', 'saida')`)
export class Finances {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  operation: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false, default: 0.0 })
  value_item: number;

  @Column({ nullable: false, default: "10/10/200" })
  date_input: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
