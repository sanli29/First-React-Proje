const { newData, fillData } = require('../helpers/schemaFiller');
const File = require('../models/File');

const getFiles = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const files = await File.findOne({}).limit(1000);
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
                const { object, objectKeys } = await newData(new File());
                await fillData(object, objectKeys, data);
                await object.save();

                resolve(object);
            } else return reject({ err: true, msg: 'File already exists' });
        } catch (err) {
            reject(err);
        }
    });
};


module.exports = {
    getFiles,
    newFile
};
