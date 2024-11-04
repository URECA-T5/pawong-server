import {
  petRepository,
  vaccinationRepository,
} from '../../repository/repository';
import { Pet } from '../../entity/Pet';
import { Vaccination } from '../../entity/Vaccination';

export class PetService {
  async registerPet(
    userId: number,
    petData: Partial<Pet>,
    vaccinations: Vaccination[],
    profileImage: string,
  ): Promise<Pet> {
    const newPet: Pet = petRepository.create({
      user: { id: userId },
      profileImage,
      ...petData,
    });

    const savedPet: Pet = await petRepository.save(newPet);

    for (const vaccinationData of vaccinations) {
      const vaccination = vaccinationRepository.create({
        ...vaccinationData,
        pet: savedPet,
      });
      await vaccinationRepository.save(vaccination);
    }
    return savedPet;
  }

  async getAllPets(): Promise<Pet[]> {
    return await petRepository.find();
  }

  async getPetById(petId: number): Promise<Pet | null> {
    const pet: Pet | null = await petRepository.findOne({
      where: { id: petId },
      relations: ['fosterDiaries', 'vaccinations'],
    });

    if (pet && pet.fosterDiaries) {
      const imgFosterDiaries = pet.fosterDiaries.map((diary) => ({
        id: diary.id,
        image: diary.image,
      }));

      pet.fosterDiaries = imgFosterDiaries as any;
    }

    return pet;
  }
}
