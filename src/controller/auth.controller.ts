import {Request, Response} from "express";
import {getRepository} from "typeorm";
import bcryptjs from 'bcryptjs';
import {sign, verify} from "jsonwebtoken";
import {Order} from "../entity/order.entity";


export const AuthenticatedUser = async (req: Request, res: Response) => {
    const user = req["user"];
    console.log("Hola desde Authenticated");

    if (req.path === '/api/admin/user') {
        return res.send(user);
    }

    const orders = await getRepository(Order).find({
        where: {
            ambassador_email: user.email,
            complete: true
        },
        relations: ['order_items']
    });

    user.revenue = orders.reduce((s, o) => s + o.ambassador_revenue, 0);
    delete user.is_admin;
    console.log(user);
    res.send(user);
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie("access_token", "", {maxAge: 0});

    res.send({
        message: 'success'
    });
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"];

    // const repository = getRepository(User);

    // await repository.update(user.id, req.body);

    // res.send(await repository.findOne(user.id));
    res.send(user);
}

