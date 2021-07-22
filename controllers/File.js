const c = require('config');
const { newData, fillData } = require('../helpers/schemaFiller');
const File = require('../models/File');
const { newSale } = require('./Sale');

const getFiles = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const files = await File.findOne({});
            resolve(files);

        } catch (err) {

            reject(err);
        }
    });
}

//new mongoose model function.
const newFile = data => {
    return new Promise(async (resolve, reject) => {
        try {
            let file = await File.findOne({ name: data.name });
            if (!file) {

                const newFile = new File();
                newFile.name = data.name;
                newFile.extention = data.extention;

                const sales = [];
                for (let sale of data.data) {

                    let saleObject = await newSale(sale);
                    sales.push(saleObject._id);
                }
                newFile.data = sales;

                await newFile.save();

                resolve(newFile);
            } else reject({ err: true, status: 400, msg: 'File already exists : ' + data.name });
        } catch (err) {
            reject({ err: true, status: 500, msg: 'Server Error', result: err });
        }
    });
};


module.exports = {
    getFiles,
    newFile
};
