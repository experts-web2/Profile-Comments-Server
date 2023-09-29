const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Comments Routes', async () => {
    it('should create a new comment and return a success response', async () => {
        const commentData = {
            "profile_id": "6513e9b0078c52445312afd1",
            "title": "new",
            "description": "test",
            "user": "6513e8b2078c52445312afcf",
            "personalityVotes": {
                "MBTI": "",
                "Enneagram": "",
                "Zodiac": "test"
            }
        };
        const response = await request(app)
            .post('/api/comment/add')
            .send(commentData);
        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should handle server errors and return an error response', async () => {
        const invalidData = {};
        const response = await request(app)
            .post('/api/comment/add')
            .send(invalidData);
        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal('error');
        expect(response.body.message).to.equal('Server cannot process your request missing something');
    });

    it('should like a comment and return a success response with increment in likes', async () => {
        const commentData = {
            "comment_id": "6513ea9e078c52445312afd3",
            "increment": true
        };
        const response = await request(app)
            .post('/api/comment/like')
            .send(commentData);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
    });

    it('should like a comment and return a success response with decrement in likes', async () => {
        const commentData = {
            "comment_id": "6513ea9e078c52445312afd3",
            "increment": false
        };
        const response = await request(app)
            .post('/api/comment/like')
            .send(commentData);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
    });

    it('should return a error response if no comment_id to be like', async () => {
        const commentData = {
            "increment": false
        };
        const response = await request(app)
            .post('/api/comment/like')
            .send(commentData);
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Not found');
    });



    it('should sort comments on the basis of Recent', async () => {
        const body = {
            sort: 'Recent'
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should sort comments on the basis of Best', async () => {
        const body = {
            sort: 'Best'
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should filter personalityVotes=Zodiac  comments', async () => {
        const body = {
            "filter": "Zodiac",
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should filter ALL Comments if filter is All  comments', async () => {
        const body = {
            "filter": "All",
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should filter personalityVotes=Enneagram  comments', async () => {
        const body = {
            "filter": "Enneagram",
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should filter personalityVotes=MBTI  comments', async () => {
        const body = {
            "filter": "MBTI",
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });

    it('should filter personalityVotes=MBTI and sorty by Recent comments', async () => {
        const body = {
            "filter": "MBTI",
            "sort": "Recent"
        };
        const response = await request(app)
            .post('/api/comment/all')
            .send(body);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body).to.have.property('data');
    });
});
