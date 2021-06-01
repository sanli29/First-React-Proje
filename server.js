const express = require('express');
const { connectMongoDB } = require('./config/DB');
const chalk = require('chalk');

const path = require('path');

const app = express();

connectMongoDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// serve static assets in production

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    ); // build/index.html from npm run build (react)
    // * = asterisk = anything
}

const PORT = process.env.PORT || 3349;

app.listen(PORT, () => {
    console.log(`API is on ${chalk.blue(PORT)}`);
})