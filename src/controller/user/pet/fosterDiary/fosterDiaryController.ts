import { Request, Response } from 'express';
import { FosterDiaryService } from '../../../../service/user/fosterDiaryService';
import { FosterDiary } from '../../../../entity/FosterDiary';

const fosterDiaryService = new FosterDiaryService();

export const registerFosterDiary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { petId, fosterDiary } = req.body;
  const image: string = req.file ? req.file.path : '';
  const fosterDiaryData =
    typeof fosterDiary === 'string' ? JSON.parse(fosterDiary) : fosterDiary;
  try {
    await fosterDiaryService.registerFosterDiary(petId, fosterDiaryData, image);
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

export const getAllFosterDiaries = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const fosterDiaries = await fosterDiaryService.getAllFosterDiaries();

    res.status(200).json(fosterDiaries);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: '일지 데이터를 가져오는 중 오류가 발생했습니다.' });
  }
};

export const updateFosterDiary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId: number = req.user!.id;
  const { fosterDiaryId } = req.params;

  try {
    const updateFosterDiary: FosterDiary = req.body;
    const fosterDiaryImage = req.file;

    if (fosterDiaryImage) updateFosterDiary.image = fosterDiaryImage.path;

    const result: boolean = await fosterDiaryService.updateFosterDiary(
      userId,
      parseInt(fosterDiaryId, 10),
      updateFosterDiary,
    );

    if (result)
      res.status(200).json({ message: '일지가 성공적으로 수정되었습니다.' });
    else
      res
        .status(404)
        .json({ message: '일지를 찾을 수 없거나 권한이 없습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '일지 수정에 실패했습니다.' });
  }
};

export const deleteFosterDiary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fosterDiaryId: number = parseInt(req.params.fosterDiaryId);
  try {
    const deleted =
      await fosterDiaryService.deleteFosterDiaryById(fosterDiaryId);

    if (deleted)
      res.status(200).json({ message: '임시 보호 일지가 삭제되었습니다.' });
    else res.status(404).json({ message: '삭제할 일지를 찾을 수 없습니다.' });
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError);
    res.status(500).json({
      message: '임시 보호 일지 삭제 중 오류가 발생했습니다.',
      error: typedError.message,
    });
  }
};
