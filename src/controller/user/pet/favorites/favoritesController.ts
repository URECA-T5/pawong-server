import { Request, Response } from 'express';
import {
  petRepository,
  userRepository,
} from '../../../../repository/repository';
import { User } from '../../../../entity/User';
import { In } from 'typeorm';
import { Pet } from '../../../../entity/Pet';

export const addFavoritePet = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: '즐겨찾기에 추가하는 중 오류가 발생했습니다.' });
  }
};

export const getFavortiePets = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId: number = req.user!.id;

  try {
    const user: User | null = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      return;
    }

    const favoritePetIds: number[] = user.favoritePetIds || [];
    console.log(favoritePetIds);
    const favoritePets: Pet[] = await petRepository.find({
      where: { id: In(favoritePetIds) },
    });

    const result = favoritePets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      profileImage: pet.profileImage,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
