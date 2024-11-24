import { Schema,model } from "mongoose";
import { IOption } from "../GlobalTypes";

const OptionShema = new Schema<IOption>({
    title:{
        type:String,
        required:true
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"questions",
        required:true
    },
});

export const OptionsModel = model("options",OptionShema);