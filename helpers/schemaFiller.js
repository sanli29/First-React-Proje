const exceptedKeys = ['__v', '_id'];

const newData = object => {
    return new Promise(resolve => {
        const objectKeys = Object.keys(object.schema.paths).filter(
            item => !exceptedKeys.includes(item)
        );
        resolve({ object, objectKeys });
    });
};

const fillData = (object, object_keys, data) => {
    const [data_keys, data_values] = [Object.keys(data), Object.values(data)];
    object_keys.find(key => {
        if (data_keys.includes(key)) {
            if (data[key] === '') object[key] = undefined;
            else object[key] = data[key];
        }
    });
    return object;
};

module.exports = { newData, fillData };
