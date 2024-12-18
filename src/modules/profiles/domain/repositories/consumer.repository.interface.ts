import { Consumer } from '../entities/consumer.entity';

export interface IConsumerRepository {
  create(consumer: Partial<Consumer>): Promise<Consumer>;
  findById(id: string): Promise<Consumer>;
  findByUserId(userId: string): Promise<Consumer>;
  update(id: string, updateData: Partial<Consumer>): Promise<Consumer>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Consumer[]>;
}
