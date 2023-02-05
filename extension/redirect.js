async function checkRedirect() {
  const redirect = await chrome.storage.sync.get("redirecting");
  console.log(redirect);
  if (redirect.redirecting) {
    window.location.href = "https://www.startertab.com";
  } else {
    window.location.href = "https://google.com";
  }
}

checkRedirect();
