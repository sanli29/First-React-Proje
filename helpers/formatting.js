const formatQuery = (object) => {
    return new Promise((resolve, reject) => {

        try {
            let newQuery = {};

            for (let key of Object.keys(object)) {
                console.log(key);

                switch (object[`${key}`].type) {
                    case 'Date':
                        newQuery[`${key}`] = {};
                        newQuery[`${key}`].$gte = new Date(object[`${key}`].$gte);
                        newQuery[`${key}`].$lte = new Date(object[`${key}`].$lte);
                        break;
                    case 'String':
                        newQuery[`${key}`] = object[`${key}`];
                        break;
                    case 'Number':
                        newQuery[`${key}`] = parseInt(object[`${key}`]);
                    case 'Float':
                        newQuery[`${key}`] = parseFloat(object[`${key}`]);
                    default:
                        newQuery[`${key}`] = object[`${key}`];
                        break;
                }
            }

            resolve(newQuery);
        } catch (err) {
            reject({ err: true, status: 500, msg: 'Server Error', result: err });
        }
    })
};

module.exports = {
    formatQuery
}