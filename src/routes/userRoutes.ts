import {Router} from 'express';
import {PrismaClient} from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


//Create user
router.post('/', async (req, res)=>{
    const { email, name, username } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello, I'm new here"
            }
        });
        res.json(newUser);
    } catch(e) {
        res.status(400).json({Error: 'username and email must be unique'})
    }
    
});

//List users
router.get('/', async (req, res)=>{
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            image: true,
        }
    });
    res.json(allUsers);
    //console.log(allUsers);
    // res.status(501).json({'error': 'not implemented'})
});

//get One user

router.get('/:id', async (req, res)=>{
    const {id} = req.params
    const user = await prisma.user.findUnique({
        where: {id: Number(id)},
        include: { tweets: true}
    })
    res.json(user);
    // res.status(501).json({'error': 'not implemented for user id: '+req.params})
});

//Update user
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const { bio, name, image} = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {id: Number(id)},
            data: {bio,name,image}
        })
    } catch(e){
        res.status(400).json({error: `Failed to update the user`});
    }

});

//delete user

router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    const deletedUser = await prisma.user.delete({where:
    {id:Number(id)}});
    res.sendStatus(200);
});



export default router;