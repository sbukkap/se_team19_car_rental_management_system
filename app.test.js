const express = require("express");
const supertest = require("supertest");
const router = require("./routes/login");
const mongoose = require("mongoose");
require("dotenv").config()
MONGO_URI = "mongodb+srv://hpass609:Hpass1234@cluster0.ekiwf4f.mongodb.net/HpassTask?retryWrites=true&w=majority"

const app = express();
app.use(express.json());
app.use("/api/v1/auth", router);


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(MONGO_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

describe("Login Routes", () => {
  it("should register a user", async () => {
    const newUser = { username:"testuser", email: "testuser@gmail.com", password: "testpassword", question1:"testUser", question2:"testUser" };
    const response = await supertest(app)
      .post("/api/v1/auth/register")
      .send(newUser);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

//   it("should log in a user", async () => {
//     const credentials = { email: "testuser@gmail.com", password: "testpassword" };
//     const response = await supertest(app)
//       .post("/api/v1/auth/login")
//       .send(credentials);
//     expect(response.status).toBe(200);
//     // Add more assertions as needed
//   });

  it("should delete the test user", async () => {
    const credentials = {email: "testuser@gmail.com"};
    const response = await supertest(app)
      .delete("/api/v1/auth/deleteUserForTest")
      .send(credentials);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
  // Add tests for other routes similarly
});
