const toggle = document.getElementById("switch");
const checked = await chrome.storage.sync.get("redirecting");

if (checked.redirecting === undefined) {
  chrome.storage.sync.set({ redirecting: true });
  toggle.checked = true;
} else {
  toggle.checked = checked.redirecting;
}

toggle.addEventListener("change", function (event) {
  event.preventDefault();

  if (event.target.checked) {
    chrome.storage.sync.set({ redirecting: true });
  } else {
    chrome.storage.sync.set({ redirecting: false });
  }
});
