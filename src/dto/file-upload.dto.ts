import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class FileUploadDto {
  @ApiProperty({ description: "Nombre del archivo" })
  @ApiPropertyOptional()
  @Expose()
  originalname: string;

  @ApiProperty({ description: "Tipo Mime del archivo" })
  @ApiPropertyOptional()
  @Expose()
  mimetype: string;

  @ApiProperty({ description: "Nombre del archivo generado por Multer" })
  @ApiPropertyOptional()
  @Expose()
  filename: string;

  @ApiProperty({
    description:
      "Dirección completa hasta el archivo << destination + filename >>",
  })
  @ApiPropertyOptional()
  @Expose()
  path: string;

  @ApiProperty({
    description:
      "Es la dirección relativa o absoluta donde se guardarán los archivos gestionados por Multer. Esta variable debe definirse en una variable de entorno y gestionada por el módulo ConfigModule.",
  })
  @ApiPropertyOptional()
  @Expose()
  destination: string;

  @ApiProperty({ description: "Tamaño en bytes del archivo" })
  @ApiPropertyOptional()
  @Expose()
  size: number;

  @ApiProperty({ description: "Codificación del archivo" })
  @ApiPropertyOptional()
  @Expose()
  encoding: string;
}
