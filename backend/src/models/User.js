import mongoose from 'mongoose';
import Category from './Category.js';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
});

export default mongoose.model('User', userSchema);