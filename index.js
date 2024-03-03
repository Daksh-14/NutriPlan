import express  from 'express';
import signUp from './routes/signUp.js';
import { db } from './database/db.js';
import chatBot from './routes/chatBot.js';
import nutrition from './routes/nutrition.js';
import tracker from './routes/tracker.js';
import cookieParser from 'cookie-parser';
import blogs from './routes/blog.js';
import 'dotenv/config'
const PORT=process.env.PORT;
const app = express();
try{
db.connect();
}catch{
    console.log(error);
}

app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})
app.use('http://localhost:3000/blogs',blogs);
app.use('http://localhost:3000/user',signUp);
app.use('http://localhost:3000/chatbot',chatBot);
app.use('http://localhost:3000/nutrition',nutrition);
app.use('http://localhost:3000/tracker',tracker);
app.use(cookieParser());

const server = app.listen(PORT,()=>{  
    console.log(`App is running on port ${PORT}`);
});

server.on('close', () => {
    console.log("Server is shutting down. Closing DB connection...");
    db.end((err) => {
        if (err) {
            console.error("Error closing DB connection:", err);
        } else {
            console.log("DB connection closed successfully.");
        }
    });
});

