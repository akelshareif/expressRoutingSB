process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDB');

beforeEach(() => {
    items.push({
        name: 'popsicle',
        price: 1.45,
    });
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('Get an array of shopping items', async () => {
        const res = await request(app).get('/items');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toEqual(
            expect.arrayContaining([
                {
                    name: 'popsicle',
                    price: 1.45,
                },
            ])
        );
    });
});

describe('POST /items', () => {
    test('Creates a new shopping item', async () => {
        const res = await request(app).post('/items').send({
            name: 'chocolate',
            price: 0.99,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
            expect.objectContaining({
                added: {
                    name: 'chocolate',
                    price: 0.99,
                },
            })
        );
    });
});

describe('PATCH /items/:name', () => {
    test('Updates shopping item name', async () => {
        const res = await request(app).patch('/items/popsicle').send({
            name: 'ice-cream',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
            expect.objectContaining({
                updated: {
                    name: 'ice-cream',
                    price: 1.45,
                },
            })
        );
    });

    test('Updates shopping item price', async () => {
        const res = await request(app).patch('/items/popsicle').send({
            price: 2.99,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
            expect.objectContaining({
                updated: {
                    name: 'popsicle',
                    price: 2.99,
                },
            })
        );
    });

    test('Updates entire shopping item', async () => {
        const res = await request(app).patch('/items/popsicle').send({
            name: 'ice-cream',
            price: 2.99,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
            expect.objectContaining({
                updated: {
                    name: 'ice-cream',
                    price: 2.99,
                },
            })
        );
    });
});

describe('DELETE /items/:name', () => {
    test('Deletes a single item', async () => {
        const res = await request(app).delete('/items/popsicle');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
            expect.objectContaining({
                message: 'Deleted',
            })
        );
    });
});
