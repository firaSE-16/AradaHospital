const User = require('./User');
const mongoose = require('mongoose');

const hospitalAdministratorSchema = new mongoose.Schema({
    
});

const HospitalAdministrator = User.discriminator('HospitalAdministrator', hospitalAdministratorSchema);
module.exports = HospitalAdministrator;