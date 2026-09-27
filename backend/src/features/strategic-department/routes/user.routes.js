import { Router } from "express";
import { validateUserRegistration } from "../middlewares/validateUser.middleware.js"
import { userController } from "../controllers/user.controller.js"

const usersRoutes = Router();

usersRoutes.post("/", validateUserRegistration, userController.create);
usersRoutes.get("/", protect, restrictTo("admin"), userController.getAll);


// GET /api/users/:id (You'd add a getById, etc.)
// router.get('/:id', authMiddleware, userController.getOne);

export default usersRoutes;