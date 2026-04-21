const slider = document.getElementById("slider");
const value = document.getElementById("value");

chrome.storage.local.get(["sliderValue"], (result) => {
    const val = result.sliderValue ?? 50;
    slider.value = val;
    value.textContent = val + "%";
});

slider.addEventListener("input", async () => {
    const val = slider.value;
    value.textContent = val + "%";

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (tab) {
        browser.tabs.sendMessage(tab.id, {
            type: "SLIDER_UPDATE",
            value: val 
        });
    }
});

slider.addEventListener("change", () => {
    browser.storage.local.set({ sliderValue: slider.value });
});