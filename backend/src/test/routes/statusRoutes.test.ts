import request, { Response } from 'supertest';

const baseURL = 'http://localhost:3000';

describe('GET /status/server', () => {
	it('should return 200', async () => {
		const response = await request(baseURL).get('/status/server');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Running');
	});
});

describe('GET /status/mongo', () => {
	it('should return 200', async () => {
		const response = await request(baseURL).get('/status/mongo');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('connected');
	});
});
