require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");

describe("POST api/todos", () => {
  test("should create title", async () => {
    const response = await request(app).post("/api/todos").send({
      title: "Home",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Todo title created successfully");
  });

  test("should be error field cant be empty", async () => {
    const response = await request(app).post("/api/todos").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("is required");
  });

  test("shuld be error title field must be string", async () => {
    const response = await request(app).post("/api/todos").send({
      title: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a string");
  });
});

describe("POST api/todos/:group", () => {
  test("should create todo", async () => {
    const response = await request(app).post("/api/todos/1").send({
      name: "cooking",
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Todo created successfully");
  });

  test("should be error group must be number", async () => {
    const response = await request(app).get("/api/todos/one").send();
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error name field cant be empty", async () => {
    const response = await request(app).post("/api/todos/1").send({
      date: "2023-12-08:08:00",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("is required");
  });

  test("should be error name field must be string", async () => {
    const response = await request(app).post("/api/todos/1").send({
      name: 1230,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a string");
  });

  test("should be error date field must be date", async () => {
    const response = await request(app).post("/api/todos/1").send({
      name: "cooking",
      date: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be date");
  });

  test("should be error isCompleted field must be boolean", async () => {
    const response = await request(app).post("/api/todos/1").send({
      name: "cooking",
      isCompleted: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a boolean");
  });
});

describe("GET api/todos", () => {
  test("should get all todos", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNumber: 1,
      pageSize: 10,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test("shoud be error page number cant be empty", async () => {
    const response = await request(app).get("/api/todos").send({
      pageSize: 10,
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("does not exist");
  });

  test("shoud be error page size cant be empty", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNubeer: 1,
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("does not exist");
  });

  test("shoud be error page number must be number", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNumber: "one",
      pageSize: 10,
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("does not exist");
  });

  test("shoud be error page size must be number", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNumber: 1,
      pageSize: "ten",
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("does not exist");
  });

  test("shoud be error page number must be greater than 0", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNumber: 0,
      pageSize: 10,
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("OFFSET must not be negative");
  });

  test("should retrun empty array", async () => {
    const response = await request(app).get("/api/todos").send({
      pageNumber: 1,
      pageSize: 0,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });
});

describe("GET api/todos/:group", () => {
  test("should get todo by group", async () => {
    const response = await request(app).get("/api/todos/1").send();
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBe(null);
  });

  test("should be error group must be number", async () => {
    const response = await request(app).get("/api/todos/one").send();
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error group not found", async () => {
    const response = await request(app).get("/api/todos/999").send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Data not found");
  });
});

describe("PUT api/todos/:group", () => {
  test("should not found group", async () => {
    const response = await request(app).put("/api/todos/99999").send({
      title: "Home",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Data not found");
  });

  test("should update title", async () => {
    const response = await request(app).put("/api/todos/1").send({
      title: "Home",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("title updated successfully");
  });

  test("should be error id must be number", async () => {
    const response = await request(app).put("/api/todos/one").send({
      title: "Home",
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error title field cant be empty", async () => {
    const response = await request(app).put("/api/todos/1").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("is required");
  });

  test("should be error title field must be string", async () => {
    const response = await request(app).put("/api/todos/1").send({
      title: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a string");
  });
});

describe("PUT api/todos/:group/:id", () => {
  test("should be error group must be number", async () => {
    const response = await request(app).put("/api/todos/one/1").send({
      name: "cooking",
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error id must be number", async () => {
    const response = await request(app).put("/api/todos/1/one").send({
      name: "cooking",
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error id not found", async () => {
    const response = await request(app).put("/api/todos/1/999").send({
      name: "cooking",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Data not found");
  });

  test("should update todo", async () => {
    const response = await request(app).put("/api/todos/1/1").send({
      name: "cooking",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("todo updated successfully");
  });

  test("should be error name field must be string", async () => {
    const response = await request(app).put("/api/todos/1/1").send({
      name: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a string");
  });

  test("should be error date field must be date", async () => {
    const response = await request(app).put("/api/todos/1/1").send({
      name: "cooking",
      date: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be date");
  });

  test("should be error isCompleted field must be boolean", async () => {
    const response = await request(app).put("/api/todos/1/1").send({
      name: "cooking",
      isCompleted: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("must be a boolean");
  });
});

describe("DELETE api/todos/:group/:id", () => {
  test("should be error group must be number", async () => {
    const response = await request(app).delete("/api/todos/one/1").send();
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error id must be number", async () => {
    const response = await request(app).delete("/api/todos/1/one").send();
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error id not found", async () => {
    const response = await request(app).delete("/api/todos/1/999").send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Data not found");
  });

  test("should delete todo", async () => {
    const response = await request(app).delete("/api/todos/1/1").send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("todo deleted successfully");
  });
});

describe("DELETE api/todos/:group", () => {
  test("should be error group must be number", async () => {
    const response = await request(app).delete("/api/todos/one").send();
    expect(response.status).toBe(500);
    expect(response.body.message).toContain(
      "invalid input syntax for type integer"
    );
  });

  test("should be error group not found", async () => {
    const response = await request(app).delete("/api/todos/9999").send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Data not found");
  });

  test("should delete todo", async () => {
    const response = await request(app).delete("/api/todos/1").send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("todo deleted successfully");
  });
});
