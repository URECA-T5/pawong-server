import { Request, Response } from 'express';
import { DonationItemService } from '../../../service/admin/donationItemService';
import { DonationItem } from '../../../entity/DonationItem';

const donationItemService = new DonationItemService();

export const registerDonationItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const donationItemImages: string[] = files?.donationItemImages
      ? files.donationItemImages.map((file) => file.path)
      : [];
    const donationItemDetailImages: string[] = files?.donationItemDetailImages
      ? files.donationItemImages.map((file) => file.path)
      : [];
    const { name, price, brand, tag } = req.body;

    const donationItem = await donationItemService.registerDonationItem(
      userId,
      name,
      price,
      donationItemImages,
      donationItemDetailImages,
      tag,
      brand,
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
    const response = donationItemList.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      brand: item.brand,
      donationItemImages: item.donationItemImages[0],
      tag: item.tag,
    }));
    res.status(200).json(response);
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '후원 물품 볼러오기를 실패했습니다.',
      error: typedError.message,
    });
  }
};

export const getDetailDonationItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { donationItemId } = req.params;
    const donationItem: DonationItem =
      await donationItemService.getDonationItemById(Number(donationItemId));
    res.status(200).json(donationItem);
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '후원 물품 정보 조회에 실패했습니다.',
      error: typedError.message,
    });
  }
};

export const deleteDonationItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { donationItemId } = req.params;
    await donationItemService.deleteDonationItem(Number(donationItemId));

    res.status(200).json({
      message: '후원 물품이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '후원 물품 삭제에 실패했습니다.',
      error: typedError.message,
    });
  }
};
