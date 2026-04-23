import { CategoryModel } from "../models/association.model.js";

class CategoryRepository {
  static async findOrCreate(data: any, transactionHost: any) {
    return await CategoryModel.findOrCreate({
      where: {
        name: data.name,
        user_id: data.user_id,
        type: data.type,
      },
      defaults: data,
      transaction: transactionHost,
    });
  }
}

export default CategoryRepository;
