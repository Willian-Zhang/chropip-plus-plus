if (!document.pictureInPictureEnabled) {
    chrome.browserAction.setTitle({
        title: 'Picture-in-Picture NOT supported'
    });
} else {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.tabs.executeScript({ code });
    });
}