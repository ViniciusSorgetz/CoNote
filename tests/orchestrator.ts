import retry from "async-retry";

async function waitforAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage);

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      await response.json();
    }
  }
}

const orchestrator = {
  waitforAllServices,
};

export default orchestrator;
