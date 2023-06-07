import { PrismaClient } from '@prisma/client';
import {Router} from 'express';

const router = Router();
const prisma = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;

function generateEmailToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateAuthenticationToken(): string {
    return '';
}

router.post('/login', async (req, res) =>{
    const { email  } = req.body;

    //generate token
    const emailToken = generateEmailToken();
    const expiration = new Date(
        new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
    );

    try{
        const createdToken = await prisma.token.create({
            data: {
                type:"EMAIL",
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: { email }
                    },
                }
    
            }
        });
        res.sendStatus(200);
    } catch (e){
        console.log(e);
        res.status(400).json({error:'Unable to start authentication'})
    }




    // const apiToken = await prisma.token.create({
    //     data: {
    //         type: 'API',
    //         expiration,
    //     }
    // })
    // const result = await prisma.token.create({
    //     data: {
    //         email,
    //         id
    //     }
    // })

});

router.post('/authenticate', async (req, res)=>{
    const {email, emailToken } = req.body;
    console.log(email, emailToken);

    const dbEmailToken = await prisma.token.findUnique(
        { where :{
            emailToken,
        },
        include: {
            user: true,
        }
    }
    );

    if(!dbEmailToken || !dbEmailToken.valid){
        return res.sendStatus(401);
    }

    if (dbEmailToken.expiration < new Date()){
        return res.status(401).json({error: 'token expired'})
    }
    
    if (dbEmailToken?.user?.email !== email ){
        return res.sendStatus(401);
    }

    res.sendStatus(200);
})

export default router;
