(function(b, a) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = b.document ? a(b, true) : function(c) {
            if (!c.document) {
                throw new Error("jQuery requires a window with a document")
            }
            return a(c)
        }
    } else {
        a(b)
    }
}(typeof window !== "undefined" ? window : this, function(a4, au) {
    var aO = [];
    var O = aO.slice;
    var ay = aO.concat;
    var w = aO.push;
    var bT = aO.indexOf;
    var ab = {};
    var x = ab.toString;
    var J = ab.hasOwnProperty;
    var C = {};
    var ah = "1.11.2",
        bH = function(e, b5) {
            return new bH.fn.init(e, b5)
        },
        D = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        bR = /^-ms-/,
        aV = /-([\da-z])/gi,
        N = function(e, b5) {
            return b5.toUpperCase()
        };
    bH.fn = bH.prototype = {
        jquery: ah,
        constructor: bH,
        selector: "",
        length: 0,
        toArray: function() {
            return O.call(this)
        },
        get: function(e) {
            return e != null ? (e < 0 ? this[e + this.length] : this[e]) : O.call(this)
        },
        pushStack: function(e) {
            var b5 = bH.merge(this.constructor(), e);
            b5.prevObject = this;
            b5.context = this.context;
            return b5
        },
        each: function(b5, e) {
            return bH.each(this, b5, e)
        },
        map: function(e) {
            return this.pushStack(bH.map(this, function(b6, b5) {
                return e.call(b6, b5, b6)
            }))
        },
        slice: function() {
            return this.pushStack(O.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(b6) {
            var e = this.length,
                b5 = +b6 + (b6 < 0 ? e : 0);
            return this.pushStack(b5 >= 0 && b5 < e ? [this[b5]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: w,
        sort: aO.sort,
        splice: aO.splice
    };
    bH.extend = bH.fn.extend = function() {
        var e, ca, b5, b6, cd, cb, b9 = arguments[0] || {},
            b8 = 1,
            b7 = arguments.length,
            cc = false;
        if (typeof b9 === "boolean") {
            cc = b9;
            b9 = arguments[b8] || {};
            b8++
        }
        if (typeof b9 !== "object" && !bH.isFunction(b9)) {
            b9 = {}
        }
        if (b8 === b7) {
            b9 = this;
            b8--
        }
        for (; b8 < b7; b8++) {
            if ((cd = arguments[b8]) != null) {
                for (b6 in cd) {
                    e = b9[b6];
                    b5 = cd[b6];
                    if (b9 === b5) {
                        continue
                    }
                    if (cc && b5 && (bH.isPlainObject(b5) || (ca = bH.isArray(b5)))) {
                        if (ca) {
                            ca = false;
                            cb = e && bH.isArray(e) ? e : []
                        } else {
                            cb = e && bH.isPlainObject(e) ? e : {}
                        }
                        b9[b6] = bH.extend(cc, cb, b5)
                    } else {
                        if (b5 !== undefined) {
                            b9[b6] = b5
                        }
                    }
                }
            }
        }
        return b9
    };
    bH.extend({
        expando: "jQuery" + (ah + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return bH.type(e) === "function"
        },
        isArray: Array.isArray || function(e) {
            return bH.type(e) === "array"
        },
        isWindow: function(e) {
            return e != null && e == e.window
        },
        isNumeric: function(e) {
            return !bH.isArray(e) && (e - parseFloat(e) + 1) >= 0
        },
        isEmptyObject: function(b5) {
            var e;
            for (e in b5) {
                return false
            }
            return true
        },
        isPlainObject: function(b7) {
            var b5;
            if (!b7 || bH.type(b7) !== "object" || b7.nodeType || bH.isWindow(b7)) {
                return false
            }
            try {
                if (b7.constructor && !J.call(b7, "constructor") && !J.call(b7.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (b6) {
                return false
            }
            if (C.ownLast) {
                for (b5 in b7) {
                    return J.call(b7, b5)
                }
            }
            for (b5 in b7) {}
            return b5 === undefined || J.call(b7, b5)
        },
        type: function(e) {
            if (e == null) {
                return e + ""
            }
            return typeof e === "object" || typeof e === "function" ? ab[x.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            if (e && bH.trim(e)) {
                (a4.execScript || function(b5) {
                    a4["eval"].call(a4, b5)
                })(e)
            }
        },
        camelCase: function(e) {
            return e.replace(bR, "ms-").replace(aV, N)
        },
        nodeName: function(b5, e) {
            return b5.nodeName && b5.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(b9, ca, b5) {
            var b8, b6 = 0,
                b7 = b9.length,
                e = ac(b9);
            if (b5) {
                if (e) {
                    for (; b6 < b7; b6++) {
                        b8 = ca.apply(b9[b6], b5);
                        if (b8 === false) {
                            break
                        }
                    }
                } else {
                    for (b6 in b9) {
                        b8 = ca.apply(b9[b6], b5);
                        if (b8 === false) {
                            break
                        }
                    }
                }
            } else {
                if (e) {
                    for (; b6 < b7; b6++) {
                        b8 = ca.call(b9[b6], b6, b9[b6]);
                        if (b8 === false) {
                            break
                        }
                    }
                } else {
                    for (b6 in b9) {
                        b8 = ca.call(b9[b6], b6, b9[b6]);
                        if (b8 === false) {
                            break
                        }
                    }
                }
            }
            return b9
        },
        trim: function(e) {
            return e == null ? "" : (e + "").replace(D, "")
        },
        makeArray: function(e, b6) {
            var b5 = b6 || [];
            if (e != null) {
                if (ac(Object(e))) {
                    bH.merge(b5, typeof e === "string" ? [e] : e)
                } else {
                    w.call(b5, e)
                }
            }
            return b5
        },
        inArray: function(b7, b5, b6) {
            var e;
            if (b5) {
                if (bT) {
                    return bT.call(b5, b7, b6)
                }
                e = b5.length;
                b6 = b6 ? b6 < 0 ? Math.max(0, e + b6) : b6 : 0;
                for (; b6 < e; b6++) {
                    if (b6 in b5 && b5[b6] === b7) {
                        return b6
                    }
                }
            }
            return -1
        },
        merge: function(b8, b6) {
            var e = +b6.length,
                b5 = 0,
                b7 = b8.length;
            while (b5 < e) {
                b8[b7++] = b6[b5++]
            }
            if (e !== e) {
                while (b6[b5] !== undefined) {
                    b8[b7++] = b6[b5++]
                }
            }
            b8.length = b7;
            return b8
        },
        grep: function(e, cb, b8) {
            var ca, b7 = [],
                b5 = 0,
                b6 = e.length,
                b9 = !b8;
            for (; b5 < b6; b5++) {
                ca = !cb(e[b5], b5);
                if (ca !== b9) {
                    b7.push(e[b5])
                }
            }
            return b7
        },
        map: function(b6, cb, e) {
            var ca, b8 = 0,
                b9 = b6.length,
                b5 = ac(b6),
                b7 = [];
            if (b5) {
                for (; b8 < b9; b8++) {
                    ca = cb(b6[b8], b8, e);
                    if (ca != null) {
                        b7.push(ca)
                    }
                }
            } else {
                for (b8 in b6) {
                    ca = cb(b6[b8], b8, e);
                    if (ca != null) {
                        b7.push(ca)
                    }
                }
            }
            return ay.apply([], b7)
        },
        guid: 1,
        proxy: function(b8, b7) {
            var e, b6, b5;
            if (typeof b7 === "string") {
                b5 = b8[b7];
                b7 = b8;
                b8 = b5
            }
            if (!bH.isFunction(b8)) {
                return undefined
            }
            e = O.call(arguments, 2);
            b6 = function() {
                return b8.apply(b7 || this, e.concat(O.call(arguments)))
            };
            b6.guid = b8.guid = b8.guid || bH.guid++;
            return b6
        },
        now: function() {
            return +(new Date())
        },
        support: C
    });
    bH.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(b5, e) {
        ab["[object " + e + "]"] = e.toLowerCase()
    });

    function ac(b6) {
        var b5 = b6.length,
            e = bH.type(b6);
        if (e === "function" || bH.isWindow(b6)) {
            return false
        }
        if (b6.nodeType === 1 && b5) {
            return true
        }
        return e === "array" || b5 === 0 || typeof b5 === "number" && b5 > 0 && (b5 - 1) in b6
    }
    var m = (function(dd) {
        var cx, dg, cm, cG, cJ, ch, cV, df, dl, cH, cW, cY, cB, cn, c7, c2, de, cd, cE, c9 = "sizzle" + 1 * new Date(),
            cI = dd.document,
            dh = 0,
            c3 = 0,
            b8 = cz(),
            c8 = cz(),
            cF = cz(),
            cD = function(dm, e) {
                if (dm === e) {
                    cW = true
                }
                return 0
            },
            cP = 1 << 31,
            cN = ({}).hasOwnProperty,
            db = [],
            dc = db.pop,
            cL = db.push,
            b6 = db.push,
            cl = db.slice,
            cc = function(dp, dn) {
                var dm = 0,
                    e = dp.length;
                for (; dm < e; dm++) {
                    if (dp[dm] === dn) {
                        return dm
                    }
                }
                return -1
            },
            b7 = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            co = "[\\x20\\t\\r\\n\\f]",
            b5 = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            cK = b5.replace("w", "w#"),
            c5 = "\\[" + co + "*(" + b5 + ")(?:" + co + "*([*^$|!~]?=)" + co + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + cK + "))|)" + co + "*\\]",
            cj = ":(" + b5 + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + c5 + ")*)|.*)\\)|)",
            ct = new RegExp(co + "+", "g"),
            cq = new RegExp("^" + co + "+|((?:^|[^\\\\])(?:\\\\.)*)" + co + "+$", "g"),
            cu = new RegExp("^" + co + "*," + co + "*"),
            cA = new RegExp("^" + co + "*([>+~]|" + co + ")" + co + "*"),
            cs = new RegExp("=" + co + "*([^\\]'\"]*?)" + co + "*\\]", "g"),
            cR = new RegExp(cj),
            cT = new RegExp("^" + cK + "$"),
            c1 = {
                ID: new RegExp("^#(" + b5 + ")"),
                CLASS: new RegExp("^\\.(" + b5 + ")"),
                TAG: new RegExp("^(" + b5.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + c5),
                PSEUDO: new RegExp("^" + cj),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + co + "*(even|odd|(([+-]|)(\\d*)n|)" + co + "*(?:([+-]|)" + co + "*(\\d+)|))" + co + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + b7 + ")$", "i"),
                needsContext: new RegExp("^" + co + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + co + "*((?:-\\d)?\\d*)" + co + "*\\)|)(?=[^-]|$)", "i")
            },
            cb = /^(?:input|select|textarea|button)$/i,
            ck = /^h\d$/i,
            cO = /^[^{]+\{\s*\[native \w/,
            cQ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            c0 = /[+~]/,
            cM = /'|\\/g,
            cr = new RegExp("\\\\([\\da-f]{1,6}" + co + "?|(" + co + ")|.)", "ig"),
            c4 = function(e, dp, dm) {
                var dn = "0x" + dp - 65536;
                return dn !== dn || dm ? dp : dn < 0 ? String.fromCharCode(dn + 65536) : String.fromCharCode(dn >> 10 | 55296, dn & 1023 | 56320)
            },
            dk = function() {
                cY()
            };
        try {
            b6.apply((db = cl.call(cI.childNodes)), cI.childNodes);
            db[cI.childNodes.length].nodeType
        } catch (cC) {
            b6 = {
                apply: db.length ? function(dm, e) {
                    cL.apply(dm, cl.call(e))
                } : function(dp, dn) {
                    var e = dp.length,
                        dm = 0;
                    while ((dp[e++] = dn[dm++])) {}
                    dp.length = e - 1
                }
            }
        }

        function cv(du, dm, dy, dA) {
            var dz, dr, ds, dw, dx, dq, dp, e, dn, dv;
            if ((dm ? dm.ownerDocument || dm : cI) !== cB) {
                cY(dm)
            }
            dm = dm || cB;
            dy = dy || [];
            dw = dm.nodeType;
            if (typeof du !== "string" || !du || dw !== 1 && dw !== 9 && dw !== 11) {
                return dy
            }
            if (!dA && c7) {
                if (dw !== 11 && (dz = cQ.exec(du))) {
                    if ((ds = dz[1])) {
                        if (dw === 9) {
                            dr = dm.getElementById(ds);
                            if (dr && dr.parentNode) {
                                if (dr.id === ds) {
                                    dy.push(dr);
                                    return dy
                                }
                            } else {
                                return dy
                            }
                        } else {
                            if (dm.ownerDocument && (dr = dm.ownerDocument.getElementById(ds)) && cE(dm, dr) && dr.id === ds) {
                                dy.push(dr);
                                return dy
                            }
                        }
                    } else {
                        if (dz[2]) {
                            b6.apply(dy, dm.getElementsByTagName(du));
                            return dy
                        } else {
                            if ((ds = dz[3]) && dg.getElementsByClassName) {
                                b6.apply(dy, dm.getElementsByClassName(ds));
                                return dy
                            }
                        }
                    }
                }
                if (dg.qsa && (!c2 || !c2.test(du))) {
                    e = dp = c9;
                    dn = dm;
                    dv = dw !== 1 && du;
                    if (dw === 1 && dm.nodeName.toLowerCase() !== "object") {
                        dq = ch(du);
                        if ((dp = dm.getAttribute("id"))) {
                            e = dp.replace(cM, "\\$&")
                        } else {
                            dm.setAttribute("id", e)
                        }
                        e = "[id='" + e + "'] ";
                        dx = dq.length;
                        while (dx--) {
                            dq[dx] = e + cg(dq[dx])
                        }
                        dn = c0.test(du) && cS(dm.parentNode) || dm;
                        dv = dq.join(",")
                    }
                    if (dv) {
                        try {
                            b6.apply(dy, dn.querySelectorAll(dv));
                            return dy
                        } catch (dt) {} finally {
                            if (!dp) {
                                dm.removeAttribute("id")
                            }
                        }
                    }
                }
            }
            return df(du.replace(cq, "$1"), dm, dy, dA)
        }

        function cz() {
            var dm = [];

            function e(dn, dp) {
                if (dm.push(dn + " ") > cm.cacheLength) {
                    delete e[dm.shift()]
                }
                return (e[dn + " "] = dp)
            }
            return e
        }

        function ci(e) {
            e[c9] = true;
            return e
        }

        function ce(dm) {
            var dp = cB.createElement("div");
            try {
                return !!dm(dp)
            } catch (dn) {
                return false
            } finally {
                if (dp.parentNode) {
                    dp.parentNode.removeChild(dp)
                }
                dp = null
            }
        }

        function di(dm, dp) {
            var e = dm.split("|"),
                dn = dm.length;
            while (dn--) {
                cm.attrHandle[e[dn]] = dp
            }
        }

        function b9(dm, e) {
            var dp = e && dm,
                dn = dp && dm.nodeType === 1 && e.nodeType === 1 && (~e.sourceIndex || cP) - (~dm.sourceIndex || cP);
            if (dn) {
                return dn
            }
            if (dp) {
                while ((dp = dp.nextSibling)) {
                    if (dp === e) {
                        return -1
                    }
                }
            }
            return dm ? 1 : -1
        }

        function cw(e) {
            return function(dn) {
                var dm = dn.nodeName.toLowerCase();
                return dm === "input" && dn.type === e
            }
        }

        function ca(e) {
            return function(dn) {
                var dm = dn.nodeName.toLowerCase();
                return (dm === "input" || dm === "button") && dn.type === e
            }
        }

        function c6(e) {
            return ci(function(dm) {
                dm = +dm;
                return ci(function(dn, ds) {
                    var dq, dp = e([], dn.length, dm),
                        dr = dp.length;
                    while (dr--) {
                        if (dn[(dq = dp[dr])]) {
                            dn[dq] = !(ds[dq] = dn[dq])
                        }
                    }
                })
            })
        }

        function cS(e) {
            return e && typeof e.getElementsByTagName !== "undefined" && e
        }
        dg = cv.support = {};
        cJ = cv.isXML = function(e) {
            var dm = e && (e.ownerDocument || e).documentElement;
            return dm ? dm.nodeName !== "HTML" : false
        };
        cY = cv.setDocument = function(dn) {
            var e, dm, dp = dn ? dn.ownerDocument || dn : cI;
            if (dp === cB || dp.nodeType !== 9 || !dp.documentElement) {
                return cB
            }
            cB = dp;
            cn = dp.documentElement;
            dm = dp.defaultView;
            if (dm && dm !== dm.top) {
                if (dm.addEventListener) {
                    dm.addEventListener("unload", dk, false)
                } else {
                    if (dm.attachEvent) {
                        dm.attachEvent("onunload", dk)
                    }
                }
            }
            c7 = !cJ(dp);
            dg.attributes = ce(function(dq) {
                dq.className = "i";
                return !dq.getAttribute("className")
            });
            dg.getElementsByTagName = ce(function(dq) {
                dq.appendChild(dp.createComment(""));
                return !dq.getElementsByTagName("*").length
            });
            dg.getElementsByClassName = cO.test(dp.getElementsByClassName);
            dg.getById = ce(function(dq) {
                cn.appendChild(dq).id = c9;
                return !dp.getElementsByName || !dp.getElementsByName(c9).length
            });
            if (dg.getById) {
                cm.find.ID = function(ds, dr) {
                    if (typeof dr.getElementById !== "undefined" && c7) {
                        var dq = dr.getElementById(ds);
                        return dq && dq.parentNode ? [dq] : []
                    }
                };
                cm.filter.ID = function(dr) {
                    var dq = dr.replace(cr, c4);
                    return function(ds) {
                        return ds.getAttribute("id") === dq
                    }
                }
            } else {
                delete cm.find.ID;
                cm.filter.ID = function(dr) {
                    var dq = dr.replace(cr, c4);
                    return function(dt) {
                        var ds = typeof dt.getAttributeNode !== "undefined" && dt.getAttributeNode("id");
                        return ds && ds.value === dq
                    }
                }
            }
            cm.find.TAG = dg.getElementsByTagName ? function(dq, dr) {
                if (typeof dr.getElementsByTagName !== "undefined") {
                    return dr.getElementsByTagName(dq)
                } else {
                    if (dg.qsa) {
                        return dr.querySelectorAll(dq)
                    }
                }
            } : function(dq, du) {
                var dv, dt = [],
                    ds = 0,
                    dr = du.getElementsByTagName(dq);
                if (dq === "*") {
                    while ((dv = dr[ds++])) {
                        if (dv.nodeType === 1) {
                            dt.push(dv)
                        }
                    }
                    return dt
                }
                return dr
            };
            cm.find.CLASS = dg.getElementsByClassName && function(dr, dq) {
                if (c7) {
                    return dq.getElementsByClassName(dr)
                }
            };
            de = [];
            c2 = [];
            if ((dg.qsa = cO.test(dp.querySelectorAll))) {
                ce(function(dq) {
                    cn.appendChild(dq).innerHTML = "<a id='" + c9 + "'></a><select id='" + c9 + "-\f]' msallowcapture=''><option selected=''></option></select>";
                    if (dq.querySelectorAll("[msallowcapture^='']").length) {
                        c2.push("[*^$]=" + co + "*(?:''|\"\")")
                    }
                    if (!dq.querySelectorAll("[selected]").length) {
                        c2.push("\\[" + co + "*(?:value|" + b7 + ")")
                    }
                    if (!dq.querySelectorAll("[id~=" + c9 + "-]").length) {
                        c2.push("~=")
                    }
                    if (!dq.querySelectorAll(":checked").length) {
                        c2.push(":checked")
                    }
                    if (!dq.querySelectorAll("a#" + c9 + "+*").length) {
                        c2.push(".#.+[+~]")
                    }
                });
                ce(function(dr) {
                    var dq = dp.createElement("input");
                    dq.setAttribute("type", "hidden");
                    dr.appendChild(dq).setAttribute("name", "D");
                    if (dr.querySelectorAll("[name=d]").length) {
                        c2.push("name" + co + "*[*^$|!~]?=")
                    }
                    if (!dr.querySelectorAll(":enabled").length) {
                        c2.push(":enabled", ":disabled")
                    }
                    dr.querySelectorAll("*,:x");
                    c2.push(",.*:")
                })
            }
            if ((dg.matchesSelector = cO.test((cd = cn.matches || cn.webkitMatchesSelector || cn.mozMatchesSelector || cn.oMatchesSelector || cn.msMatchesSelector)))) {
                ce(function(dq) {
                    dg.disconnectedMatch = cd.call(dq, "div");
                    cd.call(dq, "[s!='']:x");
                    de.push("!=", cj)
                })
            }
            c2 = c2.length && new RegExp(c2.join("|"));
            de = de.length && new RegExp(de.join("|"));
            e = cO.test(cn.compareDocumentPosition);
            cE = e || cO.test(cn.contains) ? function(dr, dq) {
                var dt = dr.nodeType === 9 ? dr.documentElement : dr,
                    ds = dq && dq.parentNode;
                return dr === ds || !!(ds && ds.nodeType === 1 && (dt.contains ? dt.contains(ds) : dr.compareDocumentPosition && dr.compareDocumentPosition(ds) & 16))
            } : function(dr, dq) {
                if (dq) {
                    while ((dq = dq.parentNode)) {
                        if (dq === dr) {
                            return true
                        }
                    }
                }
                return false
            };
            cD = e ? function(dr, dq) {
                if (dr === dq) {
                    cW = true;
                    return 0
                }
                var ds = !dr.compareDocumentPosition - !dq.compareDocumentPosition;
                if (ds) {
                    return ds
                }
                ds = (dr.ownerDocument || dr) === (dq.ownerDocument || dq) ? dr.compareDocumentPosition(dq) : 1;
                if (ds & 1 || (!dg.sortDetached && dq.compareDocumentPosition(dr) === ds)) {
                    if (dr === dp || dr.ownerDocument === cI && cE(cI, dr)) {
                        return -1
                    }
                    if (dq === dp || dq.ownerDocument === cI && cE(cI, dq)) {
                        return 1
                    }
                    return cH ? (cc(cH, dr) - cc(cH, dq)) : 0
                }
                return ds & 4 ? -1 : 1
            } : function(dr, dq) {
                if (dr === dq) {
                    cW = true;
                    return 0
                }
                var dx, du = 0,
                    dw = dr.parentNode,
                    dt = dq.parentNode,
                    ds = [dr],
                    dv = [dq];
                if (!dw || !dt) {
                    return dr === dp ? -1 : dq === dp ? 1 : dw ? -1 : dt ? 1 : cH ? (cc(cH, dr) - cc(cH, dq)) : 0
                } else {
                    if (dw === dt) {
                        return b9(dr, dq)
                    }
                }
                dx = dr;
                while ((dx = dx.parentNode)) {
                    ds.unshift(dx)
                }
                dx = dq;
                while ((dx = dx.parentNode)) {
                    dv.unshift(dx)
                }
                while (ds[du] === dv[du]) {
                    du++
                }
                return du ? b9(ds[du], dv[du]) : ds[du] === cI ? -1 : dv[du] === cI ? 1 : 0
            };
            return dp
        };
        cv.matches = function(dm, e) {
            return cv(dm, null, null, e)
        };
        cv.matchesSelector = function(dn, dq) {
            if ((dn.ownerDocument || dn) !== cB) {
                cY(dn)
            }
            dq = dq.replace(cs, "='$1']");
            if (dg.matchesSelector && c7 && (!de || !de.test(dq)) && (!c2 || !c2.test(dq))) {
                try {
                    var dm = cd.call(dn, dq);
                    if (dm || dg.disconnectedMatch || dn.document && dn.document.nodeType !== 11) {
                        return dm
                    }
                } catch (dp) {}
            }
            return cv(dq, cB, null, [dn]).length > 0
        };
        cv.contains = function(e, dm) {
            if ((e.ownerDocument || e) !== cB) {
                cY(e)
            }
            return cE(e, dm)
        };
        cv.attr = function(dn, e) {
            if ((dn.ownerDocument || dn) !== cB) {
                cY(dn)
            }
            var dm = cm.attrHandle[e.toLowerCase()],
                dp = dm && cN.call(cm.attrHandle, e.toLowerCase()) ? dm(dn, e, !c7) : undefined;
            return dp !== undefined ? dp : dg.attributes || !c7 ? dn.getAttribute(e) : (dp = dn.getAttributeNode(e)) && dp.specified ? dp.value : null
        };
        cv.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        cv.uniqueSort = function(dn) {
            var dp, dq = [],
                e = 0,
                dm = 0;
            cW = !dg.detectDuplicates;
            cH = !dg.sortStable && dn.slice(0);
            dn.sort(cD);
            if (cW) {
                while ((dp = dn[dm++])) {
                    if (dp === dn[dm]) {
                        e = dq.push(dm)
                    }
                }
                while (e--) {
                    dn.splice(dq[e], 1)
                }
            }
            cH = null;
            return dn
        };
        cG = cv.getText = function(dq) {
            var dp, dm = "",
                dn = 0,
                e = dq.nodeType;
            if (!e) {
                while ((dp = dq[dn++])) {
                    dm += cG(dp)
                }
            } else {
                if (e === 1 || e === 9 || e === 11) {
                    if (typeof dq.textContent === "string") {
                        return dq.textContent
                    } else {
                        for (dq = dq.firstChild; dq; dq = dq.nextSibling) {
                            dm += cG(dq)
                        }
                    }
                } else {
                    if (e === 3 || e === 4) {
                        return dq.nodeValue
                    }
                }
            }
            return dm
        };
        cm = cv.selectors = {
            cacheLength: 50,
            createPseudo: ci,
            match: c1,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace(cr, c4);
                    e[3] = (e[3] || e[4] || e[5] || "").replace(cr, c4);
                    if (e[2] === "~=") {
                        e[3] = " " + e[3] + " "
                    }
                    return e.slice(0, 4)
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    if (e[1].slice(0, 3) === "nth") {
                        if (!e[3]) {
                            cv.error(e[0])
                        }
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                        e[5] = +((e[7] + e[8]) || e[3] === "odd")
                    } else {
                        if (e[3]) {
                            cv.error(e[0])
                        }
                    }
                    return e
                },
                PSEUDO: function(dm) {
                    var e, dn = !dm[6] && dm[2];
                    if (c1.CHILD.test(dm[0])) {
                        return null
                    }
                    if (dm[3]) {
                        dm[2] = dm[4] || dm[5] || ""
                    } else {
                        if (dn && cR.test(dn) && (e = ch(dn, true)) && (e = dn.indexOf(")", dn.length - e) - dn.length)) {
                            dm[0] = dm[0].slice(0, e);
                            dm[2] = dn.slice(0, e)
                        }
                    }
                    return dm.slice(0, 3)
                }
            },
            filter: {
                TAG: function(dm) {
                    var e = dm.replace(cr, c4).toLowerCase();
                    return dm === "*" ? function() {
                        return true
                    } : function(dn) {
                        return dn.nodeName && dn.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(e) {
                    var dm = b8[e + " "];
                    return dm || (dm = new RegExp("(^|" + co + ")" + e + "(" + co + "|$)")) && b8(e, function(dn) {
                        return dm.test(typeof dn.className === "string" && dn.className || typeof dn.getAttribute !== "undefined" && dn.getAttribute("class") || "")
                    })
                },
                ATTR: function(dn, dm, e) {
                    return function(dq) {
                        var dp = cv.attr(dq, dn);
                        if (dp == null) {
                            return dm === "!="
                        }
                        if (!dm) {
                            return true
                        }
                        dp += "";
                        return dm === "=" ? dp === e : dm === "!=" ? dp !== e : dm === "^=" ? e && dp.indexOf(e) === 0 : dm === "*=" ? e && dp.indexOf(e) > -1 : dm === "$=" ? e && dp.slice(-e.length) === e : dm === "~=" ? (" " + dp.replace(ct, " ") + " ").indexOf(e) > -1 : dm === "|=" ? dp === e || dp.slice(0, e.length + 1) === e + "-" : false
                    }
                },
                CHILD: function(dm, dq, dp, dr, dn) {
                    var dt = dm.slice(0, 3) !== "nth",
                        e = dm.slice(-4) !== "last",
                        ds = dq === "of-type";
                    return dr === 1 && dn === 0 ? function(du) {
                        return !!du.parentNode
                    } : function(dA, dy, dD) {
                        var du, dG, dB, dF, dC, dx, dz = dt !== e ? "nextSibling" : "previousSibling",
                            dE = dA.parentNode,
                            dw = ds && dA.nodeName.toLowerCase(),
                            dv = !dD && !ds;
                        if (dE) {
                            if (dt) {
                                while (dz) {
                                    dB = dA;
                                    while ((dB = dB[dz])) {
                                        if (ds ? dB.nodeName.toLowerCase() === dw : dB.nodeType === 1) {
                                            return false
                                        }
                                    }
                                    dx = dz = dm === "only" && !dx && "nextSibling"
                                }
                                return true
                            }
                            dx = [e ? dE.firstChild : dE.lastChild];
                            if (e && dv) {
                                dG = dE[c9] || (dE[c9] = {});
                                du = dG[dm] || [];
                                dC = du[0] === dh && du[1];
                                dF = du[0] === dh && du[2];
                                dB = dC && dE.childNodes[dC];
                                while ((dB = ++dC && dB && dB[dz] || (dF = dC = 0) || dx.pop())) {
                                    if (dB.nodeType === 1 && ++dF && dB === dA) {
                                        dG[dm] = [dh, dC, dF];
                                        break
                                    }
                                }
                            } else {
                                if (dv && (du = (dA[c9] || (dA[c9] = {}))[dm]) && du[0] === dh) {
                                    dF = du[1]
                                } else {
                                    while ((dB = ++dC && dB && dB[dz] || (dF = dC = 0) || dx.pop())) {
                                        if ((ds ? dB.nodeName.toLowerCase() === dw : dB.nodeType === 1) && ++dF) {
                                            if (dv) {
                                                (dB[c9] || (dB[c9] = {}))[dm] = [dh, dF]
                                            }
                                            if (dB === dA) {
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            dF -= dn;
                            return dF === dr || (dF % dr === 0 && dF / dr >= 0)
                        }
                    }
                },
                PSEUDO: function(dp, dn) {
                    var e, dm = cm.pseudos[dp] || cm.setFilters[dp.toLowerCase()] || cv.error("unsupported pseudo: " + dp);
                    if (dm[c9]) {
                        return dm(dn)
                    }
                    if (dm.length > 1) {
                        e = [dp, dp, "", dn];
                        return cm.setFilters.hasOwnProperty(dp.toLowerCase()) ? ci(function(ds, du) {
                            var dr, dq = dm(ds, dn),
                                dt = dq.length;
                            while (dt--) {
                                dr = cc(ds, dq[dt]);
                                ds[dr] = !(du[dr] = dq[dt])
                            }
                        }) : function(dq) {
                            return dm(dq, 0, e)
                        }
                    }
                    return dm
                }
            },
            pseudos: {
                not: ci(function(e) {
                    var dm = [],
                        dn = [],
                        dp = cV(e.replace(cq, "$1"));
                    return dp[c9] ? ci(function(dr, dw, du, ds) {
                        var dv, dq = dp(dr, null, ds, []),
                            dt = dr.length;
                        while (dt--) {
                            if ((dv = dq[dt])) {
                                dr[dt] = !(dw[dt] = dv)
                            }
                        }
                    }) : function(ds, dr, dq) {
                        dm[0] = ds;
                        dp(dm, null, dq, dn);
                        dm[0] = null;
                        return !dn.pop()
                    }
                }),
                has: ci(function(e) {
                    return function(dm) {
                        return cv(e, dm).length > 0
                    }
                }),
                contains: ci(function(e) {
                    e = e.replace(cr, c4);
                    return function(dm) {
                        return (dm.textContent || dm.innerText || cG(dm)).indexOf(e) > -1
                    }
                }),
                lang: ci(function(e) {
                    if (!cT.test(e || "")) {
                        cv.error("unsupported lang: " + e)
                    }
                    e = e.replace(cr, c4).toLowerCase();
                    return function(dn) {
                        var dm;
                        do {
                            if ((dm = c7 ? dn.lang : dn.getAttribute("xml:lang") || dn.getAttribute("lang"))) {
                                dm = dm.toLowerCase();
                                return dm === e || dm.indexOf(e + "-") === 0
                            }
                        } while ((dn = dn.parentNode) && dn.nodeType === 1);
                        return false
                    }
                }),
                target: function(e) {
                    var dm = dd.location && dd.location.hash;
                    return dm && dm.slice(1) === e.id
                },
                root: function(e) {
                    return e === cn
                },
                focus: function(e) {
                    return e === cB.activeElement && (!cB.hasFocus || cB.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === false
                },
                disabled: function(e) {
                    return e.disabled === true
                },
                checked: function(e) {
                    var dm = e.nodeName.toLowerCase();
                    return (dm === "input" && !!e.checked) || (dm === "option" && !!e.selected)
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeType < 6) {
                            return false
                        }
                    }
                    return true
                },
                parent: function(e) {
                    return !cm.pseudos.empty(e)
                },
                header: function(e) {
                    return ck.test(e.nodeName)
                },
                input: function(e) {
                    return cb.test(e.nodeName)
                },
                button: function(dm) {
                    var e = dm.nodeName.toLowerCase();
                    return e === "input" && dm.type === "button" || e === "button"
                },
                text: function(dm) {
                    var e;
                    return dm.nodeName.toLowerCase() === "input" && dm.type === "text" && ((e = dm.getAttribute("type")) == null || e.toLowerCase() === "text")
                },
                first: c6(function() {
                    return [0]
                }),
                last: c6(function(e, dm) {
                    return [dm - 1]
                }),
                eq: c6(function(e, dn, dm) {
                    return [dm < 0 ? dm + dn : dm]
                }),
                even: c6(function(e, dn) {
                    var dm = 0;
                    for (; dm < dn; dm += 2) {
                        e.push(dm)
                    }
                    return e
                }),
                odd: c6(function(e, dn) {
                    var dm = 1;
                    for (; dm < dn; dm += 2) {
                        e.push(dm)
                    }
                    return e
                }),
                lt: c6(function(e, dp, dn) {
                    var dm = dn < 0 ? dn + dp : dn;
                    for (; --dm >= 0;) {
                        e.push(dm)
                    }
                    return e
                }),
                gt: c6(function(e, dp, dn) {
                    var dm = dn < 0 ? dn + dp : dn;
                    for (; ++dm < dp;) {
                        e.push(dm)
                    }
                    return e
                })
            }
        };
        cm.pseudos.nth = cm.pseudos.eq;
        for (cx in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
            cm.pseudos[cx] = cw(cx)
        }
        for (cx in {
                submit: true,
                reset: true
            }) {
            cm.pseudos[cx] = ca(cx)
        }

        function cU() {}
        cU.prototype = cm.filters = cm.pseudos;
        cm.setFilters = new cU();
        ch = cv.tokenize = function(dq, dv) {
            var dm, dr, dt, du, ds, dn, e, dp = c8[dq + " "];
            if (dp) {
                return dv ? 0 : dp.slice(0)
            }
            ds = dq;
            dn = [];
            e = cm.preFilter;
            while (ds) {
                if (!dm || (dr = cu.exec(ds))) {
                    if (dr) {
                        ds = ds.slice(dr[0].length) || ds
                    }
                    dn.push((dt = []))
                }
                dm = false;
                if ((dr = cA.exec(ds))) {
                    dm = dr.shift();
                    dt.push({
                        value: dm,
                        type: dr[0].replace(cq, " ")
                    });
                    ds = ds.slice(dm.length)
                }
                for (du in cm.filter) {
                    if ((dr = c1[du].exec(ds)) && (!e[du] || (dr = e[du](dr)))) {
                        dm = dr.shift();
                        dt.push({
                            value: dm,
                            type: du,
                            matches: dr
                        });
                        ds = ds.slice(dm.length)
                    }
                }
                if (!dm) {
                    break
                }
            }
            return dv ? ds.length : ds ? cv.error(dq) : c8(dq, dn).slice(0)
        };

        function cg(dp) {
            var dn = 0,
                dm = dp.length,
                e = "";
            for (; dn < dm; dn++) {
                e += dp[dn].value
            }
            return e
        }

        function cp(dq, dn, dp) {
            var e = dn.dir,
                dr = dp && e === "parentNode",
                dm = c3++;
            return dn.first ? function(du, dt, ds) {
                while ((du = du[e])) {
                    if (du.nodeType === 1 || dr) {
                        return dq(du, dt, ds)
                    }
                }
            } : function(dw, du, dt) {
                var dx, dv, ds = [dh, dm];
                if (dt) {
                    while ((dw = dw[e])) {
                        if (dw.nodeType === 1 || dr) {
                            if (dq(dw, du, dt)) {
                                return true
                            }
                        }
                    }
                } else {
                    while ((dw = dw[e])) {
                        if (dw.nodeType === 1 || dr) {
                            dv = dw[c9] || (dw[c9] = {});
                            if ((dx = dv[e]) && dx[0] === dh && dx[1] === dm) {
                                return (ds[2] = dx[2])
                            } else {
                                dv[e] = ds;
                                if ((ds[2] = dq(dw, du, dt))) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        function dj(e) {
            return e.length > 1 ? function(dq, dp, dm) {
                var dn = e.length;
                while (dn--) {
                    if (!e[dn](dq, dp, dm)) {
                        return false
                    }
                }
                return true
            } : e[0]
        }

        function cy(dm, dq, dp) {
            var dn = 0,
                e = dq.length;
            for (; dn < e; dn++) {
                cv(dm, dq[dn], dp)
            }
            return dp
        }

        function cZ(e, dm, dn, dp, ds) {
            var dq, dv = [],
                dr = 0,
                dt = e.length,
                du = dm != null;
            for (; dr < dt; dr++) {
                if ((dq = e[dr])) {
                    if (!dn || dn(dq, dp, ds)) {
                        dv.push(dq);
                        if (du) {
                            dm.push(dr)
                        }
                    }
                }
            }
            return dv
        }

        function cf(dn, dm, dq, dp, dr, e) {
            if (dp && !dp[c9]) {
                dp = cf(dp)
            }
            if (dr && !dr[c9]) {
                dr = cf(dr, e)
            }
            return ci(function(dC, dz, du, dB) {
                var dE, dA, dw, dv = [],
                    dD = [],
                    dt = dz.length,
                    ds = dC || cy(dm || "*", du.nodeType ? [du] : du, []),
                    dx = dn && (dC || !dm) ? cZ(ds, dv, dn, du, dB) : ds,
                    dy = dq ? dr || (dC ? dn : dt || dp) ? [] : dz : dx;
                if (dq) {
                    dq(dx, dy, du, dB)
                }
                if (dp) {
                    dE = cZ(dy, dD);
                    dp(dE, [], du, dB);
                    dA = dE.length;
                    while (dA--) {
                        if ((dw = dE[dA])) {
                            dy[dD[dA]] = !(dx[dD[dA]] = dw)
                        }
                    }
                }
                if (dC) {
                    if (dr || dn) {
                        if (dr) {
                            dE = [];
                            dA = dy.length;
                            while (dA--) {
                                if ((dw = dy[dA])) {
                                    dE.push((dx[dA] = dw))
                                }
                            }
                            dr(null, (dy = []), dE, dB)
                        }
                        dA = dy.length;
                        while (dA--) {
                            if ((dw = dy[dA]) && (dE = dr ? cc(dC, dw) : dv[dA]) > -1) {
                                dC[dE] = !(dz[dE] = dw)
                            }
                        }
                    }
                } else {
                    dy = cZ(dy === dz ? dy.splice(dt, dy.length) : dy);
                    if (dr) {
                        dr(null, dz, dy, dB)
                    } else {
                        b6.apply(dz, dy)
                    }
                }
            })
        }

        function da(ds) {
            var dm, dq, dn, dr = ds.length,
                dv = cm.relative[ds[0].type],
                dw = dv || cm.relative[" "],
                dp = dv ? 1 : 0,
                dt = cp(function(dx) {
                    return dx === dm
                }, dw, true),
                du = cp(function(dx) {
                    return cc(dm, dx) > -1
                }, dw, true),
                e = [function(dA, dz, dy) {
                    var dx = (!dv && (dy || dz !== dl)) || ((dm = dz).nodeType ? dt(dA, dz, dy) : du(dA, dz, dy));
                    dm = null;
                    return dx
                }];
            for (; dp < dr; dp++) {
                if ((dq = cm.relative[ds[dp].type])) {
                    e = [cp(dj(e), dq)]
                } else {
                    dq = cm.filter[ds[dp].type].apply(null, ds[dp].matches);
                    if (dq[c9]) {
                        dn = ++dp;
                        for (; dn < dr; dn++) {
                            if (cm.relative[ds[dn].type]) {
                                break
                            }
                        }
                        return cf(dp > 1 && dj(e), dp > 1 && cg(ds.slice(0, dp - 1).concat({
                            value: ds[dp - 2].type === " " ? "*" : ""
                        })).replace(cq, "$1"), dq, dp < dn && da(ds.slice(dp, dn)), dn < dr && da((ds = ds.slice(dn))), dn < dr && cg(ds))
                    }
                    e.push(dq)
                }
            }
            return dj(e)
        }

        function cX(dp, dn) {
            var e = dn.length > 0,
                dq = dp.length > 0,
                dm = function(dA, du, dz, dy, dD) {
                    var dv, dw, dB, dF = 0,
                        dx = "0",
                        dr = dA && [],
                        dG = [],
                        dE = dl,
                        dt = dA || dq && cm.find.TAG("*", dD),
                        ds = (dh += dE == null ? 1 : Math.random() || 0.1),
                        dC = dt.length;
                    if (dD) {
                        dl = du !== cB && du
                    }
                    for (; dx !== dC && (dv = dt[dx]) != null; dx++) {
                        if (dq && dv) {
                            dw = 0;
                            while ((dB = dp[dw++])) {
                                if (dB(dv, du, dz)) {
                                    dy.push(dv);
                                    break
                                }
                            }
                            if (dD) {
                                dh = ds
                            }
                        }
                        if (e) {
                            if ((dv = !dB && dv)) {
                                dF--
                            }
                            if (dA) {
                                dr.push(dv)
                            }
                        }
                    }
                    dF += dx;
                    if (e && dx !== dF) {
                        dw = 0;
                        while ((dB = dn[dw++])) {
                            dB(dr, dG, du, dz)
                        }
                        if (dA) {
                            if (dF > 0) {
                                while (dx--) {
                                    if (!(dr[dx] || dG[dx])) {
                                        dG[dx] = dc.call(dy)
                                    }
                                }
                            }
                            dG = cZ(dG)
                        }
                        b6.apply(dy, dG);
                        if (dD && !dA && dG.length > 0 && (dF + dn.length) > 1) {
                            cv.uniqueSort(dy)
                        }
                    }
                    if (dD) {
                        dh = ds;
                        dl = dE
                    }
                    return dr
                };
            return e ? ci(dm) : dm
        }
        cV = cv.compile = function(e, dn) {
            var dp, dm = [],
                dr = [],
                dq = cF[e + " "];
            if (!dq) {
                if (!dn) {
                    dn = ch(e)
                }
                dp = dn.length;
                while (dp--) {
                    dq = da(dn[dp]);
                    if (dq[c9]) {
                        dm.push(dq)
                    } else {
                        dr.push(dq)
                    }
                }
                dq = cF(e, cX(dr, dm));
                dq.selector = e
            }
            return dq
        };
        df = cv.select = function(dn, e, dp, ds) {
            var dq, dv, dm, dw, dt, du = typeof dn === "function" && dn,
                dr = !ds && ch((dn = du.selector || dn));
            dp = dp || [];
            if (dr.length === 1) {
                dv = dr[0] = dr[0].slice(0);
                if (dv.length > 2 && (dm = dv[0]).type === "ID" && dg.getById && e.nodeType === 9 && c7 && cm.relative[dv[1].type]) {
                    e = (cm.find.ID(dm.matches[0].replace(cr, c4), e) || [])[0];
                    if (!e) {
                        return dp
                    } else {
                        if (du) {
                            e = e.parentNode
                        }
                    }
                    dn = dn.slice(dv.shift().value.length)
                }
                dq = c1.needsContext.test(dn) ? 0 : dv.length;
                while (dq--) {
                    dm = dv[dq];
                    if (cm.relative[(dw = dm.type)]) {
                        break
                    }
                    if ((dt = cm.find[dw])) {
                        if ((ds = dt(dm.matches[0].replace(cr, c4), c0.test(dv[0].type) && cS(e.parentNode) || e))) {
                            dv.splice(dq, 1);
                            dn = ds.length && cg(dv);
                            if (!dn) {
                                b6.apply(dp, ds);
                                return dp
                            }
                            break
                        }
                    }
                }
            }(du || cV(dn, dr))(ds, e, !c7, dp, c0.test(dn) && cS(e.parentNode) || e);
            return dp
        };
        dg.sortStable = c9.split("").sort(cD).join("") === c9;
        dg.detectDuplicates = !!cW;
        cY();
        dg.sortDetached = ce(function(e) {
            return e.compareDocumentPosition(cB.createElement("div")) & 1
        });
        if (!ce(function(e) {
                e.innerHTML = "<a href='#'></a>";
                return e.firstChild.getAttribute("href") === "#"
            })) {
            di("type|href|height|width", function(dm, e, dn) {
                if (!dn) {
                    return dm.getAttribute(e, e.toLowerCase() === "type" ? 1 : 2)
                }
            })
        }
        if (!dg.attributes || !ce(function(e) {
                e.innerHTML = "<input/>";
                e.firstChild.setAttribute("value", "");
                return e.firstChild.getAttribute("value") === ""
            })) {
            di("value", function(dm, e, dn) {
                if (!dn && dm.nodeName.toLowerCase() === "input") {
                    return dm.defaultValue
                }
            })
        }
        if (!ce(function(e) {
                return e.getAttribute("disabled") == null
            })) {
            di(b7, function(dm, e, dp) {
                var dn;
                if (!dp) {
                    return dm[e] === true ? e.toLowerCase() : (dn = dm.getAttributeNode(e)) && dn.specified ? dn.value : null
                }
            })
        }
        return cv
    })(a4);
    bH.find = m;
    bH.expr = m.selectors;
    bH.expr[":"] = bH.expr.pseudos;
    bH.unique = m.uniqueSort;
    bH.text = m.getText;
    bH.isXMLDoc = m.isXML;
    bH.contains = m.contains;
    var z = bH.expr.match.needsContext;
    var a = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var aK = /^.[^:#\[\.,]*$/;

    function aQ(b6, e, b5) {
        if (bH.isFunction(e)) {
            return bH.grep(b6, function(b8, b7) {
                return !!e.call(b8, b7, b8) !== b5
            })
        }
        if (e.nodeType) {
            return bH.grep(b6, function(b7) {
                return (b7 === e) !== b5
            })
        }
        if (typeof e === "string") {
            if (aK.test(e)) {
                return bH.filter(e, b6, b5)
            }
            e = bH.filter(e, b6)
        }
        return bH.grep(b6, function(b7) {
            return (bH.inArray(b7, e) >= 0) !== b5
        })
    }
    bH.filter = function(b7, e, b6) {
        var b5 = e[0];
        if (b6) {
            b7 = ":not(" + b7 + ")"
        }
        return e.length === 1 && b5.nodeType === 1 ? bH.find.matchesSelector(b5, b7) ? [b5] : [] : bH.find.matches(b7, bH.grep(e, function(b8) {
            return b8.nodeType === 1
        }))
    };
    bH.fn.extend({
        find: function(b5) {
            var b8, b7 = [],
                b6 = this,
                e = b6.length;
            if (typeof b5 !== "string") {
                return this.pushStack(bH(b5).filter(function() {
                    for (b8 = 0; b8 < e; b8++) {
                        if (bH.contains(b6[b8], this)) {
                            return true
                        }
                    }
                }))
            }
            for (b8 = 0; b8 < e; b8++) {
                bH.find(b5, b6[b8], b7)
            }
            b7 = this.pushStack(e > 1 ? bH.unique(b7) : b7);
            b7.selector = this.selector ? this.selector + " " + b5 : b5;
            return b7
        },
        filter: function(e) {
            return this.pushStack(aQ(this, e || [], false))
        },
        not: function(e) {
            return this.pushStack(aQ(this, e || [], true))
        },
        is: function(e) {
            return !!aQ(this, typeof e === "string" && z.test(e) ? bH(e) : e || [], false).length
        }
    });
    var y, n = a4.document,
        bs = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        bU = bH.fn.init = function(e, b6) {
            var b5, b7;
            if (!e) {
                return this
            }
            if (typeof e === "string") {
                if (e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3) {
                    b5 = [null, e, null]
                } else {
                    b5 = bs.exec(e)
                }
                if (b5 && (b5[1] || !b6)) {
                    if (b5[1]) {
                        b6 = b6 instanceof bH ? b6[0] : b6;
                        bH.merge(this, bH.parseHTML(b5[1], b6 && b6.nodeType ? b6.ownerDocument || b6 : n, true));
                        if (a.test(b5[1]) && bH.isPlainObject(b6)) {
                            for (b5 in b6) {
                                if (bH.isFunction(this[b5])) {
                                    this[b5](b6[b5])
                                } else {
                                    this.attr(b5, b6[b5])
                                }
                            }
                        }
                        return this
                    } else {
                        b7 = n.getElementById(b5[2]);
                        if (b7 && b7.parentNode) {
                            if (b7.id !== b5[2]) {
                                return y.find(e)
                            }
                            this.length = 1;
                            this[0] = b7
                        }
                        this.context = n;
                        this.selector = e;
                        return this
                    }
                } else {
                    if (!b6 || b6.jquery) {
                        return (b6 || y).find(e)
                    } else {
                        return this.constructor(b6).find(e)
                    }
                }
            } else {
                if (e.nodeType) {
                    this.context = this[0] = e;
                    this.length = 1;
                    return this
                } else {
                    if (bH.isFunction(e)) {
                        return typeof y.ready !== "undefined" ? y.ready(e) : e(bH)
                    }
                }
            }
            if (e.selector !== undefined) {
                this.selector = e.selector;
                this.context = e.context
            }
            return bH.makeArray(e, this)
        };
    bU.prototype = bH.fn;
    y = bH(n);
    var bu = /^(?:parents|prev(?:Until|All))/,
        by = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    bH.extend({
        dir: function(b6, b5, b8) {
            var e = [],
                b7 = b6[b5];
            while (b7 && b7.nodeType !== 9 && (b8 === undefined || b7.nodeType !== 1 || !bH(b7).is(b8))) {
                if (b7.nodeType === 1) {
                    e.push(b7)
                }
                b7 = b7[b5]
            }
            return e
        },
        sibling: function(b6, b5) {
            var e = [];
            for (; b6; b6 = b6.nextSibling) {
                if (b6.nodeType === 1 && b6 !== b5) {
                    e.push(b6)
                }
            }
            return e
        }
    });
    bH.fn.extend({
        has: function(b7) {
            var b6, b5 = bH(b7, this),
                e = b5.length;
            return this.filter(function() {
                for (b6 = 0; b6 < e; b6++) {
                    if (bH.contains(this, b5[b6])) {
                        return true
                    }
                }
            })
        },
        closest: function(b8, b7) {
            var b9, b6 = 0,
                b5 = this.length,
                e = [],
                ca = z.test(b8) || typeof b8 !== "string" ? bH(b8, b7 || this.context) : 0;
            for (; b6 < b5; b6++) {
                for (b9 = this[b6]; b9 && b9 !== b7; b9 = b9.parentNode) {
                    if (b9.nodeType < 11 && (ca ? ca.index(b9) > -1 : b9.nodeType === 1 && bH.find.matchesSelector(b9, b8))) {
                        e.push(b9);
                        break
                    }
                }
            }
            return this.pushStack(e.length > 1 ? bH.unique(e) : e)
        },
        index: function(e) {
            if (!e) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
            }
            if (typeof e === "string") {
                return bH.inArray(this[0], bH(e))
            }
            return bH.inArray(e.jquery ? e[0] : e, this)
        },
        add: function(e, b5) {
            return this.pushStack(bH.unique(bH.merge(this.get(), bH(e, b5))))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function aX(b5, e) {
        do {
            b5 = b5[e]
        } while (b5 && b5.nodeType !== 1);
        return b5
    }
    bH.each({
        parent: function(b5) {
            var e = b5.parentNode;
            return e && e.nodeType !== 11 ? e : null
        },
        parents: function(e) {
            return bH.dir(e, "parentNode")
        },
        parentsUntil: function(b5, e, b6) {
            return bH.dir(b5, "parentNode", b6)
        },
        next: function(e) {
            return aX(e, "nextSibling")
        },
        prev: function(e) {
            return aX(e, "previousSibling")
        },
        nextAll: function(e) {
            return bH.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return bH.dir(e, "previousSibling")
        },
        nextUntil: function(b5, e, b6) {
            return bH.dir(b5, "nextSibling", b6)
        },
        prevUntil: function(b5, e, b6) {
            return bH.dir(b5, "previousSibling", b6)
        },
        siblings: function(e) {
            return bH.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return bH.sibling(e.firstChild)
        },
        contents: function(e) {
            return bH.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : bH.merge([], e.childNodes)
        }
    }, function(e, b5) {
        bH.fn[e] = function(b8, b6) {
            var b7 = bH.map(this, b5, b8);
            if (e.slice(-5) !== "Until") {
                b6 = b8
            }
            if (b6 && typeof b6 === "string") {
                b7 = bH.filter(b6, b7)
            }
            if (this.length > 1) {
                if (!by[e]) {
                    b7 = bH.unique(b7)
                }
                if (bu.test(e)) {
                    b7 = b7.reverse()
                }
            }
            return this.pushStack(b7)
        }
    });
    var aE = (/\S+/g);
    var b1 = {};

    function ae(b5) {
        var e = b1[b5] = {};
        bH.each(b5.match(aE) || [], function(b7, b6) {
            e[b6] = true
        });
        return e
    }
    bH.Callbacks = function(ce) {
        ce = typeof ce === "string" ? (b1[ce] || ae(ce)) : bH.extend({}, ce);
        var b8, b7, e, b9, ca, b6, cb = [],
            cc = !ce.once && [],
            b5 = function(cf) {
                b7 = ce.memory && cf;
                e = true;
                ca = b6 || 0;
                b6 = 0;
                b9 = cb.length;
                b8 = true;
                for (; cb && ca < b9; ca++) {
                    if (cb[ca].apply(cf[0], cf[1]) === false && ce.stopOnFalse) {
                        b7 = false;
                        break
                    }
                }
                b8 = false;
                if (cb) {
                    if (cc) {
                        if (cc.length) {
                            b5(cc.shift())
                        }
                    } else {
                        if (b7) {
                            cb = []
                        } else {
                            cd.disable()
                        }
                    }
                }
            },
            cd = {
                add: function() {
                    if (cb) {
                        var cg = cb.length;
                        (function cf(ch) {
                            bH.each(ch, function(cj, ci) {
                                var ck = bH.type(ci);
                                if (ck === "function") {
                                    if (!ce.unique || !cd.has(ci)) {
                                        cb.push(ci)
                                    }
                                } else {
                                    if (ci && ci.length && ck !== "string") {
                                        cf(ci)
                                    }
                                }
                            })
                        })(arguments);
                        if (b8) {
                            b9 = cb.length
                        } else {
                            if (b7) {
                                b6 = cg;
                                b5(b7)
                            }
                        }
                    }
                    return this
                },
                remove: function() {
                    if (cb) {
                        bH.each(arguments, function(ch, cf) {
                            var cg;
                            while ((cg = bH.inArray(cf, cb, cg)) > -1) {
                                cb.splice(cg, 1);
                                if (b8) {
                                    if (cg <= b9) {
                                        b9--
                                    }
                                    if (cg <= ca) {
                                        ca--
                                    }
                                }
                            }
                        })
                    }
                    return this
                },
                has: function(cf) {
                    return cf ? bH.inArray(cf, cb) > -1 : !!(cb && cb.length)
                },
                empty: function() {
                    cb = [];
                    b9 = 0;
                    return this
                },
                disable: function() {
                    cb = cc = b7 = undefined;
                    return this
                },
                disabled: function() {
                    return !cb
                },
                lock: function() {
                    cc = undefined;
                    if (!b7) {
                        cd.disable()
                    }
                    return this
                },
                locked: function() {
                    return !cc
                },
                fireWith: function(cg, cf) {
                    if (cb && (!e || cc)) {
                        cf = cf || [];
                        cf = [cg, cf.slice ? cf.slice() : cf];
                        if (b8) {
                            cc.push(cf)
                        } else {
                            b5(cf)
                        }
                    }
                    return this
                },
                fire: function() {
                    cd.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!e
                }
            };
        return cd
    };
    bH.extend({
        Deferred: function(b6) {
            var b5 = [
                    ["resolve", "done", bH.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", bH.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", bH.Callbacks("memory")]
                ],
                b7 = "pending",
                b8 = {
                    state: function() {
                        return b7
                    },
                    always: function() {
                        e.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var b9 = arguments;
                        return bH.Deferred(function(ca) {
                            bH.each(b5, function(cc, cb) {
                                var cd = bH.isFunction(b9[cc]) && b9[cc];
                                e[cb[1]](function() {
                                    var ce = cd && cd.apply(this, arguments);
                                    if (ce && bH.isFunction(ce.promise)) {
                                        ce.promise().done(ca.resolve).fail(ca.reject).progress(ca.notify)
                                    } else {
                                        ca[cb[0] + "With"](this === b8 ? ca.promise() : this, cd ? [ce] : arguments)
                                    }
                                })
                            });
                            b9 = null
                        }).promise()
                    },
                    promise: function(b9) {
                        return b9 != null ? bH.extend(b9, b8) : b8
                    }
                },
                e = {};
            b8.pipe = b8.then;
            bH.each(b5, function(ca, b9) {
                var cc = b9[2],
                    cb = b9[3];
                b8[b9[1]] = cc.add;
                if (cb) {
                    cc.add(function() {
                        b7 = cb
                    }, b5[ca ^ 1][2].disable, b5[2][2].lock)
                }
                e[b9[0]] = function() {
                    e[b9[0] + "With"](this === e ? b8 : this, arguments);
                    return this
                };
                e[b9[0] + "With"] = cc.fireWith
            });
            b8.promise(e);
            if (b6) {
                b6.call(e, e)
            }
            return e
        },
        when: function(b8) {
            var b6 = 0,
                ca = O.call(arguments),
                e = ca.length,
                b5 = e !== 1 || (b8 && bH.isFunction(b8.promise)) ? e : 0,
                cd = b5 === 1 ? b8 : bH.Deferred(),
                b7 = function(cf, cg, ce) {
                    return function(ch) {
                        cg[cf] = this;
                        ce[cf] = arguments.length > 1 ? O.call(arguments) : ch;
                        if (ce === cc) {
                            cd.notifyWith(cg, ce)
                        } else {
                            if (!(--b5)) {
                                cd.resolveWith(cg, ce)
                            }
                        }
                    }
                },
                cc, b9, cb;
            if (e > 1) {
                cc = new Array(e);
                b9 = new Array(e);
                cb = new Array(e);
                for (; b6 < e; b6++) {
                    if (ca[b6] && bH.isFunction(ca[b6].promise)) {
                        ca[b6].promise().done(b7(b6, cb, ca)).fail(cd.reject).progress(b7(b6, b9, cc))
                    } else {
                        --b5
                    }
                }
            }
            if (!b5) {
                cd.resolveWith(cb, ca)
            }
            return cd.promise()
        }
    });
    var aj;
    bH.fn.ready = function(e) {
        bH.ready.promise().done(e);
        return this
    };
    bH.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(e) {
            if (e) {
                bH.readyWait++
            } else {
                bH.ready(true)
            }
        },
        ready: function(e) {
            if (e === true ? --bH.readyWait : bH.isReady) {
                return
            }
            if (!n.body) {
                return setTimeout(bH.ready)
            }
            bH.isReady = true;
            if (e !== true && --bH.readyWait > 0) {
                return
            }
            aj.resolveWith(n, [bH]);
            if (bH.fn.triggerHandler) {
                bH(n).triggerHandler("ready");
                bH(n).off("ready")
            }
        }
    });

    function bl() {
        if (n.addEventListener) {
            n.removeEventListener("DOMContentLoaded", bY, false);
            a4.removeEventListener("load", bY, false)
        } else {
            n.detachEvent("onreadystatechange", bY);
            a4.detachEvent("onload", bY)
        }
    }

    function bY() {
        if (n.addEventListener || event.type === "load" || n.readyState === "complete") {
            bl();
            bH.ready()
        }
    }
    bH.ready.promise = function(b8) {
        if (!aj) {
            aj = bH.Deferred();
            if (n.readyState === "complete") {
                setTimeout(bH.ready)
            } else {
                if (n.addEventListener) {
                    n.addEventListener("DOMContentLoaded", bY, false);
                    a4.addEventListener("load", bY, false)
                } else {
                    n.attachEvent("onreadystatechange", bY);
                    a4.attachEvent("onload", bY);
                    var b7 = false;
                    try {
                        b7 = a4.frameElement == null && n.documentElement
                    } catch (b6) {}
                    if (b7 && b7.doScroll) {
                        (function b5() {
                            if (!bH.isReady) {
                                try {
                                    b7.doScroll("left")
                                } catch (b9) {
                                    return setTimeout(b5, 50)
                                }
                                bl();
                                bH.ready()
                            }
                        })()
                    }
                }
            }
        }
        return aj.promise(b8)
    };
    var aB = typeof undefined;
    var bg;
    for (bg in bH(C)) {
        break
    }
    C.ownLast = bg !== "0";
    C.inlineBlockNeedsLayout = false;
    bH(function() {
        var b6, b7, e, b5;
        e = n.getElementsByTagName("body")[0];
        if (!e || !e.style) {
            return
        }
        b7 = n.createElement("div");
        b5 = n.createElement("div");
        b5.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        e.appendChild(b5).appendChild(b7);
        if (typeof b7.style.zoom !== aB) {
            b7.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
            C.inlineBlockNeedsLayout = b6 = b7.offsetWidth === 3;
            if (b6) {
                e.style.zoom = 1
            }
        }
        e.removeChild(b5)
    });
    (function() {
        var b6 = n.createElement("div");
        if (C.deleteExpando == null) {
            C.deleteExpando = true;
            try {
                delete b6.test
            } catch (b5) {
                C.deleteExpando = false
            }
        }
        b6 = null
    })();
    bH.acceptData = function(b6) {
        var b5 = bH.noData[(b6.nodeName + " ").toLowerCase()],
            e = +b6.nodeType || 1;
        return e !== 1 && e !== 9 ? false : !b5 || b5 !== true && b6.getAttribute("classid") === b5
    };
    var bx = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        aP = /([A-Z])/g;

    function bz(b7, b6, b8) {
        if (b8 === undefined && b7.nodeType === 1) {
            var b5 = "data-" + b6.replace(aP, "-$1").toLowerCase();
            b8 = b7.getAttribute(b5);
            if (typeof b8 === "string") {
                try {
                    b8 = b8 === "true" ? true : b8 === "false" ? false : b8 === "null" ? null : +b8 + "" === b8 ? +b8 : bx.test(b8) ? bH.parseJSON(b8) : b8
                } catch (b9) {}
                bH.data(b7, b6, b8)
            } else {
                b8 = undefined
            }
        }
        return b8
    }

    function P(b5) {
        var e;
        for (e in b5) {
            if (e === "data" && bH.isEmptyObject(b5[e])) {
                continue
            }
            if (e !== "toJSON") {
                return false
            }
        }
        return true
    }

    function bb(b7, b5, b9, b8) {
        if (!bH.acceptData(b7)) {
            return
        }
        var cb, ca, cc = bH.expando,
            cd = b7.nodeType,
            e = cd ? bH.cache : b7,
            b6 = cd ? b7[cc] : b7[cc] && cc;
        if ((!b6 || !e[b6] || (!b8 && !e[b6].data)) && b9 === undefined && typeof b5 === "string") {
            return
        }
        if (!b6) {
            if (cd) {
                b6 = b7[cc] = aO.pop() || bH.guid++
            } else {
                b6 = cc
            }
        }
        if (!e[b6]) {
            e[b6] = cd ? {} : {
                toJSON: bH.noop
            }
        }
        if (typeof b5 === "object" || typeof b5 === "function") {
            if (b8) {
                e[b6] = bH.extend(e[b6], b5)
            } else {
                e[b6].data = bH.extend(e[b6].data, b5)
            }
        }
        ca = e[b6];
        if (!b8) {
            if (!ca.data) {
                ca.data = {}
            }
            ca = ca.data
        }
        if (b9 !== undefined) {
            ca[bH.camelCase(b5)] = b9
        }
        if (typeof b5 === "string") {
            cb = ca[b5];
            if (cb == null) {
                cb = ca[bH.camelCase(b5)]
            }
        } else {
            cb = ca
        }
        return cb
    }

    function aa(b8, b6, e) {
        if (!bH.acceptData(b8)) {
            return
        }
        var ca, b7, b9 = b8.nodeType,
            b5 = b9 ? bH.cache : b8,
            cb = b9 ? b8[bH.expando] : bH.expando;
        if (!b5[cb]) {
            return
        }
        if (b6) {
            ca = e ? b5[cb] : b5[cb].data;
            if (ca) {
                if (!bH.isArray(b6)) {
                    if (b6 in ca) {
                        b6 = [b6]
                    } else {
                        b6 = bH.camelCase(b6);
                        if (b6 in ca) {
                            b6 = [b6]
                        } else {
                            b6 = b6.split(" ")
                        }
                    }
                } else {
                    b6 = b6.concat(bH.map(b6, bH.camelCase))
                }
                b7 = b6.length;
                while (b7--) {
                    delete ca[b6[b7]]
                }
                if (e ? !P(ca) : !bH.isEmptyObject(ca)) {
                    return
                }
            }
        }
        if (!e) {
            delete b5[cb].data;
            if (!P(b5[cb])) {
                return
            }
        }
        if (b9) {
            bH.cleanData([b8], true)
        } else {
            if (C.deleteExpando || b5 != b5.window) {
                delete b5[cb]
            } else {
                b5[cb] = null
            }
        }
    }
    bH.extend({
        cache: {},
        noData: {
            "applet ": true,
            "embed ": true,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            e = e.nodeType ? bH.cache[e[bH.expando]] : e[bH.expando];
            return !!e && !P(e)
        },
        data: function(b5, e, b6) {
            return bb(b5, e, b6)
        },
        removeData: function(b5, e) {
            return aa(b5, e)
        },
        _data: function(b5, e, b6) {
            return bb(b5, e, b6, true)
        },
        _removeData: function(b5, e) {
            return aa(b5, e, true)
        }
    });
    bH.fn.extend({
        data: function(b7, ca) {
            var b6, b5, b9, b8 = this[0],
                e = b8 && b8.attributes;
            if (b7 === undefined) {
                if (this.length) {
                    b9 = bH.data(b8);
                    if (b8.nodeType === 1 && !bH._data(b8, "parsedAttrs")) {
                        b6 = e.length;
                        while (b6--) {
                            if (e[b6]) {
                                b5 = e[b6].name;
                                if (b5.indexOf("data-") === 0) {
                                    b5 = bH.camelCase(b5.slice(5));
                                    bz(b8, b5, b9[b5])
                                }
                            }
                        }
                        bH._data(b8, "parsedAttrs", true)
                    }
                }
                return b9
            }
            if (typeof b7 === "object") {
                return this.each(function() {
                    bH.data(this, b7)
                })
            }
            return arguments.length > 1 ? this.each(function() {
                bH.data(this, b7, ca)
            }) : b8 ? bz(b8, b7, bH.data(b8, b7)) : undefined
        },
        removeData: function(e) {
            return this.each(function() {
                bH.removeData(this, e)
            })
        }
    });
    bH.extend({
        queue: function(b6, b5, b7) {
            var e;
            if (b6) {
                b5 = (b5 || "fx") + "queue";
                e = bH._data(b6, b5);
                if (b7) {
                    if (!e || bH.isArray(b7)) {
                        e = bH._data(b6, b5, bH.makeArray(b7))
                    } else {
                        e.push(b7)
                    }
                }
                return e || []
            }
        },
        dequeue: function(b9, b8) {
            b8 = b8 || "fx";
            var b5 = bH.queue(b9, b8),
                ca = b5.length,
                b7 = b5.shift(),
                e = bH._queueHooks(b9, b8),
                b6 = function() {
                    bH.dequeue(b9, b8)
                };
            if (b7 === "inprogress") {
                b7 = b5.shift();
                ca--
            }
            if (b7) {
                if (b8 === "fx") {
                    b5.unshift("inprogress")
                }
                delete e.stop;
                b7.call(b9, b6, e)
            }
            if (!ca && e) {
                e.empty.fire()
            }
        },
        _queueHooks: function(b6, b5) {
            var e = b5 + "queueHooks";
            return bH._data(b6, e) || bH._data(b6, e, {
                empty: bH.Callbacks("once memory").add(function() {
                    bH._removeData(b6, b5 + "queue");
                    bH._removeData(b6, e)
                })
            })
        }
    });
    bH.fn.extend({
        queue: function(e, b5) {
            var b6 = 2;
            if (typeof e !== "string") {
                b5 = e;
                e = "fx";
                b6--
            }
            if (arguments.length < b6) {
                return bH.queue(this[0], e)
            }
            return b5 === undefined ? this : this.each(function() {
                var b7 = bH.queue(this, e, b5);
                bH._queueHooks(this, e);
                if (e === "fx" && b7[0] !== "inprogress") {
                    bH.dequeue(this, e)
                }
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                bH.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(b6, ca) {
            var b5, b7 = 1,
                cb = bH.Deferred(),
                b9 = this,
                e = this.length,
                b8 = function() {
                    if (!(--b7)) {
                        cb.resolveWith(b9, [b9])
                    }
                };
            if (typeof b6 !== "string") {
                ca = b6;
                b6 = undefined
            }
            b6 = b6 || "fx";
            while (e--) {
                b5 = bH._data(b9[e], b6 + "queueHooks");
                if (b5 && b5.empty) {
                    b7++;
                    b5.empty.add(b8)
                }
            }
            b8();
            return cb.promise(ca)
        }
    });
    var aD = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var bS = ["Top", "Right", "Bottom", "Left"];
    var R = function(b5, e) {
        b5 = e || b5;
        return bH.css(b5, "display") === "none" || !bH.contains(b5.ownerDocument, b5)
    };
    var aA = bH.access = function(e, b9, cb, ca, b7, cd, cc) {
        var b6 = 0,
            b5 = e.length,
            b8 = cb == null;
        if (bH.type(cb) === "object") {
            b7 = true;
            for (b6 in cb) {
                bH.access(e, b9, b6, cb[b6], true, cd, cc)
            }
        } else {
            if (ca !== undefined) {
                b7 = true;
                if (!bH.isFunction(ca)) {
                    cc = true
                }
                if (b8) {
                    if (cc) {
                        b9.call(e, ca);
                        b9 = null
                    } else {
                        b8 = b9;
                        b9 = function(cf, ce, cg) {
                            return b8.call(bH(cf), cg)
                        }
                    }
                }
                if (b9) {
                    for (; b6 < b5; b6++) {
                        b9(e[b6], cb, cc ? ca : ca.call(e[b6], b6, b9(e[b6], cb)))
                    }
                }
            }
        }
        return b7 ? e : b8 ? b9.call(e) : b5 ? b9(e[0], cb) : cd
    };
    var aL = (/^(?:checkbox|radio)$/i);
    (function() {
        var b5 = n.createElement("input"),
            b8 = n.createElement("div"),
            b6 = n.createDocumentFragment();
        b8.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        C.leadingWhitespace = b8.firstChild.nodeType === 3;
        C.tbody = !b8.getElementsByTagName("tbody").length;
        C.htmlSerialize = !!b8.getElementsByTagName("link").length;
        C.html5Clone = n.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        b5.type = "checkbox";
        b5.checked = true;
        b6.appendChild(b5);
        C.appendChecked = b5.checked;
        b8.innerHTML = "<textarea>x</textarea>";
        C.noCloneChecked = !!b8.cloneNode(true).lastChild.defaultValue;
        b6.appendChild(b8);
        b8.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        C.checkClone = b8.cloneNode(true).cloneNode(true).lastChild.checked;
        C.noCloneEvent = true;
        if (b8.attachEvent) {
            b8.attachEvent("onclick", function() {
                C.noCloneEvent = false
            });
            b8.cloneNode(true).click()
        }
        if (C.deleteExpando == null) {
            C.deleteExpando = true;
            try {
                delete b8.test
            } catch (b7) {
                C.deleteExpando = false
            }
        }
    })();
    (function() {
        var b5, e, b6 = n.createElement("div");
        for (b5 in {
                submit: true,
                change: true,
                focusin: true
            }) {
            e = "on" + b5;
            if (!(C[b5 + "Bubbles"] = e in a4)) {
                b6.setAttribute(e, "t");
                C[b5 + "Bubbles"] = b6.attributes[e].expando === false
            }
        }
        b6 = null
    })();
    var bF = /^(?:input|select|textarea)$/i,
        a5 = /^key/,
        bL = /^(?:mouse|pointer|contextmenu)|click/,
        bB = /^(?:focusinfocus|focusoutblur)$/,
        bw = /^([^.]*)(?:\.(.+)|)$/;

    function T() {
        return true
    }

    function Y() {
        return false
    }

    function al() {
        try {
            return n.activeElement
        } catch (e) {}
    }
    bH.event = {
        global: {},
        add: function(b8, cd, ci, ca, b9) {
            var cb, cj, ck, b6, cf, cc, ch, b7, cg, e, b5, ce = bH._data(b8);
            if (!ce) {
                return
            }
            if (ci.handler) {
                b6 = ci;
                ci = b6.handler;
                b9 = b6.selector
            }
            if (!ci.guid) {
                ci.guid = bH.guid++
            }
            if (!(cj = ce.events)) {
                cj = ce.events = {}
            }
            if (!(cc = ce.handle)) {
                cc = ce.handle = function(cl) {
                    return typeof bH !== aB && (!cl || bH.event.triggered !== cl.type) ? bH.event.dispatch.apply(cc.elem, arguments) : undefined
                };
                cc.elem = b8
            }
            cd = (cd || "").match(aE) || [""];
            ck = cd.length;
            while (ck--) {
                cb = bw.exec(cd[ck]) || [];
                cg = b5 = cb[1];
                e = (cb[2] || "").split(".").sort();
                if (!cg) {
                    continue
                }
                cf = bH.event.special[cg] || {};
                cg = (b9 ? cf.delegateType : cf.bindType) || cg;
                cf = bH.event.special[cg] || {};
                ch = bH.extend({
                    type: cg,
                    origType: b5,
                    data: ca,
                    handler: ci,
                    guid: ci.guid,
                    selector: b9,
                    needsContext: b9 && bH.expr.match.needsContext.test(b9),
                    namespace: e.join(".")
                }, b6);
                if (!(b7 = cj[cg])) {
                    b7 = cj[cg] = [];
                    b7.delegateCount = 0;
                    if (!cf.setup || cf.setup.call(b8, ca, e, cc) === false) {
                        if (b8.addEventListener) {
                            b8.addEventListener(cg, cc, false)
                        } else {
                            if (b8.attachEvent) {
                                b8.attachEvent("on" + cg, cc)
                            }
                        }
                    }
                }
                if (cf.add) {
                    cf.add.call(b8, ch);
                    if (!ch.handler.guid) {
                        ch.handler.guid = ci.guid
                    }
                }
                if (b9) {
                    b7.splice(b7.delegateCount++, 0, ch)
                } else {
                    b7.push(ch)
                }
                bH.event.global[cg] = true
            }
            b8 = null
        },
        remove: function(b7, cd, ck, b8, cc) {
            var ca, ch, cb, b9, cj, ci, cf, b6, cg, e, b5, ce = bH.hasData(b7) && bH._data(b7);
            if (!ce || !(ci = ce.events)) {
                return
            }
            cd = (cd || "").match(aE) || [""];
            cj = cd.length;
            while (cj--) {
                cb = bw.exec(cd[cj]) || [];
                cg = b5 = cb[1];
                e = (cb[2] || "").split(".").sort();
                if (!cg) {
                    for (cg in ci) {
                        bH.event.remove(b7, cg + cd[cj], ck, b8, true)
                    }
                    continue
                }
                cf = bH.event.special[cg] || {};
                cg = (b8 ? cf.delegateType : cf.bindType) || cg;
                b6 = ci[cg] || [];
                cb = cb[2] && new RegExp("(^|\\.)" + e.join("\\.(?:.*\\.|)") + "(\\.|$)");
                b9 = ca = b6.length;
                while (ca--) {
                    ch = b6[ca];
                    if ((cc || b5 === ch.origType) && (!ck || ck.guid === ch.guid) && (!cb || cb.test(ch.namespace)) && (!b8 || b8 === ch.selector || b8 === "**" && ch.selector)) {
                        b6.splice(ca, 1);
                        if (ch.selector) {
                            b6.delegateCount--
                        }
                        if (cf.remove) {
                            cf.remove.call(b7, ch)
                        }
                    }
                }
                if (b9 && !b6.length) {
                    if (!cf.teardown || cf.teardown.call(b7, e, ce.handle) === false) {
                        bH.removeEvent(b7, cg, ce.handle)
                    }
                    delete ci[cg]
                }
            }
            if (bH.isEmptyObject(ci)) {
                delete ce.handle;
                bH._removeData(b7, "events")
            }
        },
        trigger: function(b5, cc, b8, cj) {
            var cd, b7, ch, ci, cf, cb, ca, b9 = [b8 || n],
                cg = J.call(b5, "type") ? b5.type : b5,
                b6 = J.call(b5, "namespace") ? b5.namespace.split(".") : [];
            ch = cb = b8 = b8 || n;
            if (b8.nodeType === 3 || b8.nodeType === 8) {
                return
            }
            if (bB.test(cg + bH.event.triggered)) {
                return
            }
            if (cg.indexOf(".") >= 0) {
                b6 = cg.split(".");
                cg = b6.shift();
                b6.sort()
            }
            b7 = cg.indexOf(":") < 0 && "on" + cg;
            b5 = b5[bH.expando] ? b5 : new bH.Event(cg, typeof b5 === "object" && b5);
            b5.isTrigger = cj ? 2 : 3;
            b5.namespace = b6.join(".");
            b5.namespace_re = b5.namespace ? new RegExp("(^|\\.)" + b6.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            b5.result = undefined;
            if (!b5.target) {
                b5.target = b8
            }
            cc = cc == null ? [b5] : bH.makeArray(cc, [b5]);
            cf = bH.event.special[cg] || {};
            if (!cj && cf.trigger && cf.trigger.apply(b8, cc) === false) {
                return
            }
            if (!cj && !cf.noBubble && !bH.isWindow(b8)) {
                ci = cf.delegateType || cg;
                if (!bB.test(ci + cg)) {
                    ch = ch.parentNode
                }
                for (; ch; ch = ch.parentNode) {
                    b9.push(ch);
                    cb = ch
                }
                if (cb === (b8.ownerDocument || n)) {
                    b9.push(cb.defaultView || cb.parentWindow || a4)
                }
            }
            ca = 0;
            while ((ch = b9[ca++]) && !b5.isPropagationStopped()) {
                b5.type = ca > 1 ? ci : cf.bindType || cg;
                cd = (bH._data(ch, "events") || {})[b5.type] && bH._data(ch, "handle");
                if (cd) {
                    cd.apply(ch, cc)
                }
                cd = b7 && ch[b7];
                if (cd && cd.apply && bH.acceptData(ch)) {
                    b5.result = cd.apply(ch, cc);
                    if (b5.result === false) {
                        b5.preventDefault()
                    }
                }
            }
            b5.type = cg;
            if (!cj && !b5.isDefaultPrevented()) {
                if ((!cf._default || cf._default.apply(b9.pop(), cc) === false) && bH.acceptData(b8)) {
                    if (b7 && b8[cg] && !bH.isWindow(b8)) {
                        cb = b8[b7];
                        if (cb) {
                            b8[b7] = null
                        }
                        bH.event.triggered = cg;
                        try {
                            b8[cg]()
                        } catch (ce) {}
                        bH.event.triggered = undefined;
                        if (cb) {
                            b8[b7] = cb
                        }
                    }
                }
            }
            return b5.result
        },
        dispatch: function(e) {
            e = bH.event.fix(e);
            var b8, b9, cd, b5, b7, cc = [],
                cb = O.call(arguments),
                b6 = (bH._data(this, "events") || {})[e.type] || [],
                ca = bH.event.special[e.type] || {};
            cb[0] = e;
            e.delegateTarget = this;
            if (ca.preDispatch && ca.preDispatch.call(this, e) === false) {
                return
            }
            cc = bH.event.handlers.call(this, e, b6);
            b8 = 0;
            while ((b5 = cc[b8++]) && !e.isPropagationStopped()) {
                e.currentTarget = b5.elem;
                b7 = 0;
                while ((cd = b5.handlers[b7++]) && !e.isImmediatePropagationStopped()) {
                    if (!e.namespace_re || e.namespace_re.test(cd.namespace)) {
                        e.handleObj = cd;
                        e.data = cd.data;
                        b9 = ((bH.event.special[cd.origType] || {}).handle || cd.handler).apply(b5.elem, cb);
                        if (b9 !== undefined) {
                            if ((e.result = b9) === false) {
                                e.preventDefault();
                                e.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (ca.postDispatch) {
                ca.postDispatch.call(this, e)
            }
            return e.result
        },
        handlers: function(e, b6) {
            var b5, cb, b9, b8, ca = [],
                b7 = b6.delegateCount,
                cc = e.target;
            if (b7 && cc.nodeType && (!e.button || e.type !== "click")) {
                for (; cc != this; cc = cc.parentNode || this) {
                    if (cc.nodeType === 1 && (cc.disabled !== true || e.type !== "click")) {
                        b9 = [];
                        for (b8 = 0; b8 < b7; b8++) {
                            cb = b6[b8];
                            b5 = cb.selector + " ";
                            if (b9[b5] === undefined) {
                                b9[b5] = cb.needsContext ? bH(b5, this).index(cc) >= 0 : bH.find(b5, this, null, [cc]).length
                            }
                            if (b9[b5]) {
                                b9.push(cb)
                            }
                        }
                        if (b9.length) {
                            ca.push({
                                elem: cc,
                                handlers: b9
                            })
                        }
                    }
                }
            }
            if (b7 < b6.length) {
                ca.push({
                    elem: this,
                    handlers: b6.slice(b7)
                })
            }
            return ca
        },
        fix: function(b7) {
            if (b7[bH.expando]) {
                return b7
            }
            var b5, ca, b9, b6 = b7.type,
                e = b7,
                b8 = this.fixHooks[b6];
            if (!b8) {
                this.fixHooks[b6] = b8 = bL.test(b6) ? this.mouseHooks : a5.test(b6) ? this.keyHooks : {}
            }
            b9 = b8.props ? this.props.concat(b8.props) : this.props;
            b7 = new bH.Event(e);
            b5 = b9.length;
            while (b5--) {
                ca = b9[b5];
                b7[ca] = e[ca]
            }
            if (!b7.target) {
                b7.target = e.srcElement || n
            }
            if (b7.target.nodeType === 3) {
                b7.target = b7.target.parentNode
            }
            b7.metaKey = !!b7.metaKey;
            return b8.filter ? b8.filter(b7, e) : b7
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(b5, e) {
                if (b5.which == null) {
                    b5.which = e.charCode != null ? e.charCode : e.keyCode
                }
                return b5
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b7, b6) {
                var e, b8, b9, b5 = b6.button,
                    ca = b6.fromElement;
                if (b7.pageX == null && b6.clientX != null) {
                    b8 = b7.target.ownerDocument || n;
                    b9 = b8.documentElement;
                    e = b8.body;
                    b7.pageX = b6.clientX + (b9 && b9.scrollLeft || e && e.scrollLeft || 0) - (b9 && b9.clientLeft || e && e.clientLeft || 0);
                    b7.pageY = b6.clientY + (b9 && b9.scrollTop || e && e.scrollTop || 0) - (b9 && b9.clientTop || e && e.clientTop || 0)
                }
                if (!b7.relatedTarget && ca) {
                    b7.relatedTarget = ca === b7.target ? b6.toElement : ca
                }
                if (!b7.which && b5 !== undefined) {
                    b7.which = (b5 & 1 ? 1 : (b5 & 2 ? 3 : (b5 & 4 ? 2 : 0)))
                }
                return b7
            }
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== al() && this.focus) {
                        try {
                            this.focus();
                            return false
                        } catch (b5) {}
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === al() && this.blur) {
                        this.blur();
                        return false
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (bH.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false
                    }
                },
                _default: function(e) {
                    return bH.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    if (e.result !== undefined && e.originalEvent) {
                        e.originalEvent.returnValue = e.result
                    }
                }
            }
        },
        simulate: function(b6, b8, b7, b5) {
            var b9 = bH.extend(new bH.Event(), b7, {
                type: b6,
                isSimulated: true,
                originalEvent: {}
            });
            if (b5) {
                bH.event.trigger(b9, null, b8)
            } else {
                bH.event.dispatch.call(b8, b9)
            }
            if (b9.isDefaultPrevented()) {
                b7.preventDefault()
            }
        }
    };
    bH.removeEvent = n.removeEventListener ? function(b5, e, b6) {
        if (b5.removeEventListener) {
            b5.removeEventListener(e, b6, false)
        }
    } : function(b6, b5, b7) {
        var e = "on" + b5;
        if (b6.detachEvent) {
            if (typeof b6[e] === aB) {
                b6[e] = null
            }
            b6.detachEvent(e, b7)
        }
    };
    bH.Event = function(b5, e) {
        if (!(this instanceof bH.Event)) {
            return new bH.Event(b5, e)
        }
        if (b5 && b5.type) {
            this.originalEvent = b5;
            this.type = b5.type;
            this.isDefaultPrevented = b5.defaultPrevented || b5.defaultPrevented === undefined && b5.returnValue === false ? T : Y
        } else {
            this.type = b5
        }
        if (e) {
            bH.extend(this, e)
        }
        this.timeStamp = b5 && b5.timeStamp || bH.now();
        this[bH.expando] = true
    };
    bH.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function() {
            var b5 = this.originalEvent;
            this.isDefaultPrevented = T;
            if (!b5) {
                return
            }
            if (b5.preventDefault) {
                b5.preventDefault()
            } else {
                b5.returnValue = false
            }
        },
        stopPropagation: function() {
            var b5 = this.originalEvent;
            this.isPropagationStopped = T;
            if (!b5) {
                return
            }
            if (b5.stopPropagation) {
                b5.stopPropagation()
            }
            b5.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            var b5 = this.originalEvent;
            this.isImmediatePropagationStopped = T;
            if (b5 && b5.stopImmediatePropagation) {
                b5.stopImmediatePropagation()
            }
            this.stopPropagation()
        }
    };
    bH.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(b5, e) {
        bH.event.special[b5] = {
            delegateType: e,
            bindType: e,
            handle: function(b8) {
                var b6, ca = this,
                    b9 = b8.relatedTarget,
                    b7 = b8.handleObj;
                if (!b9 || (b9 !== ca && !bH.contains(ca, b9))) {
                    b8.type = b7.origType;
                    b6 = b7.handler.apply(this, arguments);
                    b8.type = e
                }
                return b6
            }
        }
    });
    if (!C.submitBubbles) {
        bH.event.special.submit = {
            setup: function() {
                if (bH.nodeName(this, "form")) {
                    return false
                }
                bH.event.add(this, "click._submit keypress._submit", function(b7) {
                    var b6 = b7.target,
                        b5 = bH.nodeName(b6, "input") || bH.nodeName(b6, "button") ? b6.form : undefined;
                    if (b5 && !bH._data(b5, "submitBubbles")) {
                        bH.event.add(b5, "submit._submit", function(e) {
                            e._submit_bubble = true
                        });
                        bH._data(b5, "submitBubbles", true)
                    }
                })
            },
            postDispatch: function(e) {
                if (e._submit_bubble) {
                    delete e._submit_bubble;
                    if (this.parentNode && !e.isTrigger) {
                        bH.event.simulate("submit", this.parentNode, e, true)
                    }
                }
            },
            teardown: function() {
                if (bH.nodeName(this, "form")) {
                    return false
                }
                bH.event.remove(this, "._submit")
            }
        }
    }
    if (!C.changeBubbles) {
        bH.event.special.change = {
            setup: function() {
                if (bF.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        bH.event.add(this, "propertychange._change", function(e) {
                            if (e.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        bH.event.add(this, "click._change", function(e) {
                            if (this._just_changed && !e.isTrigger) {
                                this._just_changed = false
                            }
                            bH.event.simulate("change", this, e, true)
                        })
                    }
                    return false
                }
                bH.event.add(this, "beforeactivate._change", function(b6) {
                    var b5 = b6.target;
                    if (bF.test(b5.nodeName) && !bH._data(b5, "changeBubbles")) {
                        bH.event.add(b5, "change._change", function(e) {
                            if (this.parentNode && !e.isSimulated && !e.isTrigger) {
                                bH.event.simulate("change", this.parentNode, e, true)
                            }
                        });
                        bH._data(b5, "changeBubbles", true)
                    }
                })
            },
            handle: function(b5) {
                var e = b5.target;
                if (this !== e || b5.isSimulated || b5.isTrigger || (e.type !== "radio" && e.type !== "checkbox")) {
                    return b5.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                bH.event.remove(this, "._change");
                return !bF.test(this.nodeName)
            }
        }
    }
    if (!C.focusinBubbles) {
        bH.each({
            focus: "focusin",
            blur: "focusout"
        }, function(b6, e) {
            var b5 = function(b7) {
                bH.event.simulate(e, b7.target, bH.event.fix(b7), true)
            };
            bH.event.special[e] = {
                setup: function() {
                    var b8 = this.ownerDocument || this,
                        b7 = bH._data(b8, e);
                    if (!b7) {
                        b8.addEventListener(b6, b5, true)
                    }
                    bH._data(b8, e, (b7 || 0) + 1)
                },
                teardown: function() {
                    var b8 = this.ownerDocument || this,
                        b7 = bH._data(b8, e) - 1;
                    if (!b7) {
                        b8.removeEventListener(b6, b5, true);
                        bH._removeData(b8, e)
                    } else {
                        bH._data(b8, e, b7)
                    }
                }
            }
        })
    }
    bH.fn.extend({
        on: function(b6, e, b9, b8, b5) {
            var b7, ca;
            if (typeof b6 === "object") {
                if (typeof e !== "string") {
                    b9 = b9 || e;
                    e = undefined
                }
                for (b7 in b6) {
                    this.on(b7, e, b9, b6[b7], b5)
                }
                return this
            }
            if (b9 == null && b8 == null) {
                b8 = e;
                b9 = e = undefined
            } else {
                if (b8 == null) {
                    if (typeof e === "string") {
                        b8 = b9;
                        b9 = undefined
                    } else {
                        b8 = b9;
                        b9 = e;
                        e = undefined
                    }
                }
            }
            if (b8 === false) {
                b8 = Y
            } else {
                if (!b8) {
                    return this
                }
            }
            if (b5 === 1) {
                ca = b8;
                b8 = function(cb) {
                    bH().off(cb);
                    return ca.apply(this, arguments)
                };
                b8.guid = ca.guid || (ca.guid = bH.guid++)
            }
            return this.each(function() {
                bH.event.add(this, b6, b8, b9, e)
            })
        },
        one: function(b5, e, b7, b6) {
            return this.on(b5, e, b7, b6, 1)
        },
        off: function(b6, e, b8) {
            var b5, b7;
            if (b6 && b6.preventDefault && b6.handleObj) {
                b5 = b6.handleObj;
                bH(b6.delegateTarget).off(b5.namespace ? b5.origType + "." + b5.namespace : b5.origType, b5.selector, b5.handler);
                return this
            }
            if (typeof b6 === "object") {
                for (b7 in b6) {
                    this.off(b7, e, b6[b7])
                }
                return this
            }
            if (e === false || typeof e === "function") {
                b8 = e;
                e = undefined
            }
            if (b8 === false) {
                b8 = Y
            }
            return this.each(function() {
                bH.event.remove(this, b6, b8, e)
            })
        },
        trigger: function(e, b5) {
            return this.each(function() {
                bH.event.trigger(e, b5, this)
            })
        },
        triggerHandler: function(e, b6) {
            var b5 = this[0];
            if (b5) {
                return bH.event.trigger(e, b6, b5, true)
            }
        }
    });

    function A(e) {
        var b6 = d.split("|"),
            b5 = e.createDocumentFragment();
        if (b5.createElement) {
            while (b6.length) {
                b5.createElement(b6.pop())
            }
        }
        return b5
    }
    var d = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        aC = / jQuery\d+="(?:null|\d+)"/g,
        L = new RegExp("<(?:" + d + ")[\\s/>]", "i"),
        b4 = /^\s+/,
        aG = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        o = /<([\w:]+)/,
        bZ = /<tbody/i,
        K = /<|&#?\w+;/,
        am = /<(?:script|style|link)/i,
        bV = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bA = /^$|\/(?:java|ecma)script/i,
        aq = /^true\/(.*)/,
        aN = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        V = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: C.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        aS = A(n),
        k = aS.appendChild(n.createElement("div"));
    V.optgroup = V.option;
    V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
    V.th = V.td;

    function l(b7, e) {
        var b5, b8, b6 = 0,
            b9 = typeof b7.getElementsByTagName !== aB ? b7.getElementsByTagName(e || "*") : typeof b7.querySelectorAll !== aB ? b7.querySelectorAll(e || "*") : undefined;
        if (!b9) {
            for (b9 = [], b5 = b7.childNodes || b7;
                (b8 = b5[b6]) != null; b6++) {
                if (!e || bH.nodeName(b8, e)) {
                    b9.push(b8)
                } else {
                    bH.merge(b9, l(b8, e))
                }
            }
        }
        return e === undefined || e && bH.nodeName(b7, e) ? bH.merge([b7], b9) : b9
    }

    function bX(e) {
        if (aL.test(e.type)) {
            e.defaultChecked = e.checked
        }
    }

    function a2(b5, e) {
        return bH.nodeName(b5, "table") && bH.nodeName(e.nodeType !== 11 ? e : e.firstChild, "tr") ? b5.getElementsByTagName("tbody")[0] || b5.appendChild(b5.ownerDocument.createElement("tbody")) : b5
    }

    function t(e) {
        e.type = (bH.find.attr(e, "type") !== null) + "/" + e.type;
        return e
    }

    function be(b5) {
        var e = aq.exec(b5.type);
        if (e) {
            b5.type = e[1]
        } else {
            b5.removeAttribute("type")
        }
        return b5
    }

    function bt(e, b6) {
        var b7, b5 = 0;
        for (;
            (b7 = e[b5]) != null; b5++) {
            bH._data(b7, "globalEval", !b6 || bH._data(b6[b5], "globalEval"))
        }
    }

    function ar(cb, b5) {
        if (b5.nodeType !== 1 || !bH.hasData(cb)) {
            return
        }
        var b8, b7, e, ca = bH._data(cb),
            b9 = bH._data(b5, ca),
            b6 = ca.events;
        if (b6) {
            delete b9.handle;
            b9.events = {};
            for (b8 in b6) {
                for (b7 = 0, e = b6[b8].length; b7 < e; b7++) {
                    bH.event.add(b5, b8, b6[b8][b7])
                }
            }
        }
        if (b9.data) {
            b9.data = bH.extend({}, b9.data)
        }
    }

    function S(b8, b5) {
        var b9, b7, b6;
        if (b5.nodeType !== 1) {
            return
        }
        b9 = b5.nodeName.toLowerCase();
        if (!C.noCloneEvent && b5[bH.expando]) {
            b6 = bH._data(b5);
            for (b7 in b6.events) {
                bH.removeEvent(b5, b7, b6.handle)
            }
            b5.removeAttribute(bH.expando)
        }
        if (b9 === "script" && b5.text !== b8.text) {
            t(b5).text = b8.text;
            be(b5)
        } else {
            if (b9 === "object") {
                if (b5.parentNode) {
                    b5.outerHTML = b8.outerHTML
                }
                if (C.html5Clone && (b8.innerHTML && !bH.trim(b5.innerHTML))) {
                    b5.innerHTML = b8.innerHTML
                }
            } else {
                if (b9 === "input" && aL.test(b8.type)) {
                    b5.defaultChecked = b5.checked = b8.checked;
                    if (b5.value !== b8.value) {
                        b5.value = b8.value
                    }
                } else {
                    if (b9 === "option") {
                        b5.defaultSelected = b5.selected = b8.defaultSelected
                    } else {
                        if (b9 === "input" || b9 === "textarea") {
                            b5.defaultValue = b8.defaultValue
                        }
                    }
                }
            }
        }
    }
    bH.extend({
        clone: function(b5, b7, e) {
            var b9, b6, cc, b8, ca, cb = bH.contains(b5.ownerDocument, b5);
            if (C.html5Clone || bH.isXMLDoc(b5) || !L.test("<" + b5.nodeName + ">")) {
                cc = b5.cloneNode(true)
            } else {
                k.innerHTML = b5.outerHTML;
                k.removeChild(cc = k.firstChild)
            }
            if ((!C.noCloneEvent || !C.noCloneChecked) && (b5.nodeType === 1 || b5.nodeType === 11) && !bH.isXMLDoc(b5)) {
                b9 = l(cc);
                ca = l(b5);
                for (b8 = 0;
                    (b6 = ca[b8]) != null; ++b8) {
                    if (b9[b8]) {
                        S(b6, b9[b8])
                    }
                }
            }
            if (b7) {
                if (e) {
                    ca = ca || l(b5);
                    b9 = b9 || l(cc);
                    for (b8 = 0;
                        (b6 = ca[b8]) != null; b8++) {
                        ar(b6, b9[b8])
                    }
                } else {
                    ar(b5, cc)
                }
            }
            b9 = l(cc, "script");
            if (b9.length > 0) {
                bt(b9, !cb && l(b5, "script"))
            }
            b9 = ca = b6 = null;
            return cc
        },
        buildFragment: function(b5, b7, cc, ch) {
            var cd, b9, cb, cg, ci, cf, b6, ca = b5.length,
                b8 = A(b7),
                e = [],
                ce = 0;
            for (; ce < ca; ce++) {
                b9 = b5[ce];
                if (b9 || b9 === 0) {
                    if (bH.type(b9) === "object") {
                        bH.merge(e, b9.nodeType ? [b9] : b9)
                    } else {
                        if (!K.test(b9)) {
                            e.push(b7.createTextNode(b9))
                        } else {
                            cg = cg || b8.appendChild(b7.createElement("div"));
                            ci = (o.exec(b9) || ["", ""])[1].toLowerCase();
                            b6 = V[ci] || V._default;
                            cg.innerHTML = b6[1] + b9.replace(aG, "<$1></$2>") + b6[2];
                            cd = b6[0];
                            while (cd--) {
                                cg = cg.lastChild
                            }
                            if (!C.leadingWhitespace && b4.test(b9)) {
                                e.push(b7.createTextNode(b4.exec(b9)[0]))
                            }
                            if (!C.tbody) {
                                b9 = ci === "table" && !bZ.test(b9) ? cg.firstChild : b6[1] === "<table>" && !bZ.test(b9) ? cg : 0;
                                cd = b9 && b9.childNodes.length;
                                while (cd--) {
                                    if (bH.nodeName((cf = b9.childNodes[cd]), "tbody") && !cf.childNodes.length) {
                                        b9.removeChild(cf)
                                    }
                                }
                            }
                            bH.merge(e, cg.childNodes);
                            cg.textContent = "";
                            while (cg.firstChild) {
                                cg.removeChild(cg.firstChild)
                            }
                            cg = b8.lastChild
                        }
                    }
                }
            }
            if (cg) {
                b8.removeChild(cg)
            }
            if (!C.appendChecked) {
                bH.grep(l(e, "input"), bX)
            }
            ce = 0;
            while ((b9 = e[ce++])) {
                if (ch && bH.inArray(b9, ch) !== -1) {
                    continue
                }
                cb = bH.contains(b9.ownerDocument, b9);
                cg = l(b8.appendChild(b9), "script");
                if (cb) {
                    bt(cg)
                }
                if (cc) {
                    cd = 0;
                    while ((b9 = cg[cd++])) {
                        if (bA.test(b9.type || "")) {
                            cc.push(b9)
                        }
                    }
                }
            }
            cg = null;
            return b8
        },
        cleanData: function(b5, cd) {
            var b7, cc, b6, b8, b9 = 0,
                ce = bH.expando,
                e = bH.cache,
                ca = C.deleteExpando,
                cb = bH.event.special;
            for (;
                (b7 = b5[b9]) != null; b9++) {
                if (cd || bH.acceptData(b7)) {
                    b6 = b7[ce];
                    b8 = b6 && e[b6];
                    if (b8) {
                        if (b8.events) {
                            for (cc in b8.events) {
                                if (cb[cc]) {
                                    bH.event.remove(b7, cc)
                                } else {
                                    bH.removeEvent(b7, cc, b8.handle)
                                }
                            }
                        }
                        if (e[b6]) {
                            delete e[b6];
                            if (ca) {
                                delete b7[ce]
                            } else {
                                if (typeof b7.removeAttribute !== aB) {
                                    b7.removeAttribute(ce)
                                } else {
                                    b7[ce] = null
                                }
                            }
                            aO.push(b6)
                        }
                    }
                }
            }
        }
    });
    bH.fn.extend({
        text: function(e) {
            return aA(this, function(b5) {
                return b5 === undefined ? bH.text(this) : this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(b5))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var b5 = a2(this, e);
                    b5.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var b5 = a2(this, e);
                    b5.insertBefore(e, b5.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this)
                }
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                }
            })
        },
        remove: function(e, b8) {
            var b7, b5 = e ? bH.filter(e, this) : this,
                b6 = 0;
            for (;
                (b7 = b5[b6]) != null; b6++) {
                if (!b8 && b7.nodeType === 1) {
                    bH.cleanData(l(b7))
                }
                if (b7.parentNode) {
                    if (b8 && bH.contains(b7.ownerDocument, b7)) {
                        bt(l(b7, "script"))
                    }
                    b7.parentNode.removeChild(b7)
                }
            }
            return this
        },
        empty: function() {
            var b5, e = 0;
            for (;
                (b5 = this[e]) != null; e++) {
                if (b5.nodeType === 1) {
                    bH.cleanData(l(b5, false))
                }
                while (b5.firstChild) {
                    b5.removeChild(b5.firstChild)
                }
                if (b5.options && bH.nodeName(b5, "select")) {
                    b5.options.length = 0
                }
            }
            return this
        },
        clone: function(b5, e) {
            b5 = b5 == null ? false : b5;
            e = e == null ? b5 : e;
            return this.map(function() {
                return bH.clone(this, b5, e)
            })
        },
        html: function(e) {
            return aA(this, function(b8) {
                var b7 = this[0] || {},
                    b6 = 0,
                    b5 = this.length;
                if (b8 === undefined) {
                    return b7.nodeType === 1 ? b7.innerHTML.replace(aC, "") : undefined
                }
                if (typeof b8 === "string" && !am.test(b8) && (C.htmlSerialize || !L.test(b8)) && (C.leadingWhitespace || !b4.test(b8)) && !V[(o.exec(b8) || ["", ""])[1].toLowerCase()]) {
                    b8 = b8.replace(aG, "<$1></$2>");
                    try {
                        for (; b6 < b5; b6++) {
                            b7 = this[b6] || {};
                            if (b7.nodeType === 1) {
                                bH.cleanData(l(b7, false));
                                b7.innerHTML = b8
                            }
                        }
                        b7 = 0
                    } catch (b9) {}
                }
                if (b7) {
                    this.empty().append(b8)
                }
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            this.domManip(arguments, function(b5) {
                e = this.parentNode;
                bH.cleanData(l(this));
                if (e) {
                    e.replaceChild(b5, this)
                }
            });
            return e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, true)
        },
        domManip: function(cc, ch) {
            cc = ay.apply([], cc);
            var ca, b6, e, b8, cf, cb, b9 = 0,
                b7 = this.length,
                ce = this,
                cg = b7 - 1,
                cd = cc[0],
                b5 = bH.isFunction(cd);
            if (b5 || (b7 > 1 && typeof cd === "string" && !C.checkClone && bV.test(cd))) {
                return this.each(function(cj) {
                    var ci = ce.eq(cj);
                    if (b5) {
                        cc[0] = cd.call(this, cj, ci.html())
                    }
                    ci.domManip(cc, ch)
                })
            }
            if (b7) {
                cb = bH.buildFragment(cc, this[0].ownerDocument, false, this);
                ca = cb.firstChild;
                if (cb.childNodes.length === 1) {
                    cb = ca
                }
                if (ca) {
                    b8 = bH.map(l(cb, "script"), t);
                    e = b8.length;
                    for (; b9 < b7; b9++) {
                        b6 = cb;
                        if (b9 !== cg) {
                            b6 = bH.clone(b6, true, true);
                            if (e) {
                                bH.merge(b8, l(b6, "script"))
                            }
                        }
                        ch.call(this[b9], b6, b9)
                    }
                    if (e) {
                        cf = b8[b8.length - 1].ownerDocument;
                        bH.map(b8, be);
                        for (b9 = 0; b9 < e; b9++) {
                            b6 = b8[b9];
                            if (bA.test(b6.type || "") && !bH._data(b6, "globalEval") && bH.contains(cf, b6)) {
                                if (b6.src) {
                                    if (bH._evalUrl) {
                                        bH._evalUrl(b6.src)
                                    }
                                } else {
                                    bH.globalEval((b6.text || b6.textContent || b6.innerHTML || "").replace(aN, ""))
                                }
                            }
                        }
                    }
                    cb = ca = null
                }
            }
            return this
        }
    });
    bH.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, b5) {
        bH.fn[e] = function(b6) {
            var b7, b9 = 0,
                b8 = [],
                cb = bH(b6),
                ca = cb.length - 1;
            for (; b9 <= ca; b9++) {
                b7 = b9 === ca ? this : this.clone(true);
                bH(cb[b9])[b5](b7);
                w.apply(b8, b7.get())
            }
            return this.pushStack(b8)
        }
    });
    var aH, bk = {};

    function a3(e, b8) {
        var b5, b6 = bH(b8.createElement(e)).appendTo(b8.body),
            b7 = a4.getDefaultComputedStyle && (b5 = a4.getDefaultComputedStyle(b6[0])) ? b5.display : bH.css(b6[0], "display");
        b6.detach();
        return b7
    }

    function aZ(b6) {
        var b5 = n,
            e = bk[b6];
        if (!e) {
            e = a3(b6, b5);
            if (e === "none" || !e) {
                aH = (aH || bH("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b5.documentElement);
                b5 = (aH[0].contentWindow || aH[0].contentDocument).document;
                b5.write();
                b5.close();
                e = a3(b6, b5);
                aH.detach()
            }
            bk[b6] = e
        }
        return e
    }(function() {
        var e;
        C.shrinkWrapBlocks = function() {
            if (e != null) {
                return e
            }
            e = false;
            var b7, b5, b6;
            b5 = n.getElementsByTagName("body")[0];
            if (!b5 || !b5.style) {
                return
            }
            b7 = n.createElement("div");
            b6 = n.createElement("div");
            b6.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            b5.appendChild(b6).appendChild(b7);
            if (typeof b7.style.zoom !== aB) {
                b7.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1";
                b7.appendChild(n.createElement("div")).style.width = "5px";
                e = b7.offsetWidth !== 3
            }
            b5.removeChild(b6);
            return e
        }
    })();
    var aY = (/^margin/);
    var X = new RegExp("^(" + aD + ")(?!px)[a-z%]+$", "i");
    var bp, F, bn = /^(top|right|bottom|left)$/;
    if (a4.getComputedStyle) {
        bp = function(e) {
            if (e.ownerDocument.defaultView.opener) {
                return e.ownerDocument.defaultView.getComputedStyle(e, null)
            }
            return a4.getComputedStyle(e, null)
        };
        F = function(cb, b5, ca) {
            var b8, b7, b9, e, b6 = cb.style;
            ca = ca || bp(cb);
            e = ca ? ca.getPropertyValue(b5) || ca[b5] : undefined;
            if (ca) {
                if (e === "" && !bH.contains(cb.ownerDocument, cb)) {
                    e = bH.style(cb, b5)
                }
                if (X.test(e) && aY.test(b5)) {
                    b8 = b6.width;
                    b7 = b6.minWidth;
                    b9 = b6.maxWidth;
                    b6.minWidth = b6.maxWidth = b6.width = e;
                    e = ca.width;
                    b6.width = b8;
                    b6.minWidth = b7;
                    b6.maxWidth = b9
                }
            }
            return e === undefined ? e : e + ""
        }
    } else {
        if (n.documentElement.currentStyle) {
            bp = function(e) {
                return e.currentStyle
            };
            F = function(ca, b7, b9) {
                var cb, b5, e, b6, b8 = ca.style;
                b9 = b9 || bp(ca);
                b6 = b9 ? b9[b7] : undefined;
                if (b6 == null && b8 && b8[b7]) {
                    b6 = b8[b7]
                }
                if (X.test(b6) && !bn.test(b7)) {
                    cb = b8.left;
                    b5 = ca.runtimeStyle;
                    e = b5 && b5.left;
                    if (e) {
                        b5.left = ca.currentStyle.left
                    }
                    b8.left = b7 === "fontSize" ? "1em" : b6;
                    b6 = b8.pixelLeft + "px";
                    b8.left = cb;
                    if (e) {
                        b5.left = e
                    }
                }
                return b6 === undefined ? b6 : b6 + "" || "auto"
            }
        }
    }

    function a6(e, b5) {
        return {
            get: function() {
                var b6 = e();
                if (b6 == null) {
                    return
                }
                if (b6) {
                    delete this.get;
                    return
                }
                return (this.get = b5).apply(this, arguments)
            }
        }
    }(function() {
        var cb, b9, b7, ca, b6, b8, b5;
        cb = n.createElement("div");
        cb.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        b7 = cb.getElementsByTagName("a")[0];
        b9 = b7 && b7.style;
        if (!b9) {
            return
        }
        b9.cssText = "float:left;opacity:.5";
        C.opacity = b9.opacity === "0.5";
        C.cssFloat = !!b9.cssFloat;
        cb.style.backgroundClip = "content-box";
        cb.cloneNode(true).style.backgroundClip = "";
        C.clearCloneStyle = cb.style.backgroundClip === "content-box";
        C.boxSizing = b9.boxSizing === "" || b9.MozBoxSizing === "" || b9.WebkitBoxSizing === "";
        bH.extend(C, {
            reliableHiddenOffsets: function() {
                if (b8 == null) {
                    e()
                }
                return b8
            },
            boxSizingReliable: function() {
                if (b6 == null) {
                    e()
                }
                return b6
            },
            pixelPosition: function() {
                if (ca == null) {
                    e()
                }
                return ca
            },
            reliableMarginRight: function() {
                if (b5 == null) {
                    e()
                }
                return b5
            }
        });

        function e() {
            var cf, cc, cd, ce;
            cc = n.getElementsByTagName("body")[0];
            if (!cc || !cc.style) {
                return
            }
            cf = n.createElement("div");
            cd = n.createElement("div");
            cd.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            cc.appendChild(cd).appendChild(cf);
            cf.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            ca = b6 = false;
            b5 = true;
            if (a4.getComputedStyle) {
                ca = (a4.getComputedStyle(cf, null) || {}).top !== "1%";
                b6 = (a4.getComputedStyle(cf, null) || {
                    width: "4px"
                }).width === "4px";
                ce = cf.appendChild(n.createElement("div"));
                ce.style.cssText = cf.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                ce.style.marginRight = ce.style.width = "0";
                cf.style.width = "1px";
                b5 = !parseFloat((a4.getComputedStyle(ce, null) || {}).marginRight);
                cf.removeChild(ce)
            }
            cf.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            ce = cf.getElementsByTagName("td");
            ce[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            b8 = ce[0].offsetHeight === 0;
            if (b8) {
                ce[0].style.display = "";
                ce[1].style.display = "none";
                b8 = ce[0].offsetHeight === 0
            }
            cc.removeChild(cd)
        }
    })();
    bH.swap = function(b9, b8, ca, b7) {
        var b6, b5, e = {};
        for (b5 in b8) {
            e[b5] = b9.style[b5];
            b9.style[b5] = b8[b5]
        }
        b6 = ca.apply(b9, b7 || []);
        for (b5 in b8) {
            b9.style[b5] = e[b5]
        }
        return b6
    };
    var bi = /alpha\([^)]*\)/i,
        aT = /opacity\s*=\s*([^)]*)/,
        G = /^(none|table(?!-c[ea]).+)/,
        ba = new RegExp("^(" + aD + ")(.*)$", "i"),
        U = new RegExp("^([+-])=(" + aD + ")", "i"),
        bd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bC = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        av = ["Webkit", "O", "Moz", "ms"];

    function c(b7, b5) {
        if (b5 in b7) {
            return b5
        }
        var b8 = b5.charAt(0).toUpperCase() + b5.slice(1),
            e = b5,
            b6 = av.length;
        while (b6--) {
            b5 = av[b6] + b8;
            if (b5 in b7) {
                return b5
            }
        }
        return e
    }

    function r(ca, e) {
        var cb, b8, b9, b5 = [],
            b6 = 0,
            b7 = ca.length;
        for (; b6 < b7; b6++) {
            b8 = ca[b6];
            if (!b8.style) {
                continue
            }
            b5[b6] = bH._data(b8, "olddisplay");
            cb = b8.style.display;
            if (e) {
                if (!b5[b6] && cb === "none") {
                    b8.style.display = ""
                }
                if (b8.style.display === "" && R(b8)) {
                    b5[b6] = bH._data(b8, "olddisplay", aZ(b8.nodeName))
                }
            } else {
                b9 = R(b8);
                if (cb && cb !== "none" || !b9) {
                    bH._data(b8, "olddisplay", b9 ? cb : bH.css(b8, "display"))
                }
            }
        }
        for (b6 = 0; b6 < b7; b6++) {
            b8 = ca[b6];
            if (!b8.style) {
                continue
            }
            if (!e || b8.style.display === "none" || b8.style.display === "") {
                b8.style.display = e ? b5[b6] || "" : "none"
            }
        }
        return ca
    }

    function aM(e, b6, b7) {
        var b5 = ba.exec(b6);
        return b5 ? Math.max(0, b5[1] - (b7 || 0)) + (b5[2] || "px") : b6
    }

    function aw(b8, b5, e, ca, b7) {
        var b6 = e === (ca ? "border" : "content") ? 4 : b5 === "width" ? 1 : 0,
            b9 = 0;
        for (; b6 < 4; b6 += 2) {
            if (e === "margin") {
                b9 += bH.css(b8, e + bS[b6], true, b7)
            }
            if (ca) {
                if (e === "content") {
                    b9 -= bH.css(b8, "padding" + bS[b6], true, b7)
                }
                if (e !== "margin") {
                    b9 -= bH.css(b8, "border" + bS[b6] + "Width", true, b7)
                }
            } else {
                b9 += bH.css(b8, "padding" + bS[b6], true, b7);
                if (e !== "padding") {
                    b9 += bH.css(b8, "border" + bS[b6] + "Width", true, b7)
                }
            }
        }
        return b9
    }

    function u(b8, b5, e) {
        var b7 = true,
            b9 = b5 === "width" ? b8.offsetWidth : b8.offsetHeight,
            b6 = bp(b8),
            ca = C.boxSizing && bH.css(b8, "boxSizing", false, b6) === "border-box";
        if (b9 <= 0 || b9 == null) {
            b9 = F(b8, b5, b6);
            if (b9 < 0 || b9 == null) {
                b9 = b8.style[b5]
            }
            if (X.test(b9)) {
                return b9
            }
            b7 = ca && (C.boxSizingReliable() || b9 === b8.style[b5]);
            b9 = parseFloat(b9) || 0
        }
        return (b9 + aw(b8, b5, e || (ca ? "border" : "content"), b7, b6)) + "px"
    }
    bH.extend({
        cssHooks: {
            opacity: {
                get: function(b6, b5) {
                    if (b5) {
                        var e = F(b6, "opacity");
                        return e === "" ? "1" : e
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": C.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(b7, b6, cd, b8) {
            if (!b7 || b7.nodeType === 3 || b7.nodeType === 8 || !b7.style) {
                return
            }
            var cb, cc, ce, b9 = bH.camelCase(b6),
                b5 = b7.style;
            b6 = bH.cssProps[b9] || (bH.cssProps[b9] = c(b5, b9));
            ce = bH.cssHooks[b6] || bH.cssHooks[b9];
            if (cd !== undefined) {
                cc = typeof cd;
                if (cc === "string" && (cb = U.exec(cd))) {
                    cd = (cb[1] + 1) * cb[2] + parseFloat(bH.css(b7, b6));
                    cc = "number"
                }
                if (cd == null || cd !== cd) {
                    return
                }
                if (cc === "number" && !bH.cssNumber[b9]) {
                    cd += "px"
                }
                if (!C.clearCloneStyle && cd === "" && b6.indexOf("background") === 0) {
                    b5[b6] = "inherit"
                }
                if (!ce || !("set" in ce) || (cd = ce.set(b7, cd, b8)) !== undefined) {
                    try {
                        b5[b6] = cd
                    } catch (ca) {}
                }
            } else {
                if (ce && "get" in ce && (cb = ce.get(b7, false, b8)) !== undefined) {
                    return cb
                }
                return b5[b6]
            }
        },
        css: function(ca, b8, b5, b9) {
            var b7, cb, e, b6 = bH.camelCase(b8);
            b8 = bH.cssProps[b6] || (bH.cssProps[b6] = c(ca.style, b6));
            e = bH.cssHooks[b8] || bH.cssHooks[b6];
            if (e && "get" in e) {
                cb = e.get(ca, true, b5)
            }
            if (cb === undefined) {
                cb = F(ca, b8, b9)
            }
            if (cb === "normal" && b8 in bC) {
                cb = bC[b8]
            }
            if (b5 === "" || b5) {
                b7 = parseFloat(cb);
                return b5 === true || bH.isNumeric(b7) ? b7 || 0 : cb
            }
            return cb
        }
    });
    bH.each(["height", "width"], function(b5, e) {
        bH.cssHooks[e] = {
            get: function(b8, b7, b6) {
                if (b7) {
                    return G.test(bH.css(b8, "display")) && b8.offsetWidth === 0 ? bH.swap(b8, bd, function() {
                        return u(b8, e, b6)
                    }) : u(b8, e, b6)
                }
            },
            set: function(b8, b9, b6) {
                var b7 = b6 && bp(b8);
                return aM(b8, b9, b6 ? aw(b8, e, b6, C.boxSizing && bH.css(b8, "boxSizing", false, b7) === "border-box", b7) : 0)
            }
        }
    });
    if (!C.opacity) {
        bH.cssHooks.opacity = {
            get: function(b5, e) {
                return aT.test((e && b5.currentStyle ? b5.currentStyle.filter : b5.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : e ? "1" : ""
            },
            set: function(b8, b9) {
                var b7 = b8.style,
                    b5 = b8.currentStyle,
                    e = bH.isNumeric(b9) ? "alpha(opacity=" + b9 * 100 + ")" : "",
                    b6 = b5 && b5.filter || b7.filter || "";
                b7.zoom = 1;
                if ((b9 >= 1 || b9 === "") && bH.trim(b6.replace(bi, "")) === "" && b7.removeAttribute) {
                    b7.removeAttribute("filter");
                    if (b9 === "" || b5 && !b5.filter) {
                        return
                    }
                }
                b7.filter = bi.test(b6) ? b6.replace(bi, e) : b6 + " " + e
            }
        }
    }
    bH.cssHooks.marginRight = a6(C.reliableMarginRight, function(b5, e) {
        if (e) {
            return bH.swap(b5, {
                display: "inline-block"
            }, F, [b5, "marginRight"])
        }
    });
    bH.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, b5) {
        bH.cssHooks[e + b5] = {
            expand: function(b8) {
                var b7 = 0,
                    b6 = {},
                    b9 = typeof b8 === "string" ? b8.split(" ") : [b8];
                for (; b7 < 4; b7++) {
                    b6[e + bS[b7] + b5] = b9[b7] || b9[b7 - 2] || b9[0]
                }
                return b6
            }
        };
        if (!aY.test(e)) {
            bH.cssHooks[e + b5].set = aM
        }
    });
    bH.fn.extend({
        css: function(e, b5) {
            return aA(this, function(ca, b7, cb) {
                var b9, b6, cc = {},
                    b8 = 0;
                if (bH.isArray(b7)) {
                    b9 = bp(ca);
                    b6 = b7.length;
                    for (; b8 < b6; b8++) {
                        cc[b7[b8]] = bH.css(ca, b7[b8], false, b9)
                    }
                    return cc
                }
                return cb !== undefined ? bH.style(ca, b7, cb) : bH.css(ca, b7)
            }, e, b5, arguments.length > 1)
        },
        show: function() {
            return r(this, true)
        },
        hide: function() {
            return r(this)
        },
        toggle: function(e) {
            if (typeof e === "boolean") {
                return e ? this.show() : this.hide()
            }
            return this.each(function() {
                if (R(this)) {
                    bH(this).show()
                } else {
                    bH(this).hide()
                }
            })
        }
    });

    function I(b6, b5, b8, e, b7) {
        return new I.prototype.init(b6, b5, b8, e, b7)
    }
    bH.Tween = I;
    I.prototype = {
        constructor: I,
        init: function(b7, b5, b9, e, b8, b6) {
            this.elem = b7;
            this.prop = b9;
            this.easing = b8 || "swing";
            this.options = b5;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = b6 || (bH.cssNumber[b9] ? "" : "px")
        },
        cur: function() {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function(b6) {
            var b5, e = I.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = b5 = bH.easing[this.easing](b6, this.options.duration * b6, 0, 1, this.options.duration)
            } else {
                this.pos = b5 = b6
            }
            this.now = (this.end - this.start) * b5 + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (e && e.set) {
                e.set(this)
            } else {
                I.propHooks._default.set(this)
            }
            return this
        }
    };
    I.prototype.init.prototype = I.prototype;
    I.propHooks = {
        _default: {
            get: function(b5) {
                var e;
                if (b5.elem[b5.prop] != null && (!b5.elem.style || b5.elem.style[b5.prop] == null)) {
                    return b5.elem[b5.prop]
                }
                e = bH.css(b5.elem, b5.prop, "");
                return !e || e === "auto" ? 0 : e
            },
            set: function(e) {
                if (bH.fx.step[e.prop]) {
                    bH.fx.step[e.prop](e)
                } else {
                    if (e.elem.style && (e.elem.style[bH.cssProps[e.prop]] != null || bH.cssHooks[e.prop])) {
                        bH.style(e.elem, e.prop, e.now + e.unit)
                    } else {
                        e.elem[e.prop] = e.now
                    }
                }
            }
        }
    };
    I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function(e) {
            if (e.elem.nodeType && e.elem.parentNode) {
                e.elem[e.prop] = e.now
            }
        }
    };
    bH.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return 0.5 - Math.cos(e * Math.PI) / 2
        }
    };
    bH.fx = I.prototype.init;
    bH.fx.step = {};
    var M, ad, bQ = /^(?:toggle|show|hide)$/,
        bI = new RegExp("^(?:([+-])=|)(" + aD + ")([a-z%]*)$", "i"),
        bO = /queueHooks$/,
        aF = [h],
        a1 = {
            "*": [function(e, ca) {
                var cc = this.createTween(e, ca),
                    b8 = cc.cur(),
                    b7 = bI.exec(ca),
                    cb = b7 && b7[3] || (bH.cssNumber[e] ? "" : "px"),
                    b5 = (bH.cssNumber[e] || cb !== "px" && +b8) && bI.exec(bH.css(cc.elem, e)),
                    b6 = 1,
                    b9 = 20;
                if (b5 && b5[3] !== cb) {
                    cb = cb || b5[3];
                    b7 = b7 || [];
                    b5 = +b8 || 1;
                    do {
                        b6 = b6 || ".5";
                        b5 = b5 / b6;
                        bH.style(cc.elem, e, b5 + cb)
                    } while (b6 !== (b6 = cc.cur() / b8) && b6 !== 1 && --b9)
                }
                if (b7) {
                    b5 = cc.start = +b5 || +b8 || 0;
                    cc.unit = cb;
                    cc.end = b7[1] ? b5 + (b7[1] + 1) * b7[2] : +b7[2]
                }
                return cc
            }]
        };

    function bm() {
        setTimeout(function() {
            M = undefined
        });
        return (M = bH.now())
    }

    function bG(b6, b8) {
        var b7, e = {
                height: b6
            },
            b5 = 0;
        b8 = b8 ? 1 : 0;
        for (; b5 < 4; b5 += 2 - b8) {
            b7 = bS[b5];
            e["margin" + b7] = e["padding" + b7] = b6
        }
        if (b8) {
            e.opacity = e.width = b6
        }
        return e
    }

    function bc(b8, ca, b7) {
        var b5, b9 = (a1[ca] || []).concat(a1["*"]),
            e = 0,
            b6 = b9.length;
        for (; e < b6; e++) {
            if ((b5 = b9[e].call(b7, ca, b8))) {
                return b5
            }
        }
    }

    function h(b7, cc, e) {
        var b6, cf, b9, ci, cj, cg, cb, ce, b8 = this,
            cd = {},
            b5 = b7.style,
            ca = b7.nodeType && R(b7),
            ch = bH._data(b7, "fxshow");
        if (!e.queue) {
            cj = bH._queueHooks(b7, "fx");
            if (cj.unqueued == null) {
                cj.unqueued = 0;
                cg = cj.empty.fire;
                cj.empty.fire = function() {
                    if (!cj.unqueued) {
                        cg()
                    }
                }
            }
            cj.unqueued++;
            b8.always(function() {
                b8.always(function() {
                    cj.unqueued--;
                    if (!bH.queue(b7, "fx").length) {
                        cj.empty.fire()
                    }
                })
            })
        }
        if (b7.nodeType === 1 && ("height" in cc || "width" in cc)) {
            e.overflow = [b5.overflow, b5.overflowX, b5.overflowY];
            cb = bH.css(b7, "display");
            ce = cb === "none" ? bH._data(b7, "olddisplay") || aZ(b7.nodeName) : cb;
            if (ce === "inline" && bH.css(b7, "float") === "none") {
                if (!C.inlineBlockNeedsLayout || aZ(b7.nodeName) === "inline") {
                    b5.display = "inline-block"
                } else {
                    b5.zoom = 1
                }
            }
        }
        if (e.overflow) {
            b5.overflow = "hidden";
            if (!C.shrinkWrapBlocks()) {
                b8.always(function() {
                    b5.overflow = e.overflow[0];
                    b5.overflowX = e.overflow[1];
                    b5.overflowY = e.overflow[2]
                })
            }
        }
        for (b6 in cc) {
            cf = cc[b6];
            if (bQ.exec(cf)) {
                delete cc[b6];
                b9 = b9 || cf === "toggle";
                if (cf === (ca ? "hide" : "show")) {
                    if (cf === "show" && ch && ch[b6] !== undefined) {
                        ca = true
                    } else {
                        continue
                    }
                }
                cd[b6] = ch && ch[b6] || bH.style(b7, b6)
            } else {
                cb = undefined
            }
        }
        if (!bH.isEmptyObject(cd)) {
            if (ch) {
                if ("hidden" in ch) {
                    ca = ch.hidden
                }
            } else {
                ch = bH._data(b7, "fxshow", {})
            }
            if (b9) {
                ch.hidden = !ca
            }
            if (ca) {
                bH(b7).show()
            } else {
                b8.done(function() {
                    bH(b7).hide()
                })
            }
            b8.done(function() {
                var ck;
                bH._removeData(b7, "fxshow");
                for (ck in cd) {
                    bH.style(b7, ck, cd[ck])
                }
            });
            for (b6 in cd) {
                ci = bc(ca ? ch[b6] : 0, b6, b8);
                if (!(b6 in ch)) {
                    ch[b6] = ci.start;
                    if (ca) {
                        ci.end = ci.start;
                        ci.start = b6 === "width" || b6 === "height" ? 1 : 0
                    }
                }
            }
        } else {
            if ((cb === "none" ? aZ(b7.nodeName) : cb) === "inline") {
                b5.display = cb
            }
        }
    }

    function an(b7, b9) {
        var b6, b5, ca, b8, e;
        for (b6 in b7) {
            b5 = bH.camelCase(b6);
            ca = b9[b5];
            b8 = b7[b6];
            if (bH.isArray(b8)) {
                ca = b8[1];
                b8 = b7[b6] = b8[0]
            }
            if (b6 !== b5) {
                b7[b5] = b8;
                delete b7[b6]
            }
            e = bH.cssHooks[b5];
            if (e && "expand" in e) {
                b8 = e.expand(b8);
                delete b7[b5];
                for (b6 in b8) {
                    if (!(b6 in b7)) {
                        b7[b6] = b8[b6];
                        b9[b6] = ca
                    }
                }
            } else {
                b9[b5] = ca
            }
        }
    }

    function f(b6, ca, cd) {
        var ce, e, b9 = 0,
            b5 = aF.length,
            cc = bH.Deferred().always(function() {
                delete b8.elem
            }),
            b8 = function() {
                if (e) {
                    return false
                }
                var ck = M || bm(),
                    ch = Math.max(0, b7.startTime + b7.duration - ck),
                    cf = ch / b7.duration || 0,
                    cj = 1 - cf,
                    cg = 0,
                    ci = b7.tweens.length;
                for (; cg < ci; cg++) {
                    b7.tweens[cg].run(cj)
                }
                cc.notifyWith(b6, [b7, cj, ch]);
                if (cj < 1 && ci) {
                    return ch
                } else {
                    cc.resolveWith(b6, [b7]);
                    return false
                }
            },
            b7 = cc.promise({
                elem: b6,
                props: bH.extend({}, ca),
                opts: bH.extend(true, {
                    specialEasing: {}
                }, cd),
                originalProperties: ca,
                originalOptions: cd,
                startTime: M || bm(),
                duration: cd.duration,
                tweens: [],
                createTween: function(ch, cf) {
                    var cg = bH.Tween(b6, b7.opts, ch, cf, b7.opts.specialEasing[ch] || b7.opts.easing);
                    b7.tweens.push(cg);
                    return cg
                },
                stop: function(cg) {
                    var cf = 0,
                        ch = cg ? b7.tweens.length : 0;
                    if (e) {
                        return this
                    }
                    e = true;
                    for (; cf < ch; cf++) {
                        b7.tweens[cf].run(1)
                    }
                    if (cg) {
                        cc.resolveWith(b6, [b7, cg])
                    } else {
                        cc.rejectWith(b6, [b7, cg])
                    }
                    return this
                }
            }),
            cb = b7.props;
        an(cb, b7.opts.specialEasing);
        for (; b9 < b5; b9++) {
            ce = aF[b9].call(b7, b6, cb, b7.opts);
            if (ce) {
                return ce
            }
        }
        bH.map(cb, bc, b7);
        if (bH.isFunction(b7.opts.start)) {
            b7.opts.start.call(b6, b7)
        }
        bH.fx.timer(bH.extend(b8, {
            elem: b6,
            anim: b7,
            queue: b7.opts.queue
        }));
        return b7.progress(b7.opts.progress).done(b7.opts.done, b7.opts.complete).fail(b7.opts.fail).always(b7.opts.always)
    }
    bH.Animation = bH.extend(f, {
        tweener: function(b5, b8) {
            if (bH.isFunction(b5)) {
                b8 = b5;
                b5 = ["*"]
            } else {
                b5 = b5.split(" ")
            }
            var b7, e = 0,
                b6 = b5.length;
            for (; e < b6; e++) {
                b7 = b5[e];
                a1[b7] = a1[b7] || [];
                a1[b7].unshift(b8)
            }
        },
        prefilter: function(b5, e) {
            if (e) {
                aF.unshift(b5)
            } else {
                aF.push(b5)
            }
        }
    });
    bH.speed = function(b6, b7, b5) {
        var e = b6 && typeof b6 === "object" ? bH.extend({}, b6) : {
            complete: b5 || !b5 && b7 || bH.isFunction(b6) && b6,
            duration: b6,
            easing: b5 && b7 || b7 && !bH.isFunction(b7) && b7
        };
        e.duration = bH.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in bH.fx.speeds ? bH.fx.speeds[e.duration] : bH.fx.speeds._default;
        if (e.queue == null || e.queue === true) {
            e.queue = "fx"
        }
        e.old = e.complete;
        e.complete = function() {
            if (bH.isFunction(e.old)) {
                e.old.call(this)
            }
            if (e.queue) {
                bH.dequeue(this, e.queue)
            }
        };
        return e
    };
    bH.fn.extend({
        fadeTo: function(e, b7, b6, b5) {
            return this.filter(R).css("opacity", 0).show().end().animate({
                opacity: b7
            }, e, b6, b5)
        },
        animate: function(ca, b7, b9, b8) {
            var b6 = bH.isEmptyObject(ca),
                e = bH.speed(b7, b9, b8),
                b5 = function() {
                    var cb = f(this, bH.extend({}, ca), e);
                    if (b6 || bH._data(this, "finish")) {
                        cb.stop(true)
                    }
                };
            b5.finish = b5;
            return b6 || e.queue === false ? this.each(b5) : this.queue(e.queue, b5)
        },
        stop: function(b6, b5, e) {
            var b7 = function(b8) {
                var b9 = b8.stop;
                delete b8.stop;
                b9(e)
            };
            if (typeof b6 !== "string") {
                e = b5;
                b5 = b6;
                b6 = undefined
            }
            if (b5 && b6 !== false) {
                this.queue(b6 || "fx", [])
            }
            return this.each(function() {
                var cb = true,
                    b8 = b6 != null && b6 + "queueHooks",
                    ca = bH.timers,
                    b9 = bH._data(this);
                if (b8) {
                    if (b9[b8] && b9[b8].stop) {
                        b7(b9[b8])
                    }
                } else {
                    for (b8 in b9) {
                        if (b9[b8] && b9[b8].stop && bO.test(b8)) {
                            b7(b9[b8])
                        }
                    }
                }
                for (b8 = ca.length; b8--;) {
                    if (ca[b8].elem === this && (b6 == null || ca[b8].queue === b6)) {
                        ca[b8].anim.stop(e);
                        cb = false;
                        ca.splice(b8, 1)
                    }
                }
                if (cb || !e) {
                    bH.dequeue(this, b6)
                }
            })
        },
        finish: function(e) {
            if (e !== false) {
                e = e || "fx"
            }
            return this.each(function() {
                var b7, ca = bH._data(this),
                    b6 = ca[e + "queue"],
                    b5 = ca[e + "queueHooks"],
                    b9 = bH.timers,
                    b8 = b6 ? b6.length : 0;
                ca.finish = true;
                bH.queue(this, e, []);
                if (b5 && b5.stop) {
                    b5.stop.call(this, true)
                }
                for (b7 = b9.length; b7--;) {
                    if (b9[b7].elem === this && b9[b7].queue === e) {
                        b9[b7].anim.stop(true);
                        b9.splice(b7, 1)
                    }
                }
                for (b7 = 0; b7 < b8; b7++) {
                    if (b6[b7] && b6[b7].finish) {
                        b6[b7].finish.call(this)
                    }
                }
                delete ca.finish
            })
        }
    });
    bH.each(["toggle", "show", "hide"], function(b5, e) {
        var b6 = bH.fn[e];
        bH.fn[e] = function(b7, b9, b8) {
            return b7 == null || typeof b7 === "boolean" ? b6.apply(this, arguments) : this.animate(bG(e, true), b7, b9, b8)
        }
    });
    bH.each({
        slideDown: bG("show"),
        slideUp: bG("hide"),
        slideToggle: bG("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, b5) {
        bH.fn[e] = function(b6, b8, b7) {
            return this.animate(b5, b6, b8, b7)
        }
    });
    bH.timers = [];
    bH.fx.tick = function() {
        var b6, b5 = bH.timers,
            e = 0;
        M = bH.now();
        for (; e < b5.length; e++) {
            b6 = b5[e];
            if (!b6() && b5[e] === b6) {
                b5.splice(e--, 1)
            }
        }
        if (!b5.length) {
            bH.fx.stop()
        }
        M = undefined
    };
    bH.fx.timer = function(e) {
        bH.timers.push(e);
        if (e()) {
            bH.fx.start()
        } else {
            bH.timers.pop()
        }
    };
    bH.fx.interval = 13;
    bH.fx.start = function() {
        if (!ad) {
            ad = setInterval(bH.fx.tick, bH.fx.interval)
        }
    };
    bH.fx.stop = function() {
        clearInterval(ad);
        ad = null
    };
    bH.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    bH.fn.delay = function(b5, e) {
        b5 = bH.fx ? bH.fx.speeds[b5] || b5 : b5;
        e = e || "fx";
        return this.queue(e, function(b7, b6) {
            var b8 = setTimeout(b7, b5);
            b6.stop = function() {
                clearTimeout(b8)
            }
        })
    };
    (function() {
        var b6, b8, e, b5, b7;
        b8 = n.createElement("div");
        b8.setAttribute("className", "t");
        b8.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        b5 = b8.getElementsByTagName("a")[0];
        e = n.createElement("select");
        b7 = e.appendChild(n.createElement("option"));
        b6 = b8.getElementsByTagName("input")[0];
        b5.style.cssText = "top:1px";
        C.getSetAttribute = b8.className !== "t";
        C.style = /top/.test(b5.getAttribute("style"));
        C.hrefNormalized = b5.getAttribute("href") === "/a";
        C.checkOn = !!b6.value;
        C.optSelected = b7.selected;
        C.enctype = !!n.createElement("form").enctype;
        e.disabled = true;
        C.optDisabled = !b7.disabled;
        b6 = n.createElement("input");
        b6.setAttribute("value", "");
        C.input = b6.getAttribute("value") === "";
        b6.value = "t";
        b6.setAttribute("type", "radio");
        C.radioValue = b6.value === "t"
    })();
    var ak = /\r/g;
    bH.fn.extend({
        val: function(b7) {
            var e, b5, b8, b6 = this[0];
            if (!arguments.length) {
                if (b6) {
                    e = bH.valHooks[b6.type] || bH.valHooks[b6.nodeName.toLowerCase()];
                    if (e && "get" in e && (b5 = e.get(b6, "value")) !== undefined) {
                        return b5
                    }
                    b5 = b6.value;
                    return typeof b5 === "string" ? b5.replace(ak, "") : b5 == null ? "" : b5
                }
                return
            }
            b8 = bH.isFunction(b7);
            return this.each(function(b9) {
                var ca;
                if (this.nodeType !== 1) {
                    return
                }
                if (b8) {
                    ca = b7.call(this, b9, bH(this).val())
                } else {
                    ca = b7
                }
                if (ca == null) {
                    ca = ""
                } else {
                    if (typeof ca === "number") {
                        ca += ""
                    } else {
                        if (bH.isArray(ca)) {
                            ca = bH.map(ca, function(cb) {
                                return cb == null ? "" : cb + ""
                            })
                        }
                    }
                }
                e = bH.valHooks[this.type] || bH.valHooks[this.nodeName.toLowerCase()];
                if (!e || !("set" in e) || e.set(this, ca, "value") === undefined) {
                    this.value = ca
                }
            })
        }
    });
    bH.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var b5 = bH.find.attr(e, "value");
                    return b5 != null ? b5 : bH.trim(bH.text(e))
                }
            },
            select: {
                get: function(e) {
                    var ca, b6, cc = e.options,
                        b8 = e.selectedIndex,
                        b7 = e.type === "select-one" || b8 < 0,
                        cb = b7 ? null : [],
                        b9 = b7 ? b8 + 1 : cc.length,
                        b5 = b8 < 0 ? b9 : b7 ? b8 : 0;
                    for (; b5 < b9; b5++) {
                        b6 = cc[b5];
                        if ((b6.selected || b5 === b8) && (C.optDisabled ? !b6.disabled : b6.getAttribute("disabled") === null) && (!b6.parentNode.disabled || !bH.nodeName(b6.parentNode, "optgroup"))) {
                            ca = bH(b6).val();
                            if (b7) {
                                return ca
                            }
                            cb.push(ca)
                        }
                    }
                    return cb
                },
                set: function(b9, ca) {
                    var cb, b8, b6 = b9.options,
                        e = bH.makeArray(ca),
                        b7 = b6.length;
                    while (b7--) {
                        b8 = b6[b7];
                        if (bH.inArray(bH.valHooks.option.get(b8), e) >= 0) {
                            try {
                                b8.selected = cb = true
                            } catch (b5) {
                                b8.scrollHeight
                            }
                        } else {
                            b8.selected = false
                        }
                    }
                    if (!cb) {
                        b9.selectedIndex = -1
                    }
                    return b6
                }
            }
        }
    });
    bH.each(["radio", "checkbox"], function() {
        bH.valHooks[this] = {
            set: function(e, b5) {
                if (bH.isArray(b5)) {
                    return (e.checked = bH.inArray(bH(e).val(), b5) >= 0)
                }
            }
        };
        if (!C.checkOn) {
            bH.valHooks[this].get = function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    });
    var a9, b2, bN = bH.expr.attrHandle,
        ap = /^(?:checked|selected)$/i,
        bM = C.getSetAttribute,
        bE = C.input;
    bH.fn.extend({
        attr: function(e, b5) {
            return aA(this, bH.attr, e, b5, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                bH.removeAttr(this, e)
            })
        }
    });
    bH.extend({
        attr: function(b8, b7, b9) {
            var e, b6, b5 = b8.nodeType;
            if (!b8 || b5 === 3 || b5 === 8 || b5 === 2) {
                return
            }
            if (typeof b8.getAttribute === aB) {
                return bH.prop(b8, b7, b9)
            }
            if (b5 !== 1 || !bH.isXMLDoc(b8)) {
                b7 = b7.toLowerCase();
                e = bH.attrHooks[b7] || (bH.expr.match.bool.test(b7) ? b2 : a9)
            }
            if (b9 !== undefined) {
                if (b9 === null) {
                    bH.removeAttr(b8, b7)
                } else {
                    if (e && "set" in e && (b6 = e.set(b8, b9, b7)) !== undefined) {
                        return b6
                    } else {
                        b8.setAttribute(b7, b9 + "");
                        return b9
                    }
                }
            } else {
                if (e && "get" in e && (b6 = e.get(b8, b7)) !== null) {
                    return b6
                } else {
                    b6 = bH.find.attr(b8, b7);
                    return b6 == null ? undefined : b6
                }
            }
        },
        removeAttr: function(b6, b8) {
            var e, b7, b5 = 0,
                b9 = b8 && b8.match(aE);
            if (b9 && b6.nodeType === 1) {
                while ((e = b9[b5++])) {
                    b7 = bH.propFix[e] || e;
                    if (bH.expr.match.bool.test(e)) {
                        if (bE && bM || !ap.test(e)) {
                            b6[b7] = false
                        } else {
                            b6[bH.camelCase("default-" + e)] = b6[b7] = false
                        }
                    } else {
                        bH.attr(b6, e, "")
                    }
                    b6.removeAttribute(bM ? e : b7)
                }
            }
        },
        attrHooks: {
            type: {
                set: function(e, b5) {
                    if (!C.radioValue && b5 === "radio" && bH.nodeName(e, "input")) {
                        var b6 = e.value;
                        e.setAttribute("type", b5);
                        if (b6) {
                            e.value = b6
                        }
                        return b5
                    }
                }
            }
        }
    });
    b2 = {
        set: function(b5, b6, e) {
            if (b6 === false) {
                bH.removeAttr(b5, e)
            } else {
                if (bE && bM || !ap.test(e)) {
                    b5.setAttribute(!bM && bH.propFix[e] || e, e)
                } else {
                    b5[bH.camelCase("default-" + e)] = b5[e] = true
                }
            }
            return e
        }
    };
    bH.each(bH.expr.match.bool.source.match(/\w+/g), function(b6, b5) {
        var e = bN[b5] || bH.find.attr;
        bN[b5] = bE && bM || !ap.test(b5) ? function(b9, b8, cb) {
            var b7, ca;
            if (!cb) {
                ca = bN[b8];
                bN[b8] = b7;
                b7 = e(b9, b8, cb) != null ? b8.toLowerCase() : null;
                bN[b8] = ca
            }
            return b7
        } : function(b8, b7, b9) {
            if (!b9) {
                return b8[bH.camelCase("default-" + b7)] ? b7.toLowerCase() : null
            }
        }
    });
    if (!bE || !bM) {
        bH.attrHooks.value = {
            set: function(b5, b6, e) {
                if (bH.nodeName(b5, "input")) {
                    b5.defaultValue = b6
                } else {
                    return a9 && a9.set(b5, b6, e)
                }
            }
        }
    }
    if (!bM) {
        a9 = {
            set: function(b6, b7, b5) {
                var e = b6.getAttributeNode(b5);
                if (!e) {
                    b6.setAttributeNode((e = b6.ownerDocument.createAttribute(b5)))
                }
                e.value = b7 += "";
                if (b5 === "value" || b7 === b6.getAttribute(b5)) {
                    return b7
                }
            }
        };
        bN.id = bN.name = bN.coords = function(b6, b5, b7) {
            var e;
            if (!b7) {
                return (e = b6.getAttributeNode(b5)) && e.value !== "" ? e.value : null
            }
        };
        bH.valHooks.button = {
            get: function(b6, b5) {
                var e = b6.getAttributeNode(b5);
                if (e && e.specified) {
                    return e.value
                }
            },
            set: a9.set
        };
        bH.attrHooks.contenteditable = {
            set: function(b5, b6, e) {
                a9.set(b5, b6 === "" ? false : b6, e)
            }
        };
        bH.each(["width", "height"], function(b5, e) {
            bH.attrHooks[e] = {
                set: function(b6, b7) {
                    if (b7 === "") {
                        b6.setAttribute(e, "auto");
                        return b7
                    }
                }
            }
        })
    }
    if (!C.style) {
        bH.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || undefined
            },
            set: function(e, b5) {
                return (e.style.cssText = b5 + "")
            }
        }
    }
    var aI = /^(?:input|select|textarea|button|object)$/i,
        E = /^(?:a|area)$/i;
    bH.fn.extend({
        prop: function(e, b5) {
            return aA(this, bH.prop, e, b5, arguments.length > 1)
        },
        removeProp: function(e) {
            e = bH.propFix[e] || e;
            return this.each(function() {
                try {
                    this[e] = undefined;
                    delete this[e]
                } catch (b5) {}
            })
        }
    });
    bH.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(b9, b7, ca) {
            var b6, e, b8, b5 = b9.nodeType;
            if (!b9 || b5 === 3 || b5 === 8 || b5 === 2) {
                return
            }
            b8 = b5 !== 1 || !bH.isXMLDoc(b9);
            if (b8) {
                b7 = bH.propFix[b7] || b7;
                e = bH.propHooks[b7]
            }
            if (ca !== undefined) {
                return e && "set" in e && (b6 = e.set(b9, ca, b7)) !== undefined ? b6 : (b9[b7] = ca)
            } else {
                return e && "get" in e && (b6 = e.get(b9, b7)) !== null ? b6 : b9[b7]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(b5) {
                    var e = bH.find.attr(b5, "tabindex");
                    return e ? parseInt(e, 10) : aI.test(b5.nodeName) || E.test(b5.nodeName) && b5.href ? 0 : -1
                }
            }
        }
    });
    if (!C.hrefNormalized) {
        bH.each(["href", "src"], function(b5, e) {
            bH.propHooks[e] = {
                get: function(b6) {
                    return b6.getAttribute(e, 4)
                }
            }
        })
    }
    if (!C.optSelected) {
        bH.propHooks.selected = {
            get: function(b5) {
                var e = b5.parentNode;
                if (e) {
                    e.selectedIndex;
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                }
                return null
            }
        }
    }
    bH.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        bH.propFix[this.toLowerCase()] = this
    });
    if (!C.enctype) {
        bH.propFix.enctype = "encoding"
    }
    var bK = /[\t\r\n\f]/g;
    bH.fn.extend({
        addClass: function(cc) {
            var b6, b5, cd, ca, b7, e, b8 = 0,
                b9 = this.length,
                cb = typeof cc === "string" && cc;
            if (bH.isFunction(cc)) {
                return this.each(function(ce) {
                    bH(this).addClass(cc.call(this, ce, this.className))
                })
            }
            if (cb) {
                b6 = (cc || "").match(aE) || [];
                for (; b8 < b9; b8++) {
                    b5 = this[b8];
                    cd = b5.nodeType === 1 && (b5.className ? (" " + b5.className + " ").replace(bK, " ") : " ");
                    if (cd) {
                        b7 = 0;
                        while ((ca = b6[b7++])) {
                            if (cd.indexOf(" " + ca + " ") < 0) {
                                cd += ca + " "
                            }
                        }
                        e = bH.trim(cd);
                        if (b5.className !== e) {
                            b5.className = e
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(cc) {
            var b6, b5, cd, ca, b7, e, b8 = 0,
                b9 = this.length,
                cb = arguments.length === 0 || typeof cc === "string" && cc;
            if (bH.isFunction(cc)) {
                return this.each(function(ce) {
                    bH(this).removeClass(cc.call(this, ce, this.className))
                })
            }
            if (cb) {
                b6 = (cc || "").match(aE) || [];
                for (; b8 < b9; b8++) {
                    b5 = this[b8];
                    cd = b5.nodeType === 1 && (b5.className ? (" " + b5.className + " ").replace(bK, " ") : "");
                    if (cd) {
                        b7 = 0;
                        while ((ca = b6[b7++])) {
                            while (cd.indexOf(" " + ca + " ") >= 0) {
                                cd = cd.replace(" " + ca + " ", " ")
                            }
                        }
                        e = cc ? bH.trim(cd) : "";
                        if (b5.className !== e) {
                            b5.className = e
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(b6, e) {
            var b5 = typeof b6;
            if (typeof e === "boolean" && b5 === "string") {
                return e ? this.addClass(b6) : this.removeClass(b6)
            }
            if (bH.isFunction(b6)) {
                return this.each(function(b7) {
                    bH(this).toggleClass(b6.call(this, b7, this.className, e), e)
                })
            }
            return this.each(function() {
                if (b5 === "string") {
                    var b9, b8 = 0,
                        b7 = bH(this),
                        ca = b6.match(aE) || [];
                    while ((b9 = ca[b8++])) {
                        if (b7.hasClass(b9)) {
                            b7.removeClass(b9)
                        } else {
                            b7.addClass(b9)
                        }
                    }
                } else {
                    if (b5 === aB || b5 === "boolean") {
                        if (this.className) {
                            bH._data(this, "__className__", this.className)
                        }
                        this.className = this.className || b6 === false ? "" : bH._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(e) {
            var b7 = " " + e + " ",
                b6 = 0,
                b5 = this.length;
            for (; b6 < b5; b6++) {
                if (this[b6].nodeType === 1 && (" " + this[b6].className + " ").replace(bK, " ").indexOf(b7) >= 0) {
                    return true
                }
            }
            return false
        }
    });
    bH.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(b5, e) {
        bH.fn[e] = function(b7, b6) {
            return arguments.length > 0 ? this.on(e, null, b7, b6) : this.trigger(e)
        }
    });
    bH.fn.extend({
        hover: function(e, b5) {
            return this.mouseenter(e).mouseleave(b5 || e)
        },
        bind: function(e, b6, b5) {
            return this.on(e, null, b6, b5)
        },
        unbind: function(e, b5) {
            return this.off(e, null, b5)
        },
        delegate: function(e, b5, b7, b6) {
            return this.on(b5, e, b7, b6)
        },
        undelegate: function(e, b5, b6) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(b5, e || "**", b6)
        }
    });
    var bo = bH.now();
    var bP = (/\?/);
    var a0 = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    bH.parseJSON = function(e) {
        if (a4.JSON && a4.JSON.parse) {
            return a4.JSON.parse(e + "")
        }
        var b7, b6 = null,
            b5 = bH.trim(e + "");
        return b5 && !bH.trim(b5.replace(a0, function(ca, b8, b9, cb) {
            if (b7 && b8) {
                b6 = 0
            }
            if (b6 === 0) {
                return ca
            }
            b7 = b9 || b8;
            b6 += !cb - !b9;
            return ""
        })) ? (Function("return " + b5))() : bH.error("Invalid JSON: " + e)
    };
    bH.parseXML = function(b7) {
        var b5, b6;
        if (!b7 || typeof b7 !== "string") {
            return null
        }
        try {
            if (a4.DOMParser) {
                b6 = new DOMParser();
                b5 = b6.parseFromString(b7, "text/xml")
            } else {
                b5 = new ActiveXObject("Microsoft.XMLDOM");
                b5.async = "false";
                b5.loadXML(b7)
            }
        } catch (b8) {
            b5 = undefined
        }
        if (!b5 || !b5.documentElement || b5.getElementsByTagName("parsererror").length) {
            bH.error("Invalid XML: " + b7)
        }
        return b5
    };
    var b3, Z, ao = /#.*$/,
        Q = /([?&])_=[^&]*/,
        ag = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        B = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        q = /^(?:GET|HEAD)$/,
        aJ = /^\/\//,
        aU = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        v = {},
        a8 = {},
        aW = "*/".concat("*");
    try {
        Z = location.href
    } catch (bh) {
        Z = n.createElement("a");
        Z.href = "";
        Z = Z.href
    }
    b3 = aU.exec(Z.toLowerCase()) || [];

    function bJ(e) {
        return function(b8, b9) {
            if (typeof b8 !== "string") {
                b9 = b8;
                b8 = "*"
            }
            var b5, b6 = 0,
                b7 = b8.toLowerCase().match(aE) || [];
            if (bH.isFunction(b9)) {
                while ((b5 = b7[b6++])) {
                    if (b5.charAt(0) === "+") {
                        b5 = b5.slice(1) || "*";
                        (e[b5] = e[b5] || []).unshift(b9)
                    } else {
                        (e[b5] = e[b5] || []).push(b9)
                    }
                }
            }
        }
    }

    function p(e, b6, ca, b7) {
        var b5 = {},
            b8 = (e === a8);

        function b9(cb) {
            var cc;
            b5[cb] = true;
            bH.each(e[cb] || [], function(ce, cd) {
                var cf = cd(b6, ca, b7);
                if (typeof cf === "string" && !b8 && !b5[cf]) {
                    b6.dataTypes.unshift(cf);
                    b9(cf);
                    return false
                } else {
                    if (b8) {
                        return !(cc = cf)
                    }
                }
            });
            return cc
        }
        return b9(b6.dataTypes[0]) || !b5["*"] && b9("*")
    }

    function s(b6, b7) {
        var e, b5, b8 = bH.ajaxSettings.flatOptions || {};
        for (b5 in b7) {
            if (b7[b5] !== undefined) {
                (b8[b5] ? b6 : (e || (e = {})))[b5] = b7[b5]
            }
        }
        if (e) {
            bH.extend(true, b6, e)
        }
        return b6
    }

    function g(cc, cb, b8) {
        var e, b7, b6, b9, b5 = cc.contents,
            ca = cc.dataTypes;
        while (ca[0] === "*") {
            ca.shift();
            if (b7 === undefined) {
                b7 = cc.mimeType || cb.getResponseHeader("Content-Type")
            }
        }
        if (b7) {
            for (b9 in b5) {
                if (b5[b9] && b5[b9].test(b7)) {
                    ca.unshift(b9);
                    break
                }
            }
        }
        if (ca[0] in b8) {
            b6 = ca[0]
        } else {
            for (b9 in b8) {
                if (!ca[0] || cc.converters[b9 + " " + ca[0]]) {
                    b6 = b9;
                    break
                }
                if (!e) {
                    e = b9
                }
            }
            b6 = b6 || e
        }
        if (b6) {
            if (b6 !== ca[0]) {
                ca.unshift(b6)
            }
            return b8[b6]
        }
    }

    function af(cg, b8, cd, b6) {
        var b5, cb, ce, b9, b7, cf = {},
            cc = cg.dataTypes.slice();
        if (cc[1]) {
            for (ce in cg.converters) {
                cf[ce.toLowerCase()] = cg.converters[ce]
            }
        }
        cb = cc.shift();
        while (cb) {
            if (cg.responseFields[cb]) {
                cd[cg.responseFields[cb]] = b8
            }
            if (!b7 && b6 && cg.dataFilter) {
                b8 = cg.dataFilter(b8, cg.dataType)
            }
            b7 = cb;
            cb = cc.shift();
            if (cb) {
                if (cb === "*") {
                    cb = b7
                } else {
                    if (b7 !== "*" && b7 !== cb) {
                        ce = cf[b7 + " " + cb] || cf["* " + cb];
                        if (!ce) {
                            for (b5 in cf) {
                                b9 = b5.split(" ");
                                if (b9[1] === cb) {
                                    ce = cf[b7 + " " + b9[0]] || cf["* " + b9[0]];
                                    if (ce) {
                                        if (ce === true) {
                                            ce = cf[b5]
                                        } else {
                                            if (cf[b5] !== true) {
                                                cb = b9[0];
                                                cc.unshift(b9[1])
                                            }
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (ce !== true) {
                            if (ce && cg["throws"]) {
                                b8 = ce(b8)
                            } else {
                                try {
                                    b8 = ce(b8)
                                } catch (ca) {
                                    return {
                                        state: "parsererror",
                                        error: ce ? ca : "No conversion from " + b7 + " to " + cb
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: b8
        }
    }
    bH.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Z,
            type: "GET",
            isLocal: B.test(b3[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": aW,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": bH.parseJSON,
                "text xml": bH.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(b5, e) {
            return e ? s(s(b5, bH.ajaxSettings), e) : s(bH.ajaxSettings, b5)
        },
        ajaxPrefilter: bJ(v),
        ajaxTransport: bJ(a8),
        ajax: function(b9, b6) {
            if (typeof b9 === "object") {
                b6 = b9;
                b9 = undefined
            }
            b6 = b6 || {};
            var ci, ck, ca, cp, ce, b5, cl, b7, cd = bH.ajaxSetup({}, b6),
                cr = cd.context || cd,
                cg = cd.context && (cr.nodeType || cr.jquery) ? bH(cr) : bH.event,
                cq = bH.Deferred(),
                cn = bH.Callbacks("once memory"),
                cb = cd.statusCode || {},
                ch = {},
                co = {},
                b8 = 0,
                cc = "canceled",
                cj = {
                    readyState: 0,
                    getResponseHeader: function(cs) {
                        var e;
                        if (b8 === 2) {
                            if (!b7) {
                                b7 = {};
                                while ((e = ag.exec(cp))) {
                                    b7[e[1].toLowerCase()] = e[2]
                                }
                            }
                            e = b7[cs.toLowerCase()]
                        }
                        return e == null ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return b8 === 2 ? cp : null
                    },
                    setRequestHeader: function(cs, ct) {
                        var e = cs.toLowerCase();
                        if (!b8) {
                            cs = co[e] = co[e] || cs;
                            ch[cs] = ct
                        }
                        return this
                    },
                    overrideMimeType: function(e) {
                        if (!b8) {
                            cd.mimeType = e
                        }
                        return this
                    },
                    statusCode: function(cs) {
                        var e;
                        if (cs) {
                            if (b8 < 2) {
                                for (e in cs) {
                                    cb[e] = [cb[e], cs[e]]
                                }
                            } else {
                                cj.always(cs[cj.status])
                            }
                        }
                        return this
                    },
                    abort: function(cs) {
                        var e = cs || cc;
                        if (cl) {
                            cl.abort(e)
                        }
                        cf(0, e);
                        return this
                    }
                };
            cq.promise(cj).complete = cn.add;
            cj.success = cj.done;
            cj.error = cj.fail;
            cd.url = ((b9 || cd.url || Z) + "").replace(ao, "").replace(aJ, b3[1] + "//");
            cd.type = b6.method || b6.type || cd.method || cd.type;
            cd.dataTypes = bH.trim(cd.dataType || "*").toLowerCase().match(aE) || [""];
            if (cd.crossDomain == null) {
                ci = aU.exec(cd.url.toLowerCase());
                cd.crossDomain = !!(ci && (ci[1] !== b3[1] || ci[2] !== b3[2] || (ci[3] || (ci[1] === "http:" ? "80" : "443")) !== (b3[3] || (b3[1] === "http:" ? "80" : "443"))))
            }
            if (cd.data && cd.processData && typeof cd.data !== "string") {
                cd.data = bH.param(cd.data, cd.traditional)
            }
            p(v, cd, b6, cj);
            if (b8 === 2) {
                return cj
            }
            b5 = bH.event && cd.global;
            if (b5 && bH.active++ === 0) {
                bH.event.trigger("ajaxStart")
            }
            cd.type = cd.type.toUpperCase();
            cd.hasContent = !q.test(cd.type);
            ca = cd.url;
            if (!cd.hasContent) {
                if (cd.data) {
                    ca = (cd.url += (bP.test(ca) ? "&" : "?") + cd.data);
                    delete cd.data
                }
                if (cd.cache === false) {
                    cd.url = Q.test(ca) ? ca.replace(Q, "$1_=" + bo++) : ca + (bP.test(ca) ? "&" : "?") + "_=" + bo++
                }
            }
            if (cd.ifModified) {
                if (bH.lastModified[ca]) {
                    cj.setRequestHeader("If-Modified-Since", bH.lastModified[ca])
                }
                if (bH.etag[ca]) {
                    cj.setRequestHeader("If-None-Match", bH.etag[ca])
                }
            }
            if (cd.data && cd.hasContent && cd.contentType !== false || b6.contentType) {
                cj.setRequestHeader("Content-Type", cd.contentType)
            }
            cj.setRequestHeader("Accept", cd.dataTypes[0] && cd.accepts[cd.dataTypes[0]] ? cd.accepts[cd.dataTypes[0]] + (cd.dataTypes[0] !== "*" ? ", " + aW + "; q=0.01" : "") : cd.accepts["*"]);
            for (ck in cd.headers) {
                cj.setRequestHeader(ck, cd.headers[ck])
            }
            if (cd.beforeSend && (cd.beforeSend.call(cr, cj, cd) === false || b8 === 2)) {
                return cj.abort()
            }
            cc = "abort";
            for (ck in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                cj[ck](cd[ck])
            }
            cl = p(a8, cd, b6, cj);
            if (!cl) {
                cf(-1, "No Transport")
            } else {
                cj.readyState = 1;
                if (b5) {
                    cg.trigger("ajaxSend", [cj, cd])
                }
                if (cd.async && cd.timeout > 0) {
                    ce = setTimeout(function() {
                        cj.abort("timeout")
                    }, cd.timeout)
                }
                try {
                    b8 = 1;
                    cl.send(ch, cf)
                } catch (cm) {
                    if (b8 < 2) {
                        cf(-1, cm)
                    } else {
                        throw cm
                    }
                }
            }

            function cf(cw, cs, cx, cu) {
                var e, cA, cy, cv, cz, ct = cs;
                if (b8 === 2) {
                    return
                }
                b8 = 2;
                if (ce) {
                    clearTimeout(ce)
                }
                cl = undefined;
                cp = cu || "";
                cj.readyState = cw > 0 ? 4 : 0;
                e = cw >= 200 && cw < 300 || cw === 304;
                if (cx) {
                    cv = g(cd, cj, cx)
                }
                cv = af(cd, cv, cj, e);
                if (e) {
                    if (cd.ifModified) {
                        cz = cj.getResponseHeader("Last-Modified");
                        if (cz) {
                            bH.lastModified[ca] = cz
                        }
                        cz = cj.getResponseHeader("etag");
                        if (cz) {
                            bH.etag[ca] = cz
                        }
                    }
                    if (cw === 204 || cd.type === "HEAD") {
                        ct = "nocontent"
                    } else {
                        if (cw === 304) {
                            ct = "notmodified"
                        } else {
                            ct = cv.state;
                            cA = cv.data;
                            cy = cv.error;
                            e = !cy
                        }
                    }
                } else {
                    cy = ct;
                    if (cw || !ct) {
                        ct = "error";
                        if (cw < 0) {
                            cw = 0
                        }
                    }
                }
                cj.status = cw;
                cj.statusText = (cs || ct) + "";
                if (e) {
                    cq.resolveWith(cr, [cA, ct, cj])
                } else {
                    cq.rejectWith(cr, [cj, ct, cy])
                }
                cj.statusCode(cb);
                cb = undefined;
                if (b5) {
                    cg.trigger(e ? "ajaxSuccess" : "ajaxError", [cj, cd, e ? cA : cy])
                }
                cn.fireWith(cr, [cj, ct]);
                if (b5) {
                    cg.trigger("ajaxComplete", [cj, cd]);
                    if (!(--bH.active)) {
                        bH.event.trigger("ajaxStop")
                    }
                }
            }
            return cj
        },
        getJSON: function(e, b5, b6) {
            return bH.get(e, b5, b6, "json")
        },
        getScript: function(e, b5) {
            return bH.get(e, undefined, b5, "script")
        }
    });
    bH.each(["get", "post"], function(e, b5) {
        bH[b5] = function(b6, b8, b9, b7) {
            if (bH.isFunction(b8)) {
                b7 = b7 || b9;
                b9 = b8;
                b8 = undefined
            }
            return bH.ajax({
                url: b6,
                type: b5,
                dataType: b7,
                data: b8,
                success: b9
            })
        }
    });
    bH._evalUrl = function(e) {
        return bH.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        })
    };
    bH.fn.extend({
        wrapAll: function(e) {
            if (bH.isFunction(e)) {
                return this.each(function(b6) {
                    bH(this).wrapAll(e.call(this, b6))
                })
            }
            if (this[0]) {
                var b5 = bH(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    b5.insertBefore(this[0])
                }
                b5.map(function() {
                    var b6 = this;
                    while (b6.firstChild && b6.firstChild.nodeType === 1) {
                        b6 = b6.firstChild
                    }
                    return b6
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            if (bH.isFunction(e)) {
                return this.each(function(b5) {
                    bH(this).wrapInner(e.call(this, b5))
                })
            }
            return this.each(function() {
                var b5 = bH(this),
                    b6 = b5.contents();
                if (b6.length) {
                    b6.wrapAll(e)
                } else {
                    b5.append(e)
                }
            })
        },
        wrap: function(e) {
            var b5 = bH.isFunction(e);
            return this.each(function(b6) {
                bH(this).wrapAll(b5 ? e.call(this, b6) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!bH.nodeName(this, "body")) {
                    bH(this).replaceWith(this.childNodes)
                }
            }).end()
        }
    });
    bH.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || (!C.reliableHiddenOffsets() && ((e.style && e.style.display) || bH.css(e, "display")) === "none")
    };
    bH.expr.filters.visible = function(e) {
        return !bH.expr.filters.hidden(e)
    };
    var bv = /%20/g,
        aR = /\[\]$/,
        W = /\r?\n/g,
        b = /^(?:submit|button|image|reset|file)$/i,
        at = /^(?:input|select|textarea|keygen)/i;

    function j(b6, b8, b5, b7) {
        var e;
        if (bH.isArray(b8)) {
            bH.each(b8, function(ca, b9) {
                if (b5 || aR.test(b6)) {
                    b7(b6, b9)
                } else {
                    j(b6 + "[" + (typeof b9 === "object" ? ca : "") + "]", b9, b5, b7)
                }
            })
        } else {
            if (!b5 && bH.type(b8) === "object") {
                for (e in b8) {
                    j(b6 + "[" + e + "]", b8[e], b5, b7)
                }
            } else {
                b7(b6, b8)
            }
        }
    }
    bH.param = function(e, b6) {
        var b7, b5 = [],
            b8 = function(b9, ca) {
                ca = bH.isFunction(ca) ? ca() : (ca == null ? "" : ca);
                b5[b5.length] = encodeURIComponent(b9) + "=" + encodeURIComponent(ca)
            };
        if (b6 === undefined) {
            b6 = bH.ajaxSettings && bH.ajaxSettings.traditional
        }
        if (bH.isArray(e) || (e.jquery && !bH.isPlainObject(e))) {
            bH.each(e, function() {
                b8(this.name, this.value)
            })
        } else {
            for (b7 in e) {
                j(b7, e[b7], b6, b8)
            }
        }
        return b5.join("&").replace(bv, "+")
    };
    bH.fn.extend({
        serialize: function() {
            return bH.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = bH.prop(this, "elements");
                return e ? bH.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !bH(this).is(":disabled") && at.test(this.nodeName) && !b.test(e) && (this.checked || !aL.test(e))
            }).map(function(e, b5) {
                var b6 = bH(this).val();
                return b6 == null ? null : bH.isArray(b6) ? bH.map(b6, function(b7) {
                    return {
                        name: b5.name,
                        value: b7.replace(W, "\r\n")
                    }
                }) : {
                    name: b5.name,
                    value: b6.replace(W, "\r\n")
                }
            }).get()
        }
    });
    bH.ajaxSettings.xhr = a4.ActiveXObject !== undefined ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && bD() || bf()
    } : bD;
    var az = 0,
        ai = {},
        ax = bH.ajaxSettings.xhr();
    if (a4.attachEvent) {
        a4.attachEvent("onunload", function() {
            for (var e in ai) {
                ai[e](undefined, true)
            }
        })
    }
    C.cors = !!ax && ("withCredentials" in ax);
    ax = C.ajax = !!ax;
    if (ax) {
        bH.ajaxTransport(function(e) {
            if (!e.crossDomain || C.cors) {
                var b5;
                return {
                    send: function(b9, b6) {
                        var b7, b8 = e.xhr(),
                            ca = ++az;
                        b8.open(e.type, e.url, e.async, e.username, e.password);
                        if (e.xhrFields) {
                            for (b7 in e.xhrFields) {
                                b8[b7] = e.xhrFields[b7]
                            }
                        }
                        if (e.mimeType && b8.overrideMimeType) {
                            b8.overrideMimeType(e.mimeType)
                        }
                        if (!e.crossDomain && !b9["X-Requested-With"]) {
                            b9["X-Requested-With"] = "XMLHttpRequest"
                        }
                        for (b7 in b9) {
                            if (b9[b7] !== undefined) {
                                b8.setRequestHeader(b7, b9[b7] + "")
                            }
                        }
                        b8.send((e.hasContent && e.data) || null);
                        b5 = function(cd, cc) {
                            var cb, cg, ce;
                            if (b5 && (cc || b8.readyState === 4)) {
                                delete ai[ca];
                                b5 = undefined;
                                b8.onreadystatechange = bH.noop;
                                if (cc) {
                                    if (b8.readyState !== 4) {
                                        b8.abort()
                                    }
                                } else {
                                    ce = {};
                                    cb = b8.status;
                                    if (typeof b8.responseText === "string") {
                                        ce.text = b8.responseText
                                    }
                                    try {
                                        cg = b8.statusText
                                    } catch (cf) {
                                        cg = ""
                                    }
                                    if (!cb && e.isLocal && !e.crossDomain) {
                                        cb = ce.text ? 200 : 404
                                    } else {
                                        if (cb === 1223) {
                                            cb = 204
                                        }
                                    }
                                }
                            }
                            if (ce) {
                                b6(cb, cg, ce, b8.getAllResponseHeaders())
                            }
                        };
                        if (!e.async) {
                            b5()
                        } else {
                            if (b8.readyState === 4) {
                                setTimeout(b5)
                            } else {
                                b8.onreadystatechange = ai[ca] = b5
                            }
                        }
                    },
                    abort: function() {
                        if (b5) {
                            b5(undefined, true)
                        }
                    }
                }
            }
        })
    }

    function bD() {
        try {
            return new a4.XMLHttpRequest()
        } catch (b5) {}
    }

    function bf() {
        try {
            return new a4.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b5) {}
    }
    bH.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                bH.globalEval(e);
                return e
            }
        }
    });
    bH.ajaxPrefilter("script", function(e) {
        if (e.cache === undefined) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET";
            e.global = false
        }
    });
    bH.ajaxTransport("script", function(b6) {
        if (b6.crossDomain) {
            var e, b5 = n.head || bH("head")[0] || n.documentElement;
            return {
                send: function(b7, b8) {
                    e = n.createElement("script");
                    e.async = true;
                    if (b6.scriptCharset) {
                        e.charset = b6.scriptCharset
                    }
                    e.src = b6.url;
                    e.onload = e.onreadystatechange = function(ca, b9) {
                        if (b9 || !e.readyState || /loaded|complete/.test(e.readyState)) {
                            e.onload = e.onreadystatechange = null;
                            if (e.parentNode) {
                                e.parentNode.removeChild(e)
                            }
                            e = null;
                            if (!b9) {
                                b8(200, "success")
                            }
                        }
                    };
                    b5.insertBefore(e, b5.firstChild)
                },
                abort: function() {
                    if (e) {
                        e.onload(undefined, true)
                    }
                }
            }
        }
    });
    var br = [],
        a7 = /(=)\?(?=&|$)|\?\?/;
    bH.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = br.pop() || (bH.expando + "_" + (bo++));
            this[e] = true;
            return e
        }
    });
    bH.ajaxPrefilter("json jsonp", function(b7, e, b8) {
        var ca, b5, b6, b9 = b7.jsonp !== false && (a7.test(b7.url) ? "url" : typeof b7.data === "string" && !(b7.contentType || "").indexOf("application/x-www-form-urlencoded") && a7.test(b7.data) && "data");
        if (b9 || b7.dataTypes[0] === "jsonp") {
            ca = b7.jsonpCallback = bH.isFunction(b7.jsonpCallback) ? b7.jsonpCallback() : b7.jsonpCallback;
            if (b9) {
                b7[b9] = b7[b9].replace(a7, "$1" + ca)
            } else {
                if (b7.jsonp !== false) {
                    b7.url += (bP.test(b7.url) ? "&" : "?") + b7.jsonp + "=" + ca
                }
            }
            b7.converters["script json"] = function() {
                if (!b6) {
                    bH.error(ca + " was not called")
                }
                return b6[0]
            };
            b7.dataTypes[0] = "json";
            b5 = a4[ca];
            a4[ca] = function() {
                b6 = arguments
            };
            b8.always(function() {
                a4[ca] = b5;
                if (b7[ca]) {
                    b7.jsonpCallback = e.jsonpCallback;
                    br.push(ca)
                }
                if (b6 && bH.isFunction(b5)) {
                    b5(b6[0])
                }
                b6 = b5 = undefined
            });
            return "script"
        }
    });
    bH.parseHTML = function(b8, b6, b7) {
        if (!b8 || typeof b8 !== "string") {
            return null
        }
        if (typeof b6 === "boolean") {
            b7 = b6;
            b6 = false
        }
        b6 = b6 || n;
        var b5 = a.exec(b8),
            e = !b7 && [];
        if (b5) {
            return [b6.createElement(b5[1])]
        }
        b5 = bH.buildFragment([b8], b6, e);
        if (e && e.length) {
            bH(e).remove()
        }
        return bH.merge([], b5.childNodes)
    };
    var b0 = bH.fn.load;
    bH.fn.load = function(b7, ca, cb) {
        if (typeof b7 !== "string" && b0) {
            return b0.apply(this, arguments)
        }
        var e, b6, b8, b5 = this,
            b9 = b7.indexOf(" ");
        if (b9 >= 0) {
            e = bH.trim(b7.slice(b9, b7.length));
            b7 = b7.slice(0, b9)
        }
        if (bH.isFunction(ca)) {
            cb = ca;
            ca = undefined
        } else {
            if (ca && typeof ca === "object") {
                b8 = "POST"
            }
        }
        if (b5.length > 0) {
            bH.ajax({
                url: b7,
                type: b8,
                dataType: "html",
                data: ca
            }).done(function(cc) {
                b6 = arguments;
                b5.html(e ? bH("<div>").append(bH.parseHTML(cc)).find(e) : cc)
            }).complete(cb && function(cd, cc) {
                b5.each(cb, b6 || [cd.responseText, cc, cd])
            })
        }
        return this
    };
    bH.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, b5) {
        bH.fn[b5] = function(b6) {
            return this.on(b5, b6)
        }
    });
    bH.expr.filters.animated = function(e) {
        return bH.grep(bH.timers, function(b5) {
            return e === b5.elem
        }).length
    };
    var bW = a4.document.documentElement;

    function bq(e) {
        return bH.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    bH.offset = {
        setOffset: function(b6, cg, ca) {
            var cc, b9, e, b7, b5, ce, cf, cb = bH.css(b6, "position"),
                b8 = bH(b6),
                cd = {};
            if (cb === "static") {
                b6.style.position = "relative"
            }
            b5 = b8.offset();
            e = bH.css(b6, "top");
            ce = bH.css(b6, "left");
            cf = (cb === "absolute" || cb === "fixed") && bH.inArray("auto", [e, ce]) > -1;
            if (cf) {
                cc = b8.position();
                b7 = cc.top;
                b9 = cc.left
            } else {
                b7 = parseFloat(e) || 0;
                b9 = parseFloat(ce) || 0
            }
            if (bH.isFunction(cg)) {
                cg = cg.call(b6, ca, b5)
            }
            if (cg.top != null) {
                cd.top = (cg.top - b5.top) + b7
            }
            if (cg.left != null) {
                cd.left = (cg.left - b5.left) + b9
            }
            if ("using" in cg) {
                cg.using.call(b6, cd)
            } else {
                b8.css(cd)
            }
        }
    };
    bH.fn.extend({
        offset: function(b5) {
            if (arguments.length) {
                return b5 === undefined ? this : this.each(function(ca) {
                    bH.offset.setOffset(this, b5, ca)
                })
            }
            var e, b9, b7 = {
                    top: 0,
                    left: 0
                },
                b6 = this[0],
                b8 = b6 && b6.ownerDocument;
            if (!b8) {
                return
            }
            e = b8.documentElement;
            if (!bH.contains(e, b6)) {
                return b7
            }
            if (typeof b6.getBoundingClientRect !== aB) {
                b7 = b6.getBoundingClientRect()
            }
            b9 = bq(b8);
            return {
                top: b7.top + (b9.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: b7.left + (b9.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }
        },
        position: function() {
            if (!this[0]) {
                return
            }
            var b6, b7, e = {
                    top: 0,
                    left: 0
                },
                b5 = this[0];
            if (bH.css(b5, "position") === "fixed") {
                b7 = b5.getBoundingClientRect()
            } else {
                b6 = this.offsetParent();
                b7 = this.offset();
                if (!bH.nodeName(b6[0], "html")) {
                    e = b6.offset()
                }
                e.top += bH.css(b6[0], "borderTopWidth", true);
                e.left += bH.css(b6[0], "borderLeftWidth", true)
            }
            return {
                top: b7.top - e.top - bH.css(b5, "marginTop", true),
                left: b7.left - e.left - bH.css(b5, "marginLeft", true)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || bW;
                while (e && (!bH.nodeName(e, "html") && bH.css(e, "position") === "static")) {
                    e = e.offsetParent
                }
                return e || bW
            })
        }
    });
    bH.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b6, b5) {
        var e = /Y/.test(b5);
        bH.fn[b6] = function(b7) {
            return aA(this, function(b8, cb, ca) {
                var b9 = bq(b8);
                if (ca === undefined) {
                    return b9 ? (b5 in b9) ? b9[b5] : b9.document.documentElement[cb] : b8[cb]
                }
                if (b9) {
                    b9.scrollTo(!e ? ca : bH(b9).scrollLeft(), e ? ca : bH(b9).scrollTop())
                } else {
                    b8[cb] = ca
                }
            }, b6, b7, arguments.length, null)
        }
    });
    bH.each(["top", "left"], function(e, b5) {
        bH.cssHooks[b5] = a6(C.pixelPosition, function(b7, b6) {
            if (b6) {
                b6 = F(b7, b5);
                return X.test(b6) ? bH(b7).position()[b5] + "px" : b6
            }
        })
    });
    bH.each({
        Height: "height",
        Width: "width"
    }, function(e, b5) {
        bH.each({
            padding: "inner" + e,
            content: b5,
            "": "outer" + e
        }, function(b6, b7) {
            bH.fn[b7] = function(cb, ca) {
                var b9 = arguments.length && (b6 || typeof cb !== "boolean"),
                    b8 = b6 || (cb === true || ca === true ? "margin" : "border");
                return aA(this, function(cd, cc, ce) {
                    var cf;
                    if (bH.isWindow(cd)) {
                        return cd.document.documentElement["client" + e]
                    }
                    if (cd.nodeType === 9) {
                        cf = cd.documentElement;
                        return Math.max(cd.body["scroll" + e], cf["scroll" + e], cd.body["offset" + e], cf["offset" + e], cf["client" + e])
                    }
                    return ce === undefined ? bH.css(cd, cc, b8) : bH.style(cd, cc, ce, b8)
                }, b5, b9 ? cb : undefined, b9, null)
            }
        })
    });
    bH.fn.size = function() {
        return this.length
    };
    bH.fn.andSelf = bH.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return bH
        })
    }
    var bj = a4.jQuery,
        H = a4.$;
    bH.noConflict = function(e) {
        if (a4.$ === bH) {
            a4.$ = H
        }
        if (e && a4.jQuery === bH) {
            a4.jQuery = bj
        }
        return bH
    };
    if (typeof au === aB) {
        a4.jQuery = a4.$ = bH
    }
    return bH
}));
var docCookies = {
    getItem: function(a) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
    },
    setItem: function(d, g, c, b, a, e) {
        if (!d || /^(?:expires|max\-age|path|domain|secure)$/i.test(d)) {
            return false
        }
        var f = "";
        if (c) {
            switch (c.constructor) {
                case Number:
                    f = c === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + c;
                    break;
                case String:
                    f = "; expires=" + c;
                    break;
                case Date:
                    f = "; expires=" + c.toUTCString();
                    break
            }
        }
        document.cookie = encodeURIComponent(d) + "=" + encodeURIComponent(g) + f + (a ? "; domain=" + a : "") + (b ? "; path=" + b : "") + (e ? "; secure" : "");
        return true
    },
    removeItem: function(c, b, a) {
        if (!c || !this.hasItem(c)) {
            return false
        }
        document.cookie = encodeURIComponent(c) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (a ? "; domain=" + a : "") + (b ? "; path=" + b : "");
        return true
    },
    hasItem: function(a) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
    },
    keys: function() {
        var a = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var b = 0; b < a.length; b++) {
            a[b] = decodeURIComponent(a[b])
        }
        return a
    }
};
(function(B) {
    var O, ay = "2.5.1",
        x = this,
        T = Math.round,
        Z, t = 0,
        e = 1,
        aM = 2,
        s = 3,
        ar = 4,
        q = 5,
        Q = 6,
        au = {},
        aG = {
            _isAMomentObject: null,
            _i: null,
            _f: null,
            _l: null,
            _strict: null,
            _isUTC: null,
            _offset: null,
            _pf: null,
            _lang: null
        },
        ai = (typeof module !== "undefined" && module.exports && typeof require !== "undefined"),
        b = /^\/?Date\((\-?\d+)/i,
        aV = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        aA = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
        al = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
        f = /\d\d?/,
        aa = /\d{1,3}/,
        C = /\d{1,4}/,
        a2 = /[+\-]?\d{1,6}/,
        aR = /\d+/,
        G = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        n = /Z|[\+\-]\d\d:?\d\d/gi,
        j = /T/i,
        aJ = /[\+\-]?\d+(\.\d{1,3})?/,
        X = /\d/,
        o = /\d\d/,
        aU = /\d{3}/,
        aI = /\d{4}/,
        ae = /[+-]?\d{6}/,
        V = /[+-]?\d+/,
        aE = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        R = "YYYY-MM-DDTHH:mm:ssZ",
        aT = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ],
        E = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ],
        W = /([\+\-]|\d\d)/gi,
        aB = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
        A = {
            Milliseconds: 1,
            Seconds: 1000,
            Minutes: 60000,
            Hours: 3600000,
            Days: 86400000,
            Months: 2592000000,
            Years: 31536000000
        },
        c = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        },
        aQ = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        },
        ah = {},
        aL = "DDD w W M D d".split(" "),
        aj = "M D H h m s w W".split(" "),
        aN = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(a4) {
                return this.lang().monthsShort(this, a4)
            },
            MMMM: function(a4) {
                return this.lang().months(this, a4)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(a4) {
                return this.lang().weekdaysMin(this, a4)
            },
            ddd: function(a4) {
                return this.lang().weekdaysShort(this, a4)
            },
            dddd: function(a4) {
                return this.lang().weekdays(this, a4)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return H(this.year() % 100, 2)
            },
            YYYY: function() {
                return H(this.year(), 4)
            },
            YYYYY: function() {
                return H(this.year(), 5)
            },
            YYYYYY: function() {
                var a5 = this.year(),
                    a4 = a5 >= 0 ? "+" : "-";
                return a4 + H(Math.abs(a5), 6)
            },
            gg: function() {
                return H(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return H(this.weekYear(), 4)
            },
            ggggg: function() {
                return H(this.weekYear(), 5)
            },
            GG: function() {
                return H(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return H(this.isoWeekYear(), 4)
            },
            GGGGG: function() {
                return H(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), true)
            },
            A: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), false)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return J(this.milliseconds() / 100)
            },
            SS: function() {
                return H(J(this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return H(this.milliseconds(), 3)
            },
            SSSS: function() {
                return H(this.milliseconds(), 3)
            },
            Z: function() {
                var a5 = -this.zone(),
                    a4 = "+";
                if (a5 < 0) {
                    a5 = -a5;
                    a4 = "-"
                }
                return a4 + H(J(a5 / 60), 2) + ":" + H(J(a5) % 60, 2)
            },
            ZZ: function() {
                var a5 = -this.zone(),
                    a4 = "+";
                if (a5 < 0) {
                    a5 = -a5;
                    a4 = "-"
                }
                return a4 + H(J(a5 / 60), 2) + H(J(a5) % 60, 2)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            X: function() {
                return this.unix()
            },
            Q: function() {
                return this.quarter()
            }
        },
        S = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];

    function ac() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        }
    }

    function L(a5, a4) {
        return function(a6) {
            return H(a5.call(this, a6), a4)
        }
    }

    function g(a4, a5) {
        return function(a6) {
            return this.lang().ordinal(a4.call(this, a6), a5)
        }
    }
    while (aL.length) {
        Z = aL.pop();
        aN[Z + "o"] = g(aN[Z], Z)
    }
    while (aj.length) {
        Z = aj.pop();
        aN[Z + Z] = L(aN[Z], 2)
    }
    aN.DDDD = L(aN.DDD, 3);

    function aC() {}

    function I(a4) {
        aZ(a4);
        aw(this, a4)
    }

    function ab(a7) {
        var ba = l(a7),
            a9 = ba.year || 0,
            a5 = ba.month || 0,
            a4 = ba.week || 0,
            bd = ba.day || 0,
            bb = ba.hour || 0,
            a8 = ba.minute || 0,
            bc = ba.second || 0,
            a6 = ba.millisecond || 0;
        this._milliseconds = +a6 + bc * 1000 + a8 * 60000 + bb * 3600000;
        this._days = +bd + a4 * 7;
        this._months = +a5 + a9 * 12;
        this._data = {};
        this._bubble()
    }

    function aw(a5, a4) {
        for (var a6 in a4) {
            if (a4.hasOwnProperty(a6)) {
                a5[a6] = a4[a6]
            }
        }
        if (a4.hasOwnProperty("toString")) {
            a5.toString = a4.toString
        }
        if (a4.hasOwnProperty("valueOf")) {
            a5.valueOf = a4.valueOf
        }
        return a5
    }

    function a1(a5) {
        var a4 = {},
            a6;
        for (a6 in a5) {
            if (a5.hasOwnProperty(a6) && aG.hasOwnProperty(a6)) {
                a4[a6] = a5[a6]
            }
        }
        return a4
    }

    function k(a4) {
        if (a4 < 0) {
            return Math.ceil(a4)
        } else {
            return Math.floor(a4)
        }
    }

    function H(a8, a7, a6) {
        var a5 = "" + Math.abs(a8),
            a4 = a8 >= 0;
        while (a5.length < a7) {
            a5 = "0" + a5
        }
        return (a4 ? (a6 ? "+" : "") : "-") + a5
    }

    function D(a7, a6, ba, a9) {
        var a5 = a6._milliseconds,
            bc = a6._days,
            a4 = a6._months,
            a8, bb;
        if (a5) {
            a7._d.setTime(+a7._d + a5 * ba)
        }
        if (bc || a4) {
            a8 = a7.minute();
            bb = a7.hour()
        }
        if (bc) {
            a7.date(a7.date() + bc * ba)
        }
        if (a4) {
            a7.month(a7.month() + a4 * ba)
        }
        if (a5 && !a9) {
            O.updateOffset(a7)
        }
        if (bc || a4) {
            a7.minute(a8);
            a7.hour(bb)
        }
    }

    function a(a4) {
        return Object.prototype.toString.call(a4) === "[object Array]"
    }

    function d(a4) {
        return Object.prototype.toString.call(a4) === "[object Date]" || a4 instanceof Date
    }

    function aK(a9, a8, a5) {
        var a4 = Math.min(a9.length, a8.length),
            a6 = Math.abs(a9.length - a8.length),
            ba = 0,
            a7;
        for (a7 = 0; a7 < a4; a7++) {
            if ((a5 && a9[a7] !== a8[a7]) || (!a5 && J(a9[a7]) !== J(a8[a7]))) {
                ba++
            }
        }
        return ba + a6
    }

    function aP(a5) {
        if (a5) {
            var a4 = a5.toLowerCase().replace(/(.)s$/, "$1");
            a5 = c[a5] || aQ[a4] || a4
        }
        return a5
    }

    function l(a6) {
        var a5 = {},
            a4, a7;
        for (a7 in a6) {
            if (a6.hasOwnProperty(a7)) {
                a4 = aP(a7);
                if (a4) {
                    a5[a4] = a6[a7]
                }
            }
        }
        return a5
    }

    function ao(a5) {
        var a4, a6;
        if (a5.indexOf("week") === 0) {
            a4 = 7;
            a6 = "day"
        } else {
            if (a5.indexOf("month") === 0) {
                a4 = 12;
                a6 = "month"
            } else {
                return
            }
        }
        O[a5] = function(bb, a8) {
            var ba, a7, bc = O.fn._lang[a5],
                a9 = [];
            if (typeof bb === "number") {
                a8 = bb;
                bb = B
            }
            a7 = function(be) {
                var bd = O().utc().set(a6, be);
                return bc.call(O.fn._lang, bd, bb || "")
            };
            if (a8 != null) {
                return a7(a8)
            } else {
                for (ba = 0; ba < a4; ba++) {
                    a9.push(a7(ba))
                }
                return a9
            }
        }
    }

    function J(a4) {
        var a6 = +a4,
            a5 = 0;
        if (a6 !== 0 && isFinite(a6)) {
            if (a6 >= 0) {
                a5 = Math.floor(a6)
            } else {
                a5 = Math.ceil(a6)
            }
        }
        return a5
    }

    function aX(a4, a5) {
        return new Date(Date.UTC(a4, a5 + 1, 0)).getUTCDate()
    }

    function aS(a4) {
        return aF(a4) ? 366 : 365
    }

    function aF(a4) {
        return (a4 % 4 === 0 && a4 % 100 !== 0) || a4 % 400 === 0
    }

    function aZ(a4) {
        var a5;
        if (a4._a && a4._pf.overflow === -2) {
            a5 = a4._a[e] < 0 || a4._a[e] > 11 ? e : a4._a[aM] < 1 || a4._a[aM] > aX(a4._a[t], a4._a[e]) ? aM : a4._a[s] < 0 || a4._a[s] > 23 ? s : a4._a[ar] < 0 || a4._a[ar] > 59 ? ar : a4._a[q] < 0 || a4._a[q] > 59 ? q : a4._a[Q] < 0 || a4._a[Q] > 999 ? Q : -1;
            if (a4._pf._overflowDayOfYear && (a5 < t || a5 > aM)) {
                a5 = aM
            }
            a4._pf.overflow = a5
        }
    }

    function ax(a4) {
        if (a4._isValid == null) {
            a4._isValid = !isNaN(a4._d.getTime()) && a4._pf.overflow < 0 && !a4._pf.empty && !a4._pf.invalidMonth && !a4._pf.nullInput && !a4._pf.invalidFormat && !a4._pf.userInvalidated;
            if (a4._strict) {
                a4._isValid = a4._isValid && a4._pf.charsLeftOver === 0 && a4._pf.unusedTokens.length === 0
            }
        }
        return a4._isValid
    }

    function z(a4) {
        return a4 ? a4.toLowerCase().replace("_", "-") : a4
    }

    function u(a4, a5) {
        return a5._isUTC ? O(a4).zone(a5._offset || 0) : O(a4).local()
    }
    aw(aC.prototype, {
        set: function(a4) {
            var a6, a5;
            for (a5 in a4) {
                a6 = a4[a5];
                if (typeof a6 === "function") {
                    this[a5] = a6
                } else {
                    this["_" + a5] = a6
                }
            }
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a4) {
            return this._months[a4.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a4) {
            return this._monthsShort[a4.month()]
        },
        monthsParse: function(a4) {
            var a5, a7, a6;
            if (!this._monthsParse) {
                this._monthsParse = []
            }
            for (a5 = 0; a5 < 12; a5++) {
                if (!this._monthsParse[a5]) {
                    a7 = O.utc([2000, a5]);
                    a6 = "^" + this.months(a7, "") + "|^" + this.monthsShort(a7, "");
                    this._monthsParse[a5] = new RegExp(a6.replace(".", ""), "i")
                }
                if (this._monthsParse[a5].test(a4)) {
                    return a5
                }
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a4) {
            return this._weekdays[a4.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a4) {
            return this._weekdaysShort[a4.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a4) {
            return this._weekdaysMin[a4.day()]
        },
        weekdaysParse: function(a7) {
            var a4, a6, a5;
            if (!this._weekdaysParse) {
                this._weekdaysParse = []
            }
            for (a4 = 0; a4 < 7; a4++) {
                if (!this._weekdaysParse[a4]) {
                    a6 = O([2000, 1]).day(a4);
                    a5 = "^" + this.weekdays(a6, "") + "|^" + this.weekdaysShort(a6, "") + "|^" + this.weekdaysMin(a6, "");
                    this._weekdaysParse[a4] = new RegExp(a5.replace(".", ""), "i")
                }
                if (this._weekdaysParse[a4].test(a7)) {
                    return a4
                }
            }
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(a5) {
            var a4 = this._longDateFormat[a5];
            if (!a4 && this._longDateFormat[a5.toUpperCase()]) {
                a4 = this._longDateFormat[a5.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a6) {
                    return a6.slice(1)
                });
                this._longDateFormat[a5] = a4
            }
            return a4
        },
        isPM: function(a4) {
            return ((a4 + "").toLowerCase().charAt(0) === "p")
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(a4, a5, a6) {
            if (a4 > 11) {
                return a6 ? "pm" : "PM"
            } else {
                return a6 ? "am" : "AM"
            }
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a5, a6) {
            var a4 = this._calendar[a5];
            return typeof a4 === "function" ? a4.apply(a6) : a4
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a7, a6, a5, a8) {
            var a4 = this._relativeTime[a5];
            return (typeof a4 === "function") ? a4(a7, a6, a5, a8) : a4.replace(/%d/i, a7)
        },
        pastFuture: function(a6, a4) {
            var a5 = this._relativeTime[a6 > 0 ? "future" : "past"];
            return typeof a5 === "function" ? a5(a4) : a5.replace(/%s/i, a4)
        },
        ordinal: function(a4) {
            return this._ordinal.replace("%d", a4)
        },
        _ordinal: "%d",
        preparse: function(a4) {
            return a4
        },
        postformat: function(a4) {
            return a4
        },
        week: function(a4) {
            return y(a4, this._week.dow, this._week.doy).week
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate
        }
    });

    function ag(a5, a4) {
        a4.abbr = a5;
        if (!au[a5]) {
            au[a5] = new aC()
        }
        au[a5].set(a4);
        return au[a5]
    }

    function aW(a4) {
        delete au[a4]
    }

    function av(a8) {
        var a7 = 0,
            a5, ba, a9, a6, a4 = function(bb) {
                if (!au[bb] && ai) {
                    try {
                        require("./lang/" + bb)
                    } catch (bc) {}
                }
                return au[bb]
            };
        if (!a8) {
            return O.fn._lang
        }
        if (!a(a8)) {
            ba = a4(a8);
            if (ba) {
                return ba
            }
            a8 = [a8]
        }
        while (a7 < a8.length) {
            a6 = z(a8[a7]).split("-");
            a5 = a6.length;
            a9 = z(a8[a7 + 1]);
            a9 = a9 ? a9.split("-") : null;
            while (a5 > 0) {
                ba = a4(a6.slice(0, a5).join("-"));
                if (ba) {
                    return ba
                }
                if (a9 && a9.length >= a5 && aK(a6, a9, true) >= a5 - 1) {
                    break
                }
                a5--
            }
            a7++
        }
        return O.fn._lang
    }

    function af(a4) {
        if (a4.match(/\[[\s\S]/)) {
            return a4.replace(/^\[|\]$/g, "")
        }
        return a4.replace(/\\/g, "")
    }

    function p(a6) {
        var a7 = a6.match(al),
            a4, a5;
        for (a4 = 0, a5 = a7.length; a4 < a5; a4++) {
            if (aN[a7[a4]]) {
                a7[a4] = aN[a7[a4]]
            } else {
                a7[a4] = af(a7[a4])
            }
        }
        return function(a9) {
            var a8 = "";
            for (a4 = 0; a4 < a5; a4++) {
                a8 += a7[a4] instanceof Function ? a7[a4].call(a9, a6) : a7[a4]
            }
            return a8
        }
    }

    function ak(a4, a5) {
        if (!a4.isValid()) {
            return a4.lang().invalidDate()
        }
        a5 = a3(a5, a4.lang());
        if (!ah[a5]) {
            ah[a5] = p(a5)
        }
        return ah[a5](a4)
    }

    function a3(a6, a7) {
        var a4 = 5;

        function a5(a8) {
            return a7.longDateFormat(a8) || a8
        }
        Y.lastIndex = 0;
        while (a4 >= 0 && Y.test(a6)) {
            a6 = a6.replace(Y, a5);
            Y.lastIndex = 0;
            a4 -= 1
        }
        return a6
    }

    function an(a7, a6) {
        var a5, a4 = a6._strict;
        switch (a7) {
            case "DDDD":
                return aU;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return a4 ? aI : C;
            case "Y":
            case "G":
            case "g":
                return V;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return a4 ? ae : a2;
            case "S":
                if (a4) {
                    return X
                }
            case "SS":
                if (a4) {
                    return o
                }
            case "SSS":
                if (a4) {
                    return aU
                }
            case "DDD":
                return aa;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return G;
            case "a":
            case "A":
                return av(a6._l)._meridiemParse;
            case "X":
                return aJ;
            case "Z":
            case "ZZ":
                return n;
            case "T":
                return j;
            case "SSSS":
                return aR;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return a4 ? o : f;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return f;
            default:
                a5 = new RegExp(a0(aq(a7.replace("\\", "")), "i"));
                return a5
        }
    }

    function v(a5) {
        a5 = a5 || "";
        var a4 = (a5.match(n) || []),
            a8 = a4[a4.length - 1] || [],
            a7 = (a8 + "").match(W) || ["-", 0, 0],
            a6 = +(a7[1] * 60) + J(a7[2]);
        return a7[0] === "+" ? -a6 : a6
    }

    function ap(a8, a6, a7) {
        var a5, a4 = a7._a;
        switch (a8) {
            case "M":
            case "MM":
                if (a6 != null) {
                    a4[e] = J(a6) - 1
                }
                break;
            case "MMM":
            case "MMMM":
                a5 = av(a7._l).monthsParse(a6);
                if (a5 != null) {
                    a4[e] = a5
                } else {
                    a7._pf.invalidMonth = a6
                }
                break;
            case "D":
            case "DD":
                if (a6 != null) {
                    a4[aM] = J(a6)
                }
                break;
            case "DDD":
            case "DDDD":
                if (a6 != null) {
                    a7._dayOfYear = J(a6)
                }
                break;
            case "YY":
                a4[t] = J(a6) + (J(a6) > 68 ? 1900 : 2000);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                a4[t] = J(a6);
                break;
            case "a":
            case "A":
                a7._isPm = av(a7._l).isPM(a6);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                a4[s] = J(a6);
                break;
            case "m":
            case "mm":
                a4[ar] = J(a6);
                break;
            case "s":
            case "ss":
                a4[q] = J(a6);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                a4[Q] = J(("0." + a6) * 1000);
                break;
            case "X":
                a7._d = new Date(parseFloat(a6) * 1000);
                break;
            case "Z":
            case "ZZ":
                a7._useUTC = true;
                a7._tzm = v(a6);
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "dd":
            case "ddd":
            case "dddd":
            case "e":
            case "E":
                a8 = a8.substr(0, 1);
            case "gg":
            case "gggg":
            case "GG":
            case "GGGG":
            case "GGGGG":
                a8 = a8.substr(0, 2);
                if (a6) {
                    a7._w = a7._w || {};
                    a7._w[a8] = a6
                }
                break
        }
    }

    function ad(a8) {
        var ba, a9, bd = [],
            a6, bc, a5, be, bf, a7, bb, a4;
        if (a8._d) {
            return
        }
        a6 = m(a8);
        if (a8._w && a8._a[aM] == null && a8._a[e] == null) {
            a5 = function(bh) {
                var bg = parseInt(bh, 10);
                return bh ? (bh.length < 3 ? (bg > 68 ? 1900 + bg : 2000 + bg) : bg) : (a8._a[t] == null ? O().weekYear() : a8._a[t])
            };
            be = a8._w;
            if (be.GG != null || be.W != null || be.E != null) {
                bf = r(a5(be.GG), be.W || 1, be.E, 4, 1)
            } else {
                a7 = av(a8._l);
                bb = be.d != null ? aY(be.d, a7) : (be.e != null ? parseInt(be.e, 10) + a7._week.dow : 0);
                a4 = parseInt(be.w, 10) || 1;
                if (be.d != null && bb < a7._week.dow) {
                    a4++
                }
                bf = r(a5(be.gg), a4, bb, a7._week.doy, a7._week.dow)
            }
            a8._a[t] = bf.year;
            a8._dayOfYear = bf.dayOfYear
        }
        if (a8._dayOfYear) {
            bc = a8._a[t] == null ? a6[t] : a8._a[t];
            if (a8._dayOfYear > aS(bc)) {
                a8._pf._overflowDayOfYear = true
            }
            a9 = F(bc, 0, a8._dayOfYear);
            a8._a[e] = a9.getUTCMonth();
            a8._a[aM] = a9.getUTCDate()
        }
        for (ba = 0; ba < 3 && a8._a[ba] == null; ++ba) {
            a8._a[ba] = bd[ba] = a6[ba]
        }
        for (; ba < 7; ba++) {
            a8._a[ba] = bd[ba] = (a8._a[ba] == null) ? (ba === 2 ? 1 : 0) : a8._a[ba]
        }
        bd[s] += J((a8._tzm || 0) / 60);
        bd[ar] += J((a8._tzm || 0) % 60);
        a8._d = (a8._useUTC ? F : am).apply(null, bd)
    }

    function az(a5) {
        var a4;
        if (a5._d) {
            return
        }
        a4 = l(a5._i);
        a5._a = [a4.year, a4.month, a4.day, a4.hour, a4.minute, a4.second, a4.millisecond];
        ad(a5)
    }

    function m(a5) {
        var a4 = new Date();
        if (a5._useUTC) {
            return [a4.getUTCFullYear(), a4.getUTCMonth(), a4.getUTCDate()]
        } else {
            return [a4.getFullYear(), a4.getMonth(), a4.getDate()]
        }
    }

    function N(a7) {
        a7._a = [];
        a7._pf.empty = true;
        var a6 = av(a7._l),
            ba = "" + a7._i,
            a9, a5, bd, a8, bc, a4 = ba.length,
            bb = 0;
        bd = a3(a7._f, a6).match(al) || [];
        for (a9 = 0; a9 < bd.length; a9++) {
            a8 = bd[a9];
            a5 = (ba.match(an(a8, a7)) || [])[0];
            if (a5) {
                bc = ba.substr(0, ba.indexOf(a5));
                if (bc.length > 0) {
                    a7._pf.unusedInput.push(bc)
                }
                ba = ba.slice(ba.indexOf(a5) + a5.length);
                bb += a5.length
            }
            if (aN[a8]) {
                if (a5) {
                    a7._pf.empty = false
                } else {
                    a7._pf.unusedTokens.push(a8)
                }
                ap(a8, a5, a7)
            } else {
                if (a7._strict && !a5) {
                    a7._pf.unusedTokens.push(a8)
                }
            }
        }
        a7._pf.charsLeftOver = a4 - bb;
        if (ba.length > 0) {
            a7._pf.unusedInput.push(ba)
        }
        if (a7._isPm && a7._a[s] < 12) {
            a7._a[s] += 12
        }
        if (a7._isPm === false && a7._a[s] === 12) {
            a7._a[s] = 0
        }
        ad(a7);
        aZ(a7)
    }

    function aq(a4) {
        return a4.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a5, a9, a8, a7, a6) {
            return a9 || a8 || a7 || a6
        })
    }

    function a0(a4) {
        return a4.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function aO(a4) {
        var a8, a6, a7, a5, a9;
        if (a4._f.length === 0) {
            a4._pf.invalidFormat = true;
            a4._d = new Date(NaN);
            return
        }
        for (a5 = 0; a5 < a4._f.length; a5++) {
            a9 = 0;
            a8 = aw({}, a4);
            a8._pf = ac();
            a8._f = a4._f[a5];
            N(a8);
            if (!ax(a8)) {
                continue
            }
            a9 += a8._pf.charsLeftOver;
            a9 += a8._pf.unusedTokens.length * 10;
            a8._pf.score = a9;
            if (a7 == null || a9 < a7) {
                a7 = a9;
                a6 = a8
            }
        }
        aw(a4, a6 || a8)
    }

    function h(a7) {
        var a8, a4, a6 = a7._i,
            a5 = aE.exec(a6);
        if (a5) {
            a7._pf.iso = true;
            for (a8 = 0, a4 = aT.length; a8 < a4; a8++) {
                if (aT[a8][1].exec(a6)) {
                    a7._f = aT[a8][0] + (a5[6] || " ");
                    break
                }
            }
            for (a8 = 0, a4 = E.length; a8 < a4; a8++) {
                if (E[a8][1].exec(a6)) {
                    a7._f += E[a8][0];
                    break
                }
            }
            if (a6.match(n)) {
                a7._f += "Z"
            }
            N(a7)
        } else {
            a7._d = new Date(a6)
        }
    }

    function M(a6) {
        var a5 = a6._i,
            a4 = b.exec(a5);
        if (a5 === B) {
            a6._d = new Date()
        } else {
            if (a4) {
                a6._d = new Date(+a4[1])
            } else {
                if (typeof a5 === "string") {
                    h(a6)
                } else {
                    if (a(a5)) {
                        a6._a = a5.slice(0);
                        ad(a6)
                    } else {
                        if (d(a5)) {
                            a6._d = new Date(+a5)
                        } else {
                            if (typeof(a5) === "object") {
                                az(a6)
                            } else {
                                a6._d = new Date(a5)
                            }
                        }
                    }
                }
            }
        }
    }

    function am(bb, a4, a9, a8, ba, a7, a6) {
        var a5 = new Date(bb, a4, a9, a8, ba, a7, a6);
        if (bb < 1970) {
            a5.setFullYear(bb)
        }
        return a5
    }

    function F(a5) {
        var a4 = new Date(Date.UTC.apply(null, arguments));
        if (a5 < 1970) {
            a4.setUTCFullYear(a5)
        }
        return a4
    }

    function aY(a4, a5) {
        if (typeof a4 === "string") {
            if (!isNaN(a4)) {
                a4 = parseInt(a4, 10)
            } else {
                a4 = a5.weekdaysParse(a4);
                if (typeof a4 !== "number") {
                    return null
                }
            }
        }
        return a4
    }

    function aD(a4, a6, a5, a7, a8) {
        return a8.relativeTime(a6 || 1, !!a5, a4, a7)
    }

    function w(a6, a4, a5) {
        var bb = T(Math.abs(a6) / 1000),
            a7 = T(bb / 60),
            ba = T(a7 / 60),
            bc = T(ba / 24),
            a8 = T(bc / 365),
            a9 = bb < 45 && ["s", bb] || a7 === 1 && ["m"] || a7 < 45 && ["mm", a7] || ba === 1 && ["h"] || ba < 22 && ["hh", ba] || bc === 1 && ["d"] || bc <= 25 && ["dd", bc] || bc <= 45 && ["M"] || bc < 345 && ["MM", T(bc / 30)] || a8 === 1 && ["y"] || ["yy", a8];
        a9[2] = a4;
        a9[3] = a6 > 0;
        a9[4] = a5;
        return aD.apply({}, a9)
    }

    function y(a8, a6, a9) {
        var a5 = a9 - a6,
            a4 = a9 - a8.day(),
            a7;
        if (a4 > a5) {
            a4 -= 7
        }
        if (a4 < a5 - 7) {
            a4 += 7
        }
        a7 = O(a8).add("d", a4);
        return {
            week: Math.ceil(a7.dayOfYear() / 7),
            year: a7.year()
        }
    }

    function r(a8, a7, a9, bb, a4) {
        var ba = F(a8, 0, 1).getUTCDay(),
            a6, a5;
        a9 = a9 != null ? a9 : a4;
        a6 = a4 - ba + (ba > bb ? 7 : 0) - (ba < a4 ? 7 : 0);
        a5 = 7 * (a7 - 1) + (a9 - a4) + a6 + 1;
        return {
            year: a5 > 0 ? a8 : a8 - 1,
            dayOfYear: a5 > 0 ? a5 : aS(a8 - 1) + a5
        }
    }

    function K(a5) {
        var a4 = a5._i,
            a6 = a5._f;
        if (a4 === null) {
            return O.invalid({
                nullInput: true
            })
        }
        if (typeof a4 === "string") {
            a5._i = a4 = av().preparse(a4)
        }
        if (O.isMoment(a4)) {
            a5 = a1(a4);
            a5._d = new Date(+a4._d)
        } else {
            if (a6) {
                if (a(a6)) {
                    aO(a5)
                } else {
                    N(a5)
                }
            } else {
                M(a5)
            }
        }
        return new I(a5)
    }
    O = function(a5, a6, a7, a4) {
        var a8;
        if (typeof(a7) === "boolean") {
            a4 = a7;
            a7 = B
        }
        a8 = {};
        a8._isAMomentObject = true;
        a8._i = a5;
        a8._f = a6;
        a8._l = a7;
        a8._strict = a4;
        a8._isUTC = false;
        a8._pf = ac();
        return K(a8)
    };
    O.utc = function(a5, a6, a7, a4) {
        var a8;
        if (typeof(a7) === "boolean") {
            a4 = a7;
            a7 = B
        }
        a8 = {};
        a8._isAMomentObject = true;
        a8._useUTC = true;
        a8._isUTC = true;
        a8._l = a7;
        a8._i = a5;
        a8._f = a6;
        a8._strict = a4;
        a8._pf = ac();
        return K(a8).utc()
    };
    O.unix = function(a4) {
        return O(a4 * 1000)
    };
    O.duration = function(a5, a9) {
        var ba = a5,
            a8 = null,
            a4, a7, a6;
        if (O.isDuration(a5)) {
            ba = {
                ms: a5._milliseconds,
                d: a5._days,
                M: a5._months
            }
        } else {
            if (typeof a5 === "number") {
                ba = {};
                if (a9) {
                    ba[a9] = a5
                } else {
                    ba.milliseconds = a5
                }
            } else {
                if (!!(a8 = aV.exec(a5))) {
                    a4 = (a8[1] === "-") ? -1 : 1;
                    ba = {
                        y: 0,
                        d: J(a8[aM]) * a4,
                        h: J(a8[s]) * a4,
                        m: J(a8[ar]) * a4,
                        s: J(a8[q]) * a4,
                        ms: J(a8[Q]) * a4
                    }
                } else {
                    if (!!(a8 = aA.exec(a5))) {
                        a4 = (a8[1] === "-") ? -1 : 1;
                        a6 = function(bc) {
                            var bb = bc && parseFloat(bc.replace(",", "."));
                            return (isNaN(bb) ? 0 : bb) * a4
                        };
                        ba = {
                            y: a6(a8[2]),
                            M: a6(a8[3]),
                            d: a6(a8[4]),
                            h: a6(a8[5]),
                            m: a6(a8[6]),
                            s: a6(a8[7]),
                            w: a6(a8[8])
                        }
                    }
                }
            }
        }
        a7 = new ab(ba);
        if (O.isDuration(a5) && a5.hasOwnProperty("_lang")) {
            a7._lang = a5._lang
        }
        return a7
    };
    O.version = ay;
    O.defaultFormat = R;
    O.updateOffset = function() {};
    O.lang = function(a5, a4) {
        var a6;
        if (!a5) {
            return O.fn._lang._abbr
        }
        if (a4) {
            ag(z(a5), a4)
        } else {
            if (a4 === null) {
                aW(a5);
                a5 = "en"
            } else {
                if (!au[a5]) {
                    av(a5)
                }
            }
        }
        a6 = O.duration.fn._lang = O.fn._lang = av(a5);
        return a6._abbr
    };
    O.langData = function(a4) {
        if (a4 && a4._lang && a4._lang._abbr) {
            a4 = a4._lang._abbr
        }
        return av(a4)
    };
    O.isMoment = function(a4) {
        return a4 instanceof I || (a4 != null && a4.hasOwnProperty("_isAMomentObject"))
    };
    O.isDuration = function(a4) {
        return a4 instanceof ab
    };
    for (Z = S.length - 1; Z >= 0; --Z) {
        ao(S[Z])
    }
    O.normalizeUnits = function(a4) {
        return aP(a4)
    };
    O.invalid = function(a5) {
        var a4 = O.utc(NaN);
        if (a5 != null) {
            aw(a4._pf, a5)
        } else {
            a4._pf.userInvalidated = true
        }
        return a4
    };
    O.parseZone = function(a4) {
        return O(a4).parseZone()
    };
    aw(O.fn = I.prototype, {
        clone: function() {
            return O(this)
        },
        valueOf: function() {
            return +this._d + ((this._offset || 0) * 60000)
        },
        unix: function() {
            return Math.floor(+this / 1000)
        },
        toString: function() {
            return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function() {
            var a4 = O(this).utc();
            if (0 < a4.year() && a4.year() <= 9999) {
                return ak(a4, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            } else {
                return ak(a4, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            }
        },
        toArray: function() {
            var a4 = this;
            return [a4.year(), a4.month(), a4.date(), a4.hours(), a4.minutes(), a4.seconds(), a4.milliseconds()]
        },
        isValid: function() {
            return ax(this)
        },
        isDSTShifted: function() {
            if (this._a) {
                return this.isValid() && aK(this._a, (this._isUTC ? O.utc(this._a) : O(this._a)).toArray()) > 0
            }
            return false
        },
        parsingFlags: function() {
            return aw({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function() {
            return this.zone(0)
        },
        local: function() {
            this.zone(0);
            this._isUTC = false;
            return this
        },
        format: function(a5) {
            var a4 = ak(this, a5 || O.defaultFormat);
            return this.lang().postformat(a4)
        },
        add: function(a4, a6) {
            var a5;
            if (typeof a4 === "string") {
                a5 = O.duration(+a6, a4)
            } else {
                a5 = O.duration(a4, a6)
            }
            D(this, a5, 1);
            return this
        },
        subtract: function(a4, a6) {
            var a5;
            if (typeof a4 === "string") {
                a5 = O.duration(+a6, a4)
            } else {
                a5 = O.duration(a4, a6)
            }
            D(this, a5, -1);
            return this
        },
        diff: function(a8, a7, a4) {
            var a9 = u(a8, this),
                a5 = (this.zone() - a9.zone()) * 60000,
                ba, a6;
            a7 = aP(a7);
            if (a7 === "year" || a7 === "month") {
                ba = (this.daysInMonth() + a9.daysInMonth()) * 43200000;
                a6 = ((this.year() - a9.year()) * 12) + (this.month() - a9.month());
                a6 += ((this - O(this).startOf("month")) - (a9 - O(a9).startOf("month"))) / ba;
                a6 -= ((this.zone() - O(this).startOf("month").zone()) - (a9.zone() - O(a9).startOf("month").zone())) * 60000 / ba;
                if (a7 === "year") {
                    a6 = a6 / 12
                }
            } else {
                ba = (this - a9);
                a6 = a7 === "second" ? ba / 1000 : a7 === "minute" ? ba / 60000 : a7 === "hour" ? ba / 3600000 : a7 === "day" ? (ba - a5) / 86400000 : a7 === "week" ? (ba - a5) / 604800000 : ba
            }
            return a4 ? a6 : k(a6)
        },
        from: function(a5, a4) {
            return O.duration(this.diff(a5)).lang(this.lang()._abbr).humanize(!a4)
        },
        fromNow: function(a4) {
            return this.from(O(), a4)
        },
        calendar: function() {
            var a4 = u(O(), this).startOf("day"),
                a6 = this.diff(a4, "days", true),
                a5 = a6 < -6 ? "sameElse" : a6 < -1 ? "lastWeek" : a6 < 0 ? "lastDay" : a6 < 1 ? "sameDay" : a6 < 2 ? "nextDay" : a6 < 7 ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(a5, this))
        },
        isLeapYear: function() {
            return aF(this.year())
        },
        isDST: function() {
            return (this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone())
        },
        day: function(a5) {
            var a4 = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (a5 != null) {
                a5 = aY(a5, this.lang());
                return this.add({
                    d: a5 - a4
                })
            } else {
                return a4
            }
        },
        month: function(a4) {
            var a5 = this._isUTC ? "UTC" : "",
                a6;
            if (a4 != null) {
                if (typeof a4 === "string") {
                    a4 = this.lang().monthsParse(a4);
                    if (typeof a4 !== "number") {
                        return this
                    }
                }
                a6 = this.date();
                this.date(1);
                this._d["set" + a5 + "Month"](a4);
                this.date(Math.min(a6, this.daysInMonth()));
                O.updateOffset(this);
                return this
            } else {
                return this._d["get" + a5 + "Month"]()
            }
        },
        startOf: function(a4) {
            a4 = aP(a4);
            switch (a4) {
                case "year":
                    this.month(0);
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            if (a4 === "week") {
                this.weekday(0)
            } else {
                if (a4 === "isoWeek") {
                    this.isoWeekday(1)
                }
            }
            return this
        },
        endOf: function(a4) {
            a4 = aP(a4);
            return this.startOf(a4).add((a4 === "isoWeek" ? "week" : a4), 1).subtract("ms", 1)
        },
        isAfter: function(a5, a4) {
            a4 = typeof a4 !== "undefined" ? a4 : "millisecond";
            return +this.clone().startOf(a4) > +O(a5).startOf(a4)
        },
        isBefore: function(a5, a4) {
            a4 = typeof a4 !== "undefined" ? a4 : "millisecond";
            return +this.clone().startOf(a4) < +O(a5).startOf(a4)
        },
        isSame: function(a5, a4) {
            a4 = a4 || "ms";
            return +this.clone().startOf(a4) === +u(a5, this).startOf(a4)
        },
        min: function(a4) {
            a4 = O.apply(null, arguments);
            return a4 < this ? this : a4
        },
        max: function(a4) {
            a4 = O.apply(null, arguments);
            return a4 > this ? this : a4
        },
        zone: function(a4) {
            var a5 = this._offset || 0;
            if (a4 != null) {
                if (typeof a4 === "string") {
                    a4 = v(a4)
                }
                if (Math.abs(a4) < 16) {
                    a4 = a4 * 60
                }
                this._offset = a4;
                this._isUTC = true;
                if (a5 !== a4) {
                    D(this, O.duration(a5 - a4, "m"), 1, true)
                }
            } else {
                return this._isUTC ? a5 : this._d.getTimezoneOffset()
            }
            return this
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            if (this._tzm) {
                this.zone(this._tzm)
            } else {
                if (typeof this._i === "string") {
                    this.zone(this._i)
                }
            }
            return this
        },
        hasAlignedHourOffset: function(a4) {
            if (!a4) {
                a4 = 0
            } else {
                a4 = O(a4).zone()
            }
            return (this.zone() - a4) % 60 === 0
        },
        daysInMonth: function() {
            return aX(this.year(), this.month())
        },
        dayOfYear: function(a4) {
            var a5 = T((O(this).startOf("day") - O(this).startOf("year")) / 86400000) + 1;
            return a4 == null ? a5 : this.add("d", (a4 - a5))
        },
        quarter: function() {
            return Math.ceil((this.month() + 1) / 3)
        },
        weekYear: function(a4) {
            var a5 = y(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return a4 == null ? a5 : this.add("y", (a4 - a5))
        },
        isoWeekYear: function(a4) {
            var a5 = y(this, 1, 4).year;
            return a4 == null ? a5 : this.add("y", (a4 - a5))
        },
        week: function(a4) {
            var a5 = this.lang().week(this);
            return a4 == null ? a5 : this.add("d", (a4 - a5) * 7)
        },
        isoWeek: function(a4) {
            var a5 = y(this, 1, 4).week;
            return a4 == null ? a5 : this.add("d", (a4 - a5) * 7)
        },
        weekday: function(a4) {
            var a5 = (this.day() + 7 - this.lang()._week.dow) % 7;
            return a4 == null ? a5 : this.add("d", a4 - a5)
        },
        isoWeekday: function(a4) {
            return a4 == null ? this.day() || 7 : this.day(this.day() % 7 ? a4 : a4 - 7)
        },
        get: function(a4) {
            a4 = aP(a4);
            return this[a4]()
        },
        set: function(a4, a5) {
            a4 = aP(a4);
            if (typeof this[a4] === "function") {
                this[a4](a5)
            }
            return this
        },
        lang: function(a4) {
            if (a4 === B) {
                return this._lang
            } else {
                this._lang = av(a4);
                return this
            }
        }
    });

    function aH(a4, a5) {
        O.fn[a4] = O.fn[a4 + "s"] = function(a6) {
            var a7 = this._isUTC ? "UTC" : "";
            if (a6 != null) {
                this._d["set" + a7 + a5](a6);
                O.updateOffset(this);
                return this
            } else {
                return this._d["get" + a7 + a5]()
            }
        }
    }
    for (Z = 0; Z < aB.length; Z++) {
        aH(aB[Z].toLowerCase().replace(/s$/, ""), aB[Z])
    }
    aH("year", "FullYear");
    O.fn.days = O.fn.day;
    O.fn.months = O.fn.month;
    O.fn.weeks = O.fn.week;
    O.fn.isoWeeks = O.fn.isoWeek;
    O.fn.toJSON = O.fn.toISOString;
    aw(O.duration.fn = ab.prototype, {
        _bubble: function() {
            var a6 = this._milliseconds,
                bb = this._days,
                a4 = this._months,
                a9 = this._data,
                ba, a8, a5, a7;
            a9.milliseconds = a6 % 1000;
            ba = k(a6 / 1000);
            a9.seconds = ba % 60;
            a8 = k(ba / 60);
            a9.minutes = a8 % 60;
            a5 = k(a8 / 60);
            a9.hours = a5 % 24;
            bb += k(a5 / 24);
            a9.days = bb % 30;
            a4 += k(bb / 30);
            a9.months = a4 % 12;
            a7 = k(a4 / 12);
            a9.years = a7
        },
        weeks: function() {
            return k(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + this._days * 86400000 + (this._months % 12) * 2592000000 + J(this._months / 12) * 31536000000
        },
        humanize: function(a5) {
            var a6 = +this,
                a4 = w(a6, !a5, this.lang());
            if (a5) {
                a4 = this.lang().pastFuture(a6, a4)
            }
            return this.lang().postformat(a4)
        },
        add: function(a4, a6) {
            var a5 = O.duration(a4, a6);
            this._milliseconds += a5._milliseconds;
            this._days += a5._days;
            this._months += a5._months;
            this._bubble();
            return this
        },
        subtract: function(a4, a6) {
            var a5 = O.duration(a4, a6);
            this._milliseconds -= a5._milliseconds;
            this._days -= a5._days;
            this._months -= a5._months;
            this._bubble();
            return this
        },
        get: function(a4) {
            a4 = aP(a4);
            return this[a4.toLowerCase() + "s"]()
        },
        as: function(a4) {
            a4 = aP(a4);
            return this["as" + a4.charAt(0).toUpperCase() + a4.slice(1) + "s"]()
        },
        lang: O.fn.lang,
        toIsoString: function() {
            var a7 = Math.abs(this.years()),
                a4 = Math.abs(this.months()),
                a9 = Math.abs(this.days()),
                a5 = Math.abs(this.hours()),
                a6 = Math.abs(this.minutes()),
                a8 = Math.abs(this.seconds() + this.milliseconds() / 1000);
            if (!this.asSeconds()) {
                return "P0D"
            }
            return (this.asSeconds() < 0 ? "-" : "") + "P" + (a7 ? a7 + "Y" : "") + (a4 ? a4 + "M" : "") + (a9 ? a9 + "D" : "") + ((a5 || a6 || a8) ? "T" : "") + (a5 ? a5 + "H" : "") + (a6 ? a6 + "M" : "") + (a8 ? a8 + "S" : "")
        }
    });

    function U(a4) {
        O.duration.fn[a4] = function() {
            return this._data[a4]
        }
    }

    function at(a4, a5) {
        O.duration.fn["as" + a4] = function() {
            return +this / a5
        }
    }
    for (Z in A) {
        if (A.hasOwnProperty(Z)) {
            at(Z, A[Z]);
            U(Z.toLowerCase())
        }
    }
    at("Weeks", 604800000);
    O.duration.fn.asMonths = function() {
        return (+this - this.years() * 31536000000) / 2592000000 + this.years() * 12
    };
    O.lang("en", {
        ordinal: function(a6) {
            var a4 = a6 % 10,
                a5 = (J(a6 % 100 / 10) === 1) ? "th" : (a4 === 1) ? "st" : (a4 === 2) ? "nd" : (a4 === 3) ? "rd" : "th";
            return a6 + a5
        }
    });

    function P(a5) {
        var a4 = false,
            a6 = O;
        if (typeof ender !== "undefined") {
            return
        }
        if (a5) {
            x.moment = function() {
                if (!a4 && console && console.warn) {
                    a4 = true;
                    console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")
                }
                return a6.apply(null, arguments)
            };
            aw(x.moment, a6)
        } else {
            x.moment = O
        }
    }
    if (ai) {
        module.exports = O;
        P(true)
    } else {
        if (typeof define === "function" && define.amd) {
            define("moment", function(a5, a4, a6) {
                if (a6.config && a6.config() && a6.config().noGlobal !== true) {
                    P(a6.config().noGlobal === B)
                }
                return O
            })
        } else {
            P()
        }
    }
}).call(this);
/*! jQuery UI - v1.11.2 - 2015-02-10
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, draggable.js, resizable.js, button.js, dialog.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(f) {
    /*!
     * jQuery UI Core 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    ;
    f.ui = f.ui || {};
    f.extend(f.ui, {
        version: "1.11.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    f.fn.extend({
        scrollParent: function(v) {
            var u = this.css("position"),
                t = u === "absolute",
                w = v ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                x = this.parents().filter(function() {
                    var y = f(this);
                    if (t && y.css("position") === "static") {
                        return false
                    }
                    return w.test(y.css("overflow") + y.css("overflow-y") + y.css("overflow-x"))
                }).eq(0);
            return u === "fixed" || !x.length ? f(this[0].ownerDocument || document) : x
        },
        uniqueId: (function() {
            var t = 0;
            return function() {
                return this.each(function() {
                    if (!this.id) {
                        this.id = "ui-id-" + (++t)
                    }
                })
            }
        })(),
        removeUniqueId: function() {
            return this.each(function() {
                if (/^ui-id-\d+$/.test(this.id)) {
                    f(this).removeAttr("id")
                }
            })
        }
    });

    function o(v, t) {
        var x, w, u, y = v.nodeName.toLowerCase();
        if ("area" === y) {
            x = v.parentNode;
            w = x.name;
            if (!v.href || !w || x.nodeName.toLowerCase() !== "map") {
                return false
            }
            u = f("img[usemap='#" + w + "']")[0];
            return !!u && c(u)
        }
        return (/input|select|textarea|button|object/.test(y) ? !v.disabled : "a" === y ? v.href || t : t) && c(v)
    }

    function c(t) {
        return f.expr.filters.visible(t) && !f(t).parents().addBack().filter(function() {
            return f.css(this, "visibility") === "hidden"
        }).length
    }
    f.extend(f.expr[":"], {
        data: f.expr.createPseudo ? f.expr.createPseudo(function(t) {
            return function(u) {
                return !!f.data(u, t)
            }
        }) : function(v, u, t) {
            return !!f.data(v, t[3])
        },
        focusable: function(t) {
            return o(t, !isNaN(f.attr(t, "tabindex")))
        },
        tabbable: function(v) {
            var t = f.attr(v, "tabindex"),
                u = isNaN(t);
            return (u || t >= 0) && o(v, !u)
        }
    });
    if (!f("<a>").outerWidth(1).jquery) {
        f.each(["Width", "Height"], function(v, t) {
            var u = t === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                w = t.toLowerCase(),
                y = {
                    innerWidth: f.fn.innerWidth,
                    innerHeight: f.fn.innerHeight,
                    outerWidth: f.fn.outerWidth,
                    outerHeight: f.fn.outerHeight
                };

            function x(B, A, z, C) {
                f.each(u, function() {
                    A -= parseFloat(f.css(B, "padding" + this)) || 0;
                    if (z) {
                        A -= parseFloat(f.css(B, "border" + this + "Width")) || 0
                    }
                    if (C) {
                        A -= parseFloat(f.css(B, "margin" + this)) || 0
                    }
                });
                return A
            }
            f.fn["inner" + t] = function(z) {
                if (z === undefined) {
                    return y["inner" + t].call(this)
                }
                return this.each(function() {
                    f(this).css(w, x(this, z) + "px")
                })
            };
            f.fn["outer" + t] = function(z, A) {
                if (typeof z !== "number") {
                    return y["outer" + t].call(this, z)
                }
                return this.each(function() {
                    f(this).css(w, x(this, z, true, A) + "px")
                })
            }
        })
    }
    if (!f.fn.addBack) {
        f.fn.addBack = function(t) {
            return this.add(t == null ? this.prevObject : this.prevObject.filter(t))
        }
    }
    if (f("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        f.fn.removeData = (function(t) {
            return function(u) {
                if (arguments.length) {
                    return t.call(this, f.camelCase(u))
                } else {
                    return t.call(this)
                }
            }
        })(f.fn.removeData)
    }
    f.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    f.fn.extend({
        focus: (function(t) {
            return function(u, v) {
                return typeof u === "number" ? this.each(function() {
                    var w = this;
                    setTimeout(function() {
                        f(w).focus();
                        if (v) {
                            v.call(w)
                        }
                    }, u)
                }) : t.apply(this, arguments)
            }
        })(f.fn.focus),
        disableSelection: (function() {
            var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(t + ".ui-disableSelection", function(u) {
                    u.preventDefault()
                })
            }
        })(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(w) {
            if (w !== undefined) {
                return this.css("zIndex", w)
            }
            if (this.length) {
                var u = f(this[0]),
                    t, v;
                while (u.length && u[0] !== document) {
                    t = u.css("position");
                    if (t === "absolute" || t === "relative" || t === "fixed") {
                        v = parseInt(u.css("zIndex"), 10);
                        if (!isNaN(v) && v !== 0) {
                            return v
                        }
                    }
                    u = u.parent()
                }
            }
            return 0
        }
    });
    f.ui.plugin = {
        add: function(u, v, x) {
            var t, w = f.ui[u].prototype;
            for (t in x) {
                w.plugins[t] = w.plugins[t] || [];
                w.plugins[t].push([v, x[t]])
            }
        },
        call: function(t, w, v, u) {
            var x, y = t.plugins[w];
            if (!y) {
                return
            }
            if (!u && (!t.element[0].parentNode || t.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (x = 0; x < y.length; x++) {
                if (t.options[y[x][0]]) {
                    y[x][1].apply(t.element, v)
                }
            }
        }
    };
    /*!
     * jQuery UI Widget 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    ;
    var j = 0,
        p = Array.prototype.slice;
    f.cleanData = (function(t) {
        return function(u) {
            var w, x, v;
            for (v = 0;
                (x = u[v]) != null; v++) {
                try {
                    w = f._data(x, "events");
                    if (w && w.remove) {
                        f(x).triggerHandler("remove")
                    }
                } catch (y) {}
            }
            t(u)
        }
    })(f.cleanData);
    f.widget = function(t, u, B) {
        var y, z, w, A, v = {},
            x = t.split(".")[0];
        t = t.split(".")[1];
        y = x + "-" + t;
        if (!B) {
            B = u;
            u = f.Widget
        }
        f.expr[":"][y.toLowerCase()] = function(C) {
            return !!f.data(C, y)
        };
        f[x] = f[x] || {};
        z = f[x][t];
        w = f[x][t] = function(C, D) {
            if (!this._createWidget) {
                return new w(C, D)
            }
            if (arguments.length) {
                this._createWidget(C, D)
            }
        };
        f.extend(w, z, {
            version: B.version,
            _proto: f.extend({}, B),
            _childConstructors: []
        });
        A = new u();
        A.options = f.widget.extend({}, A.options);
        f.each(B, function(D, C) {
            if (!f.isFunction(C)) {
                v[D] = C;
                return
            }
            v[D] = (function() {
                var E = function() {
                        return u.prototype[D].apply(this, arguments)
                    },
                    F = function(G) {
                        return u.prototype[D].apply(this, G)
                    };
                return function() {
                    var I = this._super,
                        G = this._superApply,
                        H;
                    this._super = E;
                    this._superApply = F;
                    H = C.apply(this, arguments);
                    this._super = I;
                    this._superApply = G;
                    return H
                }
            })()
        });
        w.prototype = f.widget.extend(A, {
            widgetEventPrefix: z ? (A.widgetEventPrefix || t) : t
        }, v, {
            constructor: w,
            namespace: x,
            widgetName: t,
            widgetFullName: y
        });
        if (z) {
            f.each(z._childConstructors, function(D, E) {
                var C = E.prototype;
                f.widget(C.namespace + "." + C.widgetName, w, E._proto)
            });
            delete z._childConstructors
        } else {
            u._childConstructors.push(w)
        }
        f.widget.bridge(t, w);
        return w
    };
    f.widget.extend = function(y) {
        var u = p.call(arguments, 1),
            x = 0,
            t = u.length,
            v, w;
        for (; x < t; x++) {
            for (v in u[x]) {
                w = u[x][v];
                if (u[x].hasOwnProperty(v) && w !== undefined) {
                    if (f.isPlainObject(w)) {
                        y[v] = f.isPlainObject(y[v]) ? f.widget.extend({}, y[v], w) : f.widget.extend({}, w)
                    } else {
                        y[v] = w
                    }
                }
            }
        }
        return y
    };
    f.widget.bridge = function(u, t) {
        var v = t.prototype.widgetFullName || u;
        f.fn[u] = function(y) {
            var w = typeof y === "string",
                x = p.call(arguments, 1),
                z = this;
            y = !w && x.length ? f.widget.extend.apply(null, [y].concat(x)) : y;
            if (w) {
                this.each(function() {
                    var B, A = f.data(this, v);
                    if (y === "instance") {
                        z = A;
                        return false
                    }
                    if (!A) {
                        return f.error("cannot call methods on " + u + " prior to initialization; attempted to call method '" + y + "'")
                    }
                    if (!f.isFunction(A[y]) || y.charAt(0) === "_") {
                        return f.error("no such method '" + y + "' for " + u + " widget instance")
                    }
                    B = A[y].apply(A, x);
                    if (B !== A && B !== undefined) {
                        z = B && B.jquery ? z.pushStack(B.get()) : B;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var A = f.data(this, v);
                    if (A) {
                        A.option(y || {});
                        if (A._init) {
                            A._init()
                        }
                    } else {
                        f.data(this, v, new t(y, this))
                    }
                })
            }
            return z
        }
    };
    f.Widget = function() {};
    f.Widget._childConstructors = [];
    f.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(t, u) {
            u = f(u || this.defaultElement || this)[0];
            this.element = f(u);
            this.uuid = j++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = f();
            this.hoverable = f();
            this.focusable = f();
            if (u !== this) {
                f.data(u, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(v) {
                        if (v.target === u) {
                            this.destroy()
                        }
                    }
                });
                this.document = f(u.style ? u.ownerDocument : u.document || u);
                this.window = f(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this.options = f.widget.extend({}, this.options, this._getCreateOptions(), t);
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: f.noop,
        _getCreateEventData: f.noop,
        _create: f.noop,
        _init: f.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(f.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: f.noop,
        widget: function() {
            return this.element
        },
        option: function(w, x) {
            var t = w,
                y, v, u;
            if (arguments.length === 0) {
                return f.widget.extend({}, this.options)
            }
            if (typeof w === "string") {
                t = {};
                y = w.split(".");
                w = y.shift();
                if (y.length) {
                    v = t[w] = f.widget.extend({}, this.options[w]);
                    for (u = 0; u < y.length - 1; u++) {
                        v[y[u]] = v[y[u]] || {};
                        v = v[y[u]]
                    }
                    w = y.pop();
                    if (arguments.length === 1) {
                        return v[w] === undefined ? null : v[w]
                    }
                    v[w] = x
                } else {
                    if (arguments.length === 1) {
                        return this.options[w] === undefined ? null : this.options[w]
                    }
                    t[w] = x
                }
            }
            this._setOptions(t);
            return this
        },
        _setOptions: function(t) {
            var u;
            for (u in t) {
                this._setOption(u, t[u])
            }
            return this
        },
        _setOption: function(t, u) {
            this.options[t] = u;
            if (t === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!u);
                if (u) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function() {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function(w, v, u) {
            var x, t = this;
            if (typeof w !== "boolean") {
                u = v;
                v = w;
                w = false
            }
            if (!u) {
                u = v;
                v = this.element;
                x = this.widget()
            } else {
                v = x = f(v);
                this.bindings = this.bindings.add(v)
            }
            f.each(u, function(D, C) {
                function A() {
                    if (!w && (t.options.disabled === true || f(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof C === "string" ? t[C] : C).apply(t, arguments)
                }
                if (typeof C !== "string") {
                    A.guid = C.guid = C.guid || A.guid || f.guid++
                }
                var B = D.match(/^([\w:-]*)\s*(.*)$/),
                    z = B[1] + t.eventNamespace,
                    y = B[2];
                if (y) {
                    x.delegate(y, z, A)
                } else {
                    v.bind(z, A)
                }
            })
        },
        _off: function(u, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            u.unbind(t).undelegate(t);
            this.bindings = f(this.bindings.not(u).get());
            this.focusable = f(this.focusable.not(u).get());
            this.hoverable = f(this.hoverable.not(u).get())
        },
        _delay: function(w, v) {
            function u() {
                return (typeof w === "string" ? t[w] : w).apply(t, arguments)
            }
            var t = this;
            return setTimeout(u, v || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(u) {
                    f(u.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(u) {
                    f(u.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(u) {
                    f(u.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(u) {
                    f(u.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, u, v) {
            var y, x, w = this.options[t];
            v = v || {};
            u = f.Event(u);
            u.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase();
            u.target = this.element[0];
            x = u.originalEvent;
            if (x) {
                for (y in x) {
                    if (!(y in u)) {
                        u[y] = x[y]
                    }
                }
            }
            this.element.trigger(u, v);
            return !(f.isFunction(w) && w.apply(this.element[0], [u].concat(v)) === false || u.isDefaultPrevented())
        }
    };
    f.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(u, t) {
        f.Widget.prototype["_" + u] = function(x, w, z) {
            if (typeof w === "string") {
                w = {
                    effect: w
                }
            }
            var y, v = !w ? u : w === true || typeof w === "number" ? t : w.effect || t;
            w = w || {};
            if (typeof w === "number") {
                w = {
                    duration: w
                }
            }
            y = !f.isEmptyObject(w);
            w.complete = z;
            if (w.delay) {
                x.delay(w.delay)
            }
            if (y && f.effects && f.effects.effect[v]) {
                x[u](w)
            } else {
                if (v !== u && x[v]) {
                    x[v](w.duration, w.easing, z)
                } else {
                    x.queue(function(A) {
                        f(this)[u]();
                        if (z) {
                            z.call(x[0])
                        }
                        A()
                    })
                }
            }
        }
    });
    var e = f.widget;
    /*!
     * jQuery UI Mouse 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/mouse/
     */
    ;
    var n = false;
    f(document).mouseup(function() {
        n = false
    });
    var l = f.widget("ui.mouse", {
        version: "1.11.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(u) {
                return t._mouseDown(u)
            }).bind("click." + this.widgetName, function(u) {
                if (true === f.data(u.target, t.widgetName + ".preventClickEvent")) {
                    f.removeData(u.target, t.widgetName + ".preventClickEvent");
                    u.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(v) {
            if (n) {
                return
            }
            this._mouseMoved = false;
            (this._mouseStarted && this._mouseUp(v));
            this._mouseDownEvent = v;
            var u = this,
                w = (v.which === 1),
                t = (typeof this.options.cancel === "string" && v.target.nodeName ? f(v.target).closest(this.options.cancel).length : false);
            if (!w || t || !this._mouseCapture(v)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    u.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(v) && this._mouseDelayMet(v)) {
                this._mouseStarted = (this._mouseStart(v) !== false);
                if (!this._mouseStarted) {
                    v.preventDefault();
                    return true
                }
            }
            if (true === f.data(v.target, this.widgetName + ".preventClickEvent")) {
                f.removeData(v.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(x) {
                return u._mouseMove(x)
            };
            this._mouseUpDelegate = function(x) {
                return u._mouseUp(x)
            };
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            v.preventDefault();
            n = true;
            return true
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (f.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) {
                    return this._mouseUp(t)
                } else {
                    if (!t.which) {
                        return this._mouseUp(t)
                    }
                }
            }
            if (t.which || t.button) {
                this._mouseMoved = true
            }
            if (this._mouseStarted) {
                this._mouseDrag(t);
                return t.preventDefault()
            }
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, t) !== false);
                (this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(t) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (t.target === this._mouseDownEvent.target) {
                    f.data(t.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(t)
            }
            n = false;
            return false
        },
        _mouseDistanceMet: function(t) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    });
    /*!
     * jQuery UI Position 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function() {
        f.ui = f.ui || {};
        var A, D, B = Math.max,
            G = Math.abs,
            E = Math.round,
            v = /left|center|right/,
            y = /top|center|bottom/,
            t = /[\+\-]\d+(\.[\d]+)?%?/,
            C = /^\w+/,
            u = /%$/,
            x = f.fn.position;

        function F(J, I, H) {
            return [parseFloat(J[0]) * (u.test(J[0]) ? I / 100 : 1), parseFloat(J[1]) * (u.test(J[1]) ? H / 100 : 1)]
        }

        function z(H, I) {
            return parseInt(f.css(H, I), 10) || 0
        }

        function w(I) {
            var H = I[0];
            if (H.nodeType === 9) {
                return {
                    width: I.width(),
                    height: I.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (f.isWindow(H)) {
                return {
                    width: I.width(),
                    height: I.height(),
                    offset: {
                        top: I.scrollTop(),
                        left: I.scrollLeft()
                    }
                }
            }
            if (H.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: H.pageY,
                        left: H.pageX
                    }
                }
            }
            return {
                width: I.outerWidth(),
                height: I.outerHeight(),
                offset: I.offset()
            }
        }
        f.position = {
            scrollbarWidth: function() {
                if (A !== undefined) {
                    return A
                }
                var I, H, K = f("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    J = K.children()[0];
                f("body").append(K);
                I = J.offsetWidth;
                K.css("overflow", "scroll");
                H = J.offsetWidth;
                if (I === H) {
                    H = K[0].clientWidth
                }
                K.remove();
                return (A = I - H)
            },
            getScrollInfo: function(L) {
                var K = L.isWindow || L.isDocument ? "" : L.element.css("overflow-x"),
                    J = L.isWindow || L.isDocument ? "" : L.element.css("overflow-y"),
                    I = K === "scroll" || (K === "auto" && L.width < L.element[0].scrollWidth),
                    H = J === "scroll" || (J === "auto" && L.height < L.element[0].scrollHeight);
                return {
                    width: H ? f.position.scrollbarWidth() : 0,
                    height: I ? f.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(I) {
                var J = f(I || window),
                    H = f.isWindow(J[0]),
                    K = !!J[0] && J[0].nodeType === 9;
                return {
                    element: J,
                    isWindow: H,
                    isDocument: K,
                    offset: J.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: J.scrollLeft(),
                    scrollTop: J.scrollTop(),
                    width: H || K ? J.width() : J.outerWidth(),
                    height: H || K ? J.height() : J.outerHeight()
                }
            }
        };
        f.fn.position = function(R) {
            if (!R || !R.of) {
                return x.apply(this, arguments)
            }
            R = f.extend({}, R);
            var S, O, M, Q, L, H, N = f(R.of),
                K = f.position.getWithinInfo(R.within),
                I = f.position.getScrollInfo(K),
                P = (R.collision || "flip").split(" "),
                J = {};
            H = w(N);
            if (N[0].preventDefault) {
                R.at = "left top"
            }
            O = H.width;
            M = H.height;
            Q = H.offset;
            L = f.extend({}, Q);
            f.each(["my", "at"], function() {
                var V = (R[this] || "").split(" "),
                    U, T;
                if (V.length === 1) {
                    V = v.test(V[0]) ? V.concat(["center"]) : y.test(V[0]) ? ["center"].concat(V) : ["center", "center"]
                }
                V[0] = v.test(V[0]) ? V[0] : "center";
                V[1] = y.test(V[1]) ? V[1] : "center";
                U = t.exec(V[0]);
                T = t.exec(V[1]);
                J[this] = [U ? U[0] : 0, T ? T[0] : 0];
                R[this] = [C.exec(V[0])[0], C.exec(V[1])[0]]
            });
            if (P.length === 1) {
                P[1] = P[0]
            }
            if (R.at[0] === "right") {
                L.left += O
            } else {
                if (R.at[0] === "center") {
                    L.left += O / 2
                }
            }
            if (R.at[1] === "bottom") {
                L.top += M
            } else {
                if (R.at[1] === "center") {
                    L.top += M / 2
                }
            }
            S = F(J.at, O, M);
            L.left += S[0];
            L.top += S[1];
            return this.each(function() {
                var U, ad, W = f(this),
                    Y = W.outerWidth(),
                    V = W.outerHeight(),
                    X = z(this, "marginLeft"),
                    T = z(this, "marginTop"),
                    ac = Y + X + z(this, "marginRight") + I.width,
                    ab = V + T + z(this, "marginBottom") + I.height,
                    Z = f.extend({}, L),
                    aa = F(J.my, W.outerWidth(), W.outerHeight());
                if (R.my[0] === "right") {
                    Z.left -= Y
                } else {
                    if (R.my[0] === "center") {
                        Z.left -= Y / 2
                    }
                }
                if (R.my[1] === "bottom") {
                    Z.top -= V
                } else {
                    if (R.my[1] === "center") {
                        Z.top -= V / 2
                    }
                }
                Z.left += aa[0];
                Z.top += aa[1];
                if (!D) {
                    Z.left = E(Z.left);
                    Z.top = E(Z.top)
                }
                U = {
                    marginLeft: X,
                    marginTop: T
                };
                f.each(["left", "top"], function(af, ae) {
                    if (f.ui.position[P[af]]) {
                        f.ui.position[P[af]][ae](Z, {
                            targetWidth: O,
                            targetHeight: M,
                            elemWidth: Y,
                            elemHeight: V,
                            collisionPosition: U,
                            collisionWidth: ac,
                            collisionHeight: ab,
                            offset: [S[0] + aa[0], S[1] + aa[1]],
                            my: R.my,
                            at: R.at,
                            within: K,
                            elem: W
                        })
                    }
                });
                if (R.using) {
                    ad = function(ah) {
                        var aj = Q.left - Z.left,
                            ag = aj + O - Y,
                            ai = Q.top - Z.top,
                            af = ai + M - V,
                            ae = {
                                target: {
                                    element: N,
                                    left: Q.left,
                                    top: Q.top,
                                    width: O,
                                    height: M
                                },
                                element: {
                                    element: W,
                                    left: Z.left,
                                    top: Z.top,
                                    width: Y,
                                    height: V
                                },
                                horizontal: ag < 0 ? "left" : aj > 0 ? "right" : "center",
                                vertical: af < 0 ? "top" : ai > 0 ? "bottom" : "middle"
                            };
                        if (O < Y && G(aj + ag) < O) {
                            ae.horizontal = "center"
                        }
                        if (M < V && G(ai + af) < M) {
                            ae.vertical = "middle"
                        }
                        if (B(G(aj), G(ag)) > B(G(ai), G(af))) {
                            ae.important = "horizontal"
                        } else {
                            ae.important = "vertical"
                        }
                        R.using.call(this, ah, ae)
                    }
                }
                W.offset(f.extend(Z, {
                    using: ad
                }))
            })
        };
        f.ui.position = {
            fit: {
                left: function(L, K) {
                    var J = K.within,
                        N = J.isWindow ? J.scrollLeft : J.offset.left,
                        P = J.width,
                        M = L.left - K.collisionPosition.marginLeft,
                        O = N - M,
                        I = M + K.collisionWidth - P - N,
                        H;
                    if (K.collisionWidth > P) {
                        if (O > 0 && I <= 0) {
                            H = L.left + O + K.collisionWidth - P - N;
                            L.left += O - H
                        } else {
                            if (I > 0 && O <= 0) {
                                L.left = N
                            } else {
                                if (O > I) {
                                    L.left = N + P - K.collisionWidth
                                } else {
                                    L.left = N
                                }
                            }
                        }
                    } else {
                        if (O > 0) {
                            L.left += O
                        } else {
                            if (I > 0) {
                                L.left -= I
                            } else {
                                L.left = B(L.left - M, L.left)
                            }
                        }
                    }
                },
                top: function(K, J) {
                    var I = J.within,
                        O = I.isWindow ? I.scrollTop : I.offset.top,
                        P = J.within.height,
                        M = K.top - J.collisionPosition.marginTop,
                        N = O - M,
                        L = M + J.collisionHeight - P - O,
                        H;
                    if (J.collisionHeight > P) {
                        if (N > 0 && L <= 0) {
                            H = K.top + N + J.collisionHeight - P - O;
                            K.top += N - H
                        } else {
                            if (L > 0 && N <= 0) {
                                K.top = O
                            } else {
                                if (N > L) {
                                    K.top = O + P - J.collisionHeight
                                } else {
                                    K.top = O
                                }
                            }
                        }
                    } else {
                        if (N > 0) {
                            K.top += N
                        } else {
                            if (L > 0) {
                                K.top -= L
                            } else {
                                K.top = B(K.top - M, K.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function(N, M) {
                    var L = M.within,
                        R = L.offset.left + L.scrollLeft,
                        U = L.width,
                        J = L.isWindow ? L.scrollLeft : L.offset.left,
                        O = N.left - M.collisionPosition.marginLeft,
                        S = O - J,
                        I = O + M.collisionWidth - U - J,
                        Q = M.my[0] === "left" ? -M.elemWidth : M.my[0] === "right" ? M.elemWidth : 0,
                        T = M.at[0] === "left" ? M.targetWidth : M.at[0] === "right" ? -M.targetWidth : 0,
                        K = -2 * M.offset[0],
                        H, P;
                    if (S < 0) {
                        H = N.left + Q + T + K + M.collisionWidth - U - R;
                        if (H < 0 || H < G(S)) {
                            N.left += Q + T + K
                        }
                    } else {
                        if (I > 0) {
                            P = N.left - M.collisionPosition.marginLeft + Q + T + K - J;
                            if (P > 0 || G(P) < I) {
                                N.left += Q + T + K
                            }
                        }
                    }
                },
                top: function(M, L) {
                    var K = L.within,
                        T = K.offset.top + K.scrollTop,
                        U = K.height,
                        H = K.isWindow ? K.scrollTop : K.offset.top,
                        O = M.top - L.collisionPosition.marginTop,
                        Q = O - H,
                        N = O + L.collisionHeight - U - H,
                        R = L.my[1] === "top",
                        P = R ? -L.elemHeight : L.my[1] === "bottom" ? L.elemHeight : 0,
                        V = L.at[1] === "top" ? L.targetHeight : L.at[1] === "bottom" ? -L.targetHeight : 0,
                        J = -2 * L.offset[1],
                        S, I;
                    if (Q < 0) {
                        I = M.top + P + V + J + L.collisionHeight - U - T;
                        if ((M.top + P + V + J) > Q && (I < 0 || I < G(Q))) {
                            M.top += P + V + J
                        }
                    } else {
                        if (N > 0) {
                            S = M.top - L.collisionPosition.marginTop + P + V + J - H;
                            if ((M.top + P + V + J) > N && (S > 0 || G(S) < N)) {
                                M.top += P + V + J
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function() {
                    f.ui.position.flip.left.apply(this, arguments);
                    f.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    f.ui.position.flip.top.apply(this, arguments);
                    f.ui.position.fit.top.apply(this, arguments)
                }
            }
        };
        (function() {
            var L, N, I, K, J, H = document.getElementsByTagName("body")[0],
                M = document.createElement("div");
            L = document.createElement(H ? "div" : "body");
            I = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (H) {
                f.extend(I, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                })
            }
            for (J in I) {
                L.style[J] = I[J]
            }
            L.appendChild(M);
            N = H || document.documentElement;
            N.insertBefore(L, N.firstChild);
            M.style.cssText = "position: absolute; left: 10.7432222px;";
            K = f(M).offset().left;
            D = K > 10 && K < 11;
            L.innerHTML = "";
            N.removeChild(L)
        })()
    })();
    var s = f.ui.position;
    /*!
     * jQuery UI Draggable 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/draggable/
     */
    ;
    f.widget("ui.draggable", f.ui.mouse, {
        version: "1.11.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            if (this.options.helper === "original") {
                this._setPositionRelative()
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(t, u) {
            this._super(t, u);
            if (t === "handle") {
                this._removeHandleClassName();
                this._setHandleClassName()
            }
        },
        _destroy: function() {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = true;
                return
            }
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var u = this.options;
            this._blurActiveElement(t);
            if (this.helper || u.disabled || f(t.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(t);
            if (!this.handle) {
                return false
            }
            this._blockFrames(u.iframeFix === true ? "iframe" : u.iframeFix);
            return true
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var u = f(this);
                return f("<div>").css("position", "absolute").appendTo(u.parent()).outerWidth(u.outerWidth()).outerHeight(u.outerHeight()).offset(u.offset())[0]
            })
        },
        _unblockFrames: function() {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _blurActiveElement: function(v) {
            var t = this.document[0];
            if (!this.handleElement.is(v.target)) {
                return
            }
            try {
                if (t.activeElement && t.activeElement.nodeName.toLowerCase() !== "body") {
                    f(t.activeElement).blur()
                }
            } catch (u) {}
        },
        _mouseStart: function(t) {
            var u = this.options;
            this.helper = this._createHelper(t);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (f.ui.ddmanager) {
                f.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent(true);
            this.offsetParent = this.helper.offsetParent();
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return f(this).css("position") === "fixed"
            }).length > 0;
            this.positionAbs = this.element.offset();
            this._refreshOffsets(t);
            this.originalPosition = this.position = this._generatePosition(t, false);
            this.originalPageX = t.pageX;
            this.originalPageY = t.pageY;
            (u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt));
            this._setContainment();
            if (this._trigger("start", t) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (f.ui.ddmanager && !u.dropBehaviour) {
                f.ui.ddmanager.prepareOffsets(this, t)
            }
            this._normalizeRightBottom();
            this._mouseDrag(t, true);
            if (f.ui.ddmanager) {
                f.ui.ddmanager.dragStart(this, t)
            }
            return true
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: false,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(t, v) {
            if (this.hasFixedAncestor) {
                this.offset.parent = this._getParentOffset()
            }
            this.position = this._generatePosition(t, true);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!v) {
                var u = this._uiHash();
                if (this._trigger("drag", t, u) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = u.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            if (f.ui.ddmanager) {
                f.ui.ddmanager.drag(this, t)
            }
            return false
        },
        _mouseStop: function(u) {
            var t = this,
                v = false;
            if (f.ui.ddmanager && !this.options.dropBehaviour) {
                v = f.ui.ddmanager.drop(this, u)
            }
            if (this.dropped) {
                v = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert === "invalid" && !v) || (this.options.revert === "valid" && v) || this.options.revert === true || (f.isFunction(this.options.revert) && this.options.revert.call(this.element, v))) {
                f(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (t._trigger("stop", u) !== false) {
                        t._clear()
                    }
                })
            } else {
                if (this._trigger("stop", u) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function(t) {
            this._unblockFrames();
            if (f.ui.ddmanager) {
                f.ui.ddmanager.dragStop(this, t)
            }
            if (this.handleElement.is(t.target)) {
                this.element.focus()
            }
            return f.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!f(t.target).closest(this.element.find(this.options.handle)).length : true
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function(u) {
            var w = this.options,
                v = f.isFunction(w.helper),
                t = v ? f(w.helper.apply(this.element[0], [u])) : (w.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!t.parents("body").length) {
                t.appendTo((w.appendTo === "parent" ? this.element[0].parentNode : w.appendTo))
            }
            if (v && t[0] === this.element[0]) {
                this._setPositionRelative()
            }
            if (t[0] !== this.element[0] && !(/(fixed|absolute)/).test(t.css("position"))) {
                t.css("position", "absolute")
            }
            return t
        },
        _setPositionRelative: function() {
            if (!(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
        },
        _adjustOffsetFromHelper: function(t) {
            if (typeof t === "string") {
                t = t.split(" ")
            }
            if (f.isArray(t)) {
                t = {
                    left: +t[0],
                    top: +t[1] || 0
                }
            }
            if ("left" in t) {
                this.offset.click.left = t.left + this.margins.left
            }
            if ("right" in t) {
                this.offset.click.left = this.helperProportions.width - t.right + this.margins.left
            }
            if ("top" in t) {
                this.offset.click.top = t.top + this.margins.top
            }
            if ("bottom" in t) {
                this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top
            }
        },
        _isRootNode: function(t) {
            return (/(html|body)/i).test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var u = this.offsetParent.offset(),
                t = this.document[0];
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== t && f.contains(this.scrollParent[0], this.offsetParent[0])) {
                u.left += this.scrollParent.scrollLeft();
                u.top += this.scrollParent.scrollTop()
            }
            if (this._isRootNode(this.offsetParent[0])) {
                u = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: u.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: u.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition !== "relative") {
                return {
                    top: 0,
                    left: 0
                }
            }
            var t = this.element.position(),
                u = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (!u ? this.scrollParent.scrollTop() : 0),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (!u ? this.scrollParent.scrollLeft() : 0)
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var u, x, v, w = this.options,
                t = this.document[0];
            this.relativeContainer = null;
            if (!w.containment) {
                this.containment = null;
                return
            }
            if (w.containment === "window") {
                this.containment = [f(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, f(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, f(window).scrollLeft() + f(window).width() - this.helperProportions.width - this.margins.left, f(window).scrollTop() + (f(window).height() || t.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (w.containment === "document") {
                this.containment = [0, 0, f(t).width() - this.helperProportions.width - this.margins.left, (f(t).height() || t.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (w.containment.constructor === Array) {
                this.containment = w.containment;
                return
            }
            if (w.containment === "parent") {
                w.containment = this.helper[0].parentNode
            }
            x = f(w.containment);
            v = x[0];
            if (!v) {
                return
            }
            u = /(scroll|auto)/.test(x.css("overflow"));
            this.containment = [(parseInt(x.css("borderLeftWidth"), 10) || 0) + (parseInt(x.css("paddingLeft"), 10) || 0), (parseInt(x.css("borderTopWidth"), 10) || 0) + (parseInt(x.css("paddingTop"), 10) || 0), (u ? Math.max(v.scrollWidth, v.offsetWidth) : v.offsetWidth) - (parseInt(x.css("borderRightWidth"), 10) || 0) - (parseInt(x.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (u ? Math.max(v.scrollHeight, v.offsetHeight) : v.offsetHeight) - (parseInt(x.css("borderBottomWidth"), 10) || 0) - (parseInt(x.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relativeContainer = x
        },
        _convertPositionTo: function(u, w) {
            if (!w) {
                w = this.position
            }
            var t = u === "absolute" ? 1 : -1,
                v = this._isRootNode(this.scrollParent[0]);
            return {
                top: (w.top + this.offset.relative.top * t + this.offset.parent.top * t - ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (v ? 0 : this.offset.scroll.top)) * t)),
                left: (w.left + this.offset.relative.left * t + this.offset.parent.left * t - ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (v ? 0 : this.offset.scroll.left)) * t))
            }
        },
        _generatePosition: function(u, A) {
            var t, B, C, w, v = this.options,
                z = this._isRootNode(this.scrollParent[0]),
                y = u.pageX,
                x = u.pageY;
            if (!z || !this.offset.scroll) {
                this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }
            }
            if (A) {
                if (this.containment) {
                    if (this.relativeContainer) {
                        B = this.relativeContainer.offset();
                        t = [this.containment[0] + B.left, this.containment[1] + B.top, this.containment[2] + B.left, this.containment[3] + B.top]
                    } else {
                        t = this.containment
                    }
                    if (u.pageX - this.offset.click.left < t[0]) {
                        y = t[0] + this.offset.click.left
                    }
                    if (u.pageY - this.offset.click.top < t[1]) {
                        x = t[1] + this.offset.click.top
                    }
                    if (u.pageX - this.offset.click.left > t[2]) {
                        y = t[2] + this.offset.click.left
                    }
                    if (u.pageY - this.offset.click.top > t[3]) {
                        x = t[3] + this.offset.click.top
                    }
                }
                if (v.grid) {
                    C = v.grid[1] ? this.originalPageY + Math.round((x - this.originalPageY) / v.grid[1]) * v.grid[1] : this.originalPageY;
                    x = t ? ((C - this.offset.click.top >= t[1] || C - this.offset.click.top > t[3]) ? C : ((C - this.offset.click.top >= t[1]) ? C - v.grid[1] : C + v.grid[1])) : C;
                    w = v.grid[0] ? this.originalPageX + Math.round((y - this.originalPageX) / v.grid[0]) * v.grid[0] : this.originalPageX;
                    y = t ? ((w - this.offset.click.left >= t[0] || w - this.offset.click.left > t[2]) ? w : ((w - this.offset.click.left >= t[0]) ? w - v.grid[0] : w + v.grid[0])) : w
                }
                if (v.axis === "y") {
                    y = this.originalPageX
                }
                if (v.axis === "x") {
                    x = this.originalPageY
                }
            }
            return {
                top: (x - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : (z ? 0 : this.offset.scroll.top))),
                left: (y - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : (z ? 0 : this.offset.scroll.left)))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
            if (this.destroyOnClear) {
                this.destroy()
            }
        },
        _normalizeRightBottom: function() {
            if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
                this.helper.width(this.helper.width());
                this.helper.css("right", "auto")
            }
            if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
                this.helper.height(this.helper.height());
                this.helper.css("bottom", "auto")
            }
        },
        _trigger: function(t, u, v) {
            v = v || this._uiHash();
            f.ui.plugin.call(this, t, [u, v, this], true);
            if (/^(drag|start|stop)/.test(t)) {
                this.positionAbs = this._convertPositionTo("absolute");
                v.offset = this.positionAbs
            }
            return f.Widget.prototype._trigger.call(this, t, u, v)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    f.ui.plugin.add("draggable", "connectToSortable", {
        start: function(v, w, t) {
            var u = f.extend({}, w, {
                item: t.element
            });
            t.sortables = [];
            f(t.options.connectToSortable).each(function() {
                var x = f(this).sortable("instance");
                if (x && !x.options.disabled) {
                    t.sortables.push(x);
                    x.refreshPositions();
                    x._trigger("activate", v, u)
                }
            })
        },
        stop: function(v, w, t) {
            var u = f.extend({}, w, {
                item: t.element
            });
            t.cancelHelperRemoval = false;
            f.each(t.sortables, function() {
                var x = this;
                if (x.isOver) {
                    x.isOver = 0;
                    t.cancelHelperRemoval = true;
                    x.cancelHelperRemoval = false;
                    x._storedCSS = {
                        position: x.placeholder.css("position"),
                        top: x.placeholder.css("top"),
                        left: x.placeholder.css("left")
                    };
                    x._mouseStop(v);
                    x.options.helper = x.options._helper
                } else {
                    x.cancelHelperRemoval = true;
                    x._trigger("deactivate", v, u)
                }
            })
        },
        drag: function(u, v, t) {
            f.each(t.sortables, function() {
                var w = false,
                    x = this;
                x.positionAbs = t.positionAbs;
                x.helperProportions = t.helperProportions;
                x.offset.click = t.offset.click;
                if (x._intersectsWith(x.containerCache)) {
                    w = true;
                    f.each(t.sortables, function() {
                        this.positionAbs = t.positionAbs;
                        this.helperProportions = t.helperProportions;
                        this.offset.click = t.offset.click;
                        if (this !== x && this._intersectsWith(this.containerCache) && f.contains(x.element[0], this.element[0])) {
                            w = false
                        }
                        return w
                    })
                }
                if (w) {
                    if (!x.isOver) {
                        x.isOver = 1;
                        x.currentItem = v.helper.appendTo(x.element).data("ui-sortable-item", true);
                        x.options._helper = x.options.helper;
                        x.options.helper = function() {
                            return v.helper[0]
                        };
                        u.target = x.currentItem[0];
                        x._mouseCapture(u, true);
                        x._mouseStart(u, true, true);
                        x.offset.click.top = t.offset.click.top;
                        x.offset.click.left = t.offset.click.left;
                        x.offset.parent.left -= t.offset.parent.left - x.offset.parent.left;
                        x.offset.parent.top -= t.offset.parent.top - x.offset.parent.top;
                        t._trigger("toSortable", u);
                        t.dropped = x.element;
                        f.each(t.sortables, function() {
                            this.refreshPositions()
                        });
                        t.currentItem = t.element;
                        x.fromOutside = t
                    }
                    if (x.currentItem) {
                        x._mouseDrag(u);
                        v.position = x.position
                    }
                } else {
                    if (x.isOver) {
                        x.isOver = 0;
                        x.cancelHelperRemoval = true;
                        x.options._revert = x.options.revert;
                        x.options.revert = false;
                        x._trigger("out", u, x._uiHash(x));
                        x._mouseStop(u, true);
                        x.options.revert = x.options._revert;
                        x.options.helper = x.options._helper;
                        if (x.placeholder) {
                            x.placeholder.remove()
                        }
                        t._refreshOffsets(u);
                        v.position = t._generatePosition(u, true);
                        t._trigger("fromSortable", u);
                        t.dropped = false;
                        f.each(t.sortables, function() {
                            this.refreshPositions()
                        })
                    }
                }
            })
        }
    });
    f.ui.plugin.add("draggable", "cursor", {
        start: function(w, x, u) {
            var v = f("body"),
                y = u.options;
            if (v.css("cursor")) {
                y._cursor = v.css("cursor")
            }
            v.css("cursor", y.cursor)
        },
        stop: function(u, v, t) {
            var w = t.options;
            if (w._cursor) {
                f("body").css("cursor", w._cursor)
            }
        }
    });
    f.ui.plugin.add("draggable", "opacity", {
        start: function(w, x, u) {
            var v = f(x.helper),
                y = u.options;
            if (v.css("opacity")) {
                y._opacity = v.css("opacity")
            }
            v.css("opacity", y.opacity)
        },
        stop: function(u, v, t) {
            var w = t.options;
            if (w._opacity) {
                f(v.helper).css("opacity", w._opacity)
            }
        }
    });
    f.ui.plugin.add("draggable", "scroll", {
        start: function(u, v, t) {
            if (!t.scrollParentNotHidden) {
                t.scrollParentNotHidden = t.helper.scrollParent(false)
            }
            if (t.scrollParentNotHidden[0] !== t.document[0] && t.scrollParentNotHidden[0].tagName !== "HTML") {
                t.overflowOffset = t.scrollParentNotHidden.offset()
            }
        },
        drag: function(w, x, v) {
            var y = v.options,
                u = false,
                z = v.scrollParentNotHidden[0],
                t = v.document[0];
            if (z !== t && z.tagName !== "HTML") {
                if (!y.axis || y.axis !== "x") {
                    if ((v.overflowOffset.top + z.offsetHeight) - w.pageY < y.scrollSensitivity) {
                        z.scrollTop = u = z.scrollTop + y.scrollSpeed
                    } else {
                        if (w.pageY - v.overflowOffset.top < y.scrollSensitivity) {
                            z.scrollTop = u = z.scrollTop - y.scrollSpeed
                        }
                    }
                }
                if (!y.axis || y.axis !== "y") {
                    if ((v.overflowOffset.left + z.offsetWidth) - w.pageX < y.scrollSensitivity) {
                        z.scrollLeft = u = z.scrollLeft + y.scrollSpeed
                    } else {
                        if (w.pageX - v.overflowOffset.left < y.scrollSensitivity) {
                            z.scrollLeft = u = z.scrollLeft - y.scrollSpeed
                        }
                    }
                }
            } else {
                if (!y.axis || y.axis !== "x") {
                    if (w.pageY - f(t).scrollTop() < y.scrollSensitivity) {
                        u = f(t).scrollTop(f(t).scrollTop() - y.scrollSpeed)
                    } else {
                        if (f(window).height() - (w.pageY - f(t).scrollTop()) < y.scrollSensitivity) {
                            u = f(t).scrollTop(f(t).scrollTop() + y.scrollSpeed)
                        }
                    }
                }
                if (!y.axis || y.axis !== "y") {
                    if (w.pageX - f(t).scrollLeft() < y.scrollSensitivity) {
                        u = f(t).scrollLeft(f(t).scrollLeft() - y.scrollSpeed)
                    } else {
                        if (f(window).width() - (w.pageX - f(t).scrollLeft()) < y.scrollSensitivity) {
                            u = f(t).scrollLeft(f(t).scrollLeft() + y.scrollSpeed)
                        }
                    }
                }
            }
            if (u !== false && f.ui.ddmanager && !y.dropBehaviour) {
                f.ui.ddmanager.prepareOffsets(v, w)
            }
        }
    });
    f.ui.plugin.add("draggable", "snap", {
        start: function(u, v, t) {
            var w = t.options;
            t.snapElements = [];
            f(w.snap.constructor !== String ? (w.snap.items || ":data(ui-draggable)") : w.snap).each(function() {
                var y = f(this),
                    x = y.offset();
                if (this !== t.element[0]) {
                    t.snapElements.push({
                        item: this,
                        width: y.outerWidth(),
                        height: y.outerHeight(),
                        top: x.top,
                        left: x.left
                    })
                }
            })
        },
        drag: function(G, D, x) {
            var u, L, z, A, F, C, B, M, H, y, E = x.options,
                K = E.snapTolerance,
                J = D.offset.left,
                I = J + x.helperProportions.width,
                w = D.offset.top,
                v = w + x.helperProportions.height;
            for (H = x.snapElements.length - 1; H >= 0; H--) {
                F = x.snapElements[H].left - x.margins.left;
                C = F + x.snapElements[H].width;
                B = x.snapElements[H].top - x.margins.top;
                M = B + x.snapElements[H].height;
                if (I < F - K || J > C + K || v < B - K || w > M + K || !f.contains(x.snapElements[H].item.ownerDocument, x.snapElements[H].item)) {
                    if (x.snapElements[H].snapping) {
                        (x.options.snap.release && x.options.snap.release.call(x.element, G, f.extend(x._uiHash(), {
                            snapItem: x.snapElements[H].item
                        })))
                    }
                    x.snapElements[H].snapping = false;
                    continue
                }
                if (E.snapMode !== "inner") {
                    u = Math.abs(B - v) <= K;
                    L = Math.abs(M - w) <= K;
                    z = Math.abs(F - I) <= K;
                    A = Math.abs(C - J) <= K;
                    if (u) {
                        D.position.top = x._convertPositionTo("relative", {
                            top: B - x.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (L) {
                        D.position.top = x._convertPositionTo("relative", {
                            top: M,
                            left: 0
                        }).top
                    }
                    if (z) {
                        D.position.left = x._convertPositionTo("relative", {
                            top: 0,
                            left: F - x.helperProportions.width
                        }).left
                    }
                    if (A) {
                        D.position.left = x._convertPositionTo("relative", {
                            top: 0,
                            left: C
                        }).left
                    }
                }
                y = (u || L || z || A);
                if (E.snapMode !== "outer") {
                    u = Math.abs(B - w) <= K;
                    L = Math.abs(M - v) <= K;
                    z = Math.abs(F - J) <= K;
                    A = Math.abs(C - I) <= K;
                    if (u) {
                        D.position.top = x._convertPositionTo("relative", {
                            top: B,
                            left: 0
                        }).top
                    }
                    if (L) {
                        D.position.top = x._convertPositionTo("relative", {
                            top: M - x.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (z) {
                        D.position.left = x._convertPositionTo("relative", {
                            top: 0,
                            left: F
                        }).left
                    }
                    if (A) {
                        D.position.left = x._convertPositionTo("relative", {
                            top: 0,
                            left: C - x.helperProportions.width
                        }).left
                    }
                }
                if (!x.snapElements[H].snapping && (u || L || z || A || y)) {
                    (x.options.snap.snap && x.options.snap.snap.call(x.element, G, f.extend(x._uiHash(), {
                        snapItem: x.snapElements[H].item
                    })))
                }
                x.snapElements[H].snapping = (u || L || z || A || y)
            }
        }
    });
    f.ui.plugin.add("draggable", "stack", {
        start: function(v, w, t) {
            var u, y = t.options,
                x = f.makeArray(f(y.stack)).sort(function(A, z) {
                    return (parseInt(f(A).css("zIndex"), 10) || 0) - (parseInt(f(z).css("zIndex"), 10) || 0)
                });
            if (!x.length) {
                return
            }
            u = parseInt(f(x[0]).css("zIndex"), 10) || 0;
            f(x).each(function(z) {
                f(this).css("zIndex", u + z)
            });
            this.css("zIndex", (u + x.length))
        }
    });
    f.ui.plugin.add("draggable", "zIndex", {
        start: function(w, x, u) {
            var v = f(x.helper),
                y = u.options;
            if (v.css("zIndex")) {
                y._zIndex = v.css("zIndex")
            }
            v.css("zIndex", y.zIndex)
        },
        stop: function(u, v, t) {
            var w = t.options;
            if (w._zIndex) {
                f(v.helper).css("zIndex", w._zIndex)
            }
        }
    });
    var d = f.ui.draggable;
    /*!
     * jQuery UI Resizable 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/resizable/
     */
    ;
    f.widget("ui.resizable", f.ui.mouse, {
        version: "1.11.2",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseInt(t, 10) || 0
        },
        _isNumber: function(t) {
            return !isNaN(parseInt(t, 10))
        },
        _hasScroll: function(w, u) {
            if (f(w).css("overflow") === "hidden") {
                return false
            }
            var t = (u && u === "left") ? "scrollLeft" : "scrollTop",
                v = false;
            if (w[t] > 0) {
                return true
            }
            w[t] = 1;
            v = (w[t] > 0);
            w[t] = 0;
            return v
        },
        _create: function() {
            var z, u, x, v, t, w = this,
                y = this.options;
            this.element.addClass("ui-resizable");
            f.extend(this, {
                _aspectRatio: !!(y.aspectRatio),
                aspectRatio: y.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: y.helper || y.ghost || y.animate ? y.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(f("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = y.handles || (!f(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                z = this.handles.split(",");
                this.handles = {};
                for (u = 0; u < z.length; u++) {
                    x = f.trim(z[u]);
                    t = "ui-resizable-" + x;
                    v = f("<div class='ui-resizable-handle " + t + "'></div>");
                    v.css({
                        zIndex: y.zIndex
                    });
                    if ("se" === x) {
                        v.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[x] = ".ui-resizable-" + x;
                    this.element.append(v)
                }
            }
            this._renderAxis = function(E) {
                var B, C, A, D;
                E = E || this.element;
                for (B in this.handles) {
                    if (this.handles[B].constructor === String) {
                        this.handles[B] = this.element.children(this.handles[B]).first().show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        C = f(this.handles[B], this.element);
                        D = /sw|ne|nw|se|n|s/.test(B) ? C.outerHeight() : C.outerWidth();
                        A = ["padding", /ne|nw|n/.test(B) ? "Top" : /se|sw|s/.test(B) ? "Bottom" : /^e$/.test(B) ? "Right" : "Left"].join("");
                        E.css(A, D);
                        this._proportionallyResize()
                    }
                    if (!f(this.handles[B]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = f(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!w.resizing) {
                    if (this.className) {
                        v = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    w.axis = v && v[1] ? v[1] : "se"
                }
            });
            if (y.autoHide) {
                this._handles.hide();
                f(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (y.disabled) {
                        return
                    }
                    f(this).removeClass("ui-resizable-autohide");
                    w._handles.show()
                }).mouseleave(function() {
                    if (y.disabled) {
                        return
                    }
                    if (!w.resizing) {
                        f(this).addClass("ui-resizable-autohide");
                        w._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var u, t = function(v) {
                f(v).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                t(this.element);
                u = this.element;
                this.originalElement.css({
                    position: u.css("position"),
                    width: u.outerWidth(),
                    height: u.outerHeight(),
                    top: u.css("top"),
                    left: u.css("left")
                }).insertAfter(u);
                u.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            t(this.originalElement);
            return this
        },
        _mouseCapture: function(v) {
            var u, w, t = false;
            for (u in this.handles) {
                w = f(this.handles[u])[0];
                if (w === v.target || f.contains(w, v.target)) {
                    t = true
                }
            }
            return !this.options.disabled && t
        },
        _mouseStart: function(u) {
            var y, v, x, w = this.options,
                t = this.element;
            this.resizing = true;
            this._renderProxy();
            y = this._num(this.helper.css("left"));
            v = this._num(this.helper.css("top"));
            if (w.containment) {
                y += f(w.containment).scrollLeft() || 0;
                v += f(w.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: y,
                top: v
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: t.width(),
                height: t.height()
            };
            this.originalSize = this._helper ? {
                width: t.outerWidth(),
                height: t.outerHeight()
            } : {
                width: t.width(),
                height: t.height()
            };
            this.sizeDiff = {
                width: t.outerWidth() - t.width(),
                height: t.outerHeight() - t.height()
            };
            this.originalPosition = {
                left: y,
                top: v
            };
            this.originalMousePosition = {
                left: u.pageX,
                top: u.pageY
            };
            this.aspectRatio = (typeof w.aspectRatio === "number") ? w.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            x = f(".ui-resizable-" + this.axis).css("cursor");
            f("body").css("cursor", x === "auto" ? this.axis + "-resize" : x);
            t.addClass("ui-resizable-resizing");
            this._propagate("start", u);
            return true
        },
        _mouseDrag: function(y) {
            var z, x, A = this.originalMousePosition,
                u = this.axis,
                v = (y.pageX - A.left) || 0,
                t = (y.pageY - A.top) || 0,
                w = this._change[u];
            this._updatePrevProperties();
            if (!w) {
                return false
            }
            z = w.apply(this, [y, v, t]);
            this._updateVirtualBoundaries(y.shiftKey);
            if (this._aspectRatio || y.shiftKey) {
                z = this._updateRatio(z, y)
            }
            z = this._respectSize(z, y);
            this._updateCache(z);
            this._propagate("resize", y);
            x = this._applyChanges();
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!f.isEmptyObject(x)) {
                this._updatePrevProperties();
                this._trigger("resize", y, this.ui());
                this._applyChanges()
            }
            return false
        },
        _mouseStop: function(w) {
            this.resizing = false;
            var v, t, u, z, C, y, B, x = this.options,
                A = this;
            if (this._helper) {
                v = this._proportionallyResizeElements;
                t = v.length && (/textarea/i).test(v[0].nodeName);
                u = t && this._hasScroll(v[0], "left") ? 0 : A.sizeDiff.height;
                z = t ? 0 : A.sizeDiff.width;
                C = {
                    width: (A.helper.width() - z),
                    height: (A.helper.height() - u)
                };
                y = (parseInt(A.element.css("left"), 10) + (A.position.left - A.originalPosition.left)) || null;
                B = (parseInt(A.element.css("top"), 10) + (A.position.top - A.originalPosition.top)) || null;
                if (!x.animate) {
                    this.element.css(f.extend(C, {
                        top: B,
                        left: y
                    }))
                }
                A.helper.height(A.size.height);
                A.helper.width(A.size.width);
                if (this._helper && !x.animate) {
                    this._proportionallyResize()
                }
            }
            f("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", w);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            if (this.position.top !== this.prevPosition.top) {
                t.top = this.position.top + "px"
            }
            if (this.position.left !== this.prevPosition.left) {
                t.left = this.position.left + "px"
            }
            if (this.size.width !== this.prevSize.width) {
                t.width = this.size.width + "px"
            }
            if (this.size.height !== this.prevSize.height) {
                t.height = this.size.height + "px"
            }
            this.helper.css(t);
            return t
        },
        _updateVirtualBoundaries: function(v) {
            var x, w, u, z, t, y = this.options;
            t = {
                minWidth: this._isNumber(y.minWidth) ? y.minWidth : 0,
                maxWidth: this._isNumber(y.maxWidth) ? y.maxWidth : Infinity,
                minHeight: this._isNumber(y.minHeight) ? y.minHeight : 0,
                maxHeight: this._isNumber(y.maxHeight) ? y.maxHeight : Infinity
            };
            if (this._aspectRatio || v) {
                x = t.minHeight * this.aspectRatio;
                u = t.minWidth / this.aspectRatio;
                w = t.maxHeight * this.aspectRatio;
                z = t.maxWidth / this.aspectRatio;
                if (x > t.minWidth) {
                    t.minWidth = x
                }
                if (u > t.minHeight) {
                    t.minHeight = u
                }
                if (w < t.maxWidth) {
                    t.maxWidth = w
                }
                if (z < t.maxHeight) {
                    t.maxHeight = z
                }
            }
            this._vBoundaries = t
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset();
            if (this._isNumber(t.left)) {
                this.position.left = t.left
            }
            if (this._isNumber(t.top)) {
                this.position.top = t.top
            }
            if (this._isNumber(t.height)) {
                this.size.height = t.height
            }
            if (this._isNumber(t.width)) {
                this.size.width = t.width
            }
        },
        _updateRatio: function(v) {
            var w = this.position,
                u = this.size,
                t = this.axis;
            if (this._isNumber(v.height)) {
                v.width = (v.height * this.aspectRatio)
            } else {
                if (this._isNumber(v.width)) {
                    v.height = (v.width / this.aspectRatio)
                }
            }
            if (t === "sw") {
                v.left = w.left + (u.width - v.width);
                v.top = null
            }
            if (t === "nw") {
                v.top = w.top + (u.height - v.height);
                v.left = w.left + (u.width - v.width)
            }
            return v
        },
        _respectSize: function(y) {
            var v = this._vBoundaries,
                B = this.axis,
                D = this._isNumber(y.width) && v.maxWidth && (v.maxWidth < y.width),
                z = this._isNumber(y.height) && v.maxHeight && (v.maxHeight < y.height),
                w = this._isNumber(y.width) && v.minWidth && (v.minWidth > y.width),
                C = this._isNumber(y.height) && v.minHeight && (v.minHeight > y.height),
                u = this.originalPosition.left + this.originalSize.width,
                A = this.position.top + this.size.height,
                x = /sw|nw|w/.test(B),
                t = /nw|ne|n/.test(B);
            if (w) {
                y.width = v.minWidth
            }
            if (C) {
                y.height = v.minHeight
            }
            if (D) {
                y.width = v.maxWidth
            }
            if (z) {
                y.height = v.maxHeight
            }
            if (w && x) {
                y.left = u - v.minWidth
            }
            if (D && x) {
                y.left = u - v.maxWidth
            }
            if (C && t) {
                y.top = A - v.minHeight
            }
            if (z && t) {
                y.top = A - v.maxHeight
            }
            if (!y.width && !y.height && !y.left && y.top) {
                y.top = null
            } else {
                if (!y.width && !y.height && !y.top && y.left) {
                    y.left = null
                }
            }
            return y
        },
        _getPaddingPlusBorderDimensions: function(v) {
            var u = 0,
                w = [],
                x = [v.css("borderTopWidth"), v.css("borderRightWidth"), v.css("borderBottomWidth"), v.css("borderLeftWidth")],
                t = [v.css("paddingTop"), v.css("paddingRight"), v.css("paddingBottom"), v.css("paddingLeft")];
            for (; u < 4; u++) {
                w[u] = (parseInt(x[u], 10) || 0);
                w[u] += (parseInt(t[u], 10) || 0)
            }
            return {
                height: w[0] + w[2],
                width: w[1] + w[3]
            }
        },
        _proportionallyResize: function() {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var v, u = 0,
                t = this.helper || this.element;
            for (; u < this._proportionallyResizeElements.length; u++) {
                v = this._proportionallyResizeElements[u];
                if (!this.outerDimensions) {
                    this.outerDimensions = this._getPaddingPlusBorderDimensions(v)
                }
                v.css({
                    height: (t.height() - this.outerDimensions.height) || 0,
                    width: (t.width() - this.outerDimensions.width) || 0
                })
            }
        },
        _renderProxy: function() {
            var t = this.element,
                u = this.options;
            this.elementOffset = t.offset();
            if (this._helper) {
                this.helper = this.helper || f("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++u.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(u, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(v, t) {
                var u = this.originalSize,
                    w = this.originalPosition;
                return {
                    left: w.left + t,
                    width: u.width - t
                }
            },
            n: function(w, u, t) {
                var v = this.originalSize,
                    x = this.originalPosition;
                return {
                    top: x.top + t,
                    height: v.height - t
                }
            },
            s: function(v, u, t) {
                return {
                    height: this.originalSize.height + t
                }
            },
            se: function(v, u, t) {
                return f.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [v, u, t]))
            },
            sw: function(v, u, t) {
                return f.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [v, u, t]))
            },
            ne: function(v, u, t) {
                return f.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [v, u, t]))
            },
            nw: function(v, u, t) {
                return f.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [v, u, t]))
            }
        },
        _propagate: function(u, t) {
            f.ui.plugin.call(this, u, [t, this.ui()]);
            (u !== "resize" && this._trigger(u, t, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    f.ui.plugin.add("resizable", "animate", {
        stop: function(w) {
            var B = f(this).resizable("instance"),
                y = B.options,
                v = B._proportionallyResizeElements,
                t = v.length && (/textarea/i).test(v[0].nodeName),
                u = t && B._hasScroll(v[0], "left") ? 0 : B.sizeDiff.height,
                A = t ? 0 : B.sizeDiff.width,
                x = {
                    width: (B.size.width - A),
                    height: (B.size.height - u)
                },
                z = (parseInt(B.element.css("left"), 10) + (B.position.left - B.originalPosition.left)) || null,
                C = (parseInt(B.element.css("top"), 10) + (B.position.top - B.originalPosition.top)) || null;
            B.element.animate(f.extend(x, C && z ? {
                top: C,
                left: z
            } : {}), {
                duration: y.animateDuration,
                easing: y.animateEasing,
                step: function() {
                    var D = {
                        width: parseInt(B.element.css("width"), 10),
                        height: parseInt(B.element.css("height"), 10),
                        top: parseInt(B.element.css("top"), 10),
                        left: parseInt(B.element.css("left"), 10)
                    };
                    if (v && v.length) {
                        f(v[0]).css({
                            width: D.width,
                            height: D.height
                        })
                    }
                    B._updateCache(D);
                    B._propagate("resize", w)
                }
            })
        }
    });
    f.ui.plugin.add("resizable", "containment", {
        start: function() {
            var B, v, D, t, A, w, E, C = f(this).resizable("instance"),
                z = C.options,
                y = C.element,
                u = z.containment,
                x = (u instanceof f) ? u.get(0) : (/parent/.test(u)) ? y.parent().get(0) : u;
            if (!x) {
                return
            }
            C.containerElement = f(x);
            if (/document/.test(u) || u === document) {
                C.containerOffset = {
                    left: 0,
                    top: 0
                };
                C.containerPosition = {
                    left: 0,
                    top: 0
                };
                C.parentData = {
                    element: f(document),
                    left: 0,
                    top: 0,
                    width: f(document).width(),
                    height: f(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                B = f(x);
                v = [];
                f(["Top", "Right", "Left", "Bottom"]).each(function(G, F) {
                    v[G] = C._num(B.css("padding" + F))
                });
                C.containerOffset = B.offset();
                C.containerPosition = B.position();
                C.containerSize = {
                    height: (B.innerHeight() - v[3]),
                    width: (B.innerWidth() - v[1])
                };
                D = C.containerOffset;
                t = C.containerSize.height;
                A = C.containerSize.width;
                w = (C._hasScroll(x, "left") ? x.scrollWidth : A);
                E = (C._hasScroll(x) ? x.scrollHeight : t);
                C.parentData = {
                    element: x,
                    left: D.left,
                    top: D.top,
                    width: w,
                    height: E
                }
            }
        },
        resize: function(u) {
            var A, F, z, x, B = f(this).resizable("instance"),
                w = B.options,
                D = B.containerOffset,
                C = B.position,
                E = B._aspectRatio || u.shiftKey,
                t = {
                    top: 0,
                    left: 0
                },
                v = B.containerElement,
                y = true;
            if (v[0] !== document && (/static/).test(v.css("position"))) {
                t = D
            }
            if (C.left < (B._helper ? D.left : 0)) {
                B.size.width = B.size.width + (B._helper ? (B.position.left - D.left) : (B.position.left - t.left));
                if (E) {
                    B.size.height = B.size.width / B.aspectRatio;
                    y = false
                }
                B.position.left = w.helper ? D.left : 0
            }
            if (C.top < (B._helper ? D.top : 0)) {
                B.size.height = B.size.height + (B._helper ? (B.position.top - D.top) : B.position.top);
                if (E) {
                    B.size.width = B.size.height * B.aspectRatio;
                    y = false
                }
                B.position.top = B._helper ? D.top : 0
            }
            z = B.containerElement.get(0) === B.element.parent().get(0);
            x = /relative|absolute/.test(B.containerElement.css("position"));
            if (z && x) {
                B.offset.left = B.parentData.left + B.position.left;
                B.offset.top = B.parentData.top + B.position.top
            } else {
                B.offset.left = B.element.offset().left;
                B.offset.top = B.element.offset().top
            }
            A = Math.abs(B.sizeDiff.width + (B._helper ? B.offset.left - t.left : (B.offset.left - D.left)));
            F = Math.abs(B.sizeDiff.height + (B._helper ? B.offset.top - t.top : (B.offset.top - D.top)));
            if (A + B.size.width >= B.parentData.width) {
                B.size.width = B.parentData.width - A;
                if (E) {
                    B.size.height = B.size.width / B.aspectRatio;
                    y = false
                }
            }
            if (F + B.size.height >= B.parentData.height) {
                B.size.height = B.parentData.height - F;
                if (E) {
                    B.size.width = B.size.height * B.aspectRatio;
                    y = false
                }
            }
            if (!y) {
                B.position.left = B.prevPosition.left;
                B.position.top = B.prevPosition.top;
                B.size.width = B.prevSize.width;
                B.size.height = B.prevSize.height
            }
        },
        stop: function() {
            var z = f(this).resizable("instance"),
                u = z.options,
                A = z.containerOffset,
                t = z.containerPosition,
                v = z.containerElement,
                x = f(z.helper),
                C = x.offset(),
                B = x.outerWidth() - z.sizeDiff.width,
                y = x.outerHeight() - z.sizeDiff.height;
            if (z._helper && !u.animate && (/relative/).test(v.css("position"))) {
                f(this).css({
                    left: C.left - t.left - A.left,
                    width: B,
                    height: y
                })
            }
            if (z._helper && !u.animate && (/static/).test(v.css("position"))) {
                f(this).css({
                    left: C.left - t.left - A.left,
                    width: B,
                    height: y
                })
            }
        }
    });
    f.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = f(this).resizable("instance"),
                v = t.options,
                u = function(w) {
                    f(w).each(function() {
                        var x = f(this);
                        x.data("ui-resizable-alsoresize", {
                            width: parseInt(x.width(), 10),
                            height: parseInt(x.height(), 10),
                            left: parseInt(x.css("left"), 10),
                            top: parseInt(x.css("top"), 10)
                        })
                    })
                };
            if (typeof(v.alsoResize) === "object" && !v.alsoResize.parentNode) {
                if (v.alsoResize.length) {
                    v.alsoResize = v.alsoResize[0];
                    u(v.alsoResize)
                } else {
                    f.each(v.alsoResize, function(w) {
                        u(w)
                    })
                }
            } else {
                u(v.alsoResize)
            }
        },
        resize: function(v, x) {
            var u = f(this).resizable("instance"),
                y = u.options,
                w = u.originalSize,
                A = u.originalPosition,
                z = {
                    height: (u.size.height - w.height) || 0,
                    width: (u.size.width - w.width) || 0,
                    top: (u.position.top - A.top) || 0,
                    left: (u.position.left - A.left) || 0
                },
                t = function(B, C) {
                    f(B).each(function() {
                        var F = f(this),
                            G = f(this).data("ui-resizable-alsoresize"),
                            E = {},
                            D = C && C.length ? C : F.parents(x.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        f.each(D, function(H, J) {
                            var I = (G[J] || 0) + (z[J] || 0);
                            if (I && I >= 0) {
                                E[J] = I || null
                            }
                        });
                        F.css(E)
                    })
                };
            if (typeof(y.alsoResize) === "object" && !y.alsoResize.nodeType) {
                f.each(y.alsoResize, function(B, C) {
                    t(B, C)
                })
            } else {
                t(y.alsoResize)
            }
        },
        stop: function() {
            f(this).removeData("resizable-alsoresize")
        }
    });
    f.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var u = f(this).resizable("instance"),
                v = u.options,
                t = u.size;
            u.ghost = u.originalElement.clone();
            u.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: t.height,
                width: t.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof v.ghost === "string" ? v.ghost : "");
            u.ghost.appendTo(u.helper)
        },
        resize: function() {
            var t = f(this).resizable("instance");
            if (t.ghost) {
                t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width
                })
            }
        },
        stop: function() {
            var t = f(this).resizable("instance");
            if (t.ghost && t.helper) {
                t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }
    });
    f.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var w, B = f(this).resizable("instance"),
                F = B.options,
                z = B.size,
                A = B.originalSize,
                C = B.originalPosition,
                K = B.axis,
                t = typeof F.grid === "number" ? [F.grid, F.grid] : F.grid,
                I = (t[0] || 1),
                H = (t[1] || 1),
                y = Math.round((z.width - A.width) / I) * I,
                x = Math.round((z.height - A.height) / H) * H,
                D = A.width + y,
                G = A.height + x,
                v = F.maxWidth && (F.maxWidth < D),
                E = F.maxHeight && (F.maxHeight < G),
                J = F.minWidth && (F.minWidth > D),
                u = F.minHeight && (F.minHeight > G);
            F.grid = t;
            if (J) {
                D += I
            }
            if (u) {
                G += H
            }
            if (v) {
                D -= I
            }
            if (E) {
                G -= H
            }
            if (/^(se|s|e)$/.test(K)) {
                B.size.width = D;
                B.size.height = G
            } else {
                if (/^(ne)$/.test(K)) {
                    B.size.width = D;
                    B.size.height = G;
                    B.position.top = C.top - x
                } else {
                    if (/^(sw)$/.test(K)) {
                        B.size.width = D;
                        B.size.height = G;
                        B.position.left = C.left - y
                    } else {
                        if (G - H <= 0 || D - I <= 0) {
                            w = B._getPaddingPlusBorderDimensions(this)
                        }
                        if (G - H > 0) {
                            B.size.height = G;
                            B.position.top = C.top - x
                        } else {
                            G = H - w.height;
                            B.size.height = G;
                            B.position.top = C.top + A.height - G
                        }
                        if (D - I > 0) {
                            B.size.width = D;
                            B.position.left = C.left - y
                        } else {
                            D = H - w.height;
                            B.size.width = D;
                            B.position.left = C.left + A.width - D
                        }
                    }
                }
            }
        }
    });
    var h = f.ui.resizable;
    /*!
     * jQuery UI Button 1.11.2
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/button/
     */
    ;
    var m, r = "ui-button ui-widget ui-state-default ui-corner-all",
        k = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        b = function() {
            var t = f(this);
            setTimeout(function() {
                t.find(":ui-button").button("refresh")
            }, 1)
        },
        g = function(u) {
            var t = u.name,
                v = u.form,
                w = f([]);
            if (t) {
                t = t.replace(/'/g, "\\'");
                if (v) {
                    w = f(v).find("[name='" + t + "'][type=radio]")
                } else {
                    w = f("[name='" + t + "'][type=radio]", u.ownerDocument).filter(function() {
                        return !this.form
                    })
                }
            }
            return w
        };
    f.widget("ui.button", {
        version: "1.11.2",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, b);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled")
            } else {
                this.element.prop("disabled", this.options.disabled)
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var v = this,
                t = this.options,
                w = this.type === "checkbox" || this.type === "radio",
                u = !w ? "ui-state-active" : "";
            if (t.label === null) {
                t.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                if (t.disabled) {
                    return
                }
                if (this === m) {
                    f(this).addClass("ui-state-active")
                }
            }).bind("mouseleave" + this.eventNamespace, function() {
                if (t.disabled) {
                    return
                }
                f(this).removeClass(u)
            }).bind("click" + this.eventNamespace, function(x) {
                if (t.disabled) {
                    x.preventDefault();
                    x.stopImmediatePropagation()
                }
            });
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            });
            if (w) {
                this.element.bind("change" + this.eventNamespace, function() {
                    v.refresh()
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (t.disabled) {
                        return false
                    }
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function() {
                        if (t.disabled) {
                            return false
                        }
                        f(this).addClass("ui-state-active");
                        v.buttonElement.attr("aria-pressed", "true");
                        var x = v.element[0];
                        g(x).not(x).map(function() {
                            return f(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", "false")
                    })
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                        if (t.disabled) {
                            return false
                        }
                        f(this).addClass("ui-state-active");
                        m = this;
                        v.document.one("mouseup", function() {
                            m = null
                        })
                    }).bind("mouseup" + this.eventNamespace, function() {
                        if (t.disabled) {
                            return false
                        }
                        f(this).removeClass("ui-state-active")
                    }).bind("keydown" + this.eventNamespace, function(x) {
                        if (t.disabled) {
                            return false
                        }
                        if (x.keyCode === f.ui.keyCode.SPACE || x.keyCode === f.ui.keyCode.ENTER) {
                            f(this).addClass("ui-state-active")
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                        f(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function(x) {
                            if (x.keyCode === f.ui.keyCode.SPACE) {
                                f(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", t.disabled);
            this._resetButton()
        },
        _determineButtonType: function() {
            var t, v, u;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox"
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                t = this.element.parents().last();
                v = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = t.find(v);
                if (!this.buttonElement.length) {
                    t = t.length ? t.siblings() : this.element.siblings();
                    this.buttonElement = t.filter(v);
                    if (!this.buttonElement.length) {
                        this.buttonElement = t.find(v)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                u = this.element.is(":checked");
                if (u) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.prop("aria-pressed", u)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(r + " ui-state-active " + k).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
        },
        _setOption: function(t, u) {
            this._super(t, u);
            if (t === "disabled") {
                this.widget().toggleClass("ui-state-disabled", !!u);
                this.element.prop("disabled", !!u);
                if (u) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        this.buttonElement.removeClass("ui-state-focus")
                    } else {
                        this.buttonElement.removeClass("ui-state-focus ui-state-active")
                    }
                }
                return
            }
            this._resetButton()
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (t !== this.options.disabled) {
                this._setOption("disabled", t)
            }
            if (this.type === "radio") {
                g(this.element[0]).each(function() {
                    if (f(this).is(":checked")) {
                        f(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        f(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                }
            }
        },
        _resetButton: function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var x = this.buttonElement.removeClass(k),
                v = f("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(x.empty()).text(),
                u = this.options.icons,
                t = u.primary && u.secondary,
                w = [];
            if (u.primary || u.secondary) {
                if (this.options.text) {
                    w.push("ui-button-text-icon" + (t ? "s" : (u.primary ? "-primary" : "-secondary")))
                }
                if (u.primary) {
                    x.prepend("<span class='ui-button-icon-primary ui-icon " + u.primary + "'></span>")
                }
                if (u.secondary) {
                    x.append("<span class='ui-button-icon-secondary ui-icon " + u.secondary + "'></span>")
                }
                if (!this.options.text) {
                    w.push(t ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        x.attr("title", f.trim(v))
                    }
                }
            } else {
                w.push("ui-button-text-only")
            }
            x.addClass(w.join(" "))
        }
    });
    f.widget("ui.buttonset", {
        version: "1.11.2",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(t, u) {
            if (t === "disabled") {
                this.buttons.button("option", t, u)
            }
            this._super(t, u)
        },
        refresh: function() {
            var u = this.element.css("direction") === "rtl",
                t = this.element.find(this.options.items),
                v = t.filter(":ui-button");
            t.not(":ui-button").button();
            v.button("refresh");
            this.buttons = t.map(function() {
                return f(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(u ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(u ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return f(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    });
    var a = f.ui.button;;
    var q = f.widget("ui.dialog", {
        version: "1.11.2",
        options: {
            appendTo: "body",
            autoOpen: true,
            buttons: [],
            closeOnEscape: true,
            closeText: "Close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(u) {
                    var t = f(this).css(u).offset().top;
                    if (t < 0) {
                        f(this).css("top", u.top - t)
                    }
                }
            },
            resizable: true,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: true,
            height: true,
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true,
            width: true
        },
        resizableRelatedOptions: {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable && f.fn.draggable) {
                this._makeDraggable()
            }
            if (this.options.resizable && f.fn.resizable) {
                this._makeResizable()
            }
            this._isOpen = false;
            this._trackFocus()
        },
        _init: function() {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            if (t && (t.jquery || t.nodeType)) {
                return f(t)
            }
            return this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var u, t = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle)
            }
            u = t.parent.children().eq(t.index);
            if (u.length && u[0] !== this.element[0]) {
                u.before(this.element)
            } else {
                t.parent.append(this.element)
            }
        },
        widget: function() {
            return this.uiDialog
        },
        disable: f.noop,
        enable: f.noop,
        close: function(w) {
            var v, u = this;
            if (!this._isOpen || this._trigger("beforeClose", w) === false) {
                return
            }
            this._isOpen = false;
            this._focusedElement = null;
            this._destroyOverlay();
            this._untrackInstance();
            if (!this.opener.filter(":focusable").focus().length) {
                try {
                    v = this.document[0].activeElement;
                    if (v && v.nodeName.toLowerCase() !== "body") {
                        f(v).blur()
                    }
                } catch (t) {}
            }
            this._hide(this.uiDialog, this.options.hide, function() {
                u._trigger("close", w)
            })
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(x, u) {
            var w = false,
                t = this.uiDialog.siblings(".ui-front:visible").map(function() {
                    return +f(this).css("z-index")
                }).get(),
                v = Math.max.apply(null, t);
            if (v >= +this.uiDialog.css("z-index")) {
                this.uiDialog.css("z-index", v + 1);
                w = true
            }
            if (w && !u) {
                this._trigger("focus", x)
            }
            return w
        },
        open: function() {
            var t = this;
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable()
                }
                return
            }
            this._isOpen = true;
            this.opener = f(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            if (this.overlay) {
                this.overlay.css("z-index", this.uiDialog.css("z-index") - 1)
            }
            this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable();
                t._trigger("focus")
            });
            this._makeFocusTarget();
            this._trigger("open")
        },
        _focusTabbable: function() {
            var t = this._focusedElement;
            if (!t) {
                t = this.element.find("[autofocus]")
            }
            if (!t.length) {
                t = this.element.find(":tabbable")
            }
            if (!t.length) {
                t = this.uiDialogButtonPane.find(":tabbable")
            }
            if (!t.length) {
                t = this.uiDialogTitlebarClose.filter(":tabbable")
            }
            if (!t.length) {
                t = this.uiDialog
            }
            t.eq(0).focus()
        },
        _keepFocus: function(t) {
            function u() {
                var w = this.document[0].activeElement,
                    v = this.uiDialog[0] === w || f.contains(this.uiDialog[0], w);
                if (!v) {
                    this._focusTabbable()
                }
            }
            t.preventDefault();
            u.call(this);
            this._delay(u)
        },
        _createWrapper: function() {
            this.uiDialog = f("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function(v) {
                    if (this.options.closeOnEscape && !v.isDefaultPrevented() && v.keyCode && v.keyCode === f.ui.keyCode.ESCAPE) {
                        v.preventDefault();
                        this.close(v);
                        return
                    }
                    if (v.keyCode !== f.ui.keyCode.TAB || v.isDefaultPrevented()) {
                        return
                    }
                    var u = this.uiDialog.find(":tabbable"),
                        w = u.filter(":first"),
                        t = u.filter(":last");
                    if ((v.target === t[0] || v.target === this.uiDialog[0]) && !v.shiftKey) {
                        this._delay(function() {
                            w.focus()
                        });
                        v.preventDefault()
                    } else {
                        if ((v.target === w[0] || v.target === this.uiDialog[0]) && v.shiftKey) {
                            this._delay(function() {
                                t.focus()
                            });
                            v.preventDefault()
                        }
                    }
                },
                mousedown: function(t) {
                    if (this._moveToTop(t)) {
                        this._focusTabbable()
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            }
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = f("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function(u) {
                    if (!f(u.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus()
                    }
                }
            });
            this.uiDialogTitlebarClose = f("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: false
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function(u) {
                    u.preventDefault();
                    this.close(u)
                }
            });
            t = f("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(t);
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(t) {
            if (!this.options.title) {
                t.html("&#160;")
            }
            t.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = f("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = f("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function() {
            var u = this,
                t = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if (f.isEmptyObject(t) || (f.isArray(t) && !t.length)) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return
            }
            f.each(t, function(v, w) {
                var x, y;
                w = f.isFunction(w) ? {
                    click: w,
                    text: v
                } : w;
                w = f.extend({
                    type: "button"
                }, w);
                x = w.click;
                w.click = function() {
                    x.apply(u.element[0], arguments)
                };
                y = {
                    icons: w.icons,
                    text: w.showText
                };
                delete w.icons;
                delete w.showText;
                f("<button></button>", w).button(y).appendTo(u.uiButtonSet)
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function() {
            var v = this,
                u = this.options;

            function t(w) {
                return {
                    position: w.position,
                    offset: w.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(w, x) {
                    f(this).addClass("ui-dialog-dragging");
                    v._blockFrames();
                    v._trigger("dragStart", w, t(x))
                },
                drag: function(w, x) {
                    v._trigger("drag", w, t(x))
                },
                stop: function(w, x) {
                    var z = x.offset.left - v.document.scrollLeft(),
                        y = x.offset.top - v.document.scrollTop();
                    u.position = {
                        my: "left top",
                        at: "left" + (z >= 0 ? "+" : "") + z + " top" + (y >= 0 ? "+" : "") + y,
                        of: v.window
                    };
                    f(this).removeClass("ui-dialog-dragging");
                    v._unblockFrames();
                    v._trigger("dragStop", w, t(x))
                }
            })
        },
        _makeResizable: function() {
            var y = this,
                w = this.options,
                x = w.resizable,
                t = this.uiDialog.css("position"),
                v = typeof x === "string" ? x : "n,e,s,w,se,sw,ne,nw";

            function u(z) {
                return {
                    originalPosition: z.originalPosition,
                    originalSize: z.originalSize,
                    position: z.position,
                    size: z.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: w.maxWidth,
                maxHeight: w.maxHeight,
                minWidth: w.minWidth,
                minHeight: this._minHeight(),
                handles: v,
                start: function(z, A) {
                    f(this).addClass("ui-dialog-resizing");
                    y._blockFrames();
                    y._trigger("resizeStart", z, u(A))
                },
                resize: function(z, A) {
                    y._trigger("resize", z, u(A))
                },
                stop: function(z, A) {
                    var D = y.uiDialog.offset(),
                        C = D.left - y.document.scrollLeft(),
                        B = D.top - y.document.scrollTop();
                    w.height = y.uiDialog.height();
                    w.width = y.uiDialog.width();
                    w.position = {
                        my: "left top",
                        at: "left" + (C >= 0 ? "+" : "") + C + " top" + (B >= 0 ? "+" : "") + B,
                        of: y.window
                    };
                    f(this).removeClass("ui-dialog-resizing");
                    y._unblockFrames();
                    y._trigger("resizeStop", z, u(A))
                }
            }).css("position", t)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget();
                    this._focusedElement = f(t.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance();
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var u = this._trackingInstances(),
                t = f.inArray(this, u);
            if (t !== -1) {
                u.splice(t, 1)
            }
        },
        _trackingInstances: function() {
            var t = this.document.data("ui-dialog-instances");
            if (!t) {
                t = [];
                this.document.data("ui-dialog-instances", t)
            }
            return t
        },
        _minHeight: function() {
            var t = this.options;
            return t.height === "auto" ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            if (!t) {
                this.uiDialog.show()
            }
            this.uiDialog.position(this.options.position);
            if (!t) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function(v) {
            var w = this,
                u = false,
                t = {};
            f.each(v, function(x, y) {
                w._setOption(x, y);
                if (x in w.sizeRelatedOptions) {
                    u = true
                }
                if (x in w.resizableRelatedOptions) {
                    t[x] = y
                }
            });
            if (u) {
                this._size();
                this._position()
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", t)
            }
        },
        _setOption: function(v, w) {
            var u, x, t = this.uiDialog;
            if (v === "dialogClass") {
                t.removeClass(this.options.dialogClass).addClass(w)
            }
            if (v === "disabled") {
                return
            }
            this._super(v, w);
            if (v === "appendTo") {
                this.uiDialog.appendTo(this._appendTo())
            }
            if (v === "buttons") {
                this._createButtons()
            }
            if (v === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label: "" + w
                })
            }
            if (v === "draggable") {
                u = t.is(":data(ui-draggable)");
                if (u && !w) {
                    t.draggable("destroy")
                }
                if (!u && w) {
                    this._makeDraggable()
                }
            }
            if (v === "position") {
                this._position()
            }
            if (v === "resizable") {
                x = t.is(":data(ui-resizable)");
                if (x && !w) {
                    t.resizable("destroy")
                }
                if (x && typeof w === "string") {
                    t.resizable("option", "handles", w)
                }
                if (!x && w !== false) {
                    this._makeResizable()
                }
            }
            if (v === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
            }
        },
        _size: function() {
            var t, v, w, u = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            if (u.minWidth > u.width) {
                u.width = u.minWidth
            }
            t = this.uiDialog.css({
                height: "auto",
                width: u.width
            }).outerHeight();
            v = Math.max(0, u.minHeight - t);
            w = typeof u.maxHeight === "number" ? Math.max(0, u.maxHeight - t) : "none";
            if (u.height === "auto") {
                this.element.css({
                    minHeight: v,
                    maxHeight: w,
                    height: "auto"
                })
            } else {
                this.element.height(Math.max(0, u.height - t))
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = f(this);
                return f("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _allowInteraction: function(t) {
            if (f(t.target).closest(".ui-dialog").length) {
                return true
            }
            return !!f(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (!this.options.modal) {
                return
            }
            var t = true;
            this._delay(function() {
                t = false
            });
            if (!this.document.data("ui-dialog-overlays")) {
                this._on(this.document, {
                    focusin: function(u) {
                        if (t) {
                            return
                        }
                        if (!this._allowInteraction(u)) {
                            u.preventDefault();
                            this._trackingInstances()[0]._focusTabbable()
                        }
                    }
                })
            }
            this.overlay = f("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
        },
        _destroyOverlay: function() {
            if (!this.options.modal) {
                return
            }
            if (this.overlay) {
                var t = this.document.data("ui-dialog-overlays") - 1;
                if (!t) {
                    this.document.unbind("focusin").removeData("ui-dialog-overlays")
                } else {
                    this.document.data("ui-dialog-overlays", t)
                }
                this.overlay.remove();
                this.overlay = null
            }
        }
    })
}));;
var mejs = mejs || {};
mejs.version = "2.16.3";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "application/x-mpegURL"]
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function(a) {
        return encodeURIComponent(a)
    },
    escapeHTML: function(a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(a) {
        var b = document.createElement("div");
        b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>';
        return b.firstChild.href
    },
    getScriptPath: function(o) {
        var l = 0,
            g, m = "",
            c = "",
            h, e, b, a, d, f = document.getElementsByTagName("script"),
            n = f.length,
            k = o.length;
        for (; l < n; l++) {
            b = f[l].src;
            h = b.lastIndexOf("/");
            if (h > -1) {
                d = b.substring(h + 1);
                a = b.substring(0, h + 1)
            } else {
                d = b;
                a = ""
            }
            for (g = 0; g < k; g++) {
                c = o[g];
                e = d.indexOf(c);
                if (e > -1) {
                    m = a;
                    break
                }
            }
            if (m !== "") {
                break
            }
        }
        return m
    },
    secondsToTimeCode: function(c, g, a, b) {
        if (typeof a == "undefined") {
            a = false
        } else {
            if (typeof b == "undefined") {
                b = 25
            }
        }
        var f = Math.floor(c / 3600) % 24,
            d = Math.floor(c / 60) % 60,
            h = Math.floor(c % 60),
            e = Math.floor(((c % 1) * b).toFixed(3)),
            j = ((g || f > 0) ? (f < 10 ? "0" + f : f) + ":" : "") + (d < 10 ? "0" + d : d) + ":" + (h < 10 ? "0" + h : h) + ((a) ? ":" + (e < 10 ? "0" + e : e) : "");
        return j
    },
    timeCodeToSeconds: function(c, k, d, e) {
        if (typeof d == "undefined") {
            d = false
        } else {
            if (typeof e == "undefined") {
                e = 25
            }
        }
        var f = c.split(":"),
            a = parseInt(f[0], 10),
            b = parseInt(f[1], 10),
            h = parseInt(f[2], 10),
            j = 0,
            g = 0;
        if (d) {
            j = parseInt(f[3]) / e
        }
        g = (a * 3600) + (b * 60) + h + j;
        return g
    },
    convertSMPTEtoSeconds: function(a) {
        if (typeof a != "string") {
            return false
        }
        a = a.replace(",", ".");
        var d = 0,
            b = (a.indexOf(".") != -1) ? a.split(".")[1].length : 0,
            e = 1;
        a = a.split(":").reverse();
        for (var c = 0; c < a.length; c++) {
            e = 1;
            if (c > 0) {
                e = Math.pow(60, c)
            }
            d += Number(a[c]) * e
        }
        return Number(d.toFixed(b))
    },
    removeSwf: function(b) {
        var a = document.getElementById(b);
        if (a && /object|embed/i.test(a.nodeName)) {
            if (mejs.MediaFeatures.isIE) {
                a.style.display = "none";
                (function() {
                    if (a.readyState == 4) {
                        mejs.Utility.removeObjectInIE(b)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                a.parentNode.removeChild(a)
            }
        }
    },
    removeObjectInIE: function(c) {
        var b = document.getElementById(c);
        if (b) {
            for (var a in b) {
                if (typeof b[a] == "function") {
                    b[a] = null
                }
            }
            b.parentNode.removeChild(b)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function(c, a) {
        var b = this.plugins[c];
        a[1] = a[1] || 0;
        a[2] = a[2] || 0;
        return (b[0] > a[0] || (b[0] == a[0] && b[1] > a[1]) || (b[0] == a[0] && b[1] == a[1] && b[2] >= a[2])) ? true : false
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(d, c, e, a, b) {
        this.plugins[d] = this.detectPlugin(c, e, a, b)
    },
    detectPlugin: function(g, b, c, k) {
        var h = [0, 0, 0],
            j, d, a;
        if (typeof(this.nav.plugins) != "undefined" && typeof this.nav.plugins[g] == "object") {
            j = this.nav.plugins[g].description;
            if (j && !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[b] && !this.nav.mimeTypes[b].enabledPlugin)) {
                h = j.replace(g, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
                for (d = 0; d < h.length; d++) {
                    h[d] = parseInt(h[d].match(/\d+/), 10)
                }
            }
        } else {
            if (typeof(window.ActiveXObject) != "undefined") {
                try {
                    a = new ActiveXObject(c);
                    if (a) {
                        h = k(a)
                    }
                } catch (f) {}
            }
        }
        return h
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(b) {
    var a = [],
        c = b.GetVariable("$version");
    if (c) {
        c = c.split(" ")[1].split(",");
        a = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]
    }
    return a
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(b) {
    var a = [0, 0, 0, 0],
        c = function(f, d, e, g) {
            while (f.isVersionSupported(d[0] + "." + d[1] + "." + d[2] + "." + d[3])) {
                d[e] += g
            }
            d[e] -= g
        };
    c(b, a, 0, 1);
    c(b, a, 1, 1);
    c(b, a, 2, 10000);
    c(b, a, 2, 1000);
    c(b, a, 2, 100);
    c(b, a, 2, 10);
    c(b, a, 2, 1);
    c(b, a, 3, 1);
    return a
});
mejs.MediaFeatures = {
    init: function() {
        var f = this,
            k = document,
            j = mejs.PluginDetector.nav,
            c = mejs.PluginDetector.ua.toLowerCase(),
            b, a, g = ["source", "track", "audio", "video"];
        f.isiPad = (c.match(/ipad/i) !== null);
        f.isiPhone = (c.match(/iphone/i) !== null);
        f.isiOS = f.isiPhone || f.isiPad;
        f.isAndroid = (c.match(/android/i) !== null);
        f.isBustedAndroid = (c.match(/android 2\.[12]/) !== null);
        f.isBustedNativeHTTPS = (location.protocol === "https:" && (c.match(/android [12]\./) !== null || c.match(/macintosh.* version.* safari/) !== null));
        f.isIE = (j.appName.toLowerCase().indexOf("microsoft") != -1 || j.appName.toLowerCase().match(/trident/gi) !== null);
        f.isChrome = (c.match(/chrome/gi) !== null);
        f.isChromium = (c.match(/chromium/gi) !== null);
        f.isFirefox = (c.match(/firefox/gi) !== null);
        f.isWebkit = (c.match(/webkit/gi) !== null);
        f.isGecko = (c.match(/gecko/gi) !== null) && !f.isWebkit && !f.isIE;
        f.isOpera = (c.match(/opera/gi) !== null);
        f.hasTouch = ("ontouchstart" in window);
        f.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (b = 0; b < g.length; b++) {
            a = document.createElement(g[b])
        }
        f.supportsMediaTag = (typeof a.canPlayType !== "undefined" || f.isBustedAndroid);
        try {
            a.canPlayType("video/mp4")
        } catch (h) {
            f.supportsMediaTag = false
        }
        f.hasSemiNativeFullScreen = (typeof a.webkitEnterFullscreen !== "undefined");
        f.hasNativeFullscreen = (typeof a.requestFullscreen !== "undefined");
        f.hasWebkitNativeFullScreen = (typeof a.webkitRequestFullScreen !== "undefined");
        f.hasMozNativeFullScreen = (typeof a.mozRequestFullScreen !== "undefined");
        f.hasMsNativeFullScreen = (typeof a.msRequestFullscreen !== "undefined");
        f.hasTrueNativeFullScreen = (f.hasWebkitNativeFullScreen || f.hasMozNativeFullScreen || f.hasMsNativeFullScreen);
        f.nativeFullScreenEnabled = f.hasTrueNativeFullScreen;
        if (f.hasMozNativeFullScreen) {
            f.nativeFullScreenEnabled = document.mozFullScreenEnabled
        } else {
            if (f.hasMsNativeFullScreen) {
                f.nativeFullScreenEnabled = document.msFullscreenEnabled
            }
        }
        if (f.isChrome) {
            f.hasSemiNativeFullScreen = false
        }
        if (f.hasTrueNativeFullScreen) {
            f.fullScreenEventName = "";
            if (f.hasWebkitNativeFullScreen) {
                f.fullScreenEventName = "webkitfullscreenchange"
            } else {
                if (f.hasMozNativeFullScreen) {
                    f.fullScreenEventName = "mozfullscreenchange"
                } else {
                    if (f.hasMsNativeFullScreen) {
                        f.fullScreenEventName = "MSFullscreenChange"
                    }
                }
            }
            f.isFullScreen = function() {
                if (f.hasMozNativeFullScreen) {
                    return k.mozFullScreen
                } else {
                    if (f.hasWebkitNativeFullScreen) {
                        return k.webkitIsFullScreen
                    } else {
                        if (f.hasMsNativeFullScreen) {
                            return k.msFullscreenElement !== null
                        }
                    }
                }
            };
            f.requestFullScreen = function(d) {
                if (f.hasWebkitNativeFullScreen) {
                    d.webkitRequestFullScreen()
                } else {
                    if (f.hasMozNativeFullScreen) {
                        d.mozRequestFullScreen()
                    } else {
                        if (f.hasMsNativeFullScreen) {
                            d.msRequestFullscreen()
                        }
                    }
                }
            };
            f.cancelFullScreen = function() {
                if (f.hasWebkitNativeFullScreen) {
                    document.webkitCancelFullScreen()
                } else {
                    if (f.hasMozNativeFullScreen) {
                        document.mozCancelFullScreen()
                    } else {
                        if (f.hasMsNativeFullScreen) {
                            document.msExitFullscreen()
                        }
                    }
                }
            }
        }
        if (f.hasSemiNativeFullScreen && c.match(/mac os x 10_5/i)) {
            f.hasNativeFullScreen = false;
            f.hasSemiNativeFullScreen = false
        }
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: false,
    setCurrentTime: function(a) {
        this.currentTime = a
    },
    setMuted: function(a) {
        this.muted = a
    },
    setVolume: function(a) {
        this.volume = a
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(a) {
        var c = this.getElementsByTagName("source");
        while (c.length > 0) {
            this.removeChild(c[0])
        }
        if (typeof a == "string") {
            this.src = a
        } else {
            var b, d;
            for (b = 0; b < a.length; b++) {
                d = a[b];
                if (this.canPlayType(d.type)) {
                    this.src = d.src;
                    break
                }
            }
        }
    },
    setVideoSize: function(b, a) {
        this.width = b;
        this.height = a
    }
};
mejs.PluginMediaElement = function(b, c, a) {
    this.id = b;
    this.pluginType = c;
    this.src = a;
    this.events = {};
    this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: false,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: true,
    ended: false,
    seeking: false,
    duration: 0,
    error: null,
    tagName: "",
    muted: false,
    volume: 1,
    currentTime: 0,
    play: function() {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube" || this.pluginType == "vimeo") {
                this.pluginApi.playVideo()
            } else {
                this.pluginApi.playMedia()
            }
            this.paused = false
        }
    },
    load: function() {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube" || this.pluginType == "vimeo") {} else {
                this.pluginApi.loadMedia()
            }
            this.paused = false
        }
    },
    pause: function() {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube" || this.pluginType == "vimeo") {
                this.pluginApi.pauseVideo()
            } else {
                this.pluginApi.pauseMedia()
            }
            this.paused = true
        }
    },
    stop: function() {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube" || this.pluginType == "vimeo") {
                this.pluginApi.stopVideo()
            } else {
                this.pluginApi.stopMedia()
            }
            this.paused = true
        }
    },
    canPlayType: function(e) {
        var d, c, a, b = mejs.plugins[this.pluginType];
        for (d = 0; d < b.length; d++) {
            a = b[d];
            if (mejs.PluginDetector.hasPluginVersion(this.pluginType, a.version)) {
                for (c = 0; c < a.types.length; c++) {
                    if (e == a.types[c]) {
                        return "probably"
                    }
                }
            }
        }
        return ""
    },
    positionFullscreenButton: function(a, c, b) {
        if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
            this.pluginApi.positionFullscreenButton(Math.floor(a), Math.floor(c), b)
        }
    },
    hideFullscreenButton: function() {
        if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
            this.pluginApi.hideFullscreenButton()
        }
    },
    setSrc: function(a) {
        if (typeof a == "string") {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a));
            this.src = mejs.Utility.absolutizeUrl(a)
        } else {
            var b, c;
            for (b = 0; b < a.length; b++) {
                c = a[b];
                if (this.canPlayType(c.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
                    this.src = mejs.Utility.absolutizeUrl(a);
                    break
                }
            }
        }
    },
    setCurrentTime: function(a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube" || this.pluginType == "vimeo") {
                this.pluginApi.seekTo(a)
            } else {
                this.pluginApi.setCurrentTime(a)
            }
            this.currentTime = a
        }
    },
    setVolume: function(a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube") {
                this.pluginApi.setVolume(a * 100)
            } else {
                this.pluginApi.setVolume(a)
            }
            this.volume = a
        }
    },
    setMuted: function(a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube") {
                if (a) {
                    this.pluginApi.mute()
                } else {
                    this.pluginApi.unMute()
                }
                this.muted = a;
                this.dispatchEvent("volumechange")
            } else {
                this.pluginApi.setMuted(a)
            }
            this.muted = a
        }
    },
    setVideoSize: function(b, a) {
        if (this.pluginElement && this.pluginElement.style) {
            this.pluginElement.style.width = b + "px";
            this.pluginElement.style.height = a + "px"
        }
        if (this.pluginApi != null && this.pluginApi.setVideoSize) {
            this.pluginApi.setVideoSize(b, a)
        }
    },
    setFullscreen: function(a) {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.pluginApi.setFullscreen(a)
        }
    },
    enterFullScreen: function() {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(true)
        }
    },
    exitFullScreen: function() {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(false)
        }
    },
    addEventListener: function(b, c, a) {
        this.events[b] = this.events[b] || [];
        this.events[b].push(c)
    },
    removeEventListener: function(a, d) {
        if (!a) {
            this.events = {};
            return true
        }
        var c = this.events[a];
        if (!c) {
            return true
        }
        if (!d) {
            this.events[a] = [];
            return true
        }
        for (var b = 0; b < c.length; b++) {
            if (c[b] === d) {
                this.events[a].splice(b, 1);
                return true
            }
        }
        return false
    },
    dispatchEvent: function(a) {
        var c, b, d = this.events[a];
        if (d) {
            b = Array.prototype.slice.call(arguments, 1);
            for (c = 0; c < d.length; c++) {
                d[c].apply(this, b)
            }
        }
    },
    hasAttribute: function(a) {
        return (a in this.attributes)
    },
    removeAttribute: function(a) {
        delete this.attributes[a]
    },
    getAttribute: function(a) {
        if (this.hasAttribute(a)) {
            return this.attributes[a]
        }
        return ""
    },
    setAttribute: function(a, b) {
        this.attributes[a] = b
    },
    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id);
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(c, a, b) {
        this.pluginMediaElements[c] = a;
        this.htmlMediaElements[c] = b
    },
    unregisterPluginElement: function(a) {
        delete this.pluginMediaElements[a];
        delete this.htmlMediaElements[a]
    },
    initPlugin: function(c) {
        var a = this.pluginMediaElements[c],
            b = this.htmlMediaElements[c];
        if (a) {
            switch (a.pluginType) {
                case "flash":
                    a.pluginElement = a.pluginApi = document.getElementById(c);
                    break;
                case "silverlight":
                    a.pluginElement = document.getElementById(a.id);
                    a.pluginApi = a.pluginElement.Content.MediaElementJS;
                    break
            }
            if (a.pluginApi != null && a.success) {
                a.success(a, b)
            }
        }
    },
    fireEvent: function(h, c, b) {
        var g, f, a, d = this.pluginMediaElements[h];
        if (!d) {
            return
        }
        g = {
            type: c,
            target: d
        };
        for (f in b) {
            d[f] = b[f];
            g[f] = b[f]
        }
        a = b.bufferedTime || 0;
        g.target.buffered = g.buffered = {
            start: function(e) {
                return 0
            },
            end: function(e) {
                return a
            },
            length: 1
        };
        d.dispatchEvent(g.type, g)
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: false,
    httpsBasicAuthSite: false,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: false,
    enablePseudoStreaming: false,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function() {},
    error: function() {}
};
mejs.MediaElement = function(a, b) {
    return mejs.HtmlMediaElementShim.create(a, b)
};
mejs.HtmlMediaElementShim = {
    create: function(e, d) {
        var n = mejs.MediaElementDefaults,
            k = (typeof(e) == "string") ? document.getElementById(e) : e,
            h = k.tagName.toLowerCase(),
            g = (h === "audio" || h === "video"),
            b = (g) ? k.getAttribute("src") : k.getAttribute("href"),
            l = k.getAttribute("poster"),
            f = k.getAttribute("autoplay"),
            j = k.getAttribute("preload"),
            m = k.getAttribute("controls"),
            a, c;
        for (c in d) {
            n[c] = d[c]
        }
        b = (typeof b == "undefined" || b === null || b == "") ? null : b;
        l = (typeof l == "undefined" || l === null) ? "" : l;
        j = (typeof j == "undefined" || j === null || j === "false") ? "none" : j;
        f = !(typeof f == "undefined" || f === null || f === "false");
        m = !(typeof m == "undefined" || m === null || m === "false");
        a = this.determinePlayback(k, n, mejs.MediaFeatures.supportsMediaTag, g, b);
        a.url = (a.url !== null) ? mejs.Utility.absolutizeUrl(a.url) : "";
        if (a.method == "native") {
            if (mejs.MediaFeatures.isBustedAndroid) {
                k.src = a.url;
                k.addEventListener("click", function() {
                    k.play()
                }, false)
            }
            return this.updateNative(a, n, f, j)
        } else {
            if (a.method !== "") {
                return this.createPlugin(a, n, l, f, j, m)
            } else {
                this.createErrorMessage(a, n, l);
                return this
            }
        }
    },
    determinePlayback: function(t, c, h, v, f) {
        var o = [],
            s, r, q, p, m, d, g = {
                method: "",
                url: "",
                htmlMediaElement: t,
                isVideo: (t.tagName.toLowerCase() != "audio")
            },
            a, b, u, w, e;
        if (typeof c.type != "undefined" && c.type !== "") {
            if (typeof c.type == "string") {
                o.push({
                    type: c.type,
                    url: f
                })
            } else {
                for (s = 0; s < c.type.length; s++) {
                    o.push({
                        type: c.type[s],
                        url: f
                    })
                }
            }
        } else {
            if (f !== null) {
                d = this.formatType(f, t.getAttribute("type"));
                o.push({
                    type: d,
                    url: f
                })
            } else {
                for (s = 0; s < t.childNodes.length; s++) {
                    m = t.childNodes[s];
                    if (m.nodeType == 1 && m.tagName.toLowerCase() == "source") {
                        f = m.getAttribute("src");
                        d = this.formatType(f, m.getAttribute("type"));
                        e = m.getAttribute("media");
                        if (!e || !window.matchMedia || (window.matchMedia && window.matchMedia(e).matches)) {
                            o.push({
                                type: d,
                                url: f
                            })
                        }
                    }
                }
            }
        }
        if (!v && o.length > 0 && o[0].url !== null && this.getTypeFromFile(o[0].url).indexOf("audio") > -1) {
            g.isVideo = false
        }
        if (mejs.MediaFeatures.isBustedAndroid) {
            t.canPlayType = function(j) {
                return (j.match(/video\/(mp4|m4v)/gi) !== null) ? "maybe" : ""
            }
        }
        if (mejs.MediaFeatures.isChromium) {
            t.canPlayType = function(j) {
                return (j.match(/video\/(webm|ogv|ogg)/gi) !== null) ? "maybe" : ""
            }
        }
        if (h && (c.mode === "auto" || c.mode === "auto_plugin" || c.mode === "native") && !(mejs.MediaFeatures.isBustedNativeHTTPS && c.httpsBasicAuthSite === true)) {
            if (!v) {
                w = document.createElement(g.isVideo ? "video" : "audio");
                t.parentNode.insertBefore(w, t);
                t.style.display = "none";
                g.htmlMediaElement = t = w
            }
            for (s = 0; s < o.length; s++) {
                if (o[s].type == "video/m3u8" || t.canPlayType(o[s].type).replace(/no/, "") !== "" || t.canPlayType(o[s].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "" || t.canPlayType(o[s].type.replace(/m4a/, "mp4")).replace(/no/, "") !== "") {
                    g.method = "native";
                    g.url = o[s].url;
                    break
                }
            }
            if (g.method === "native") {
                if (g.url !== null) {
                    t.src = g.url
                }
                if (c.mode !== "auto_plugin") {
                    return g
                }
            }
        }
        if (c.mode === "auto" || c.mode === "auto_plugin" || c.mode === "shim") {
            for (s = 0; s < o.length; s++) {
                d = o[s].type;
                for (r = 0; r < c.plugins.length; r++) {
                    a = c.plugins[r];
                    b = mejs.plugins[a];
                    for (q = 0; q < b.length; q++) {
                        u = b[q];
                        if (u.version == null || mejs.PluginDetector.hasPluginVersion(a, u.version)) {
                            for (p = 0; p < u.types.length; p++) {
                                if (d == u.types[p]) {
                                    g.method = a;
                                    g.url = o[s].url;
                                    return g
                                }
                            }
                        }
                    }
                }
            }
        }
        if (c.mode === "auto_plugin" && g.method === "native") {
            return g
        }
        if (g.method === "" && o.length > 0) {
            g.url = o[0].url
        }
        return g
    },
    formatType: function(a, c) {
        var b;
        if (a && !c) {
            return this.getTypeFromFile(a)
        } else {
            if (c && ~c.indexOf(";")) {
                return c.substr(0, c.indexOf(";"))
            } else {
                return c
            }
        }
    },
    getTypeFromFile: function(a) {
        a = a.split("?")[0];
        var b = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b) ? "video" : "audio") + "/" + this.getTypeFromExtension(b)
    },
    getTypeFromExtension: function(a) {
        switch (a) {
            case "mp4":
            case "m4v":
            case "m4a":
                return "mp4";
            case "webm":
            case "webma":
            case "webmv":
                return "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return "ogg";
            default:
                return a
        }
    },
    createErrorMessage: function(c, b, g) {
        var d = c.htmlMediaElement,
            a = document.createElement("div");
        a.className = "me-cannotplay";
        try {
            a.style.width = d.width + "px";
            a.style.height = d.height + "px"
        } catch (f) {}
        if (b.customError) {
            a.innerHTML = b.customError
        } else {
            a.innerHTML = (g !== "") ? '<a href="' + c.url + '"><img src="' + g + '" width="100%" height="100%" /></a>' : '<a href="' + c.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>"
        }
        d.parentNode.insertBefore(a, d);
        d.style.display = "none";
        b.error(d)
    },
    createPlugin: function(n, a, c, e, d, h) {
        var s = n.htmlMediaElement,
            m = 1,
            l = 1,
            u = "me_" + n.method + "_" + (mejs.meIndex++),
            o = new mejs.PluginMediaElement(u, n.method, n.url),
            g = document.createElement("div"),
            b, p, j;
        o.tagName = s.tagName;
        for (var r = 0; r < s.attributes.length; r++) {
            var f = s.attributes[r];
            if (f.specified == true) {
                o.setAttribute(f.name, f.value)
            }
        }
        p = s.parentNode;
        while (p !== null && p.tagName.toLowerCase() !== "body" && p.parentNode != null) {
            if (p.parentNode.tagName.toLowerCase() === "p") {
                p.parentNode.parentNode.insertBefore(p, p.parentNode);
                break
            }
            p = p.parentNode
        }
        if (n.isVideo) {
            m = (a.pluginWidth > 0) ? a.pluginWidth : (a.videoWidth > 0) ? a.videoWidth : (s.getAttribute("width") !== null) ? s.getAttribute("width") : a.defaultVideoWidth;
            l = (a.pluginHeight > 0) ? a.pluginHeight : (a.videoHeight > 0) ? a.videoHeight : (s.getAttribute("height") !== null) ? s.getAttribute("height") : a.defaultVideoHeight;
            m = mejs.Utility.encodeUrl(m);
            l = mejs.Utility.encodeUrl(l)
        } else {
            if (a.enablePluginDebug) {
                m = 320;
                l = 240
            }
        }
        o.success = a.success;
        mejs.MediaPluginBridge.registerPluginElement(u, o, s);
        g.className = "me-plugin";
        g.id = u + "_container";
        if (n.isVideo) {
            s.parentNode.insertBefore(g, s)
        } else {
            document.body.insertBefore(g, document.body.childNodes[0])
        }
        j = ["id=" + u, "jsinitfunction=mejs.MediaPluginBridge.initPlugin", "jscallbackfunction=mejs.MediaPluginBridge.fireEvent", "isvideo=" + ((n.isVideo) ? "true" : "false"), "autoplay=" + ((e) ? "true" : "false"), "preload=" + d, "width=" + m, "startvolume=" + a.startVolume, "timerrate=" + a.timerRate, "flashstreamer=" + a.flashStreamer, "height=" + l, "pseudostreamstart=" + a.pseudoStreamingStartQueryParam];
        if (n.url !== null) {
            if (n.method == "flash") {
                j.push("file=" + mejs.Utility.encodeUrl(n.url))
            } else {
                j.push("file=" + n.url)
            }
        }
        if (a.enablePluginDebug) {
            j.push("debug=true")
        }
        if (a.enablePluginSmoothing) {
            j.push("smoothing=true")
        }
        if (a.enablePseudoStreaming) {
            j.push("pseudostreaming=true")
        }
        if (h) {
            j.push("controls=true")
        }
        if (a.pluginVars) {
            j = j.concat(a.pluginVars)
        }
        switch (n.method) {
            case "silverlight":
                g.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + u + '" name="' + u + '" width="' + m + '" height="' + l + '" class="mejs-shim"><param name="initParams" value="' + j.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + a.pluginPath + a.silverlightName + '" /></object>';
                break;
            case "flash":
                if (mejs.MediaFeatures.isIE) {
                    b = document.createElement("div");
                    g.appendChild(b);
                    b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + u + '" width="' + m + '" height="' + l + '" class="mejs-shim"><param name="movie" value="' + a.pluginPath + a.flashName + "?x=" + (new Date()) + '" /><param name="flashvars" value="' + j.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'
                } else {
                    g.innerHTML = '<embed id="' + u + '" name="' + u + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + a.pluginPath + a.flashName + '" flashvars="' + j.join("&") + '" width="' + m + '" height="' + l + '" scale="default"class="mejs-shim"></embed>'
                }
                break;
            case "youtube":
                var k;
                if (n.url.lastIndexOf("youtu.be") != -1) {
                    k = n.url.substr(n.url.lastIndexOf("/") + 1);
                    if (k.indexOf("?") != -1) {
                        k = k.substr(0, k.indexOf("?"))
                    }
                } else {
                    k = n.url.substr(n.url.lastIndexOf("=") + 1)
                }
                youtubeSettings = {
                    container: g,
                    containerId: g.id,
                    pluginMediaElement: o,
                    pluginId: u,
                    videoId: k,
                    height: l,
                    width: m
                };
                if (mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0])) {
                    mejs.YouTubeApi.createFlash(youtubeSettings)
                } else {
                    mejs.YouTubeApi.enqueueIframe(youtubeSettings)
                }
                break;
            case "vimeo":
                var t = u + "_player";
                o.vimeoid = n.url.substr(n.url.lastIndexOf("/") + 1);
                g.innerHTML = '<iframe src="//player.vimeo.com/video/' + o.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + t + '" width="' + m + '" height="' + l + '" frameborder="0" class="mejs-shim" id="' + t + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                if (typeof($f) == "function") {
                    var q = $f(g.childNodes[0]);
                    q.addEvent("ready", function() {
                        $.extend(q, {
                            playVideo: function() {
                                q.api("play")
                            },
                            stopVideo: function() {
                                q.api("unload")
                            },
                            pauseVideo: function() {
                                q.api("pause")
                            },
                            seekTo: function(w) {
                                q.api("seekTo", w)
                            },
                            setVolume: function(w) {
                                q.api("setVolume", w)
                            },
                            setMuted: function(w) {
                                if (w) {
                                    q.lastVolume = q.api("getVolume");
                                    q.api("setVolume", 0)
                                } else {
                                    q.api("setVolume", q.lastVolume);
                                    delete q.lastVolume
                                }
                            }
                        });

                        function v(y, x, w, A) {
                            var z = {
                                type: w,
                                target: x
                            };
                            if (w == "timeupdate") {
                                x.currentTime = z.currentTime = A.seconds;
                                x.duration = z.duration = A.duration
                            }
                            x.dispatchEvent(z.type, z)
                        }
                        q.addEvent("play", function() {
                            v(q, o, "play");
                            v(q, o, "playing")
                        });
                        q.addEvent("pause", function() {
                            v(q, o, "pause")
                        });
                        q.addEvent("finish", function() {
                            v(q, o, "ended")
                        });
                        q.addEvent("playProgress", function(w) {
                            v(q, o, "timeupdate", w)
                        });
                        o.pluginElement = g;
                        o.pluginApi = q;
                        mejs.MediaPluginBridge.initPlugin(u)
                    })
                } else {
                    console.warn("You need to include froogaloop for vimeo to work")
                }
                break
        }
        s.style.display = "none";
        s.removeAttribute("autoplay");
        return o
    },
    updateNative: function(d, c, f, b) {
        var e = d.htmlMediaElement,
            a;
        for (a in mejs.HtmlMediaElement) {
            e[a] = mejs.HtmlMediaElement[a]
        }
        c.success(e, e);
        return e
    }
};
mejs.YouTubeApi = {
    isIframeStarted: false,
    isIframeLoaded: false,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var a = document.createElement("script");
            a.src = "//www.youtube.com/player_api";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b);
            this.isIframeStarted = true
        }
    },
    iframeQueue: [],
    enqueueIframe: function(a) {
        if (this.isLoaded) {
            this.createIframe(a)
        } else {
            this.loadIframeApi();
            this.iframeQueue.push(a)
        }
    },
    createIframe: function(c) {
        var b = c.pluginMediaElement,
            a = new YT.Player(c.containerId, {
                height: c.height,
                width: c.width,
                videoId: c.videoId,
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: function() {
                        c.pluginMediaElement.pluginApi = a;
                        mejs.MediaPluginBridge.initPlugin(c.pluginId);
                        setInterval(function() {
                            mejs.YouTubeApi.createEvent(a, b, "timeupdate")
                        }, 250)
                    },
                    onStateChange: function(d) {
                        mejs.YouTubeApi.handleStateChange(d.data, a, b)
                    }
                }
            })
    },
    createEvent: function(d, c, b) {
        var e = {
            type: b,
            target: c
        };
        if (d && d.getDuration) {
            c.currentTime = e.currentTime = d.getCurrentTime();
            c.duration = e.duration = d.getDuration();
            e.paused = c.paused;
            e.ended = c.ended;
            e.muted = d.isMuted();
            e.volume = d.getVolume() / 100;
            e.bytesTotal = d.getVideoBytesTotal();
            e.bufferedBytes = d.getVideoBytesLoaded();
            var a = e.bufferedBytes / e.bytesTotal * e.duration;
            e.target.buffered = e.buffered = {
                start: function(f) {
                    return 0
                },
                end: function(f) {
                    return a
                },
                length: 1
            }
        }
        c.dispatchEvent(e.type, e)
    },
    iFrameReady: function() {
        this.isLoaded = true;
        this.isIframeLoaded = true;
        while (this.iframeQueue.length > 0) {
            var a = this.iframeQueue.pop();
            this.createIframe(a)
        }
    },
    flashPlayers: {},
    createFlash: function(c) {
        this.flashPlayers[c.pluginId] = c;
        var b, a = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + c.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        if (mejs.MediaFeatures.isIE) {
            b = document.createElement("div");
            c.container.appendChild(b);
            b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + c.pluginId + '" width="' + c.width + '" height="' + c.height + '" class="mejs-shim"><param name="movie" value="' + a + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
        } else {
            c.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + c.pluginId + '" data="' + a + '" width="' + c.width + '" height="' + c.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
        }
    },
    flashReady: function(e) {
        var c = this.flashPlayers[e],
            b = document.getElementById(e),
            a = c.pluginMediaElement;
        a.pluginApi = a.pluginElement = b;
        mejs.MediaPluginBridge.initPlugin(e);
        b.cueVideoById(c.videoId);
        var d = c.containerId + "_callback";
        window[d] = function(f) {
            mejs.YouTubeApi.handleStateChange(f, b, a)
        };
        b.addEventListener("onStateChange", d);
        setInterval(function() {
            mejs.YouTubeApi.createEvent(b, a, "timeupdate")
        }, 250);
        mejs.YouTubeApi.createEvent(b, a, "canplay")
    },
    handleStateChange: function(c, b, a) {
        switch (c) {
            case -1:
                a.paused = true;
                a.ended = true;
                mejs.YouTubeApi.createEvent(b, a, "loadedmetadata");
                break;
            case 0:
                a.paused = false;
                a.ended = true;
                mejs.YouTubeApi.createEvent(b, a, "ended");
                break;
            case 1:
                a.paused = false;
                a.ended = false;
                mejs.YouTubeApi.createEvent(b, a, "play");
                mejs.YouTubeApi.createEvent(b, a, "playing");
                break;
            case 2:
                a.paused = true;
                a.ended = false;
                mejs.YouTubeApi.createEvent(b, a, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(b, a, "progress");
                break;
            case 5:
                break
        }
    }
};

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(a) {
    mejs.YouTubeApi.flashReady(a)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
(function(b, a, d) {
    var c = {
        locale: {
            language: (a.i18n && a.i18n.locale.language) || "",
            strings: (a.i18n && a.i18n.locale.strings) || {}
        },
        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        methods: {}
    };
    c.getLanguage = function() {
        var e = c.locale.language || window.navigator.userLanguage || window.navigator.language;
        return c.ietf_lang_regex.exec(e) ? e : null
    };
    if (typeof mejsL10n != "undefined") {
        c.locale.language = mejsL10n.language
    }
    c.methods.checkPlain = function(h) {
        var g, f, e = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        h = String(h);
        for (g in e) {
            if (e.hasOwnProperty(g)) {
                f = new RegExp(g, "g");
                h = h.replace(f, e[g])
            }
        }
        return h
    };
    c.methods.t = function(f, e) {
        if (c.locale.strings && c.locale.strings[e.context] && c.locale.strings[e.context][f]) {
            f = c.locale.strings[e.context][f]
        }
        return c.methods.checkPlain(f)
    };
    c.t = function(f, e) {
        if (typeof f === "string" && f.length > 0) {
            var g = c.getLanguage();
            e = e || {
                context: g
            };
            return c.methods.t(f, e)
        } else {
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }
    };
    a.i18n = c
}(document, mejs));
(function(a, b) {
    if (typeof mejsL10n != "undefined") {
        a[mejsL10n.language] = mejsL10n.strings
    }
}(mejs.i18n.locale.strings));;
if (typeof jQuery != "undefined") {
    mejs.$ = jQuery
} else {
    if (typeof ender != "undefined") {
        mejs.$ = ender
    }
}(function(a) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: false,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function(b) {
            return (b.duration * 0.05)
        },
        defaultSeekForwardInterval: function(b) {
            return (b.duration * 0.05)
        },
        setDimensions: true,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: 0.8,
        loop: false,
        autoRewind: true,
        enableAutosize: true,
        alwaysShowHours: false,
        showTimecodeFrameCount: false,
        framesPerSecond: 25,
        autosizeProgress: true,
        alwaysShowControls: false,
        hideVideoControlsOnLoad: false,
        clickToPlayPause: true,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: true,
        enableKeyboard: true,
        pauseOtherPlayers: true,
        keyActions: [{
            keys: [32, 179],
            action: function(b, c) {
                if (c.paused || c.ended) {
                    b.play()
                } else {
                    b.pause()
                }
            }
        }, {
            keys: [38],
            action: function(b, d) {
                b.container.find(".mejs-volume-slider").css("display", "block");
                if (b.isVideo) {
                    b.showControls();
                    b.startControlsTimer()
                }
                var c = Math.min(d.volume + 0.1, 1);
                d.setVolume(c)
            }
        }, {
            keys: [40],
            action: function(b, d) {
                b.container.find(".mejs-volume-slider").css("display", "block");
                if (b.isVideo) {
                    b.showControls();
                    b.startControlsTimer()
                }
                var c = Math.max(d.volume - 0.1, 0);
                d.setVolume(c)
            }
        }, {
            keys: [37, 227],
            action: function(b, d) {
                if (!isNaN(d.duration) && d.duration > 0) {
                    if (b.isVideo) {
                        b.showControls();
                        b.startControlsTimer()
                    }
                    var c = Math.max(d.currentTime - b.options.defaultSeekBackwardInterval(d), 0);
                    d.setCurrentTime(c)
                }
            }
        }, {
            keys: [39, 228],
            action: function(b, d) {
                if (!isNaN(d.duration) && d.duration > 0) {
                    if (b.isVideo) {
                        b.showControls();
                        b.startControlsTimer()
                    }
                    var c = Math.min(d.currentTime + b.options.defaultSeekForwardInterval(d), d.duration);
                    d.setCurrentTime(c)
                }
            }
        }, {
            keys: [70],
            action: function(b, c) {
                if (typeof b.enterFullScreen != "undefined") {
                    if (b.isFullScreen) {
                        b.exitFullScreen()
                    } else {
                        b.enterFullScreen()
                    }
                }
            }
        }, {
            keys: [77],
            action: function(b, c) {
                b.container.find(".mejs-volume-slider").css("display", "block");
                if (b.isVideo) {
                    b.showControls();
                    b.startControlsTimer()
                }
                if (b.media.muted) {
                    b.setMuted(false)
                } else {
                    b.setMuted(true)
                }
            }
        }]
    };
    mejs.mepIndex = 0;
    mejs.players = {};
    mejs.MediaElementPlayer = function(c, d) {
        if (!(this instanceof mejs.MediaElementPlayer)) {
            return new mejs.MediaElementPlayer(c, d)
        }
        var b = this;
        b.$media = b.$node = a(c);
        b.node = b.media = b.$media[0];
        if (typeof b.node.player != "undefined") {
            return b.node.player
        } else {
            b.node.player = b
        }
        if (typeof d == "undefined") {
            d = b.$node.data("mejsoptions")
        }
        b.options = a.extend({}, mejs.MepDefaults, d);
        b.id = "mep_" + mejs.mepIndex++;
        mejs.players[b.id] = b;
        b.init();
        return b
    };
    mejs.MediaElementPlayer.prototype = {
        hasFocus: false,
        controlsAreVisible: true,
        init: function() {
            var e = this,
                f = mejs.MediaFeatures,
                j = a.extend(true, {}, e.options, {
                    success: function(l, k) {
                        e.meReady(l, k)
                    },
                    error: function(k) {
                        e.handleError(k)
                    }
                }),
                d = e.media.tagName.toLowerCase();
            e.isDynamic = (d !== "audio" && d !== "video");
            if (e.isDynamic) {
                e.isVideo = e.options.isVideo
            } else {
                e.isVideo = (d !== "audio" && e.options.isVideo)
            }
            if ((f.isiPad && e.options.iPadUseNativeControls) || (f.isiPhone && e.options.iPhoneUseNativeControls)) {
                e.$media.attr("controls", "controls");
                if (f.isiPad && e.media.getAttribute("autoplay") !== null) {
                    e.play()
                }
            } else {
                if (f.isAndroid && e.options.AndroidUseNativeControls) {} else {
                    e.$media.removeAttr("controls");
                    var b = e.isVideo ? mejs.i18n.t("Video Player") : mejs.i18n.t("Audio Player");
                    a('<span class="mejs-offscreen">' + b + "</span>").insertBefore(e.$media);
                    e.container = a('<div id="' + e.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '" tabindex="0" role="application" aria-label="' + b + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(e.$media[0].className).insertBefore(e.$media).focus(function(l) {
                        if (!e.controlsAreVisible) {
                            e.showControls(true);
                            var k = e.container.find(".mejs-playpause-button > button");
                            k.focus()
                        }
                    });
                    e.container.addClass((f.isAndroid ? "mejs-android " : "") + (f.isiOS ? "mejs-ios " : "") + (f.isiPad ? "mejs-ipad " : "") + (f.isiPhone ? "mejs-iphone " : "") + (e.isVideo ? "mejs-video " : "mejs-audio "));
                    if (f.isiOS) {
                        var h = e.$media.clone();
                        e.container.find(".mejs-mediaelement").append(h);
                        e.$media.remove();
                        e.$node = e.$media = h;
                        e.node = e.media = h[0]
                    } else {
                        e.container.find(".mejs-mediaelement").append(e.$media)
                    }
                    e.controls = e.container.find(".mejs-controls");
                    e.layers = e.container.find(".mejs-layers");
                    var g = (e.isVideo ? "video" : "audio"),
                        c = g.substring(0, 1).toUpperCase() + g.substring(1);
                    if (e.options[g + "Width"] > 0 || e.options[g + "Width"].toString().indexOf("%") > -1) {
                        e.width = e.options[g + "Width"]
                    } else {
                        if (e.media.style.width !== "" && e.media.style.width !== null) {
                            e.width = e.media.style.width
                        } else {
                            if (e.media.getAttribute("width") !== null) {
                                e.width = e.$media.attr("width")
                            } else {
                                e.width = e.options["default" + c + "Width"]
                            }
                        }
                    }
                    if (e.options[g + "Height"] > 0 || e.options[g + "Height"].toString().indexOf("%") > -1) {
                        e.height = e.options[g + "Height"]
                    } else {
                        if (e.media.style.height !== "" && e.media.style.height !== null) {
                            e.height = e.media.style.height
                        } else {
                            if (e.$media[0].getAttribute("height") !== null) {
                                e.height = e.$media.attr("height")
                            } else {
                                e.height = e.options["default" + c + "Height"]
                            }
                        }
                    }
                    e.setPlayerSize(e.width, e.height);
                    j.pluginWidth = e.width;
                    j.pluginHeight = e.height
                }
            }
            mejs.MediaElement(e.$media[0], j);
            if (typeof(e.container) != "undefined" && e.controlsAreVisible) {
                e.container.trigger("controlsshown")
            }
        },
        showControls: function(b) {
            var c = this;
            b = typeof b == "undefined" || b;
            if (c.controlsAreVisible) {
                return
            }
            if (b) {
                c.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                    c.controlsAreVisible = true;
                    c.container.trigger("controlsshown")
                });
                c.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                    c.controlsAreVisible = true
                })
            } else {
                c.controls.css("visibility", "visible").css("display", "block");
                c.container.find(".mejs-control").css("visibility", "visible").css("display", "block");
                c.controlsAreVisible = true;
                c.container.trigger("controlsshown")
            }
            c.setControlsSize()
        },
        hideControls: function(b) {
            var c = this;
            b = typeof b == "undefined" || b;
            if (!c.controlsAreVisible || c.options.alwaysShowControls || c.keyboardAction) {
                return
            }
            if (b) {
                c.controls.stop(true, true).fadeOut(200, function() {
                    a(this).css("visibility", "hidden").css("display", "block");
                    c.controlsAreVisible = false;
                    c.container.trigger("controlshidden")
                });
                c.container.find(".mejs-control").stop(true, true).fadeOut(200, function() {
                    a(this).css("visibility", "hidden").css("display", "block")
                })
            } else {
                c.controls.css("visibility", "hidden").css("display", "block");
                c.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
                c.controlsAreVisible = false;
                c.container.trigger("controlshidden")
            }
        },
        controlsTimer: null,
        startControlsTimer: function(c) {
            var b = this;
            c = typeof c != "undefined" ? c : 1500;
            b.killControlsTimer("start");
            b.controlsTimer = setTimeout(function() {
                b.hideControls();
                b.killControlsTimer("hide")
            }, c)
        },
        killControlsTimer: function(c) {
            var b = this;
            if (b.controlsTimer !== null) {
                clearTimeout(b.controlsTimer);
                delete b.controlsTimer;
                b.controlsTimer = null
            }
        },
        controlsEnabled: true,
        disableControls: function() {
            var b = this;
            b.killControlsTimer();
            b.hideControls(false);
            this.controlsEnabled = false
        },
        enableControls: function() {
            var b = this;
            b.showControls(false);
            b.controlsEnabled = true
        },
        meReady: function(c, f) {
            var k = this,
                j = mejs.MediaFeatures,
                g = f.getAttribute("autoplay"),
                d = !(typeof g == "undefined" || g === null || g === "false"),
                b, l;
            if (k.created) {
                return
            } else {
                k.created = true
            }
            k.media = c;
            k.domNode = f;
            if (!(j.isAndroid && k.options.AndroidUseNativeControls) && !(j.isiPad && k.options.iPadUseNativeControls) && !(j.isiPhone && k.options.iPhoneUseNativeControls)) {
                k.buildposter(k, k.controls, k.layers, k.media);
                k.buildkeyboard(k, k.controls, k.layers, k.media);
                k.buildoverlays(k, k.controls, k.layers, k.media);
                k.findTracks();
                for (b in k.options.features) {
                    l = k.options.features[b];
                    if (k["build" + l]) {
                        try {
                            k["build" + l](k, k.controls, k.layers, k.media)
                        } catch (h) {}
                    }
                }
                k.container.trigger("controlsready");
                k.setPlayerSize(k.width, k.height);
                k.setControlsSize();
                if (k.isVideo) {
                    if (mejs.MediaFeatures.hasTouch) {
                        k.$media.bind("touchstart", function() {
                            if (k.controlsAreVisible) {
                                k.hideControls(false)
                            } else {
                                if (k.controlsEnabled) {
                                    k.showControls(false)
                                }
                            }
                        })
                    } else {
                        k.clickToPlayPauseCallback = function() {
                            if (k.options.clickToPlayPause) {
                                if (k.media.paused) {
                                    k.play()
                                } else {
                                    k.pause()
                                }
                            }
                        };
                        k.media.addEventListener("click", k.clickToPlayPauseCallback, false);
                        k.container.bind("mouseenter mouseover", function() {
                            if (k.controlsEnabled) {
                                if (!k.options.alwaysShowControls) {
                                    k.killControlsTimer("enter");
                                    k.showControls();
                                    k.startControlsTimer(2500)
                                }
                            }
                        }).bind("mousemove", function() {
                            if (k.controlsEnabled) {
                                if (!k.controlsAreVisible) {
                                    k.showControls()
                                }
                                if (!k.options.alwaysShowControls) {
                                    k.startControlsTimer(2500)
                                }
                            }
                        }).bind("mouseleave", function() {
                            if (k.controlsEnabled) {
                                if (!k.media.paused && !k.options.alwaysShowControls) {
                                    k.startControlsTimer(1000)
                                }
                            }
                        })
                    }
                    if (k.options.hideVideoControlsOnLoad) {
                        k.hideControls(false)
                    }
                    if (d && !k.options.alwaysShowControls) {
                        k.hideControls()
                    }
                    if (k.options.enableAutosize) {
                        k.media.addEventListener("loadedmetadata", function(m) {
                            if (k.options.videoHeight <= 0 && k.domNode.getAttribute("height") === null && !isNaN(m.target.videoHeight)) {
                                k.setPlayerSize(m.target.videoWidth, m.target.videoHeight);
                                k.setControlsSize();
                                k.media.setVideoSize(m.target.videoWidth, m.target.videoHeight)
                            }
                        }, false)
                    }
                }
                c.addEventListener("play", function() {
                    var e;
                    for (e in mejs.players) {
                        var m = mejs.players[e];
                        if (m.id != k.id && k.options.pauseOtherPlayers && !m.paused && !m.ended) {
                            m.pause()
                        }
                        m.hasFocus = false
                    }
                    k.hasFocus = true
                }, false);
                k.media.addEventListener("ended", function(m) {
                    if (k.options.autoRewind) {
                        try {
                            k.media.setCurrentTime(0);
                            window.setTimeout(function() {
                                a(k.container).find(".mejs-overlay-loading").parent().hide()
                            }, 20)
                        } catch (n) {}
                    }
                    k.media.pause();
                    if (k.setProgressRail) {
                        k.setProgressRail()
                    }
                    if (k.setCurrentRail) {
                        k.setCurrentRail()
                    }
                    if (k.options.loop) {
                        k.play()
                    } else {
                        if (!k.options.alwaysShowControls && k.controlsEnabled) {
                            k.showControls()
                        }
                    }
                }, false);
                k.media.addEventListener("loadedmetadata", function(m) {
                    if (k.updateDuration) {
                        k.updateDuration()
                    }
                    if (k.updateCurrent) {
                        k.updateCurrent()
                    }
                    if (!k.isFullScreen) {
                        k.setPlayerSize(k.width, k.height);
                        k.setControlsSize()
                    }
                }, false);
                k.container.focusout(function(n) {
                    if (n.relatedTarget) {
                        var m = a(n.relatedTarget);
                        if (k.keyboardAction && m.parents(".mejs-container").length === 0) {
                            k.keyboardAction = false;
                            k.hideControls(true)
                        }
                    }
                });
                setTimeout(function() {
                    k.setPlayerSize(k.width, k.height);
                    k.setControlsSize()
                }, 50);
                k.globalBind("resize", function() {
                    if (!(k.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen))) {
                        k.setPlayerSize(k.width, k.height)
                    }
                    k.setControlsSize()
                });
                if (k.media.pluginType == "youtube" && (j.isiOS || j.isAndroid)) {
                    k.container.find(".mejs-overlay-play").hide()
                }
            }
            if (d && c.pluginType == "native") {
                k.play()
            }
            if (k.options.success) {
                if (typeof k.options.success == "string") {
                    window[k.options.success](k.media, k.domNode, k)
                } else {
                    k.options.success(k.media, k.domNode, k)
                }
            }
        },
        handleError: function(c) {
            var b = this;
            b.controls.hide();
            if (b.options.error) {
                b.options.error(c)
            }
        },
        setPlayerSize: function(c, k) {
            var l = this;
            if (!l.options.setDimensions) {
                return false
            }
            if (typeof c != "undefined") {
                l.width = c
            }
            if (typeof k != "undefined") {
                l.height = k
            }
            if (l.height.toString().indexOf("%") > 0 || l.$node.css("max-width") === "100%" || (l.$node[0].currentStyle && l.$node[0].currentStyle.maxWidth === "100%")) {
                var e = (function() {
                    if (l.isVideo) {
                        if (l.media.videoWidth && l.media.videoWidth > 0) {
                            return l.media.videoWidth
                        } else {
                            if (l.media.getAttribute("width") !== null) {
                                return l.media.getAttribute("width")
                            } else {
                                return l.options.defaultVideoWidth
                            }
                        }
                    } else {
                        return l.options.defaultAudioWidth
                    }
                })();
                var h = (function() {
                    if (l.isVideo) {
                        if (l.media.videoHeight && l.media.videoHeight > 0) {
                            return l.media.videoHeight
                        } else {
                            if (l.media.getAttribute("height") !== null) {
                                return l.media.getAttribute("height")
                            } else {
                                return l.options.defaultVideoHeight
                            }
                        }
                    } else {
                        return l.options.defaultAudioHeight
                    }
                })();
                var j = l.container.parent().closest(":visible").width(),
                    g = l.container.parent().closest(":visible").height(),
                    b = l.isVideo || !l.options.autosizeProgress ? parseInt(j * h / e, 10) : h;
                if (isNaN(b)) {
                    b = g
                }
                if (l.container.parent()[0].tagName.toLowerCase() === "body") {
                    j = a(window).width();
                    b = a(window).height()
                }
                if (b && j) {
                    l.container.width(j).height(b);
                    l.$media.add(l.container.find(".mejs-shim")).width("100%").height("100%");
                    if (l.isVideo) {
                        if (l.media.setVideoSize) {
                            l.media.setVideoSize(j, b)
                        }
                    }
                    l.layers.children(".mejs-layer").width("100%").height("100%")
                }
            } else {
                l.container.width(l.width).height(l.height);
                l.layers.children(".mejs-layer").width(l.width).height(l.height)
            }
            var d = l.layers.find(".mejs-overlay-play"),
                f = d.find(".mejs-overlay-button");
            d.height(l.container.height() - l.controls.height());
            f.css("margin-top", "-" + (f.height() / 2 - l.controls.height() / 2).toString() + "px")
        },
        setControlsSize: function() {
            var l = this,
                d = 0,
                k = 0,
                b = l.controls.find(".mejs-time-rail"),
                j = l.controls.find(".mejs-time-total"),
                h = l.controls.find(".mejs-time-current"),
                f = l.controls.find(".mejs-time-loaded"),
                c = b.siblings(),
                g = c.last(),
                e = null;
            if (!l.container.is(":visible") || !b.length || !b.is(":visible")) {
                return
            }
            if (l.options && !l.options.autosizeProgress) {
                k = parseInt(b.css("width"), 10)
            }
            if (k === 0 || !k) {
                c.each(function() {
                    var m = a(this);
                    if (m.css("position") != "absolute" && m.is(":visible")) {
                        d += a(this).outerWidth(true)
                    }
                });
                k = l.controls.width() - d - (b.outerWidth(true) - b.width())
            }
            do {
                b.width(k);
                j.width(k - (j.outerWidth(true) - j.width()));
                if (g.css("position") != "absolute") {
                    e = g.position();
                    k--
                }
            } while (e !== null && e.top > 0 && k > 0);
            if (l.setProgressRail) {
                l.setProgressRail()
            }
            if (l.setCurrentRail) {
                l.setCurrentRail()
            }
        },
        buildposter: function(e, b, g, f) {
            var d = this,
                h = a('<div class="mejs-poster mejs-layer"></div>').appendTo(g),
                c = e.$media.attr("poster");
            if (e.options.poster !== "") {
                c = e.options.poster
            }
            if (c) {
                d.setPoster(c)
            } else {
                h.hide()
            }
            f.addEventListener("play", function() {
                h.hide()
            }, false);
            if (e.options.showPosterWhenEnded && e.options.autoRewind) {
                f.addEventListener("ended", function() {
                    h.show()
                }, false)
            }
        },
        setPoster: function(c) {
            var d = this,
                e = d.container.find(".mejs-poster"),
                b = e.find("img");
            if (b.length === 0) {
                b = a('<img width="100%" height="100%" />').appendTo(e)
            }
            b.attr("src", c);
            e.css({
                "background-image": "url(" + c + ")"
            })
        },
        buildoverlays: function(g, h, e, b) {
            var k = this;
            if (!g.isVideo) {
                return
            }
            var c = a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(e),
                f = a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(e),
                d = a(".video-info-container"),
                j = a('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(e).bind("click", function() {
                    if (k.options.clickToPlayPause) {
                        if (b.paused) {
                            b.play()
                        }
                    }
                });
            b.addEventListener("play", function() {
                j.hide();
                c.hide();
                d.hide();
                h.find(".mejs-time-buffering").hide();
                f.hide()
            }, false);
            b.addEventListener("playing", function() {
                j.hide();
                c.hide();
                d.hide();
                h.find(".mejs-time-buffering").hide();
                f.hide()
            }, false);
            b.addEventListener("seeking", function() {
                c.show();
                h.find(".mejs-time-buffering").show()
            }, false);
            b.addEventListener("seeked", function() {
                c.hide();
                h.find(".mejs-time-buffering").hide()
            }, false);
            b.addEventListener("pause", function() {
                if (!mejs.MediaFeatures.isiPhone) {
                    j.show();
                    d.show()
                }
            }, false);
            b.addEventListener("waiting", function() {
                c.show();
                h.find(".mejs-time-buffering").show()
            }, false);
            b.addEventListener("loadeddata", function() {
                h.find(".mejs-time-buffering").show();
                if (mejs.MediaFeatures.isAndroid) {
                    b.canplayTimeout = window.setTimeout(function() {
                        if (document.createEvent) {
                            var l = document.createEvent("HTMLEvents");
                            l.initEvent("canplay", true, true);
                            return b.dispatchEvent(l)
                        }
                    }, 300)
                }
            }, false);
            b.addEventListener("canplay", function() {
                c.hide();
                h.find(".mejs-time-buffering").hide();
                clearTimeout(b.canplayTimeout)
            }, false);
            b.addEventListener("error", function() {
                c.hide();
                h.find(".mejs-time-buffering").hide();
                f.show();
                f.find("mejs-overlay-error").html("Error loading this resource")
            }, false);
            b.addEventListener("keydown", function(l) {
                k.onkeydown(g, b, l)
            }, false)
        },
        buildkeyboard: function(d, b, f, e) {
            var c = this;
            c.container.keydown(function() {
                c.keyboardAction = true
            });
            c.globalBind("keydown", function(g) {
                return c.onkeydown(d, e, g)
            });
            c.globalBind("click", function(g) {
                d.hasFocus = a(g.target).closest(".mejs-container").length !== 0
            })
        },
        onkeydown: function(h, l, k) {
            if (h.hasFocus && h.options.enableKeyboard) {
                for (var g = 0, b = h.options.keyActions.length; g < b; g++) {
                    var f = h.options.keyActions[g];
                    for (var c = 0, d = f.keys.length; c < d; c++) {
                        if (k.keyCode == f.keys[c]) {
                            if (typeof(k.preventDefault) == "function") {
                                k.preventDefault()
                            }
                            f.action(h, l, k.keyCode);
                            return false
                        }
                    }
                }
            }
            return true
        },
        findTracks: function() {
            var b = this,
                c = b.$media.find("track");
            b.tracks = [];
            c.each(function(e, d) {
                d = a(d);
                b.tracks.push({
                    srclang: (d.attr("srclang")) ? d.attr("srclang").toLowerCase() : "",
                    src: d.attr("src"),
                    kind: d.attr("kind"),
                    label: d.attr("label") || "",
                    entries: [],
                    isLoaded: false
                })
            })
        },
        changeSkin: function(b) {
            this.container[0].className = "mejs-container " + b;
            this.setPlayerSize(this.width, this.height);
            this.setControlsSize()
        },
        play: function() {
            this.load();
            this.media.play()
        },
        pause: function() {
            try {
                this.media.pause()
            } catch (b) {}
        },
        load: function() {
            if (!this.isLoaded) {
                this.media.load()
            }
            this.isLoaded = true
        },
        setMuted: function(b) {
            this.media.setMuted(b)
        },
        setCurrentTime: function(b) {
            this.media.setCurrentTime(b)
        },
        getCurrentTime: function() {
            return this.media.currentTime
        },
        setVolume: function(b) {
            this.media.setVolume(b)
        },
        getVolume: function() {
            return this.media.volume
        },
        setSrc: function(b) {
            this.media.setSrc(b)
        },
        remove: function() {
            var c = this,
                f, b;
            for (f in c.options.features) {
                b = c.options.features[f];
                if (c["clean" + b]) {
                    try {
                        c["clean" + b](c)
                    } catch (d) {}
                }
            }
            if (!c.isDynamic) {
                c.$media.prop("controls", true);
                c.$node.clone().insertBefore(c.container).show();
                c.$node.remove()
            } else {
                c.$node.insertBefore(c.container)
            }
            if (c.media.pluginType !== "native") {
                c.media.remove()
            }
            delete mejs.players[c.id];
            if (typeof c.container == "object") {
                c.container.remove()
            }
            c.globalUnbind();
            delete c.node.player
        }
    };
    (function() {
        var c = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;

        function b(e, f) {
            var d = {
                d: [],
                w: []
            };
            a.each((e || "").split(" "), function(h, g) {
                var j = g + "." + f;
                if (j.indexOf(".") === 0) {
                    d.d.push(j);
                    d.w.push(j)
                } else {
                    d[c.test(g) ? "w" : "d"].push(j)
                }
            });
            d.d = d.d.join(" ");
            d.w = d.w.join(" ");
            return d
        }
        mejs.MediaElementPlayer.prototype.globalBind = function(e, f, g) {
            var d = this;
            e = b(e, d.id);
            if (e.d) {
                a(document).bind(e.d, f, g)
            }
            if (e.w) {
                a(window).bind(e.w, f, g)
            }
        };
        mejs.MediaElementPlayer.prototype.globalUnbind = function(e, f) {
            var d = this;
            e = b(e, d.id);
            if (e.d) {
                a(document).unbind(e.d, f)
            }
            if (e.w) {
                a(window).unbind(e.w, f)
            }
        }
    })();
    if (typeof a != "undefined") {
        a.fn.mediaelementplayer = function(b) {
            if (b === false) {
                this.each(function() {
                    var c = a(this).data("mediaelementplayer");
                    if (c) {
                        c.remove()
                    }
                    a(this).removeData("mediaelementplayer")
                })
            } else {
                this.each(function() {
                    a(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, b))
                })
            }
            return this
        };
        a(document).ready(function() {
            a(".mejs-player").mediaelementplayer()
        })
    }
    window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        playText: mejs.i18n.t("Play"),
        pauseText: mejs.i18n.t("Pause")
    });
    a.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(g, h, e, c) {
            var j = this,
                f = j.options,
                d = a('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + j.id + '" title="' + f.playText + '" aria-label="' + f.playText + '"></button></div>').appendTo(h).click(function(l) {
                    l.preventDefault();
                    if (c.paused) {
                        c.play()
                    } else {
                        c.pause()
                    }
                    return false
                }),
                k = d.find("button");

            function b(l) {
                if ("play" === l) {
                    d.removeClass("mejs-play").addClass("mejs-pause");
                    k.attr({
                        title: f.pauseText,
                        "aria-label": f.pauseText
                    })
                } else {
                    d.removeClass("mejs-pause").addClass("mejs-play");
                    k.attr({
                        title: f.playText,
                        "aria-label": f.playText
                    })
                }
            }
            b("pse");
            c.addEventListener("play", function() {
                b("play")
            }, false);
            c.addEventListener("playing", function() {
                b("play")
            }, false);
            c.addEventListener("pause", function() {
                b("pse")
            }, false);
            c.addEventListener("paused", function() {
                b("pse")
            }, false)
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        stopText: "Stop"
    });
    a.extend(MediaElementPlayer.prototype, {
        buildstop: function(e, b, g, f) {
            var d = this,
                c = a('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + d.id + '" title="' + d.options.stopText + '" aria-label="' + d.options.stopText + '"></button></div>').appendTo(b).click(function() {
                    if (!f.paused) {
                        f.pause()
                    }
                    if (f.currentTime > 0) {
                        f.setCurrentTime(0);
                        f.pause();
                        b.find(".mejs-time-current").width("0px");
                        b.find(".mejs-time-handle").css("left", "0px");
                        b.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
                        b.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
                        g.find(".mejs-poster").show()
                    }
                })
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
    });
    a.extend(MediaElementPlayer.prototype, {
        buildprogress: function(q, m, j, g) {
            a('<div class="mejs-time-rail"><a href="javascript:void(0);" class="mejs-time-total mejs-time-slider"><span class="mejs-offscreen">' + this.options.progessHelpText + '</span><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></a></div>').appendTo(m);
            m.find(".mejs-time-buffering").hide();
            var l = this,
                w = m.find(".mejs-time-total"),
                r = m.find(".mejs-time-loaded"),
                n = m.find(".mejs-time-current"),
                u = m.find(".mejs-time-handle"),
                k = m.find(".mejs-time-float"),
                p = m.find(".mejs-time-float-current"),
                o = m.find(".mejs-time-slider"),
                s = function(B) {
                    var C = w.offset(),
                        z = w.outerWidth(true),
                        y = 0,
                        A = 0,
                        D = 0,
                        t;
                    if (B.originalEvent.changedTouches) {
                        t = B.originalEvent.changedTouches[0].pageX
                    } else {
                        t = B.pageX
                    }
                    if (g.duration) {
                        if (t < C.left) {
                            t = C.left
                        } else {
                            if (t > z + C.left) {
                                t = z + C.left
                            }
                        }
                        D = t - C.left;
                        y = (D / z);
                        A = (y <= 0.02) ? 0 : y * g.duration;
                        if (v && A !== g.currentTime) {
                            g.setCurrentTime(A)
                        }
                        if (!mejs.MediaFeatures.hasTouch) {
                            k.css("left", D);
                            p.html(mejs.Utility.secondsToTimeCode(A));
                            k.show()
                        }
                    }
                },
                v = false,
                f = false,
                b = 0,
                e = false,
                d = q.options.autoRewind;
            var c = function(y) {
                var A = g.currentTime,
                    z = mejs.i18n.t("Time Slider"),
                    x = mejs.Utility.secondsToTimeCode(A),
                    t = g.duration;
                o.attr({
                    "aria-label": z,
                    "aria-valuemin": 0,
                    "aria-valuemax": t,
                    "aria-valuenow": A,
                    "aria-valuetext": x,
                    role: "slider",
                    tabindex: 0
                })
            };
            var h = function() {
                var t = new Date();
                if (t - b >= 1000) {
                    g.play()
                }
            };
            o.bind("focus", function(t) {
                q.options.autoRewind = false
            });
            o.bind("blur", function(t) {
                q.options.autoRewind = d
            });
            o.bind("keydown", function(y) {
                if ((new Date() - b) >= 1000) {
                    e = g.paused
                }
                var x = y.keyCode,
                    t = g.duration,
                    z = g.currentTime;
                switch (x) {
                    case 37:
                        z -= 1;
                        break;
                    case 39:
                        z += 1;
                        break;
                    case 38:
                        z += Math.floor(t * 0.1);
                        break;
                    case 40:
                        z -= Math.floor(t * 0.1);
                        break;
                    case 36:
                        z = 0;
                        break;
                    case 35:
                        z = t;
                        break;
                    case 10:
                        g.paused ? g.play() : g.pause();
                        return;
                    case 13:
                        g.paused ? g.play() : g.pause();
                        return;
                    default:
                        return
                }
                z = z < 0 ? 0 : (z >= t ? t : Math.floor(z));
                b = new Date();
                if (!e) {
                    g.pause()
                }
                if (z < g.duration && !e) {
                    setTimeout(h, 1100)
                }
                g.setCurrentTime(z);
                y.preventDefault();
                y.stopPropagation();
                return false
            });
            w.bind("mousedown touchstart", function(t) {
                if (t.which === 1 || t.which === 0) {
                    v = true;
                    s(t);
                    l.globalBind("mousemove.dur touchmove.dur", function(x) {
                        s(x)
                    });
                    l.globalBind("mouseup.dur touchend.dur", function(x) {
                        v = false;
                        k.hide();
                        l.globalUnbind(".dur")
                    })
                }
            }).bind("mouseenter", function(t) {
                f = true;
                l.globalBind("mousemove.dur", function(x) {
                    s(x)
                });
                if (!mejs.MediaFeatures.hasTouch) {
                    k.show()
                }
            }).bind("mouseleave", function(t) {
                f = false;
                if (!v) {
                    l.globalUnbind(".dur");
                    k.hide()
                }
            });
            g.addEventListener("progress", function(t) {
                q.setProgressRail(t);
                q.setCurrentRail(t)
            }, false);
            g.addEventListener("timeupdate", function(t) {
                q.setProgressRail(t);
                q.setCurrentRail(t);
                c(t)
            }, false);
            l.loaded = r;
            l.total = w;
            l.current = n;
            l.handle = u
        },
        setProgressRail: function(f) {
            var b = this,
                d = (f !== undefined) ? f.target : b.media,
                c = null;
            if (d && d.buffered && d.buffered.length > 0 && d.buffered.end && d.duration) {
                c = d.buffered.end(0) / d.duration
            } else {
                if (d && d.bytesTotal !== undefined && d.bytesTotal > 0 && d.bufferedBytes !== undefined) {
                    c = d.bufferedBytes / d.bytesTotal
                } else {
                    if (f && f.lengthComputable && f.total !== 0) {
                        c = f.loaded / f.total
                    }
                }
            }
            if (c !== null) {
                c = Math.min(1, Math.max(0, c));
                if (b.loaded && b.total) {
                    b.loaded.width(b.total.width() * c)
                }
            }
        },
        setCurrentRail: function() {
            var b = this;
            if (b.media.currentTime !== undefined && b.media.duration) {
                if (b.total && b.handle) {
                    var d = Math.round(b.total.width() * b.media.currentTime / b.media.duration),
                        c = d - Math.round(b.handle.outerWidth(true) / 2);
                    b.current.width(d);
                    b.handle.css("left", c)
                }
            }
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    });
    a.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(d, b, f, e) {
            var c = this;
            a('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + (d.options.alwaysShowHours ? "00:" : "") + (d.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(b);
            c.currenttime = c.controls.find(".mejs-currenttime");
            e.addEventListener("timeupdate", function() {
                d.updateCurrent()
            }, false)
        },
        buildduration: function(d, b, f, e) {
            var c = this;
            if (b.children().last().find(".mejs-currenttime").length > 0) {
                a(c.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (c.options.duration > 0 ? mejs.Utility.secondsToTimeCode(c.options.duration, c.options.alwaysShowHours || c.media.duration > 3600, c.options.showTimecodeFrameCount, c.options.framesPerSecond || 25) : ((d.options.alwaysShowHours ? "00:" : "") + (d.options.showTimecodeFrameCount ? "00:00:00" : "00:00"))) + "</span>").appendTo(b.find(".mejs-time"))
            } else {
                b.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
                a('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (c.options.duration > 0 ? mejs.Utility.secondsToTimeCode(c.options.duration, c.options.alwaysShowHours || c.media.duration > 3600, c.options.showTimecodeFrameCount, c.options.framesPerSecond || 25) : ((d.options.alwaysShowHours ? "00:" : "") + (d.options.showTimecodeFrameCount ? "00:00:00" : "00:00"))) + "</span></div>").appendTo(b)
            }
            c.durationD = c.controls.find(".mejs-duration");
            e.addEventListener("timeupdate", function() {
                d.updateDuration()
            }, false)
        },
        updateCurrent: function() {
            var b = this;
            if (b.currenttime) {
                b.currenttime.html(mejs.Utility.secondsToTimeCode(b.media.currentTime, b.options.alwaysShowHours || b.media.duration > 3600, b.options.showTimecodeFrameCount, b.options.framesPerSecond || 25))
            }
        },
        updateDuration: function() {
            var b = this;
            b.container.toggleClass("mejs-long-video", b.media.duration > 3600);
            if (b.durationD && (b.options.duration > 0 || b.media.duration)) {
                b.durationD.html(mejs.Utility.secondsToTimeCode(b.options.duration > 0 ? b.options.duration : b.media.duration, b.options.alwaysShowHours, b.options.showTimecodeFrameCount, b.options.framesPerSecond || 25))
            }
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
        hideVolumeOnTouchDevices: true,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    });
    a.extend(MediaElementPlayer.prototype, {
        buildvolume: function(o, p, j, d) {
            if ((mejs.MediaFeatures.isAndroid || mejs.MediaFeatures.isiOS) && this.options.hideVolumeOnTouchDevices) {
                return
            }
            var q = this,
                m = (q.isVideo) ? q.options.videoVolume : q.options.audioVolume,
                f = (m == "horizontal") ? a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + q.id + '" title="' + q.options.muteText + '" aria-label="' + q.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + q.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(p) : a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + q.id + '" title="' + q.options.muteText + '" aria-label="' + q.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + q.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(p),
                r = q.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                b = q.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                h = q.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                g = q.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                n = function(x, y) {
                    if (!r.is(":visible") && typeof y == "undefined") {
                        r.show();
                        n(x, true);
                        r.hide();
                        return
                    }
                    x = Math.max(0, x);
                    x = Math.min(x, 1);
                    if (x === 0) {
                        f.removeClass("mejs-mute").addClass("mejs-unmute")
                    } else {
                        f.removeClass("mejs-unmute").addClass("mejs-mute")
                    }
                    var u = b.position();
                    if (m == "vertical") {
                        var v = b.height(),
                            t = v - (v * x);
                        g.css("top", Math.round(u.top + t - (g.height() / 2)));
                        h.height(v - t);
                        h.css("top", u.top + t)
                    } else {
                        var s = b.width(),
                            w = s * x;
                        g.css("left", Math.round(u.left + w - (g.width() / 2)));
                        h.width(Math.round(w))
                    }
                },
                c = function(x) {
                    var v = null,
                        t = b.offset();
                    if (m === "vertical") {
                        var u = b.height(),
                            s = parseInt(b.css("top").replace(/px/, ""), 10),
                            w = x.pageY - t.top;
                        v = (u - w) / u;
                        if (t.top === 0 || t.left === 0) {
                            return
                        }
                    } else {
                        var z = b.width(),
                            y = x.pageX - t.left;
                        v = y / z
                    }
                    v = Math.max(0, v);
                    v = Math.min(v, 1);
                    n(v);
                    if (v === 0) {
                        d.setMuted(true)
                    } else {
                        d.setMuted(false)
                    }
                    d.setVolume(v)
                },
                l = false,
                e = false;
            f.hover(function() {
                r.show();
                e = true
            }, function() {
                e = false;
                if (!l && m == "vertical") {
                    r.hide()
                }
            });
            var k = function(t) {
                var s = Math.floor(d.volume * 100);
                r.attr({
                    "aria-label": mejs.i18n.t("volumeSlider"),
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": s,
                    "aria-valuetext": s + "%",
                    role: "slider",
                    tabindex: 0
                })
            };
            r.bind("mouseover", function() {
                e = true
            }).bind("mousedown", function(s) {
                c(s);
                q.globalBind("mousemove.vol", function(t) {
                    c(t)
                });
                q.globalBind("mouseup.vol", function() {
                    l = false;
                    q.globalUnbind(".vol");
                    if (!e && m == "vertical") {
                        r.hide()
                    }
                });
                l = true;
                return false
            }).bind("keydown", function(u) {
                var t = u.keyCode;
                var s = d.volume;
                switch (t) {
                    case 38:
                        s += 0.1;
                        break;
                    case 40:
                        s = s - 0.1;
                        break;
                    default:
                        return true
                }
                l = false;
                n(s);
                d.setVolume(s);
                return false
            }).bind("blur", function() {
                r.hide()
            });
            f.find("button").click(function() {
                d.setMuted(!d.muted)
            });
            f.find("button").bind("focus", function() {
                r.show()
            });
            d.addEventListener("volumechange", function(s) {
                if (!l) {
                    if (d.muted) {
                        n(0);
                        f.removeClass("mejs-mute").addClass("mejs-unmute")
                    } else {
                        n(d.volume);
                        f.removeClass("mejs-unmute").addClass("mejs-mute")
                    }
                }
                k(s)
            }, false);
            if (q.container.is(":visible")) {
                n(o.options.startVolume);
                if (o.options.startVolume === 0) {
                    d.setMuted(true)
                }
                if (d.pluginType === "native") {
                    d.setVolume(o.options.startVolume)
                }
            }
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        usePluginFullScreen: true,
        newWindowCallback: function() {
            return ""
        },
        fullscreenText: mejs.i18n.t("Fullscreen")
    });
    a.extend(MediaElementPlayer.prototype, {
        isFullScreen: false,
        isNativeFullScreen: false,
        isInIframe: false,
        buildfullscreen: function(p, o, g, f) {
            if (!p.isVideo) {
                return
            }
            p.isInIframe = (window.location != window.parent.location);
            if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                var e = function(t) {
                    if (p.isFullScreen) {
                        if (mejs.MediaFeatures.isFullScreen()) {
                            p.isNativeFullScreen = true;
                            p.setControlsSize()
                        } else {
                            p.isNativeFullScreen = false;
                            p.exitFullScreen()
                        }
                    }
                };
                p.globalBind(mejs.MediaFeatures.fullScreenEventName, e)
            }
            var n = this,
                d = 0,
                c = 0,
                m = p.container,
                b = a('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + n.id + '" title="' + n.options.fullscreenText + '" aria-label="' + n.options.fullscreenText + '"></button></div>').appendTo(o);
            if (n.media.pluginType === "native" || (!n.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)) {
                b.click(function() {
                    var t = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || p.isFullScreen;
                    if (t) {
                        p.exitFullScreen()
                    } else {
                        p.enterFullScreen()
                    }
                })
            } else {
                var l = null,
                    h = (function() {
                        var w = document.createElement("x"),
                            x = document.documentElement,
                            y = window.getComputedStyle,
                            t;
                        if (!("pointerEvents" in w.style)) {
                            return false
                        }
                        w.style.pointerEvents = "auto";
                        w.style.pointerEvents = "x";
                        x.appendChild(w);
                        t = y && y(w, "").pointerEvents === "auto";
                        x.removeChild(w);
                        return !!t
                    })();
                if (h && !mejs.MediaFeatures.isOpera) {
                    var k = false,
                        r = function() {
                            if (k) {
                                for (var t in j) {
                                    j[t].hide()
                                }
                                b.css("pointer-events", "");
                                n.controls.css("pointer-events", "");
                                n.media.removeEventListener("click", n.clickToPlayPauseCallback);
                                k = false
                            }
                        },
                        j = {},
                        q = ["top", "left", "right", "bottom"],
                        s, u, v = function() {
                            var w = b.offset().left - n.container.offset().left,
                                A = b.offset().top - n.container.offset().top,
                                t = b.outerWidth(true),
                                z = b.outerHeight(true),
                                y = n.container.width(),
                                x = n.container.height();
                            for (s in j) {
                                j[s].css({
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                })
                            }
                            j.top.width(y).height(A);
                            j.left.width(w).height(z).css({
                                top: A
                            });
                            j.right.width(y - w - t).height(z).css({
                                top: A,
                                left: w + t
                            });
                            j.bottom.width(y).height(x - z - A).css({
                                top: A + z
                            })
                        };
                    n.globalBind("resize", function() {
                        v()
                    });
                    for (s = 0, u = q.length; s < u; s++) {
                        j[q[s]] = a('<div class="mejs-fullscreen-hover" />').appendTo(n.container).mouseover(r).hide()
                    }
                    b.on("mouseover", function() {
                        if (!n.isFullScreen) {
                            var t = b.offset(),
                                w = p.container.offset();
                            f.positionFullscreenButton(t.left - w.left, t.top - w.top, false);
                            b.css("pointer-events", "none");
                            n.controls.css("pointer-events", "none");
                            n.media.addEventListener("click", n.clickToPlayPauseCallback);
                            for (s in j) {
                                j[s].show()
                            }
                            v();
                            k = true
                        }
                    });
                    f.addEventListener("fullscreenchange", function(t) {
                        n.isFullScreen = !n.isFullScreen;
                        if (n.isFullScreen) {
                            n.media.removeEventListener("click", n.clickToPlayPauseCallback)
                        } else {
                            n.media.addEventListener("click", n.clickToPlayPauseCallback)
                        }
                        r()
                    });
                    n.globalBind("mousemove", function(w) {
                        if (k) {
                            var t = b.offset();
                            if (w.pageY < t.top || w.pageY > t.top + b.outerHeight(true) || w.pageX < t.left || w.pageX > t.left + b.outerWidth(true)) {
                                b.css("pointer-events", "");
                                n.controls.css("pointer-events", "");
                                k = false
                            }
                        }
                    })
                } else {
                    b.on("mouseover", function() {
                        if (l !== null) {
                            clearTimeout(l);
                            delete l
                        }
                        var t = b.offset(),
                            w = p.container.offset();
                        f.positionFullscreenButton(t.left - w.left, t.top - w.top, true)
                    }).on("mouseout", function() {
                        if (l !== null) {
                            clearTimeout(l);
                            delete l
                        }
                        l = setTimeout(function() {
                            f.hideFullscreenButton()
                        }, 1500)
                    })
                }
            }
            p.fullscreenBtn = b;
            n.globalBind("keydown", function(t) {
                if (((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || n.isFullScreen) && t.keyCode == 27) {
                    p.exitFullScreen()
                }
            })
        },
        cleanfullscreen: function(b) {
            b.exitFullScreen()
        },
        containerSizeTimeout: null,
        enterFullScreen: function() {
            var c = this;
            if (c.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || c.options.usePluginFullScreen)) {
                return
            }
            a(document.documentElement).addClass("mejs-fullscreen");
            normalHeight = c.container.height();
            normalWidth = c.container.width();
            if (c.media.pluginType === "native") {
                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    mejs.MediaFeatures.requestFullScreen(c.container[0]);
                    if (c.isInIframe) {
                        setTimeout(function d() {
                            if (c.isNativeFullScreen) {
                                var j = window.devicePixelRatio || 1;
                                var k = 0.002;
                                var f = j * a(window).width();
                                var h = screen.width;
                                var e = Math.abs(h - f);
                                var g = h * k;
                                if (e > g) {
                                    c.exitFullScreen()
                                } else {
                                    setTimeout(d, 500)
                                }
                            }
                        }, 500)
                    }
                } else {
                    if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
                        c.media.webkitEnterFullscreen();
                        return
                    }
                }
            }
            if (c.isInIframe) {
                var b = c.options.newWindowCallback(this);
                if (b !== "") {
                    if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
                        c.pause();
                        window.open(b, c.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        return
                    } else {
                        setTimeout(function() {
                            if (!c.isNativeFullScreen) {
                                c.pause();
                                window.open(b, c.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no")
                            }
                        }, 250)
                    }
                }
            }
            c.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
            c.containerSizeTimeout = setTimeout(function() {
                c.container.css({
                    width: "100%",
                    height: "100%"
                });
                c.setControlsSize()
            }, 500);
            if (c.media.pluginType === "native") {
                c.$media.width("100%").height("100%")
            } else {
                c.container.find(".mejs-shim").width("100%").height("100%");
                c.media.setVideoSize(a(window).width(), a(window).height())
            }
            c.layers.children("div").width("100%").height("100%");
            if (c.fullscreenBtn) {
                c.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen")
            }
            c.setControlsSize();
            c.isFullScreen = true;
            c.container.find(".mejs-captions-text").css("font-size", screen.width / c.width * 1 * 100 + "%");
            c.container.find(".mejs-captions-position").css("bottom", "45px")
        },
        exitFullScreen: function() {
            var b = this;
            clearTimeout(b.containerSizeTimeout);
            if (b.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox) {
                b.media.setFullscreen(false);
                return
            }
            if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || b.isFullScreen)) {
                mejs.MediaFeatures.cancelFullScreen()
            }
            a(document.documentElement).removeClass("mejs-fullscreen");
            b.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight);
            if (b.media.pluginType === "native") {
                b.$media.width(normalWidth).height(normalHeight)
            } else {
                b.container.find(".mejs-shim").width(normalWidth).height(normalHeight);
                b.media.setVideoSize(normalWidth, normalHeight)
            }
            b.layers.children("div").width(normalWidth).height(normalHeight);
            b.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
            b.setControlsSize();
            b.isFullScreen = false;
            b.container.find(".mejs-captions-text").css("font-size", "");
            b.container.find(".mejs-captions-position").css("bottom", "")
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
        defaultSpeed: "1.00",
        speedChar: "x"
    });
    a.extend(MediaElementPlayer.prototype, {
        buildspeed: function(k, l, g, c) {
            var m = this;
            if (m.media.pluginType == "native") {
                var d = null,
                    e = null,
                    b = null,
                    h = '<div class="mejs-button mejs-speed-button"><button type="button">' + m.options.defaultSpeed + m.options.speedChar + '</button><div class="mejs-speed-selector"><ul>';
                if (a.inArray(m.options.defaultSpeed, m.options.speeds) === -1) {
                    m.options.speeds.push(m.options.defaultSpeed)
                }
                m.options.speeds.sort(function(o, n) {
                    return parseFloat(n) - parseFloat(o)
                });
                for (var f = 0, j = m.options.speeds.length; f < j; f++) {
                    h += '<li><input type="radio" name="speed" value="' + m.options.speeds[f] + '" id="' + m.options.speeds[f] + '" ' + (m.options.speeds[f] == m.options.defaultSpeed ? " checked" : "") + ' /><label for="' + m.options.speeds[f] + '" ' + (m.options.speeds[f] == m.options.defaultSpeed ? ' class="mejs-speed-selected"' : "") + ">" + m.options.speeds[f] + m.options.speedChar + "</label></li>"
                }
                h += "</ul></div></div>";
                d = a(h).appendTo(l);
                e = d.find(".mejs-speed-selector");
                playbackspeed = m.options.defaultSpeed;
                e.on("click", 'input[type="radio"]', function() {
                    var n = a(this).attr("value");
                    playbackspeed = n;
                    c.playbackRate = parseFloat(n);
                    d.find("button").html("test" + n + m.options.speedChar);
                    d.find(".mejs-speed-selected").removeClass("mejs-speed-selected");
                    d.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                });
                e.height(d.find(".mejs-speed-selector ul").outerHeight(true) + d.find(".mejs-speed-translations").outerHeight(true)).css("top", (-1 * e.height()) + "px")
            }
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: true,
        toggleCaptionsButtonWhenOnlyOne: false,
        slidesSelector: ""
    });
    a.extend(MediaElementPlayer.prototype, {
        hasChapters: false,
        buildtracks: function(f, b, j, h) {
            if (f.tracks.length === 0) {
                return
            }
            var e = this,
                d, c = "";
            if (e.domNode.textTracks) {
                for (d = e.domNode.textTracks.length - 1; d >= 0; d--) {
                    e.domNode.textTracks[d].mode = "hidden"
                }
            }
            f.chapters = a('<div class="mejs-chapters mejs-layer"></div>').prependTo(j).hide();
            f.captions = a('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" role="log" aria-live="assertive" aria-atomic="false"><span class="mejs-captions-text"></span></div></div>').prependTo(j).hide();
            f.captionsText = f.captions.find(".mejs-captions-text");
            f.captionsButton = a('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + e.id + '" title="' + e.options.tracksText + '" aria-label="' + e.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + f.id + '_captions" id="' + f.id + '_captions_none" value="none" checked="checked" /><label for="' + f.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(b);
            var g = 0;
            for (d = 0; d < f.tracks.length; d++) {
                if (f.tracks[d].kind == "subtitles") {
                    g++
                }
            }
            if (e.options.toggleCaptionsButtonWhenOnlyOne && g == 1) {
                f.captionsButton.on("click", function() {
                    if (f.selectedTrack === null) {
                        lang = f.tracks[0].srclang
                    } else {
                        lang = "none"
                    }
                    f.setTrack(lang)
                })
            } else {
                f.captionsButton.on("mouseenter focusin", function() {
                    a(this).find(".mejs-captions-selector").css("visibility", "visible")
                }).on("click", "input[type=radio]", function() {
                    lang = this.value;
                    f.setTrack(lang)
                });
                f.captionsButton.on("mouseleave focusout", function() {
                    a(this).find(".mejs-captions-selector").css("visibility", "hidden")
                })
            }
            if (!f.options.alwaysShowControls) {
                f.container.bind("controlsshown", function() {
                    f.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function() {
                    if (!h.paused) {
                        f.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                    }
                })
            } else {
                f.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
            }
            f.trackToLoad = -1;
            f.selectedTrack = null;
            f.isLoadingTrack = false;
            for (d = 0; d < f.tracks.length; d++) {
                if (f.tracks[d].kind == "subtitles") {
                    f.addTrackButton(f.tracks[d].srclang, f.tracks[d].label)
                }
            }
            f.loadNextTrack();
            h.addEventListener("timeupdate", function(k) {
                f.displayCaptions()
            }, false);
            if (f.options.slidesSelector !== "") {
                f.slidesContainer = a(f.options.slidesSelector);
                h.addEventListener("timeupdate", function(k) {
                    f.displaySlides()
                }, false)
            }
            h.addEventListener("loadedmetadata", function(k) {
                f.displayChapters()
            }, false);
            f.container.hover(function() {
                if (f.hasChapters) {
                    f.chapters.css("visibility", "visible");
                    f.chapters.fadeIn(200).height(f.chapters.find(".mejs-chapter").outerHeight())
                }
            }, function() {
                if (f.hasChapters && !h.paused) {
                    f.chapters.fadeOut(200, function() {
                        a(this).css("visibility", "hidden");
                        a(this).css("display", "block")
                    })
                }
            });
            if (f.node.getAttribute("autoplay") !== null) {
                f.chapters.css("visibility", "hidden")
            }
        },
        setTrack: function(d) {
            var c = this,
                b;
            if (d == "none") {
                c.selectedTrack = null;
                c.captionsButton.removeClass("mejs-captions-enabled")
            } else {
                for (b = 0; b < c.tracks.length; b++) {
                    if (c.tracks[b].srclang == d) {
                        if (c.selectedTrack === null) {
                            c.captionsButton.addClass("mejs-captions-enabled")
                        }
                        c.selectedTrack = c.tracks[b];
                        c.captions.attr("lang", c.selectedTrack.srclang);
                        c.displayCaptions();
                        break
                    }
                }
            }
        },
        loadNextTrack: function() {
            var b = this;
            b.trackToLoad++;
            if (b.trackToLoad < b.tracks.length) {
                b.isLoadingTrack = true;
                b.loadTrack(b.trackToLoad)
            } else {
                b.isLoadingTrack = false;
                b.checkForTracks()
            }
        },
        loadTrack: function(c) {
            var d = this,
                b = d.tracks[c],
                e = function() {
                    b.isLoaded = true;
                    d.enableTrackButton(b.srclang, b.label);
                    d.loadNextTrack()
                };
            a.ajax({
                url: b.src,
                dataType: "text",
                success: function(f) {
                    if (typeof f == "string" && (/<tt\s+xml/ig).exec(f)) {
                        b.entries = mejs.TrackFormatParser.dfxp.parse(f)
                    } else {
                        b.entries = mejs.TrackFormatParser.webvtt.parse(f)
                    }
                    e();
                    if (b.kind == "chapters") {
                        d.media.addEventListener("play", function(g) {
                            if (d.media.duration > 0) {
                                d.displayChapters(b)
                            }
                        }, false)
                    }
                    if (b.kind == "slides") {
                        d.setupSlides(b)
                    }
                },
                error: function() {
                    d.loadNextTrack()
                }
            })
        },
        enableTrackButton: function(d, b) {
            var c = this;
            if (b === "") {
                b = mejs.language.codes[d] || d
            }
            c.captionsButton.find("input[value=" + d + "]").prop("disabled", false).siblings("label").html(b);
            if (c.options.startLanguage == d) {
                a("#" + c.id + "_captions_" + d).prop("checked", true).trigger("click")
            }
            c.adjustLanguageBox()
        },
        addTrackButton: function(d, b) {
            var c = this;
            if (b === "") {
                b = mejs.language.codes[d] || d
            }
            c.captionsButton.find("ul").append(a('<li><input type="radio" name="' + c.id + '_captions" id="' + c.id + "_captions_" + d + '" value="' + d + '" disabled="disabled" /><label for="' + c.id + "_captions_" + d + '">' + b + " (loading)</label></li>"));
            c.adjustLanguageBox();
            c.container.find(".mejs-captions-translations option[value=" + d + "]").remove()
        },
        adjustLanguageBox: function() {
            var b = this;
            b.captionsButton.find(".mejs-captions-selector").height(b.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) + b.captionsButton.find(".mejs-captions-translations").outerHeight(true))
        },
        checkForTracks: function() {
            var b = this,
                c = false;
            if (b.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < b.tracks.length; i++) {
                    if (b.tracks[i].kind == "subtitles") {
                        c = true;
                        break
                    }
                }
                if (!c) {
                    b.captionsButton.hide();
                    b.setControlsSize()
                }
            }
        },
        displayCaptions: function() {
            if (typeof this.tracks == "undefined") {
                return
            }
            var d = this,
                c, b = d.selectedTrack;
            if (b !== null && b.isLoaded) {
                for (c = 0; c < b.entries.times.length; c++) {
                    if (d.media.currentTime >= b.entries.times[c].start && d.media.currentTime <= b.entries.times[c].stop) {
                        d.captionsText.html(b.entries.text[c]).attr("class", "mejs-captions-text " + (b.entries.times[c].identifier || ""));
                        d.captions.show().height(0);
                        return
                    }
                }
                d.captions.hide()
            } else {
                d.captions.hide()
            }
        },
        setupSlides: function(b) {
            var c = this;
            c.slides = b;
            c.slides.entries.imgs = [c.slides.entries.text.length];
            c.showSlide(0)
        },
        showSlide: function(d) {
            if (typeof this.tracks == "undefined" || typeof this.slidesContainer == "undefined") {
                return
            }
            var e = this,
                c = e.slides.entries.text[d],
                b = e.slides.entries.imgs[d];
            if (typeof b == "undefined" || typeof b.fadeIn == "undefined") {
                e.slides.entries.imgs[d] = b = a('<img src="' + c + '">').on("load", function() {
                    b.appendTo(e.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                })
            } else {
                if (!b.is(":visible") && !b.is(":animated")) {
                    b.fadeIn().siblings(":visible").fadeOut()
                }
            }
        },
        displaySlides: function() {
            if (typeof this.slides == "undefined") {
                return
            }
            var c = this,
                d = c.slides,
                b;
            for (b = 0; b < d.entries.times.length; b++) {
                if (c.media.currentTime >= d.entries.times[b].start && c.media.currentTime <= d.entries.times[b].stop) {
                    c.showSlide(b);
                    return
                }
            }
        },
        displayChapters: function() {
            var c = this,
                b;
            for (b = 0; b < c.tracks.length; b++) {
                if (c.tracks[b].kind == "chapters" && c.tracks[b].isLoaded) {
                    c.drawChapters(c.tracks[b]);
                    c.hasChapters = true;
                    break
                }
            }
        },
        drawChapters: function(f) {
            var c = this,
                b, d, e = 0,
                g = 0;
            c.chapters.empty();
            for (b = 0; b < f.entries.times.length; b++) {
                d = f.entries.times[b].stop - f.entries.times[b].start;
                e = Math.floor(d / c.media.duration * 100);
                if (e + g > 100 || b == f.entries.times.length - 1 && e + g < 100) {
                    e = 100 - g
                }
                c.chapters.append(a('<div class="mejs-chapter" rel="' + f.entries.times[b].start + '" style="left: ' + g.toString() + "%;width: " + e.toString() + '%;"><div class="mejs-chapter-block' + ((b == f.entries.times.length - 1) ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + f.entries.text[b] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(f.entries.times[b].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(f.entries.times[b].stop) + "</span></div></div>"));
                g += e
            }
            c.chapters.find("div.mejs-chapter").click(function() {
                c.media.setCurrentTime(parseFloat(a(this).attr("rel")));
                if (c.media.paused) {
                    c.media.play()
                }
            });
            c.chapters.show()
        }
    });
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            fl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    };
    mejs.TrackFormatParser = {
        webvtt: {
            pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function(h) {
                var f = 0,
                    d = mejs.TrackFormatParser.split2(h, /\r?\n/),
                    c = {
                        text: [],
                        times: []
                    },
                    b, g, e;
                for (; f < d.length; f++) {
                    b = this.pattern_timecode.exec(d[f]);
                    if (b && f < d.length) {
                        if ((f - 1) >= 0 && d[f - 1] !== "") {
                            e = d[f - 1]
                        }
                        f++;
                        g = d[f];
                        f++;
                        while (d[f] !== "" && f < d.length) {
                            g = g + "\n" + d[f];
                            f++
                        }
                        g = a.trim(g).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
                        c.text.push(g);
                        c.times.push({
                            identifier: e,
                            start: (mejs.Utility.convertSMPTEtoSeconds(b[1]) === 0) ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(b[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(b[3]),
                            settings: b[5]
                        })
                    }
                    e = ""
                }
                return c
            }
        },
        dfxp: {
            parse: function(l) {
                l = a(l).filter("tt");
                var j = 0,
                    c = l.children("div").eq(0),
                    p = c.find("p"),
                    h = l.find("#" + c.attr("style")),
                    o, d, f, n, k = {
                        text: [],
                        times: []
                    };
                if (h.length) {
                    var g = h.removeAttr("id").get(0).attributes;
                    if (g.length) {
                        o = {};
                        for (j = 0; j < g.length; j++) {
                            o[g[j].name.split(":")[1]] = g[j].value
                        }
                    }
                }
                for (j = 0; j < p.length; j++) {
                    var b;
                    var m = {
                        start: null,
                        stop: null,
                        style: null
                    };
                    if (p.eq(j).attr("begin")) {
                        m.start = mejs.Utility.convertSMPTEtoSeconds(p.eq(j).attr("begin"))
                    }
                    if (!m.start && p.eq(j - 1).attr("end")) {
                        m.start = mejs.Utility.convertSMPTEtoSeconds(p.eq(j - 1).attr("end"))
                    }
                    if (p.eq(j).attr("end")) {
                        m.stop = mejs.Utility.convertSMPTEtoSeconds(p.eq(j).attr("end"))
                    }
                    if (!m.stop && p.eq(j + 1).attr("begin")) {
                        m.stop = mejs.Utility.convertSMPTEtoSeconds(p.eq(j + 1).attr("begin"))
                    }
                    if (o) {
                        b = "";
                        for (var e in o) {
                            b += e + ":" + o[e] + ";"
                        }
                    }
                    if (b) {
                        m.style = b
                    }
                    if (m.start === 0) {
                        m.start = 0.2
                    }
                    k.times.push(m);
                    n = a.trim(p.eq(j).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
                    k.text.push(n);
                    if (k.times.start === 0) {
                        k.times.start = 2
                    }
                }
                return k
            }
        },
        split2: function(c, b) {
            return c.split(b)
        }
    };
    if ("x\n\ny".split(/\n/gi).length != 3) {
        mejs.TrackFormatParser.split2 = function(f, d) {
            var e = [],
                b = "",
                c;
            for (c = 0; c < f.length; c++) {
                b += f.substring(c, c + 1);
                if (d.test(b)) {
                    e.push(b.replace(d, ""));
                    b = ""
                }
            }
            e.push(b);
            return e
        }
    }
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function(b) {
                if (typeof b.enterFullScreen == "undefined") {
                    return null
                }
                if (b.isFullScreen) {
                    return mejs.i18n.t("Turn off Fullscreen")
                } else {
                    return mejs.i18n.t("Go Fullscreen")
                }
            },
            click: function(b) {
                if (b.isFullScreen) {
                    b.exitFullScreen()
                } else {
                    b.enterFullScreen()
                }
            }
        }, {
            render: function(b) {
                if (b.media.muted) {
                    return mejs.i18n.t("Unmute")
                } else {
                    return mejs.i18n.t("Mute")
                }
            },
            click: function(b) {
                if (b.media.muted) {
                    b.setMuted(false)
                } else {
                    b.setMuted(true)
                }
            }
        }, {
            isSeparator: true
        }, {
            render: function(b) {
                return mejs.i18n.t("Download Video")
            },
            click: function(b) {
                window.location.href = b.media.currentSrc
            }
        }]
    });
    a.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(c, b, e, d) {
            c.contextMenu = a('<div class="mejs-contextmenu"></div>').appendTo(a("body")).hide();
            c.container.bind("contextmenu", function(f) {
                if (c.isContextMenuEnabled) {
                    f.preventDefault();
                    c.renderContextMenu(f.clientX - 1, f.clientY - 1);
                    return false
                }
            });
            c.container.bind("click", function() {
                c.contextMenu.hide()
            });
            c.contextMenu.bind("mouseleave", function() {
                c.startContextMenuTimer()
            })
        },
        cleancontextmenu: function(b) {
            b.contextMenu.remove()
        },
        isContextMenuEnabled: true,
        enableContextMenu: function() {
            this.isContextMenuEnabled = true
        },
        disableContextMenu: function() {
            this.isContextMenuEnabled = false
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function() {
            var b = this;
            b.killContextMenuTimer();
            b.contextMenuTimer = setTimeout(function() {
                b.hideContextMenu();
                b.killContextMenuTimer()
            }, 750)
        },
        killContextMenuTimer: function() {
            var b = this.contextMenuTimer;
            if (b != null) {
                clearTimeout(b);
                delete b;
                b = null
            }
        },
        hideContextMenu: function() {
            this.contextMenu.hide()
        },
        renderContextMenu: function(b, j) {
            var g = this,
                f = "",
                d = g.options.contextMenuItems;
            for (var e = 0, c = d.length; e < c; e++) {
                if (d[e].isSeparator) {
                    f += '<div class="mejs-contextmenu-separator"></div>'
                } else {
                    var h = d[e].render(g);
                    if (h != null) {
                        f += '<div class="mejs-contextmenu-item" data-itemindex="' + e + '" id="element-' + (Math.random() * 1000000) + '">' + h + "</div>"
                    }
                }
            }
            g.contextMenu.empty().append(a(f)).css({
                top: j,
                left: b
            }).show();
            g.contextMenu.find(".mejs-contextmenu-item").each(function() {
                var k = a(this),
                    l = parseInt(k.data("itemindex"), 10),
                    m = g.options.contextMenuItems[l];
                if (typeof m.show != "undefined") {
                    m.show(k, g)
                }
                k.click(function() {
                    if (typeof m.click != "undefined") {
                        m.click(g)
                    }
                    g.contextMenu.hide()
                })
            });
            setTimeout(function() {
                g.killControlsTimer("rev3")
            }, 100)
        }
    })
})(mejs.$);
(function(a) {
    a.extend(mejs.MepDefaults, {
        postrollCloseText: mejs.i18n.t("Close")
    });
    a.extend(MediaElementPlayer.prototype, {
        buildpostroll: function(e, c, g, f) {
            var d = this,
                b = d.container.find('link[rel="postroll"]').attr("href");
            if (typeof b !== "undefined") {
                e.postroll = a('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + d.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(g).hide();
                d.media.addEventListener("ended", function(h) {
                    a.ajax({
                        dataType: "html",
                        url: b,
                        success: function(j, k) {
                            g.find(".mejs-postroll-layer-content").html(j)
                        }
                    });
                    e.postroll.show()
                }, false)
            }
        }
    })
})(mejs.$);
(function(j, m, o, g) {
    var k, b, l;
    k = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    };
    b = {
        isTouch: false,
        isScrolling: false,
        isSwiping: false,
        direction: false,
        inMotion: false
    };
    l = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    };

    function c(r, e) {
        this.settings = null;
        this.options = j.extend({}, c.Defaults, e);
        this.$element = j(r);
        this.drag = j.extend({}, k);
        this.state = j.extend({}, b);
        this.e = j.extend({}, l);
        this._plugins = {};
        this._supress = {};
        this._current = null;
        this._speed = null;
        this._coordinates = [];
        this._breakpoint = null;
        this._width = null;
        this._items = [];
        this._clones = [];
        this._mergers = [];
        this._invalidated = {};
        this._pipe = [];
        j.each(c.Plugins, j.proxy(function(s, t) {
            this._plugins[s[0].toLowerCase() + s.slice(1)] = new t(this)
        }, this));
        j.each(c.Pipe, j.proxy(function(s, t) {
            this._pipe.push({
                filter: t.filter,
                run: j.proxy(t.run, this)
            })
        }, this));
        this.setup();
        this.initialize()
    }
    c.Defaults = {
        items: 3,
        loop: false,
        center: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        rtl: false,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: m,
        responsiveClass: false,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    };
    c.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    };
    c.Plugins = {};
    c.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(e) {
            e.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var e = this._clones,
                r = this.$stage.children(".cloned");
            if (r.length !== e.length || (!this.settings.loop && e.length > 0)) {
                this.$stage.children(".cloned").remove();
                this._clones = []
            }
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var r, u, s = this._clones,
                e = this._items,
                t = this.settings.loop ? s.length - Math.max(this.settings.items * 2, 4) : 0;
            for (r = 0, u = Math.abs(t / 2); r < u; r++) {
                if (t > 0) {
                    this.$stage.children().eq(e.length + s.length - 1).remove();
                    s.pop();
                    this.$stage.children().eq(0).remove();
                    s.pop()
                } else {
                    s.push(s.length / 2);
                    this.$stage.append(e[s[s.length - 1]].clone().addClass("cloned"));
                    s.push(e.length - 1 - (s.length - 1) / 2);
                    this.$stage.prepend(e[s[s.length - 1]].clone().addClass("cloned"))
                }
            }
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var s = (this.settings.rtl ? 1 : -1),
                r = (this.width() / this.settings.items).toFixed(3),
                v = 0,
                u, e, t;
            this._coordinates = [];
            for (e = 0, t = this._clones.length + this._items.length; e < t; e++) {
                u = this._mergers[this.relative(e)];
                u = (this.settings.mergeFit && Math.min(u, this.settings.items)) || u;
                v += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : r * u) * s;
                this._coordinates.push(v)
            }
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var r, t, s = (this.width() / this.settings.items).toFixed(3),
                e = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + this.settings.stagePadding * 2,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            this.$stage.css(e);
            e = {
                width: this.settings.autoWidth ? "auto" : s - this.settings.margin
            };
            e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin;
            if (!this.settings.autoWidth && j.grep(this._mergers, function(u) {
                    return u > 1
                }).length > 0) {
                for (r = 0, t = this._coordinates.length; r < t; r++) {
                    e.width = Math.abs(this._coordinates[r]) - Math.abs(this._coordinates[r - 1] || 0) - this.settings.margin;
                    this.$stage.children().eq(r).css(e)
                }
            } else {
                this.$stage.children().css(e)
            }
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(e) {
            e.current && this.reset(this.$stage.children().index(e.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var v = this.settings.rtl ? 1 : -1,
                w = this.settings.stagePadding * 2,
                r = this.coordinates(this.current()) + w,
                s = r + this.width() * v,
                y, x, u = [],
                t, e;
            for (t = 0, e = this._coordinates.length; t < e; t++) {
                y = this._coordinates[t - 1] || 0;
                x = Math.abs(this._coordinates[t]) + w * v;
                if ((this.op(y, "<=", r) && (this.op(y, ">", s))) || (this.op(x, "<", r) && this.op(x, ">", s))) {
                    u.push(t)
                }
            }
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass);
            this.$stage.children(":eq(" + u.join("), :eq(") + ")").addClass(this.settings.activeClass);
            if (this.settings.center) {
                this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass);
                this.$stage.children().eq(this.current()).addClass(this.settings.centerClass)
            }
        }
    }];
    c.prototype.initialize = function() {
        this.trigger("initialize");
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl);
        this.browserSupport();
        if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
            var s, r, e;
            s = this.$element.find("img");
            r = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : g;
            e = this.$element.children(r).width();
            if (s.length && e <= 0) {
                this.preloadAutoWidthImages(s);
                return false
            }
        }
        this.$element.addClass("owl-loading");
        this.$stage = j("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">');
        this.$element.append(this.$stage.parent());
        this.replace(this.$element.children().not(this.$stage.parent()));
        this._width = this.$element.width();
        this.refresh();
        this.$element.removeClass("owl-loading").addClass("owl-loaded");
        this.eventsCall();
        this.internalEvents();
        this.addTriggerableEvents();
        this.trigger("initialized")
    };
    c.prototype.setup = function() {
        var e = this.viewport(),
            s = this.options.responsive,
            r = -1,
            t = null;
        if (!s) {
            t = j.extend({}, this.options)
        } else {
            j.each(s, function(u) {
                if (u <= e && u > r) {
                    r = Number(u)
                }
            });
            t = j.extend({}, this.options, s[r]);
            delete t.responsive;
            if (t.responsiveClass) {
                this.$element.attr("class", function(u, v) {
                    return v.replace(/\b owl-responsive-\S+/g, "")
                }).addClass("owl-responsive-" + r)
            }
        }
        if (this.settings === null || this._breakpoint !== r) {
            this.trigger("change", {
                property: {
                    name: "settings",
                    value: t
                }
            });
            this._breakpoint = r;
            this.settings = t;
            this.invalidate("settings");
            this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }
    };
    c.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center);
        if (this.settings.loop && this._items.length < this.settings.items) {
            this.settings.loop = false
        }
        if (this.settings.autoWidth) {
            this.settings.stagePadding = false;
            this.settings.merge = false
        }
    };
    c.prototype.prepare = function(r) {
        var e = this.trigger("prepare", {
            content: r
        });
        if (!e.data) {
            e.data = j("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(r)
        }
        this.trigger("prepared", {
            content: e.data
        });
        return e.data
    };
    c.prototype.update = function() {
        var r = 0,
            t = this._pipe.length,
            s = j.proxy(function(u) {
                return this[u]
            }, this._invalidated),
            e = {};
        while (r < t) {
            if (this._invalidated.all || j.grep(this._pipe[r].filter, s).length > 0) {
                this._pipe[r].run(e)
            }
            r++
        }
        this._invalidated = {}
    };
    c.prototype.width = function(e) {
        e = e || c.Width.Default;
        switch (e) {
            case c.Width.Inner:
            case c.Width.Outer:
                return this._width;
            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin
        }
    };
    c.prototype.refresh = function() {
        if (this._items.length === 0) {
            return false
        }
        var e = new Date().getTime();
        this.trigger("refresh");
        this.setup();
        this.optionsLogic();
        this.$stage.addClass("owl-refresh");
        this.update();
        this.$stage.removeClass("owl-refresh");
        this.state.orientation = m.orientation;
        this.watchVisibility();
        this.trigger("refreshed")
    };
    c.prototype.eventsCall = function() {
        this.e._onDragStart = j.proxy(function(r) {
            this.onDragStart(r)
        }, this);
        this.e._onDragMove = j.proxy(function(r) {
            this.onDragMove(r)
        }, this);
        this.e._onDragEnd = j.proxy(function(r) {
            this.onDragEnd(r)
        }, this);
        this.e._onResize = j.proxy(function(r) {
            this.onResize(r)
        }, this);
        this.e._transitionEnd = j.proxy(function(r) {
            this.transitionEnd(r)
        }, this);
        this.e._preventClick = j.proxy(function(r) {
            this.preventClick(r)
        }, this)
    };
    c.prototype.onThrottledResize = function() {
        m.clearTimeout(this.resizeTimer);
        this.resizeTimer = m.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    };
    c.prototype.onResize = function() {
        if (!this._items.length) {
            return false
        }
        if (this._width === this.$element.width()) {
            return false
        }
        if (this.trigger("resize").isDefaultPrevented()) {
            return false
        }
        this._width = this.$element.width();
        this.invalidate("width");
        this.refresh();
        this.trigger("resized")
    };
    c.prototype.eventsRouter = function(r) {
        var e = r.type;
        if (e === "mousedown" || e === "touchstart") {
            this.onDragStart(r)
        } else {
            if (e === "mousemove" || e === "touchmove") {
                this.onDragMove(r)
            } else {
                if (e === "mouseup" || e === "touchend") {
                    this.onDragEnd(r)
                } else {
                    if (e === "touchcancel") {
                        this.onDragEnd(r)
                    }
                }
            }
        }
    };
    c.prototype.internalEvents = function() {
        var e = n(),
            r = q();
        if (this.settings.mouseDrag) {
            this.$stage.on("mousedown", j.proxy(function(s) {
                this.eventsRouter(s)
            }, this));
            this.$stage.on("dragstart", function() {
                return false
            });
            this.$stage.get(0).onselectstart = function() {
                return false
            }
        } else {
            this.$element.addClass("owl-text-select-on")
        }
        if (this.settings.touchDrag && !r) {
            this.$stage.on("touchstart touchcancel", j.proxy(function(s) {
                this.eventsRouter(s)
            }, this))
        }
        if (this.transitionEndVendor) {
            this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, false)
        }
        if (this.settings.responsive !== false) {
            this.on(m, "resize", j.proxy(this.onThrottledResize, this))
        }
    };
    c.prototype.onDragStart = function(u) {
        var t, v, s, r, e;
        t = u.originalEvent || u || m.event;
        if (t.which === 3 || this.state.isTouch) {
            return false
        }
        if (t.type === "mousedown") {
            this.$stage.addClass("owl-grab")
        }
        this.trigger("drag");
        this.drag.startTime = new Date().getTime();
        this.speed(0);
        this.state.isTouch = true;
        this.state.isScrolling = false;
        this.state.isSwiping = false;
        this.drag.distance = 0;
        s = d(t).x;
        r = d(t).y;
        this.drag.offsetX = this.$stage.position().left;
        this.drag.offsetY = this.$stage.position().top;
        if (this.settings.rtl) {
            this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin
        }
        if (this.state.inMotion && this.support3d) {
            e = this.getTransformProperty();
            this.drag.offsetX = e;
            this.animate(e);
            this.state.inMotion = true
        } else {
            if (this.state.inMotion && !this.support3d) {
                this.state.inMotion = false;
                return false
            }
        }
        this.drag.startX = s - this.drag.offsetX;
        this.drag.startY = r - this.drag.offsetY;
        this.drag.start = s - this.drag.startX;
        this.drag.targetEl = t.target || t.srcElement;
        this.drag.updatedX = this.drag.start;
        if (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") {
            this.drag.targetEl.draggable = false
        }
        j(o).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", j.proxy(function(w) {
            this.eventsRouter(w)
        }, this))
    };
    c.prototype.onDragMove = function(t) {
        var s, x, r, e, v, w, u;
        if (!this.state.isTouch) {
            return
        }
        if (this.state.isScrolling) {
            return
        }
        s = t.originalEvent || t || m.event;
        r = d(s).x;
        e = d(s).y;
        this.drag.currentX = r - this.drag.startX;
        this.drag.currentY = e - this.drag.startY;
        this.drag.distance = this.drag.currentX - this.drag.offsetX;
        if (this.drag.distance < 0) {
            this.state.direction = this.settings.rtl ? "right" : "left"
        } else {
            if (this.drag.distance > 0) {
                this.state.direction = this.settings.rtl ? "left" : "right"
            }
        }
        if (this.settings.loop) {
            if (this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && this.state.direction === "right") {
                this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)
            } else {
                if (this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && this.state.direction === "left") {
                    this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)
                }
            }
        } else {
            v = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
            w = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
            u = this.settings.pullDrag ? this.drag.distance / 5 : 0;
            this.drag.currentX = Math.max(Math.min(this.drag.currentX, v + u), w + u)
        }
        if ((this.drag.distance > 8 || this.drag.distance < -8)) {
            if (s.preventDefault !== g) {
                s.preventDefault()
            } else {
                s.returnValue = false
            }
            this.state.isSwiping = true
        }
        this.drag.updatedX = this.drag.currentX;
        if ((this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === false) {
            this.state.isScrolling = true;
            this.drag.updatedX = this.drag.start
        }
        this.animate(this.drag.updatedX)
    };
    c.prototype.onDragEnd = function(t) {
        var r, e, s;
        if (!this.state.isTouch) {
            return
        }
        if (t.type === "mouseup") {
            this.$stage.removeClass("owl-grab")
        }
        this.trigger("dragged");
        this.drag.targetEl.removeAttribute("draggable");
        this.state.isTouch = false;
        this.state.isScrolling = false;
        this.state.isSwiping = false;
        if (this.drag.distance === 0 && this.state.inMotion !== true) {
            this.state.inMotion = false;
            return false
        }
        this.drag.endTime = new Date().getTime();
        r = this.drag.endTime - this.drag.startTime;
        e = Math.abs(this.drag.distance);
        if (e > 3 || r > 300) {
            this.removeClick(this.drag.targetEl)
        }
        s = this.closest(this.drag.updatedX);
        this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
        this.current(s);
        this.invalidate("position");
        this.update();
        if (!this.settings.pullDrag && this.drag.updatedX === this.coordinates(s)) {
            this.transitionEnd()
        }
        this.drag.distance = 0;
        j(o).off(".owl.dragEvents")
    };
    c.prototype.removeClick = function(e) {
        this.drag.targetEl = e;
        j(e).on("click.preventClick", this.e._preventClick);
        m.setTimeout(function() {
            j(e).off("click.preventClick")
        }, 300)
    };
    c.prototype.preventClick = function(e) {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        }
        j(e.target).off("click.preventClick")
    };
    c.prototype.getTransformProperty = function() {
        var e, r;
        e = m.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform");
        e = e.replace(/matrix(3d)?\(|\)/g, "").split(",");
        r = e.length === 16;
        return r !== true ? e[4] : e[12]
    };
    c.prototype.closest = function(u) {
        var e = -1,
            s = 30,
            r = this.width(),
            t = this.coordinates();
        if (!this.settings.freeDrag) {
            j.each(t, j.proxy(function(v, w) {
                if (u > w - s && u < w + s) {
                    e = v
                } else {
                    if (this.op(u, "<", w) && this.op(u, ">", t[v + 1] || w - r)) {
                        e = this.state.direction === "left" ? v + 1 : v
                    }
                }
                return e === -1
            }, this))
        }
        if (!this.settings.loop) {
            if (this.op(u, ">", t[this.minimum()])) {
                e = u = this.minimum()
            } else {
                if (this.op(u, "<", t[this.maximum()])) {
                    e = u = this.maximum()
                }
            }
        }
        return e
    };
    c.prototype.animate = function(e) {
        this.trigger("translate");
        this.state.inMotion = this.speed() > 0;
        if (this.support3d) {
            this.$stage.css({
                transform: "translate3d(" + e + "px,0px, 0px)",
                transition: (this.speed() / 1000) + "s"
            })
        } else {
            if (this.state.isTouch) {
                this.$stage.css({
                    left: e + "px"
                })
            } else {
                this.$stage.animate({
                    left: e
                }, this.speed() / 1000, this.settings.fallbackEasing, j.proxy(function() {
                    if (this.state.inMotion) {
                        this.transitionEnd()
                    }
                }, this))
            }
        }
    };
    c.prototype.current = function(e) {
        if (e === g) {
            return this._current
        }
        if (this._items.length === 0) {
            return g
        }
        e = this.normalize(e);
        if (this._current !== e) {
            var r = this.trigger("change", {
                property: {
                    name: "position",
                    value: e
                }
            });
            if (r.data !== g) {
                e = this.normalize(r.data)
            }
            this._current = e;
            this.invalidate("position");
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    };
    c.prototype.invalidate = function(e) {
        this._invalidated[e] = true
    };
    c.prototype.reset = function(e) {
        e = this.normalize(e);
        if (e === g) {
            return
        }
        this._speed = 0;
        this._current = e;
        this.suppress(["translate", "translated"]);
        this.animate(this.coordinates(e));
        this.release(["translate", "translated"])
    };
    c.prototype.normalize = function(e, r) {
        var s = (r ? this._items.length : this._items.length + this._clones.length);
        if (!j.isNumeric(e) || s < 1) {
            return g
        }
        if (this._clones.length) {
            e = ((e % s) + s) % s
        } else {
            e = Math.max(this.minimum(r), Math.min(this.maximum(r), e))
        }
        return e
    };
    c.prototype.relative = function(e) {
        e = this.normalize(e);
        e = e - this._clones.length / 2;
        return this.normalize(e, true)
    };
    c.prototype.maximum = function(t) {
        var u, s, e = 0,
            v, r = this.settings;
        if (t) {
            return this._items.length - 1
        }
        if (!r.loop && r.center) {
            u = this._items.length - 1
        } else {
            if (!r.loop && !r.center) {
                u = this._items.length - r.items
            } else {
                if (r.loop || r.center) {
                    u = this._items.length + r.items
                } else {
                    if (r.autoWidth || r.merge) {
                        revert = r.rtl ? 1 : -1;
                        s = this.$stage.width() - this.$element.width();
                        while (v = this.coordinates(e)) {
                            if (v * revert >= s) {
                                break
                            }
                            u = ++e
                        }
                    } else {
                        throw "Can not detect maximum absolute position."
                    }
                }
            }
        }
        return u
    };
    c.prototype.minimum = function(e) {
        if (e) {
            return 0
        }
        return this._clones.length / 2
    };
    c.prototype.items = function(e) {
        if (e === g) {
            return this._items.slice()
        }
        e = this.normalize(e, true);
        return this._items[e]
    };
    c.prototype.mergers = function(e) {
        if (e === g) {
            return this._mergers.slice()
        }
        e = this.normalize(e, true);
        return this._mergers[e]
    };
    c.prototype.clones = function(e) {
        var r = this._clones.length / 2,
            t = r + this._items.length,
            s = function(u) {
                return u % 2 === 0 ? t + u / 2 : r - (u + 1) / 2
            };
        if (e === g) {
            return j.map(this._clones, function(u, w) {
                return s(w)
            })
        }
        return j.map(this._clones, function(u, w) {
            return u === e ? s(w) : null
        })
    };
    c.prototype.speed = function(e) {
        if (e !== g) {
            this._speed = e
        }
        return this._speed
    };
    c.prototype.coordinates = function(e) {
        var r = null;
        if (e === g) {
            return j.map(this._coordinates, j.proxy(function(t, s) {
                return this.coordinates(s)
            }, this))
        }
        if (this.settings.center) {
            r = this._coordinates[e];
            r += (this.width() - r + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)
        } else {
            r = this._coordinates[e - 1] || 0
        }
        return r
    };
    c.prototype.duration = function(s, r, e) {
        return Math.min(Math.max(Math.abs(r - s), 1), 6) * Math.abs((e || this.settings.smartSpeed))
    };
    c.prototype.to = function(e, u) {
        if (this.settings.loop) {
            var x = e - this.relative(this.current()),
                r = this.current(),
                t = this.current(),
                w = this.current() + x,
                v = t - w < 0 ? true : false,
                s = this._clones.length + this._items.length;
            if (w < this.settings.items && v === false) {
                r = t + this._items.length;
                this.reset(r)
            } else {
                if (w >= s - this.settings.items && v === true) {
                    r = t - this._items.length;
                    this.reset(r)
                }
            }
            m.clearTimeout(this.e._goToLoop);
            this.e._goToLoop = m.setTimeout(j.proxy(function() {
                this.speed(this.duration(this.current(), r + x, u));
                this.current(r + x);
                this.update()
            }, this), 30)
        } else {
            this.speed(this.duration(this.current(), e, u));
            this.current(e);
            this.update()
        }
    };
    c.prototype.next = function(e) {
        e = e || false;
        this.to(this.relative(this.current()) + 1, e)
    };
    c.prototype.prev = function(e) {
        e = e || false;
        this.to(this.relative(this.current()) - 1, e)
    };
    c.prototype.transitionEnd = function(e) {
        if (e !== g) {
            e.stopPropagation();
            if ((e.target || e.srcElement || e.originalTarget) !== this.$stage.get(0)) {
                return false
            }
        }
        this.state.inMotion = false;
        this.trigger("translated")
    };
    c.prototype.viewport = function() {
        var e;
        if (this.options.responsiveBaseElement !== m) {
            e = j(this.options.responsiveBaseElement).width()
        } else {
            if (m.innerWidth) {
                e = m.innerWidth
            } else {
                if (o.documentElement && o.documentElement.clientWidth) {
                    e = o.documentElement.clientWidth
                } else {
                    throw "Can not detect viewport width."
                }
            }
        }
        return e
    };
    c.prototype.replace = function(e) {
        this.$stage.empty();
        this._items = [];
        if (e) {
            e = (e instanceof jQuery) ? e : j(e)
        }
        if (this.settings.nestedItemSelector) {
            e = e.find("." + this.settings.nestedItemSelector)
        }
        e.filter(function() {
            return this.nodeType === 1
        }).each(j.proxy(function(r, s) {
            s = this.prepare(s);
            this.$stage.append(s);
            this._items.push(s);
            this._mergers.push(s.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        }, this));
        this.reset(j.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate("items")
    };
    c.prototype.add = function(r, e) {
        e = e === g ? this._items.length : this.normalize(e, true);
        this.trigger("add", {
            content: r,
            position: e
        });
        if (this._items.length === 0 || e === this._items.length) {
            this.$stage.append(r);
            this._items.push(r);
            this._mergers.push(r.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        } else {
            this._items[e].before(r);
            this._items.splice(e, 0, r);
            this._mergers.splice(e, 0, r.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        }
        this.invalidate("items");
        this.trigger("added", {
            content: r,
            position: e
        })
    };
    c.prototype.remove = function(e) {
        e = this.normalize(e, true);
        if (e === g) {
            return
        }
        this.trigger("remove", {
            content: this._items[e],
            position: e
        });
        this._items[e].remove();
        this._items.splice(e, 1);
        this._mergers.splice(e, 1);
        this.invalidate("items");
        this.trigger("removed", {
            content: null,
            position: e
        })
    };
    c.prototype.addTriggerableEvents = function() {
        var e = j.proxy(function(s, r) {
            return j.proxy(function(t) {
                if (t.relatedTarget !== this) {
                    this.suppress([r]);
                    s.apply(this, [].slice.call(arguments, 1));
                    this.release([r])
                }
            }, this)
        }, this);
        j.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, j.proxy(function(r, s) {
            this.$element.on(r + ".owl.carousel", e(s, r + ".owl.carousel"))
        }, this))
    };
    c.prototype.watchVisibility = function() {
        if (!r(this.$element.get(0))) {
            this.$element.addClass("owl-hidden");
            m.clearInterval(this.e._checkVisibile);
            this.e._checkVisibile = m.setInterval(j.proxy(e, this), 500)
        }

        function r(s) {
            return s.offsetWidth > 0 && s.offsetHeight > 0
        }

        function e() {
            if (r(this.$element.get(0))) {
                this.$element.removeClass("owl-hidden");
                this.refresh();
                m.clearInterval(this.e._checkVisibile)
            }
        }
    };
    c.prototype.preloadAutoWidthImages = function(u) {
        var r, t, s, e;
        r = 0;
        t = this;
        u.each(function(v, w) {
            s = j(w);
            e = new Image();
            e.onload = function() {
                r++;
                s.attr("src", e.src);
                s.css("opacity", 1);
                if (r >= u.length) {
                    t.state.imagesLoaded = true;
                    t.initialize()
                }
            };
            e.src = s.attr("src") || s.attr("data-src") || s.attr("data-src-retina")
        })
    };
    c.prototype.destroy = function() {
        if (this.$element.hasClass(this.settings.themeClass)) {
            this.$element.removeClass(this.settings.themeClass)
        }
        if (this.settings.responsive !== false) {
            j(m).off("resize.owl.carousel")
        }
        if (this.transitionEndVendor) {
            this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd)
        }
        for (var e in this._plugins) {
            this._plugins[e].destroy()
        }
        if (this.settings.mouseDrag || this.settings.touchDrag) {
            this.$stage.off("mousedown touchstart touchcancel");
            j(o).off(".owl.dragEvents");
            this.$stage.get(0).onselectstart = function() {};
            this.$stage.off("dragstart", function() {
                return false
            })
        }
        this.$element.off(".owl");
        this.$stage.children(".cloned").remove();
        this.e = null;
        this.$element.removeData("owlCarousel");
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$stage.unwrap()
    };
    c.prototype.op = function(r, t, e) {
        var s = this.settings.rtl;
        switch (t) {
            case "<":
                return s ? r > e : r < e;
            case ">":
                return s ? r < e : r > e;
            case ">=":
                return s ? r <= e : r >= e;
            case "<=":
                return s ? r >= e : r <= e;
            default:
                break
        }
    };
    c.prototype.on = function(r, s, t, e) {
        if (r.addEventListener) {
            r.addEventListener(s, t, e)
        } else {
            if (r.attachEvent) {
                r.attachEvent("on" + s, t)
            }
        }
    };
    c.prototype.off = function(r, s, t, e) {
        if (r.removeEventListener) {
            r.removeEventListener(s, t, e)
        } else {
            if (r.detachEvent) {
                r.detachEvent("on" + s, t)
            }
        }
    };
    c.prototype.trigger = function(r, v, t) {
        var e = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            s = j.camelCase(j.grep(["on", r, t], function(w) {
                return w
            }).join("-").toLowerCase()),
            u = j.Event([r, "owl", t || "carousel"].join(".").toLowerCase(), j.extend({
                relatedTarget: this
            }, e, v));
        if (!this._supress[r]) {
            j.each(this._plugins, function(w, x) {
                if (x.onTrigger) {
                    x.onTrigger(u)
                }
            });
            this.$element.trigger(u);
            if (this.settings && typeof this.settings[s] === "function") {
                this.settings[s].apply(this, u)
            }
        }
        return u
    };
    c.prototype.suppress = function(e) {
        j.each(e, j.proxy(function(r, s) {
            this._supress[s] = true
        }, this))
    };
    c.prototype.release = function(e) {
        j.each(e, j.proxy(function(r, s) {
            delete this._supress[s]
        }, this))
    };
    c.prototype.browserSupport = function() {
        this.support3d = p();
        if (this.support3d) {
            this.transformVendor = f();
            var e = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = e[h()];
            this.vendorName = this.transformVendor.replace(/Transform/i, "");
            this.vendorName = this.vendorName !== "" ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = m.orientation
    };

    function d(e) {
        if (e.touches !== g) {
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            }
        }
        if (e.touches === g) {
            if (e.pageX !== g) {
                return {
                    x: e.pageX,
                    y: e.pageY
                }
            }
            if (e.pageX === g) {
                return {
                    x: e.clientX,
                    y: e.clientY
                }
            }
        }
    }

    function a(v) {
        var u, r, e = o.createElement("div"),
            t = v;
        for (u in t) {
            r = t[u];
            if (typeof e.style[r] !== "undefined") {
                e = null;
                return [r, u]
            }
        }
        return [false]
    }

    function h() {
        return a(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function f() {
        return a(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function p() {
        return a(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function n() {
        return "ontouchstart" in m || !!(navigator.msMaxTouchPoints)
    }

    function q() {
        return m.navigator.msPointerEnabled
    }
    j.fn.owlCarousel = function(e) {
        return this.each(function() {
            if (!j(this).data("owlCarousel")) {
                j(this).data("owlCarousel", new c(this, e))
            }
        })
    };
    j.fn.owlCarousel.Constructor = c
})(window.Zepto || window.jQuery, window, document);
(function(d, c, a, e) {
    var b = function(f) {
        this._core = f;
        this._loaded = [];
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel": d.proxy(function(m) {
                if (!m.namespace) {
                    return
                }
                if (!this._core.settings || !this._core.settings.lazyLoad) {
                    return
                }
                if ((m.property && m.property.name == "position") || m.type == "initialized") {
                    var j = this._core.settings,
                        o = (j.center && Math.ceil(j.items / 2) || j.items),
                        h = ((j.center && o * -1) || 0),
                        g = ((m.property && m.property.value) || this._core.current()) + h,
                        l = this._core.clones().length,
                        k = d.proxy(function(p, n) {
                            this.load(n)
                        }, this);
                    while (h++ < o) {
                        this.load(l / 2 + this._core.relative(g));
                        l && d.each(this._core.clones(this._core.relative(g++)), k)
                    }
                }
            }, this)
        };
        this._core.options = d.extend({}, b.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    b.Defaults = {
        lazyLoad: false
    };
    b.prototype.load = function(f) {
        var g = this._core.$stage.children().eq(f),
            h = g && g.find(".owl-lazy");
        if (!h || d.inArray(g.get(0), this._loaded) > -1) {
            return
        }
        h.each(d.proxy(function(l, m) {
            var j = d(m),
                n, k = (c.devicePixelRatio > 1 && j.attr("data-src-retina")) || j.attr("data-src");
            this._core.trigger("load", {
                element: j,
                url: k
            }, "lazy");
            if (j.is("img")) {
                j.one("load.owl.lazy", d.proxy(function() {
                    j.css("opacity", 1);
                    this._core.trigger("loaded", {
                        element: j,
                        url: k
                    }, "lazy")
                }, this)).attr("src", k)
            } else {
                n = new Image();
                n.onload = d.proxy(function() {
                    j.css({
                        "background-image": "url(" + k + ")",
                        opacity: "1"
                    });
                    this._core.trigger("loaded", {
                        element: j,
                        url: k
                    }, "lazy")
                }, this);
                n.src = k
            }
        }, this));
        this._loaded.push(g.get(0))
    };
    b.prototype.destroy = function() {
        var f, g;
        for (f in this.handlers) {
            this._core.$element.off(f, this.handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    d.fn.owlCarousel.Constructor.Plugins.Lazy = b
})(window.Zepto || window.jQuery, window, document);
(function(c, b, a, d) {
    var e = function(f) {
        this._core = f;
        this._handlers = {
            "initialized.owl.carousel": c.proxy(function() {
                if (this._core.settings.autoHeight) {
                    this.update()
                }
            }, this),
            "changed.owl.carousel": c.proxy(function(g) {
                if (this._core.settings.autoHeight && g.property.name == "position") {
                    this.update()
                }
            }, this),
            "loaded.owl.lazy": c.proxy(function(g) {
                if (this._core.settings.autoHeight && g.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current())) {
                    this.update()
                }
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: false,
        autoHeightClass: "owl-height"
    };
    e.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    };
    e.prototype.destroy = function() {
        var f, g;
        for (f in this._handlers) {
            this._core.$element.off(f, this._handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    c.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
})(window.Zepto || window.jQuery, window, document);
(function(d, c, a, e) {
    var b = function(f) {
        this._core = f;
        this._videos = {};
        this._playing = null;
        this._fullscreen = false;
        this._handlers = {
            "resize.owl.carousel": d.proxy(function(g) {
                if (this._core.settings.video && !this.isInFullScreen()) {
                    g.preventDefault()
                }
            }, this),
            "refresh.owl.carousel changed.owl.carousel": d.proxy(function(g) {
                if (this._playing) {
                    this.stop()
                }
            }, this),
            "prepared.owl.carousel": d.proxy(function(h) {
                var g = d(h.content).find(".owl-video");
                if (g.length) {
                    g.css("display", "none");
                    this.fetch(g, d(h.content))
                }
            }, this)
        };
        this._core.options = d.extend({}, b.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", d.proxy(function(g) {
            this.play(g)
        }, this))
    };
    b.Defaults = {
        video: false,
        videoHeight: false,
        videoWidth: false
    };
    b.prototype.fetch = function(l, k) {
        var j = l.attr("data-vimeo-id") ? "vimeo" : "youtube",
            m = l.attr("data-vimeo-id") || l.attr("data-youtube-id"),
            h = l.attr("data-width") || this._core.settings.videoWidth,
            f = l.attr("data-height") || this._core.settings.videoHeight,
            g = l.attr("href");
        if (g) {
            m = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
            if (m[3].indexOf("youtu") > -1) {
                j = "youtube"
            } else {
                if (m[3].indexOf("vimeo") > -1) {
                    j = "vimeo"
                } else {
                    throw new Error("Video URL not supported.")
                }
            }
            m = m[6]
        } else {
            throw new Error("Missing video URL.")
        }
        this._videos[g] = {
            type: j,
            id: m,
            width: h,
            height: f
        };
        k.attr("data-video", g);
        this.thumbnail(l, this._videos[g])
    };
    b.prototype.thumbnail = function(m, h) {
        var g, o, q, f = h.width && h.height ? 'style="width:' + h.width + "px;height:" + h.height + 'px;"' : "",
            n = m.find("img"),
            p = "src",
            l = "",
            j = this._core.settings,
            k = function(r) {
                o = '<div class="owl-video-play-icon"></div>';
                if (j.lazyLoad) {
                    g = '<div class="owl-video-tn ' + l + '" ' + p + '="' + r + '"></div>'
                } else {
                    g = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + r + ')"></div>'
                }
                m.after(g);
                m.after(o)
            };
        m.wrap('<div class="owl-video-wrapper"' + f + "></div>");
        if (this._core.settings.lazyLoad) {
            p = "data-src";
            l = "owl-lazy"
        }
        if (n.length) {
            k(n.attr(p));
            n.remove();
            return false
        }
        if (h.type === "youtube") {
            q = "http://img.youtube.com/vi/" + h.id + "/hqdefault.jpg";
            k(q)
        } else {
            if (h.type === "vimeo") {
                d.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + h.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function(r) {
                        q = r[0].thumbnail_large;
                        k(q)
                    }
                })
            }
        }
    };
    b.prototype.stop = function() {
        this._core.trigger("stop", null, "video");
        this._playing.find(".owl-video-frame").remove();
        this._playing.removeClass("owl-video-playing");
        this._playing = null
    };
    b.prototype.play = function(m) {
        this._core.trigger("play", null, "video");
        if (this._playing) {
            this.stop()
        }
        var n = d(m.target || m.srcElement),
            l = n.closest("." + this._core.settings.itemClass),
            k = this._videos[l.attr("data-video")],
            j = k.width || "100%",
            f = k.height || this._core.$stage.height(),
            g, h;
        if (k.type === "youtube") {
            g = '<iframe width="' + j + '" height="' + f + '" src="http://www.youtube.com/embed/' + k.id + "?autoplay=1&v=" + k.id + '" frameborder="0" allowfullscreen></iframe>'
        } else {
            if (k.type === "vimeo") {
                g = '<iframe src="http://player.vimeo.com/video/' + k.id + '?autoplay=1" width="' + j + '" height="' + f + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
            }
        }
        l.addClass("owl-video-playing");
        this._playing = l;
        h = d('<div style="height:' + f + "px; width:" + j + 'px" class="owl-video-frame">' + g + "</div>");
        n.after(h)
    };
    b.prototype.isInFullScreen = function() {
        var f = a.fullscreenElement || a.mozFullScreenElement || a.webkitFullscreenElement;
        if (f && d(f).parent().hasClass("owl-video-frame")) {
            this._core.speed(0);
            this._fullscreen = true
        }
        if (f && this._fullscreen && this._playing) {
            return false
        }
        if (this._fullscreen) {
            this._fullscreen = false;
            return false
        }
        if (this._playing) {
            if (this._core.state.orientation !== c.orientation) {
                this._core.state.orientation = c.orientation;
                return false
            }
        }
        return true
    };
    b.prototype.destroy = function() {
        var f, g;
        this._core.$element.off("click.owl.video");
        for (f in this._handlers) {
            this._core.$element.off(f, this._handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    d.fn.owlCarousel.Constructor.Plugins.Video = b
})(window.Zepto || window.jQuery, window, document);
(function(d, c, b, e) {
    var a = function(f) {
        this.core = f;
        this.core.options = d.extend({}, a.Defaults, this.core.options);
        this.swapping = true;
        this.previous = e;
        this.next = e;
        this.handlers = {
            "change.owl.carousel": d.proxy(function(g) {
                if (g.property.name == "position") {
                    this.previous = this.core.current();
                    this.next = g.property.value
                }
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": d.proxy(function(g) {
                this.swapping = g.type == "translated"
            }, this),
            "translate.owl.carousel": d.proxy(function(g) {
                if (this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
                    this.swap()
                }
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    a.Defaults = {
        animateOut: false,
        animateIn: false
    };
    a.prototype.swap = function() {
        if (this.core.settings.items !== 1 || !this.core.support3d) {
            return
        }
        this.core.speed(0);
        var l, f = d.proxy(this.clear, this),
            k = this.core.$stage.children().eq(this.previous),
            j = this.core.$stage.children().eq(this.next),
            g = this.core.settings.animateIn,
            h = this.core.settings.animateOut;
        if (this.core.current() === this.previous) {
            return
        }
        if (h) {
            l = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
            k.css({
                left: l + "px"
            }).addClass("animated owl-animated-out").addClass(h).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", f)
        }
        if (g) {
            j.addClass("animated owl-animated-in").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", f)
        }
    };
    a.prototype.clear = function(f) {
        d(f.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
        this.core.transitionEnd()
    };
    a.prototype.destroy = function() {
        var f, g;
        for (f in this.handlers) {
            this.core.$element.off(f, this.handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    d.fn.owlCarousel.Constructor.Plugins.Animate = a
})(window.Zepto || window.jQuery, window, document);
(function(c, b, a, e) {
    var d = function(f) {
        this.core = f;
        this.core.options = c.extend({}, d.Defaults, this.core.options);
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": c.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": c.proxy(function(j, g, h) {
                this.play(g, h)
            }, this),
            "stop.owl.autoplay": c.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": c.proxy(function() {
                if (this.core.settings.autoplayHoverPause) {
                    this.pause()
                }
            }, this),
            "mouseleave.owl.autoplay": c.proxy(function() {
                if (this.core.settings.autoplayHoverPause) {
                    this.autoplay()
                }
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    d.Defaults = {
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        autoplaySpeed: false
    };
    d.prototype.autoplay = function() {
        if (this.core.settings.autoplay && !this.core.state.videoPlay) {
            b.clearInterval(this.interval);
            this.interval = b.setInterval(c.proxy(function() {
                this.play()
            }, this), this.core.settings.autoplayTimeout)
        } else {
            b.clearInterval(this.interval)
        }
    };
    d.prototype.play = function(g, f) {
        if (a.hidden === true) {
            return
        }
        if (this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion) {
            return
        }
        if (this.core.settings.autoplay === false) {
            b.clearInterval(this.interval);
            return
        }
        this.core.next(this.core.settings.autoplaySpeed)
    };
    d.prototype.stop = function() {
        b.clearInterval(this.interval)
    };
    d.prototype.pause = function() {
        b.clearInterval(this.interval)
    };
    d.prototype.destroy = function() {
        var f, g;
        b.clearInterval(this.interval);
        for (f in this.handlers) {
            this.core.$element.off(f, this.handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    c.fn.owlCarousel.Constructor.Plugins.autoplay = d
})(window.Zepto || window.jQuery, window, document);
(function(d, b, a, e) {
    var c = function(f) {
        this._core = f;
        this._initialized = false;
        this._pages = [];
        this._controls = {};
        this._templates = [];
        this.$element = this._core.$element;
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        };
        this._handlers = {
            "prepared.owl.carousel": d.proxy(function(g) {
                if (this._core.settings.dotsData) {
                    this._templates.push(d(g.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }
            }, this),
            "add.owl.carousel": d.proxy(function(g) {
                if (this._core.settings.dotsData) {
                    this._templates.splice(g.position, 0, d(g.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }
            }, this),
            "remove.owl.carousel prepared.owl.carousel": d.proxy(function(g) {
                if (this._core.settings.dotsData) {
                    this._templates.splice(g.position, 1)
                }
            }, this),
            "change.owl.carousel": d.proxy(function(j) {
                if (j.property.name == "position") {
                    if (!this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                        var h = this._core.current(),
                            k = this._core.maximum(),
                            g = this._core.minimum();
                        j.data = j.property.value > k ? h >= k ? g : k : j.property.value < g ? k : j.property.value
                    }
                }
            }, this),
            "changed.owl.carousel": d.proxy(function(g) {
                if (g.property.name == "position") {
                    this.draw()
                }
            }, this),
            "refreshed.owl.carousel": d.proxy(function() {
                if (!this._initialized) {
                    this.initialize();
                    this._initialized = true
                }
                this._core.trigger("refresh", null, "navigation");
                this.update();
                this.draw();
                this._core.trigger("refreshed", null, "navigation")
            }, this)
        };
        this._core.options = d.extend({}, c.Defaults, this._core.options);
        this.$element.on(this._handlers)
    };
    c.Defaults = {
        nav: false,
        navRewind: true,
        navText: ["prev", "next"],
        navSpeed: false,
        navElement: "div",
        navContainer: false,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: true,
        dotsEach: false,
        dotData: false,
        dotsSpeed: false,
        dotsContainer: false,
        controlsClass: "owl-controls"
    };
    c.prototype.initialize = function() {
        var h, g, f = this._core.settings;
        if (!f.dotsData) {
            this._templates = [d("<div>").addClass(f.dotClass).append(d("<span>")).prop("outerHTML")]
        }
        if (!f.navContainer || !f.dotsContainer) {
            this._controls.$container = d("<div>").addClass(f.controlsClass).appendTo(this.$element)
        }
        this._controls.$indicators = f.dotsContainer ? d(f.dotsContainer) : d("<div>").hide().addClass(f.dotsClass).appendTo(this._controls.$container);
        this._controls.$indicators.on("click", "div", d.proxy(function(k) {
            var j = d(k.target).parent().is(this._controls.$indicators) ? d(k.target).index() : d(k.target).parent().index();
            k.preventDefault();
            this.to(j, f.dotsSpeed)
        }, this));
        h = f.navContainer ? d(f.navContainer) : d("<div>").addClass(f.navContainerClass).prependTo(this._controls.$container);
        this._controls.$next = d("<" + f.navElement + ">");
        this._controls.$previous = this._controls.$next.clone();
        this._controls.$previous.addClass(f.navClass[0]).html(f.navText[0]).hide().prependTo(h).on("click", d.proxy(function(j) {
            this.prev(f.navSpeed)
        }, this));
        this._controls.$next.addClass(f.navClass[1]).html(f.navText[1]).hide().appendTo(h).on("click", d.proxy(function(j) {
            this.next(f.navSpeed)
        }, this));
        for (g in this._overrides) {
            this._core[g] = d.proxy(this[g], this)
        }
    };
    c.prototype.destroy = function() {
        var g, j, h, f;
        for (g in this._handlers) {
            this.$element.off(g, this._handlers[g])
        }
        for (j in this._controls) {
            this._controls[j].remove()
        }
        for (f in this.overides) {
            this._core[f] = this._overrides[f]
        }
        for (h in Object.getOwnPropertyNames(this)) {
            typeof this[h] != "function" && (this[h] = null)
        }
    };
    c.prototype.update = function() {
        var n, l, f, h = this._core.settings,
            g = this._core.clones().length / 2,
            o = g + this._core.items().length,
            m = h.center || h.autoWidth || h.dotData ? 1 : h.dotsEach || h.items;
        if (h.slideBy !== "page") {
            h.slideBy = Math.min(h.slideBy, h.items)
        }
        if (h.dots || h.slideBy == "page") {
            this._pages = [];
            for (n = g, l = 0, f = 0; n < o; n++) {
                if (l >= m || l === 0) {
                    this._pages.push({
                        start: n - g,
                        end: n - g + m - 1
                    });
                    l = 0, ++f
                }
                l += this._core.mergers(this._core.relative(n))
            }
        }
    };
    c.prototype.draw = function() {
        var l, j, h = "",
            g = this._core.settings,
            k = this._core.$stage.children(),
            f = this._core.relative(this._core.current());
        if (g.nav && !g.loop && !g.navRewind) {
            this._controls.$previous.toggleClass("disabled", f <= 0);
            this._controls.$next.toggleClass("disabled", f >= this._core.maximum())
        }
        this._controls.$previous.toggle(g.nav);
        this._controls.$next.toggle(g.nav);
        if (g.dots) {
            l = this._pages.length - this._controls.$indicators.children().length;
            if (g.dotData && l !== 0) {
                for (j = 0; j < this._controls.$indicators.children().length; j++) {
                    h += this._templates[this._core.relative(j)]
                }
                this._controls.$indicators.html(h)
            } else {
                if (l > 0) {
                    h = new Array(l + 1).join(this._templates[0]);
                    this._controls.$indicators.append(h)
                } else {
                    if (l < 0) {
                        this._controls.$indicators.children().slice(l).remove()
                    }
                }
            }
            this._controls.$indicators.find(".active").removeClass("active");
            this._controls.$indicators.children().eq(d.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(g.dots)
    };
    c.prototype.onTrigger = function(g) {
        var f = this._core.settings;
        g.page = {
            index: d.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: f && (f.center || f.autoWidth || f.dotData ? 1 : f.dotsEach || f.items)
        }
    };
    c.prototype.current = function() {
        var f = this._core.relative(this._core.current());
        return d.grep(this._pages, function(g) {
            return g.start <= f && g.end >= f
        }).pop()
    };
    c.prototype.getPosition = function(g) {
        var f, j, h = this._core.settings;
        if (h.slideBy == "page") {
            f = d.inArray(this.current(), this._pages);
            j = this._pages.length;
            g ? ++f : --f;
            f = this._pages[((f % j) + j) % j].start
        } else {
            f = this._core.relative(this._core.current());
            j = this._core.items().length;
            g ? f += h.slideBy : f -= h.slideBy
        }
        return f
    };
    c.prototype.next = function(f) {
        d.proxy(this._overrides.to, this._core)(this.getPosition(true), f)
    };
    c.prototype.prev = function(f) {
        d.proxy(this._overrides.to, this._core)(this.getPosition(false), f)
    };
    c.prototype.to = function(f, j, g) {
        var h;
        if (!g) {
            h = this._pages.length;
            d.proxy(this._overrides.to, this._core)(this._pages[((f % h) + h) % h].start, j)
        } else {
            d.proxy(this._overrides.to, this._core)(f, j)
        }
    };
    d.fn.owlCarousel.Constructor.Plugins.Navigation = c
})(window.Zepto || window.jQuery, window, document);
(function(d, c, a, e) {
    var b = function(f) {
        this._core = f;
        this._hashes = {};
        this.$element = this._core.$element;
        this._handlers = {
            "initialized.owl.carousel": d.proxy(function() {
                if (this._core.settings.startPosition == "URLHash") {
                    d(c).trigger("hashchange.owl.navigation")
                }
            }, this),
            "prepared.owl.carousel": d.proxy(function(h) {
                var g = d(h.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[g] = h.content
            }, this)
        };
        this._core.options = d.extend({}, b.Defaults, this._core.options);
        this.$element.on(this._handlers);
        d(c).on("hashchange.owl.navigation", d.proxy(function() {
            var j = c.location.hash.substring(1),
                h = this._core.$stage.children(),
                g = this._hashes[j] && h.index(this._hashes[j]) || 0;
            if (!j) {
                return false
            }
            this._core.to(g, false, true)
        }, this))
    };
    b.Defaults = {
        URLhashListener: false
    };
    b.prototype.destroy = function() {
        var f, g;
        d(c).off("hashchange.owl.navigation");
        for (f in this._handlers) {
            this._core.$element.off(f, this._handlers[f])
        }
        for (g in Object.getOwnPropertyNames(this)) {
            typeof this[g] != "function" && (this[g] = null)
        }
    };
    d.fn.owlCarousel.Constructor.Plugins.Hash = b
})(window.Zepto || window.jQuery, window, document);
(function(a) {
    a.deparam = function(e, b) {
        var d = {},
            c = {
                "true": !0,
                "false": !1,
                "null": null
            };
        a.each(e.replace(/\+/g, " ").split("&"), function(h, o) {
            var g = o.split("="),
                n = decodeURIComponent(g[0]),
                f, m = d,
                k = 0,
                p = n.split("]["),
                l = p.length - 1;
            if (/\[/.test(p[0]) && /\]$/.test(p[l])) {
                p[l] = p[l].replace(/\]$/, "");
                p = p.shift().split("[").concat(p);
                l = p.length - 1
            } else {
                l = 0
            }
            if (g.length === 2) {
                f = decodeURIComponent(g[1]);
                if (b) {
                    f = f && !isNaN(f) ? +f : f === "undefined" ? undefined : c[f] !== undefined ? c[f] : f
                }
                if (l) {
                    for (; k <= l; k++) {
                        n = p[k] === "" ? m.length : p[k];
                        m = m[n] = k < l ? m[n] || (p[k + 1] && isNaN(p[k + 1]) ? {} : []) : f
                    }
                } else {
                    if (a.isArray(d[n])) {
                        d[n].push(f)
                    } else {
                        if (d[n] !== undefined) {
                            d[n] = [d[n], f]
                        } else {
                            d[n] = f
                        }
                    }
                }
            } else {
                if (n) {
                    d[n] = b ? undefined : ""
                }
            }
        });
        return d
    }
})(jQuery);

function F4FgetStudioOnline(b, c) {
    var a = "http://secure.vs3.com/_special/ajax/?mp_code=" + b.mp_code + "&sitekey=" + b.sitekey + "&whitelabel_domain=" + b.whitelabel_domain + "&method=getStudioOnline&studio=" + b.studio + "&service=" + b.service + "";
    $.ajax({
        url: a,
        dataType: "jsonp",
        method: "GET",
        timeout: 10000,
        error: function(d, f, e) {
            return c(e)
        },
        success: function(e, f, d) {
            return c(null, e)
        }
    })
}

function F4FgetModelInfo(b, c) {
    var a = "http://secure.vs3.com/_special/ajax/?mp_code=" + b.mp_code + "&sitekey=" + b.sitekey + "&whitelabel_domain=" + b.whitelabel_domain + "&method=getModelInfo&model_id=" + b.model_id + "";
    $.ajax({
        url: a,
        dataType: "jsonp",
        method: "GET",
        timeout: 10000,
        error: function(d, f, e) {
            return c(e)
        },
        success: function(e, f, d) {
            return c(null, e)
        }
    })
}

function F4FgetStudioModels(b, c) {
    var a = "http://secure.vs3.com/_special/ajax/?mp_code=" + b.mp_code + "&sitekey=" + b.sitekey + "&whitelabel_domain=" + b.whitelabel_domain + "&method=getStudioModels&studio=" + b.studio + "&service=" + b.service + "";
    $.ajax({
        url: a,
        dataType: "jsonp",
        method: "GET",
        timeout: 10000,
        error: function(d, f, e) {
            return c(e)
        },
        success: function(e, f, d) {
            return c(null, e)
        }
    })
}
var kinkConstants = {
    LIMIT: 12,
    START: 0,
    trailerViews: 5,
    billerSiteId: "84",
    cancelSubscriptionUrl: "/api/purchasing/cancel",
    checkCardOnFileUrl: "/api/purchasing/is-card-on-file",
    commentUrl: "/api/comments/",
    getKinkliveSwimlaneUrl: "/api/kinklive-swimlane",
    getLatestShootSiteUrl: "/api/shoots/site/",
    getPaymentsUrl: "/api/purchasing/payments",
    migrationStatusUrl: "/api/migration/accept",
    purchaseUrl: "/api/purchasing/purchase",
    putCardOnFileUrl: "/api/purchasing/put-card-on-file",
    ratingUrl: "/api/ratings/",
    setViewingPrefUrl: "/api/set-viewing-prefs",
    trackUrl: "/api/track"
};
$("document").ready(function() {
    $("#migrationAccepted").click(function(d) {
        d.preventDefault();
        $(".migration").hide();
        var f = $.ajax({
            type: "POST",
            url: kinkConstants.migrationStatusUrl,
            data: {
                memberId: $("#userid").text(),
                _csrf: $("#_csrf").val()
            }
        }).success(function(e) {
            docCookies.setItem("migrationAccepted", true, Infinity)
        })
    });
    if (docCookies.getItem("no-welcome") === null) {
        $(".welcome-message").addClass("display")
    }
    $(".close-button").click(function(d) {
        $(".welcome-message").removeClass("display");
        docCookies.setItem("no-welcome", true, Infinity)
    });
    if (docCookies.getItem("viewing-preferences") === null) {
        $(".viewing-preferences").addClass("display")
    }
    $("#viewingPreferences").find("button").click(function(d) {
        c($(this).val())
    });
    $("#closeViewingPreferences").click(function(f) {
        var d = null;
        c(d)
    });

    function c(d) {
        if (!d) {
            docCookies.setItem("viewing-preferences", "none", Infinity, "/");
            $(".viewing-preferences").removeClass("display")
        } else {
            if (d === "") {
                d = "none"
            }
            docCookies.setItem("viewing-preferences", d, Infinity, "/");
            location.reload()
        }
    }

    function a() {
        $(".kbar").find($(".display")).removeClass("display");
        $(".moreMenu").removeClass("display");
        $(".searchMenu").removeClass("display");
        $(".supportMenu").removeClass("display")
    }
    $(".kbarMenu").click(function(f) {
        var g = $(this).attr("id");
        var d = $(this).attr("data-displayTarget");
        if ($(d).hasClass("display")) {
            $(d).removeClass("display")
        } else {
            a();
            $(d).addClass("display")
        }
    });
    $(".navMenu").click(function(f) {
        f.preventDefault();
        var d = $(this).attr("data-displayTarget");
        if ($(d).hasClass("display")) {
            $(d).removeClass("display")
        } else {
            a();
            $(d).addClass("display")
        }
    });
    $(".moresites").click(function(f) {
        f.preventDefault();
        var d = $(this).attr("data-displayTarget");
        $(this).hide();
        $(d).addClass("display")
    });
    $("#kBarLogin").click(function(f) {
        f.preventDefault();
        var g = window.location.href;
        if (window.location.pathname === "/login") {
            var d = window.location.search;
            console.log(d);
            g = d.replace(/\?returnUrl=/i, "")
        }
        window.location = "/login?returnUrl=" + g
    });
    $("#kBarJoin").click(function(f) {
        f.preventDefault();
        var g = docCookies.getItem("returnUrl");
        if (g) {
            return window.location = "/signup?returnUrl=" + g
        }
        g = window.location.pathname;
        if (window.location.pathname === "/signup") {
            var d = window.location.search;
            g = d.replace(/\?returnUrl=/i, "")
        }
        window.location = "/signup?returnUrl=" + g
    });
    $("a#showMoreBdsm").click(function(d) {
        d.preventDefault();
        $("a#showMoreBdsm").hide();
        $("div#moreBdsm").addClass("display")
    });
    $("a#showMoreHardcore").click(function(d) {
        d.preventDefault();
        $("a#showMoreHardcore").hide();
        $("div#moreHardcore").addClass("display")
    });
    $("a#showMoreFemdom").click(function(d) {
        d.preventDefault();
        $("a#showMoreFemdom").hide();
        $("div#moreFemdom").addClass("display")
    });
    $(".channel").hover(function() {
        $(this).addClass("infoTipActive");
        var e = $(this).width(),
            q = $(this).height(),
            g = $(this).offset(),
            o = $(this).attr("data-title"),
            n = $(this).attr("data-short"),
            k = $(this).attr("data-summary"),
            m = $(this).attr("data-eventelement"),
            j = $(this).attr("data-elementdetails"),
            f = $(this).attr("data-totaltiles"),
            h = $(this).attr("data-tileposition"),
            d = $("#infoTip"),
            p = $("#infoTipShootTitle"),
            l = $("#infoTipSummary");
        $(d).css("display", "block");
        $(infoTipDate).text(" ");
        $(infoTipPerformers).text(" ");
        $(p).attr("href", "/channel/" + n).html(o);
        if (k !== "undefined") {
            $(l).text(k)
        } else {
            $(l).text(" ")
        }
        $(d).width(e).height(q + 10).addClass("display");
        if ($(this)[0].getBoundingClientRect().bottom + q + 25 > window.innerHeight) {
            $(".arrow-box").addClass("down-arrow-box");
            $(".arrow-box").removeClass("up-arrow-box");
            $(d).offset({
                top: g.top - q - 25,
                left: g.left
            })
        } else {
            $(".arrow-box").addClass("up-arrow-box");
            $(".arrow-box").removeClass("down-arrow-box");
            $(d).offset({
                top: g.top + q + 15,
                left: g.left
            })
        }
    }, function(f) {
        var d = $("#infoTip")[0].getBoundingClientRect();
        if (f.clientX > d.left && f.clientX < d.right && f.clientY > d.top - 15 && f.clientY < d.bottom + 25) {
            $("#infoTip").mouseleave(function() {
                $(this).removeClass("infoTipActive");
                $("#infoTip").hide()
            })
        } else {
            $(this).removeClass("infoTipActive");
            $("#infoTip").hide()
        }
    });
    $(".shoot").hover(function(x) {
        $(this).addClass("infoTipActive");
        var r = $(this).width(),
            q = $(this).height(),
            k = $(this).offset(),
            t = $(this).attr("data-shootId"),
            A = $(this).attr("data-title"),
            v = $(this).attr("data-date"),
            g = $(this).attr("data-performers"),
            l = $(this).attr("data-summary"),
            w = $(this).attr("data-eventelement"),
            f = $(this).attr("data-elementdetails"),
            o = $(this).attr("data-totaltiles"),
            m = $(this).attr("data-tileposition"),
            d = $("#infoTip"),
            z = $("#infoTipShootTitle"),
            y = $("#infoTipDate"),
            j = $("#infoTipSummary"),
            p = $("#infoTipPerformers");
        $(d).css("display", "block");
        $(z).attr("href", "/shoot/" + t).html(A);
        $(y).text(v);
        $(p).text(g);
        $(j).text(l);
        $(d).width(r).height(q + 10).addClass("display");
        if ($(this)[0].getBoundingClientRect().bottom + q + 25 > window.innerHeight) {
            $(".arrow-box").addClass("down-arrow-box");
            $(".arrow-box").removeClass("up-arrow-box");
            $(d).offset({
                top: k.top - q - 25,
                left: k.left
            })
        } else {
            $(".arrow-box").addClass("up-arrow-box");
            $(".arrow-box").removeClass("down-arrow-box");
            $(d).offset({
                top: k.top + q + 15,
                left: k.left
            })
        }
        var n = $(this).find(".roll-image"),
            s = n.length,
            u = 0;
        $(this).on("stopRolling", function() {
            u = s;
            n.animate({
                opacity: 0
            })
        });

        function h() {
            setTimeout(function() {
                var C = n[u],
                    D = $(C).attr("data-imagesrc"),
                    e = $(C).attr("data-height"),
                    B = $(C).attr("data-width");
                $(C).attr("src", D);
                if (e > B) {
                    $(C).addClass("portrait-true")
                }
                $(C).stop(true, true).animate({
                    opacity: 1
                });
                u++;
                if (u < (s)) {
                    h()
                }
            }, 900)
        }
        h()
    }, function(f) {
        $(this).trigger("stopRolling");
        var d = $("#infoTip")[0].getBoundingClientRect();
        if (f.clientX > d.left && f.clientX < d.right && f.clientY > d.top - 15 && f.clientY < d.bottom + 25) {
            $("#infoTip").mouseleave(function() {
                $(this).removeClass("infoTipActive");
                $("#infoTip").hide()
            })
        } else {
            $(this).removeClass("infoTipActive");
            $("#infoTip").hide()
        }
    });
    var b = {
        nav: true,
        dots: false,
        navText: ["&#9668", "&#9658"],
        loop: true,
        margin: 10,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            640: {
                items: 2,
                slideBy: 2
            },
            1023: {
                items: 3,
                slideBy: 3
            },
            1300: {
                items: 4,
                slideBy: 4
            }
        }
    };
    if ($(".kinkliveswimlane").val() !== undefined) {
        $("#liveShows").owlCarousel(b)
    }
    if ($("#kinkChannels").val() !== undefined) {
        $(".kink-channel-swimlane").addClass("display");
        $("#kinkChannels").owlCarousel(b)
    }
    if ($("#partnerChannels").val() !== undefined) {
        $(".partner-channel-swimlane").addClass("display");
        $("#partnerChannels").owlCarousel(b)
    }
    if ($("#latestShoots").val() !== undefined) {
        $(".swimlane-shoots-latest").addClass("display");
        $("#latestShoots").owlCarousel(b)
    }
    if ($("#featuredShoots").val() !== undefined) {
        $(".swimlane-shoots-featured").addClass("display");
        $("#featuredShoots").owlCarousel(b)
    }
    if ($("#taggedKinkChannels").val() !== undefined) {
        $(".kink-channel-swimlane").addClass("display");
        $("#taggedKinkChannels").owlCarousel(b)
    }
    if ($("#kinkStore").length > 0) {
        $("#kinkStore").owlCarousel(b)
    }
    if ($("#straight").length) {
        $("hr").hide();
        $(".gay").hide()
    } else {
        if ($("#gay").length) {
            $("hr").hide();
            $(".straight").hide()
        }
    }
    $(".tile").on("click", function(k) {
        k.preventDefault();
        var g = "click",
            d = location.pathname,
            n = $(this).attr("data-eventelement"),
            l = $(this).attr("data-elementdetails"),
            h = $(this).attr("data-totaltiles"),
            j = parseInt(($(this).attr("data-tileposition"))) + 1,
            f = $(this).find("a")[0].pathname;
        var m = "?eventType=" + g + "&eventPage=" + d + "&eventElement=" + n + "&elementDetails=" + l + "&totalTiles=" + h + "&tilePosition=" + j;
        window.location = f + m
    })
});

function lengthCheck(b, d, a) {
    var c = "",
        e = b;
    if (e.length < d) {
        c = a + " must be at least " + d + " characters"
    }
    return c
}

function validateEmail(a) {
    var b = "",
        c = /@/g,
        d = a;
    if (!d.match(c)) {
        b = "Please enter a valid email address"
    }
    return b
}

function validatePassword(d) {
    var a = "",
        b = /&/g,
        c = d.currentTarget.value;
    if (c.match(b)) {
        a = 'Password cannot contain "&" character'
    } else {
        if (c.length > 20) {
            a = "Maximum password length is 20 characters"
        } else {
            a = ""
        }
    }
    return a
}

function checkCardOnFile(a, c) {
    var b = {
        _csrf: c,
        memberId: a
    };
    var d = $.ajax({
        type: "POST",
        url: kinkConstants.checkCardOnFileUrl,
        data: b
    }).success(function(e) {
        return e
    }).fail(function(e) {
        console.log(e.responseJSON.message);
        return false
    });
    return d
}
var minPassLength = 6;
$("input#newEmail").blur(function(b) {
    var a = validateEmail(b.currentTarget.value);
    if (a === "") {
        $("#newEmailError").html("");
        $("#newEmailError").removeClass("display");
        $("#newEmail").removeClass("error")
    } else {
        $("#newEmailError").html('<li><span class="icon-attention"/> ' + a + "</li>");
        $("#newEmailError").addClass("display");
        $("#newEmail").addClass("error")
    }
});
$("input#newPassword").keyup(function(b) {
    var a = validatePassword(b);
    if (a !== "") {
        $("#newPasswordError").html('<li><span class="icon-attention"/> ' + a + "</li>");
        $("#newPasswordError").addClass("display")
    }
});
$("input#newPassword").blur(function(b) {
    var a = lengthCheck(b.currentTarget.value, minPassLength, "Password");
    if (a === "") {
        $("#newPasswordError").html("");
        $("#newPasswordError").removeClass("display")
    } else {
        $("#newPasswordError").html('<li><span class="icon-attention"/> ' + a + "</li>");
        $("#newPasswordError").addClass("display")
    }
});
$("input#newPassword2").blur(function(d) {
    var b = $("input#newPassword").val(),
        a = $("input#newPassword2").val(),
        c = lengthCheck(b, minPassLength, "Password");
    if (c !== "") {
        $("#newPasswordError").html('<li><span class="icon-attention"/> ' + c + "</li>");
        $("#newPasswordError").addClass("display")
    } else {
        if (b === a) {
            $("#newPasswordError").html("");
            $("#newPasswordError").removeClass("display")
        } else {
            $("#newPasswordError").html('<li><span class="icon-attention"/> Passwords do not match</li>');
            $("#newPasswordError").addClass("display")
        }
    }
});
$('form[name="usernamePassword"]').submit(function(f) {
    f.preventDefault();
    var b = $("input#newPassword").val(),
        a = $("input#newPassword2").val(),
        d = $("input#password").val(),
        c = lengthCheck(b, minPassLength, "Password");
    if (d === "") {
        $("#newPasswordError").html('<li><span class="icon-attention"/> Please enter current password</li>');
        $("#newPasswordError").addClass("display")
    } else {
        if (c !== "") {
            $("#newPasswordError").html('<li><span class="icon-attention"/> ' + c + "</li>");
            $("#newPasswordError").addClass("display")
        } else {
            if (b !== a) {
                $("#newPasswordError").html('<li><span class="icon-attention"/> Passwords do not match</li>');
                $("#newPasswordError").addClass("display")
            } else {
                document.usernamePassword.submit()
            }
        }
    }
});
$(".purchase-show-more a").click(function(f) {
    var b = {
            invoiceId: f.currentTarget.id,
            _csrf: $("#_csrf").val()
        },
        d = (f.currentTarget.parentElement.parentElement.nextElementSibling),
        c = d.firstElementChild,
        a = $(c).find(".payments");
    if ($(d).hasClass("open")) {
        $(d).removeClass("open")
    } else {
        $(d).addClass("open");
        if ($(a).find("td.paymentDate").length === 0) {
            $.ajax({
                url: kinkConstants.getPaymentsUrl,
                type: "POST",
                data: b
            }).success(function(k) {
                var j = k.results;
                for (var h = 0; h < j.length; h++) {
                    var g = document.createElement("tr"),
                        e = document.createElement("td"),
                        l = document.createElement("td");
                    $(e).addClass("paymentDate").text(moment(j[h].createdDate).format("L"));
                    $(l).addClass("paymentAmount").text("$" + j[h].displayAmount);
                    $(g).append(e).append(l);
                    $(a).append(g)
                }
            }).fail(function(e) {})
        }
    }
});
$("#addUpdateCard").click(function(b) {
    var a = {
        _csrf: $("#_csrf").val(),
        memberId: $("#userid").text(),
        returnUrl: window.location.href
    };
    putCardOnFile(a)
});
$(".cancelSubscription").click(function(c) {
    c.preventDefault();
    var b = c.currentTarget,
        a = {
            _csrf: $("#_csrf").val(),
            memberId: $("#userid").text(),
            entitlementId: $(b).attr("data-entitlementid")
        };
    cancelSubscription(a)
});
$("#updateViewingPreferences").click(function(g) {
    g.preventDefault();
    var c = $(".viewing-prefs").serialize(),
        b = "&" + c,
        f = b.split("&p="),
        a = f.slice(1),
        d = a.toString();
    if (d === "") {
        d = "none"
    }
    docCookies.setItem("viewing-preferences", d, Infinity, "/");
    location.reload()
});

function putCardOnFile(a) {
    $.ajax({
        url: kinkConstants.putCardOnFileUrl,
        type: "POST",
        data: a
    }).success(function(d, e, c) {
        var b = c.responseJSON.results;
        window.location = b
    }).error(function(b, d, c) {
        console.log(b.responseText);
        console.log(c)
    })
}

function cancelSubscription(a) {
    $.ajax({
        url: kinkConstants.cancelSubscriptionUrl,
        type: "POST",
        data: a
    }).success(function(d) {
        var c = a.entitlementId;
        var b = $("a[data-entitlementid=" + c + "]").parent();
        b.html("cancelled");
        $(".success-message").addClass("display").text("Subscription Successfully Canceled!");
        setTimeout(function() {
            $(".success-message").removeClass("display")
        }, 2000)
    }).error(function(b, d, c) {
        console.log(b.responseText);
        console.log(c);
        $(".error-message").addClass("display").text("Oops! There was a problem. Please try again.");
        setTimeout(function() {
            $(".error-message").removeClass("display")
        }, 2000)
    })
}
if ($("#joinPage").length > 0) {
    var memberId = $("#userid").text();
    if (memberId) {
        var _csrf = $("#_csrf").val();
        var cardOnFile = checkCardOnFile(memberId, _csrf);
        $.when(cardOnFile).done(function(a) {
            if (a.results) {
                $("#confirmPurchase").addClass("display");
                $("#cardOnFile").attr("data-cof", true)
            } else {
                $("#cardOnFile").attr("data-cof", false);
                $("#continueToBiller").addClass("display")
            }
        }).fail(function(a) {
            console.log("fail:", a);
            $(".purchase-options")[0].remove();
            $("#chooseProductError").html(a.responseJSON.message).addClass("display")
        })
    } else {
        $("#cardOnFile").attr("data-cof", false);
        $("#registerThenBiller").addClass("display")
    }
    $('form[name="join"]').submit(function(a) {
        joinPagePurchase(a)
    });
    $(".purchase-footer button").click(function(a) {
        joinPagePurchase(a)
    });
    var productHeaders = $("h4.product-name");
    var firstProductHeader = productHeaders[0];
    toggleProduct($(firstProductHeader).attr("id"));
    $(".product-name").click(function(a) {
        a.preventDefault();
        toggleProduct($(this).attr("id"))
    })
}

function toggleProduct(a) {
    $(".multiple-products").find($(".icon-down-open")).removeClass("icon-down-open").addClass("icon-up-open");
    $(".multiple-products").find($(".join-product-info.display")).removeClass("display");
    $("#" + a).removeClass("icon-up-open").addClass("icon-down-open");
    $("#" + a + "-div").addClass("display");
    $("#" + a + "-div input[type=radio]:first").prop("checked", true)
}

function joinPagePurchase(d) {
    d.preventDefault();
    var a = $("#userid").text();
    var c = $("input[name=product-choice]:checked");
    if (c.length === 0) {
        showError("Please choose a purchase option.")
    } else {
        var b = {
            memberId: $("#userid").text(),
            cardOnFile: $("#cardOnFile").attr("data-cof"),
            returnUrl: "http://www.kink.com/my/stuff",
            purchaseOptionId: (c).attr("id"),
            ioBlackBox: $("#ioBlackBox").val(),
            _csrf: $("#_csrf").val()
        };
        if (!a || a === "") {
            if ($("#username").val() === "") {
                return showError("Please choose a username")
            } else {
                if ($("#email").val() === "") {
                    return showError("Please enter your email address")
                } else {
                    if ($("#password").val() === "") {
                        return showError("Please choose a password")
                    } else {
                        if (!$("form input#iagree").is(":checked")) {
                            return showError("Please agree to the Kink Terms & Conditions")
                        } else {
                            b.username = $("#username").val();
                            b.email = $("#email").val();
                            b.password = $("#password").val()
                        }
                    }
                }
            }
        }
        $(".purchase-footer button").prop("disabled", true);
        var f = $.ajax({
            url: window.location.href,
            type: "POST",
            data: b
        }).success(function(e) {
            if (e) {
                if (e.hasOwnProperty("errors")) {
                    for (var g = 0; g < e.errors.length; g++) {
                        showError(e.errors[g])
                    }
                    $(".purchase-footer button").prop("disabled", false)
                }
                var h;
                if (e.results === null) {
                    $("#chooseProductError").text("Your purchase did not go through :(").addClass("display");
                    setTimeout(function() {
                        $("#chooseProductError").removeClass("display")
                    }, 2000)
                } else {
                    if (e.results) {
                        h = {
                            transactionId: e.results.transactionId || null,
                            transactionTotal: e.results.transactionTotal || null,
                            transactionProducts: e.results.transactionProducts || null
                        };
                        if (e.results.hasOwnProperty("purchaseUrl")) {
                            return redirect(e.results.purchaseUrl, h)
                        } else {
                            redirect(b.returnUrl)
                        }
                    }
                }
            } else {
                showError("We are sorry. Your purchase did not go through. Please try again or contact support@kink.com")
            }
        }).error(function(e, h, g) {
            console.log(g);
            return g
        });
        return f
    }
}

function redirect(c, b) {
    var a;
    if (!c) {
        return location.reload()
    }
    if (b && b.hasOwnProperty("transactionId")) {
        if (c.indexOf("?") <= -1) {
            c += "?"
        } else {
            c += "&"
        }
        c += $.param(b)
    }
    return window.location.replace(c)
}
$("body").on("keyup", "form input#username", function(b) {
    var a = usernameValueCheck(b);
    if (!a) {
        $(".error-container #usernameError").html("");
        $(".error-container #usernameError").hide();
        $("#username").removeClass("error")
    } else {
        $(".error-container #usernameError").html('<span class="icon-attention"/> ' + a);
        $(".error-container #usernameError").show();
        $("#username").addClass("error")
    }
});
$("body").on("blur", "form input#username", function(b) {
    var a = lengthCheck(b.currentTarget.value, 2, "Username");
    if (a) {
        $(".error-container #usernameError").html('<span class="icon-attention"/> ' + a);
        $(".error-container #usernameError").show();
        $("#username").addClass("error")
    }
});
$("body").on("blur", "form input#email", function(b) {
    var a = validateEmail(b.currentTarget.value);
    if (!a) {
        $(".error-container #emailError").html("");
        $(".error-container #emailError").hide();
        $("#email").removeClass("error")
    } else {
        $(".error-container #emailError").html('<span class="icon-attention"/> ' + a);
        $(".error-container #emailError").show();
        $("#email").addClass("error")
    }
});
$("body").on("keyup", "form input#password", function(b) {
    var a = validatePassword(b);
    if (!a) {
        $("#signupSubmit").attr("disabled", false);
        $(".error-container #passwordError").html("");
        $(".error-container #passwordError").hide();
        $("#password").removeClass("error")
    } else {
        $("#signupSubmit").attr("disabled", true);
        $(".error-container #passwordError").html('<span class="icon-attention"/> ' + a);
        $(".error-container #passwordError").show();
        $("#password").addClass("error")
    }
});
$("body").on("blur", "form input#password", function(b) {
    var a = lengthCheck(b.currentTarget.value, 6, "Password");
    if (a) {
        $(".error-container #passwordError").html('<span class="icon-attention"/> ' + a);
        $(".error-container #passwordError").show();
        $("#password").addClass("error")
    }
});
$("form input#iagree").change(function(a) {
    if ($("form input#iagree").is(":checked")) {
        $(".error-container #agreementError").html("");
        $(".error-container #agreementError").hide();
        $("#iagree").removeClass("error")
    }
});
$("body").on("submit", "#login", function(a) {
    if (($("input#usernameLogin").val() !== "") && ($("input#passwordLogin").val() !== "")) {
        $("#login").submit()
    } else {
        a.preventDefault();
        $(".error-container #passwordError").html('<span class="icon-attention"/> Please enter a username and password');
        $(".error-container #passwordError").show();
        $("#password").addClass("error")
    }
});
$("body").on("submit", "#signupForm", function(a) {
    if ($("form input#iagree").is(":checked")) {
        $("#signupForm").submit()
    } else {
        a.preventDefault();
        $(".error-container #agreementError").html('<span class="icon-attention"/> Please agree to the Kink Terms of Service');
        $(".error-container #agreementError").show();
        $("#iagree").addClass("error")
    }
});

function usernameValueCheck(d) {
    var a = "",
        b = /^[a-z0-9_.-]+$/i,
        c = d.currentTarget.value;
    if (c[0] == "-" || c[0] == "_" || c[c.length - 1] == "-" || c[c.length - 1] == "_") {
        a = 'Username cannot begin or end with "-" or "_"'
    } else {
        if (c.length > 0 && !c.match(b)) {
            a = 'Username can only contain letters, numbers, "-" or "_".'
        } else {
            if (c.length > 32) {
                a = "Maximum username length is 32 characters."
            } else {
                a = ""
            }
        }
    }
    return a
}

function showError(a) {
    $(".error-message.validation").html('<span class="icon-attention"/> ' + a).addClass("display");
    $(".error-container").addClass("display");
    setTimeout(function() {
        $(".error-message.validation").removeClass("display");
        $(".error-container").removeClass("display")
    }, 2000)
}
$("#advancedModelSearch").click(function(c) {
    c.preventDefault();
    $(".advanced-search").toggleClass("display");
    var d = "icon-plus-squared",
        b = "icon-minus-squared",
        a = $("#advancedModelSearch");
    if ($(a).hasClass(d)) {
        $(a).removeClass(d).addClass(b)
    } else {
        $(a).removeClass(b).addClass(d)
    }
});
$("#advancedModelSearchForm select").change(function(a) {
    $("#advancedModelSearchForm").submit()
});
if ($("#modelImage").val() !== undefined) {
    $("#modelImage").owlCarousel({
        items: 1
    })
}
var config = {
    shootImageOwlConstants: {
        nav: true,
        dots: false,
        navText: ["&#9668", "&#9658"],
        loop: true,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            640: {
                items: 2,
                slideBy: 2
            },
            1023: {
                items: 3,
                slideBy: 3
            }
        },
        margin: 10
    },
    playerKeyActions: [{
        keys: [32, 179],
        action: function(a, b) {
            if (b.paused || b.ended) {
                a.play()
            } else {
                a.pause()
            }
        }
    }, {
        keys: [38],
        action: function(a, c) {
            a.container.find(".mejs-volume-slider").css("display", "block");
            if (a.isVideo) {
                a.showControls();
                a.startControlsTimer()
            }
            var b = Math.min(c.volume + 0.1, 1);
            c.setVolume(b)
        }
    }, {
        keys: [40],
        action: function(a, c) {
            a.container.find(".mejs-volume-slider").css("display", "block");
            if (a.isVideo) {
                a.showControls();
                a.startControlsTimer()
            }
            var b = Math.max(c.volume - 0.1, 0);
            c.setVolume(b)
        }
    }, {
        keys: [37, 227],
        action: function(a, c) {
            if (!isNaN(c.duration) && c.duration > 0) {
                if (a.isVideo) {
                    a.showControls();
                    a.startControlsTimer()
                }
                var b = Math.max(c.currentTime - a.options.defaultSeekBackwardInterval(c), 0);
                c.setCurrentTime(b)
            }
        }
    }, {
        keys: [39, 228],
        action: function(a, c) {
            if (!isNaN(c.duration) && c.duration > 0) {
                if (a.isVideo) {
                    a.showControls();
                    a.startControlsTimer()
                }
                var b = Math.min(c.currentTime + a.options.defaultSeekForwardInterval(c), c.duration);
                c.setCurrentTime(b)
            }
        }
    }]
};
$(document).ready(function(F) {
    var C = $(".shoot-page").attr("data-shootid"),
        t = $(".shoot-page").attr("data-sitename"),
        l = $(".shoot-page").attr("data-director"),
        c = $("#userid").text(),
        h = $(".member-rating-container").attr("data-entitled") || "false",
        n = false,
        g = false;
    if (h == "true") {
        D()
    } else {
        if ($("video").length > 0) {
            K()
        }
    }
    if (C) {
        I(C);
        f(C)
    }
    if (window.location.hash === "#continue") {
        if (h == "false") {
            $(".details").hide();
            if (!c) {
                $(".signup-shoot").show()
            }
            $(".buy-shoot-container").addClass("display")
        } else {
            $(".details").show()
        }
        if (c) {
            var A = $("#_csrf").val();
            var k = checkCardOnFile(c, A);
            $(".signup-shoot").hide();
            $.when(k).done(function(e) {
                if (e.results) {
                    $("#confirmPurchase").addClass("display");
                    $("#cardOnFile").attr("data-cof", true)
                } else {
                    $("#cardOnFile").attr("data-cof", false);
                    $("#continueToBiller").addClass("display")
                }
            }).fail(function(e) {
                console.log("fail:", e);
                $(".purchase-options")[0].remove();
                $("#chooseProductError").html(e.responseJSON.message).addClass("display")
            })
        }
    }
    if ($("#previewImages").length > 0) {
        $("#previewImages").owlCarousel(config.shootImageOwlConstants);
        $("#previewImageDialog").dialog({
            autoOpen: false,
            dialogClass: "image-preview-display",
            position: {
                at: "center bottom",
                of: $(".kbar")
            },
            closeOnEscape: true,
            closeText: "X"
        });
        $(window).keydown(function(M) {
            var L = (M.keyCode);
            if (L === 39) {
                $("button.next").trigger("click")
            }
            if (L === 37) {
                $("button.prev").trigger("click")
            }
            if (L === 27) {
                $("button.close").trigger("click")
            }
        })
    }
    $("#previewImages img").click(function(Q) {
        Q.preventDefault();
        var P = $(this),
            N = $("#previewImageDialog");
        if ($(window).width() > 460) {
            p(P, N);
            $(N).dialog("open")
        } else {
            var M = $(N).attr("data-src"),
                O = $(P).attr("data-image-file"),
                L = M + O;
            window.location = L
        }
    });
    $(".full h4").click(function(M) {
        $("ul.full-movie").toggle().addClass("open");
        var L = $("ul.clips");
        L.hide().removeClass("open")
    });
    $(".full-movie li").on("mousedown", function(L) {
        if (n === false) {
            $.ajax({
                url: kinkConstants.trackUrl,
                type: "POST",
                data: {
                    type: "videoDownloadFull",
                    shootId: C,
                    channel: t,
                    director: l,
                    memberId: c,
                    _csrf: $("#_csrf").val()
                },
                success: function(e, M) {
                    n = true
                }
            })
        }
    });
    $(".clips h4").click(function(L) {
        var M = $("ul.full-movie");
        $("ul.clips").toggle().addClass("open");
        M.hide().removeClass("open")
    });
    $(".clips>li").mouseenter(function(M) {
        var L = $(M.target);
        L.addClass("open")
    }).mouseleave(function(M) {
        var L = $(M.target);
        L.removeClass("open")
    });
    $(".clips li ul.submenu").mouseleave(function(N) {
        var M = $(N.target);
        var L = null;
        if (M.is("li")) {
            L = M.parent().parent(".open")
        } else {
            if (M.is("a")) {
                L = M.parent().parent().parent(".open")
            }
        }
        L.removeClass("open")
    });
    $(".clips .submenu li").on("mousedown", function(L) {
        L.preventDefault();
        if (g === false) {
            $.ajax({
                url: kinkConstants.trackUrl,
                type: "POST",
                data: {
                    type: "videoDownloadClip",
                    shootId: C,
                    channel: t,
                    director: l,
                    memberId: c,
                    _csrf: $("#_csrf").val()
                },
                success: function(e, M) {
                    g = true
                }
            })
        }
    });
    $(".ziplink").click(function(M) {
        var L = $("ul.zip-files");
        if (L.hasClass("open")) {
            L.hide().removeClass("open")
        } else {
            L.toggle().addClass("open")
        }
    });
    $(".shoot-info a.show-hide-button").click(function(L) {
        L.preventDefault();
        $(".show-hide-button").toggleClass("hidden");
        $(".comment-area-container").slideToggle()
    });
    $("#shootDetails").click(function(N) {
        N.preventDefault();
        $(".shoot-info").toggle();
        var O = "icon-plus-squared",
            M = "icon-minus-squared",
            L = N.currentTarget;
        if ($(L).hasClass(O)) {
            $(L).removeClass(O).addClass(M)
        } else {
            $(L).removeClass(M).addClass(O)
        }
    });

    function p(L, S) {
        var R = $(L).attr("data-image-file"),
            W = $(L).offsetParent().offsetParent(),
            M = $(W).prev().find("img"),
            N = $(W).next().find("img"),
            X = $(S).attr("data-src"),
            e = {
                windowWidth: $(window).width(),
                windowHeight: $(window).height(),
                thumbnailWidth: $(L).width(),
                thumbnailHeight: $(L).height(),
                contentSize: 830
            },
            U = document.createElement("img"),
            O = a(e);
        $(".ui-dialog").css({
            "margin-top": (e.windowHeight * 0.15)
        });
        $(U).attr("src", X + R).attr("autofocus", "autofocus").width(O.width).height(O.height).appendTo(S);
        var P = [{
            text: "",
            icons: {
                primary: "icon-cancel-circled"
            },
            create: function() {
                $(this).addClass("close")
            },
            click: function() {
                $(this).dialog("close")
            }
        }];
        if (M.length > 0) {
            var Q = {
                text: "",
                icons: {
                    primary: "icon-left-open"
                },
                create: function() {
                    $(this).addClass("prev")
                },
                click: function() {
                    $(U).remove();
                    p(M, S)
                }
            };
            P.push(Q)
        }
        if (N.length > 0) {
            var V = {
                text: "",
                icons: {
                    primary: "icon-right-open"
                },
                create: function() {
                    $(this).addClass("next")
                },
                click: function() {
                    $(U).remove();
                    p(N, S)
                }
            };
            P.push(V)
        }
        $(S).dialog("option", {
            buttons: P,
            width: O.width,
            height: O.height,
            close: function(Y, Z) {
                $(U).remove();
                $(S).dialog("close");
                $("#modalOverlay").removeClass("display")
            }
        });
        var T = $("html").height();
        $("#modalOverlay").height(T).width(e.windowWidth).addClass("display");
        if ($(window)[0].hasOwnProperty("mozInnerScreenX")) {
            $(".ui-icon").css({
                top: -1
            })
        }
    }

    function a(L) {
        var N = L.windowWidth,
            e = L.windowHeight,
            O = L.thumbnailWidth,
            T = L.thumbnailHeight,
            M = L.contentSize,
            Q = {
                height: "",
                width: ""
            },
            R, P, S;
        if (T > O) {
            P = M;
            R = O / T;
            S = parseInt(P * R, 10);
            if (P > e) {
                Q.height = parseInt(e * 0.8, 10);
                Q.width = parseInt(Q.height * S / P, 10)
            } else {
                Q.height = P;
                Q.width = S
            }
        } else {
            S = M;
            R = T / O;
            P = parseInt(S * R, 10);
            if (S > N) {
                Q.width = parseInt(N * 0.8, 10);
                Q.height = parseInt(Q.width * P / S, 10)
            } else {
                Q.height = P;
                Q.width = S
            }
        }
        return Q
    }
    $(window).resize(function() {
        var e = window.matchMedia("(min-width: 640px)");
        if (e.matches) {
            $(".shoot-info").show()
        }
    });
    $("#buyShoot").click(function(O) {
        O.preventDefault();
        var L = $("#userid").text();
        if (L) {
            var N = $("#_csrf").val();
            var M = checkCardOnFile(L, N);
            $(".signup-shoot").hide();
            $.when(M).done(function(e) {
                $("form[name=buyshoot] input[type=radio]:first").prop("checked", true);
                if (e.results) {
                    if ($(this).hasClass("site-to-shoot") && !(window.location.hash)) {
                        $(".signup-shoot-container").addClass("display");
                        $("#continueToBiller").addClass("display")
                    }
                    $("#confirmPurchase").addClass("display");
                    $("#cardOnFile").attr("data-cof", true)
                } else {
                    $("#cardOnFile").attr("data-cof", false);
                    $("#continueToBiller").addClass("display")
                }
            }).fail(function(e) {
                console.log("fail:", e);
                $(".purchase-options")[0].remove();
                $("#chooseProductError").html(e.responseJSON.message).addClass("display")
            })
        } else {
            if ($(this).hasClass("site-to-shoot") && !(window.location.hash)) {
                window.location = $(".video-info a")[0].href + "#signup"
            } else {
                if (!(window.location.hash)) {
                    window.location = window.location + "#signup";
                    $(".signup-shoot-container").addClass("display")
                } else {
                    $(".signup-shoot-container").addClass("display")
                }
            }
            J()
        }
        $(".details").hide();
        $(".buy-shoot-container").addClass("display")
    });
    $("#purchaseCancel").click(function(L) {
        $(".buy-shoot-container").removeClass("display");
        $(".details").show()
    });
    if ($(".buy-shoot-container").length > 0) {
        $("#continueToBiller").click(function(L) {
            $(this).prop("disabled", true);
            s(L)
        });
        $("#confirmPurchase").click(function(L) {
            $(this).prop("disabled", true);
            s(L)
        })
    }
    $("a#signUpFormLogInShoot").click(function(L) {
        $(".signup-shoot-container").removeClass("display");
        $(".login-shoot-container").addClass("display");
        z()
    });
    $("a#loginFormCreateAccount").click(function(M) {
        M.preventDefault();
        if ($(".trailer-signin").hasClass("display")) {
            $(".trailer-signin").removeClass("display");
            $(".trailer-signup").addClass("display")
        } else {
            if (window.location.href.indexOf("login") <= -1) {
                $(".login-shoot-container").removeClass("display");
                $(".signup-shoot-container").addClass("display");
                return false
            } else {
                var L = $("#loginFormCreateAccount").attr("href");
                L = L + window.location.search;
                window.location.href = L
            }
        }
    });
    $("a.purchaseCancelShoot").click(function(L) {
        L.preventDefault();
        $(".signup-shoot-container").removeClass("display");
        $(".login-shoot-container").removeClass("display");
        $(".details").show()
    });
    $("#submitRating").click(function(M) {
        var L = ($(".member-rating-container").attr("data-entitled"));
        if (L == "true") {
            b(M, C)
        } else {
            $(".rating-error-message").text("Please purchase this shoot to rate it.").addClass("display");
            setTimeout(function() {
                $(".rating-error-message").text("").removeClass("display")
            }, 2500)
        }
    });
    $(".post-comment").focus(function(M) {
        var L = ($(".member-rating-container").attr("data-entitled"));
        if (L == "false") {
            $(".comment-error-message").text("Please purchase this shoot to comment on it.").addClass("display");
            setTimeout(function() {
                $(".comment-error-message").text("").removeClass("display")
            }, 2500)
        }
    });
    $("#message").keyup(function(L) {
        m(L)
    });
    $("#postComment").click(function(M) {
        var L = $(".member-rating-container").attr("data-entitled");
        if (L == "true") {
            if ($("#postComment").hasClass("ready-to-submit")) {
                q(M)
            } else {
                H(M)
            }
        } else {
            if (L == "false") {
                $(".comment-error-message").text("Please purchase this shoot to comment on it.").addClass("display");
                setTimeout(function() {
                    $(".comment-error-message").text("").removeClass("display")
                }, 2500)
            }
        }
    });

    function j(e) {
        var L = $.ajax({
            url: kinkConstants.purchaseUrl,
            type: "POST",
            data: e
        }).success(function(M) {
            var N;
            if (M.results === null) {
                $("#chooseProductError").text("Your purchase did not go through :(").addClass("display");
                setTimeout(function() {
                    $("#chooseProductError").removeClass("display")
                }, 2000)
            } else {
                if (M.results) {
                    N = {
                        transactionId: M.results.transactionId || null,
                        transactionTotal: M.results.transactionTotal || null,
                        transactionProducts: M.results.transactionProducts || null
                    }
                }
                if (M.results.hasOwnProperty("purchaseUrl")) {
                    return x(M.results.purchaseUrl, N)
                } else {
                    $(".buy-shoot-container").html($(".thank-you-div").show());
                    setTimeout(function() {
                        x(location.href, N)
                    }, 3000)
                }
            }
        }).error(function(M, O, N) {
            console.log(N);
            return N
        });
        return L
    }

    function s(N) {
        N.preventDefault();
        var M = $("input[name=product-choice]:checked");
        if (M.length > 0) {
            var L = {
                memberId: $("#userid").text(),
                purchaseOptionId: (M).attr("id"),
                cardOnFile: $("#cardOnFile").attr("data-cof"),
                returnUrl: window.location.href,
                ioBlackBox: $("#ioBlackBox").val(),
                _csrf: $("#_csrf").val()
            };
            j(L)
        } else {
            $("#purchasePaymentError").text("Please choose a purchase option.").addClass("display");
            setTimeout(function() {
                $("#purchasePaymentError").removeClass("display")
            }, 2000)
        }
    }

    function x(M, L) {
        var e;
        if (!M) {
            return location.reload()
        }
        if (L && L.hasOwnProperty("transactionId")) {
            if (M.indexOf("?") <= -1) {
                M += "?"
            } else {
                M += "&"
            }
            M += $.param(L)
        }
        return window.location.replace(M)
    }

    function B(e) {
        var L = $("<a>", {
            href: e
        })[0];
        var N = $.deparam(L.search.replace("?", "")),
            M = {};
        if (N.hasOwnProperty("transactionId")) {
            M.transactionId = N.transactionId;
            M.transactionTotal = N.transactionTotal;
            M.transactionProducts = N.transactionProducts
        }
        return M
    }

    function J() {
        var e = window.location.href.split("#")[0];
        var L = document.createElement("input");
        $(L).attr("type", "hidden").attr("name", "returnUrl").attr("value", e);
        $("form#signupForm").append(L)
    }

    function z() {
        var e = window.location.href.split("#")[0];
        var L = document.createElement("input");
        $(L).attr("type", "hidden").attr("name", "returnUrl").attr("value", e);
        $("form#login").append(L)
    }

    function o(e) {
        var L = $.ajax({
            url: kinkConstants.commentUrl + e,
            type: "GET"
        }).success(function(M) {
            return M
        }).fail(function(M, O, N) {
            return 0
        });
        return L
    }

    function f(e) {
        var L = o(e);
        $.when(L).done(function(S) {
            var T = S.length,
                W = "Be the First to Comment",
                Q = $("table.comments");
            if (T > 0) {
                for (var R = 0; R < T; R++) {
                    var V = document.createElement("tr"),
                        O = document.createElement("td"),
                        N = document.createElement("td"),
                        P = document.createElement("td"),
                        M = S[R].postedOn.monthOfYear + "/" + S[R].postedOn.dayOfMonth + "/" + S[R].postedOn.yearOfEra,
                        U = moment(M).format("MMM D, YYYY");
                    $(O).text(U).addClass("comment-date").appendTo(V);
                    $(N).text(S[R].message).addClass("comment-body").appendTo(V);
                    $(P).text(S[R].memberName).addClass("comment-author").appendTo(V);
                    $(V).appendTo(Q)
                }
                $("table.comments").addClass("display")
            }
        })
    }

    function m(L) {
        if ($("#message").val().length > 3 && ($("#postComment").hasClass("ready-to-submit") === false)) {
            $("#postComment").addClass("ready-to-submit");
            $("#postComment").removeClass("not-ready-to-submit")
        } else {
            if ($("#message").val().length < 3) {
                $("#postComment").removeClass("ready-to-submit");
                $("#postComment").addClass("not-ready-to-submit")
            }
        }
    }

    function H(L) {
        L.preventDefault();
        $(".comment-error-message").text("Please enter something to leave a comment.").addClass("display");
        setTimeout(function() {
            $(".comment-error-message").removeClass("display")
        }, 2000)
    }

    function q(L) {
        L.preventDefault();
        var M = {
            _csrf: $("#commentToken").val(),
            shootId: $("#shootId").val(),
            message: $("#message").val(),
            threadId: $("#threadId").val(),
            memberId: $("#memberId").val(),
            memberName: $("#memberName").val(),
            site: $("#site").val()
        };
        $.ajax({
            url: kinkConstants.commentUrl + M.shootId,
            type: "POST",
            data: M,
            success: function(P, S) {
                M.postDate = moment().format("MMM D, YYYY");
                var O = $("table.comments tr:nth-of-type(1)"),
                    R = document.createElement("tr"),
                    e = document.createElement("td"),
                    Q = document.createElement("td"),
                    N = document.createElement("td");
                $(e).text(M.postDate).addClass("comment-date").appendTo(R);
                $(Q).text(M.message).addClass("comment-body").appendTo(R);
                $(N).text(M.memberName).addClass("comment-author").appendTo(R);
                $(R).insertAfter(O);
                $("#message").val("");
                $("table.comments").addClass("display")
            },
            error: function(e, O, N) {
                console.log(e);
                console.log(N);
                $(".comment-error-message").text("Sorry, there was a problem. Please try again later.").addClass("display");
                setTimeout(function() {
                    $(".comment-error-message").text("").removeClass("display")
                }, 2000)
            }
        })
    }

    function G(e) {
        var L = $.ajax({
            url: kinkConstants.ratingUrl + e,
            type: "GET"
        }).success(function(M) {
            return M
        }).fail(function(M, O, N) {
            return 0
        });
        return L
    }

    function w(M, Q) {
        var P, e = M.toString().length;
        if (e < 2) {
            P = M + "0"
        } else {
            var S = M.slice(0, 1),
                N = 0,
                O, R = /\.[0-9]{1}/,
                L = M.match(R);
            if (L !== null) {
                O = L[0].slice(-1)
            } else {
                O = M.slice(-1)
            }
            if (O >= 5) {
                N = 5
            }
            P = S + N
        }
        $(Q).attr("data-rating", P)
    }

    function v(e) {
        if (e === 1) {
            $("#ratingCount").text("1 rating")
        } else {
            $("#ratingCount").text(e + " ratings")
        }
    }

    function E(e, L) {
        var M = $.ajax({
            url: kinkConstants.ratingUrl + L + "/" + e,
            type: "GET"
        }).done(function(N) {
            return N
        }).fail(function(N, P, O) {
            return 0
        });
        return M
    }

    function y(e) {
        $("#ratingPrompt").text(e)
    }

    function b(S, M) {
        var L = this,
            O = $(S.target)[0].parentElement,
            R = $(S.target)[0].className,
            Q = R.slice(-1),
            P = $("#commentToken").val(),
            N = {
                _csrf: P,
                shootId: $(M).val(),
                memberId: $("#memberId").val(),
                rating: Q
            };
        if (typeof(P) === "undefined") {
            $(".rating-error-message").html('You must be <a href="/login">logged in</a> to rate.').addClass("display")
        } else {
            if (!$(O).hasClass("rated")) {
                $.ajax({
                    url: kinkConstants.ratingUrl + N.shootId,
                    type: "POST",
                    data: N,
                    success: function(Y, U) {
                        var W = N.rating.toString();
                        W += "0";
                        $(".member-rating").attr("data-rating", W);
                        $("#ratingPrompt").text("Your Rating:");
                        $(".member-rating").addClass("rated");
                        var e = $("#ratingCount").text();
                        if (e === "") {
                            v(1);
                            w(W, ".average-rating")
                        } else {
                            var V = parseInt(e.slice(0, 1), 0),
                                X = parseInt(W, 0),
                                Z = V + 1,
                                ab = parseInt($(".average-rating").attr("data-rating"), 0),
                                T = parseInt(((ab * V) + X) / Z, 0),
                                aa = T.toString();
                            v(Z);
                            w(aa, ".average-rating")
                        }
                    },
                    error: function(e, U, T) {
                        $(".rating-error-message").text("Sorry, there was a problem. Please try again later.").addClass("display");
                        setTimeout(function() {
                            $(".rating-error-message").text("").removeClass("display")
                        }, 2000)
                    }
                })
            } else {
                E(N.memberId, N.shootId).then(function(V) {
                    var U = JSON.parse(V);
                    if (U._embedded) {
                        var e = U._embedded.rating[0]._links.self.href.split("/");
                        var T = e[e.length - 1];
                        return T
                    }
                }).done(function(e) {
                    if (!e) {
                        $(".rating-error-message").text("Sorry, there was a problem. Please try again in a moment.").addClass("display");
                        setTimeout(function() {
                            $(".rating-error-message").text("").removeClass("display")
                        }, 2000)
                    } else {
                        $.ajax({
                            url: kinkConstants.ratingUrl + e,
                            type: "PUT",
                            data: N,
                            success: function(U, V) {
                                var T = N.rating.toString();
                                T += "0";
                                $(".member-rating").attr("data-rating", T);
                                $("#ratingPrompt").text("Your Rating:")
                            },
                            error: function(T, V, U) {
                                $(".rating-error-message").text("Sorry, there was a problem. Please try again later.").addClass("display");
                                setTimeout(function() {
                                    $(".rating-error-message").text("").removeClass("display")
                                }, 2000)
                            }
                        })
                    }
                })
            }
        }
    }

    function I(N) {
        var M = G(N);
        $.when(M).done(function(O) {
            w(O.avgRating, ".average-rating");
            v(O.numRatings)
        });
        if (typeof($("#memberId").val()) !== "undefined") {
            var L = $("#memberId").val();
            var e = E(L, N);
            $.when(e).done(function(O) {
                var Q = JSON.parse(e.responseJSON);
                if (Q.hasOwnProperty("_embedded")) {
                    var P = Q._embedded.rating[0].rating;
                    w(P, ".member-rating");
                    y("Your Rating: ");
                    $("#submitRating").addClass("rated")
                }
            })
        }
    }

    function r(e) {
        windowWidth = $(window).width();
        if (windowWidth > 960 && e.high !== undefined) {
            return e.high
        } else {
            if (windowWidth > 640 && e.medium !== undefined) {
                return e.medium
            } else {
                return e.low
            }
        }
    }

    function D() {
        var L = B(window.location.href);
        if (L.transactionId) {
            if (!dataLayer) {
                dataLayer = []
            }
            dataLayer.push(L)
        }
        var N = false;
        var M = {
            low: $('[data-quality="full-lo"]').attr("data-url") || undefined,
            medium: $('[data-quality="full-md"]').attr("data-url") || undefined,
            high: $('[data-quality="full-hi"]').attr("data-url") || undefined
        };
        var O = r(M),
            e = $('[data-type="trailer-src"]').attr("data-url") || undefined;
        if (!e) {
            $(".trailer").remove()
        }
        $("video").attr("src", O);
        player = new MediaElementPlayer("video", {
            enableAutosize: false,
            plugins: ["flash"],
            pluginPath: "/javascripts/lib/media-element/",
            flashName: "flashmediaelement.swf",
            keyActions: config.playerKeyActions,
            success: function(P) {
                P.addEventListener("play", function() {
                    if (N === false) {
                        var Q = $(".shoot-page").attr("data-shootid");
                        $.ajax({
                            url: kinkConstants.trackUrl,
                            type: "POST",
                            data: {
                                type: "videoStream",
                                shootId: Q,
                                channel: t,
                                director: l,
                                memberId: c,
                                _csrf: $("#_csrf").val()
                            },
                            success: function(R, S) {
                                N = true
                            }
                        })
                    }
                })
            }
        });
        $(".trailer h4").click(function(P) {
            var Q = $(".trailer h4").text();
            if (Q === "Trailer") {
                $(".trailer h4").text("Streaming");
                player.setSrc(e);
                player.load()
            } else {
                $(".trailer h4").text("Trailer");
                $("video").attr("src", O);
                player.load()
            }
        })
    }

    function K() {
        var e = $("#joinButton").attr("href");
        $("a#nagSignUp").attr("href", e);
        player = new MediaElementPlayer("video", {
            enableAutosize: false,
            plugins: ["flash"],
            pluginPath: "/javascripts/lib/media-element/",
            flashName: "flashmediaelement.swf",
            keyActions: config.playerKeyActions,
            success: function(O) {
                var N = 0,
                    M, L;
                if (!c || c === "") {
                    if (docCookies.hasItem("ktvc")) {
                        N = parseInt(docCookies.getItem("ktvc"), 10)
                    } else {
                        docCookies.setItem("ktvc", 0, 86400)
                    }
                    if (N >= kinkConstants.trailerViews) {
                        d("maxed")
                    } else {
                        M = kinkConstants.trailerViews - N
                    }
                    O.addEventListener("playing", function() {
                        u();
                        L = N + 1;
                        docCookies.setItem("ktvc", L)
                    });
                    O.addEventListener("pause", function() {
                        if (L >= kinkConstants.trailerViews) {
                            d("maxed")
                        } else {
                            var P = kinkConstants.trailerViews - L;
                            d("remaining", P)
                        }
                    });
                    O.addEventListener("ended", function() {
                        if (L >= kinkConstants.trailerViews) {
                            d("maxed")
                        } else {
                            M = kinkConstants.trailerViews - L;
                            d("remaining", M);
                            N = L
                        }
                    });
                    $("#playTrailer").click(function(P) {
                        u();
                        player.play()
                    })
                }
            }
        })
    }

    function d(e, M) {
        var N = $(".player").height();
        $(".nag-screen").prependTo($(".player")).height(N).addClass("display");
        $(".mejs-overlay-button").hide();
        if (e === "remaining") {
            var L = M + " trailer";
            if (M > 1) {
                L += "s"
            }
            $("#trailersRemaining").text(L);
            $(".remaining").addClass("display")
        } else {
            if (e === "maxed") {
                $(".maxed").addClass("display")
            }
        }
    }

    function u() {
        $(".nag-screen").removeClass("display");
        $(".nag-screen > div").each(function() {
            $(this).removeClass("display")
        })
    }
});
$(".accordion").click(function(a) {
    openAnswer(a)
});
var helpfulStatus = true;
$(".helpful-popup").click(function() {
    $(".helpful-popup").hide();
    helpfulStatus = false
});
$("#contactus-desc").keyup(function() {
    var b = $(this).val(),
        a = $(".helpful-popup"),
        c = '<br /><br /><a id="close-popup">No Thanks</a>';

    function d(e) {
        a.html(e);
        a.append(c).fadeIn()
    }
    if (helpfulStatus === true) {
        if (b.match(/cancel/)) {
            d('Do you want to cancel a recurring subscription? You can do that <a href="/my/subscription-management">here</a>')
        } else {
            if (b.match(/charge/) || b.match(/billing/) || b.match(/statement/)) {
                d('Do you need <a href="/support/billing-info">Billing Support?</a>')
            } else {
                if (b.match(/perform/) || b.match(/porn star/) || b.match(/in videos/)) {
                    d('Are you looking for our modeling application? <a href="http://www.kink.com/k/model_call.jsp">Click here</a>')
                } else {
                    if (b.match(/tour/)) {
                        d('Do you want information about tours of the San Francisco Armory? Just click <a href=http://www.armorystudios.com/san-francisco-tours/">here</a>')
                    } else {
                        if (b.match(/dvd/)) {
                            c = '<br /><br /><a id="close-popup">OK</a>';
                            d("FYI, Kink.com does not produce or sell DVDs at this time!")
                        } else {
                            if (b.match(/ipad/)) {
                                c = '<br /><br /><a id="close-popup">OK</a>';
                                d('FYI, Yes, you can use your iPad to access content on our sites! <a href="/support/faq/#ipad">Click here for more information</a>')
                            } else {
                                if (b.match(/bad username/) || b.match(/bad password/)) {
                                    c = '<br /><br /><a id="close-popup">OK</a>';
                                    d("Quick tip: If you're entering your username and password correctly, you may still have trouble logging in if you have not recently cleared your browser caches.")
                                } else {
                                    if (b.match(/password/)) {
                                        d('We can retrieve your password for you! Just click <a href="http://sso.kink.com/sso/pw_forgot.jsp">here</a>')
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
$("input#contactus-email").blur(function(b) {
    var a = validateEmail(b.currentTarget.value);
    $("#responseErrors").removeClass("display");
    if (a) {
        $("#emailError").html('<span class="icon-attention"/> ' + a);
        $("#emailError").addClass("display");
        $("#contactus-email").addClass("error")
    } else {
        $("#emailError").html("");
        $("#emailError").removeClass("display");
        $("#contactus-email").removeClass("error")
    }
});

function validateSupport() {
    var f = true,
        a = $("#contactus-email").val(),
        c = validateEmail(a),
        b = $("#contactus-subject").val(),
        d = validateSubject(b),
        e = $("#contactus-desc").val();
    $("#responseErrors").removeClass("display");
    if (c) {
        $("#emailError").html('<span class="icon-attention"/> ' + c).addClass("display");
        $("#contactus-email").addClass("error");
        f = false
    } else {
        $("#emailError").removeClass("display");
        $("#contactus-email").removeClass("error")
    }
    if (d) {
        $("#subjectError").html('<span class="icon-attention"/> ' + d).addClass("display");
        $("#contactus-subject").addClass("error");
        f = false
    } else {
        $("#subjectError").removeClass("display");
        $("#contactus-subject").removeClass("error")
    }
    if (e) {
        $("#descriptionError").removeClass("display");
        $("#contactus-desc").removeClass("error")
    } else {
        $("#descriptionError").html('<span class="icon-attention"/> Please add a description of your issue').addClass("display");
        $("#contactus-desc").addClass("error");
        f = false
    }
    return f
}
$("#contactSupport").on("submit", function(a) {
    a.preventDefault();
    if (validateSupport()) {
        this.submit()
    }
});

function openAnswer(b) {
    var a = $(b.target);
    a.parent().find(".title").toggleClass("open");
    a.parent().find(".content").toggleClass("display")
}

function validateSubject(a) {
    var b = "";
    if (a == "+++ SELECT YOUR ISSUE +++") {
        b = "Please choose a subject"
    }
    return b
};