import dotenv from "dotenv";
import path from "path"
import express , {Express , Request , Response}from "express" 
import userRouter from "./routes/user.route";
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import postRouter from "./routes/post.route";


dotenv.config()

const port = process.env.port || 8000

const app : Express = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use(express.json())

app.get("/",(req: Request ,res: Response) =>{
    res.send("Hello from ts express");
})

app.use(userRouter)
app.use(postRouter)


// glopal middleware
app.all('*', notFoundMiddleware)


//err handler
app.use(errorMiddleware)

app.listen(port , () => {
    console.log("running on port: " + port);
})