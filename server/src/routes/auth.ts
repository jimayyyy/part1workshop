import express from "express";
import { User } from "../../mongo/User";
import bcrypt from "bcryptjs";
import JWTService from "../services/JWTService";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
const router = express.Router();

router.post('/refresh/', AuthMiddleware, async (req, res) => {
    if (req.headers.refresh) {
        JWTService.verifyRefreshWrapper(req.headers.refresh as string).then(async () => {
            const token = await JWTService.signWrapper({payload: req.body.user.email});
            res.send(token);
        }).catch((e: { message : any}) => {
            res.send("Failed");
        })
    } else {
        res.send("Failed");
    }
});

router.post('/register/', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    }
    const user = new User(data)
    try {
        await user.save();
        const token = await JWTService.signWrapper(data.email);
        const refresh = await JWTService.signWrapperRefresh(data.email);
        res.status(201).send({token, refresh});
    } catch (error) {
        res.status(501).send("Failed");
    }
})

router.post('/login/', async (req, res) => {
    const query = await User.findOne({email: req.body.email});
    try {
        if (bcrypt.compareSync(req.body.password, query?.password as string) === true) {
            const token = await JWTService.signWrapper(query?.email as string);
            const refresh = await JWTService.signWrapperRefresh(query?.email as string);
            res.status(201).send({token, refresh});
        } else {
            res.status(501).send("Bad email or password");
        }
    } catch (err: any) {
        res.status(501).send(err.message);
    }
})

export { router as Auth }