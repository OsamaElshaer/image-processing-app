const request = require("supertest");
const app = require("../../src/loaders/app");
const pool = require("../../src/loaders/postgres"); // Your PostgreSQL client

describe("AuthService Integration Tests", () => {
    beforeAll(async () => {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255),
            password_hash VARCHAR(255),
            reset_token VARCHAR(255),
            reset_token_expiry BIGINT
        );
        `);
    });

    afterAll(async () => {
        await pool.query("DROP TABLE IF EXISTS users");
        await pool.end();
    });
    const testUser = {
        name: "test user",
        email: "testusessssr@exmple.com",
        password: "W@33nvldn",
    };

    test("POST /api/users/signup - Should create a new user", async () => {
        const res = await request(app).post("/api/users/signup").send(testUser);
        expect(res.body.data.status).toBe(true);
        expect(res.body.data.user).toHaveProperty("id");
        expect(res.body.data.user.email).toBe(testUser.email);
    });

    test("POST /api/users/login - Should authenticate with correct credentials", async () => {
        const res = await request(app).post("/api/users/login").send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.body.data.status).toBe(true);
        expect(res.body.data).toHaveProperty("token");
    });
});


