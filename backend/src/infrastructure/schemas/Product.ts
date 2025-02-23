import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  // Add inventory fields
  stockQuantity: { 
    type: Number, 
    required: true, 
    min: 0,
    default: 0 
  },
  isInStock: { 
    type: Boolean, 
    default: function() {
      return this.stockQuantity > 0;
    }
  }
});

// Add middleware to update isInStock when stockQuantity changes
productSchema.pre('save', function(next) {
  this.isInStock = this.stockQuantity > 0;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
