const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/userModel');


require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
   
};


passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      
      const user = await userModel.userFindById(payload.id);
      
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      return done(null, user); 

    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport; 
