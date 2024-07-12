import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', type: 'char' })
  userName: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  constructor(props?: UserEntityProp) {
    Object.assign(this, props);
  }
}

export type UserEntityProp = {
  id: string;
  userName: string;
  balance: number;
};
