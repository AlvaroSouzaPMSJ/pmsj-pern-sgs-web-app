import { userService } from "../services/user.service.js";
import { UserAlreadyExistsError } from "../errors/user.errors.js";

export const userController = {
  create: async (req, res, next) => {
    try {
      console.log("🚨 [CONTROLLER] req.validatedBody is:", req.validatedBody);
      const result = await userService.createUser(req.validatedBody);
      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso",
        data: result
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message
        });
      }
      next(error);
    }
  }
};