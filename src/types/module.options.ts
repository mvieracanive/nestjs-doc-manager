export const REPOSITORY_DOCUMENT = "REPOSITORY_DOC";
export const CONNECTION_NAME = "doc_module_connection";
export const MULTER_DEST_PROVIDER = "MULTER_DEST";
export const DB_TABLE_NAME = "doc_manager_mvc";

export class DocModuleAsyncOptions {
  username: string;
  password: string;
  database: string;
  port?: number;
  type: string;
  host?: string;
  multerdest?: string;
}

export interface DocModuleOptionsFactory {
  useFactory: (
    ...args: any[]
  ) => Promise<DocModuleAsyncOptions> | DocModuleAsyncOptions;
  inject?;
}
