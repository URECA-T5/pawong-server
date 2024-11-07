import { donationRepository } from '../../repository/repository';
import { Donation } from '../../entity/Donation';

export const donationService = {
  async registerDonation(
    userId: number,
    petId: number,
    donationItemId: number,
    quantity: number,
  ): Promise<Donation> {
    const donation = donationRepository.create({
      user: { id: userId },
      pet: { id: petId },
      donationItem: { id: donationItemId },
      quantity,
    });
    return await donationRepository.save(donation);
  },

  async getDonationsByUserAndPet(
    userId: number,
    petId: number,
  ): Promise<Donation[]> {
    try {
      const donations = await donationRepository.find({
        where: {
          user: { id: userId },
          pet: { id: petId },
        },
        relations: ['donationItem'],
      });
      return donations;
    } catch (error) {
      console.error('후원 내역 조회 실패:', error);
      throw new Error('후원 내역 조회에 실패했습니다.');
    }
  },
};
