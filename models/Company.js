const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    mision: {
        type: String,
        required: false,
    },
    sede: {
        type: String,
        required: false,
    },
    contacto: {
        type: String,
        required: false,
    },
    referencia: {
        type: String,
        required: false,
    },
    sitioWeb: {
        type: String,
        required: false,
    },
    mail: {
        type: String,
        required: false,
    },
    telefono: {
        type: String,
        required: false,
    }
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
