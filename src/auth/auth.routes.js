import { Router } from "express";
import { registrar, loggiar } from "./auth.controller.js";
import { loggerValidator, registerarValidator } from "../middlewares/validators-usuarios.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.post("/registrar", uploadProfilePicture.single("profilePicture"), registerarValidator, registrar)

router.post("/loggiar", loggerValidator, loggiar)

export default router