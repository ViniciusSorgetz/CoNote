import retry from "async-retry";

async function waitforAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(
        "http://localhost:3000/api/v1/guests/e9af1f3e-e3a4-4f74-91f9-403951c0f0bd",
      );
      await response.json();
    }
  }
}

const orchestrator = {
  waitforAllServices,
};

export default orchestrator;
