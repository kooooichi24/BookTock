import "reflect-metadata";
import { EntityManager, EntityTarget } from "typeorm";
import { ITypeOrmManager } from "../../../interface/repository/ITypeOrmManager";
import { AppDataSource } from "./data-source";

export class TypeOrmManager implements ITypeOrmManager {
  private readonly manager: EntityManager;

  constructor() {
    this.manager = AppDataSource.manager;
  }

  async save<T>(targetOrEntity: EntityTarget<T>, entities: T[]): Promise<void> {
    await this.manager.save(targetOrEntity, entities);
  }

  async find<T>(entityClass: EntityTarget<T>): Promise<T[]> {
    return await this.manager.find(entityClass);
  }
}
