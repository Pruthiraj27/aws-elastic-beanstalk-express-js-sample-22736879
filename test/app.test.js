const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('should return Hello World!', async () => {
        const response = await request(app).get('/');

        if (response.statusCode !== 200) {
            throw new Error(`Expected status 200 but got ${response.statusCode}`);
        }

        if (response.text !== 'Hello World!') {
            throw new Error(`Expected "Hello World!" but got "${response.text}"`);
        }
    });
});
