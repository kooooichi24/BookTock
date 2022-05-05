import { Sample } from "../../../../domain/sample/Sample";

export class OutputData {
  readonly name: string;

  constructor(sample: Sample) {
    this.name = sample.name;
  }
}
