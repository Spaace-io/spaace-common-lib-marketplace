import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Collection} from "./Collection";
import {Address} from "./Address";

export class Medias {
  raw!: string;
  thumbnail!: string;
  gateway!: string;
}

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  tokenId!: string | null;

  @Column({ default: false })
  isRefreshed!: boolean;

  @Column({ nullable: true })
  lastTimeUpdate!: Date;

  @Column({ nullable: true })
  tokenUri!: string;


  @Column('jsonb', { nullable: true })
  attributes!: object[] | JSON;

  @Column('jsonb', { nullable: true })
  medias!: object[] | JSON;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  created_at!: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Collection, (collection) => collection.items, {
    eager: true,
  })
  collection!: Collection;

  // @Field(() => Address)
  // @ManyToOne(() => Address, (user) => user.items, { nullable: true })
  // @JoinColumn({ name: 'owner' })
  // owner: Address | null;

}
