import { Request, Response } from 'express';
import { PetService } from '../../../service/user/petService';

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
