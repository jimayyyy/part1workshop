import jwt from 'jsonwebtoken';
import createError from 'http-errors';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? 'azer';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? 'tyuio';

class JWTService {
    static signWrapper(payload: any) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {expiresIn: '90d'}, (err, token) => {
                if (err) {
                    reject(new createError.InternalServerError('Internal server error'));
                }
                resolve(token);
            });
        });
    }

    static signWrapperRefresh(payload: any) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, refreshTokenSecret, {expiresIn: '1y'}, (err, token) => {
                if (err) {
                    reject(new createError.InternalServerError('Internal server error'));
                }
                resolve(token);
            });
        });
    }

    static verifyWrapper(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    reject(new createError.Unauthorized(err.message));
                }
                resolve(payload);
            });
        });
    }

    static verifyRefreshWrapper(refresh: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(refresh, refreshTokenSecret, (err, payload) => {
                if (err) {
                    reject(new createError.Unauthorized(err.message));
                }
                resolve(payload);
            });
        });
    }
}

export default JWTService;