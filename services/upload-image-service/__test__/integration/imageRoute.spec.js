const request = require("supertest");
const path = require("path");
const app = require("../../src/loaders/app");
const pool = require("../../src/loaders/postgres");

describe("POST /api/images/upload", () => {
    let token;

    beforeAll(async () => {
        try {
            await pool.query("DELETE FROM images;");
        } catch (error) {
            console.error("Error cleaning up database:", error);
        }
        token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MmRiNzBhMy0wMGU5LTRhMTItODAzZC00NzE5NTFjODQ1MWUiLCJpYXQiOjE3MzkyMTM5MjQsImV4cCI6MTczOTI4NTkyNH0.-waJSk78-Ely8xnPlK6vUG3ipO9B9jJrzOvwLGVdXK4";
    });

    const processOption = JSON.stringify([
        { type: "resize", width: 500, height: 400 },
        { type: "compress", quality: 50 },
    ]);

    it("should upload an image successfully", (done) => {
        request(app)
            .post("/api/images/upload")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "multipart/form-data")
            .field("process_option", processOption)
            .attach(
                "image",
                path.resolve(__dirname, "..", "fixtures", "test-image.jpg")
            )
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty(
                    "message",
                    "Image uploaded successfully!"
                );
                expect(res.body).toHaveProperty("imageId");
                done();
            });
    });

    afterAll(async () => {
        await pool.end();
    });
});
