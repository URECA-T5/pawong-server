import { Request, Response } from 'express';
import { DonationItemService } from '../../../service/admin/donationItemService';

const donationItemService = new DonationItemService();

export const registerDonationItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // req.files 타입 지정

    const donationItemImages: string[] = files?.donationItemImages
      ? files.donationItemImages.map((file) => file.path)
      : [];
    const donationItemDetailImage: string = files?.donationItemDetailImage
      ? files.donationItemDetailImage[0].path
      : '';
    const { name, price, brand, size, expirationDate, tag } = req.body;

    const donationItem = await donationItemService.registerDonationItem(
      userId,
      name,
      price,
      donationItemImages,
      donationItemDetailImage,
      brand,
      size,
      new Date(expirationDate),
      tag,
    );
    console.log(donationItem);
    res.status(201).json({
      message: '후원 상품이 성공적으로 등록되었습니다.',
    });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '후원 상품 등록에 실패했습니다.',
      error: typedError.message,
    });
  }
};

export const getAllDonationItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const donationItemList = await donationItemService.getAll();
    res.status(200).json(donationItemList);
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '후원 물품 볼러오기를 실패했습니다.',
      error: typedError.message,
    });
  }
};
