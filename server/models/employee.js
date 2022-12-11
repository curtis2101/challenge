const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
            return Employee.findOne({ email: value }).then(employee => {
                if (employee) {
                return false;
                } else {
                return true;
                }
            });
            },
            message: 'Email already exists'
        }
    },
    
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
            return value.trim().length > 0;
        },
        message: 'First name cannot be empty'
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
            return value.trim().length > 0;
            },
            message: 'Last name cannot be empty'
        }
    },
    gender: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
            return value.trim().length > 0;
            },
            message: 'Gender cannot be empty'
        }
    }
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
