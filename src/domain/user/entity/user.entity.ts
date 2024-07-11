import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char' })
  user_name: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  constructor(props?: UserEntityProp) {
    Object.assign(this, props);
  }
}

export type UserEntityProp = {
  id: string;
  user_name: string | null;
  balance: number;
};
