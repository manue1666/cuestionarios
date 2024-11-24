
interface IUser {
    name: string;
    email:string;
    lastNames:string;
    password:string;
    rol: "administrator" | "client";
}

declare namespace Express{
    export interface Request{
        user?:IUser
    }
}