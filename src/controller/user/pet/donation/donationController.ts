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
    res.status(201).json({ message: '후원 등록에 성공했습니다.', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '후원 등록에 실패했습니다.' });
  }
};

export const getDonationList = async (req: Request, res: Response) => {
  const userId: number = req.user!.id;
  const { petId } = req.params;

  try {
    const donations = await donationService.getDonationsByUserAndPet(
      userId,
      Number(petId),
    );

    const donationHistory = donations.map((donation) => ({
      donationId: donation.id,
      donationItemName: donation.donationItem.name,
      donationItemPrice: donation.donationItem.price,
      donationItemImages: donation.donationItem.donationItemImages[0],
      quantity: donation.quantity,
      createdAt: donation.createdAt,
      isDelivery: donation.isDelivery,
      donorUserId: donation.user.id,
    }));

    res.status(200).json(donationHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '후원 내역 조회에 실패했습니다.' });
  }
};

export const refuseDonation = async (req: Request, res: Response) => {
  const { donationId } = req.params;
  try {
    await donationService.refuseDonation(Number(donationId));
    res.status(200).json({ message: '후원을 거절했습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '후원 거절에 실패했습니다.' });
  }
};

export const acceptDonation = async (req: Request, res: Response) => {
  const { donationId } = req.params;
  const { receivedPhoneNumber, receivedAddress } = req.body;
  try {
    const donation = await donationService.acceptDonationService(
      Number(donationId),
      receivedPhoneNumber,
      receivedAddress,
    );
    res.status(200).json({
      message: '후원 물품 받을 주소를 등록했습니다',
      donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '후원 내역 업데이트에 실패했습니다.' });
  }
};
