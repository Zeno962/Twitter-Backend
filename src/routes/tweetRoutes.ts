import {Router} from 'express';

const router = Router();

//Create tweet
router.post('/', (req, res)=>{
    res.status(501).json({'error': 'not implemented'})
});

//List tweets
router.get('/', (req, res)=>{
    res.status(501).json({'error': 'not implemented'})
});

//get One tweet

router.get('/:id', (req, res)=>{
    res.status(501).json({'error': 'not implemented for user id: '+req.params})
});


//delete tweet

router.delete('/:id', (req, res)=>{
    res.status(501).json({'error': 'not implemented'});
});



export default router;