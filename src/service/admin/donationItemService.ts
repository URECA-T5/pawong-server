import {
  donationItemRepository,
  userRepository,
} from '../../repository/repository';
import { DonationItem } from '../../entity/DonationItem';

export class DonationItemService {
  async registerDonationItem(
    userId: number,
    name: string,
    price: number,
    donationItemImages: string[],
    donationItemDetailImage: string,
    brand: string,
    size: string[],
    expirationDate: Date,
    tag: '강아지' | '고양이',
  ) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('사용자를 찾을 수 없습니다.');

    const donationItem = donationItemRepository.create({
      name,
      price,
      donationItemImages,
      donationItemDetailImage,
      brand,
      size,
      expirationDate,
      tag,
      user,
    });
    await donationItemRepository.save(donationItem);

    return donationItem;
  }

  async getAll(): Promise<DonationItem[]> {
    return await donationItemRepository.find();
  }

  async getDonationItemById(donationItemId: number): Promise<DonationItem> {
    const donationItem = await donationItemRepository.findOne({
      where: { id: donationItemId },
    });
    if (!donationItem) throw new Error('해당 후원 물품을 찾을 수 없습니다.');

    return donationItem;
  }
}
