import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import usuarioRoutes from "../src/usuarios/usuario.routes.js";
import publicacionesRoutes from "../src/publicaciones/publi.routes.js";
import opRoutes from "../src/opiniones/op.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
};

const routes = (app) => {
    app.use("/gestor/v1/auth", authRoutes);
    app.use("/gestor/v1/usuarios", usuarioRoutes);
    app.use("/gestor/v1/publicaciones", publicacionesRoutes);
    app.use("/gestor/v1/opiniones", opRoutes);
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};