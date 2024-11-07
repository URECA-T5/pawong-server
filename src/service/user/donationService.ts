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
};
