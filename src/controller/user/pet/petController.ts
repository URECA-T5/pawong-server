import { Request, Response } from 'express';
import { PetService } from '../../../service/user/petService';
import { Pet } from '../../../entity/Pet';

const petService = new PetService();

export const registerPet = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { pet } = req.body;
  const profileImage: string = req.file ? req.file.path : '';
  const userId: number = req.user!.id;
  const petData = typeof pet === 'string' ? JSON.parse(pet) : pet;
  console.log(petData);
  try {
    const pet = await petService.registerPet(userId, petData, profileImage);
    res.status(201).json({ message: '등록이 완료되었습니다.', pet });
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
      age: pet.age,
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

export const getPetDetail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { petId } = req.params;
  try {
    const pet: Pet | null = await petService.getPetById(Number(petId));
    if (!pet) {
      res.status(404).json({ message: '펫을 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({ pet });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '동물 세부정보 조회에 실패했습니다.',
      error: typedError.message,
    });
  }
};

export const getCareList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId: number = req.user!.id;
  try {
    const petCareList = await petService.getCareListByUserId(userId);
    res.status(200).json(petCareList);
  } catch (error) {
    console.error('임보 중인 동물 불러오기 실패:', error);
    res.status(500).json({ message: '서버 에러' });
  }
};
