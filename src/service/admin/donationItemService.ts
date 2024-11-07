import {
  donationItemRepository,
  userRepository,
} from '../../repository/repository';

export class DonationItemService {
  async registerDonationItem(
    userId: number,
    name: string,
    price: number,
    image: string,
    manufacturer: string,
  ) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('사용자를 찾을 수 없습니다.');

    const donationItem = donationItemRepository.create({
      name,
      price,
      image,
      manufacturer,
      user,
    });
    await donationItemRepository.save(donationItem);

    return donationItem;
  }
}
