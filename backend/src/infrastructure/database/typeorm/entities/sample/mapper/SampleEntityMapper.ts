import { Sample } from "../../../../../../domain/sample/Sample";
import { SampleEntity } from "../SampleEntity";

export class SampleEntityMapper {
  public static toOrmEntity(sample: Sample): SampleEntity {
    const sampleEntity = new SampleEntity();

    sampleEntity.name = sample.name;

    return sampleEntity;
  }

  public static toOrmEntities(samples: Sample[]): SampleEntity[] {
    return samples.map((sample) => this.toOrmEntity(sample));
  }

  public static toDomainEntity(sampleEntity: SampleEntity): Sample {
    return new Sample(sampleEntity.name);
  }

  public static toDomainEntities(sampleEntities: SampleEntity[]): Sample[] {
    return sampleEntities.map((sampleEntity) =>
      this.toDomainEntity(sampleEntity)
    );
  }
}
