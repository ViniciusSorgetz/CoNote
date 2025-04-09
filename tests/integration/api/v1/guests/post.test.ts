import orchestrator from "tests/orchestrator.ts";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
});

describe("POST /api/v1/guest/", () => {
  describe("Anonymous user", () => {
    test("Creating a guest", async () => {
      const response = await fetch("http://localhost:3000/api/v1/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        createdGuest: {
          id: responseBody.createdGuest.id,
          folders: [
            {
              id: responseBody.createdGuest.folders[0].id,
              name: "New Folder",
              guestId: responseBody.createdGuest.id,
              folderId: null,
              notes: [
                {
                  id: responseBody.createdGuest.folders[0].notes[0].id,
                  title: "My note",
                  content: "# My note",
                  folderId: responseBody.createdGuest.folders[0].id,
                },
              ],
            },
          ],
        },
      });
    }, 10000);
  });
});
