chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Assistant Extension Installed.");
  });
  
  async function processTextWithGemini(text) {
    try {
      const result = await chrome.ai.geminiNano.summarize({ text });
      return result.summary;
    } catch (error) {
      console.error("Error interacting with Gemini Nano API:", error);
      return "Error processing text with AI.";
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarizeText") {
      processTextWithGemini(request.text).then(summary => {
        sendResponse({ summary });
      });
      return true; // Keep the message channel open for async response
    }
  });
  chrome.runtime.sendMessage({ action: "summarizeText", text }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
      document.getElementById("result").innerText = "Failed to receive a response.";
    } else {
      document.getElementById("result").innerText = response.summary;
    }
  });
  