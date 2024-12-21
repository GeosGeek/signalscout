const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');
const { expect } = require('chai');

// TODO: Import API endpoints as defined in server.js

before(async () => {
    // Setup mongodb connection before tests
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    // Cleanup mongodb connection after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('http://localhost:3000/api/ham_repeaters', () => {
    let createdRepeaterId;

    it('should create a new repeater (POST)', async () => {
        const res = await request(app)
            .post('http://localhost:3000/api/ham_repeaters')
            .send({
                State: 'VA',
                City: 'Middleburg',
                Frequency: '146.520',
                Callsign: 'IN5ULN',
                Offset: '+',
                Notes: '107',
                lat: 38.969,
                lon: -77.735,
            });
        
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        createdRepeaterId = res.body._id;
    });

    it('should get all repeaters (GET)', async () => {
        const res = await request(app).get('/api/ham_repeaters');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should update a repeater (PUT)', async () => {
        const res = await request(app)
            .put(`/api/ham_repeaters/${createdRepeaterId}`)
            .send({
                Frequency: 446.000,
            });

        expect(res.status).to.equal(200);
        expect(res.body.Frequency).to.equal(446.000);
    });

    it('should delete a ham repeater (DELETE)', async () => {
        const rest = await request(app)
            .delete(`/api/ham_repeaters/${createdRepeaterId}`);
        
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Data deleted successfully');
    });
});