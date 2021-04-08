import { HttpException, HttpStatus } from "@nestjs/common";

export class FileSystemException extends HttpException {
  constructor(filename: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `File System Error handling file ${filename}, check logs`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
