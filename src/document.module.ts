import { DynamicModule, Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { MulterModule } from "@nestjs/platform-express";
import { Document } from "./entities/document.entity";
import { ConnectionOptions, createConnection } from "typeorm";
import { DocumentFinderService } from "./document-finder.service";
import {
  DocModuleOptionsFactory,
  REPOSITORY_DOCUMENT,
  DocModuleAsyncOptions,
  CONNECTION_NAME,
} from "./types/module.options";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

@Module({})
export class UtilityModule {
  static forRootAsync(options: DocModuleOptionsFactory): DynamicModule {
    return {
      module: UtilityModule,
      providers: [
        {
          provide: DocModuleAsyncOptions,
          useFactory: async (a) => await options.useFactory(a),
          inject: [options.inject],
        },
      ],
      exports: [DocModuleAsyncOptions],
    };
  }
}

@Module({})
export class DocumentModule {
  static forRoot(options: DocModuleAsyncOptions): DynamicModule {
    return {
      module: DocumentModule,
      providers: [
        DocumentService,
        DocumentFinderService,
        {
          provide: REPOSITORY_DOCUMENT,
          useFactory: async () =>
            await DocumentModule.createDocumentRepository(options),
        },
      ],
      imports: [
        MulterModule.registerAsync({
          useFactory: async () =>
            ({
              dest: options.multerdest ? options.multerdest : "uploads",
            } as MulterOptions),
        }),
      ],
      exports: [DocumentService, DocumentFinderService, MulterModule],
    };
  }

  static forRootAsync(options: DocModuleOptionsFactory): DynamicModule {
    return {
      module: DocumentModule,
      providers: [
        {
          provide: REPOSITORY_DOCUMENT,
          useFactory: async (config: DocModuleAsyncOptions) =>
            await DocumentModule.createDocumentRepository(config),
          inject: [DocModuleAsyncOptions],
        },
        {
          provide: DocModuleAsyncOptions,
          useFactory: async (a) => await options.useFactory(a),
          inject: [options.inject],
        },
        DocumentService,
        DocumentFinderService,
      ],
      imports: [
        MulterModule.registerAsync({
          imports: [UtilityModule.forRootAsync(options)],
          inject: [DocModuleAsyncOptions],
          useFactory: async (configService: DocModuleAsyncOptions) =>
            ({
              dest: configService.multerdest
                ? configService.multerdest
                : "uploads",
            } as MulterOptions),
        }),
      ],
      exports: [DocumentService, DocumentFinderService, MulterModule],
    };
  }

  static async createDocumentRepository(config: DocModuleAsyncOptions) {
    delete config.multerdest;
    const connection = await createConnection({
      name: CONNECTION_NAME,
      synchronize: true,
      entities: [Document],
      ...config,
    } as ConnectionOptions);

    return connection.getRepository(Document);
  }
}
