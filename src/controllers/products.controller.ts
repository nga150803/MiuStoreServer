import express from "express";
import ProductsData from "../db/products";

class ProductsController {
  //get all products
  async getAllProducts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const products = await ProductsData.getProducts();

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  // GET NEW PRODUCTS (STATUS = NEW) GET 8 PRODUCTS AND SORT BY CREATEDAT
  async getNewProducts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const products = await ProductsData.getNewProducts();
      console.log(products);

      return res.status(200).json(products).end();
    } catch (error) {
      next(error);
    }
  }
  // get products by price
  async getNewProductView(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const products = await ProductsData.getNewProductViews(); // Lấy 4 sản phẩm mới nhất theo lượt xem

      return res.status(200).json(products); // Trả về danh sách sản phẩm
    } catch (error) {
      next(error);
    }
  }
  //get products detaild by id
  async getProductById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const productId = req.params._id;
      console.log(productId);
      const product = await ProductsData.getProductById(productId);

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  // create a new product
  async createProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const {
        name,
        image,
        description,
        description_detail,
        category,
        price,
        Views,
      } = req.body;

      const products = await ProductsData.createProduct({
        name,
        image,
        description,
        description_detail,
        category,
        price,
        Views,
      });

      return res.status(201).json(products);
    } catch (error) {
      next(error);
    }
  }



  // update products
  async updateProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const productId = req.params.id; // Assuming you pass the product ID in the URL params
      const {
        name,
        image,
        description,
        description_detail,
        category,
        price,
        Views,
      } = req.body;

      const updatedProduct = await ProductsData.updateProduct(productId, {
        name,
        image,
        description,
        description_detail,
        category,
        price,
        Views,
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      return res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
  // delete products
  async deleteProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const productId = req.params.id; // Assuming you pass the product ID in the URL params

      const deletedProduct = await ProductsData.deleteProduct(productId);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
