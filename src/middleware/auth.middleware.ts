import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {getRepository} from "typeorm";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.headers['credentials'];

        if (!jwt) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const payload: any = verify(jwt, 'egzjmHWIo08NcDSbS-7olRWVQORsxnpzRVes5nWCn2s');

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const is_ambassador = req.path.indexOf('api/ambassador') >= 0;

        // const user = await getRepository(User).findOne({ where: { email: payload.userEmail} });

        if ((is_ambassador && payload.scope !== 'ambassador') || (!is_ambassador && payload.scope !== 'admin')) {
            return res.status(401).send({
                message: 'unauthorized'
            });
        }

        req["user"] = {
            id: Math.floor(Math.random() * 101),
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.userEmail,
            is_admin: payload.isAdmin
        };

        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}
