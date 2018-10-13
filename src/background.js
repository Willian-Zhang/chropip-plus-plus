if (!document.pictureInPictureEnabled) {
    chrome.browserAction.setTitle({
        title: 'Picture-in-Picture NOT supported'
    });
} else {
    chrome.browserAction.onClicked.addListener(tab => {
        const code = `
            async function action(video) {
                if (video.hasAttribute('__pip__')) {
                    await document.exitPictureInPicture();
                } else {
                    await video.requestPictureInPicture();
                    video.setAttribute('__pip__', true);
                    video.addEventListener('leavepictureinpicture', event => {
                        video.removeAttribute('__pip__');
                    }, {
                        once: true
                    });
                }
            }
            
            
            (() => {
                let video_list = document.querySelectorAll('video');
                if (!video_list || video_list.length == 0) {
                    // Try to find from iframe
                    const iframe_list = document.querySelectorAll('iframe');
                    video_list = Array.from(iframe_list).map((_, i) => iframe_list.item(i).contentWindow.document.body.querySelector('video'))
                }
            
                video_list.forEach(video => {
                    if (video) {
                        action(video)
                    }
                });
            })();
      `;
        chrome.tabs.executeScript({
            code
        });
    });
}