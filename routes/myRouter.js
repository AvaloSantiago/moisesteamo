const express = require("express");
const router = express.Router();
const Company = require('../models/Company');


router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();
        res.render("index", { companies });
    } catch (err) {
        console.error("Error al obtener las empresas:", err);
        res.status(500).send("Error al obtener las empresas.");
    }
});


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

        res.redirect("/");  
    } catch (err) {
        console.error("Error al actualizar la empresa:", err);
        res.status(500).send("Error al actualizar la empresa.");
    }
});


router.post("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Company.findByIdAndDelete(id);
        res.redirect("/");  
    } catch (err) {
        console.error("Error al eliminar la empresa:", err);
        res.status(500).send("Error al eliminar la empresa.");
    }
});


router.get("/crear", (req, res) => {
    res.render("crear");
});


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
        res.redirect("/");  
    } catch (err) {
        console.error("Error al crear la empresa:", err);
        res.status(500).send("Error al crear la empresa.");
    }
});

module.exports = router;
