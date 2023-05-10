async function toggle() {
  const toggle = document.getElementById("switch");
  const checked = await browser.storage.sync.get("redirecting");

  if (checked.redirecting === undefined) {
    browser.storage.sync.set({ redirecting: true });
    toggle.checked = true;
  } else {
    toggle.checked = checked.redirecting;
  }

  toggle.addEventListener("change", function (event) {
    event.preventDefault();

    if (event.target.checked) {
      browser.storage.sync.set({ redirecting: true });
    } else {
      browser.storage.sync.set({ redirecting: false });
    }
  });
}

toggle();
