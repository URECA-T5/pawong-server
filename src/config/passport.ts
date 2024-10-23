import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userRepository } from '../repository/repository';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails, photos } = profile;
        const email = emails?.[0].value;
        const profileImage = photos?.[0].value;

        let user = await userRepository.findOne({
          where: { socialId: id, socialProvider: 'google' },
        });

        if (!user && email) {
          user = userRepository.create({
            name: displayName,
            email: email,
            socialId: id,
            socialProvider: 'google',
            profileImage: profileImage,
            isVerified: true,
          });

          await userRepository.save(user);
        }

        done(null, user || false);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
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
