const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Profile Routes', async () => {
    it('should create a new profile and return a success response', async () => {
        const profileData = {
            "name": "test",
            "description": "test",
            "mbti": "INFP",
            "enneagram": "1w2",
            "variant": "test",
            "tritype": "test",
            "socionics": "test",
            "sloan": "test",
            "psyche": "test"
        };
        const response = await request(app)
            .post('/api/profile/add')
            .send(profileData);
        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should handle server errors and return an error response', async () => {
        const invalidData = {};
        const response = await request(app)
            .post('/api/profile/add')
            .send(invalidData);
            expect(response.status).to.equal(400);
            expect(response.body.status).to.equal('error');
            expect(response.body.message).to.equal('Server cannot process your request missing something');
    });

    it('should return user by id', async () => {
        const validProfileId = '65156eb65eb40cc73029f2a6';
        const response = await request(app).
            get(`/api/profile/${validProfileId}`)
        expect(response.status).to.equal(200);
    });

    it('should return not found if id not exist', async () => {
        const validProfileId = '65156eb65eb40cc73029f2a7';
        const response = await request(app).
            get(`/api/profile/${validProfileId}`)
        expect(response.status).to.equal(404);
    });
});
