import { Request, Response } from 'express';
import { userRepository } from '../../../../repository/repository';

export const addFavoritePet = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId: number = req.user!.id;
  const petId: number = parseInt(req.params.petId);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    return;
  }

  user.favoritePetIds = user.favoritePetIds
    ? [...user.favoritePetIds, petId]
    : [petId];
  await userRepository.save(user);
  res.status(200).json({ message: '즐겨찾기에 추가되었습니다.' });
};
