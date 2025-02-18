import express from "express";
import { userController } from "../../controller/user/userController.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();


router.post("/create", userController.create);

router.use(authenticateToken);
router.get("/", userController.getAll);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.delete("/:id", userController.delelteById);

export { router as userRouter };