import { FosterDiary } from '../../entity/FosterDiary';
import {
  fosterDiaryRepository,
  petRepository,
} from '../../repository/repository';

export class FosterDiaryService {
  async registerFosterDiary(
    petId: number,
    fosterDiaryData: Partial<FosterDiary>,
    image: string,
  ): Promise<FosterDiary> {
    const pet = await petRepository.findOne({
      where: { id: petId },
    });
    if (!pet) throw new Error('펫을 찾을 수 없습니다.');

    const newFosterDiary = fosterDiaryRepository.create({
      ...fosterDiaryData,
      pet,
      image,
    });
    return await fosterDiaryRepository.save(newFosterDiary);
  }

  async getFosterDiary(fosterDiaryId: number): Promise<FosterDiary | null> {
    return await fosterDiaryRepository.findOne({
      where: { id: fosterDiaryId },
    });
  }

  async getAllFosterDiaries(): Promise<Partial<FosterDiary>[]> {
    const fosterDiaries = await fosterDiaryRepository.find({
      relations: ['pet', 'pet.user'],
    });

    return fosterDiaries.map((diary: FosterDiary) => ({
      id: diary.id,
      tag: diary.tag,
      title: diary.title,
      authorName: diary.pet.user?.nickName,
      createdAt: diary.createdAt,
    }));
  }

  async updateFosterDiary(
    userId: number,
    fosterDiaryId: number,
    updateFosterDiary: FosterDiary,
  ) {
    const fosterDiary = await fosterDiaryRepository.findOne({
      where: { id: fosterDiaryId },
      relations: ['pet', 'pet.user'],
    });

    if (!fosterDiary) throw new Error('임시 보호 일지를 찾을 수 없습니다.');
    if (fosterDiary.pet.user.id !== userId) return false;

    Object.assign(fosterDiary, updateFosterDiary);
    await fosterDiaryRepository.save(fosterDiary);
    return true;
  }

  async deleteFosterDiaryById(fosterDiaryId: number): Promise<boolean> {
    const result = await fosterDiaryRepository.delete(fosterDiaryId);
    return result.affected !== 0;
  }
}
