import express from "express";

import {
  createImage,
  deleteImage,
  updateImage,
  getAllImages,
  getOneImage,
} from "../controllers/imageController.js";
import authenticateUser from "../middleware/authenticate.js";
const router = express.Router();

router.route("/").post(authenticateUser, createImage);
router.route("/").get(authenticateUser, getAllImages);
router
  .route("/:id")
  .get(authenticateUser, getOneImage)
  .patch(authenticateUser, updateImage)
  .delete(authenticateUser, deleteImage);
//

export default router;
