import UserSchema, { IUser } from "../models/users";

class AuthService {
  // Phương thức để lấy tất cả người dùng
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserSchema.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
   // Phương thức để thêm người dùng mới
  //  async addUser(user: IUser): Promise<IUser> {
  //   try {
  //     const newUser = await UserModel.create(user);
  //     return newUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // Phương thức để cập nhật thông tin người dùng
  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser> {
    try {
      const updatedUser = await UserSchema.findByIdAndUpdate(userId, updates, { new: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Phương thức để xóa người dùng
  async deleteUser(userId: string): Promise<void> {
    try {
      await UserSchema.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
  // GET ACCOUNT BY EMAIL
  async getAccountByEmail(email: string): Promise<IUser | null> {
    return await UserSchema.findOne({ email });
  }

  // GET ACCOUNT BY ID
  async getAccountById(_id: string): Promise<IUser | null> {
    return await UserSchema.findById(_id);
  }

  // CREATE ACCOUNT
  async createAccount(account: Record<string, any>) {
    return await new UserSchema(account).save().then((data) => data.toObject());
  }
}

export default new AuthService();
