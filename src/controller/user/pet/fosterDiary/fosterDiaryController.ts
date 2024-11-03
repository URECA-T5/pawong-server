import { Request, Response } from 'express';
import { FosterDiaryService } from '../../../../service/user/fosterDiaryService';
import { FosterDiary } from '../../../../entity/FosterDiary';

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

export const getFosterDiary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { fosterDiaryId } = req.params;
  try {
    const fosterDiary: FosterDiary | null =
      await fosterDiaryService.getFosterDiary(Number(fosterDiaryId));

    if (!fosterDiary) {
      res.status(404).json({ message: '일지를 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json(fosterDiary);
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '임시 보호 일지 조회에 실패했습니다.',
      error: typedError.message,
    });
  }
};
