document.getElementById("summarizeBtn").addEventListener("click", () => {
    const text = document.getElementById("textInput").value;
    if (text) {
      chrome.runtime.sendMessage({ action: "summarizeText", text }, (response) => {
        document.getElementById("result").innerText = response.summary;
      });
    } else {
      document.getElementById("result").innerText = "Please enter text.";
    }
  });
  