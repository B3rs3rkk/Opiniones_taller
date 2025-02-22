import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import {crearadministrador} from "./configs/administrador.js"
import { categoria } from "./configs/categoriaPredeterminada.js";

config()
initServer()
crearadministrador()
categoria()