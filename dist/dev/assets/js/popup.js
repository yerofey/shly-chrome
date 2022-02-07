// @ts-nocheck
"use strict";

const el_error = document.getElementById("error");
const el_form = document.getElementById("form");
const el_form_copy = document.getElementById("button");
const el_form_input = document.getElementById("input");
const el_loading = document.getElementById("loading");
const el_qr_a = document.getElementById("qr-link");
const el_qr_img = document.getElementById("qr-img");

const App = {
  init: function () {
    // generate default QR
    const qr = qrcode(0, "Q");
    qr.addData("https://shortly.is/");
    qr.make();
    document.getElementById("qr-code").innerHTML = qr.createImgTag(4);

    // init placeholder
    el_form_input.setAttribute("placeholder", App.langText("inputPlaceholder"));
  },
  inputCopyLink: function () {
    Func.copyToClipboard(el_form_input.value);
  },
  inputSelectLink: function () {
    el_form_input.focus();
    el_form_input.select();
  },
  langText: function (name) {
    return chrome.i18n.getMessage(
      Func.capitalizeFirstLetter(name)
    );
  },
  shorten: function (page) {
    let urlObject = {};
    let urlIsValid = true;
    try {
      urlObject = new URL(page.url);
    } catch (e) {
      console.error(e);
      urlIsValid = false;
    }

    // console.log("link", page.url);
    // console.log("object", urlObject);

    if (
      urlIsValid &&
      ["https:", "http:"].includes(urlObject.protocol) &&
      !["shortly.is", "shly.link"].includes(urlObject.domain)
    ) {
      FingerprintJS.load().then((fp) => {
        fp.get().then((result) => {
          const visitorId = result.visitorId;
          const link = encodeURIComponent(page.url);
          const request = new XMLHttpRequest();
          request.open(
            "GET",
            `https://shortly.is/_/api/?app=aAMHu&fp=${visitorId}&url=${link}`,
            true
          );
          request.onreadystatechange = function () {
            if (request.readyState === 4) {
              DOM.hide(el_error);
              DOM.hide(el_form);
              DOM.hide(el_loading);

              const result = JSON.parse(request.responseText);
              if (typeof result.error === "undefined") {
                el_form_input.value = result.result_url;

                const qr = qrcode(0, "Q");
                qr.addData(result.result_url);
                qr.make();
                document.getElementById("qr-code").innerHTML =
                  qr.createImgTag(4);

                DOM.show(el_form);

                App.inputSelectLink();
              } else {
                DOM.hide(el_loading);
                DOM.show(el_error);
                el_error.innerHTML = App.langText("extensionError") + ": " + result.description;
              }
            }
          };
          request.send();
        });
      });
    } else {
      DOM.hide(el_loading);
      DOM.show(el_error);
      el_error.innerHTML = App.langText("extensionError") + ": " + App.langText('extensionErrorParseUrl');
    }
  },
};

const DOM = {
  hide: function (element) {
    if (element.classList.contains("_shown")) {
      element.classList.remove("_shown");
    }
    element.classList.add("_hidden");
  },
  show: function (element) {
    if (element.classList.contains("_hidden")) {
      element.classList.remove("_hidden");
    }
    element.classList.add("_shown");
  },
};

const Func = {
  capitalizeFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  copyToClipboard: function (string) {
    let el = document.createElement("input");
    el.style.position = "fixed";
    el.style.opacity = "0";
    el.value = string;
    document.body.appendChild(el);
    el.select();
    document.execCommand("Copy");
    document.body.removeChild(el);
  },
};

(function () {
  App.init();

  chrome.tabs.getSelected(null, function (currentPage) {
    App.shorten(currentPage);
  });

  el_form_copy.addEventListener("click", function () {
    App.inputCopyLink();
  });

  el_form_input.addEventListener("focus", function () {
    App.inputSelectLink();
  });
})();
