const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmployeeSchema = new Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    }
});

                         // creating a model
                                 // mongoose will set Employee to lowercase and plural
module.exports = mongoose.model('Employee', EmployeeSchema);