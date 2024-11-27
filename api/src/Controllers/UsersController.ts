import { Request, Response } from "express";
import { UserModel } from "../Models/UsersModel";
import jwt from "jsonwebtoken";


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

        const user= await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol
        })
        const token= jwt.sign(JSON.stringify(user),"pocoyo");
        res.status(200).json({msg:"usuario registrado con exito",token})
        return


    }catch(error){
        console.log(error);
        res.status(500).json({msg:"hubo un error al crear usuario"})
        return
    }
}

export const singIn= async(req:Request, res:Response):Promise<void>=>{
    try {
        //correo y contraseña
        const user= await UserModel.findOne({email:req.body.email, password:req.body.password})
        //verifica si el usuario existe
        if(!user){
            res.status(400).json({
                msg: "no existe el usuario"
            })
            return
        }
        const token= jwt.sign(JSON.stringify(user),"pocoyo");
        res.status(200).json({msg:"exito al iniciar este es tu token:",token})
        return
    } catch (error) {
        res.status(400).json({
            msg:"ups un error"
        })
        return
    }
}