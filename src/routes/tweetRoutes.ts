import {Router} from 'express';
import {PrismaClient} from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

//Create tweet
router.post('/', async (req, res)=>{
    const {content, image, userId} = req.body;
    try {
        const result = await prisma.tweet.create({
            data : {
                content,
                image,
                userId
            }
        });
        res.sendStatus(200);
    } catch (e) {
         res.status(400).json({Error:'Failed to create tweet'})
    }
    
});

//List tweets
router.get('/', async (req, res)=>{
    const allTweets = await prisma.tweet.findMany({
        include: { user: {
            select :{id:true,name:true,image:true,username:true}
}}});
    res.json(allTweets);
});

//get One tweet

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const tweet = await prisma.tweet.findUnique({
        where : {id: Number(id)},
        include: { user: true},
    });
    if (!tweet) {
        return res.status(404).json({Error: "Tweet not found"});
    }
    res.json(tweet);
});


//delete tweet

router.delete('/:id', async (req, res)=>{
    const id = req.params;
    await prisma.tweet.delete({where:{id:Number(id)}});
    res.sendStatus(200);
});



export default router;