import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Document } from "./entities/document.entity";
import { MetadataAbstract } from "./metadata-templates/metadata.abstract";
import { DocumentDto } from "./dto/document.dto";
import { FileDownloadDto } from "./dto/file-download.dto";
import * as fs from "fs";
import { DocumentMetadataDto } from "./dto/document-metadata.dto";
import {
  NoFileException,
  NoFileExceptionID,
} from "./responses/nofile.exception";
import { SuccessResponses } from "./responses/success.responses";
import { DatabaseException } from "./responses/database.exception";
import { FileSystemException } from "./responses/filesystem.exception";
import { DocModuleException } from "./responses/module.exception";
import { REPOSITORY_DOCUMENT } from "./types/module.options";

@Injectable()
export class DocumentService {
  constructor(
    @Inject(REPOSITORY_DOCUMENT)
    private _documentRepository: Repository<Document>
  ) {}

  async create(file: any, metadata: MetadataAbstract) {
    if (typeof file == "undefined") throw new NoFileException();

    const plain = classToPlain(file);
    const createDto = plainToClass(CreateDocumentDto, plain);

    createDto.metadata = metadata;

    const p = this._documentRepository.insert(createDto);

    try {
      return await p.then(function (value) {
        console.log(`ENTITY: "${createDto.originalname}" inserted`);
        return SuccessResponses.successDBEntityModification(
          value.identifiers[0].id
        );
      });
    } catch (exception) {
      console.log(exception);
      throw new DatabaseException();
    }
  }

  async findOne(id: number): Promise<DocumentDto> {
    try {
      return await this._documentRepository
        .findOne({ id: id })
        .then(function (value) {
          console.log("Recovered document: ", value.id);
          const plainr = classToPlain(value);
          const obj = plainToClass(DocumentDto, plainr, {
            excludeExtraneousValues: true,
          });
          return obj;
        });
    } catch (exception) {
      console.log(exception);
      throw new NoFileExceptionID(id);
    }
  }

  async findOneMetadata(id: number): Promise<DocumentMetadataDto> {
    try {
      return await this._documentRepository
        .findOne({ id: id })
        .then(function (value) {
          console.log("Recovered document: ", value.id);
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

  async downloadFileResponse(id: number) {
    const doc = await this.findOne(id);
    const respDto = new FileDownloadDto();
    const buffer = fs.readFileSync(doc.path);
    respDto.file = buffer;
    respDto.filename = doc.originalname;
    respDto.path = doc.path;

    return respDto;
  }

  async update(id: number, metadata: MetadataAbstract) {
    try {
      await this._documentRepository.findOne(id);
      const updateDocumentDto = new UpdateDocumentDto();
      updateDocumentDto.id = id;
      updateDocumentDto.metadata = metadata;
      await this._documentRepository.save(updateDocumentDto);

      console.log(`ENTITY: Document ${updateDocumentDto.id} saved`);
      return SuccessResponses.successDBEntityModification(id);
    } catch (exception) {
      console.log(exception);
      throw new DatabaseException();
    }
  }

  async remove(id: number) {
    let old;
    try {
      old = await this._documentRepository.findOne(id);
      if (old == undefined) throw new NoFileException();
      await this._documentRepository.delete(id);
      fs.unlinkSync(old.path);
      return SuccessResponses.successDBEntityModification(id);
    } catch (exception) {
      console.log(exception);
      if (exception.code && exception.code == "ENOENT")
        throw new FileSystemException(old.filename);
      throw new DocModuleException();
    }
  }

  //@Res({ passthrough: true }) This decorator allows to leave in controller the rest to Nest middleware
  /*
  AT CONTROLLER
  async download(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    this._serviceDocument.generateResDownloadForController(id, res);
  }
  */
  async generateResDownloadForController(id: number, res) {
    const file: FileDownloadDto = await this.downloadFileResponse(id);
    res.status(HttpStatus.OK);
    res.attachment(file.filename);
    res.write(file.file);
    return res;

    /*res.download(file.path, file.filename, function (err) {
      if (err) {
        //throw new FileException();
        console.log(err);
      }
      else {
        console.log('successs');;
      }
    });*/
  }
}
