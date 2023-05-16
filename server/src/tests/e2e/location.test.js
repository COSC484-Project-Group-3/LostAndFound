import supertest from 'supertest';
import { TestServer } from '../env/test.server.js';
import { MOCK_DATA } from '../../mock/location.data.js';

describe('Location', () => {
    let newLocationID = '';
    it('should be able to create a new location', async () => {
        const response = await supertest(TestServer.app).post('/api/locations/create').send(MOCK_DATA.NEW_VALID_LOCATION);
        expect(response.body).toBeTruthy();
        newLocationID = response.body._id;
        expect(response.status).toBe(201);
    });
    it('should be able to get a location by id', async () => {
        const response = await supertest(TestServer.app).get(`/api/locations/location/${newLocationID}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('should not be able to get a location with invalid id', async () => {
        const response = await supertest(TestServer.app).get(`/api/locations/location/${MOCK_DATA.INVALID_LOCATION_ID}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Location not found');
    });
    it('should be able to update a location', async () => {
        const response = await supertest(TestServer.app).patch(`/api/locations/update/${newLocationID}`).send(MOCK_DATA.UPDATED_VALID_LOCATION);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('should not be able to update a location with invalid id', async () => {
        const response = await supertest(TestServer.app).patch(`/api/locations/update/${MOCK_DATA.INVALID_LOCATION_ID}`).send(MOCK_DATA.UPDATED_VALID_LOCATION);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Location not found');
    });
    it('should be able to delete a location', async () => {
        const response = await supertest(TestServer.app).delete(`/api/locations/delete/${newLocationID}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Location deleted');
    });
    it('should not be able to delete a location with invalid id', async () => {
        const response = await supertest(TestServer.app).delete(`/api/locations/delete/${newLocationID}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Location not found');
    });
});
