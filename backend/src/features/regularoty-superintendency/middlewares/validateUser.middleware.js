import { createUserSchema } from "../validations/userZodSchema.js"

export const validateUserRegistration = (req, res, next) => {
  console.log("middleware working");
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  req.validatedBody = result.data;
  console.log("✅ [MIDDLEWARE] req.validatedBody is:", req.validatedBody);
  next();
};