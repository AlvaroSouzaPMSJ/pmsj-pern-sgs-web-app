import { Router } from "express";
import { userController } from "../../users/controllers/user.controller.js";
import { validate } from "../../../middleware/validate.js";
import { registerSchema, loginSchema } from "../../users/validations/user.validation.js";