import { Inject, Injectable } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { DocumentMetadataDto } from "./dto/document-metadata.dto";
import { MetadataAbstract } from "./metadata-templates/metadata.abstract";
import { Document } from "./entities/document.entity";
import { REPOSITORY_DOCUMENT } from "./types/module.options";
import { Utils } from "./utils";

@Injectable()
export class DocumentFinderService {
  constructor(
    @Inject(REPOSITORY_DOCUMENT)
    private _documentRepository: Repository<Document>
  ) {}

  async findEquals(finder: MetadataAbstract): Promise<DocumentMetadataDto> {
    const where = Utils.createSQLWhere(finder);

    const manager = this._documentRepository.manager;
    console.log(`select metadata, id, originalname
    from documents
    where ${where}`);
    const res = await manager.query(
      `select metadata, id, originalname
       from documents
       where ${where}`
    );
    const plain = classToPlain(res);
    const dtos = plainToClass(
      DocumentMetadataDto,
      plain /*, {
      excludeExtraneousValues: true,
    }*/
    );
    return dtos;
  }
}
