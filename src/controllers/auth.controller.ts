import express from "express";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

import AccountService from "../services/auth.service";
import { hashPassword, comparePassword } from "../helpers";
import { Response } from "../types/common";
import { User } from "../types/user";
import { IUser } from "models/users";

class AuthController {

  // Hàm để hiển thị tất cả các user
  async GetAllUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const users = await AccountService.getAllUsers();
      return res
        .status(200)
        .json(new Response<IUser[]>("List of all users", 200, users));
    } catch (error) {
      next(error);
    }
  }
 // Hàm để sửa thông tin người dùng
 async UpdateUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> {
  try {
    const userId = req.params.id; // Lấy ID của người dùng từ request params
    const updates = req.body; // Dữ liệu cần cập nhật

    // Gọi phương thức từ UserService để cập nhật thông tin người dùng
    const updatedUser = await AccountService.updateUser(userId, updates);

    return res.status(200).json(new Response<IUser>("User updated!", 200, updatedUser));
  } catch (error) {
    next(error);
  }
}

  // Hàm để xóa người dùng
  async DeleteUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const userId = req.params.id; // Lấy ID của người dùng từ request params

      // Gọi phương thức từ UserService để xóa người dùng
      await AccountService.deleteUser(userId);

      return res.status(200).json(new Response("User deleted!", 200));
    } catch (error) {
      next(error);
    }
  }

  // REGISTER ACCOUNTS
  async Register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const {
        username,
        email,
        authentication: { password },
      } = req.body;

      if (!username || !email || !password) {
        return res
          .status(200)
          .json(new Response("Vui lòng nhập đầy đủ thông tin", 400));
      }

      const existingAccount = await AccountService.getAccountByEmail(email);

      if (existingAccount) {
        return res.status(200).json(new Response("Email đã tồn tại", 400));
      }

      const passwordHash = await hashPassword(password);

      const account = await AccountService.createAccount({
        email,
        username,
        phoneNumber: "",
        avatar: "",
        address: "",
        authentication: {
          password: passwordHash,
        },
      });

      const resAccount = {
        _id: account._id,
        email: account.email,
        username: account.username,
        phoneNumber: "",
        avatar: "",
        address: "",
      };

      return res
        .status(200)
        .json(new Response<User>("Register Successful!", 200, resAccount));
    } catch (error) {
      next(error);
    }
  }

  // LOGIN ACCOUNTS
  async Login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(200).json("Vui lòng nhập đầy đủ thông tin");
      }

      const account = await AccountService.getAccountByEmail(email);

      if (!account) {
        return res.status(200).json("Email không chính xác");
      }

      const isMatch = await comparePassword(
        password,
        account.authentication.password
      );

      if (!isMatch) {
        return res
          .status(200)
          .json(new Response("Mật khẩu không chính xác", 400));
      }

      const response = await account.save();

      const access_token = await signAccessToken({
        _id: response._id,
      });

      const refresh_token = await signRefreshToken({
        _id: response._id,
      });

      return res.status(200).json(
        new Response("Login Successful!", 200, {
          access_token,
          refresh_token,
          account: {
            _id: response._id,
            username: response.username,
            email: response.email,
            phoneNumber: response.phoneNumber,
            avatar: response.avatar,
            address: response.address,
          },
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
