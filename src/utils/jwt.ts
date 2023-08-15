import jwt from "jsonwebtoken";

const SECRET_KEY =
  "$2b$10$rkou8XCfQ/J2kg/FfAP3TOM2jMCkFVsZqjC26aQiu1./nrSpthh1S";

export interface JwtPayload {
  _id: string;
}

export const signAccessToken = (payload: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const secret = SECRET_KEY;
    const options = {
      expiresIn: "1h",
    };
    try {
      const token = jwt.sign(payload, secret, options);
      resolve(token);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const signRefreshToken = (payload: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const secret = SECRET_KEY;
    const options = {
      expiresIn: "1y",
    };
    try {
      const token = jwt.sign(payload, secret, options);
      resolve(token);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const verifyAccessToken = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      resolve(payload);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const verifyRefreshToken = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      resolve(payload);
    } catch (error: any) {
      reject(error);
    }
  });
};
