
browser.storage.local.get(["sliderValue"], (result) => {
    const val = result.sliderValue ?? 50;

    document.documentElement.style.setProperty("--slider-value", val + "%");
});

browser.runtime.onMessage.addListener((message) => {
    if (message.type ==="SLIDER_UPDATE"){
            document.documentElement.style.setProperty("--slider-value", message.value + "%");
    }
})