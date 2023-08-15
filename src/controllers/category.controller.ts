import express from "express";
import CategoryData from "../db/categgory";

class CategoryController {

     //get all category
  async getAllCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const category = await CategoryData.getCategory();

      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  // create a new category
  async createCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const {
        name,
        
      } = req.body;

      const products = await CategoryData.createCatgory({
        name,
        
      });

      return res.status(201).json(products);
    } catch (error) {
      next(error);
    }
  }
    // Update an existing category
    async updateCategory(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): Promise<any> {
      try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const updatedCategory = await CategoryData.updateCategoryById(categoryId, { name });
        return res.status(200).json(updatedCategory);
      } catch (error) {
        next(error);
      }
    }

     // Delete an existing category
  async deleteCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const categoryId = req.params.id;
      await CategoryData.deleteCategoryById(categoryId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  // Get a specific category by ID
async getCategoryById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> {
  try {
    const categoryId = req.params.id;
    const category = await CategoryData.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

}

export default new CategoryController();
