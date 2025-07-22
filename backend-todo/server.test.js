const request = require('supertest');
const {app,server,client} = require('./server')
const PORT = 5000;

const BACKEND_URL = `http://localhost:5000`;


describe('TODO API BASIC CHECKS',()=>{
    it('GET /tasks',async ()=>{
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async()=>{
        await app.locals.client?.quit?.();
        
        await server.close();
        await client.close();

    });
});

