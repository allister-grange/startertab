const toggle = document.getElementById("switch");
const checked = await chrome.storage.sync.get("redirecting");
toggle.checked = checked.redirecting;

toggle.addEventListener("change", function (event) {
  event.preventDefault();

  if (event.target.checked) {
    chrome.storage.sync.set({ redirecting: true });
  } else {
    chrome.storage.sync.set({ redirecting: false });
  }
});
