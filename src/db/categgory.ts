import CategorySchema from "../models/category";

class CategoryData {
  async getCategory() {
    return await CategorySchema.find();
  }

  //create a new category
  async createCatgory(category: Record<string, any>) {
    return await new CategorySchema(category)
      .save()
      .then((data) => data.toObject());
  }
  async updateCategoryById(categoryId: string, categoryUpdates: Record<string, any>) {
    return await CategorySchema.findByIdAndUpdate(categoryId, categoryUpdates, { new: true }).lean();
  }

  async deleteCategoryById(categoryId: string) {
    return await CategorySchema.findByIdAndDelete(categoryId);
  }
  async getCategoryById(categoryId: string) {
    return await CategorySchema.findById(categoryId).lean();
  }
}

export default new CategoryData();
