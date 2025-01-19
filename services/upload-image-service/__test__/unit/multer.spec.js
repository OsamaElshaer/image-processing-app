const upload = require("../../src/config/multer");

describe("Multer Configuration", () => {
    test("should store files in the uploads/ directory", (done) => {
        const req = {};
        const file = { originalname: "test.png" };
        const cb = (err, path) => {
            expect(path).toMatch(/^uploads\//);
            done();
        };
        upload.storage.getDestination(req, file, cb);
    });

    test("should reject non-image files", () => {
        const req = {};
        const file = { mimetype: "text/plain" };
        const cb = jest.fn();
        upload.fileFilter(req, file, cb);
        expect(cb).toHaveBeenCalledWith(
            new Error("Only image files are allowed!"),
            false
        );
    });
});
