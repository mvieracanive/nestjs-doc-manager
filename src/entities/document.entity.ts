import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MetadataAbstract } from "../metadata-templates/metadata.abstract";

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  encoding: string;

  @Column("jsonb", { nullable: true })
  metadata: MetadataAbstract;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
