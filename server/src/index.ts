import express from "express";
import mongoose, { ConnectOptions }  from "mongoose";
import { Auth } from "./routes/auth";
import bodyparser from "body-parser"
import cors from "cors";

const app = express();
const port = 8888;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors({origin: "http://localhost:8889", credentials: true}));
app.use(Auth);

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://db:27017/workshopbackend", {useNewUrlParser: true,useUnifiedTopology: true} as ConnectOptions)
.then(() => {
    console.log("connected to database");
})
.catch((error) => {
    console.log(error);
});

app.get("/", async (req, res) => {
    res.send("salut !");
});

app.listen(port, function () {
    console.log("app listening on port", port);
});
