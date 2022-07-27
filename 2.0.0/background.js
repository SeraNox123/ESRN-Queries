var applicantPort;
var queryApplicantPort;
var queryRelativePort;
var relativePort;

chrome.runtime.onConnect.addListener(function (port) {
  switch (port.name) {
    case 'applicant': {
      applicantPort = port;
      break;
    }
    case 'queryApplicant': {
      queryApplicantPort = port;
      queryApplicantPort.onMessage.addListener(function (message) {
        console.log(message);
        if (message.message === "first query closed") {
          applicantPort.postMessage({ confirmation: "first query closed" })
        } else {
          applicantPort.postMessage({ confirmation: "query closed" });
        }
      })
      break;
    }
    case 'queryRelative': {
      queryRelativePort = port;
      queryRelativePort.onMessage.addListener(function (message) {
        if (message.message === "first query closed") {
          relativePort.postMessage({ confirmation: "first query closed" })
        } else {
          relativePort.postMessage({ confirmation: "query closed" });
        }
      })
      break;
    }
    case 'relative': {
      relativePort = port;
      relativePort.onMessage.addListener(function () {
        applicantPort.postMessage({ confirmation: "relative closed" });
      })
      break;
    }
  }
});