async function checkRedirect() {
  const redirect = await chrome.storage.sync.get("redirecting");
  if (redirect.redirecting === false) {
    window.location.href = "https://google.com";
  }
}

checkRedirect();
