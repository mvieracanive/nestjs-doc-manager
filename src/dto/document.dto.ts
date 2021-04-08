import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateDocumentDto } from './create-document.dto';
import { FileUploadDto } from './file-upload.dto';

export class DocumentDto extends PartialType(FileUploadDto) {
  @ApiProperty({
    description: 'Fecha en que se guardó el archivo en la base de datos',
  })
  @Expose()
  created_on: Date;

  @ApiProperty({
    description: 'Fecha en que se modificó el archivo en la base de datos',
  })
  @Expose()
  updated_on: Date;
}
