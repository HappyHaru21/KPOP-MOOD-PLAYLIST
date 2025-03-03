const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Mood API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new mood', async () => {
    const res = await request(app)
      .post('/api/moods')
      .send({
        mood: 'happy',
        note: 'Test note'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mood');
  });

  it('should get all moods', async () => {
    const res = await request(app).get('/api/moods');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
