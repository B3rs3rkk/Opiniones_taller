import bcrypt from 'bcrypt';
import Usuario from "../usuarios/usuario.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const registrar = async (req, res, next) => {
    try {
        const { body: data, file } = req;
        const profilePicture = file ? file.filename : null;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        data.profilePicture = profilePicture;

        const user = await Usuario.create(data);

        return res.status(201).json({
            message: "registrado",
            nombre: user.nombre,
            correo: user.correo
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al registrar",
            error: err.message
        });
    }
};

export const loggiar = async (req, res) => {
    const { correo, username, password } = req.body;
    try {
        const user = await Usuario.findOne({
            $or: [{ correo }, { username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "las credenciales son inválidas",
                error: "No existe usuario o correo"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Credenciales incorrectas",
                error: "la contraseña es incorrecta"
            });
        }

        const token = await generateJWT(user._id);

        return res.status(200).json({
            message: "Inicio la sesion de forma correctamente",
            userDetails: { token }
        });
    } catch (err) {
        return res.status(500).json({
            message: "el inicio de sesión ah fallado",
            error: err.message
        });
    }
};