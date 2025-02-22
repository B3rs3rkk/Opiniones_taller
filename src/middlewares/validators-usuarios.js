import { body } from "express-validator";
import { correoExists, usernameExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validar-roles.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerarValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El correo es requerido"),
    body("correo").isEmail().withMessage("No es un correo válido"),
    body("correo").custom(correoExists),
    body("username").custom(usernameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loggerValidator = [
    body("correo").optional().isEmail().withMessage("Correo invalido"),
    validarCampos
]

export const actualizarUsuarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("username").custom(usernameExists),
    validarCampos,
    handleErrors
]

export const actualizarContraseñaValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validarCampos,
    handleErrors
]