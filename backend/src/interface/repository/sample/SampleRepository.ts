import { PrismaClient } from "@prisma/client";
import { ISampleRepository } from "src/application/repository/ISampleRepository";
import { Sample } from "src/domain/sample/Sample";

export class SampleRepository implements ISampleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(sample: Sample): Promise<void> {
    await this.prisma.sample.create({
      data: {
        name: sample.name,
      },
    });
  }
}
