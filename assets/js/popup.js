'use strict';

let el_error      = $('.app .result .error'),
    el_form       = $('.app .result .form'),
    el_form_copy  = $('.app .result .form .button'),
    el_form_input = $('.app .result .form .input'),
    el_loading    = $('.app .result .loading'),
    el_qr_a       = $('.app .result .qr-image a'),
    el_qr_img     = $('.app .result .qr-image img'),
    shrname       = 'https://shr.name/';

let App = {
    init: function(a) {
        el_form_input.attr('placeholder', App.langText('inputPlaceholder'))
    },
    inputCopyLink: function() {
        Func.copyToClipboard(el_form_input.value())
    },
    inputSelectLink: function() {
        el_form_input.select()
    },
    langText: function(a) {
        return chrome.i18n.getMessage('extension' + Func.capitalizeFirstLetter(a))
    },
    work: function(a) {
        let link = encodeURIComponent(a.url);

        if (link !== 'https://shr.name/') {
            let b = new XMLHttpRequest();
            b.open('GET', shrname + '_/api/?app=aAMHu&url=' + link, true);
            b.onreadystatechange = function() {
                if (b.readyState === 4) {
                    DOM.hide(el_error);
                    DOM.hide(el_form);
                    DOM.hide(el_loading);
                    el_qr_a.attr('href', el_qr_img.get('%default'));
                    el_qr_img.attr('src', el_qr_img.get('%default'));
                    let c = JSON.parse(b.responseText);
                    if (typeof c.error === 'undefined') {
                        el_form_input.value(c.result_url);
                        el_qr_a.attr('href', c.qr_url);
                        el_qr_img.attr('src', c.qr_url);
                        DOM.show(el_form);
                        App.inputSelectLink();
                    } else {
                        DOM.show(el_error);
                        el_error.html(App.langText('extensionError') + ': ' + c.description);
                    }
                }
            };
            b.send();
        } else {

        }
    }
};


let DOM = {
    hide: function(el) {
        el.removeClass('_shown').addClass('_hidden');
    },
    show: function(el) {
        el.removeClass('_hidden').addClass('_shown');
    }
};


let Func = {
    capitalizeFirstLetter: function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    },
    copyToClipboard: function(b) {
        let a = document.createElement('input');
        a.style.position = 'fixed';
        a.style.opacity = '0';
        a.value = b;
        document.body.appendChild(a);
        a.select();
        document.execCommand('Copy');
        document.body.removeChild(a)
    }
};


(function() {
    App.init();

    // shorten
    chrome.tabs.getSelected(null, function(a) {
        App.work(a);
    });

    // on input click - copy text
    el_form_copy.on('click', function() {
        App.inputCopyLink();
    });

    // on input focus - select text
    el_form_input.on('focus', function() {
        App.inputSelectLink();
    })
}());
