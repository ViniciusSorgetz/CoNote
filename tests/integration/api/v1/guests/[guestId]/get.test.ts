import orchestrator from "tests/orchestrator.ts";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
}, 10000);

describe("GET /api/v1/guest/[guestId]", () => {
  describe("Anonymous user", () => {
    test("Getting guest data", async () => {
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

      const response2 = await fetch(
        `http://localhost:3000/api/v1/guests/${responseBody.createdGuest.id}`,
      );
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        guest: {
          id: response2Body.guest.id,
          folders: [
            {
              id: response2Body.guest.folders[0].id,
              name: "New Folder",
              guestId: response2Body.guest.id,
              folderId: null,
              folders: [],
              notes: [
                {
                  id: response2Body.guest.folders[0].notes[0].id,
                  title: "My note",
                  content: "# My note",
                  folderId: response2Body.guest.folders[0].id,
                },
              ],
            },
          ],
        },
      });
    }, 10000);

    test("Getting data from a guest that doesn't exist", async () => {
      const response3 = await fetch(
        `http://localhost:3000/api/v1/guests/b00e9661-9d46-47c0-8914-92b938321493`,
      );
      const response3Body = await response3.json();
      expect(response3Body).toEqual({
        error: "NotFoundError",
        message: "User not found",
        action: "Check if the request data is correct.",
        status_code: 404,
      });
    });
  });
});
