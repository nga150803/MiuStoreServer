import express from "express";

import AuthController from "../controllers/auth.controller";

export default (router: express.Router) => {
  router.get("/users", AuthController.GetAllUsers);
  router.post("/auth/register", AuthController.Register);
  router.post("/auth/login", AuthController.Login);
  
  // Route mới để sửa thông tin người dùng
  router.put("/users/:id", AuthController.UpdateUser);


};
