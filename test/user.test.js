const app = require('../server');
const supertest = require('supertest');

//CREATE USER
test('POST /v1/user/a/', async () => {
    const data = {
        name: 'Test Nama',
        age: 24,
    };

    await supertest(app)
        .post('/v1/user/a')
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.data.name).toBe(data.name);
            expect(res.body.data.age).toBe(data.age);
        });
});

test('GET /v1/user/b/', async () => {
    await supertest(app)
        .get('/v1/user/b')
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test('GET /v1/user/c/:id', async () => {
    const data = {
        name: 'Test Nama 2',
        age: 24,
    };

    const createUser = await supertest(app).post('/v1/user/a').send(data);

    await supertest(app)
        .get('/v1/user/c/' + createUser.body.data.id)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe('object');
        });
});

test('PUT /v1/user/d/:id', async () => {
    const data = {
        name: 'Test Nama 3',
        age: 24,
    };

    const createUser = await supertest(app).post('/v1/user/a').send(data);

    const dataUpdate = {
        name: 'Test Update',
        age: 25,
    };

    await supertest(app)
        .put('/v1/user/d/' + createUser.body.data.id)
        .send(dataUpdate)
        .expect(200)
        .then((res) => {
            expect(res.body.message).toBe('Success updated a user');
        });
});

test('DELETE /v1/user/e/:id', async () => {
    const data = {
        name: 'Test Nama 4',
        age: 24,
    };

    const createUser = await supertest(app).post('/v1/user/a').send(data);

    await supertest(app)
        .delete('/v1/user/e/' + createUser.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.message).toBe('Success deleted the data');
        });
});
