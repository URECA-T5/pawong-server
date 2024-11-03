import { Request, Response } from 'express';
import { FosterDiaryService } from '../../../../service/user/fosterDiaryService';

const fosterDiaryService = new FosterDiaryService();

export const registerFosterDiary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { petId, fosterDiary } = req.body;

  try {
    await fosterDiaryService.registerFosterDiary(petId, fosterDiary);
    res.status(201).json({ message: '등록이 완료되었습니다.' });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '임시 보호 일지 등록에 실패했습니다.',
      error: typedError.message,
    });
  }
};
