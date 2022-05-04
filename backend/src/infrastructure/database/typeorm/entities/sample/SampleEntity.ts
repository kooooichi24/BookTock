import { Entity, Column } from "typeorm";
import { BaseEntity } from "../shared/BaseEntity";

@Entity("samples")
export class SampleEntity extends BaseEntity {
  @Column()
  name!: string;
}
