import dotenv from "dotenv";
import express , {Express , Request , Response}from "express" 
import userRouter from "./routes/user.route";
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";


dotenv.config()

const port = process.env.port || 8000

const app : Express = express();

app.use(express.json())

app.get("/",(req : Request ,res : Response) =>{
    res.send("Hello from ts express");
})

app.use(userRouter)


// glopal middleware
app.all('*', notFoundMiddleware)


//err handler
app.use(errorMiddleware)

app.listen(port , () => {
    console.log("running on port: " + port);
})