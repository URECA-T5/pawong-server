import { Request, Response } from 'express';
import { PetService } from '../../../service/user/petService';

const petService = new PetService();

export const registerPet = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userEmail, animal } = req.body;

  try {
    const newPet = await petService.registerPet(userEmail, animal);
    res.status(201).json(newPet);
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '동물 등록에 실패했습니다.',
      error: typedError.message,
    });
  }
};
