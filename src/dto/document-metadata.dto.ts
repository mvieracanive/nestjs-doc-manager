import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MetadataAbstract } from '../metadata-templates/metadata.abstract';

export class DocumentMetadataDto {
  @ApiProperty({
    description:
      'Identificador del documento (llave primaria en la base de datos',
  })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Metadatos del documento' })
  @Expose()
  metadata: MetadataAbstract;

  @ApiProperty({ description: 'Nombre del archivo' })
  @Expose()
  originalname: string;
}
