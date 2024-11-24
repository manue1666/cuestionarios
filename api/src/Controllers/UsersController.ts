import { Request, Response } from "express";
import { UserModel } from "../Models/UsersModel";


export const registerUsers = async(req:Request, res: Response): Promise<void> => {
    try{
        const name = req.body.name
        const email= req.body.email
        const lastNames= req.body.lastNames
        const password = req.body.password
        const rol= req.body.rol

        //Admins NO pueden crear clientes
        if(req.user?.rol === "administrator" && rol ==="cliente"){
             res.status(400).json({
                msg:"los admins no pueden crear clientes"
            })
            return
        }

        if (!name||!email||!lastNames||!password||!rol){
            res.status(400).json({
                msg:"faltan datos"
            })
            return
        }
        
        //validar que el usuario sea admin para crear un admin
        if(rol === "administrator" && req.user?.rol != "administrator"){
            res.status(400).json({
                msg:"no puedes crear un admin si no eres admin"
            })
            return
        }

        await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol
        })
        res.status(200).json({
            msg: "usuario registrado con exito"
        })
        return

    }catch(error){
        console.log(error);
        res.status(500).json({msg:"hubo un error al crear usuario"})
        return
    }
}