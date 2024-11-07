import multer, { Multer } from 'multer';
import path from 'path';
import { Request } from 'express';

const storagePaths: { [key: string]: string } = {
  userProfileImage: 'uploads/userProfileImages',
  petProfileImage: 'uploads/petProfileImages',
  fosterDiaryImage: 'uploads/fosterDiaryImages',
  donationItemImages: 'uploads/donationItemImages',
  donationItemDetailImage: 'uploads/donationItemDetailImages',
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb): void => {
    const destination: string = storagePaths[file.fieldname];
    if (destination) cb(null, destination);
    else cb(new Error('Unknown file type'), '');
  },
  filename: (req: Request, file: Express.Multer.File, cb): void => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload: Multer = multer({ storage });
