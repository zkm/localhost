window.onload = function () {
  function setContentAndRemoveLoading(elementId, content) {
    const elem = document.getElementById(elementId);
    if (elem) {
      elem.textContent = content;
      elem.classList.remove("loading");
    }
  }

  // Setting browser-specific data
  setContentAndRemoveLoading("browserInfo", navigator.userAgent);
  setContentAndRemoveLoading(
    "screenResolution",
    `${window.screen.width}x${window.screen.height}`
  );
  setContentAndRemoveLoading("platform", navigator.platform);

  // Fetching server data
  fetch("server-info.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.title = `Welcome to ${data.hostname}`;

      setContentAndRemoveLoading("serverMemory", data.memory);

      // Displaying formatted CPU Load values
      setContentAndRemoveLoading(
        "cpuLoad1Min",
        `1 min: ${data.cpuLoad["1 min"]}`
      );
      setContentAndRemoveLoading(
        "cpuLoad5Min",
        `5 min: ${data.cpuLoad["5 min"]}`
      );
      setContentAndRemoveLoading(
        "cpuLoad15Min",
        `15 min: ${data.cpuLoad["15 min"]}`
      );

      setContentAndRemoveLoading("serverUptime", data.uptime);

      // As hostname uses a class, handle it separately
      const hostnameElem = document.querySelector(".hostname");
      if (hostnameElem && data.hostname) {
        hostnameElem.textContent = data.hostname;
        hostnameElem.classList.remove("loading");
      }

      setContentAndRemoveLoading("kernelVersion", data.kernelVersion);
      setContentAndRemoveLoading("distro", data.distro);
    })
    .catch((error) => {
      console.error("There was a problem fetching server info:", error);
    });
};
