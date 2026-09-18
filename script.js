/**
 * Ceramic Waste Log — download site
 *
 * Points the two download buttons at the latest GitHub release so the site
 * never needs editing when a new version ships. If the GitHub API call
 * fails for any reason (offline, rate-limited, no matching asset), the
 * buttons keep their HTML fallback href — the releases page.
 */

(function () {
  var REPO = "Aatmanbho2429/worker-log";
  var API_URL = "https://api.github.com/repos/" + REPO + "/releases/latest";

  function formatSize(bytes) {
    if (!bytes) return "";
    var mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + " MB";
  }

  function findAsset(assets, test) {
    for (var i = 0; i < assets.length; i++) {
      if (test(assets[i].name)) return assets[i];
    }
    return null;
  }

  function applyRelease(release) {
    var assets = release.assets || [];
    var version = release.tag_name || "";

    var dmg = findAsset(assets, function (n) { return /\.dmg$/i.test(n); });
    var exe = findAsset(assets, function (n) { return /-setup\.exe$/i.test(n) && !/\.sig$/i.test(n); });

    var macBtn = document.querySelector("[data-mac-btn]");
    var macMeta = document.querySelector("[data-mac-meta]");
    var winBtn = document.querySelector("[data-win-btn]");
    var winMeta = document.querySelector("[data-win-meta]");

    if (dmg && macBtn) {
      macBtn.href = dmg.browser_download_url;
      if (macMeta) {
        macMeta.textContent =
          "Apple Silicon (M1 or newer) · " + version + (dmg.size ? " · " + formatSize(dmg.size) : "");
      }
    }

    if (exe && winBtn) {
      winBtn.href = exe.browser_download_url;
      if (winMeta) {
        winMeta.textContent =
          "Windows 10 / 11, 64-bit · " + version + (exe.size ? " · " + formatSize(exe.size) : "");
      }
    }
  }

  function highlightForOS() {
    var ua = navigator.userAgent || "";
    var isMac = /Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua);
    var isWin = /Windows/.test(ua);
    var macCard = document.querySelector("[data-mac-btn]");
    var winCard = document.querySelector("[data-win-btn]");
    if (isMac && macCard) macCard.closest(".download-card").style.borderColor = "var(--accent)";
    if (isWin && winCard) winCard.closest(".download-card").style.borderColor = "var(--accent)";
  }

  fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      if (!res.ok) throw new Error("GitHub API error " + res.status);
      return res.json();
    })
    .then(applyRelease)
    .catch(function () {
      /* keep the fallback links to the releases page */
    });

  highlightForOS();

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
