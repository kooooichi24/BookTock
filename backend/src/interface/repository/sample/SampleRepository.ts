import { ISampleRepository } from "src/application/repository/ISampleRepository";
import { Sample } from "src/domain/sample/Sample";

export class SampleRepository implements ISampleRepository {
  save(_: Sample): void {
    // throw new Error('Method not implemented.');
  }
}
