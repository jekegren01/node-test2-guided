const supertest = require("supertest")
const { intersect } = require("../data/config")
const server = require("../server")
// bring this in for the afterAll funciton
const db = require("../data/config")

//run the seeds before every single test, so each one can have a fresh start
beforeEach(async () => {
    await db.seed.run()
})

//this is a jest hook that will run after all the tests in this file have ran
afterAll(async () => {
    // close the database connection before the test runner ends, to prevent any warnings about the leaks
    await db.destroy()
})

//testing an endpoint to access the database

describe("hobbits integration test", () => {
    it("gets a list of hobbits", async () => {
        const res = await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        // changed res.body to res.body.length  and toHaveLength to toBeGreaterThanOrEqual
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("sam")
    //challenge - create test for finding hobbit by id
    })
    it("gets hobbit by id", async () => {
        const res = await supertest(server).get("/hobbits/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("frodo")
    })

    it("returns error for a hobbit that doesnt exist", async () => {
        const res = await supertest(server).get("/hobbits/50")
        expect(res.statusCode).toBe(404)
    })

    it("creates a new hobbit", async () => {
        const res = await supertest(server)
            .post("/hobbits")
            .send({name: "bilbo"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("bilbo")
        //we dont know exactly what the new ID will be, just make sure something was generated
        expect(res.body.id).toBeDefined()
    })
})



