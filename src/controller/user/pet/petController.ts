import { Request, Response } from 'express';
import { PetService } from '../../../service/user/petService';
import { Pet } from '../../../entity/Pet';

const petService = new PetService();

export const registerPet = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userEmail, pet } = req.body;

  try {
    await petService.registerPet(userEmail, pet);
    res.status(201).json({ message: '등록이 완료되었습니다.' });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '임시 보호 동물 등록에 실패했습니다.',
      error: typedError.message,
    });
  }
};

export const getAllPets = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const pets: Pet[] = await petService.getAllPets();
    const filteredPets = pets.map((pet: Pet) => ({
      id: pet.id,
      name: pet.name,
      age: pet.birthDate
        ? new Date().getFullYear() - new Date(pet.birthDate).getFullYear()
        : null,
      gender: pet.gender,
      profileImage: pet.profileImage,
      species: pet.species,
    }));
    res.status(200).json(filteredPets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '동물 조회에 실패했습니다.' });
  }
};
