import multer, { Multer } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb): void => {
    cb(null, 'uploads/profileImages');
  },
  filename: (req: Request, file: Express.Multer.File, cb): void => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload: Multer = multer({ storage });
