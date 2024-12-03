import { Request, Response } from "express";
import { QuestionnaireModel } from "../Models/QuestionnairesModel";




export const createQuestionnaires = async(req:Request, res:Response):Promise<void>=>{
    try {
        const title = req.body.title
        const description = req.body.description
        const userId = req.body.userId

        //solo clientes puden crear cuestionarios
        // if(req.user?.rol != "client"){
        //     res.status(400).json({
        //         msg:"solo los clientes pueden crear cuestionarios"
        //     })
        //     return
        // }

        //validar datos
        if(!title||!description||!userId){
            res.status(400).json({
                msg:"faltan datos del cuestionario"
            })
            return
        }


        const questionnaire = await QuestionnaireModel.create({
            title,
            description,
            userId
        });
        res.status(200).json({
            msg:"se creo el cuestionario con exito", questionnaire
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"hubo un herror al crear cuastionarios"
        })
    }
}