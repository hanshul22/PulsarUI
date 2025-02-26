const mongoose = require('mongoose');

// defining user JWT Sehema

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },

    provider : {
        type : String,
        required : false,
        default: 'JWT'
    },
    image : {
        type : String,
        required : false,
        default: "data:image/jpeg;base64,..."
    }
}, { timestamps: true });

const AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;