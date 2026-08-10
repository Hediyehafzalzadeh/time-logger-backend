import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true,
        trim: true
    } ,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  color: {
    type: String,
    trim: true
  }

})

const Category = mongoose.model('Category', categorySchema);

export default Category;