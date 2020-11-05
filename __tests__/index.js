const supertest = require("supertest")
const server = require("../server")

test("GET /", async () => {
    const res = await supertest(server).get("/")
    // console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to our API")
    //expect(res.body.message).toBeDefined
})

