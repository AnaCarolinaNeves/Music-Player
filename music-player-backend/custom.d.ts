import { Request } from 'express';

interface MulterFile {
  path: string;
  mimetype: string;
  originalname: string;
  size: number;
  filename: string;
}

export interface MulterRequest extends Request {
  files: {
    imgPath?: MulterFile[];
    audioPath?: MulterFile[];
  };
}
