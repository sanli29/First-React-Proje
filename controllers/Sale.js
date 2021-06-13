const c = require('config');
const { newData, fillData } = require('../helpers/schemaFiller');
const Sale = require('../models/Sale');

const getSales = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const sales = await Sale.find({}).limit(1000);
            resolve(sales);

        } catch (err) {

            reject(err);
        }
    });
}

//new mongoose model function.
const newSale = data => {
    return new Promise(async (resolve, reject) => {
        try {
            const { object, objectKeys } = await newData(new Sale());
            await fillData(object, objectKeys, data);
            await object.save();
            resolve(object);
        } catch (err) {
            reject(err);
        }
    });
};


module.exports = {
    getSales,
    newSale
};
