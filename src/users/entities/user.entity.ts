import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  userRegistrationDate: Date;
}
