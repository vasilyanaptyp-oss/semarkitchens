/* vasylian cms.js: shows the texts, prices and photos the owner saved in the site's admin (site.com/admin).

   <script src="assets/js/cms.js" data-cms-api="https://vasylian-admin.<sub>.workers.dev" data-cms-site="<slug>" defer></script>

   Marks in the page (the page's own content stays the default: search engines read it, and it is what shows when the
   service cannot be reached):
     data-cms="key"            text; a text with line breaks keeps them
     data-cms-img="key"        <img> (inside a <picture> its <source> tags are dropped) or any element (background)
     data-cms-tel="key"        href="tel:..." from a phone number;   data-cms-mail="key": href="mailto:..."
     data-cms-list="key"       a list: the rendered items carry data-cms-item, and one <template data-cms-item> inside the
                               list holds an empty item with [data-cms-field="sub"], [data-cms-field-img="sub"] (or "." for
                               a list of plain lines)
   A value saved per language ({lv, ru}) is taken in the page's <html lang>; a language with no value keeps the default.
   ?cms=fresh in the address skips every cache (the admin's «Skatīt vietni» link). After it has applied the content the
   script sends the event "cms:applied" on document. Nothing here can run HTML from the content (text only). */
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me || !window.fetch) return;
  var api = (me.getAttribute('data-cms-api') || '').replace(/\/+$/, '');
  var site = me.getAttribute('data-cms-site') || '';
  if (!api || !/^[a-z0-9][a-z0-9-]{1,40}$/.test(site)) return;
  var lang = (document.documentElement.getAttribute('lang') || '').slice(0, 2).toLowerCase();
  // the site root, for the site's own photos ("assets/img/x.webp" in the content): data-cms-root, else two levels above this file
  var root = '';
  try { root = new URL(me.getAttribute('data-cms-root') || '../../', me.getAttribute('data-cms-root') ? location.href : me.src).href; } catch (e) { root = ''; }
  var fresh = /[?&]cms=fresh\b/.test(location.search);
  var store = null;
  try { store = window.localStorage; store.getItem('x'); } catch (e) { store = null; }
  var sb = store && store.getItem('cms:sb:' + site);
  var url = api + '/c/' + site + (fresh || sb ? '?' : '') + (fresh ? 'fresh=1' : '') + (fresh && sb ? '&' : '') + (sb ? 'sb=' + encodeURIComponent(sb) : '');
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function pick(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return Object.prototype.hasOwnProperty.call(v, lang) ? v[lang] : undefined;
    return v;
  }
  function setText(el, v) {
    v = pick(v);
    if (typeof v !== 'string' || v === '' || el.textContent === v) return;
    if (v.indexOf('\n') < 0) { el.textContent = v; return; }
    el.textContent = '';
    v.split('\n').forEach(function (line, i) {
      if (i) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(line));
    });
  }
  function imgSrc(v) {
    if (typeof v !== 'string') return '';
    if (/^\/i\/[a-z0-9-]+\/[A-Za-z0-9_-]{16,64}$/.test(v)) return api + v;
    if (root && /^assets\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_.-]+\.(?:webp|jpe?g|png|avif)$/.test(v)) return root + v;
    return '';
  }
  function setImg(el, v) {
    var src = imgSrc(pick(v));
    if (!src) return false;
    if (el.tagName === 'IMG') {
      if (el.getAttribute('src') === src) return;
      var pic = el.parentNode && el.parentNode.tagName === 'PICTURE' ? el.parentNode : null;
      if (pic) $$('source', pic).forEach(function (s) { s.parentNode.removeChild(s); });
      el.removeAttribute('srcset');
      el.removeAttribute('sizes');
      el.setAttribute('src', src);
    } else {
      el.style.backgroundImage = 'url("' + src + '")';
    }
    return true;
  }
  function setTel(el, v) {
    v = pick(v);
    if (typeof v !== 'string') return;
    var d = v.replace(/[^\d+]/g, '');
    if (d.replace(/\D/g, '').length >= 5) el.setAttribute('href', 'tel:' + d);
  }
  function setMail(el, v) {
    v = pick(v);
    if (typeof v === 'string' && /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(v)) el.setAttribute('href', 'mailto:' + v);
  }
  function fill(box, item) {
    $$('[data-cms-field]', box).concat(box.hasAttribute && box.hasAttribute('data-cms-field') ? [box] : []).forEach(function (el) {
      var k = el.getAttribute('data-cms-field');
      setText(el, k === '.' ? item : item && item[k]);
    });
    $$('[data-cms-field-img]', box).forEach(function (el) {
      if (!setImg(el, item && item[el.getAttribute('data-cms-field-img')])) el.hidden = true;     // an item with no photo
      var alt = el.getAttribute('data-cms-field-alt');
      if (alt) { var a = pick(item && item[alt]); if (typeof a === 'string') el.setAttribute('alt', a); }
    });
    $$('[data-cms-field-tel]', box).forEach(function (el) { setTel(el, item && item[el.getAttribute('data-cms-field-tel')]); });
  }
  function setList(box, items) {
    if (!Array.isArray(items) || !items.length) return;
    var tpl = box.querySelector('template[data-cms-item]');
    if (!tpl || !tpl.content) return;
    $$(':scope > [data-cms-item]:not(template)', box).forEach(function (el) { box.removeChild(el); });
    items.forEach(function (it) {
      var frag = tpl.content.cloneNode(true);
      Array.prototype.slice.call(frag.children).forEach(function (el) { el.setAttribute('data-cms-item', ''); fill(el, it); });
      box.insertBefore(frag, tpl);
    });
  }
  function apply(c) {
    var d = c && c.data;
    if (!d || typeof d !== 'object') return;
    $$('[data-cms]').forEach(function (el) { var k = el.getAttribute('data-cms'); if (k in d) setText(el, d[k]); });
    $$('[data-cms-img]').forEach(function (el) { var k = el.getAttribute('data-cms-img'); if (k in d) setImg(el, d[k]); });
    $$('[data-cms-tel]').forEach(function (el) { var k = el.getAttribute('data-cms-tel'); if (k in d) setTel(el, d[k]); });
    $$('[data-cms-mail]').forEach(function (el) { var k = el.getAttribute('data-cms-mail'); if (k in d) setMail(el, d[k]); });
    $$('[data-cms-list]').forEach(function (el) { var k = el.getAttribute('data-cms-list'); if (k in d) setList(el, d[k]); });
    try { document.dispatchEvent(new CustomEvent('cms:applied', { detail: c })); } catch (e) {}
  }
  function when(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true }); else fn(); }

  // a repeat visit shows the content seen last time at once; the fresh copy follows
  var KEY = 'cms:c:' + site + (sb ? ':' + sb : '');
  if (store && !fresh) {
    try { var old = JSON.parse(store.getItem(KEY) || 'null'); if (old) when(function () { apply(old); }); } catch (e) {}
  }
  var ctl = window.AbortController ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
  fetch(url, { mode: 'cors', credentials: 'omit', cache: fresh ? 'no-store' : 'default', signal: ctl ? ctl.signal : undefined })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (c) {
      clearTimeout(timer);
      if (store) { try { store.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
      when(function () { apply(c); });
    })
    .catch(function (e) {
      clearTimeout(timer);
      if (window.console) console.info('[cms] the page keeps its own content:', e && e.message || e);
    });
})();
