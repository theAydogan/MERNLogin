const router = require('express').Router();
const Car = require('../models/car.model');

router.post('/add', async (req, res) => {
    try {
        const { carName, carModel, carColor } = req.body;
        const newCar = new Car({
            carName,
            carModel,
            carColor
        });
        
        const savedCar = await newCar.save();
        res.json(savedCar);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.get('/list', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;