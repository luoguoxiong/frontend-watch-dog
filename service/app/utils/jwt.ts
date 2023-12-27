import jwt from 'jsonwebtoken';


const SecretKey = 'blubiu-secret-key';

export const getJwtTokenMsg = (token:string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SecretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const creatJwtToken = (msg:any) => {
  return jwt.sign(msg, SecretKey, { expiresIn: '1d' });
};
