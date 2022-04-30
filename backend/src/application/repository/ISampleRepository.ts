import { Sample } from "src/domain/sample/Sample";

export interface ISampleRepository {
  save(sample: Sample): void;
}
