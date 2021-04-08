import { DynamicModule, Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { ConfigurationKeys } from "./types/config.keys.enum";
import { ConnectionOptions } from "typeorm";

@Module({
  /*
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (_config: ConfigService) => ({
        dest: 'uploads'//_config.get(ConfigurationKeys.MULTER_DEST),
      }),
    }),
    TypeOrmModule.forFeature([Document]),
  ],
  providers: [DocumentService],
  exports: [DocumentService, MulterModule],
*/
})
export class DocumentModule {
  static forRootAsync(config: ConfigService): DynamicModule {
    return {
      module: DocumentModule,
      imports: [
        MulterModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
            dest: config.get(ConfigurationKeys.MULTER_DEST)
              ? config.get(ConfigurationKeys.MULTER_DEST)
              : "uploads",
          }),
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          async useFactory(config: ConfigService) {
            return {
              //ssl: true,
              //name: 'defaults', Should be added with a name when more than one connection.
              type: config.get<string>(ConfigurationKeys.DATABASE_TYPE),
              host: config.get<string>(ConfigurationKeys.DATABASE_HOST),
              username: config.get<string>(ConfigurationKeys.DATABASE_USERNAME),
              password: config.get(ConfigurationKeys.DATABASE_PASSWORD),
              database: config.get(ConfigurationKeys.DATABASE_NAME),
              entities: [Document], //'../modules/**/entities/*.entity{.ts, .js}'],
              migrations: ["/migrations/*{.ts, .js}"],
              //synchronize: true, //Delete on production
            } as ConnectionOptions;
          },
        }),
        TypeOrmModule.forFeature([Document]),
      ],
      providers: [DocumentService],
      exports: [DocumentService, MulterModule],
    };
  }
}
