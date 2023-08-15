import ProductsSchema from "../models/products";

class ProductsData {
  async getProducts() {
    return await ProductsSchema.find();
  }

  // create a new product
  async createProduct(product: Record<string, any>) {
    return await new ProductsSchema(product)
      .save()
      .then((data) => data.toObject());
  }

  

  // // // get new products (status = new) get 8 products and sort by createdAt
  async getNewProducts() {
    return await ProductsSchema.find({ status: "new" })
      .sort({ createdAt: -1 })
      .limit(8);
  }

  async getNewProductViews() {
    return await ProductsSchema.find().sort({ Views: -1 }).limit(5);
  }

  // views products details by id
  async getProductById(productId: string) {
    const product = await ProductsSchema.findOne({ _id: productId });
    return product;
  }

  // update products
  async updateProduct(productId: string, product: Record<string, any>) {
    return await ProductsSchema.findByIdAndUpdate(productId, product, {
      new: true,
    }).exec();
  }

  //delete products
  async deleteProduct(productId: string) {
    return await ProductsSchema.findByIdAndDelete(productId).exec();
  }
}

export default new ProductsData();
