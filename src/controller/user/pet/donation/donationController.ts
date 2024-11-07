import { Request, Response } from 'express';
import { donationService } from '../../../../service/user/donationService';

export const registerDonation = async (req: Request, res: Response) => {
  const userId: number = req.user!.id;
  const { petId, donationItemId } = req.params;
  const { quantity } = req.body;
  try {
    const donation = await donationService.registerDonation(
      userId,
      Number(petId),
      Number(donationItemId),
      quantity,
    );
    console.log('donation:' + donation);
    res.status(201).json({ message: '후원 등록에 성공했습니다. donation' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '후원 등록에 실패했습니다.' });
  }
};
