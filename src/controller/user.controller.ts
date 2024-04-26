import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {client} from "../index";

// export const Ambassadors = async (req: Request, res: Response) => {
//     var user = req.user;
//     res.send({
//         fist_name: user.first_name,
//         last_name: user.last_name,
//         emai: user.userEmail,
//         is_admion: user.is_admin
//     });
// }

export const Rankings = async (req: Request, res: Response) => {
    const result: string[] = await client.sendCommand(['ZREVRANGEBYSCORE', 'rankings', '+inf', '-inf', 'WITHSCORES']);
    let name;

    res.send(result.reduce((o, r) => {
        if (isNaN(parseInt(r))) {
            name = r;
            return o;
        } else {
            return {
                ...o,
                [name]: parseInt(r)
            };
        }
    }, {}));
}

export const HealthCheck = async(req: Request, res: Response) =>{
    res.send();
}
