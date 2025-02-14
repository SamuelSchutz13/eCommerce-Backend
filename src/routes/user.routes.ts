import { Router } from "express";
import { body } from "express-validator";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { CreateUserController } from "../controllers/user/CreateUserController";

const router = Router();

router.post("/", [
    body("name").isString().notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
    body("email").isEmail().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("password").isString().notEmpty().withMessage("Password is required"),
    body("password").isLength({ min: 6, max: 25 }).withMessage("Password must be between 6 and 25 characters")
], new CreateUserController().handle); 

router.post("/auth", [
    body("email").isEmail().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("password").isString().notEmpty().withMessage("Password is required")
    .notEmpty().withMessage("Password is required")
], new AuthUserController().handle);

export default router;
