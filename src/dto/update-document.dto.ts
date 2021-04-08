import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { MetadataAbstract } from "../metadata-templates/metadata.abstract";
import { CreateDocumentDto } from "./create-document.dto";

export class UpdateDocumentDto {
  @ApiProperty({ description: "Metadatos del archivo" })
  metadata: MetadataAbstract;

  id?: number;
}
