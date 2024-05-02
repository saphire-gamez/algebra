async function __uvHook(e, t = {}, a = "/o/") {
  if ("__uv" in e && e.__uv instanceof Ultraviolet) return !1;
  e.document &&
    e.window &&
    e.document
      .querySelectorAll("script[__uv-script]")
      .forEach((e) => e.remove());
  const r = !e.window,
    o = "__uv",
    n = "__uv$",
    l = new Ultraviolet({ ...t, window: e });
  "function" == typeof t.construct && t.construct(l, r ? "worker" : "window");
  const { client: i } = l,
    {
      HTMLMediaElement: s,
      HTMLScriptElement: d,
      HTMLAudioElement: c,
      HTMLVideoElement: u,
      HTMLInputElement: m,
      HTMLEmbedElement: h,
      HTMLTrackElement: v,
      HTMLAnchorElement: g,
      HTMLIFrameElement: p,
      HTMLAreaElement: b,
      HTMLLinkElement: f,
      HTMLBaseElement: _,
      HTMLFormElement: y,
      HTMLImageElement: S,
      HTMLSourceElement: w,
    } = e;
  i.nativeMethods.defineProperty(e, "__uv", { value: l, enumerable: !1 }),
    (l.meta.origin = location.origin),
    (l.location = i.location.emulate(
      (e) =>
        "about:srcdoc" === e
          ? new URL(e)
          : (e.startsWith("blob:") && (e = e.slice(5)),
            new URL(l.sourceUrl(e))),
      (e) => l.rewriteUrl(e),
    )),
    (l.cookieStr = e.__uv$cookies || ""),
    (l.meta.url = l.location),
    (l.domain = l.meta.url.host),
    (l.blobUrls = new e.Map()),
    (l.referrer = ""),
    (l.cookies = []),
    (l.localStorageObj = {}),
    (l.sessionStorageObj = {});
  try {
    l.bare = new URL(a, e.location.href);
  } catch (t) {
    l.bare = e.parent.__uv.bare;
  }
  if (
    ("about:srcdoc" === l.location.href && (l.meta = e.parent.__uv.meta),
    e.EventTarget &&
      ((l.addEventListener = e.EventTarget.prototype.addEventListener),
      (l.removeListener = e.EventTarget.prototype.removeListener),
      (l.dispatchEvent = e.EventTarget.prototype.dispatchEvent)),
    i.nativeMethods.defineProperty(i.storage.storeProto, "__uv$storageObj", {
      get() {
        return this === i.storage.sessionStorage
          ? l.sessionStorageObj
          : this === i.storage.localStorage
            ? l.localStorageObj
            : void 0;
      },
      enumerable: !1,
    }),
    e.localStorage)
  ) {
    for (const t in e.localStorage)
      t.startsWith(n + l.location.origin + "@") &&
        (l.localStorageObj[t.slice((n + l.location.origin + "@").length)] =
          e.localStorage.getItem(t));
    l.lsWrap = i.storage.emulate(i.storage.localStorage, l.localStorageObj);
  }
  if (e.sessionStorage) {
    for (const t in e.sessionStorage)
      t.startsWith(n + l.location.origin + "@") &&
        (l.sessionStorageObj[t.slice((n + l.location.origin + "@").length)] =
          e.sessionStorage.getItem(t));
    l.ssWrap = i.storage.emulate(i.storage.sessionStorage, l.sessionStorageObj);
  }
  let P = e.document ? i.node.baseURI.get.call(e.document) : e.location.href,
    k = l.sourceUrl(P);
  if (
    (i.nativeMethods.defineProperty(l.meta, "base", {
      get: () =>
        e.document
          ? (i.node.baseURI.get.call(e.document) !== P &&
              ((P = i.node.baseURI.get.call(e.document)), (k = l.sourceUrl(P))),
            k)
          : l.meta.url.href,
    }),
    (l.methods = {
      setSource: n + "setSource",
      source: n + "source",
      location: n + "location",
      function: n + "function",
      string: n + "string",
      eval: n + "eval",
      parent: n + "parent",
      top: n + "top",
    }),
    (l.filterKeys = [
      o,
      l.methods.setSource,
      l.methods.source,
      l.methods.location,
      l.methods.function,
      l.methods.string,
      l.methods.eval,
      l.methods.parent,
      l.methods.top,
      n + "protocol",
      n + "storageObj",
      n + "url",
      n + "modifiedStyle",
      n + "config",
      n + "dispatched",
      "Ultraviolet",
      "__uvHook",
    ]),
    i.on("wrap", (e, t) => {
      i.nativeMethods.defineProperty(
        t,
        "name",
        i.nativeMethods.getOwnPropertyDescriptor(e, "name"),
      ),
        i.nativeMethods.defineProperty(
          t,
          "length",
          i.nativeMethods.getOwnPropertyDescriptor(e, "length"),
        ),
        i.nativeMethods.defineProperty(t, l.methods.string, {
          enumerable: !1,
          value: i.nativeMethods.fnToString.call(e),
        }),
        i.nativeMethods.defineProperty(t, l.methods.function, {
          enumerable: !1,
          value: e,
        });
    }),
    i.fetch.on("request", (e) => {
      e.data.input = l.rewriteUrl(e.data.input);
    }),
    i.fetch.on("requestUrl", (e) => {
      e.data.value = l.sourceUrl(e.data.value);
    }),
    i.fetch.on("responseUrl", (e) => {
      e.data.value = l.sourceUrl(e.data.value);
    }),
    i.xhr.on("open", (e) => {
      e.data.input = l.rewriteUrl(e.data.input);
    }),
    i.xhr.on("responseUrl", (e) => {
      e.data.value = l.sourceUrl(e.data.value);
    }),
    i.workers.on("worker", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.workers.on("addModule", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.workers.on("importScripts", (e) => {
      for (const t in e.data.scripts)
        e.data.scripts[t] = l.rewriteUrl(e.data.scripts[t]);
    }),
    i.workers.on("postMessage", (e) => {
      let t = e.data.origin;
      (e.data.origin = "*"),
        (e.data.message = {
          __data: e.data.message,
          __origin: l.meta.url.origin,
          __to: t,
        });
    }),
    i.navigator.on("sendBeacon", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.document.on("getCookie", (e) => {
      e.data.value = l.cookieStr;
    }),
    i.document.on("setCookie", (e) => {
      Promise.resolve(l.cookie.setCookies(e.data.value, l.db, l.meta)).then(
        () => {
          l.cookie.db().then((e) => {
            l.cookie.getCookies(e).then((e) => {
              l.cookieStr = l.cookie.serialize(e, l.meta, !0);
            });
          });
        },
      );
      const t = l.cookie.setCookie(e.data.value)[0];
      t.path || (t.path = "/"),
        t.domain || (t.domain = l.meta.url.hostname),
        l.cookie.validateCookie(t, l.meta, !0) &&
          (l.cookieStr.length && (l.cookieStr += "; "),
          (l.cookieStr += `${t.name}=${t.value}`)),
        e.respondWith(e.data.value);
    }),
    i.element.on("setInnerHTML", (e) => {
      switch (e.that.tagName) {
        case "SCRIPT":
          e.data.value = l.js.rewrite(e.data.value);
          break;
        case "STYLE":
          e.data.value = l.rewriteCSS(e.data.value);
          break;
        default:
          e.data.value = l.rewriteHtml(e.data.value);
      }
    }),
    i.element.on("getInnerHTML", (e) => {
      if ("SCRIPT" === e.that.tagName) e.data.value = l.js.source(e.data.value);
      else e.data.value = l.sourceHtml(e.data.value);
    }),
    i.element.on("setOuterHTML", (e) => {
      e.data.value = l.rewriteHtml(e.data.value, {
        document: "HTML" === e.that.tagName,
      });
    }),
    i.element.on("getOuterHTML", (e) => {
      switch (e.that.tagName) {
        case "HEAD":
          e.data.value = l
            .sourceHtml(
              e.data.value.replace(
                /<head(.*)>(.*)<\/head>/s,
                "<op-head$1>$2</op-head>",
              ),
            )
            .replace(/<op-head(.*)>(.*)<\/op-head>/s, "<head$1>$2</head>");
          break;
        case "BODY":
          e.data.value = l
            .sourceHtml(
              e.data.value.replace(
                /<body(.*)>(.*)<\/body>/s,
                "<op-body$1>$2</op-body>",
              ),
            )
            .replace(/<op-body(.*)>(.*)<\/op-body>/s, "<body$1>$2</body>");
          break;
        default:
          e.data.value = l.sourceHtml(e.data.value, {
            document: "HTML" === e.that.tagName,
          });
      }
    }),
    i.document.on("write", (e) => {
      if (!e.data.html.length) return !1;
      e.data.html = [l.rewriteHtml(e.data.html.join(""))];
    }),
    i.document.on("writeln", (e) => {
      if (!e.data.html.length) return !1;
      e.data.html = [l.rewriteHtml(e.data.html.join(""))];
    }),
    i.element.on("insertAdjacentHTML", (e) => {
      e.data.html = l.rewriteHtml(e.data.html);
    }),
    i.eventSource.on("construct", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.eventSource.on("url", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.history.on("replaceState", (e) => {
      e.data.url &&
        (e.data.url = l.rewriteUrl(
          e.data.url,
          "__uv" in e.that ? e.that.__uv.meta : l.meta,
        ));
    }),
    i.history.on("pushState", (e) => {
      e.data.url &&
        (e.data.url = l.rewriteUrl(
          e.data.url,
          "__uv" in e.that ? e.that.__uv.meta : l.meta,
        ));
    }),
    i.element.on("getAttribute", (e) => {
      i.element.hasAttribute.call(
        e.that,
        l.attributePrefix + "-attr-" + e.data.name,
      ) &&
        e.respondWith(
          e.target.call(e.that, l.attributePrefix + "-attr-" + e.data.name),
        );
    }),
    i.message.on("postMessage", (e) => {
      let t = e.data.origin,
        a = l.call;
      e.that && (a = e.that.__uv$source.call),
        (e.data.origin = "*"),
        (e.data.message = {
          __data: e.data.message,
          __origin: (e.that || e.target).__uv$source.location.origin,
          __to: t,
        }),
        e.respondWith(
          a(
            e.target,
            r
              ? [e.data.message, e.data.transfer]
              : [e.data.message, e.data.origin, e.data.transfer],
            e.that,
          ),
        );
    }),
    i.message.on("data", (e) => {
      const { value: t } = e.data;
      "object" == typeof t &&
        "__data" in t &&
        "__origin" in t &&
        e.respondWith(t.__data);
    }),
    i.message.on("origin", (e) => {
      const t = i.message.messageData.get.call(e.that);
      "object" == typeof t &&
        t.__data &&
        t.__origin &&
        e.respondWith(t.__origin);
    }),
    i.overrideDescriptor(e, "origin", { get: (e, t) => l.location.origin }),
    i.node.on("baseURI", (t) => {
      t.data.value.startsWith(e.location.origin) &&
        (t.data.value = l.sourceUrl(t.data.value));
    }),
    i.element.on("setAttribute", (t) => {
      if (
        t.that instanceof s &&
        "src" === t.data.name &&
        t.data.value.startsWith("blob:")
      )
        return (
          t.target.call(
            t.that,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          void (t.data.value = l.blobUrls.get(t.data.value))
        );
      l.attrs.isUrl(t.data.name) &&
        (t.target.call(
          t.that,
          l.attributePrefix + "-attr-" + t.data.name,
          t.data.value,
        ),
        (t.data.value = l.rewriteUrl(t.data.value))),
        l.attrs.isStyle(t.data.name) &&
          (t.target.call(
            t.that,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.rewriteCSS(t.data.value, {
            context: "declarationList",
          }))),
        l.attrs.isHtml(t.data.name) &&
          (t.target.call(
            t.that,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.rewriteHtml(t.data.value, {
            ...l.meta,
            document: !0,
            injectHead: l.createHtmlInject(
              l.handlerScript,
              l.bundleScript,
              l.configScript,
              l.cookieStr,
              e.location.href,
            ),
          }))),
        l.attrs.isSrcset(t.data.name) &&
          (t.target.call(
            t.that,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.html.wrapSrcset(t.data.value))),
        l.attrs.isForbidden(t.data.name) &&
          (t.data.name = l.attributePrefix + "-attr-" + t.data.name);
    }),
    i.element.on("audio", (e) => {
      e.data.url = l.rewriteUrl(e.data.url);
    }),
    i.element.hookProperty([g, b, f, _], "href", {
      get: (e, t) => l.sourceUrl(e.call(t)),
      set: (e, t, [a]) => {
        i.element.setAttribute.call(t, l.attributePrefix + "-attr-href", a),
          e.call(t, l.rewriteUrl(a));
      },
    }),
    i.element.hookProperty([d, c, u, s, S, m, h, p, v, w], "src", {
      get: (e, t) => l.sourceUrl(e.call(t)),
      set: (e, t, [a]) => {
        if (
          new String(a).toString().trim().startsWith("blob:") &&
          t instanceof s
        )
          return (
            i.element.setAttribute.call(t, l.attributePrefix + "-attr-src", a),
            e.call(t, l.blobUrls.get(a) || a)
          );
        i.element.setAttribute.call(t, l.attributePrefix + "-attr-src", a),
          e.call(t, l.rewriteUrl(a));
      },
    }),
    i.element.hookProperty([y], "action", {
      get: (e, t) => l.sourceUrl(e.call(t)),
      set: (e, t, [a]) => {
        i.element.setAttribute.call(t, l.attributePrefix + "-attr-action", a),
          e.call(t, l.rewriteUrl(a));
      },
    }),
    i.element.hookProperty([S], "srcset", {
      get: (e, t) =>
        i.element.getAttribute.call(t, l.attributePrefix + "-attr-srcset") ||
        e.call(t),
      set: (e, t, [a]) => {
        i.element.setAttribute.call(t, l.attributePrefix + "-attr-srcset", a),
          e.call(t, l.html.wrapSrcset(a));
      },
    }),
    i.element.hookProperty(d, "integrity", {
      get: (e, t) =>
        i.element.getAttribute.call(t, l.attributePrefix + "-attr-integrity"),
      set: (e, t, [a]) => {
        i.element.setAttribute.call(
          t,
          l.attributePrefix + "-attr-integrity",
          a,
        );
      },
    }),
    i.element.hookProperty(p, "sandbox", {
      get: (e, t) =>
        i.element.getAttribute.call(t, l.attributePrefix + "-attr-sandbox") ||
        e.call(t),
      set: (e, t, [a]) => {
        i.element.setAttribute.call(t, l.attributePrefix + "-attr-sandbox", a);
      },
    }),
    i.element.hookProperty(p, "contentWindow", {
      get: (e, r) => {
        const o = e.call(r);
        try {
          return o.__uv || __uvHook(o, t, a), o;
        } catch (e) {
          return o;
        }
      },
    }),
    i.element.hookProperty(p, "contentDocument", {
      get: (e, r) => {
        const o = e.call(r);
        try {
          const e = o.defaultView;
          return e.__uv || __uvHook(e, t, a), o;
        } catch (e) {
          return win;
        }
      },
    }),
    i.element.hookProperty(p, "srcdoc", {
      get: (e, t) =>
        i.element.getAttribute.call(t, l.attributePrefix + "-attr-srcdoc") ||
        e.call(t),
      set: (t, a, [r]) => {
        t.call(
          a,
          l.rewriteHtml(r, {
            document: !0,
            injectHead: l.createHtmlInject(
              l.handlerScript,
              l.bundleScript,
              l.configScript,
              l.cookieStr,
              e.location.href,
            ),
          }),
        );
      },
    }),
    i.node.on("getTextContent", (e) => {
      "SCRIPT" === e.that.tagName && (e.data.value = l.js.source(e.data.value));
    }),
    i.node.on("setTextContent", (e) => {
      "SCRIPT" === e.that.tagName &&
        (e.data.value = l.js.rewrite(e.data.value));
    }),
    "serviceWorker" in e.navigator &&
      delete e.Navigator.prototype.serviceWorker,
    i.document.on("getDomain", (e) => {
      e.data.value = l.domain;
    }),
    i.document.on("setDomain", (e) => {
      if (
        !e.data.value
          .toString()
          .endsWith(l.meta.url.hostname.split(".").slice(-2).join("."))
      )
        return e.respondWith("");
      e.respondWith((l.domain = e.data.value));
    }),
    i.document.on("url", (e) => {
      e.data.value = l.location.href;
    }),
    i.document.on("documentURI", (e) => {
      e.data.value = l.location.href;
    }),
    i.document.on("referrer", (e) => {
      e.data.value = l.referrer || l.sourceUrl(e.data.value);
    }),
    i.document.on("parseFromString", (e) => {
      if ("text/html" !== e.data.type) return !1;
      e.data.string = l.rewriteHtml(e.data.string, { ...l.meta, document: !0 });
    }),
    i.attribute.on("getValue", (e) => {
      i.element.hasAttribute.call(
        e.that.ownerElement,
        l.attributePrefix + "-attr-" + e.data.name,
      ) &&
        (e.data.value = i.element.getAttribute.call(
          e.that.ownerElement,
          l.attributePrefix + "-attr-" + e.data.name,
        ));
    }),
    i.attribute.on("setValue", (t) => {
      l.attrs.isUrl(t.data.name) &&
        (i.element.setAttribute.call(
          t.that.ownerElement,
          l.attributePrefix + "-attr-" + t.data.name,
          t.data.value,
        ),
        (t.data.value = l.rewriteUrl(t.data.value))),
        l.attrs.isStyle(t.data.name) &&
          (i.element.setAttribute.call(
            t.that.ownerElement,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.rewriteCSS(t.data.value, {
            context: "declarationList",
          }))),
        l.attrs.isHtml(t.data.name) &&
          (i.element.setAttribute.call(
            t.that.ownerElement,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.rewriteHtml(t.data.value, {
            ...l.meta,
            document: !0,
            injectHead: l.createHtmlInject(
              l.handlerScript,
              l.bundleScript,
              l.configScript,
              l.cookieStr,
              e.location.href,
            ),
          }))),
        l.attrs.isSrcset(t.data.name) &&
          (i.element.setAttribute.call(
            t.that.ownerElement,
            l.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = l.html.wrapSrcset(t.data.value)));
    }),
    i.url.on("createObjectURL", (t) => {
      let a = t.target.call(t.that, t.data.object);
      if (a.startsWith("blob:" + location.origin)) {
        let r =
          "blob:" +
          ("about:blank" !== l.meta.url.href
            ? l.meta.url.origin
            : e.parent.__uv.meta.url.origin) +
          a.slice(5 + location.origin.length);
        l.blobUrls.set(r, a), t.respondWith(r);
      } else t.respondWith(a);
    }),
    i.url.on("revokeObjectURL", (e) => {
      if (l.blobUrls.has(e.data.url)) {
        const t = e.data.url;
        (e.data.url = l.blobUrls.get(e.data.url)), l.blobUrls.delete(t);
      }
    }),
    i.storage.on("get", (e) => {
      e.data.name = n + l.meta.url.origin + "@" + e.data.name;
    }),
    i.storage.on("set", (e) => {
      e.that.__uv$storageObj &&
        (e.that.__uv$storageObj[e.data.name] = e.data.value),
        (e.data.name = n + l.meta.url.origin + "@" + e.data.name);
    }),
    i.storage.on("delete", (e) => {
      e.that.__uv$storageObj && delete e.that.__uv$storageObj[e.data.name],
        (e.data.name = n + l.meta.url.origin + "@" + e.data.name);
    }),
    i.storage.on("getItem", (e) => {
      e.data.name = n + l.meta.url.origin + "@" + e.data.name;
    }),
    i.storage.on("setItem", (e) => {
      e.that.__uv$storageObj &&
        (e.that.__uv$storageObj[e.data.name] = e.data.value),
        (e.data.name = n + l.meta.url.origin + "@" + e.data.name);
    }),
    i.storage.on("removeItem", (e) => {
      e.that.__uv$storageObj && delete e.that.__uv$storageObj[e.data.name],
        (e.data.name = n + l.meta.url.origin + "@" + e.data.name);
    }),
    i.storage.on("clear", (e) => {
      if (e.that.__uv$storageObj)
        for (const t of i.nativeMethods.keys.call(null, e.that.__uv$storageObj))
          delete e.that.__uv$storageObj[t],
            i.storage.removeItem.call(e.that, n + l.meta.url.origin + "@" + t),
            e.respondWith();
    }),
    i.storage.on("length", (e) => {
      e.that.__uv$storageObj &&
        e.respondWith(
          i.nativeMethods.keys.call(null, e.that.__uv$storageObj).length,
        );
    }),
    i.storage.on("key", (e) => {
      e.that.__uv$storageObj &&
        e.respondWith(
          i.nativeMethods.keys.call(null, e.that.__uv$storageObj)[
            e.data.index
          ] || null,
        );
    }),
    i.websocket.on("websocket", async (t) => {
      let a;
      try {
        a = new URL(t.data.url);
      } catch (e) {
        return;
      }
      const r = {
          Host: a.host,
          Origin: l.meta.url.origin,
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          Upgrade: "websocket",
          "User-Agent": e.navigator.userAgent,
          Connection: "Upgrade",
        },
        o = l.cookie.serialize(l.cookies, { url: a }, !1);
      o && (r.Cookie = o);
      const s = [...t.data.protocols],
        d = {
          protocol: a.protocol,
          host: a.hostname,
          port: a.port || ("wss:" === a.protocol ? "443" : "80"),
          path: a.pathname + a.search,
        };
      s.length && (r["Sec-WebSocket-Protocol"] = s.join(", ")),
        (t.data.url =
          ("https:" === l.bare.protocol ? "wss://" : "ws://") +
          l.bare.host +
          l.bare.pathname +
          "v1/"),
        (t.data.protocols = [
          "bare",
          l.encodeProtocol(
            JSON.stringify({
              remote: d,
              headers: r,
              forward_headers: [
                "accept",
                "accept-encoding",
                "accept-language",
                "sec-websocket-extensions",
                "sec-websocket-key",
                "sec-websocket-version",
              ],
            }),
          ),
        ]);
      const c = new t.target(t.data.url, t.data.protocols);
      i.nativeMethods.defineProperty(c, n + "url", {
        enumerable: !1,
        value: a.href,
      }),
        t.respondWith(c);
    }),
    i.websocket.on("url", (e) => {
      "__uv$url" in e.that && (e.data.value = e.that.__uv$url);
    }),
    i.websocket.on("protocol", (e) => {
      "__uv$protocol" in e.that && (e.data.value = e.that.__uv$protocol);
    }),
    i.function.on("function", (e) => {
      e.data.script = l.rewriteJS(e.data.script);
    }),
    i.function.on("toString", (e) => {
      l.methods.string in e.that && e.respondWith(e.that[l.methods.string]);
    }),
    i.object.on("getOwnPropertyNames", (e) => {
      e.data.names = e.data.names.filter((e) => !l.filterKeys.includes(e));
    }),
    i.object.on("getOwnPropertyDescriptors", (e) => {
      for (const t of l.filterKeys) delete e.data.descriptors[t];
    }),
    i.style.on("setProperty", (e) => {
      i.style.dashedUrlProps.includes(e.data.property) &&
        (e.data.value = l.rewriteCSS(e.data.value, {
          context: "value",
          ...l.meta,
        }));
    }),
    i.style.on("getPropertyValue", (e) => {
      i.style.dashedUrlProps.includes(e.data.property) &&
        e.respondWith(
          l.sourceCSS(e.target.call(e.that, e.data.property), {
            context: "value",
            ...l.meta,
          }),
        );
    }),
    "CSS2Properties" in e)
  )
    for (const t of i.style.urlProps)
      i.overrideDescriptor(e.CSS2Properties.prototype, t, {
        get: (e, t) => l.sourceCSS(e.call(t), { context: "value", ...l.meta }),
        set: (e, t, a) => {
          e.call(t, l.rewriteCSS(a, { context: "value", ...l.meta }));
        },
      });
  else
    "HTMLElement" in e &&
      i.overrideDescriptor(e.HTMLElement.prototype, "style", {
        get: (e, t) => {
          const a = e.call(t);
          if (!a[n + "modifiedStyle"])
            for (const e of i.style.urlProps)
              i.nativeMethods.defineProperty(a, e, {
                enumerable: !0,
                configurable: !0,
                get() {
                  const t = i.style.getPropertyValue.call(this, e) || "";
                  return l.sourceCSS(t, { context: "value", ...l.meta });
                },
                set(t) {
                  i.style.setProperty.call(
                    this,
                    i.style.propToDashed[e] || e,
                    l.rewriteCSS(t, { context: "value", ...l.meta }),
                  );
                },
              }),
                i.nativeMethods.defineProperty(a, n + "modifiedStyle", {
                  enumerable: !1,
                  value: !0,
                });
          return a;
        },
      });
  i.style.on("setCssText", (e) => {
    e.data.value = l.rewriteCSS(e.data.value, {
      context: "declarationList",
      ...l.meta,
    });
  }),
    i.style.on("getCssText", (e) => {
      e.data.value = l.sourceCSS(e.data.value, {
        context: "declarationList",
        ...l.meta,
      });
    }),
    e.window &&
      l.addEventListener.call(e, "hashchange", (t) => {
        if (t.__uv$dispatched) return !1;
        t.stopImmediatePropagation();
        const a = e.location.hash;
        i.history.replaceState.call(e.history, "", "", t.oldURL),
          (l.location.hash = a);
      }),
    i.location.on("hashchange", (t, a, r) => {
      if (r.HashChangeEvent && i.history.replaceState) {
        i.history.replaceState.call(e.history, "", "", l.rewriteUrl(a));
        const o = new r.HashChangeEvent("hashchange", { newURL: a, oldURL: t });
        i.nativeMethods.defineProperty(o, n + "dispatched", {
          value: !0,
          enumerable: !1,
        }),
          l.dispatchEvent.call(e, o);
      }
    }),
    i.fetch.overrideRequest(),
    i.fetch.overrideUrl(),
    i.xhr.overrideOpen(),
    i.xhr.overrideResponseUrl(),
    i.element.overrideHtml(),
    i.element.overrideAttribute(),
    i.element.overrideInsertAdjacentHTML(),
    i.element.overrideAudio(),
    i.node.overrideBaseURI(),
    i.node.overrideTextContent(),
    i.attribute.overrideNameValue(),
    i.document.overrideDomain(),
    i.document.overrideURL(),
    i.document.overrideDocumentURI(),
    i.document.overrideWrite(),
    i.document.overrideReferrer(),
    i.document.overrideParseFromString(),
    i.storage.overrideMethods(),
    i.storage.overrideLength(),
    i.object.overrideGetPropertyNames(),
    i.object.overrideGetOwnPropertyDescriptors(),
    i.history.overridePushState(),
    i.history.overrideReplaceState(),
    i.eventSource.overrideConstruct(),
    i.eventSource.overrideUrl(),
    i.websocket.overrideWebSocket(),
    i.websocket.overrideProtocol(),
    i.websocket.overrideUrl(),
    i.url.overrideObjectURL(),
    i.document.overrideCookie(),
    i.message.overridePostMessage(),
    i.message.overrideMessageOrigin(),
    i.message.overrideMessageData(),
    i.workers.overrideWorker(),
    i.workers.overrideAddModule(),
    i.workers.overrideImportScripts(),
    i.workers.overridePostMessage(),
    i.style.overrideSetGetProperty(),
    i.style.overrideCssText(),
    i.navigator.overrideSendBeacon(),
    i.function.overrideFunction(),
    i.function.overrideToString(),
    i.location.overrideWorkerLocation((e) => new URL(l.sourceUrl(e))),
    i.overrideDescriptor(e, "localStorage", {
      get: (t, a) => (a || e).__uv.lsWrap,
    }),
    i.overrideDescriptor(e, "sessionStorage", {
      get: (t, a) => (a || e).__uv.ssWrap,
    }),
    i.override(e, "open", (e, t, a) => {
      if (!a.length) return e.apply(t, a);
      let [r] = a;
      return (r = l.rewriteUrl(r)), e.call(t, r);
    }),
    (l.$wrap = function (e) {
      return "location" === e
        ? l.methods.location
        : "eval" === e
          ? l.methods.eval
          : e;
    }),
    (l.$get = function (t) {
      return t === e.location
        ? l.location
        : t === e.eval
          ? l.eval
          : t === e.parent
            ? e.__uv$parent
            : t === e.top
              ? e.__uv$top
              : t;
    }),
    (l.eval = i.wrap(e, "eval", (e, t, a) => {
      if (!a.length || "string" != typeof a[0]) return e.apply(t, a);
      let [r] = a;
      return (r = l.rewriteJS(r)), e.call(t, r);
    })),
    (l.call = function (e, t, a) {
      return a ? e.apply(a, t) : e(...t);
    }),
    (l.call$ = function (e, t, a = []) {
      return e[t].apply(e, a);
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, o, {
      get: () => l,
      enumerable: !1,
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.setSource, {
      value: function (e) {
        return i.nativeMethods.isExtensible(this)
          ? (i.nativeMethods.defineProperty(this, l.methods.source, {
              value: e,
              writable: !0,
              enumerable: !1,
            }),
            this)
          : this;
      },
      enumerable: !1,
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.source, {
      value: l,
      writable: !0,
      enumerable: !1,
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.location, {
      configurable: !0,
      get() {
        return this === e.document || this === e ? l.location : this.location;
      },
      set(t) {
        this === e.document || this === e
          ? (l.location.href = t)
          : (this.location = t);
      },
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.parent, {
      configurable: !0,
      get() {
        const t = this.parent;
        if (this === e)
          try {
            return "__uv" in t ? t : this;
          } catch (e) {
            return this;
          }
        return t;
      },
      set(e) {
        this.parent = e;
      },
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.top, {
      configurable: !0,
      get() {
        const t = this.top;
        if (this === e) {
          if (t === this.parent) return this[l.methods.parent];
          try {
            if ("__uv" in t) return t;
            {
              let e = this;
              for (; e.parent !== t; ) e = e.parent;
              return "__uv" in e ? e : this;
            }
          } catch (e) {
            return this;
          }
        }
        return t;
      },
      set(e) {
        this.top = e;
      },
    }),
    i.nativeMethods.defineProperty(e.Object.prototype, l.methods.eval, {
      configurable: !0,
      get() {
        return this === e ? l.eval : this.eval;
      },
      set(e) {
        this.eval = e;
      },
    });
}
self.__uv || __uvHook(self, self.__uv$config, self.__uv$config.bare);
