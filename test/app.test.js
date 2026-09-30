const request = require('supertest');
const app = require('../app');

async function runTest() {
    const response = await request(app).get('/');

    if (response.statusCode !== 200) {
        throw new Error(`Expected status 200 but got ${response.statusCode}`);
    }

    if (response.text !== 'Hello World!') {
        throw new Error(`Expected "Hello World!" but got "${response.text}"`);
    }

    console.log('GET / test passed');
}

runTest()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
