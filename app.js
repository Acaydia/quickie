(function () {
  "use strict";

  // ---- One-time setup: fill these in after creating your Lemon Squeezy product ----
  // See README.md "Setup" section for exactly where to find these.
  var CONFIG = {
    // e.g. "https://your-store.lemonsqueezy.com/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    checkoutUrl: window.SPEECH_WRITER_CHECKOUT_URL || "",
    price: window.SPEECH_WRITER_PRICE || "$8.99"
  };

  var OCCASIONS = [
    { value: "best-man", label: "Best Man Speech" },
    { value: "maid-of-honor", label: "Maid of Honor Speech" },
    { value: "groom", label: "Groom's Speech" },
    { value: "wedding-toast", label: "Wedding Toast (Guest)" },
    { value: "retirement", label: "Retirement Speech" },
    { value: "anniversary", label: "Anniversary Toast" },
    { value: "farewell", label: "Farewell / Goodbye Speech" }
  ];

  function $(sel, root) { return (root || document).querySelector(sel); }

  function buildForm(defaultOccasion) {
    var form = $("#speech-form");
    if (!form) return;

    var occasionSelect = $("#occasion", form);
    OCCASIONS.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      if (o.value === defaultOccasion) opt.selected = true;
      occasionSelect.appendChild(opt);
    });

    form.addEventListener("submit", onSubmit);
  }

  var state = {
    blob: null,
    nonce: null,
    token: null,
    preview: "",
    occasionLabel: "",
    honoreeName: ""
  };

  function setStatus(el, msg, kind) {
    el.textContent = msg || "";
    el.className = "status" + (kind ? " " + kind : "");
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = $("#generate-btn", form);
    var statusEl = $("#form-status", form);

    var payload = {
      occasion: $("#occasion", form).value,
      speakerName: $("#speaker-name", form).value.trim(),
      honoreeName: $("#honoree-name", form).value.trim(),
      relationship: $("#relationship", form).value.trim(),
      anecdotes: $("#anecdotes", form).value.trim(),
      tone: $("#tone", form).value,
      length: $("#length", form).value
    };

    if (!payload.honoreeName || !payload.speakerName) {
      setStatus(statusEl, "Please fill in both names.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Writing your speech…';
    setStatus(statusEl, "");

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("generate_failed");
        return res.json();
      })
      .then(function (data) {
        state.blob = data.blob;
        state.nonce = data.nonce;
        state.token = data.token;
        state.preview = data.preview;
        state.occasionLabel = labelFor(payload.occasion);
        state.honoreeName = payload.honoreeName;
        renderResult(data.preview);
      })
      .catch(function () {
        setStatus(statusEl, "Something went wrong generating your speech. Please try again.", "error");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Write My Speech";
      });
  }

  function labelFor(value) {
    var match = OCCASIONS.filter(function (o) { return o.value === value; })[0];
    return match ? match.label : "Speech";
  }

  function renderResult(previewText) {
    var result = $("#result");
    var previewEl = $("#preview-text");
    previewEl.textContent = previewText;
    $("#unlock-price").textContent = CONFIG.price;
    result.style.display = "block";
    result.scrollIntoView({ behavior: "smooth", block: "start" });

    $("#unlock-btn").onclick = startCheckout;
  }

  function startCheckout() {
    if (!CONFIG.checkoutUrl) {
      alert("Checkout isn't configured yet. Set window.SPEECH_WRITER_CHECKOUT_URL — see README.md.");
      return;
    }

    var url = CONFIG.checkoutUrl +
      (CONFIG.checkoutUrl.indexOf("?") === -1 ? "?" : "&") +
      "embed=1" +
      "&checkout[custom][nonce]=" + encodeURIComponent(state.nonce) +
      "&checkout[custom][token]=" + encodeURIComponent(state.token);

    if (window.LemonSqueezy && window.LemonSqueezy.Url) {
      window.LemonSqueezy.Url.Open(url);
    } else {
      window.open(url, "_blank", "noopener");
    }
  }

  function onCheckoutSuccess(event) {
    try {
      var order = event && event.data && event.data.order && event.data.order.data;
      var orderId = order && order.id;
      if (!orderId) return;
      unlockSpeech(orderId);
    } catch (err) {
      console.error("Could not read checkout event", err);
    }
  }

  function unlockSpeech(orderId) {
    var statusEl = $("#unlock-status");
    setStatus(statusEl, "Verifying your payment…");

    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        blob: state.blob,
        nonce: state.nonce,
        token: state.token
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("unlock_failed");
        return res.json();
      })
      .then(function (data) {
        showFullSpeech(data.fullText);
      })
      .catch(function () {
        setStatus(statusEl, "We couldn't verify that payment yet. If you were just charged, wait a few seconds and it should unlock — otherwise contact support.", "error");
      });
  }

  function showFullSpeech(fullText) {
    $("#preview-wrap").classList.remove("fade-edge");
    $("#preview-text").textContent = fullText;
    $("#unlock-box").style.display = "none";
    $("#unlocked-actions").style.display = "flex";
    setStatus($("#unlock-status"), "Unlocked! Your full speech is ready below.", "success");

    $("#copy-btn").onclick = function () {
      navigator.clipboard.writeText(fullText).then(function () {
        $("#copy-btn").textContent = "Copied!";
        setTimeout(function () { $("#copy-btn").textContent = "Copy Text"; }, 1500);
      });
    };

    $("#download-txt-btn").onclick = function () {
      downloadFile(fullText, fileNameFor("txt"), "text/plain");
    };

    $("#download-pdf-btn").onclick = function () {
      downloadPdf(fullText);
    };
  }

  function fileNameFor(ext) {
    var name = (state.honoreeName || "speech").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return name + "-" + state.occasionLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "." + ext;
  }

  function downloadFile(text, filename, mime) {
    var blob = new Blob([text], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadPdf(text) {
    if (!window.jspdf) {
      alert("PDF export is loading, please try again in a moment.");
      return;
    }
    var doc = new window.jspdf.jsPDF({ unit: "pt", format: "letter" });
    var margin = 56;
    var pageHeight = doc.internal.pageSize.getHeight();
    var maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    var lineHeight = 13 * 1.5;
    var lines = doc.splitTextToSize(text, maxWidth);
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    var y = margin + 10;
    for (var i = 0; i < lines.length; i++) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin + 10;
      }
      doc.text(lines[i], margin, y);
      y += lineHeight;
    }
    doc.save(fileNameFor("pdf"));
  }

  window.addEventListener("DOMContentLoaded", function () {
    var defaultOccasion = document.body.getAttribute("data-default-occasion") || "";
    buildForm(defaultOccasion);

    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
    if (window.LemonSqueezy && window.LemonSqueezy.Setup) {
      window.LemonSqueezy.Setup({
        eventHandler: function (event) {
          if (event && event.event === "Checkout.Success") {
            onCheckoutSuccess(event);
          }
        }
      });
    }
  });
})();
