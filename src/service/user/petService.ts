import { petRepository, userRepository } from '../../repository/repository';
import { Pet } from '../../entity/Pet';
import { User } from '../../entity/User';

export class PetService {
  async registerPet(userEmail: string, animalData: Partial<Pet>): Promise<Pet> {
    const user: User | null = await userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) throw new Error('유저를 찾을 수 없습니다.');

    const newAnimal = petRepository.create({ ...animalData, user });
    return await petRepository.save(newAnimal);
  }

  async getAllPets(): Promise<Pet[]> {
    return await petRepository.find();
  }
}
