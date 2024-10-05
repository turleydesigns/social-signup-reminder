chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveSocialChoice') {
    chrome.storage.local.set({ [request.domain]: request.choice }, () => {
      sendResponse({ success: true });
    });
    return true; // Indicates that the response is asynchronous
  } else if (request.action === 'getSocialChoice') {
    chrome.storage.local.get(request.domain, (result) => {
      sendResponse({ choice: result[request.domain] });
    });
    return true; // Indicates that the response is asynchronous
  }
});