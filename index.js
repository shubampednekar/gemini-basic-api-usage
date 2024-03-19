import express from 'express';
import cors from 'cors';
import geminiRouter from './routers/geminiRouter.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req,res) =>{
    res.send("app is listening");
})

app.use('/api/gemini',geminiRouter);


app.listen(3000, () => {
    console.log("app listening on port 3000");
});

