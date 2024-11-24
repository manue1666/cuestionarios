import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers } from "./Controllers/UsersController";


const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//users
app.post("/users/create", registerUsers)

export default app;