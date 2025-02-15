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