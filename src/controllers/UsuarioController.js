import { UsuarioModel } from "../models/Usuarios.js";

export class UsuarioController {
    static async getUsuarios (req,res) {
        try{
            const usuarios = await UsuarioModel.getUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getById (req,res) {
        const {id} = req.params;
        try{
            const usuario = await UsuarioModel.getById(id);
            if (usuario) return res.json(usuario)
            res.status(404).json({message: "Usuario no encontrado"});
        } catch (error) {
            res.status(500).json(error);
        }
    }

      // Crear un nuevo usuario
      static async createUsuario(req, res) {
        try {
            const newUser = await UsuarioModel.create(req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { cedula } = req.params;
            const updatedUser = await UsuarioModel.update(cedula, req.body);
    
            if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    
            return res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

     /** 🔹 Actualizar la huella del usuario */
     static async actualizarHuella(req, res) {
        try {
            const { usuarioCedula, template } = req.body;
            if (!usuarioCedula || !template) {
                return res.status(400).json({ message: "Cédula y huella son requeridas." });
            }

            // 🔹 Llamamos al modelo para actualizar la huella
            const usuarioActualizado = await UsuarioModel.updateHuella(usuarioCedula, template);

            if (!usuarioActualizado) {
                return res.status(404).json({ message: "Usuario no encontrado o no se pudo actualizar." });
            }

            res.json({ message: "Huella actualizada correctamente.", usuario: usuarioActualizado });
        } catch (error) {
            console.error("Error al actualizar huella:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    /** 🔹 Obtener la huella de un usuario */
    static async obtenerHuella(req, res) {
        try {
            const { usuarioCedula } = req.params;
            if (!usuarioCedula) {
                return res.status(400).json({ message: "Cédula requerida." });
            }

            // 🔹 Llamamos al modelo para obtener la huella
            const huellaBase64 = await UsuarioModel.getHuella(usuarioCedula);

            if (!huellaBase64) {
                return res.status(404).json({ message: "No se encontró huella para este usuario." });
            }

            res.json({ message: "Huella encontrada.", huella: huellaBase64 });
        } catch (error) {
            console.error("Error al obtener huella:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    }



    static async delete(req, res) {
        try {
            const { cedula } = req.params;
            const deletedUser = await UsuarioModel.delete(cedula);
    
            if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    
            return res.json({ message: "Usuario eliminado lógicamente", usuario: deletedUser });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    
}