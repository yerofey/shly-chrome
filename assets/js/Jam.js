let JamCore;
(function() {
    let f = function(h, g) {
        if (a.isString(h)) {
            this.e = null;
            this.s = h || null
        } else {
            if (a.isFunction(h)) {
                a.console('ready', 1);
                this.e = null;
                this.s = 'body';
                return this.ready(h)
            } else {
                if (h instanceof NodeList || h instanceof HTMLCollection) {} else {}
            }
        }
    };
    f.prototype = {
        _init: function() {
            this.e = b.d.querySelector(this.s)
        },
        addClass: function(g) {
            if (this.e.classList) {
                this.e.classList.add(g)
            } else {
                this.e.className += ' ' + g
            }
            if (e.e('.' + g)) {
                e.a(this.s, '.' + g)
            }
            return this
        },
        after: function(g) {
            this.e.insertAdjacentHTML('afterEnd', g);
            return this
        },
        animate: function() {},
        append: function(g) {
            this.e.insertAdjacentHTML('beforeEnd', g);
            return this
        },
        attr: function(h, g) {
            if (g !== undefined) {
                this.e.setAttribute(h, g);
                return this
            } else {
                return this.e.getAttribute(h)
            }
        },
        before: function(g) {
            this.e.insertAdjacentHTML('beforeBegin', g);
            return this
        },
        blur: function(g) {
            this.on('blur', g)
        },
        change: function(g) {
            this.on('change', g)
        },
        children: function() {
            return this.e.childNodes
        },
        click: function(g) {
            this.on('click', g)
        },
        clone: function(g) {
            return this.e.cloneNode(true)
        },
        closest: function(g) {
            let h = this.find(this.e);
            h.closest = h.closest || function(j) {
                let i = this;
                while (i) {
                    if (i.matches(j)) {
                        return i
                    } else {
                        i = i.parentElement
                    }
                }
                return null
            }
        },
        css: function(l, h) {
            let m, k;
            m = this.e.style;
            k = '';
            if (a.isObject(l)) {
                for (let j in l) {
                    let g = l[j];
                    k += j + ': ' + g + '; ';
                    this.e.style[j] = g
                }
            } else {
                k = l + ': ' + h;
                this.e.style[l] = h
            }
            return this
        },
        empty: function() {
            this.html('');
            return this
        },
        fadeIn: function(i, g) {
            let k = this.e;
            let m = 0;
            k.style.opacity = 0;
            k.style.filter = '';
            let h = +new Date();
            let j = function() {
                m += (new Date() - h) / 400;
                k.style.opacity = m;
                k.style.filter = 'alpha(opacity=' + (100 * m) | 0 + ')';
                h = +new Date();
                if (m < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(j)) || setTimeout(j, 16)
                }
            };
            j()
        },
        fadeOut: function() {},
        filter: function(g) {
            let j = this.findAll(this.e);
            let k = [];
            for (let h = j.length; h--;) {
                if (g(j[h])) {
                    k.unshift(j[h])
                }
            }
            return k
        },
        find: function(g) {
            return this.e.querySelectorAll(g)
        },
        findAll: function(g) {
            return document.querySelectorAll(g)
        },
        focus: function(g) {
            if (g !== undefined && a.isFunction(g)) {
                this.on('focus', g)
            } else {
                return this.e.focus()
            }
        },
        get: function(g) {
            if (a.contains(g, '@')) {
                this.attr(a.replace('@', '', g))
            } else {
                if (a.contains(g, '$')) {} else {
                    if (a.contains(g, '%')) {
                        this.get('@data-' + a.replace('%', '', g))
                    } else {
                        if (a.contains(g, '$$')) {} else {}
                    }
                }
            }
        },
        has: function(g) {},
        hasClass: function(g) {
            return this.e.classList.contains(g)
        },
        height: function(g) {
            return this.e.offsetHeight
        },
        hide: function() {
            this.css({
                display: 'none',
                visibility: 'hidden'
            });
            return this
        },
        hover: function(h, g) {
            this.mouseover(h);
            if (g !== undefined) {
                this.mouseout(g)
            }
            return this
        },
        html: function(g) {
            if (g === undefined) {
                return this.e.innerHTML
            }
            this.e.innerHTML = g;
            return this
        },
        is: function(g) {
            if (a.contains(g, '.')) {
                return a.matches(this.e, g)
            } else {
                if (this.e.querySelector(g) !== null) {
                    return true
                }
            }
            return false
        },
        mousemove: function(g) {
            this.on('mousemove', g)
        },
        mouseout: function(g) {
            this.on('mouseout', g)
        },
        mouseover: function(g) {
            this.on('mouseover', g)
        },
        next: function() {
            return this.e.nextElementSibling || a.nextSibling(this.e)
        },
        not: function() {},
        off: function(g) {
            a.eventHandler.unset(g, this.e)
        },
        offset: function() {},
        on: function(h, g) {
            a.eventHandler.set(h, g, this.e)
        },
        parent: function() {
            return this.e.parentNode
        },
        parents: function() {},
        position: function() {
            return {
                left: this.e.offsetLeft,
                top: this.e.offsetTop
            }
        },
        prepend: function(g) {
            this.e.insertAdjacentHTML('afterBegin', g);
            return this
        },
        prev: function() {
            return this.e.previousElementSibling || a.prevSibling(this.e)
        },
        prop: function() {},
        ready: function(g) {
            return this.on('DOMContentLoaded', g)
        },
        remove: function() {
            this.e.parentNode.removeChild(this.e);
            return this
        },
        removeAttr: function(g) {
            this.e.removeAttribute(g);
            return this
        },
        removeClass: function(g) {
            if (this.e.classList) {
                this.e.classList.remove(g)
            } else {
                this.e.className = a.replace(g, '', this.e.className)
            }
            if (e.e('.' + g)) {
                e.r(this.s, '.' + g)
            }
            return this
        },
        removeProp: function() {},
        replace: function(g) {
            this.e.outerHTML = g;
            return this
        },
        resize: function(g) {
            this.on('resize', g)
        },
        scroll: function(g) {
            this.on('scroll', g)
        },
        scrollLeft: function(g) {
            if (g !== undefined) {
                this.e.scrollLeft += g;
                return this.e
            } else {
                return this.e.scrollLeft
            }
        },
        scrollTop: function(g) {
            if (g !== undefined) {
                this.ready(function() {
                    this.e.scrollTop += g
                });
                return this.e
            } else {
                return this.e.scrollTop
            }
        },
        select: function() {
            return this.e.select()
        },
        set: function(h, g) {
            if (a.contains(h, '@')) {
                this.attr(g)
            } else {
                if (a.contains(h, '$')) {
                    let i = a.explode(' ', g)
                } else {
                    if (a.contains(h, '%')) {
                        this.set('@data-' + a.replace('%', '', h), g)
                    } else {
                        if (a.contains(h, '$$')) {
                            this.css(g)
                        } else {}
                    }
                }
            }
            return this
        },
        show: function() {
            this.css({
                display: 'block',
                visibility: 'visible'
            });
            return this
        },
        siblings: function() {
            let g = Array.prototype.slice.call(this.e.parentNode.children);
            for (let h = g.length; h--;) {
                if (g[h] === this.e) {
                    g.splice(h, 1);
                    break
                }
            }
        },
        size: function() {
            return this.e.length
        },
        submit: function(g) {
            this.on('submit', g)
        },
        text: function(g) {
            if (g === undefined) {
                return this.e.textContent || this.e.innerText
            } else {
                if (this.e.textContent !== undefined) {
                    this.e.textContent = g
                } else {
                    this.e.innerText = g
                }
            }
            return this
        },
        toggleClass: function(g) {
            this.e.classList.toggle(g);
            return this
        },
        value: function(g) {
            return (g !== undefined ? this.e.value = g : this.e.value)
        },
        width: function() {
            return this.e.offsetWidth
        }
    };
    let a = {
        console: function(h, g) {
            let k = new Date(this.timestamp());
            let j = k.getHours() + ':' + k.getMinutes() + ':' + this.pad(k.getSeconds(), 10);
            let i = ((this.timestamp() - c) / 1000).toFixed(3);
            return console.log(j + ' (' + i + ')' + (g === 1 ? ' | Jam.js' : '') + ' | ' + h)
        },
        contains: function(h, g) {
            return (h.indexOf(g) > -1) ? true : false
        },
        copyText: function(g) {
            JamCore(b.d).on('copy', function(h) {
                h.clipboardData.setData('Text', g);
                h.preventDefault()
            });
            b.d.execCommand('Copy');
            b.d.oncopy = undefined
        },
        each: function(h, g) {
            if (a.isFunction(g)) {
                h.forEach(g)
            }
        },
        eventHandler: {
            _: [],
            filter: function(g) {
                return this._.filter(function(h) {
                    return (h.e === g)
                }, g)[0]
            },
            set: function(h, i, g) {
                if (g === null || g === undefined) {
                    g = b.d
                }
                this.unset(h, g);
                g.addEventListener(h, i, false);
                this._.push({
                    c: i,
                    e: h,
                    t: g
                })
            },
            unset: function(i, g) {
                if (g === null) {
                    g = b.d
                }
                let h = this.filter(i);
                if (h !== undefined) {
                    g.removeEventListener(i, h.c, false)
                }
                this._ = this._.filter(function(j) {
                    return (j.e !== i)
                }, i)
            }
        },
        escapeRegexp: function(g) {
            return this.replace(g, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&')
        },
        equal: function(h, g) {
            return JSON.stringify(h) === JSON.stringify(g)
        },
        explode: function(h, g) {
            return g.split(h)
        },
        extend: function(h) {
            h = h || {};
            for (let l = 1; l < arguments.length; l++) {
                let g = arguments[l];
                if (!g) {
                    continue
                }
                for (let j in g) {
                    if (g.hasOwnProperty(j)) {
                        if (this.isObject(g[j])) {
                            h[j] = this.extend(h[j], g[j])
                        } else {
                            h[j] = g[j]
                        }
                    }
                }
            }
            return h
        },
        inArray: function(h, g) {
            for (let j = 0; j < h.length; j++) {
                if (h[j] === g) {
                    return j
                }
            }
            return -1
        },
        isArray: function(g) {
            return Array.isArray(g)
        },
        isBool: function(g) {
            return g === true || g === false
        },
        isDate: function(g) {
            return this.isObject(g) && !!g.getDay
        },
        isFunction: function(g) {
            return this.isType(g, 'function')
        },
        isNode: function(g) {
            return g && g.nodeType
        },
        isNumber: function(g) {
            return this.isType(g, 'number')
        },
        isObject: function(g) {
            return !!g && this.isType(g, 'object')
        },
        isString: function(g) {
            return this.isType(g, 'string')
        },
        isType: function(h, g) {
            return typeof h === g
        },
        isValue: function(g) {
            let h = typeof g;
            return h === 'object' ? !!(g && g.getDay) : (h === 'string' || h === 'number' || this.isBool(g))
        },
        keys: function(h) {
            let i = [];
            for (let g in h) {
                i.push(g)
            }
            return i
        },
        map: function(h, g) {
            if (this.isArray(h) && this.isFunction(g)) {
                h.map(g)
            }
        },
        matches: function(h, g) {
            let l = (h.matches || h.matchesSelector || h.msMatchesSelector || h.mozMatchesSelector || h.webkitMatchesSelector || h.oMatchesSelector);
            if (l) {
                return l.call(h, g)
            } else {
                let k = h.parentNode.querySelectorAll(g);
                for (let j = k.length; j--;) {
                    if (k[j] === h) {
                        return true
                    }
                }
                return false
            }
        },
        merge: function(h, g) {
            return h.concat(g)
        },
        nextSibling: function(g) {
            do {
                g = g.nextSibling
            } while (g && g.nodeType !== 1);
            return g
        },
        now: function() {
            return Date.now()
        },
        pad: function(h, g) {
            let i = (String(g).length - String(h).length) + 1;
            return i > 0 ? new Array(i).join('0') + h : h
        },
        parseHTML: function(g) {
            let h = b.d.implementation.createHTMLDocument();
            h.body.innerHTML = g;
            return h.body.children
        },
        parseJSON: function(g) {
            return JSON.parse(g)
        },
        prevSibling: function(g) {
            do {
                g = g.previousSibling
            } while (g && g.nodeType !== 1);
            return g
        },
        proxy: function(h, g) {
            return h.bind(g)
        },
        rand: function(h, g) {
            return Math.floor(Math.random() * (g - h + 1) + h)
        },
        replace: function(h, g, i) {
            return this.toString(i).replace(h, g != null ? g : '')
        },
        request: function(g) {},
        scroll: {
            disable: function() {
                let g = b.w.scrollX;
                let h = b.w.scrollY;
                b.w.onscroll = function() {
                    b.w.scrollTo(g, h)
                }
            },
            enable: function() {
                b.w.onscroll = function() {}
            }
        },
        stringify: function(g) {
            return JSON.stringify(g, null, 4)
        },
        styles: function(g) {
            if (this.isObject(g)) {
                let j = this.keys(g);
                for (let h = 0; h < j.length; h++) {
                    e._[j[h]] = g[j[h]]
                }
            }
        },
        template: function() {},
        then: function(g) {
            if (this.isFunction(g)) {
                g()
            }
        },
        timestamp: function() {
            return new Date().getTime()
        },
        toArray: function(g) {
            return Array.from(g)
        },
        toObject: function(h) {
            let g = {};
            for (let j = 0; j < h.length; ++j) {
                g[j] = h[j]
            }
            return g
        },
        toString: function(g) {
            return g != null ? '' + g : ''
        },
        trigger: function(g) {
            let h = b.d.createEvent('HTMLEvents');
            h.initEvent(g, true, false);
            this.e.dispatchEvent(h)
        },
        trim: function(g) {
            return this.replace(/^\s+|\s+$/g, '', g)
        },
        type: function(g) {
            return Object.prototype.toString.call(g).replace(/^\[object (.+)\]$/, '$1').toLowerCase()
        },
        uniqueID: function(h) {
            let g, k;
            g = '';
            k = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let j = 0; j < h; j++) {
                g += k.charAt(Math.floor(Math.random() * k.length))
            }
            return g
        },
        values: function(h) {
            let i = [];
            for (let g in h) {
                i.push(h[g])
            }
            return i
        }
    };
    let e = {
        _: {},
        a: function(g, h) {
            JamCore(g).css(this._[h])
        },
        e: function(g) {
            return this._[g] !== '!!undefined'
        },
        r: function(l, m) {
            let j = this._[m];
            let g = a.keys(j);
            for (let h = 0; h < g.length; h++) {
                JamCore(l).css(g[h], '')
            }
        }
    };
    let c = new Date().getTime();
    let d = '1.0.0';
    let b = {
        d: document,
        u: undefined,
        w: window
    };
    JamCore = function(h, g) {
        let i = new f(h, g);
        i._init();
        return i
    };
    if (window.$ == null) {
        window.$ = JamCore
    }
    if (window._ == null) {
        window._ = a
    }
}());