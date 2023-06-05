import {Router} from 'express';

const router = Router();

//Create user
router.post('/', (req, res)=>{
    res.status(501).json({'error': 'not implemented'})
});

//List users
router.get('/', (req, res)=>{
    res.status(501).json({'error': 'not implemented'})
});

//get One user

router.get('/:id', (req, res)=>{
    res.status(501).json({'error': 'not implemented for user id: '+req.params})
});

//Update user
router.put('/:id', (req, res)=>{
    res.status(501).json({'error': 'not implemented'})
});

//delete user

router.delete('/:id', (req, res)=>{
    res.status(501).json({'error': 'not implemented'});
});



export default router;