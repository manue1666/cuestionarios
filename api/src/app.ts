import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singIn} from "./Controllers/UsersController";
import { createQuizz, getMetrics, getQuestionnaires } from "./Controllers/QuestionnairesController";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//users
app.post("/users/create", registerUsers)
app.post("/users/singin", singIn)


//cuestionarios
app.post("/questionnaires/create", createQuizz)
app.get("/questionnaire/get-metrics", getMetrics)
app.get("/questionnaires/get-all", getQuestionnaires)


export default app;