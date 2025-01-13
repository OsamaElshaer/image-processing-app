const request = require("supertest");
const app = require("../../src/loaders/app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../src/loaders/postgres"); // Your PostgreSQL client
const { v4: uuidv4 } = require("uuid");

// Mock bcrypt and jwt
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

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

    it("should sign up then log in a user successfully with valid credentials", async () => {
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("mock_jwt_token");

        const userData = {
            email: "test@example.com",
            password: "password123",
        };

        await pool.query(
            "INSERT INTO users (id, email, name, password_hash) VALUES ($1, $2, $3, $4)",
            [uuidv4(), userData.email, "Test User", "hashed_password"]
        );

        const response = await request(app)
            .post("/user/login")
            .send(userData)
            .expect(200);

        expect(response.body.msg).toBe("User logged in successfully");
        expect(response.body.data.token).toBe("mock_jwt_token");
    });
});
