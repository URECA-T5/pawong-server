import {
  petRepository,
  userRepository,
  vaccinationRepository,
} from '../../repository/repository';
import { Pet } from '../../entity/Pet';
import { User } from '../../entity/User';
import { Vaccination } from '../../entity/Vaccination';

export class PetService {
  async registerPet(
    userEmail: string,
    petData: Partial<Pet>,
    vaccinations: Vaccination[],
  ): Promise<Pet> {
    const user: User | null = await userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) throw new Error('유저를 찾을 수 없습니다.');

    const newPet: Pet = petRepository.create({ ...petData, user });
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
        imageUrl: diary.imageUrl,
      }));

      pet.fosterDiaries = imgFosterDiaries as any;
    }

    return pet;
  }
}
