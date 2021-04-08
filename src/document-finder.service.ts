import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { classToPlain, plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { DocumentMetadataDto } from "./dto/document-metadata.dto";
import { DocumentDto } from "./dto/document.dto";
import { MetadataAbstract } from "./metadata-templates/metadata.abstract";
import { Document } from './entities/document.entity'; 
import { NoFileExceptionID } from "./responses/nofile.exception";

@Injectable()
export class DocumentFinderService {
  constructor(
    @InjectRepository(Document)
    private _documentRepository: Repository<Document>,
  ) {}

  async findOneMetadata(id: number): Promise<DocumentMetadataDto> {
    try {
      return await this._documentRepository
        .findOne({ id: id })
        .then(function (value) {
          console.log('Recovered document: ', value.id);
          const plainr = classToPlain(value);
          const obj = plainToClass(DocumentMetadataDto, plainr, {
            excludeExtraneousValues: true,
          });
          return obj;
        });
    } catch (exception) {
      console.log(exception);
      throw new NoFileExceptionID(id);
    }
  }

}