const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
dotenv.config();


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRECT_KEY, 
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user in the database 
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (user) {
        return done(null, user); 
      } else {
        return done(null, false); 
      }
    } catch (error) {
      return done(error, false); 
    }
  })
);

app.use(passport.initialize());
