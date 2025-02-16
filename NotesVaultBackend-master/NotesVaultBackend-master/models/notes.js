const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true});
module.exports = new mongoose.model('notes', notesSchema);