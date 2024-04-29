const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    priority:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    status:{type:String,enum:['pending','complete','deleted'],default:"pending"}
},{
    versionKey:false
})
const TaskModel = mongoose.model('tasks',taskSchema);

module.exports={
    TaskModel
}