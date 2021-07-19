// @ts-nocheck
"use strict";

const el_error = document.getElementById('error');
const el_form = document.getElementById('form');
const el_form_copy = document.getElementById('button');
const el_form_input = document.getElementById('input');
const el_loading = document.getElementById('loading');
const el_qr_a = document.getElementById('qr-link');
const el_qr_img = document.getElementById('qr-img');


const App = {
    init: function () {
        // generate default QR
        const qr = qrcode(0, 'M');
        qr.addData('https://shortly.is/');
        qr.make();
        document.getElementById('qr-code').innerHTML = qr.createImgTag(3);

        // init placeholder
        el_form_input.setAttribute('placeholder', App.langText("inputPlaceholder"));
    },
    inputCopyLink: function () {
        Func.copyToClipboard(el_form_input.value);
    },
    inputSelectLink: function () {
        el_form_input.focus();
        el_form_input.select();
    },
    langText: function (d) {
        return chrome.i18n.getMessage("extension" + Func.capitalizeFirstLetter(d));
    },
    work: function (d) {
        let link = encodeURIComponent(d.url);
        if (link !== "https://shortly.is/") {
            let b = new XMLHttpRequest();
            b.open("GET", "https://shortly.is/_/api/?app=aAMHu&url=" + link, true);
            b.onreadystatechange = function () {
                if (b.readyState === 4) {
                    DOM.hide(el_error);
                    DOM.hide(el_form);
                    DOM.hide(el_loading);

                    let c = JSON.parse(b.responseText);
                    if (typeof c.error === "undefined") {
                        el_form_input.value = c.result_url;

                        const qr = qrcode(0, 'M');
                        qr.addData(c.result_url);
                        qr.make();
                        document.getElementById('qr-code').innerHTML = qr.createImgTag(3);

                        DOM.show(el_form);
                        
                        App.inputSelectLink();
                    } else {
                        DOM.show(el_error);
                        el_error.innerHTML(App.langText("extensionError") + ": " + c.description);
                    }
                }
            };
            b.send();
        } else {
        }
    },
};

const DOM = {
    hide: function (element) {
        if (element.classList.contains('_shown')) {
            element.classList.remove('_shown');
        }
        element.classList.add('_hidden');
    },
    show: function (element) {
        if (element.classList.contains('_hidden')) {
            element.classList.remove('_hidden');
        }
        element.classList.add('_shown');
    },
};

const Func = {
    capitalizeFirstLetter: function (d) {
        return d.charAt(0).toUpperCase() + d.slice(1);
    },
    copyToClipboard: function (d) {
        let a = document.createElement('input');
        a.style.position = 'fixed';
        a.style.opacity = '0';
        a.value = d;
        document.body.appendChild(a);
        a.select();
        document.execCommand('Copy');
        document.body.removeChild(a);
    },
};

(function () {
    App.init();

    chrome.tabs.getSelected(null, function(currentPage) {
        App.work(currentPage);
    });

    el_form_copy.addEventListener('click', function() {
        App.inputCopyLink();
    });

    el_form_input.addEventListener('focus', function() {
        App.inputSelectLink();
    });
})();
