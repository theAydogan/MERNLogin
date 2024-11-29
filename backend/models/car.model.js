const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    carColor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);