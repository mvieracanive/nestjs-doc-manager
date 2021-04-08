import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MetadataAbstract } from '../metadata-templates/metadata.abstract';
import { FileUploadDto } from './file-upload.dto';

export class CreateDocumentDto extends PartialType(FileUploadDto) {
  @ApiProperty({ description: 'Metadatos del archivo' })
  metadata: MetadataAbstract;
}
