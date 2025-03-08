const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../js/server');
const hamModel = require('../models/hamModel');
const gmrsModel = require('../models/gmrsModel');
const digiModel = require('../models/digiModel');

const { expect } = chai;
chai.use(chaiHttp);

describe('API Endpoints', () => {
    before(async () => {
        // Connect to the database before running tests
        await mongoose.connect('mongodb://localhost:27017/signalScout', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    after(async () => {
        // Disconnect from the database after running tests
        await mongoose.disconnect();
    });

    describe('HAM Repeater Endpoints', () => {
        it('should GET all ham repeaters', (done) => {
            chai.request(server)
                .get('/api/ham_repeaters')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should POST a new ham repeater', (done) => {
            const newHamRepeater = {
                State: 'VA',
                City: 'Middleburg',
                Frequency: 146.520,
                Callsign: 'F4KE',
                Offset: '+0.6',
                Notes: 'Test repeater',
                lat: 38.9685,
                lon: -77.7368
            };
            chai.request(server)
                .post('/api/ham_repeaters')
                .send(newHamRepeater)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });

        it('should UPDATE an existing ham repeater', (done) => {
            const updatedHamRepeater = {
                State: 'VA',
                City: 'Middleburg',
                Frequency: 146.520,
                Callsign: 'F4KE',
                Offset: '+0.6',
                Notes: 'Updated repeater',
                lat: 38.9685,
                lon: -77.7368
            };
            hamModel.create(updatedHamRepeater).then((repeater) => {
                chai.request(server)
                    .put(`/api/ham_repeaters/${repeater._id}`)
                    .send(updatedHamRepeater)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('Notes').eql('Updated repeater');
                        done();
                    });
            });
        });

        it('should DELETE an existing ham repeater', (done) => {
            const newHamRepeater = {
                State: 'VA',
                City: 'Middleburg',
                Frequency: 146.520,
                Callsign: 'F4KE',
                Offset: '+0.6',
                Notes: 'Test repeater',
                lat: 38.9685,
                lon: -77.7368
            };
            hamModel.create(newHamRepeater).then((repeater) => {
                chai.request(server)
                    .delete(`/api/ham_repeaters/${repeater._id}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').eql('Ham repeater deleted');
                        done();
                    });
            });
        });
    });

    // GMRS Endpoint Tests

    // Digi Endpoint Tests
});