import { ApiProperty } from "@nestjs/swagger";
import { MetadataAbstract } from "../metadata-templates/metadata.abstract";

export class UpdateDocumentDto {
  @ApiProperty({ description: "Metadatos del archivo" })
  metadata: MetadataAbstract;

  id?: number;
}
