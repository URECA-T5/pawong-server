import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as NaverStrategy } from 'passport-naver';
import { userRepository } from '../repository/repository';
import { User } from '../entity/User';

type Provider = 'google' | 'naver';

export const initPassportStrategies = (): void => {
  const providersConfig = {
    google: {
      Strategy: GoogleStrategy,
      options: {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/callback',
      },
    },
    naver: {
      Strategy: NaverStrategy,
      options: {
        clientID: process.env.NAVER_CLIENT_ID!,
        clientSecret: process.env.NAVER_CLIENT_SECRET!,
        callbackURL: '/auth/naver/callback',
      },
    },
  };

  Object.entries(providersConfig).forEach(
    ([provider, { Strategy, options }]) => {
      passport.use(
        provider as Provider,
        createStrategy(provider as Provider, Strategy, options),
      );
    },
  );
};

const createStrategy = (provider: Provider, Strategy: any, options: any) => {
  return new Strategy(
    options,
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      handleSocialLogin(profile, provider, done);
    },
  );
};

const handleSocialLogin = async (
  profile: any,
  provider: Provider,
  done: (error: any, user?: any) => void,
): Promise<void> => {
  try {
    const { id, displayName, emails, photos } = profile;
    const email = emails?.[0]?.value || null;
    const profileImage = photos?.[0]?.value || null;

    let user: User | null = await userRepository.findOne({
      where: { socialId: id, socialProvider: provider },
    });

    if (!user && email) {
      user = userRepository.create({
        name: displayName,
        email: email,
        socialId: id,
        socialProvider: provider,
        profileImage: profileImage,
        isVerified: false,
      });
      await userRepository.save(user);
    }

    done(null, user || false);
  } catch (err) {
    done(err);
  }
};

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
