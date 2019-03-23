base64decode = function(e) {
                var t, n, r, o, i, a, s, c = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
                for (a = e.length,
                i = 0,
                s = ""; i < a; ) {
                    do
                        t = c[255 & e.charCodeAt(i++)];
                    while (i < a && t == -1);if (t == -1)
                        break;
                    do
                        n = c[255 & e.charCodeAt(i++)];
                    while (i < a && n == -1);if (n == -1)
                        break;
                    s += String.fromCharCode(t << 2 | (48 & n) >> 4);
                    do {
                        if (r = 255 & e.charCodeAt(i++),
                        61 == r)
                            return s;
                        r = c[r]
                    } while (i < a && r == -1);if (r == -1)
                        break;
                    s += String.fromCharCode((15 & n) << 4 | (60 & r) >> 2);
                    do {
                        if (o = 255 & e.charCodeAt(i++),
                        61 == o)
                            return s;
                        o = c[o]
                    } while (i < a && o == -1);if (o == -1)
                        break;
                    s += String.fromCharCode((3 & r) << 6 | o)
                }
                return s
            }

crc32 = function(e, pathname) {
                var n = function() {
                    for (var e = 0, t = new Array(256), n = 0; 256 != n; ++n)
                        e = n,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1,
                        t[n] = e;
                    return "undefined" != typeof Int32Array ? new Int32Array(t) : t
                }()
                  , r = function(e) {
                    for (var t, r, o = -1, i = 0, a = e.length; i < a; )
                        t = e.charCodeAt(i++),
                        t < 128 ? o = o >>> 8 ^ n[255 & (o ^ t)] : t < 2048 ? (o = o >>> 8 ^ n[255 & (o ^ (192 | t >> 6 & 31))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | 63 & t))]) : t >= 55296 && t < 57344 ? (t = (1023 & t) + 64,
                        r = 1023 & e.charCodeAt(i++),
                        o = o >>> 8 ^ n[255 & (o ^ (240 | t >> 8 & 7))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | t >> 2 & 63))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | r >> 6 & 15 | (3 & t) << 4))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | 63 & r))]) : (o = o >>> 8 ^ n[255 & (o ^ (224 | t >> 12 & 15))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | t >> 6 & 63))],
                        o = o >>> 8 ^ n[255 & (o ^ (128 | 63 & t))]);
                    return o ^ -1
                }
                  , o = pathname + "?r=" + Math.random().toString(10).substring(2);
                "/" != o[0] && (o = "/" + o);
                var i = r(o) >>> 0;
                return o + "&s=" + i
            }