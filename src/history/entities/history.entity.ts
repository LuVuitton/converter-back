import { Users } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  historyItemID: number;

  @Column({ length: 5 })
  firstСurrencyst: string;

  @Column({ length: 5 })
  secondСurrencyst: string;

  @Column({ type: 'double' })
  firstValue: number;

  @Column({ type: 'double' })
  secondValue: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'userID' })
  user: Users;

  @CreateDateColumn({ type: 'timestamp' })
  historyCreationDate: Date;
}
