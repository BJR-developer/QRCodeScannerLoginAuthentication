import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const schema =new mongoose.Schema({
    email:{type:'String', unique:true, required:true},
    password:{type:'String', required:true}
})

export default mongoose.models?.User || mongoose.model('User' ,  schema)