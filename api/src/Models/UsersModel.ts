import { Schema, model } from "mongoose";


const UserSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    lastNames:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        enum:["administrator", "client"],
        default:"client"
    }
})

export const UserModel = model ("users", UserSchema);