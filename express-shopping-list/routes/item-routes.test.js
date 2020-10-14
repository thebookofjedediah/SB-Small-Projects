process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let pickles = { name: "Pickles", price: 2 };

beforeEach(function() {
  items.push(pickles);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});
// end afterEach

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  test("Gets a list of shopping list items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({items: [pickles]});
  });
});
// end

/** GET /items/[name] - return data about one item */

describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${pickles.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({item: pickles});
  });

  test("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/rice`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /items - create item from data */

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "jelly",
        price: 4
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: { name: "jelly", price: 4 }
    });
  });
});
// end

/** PATCH /items/[name] - update item */

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({
        name: "cucumbers",
        price: 1
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      item: { name: "cucumbers", price: 1 }
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Item deleted"}` */

describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${pickles.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
// end
