import { EntityTarget } from "typeorm";

export interface ITypeOrmManager {
  save<T>(targetOrEntity: EntityTarget<T>, entities: T[]): Promise<void>;
  find<T>(entityClass: EntityTarget<T>): Promise<T[]>
}