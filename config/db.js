const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');
const uri = config.get('MongoURI');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log(`Mongo Connection: ${chalk.green(true)}`);
  } catch (err) {
    console.error(`Mongo Connection: ${false}\n${chalk.red(err.message)}`);
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB
};
