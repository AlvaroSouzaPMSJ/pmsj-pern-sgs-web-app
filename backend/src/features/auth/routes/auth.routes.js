import { Router } from "express";
import { userController } from "../../users/controllers/user.controller";
import { validate } from "../../../middleware/validate";
import { registerSchema, loginSchema } from "../../users/validations/user.validation";