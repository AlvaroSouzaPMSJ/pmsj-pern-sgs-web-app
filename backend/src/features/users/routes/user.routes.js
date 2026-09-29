import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../../../middleware/validate.js";
import { requireAuth } from "../../../middleware/auth/requireAuth.js"
import { registerSchema, loginSchema, updateUserSchema } from "../validations/user.validation.js";

const router = Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

router.use(requireAuth);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.patch('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;