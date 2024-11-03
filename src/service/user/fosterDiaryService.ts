import { FosterDiary } from '../../entity/FosterDiary';
import {
  fosterDiaryRepository,
  petRepository,
} from '../../repository/repository';

export class FosterDiaryService {
  async registerFosterDiary(
    petId: number,
    fosterDiaryData: Partial<FosterDiary>,
  ): Promise<FosterDiary> {
    const pet = await petRepository.findOne({
      where: { id: petId },
    });
    if (!pet) throw new Error('펫을 찾을 수 없습니다.');

    const newFosterDiary = fosterDiaryRepository.create({
      ...fosterDiaryData,
      pet,
    });
    return await fosterDiaryRepository.save(newFosterDiary);
  }

  async getFosterDiary(fosterDiaryId: number): Promise<FosterDiary | null> {
    return await fosterDiaryRepository.findOne({
      where: { id: fosterDiaryId },
    });
  }
}
