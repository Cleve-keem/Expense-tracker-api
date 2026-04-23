import { Router } from "express";
import TransactionController from "../controllers/transaction.controller.js";
import { TransactionSchema } from "../schemas/transaction.js";
import { validator } from "../middlewares/validator.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authentication);

router.post("/", validator(TransactionSchema), TransactionController.addRecord);
router.get("/",TransactionController.getAllTransactionHistory);
router.get("/:transactionId", TransactionController.getSingleTransactionHistory);
router.patch("/:transactionId", TransactionController.updateTransactionRecord);
router.delete("/:transactionId", TransactionController.deleteTransactionRecord);

export default router;
