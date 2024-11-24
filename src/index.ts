import dotenv from "dotenv";
dotenv.config()
import path from "path"
import express , {Express , Request , Response}from "express" 
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";
import friendRouter  from "./routes/friend.route";
import cors from 'cors'




const port = process.env.PORT || 8000

const app : Express = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use(express.json())
app.use(cors())


app.get("/",(req: Request ,res: Response) =>{
    res.send("Hello from ts express");
})

app.use(userRouter)
app.use(postRouter)
app.use(friendRouter)

// glopal middleware
app.all('*', notFoundMiddleware)


//err handler
app.use(errorMiddleware)

app.listen(port , () => {
    console.log("running on port: " + port);
})