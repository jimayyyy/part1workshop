import express from 'express';
import createError from "http-errors";
import JWTService from "../services/JWTService";

export async function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers.authorization) {
        return next(new createError.Unauthorized('Access token is required'))
    }
    const bearer = req.headers.authorization.split(' ');
    const bearerToken = ((bearer[1] === undefined) ? bearer[0] : bearer[1]);  
    if (!bearerToken) {
        return next(new createError.Unauthorized('Access token is required'))
    }
    await JWTService.verifyWrapper(bearerToken).then((user: any) => {
        req.body.user = user
        next()
    }).catch ((e: { message: any; }) => {
        next(new createError.Unauthorized(e.message))
    })
}