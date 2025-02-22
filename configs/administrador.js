import bcrypt from "bcrypt";
import Usuarios from "../src/usuarios/usuario.model.js"

export const crearadministrador = async() =>{
    try {
        // Verifica si ya existe un administrador
        const adminExistente = await Usuarios.findOne({ rol: "ADMIN" });
    
        if (adminExistente) {
            console.log("Ya existe un administrador en la base de datos.");
            return;
        }
    
        // Datos predeterminados del administrador
        const administradorDatos = {
            nombre: "Admin",
            apellido: "PorDefecto",
            username: "admin",
            correo: "admin@example.com",
            password: "123",
            rol: "ADMIN"
        };
    
        // Genera un salto (salting) y encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        administradorDatos.password = await bcrypt.hash(administradorDatos.password, salt);
    
        // Crea y guarda el nuevo administrador
        const nuevoAdministrador = new Usuarios(administradorDatos);
        await nuevoAdministrador.save();
    
        console.log("Administrador por defecto creado exitosamente.");
    } catch (error) {
        console.error("Error al crear el administrador por defecto:", error.message);
    }
}