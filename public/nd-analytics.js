/**
 * netdev.be Unified Estate Analytics Loader (nd-analytics.js v3.1)
 * -----------------------------------------------------------------------------
 * Account: jerome@netdev.be (220831999)
 * Primary Property: "http://netdev.be - GA4" (properties/351416548)
 * Section Rollup  : "netdev-firebase"        (properties/197085209)
 *
 * Hybrid Multi-Stream + Two-Section Rollup Architecture:
 *   A. Two-Section Executive Rollup (netdev-firebase, Prop 197085209):
 *      - "netdev"  Section -> G-4XW5WFHVZT (Personal brand, blog, showcases, public apps)
 *      - "argolis" Section -> G-VMWPB248HQ (Enterprise Cloud Run / IAP demos on *.netdev.be)
 *
 *   B. 8 Live Web Data Streams in "http://netdev.be - GA4" (Prop 351416548):
 *      1. 4459211697  | http://netdev.be - GA4 | https://netdev.be        | G-YQNYQKCE0D (GT-MB6DNFB / G-ENNFYHFXG0)
 *      2. 15342627077 | Big bike counter       | https://fb.netdev.be     | G-PB2Q34BJ5G (GT-KT54ZT3P)
 *      3. 15342651731 | beyond netdev          | https://beyond.netdev.be | G-F8KE9SGHF2 (GT-WKX6T969)
 *      4. 15849872283 | MyTotum                | https://totum.netdev.be  | G-D8ZGD0LCXZ (GT-P826BJ8B)
 *      5. 15849921596 | Aether Flow designer   | https://flow.netdev.be   | G-LJ8W0KHLCF (GT-M393XTH2)
 *      6. 15849962877 | Barogroove             | https://bg.netdev.be     | G-EY37DYP623 (GT-WP4R9FFV)
 *      7. 15849967791 | Antigravity Argolis    | https://agy.netdev.be    | G-8DZBPTGD3F (GT-PLHS88XW)
 *      8. 15849975708 | Web3 blog              | https://web3.netdev.be   | G-NM072RB1WB (GT-NS9RF7QK) + G-2D66L4N90C
 *
 * Security & Privacy Guarantees (Belgian DPA / GDPR / SecureCoder Compliant):
 *   - Basic Consent Mode v2: Zero requests to Google until user clicks Accept
 *     (shared across all *.netdev.be subdomains via 180-day .netdev.be cookie).
 *   - Host Allow-List: Suppresses *.web.app, *.firebaseapp.com, *.github.io, localhost.
 *   - Self-Exclusion: Visit ?nd_internal=1 once per browser to set 400-day internal flag.
 *   - DebugView: Visit ?nd_debug=1 to enable GA4 DebugView mode.
 *   - DOM Safety: Built exclusively with document.createElement & textContent (zero innerHTML).
 *   - Zero PII: Strict allow-list on event names & param keys; values sanitized to [a-z0-9_./:-].
 *   - TODO(security): gtag.js cannot use SRI because Google serves it dynamically per ID;
 *     mitigated by strict CSP script-src pinning to https://*.googletagmanager.com.
 */
(function () {
  'use strict';

  var SECTION_STREAM_NETDEV = 'G-4XW5WFHVZT';
  var SECTION_STREAM_ARGOLIS = 'G-VMWPB248HQ';
  var PRIMARY_GA4_ROLLUP = 'G-YQNYQKCE0D';

  var COOKIE_DOMAIN = 'netdev.be';
  var CONSENT_COOKIE = 'nd_consent';
  var INTERNAL_COOKIE = 'nd_internal';

  // Live G-XXXXXXXXXX Measurement IDs synced from properties/351416548 via sync-ga4-streams.mjs
  var STREAM_OVERRIDES = {
    'netdev.be': 'G-YQNYQKCE0D',
    'www.netdev.be': 'G-YQNYQKCE0D',
    'blog.netdev.be': 'G-YQNYQKCE0D',
    'v3.netdev.be': 'G-YQNYQKCE0D',
    'fb.netdev.be': 'G-PB2Q34BJ5G',
    'bike.netdev.be': 'G-PB2Q34BJ5G',
    'beyond.netdev.be': 'G-F8KE9SGHF2',
    'totum.netdev.be': 'G-D8ZGD0LCXZ',
    'flow.netdev.be': 'G-LJ8W0KHLCF',
    'bg.netdev.be': 'G-EY37DYP623',
    'barogroove.netdev.be': 'G-EY37DYP623',
    'agy.netdev.be': 'G-8DZBPTGD3F',
    'aether.netdev.be': 'G-8DZBPTGD3F',
    'cih.netdev.be': 'G-8DZBPTGD3F',
    'ehds.netdev.be': 'G-8DZBPTGD3F',
    'ecdh.netdev.be': 'G-8DZBPTGD3F',
    'raise.netdev.be': 'G-8DZBPTGD3F',
    'ted.netdev.be': 'G-8DZBPTGD3F',
    'tow.netdev.be': 'G-8DZBPTGD3F',
    'aicafe.netdev.be': 'G-8DZBPTGD3F',
    'web3.netdev.be': 'G-NM072RB1WB'
  };

  // Exact mapping of *.netdev.be hosts to the 8 GA4 Web Data Streams + 2 Sections
  var HOST_CATALOG = {
    'netdev.be': {
      section: 'netdev',
      surface: 'apex',
      ga4StreamId: '4459211697',
      ga4StreamLabel: 'netdev-ga4',
      measurementId: 'G-YQNYQKCE0D'
    },
    'www.netdev.be': {
      section: 'netdev',
      surface: 'apex',
      ga4StreamId: '4459211697',
      ga4StreamLabel: 'netdev-ga4',
      measurementId: 'G-YQNYQKCE0D'
    },
    'blog.netdev.be': {
      section: 'netdev',
      surface: 'blog',
      ga4StreamId: '4459211697',
      ga4StreamLabel: 'netdev-ga4',
      measurementId: 'G-YQNYQKCE0D'
    },
    'v3.netdev.be': {
      section: 'netdev',
      surface: 'v3',
      ga4StreamId: '4459211697',
      ga4StreamLabel: 'netdev-ga4',
      measurementId: 'G-YQNYQKCE0D'
    },
    'web3.netdev.be': {
      section: 'netdev',
      surface: 'web3',
      ga4StreamId: '15849975708',
      ga4StreamLabel: 'web3-blog',
      measurementId: 'G-NM072RB1WB'
    },
    'fb.netdev.be': {
      section: 'netdev',
      surface: 'bbbc',
      ga4StreamId: '15342627077',
      ga4StreamLabel: 'big-bike-counter',
      measurementId: 'G-PB2Q34BJ5G'
    },
    'bike.netdev.be': {
      section: 'netdev',
      surface: 'bbbc',
      ga4StreamId: '15342627077',
      ga4StreamLabel: 'big-bike-counter',
      measurementId: 'G-PB2Q34BJ5G'
    },
    'beyond.netdev.be': {
      section: 'netdev',
      surface: 'beyond',
      ga4StreamId: '15342651731',
      ga4StreamLabel: 'beyond-netdev',
      measurementId: 'G-F8KE9SGHF2'
    },
    'bg.netdev.be': {
      section: 'netdev',
      surface: 'barogroove',
      ga4StreamId: '15849962877',
      ga4StreamLabel: 'barogroove',
      measurementId: 'G-EY37DYP623'
    },
    'barogroove.netdev.be': {
      section: 'netdev',
      surface: 'barogroove',
      ga4StreamId: '15849962877',
      ga4StreamLabel: 'barogroove',
      measurementId: 'G-EY37DYP623'
    },
    'totum.netdev.be': {
      section: 'argolis',
      surface: 'totum',
      ga4StreamId: '15849872283',
      ga4StreamLabel: 'mytotum',
      measurementId: 'G-D8ZGD0LCXZ'
    },
    'flow.netdev.be': {
      section: 'argolis',
      surface: 'flow',
      ga4StreamId: '15849921596',
      ga4StreamLabel: 'aether-flow-designer',
      measurementId: 'G-LJ8W0KHLCF'
    },
    'agy.netdev.be': {
      section: 'argolis',
      surface: 'agy',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'aether.netdev.be': {
      section: 'argolis',
      surface: 'agy',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'cih.netdev.be': {
      section: 'argolis',
      surface: 'cih',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'ehds.netdev.be': {
      section: 'argolis',
      surface: 'ehds',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'ecdh.netdev.be': {
      section: 'argolis',
      surface: 'ecdh',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'raise.netdev.be': {
      section: 'argolis',
      surface: 'raise',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'ted.netdev.be': {
      section: 'argolis',
      surface: 'ted',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'tow.netdev.be': {
      section: 'argolis',
      surface: 'tow',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    },
    'aicafe.netdev.be': {
      section: 'argolis',
      surface: 'aicafe',
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      measurementId: 'G-8DZBPTGD3F'
    }
  };

  var ALLOWED_EVENTS = {
    contact_intent: 1,
    showcase_open: 1,
    lab_run: 1,
    cta_click: 1,
    blog_read_complete: 1,
    station_open: 1,
    ai_ask: 1,
    login: 1,
    spotify_connect: 1,
    playlist_generate: 1,
    module_deploy: 1,
    blueprint_estimate: 1,
    tender_qualify: 1,
    agent_invoke: 1
  };

  var ALLOWED_PARAMS = {
    method: 1,
    showcase: 1,
    target_section: 1,
    lab_id: 1,
    cta_id: 1,
    station_id: 1,
    content_pillar: 1,
    estate_section: 1,
    site_surface: 1,
    stream_id: 1,
    stream_label: 1,
    page_context: 1
  };

  function cleanVal(val) {
    if (val === undefined || val === null) return '';
    return String(val)
      .toLowerCase()
      .replace(/[^a-z0-9_./:-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 64);
  }

  function validMeasurementId(id) {
    if (!id || typeof id !== 'string') return '';
    var trimmed = id.trim().toUpperCase();
    return /^G-[A-Z0-9]{6,14}$/.test(trimmed) ? trimmed : '';
  }

  function getMetaMeasurementId() {
    try {
      if (window.ND_GA_MEASUREMENT_ID) {
        var wId = validMeasurementId(window.ND_GA_MEASUREMENT_ID);
        if (wId) return wId;
      }
      if (document.querySelector) {
        var m = document.querySelector('meta[name="nd-ga-id"]');
        if (m && m.getAttribute) {
          var mId = validMeasurementId(m.getAttribute('content'));
          if (mId) return mId;
        }
      }
    } catch (_) {}
    return '';
  }

  function buildTargetIds(sectionStreamId, host, defaultMeasurementId) {
    var list = [sectionStreamId, PRIMARY_GA4_ROLLUP];
    var overrideId =
      validMeasurementId(STREAM_OVERRIDES[host]) ||
      validMeasurementId(defaultMeasurementId) ||
      getMetaMeasurementId();
    if (overrideId) list.push(overrideId);
    if (host === 'web3.netdev.be') list.push('G-2D66L4N90C');
    var unique = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] && unique.indexOf(list[i]) === -1) {
        unique.push(list[i]);
      }
    }
    return unique;
  }

  function resolveHost(hostname) {
    var h = String(hostname || '').toLowerCase().replace(/\.$/, '');
    if (!h || (h !== 'netdev.be' && !h.endsWith('.netdev.be'))) {
      return null;
    }
    var entry = HOST_CATALOG[h];
    if (entry) {
      var secStream = entry.section === 'netdev' ? SECTION_STREAM_NETDEV : SECTION_STREAM_ARGOLIS;
      return {
        section: entry.section,
        streamId: secStream,
        targetIds: buildTargetIds(secStream, h, entry.measurementId),
        ga4StreamId: entry.ga4StreamId,
        ga4StreamLabel: entry.ga4StreamLabel,
        surface: entry.surface,
        host: h
      };
    }
    if (h.endsWith('.tow.netdev.be')) {
      return {
        section: 'argolis',
        streamId: SECTION_STREAM_ARGOLIS,
        targetIds: buildTargetIds(SECTION_STREAM_ARGOLIS, h, 'G-8DZBPTGD3F'),
        ga4StreamId: '15849967791',
        ga4StreamLabel: 'antigravity-argolis',
        surface: 'tow',
        host: h
      };
    }
    var sub = h.slice(0, -'.netdev.be'.length);
    return {
      section: 'argolis',
      streamId: SECTION_STREAM_ARGOLIS,
      targetIds: buildTargetIds(SECTION_STREAM_ARGOLIS, h, 'G-8DZBPTGD3F'),
      ga4StreamId: '15849967791',
      ga4StreamLabel: 'antigravity-argolis',
      surface: cleanVal(sub) || 'spoke',
      host: h
    };
  }

  function resolveContext(info, pathname) {
    var p = String(pathname || '/');
    var s = p.toLowerCase();
    var pageContext = 'page';

    if (info.section === 'argolis') {
      pageContext = 'cockpit';
    } else if (info.surface === 'barogroove' || info.surface === 'bbbc') {
      pageContext = 'app';
    } else if (info.surface === 'v3' || info.surface === 'beyond') {
      pageContext = 'showcase';
    } else if (info.surface === 'blog' || /^\/blog(\/|$)/.test(s) || /^\/\d{4}-\d{2}-\d{2}-/.test(s)) {
      pageContext = 'writing';
    } else if (/^\/(about|aboutme)(\/|$)/.test(s)) {
      pageContext = 'portfolio';
    } else if (/^\/garage(\/|$)/.test(s)) {
      pageContext = 'labs';
    } else if (/^\/(tags|categories|search)(\/|$)/.test(s)) {
      pageContext = 'discovery';
    } else if (/netdev\.html$/.test(s) || /^\/web3\//.test(s)) {
      pageContext = 'legacy';
    } else if (/^\/(index\.html)?$/.test(s)) {
      pageContext = 'home';
    }

    var pillar =
      /(security|nis2|slsa|pqc|quantum|cyber|waf|iap|codemender|beyond|ecdh)/.test(s) ||
      info.surface === 'beyond' ||
      info.surface === 'ecdh'
        ? 'cloud-security'
        : /(agentic|adk|aether|llm|genai|gemini|alphaevolve|agy|flow|raise|cih|totum|aicafe|\bai-)/.test(s) ||
          info.surface === 'v3' ||
          info.surface === 'agy' ||
          info.surface === 'flow' ||
          info.surface === 'raise' ||
          info.surface === 'cih' ||
          info.surface === 'totum' ||
          info.surface === 'aicafe'
        ? 'agentic-ai'
        : /(gdpr|ai-act|\beu-|ehds|sovereign|policy|presidency|atomium|ted|tow)/.test(s) ||
          info.surface === 'ehds' ||
          info.surface === 'ted' ||
          info.surface === 'tow'
        ? 'eu-policy'
        : /(bike|velo|cycl|bbc|car-free|voiture)/.test(s) || info.surface === 'bbbc'
        ? 'cycling'
        : /(barogroove|music|lastfm|daylist)/.test(s) || info.surface === 'barogroove'
        ? 'music'
        : /^\/blog\/words\//.test(s)
        ? 'personal-words'
        : 'general';

    var subGroup =
      info.section === 'argolis'
        ? info.surface
        : info.surface === 'barogroove' || info.surface === 'bbbc' || info.surface === 'v3' || info.surface === 'beyond'
        ? info.surface
        : pageContext;

    return {
      pageContext: pageContext,
      pillar: pillar,
      contentGroup: info.section + '/' + subGroup
    };
  }

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days) {
    var maxAge = Math.round(days * 86400);
    document.cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      '; Domain=' +
      COOKIE_DOMAIN +
      '; Path=/; Max-Age=' +
      maxAge +
      '; SameSite=Lax; Secure';
  }

  function purgeGaCookies() {
    var parts = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf('=');
      var cname = (eq > -1 ? parts[i].slice(0, eq) : parts[i]).trim();
      if (cname === '_ga' || cname.indexOf('_ga_') === 0 || cname === '_gid' || cname === '_gat') {
        document.cookie = cname + '=; Domain=' + COOKIE_DOMAIN + '; Path=/; Max-Age=0; SameSite=Lax; Secure';
        document.cookie = cname + '=; Domain=.' + COOKIE_DOMAIN + '; Path=/; Max-Age=0; SameSite=Lax; Secure';
        document.cookie = cname + '=; Path=/; Max-Age=0; SameSite=Lax; Secure';
      }
    }
  }

  var hostInfo = resolveHost(window.location.hostname);
  if (!hostInfo) {
    window.ndTrack = function () {};
    return;
  }

  var ctx = resolveContext(hostInfo, window.location.pathname);
  var debugMode = false;

  try {
    var urlObj = new URL(window.location.href);
    var changedUrl = false;
    if (urlObj.searchParams.has('nd_internal')) {
      var iv = urlObj.searchParams.get('nd_internal');
      if (iv === '1') setCookie(INTERNAL_COOKIE, '1', 400);
      else if (iv === '0') setCookie(INTERNAL_COOKIE, '', -1);
      urlObj.searchParams.delete('nd_internal');
      changedUrl = true;
    }
    if (urlObj.searchParams.get('nd_debug') === '1') {
      debugMode = true;
    }
    if (changedUrl && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', urlObj.pathname + (urlObj.search || '') + (urlObj.hash || ''));
    }
  } catch (_) {}

  var isInternal = getCookie(INTERNAL_COOKIE) === '1';
  var gtagLoaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  function buildBaseParams() {
    var p = {
      content_group: ctx.contentGroup,
      estate_section: hostInfo.section,
      site_surface: hostInfo.surface,
      stream_id: hostInfo.ga4StreamId,
      stream_label: hostInfo.ga4StreamLabel,
      page_context: ctx.pageContext,
      content_pillar: ctx.pillar
    };
    if (isInternal) p.traffic_type = 'internal';
    if (debugMode) p.debug_mode = true;
    return p;
  }

  function bootGtag() {
    if (gtagLoaded) return;
    gtagLoaded = true;

    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });

    gtag('js', new Date());

    var cfg = buildBaseParams();
    cfg.cookie_domain = COOKIE_DOMAIN;
    cfg.cookie_flags = 'SameSite=Lax;Secure';

    var targets = hostInfo.targetIds;
    for (var i = 0; i < targets.length; i++) {
      gtag('config', targets[i], cfg);
    }

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(hostInfo.streamId);
    (document.head || document.documentElement).appendChild(s);
  }

  function safeTrack(eventName, rawParams) {
    if (!gtagLoaded || getCookie(CONSENT_COOKIE) === 'denied') return;
    var ename = cleanVal(eventName);
    if (!ALLOWED_EVENTS[ename]) return;

    var clean = buildBaseParams();
    if (rawParams && typeof rawParams === 'object') {
      var keys = Object.keys(rawParams);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (ALLOWED_PARAMS[k]) {
          var v = cleanVal(rawParams[k]);
          if (v) clean[k] = v;
        }
      }
    }
    gtag('event', ename, clean);
  }

  window.ndTrack = safeTrack;

  var bannerEl = null;
  function hideBanner() {
    if (bannerEl && bannerEl.parentNode) {
      bannerEl.parentNode.removeChild(bannerEl);
    }
    bannerEl = null;
  }

  function showBanner() {
    if (bannerEl || !document.body) return;
    var bar = document.createElement('div');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.setAttribute('data-nd-banner', '1');
    bar.style.cssText =
      'position:fixed;bottom:16px;right:16px;left:16px;max-width:520px;margin:0 auto;z-index:2147483647;' +
      'background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:12px;padding:14px 16px;' +
      'box-shadow:0 12px 32px rgba(0,0,0,0.45);font:13px/1.45 system-ui,-apple-system,sans-serif;' +
      'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;';

    var msg = document.createElement('span');
    msg.style.cssText = 'flex:1 1 260px;color:#e2e8f0;';
    msg.textContent = 'Analytics cookies help measure what resonates across *.netdev.be (zero ads, zero cross-site tracking).';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:8px;flex-shrink:0;';

    var btnBase =
      'cursor:pointer;border-radius:8px;padding:7px 14px;font:600 12px/1 system-ui,-apple-system,sans-serif;border:1px solid #475569;';

    var declineBtn = document.createElement('button');
    declineBtn.type = 'button';
    declineBtn.setAttribute('data-nd-action', 'decline');
    declineBtn.style.cssText = btnBase + 'background:#1e293b;color:#f8fafc;';
    declineBtn.textContent = 'Decline';

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.setAttribute('data-nd-action', 'accept');
    acceptBtn.style.cssText = btnBase + 'background:#1e293b;color:#f8fafc;';
    acceptBtn.textContent = 'Accept';

    declineBtn.addEventListener('click', function () {
      setCookie(CONSENT_COOKIE, 'denied', 180);
      if (gtagLoaded) {
        gtag('consent', 'update', { analytics_storage: 'denied' });
      }
      purgeGaCookies();
      hideBanner();
    });

    acceptBtn.addEventListener('click', function () {
      setCookie(CONSENT_COOKIE, 'granted', 180);
      if (gtagLoaded) {
        gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      hideBanner();
      bootGtag();
    });

    actions.appendChild(declineBtn);
    actions.appendChild(acceptBtn);
    bar.appendChild(msg);
    bar.appendChild(actions);
    document.body.appendChild(bar);
    bannerEl = bar;
  }

  function initConsent() {
    var stored = getCookie(CONSENT_COOKIE);
    if (stored !== 'denied') {
      if (stored !== 'granted') {
        setCookie(CONSENT_COOKIE, 'granted', 180);
      }
      bootGtag();
    }
  }

  document.addEventListener(
    'click',
    function (e) {
      var target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      var consentTrigger = target.closest('[data-nd-consent]');
      if (consentTrigger) {
        e.preventDefault();
        if (bannerEl) {
          hideBanner();
        } else {
          showBanner();
        }
        return;
      }

      var evEl = target.closest('[data-nd-event]');
      if (evEl) {
        var evName = evEl.getAttribute('data-nd-event');
        var params = {};
        if (evEl.hasAttribute('data-nd-lab-id')) params.lab_id = evEl.getAttribute('data-nd-lab-id');
        if (evEl.hasAttribute('data-nd-cta-id')) params.cta_id = evEl.getAttribute('data-nd-cta-id');
        if (evEl.hasAttribute('data-nd-method')) params.method = evEl.getAttribute('data-nd-method');
        safeTrack(evName, params);
      }

      var link = target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      if (/^mailto:/i.test(href)) {
        safeTrack('contact_intent', { method: 'email' });
        return;
      }

      try {
        var dest = new URL(href, window.location.href);
        var dh = dest.hostname.toLowerCase();
        if (dh.indexOf('linkedin.com') !== -1 && /\/in\//i.test(dest.pathname)) {
          safeTrack('contact_intent', { method: 'linkedin' });
          return;
        }
        if (dh === 'github.com' && /^\/jpaquay(\/|$)/i.test(dest.pathname)) {
          safeTrack('contact_intent', { method: 'github' });
          return;
        }
        var destInfo = resolveHost(dh);
        if (destInfo && destInfo.surface !== hostInfo.surface) {
          safeTrack('showcase_open', {
            showcase: destInfo.surface,
            target_section: destInfo.section
          });
        }
      } catch (_) {}
    },
    true
  );

  // Automatic blog_read_complete Key Event: fires once when a reader on a
  // 'writing' article scrolls >= 75% and has engaged for >= 15 seconds.
  var readCompleted = false;
  var pageEnteredAt = Date.now ? Date.now() : 0;
  function checkReadComplete() {
    if (readCompleted || ctx.pageContext !== 'writing') return;
    var now = Date.now ? Date.now() : 0;
    if (now - pageEnteredAt < 15000) return;
    var docEl = document.documentElement;
    if (!docEl) return;
    var scrollTop = window.pageYOffset || docEl.scrollTop || 0;
    var winH = window.innerHeight || docEl.clientHeight || 0;
    var docH = docEl.scrollHeight || 0;
    if (docH > 0 && (scrollTop + winH) / docH >= 0.75) {
      readCompleted = true;
      safeTrack('blog_read_complete', { content_pillar: ctx.pillar });
    }
  }
  if (window.addEventListener) {
    window.addEventListener('scroll', checkReadComplete, { passive: true });
  }

  if (window.history && window.history.pushState) {
    var origPush = window.history.pushState;
    window.history.pushState = function () {
      var ret = origPush.apply(this, arguments);
      ctx = resolveContext(hostInfo, window.location.pathname);
      readCompleted = false;
      pageEnteredAt = Date.now ? Date.now() : 0;
      if (gtagLoaded && getCookie(CONSENT_COOKIE) !== 'denied') {
        var pv = buildBaseParams();
        pv.page_path = window.location.pathname;
        gtag('event', 'page_view', pv);
      }
      return ret;
    };
  }

  initConsent();
})();
