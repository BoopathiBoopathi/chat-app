import request from "supertest";
import app from "../src/server";
import mongoose from "mongoose";
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app-test');
});
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});
describe("Auth API", () => {
    it("registers and logs in user", async () => {
        const phone = Math.floor(Math.random() * 9000000000 +
            1000000000).toString();
        const res = await request(app).post("/api/auth/register").send({
            name:
                "Test", phone, password: "pass123"
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        const login = await request(app).post('/api/auth/login').send({
            phone,
            password: 'pass123'
        });
        expect(login.status).toBe(200);
        expect(login.body).toHaveProperty('token');
    });
});
