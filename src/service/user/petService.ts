import { petRepository } from '../../repository/repository';
import { Pet } from '../../entity/Pet';

export class PetService {
  async registerPet(
    userId: number,
    petData: Partial<Pet>,
    profileImage: string,
  ): Promise<Pet> {
    const newPet: Pet = petRepository.create({
      user: { id: userId },
      profileImage,
      ...petData,
    });

    return await petRepository.save(newPet);
  }

  async getAllPets(): Promise<Pet[]> {
    return await petRepository.find();
  }

  async getPetById(petId: number): Promise<Pet | null> {
    const pet: Pet | null = await petRepository.findOne({
      where: { id: petId },
      relations: ['user', 'fosterDiaries'],
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

  async getCareListByUserId(userId: number): Promise<Pet[]> {
    const pets: Pet[] = await petRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'name', 'breed', 'profileImage'],
    });
    return pets;
  }
}
