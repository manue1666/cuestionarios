import { Schema,model } from "mongoose";

interface IQuestion {
    title:string;
    type: "radio"| "checkbox" |"select" |"text";
    isMandatory: boolean;
    questionnaireId: Schema.Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>({
    title:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        enun: ["radio", "checkbox" ,"select" ,"text"],
        required: true
    },
    isMandatory:{
        type:Boolean,
        required: true,
    },
    questionnaireId:{
        type:Schema.Types.ObjectId,
        ref: "questionnaires",
        required: true
    }
})

export const QuestionModel = model("questions", QuestionSchema);
