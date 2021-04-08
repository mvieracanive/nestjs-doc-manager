import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileDownloadDto {
  @ApiProperty({ description: 'Nombre del archivo' })
  filename: string;

  @ApiProperty({
    description: 'Contenido del archivo en forma de cadena binaria',
  })
  file: Buffer;

  @ApiProperty({
    description: 'Contenido del archivo en forma de cadena binaria',
  })
  path: string;
}
