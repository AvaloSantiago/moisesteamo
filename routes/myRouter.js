const express = require("express");
const router = express.Router();
const Company = require('../models/Company');

// Ruta principal para mostrar todas las empresas
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();
        res.render("index", { companies });
    } catch (err) {
        console.error("Error al obtener las empresas:", err);
        res.status(500).send("Error al obtener las empresas.");
    }
});

// Ruta para mostrar la página de edición de una empresa
router.get("/editar/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send("Empresa no encontrada");
        }
        res.render("editar", { company });
    } catch (err) {
        console.error("Error al obtener la empresa para editar:", err);
        res.status(500).send("Error al obtener la empresa.");
    }
});

// Ruta para actualizar una empresa (POST)
router.post("/editar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, mision, sede, contacto, referencia, sitioWeb, mail, telefono } = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(id, {
            nombre,
            mision,
            sede,
            contacto,
            referencia,
            sitioWeb,
            mail,
            telefono
        }, { new: true });

        res.redirect("/");  // Redirige a la página principal después de la actualización
    } catch (err) {
        console.error("Error al actualizar la empresa:", err);
        res.status(500).send("Error al actualizar la empresa.");
    }
});

// Ruta para eliminar una empresa (POST)
router.post("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Company.findByIdAndDelete(id);
        res.redirect("/");  // Redirige a la página principal después de eliminar
    } catch (err) {
        console.error("Error al eliminar la empresa:", err);
        res.status(500).send("Error al eliminar la empresa.");
    }
});

// Ruta para mostrar el formulario para crear una nueva empresa
router.get("/crear", (req, res) => {
    res.render("crear");
});

// Ruta para crear una nueva empresa (POST)
router.post("/crear", async (req, res) => {
    try {
        const { nombre, mision, sede, contacto, referencia, sitioWeb, mail, telefono } = req.body;

        const newCompany = new Company({
            nombre,
            mision,
            sede,
            contacto,
            referencia,
            sitioWeb,
            mail,
            telefono
        });

        await newCompany.save();
        res.redirect("/");  // Redirige a la página principal después de crear la empresa
    } catch (err) {
        console.error("Error al crear la empresa:", err);
        res.status(500).send("Error al crear la empresa.");
    }
});

module.exports = router;
