import {Schema, model} from "mongoose";

const schoolSchema = new Schema({
name:String,
address:String,
tel:String,
email:{
    type:Schema.Types.ObjectId,
    ref:"user"
}

});


export default model("school", schoolSchema)

