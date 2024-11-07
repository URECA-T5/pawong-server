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
          pet: { id: petId },
        },
        relations: ['donationItem', 'user'],
      });

      return donations.filter((donation) => donation.user.id === userId);
    } catch (error) {
      console.error('후원 내역 조회 실패:', error);
      throw new Error('후원 내역 조회에 실패했습니다.');
    }
  },

  async refuseDonation(donationId: number) {
    try {
      const donation = await donationRepository.findOne({
        where: { id: donationId },
      });

      if (!donation) return null;
      await donationRepository.update(donationId, { isDelivery: '거절' });

      return await donationRepository.findOne({ where: { id: donationId } });
    } catch (error) {
      console.error('Error deleting donation:', error);
      throw new Error('후원 내역 삭제에 실패했습니다.');
    }
  },

  async acceptDonationService(
    donationId: number,
    receivedPhoneNumber: string,
    receivedAddress: string,
  ) {
    try {
      const donation = await donationRepository.findOne({
        where: { id: donationId },
      });

      if (!donation) return null;

      donation.isDelivery = '받기';
      donation.receivedPhoneNumber = receivedPhoneNumber;
      donation.receivedAddress = receivedAddress;

      await donationRepository.save(donation);

      return donation;
    } catch (error) {
      console.error('Error accepting donation:', error);
      throw new Error('후원 내역 업데이트에 실패했습니다.');
    }
  },
};
