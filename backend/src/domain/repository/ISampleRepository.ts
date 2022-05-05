import { Sample } from "../sample/Sample";

export interface ISampleRepository {
  save(sample: Sample): void;
  findAll(): any;
}
