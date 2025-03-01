import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string, email:string },
  secret: string,
  expiresIn: string,
) => {
  // console.log('creating token with payload:', jwtPayload);
  // console.log('using secret:', secret);
  // console.log('token expires in:', expiresIn);
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
