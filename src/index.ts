import express from 'express';

import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';

const app = express();

app.use(express.json());
app.use('/user',userRoutes);
app.use('Tweet', tweetRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(3000,()=>{
    console.log('Sever started on localhost:3000');
});