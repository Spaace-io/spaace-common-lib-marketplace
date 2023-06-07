import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

export const LOGIN_NONCE_VALID_PERIOD = 5 * 60 * 1000;

@Entity()
export class LoginNonce {
  @PrimaryGeneratedColumn('uuid')
  nonce!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user', referencedColumnName: 'address' })
  user!: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
