import orchestrator from "tests/orchestrator.ts";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
});

test("API first test", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  expect(responseBody).toEqual({ message: "hello" });
}, 10000);
