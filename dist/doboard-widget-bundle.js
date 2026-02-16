/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.html2canvas = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || from);
    }

    var Bounds = /** @class */ (function () {
        function Bounds(left, top, width, height) {
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }
        Bounds.prototype.add = function (x, y, w, h) {
            return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
        };
        Bounds.fromClientRect = function (context, clientRect) {
            return new Bounds(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
        };
        Bounds.fromDOMRectList = function (context, domRectList) {
            var domRect = Array.from(domRectList).find(function (rect) { return rect.width !== 0; });
            return domRect
                ? new Bounds(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height)
                : Bounds.EMPTY;
        };
        Bounds.EMPTY = new Bounds(0, 0, 0, 0);
        return Bounds;
    }());
    var parseBounds = function (context, node) {
        return Bounds.fromClientRect(context, node.getBoundingClientRect());
    };
    var parseDocumentSize = function (document) {
        var body = document.body;
        var documentElement = document.documentElement;
        if (!body || !documentElement) {
            throw new Error("Unable to get document size");
        }
        var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
        var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
        return new Bounds(0, 0, width, height);
    };

    /*
     * css-line-break 2.1.0 <https://github.com/niklasvh/css-line-break#readme>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var toCodePoints$1 = function (str) {
        var codePoints = [];
        var i = 0;
        var length = str.length;
        while (i < length) {
            var value = str.charCodeAt(i++);
            if (value >= 0xd800 && value <= 0xdbff && i < length) {
                var extra = str.charCodeAt(i++);
                if ((extra & 0xfc00) === 0xdc00) {
                    codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
                }
                else {
                    codePoints.push(value);
                    i--;
                }
            }
            else {
                codePoints.push(value);
            }
        }
        return codePoints;
    };
    var fromCodePoint$1 = function () {
        var codePoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
        }
        if (String.fromCodePoint) {
            return String.fromCodePoint.apply(String, codePoints);
        }
        var length = codePoints.length;
        if (!length) {
            return '';
        }
        var codeUnits = [];
        var index = -1;
        var result = '';
        while (++index < length) {
            var codePoint = codePoints[index];
            if (codePoint <= 0xffff) {
                codeUnits.push(codePoint);
            }
            else {
                codePoint -= 0x10000;
                codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
            }
            if (index + 1 === length || codeUnits.length > 0x4000) {
                result += String.fromCharCode.apply(String, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    var chars$2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup$2 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
        lookup$2[chars$2.charCodeAt(i$2)] = i$2;
    }

    /*
     * utrie 1.0.2 <https://github.com/niklasvh/utrie>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var chars$1$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup$1$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
        lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
    }
    var decode$1 = function (base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === '=') {
            bufferLength--;
            if (base64[base64.length - 2] === '=') {
                bufferLength--;
            }
        }
        var buffer = typeof ArrayBuffer !== 'undefined' &&
            typeof Uint8Array !== 'undefined' &&
            typeof Uint8Array.prototype.slice !== 'undefined'
            ? new ArrayBuffer(bufferLength)
            : new Array(bufferLength);
        var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
        for (i = 0; i < len; i += 4) {
            encoded1 = lookup$1$1[base64.charCodeAt(i)];
            encoded2 = lookup$1$1[base64.charCodeAt(i + 1)];
            encoded3 = lookup$1$1[base64.charCodeAt(i + 2)];
            encoded4 = lookup$1$1[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return buffer;
    };
    var polyUint16Array$1 = function (buffer) {
        var length = buffer.length;
        var bytes = [];
        for (var i = 0; i < length; i += 2) {
            bytes.push((buffer[i + 1] << 8) | buffer[i]);
        }
        return bytes;
    };
    var polyUint32Array$1 = function (buffer) {
        var length = buffer.length;
        var bytes = [];
        for (var i = 0; i < length; i += 4) {
            bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
        }
        return bytes;
    };

    /** Shift size for getting the index-2 table offset. */
    var UTRIE2_SHIFT_2$1 = 5;
    /** Shift size for getting the index-1 table offset. */
    var UTRIE2_SHIFT_1$1 = 6 + 5;
    /**
     * Shift size for shifting left the index array values.
     * Increases possible data size with 16-bit index values at the cost
     * of compactability.
     * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
     */
    var UTRIE2_INDEX_SHIFT$1 = 2;
    /**
     * Difference between the two shift sizes,
     * for getting an index-1 offset from an index-2 offset. 6=11-5
     */
    var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
    /**
     * The part of the index-2 table for U+D800..U+DBFF stores values for
     * lead surrogate code _units_ not code _points_.
     * Values for lead surrogate code _points_ are indexed with this portion of the table.
     * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
     */
    var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 0x10000 >> UTRIE2_SHIFT_2$1;
    /** Number of entries in a data block. 32=0x20 */
    var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
    /** Mask for getting the lower bits for the in-data-block offset. */
    var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
    var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 0x400 >> UTRIE2_SHIFT_2$1;
    /** Count the lengths of both BMP pieces. 2080=0x820 */
    var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
    /**
     * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
     * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
     */
    var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
    var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
    /**
     * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
     * Variable length, for code points up to highStart, where the last single-value range starts.
     * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
     * (For 0x100000 supplementary code points U+10000..U+10ffff.)
     *
     * The part of the index-2 table for supplementary code points starts
     * after this index-1 table.
     *
     * Both the index-1 table and the following part of the index-2 table
     * are omitted completely if there is only BMP data.
     */
    var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
    /**
     * Number of index-1 entries for the BMP. 32=0x20
     * This part of the index-1 table is omitted from the serialized form.
     */
    var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 0x10000 >> UTRIE2_SHIFT_1$1;
    /** Number of entries in an index-2 block. 64=0x40 */
    var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
    /** Mask for getting the lower bits for the in-index-2-block offset. */
    var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
    var slice16$1 = function (view, start, end) {
        if (view.slice) {
            return view.slice(start, end);
        }
        return new Uint16Array(Array.prototype.slice.call(view, start, end));
    };
    var slice32$1 = function (view, start, end) {
        if (view.slice) {
            return view.slice(start, end);
        }
        return new Uint32Array(Array.prototype.slice.call(view, start, end));
    };
    var createTrieFromBase64$1 = function (base64, _byteLength) {
        var buffer = decode$1(base64);
        var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
        var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
        var headerLength = 24;
        var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
        var data = view32[5] === 2
            ? slice16$1(view16, (headerLength + view32[4]) / 2)
            : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
        return new Trie$1(view32[0], view32[1], view32[2], view32[3], index, data);
    };
    var Trie$1 = /** @class */ (function () {
        function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
            this.initialValue = initialValue;
            this.errorValue = errorValue;
            this.highStart = highStart;
            this.highValueIndex = highValueIndex;
            this.index = index;
            this.data = data;
        }
        /**
         * Get the value for a code point as stored in the Trie.
         *
         * @param codePoint the code point
         * @return the value
         */
        Trie.prototype.get = function (codePoint) {
            var ix;
            if (codePoint >= 0) {
                if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                    // Ordinary BMP code point, excluding leading surrogates.
                    // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                    // 16 bit data is stored in the index array itself.
                    ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
                    ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                    return this.data[ix];
                }
                if (codePoint <= 0xffff) {
                    // Lead Surrogate Code Point.  A Separate index section is stored for
                    // lead surrogate code units and code points.
                    //   The main index has the code unit data.
                    //   For this function, we need the code point data.
                    // Note: this expression could be refactored for slightly improved efficiency, but
                    //       surrogate code points will be so rare in practice that it's not worth it.
                    ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2$1)];
                    ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                    return this.data[ix];
                }
                if (codePoint < this.highStart) {
                    // Supplemental code point, use two-level lookup.
                    ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
                    ix = this.index[ix];
                    ix += (codePoint >> UTRIE2_SHIFT_2$1) & UTRIE2_INDEX_2_MASK$1;
                    ix = this.index[ix];
                    ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                    return this.data[ix];
                }
                if (codePoint <= 0x10ffff) {
                    return this.data[this.highValueIndex];
                }
            }
            // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
            return this.errorValue;
        };
        return Trie;
    }());

    /*
     * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var chars$3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup$3 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
        lookup$3[chars$3.charCodeAt(i$3)] = i$3;
    }

    var base64$1 = 'KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==';

    var LETTER_NUMBER_MODIFIER = 50;
    // Non-tailorable Line Breaking Classes
    var BK = 1; //  Cause a line break (after)
    var CR$1 = 2; //  Cause a line break (after), except between CR and LF
    var LF$1 = 3; //  Cause a line break (after)
    var CM = 4; //  Prohibit a line break between the character and the preceding character
    var NL = 5; //  Cause a line break (after)
    var WJ = 7; //  Prohibit line breaks before and after
    var ZW = 8; //  Provide a break opportunity
    var GL = 9; //  Prohibit line breaks before and after
    var SP = 10; // Enable indirect line breaks
    var ZWJ$1 = 11; // Prohibit line breaks within joiner sequences
    // Break Opportunities
    var B2 = 12; //  Provide a line break opportunity before and after the character
    var BA = 13; //  Generally provide a line break opportunity after the character
    var BB = 14; //  Generally provide a line break opportunity before the character
    var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
    var CB = 16; //   Provide a line break opportunity contingent on additional information
    // Characters Prohibiting Certain Breaks
    var CL = 17; //  Prohibit line breaks before
    var CP = 18; //  Prohibit line breaks before
    var EX = 19; //  Prohibit line breaks before
    var IN = 20; //  Allow only indirect line breaks between pairs
    var NS = 21; //  Allow only indirect line breaks before
    var OP = 22; //  Prohibit line breaks after
    var QU = 23; //  Act like they are both opening and closing
    // Numeric Context
    var IS = 24; //  Prevent breaks after any and before numeric
    var NU = 25; //  Form numeric expressions for line breaking purposes
    var PO = 26; //  Do not break following a numeric expression
    var PR = 27; //  Do not break in front of a numeric expression
    var SY = 28; //  Prevent a break before; and allow a break after
    // Other Characters
    var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
    var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
    var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
    var EB = 32; //  Do not break from following Emoji Modifier
    var EM = 33; //  Do not break from preceding Emoji Base
    var H2 = 34; //  Form Korean syllable blocks
    var H3 = 35; //  Form Korean syllable blocks
    var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
    var ID = 37; //  Break before or after; except in some numeric context
    var JL = 38; //  Form Korean syllable blocks
    var JV = 39; //  Form Korean syllable blocks
    var JT = 40; //  Form Korean syllable blocks
    var RI$1 = 41; //  Keep pairs together. For pairs; break before and after other classes
    var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
    var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions
    var ea_OP = [0x2329, 0xff08];
    var BREAK_MANDATORY = '!';
    var BREAK_NOT_ALLOWED$1 = '×';
    var BREAK_ALLOWED$1 = '÷';
    var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
    var ALPHABETICS = [AL, HL];
    var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
    var SPACE$1 = [SP, ZW];
    var PREFIX_POSTFIX = [PR, PO];
    var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
    var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
    var HYPHEN = [HY, BA];
    var codePointsToCharacterClasses = function (codePoints, lineBreak) {
        if (lineBreak === void 0) { lineBreak = 'strict'; }
        var types = [];
        var indices = [];
        var categories = [];
        codePoints.forEach(function (codePoint, index) {
            var classType = UnicodeTrie$1.get(codePoint);
            if (classType > LETTER_NUMBER_MODIFIER) {
                categories.push(true);
                classType -= LETTER_NUMBER_MODIFIER;
            }
            else {
                categories.push(false);
            }
            if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
                // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
                if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                    indices.push(index);
                    return types.push(CB);
                }
            }
            if (classType === CM || classType === ZWJ$1) {
                // LB10 Treat any remaining combining mark or ZWJ as AL.
                if (index === 0) {
                    indices.push(index);
                    return types.push(AL);
                }
                // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
                // the base character in all of the following rules. Treat ZWJ as if it were CM.
                var prev = types[index - 1];
                if (LINE_BREAKS.indexOf(prev) === -1) {
                    indices.push(indices[index - 1]);
                    return types.push(prev);
                }
                indices.push(index);
                return types.push(AL);
            }
            indices.push(index);
            if (classType === CJ) {
                return types.push(lineBreak === 'strict' ? NS : ID);
            }
            if (classType === SA) {
                return types.push(AL);
            }
            if (classType === AI) {
                return types.push(AL);
            }
            // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
            // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
            // to take into account the actual line breaking properties for these characters.
            if (classType === XX) {
                if ((codePoint >= 0x20000 && codePoint <= 0x2fffd) || (codePoint >= 0x30000 && codePoint <= 0x3fffd)) {
                    return types.push(ID);
                }
                else {
                    return types.push(AL);
                }
            }
            types.push(classType);
        });
        return [indices, types, categories];
    };
    var isAdjacentWithSpaceIgnored = function (a, b, currentIndex, classTypes) {
        var current = classTypes[currentIndex];
        if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
            var i = currentIndex;
            while (i <= classTypes.length) {
                i++;
                var next = classTypes[i];
                if (next === b) {
                    return true;
                }
                if (next !== SP) {
                    break;
                }
            }
        }
        if (current === SP) {
            var i = currentIndex;
            while (i > 0) {
                i--;
                var prev = classTypes[i];
                if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                    var n = currentIndex;
                    while (n <= classTypes.length) {
                        n++;
                        var next = classTypes[n];
                        if (next === b) {
                            return true;
                        }
                        if (next !== SP) {
                            break;
                        }
                    }
                }
                if (prev !== SP) {
                    break;
                }
            }
        }
        return false;
    };
    var previousNonSpaceClassType = function (currentIndex, classTypes) {
        var i = currentIndex;
        while (i >= 0) {
            var type = classTypes[i];
            if (type === SP) {
                i--;
            }
            else {
                return type;
            }
        }
        return 0;
    };
    var _lineBreakAtIndex = function (codePoints, classTypes, indicies, index, forbiddenBreaks) {
        if (indicies[index] === 0) {
            return BREAK_NOT_ALLOWED$1;
        }
        var currentIndex = index - 1;
        if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
            return BREAK_NOT_ALLOWED$1;
        }
        var beforeIndex = currentIndex - 1;
        var afterIndex = currentIndex + 1;
        var current = classTypes[currentIndex];
        // LB4 Always break after hard line breaks.
        // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
        var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
        var next = classTypes[afterIndex];
        if (current === CR$1 && next === LF$1) {
            return BREAK_NOT_ALLOWED$1;
        }
        if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
            return BREAK_MANDATORY;
        }
        // LB6 Do not break before hard line breaks.
        if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB7 Do not break before spaces or zero width space.
        if (SPACE$1.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
        if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
            return BREAK_ALLOWED$1;
        }
        // LB8a Do not break after a zero width joiner.
        if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // zwj emojis
        if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB11 Do not break before or after Word joiner and related characters.
        if (current === WJ || next === WJ) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB12 Do not break after NBSP and related characters.
        if (current === GL) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
        if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
        if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB14 Do not break after ‘[’, even after spaces.
        if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB15 Do not break within ‘”[’, even with intervening spaces.
        if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
        if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB17 Do not break within ‘——’, even with intervening spaces.
        if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB18 Break after spaces.
        if (current === SP) {
            return BREAK_ALLOWED$1;
        }
        // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
        if (current === QU || next === QU) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB20 Break before and after unresolved CB.
        if (next === CB || current === CB) {
            return BREAK_ALLOWED$1;
        }
        // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
        if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB21a Don't break after Hebrew + Hyphen.
        if (before === HL && HYPHEN.indexOf(current) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB21b Don’t break between Solidus and Hebrew letters.
        if (current === SY && next === HL) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB22 Do not break before ellipsis.
        if (next === IN) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB23 Do not break between digits and letters.
        if ((ALPHABETICS.indexOf(next) !== -1 && current === NU) || (ALPHABETICS.indexOf(current) !== -1 && next === NU)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
        if ((current === PR && [ID, EB, EM].indexOf(next) !== -1) ||
            ([ID, EB, EM].indexOf(current) !== -1 && next === PO)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
        if ((ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1) ||
            (PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB25 Do not break between the following pairs of classes relevant to numbers:
        if (
        // (PR | PO) × ( OP | HY )? NU
        ([PR, PO].indexOf(current) !== -1 &&
            (next === NU || ([OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU))) ||
            // ( OP | HY ) × NU
            ([OP, HY].indexOf(current) !== -1 && next === NU) ||
            // NU ×	(NU | SY | IS)
            (current === NU && [NU, SY, IS].indexOf(next) !== -1)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
        if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
            var prevIndex = currentIndex;
            while (prevIndex >= 0) {
                var type = classTypes[prevIndex];
                if (type === NU) {
                    return BREAK_NOT_ALLOWED$1;
                }
                else if ([SY, IS].indexOf(type) !== -1) {
                    prevIndex--;
                }
                else {
                    break;
                }
            }
        }
        // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
        if ([PR, PO].indexOf(next) !== -1) {
            var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
            while (prevIndex >= 0) {
                var type = classTypes[prevIndex];
                if (type === NU) {
                    return BREAK_NOT_ALLOWED$1;
                }
                else if ([SY, IS].indexOf(type) !== -1) {
                    prevIndex--;
                }
                else {
                    break;
                }
            }
        }
        // LB26 Do not break a Korean syllable.
        if ((JL === current && [JL, JV, H2, H3].indexOf(next) !== -1) ||
            ([JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1) ||
            ([JT, H3].indexOf(current) !== -1 && next === JT)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB27 Treat a Korean Syllable Block the same as ID.
        if ((KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1) ||
            (KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB28 Do not break between alphabetics (“at”).
        if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
        if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
        if ((ALPHABETICS.concat(NU).indexOf(current) !== -1 &&
            next === OP &&
            ea_OP.indexOf(codePoints[afterIndex]) === -1) ||
            (ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP)) {
            return BREAK_NOT_ALLOWED$1;
        }
        // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
        // indicators preceding the position of the break.
        if (current === RI$1 && next === RI$1) {
            var i = indicies[currentIndex];
            var count = 1;
            while (i > 0) {
                i--;
                if (classTypes[i] === RI$1) {
                    count++;
                }
                else {
                    break;
                }
            }
            if (count % 2 !== 0) {
                return BREAK_NOT_ALLOWED$1;
            }
        }
        // LB30b Do not break between an emoji base and an emoji modifier.
        if (current === EB && next === EM) {
            return BREAK_NOT_ALLOWED$1;
        }
        return BREAK_ALLOWED$1;
    };
    var cssFormattedClasses = function (codePoints, options) {
        if (!options) {
            options = { lineBreak: 'normal', wordBreak: 'normal' };
        }
        var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
        if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
            classTypes = classTypes.map(function (type) { return ([NU, AL, SA].indexOf(type) !== -1 ? ID : type); });
        }
        var forbiddenBreakpoints = options.wordBreak === 'keep-all'
            ? isLetterNumber.map(function (letterNumber, i) {
                return letterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
            })
            : undefined;
        return [indicies, classTypes, forbiddenBreakpoints];
    };
    var Break = /** @class */ (function () {
        function Break(codePoints, lineBreak, start, end) {
            this.codePoints = codePoints;
            this.required = lineBreak === BREAK_MANDATORY;
            this.start = start;
            this.end = end;
        }
        Break.prototype.slice = function () {
            return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
        };
        return Break;
    }());
    var LineBreaker = function (str, options) {
        var codePoints = toCodePoints$1(str);
        var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
        var length = codePoints.length;
        var lastEnd = 0;
        var nextIndex = 0;
        return {
            next: function () {
                if (nextIndex >= length) {
                    return { done: true, value: null };
                }
                var lineBreak = BREAK_NOT_ALLOWED$1;
                while (nextIndex < length &&
                    (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) ===
                        BREAK_NOT_ALLOWED$1) { }
                if (lineBreak !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
                    var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                    lastEnd = nextIndex;
                    return { value: value, done: false };
                }
                return { done: true, value: null };
            },
        };
    };

    // https://www.w3.org/TR/css-syntax-3
    var FLAG_UNRESTRICTED = 1 << 0;
    var FLAG_ID = 1 << 1;
    var FLAG_INTEGER = 1 << 2;
    var FLAG_NUMBER = 1 << 3;
    var LINE_FEED = 0x000a;
    var SOLIDUS = 0x002f;
    var REVERSE_SOLIDUS = 0x005c;
    var CHARACTER_TABULATION = 0x0009;
    var SPACE = 0x0020;
    var QUOTATION_MARK = 0x0022;
    var EQUALS_SIGN = 0x003d;
    var NUMBER_SIGN = 0x0023;
    var DOLLAR_SIGN = 0x0024;
    var PERCENTAGE_SIGN = 0x0025;
    var APOSTROPHE = 0x0027;
    var LEFT_PARENTHESIS = 0x0028;
    var RIGHT_PARENTHESIS = 0x0029;
    var LOW_LINE = 0x005f;
    var HYPHEN_MINUS = 0x002d;
    var EXCLAMATION_MARK = 0x0021;
    var LESS_THAN_SIGN = 0x003c;
    var GREATER_THAN_SIGN = 0x003e;
    var COMMERCIAL_AT = 0x0040;
    var LEFT_SQUARE_BRACKET = 0x005b;
    var RIGHT_SQUARE_BRACKET = 0x005d;
    var CIRCUMFLEX_ACCENT = 0x003d;
    var LEFT_CURLY_BRACKET = 0x007b;
    var QUESTION_MARK = 0x003f;
    var RIGHT_CURLY_BRACKET = 0x007d;
    var VERTICAL_LINE = 0x007c;
    var TILDE = 0x007e;
    var CONTROL = 0x0080;
    var REPLACEMENT_CHARACTER = 0xfffd;
    var ASTERISK = 0x002a;
    var PLUS_SIGN = 0x002b;
    var COMMA = 0x002c;
    var COLON = 0x003a;
    var SEMICOLON = 0x003b;
    var FULL_STOP = 0x002e;
    var NULL = 0x0000;
    var BACKSPACE = 0x0008;
    var LINE_TABULATION = 0x000b;
    var SHIFT_OUT = 0x000e;
    var INFORMATION_SEPARATOR_ONE = 0x001f;
    var DELETE = 0x007f;
    var EOF = -1;
    var ZERO = 0x0030;
    var a = 0x0061;
    var e = 0x0065;
    var f = 0x0066;
    var u = 0x0075;
    var z = 0x007a;
    var A = 0x0041;
    var E = 0x0045;
    var F = 0x0046;
    var U = 0x0055;
    var Z = 0x005a;
    var isDigit = function (codePoint) { return codePoint >= ZERO && codePoint <= 0x0039; };
    var isSurrogateCodePoint = function (codePoint) { return codePoint >= 0xd800 && codePoint <= 0xdfff; };
    var isHex = function (codePoint) {
        return isDigit(codePoint) || (codePoint >= A && codePoint <= F) || (codePoint >= a && codePoint <= f);
    };
    var isLowerCaseLetter = function (codePoint) { return codePoint >= a && codePoint <= z; };
    var isUpperCaseLetter = function (codePoint) { return codePoint >= A && codePoint <= Z; };
    var isLetter = function (codePoint) { return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint); };
    var isNonASCIICodePoint = function (codePoint) { return codePoint >= CONTROL; };
    var isWhiteSpace = function (codePoint) {
        return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
    };
    var isNameStartCodePoint = function (codePoint) {
        return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
    };
    var isNameCodePoint = function (codePoint) {
        return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
    };
    var isNonPrintableCodePoint = function (codePoint) {
        return ((codePoint >= NULL && codePoint <= BACKSPACE) ||
            codePoint === LINE_TABULATION ||
            (codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE) ||
            codePoint === DELETE);
    };
    var isValidEscape = function (c1, c2) {
        if (c1 !== REVERSE_SOLIDUS) {
            return false;
        }
        return c2 !== LINE_FEED;
    };
    var isIdentifierStart = function (c1, c2, c3) {
        if (c1 === HYPHEN_MINUS) {
            return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
        }
        else if (isNameStartCodePoint(c1)) {
            return true;
        }
        else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
            return true;
        }
        return false;
    };
    var isNumberStart = function (c1, c2, c3) {
        if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
            if (isDigit(c2)) {
                return true;
            }
            return c2 === FULL_STOP && isDigit(c3);
        }
        if (c1 === FULL_STOP) {
            return isDigit(c2);
        }
        return isDigit(c1);
    };
    var stringToNumber = function (codePoints) {
        var c = 0;
        var sign = 1;
        if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
            if (codePoints[c] === HYPHEN_MINUS) {
                sign = -1;
            }
            c++;
        }
        var integers = [];
        while (isDigit(codePoints[c])) {
            integers.push(codePoints[c++]);
        }
        var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
        if (codePoints[c] === FULL_STOP) {
            c++;
        }
        var fraction = [];
        while (isDigit(codePoints[c])) {
            fraction.push(codePoints[c++]);
        }
        var fracd = fraction.length;
        var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
        if (codePoints[c] === E || codePoints[c] === e) {
            c++;
        }
        var expsign = 1;
        if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
            if (codePoints[c] === HYPHEN_MINUS) {
                expsign = -1;
            }
            c++;
        }
        var exponent = [];
        while (isDigit(codePoints[c])) {
            exponent.push(codePoints[c++]);
        }
        var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
        return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
    };
    var LEFT_PARENTHESIS_TOKEN = {
        type: 2 /* LEFT_PARENTHESIS_TOKEN */
    };
    var RIGHT_PARENTHESIS_TOKEN = {
        type: 3 /* RIGHT_PARENTHESIS_TOKEN */
    };
    var COMMA_TOKEN = { type: 4 /* COMMA_TOKEN */ };
    var SUFFIX_MATCH_TOKEN = { type: 13 /* SUFFIX_MATCH_TOKEN */ };
    var PREFIX_MATCH_TOKEN = { type: 8 /* PREFIX_MATCH_TOKEN */ };
    var COLUMN_TOKEN = { type: 21 /* COLUMN_TOKEN */ };
    var DASH_MATCH_TOKEN = { type: 9 /* DASH_MATCH_TOKEN */ };
    var INCLUDE_MATCH_TOKEN = { type: 10 /* INCLUDE_MATCH_TOKEN */ };
    var LEFT_CURLY_BRACKET_TOKEN = {
        type: 11 /* LEFT_CURLY_BRACKET_TOKEN */
    };
    var RIGHT_CURLY_BRACKET_TOKEN = {
        type: 12 /* RIGHT_CURLY_BRACKET_TOKEN */
    };
    var SUBSTRING_MATCH_TOKEN = { type: 14 /* SUBSTRING_MATCH_TOKEN */ };
    var BAD_URL_TOKEN = { type: 23 /* BAD_URL_TOKEN */ };
    var BAD_STRING_TOKEN = { type: 1 /* BAD_STRING_TOKEN */ };
    var CDO_TOKEN = { type: 25 /* CDO_TOKEN */ };
    var CDC_TOKEN = { type: 24 /* CDC_TOKEN */ };
    var COLON_TOKEN = { type: 26 /* COLON_TOKEN */ };
    var SEMICOLON_TOKEN = { type: 27 /* SEMICOLON_TOKEN */ };
    var LEFT_SQUARE_BRACKET_TOKEN = {
        type: 28 /* LEFT_SQUARE_BRACKET_TOKEN */
    };
    var RIGHT_SQUARE_BRACKET_TOKEN = {
        type: 29 /* RIGHT_SQUARE_BRACKET_TOKEN */
    };
    var WHITESPACE_TOKEN = { type: 31 /* WHITESPACE_TOKEN */ };
    var EOF_TOKEN = { type: 32 /* EOF_TOKEN */ };
    var Tokenizer = /** @class */ (function () {
        function Tokenizer() {
            this._value = [];
        }
        Tokenizer.prototype.write = function (chunk) {
            this._value = this._value.concat(toCodePoints$1(chunk));
        };
        Tokenizer.prototype.read = function () {
            var tokens = [];
            var token = this.consumeToken();
            while (token !== EOF_TOKEN) {
                tokens.push(token);
                token = this.consumeToken();
            }
            return tokens;
        };
        Tokenizer.prototype.consumeToken = function () {
            var codePoint = this.consumeCodePoint();
            switch (codePoint) {
                case QUOTATION_MARK:
                    return this.consumeStringToken(QUOTATION_MARK);
                case NUMBER_SIGN:
                    var c1 = this.peekCodePoint(0);
                    var c2 = this.peekCodePoint(1);
                    var c3 = this.peekCodePoint(2);
                    if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                        var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                        var value = this.consumeName();
                        return { type: 5 /* HASH_TOKEN */, value: value, flags: flags };
                    }
                    break;
                case DOLLAR_SIGN:
                    if (this.peekCodePoint(0) === EQUALS_SIGN) {
                        this.consumeCodePoint();
                        return SUFFIX_MATCH_TOKEN;
                    }
                    break;
                case APOSTROPHE:
                    return this.consumeStringToken(APOSTROPHE);
                case LEFT_PARENTHESIS:
                    return LEFT_PARENTHESIS_TOKEN;
                case RIGHT_PARENTHESIS:
                    return RIGHT_PARENTHESIS_TOKEN;
                case ASTERISK:
                    if (this.peekCodePoint(0) === EQUALS_SIGN) {
                        this.consumeCodePoint();
                        return SUBSTRING_MATCH_TOKEN;
                    }
                    break;
                case PLUS_SIGN:
                    if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeNumericToken();
                    }
                    break;
                case COMMA:
                    return COMMA_TOKEN;
                case HYPHEN_MINUS:
                    var e1 = codePoint;
                    var e2 = this.peekCodePoint(0);
                    var e3 = this.peekCodePoint(1);
                    if (isNumberStart(e1, e2, e3)) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeNumericToken();
                    }
                    if (isIdentifierStart(e1, e2, e3)) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeIdentLikeToken();
                    }
                    if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                        this.consumeCodePoint();
                        this.consumeCodePoint();
                        return CDC_TOKEN;
                    }
                    break;
                case FULL_STOP:
                    if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeNumericToken();
                    }
                    break;
                case SOLIDUS:
                    if (this.peekCodePoint(0) === ASTERISK) {
                        this.consumeCodePoint();
                        while (true) {
                            var c = this.consumeCodePoint();
                            if (c === ASTERISK) {
                                c = this.consumeCodePoint();
                                if (c === SOLIDUS) {
                                    return this.consumeToken();
                                }
                            }
                            if (c === EOF) {
                                return this.consumeToken();
                            }
                        }
                    }
                    break;
                case COLON:
                    return COLON_TOKEN;
                case SEMICOLON:
                    return SEMICOLON_TOKEN;
                case LESS_THAN_SIGN:
                    if (this.peekCodePoint(0) === EXCLAMATION_MARK &&
                        this.peekCodePoint(1) === HYPHEN_MINUS &&
                        this.peekCodePoint(2) === HYPHEN_MINUS) {
                        this.consumeCodePoint();
                        this.consumeCodePoint();
                        return CDO_TOKEN;
                    }
                    break;
                case COMMERCIAL_AT:
                    var a1 = this.peekCodePoint(0);
                    var a2 = this.peekCodePoint(1);
                    var a3 = this.peekCodePoint(2);
                    if (isIdentifierStart(a1, a2, a3)) {
                        var value = this.consumeName();
                        return { type: 7 /* AT_KEYWORD_TOKEN */, value: value };
                    }
                    break;
                case LEFT_SQUARE_BRACKET:
                    return LEFT_SQUARE_BRACKET_TOKEN;
                case REVERSE_SOLIDUS:
                    if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeIdentLikeToken();
                    }
                    break;
                case RIGHT_SQUARE_BRACKET:
                    return RIGHT_SQUARE_BRACKET_TOKEN;
                case CIRCUMFLEX_ACCENT:
                    if (this.peekCodePoint(0) === EQUALS_SIGN) {
                        this.consumeCodePoint();
                        return PREFIX_MATCH_TOKEN;
                    }
                    break;
                case LEFT_CURLY_BRACKET:
                    return LEFT_CURLY_BRACKET_TOKEN;
                case RIGHT_CURLY_BRACKET:
                    return RIGHT_CURLY_BRACKET_TOKEN;
                case u:
                case U:
                    var u1 = this.peekCodePoint(0);
                    var u2 = this.peekCodePoint(1);
                    if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                        this.consumeCodePoint();
                        this.consumeUnicodeRangeToken();
                    }
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeIdentLikeToken();
                case VERTICAL_LINE:
                    if (this.peekCodePoint(0) === EQUALS_SIGN) {
                        this.consumeCodePoint();
                        return DASH_MATCH_TOKEN;
                    }
                    if (this.peekCodePoint(0) === VERTICAL_LINE) {
                        this.consumeCodePoint();
                        return COLUMN_TOKEN;
                    }
                    break;
                case TILDE:
                    if (this.peekCodePoint(0) === EQUALS_SIGN) {
                        this.consumeCodePoint();
                        return INCLUDE_MATCH_TOKEN;
                    }
                    break;
                case EOF:
                    return EOF_TOKEN;
            }
            if (isWhiteSpace(codePoint)) {
                this.consumeWhiteSpace();
                return WHITESPACE_TOKEN;
            }
            if (isDigit(codePoint)) {
                this.reconsumeCodePoint(codePoint);
                return this.consumeNumericToken();
            }
            if (isNameStartCodePoint(codePoint)) {
                this.reconsumeCodePoint(codePoint);
                return this.consumeIdentLikeToken();
            }
            return { type: 6 /* DELIM_TOKEN */, value: fromCodePoint$1(codePoint) };
        };
        Tokenizer.prototype.consumeCodePoint = function () {
            var value = this._value.shift();
            return typeof value === 'undefined' ? -1 : value;
        };
        Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
            this._value.unshift(codePoint);
        };
        Tokenizer.prototype.peekCodePoint = function (delta) {
            if (delta >= this._value.length) {
                return -1;
            }
            return this._value[delta];
        };
        Tokenizer.prototype.consumeUnicodeRangeToken = function () {
            var digits = [];
            var codePoint = this.consumeCodePoint();
            while (isHex(codePoint) && digits.length < 6) {
                digits.push(codePoint);
                codePoint = this.consumeCodePoint();
            }
            var questionMarks = false;
            while (codePoint === QUESTION_MARK && digits.length < 6) {
                digits.push(codePoint);
                codePoint = this.consumeCodePoint();
                questionMarks = true;
            }
            if (questionMarks) {
                var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? ZERO : digit); })), 16);
                var end = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? F : digit); })), 16);
                return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start_1, end: end };
            }
            var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
            if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
                this.consumeCodePoint();
                codePoint = this.consumeCodePoint();
                var endDigits = [];
                while (isHex(codePoint) && endDigits.length < 6) {
                    endDigits.push(codePoint);
                    codePoint = this.consumeCodePoint();
                }
                var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
                return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: end };
            }
            else {
                return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: start };
            }
        };
        Tokenizer.prototype.consumeIdentLikeToken = function () {
            var value = this.consumeName();
            if (value.toLowerCase() === 'url' && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                this.consumeCodePoint();
                return this.consumeUrlToken();
            }
            else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                this.consumeCodePoint();
                return { type: 19 /* FUNCTION_TOKEN */, value: value };
            }
            return { type: 20 /* IDENT_TOKEN */, value: value };
        };
        Tokenizer.prototype.consumeUrlToken = function () {
            var value = [];
            this.consumeWhiteSpace();
            if (this.peekCodePoint(0) === EOF) {
                return { type: 22 /* URL_TOKEN */, value: '' };
            }
            var next = this.peekCodePoint(0);
            if (next === APOSTROPHE || next === QUOTATION_MARK) {
                var stringToken = this.consumeStringToken(this.consumeCodePoint());
                if (stringToken.type === 0 /* STRING_TOKEN */) {
                    this.consumeWhiteSpace();
                    if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                        this.consumeCodePoint();
                        return { type: 22 /* URL_TOKEN */, value: stringToken.value };
                    }
                }
                this.consumeBadUrlRemnants();
                return BAD_URL_TOKEN;
            }
            while (true) {
                var codePoint = this.consumeCodePoint();
                if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
                    return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
                }
                else if (isWhiteSpace(codePoint)) {
                    this.consumeWhiteSpace();
                    if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                        this.consumeCodePoint();
                        return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
                    }
                    this.consumeBadUrlRemnants();
                    return BAD_URL_TOKEN;
                }
                else if (codePoint === QUOTATION_MARK ||
                    codePoint === APOSTROPHE ||
                    codePoint === LEFT_PARENTHESIS ||
                    isNonPrintableCodePoint(codePoint)) {
                    this.consumeBadUrlRemnants();
                    return BAD_URL_TOKEN;
                }
                else if (codePoint === REVERSE_SOLIDUS) {
                    if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                        value.push(this.consumeEscapedCodePoint());
                    }
                    else {
                        this.consumeBadUrlRemnants();
                        return BAD_URL_TOKEN;
                    }
                }
                else {
                    value.push(codePoint);
                }
            }
        };
        Tokenizer.prototype.consumeWhiteSpace = function () {
            while (isWhiteSpace(this.peekCodePoint(0))) {
                this.consumeCodePoint();
            }
        };
        Tokenizer.prototype.consumeBadUrlRemnants = function () {
            while (true) {
                var codePoint = this.consumeCodePoint();
                if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
                    return;
                }
                if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    this.consumeEscapedCodePoint();
                }
            }
        };
        Tokenizer.prototype.consumeStringSlice = function (count) {
            var SLICE_STACK_SIZE = 50000;
            var value = '';
            while (count > 0) {
                var amount = Math.min(SLICE_STACK_SIZE, count);
                value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
                count -= amount;
            }
            this._value.shift();
            return value;
        };
        Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
            var value = '';
            var i = 0;
            do {
                var codePoint = this._value[i];
                if (codePoint === EOF || codePoint === undefined || codePoint === endingCodePoint) {
                    value += this.consumeStringSlice(i);
                    return { type: 0 /* STRING_TOKEN */, value: value };
                }
                if (codePoint === LINE_FEED) {
                    this._value.splice(0, i);
                    return BAD_STRING_TOKEN;
                }
                if (codePoint === REVERSE_SOLIDUS) {
                    var next = this._value[i + 1];
                    if (next !== EOF && next !== undefined) {
                        if (next === LINE_FEED) {
                            value += this.consumeStringSlice(i);
                            i = -1;
                            this._value.shift();
                        }
                        else if (isValidEscape(codePoint, next)) {
                            value += this.consumeStringSlice(i);
                            value += fromCodePoint$1(this.consumeEscapedCodePoint());
                            i = -1;
                        }
                    }
                }
                i++;
            } while (true);
        };
        Tokenizer.prototype.consumeNumber = function () {
            var repr = [];
            var type = FLAG_INTEGER;
            var c1 = this.peekCodePoint(0);
            if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
                repr.push(this.consumeCodePoint());
            }
            while (isDigit(this.peekCodePoint(0))) {
                repr.push(this.consumeCodePoint());
            }
            c1 = this.peekCodePoint(0);
            var c2 = this.peekCodePoint(1);
            if (c1 === FULL_STOP && isDigit(c2)) {
                repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                type = FLAG_NUMBER;
                while (isDigit(this.peekCodePoint(0))) {
                    repr.push(this.consumeCodePoint());
                }
            }
            c1 = this.peekCodePoint(0);
            c2 = this.peekCodePoint(1);
            var c3 = this.peekCodePoint(2);
            if ((c1 === E || c1 === e) && (((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3)) || isDigit(c2))) {
                repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                type = FLAG_NUMBER;
                while (isDigit(this.peekCodePoint(0))) {
                    repr.push(this.consumeCodePoint());
                }
            }
            return [stringToNumber(repr), type];
        };
        Tokenizer.prototype.consumeNumericToken = function () {
            var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
            var c1 = this.peekCodePoint(0);
            var c2 = this.peekCodePoint(1);
            var c3 = this.peekCodePoint(2);
            if (isIdentifierStart(c1, c2, c3)) {
                var unit = this.consumeName();
                return { type: 15 /* DIMENSION_TOKEN */, number: number, flags: flags, unit: unit };
            }
            if (c1 === PERCENTAGE_SIGN) {
                this.consumeCodePoint();
                return { type: 16 /* PERCENTAGE_TOKEN */, number: number, flags: flags };
            }
            return { type: 17 /* NUMBER_TOKEN */, number: number, flags: flags };
        };
        Tokenizer.prototype.consumeEscapedCodePoint = function () {
            var codePoint = this.consumeCodePoint();
            if (isHex(codePoint)) {
                var hex = fromCodePoint$1(codePoint);
                while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                    hex += fromCodePoint$1(this.consumeCodePoint());
                }
                if (isWhiteSpace(this.peekCodePoint(0))) {
                    this.consumeCodePoint();
                }
                var hexCodePoint = parseInt(hex, 16);
                if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 0x10ffff) {
                    return REPLACEMENT_CHARACTER;
                }
                return hexCodePoint;
            }
            if (codePoint === EOF) {
                return REPLACEMENT_CHARACTER;
            }
            return codePoint;
        };
        Tokenizer.prototype.consumeName = function () {
            var result = '';
            while (true) {
                var codePoint = this.consumeCodePoint();
                if (isNameCodePoint(codePoint)) {
                    result += fromCodePoint$1(codePoint);
                }
                else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    result += fromCodePoint$1(this.consumeEscapedCodePoint());
                }
                else {
                    this.reconsumeCodePoint(codePoint);
                    return result;
                }
            }
        };
        return Tokenizer;
    }());

    var Parser = /** @class */ (function () {
        function Parser(tokens) {
            this._tokens = tokens;
        }
        Parser.create = function (value) {
            var tokenizer = new Tokenizer();
            tokenizer.write(value);
            return new Parser(tokenizer.read());
        };
        Parser.parseValue = function (value) {
            return Parser.create(value).parseComponentValue();
        };
        Parser.parseValues = function (value) {
            return Parser.create(value).parseComponentValues();
        };
        Parser.prototype.parseComponentValue = function () {
            var token = this.consumeToken();
            while (token.type === 31 /* WHITESPACE_TOKEN */) {
                token = this.consumeToken();
            }
            if (token.type === 32 /* EOF_TOKEN */) {
                throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
            }
            this.reconsumeToken(token);
            var value = this.consumeComponentValue();
            do {
                token = this.consumeToken();
            } while (token.type === 31 /* WHITESPACE_TOKEN */);
            if (token.type === 32 /* EOF_TOKEN */) {
                return value;
            }
            throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
        };
        Parser.prototype.parseComponentValues = function () {
            var values = [];
            while (true) {
                var value = this.consumeComponentValue();
                if (value.type === 32 /* EOF_TOKEN */) {
                    return values;
                }
                values.push(value);
                values.push();
            }
        };
        Parser.prototype.consumeComponentValue = function () {
            var token = this.consumeToken();
            switch (token.type) {
                case 11 /* LEFT_CURLY_BRACKET_TOKEN */:
                case 28 /* LEFT_SQUARE_BRACKET_TOKEN */:
                case 2 /* LEFT_PARENTHESIS_TOKEN */:
                    return this.consumeSimpleBlock(token.type);
                case 19 /* FUNCTION_TOKEN */:
                    return this.consumeFunction(token);
            }
            return token;
        };
        Parser.prototype.consumeSimpleBlock = function (type) {
            var block = { type: type, values: [] };
            var token = this.consumeToken();
            while (true) {
                if (token.type === 32 /* EOF_TOKEN */ || isEndingTokenFor(token, type)) {
                    return block;
                }
                this.reconsumeToken(token);
                block.values.push(this.consumeComponentValue());
                token = this.consumeToken();
            }
        };
        Parser.prototype.consumeFunction = function (functionToken) {
            var cssFunction = {
                name: functionToken.value,
                values: [],
                type: 18 /* FUNCTION */
            };
            while (true) {
                var token = this.consumeToken();
                if (token.type === 32 /* EOF_TOKEN */ || token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */) {
                    return cssFunction;
                }
                this.reconsumeToken(token);
                cssFunction.values.push(this.consumeComponentValue());
            }
        };
        Parser.prototype.consumeToken = function () {
            var token = this._tokens.shift();
            return typeof token === 'undefined' ? EOF_TOKEN : token;
        };
        Parser.prototype.reconsumeToken = function (token) {
            this._tokens.unshift(token);
        };
        return Parser;
    }());
    var isDimensionToken = function (token) { return token.type === 15 /* DIMENSION_TOKEN */; };
    var isNumberToken = function (token) { return token.type === 17 /* NUMBER_TOKEN */; };
    var isIdentToken = function (token) { return token.type === 20 /* IDENT_TOKEN */; };
    var isStringToken = function (token) { return token.type === 0 /* STRING_TOKEN */; };
    var isIdentWithValue = function (token, value) {
        return isIdentToken(token) && token.value === value;
    };
    var nonWhiteSpace = function (token) { return token.type !== 31 /* WHITESPACE_TOKEN */; };
    var nonFunctionArgSeparator = function (token) {
        return token.type !== 31 /* WHITESPACE_TOKEN */ && token.type !== 4 /* COMMA_TOKEN */;
    };
    var parseFunctionArgs = function (tokens) {
        var args = [];
        var arg = [];
        tokens.forEach(function (token) {
            if (token.type === 4 /* COMMA_TOKEN */) {
                if (arg.length === 0) {
                    throw new Error("Error parsing function args, zero tokens for arg");
                }
                args.push(arg);
                arg = [];
                return;
            }
            if (token.type !== 31 /* WHITESPACE_TOKEN */) {
                arg.push(token);
            }
        });
        if (arg.length) {
            args.push(arg);
        }
        return args;
    };
    var isEndingTokenFor = function (token, type) {
        if (type === 11 /* LEFT_CURLY_BRACKET_TOKEN */ && token.type === 12 /* RIGHT_CURLY_BRACKET_TOKEN */) {
            return true;
        }
        if (type === 28 /* LEFT_SQUARE_BRACKET_TOKEN */ && token.type === 29 /* RIGHT_SQUARE_BRACKET_TOKEN */) {
            return true;
        }
        return type === 2 /* LEFT_PARENTHESIS_TOKEN */ && token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */;
    };

    var isLength = function (token) {
        return token.type === 17 /* NUMBER_TOKEN */ || token.type === 15 /* DIMENSION_TOKEN */;
    };

    var isLengthPercentage = function (token) {
        return token.type === 16 /* PERCENTAGE_TOKEN */ || isLength(token);
    };
    var parseLengthPercentageTuple = function (tokens) {
        return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
    };
    var ZERO_LENGTH = {
        type: 17 /* NUMBER_TOKEN */,
        number: 0,
        flags: FLAG_INTEGER
    };
    var FIFTY_PERCENT = {
        type: 16 /* PERCENTAGE_TOKEN */,
        number: 50,
        flags: FLAG_INTEGER
    };
    var HUNDRED_PERCENT = {
        type: 16 /* PERCENTAGE_TOKEN */,
        number: 100,
        flags: FLAG_INTEGER
    };
    var getAbsoluteValueForTuple = function (tuple, width, height) {
        var x = tuple[0], y = tuple[1];
        return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== 'undefined' ? y : x, height)];
    };
    var getAbsoluteValue = function (token, parent) {
        if (token.type === 16 /* PERCENTAGE_TOKEN */) {
            return (token.number / 100) * parent;
        }
        if (isDimensionToken(token)) {
            switch (token.unit) {
                case 'rem':
                case 'em':
                    return 16 * token.number; // TODO use correct font-size
                case 'px':
                default:
                    return token.number;
            }
        }
        return token.number;
    };

    var DEG = 'deg';
    var GRAD = 'grad';
    var RAD = 'rad';
    var TURN = 'turn';
    var angle = {
        name: 'angle',
        parse: function (_context, value) {
            if (value.type === 15 /* DIMENSION_TOKEN */) {
                switch (value.unit) {
                    case DEG:
                        return (Math.PI * value.number) / 180;
                    case GRAD:
                        return (Math.PI / 200) * value.number;
                    case RAD:
                        return value.number;
                    case TURN:
                        return Math.PI * 2 * value.number;
                }
            }
            throw new Error("Unsupported angle type");
        }
    };
    var isAngle = function (value) {
        if (value.type === 15 /* DIMENSION_TOKEN */) {
            if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
                return true;
            }
        }
        return false;
    };
    var parseNamedSide = function (tokens) {
        var sideOrCorner = tokens
            .filter(isIdentToken)
            .map(function (ident) { return ident.value; })
            .join(' ');
        switch (sideOrCorner) {
            case 'to bottom right':
            case 'to right bottom':
            case 'left top':
            case 'top left':
                return [ZERO_LENGTH, ZERO_LENGTH];
            case 'to top':
            case 'bottom':
                return deg(0);
            case 'to bottom left':
            case 'to left bottom':
            case 'right top':
            case 'top right':
                return [ZERO_LENGTH, HUNDRED_PERCENT];
            case 'to right':
            case 'left':
                return deg(90);
            case 'to top left':
            case 'to left top':
            case 'right bottom':
            case 'bottom right':
                return [HUNDRED_PERCENT, HUNDRED_PERCENT];
            case 'to bottom':
            case 'top':
                return deg(180);
            case 'to top right':
            case 'to right top':
            case 'left bottom':
            case 'bottom left':
                return [HUNDRED_PERCENT, ZERO_LENGTH];
            case 'to left':
            case 'right':
                return deg(270);
        }
        return 0;
    };
    var deg = function (deg) { return (Math.PI * deg) / 180; };

    var color$1 = {
        name: 'color',
        parse: function (context, value) {
            if (value.type === 18 /* FUNCTION */) {
                var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
                if (typeof colorFunction === 'undefined') {
                    throw new Error("Attempting to parse an unsupported color function \"" + value.name + "\"");
                }
                return colorFunction(context, value.values);
            }
            if (value.type === 5 /* HASH_TOKEN */) {
                if (value.value.length === 3) {
                    var r = value.value.substring(0, 1);
                    var g = value.value.substring(1, 2);
                    var b = value.value.substring(2, 3);
                    return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
                }
                if (value.value.length === 4) {
                    var r = value.value.substring(0, 1);
                    var g = value.value.substring(1, 2);
                    var b = value.value.substring(2, 3);
                    var a = value.value.substring(3, 4);
                    return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255);
                }
                if (value.value.length === 6) {
                    var r = value.value.substring(0, 2);
                    var g = value.value.substring(2, 4);
                    var b = value.value.substring(4, 6);
                    return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
                }
                if (value.value.length === 8) {
                    var r = value.value.substring(0, 2);
                    var g = value.value.substring(2, 4);
                    var b = value.value.substring(4, 6);
                    var a = value.value.substring(6, 8);
                    return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
                }
            }
            if (value.type === 20 /* IDENT_TOKEN */) {
                var namedColor = COLORS[value.value.toUpperCase()];
                if (typeof namedColor !== 'undefined') {
                    return namedColor;
                }
            }
            return COLORS.TRANSPARENT;
        }
    };
    var isTransparent = function (color) { return (0xff & color) === 0; };
    var asString = function (color) {
        var alpha = 0xff & color;
        var blue = 0xff & (color >> 8);
        var green = 0xff & (color >> 16);
        var red = 0xff & (color >> 24);
        return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
    };
    var pack = function (r, g, b, a) {
        return ((r << 24) | (g << 16) | (b << 8) | (Math.round(a * 255) << 0)) >>> 0;
    };
    var getTokenColorValue = function (token, i) {
        if (token.type === 17 /* NUMBER_TOKEN */) {
            return token.number;
        }
        if (token.type === 16 /* PERCENTAGE_TOKEN */) {
            var max = i === 3 ? 1 : 255;
            return i === 3 ? (token.number / 100) * max : Math.round((token.number / 100) * max);
        }
        return 0;
    };
    var rgb = function (_context, args) {
        var tokens = args.filter(nonFunctionArgSeparator);
        if (tokens.length === 3) {
            var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
            return pack(r, g, b, 1);
        }
        if (tokens.length === 4) {
            var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a = _b[3];
            return pack(r, g, b, a);
        }
        return 0;
    };
    function hue2rgb(t1, t2, hue) {
        if (hue < 0) {
            hue += 1;
        }
        if (hue >= 1) {
            hue -= 1;
        }
        if (hue < 1 / 6) {
            return (t2 - t1) * hue * 6 + t1;
        }
        else if (hue < 1 / 2) {
            return t2;
        }
        else if (hue < 2 / 3) {
            return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
        }
        else {
            return t1;
        }
    }
    var hsl = function (context, args) {
        var tokens = args.filter(nonFunctionArgSeparator);
        var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
        var h = (hue.type === 17 /* NUMBER_TOKEN */ ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
        var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
        var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
        var a = typeof alpha !== 'undefined' && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
        if (s === 0) {
            return pack(l * 255, l * 255, l * 255, 1);
        }
        var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var t1 = l * 2 - t2;
        var r = hue2rgb(t1, t2, h + 1 / 3);
        var g = hue2rgb(t1, t2, h);
        var b = hue2rgb(t1, t2, h - 1 / 3);
        return pack(r * 255, g * 255, b * 255, a);
    };
    var SUPPORTED_COLOR_FUNCTIONS = {
        hsl: hsl,
        hsla: hsl,
        rgb: rgb,
        rgba: rgb
    };
    var parseColor = function (context, value) {
        return color$1.parse(context, Parser.create(value).parseComponentValue());
    };
    var COLORS = {
        ALICEBLUE: 0xf0f8ffff,
        ANTIQUEWHITE: 0xfaebd7ff,
        AQUA: 0x00ffffff,
        AQUAMARINE: 0x7fffd4ff,
        AZURE: 0xf0ffffff,
        BEIGE: 0xf5f5dcff,
        BISQUE: 0xffe4c4ff,
        BLACK: 0x000000ff,
        BLANCHEDALMOND: 0xffebcdff,
        BLUE: 0x0000ffff,
        BLUEVIOLET: 0x8a2be2ff,
        BROWN: 0xa52a2aff,
        BURLYWOOD: 0xdeb887ff,
        CADETBLUE: 0x5f9ea0ff,
        CHARTREUSE: 0x7fff00ff,
        CHOCOLATE: 0xd2691eff,
        CORAL: 0xff7f50ff,
        CORNFLOWERBLUE: 0x6495edff,
        CORNSILK: 0xfff8dcff,
        CRIMSON: 0xdc143cff,
        CYAN: 0x00ffffff,
        DARKBLUE: 0x00008bff,
        DARKCYAN: 0x008b8bff,
        DARKGOLDENROD: 0xb886bbff,
        DARKGRAY: 0xa9a9a9ff,
        DARKGREEN: 0x006400ff,
        DARKGREY: 0xa9a9a9ff,
        DARKKHAKI: 0xbdb76bff,
        DARKMAGENTA: 0x8b008bff,
        DARKOLIVEGREEN: 0x556b2fff,
        DARKORANGE: 0xff8c00ff,
        DARKORCHID: 0x9932ccff,
        DARKRED: 0x8b0000ff,
        DARKSALMON: 0xe9967aff,
        DARKSEAGREEN: 0x8fbc8fff,
        DARKSLATEBLUE: 0x483d8bff,
        DARKSLATEGRAY: 0x2f4f4fff,
        DARKSLATEGREY: 0x2f4f4fff,
        DARKTURQUOISE: 0x00ced1ff,
        DARKVIOLET: 0x9400d3ff,
        DEEPPINK: 0xff1493ff,
        DEEPSKYBLUE: 0x00bfffff,
        DIMGRAY: 0x696969ff,
        DIMGREY: 0x696969ff,
        DODGERBLUE: 0x1e90ffff,
        FIREBRICK: 0xb22222ff,
        FLORALWHITE: 0xfffaf0ff,
        FORESTGREEN: 0x228b22ff,
        FUCHSIA: 0xff00ffff,
        GAINSBORO: 0xdcdcdcff,
        GHOSTWHITE: 0xf8f8ffff,
        GOLD: 0xffd700ff,
        GOLDENROD: 0xdaa520ff,
        GRAY: 0x808080ff,
        GREEN: 0x008000ff,
        GREENYELLOW: 0xadff2fff,
        GREY: 0x808080ff,
        HONEYDEW: 0xf0fff0ff,
        HOTPINK: 0xff69b4ff,
        INDIANRED: 0xcd5c5cff,
        INDIGO: 0x4b0082ff,
        IVORY: 0xfffff0ff,
        KHAKI: 0xf0e68cff,
        LAVENDER: 0xe6e6faff,
        LAVENDERBLUSH: 0xfff0f5ff,
        LAWNGREEN: 0x7cfc00ff,
        LEMONCHIFFON: 0xfffacdff,
        LIGHTBLUE: 0xadd8e6ff,
        LIGHTCORAL: 0xf08080ff,
        LIGHTCYAN: 0xe0ffffff,
        LIGHTGOLDENRODYELLOW: 0xfafad2ff,
        LIGHTGRAY: 0xd3d3d3ff,
        LIGHTGREEN: 0x90ee90ff,
        LIGHTGREY: 0xd3d3d3ff,
        LIGHTPINK: 0xffb6c1ff,
        LIGHTSALMON: 0xffa07aff,
        LIGHTSEAGREEN: 0x20b2aaff,
        LIGHTSKYBLUE: 0x87cefaff,
        LIGHTSLATEGRAY: 0x778899ff,
        LIGHTSLATEGREY: 0x778899ff,
        LIGHTSTEELBLUE: 0xb0c4deff,
        LIGHTYELLOW: 0xffffe0ff,
        LIME: 0x00ff00ff,
        LIMEGREEN: 0x32cd32ff,
        LINEN: 0xfaf0e6ff,
        MAGENTA: 0xff00ffff,
        MAROON: 0x800000ff,
        MEDIUMAQUAMARINE: 0x66cdaaff,
        MEDIUMBLUE: 0x0000cdff,
        MEDIUMORCHID: 0xba55d3ff,
        MEDIUMPURPLE: 0x9370dbff,
        MEDIUMSEAGREEN: 0x3cb371ff,
        MEDIUMSLATEBLUE: 0x7b68eeff,
        MEDIUMSPRINGGREEN: 0x00fa9aff,
        MEDIUMTURQUOISE: 0x48d1ccff,
        MEDIUMVIOLETRED: 0xc71585ff,
        MIDNIGHTBLUE: 0x191970ff,
        MINTCREAM: 0xf5fffaff,
        MISTYROSE: 0xffe4e1ff,
        MOCCASIN: 0xffe4b5ff,
        NAVAJOWHITE: 0xffdeadff,
        NAVY: 0x000080ff,
        OLDLACE: 0xfdf5e6ff,
        OLIVE: 0x808000ff,
        OLIVEDRAB: 0x6b8e23ff,
        ORANGE: 0xffa500ff,
        ORANGERED: 0xff4500ff,
        ORCHID: 0xda70d6ff,
        PALEGOLDENROD: 0xeee8aaff,
        PALEGREEN: 0x98fb98ff,
        PALETURQUOISE: 0xafeeeeff,
        PALEVIOLETRED: 0xdb7093ff,
        PAPAYAWHIP: 0xffefd5ff,
        PEACHPUFF: 0xffdab9ff,
        PERU: 0xcd853fff,
        PINK: 0xffc0cbff,
        PLUM: 0xdda0ddff,
        POWDERBLUE: 0xb0e0e6ff,
        PURPLE: 0x800080ff,
        REBECCAPURPLE: 0x663399ff,
        RED: 0xff0000ff,
        ROSYBROWN: 0xbc8f8fff,
        ROYALBLUE: 0x4169e1ff,
        SADDLEBROWN: 0x8b4513ff,
        SALMON: 0xfa8072ff,
        SANDYBROWN: 0xf4a460ff,
        SEAGREEN: 0x2e8b57ff,
        SEASHELL: 0xfff5eeff,
        SIENNA: 0xa0522dff,
        SILVER: 0xc0c0c0ff,
        SKYBLUE: 0x87ceebff,
        SLATEBLUE: 0x6a5acdff,
        SLATEGRAY: 0x708090ff,
        SLATEGREY: 0x708090ff,
        SNOW: 0xfffafaff,
        SPRINGGREEN: 0x00ff7fff,
        STEELBLUE: 0x4682b4ff,
        TAN: 0xd2b48cff,
        TEAL: 0x008080ff,
        THISTLE: 0xd8bfd8ff,
        TOMATO: 0xff6347ff,
        TRANSPARENT: 0x00000000,
        TURQUOISE: 0x40e0d0ff,
        VIOLET: 0xee82eeff,
        WHEAT: 0xf5deb3ff,
        WHITE: 0xffffffff,
        WHITESMOKE: 0xf5f5f5ff,
        YELLOW: 0xffff00ff,
        YELLOWGREEN: 0x9acd32ff
    };

    var backgroundClip = {
        name: 'background-clip',
        initialValue: 'border-box',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return tokens.map(function (token) {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case 'padding-box':
                            return 1 /* PADDING_BOX */;
                        case 'content-box':
                            return 2 /* CONTENT_BOX */;
                    }
                }
                return 0 /* BORDER_BOX */;
            });
        }
    };

    var backgroundColor = {
        name: "background-color",
        initialValue: 'transparent',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'color'
    };

    var parseColorStop = function (context, args) {
        var color = color$1.parse(context, args[0]);
        var stop = args[1];
        return stop && isLengthPercentage(stop) ? { color: color, stop: stop } : { color: color, stop: null };
    };
    var processColorStops = function (stops, lineLength) {
        var first = stops[0];
        var last = stops[stops.length - 1];
        if (first.stop === null) {
            first.stop = ZERO_LENGTH;
        }
        if (last.stop === null) {
            last.stop = HUNDRED_PERCENT;
        }
        var processStops = [];
        var previous = 0;
        for (var i = 0; i < stops.length; i++) {
            var stop_1 = stops[i].stop;
            if (stop_1 !== null) {
                var absoluteValue = getAbsoluteValue(stop_1, lineLength);
                if (absoluteValue > previous) {
                    processStops.push(absoluteValue);
                }
                else {
                    processStops.push(previous);
                }
                previous = absoluteValue;
            }
            else {
                processStops.push(null);
            }
        }
        var gapBegin = null;
        for (var i = 0; i < processStops.length; i++) {
            var stop_2 = processStops[i];
            if (stop_2 === null) {
                if (gapBegin === null) {
                    gapBegin = i;
                }
            }
            else if (gapBegin !== null) {
                var gapLength = i - gapBegin;
                var beforeGap = processStops[gapBegin - 1];
                var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
                for (var g = 1; g <= gapLength; g++) {
                    processStops[gapBegin + g - 1] = gapValue * g;
                }
                gapBegin = null;
            }
        }
        return stops.map(function (_a, i) {
            var color = _a.color;
            return { color: color, stop: Math.max(Math.min(1, processStops[i] / lineLength), 0) };
        });
    };
    var getAngleFromCorner = function (corner, width, height) {
        var centerX = width / 2;
        var centerY = height / 2;
        var x = getAbsoluteValue(corner[0], width) - centerX;
        var y = centerY - getAbsoluteValue(corner[1], height);
        return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
    };
    var calculateGradientDirection = function (angle, width, height) {
        var radian = typeof angle === 'number' ? angle : getAngleFromCorner(angle, width, height);
        var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        var halfLineLength = lineLength / 2;
        var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
        var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
        return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
    };
    var distance = function (a, b) { return Math.sqrt(a * a + b * b); };
    var findCorner = function (width, height, x, y, closest) {
        var corners = [
            [0, 0],
            [0, height],
            [width, 0],
            [width, height]
        ];
        return corners.reduce(function (stat, corner) {
            var cx = corner[0], cy = corner[1];
            var d = distance(x - cx, y - cy);
            if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
                return {
                    optimumCorner: corner,
                    optimumDistance: d
                };
            }
            return stat;
        }, {
            optimumDistance: closest ? Infinity : -Infinity,
            optimumCorner: null
        }).optimumCorner;
    };
    var calculateRadius = function (gradient, x, y, width, height) {
        var rx = 0;
        var ry = 0;
        switch (gradient.size) {
            case 0 /* CLOSEST_SIDE */:
                // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
                // If the shape is an ellipse, it exactly meets the closest side in each dimension.
                if (gradient.shape === 0 /* CIRCLE */) {
                    rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
                }
                else if (gradient.shape === 1 /* ELLIPSE */) {
                    rx = Math.min(Math.abs(x), Math.abs(x - width));
                    ry = Math.min(Math.abs(y), Math.abs(y - height));
                }
                break;
            case 2 /* CLOSEST_CORNER */:
                // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
                // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
                if (gradient.shape === 0 /* CIRCLE */) {
                    rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
                }
                else if (gradient.shape === 1 /* ELLIPSE */) {
                    // Compute the ratio ry/rx (which is to be the same as for "closest-side")
                    var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                    var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
                    rx = distance(cx - x, (cy - y) / c);
                    ry = c * rx;
                }
                break;
            case 1 /* FARTHEST_SIDE */:
                // Same as closest-side, except the ending shape is sized based on the farthest side(s)
                if (gradient.shape === 0 /* CIRCLE */) {
                    rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
                }
                else if (gradient.shape === 1 /* ELLIPSE */) {
                    rx = Math.max(Math.abs(x), Math.abs(x - width));
                    ry = Math.max(Math.abs(y), Math.abs(y - height));
                }
                break;
            case 3 /* FARTHEST_CORNER */:
                // Same as closest-corner, except the ending shape is sized based on the farthest corner.
                // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
                if (gradient.shape === 0 /* CIRCLE */) {
                    rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
                }
                else if (gradient.shape === 1 /* ELLIPSE */) {
                    // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
                    var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                    var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
                    rx = distance(cx - x, (cy - y) / c);
                    ry = c * rx;
                }
                break;
        }
        if (Array.isArray(gradient.size)) {
            rx = getAbsoluteValue(gradient.size[0], width);
            ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
        }
        return [rx, ry];
    };

    var linearGradient = function (context, tokens) {
        var angle$1 = deg(180);
        var stops = [];
        parseFunctionArgs(tokens).forEach(function (arg, i) {
            if (i === 0) {
                var firstToken = arg[0];
                if (firstToken.type === 20 /* IDENT_TOKEN */ && firstToken.value === 'to') {
                    angle$1 = parseNamedSide(arg);
                    return;
                }
                else if (isAngle(firstToken)) {
                    angle$1 = angle.parse(context, firstToken);
                    return;
                }
            }
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
        });
        return { angle: angle$1, stops: stops, type: 1 /* LINEAR_GRADIENT */ };
    };

    var prefixLinearGradient = function (context, tokens) {
        var angle$1 = deg(180);
        var stops = [];
        parseFunctionArgs(tokens).forEach(function (arg, i) {
            if (i === 0) {
                var firstToken = arg[0];
                if (firstToken.type === 20 /* IDENT_TOKEN */ &&
                    ['top', 'left', 'right', 'bottom'].indexOf(firstToken.value) !== -1) {
                    angle$1 = parseNamedSide(arg);
                    return;
                }
                else if (isAngle(firstToken)) {
                    angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
                    return;
                }
            }
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
        });
        return {
            angle: angle$1,
            stops: stops,
            type: 1 /* LINEAR_GRADIENT */
        };
    };

    var webkitGradient = function (context, tokens) {
        var angle = deg(180);
        var stops = [];
        var type = 1 /* LINEAR_GRADIENT */;
        var shape = 0 /* CIRCLE */;
        var size = 3 /* FARTHEST_CORNER */;
        var position = [];
        parseFunctionArgs(tokens).forEach(function (arg, i) {
            var firstToken = arg[0];
            if (i === 0) {
                if (isIdentToken(firstToken) && firstToken.value === 'linear') {
                    type = 1 /* LINEAR_GRADIENT */;
                    return;
                }
                else if (isIdentToken(firstToken) && firstToken.value === 'radial') {
                    type = 2 /* RADIAL_GRADIENT */;
                    return;
                }
            }
            if (firstToken.type === 18 /* FUNCTION */) {
                if (firstToken.name === 'from') {
                    var color = color$1.parse(context, firstToken.values[0]);
                    stops.push({ stop: ZERO_LENGTH, color: color });
                }
                else if (firstToken.name === 'to') {
                    var color = color$1.parse(context, firstToken.values[0]);
                    stops.push({ stop: HUNDRED_PERCENT, color: color });
                }
                else if (firstToken.name === 'color-stop') {
                    var values = firstToken.values.filter(nonFunctionArgSeparator);
                    if (values.length === 2) {
                        var color = color$1.parse(context, values[1]);
                        var stop_1 = values[0];
                        if (isNumberToken(stop_1)) {
                            stops.push({
                                stop: { type: 16 /* PERCENTAGE_TOKEN */, number: stop_1.number * 100, flags: stop_1.flags },
                                color: color
                            });
                        }
                    }
                }
            }
        });
        return type === 1 /* LINEAR_GRADIENT */
            ? {
                angle: (angle + deg(180)) % deg(360),
                stops: stops,
                type: type
            }
            : { size: size, shape: shape, stops: stops, position: position, type: type };
    };

    var CLOSEST_SIDE = 'closest-side';
    var FARTHEST_SIDE = 'farthest-side';
    var CLOSEST_CORNER = 'closest-corner';
    var FARTHEST_CORNER = 'farthest-corner';
    var CIRCLE = 'circle';
    var ELLIPSE = 'ellipse';
    var COVER = 'cover';
    var CONTAIN = 'contain';
    var radialGradient = function (context, tokens) {
        var shape = 0 /* CIRCLE */;
        var size = 3 /* FARTHEST_CORNER */;
        var stops = [];
        var position = [];
        parseFunctionArgs(tokens).forEach(function (arg, i) {
            var isColorStop = true;
            if (i === 0) {
                var isAtPosition_1 = false;
                isColorStop = arg.reduce(function (acc, token) {
                    if (isAtPosition_1) {
                        if (isIdentToken(token)) {
                            switch (token.value) {
                                case 'center':
                                    position.push(FIFTY_PERCENT);
                                    return acc;
                                case 'top':
                                case 'left':
                                    position.push(ZERO_LENGTH);
                                    return acc;
                                case 'right':
                                case 'bottom':
                                    position.push(HUNDRED_PERCENT);
                                    return acc;
                            }
                        }
                        else if (isLengthPercentage(token) || isLength(token)) {
                            position.push(token);
                        }
                    }
                    else if (isIdentToken(token)) {
                        switch (token.value) {
                            case CIRCLE:
                                shape = 0 /* CIRCLE */;
                                return false;
                            case ELLIPSE:
                                shape = 1 /* ELLIPSE */;
                                return false;
                            case 'at':
                                isAtPosition_1 = true;
                                return false;
                            case CLOSEST_SIDE:
                                size = 0 /* CLOSEST_SIDE */;
                                return false;
                            case COVER:
                            case FARTHEST_SIDE:
                                size = 1 /* FARTHEST_SIDE */;
                                return false;
                            case CONTAIN:
                            case CLOSEST_CORNER:
                                size = 2 /* CLOSEST_CORNER */;
                                return false;
                            case FARTHEST_CORNER:
                                size = 3 /* FARTHEST_CORNER */;
                                return false;
                        }
                    }
                    else if (isLength(token) || isLengthPercentage(token)) {
                        if (!Array.isArray(size)) {
                            size = [];
                        }
                        size.push(token);
                        return false;
                    }
                    return acc;
                }, isColorStop);
            }
            if (isColorStop) {
                var colorStop = parseColorStop(context, arg);
                stops.push(colorStop);
            }
        });
        return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
    };

    var prefixRadialGradient = function (context, tokens) {
        var shape = 0 /* CIRCLE */;
        var size = 3 /* FARTHEST_CORNER */;
        var stops = [];
        var position = [];
        parseFunctionArgs(tokens).forEach(function (arg, i) {
            var isColorStop = true;
            if (i === 0) {
                isColorStop = arg.reduce(function (acc, token) {
                    if (isIdentToken(token)) {
                        switch (token.value) {
                            case 'center':
                                position.push(FIFTY_PERCENT);
                                return false;
                            case 'top':
                            case 'left':
                                position.push(ZERO_LENGTH);
                                return false;
                            case 'right':
                            case 'bottom':
                                position.push(HUNDRED_PERCENT);
                                return false;
                        }
                    }
                    else if (isLengthPercentage(token) || isLength(token)) {
                        position.push(token);
                        return false;
                    }
                    return acc;
                }, isColorStop);
            }
            else if (i === 1) {
                isColorStop = arg.reduce(function (acc, token) {
                    if (isIdentToken(token)) {
                        switch (token.value) {
                            case CIRCLE:
                                shape = 0 /* CIRCLE */;
                                return false;
                            case ELLIPSE:
                                shape = 1 /* ELLIPSE */;
                                return false;
                            case CONTAIN:
                            case CLOSEST_SIDE:
                                size = 0 /* CLOSEST_SIDE */;
                                return false;
                            case FARTHEST_SIDE:
                                size = 1 /* FARTHEST_SIDE */;
                                return false;
                            case CLOSEST_CORNER:
                                size = 2 /* CLOSEST_CORNER */;
                                return false;
                            case COVER:
                            case FARTHEST_CORNER:
                                size = 3 /* FARTHEST_CORNER */;
                                return false;
                        }
                    }
                    else if (isLength(token) || isLengthPercentage(token)) {
                        if (!Array.isArray(size)) {
                            size = [];
                        }
                        size.push(token);
                        return false;
                    }
                    return acc;
                }, isColorStop);
            }
            if (isColorStop) {
                var colorStop = parseColorStop(context, arg);
                stops.push(colorStop);
            }
        });
        return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
    };

    var isLinearGradient = function (background) {
        return background.type === 1 /* LINEAR_GRADIENT */;
    };
    var isRadialGradient = function (background) {
        return background.type === 2 /* RADIAL_GRADIENT */;
    };
    var image = {
        name: 'image',
        parse: function (context, value) {
            if (value.type === 22 /* URL_TOKEN */) {
                var image_1 = { url: value.value, type: 0 /* URL */ };
                context.cache.addImage(value.value);
                return image_1;
            }
            if (value.type === 18 /* FUNCTION */) {
                var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
                if (typeof imageFunction === 'undefined') {
                    throw new Error("Attempting to parse an unsupported image function \"" + value.name + "\"");
                }
                return imageFunction(context, value.values);
            }
            throw new Error("Unsupported image type " + value.type);
        }
    };
    function isSupportedImage(value) {
        return (!(value.type === 20 /* IDENT_TOKEN */ && value.value === 'none') &&
            (value.type !== 18 /* FUNCTION */ || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]));
    }
    var SUPPORTED_IMAGE_FUNCTIONS = {
        'linear-gradient': linearGradient,
        '-moz-linear-gradient': prefixLinearGradient,
        '-ms-linear-gradient': prefixLinearGradient,
        '-o-linear-gradient': prefixLinearGradient,
        '-webkit-linear-gradient': prefixLinearGradient,
        'radial-gradient': radialGradient,
        '-moz-radial-gradient': prefixRadialGradient,
        '-ms-radial-gradient': prefixRadialGradient,
        '-o-radial-gradient': prefixRadialGradient,
        '-webkit-radial-gradient': prefixRadialGradient,
        '-webkit-gradient': webkitGradient
    };

    var backgroundImage = {
        name: 'background-image',
        initialValue: 'none',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (context, tokens) {
            if (tokens.length === 0) {
                return [];
            }
            var first = tokens[0];
            if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
                return [];
            }
            return tokens
                .filter(function (value) { return nonFunctionArgSeparator(value) && isSupportedImage(value); })
                .map(function (value) { return image.parse(context, value); });
        }
    };

    var backgroundOrigin = {
        name: 'background-origin',
        initialValue: 'border-box',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return tokens.map(function (token) {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case 'padding-box':
                            return 1 /* PADDING_BOX */;
                        case 'content-box':
                            return 2 /* CONTENT_BOX */;
                    }
                }
                return 0 /* BORDER_BOX */;
            });
        }
    };

    var backgroundPosition = {
        name: 'background-position',
        initialValue: '0% 0%',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (_context, tokens) {
            return parseFunctionArgs(tokens)
                .map(function (values) { return values.filter(isLengthPercentage); })
                .map(parseLengthPercentageTuple);
        }
    };

    var backgroundRepeat = {
        name: 'background-repeat',
        initialValue: 'repeat',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return parseFunctionArgs(tokens)
                .map(function (values) {
                return values
                    .filter(isIdentToken)
                    .map(function (token) { return token.value; })
                    .join(' ');
            })
                .map(parseBackgroundRepeat);
        }
    };
    var parseBackgroundRepeat = function (value) {
        switch (value) {
            case 'no-repeat':
                return 1 /* NO_REPEAT */;
            case 'repeat-x':
            case 'repeat no-repeat':
                return 2 /* REPEAT_X */;
            case 'repeat-y':
            case 'no-repeat repeat':
                return 3 /* REPEAT_Y */;
            case 'repeat':
            default:
                return 0 /* REPEAT */;
        }
    };

    var BACKGROUND_SIZE;
    (function (BACKGROUND_SIZE) {
        BACKGROUND_SIZE["AUTO"] = "auto";
        BACKGROUND_SIZE["CONTAIN"] = "contain";
        BACKGROUND_SIZE["COVER"] = "cover";
    })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
    var backgroundSize = {
        name: 'background-size',
        initialValue: '0',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return parseFunctionArgs(tokens).map(function (values) { return values.filter(isBackgroundSizeInfoToken); });
        }
    };
    var isBackgroundSizeInfoToken = function (value) {
        return isIdentToken(value) || isLengthPercentage(value);
    };

    var borderColorForSide = function (side) { return ({
        name: "border-" + side + "-color",
        initialValue: 'transparent',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'color'
    }); };
    var borderTopColor = borderColorForSide('top');
    var borderRightColor = borderColorForSide('right');
    var borderBottomColor = borderColorForSide('bottom');
    var borderLeftColor = borderColorForSide('left');

    var borderRadiusForSide = function (side) { return ({
        name: "border-radius-" + side,
        initialValue: '0 0',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
        }
    }); };
    var borderTopLeftRadius = borderRadiusForSide('top-left');
    var borderTopRightRadius = borderRadiusForSide('top-right');
    var borderBottomRightRadius = borderRadiusForSide('bottom-right');
    var borderBottomLeftRadius = borderRadiusForSide('bottom-left');

    var borderStyleForSide = function (side) { return ({
        name: "border-" + side + "-style",
        initialValue: 'solid',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, style) {
            switch (style) {
                case 'none':
                    return 0 /* NONE */;
                case 'dashed':
                    return 2 /* DASHED */;
                case 'dotted':
                    return 3 /* DOTTED */;
                case 'double':
                    return 4 /* DOUBLE */;
            }
            return 1 /* SOLID */;
        }
    }); };
    var borderTopStyle = borderStyleForSide('top');
    var borderRightStyle = borderStyleForSide('right');
    var borderBottomStyle = borderStyleForSide('bottom');
    var borderLeftStyle = borderStyleForSide('left');

    var borderWidthForSide = function (side) { return ({
        name: "border-" + side + "-width",
        initialValue: '0',
        type: 0 /* VALUE */,
        prefix: false,
        parse: function (_context, token) {
            if (isDimensionToken(token)) {
                return token.number;
            }
            return 0;
        }
    }); };
    var borderTopWidth = borderWidthForSide('top');
    var borderRightWidth = borderWidthForSide('right');
    var borderBottomWidth = borderWidthForSide('bottom');
    var borderLeftWidth = borderWidthForSide('left');

    var color = {
        name: "color",
        initialValue: 'transparent',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'color'
    };

    var direction = {
        name: 'direction',
        initialValue: 'ltr',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, direction) {
            switch (direction) {
                case 'rtl':
                    return 1 /* RTL */;
                case 'ltr':
                default:
                    return 0 /* LTR */;
            }
        }
    };

    var display = {
        name: 'display',
        initialValue: 'inline-block',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return tokens.filter(isIdentToken).reduce(function (bit, token) {
                return bit | parseDisplayValue(token.value);
            }, 0 /* NONE */);
        }
    };
    var parseDisplayValue = function (display) {
        switch (display) {
            case 'block':
            case '-webkit-box':
                return 2 /* BLOCK */;
            case 'inline':
                return 4 /* INLINE */;
            case 'run-in':
                return 8 /* RUN_IN */;
            case 'flow':
                return 16 /* FLOW */;
            case 'flow-root':
                return 32 /* FLOW_ROOT */;
            case 'table':
                return 64 /* TABLE */;
            case 'flex':
            case '-webkit-flex':
                return 128 /* FLEX */;
            case 'grid':
            case '-ms-grid':
                return 256 /* GRID */;
            case 'ruby':
                return 512 /* RUBY */;
            case 'subgrid':
                return 1024 /* SUBGRID */;
            case 'list-item':
                return 2048 /* LIST_ITEM */;
            case 'table-row-group':
                return 4096 /* TABLE_ROW_GROUP */;
            case 'table-header-group':
                return 8192 /* TABLE_HEADER_GROUP */;
            case 'table-footer-group':
                return 16384 /* TABLE_FOOTER_GROUP */;
            case 'table-row':
                return 32768 /* TABLE_ROW */;
            case 'table-cell':
                return 65536 /* TABLE_CELL */;
            case 'table-column-group':
                return 131072 /* TABLE_COLUMN_GROUP */;
            case 'table-column':
                return 262144 /* TABLE_COLUMN */;
            case 'table-caption':
                return 524288 /* TABLE_CAPTION */;
            case 'ruby-base':
                return 1048576 /* RUBY_BASE */;
            case 'ruby-text':
                return 2097152 /* RUBY_TEXT */;
            case 'ruby-base-container':
                return 4194304 /* RUBY_BASE_CONTAINER */;
            case 'ruby-text-container':
                return 8388608 /* RUBY_TEXT_CONTAINER */;
            case 'contents':
                return 16777216 /* CONTENTS */;
            case 'inline-block':
                return 33554432 /* INLINE_BLOCK */;
            case 'inline-list-item':
                return 67108864 /* INLINE_LIST_ITEM */;
            case 'inline-table':
                return 134217728 /* INLINE_TABLE */;
            case 'inline-flex':
                return 268435456 /* INLINE_FLEX */;
            case 'inline-grid':
                return 536870912 /* INLINE_GRID */;
        }
        return 0 /* NONE */;
    };

    var float = {
        name: 'float',
        initialValue: 'none',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, float) {
            switch (float) {
                case 'left':
                    return 1 /* LEFT */;
                case 'right':
                    return 2 /* RIGHT */;
                case 'inline-start':
                    return 3 /* INLINE_START */;
                case 'inline-end':
                    return 4 /* INLINE_END */;
            }
            return 0 /* NONE */;
        }
    };

    var letterSpacing = {
        name: 'letter-spacing',
        initialValue: '0',
        prefix: false,
        type: 0 /* VALUE */,
        parse: function (_context, token) {
            if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'normal') {
                return 0;
            }
            if (token.type === 17 /* NUMBER_TOKEN */) {
                return token.number;
            }
            if (token.type === 15 /* DIMENSION_TOKEN */) {
                return token.number;
            }
            return 0;
        }
    };

    var LINE_BREAK;
    (function (LINE_BREAK) {
        LINE_BREAK["NORMAL"] = "normal";
        LINE_BREAK["STRICT"] = "strict";
    })(LINE_BREAK || (LINE_BREAK = {}));
    var lineBreak = {
        name: 'line-break',
        initialValue: 'normal',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, lineBreak) {
            switch (lineBreak) {
                case 'strict':
                    return LINE_BREAK.STRICT;
                case 'normal':
                default:
                    return LINE_BREAK.NORMAL;
            }
        }
    };

    var lineHeight = {
        name: 'line-height',
        initialValue: 'normal',
        prefix: false,
        type: 4 /* TOKEN_VALUE */
    };
    var computeLineHeight = function (token, fontSize) {
        if (isIdentToken(token) && token.value === 'normal') {
            return 1.2 * fontSize;
        }
        else if (token.type === 17 /* NUMBER_TOKEN */) {
            return fontSize * token.number;
        }
        else if (isLengthPercentage(token)) {
            return getAbsoluteValue(token, fontSize);
        }
        return fontSize;
    };

    var listStyleImage = {
        name: 'list-style-image',
        initialValue: 'none',
        type: 0 /* VALUE */,
        prefix: false,
        parse: function (context, token) {
            if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
                return null;
            }
            return image.parse(context, token);
        }
    };

    var listStylePosition = {
        name: 'list-style-position',
        initialValue: 'outside',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, position) {
            switch (position) {
                case 'inside':
                    return 0 /* INSIDE */;
                case 'outside':
                default:
                    return 1 /* OUTSIDE */;
            }
        }
    };

    var listStyleType = {
        name: 'list-style-type',
        initialValue: 'none',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, type) {
            switch (type) {
                case 'disc':
                    return 0 /* DISC */;
                case 'circle':
                    return 1 /* CIRCLE */;
                case 'square':
                    return 2 /* SQUARE */;
                case 'decimal':
                    return 3 /* DECIMAL */;
                case 'cjk-decimal':
                    return 4 /* CJK_DECIMAL */;
                case 'decimal-leading-zero':
                    return 5 /* DECIMAL_LEADING_ZERO */;
                case 'lower-roman':
                    return 6 /* LOWER_ROMAN */;
                case 'upper-roman':
                    return 7 /* UPPER_ROMAN */;
                case 'lower-greek':
                    return 8 /* LOWER_GREEK */;
                case 'lower-alpha':
                    return 9 /* LOWER_ALPHA */;
                case 'upper-alpha':
                    return 10 /* UPPER_ALPHA */;
                case 'arabic-indic':
                    return 11 /* ARABIC_INDIC */;
                case 'armenian':
                    return 12 /* ARMENIAN */;
                case 'bengali':
                    return 13 /* BENGALI */;
                case 'cambodian':
                    return 14 /* CAMBODIAN */;
                case 'cjk-earthly-branch':
                    return 15 /* CJK_EARTHLY_BRANCH */;
                case 'cjk-heavenly-stem':
                    return 16 /* CJK_HEAVENLY_STEM */;
                case 'cjk-ideographic':
                    return 17 /* CJK_IDEOGRAPHIC */;
                case 'devanagari':
                    return 18 /* DEVANAGARI */;
                case 'ethiopic-numeric':
                    return 19 /* ETHIOPIC_NUMERIC */;
                case 'georgian':
                    return 20 /* GEORGIAN */;
                case 'gujarati':
                    return 21 /* GUJARATI */;
                case 'gurmukhi':
                    return 22 /* GURMUKHI */;
                case 'hebrew':
                    return 22 /* HEBREW */;
                case 'hiragana':
                    return 23 /* HIRAGANA */;
                case 'hiragana-iroha':
                    return 24 /* HIRAGANA_IROHA */;
                case 'japanese-formal':
                    return 25 /* JAPANESE_FORMAL */;
                case 'japanese-informal':
                    return 26 /* JAPANESE_INFORMAL */;
                case 'kannada':
                    return 27 /* KANNADA */;
                case 'katakana':
                    return 28 /* KATAKANA */;
                case 'katakana-iroha':
                    return 29 /* KATAKANA_IROHA */;
                case 'khmer':
                    return 30 /* KHMER */;
                case 'korean-hangul-formal':
                    return 31 /* KOREAN_HANGUL_FORMAL */;
                case 'korean-hanja-formal':
                    return 32 /* KOREAN_HANJA_FORMAL */;
                case 'korean-hanja-informal':
                    return 33 /* KOREAN_HANJA_INFORMAL */;
                case 'lao':
                    return 34 /* LAO */;
                case 'lower-armenian':
                    return 35 /* LOWER_ARMENIAN */;
                case 'malayalam':
                    return 36 /* MALAYALAM */;
                case 'mongolian':
                    return 37 /* MONGOLIAN */;
                case 'myanmar':
                    return 38 /* MYANMAR */;
                case 'oriya':
                    return 39 /* ORIYA */;
                case 'persian':
                    return 40 /* PERSIAN */;
                case 'simp-chinese-formal':
                    return 41 /* SIMP_CHINESE_FORMAL */;
                case 'simp-chinese-informal':
                    return 42 /* SIMP_CHINESE_INFORMAL */;
                case 'tamil':
                    return 43 /* TAMIL */;
                case 'telugu':
                    return 44 /* TELUGU */;
                case 'thai':
                    return 45 /* THAI */;
                case 'tibetan':
                    return 46 /* TIBETAN */;
                case 'trad-chinese-formal':
                    return 47 /* TRAD_CHINESE_FORMAL */;
                case 'trad-chinese-informal':
                    return 48 /* TRAD_CHINESE_INFORMAL */;
                case 'upper-armenian':
                    return 49 /* UPPER_ARMENIAN */;
                case 'disclosure-open':
                    return 50 /* DISCLOSURE_OPEN */;
                case 'disclosure-closed':
                    return 51 /* DISCLOSURE_CLOSED */;
                case 'none':
                default:
                    return -1 /* NONE */;
            }
        }
    };

    var marginForSide = function (side) { return ({
        name: "margin-" + side,
        initialValue: '0',
        prefix: false,
        type: 4 /* TOKEN_VALUE */
    }); };
    var marginTop = marginForSide('top');
    var marginRight = marginForSide('right');
    var marginBottom = marginForSide('bottom');
    var marginLeft = marginForSide('left');

    var overflow = {
        name: 'overflow',
        initialValue: 'visible',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return tokens.filter(isIdentToken).map(function (overflow) {
                switch (overflow.value) {
                    case 'hidden':
                        return 1 /* HIDDEN */;
                    case 'scroll':
                        return 2 /* SCROLL */;
                    case 'clip':
                        return 3 /* CLIP */;
                    case 'auto':
                        return 4 /* AUTO */;
                    case 'visible':
                    default:
                        return 0 /* VISIBLE */;
                }
            });
        }
    };

    var overflowWrap = {
        name: 'overflow-wrap',
        initialValue: 'normal',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, overflow) {
            switch (overflow) {
                case 'break-word':
                    return "break-word" /* BREAK_WORD */;
                case 'normal':
                default:
                    return "normal" /* NORMAL */;
            }
        }
    };

    var paddingForSide = function (side) { return ({
        name: "padding-" + side,
        initialValue: '0',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'length-percentage'
    }); };
    var paddingTop = paddingForSide('top');
    var paddingRight = paddingForSide('right');
    var paddingBottom = paddingForSide('bottom');
    var paddingLeft = paddingForSide('left');

    var textAlign = {
        name: 'text-align',
        initialValue: 'left',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, textAlign) {
            switch (textAlign) {
                case 'right':
                    return 2 /* RIGHT */;
                case 'center':
                case 'justify':
                    return 1 /* CENTER */;
                case 'left':
                default:
                    return 0 /* LEFT */;
            }
        }
    };

    var position = {
        name: 'position',
        initialValue: 'static',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, position) {
            switch (position) {
                case 'relative':
                    return 1 /* RELATIVE */;
                case 'absolute':
                    return 2 /* ABSOLUTE */;
                case 'fixed':
                    return 3 /* FIXED */;
                case 'sticky':
                    return 4 /* STICKY */;
            }
            return 0 /* STATIC */;
        }
    };

    var textShadow = {
        name: 'text-shadow',
        initialValue: 'none',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (context, tokens) {
            if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
                return [];
            }
            return parseFunctionArgs(tokens).map(function (values) {
                var shadow = {
                    color: COLORS.TRANSPARENT,
                    offsetX: ZERO_LENGTH,
                    offsetY: ZERO_LENGTH,
                    blur: ZERO_LENGTH
                };
                var c = 0;
                for (var i = 0; i < values.length; i++) {
                    var token = values[i];
                    if (isLength(token)) {
                        if (c === 0) {
                            shadow.offsetX = token;
                        }
                        else if (c === 1) {
                            shadow.offsetY = token;
                        }
                        else {
                            shadow.blur = token;
                        }
                        c++;
                    }
                    else {
                        shadow.color = color$1.parse(context, token);
                    }
                }
                return shadow;
            });
        }
    };

    var textTransform = {
        name: 'text-transform',
        initialValue: 'none',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, textTransform) {
            switch (textTransform) {
                case 'uppercase':
                    return 2 /* UPPERCASE */;
                case 'lowercase':
                    return 1 /* LOWERCASE */;
                case 'capitalize':
                    return 3 /* CAPITALIZE */;
            }
            return 0 /* NONE */;
        }
    };

    var transform$1 = {
        name: 'transform',
        initialValue: 'none',
        prefix: true,
        type: 0 /* VALUE */,
        parse: function (_context, token) {
            if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
                return null;
            }
            if (token.type === 18 /* FUNCTION */) {
                var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
                if (typeof transformFunction === 'undefined') {
                    throw new Error("Attempting to parse an unsupported transform function \"" + token.name + "\"");
                }
                return transformFunction(token.values);
            }
            return null;
        }
    };
    var matrix = function (args) {
        var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
        return values.length === 6 ? values : null;
    };
    // doesn't support 3D transforms at the moment
    var matrix3d = function (args) {
        var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
        var a1 = values[0], b1 = values[1]; values[2]; values[3]; var a2 = values[4], b2 = values[5]; values[6]; values[7]; values[8]; values[9]; values[10]; values[11]; var a4 = values[12], b4 = values[13]; values[14]; values[15];
        return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
    };
    var SUPPORTED_TRANSFORM_FUNCTIONS = {
        matrix: matrix,
        matrix3d: matrix3d
    };

    var DEFAULT_VALUE = {
        type: 16 /* PERCENTAGE_TOKEN */,
        number: 50,
        flags: FLAG_INTEGER
    };
    var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
    var transformOrigin = {
        name: 'transform-origin',
        initialValue: '50% 50%',
        prefix: true,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            var origins = tokens.filter(isLengthPercentage);
            if (origins.length !== 2) {
                return DEFAULT;
            }
            return [origins[0], origins[1]];
        }
    };

    var visibility = {
        name: 'visible',
        initialValue: 'none',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, visibility) {
            switch (visibility) {
                case 'hidden':
                    return 1 /* HIDDEN */;
                case 'collapse':
                    return 2 /* COLLAPSE */;
                case 'visible':
                default:
                    return 0 /* VISIBLE */;
            }
        }
    };

    var WORD_BREAK;
    (function (WORD_BREAK) {
        WORD_BREAK["NORMAL"] = "normal";
        WORD_BREAK["BREAK_ALL"] = "break-all";
        WORD_BREAK["KEEP_ALL"] = "keep-all";
    })(WORD_BREAK || (WORD_BREAK = {}));
    var wordBreak = {
        name: 'word-break',
        initialValue: 'normal',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, wordBreak) {
            switch (wordBreak) {
                case 'break-all':
                    return WORD_BREAK.BREAK_ALL;
                case 'keep-all':
                    return WORD_BREAK.KEEP_ALL;
                case 'normal':
                default:
                    return WORD_BREAK.NORMAL;
            }
        }
    };

    var zIndex = {
        name: 'z-index',
        initialValue: 'auto',
        prefix: false,
        type: 0 /* VALUE */,
        parse: function (_context, token) {
            if (token.type === 20 /* IDENT_TOKEN */) {
                return { auto: true, order: 0 };
            }
            if (isNumberToken(token)) {
                return { auto: false, order: token.number };
            }
            throw new Error("Invalid z-index number parsed");
        }
    };

    var time = {
        name: 'time',
        parse: function (_context, value) {
            if (value.type === 15 /* DIMENSION_TOKEN */) {
                switch (value.unit.toLowerCase()) {
                    case 's':
                        return 1000 * value.number;
                    case 'ms':
                        return value.number;
                }
            }
            throw new Error("Unsupported time type");
        }
    };

    var opacity = {
        name: 'opacity',
        initialValue: '1',
        type: 0 /* VALUE */,
        prefix: false,
        parse: function (_context, token) {
            if (isNumberToken(token)) {
                return token.number;
            }
            return 1;
        }
    };

    var textDecorationColor = {
        name: "text-decoration-color",
        initialValue: 'transparent',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'color'
    };

    var textDecorationLine = {
        name: 'text-decoration-line',
        initialValue: 'none',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            return tokens
                .filter(isIdentToken)
                .map(function (token) {
                switch (token.value) {
                    case 'underline':
                        return 1 /* UNDERLINE */;
                    case 'overline':
                        return 2 /* OVERLINE */;
                    case 'line-through':
                        return 3 /* LINE_THROUGH */;
                    case 'none':
                        return 4 /* BLINK */;
                }
                return 0 /* NONE */;
            })
                .filter(function (line) { return line !== 0 /* NONE */; });
        }
    };

    var fontFamily = {
        name: "font-family",
        initialValue: '',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            var accumulator = [];
            var results = [];
            tokens.forEach(function (token) {
                switch (token.type) {
                    case 20 /* IDENT_TOKEN */:
                    case 0 /* STRING_TOKEN */:
                        accumulator.push(token.value);
                        break;
                    case 17 /* NUMBER_TOKEN */:
                        accumulator.push(token.number.toString());
                        break;
                    case 4 /* COMMA_TOKEN */:
                        results.push(accumulator.join(' '));
                        accumulator.length = 0;
                        break;
                }
            });
            if (accumulator.length) {
                results.push(accumulator.join(' '));
            }
            return results.map(function (result) { return (result.indexOf(' ') === -1 ? result : "'" + result + "'"); });
        }
    };

    var fontSize = {
        name: "font-size",
        initialValue: '0',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'length'
    };

    var fontWeight = {
        name: 'font-weight',
        initialValue: 'normal',
        type: 0 /* VALUE */,
        prefix: false,
        parse: function (_context, token) {
            if (isNumberToken(token)) {
                return token.number;
            }
            if (isIdentToken(token)) {
                switch (token.value) {
                    case 'bold':
                        return 700;
                    case 'normal':
                    default:
                        return 400;
                }
            }
            return 400;
        }
    };

    var fontVariant = {
        name: 'font-variant',
        initialValue: 'none',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (_context, tokens) {
            return tokens.filter(isIdentToken).map(function (token) { return token.value; });
        }
    };

    var fontStyle = {
        name: 'font-style',
        initialValue: 'normal',
        prefix: false,
        type: 2 /* IDENT_VALUE */,
        parse: function (_context, overflow) {
            switch (overflow) {
                case 'oblique':
                    return "oblique" /* OBLIQUE */;
                case 'italic':
                    return "italic" /* ITALIC */;
                case 'normal':
                default:
                    return "normal" /* NORMAL */;
            }
        }
    };

    var contains = function (bit, value) { return (bit & value) !== 0; };

    var content = {
        name: 'content',
        initialValue: 'none',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (_context, tokens) {
            if (tokens.length === 0) {
                return [];
            }
            var first = tokens[0];
            if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
                return [];
            }
            return tokens;
        }
    };

    var counterIncrement = {
        name: 'counter-increment',
        initialValue: 'none',
        prefix: true,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            if (tokens.length === 0) {
                return null;
            }
            var first = tokens[0];
            if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
                return null;
            }
            var increments = [];
            var filtered = tokens.filter(nonWhiteSpace);
            for (var i = 0; i < filtered.length; i++) {
                var counter = filtered[i];
                var next = filtered[i + 1];
                if (counter.type === 20 /* IDENT_TOKEN */) {
                    var increment = next && isNumberToken(next) ? next.number : 1;
                    increments.push({ counter: counter.value, increment: increment });
                }
            }
            return increments;
        }
    };

    var counterReset = {
        name: 'counter-reset',
        initialValue: 'none',
        prefix: true,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            if (tokens.length === 0) {
                return [];
            }
            var resets = [];
            var filtered = tokens.filter(nonWhiteSpace);
            for (var i = 0; i < filtered.length; i++) {
                var counter = filtered[i];
                var next = filtered[i + 1];
                if (isIdentToken(counter) && counter.value !== 'none') {
                    var reset = next && isNumberToken(next) ? next.number : 0;
                    resets.push({ counter: counter.value, reset: reset });
                }
            }
            return resets;
        }
    };

    var duration = {
        name: 'duration',
        initialValue: '0s',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (context, tokens) {
            return tokens.filter(isDimensionToken).map(function (token) { return time.parse(context, token); });
        }
    };

    var quotes = {
        name: 'quotes',
        initialValue: 'none',
        prefix: true,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            if (tokens.length === 0) {
                return null;
            }
            var first = tokens[0];
            if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
                return null;
            }
            var quotes = [];
            var filtered = tokens.filter(isStringToken);
            if (filtered.length % 2 !== 0) {
                return null;
            }
            for (var i = 0; i < filtered.length; i += 2) {
                var open_1 = filtered[i].value;
                var close_1 = filtered[i + 1].value;
                quotes.push({ open: open_1, close: close_1 });
            }
            return quotes;
        }
    };
    var getQuote = function (quotes, depth, open) {
        if (!quotes) {
            return '';
        }
        var quote = quotes[Math.min(depth, quotes.length - 1)];
        if (!quote) {
            return '';
        }
        return open ? quote.open : quote.close;
    };

    var boxShadow = {
        name: 'box-shadow',
        initialValue: 'none',
        type: 1 /* LIST */,
        prefix: false,
        parse: function (context, tokens) {
            if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
                return [];
            }
            return parseFunctionArgs(tokens).map(function (values) {
                var shadow = {
                    color: 0x000000ff,
                    offsetX: ZERO_LENGTH,
                    offsetY: ZERO_LENGTH,
                    blur: ZERO_LENGTH,
                    spread: ZERO_LENGTH,
                    inset: false
                };
                var c = 0;
                for (var i = 0; i < values.length; i++) {
                    var token = values[i];
                    if (isIdentWithValue(token, 'inset')) {
                        shadow.inset = true;
                    }
                    else if (isLength(token)) {
                        if (c === 0) {
                            shadow.offsetX = token;
                        }
                        else if (c === 1) {
                            shadow.offsetY = token;
                        }
                        else if (c === 2) {
                            shadow.blur = token;
                        }
                        else {
                            shadow.spread = token;
                        }
                        c++;
                    }
                    else {
                        shadow.color = color$1.parse(context, token);
                    }
                }
                return shadow;
            });
        }
    };

    var paintOrder = {
        name: 'paint-order',
        initialValue: 'normal',
        prefix: false,
        type: 1 /* LIST */,
        parse: function (_context, tokens) {
            var DEFAULT_VALUE = [0 /* FILL */, 1 /* STROKE */, 2 /* MARKERS */];
            var layers = [];
            tokens.filter(isIdentToken).forEach(function (token) {
                switch (token.value) {
                    case 'stroke':
                        layers.push(1 /* STROKE */);
                        break;
                    case 'fill':
                        layers.push(0 /* FILL */);
                        break;
                    case 'markers':
                        layers.push(2 /* MARKERS */);
                        break;
                }
            });
            DEFAULT_VALUE.forEach(function (value) {
                if (layers.indexOf(value) === -1) {
                    layers.push(value);
                }
            });
            return layers;
        }
    };

    var webkitTextStrokeColor = {
        name: "-webkit-text-stroke-color",
        initialValue: 'currentcolor',
        prefix: false,
        type: 3 /* TYPE_VALUE */,
        format: 'color'
    };

    var webkitTextStrokeWidth = {
        name: "-webkit-text-stroke-width",
        initialValue: '0',
        type: 0 /* VALUE */,
        prefix: false,
        parse: function (_context, token) {
            if (isDimensionToken(token)) {
                return token.number;
            }
            return 0;
        }
    };

    var CSSParsedDeclaration = /** @class */ (function () {
        function CSSParsedDeclaration(context, declaration) {
            var _a, _b;
            this.animationDuration = parse(context, duration, declaration.animationDuration);
            this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
            this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
            this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
            this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
            this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
            this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
            this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
            this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
            this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
            this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
            this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
            this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
            this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
            this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
            this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
            this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
            this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
            this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
            this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
            this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
            this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
            this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
            this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
            this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
            this.color = parse(context, color, declaration.color);
            this.direction = parse(context, direction, declaration.direction);
            this.display = parse(context, display, declaration.display);
            this.float = parse(context, float, declaration.cssFloat);
            this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
            this.fontSize = parse(context, fontSize, declaration.fontSize);
            this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
            this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
            this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
            this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
            this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
            this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
            this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
            this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
            this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
            this.marginTop = parse(context, marginTop, declaration.marginTop);
            this.marginRight = parse(context, marginRight, declaration.marginRight);
            this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
            this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
            this.opacity = parse(context, opacity, declaration.opacity);
            var overflowTuple = parse(context, overflow, declaration.overflow);
            this.overflowX = overflowTuple[0];
            this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
            this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
            this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
            this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
            this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
            this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
            this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
            this.position = parse(context, position, declaration.position);
            this.textAlign = parse(context, textAlign, declaration.textAlign);
            this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
            this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
            this.textShadow = parse(context, textShadow, declaration.textShadow);
            this.textTransform = parse(context, textTransform, declaration.textTransform);
            this.transform = parse(context, transform$1, declaration.transform);
            this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
            this.visibility = parse(context, visibility, declaration.visibility);
            this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
            this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
            this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
            this.zIndex = parse(context, zIndex, declaration.zIndex);
        }
        CSSParsedDeclaration.prototype.isVisible = function () {
            return this.display > 0 && this.opacity > 0 && this.visibility === 0 /* VISIBLE */;
        };
        CSSParsedDeclaration.prototype.isTransparent = function () {
            return isTransparent(this.backgroundColor);
        };
        CSSParsedDeclaration.prototype.isTransformed = function () {
            return this.transform !== null;
        };
        CSSParsedDeclaration.prototype.isPositioned = function () {
            return this.position !== 0 /* STATIC */;
        };
        CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
            return this.isPositioned() && !this.zIndex.auto;
        };
        CSSParsedDeclaration.prototype.isFloating = function () {
            return this.float !== 0 /* NONE */;
        };
        CSSParsedDeclaration.prototype.isInlineLevel = function () {
            return (contains(this.display, 4 /* INLINE */) ||
                contains(this.display, 33554432 /* INLINE_BLOCK */) ||
                contains(this.display, 268435456 /* INLINE_FLEX */) ||
                contains(this.display, 536870912 /* INLINE_GRID */) ||
                contains(this.display, 67108864 /* INLINE_LIST_ITEM */) ||
                contains(this.display, 134217728 /* INLINE_TABLE */));
        };
        return CSSParsedDeclaration;
    }());
    var CSSParsedPseudoDeclaration = /** @class */ (function () {
        function CSSParsedPseudoDeclaration(context, declaration) {
            this.content = parse(context, content, declaration.content);
            this.quotes = parse(context, quotes, declaration.quotes);
        }
        return CSSParsedPseudoDeclaration;
    }());
    var CSSParsedCounterDeclaration = /** @class */ (function () {
        function CSSParsedCounterDeclaration(context, declaration) {
            this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
            this.counterReset = parse(context, counterReset, declaration.counterReset);
        }
        return CSSParsedCounterDeclaration;
    }());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var parse = function (context, descriptor, style) {
        var tokenizer = new Tokenizer();
        var value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
        tokenizer.write(value);
        var parser = new Parser(tokenizer.read());
        switch (descriptor.type) {
            case 2 /* IDENT_VALUE */:
                var token = parser.parseComponentValue();
                return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
            case 0 /* VALUE */:
                return descriptor.parse(context, parser.parseComponentValue());
            case 1 /* LIST */:
                return descriptor.parse(context, parser.parseComponentValues());
            case 4 /* TOKEN_VALUE */:
                return parser.parseComponentValue();
            case 3 /* TYPE_VALUE */:
                switch (descriptor.format) {
                    case 'angle':
                        return angle.parse(context, parser.parseComponentValue());
                    case 'color':
                        return color$1.parse(context, parser.parseComponentValue());
                    case 'image':
                        return image.parse(context, parser.parseComponentValue());
                    case 'length':
                        var length_1 = parser.parseComponentValue();
                        return isLength(length_1) ? length_1 : ZERO_LENGTH;
                    case 'length-percentage':
                        var value_1 = parser.parseComponentValue();
                        return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
                    case 'time':
                        return time.parse(context, parser.parseComponentValue());
                }
                break;
        }
    };

    var elementDebuggerAttribute = 'data-html2canvas-debug';
    var getElementDebugType = function (element) {
        var attribute = element.getAttribute(elementDebuggerAttribute);
        switch (attribute) {
            case 'all':
                return 1 /* ALL */;
            case 'clone':
                return 2 /* CLONE */;
            case 'parse':
                return 3 /* PARSE */;
            case 'render':
                return 4 /* RENDER */;
            default:
                return 0 /* NONE */;
        }
    };
    var isDebugging = function (element, type) {
        var elementType = getElementDebugType(element);
        return elementType === 1 /* ALL */ || type === elementType;
    };

    var ElementContainer = /** @class */ (function () {
        function ElementContainer(context, element) {
            this.context = context;
            this.textNodes = [];
            this.elements = [];
            this.flags = 0;
            if (isDebugging(element, 3 /* PARSE */)) {
                debugger;
            }
            this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
            if (isHTMLElementNode(element)) {
                if (this.styles.animationDuration.some(function (duration) { return duration > 0; })) {
                    element.style.animationDuration = '0s';
                }
                if (this.styles.transform !== null) {
                    // getBoundingClientRect takes transforms into account
                    element.style.transform = 'none';
                }
            }
            this.bounds = parseBounds(this.context, element);
            if (isDebugging(element, 4 /* RENDER */)) {
                this.flags |= 16 /* DEBUG_RENDER */;
            }
        }
        return ElementContainer;
    }());

    /*
     * text-segmentation 1.0.3 <https://github.com/niklasvh/text-segmentation>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var base64 = 'AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=';

    /*
     * utrie 1.0.2 <https://github.com/niklasvh/utrie>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var chars$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
        lookup$1[chars$1.charCodeAt(i$1)] = i$1;
    }
    var decode = function (base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === '=') {
            bufferLength--;
            if (base64[base64.length - 2] === '=') {
                bufferLength--;
            }
        }
        var buffer = typeof ArrayBuffer !== 'undefined' &&
            typeof Uint8Array !== 'undefined' &&
            typeof Uint8Array.prototype.slice !== 'undefined'
            ? new ArrayBuffer(bufferLength)
            : new Array(bufferLength);
        var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
        for (i = 0; i < len; i += 4) {
            encoded1 = lookup$1[base64.charCodeAt(i)];
            encoded2 = lookup$1[base64.charCodeAt(i + 1)];
            encoded3 = lookup$1[base64.charCodeAt(i + 2)];
            encoded4 = lookup$1[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return buffer;
    };
    var polyUint16Array = function (buffer) {
        var length = buffer.length;
        var bytes = [];
        for (var i = 0; i < length; i += 2) {
            bytes.push((buffer[i + 1] << 8) | buffer[i]);
        }
        return bytes;
    };
    var polyUint32Array = function (buffer) {
        var length = buffer.length;
        var bytes = [];
        for (var i = 0; i < length; i += 4) {
            bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
        }
        return bytes;
    };

    /** Shift size for getting the index-2 table offset. */
    var UTRIE2_SHIFT_2 = 5;
    /** Shift size for getting the index-1 table offset. */
    var UTRIE2_SHIFT_1 = 6 + 5;
    /**
     * Shift size for shifting left the index array values.
     * Increases possible data size with 16-bit index values at the cost
     * of compactability.
     * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
     */
    var UTRIE2_INDEX_SHIFT = 2;
    /**
     * Difference between the two shift sizes,
     * for getting an index-1 offset from an index-2 offset. 6=11-5
     */
    var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
    /**
     * The part of the index-2 table for U+D800..U+DBFF stores values for
     * lead surrogate code _units_ not code _points_.
     * Values for lead surrogate code _points_ are indexed with this portion of the table.
     * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
     */
    var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
    /** Number of entries in a data block. 32=0x20 */
    var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
    /** Mask for getting the lower bits for the in-data-block offset. */
    var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
    var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
    /** Count the lengths of both BMP pieces. 2080=0x820 */
    var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
    /**
     * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
     * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
     */
    var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
    var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
    /**
     * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
     * Variable length, for code points up to highStart, where the last single-value range starts.
     * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
     * (For 0x100000 supplementary code points U+10000..U+10ffff.)
     *
     * The part of the index-2 table for supplementary code points starts
     * after this index-1 table.
     *
     * Both the index-1 table and the following part of the index-2 table
     * are omitted completely if there is only BMP data.
     */
    var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
    /**
     * Number of index-1 entries for the BMP. 32=0x20
     * This part of the index-1 table is omitted from the serialized form.
     */
    var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
    /** Number of entries in an index-2 block. 64=0x40 */
    var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
    /** Mask for getting the lower bits for the in-index-2-block offset. */
    var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
    var slice16 = function (view, start, end) {
        if (view.slice) {
            return view.slice(start, end);
        }
        return new Uint16Array(Array.prototype.slice.call(view, start, end));
    };
    var slice32 = function (view, start, end) {
        if (view.slice) {
            return view.slice(start, end);
        }
        return new Uint32Array(Array.prototype.slice.call(view, start, end));
    };
    var createTrieFromBase64 = function (base64, _byteLength) {
        var buffer = decode(base64);
        var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
        var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
        var headerLength = 24;
        var index = slice16(view16, headerLength / 2, view32[4] / 2);
        var data = view32[5] === 2
            ? slice16(view16, (headerLength + view32[4]) / 2)
            : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
        return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
    };
    var Trie = /** @class */ (function () {
        function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
            this.initialValue = initialValue;
            this.errorValue = errorValue;
            this.highStart = highStart;
            this.highValueIndex = highValueIndex;
            this.index = index;
            this.data = data;
        }
        /**
         * Get the value for a code point as stored in the Trie.
         *
         * @param codePoint the code point
         * @return the value
         */
        Trie.prototype.get = function (codePoint) {
            var ix;
            if (codePoint >= 0) {
                if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                    // Ordinary BMP code point, excluding leading surrogates.
                    // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                    // 16 bit data is stored in the index array itself.
                    ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint <= 0xffff) {
                    // Lead Surrogate Code Point.  A Separate index section is stored for
                    // lead surrogate code units and code points.
                    //   The main index has the code unit data.
                    //   For this function, we need the code point data.
                    // Note: this expression could be refactored for slightly improved efficiency, but
                    //       surrogate code points will be so rare in practice that it's not worth it.
                    ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2)];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint < this.highStart) {
                    // Supplemental code point, use two-level lookup.
                    ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                    ix = this.index[ix];
                    ix += (codePoint >> UTRIE2_SHIFT_2) & UTRIE2_INDEX_2_MASK;
                    ix = this.index[ix];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint <= 0x10ffff) {
                    return this.data[this.highValueIndex];
                }
            }
            // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
            return this.errorValue;
        };
        return Trie;
    }());

    /*
     * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
     * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }

    var Prepend = 1;
    var CR = 2;
    var LF = 3;
    var Control = 4;
    var Extend = 5;
    var SpacingMark = 7;
    var L = 8;
    var V = 9;
    var T = 10;
    var LV = 11;
    var LVT = 12;
    var ZWJ = 13;
    var Extended_Pictographic = 14;
    var RI = 15;
    var toCodePoints = function (str) {
        var codePoints = [];
        var i = 0;
        var length = str.length;
        while (i < length) {
            var value = str.charCodeAt(i++);
            if (value >= 0xd800 && value <= 0xdbff && i < length) {
                var extra = str.charCodeAt(i++);
                if ((extra & 0xfc00) === 0xdc00) {
                    codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
                }
                else {
                    codePoints.push(value);
                    i--;
                }
            }
            else {
                codePoints.push(value);
            }
        }
        return codePoints;
    };
    var fromCodePoint = function () {
        var codePoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
        }
        if (String.fromCodePoint) {
            return String.fromCodePoint.apply(String, codePoints);
        }
        var length = codePoints.length;
        if (!length) {
            return '';
        }
        var codeUnits = [];
        var index = -1;
        var result = '';
        while (++index < length) {
            var codePoint = codePoints[index];
            if (codePoint <= 0xffff) {
                codeUnits.push(codePoint);
            }
            else {
                codePoint -= 0x10000;
                codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
            }
            if (index + 1 === length || codeUnits.length > 0x4000) {
                result += String.fromCharCode.apply(String, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    var UnicodeTrie = createTrieFromBase64(base64);
    var BREAK_NOT_ALLOWED = '×';
    var BREAK_ALLOWED = '÷';
    var codePointToClass = function (codePoint) { return UnicodeTrie.get(codePoint); };
    var _graphemeBreakAtIndex = function (_codePoints, classTypes, index) {
        var prevIndex = index - 2;
        var prev = classTypes[prevIndex];
        var current = classTypes[index - 1];
        var next = classTypes[index];
        // GB3 Do not break between a CR and LF
        if (current === CR && next === LF) {
            return BREAK_NOT_ALLOWED;
        }
        // GB4 Otherwise, break before and after controls.
        if (current === CR || current === LF || current === Control) {
            return BREAK_ALLOWED;
        }
        // GB5
        if (next === CR || next === LF || next === Control) {
            return BREAK_ALLOWED;
        }
        // Do not break Hangul syllable sequences.
        // GB6
        if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED;
        }
        // GB7
        if ((current === LV || current === V) && (next === V || next === T)) {
            return BREAK_NOT_ALLOWED;
        }
        // GB8
        if ((current === LVT || current === T) && next === T) {
            return BREAK_NOT_ALLOWED;
        }
        // GB9 Do not break before extending characters or ZWJ.
        if (next === ZWJ || next === Extend) {
            return BREAK_NOT_ALLOWED;
        }
        // Do not break before SpacingMarks, or after Prepend characters.
        // GB9a
        if (next === SpacingMark) {
            return BREAK_NOT_ALLOWED;
        }
        // GB9a
        if (current === Prepend) {
            return BREAK_NOT_ALLOWED;
        }
        // GB11 Do not break within emoji modifier sequences or emoji zwj sequences.
        if (current === ZWJ && next === Extended_Pictographic) {
            while (prev === Extend) {
                prev = classTypes[--prevIndex];
            }
            if (prev === Extended_Pictographic) {
                return BREAK_NOT_ALLOWED;
            }
        }
        // GB12 Do not break within emoji flag sequences.
        // That is, do not break between regional indicator (RI) symbols
        // if there is an odd number of RI characters before the break point.
        if (current === RI && next === RI) {
            var countRI = 0;
            while (prev === RI) {
                countRI++;
                prev = classTypes[--prevIndex];
            }
            if (countRI % 2 === 0) {
                return BREAK_NOT_ALLOWED;
            }
        }
        return BREAK_ALLOWED;
    };
    var GraphemeBreaker = function (str) {
        var codePoints = toCodePoints(str);
        var length = codePoints.length;
        var index = 0;
        var lastEnd = 0;
        var classTypes = codePoints.map(codePointToClass);
        return {
            next: function () {
                if (index >= length) {
                    return { done: true, value: null };
                }
                var graphemeBreak = BREAK_NOT_ALLOWED;
                while (index < length &&
                    (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index)) === BREAK_NOT_ALLOWED) { }
                if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
                    var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index));
                    lastEnd = index;
                    return { value: value, done: false };
                }
                return { done: true, value: null };
            },
        };
    };
    var splitGraphemes = function (str) {
        var breaker = GraphemeBreaker(str);
        var graphemes = [];
        var bk;
        while (!(bk = breaker.next()).done) {
            if (bk.value) {
                graphemes.push(bk.value.slice());
            }
        }
        return graphemes;
    };

    var testRangeBounds = function (document) {
        var TEST_HEIGHT = 123;
        if (document.createRange) {
            var range = document.createRange();
            if (range.getBoundingClientRect) {
                var testElement = document.createElement('boundtest');
                testElement.style.height = TEST_HEIGHT + "px";
                testElement.style.display = 'block';
                document.body.appendChild(testElement);
                range.selectNode(testElement);
                var rangeBounds = range.getBoundingClientRect();
                var rangeHeight = Math.round(rangeBounds.height);
                document.body.removeChild(testElement);
                if (rangeHeight === TEST_HEIGHT) {
                    return true;
                }
            }
        }
        return false;
    };
    var testIOSLineBreak = function (document) {
        var testElement = document.createElement('boundtest');
        testElement.style.width = '50px';
        testElement.style.display = 'block';
        testElement.style.fontSize = '12px';
        testElement.style.letterSpacing = '0px';
        testElement.style.wordSpacing = '0px';
        document.body.appendChild(testElement);
        var range = document.createRange();
        testElement.innerHTML = typeof ''.repeat === 'function' ? '&#128104;'.repeat(10) : '';
        var node = testElement.firstChild;
        var textList = toCodePoints$1(node.data).map(function (i) { return fromCodePoint$1(i); });
        var offset = 0;
        var prev = {};
        // ios 13 does not handle range getBoundingClientRect line changes correctly #2177
        var supports = textList.every(function (text, i) {
            range.setStart(node, offset);
            range.setEnd(node, offset + text.length);
            var rect = range.getBoundingClientRect();
            offset += text.length;
            var boundAhead = rect.x > prev.x || rect.y > prev.y;
            prev = rect;
            if (i === 0) {
                return true;
            }
            return boundAhead;
        });
        document.body.removeChild(testElement);
        return supports;
    };
    var testCORS = function () { return typeof new Image().crossOrigin !== 'undefined'; };
    var testResponseType = function () { return typeof new XMLHttpRequest().responseType === 'string'; };
    var testSVG = function (document) {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return false;
        }
        img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
        try {
            ctx.drawImage(img, 0, 0);
            canvas.toDataURL();
        }
        catch (e) {
            return false;
        }
        return true;
    };
    var isGreenPixel = function (data) {
        return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
    };
    var testForeignObject = function (document) {
        var canvas = document.createElement('canvas');
        var size = 100;
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return Promise.reject(false);
        }
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(0, 0, size, size);
        var img = new Image();
        var greenImageSrc = canvas.toDataURL();
        img.src = greenImageSrc;
        var svg = createForeignObjectSVG(size, size, 0, 0, img);
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, size, size);
        return loadSerializedSVG$1(svg)
            .then(function (img) {
            ctx.drawImage(img, 0, 0);
            var data = ctx.getImageData(0, 0, size, size).data;
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, size, size);
            var node = document.createElement('div');
            node.style.backgroundImage = "url(" + greenImageSrc + ")";
            node.style.height = size + "px";
            // Firefox 55 does not render inline <img /> tags
            return isGreenPixel(data)
                ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node))
                : Promise.reject(false);
        })
            .then(function (img) {
            ctx.drawImage(img, 0, 0);
            // Edge does not render background-images
            return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
        })
            .catch(function () { return false; });
    };
    var createForeignObjectSVG = function (width, height, x, y, node) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(xmlns, 'svg');
        var foreignObject = document.createElementNS(xmlns, 'foreignObject');
        svg.setAttributeNS(null, 'width', width.toString());
        svg.setAttributeNS(null, 'height', height.toString());
        foreignObject.setAttributeNS(null, 'width', '100%');
        foreignObject.setAttributeNS(null, 'height', '100%');
        foreignObject.setAttributeNS(null, 'x', x.toString());
        foreignObject.setAttributeNS(null, 'y', y.toString());
        foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
        svg.appendChild(foreignObject);
        foreignObject.appendChild(node);
        return svg;
    };
    var loadSerializedSVG$1 = function (svg) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () { return resolve(img); };
            img.onerror = reject;
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
        });
    };
    var FEATURES = {
        get SUPPORT_RANGE_BOUNDS() {
            var value = testRangeBounds(document);
            Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
            return value;
        },
        get SUPPORT_WORD_BREAKING() {
            var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
            Object.defineProperty(FEATURES, 'SUPPORT_WORD_BREAKING', { value: value });
            return value;
        },
        get SUPPORT_SVG_DRAWING() {
            var value = testSVG(document);
            Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
            return value;
        },
        get SUPPORT_FOREIGNOBJECT_DRAWING() {
            var value = typeof Array.from === 'function' && typeof window.fetch === 'function'
                ? testForeignObject(document)
                : Promise.resolve(false);
            Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
            return value;
        },
        get SUPPORT_CORS_IMAGES() {
            var value = testCORS();
            Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
            return value;
        },
        get SUPPORT_RESPONSE_TYPE() {
            var value = testResponseType();
            Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
            return value;
        },
        get SUPPORT_CORS_XHR() {
            var value = 'withCredentials' in new XMLHttpRequest();
            Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
            return value;
        },
        get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var value = !!(typeof Intl !== 'undefined' && Intl.Segmenter);
            Object.defineProperty(FEATURES, 'SUPPORT_NATIVE_TEXT_SEGMENTATION', { value: value });
            return value;
        }
    };

    var TextBounds = /** @class */ (function () {
        function TextBounds(text, bounds) {
            this.text = text;
            this.bounds = bounds;
        }
        return TextBounds;
    }());
    var parseTextBounds = function (context, value, styles, node) {
        var textList = breakText(value, styles);
        var textBounds = [];
        var offset = 0;
        textList.forEach(function (text) {
            if (styles.textDecorationLine.length || text.trim().length > 0) {
                if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                    var clientRects = createRange(node, offset, text.length).getClientRects();
                    if (clientRects.length > 1) {
                        var subSegments = segmentGraphemes(text);
                        var subOffset_1 = 0;
                        subSegments.forEach(function (subSegment) {
                            textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
                            subOffset_1 += subSegment.length;
                        });
                    }
                    else {
                        textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
                    }
                }
                else {
                    var replacementNode = node.splitText(text.length);
                    textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
                    node = replacementNode;
                }
            }
            else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
                node = node.splitText(text.length);
            }
            offset += text.length;
        });
        return textBounds;
    };
    var getWrapperBounds = function (context, node) {
        var ownerDocument = node.ownerDocument;
        if (ownerDocument) {
            var wrapper = ownerDocument.createElement('html2canvaswrapper');
            wrapper.appendChild(node.cloneNode(true));
            var parentNode = node.parentNode;
            if (parentNode) {
                parentNode.replaceChild(wrapper, node);
                var bounds = parseBounds(context, wrapper);
                if (wrapper.firstChild) {
                    parentNode.replaceChild(wrapper.firstChild, wrapper);
                }
                return bounds;
            }
        }
        return Bounds.EMPTY;
    };
    var createRange = function (node, offset, length) {
        var ownerDocument = node.ownerDocument;
        if (!ownerDocument) {
            throw new Error('Node has no owner document');
        }
        var range = ownerDocument.createRange();
        range.setStart(node, offset);
        range.setEnd(node, offset + length);
        return range;
    };
    var segmentGraphemes = function (value) {
        if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var segmenter = new Intl.Segmenter(void 0, { granularity: 'grapheme' });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
        }
        return splitGraphemes(value);
    };
    var segmentWords = function (value, styles) {
        if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var segmenter = new Intl.Segmenter(void 0, {
                granularity: 'word'
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
        }
        return breakWords(value, styles);
    };
    var breakText = function (value, styles) {
        return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
    };
    // https://drafts.csswg.org/css-text/#word-separator
    var wordSeparators = [0x0020, 0x00a0, 0x1361, 0x10100, 0x10101, 0x1039, 0x1091];
    var breakWords = function (str, styles) {
        var breaker = LineBreaker(str, {
            lineBreak: styles.lineBreak,
            wordBreak: styles.overflowWrap === "break-word" /* BREAK_WORD */ ? 'break-word' : styles.wordBreak
        });
        var words = [];
        var bk;
        var _loop_1 = function () {
            if (bk.value) {
                var value = bk.value.slice();
                var codePoints = toCodePoints$1(value);
                var word_1 = '';
                codePoints.forEach(function (codePoint) {
                    if (wordSeparators.indexOf(codePoint) === -1) {
                        word_1 += fromCodePoint$1(codePoint);
                    }
                    else {
                        if (word_1.length) {
                            words.push(word_1);
                        }
                        words.push(fromCodePoint$1(codePoint));
                        word_1 = '';
                    }
                });
                if (word_1.length) {
                    words.push(word_1);
                }
            }
        };
        while (!(bk = breaker.next()).done) {
            _loop_1();
        }
        return words;
    };

    var TextContainer = /** @class */ (function () {
        function TextContainer(context, node, styles) {
            this.text = transform(node.data, styles.textTransform);
            this.textBounds = parseTextBounds(context, this.text, styles, node);
        }
        return TextContainer;
    }());
    var transform = function (text, transform) {
        switch (transform) {
            case 1 /* LOWERCASE */:
                return text.toLowerCase();
            case 3 /* CAPITALIZE */:
                return text.replace(CAPITALIZE, capitalize);
            case 2 /* UPPERCASE */:
                return text.toUpperCase();
            default:
                return text;
        }
    };
    var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
    var capitalize = function (m, p1, p2) {
        if (m.length > 0) {
            return p1 + p2.toUpperCase();
        }
        return m;
    };

    var ImageElementContainer = /** @class */ (function (_super) {
        __extends(ImageElementContainer, _super);
        function ImageElementContainer(context, img) {
            var _this = _super.call(this, context, img) || this;
            _this.src = img.currentSrc || img.src;
            _this.intrinsicWidth = img.naturalWidth;
            _this.intrinsicHeight = img.naturalHeight;
            _this.context.cache.addImage(_this.src);
            return _this;
        }
        return ImageElementContainer;
    }(ElementContainer));

    var CanvasElementContainer = /** @class */ (function (_super) {
        __extends(CanvasElementContainer, _super);
        function CanvasElementContainer(context, canvas) {
            var _this = _super.call(this, context, canvas) || this;
            _this.canvas = canvas;
            _this.intrinsicWidth = canvas.width;
            _this.intrinsicHeight = canvas.height;
            return _this;
        }
        return CanvasElementContainer;
    }(ElementContainer));

    var SVGElementContainer = /** @class */ (function (_super) {
        __extends(SVGElementContainer, _super);
        function SVGElementContainer(context, img) {
            var _this = _super.call(this, context, img) || this;
            var s = new XMLSerializer();
            var bounds = parseBounds(context, img);
            img.setAttribute('width', bounds.width + "px");
            img.setAttribute('height', bounds.height + "px");
            _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
            _this.intrinsicWidth = img.width.baseVal.value;
            _this.intrinsicHeight = img.height.baseVal.value;
            _this.context.cache.addImage(_this.svg);
            return _this;
        }
        return SVGElementContainer;
    }(ElementContainer));

    var LIElementContainer = /** @class */ (function (_super) {
        __extends(LIElementContainer, _super);
        function LIElementContainer(context, element) {
            var _this = _super.call(this, context, element) || this;
            _this.value = element.value;
            return _this;
        }
        return LIElementContainer;
    }(ElementContainer));

    var OLElementContainer = /** @class */ (function (_super) {
        __extends(OLElementContainer, _super);
        function OLElementContainer(context, element) {
            var _this = _super.call(this, context, element) || this;
            _this.start = element.start;
            _this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
            return _this;
        }
        return OLElementContainer;
    }(ElementContainer));

    var CHECKBOX_BORDER_RADIUS = [
        {
            type: 15 /* DIMENSION_TOKEN */,
            flags: 0,
            unit: 'px',
            number: 3
        }
    ];
    var RADIO_BORDER_RADIUS = [
        {
            type: 16 /* PERCENTAGE_TOKEN */,
            flags: 0,
            number: 50
        }
    ];
    var reformatInputBounds = function (bounds) {
        if (bounds.width > bounds.height) {
            return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
        }
        else if (bounds.width < bounds.height) {
            return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
        }
        return bounds;
    };
    var getInputValue = function (node) {
        var value = node.type === PASSWORD ? new Array(node.value.length + 1).join('\u2022') : node.value;
        return value.length === 0 ? node.placeholder || '' : value;
    };
    var CHECKBOX = 'checkbox';
    var RADIO = 'radio';
    var PASSWORD = 'password';
    var INPUT_COLOR = 0x2a2a2aff;
    var InputElementContainer = /** @class */ (function (_super) {
        __extends(InputElementContainer, _super);
        function InputElementContainer(context, input) {
            var _this = _super.call(this, context, input) || this;
            _this.type = input.type.toLowerCase();
            _this.checked = input.checked;
            _this.value = getInputValue(input);
            if (_this.type === CHECKBOX || _this.type === RADIO) {
                _this.styles.backgroundColor = 0xdededeff;
                _this.styles.borderTopColor =
                    _this.styles.borderRightColor =
                        _this.styles.borderBottomColor =
                            _this.styles.borderLeftColor =
                                0xa5a5a5ff;
                _this.styles.borderTopWidth =
                    _this.styles.borderRightWidth =
                        _this.styles.borderBottomWidth =
                            _this.styles.borderLeftWidth =
                                1;
                _this.styles.borderTopStyle =
                    _this.styles.borderRightStyle =
                        _this.styles.borderBottomStyle =
                            _this.styles.borderLeftStyle =
                                1 /* SOLID */;
                _this.styles.backgroundClip = [0 /* BORDER_BOX */];
                _this.styles.backgroundOrigin = [0 /* BORDER_BOX */];
                _this.bounds = reformatInputBounds(_this.bounds);
            }
            switch (_this.type) {
                case CHECKBOX:
                    _this.styles.borderTopRightRadius =
                        _this.styles.borderTopLeftRadius =
                            _this.styles.borderBottomRightRadius =
                                _this.styles.borderBottomLeftRadius =
                                    CHECKBOX_BORDER_RADIUS;
                    break;
                case RADIO:
                    _this.styles.borderTopRightRadius =
                        _this.styles.borderTopLeftRadius =
                            _this.styles.borderBottomRightRadius =
                                _this.styles.borderBottomLeftRadius =
                                    RADIO_BORDER_RADIUS;
                    break;
            }
            return _this;
        }
        return InputElementContainer;
    }(ElementContainer));

    var SelectElementContainer = /** @class */ (function (_super) {
        __extends(SelectElementContainer, _super);
        function SelectElementContainer(context, element) {
            var _this = _super.call(this, context, element) || this;
            var option = element.options[element.selectedIndex || 0];
            _this.value = option ? option.text || '' : '';
            return _this;
        }
        return SelectElementContainer;
    }(ElementContainer));

    var TextareaElementContainer = /** @class */ (function (_super) {
        __extends(TextareaElementContainer, _super);
        function TextareaElementContainer(context, element) {
            var _this = _super.call(this, context, element) || this;
            _this.value = element.value;
            return _this;
        }
        return TextareaElementContainer;
    }(ElementContainer));

    var IFrameElementContainer = /** @class */ (function (_super) {
        __extends(IFrameElementContainer, _super);
        function IFrameElementContainer(context, iframe) {
            var _this = _super.call(this, context, iframe) || this;
            _this.src = iframe.src;
            _this.width = parseInt(iframe.width, 10) || 0;
            _this.height = parseInt(iframe.height, 10) || 0;
            _this.backgroundColor = _this.styles.backgroundColor;
            try {
                if (iframe.contentWindow &&
                    iframe.contentWindow.document &&
                    iframe.contentWindow.document.documentElement) {
                    _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
                    // http://www.w3.org/TR/css3-background/#special-backgrounds
                    var documentBackgroundColor = iframe.contentWindow.document.documentElement
                        ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor)
                        : COLORS.TRANSPARENT;
                    var bodyBackgroundColor = iframe.contentWindow.document.body
                        ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor)
                        : COLORS.TRANSPARENT;
                    _this.backgroundColor = isTransparent(documentBackgroundColor)
                        ? isTransparent(bodyBackgroundColor)
                            ? _this.styles.backgroundColor
                            : bodyBackgroundColor
                        : documentBackgroundColor;
                }
            }
            catch (e) { }
            return _this;
        }
        return IFrameElementContainer;
    }(ElementContainer));

    var LIST_OWNERS = ['OL', 'UL', 'MENU'];
    var parseNodeTree = function (context, node, parent, root) {
        for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
            nextNode = childNode.nextSibling;
            if (isTextNode(childNode) && childNode.data.trim().length > 0) {
                parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
            }
            else if (isElementNode(childNode)) {
                if (isSlotElement(childNode) && childNode.assignedNodes) {
                    childNode.assignedNodes().forEach(function (childNode) { return parseNodeTree(context, childNode, parent, root); });
                }
                else {
                    var container = createContainer(context, childNode);
                    if (container.styles.isVisible()) {
                        if (createsRealStackingContext(childNode, container, root)) {
                            container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
                        }
                        else if (createsStackingContext(container.styles)) {
                            container.flags |= 2 /* CREATES_STACKING_CONTEXT */;
                        }
                        if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                            container.flags |= 8 /* IS_LIST_OWNER */;
                        }
                        parent.elements.push(container);
                        childNode.slot;
                        if (childNode.shadowRoot) {
                            parseNodeTree(context, childNode.shadowRoot, container, root);
                        }
                        else if (!isTextareaElement(childNode) &&
                            !isSVGElement(childNode) &&
                            !isSelectElement(childNode)) {
                            parseNodeTree(context, childNode, container, root);
                        }
                    }
                }
            }
        }
    };
    var createContainer = function (context, element) {
        if (isImageElement(element)) {
            return new ImageElementContainer(context, element);
        }
        if (isCanvasElement(element)) {
            return new CanvasElementContainer(context, element);
        }
        if (isSVGElement(element)) {
            return new SVGElementContainer(context, element);
        }
        if (isLIElement(element)) {
            return new LIElementContainer(context, element);
        }
        if (isOLElement(element)) {
            return new OLElementContainer(context, element);
        }
        if (isInputElement(element)) {
            return new InputElementContainer(context, element);
        }
        if (isSelectElement(element)) {
            return new SelectElementContainer(context, element);
        }
        if (isTextareaElement(element)) {
            return new TextareaElementContainer(context, element);
        }
        if (isIFrameElement(element)) {
            return new IFrameElementContainer(context, element);
        }
        return new ElementContainer(context, element);
    };
    var parseTree = function (context, element) {
        var container = createContainer(context, element);
        container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
        parseNodeTree(context, element, container, container);
        return container;
    };
    var createsRealStackingContext = function (node, container, root) {
        return (container.styles.isPositionedWithZIndex() ||
            container.styles.opacity < 1 ||
            container.styles.isTransformed() ||
            (isBodyElement(node) && root.styles.isTransparent()));
    };
    var createsStackingContext = function (styles) { return styles.isPositioned() || styles.isFloating(); };
    var isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
    var isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
    var isHTMLElementNode = function (node) {
        return isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
    };
    var isSVGElementNode = function (element) {
        return typeof element.className === 'object';
    };
    var isLIElement = function (node) { return node.tagName === 'LI'; };
    var isOLElement = function (node) { return node.tagName === 'OL'; };
    var isInputElement = function (node) { return node.tagName === 'INPUT'; };
    var isHTMLElement = function (node) { return node.tagName === 'HTML'; };
    var isSVGElement = function (node) { return node.tagName === 'svg'; };
    var isBodyElement = function (node) { return node.tagName === 'BODY'; };
    var isCanvasElement = function (node) { return node.tagName === 'CANVAS'; };
    var isVideoElement = function (node) { return node.tagName === 'VIDEO'; };
    var isImageElement = function (node) { return node.tagName === 'IMG'; };
    var isIFrameElement = function (node) { return node.tagName === 'IFRAME'; };
    var isStyleElement = function (node) { return node.tagName === 'STYLE'; };
    var isScriptElement = function (node) { return node.tagName === 'SCRIPT'; };
    var isTextareaElement = function (node) { return node.tagName === 'TEXTAREA'; };
    var isSelectElement = function (node) { return node.tagName === 'SELECT'; };
    var isSlotElement = function (node) { return node.tagName === 'SLOT'; };
    // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
    var isCustomElement = function (node) { return node.tagName.indexOf('-') > 0; };

    var CounterState = /** @class */ (function () {
        function CounterState() {
            this.counters = {};
        }
        CounterState.prototype.getCounterValue = function (name) {
            var counter = this.counters[name];
            if (counter && counter.length) {
                return counter[counter.length - 1];
            }
            return 1;
        };
        CounterState.prototype.getCounterValues = function (name) {
            var counter = this.counters[name];
            return counter ? counter : [];
        };
        CounterState.prototype.pop = function (counters) {
            var _this = this;
            counters.forEach(function (counter) { return _this.counters[counter].pop(); });
        };
        CounterState.prototype.parse = function (style) {
            var _this = this;
            var counterIncrement = style.counterIncrement;
            var counterReset = style.counterReset;
            var canReset = true;
            if (counterIncrement !== null) {
                counterIncrement.forEach(function (entry) {
                    var counter = _this.counters[entry.counter];
                    if (counter && entry.increment !== 0) {
                        canReset = false;
                        if (!counter.length) {
                            counter.push(1);
                        }
                        counter[Math.max(0, counter.length - 1)] += entry.increment;
                    }
                });
            }
            var counterNames = [];
            if (canReset) {
                counterReset.forEach(function (entry) {
                    var counter = _this.counters[entry.counter];
                    counterNames.push(entry.counter);
                    if (!counter) {
                        counter = _this.counters[entry.counter] = [];
                    }
                    counter.push(entry.reset);
                });
            }
            return counterNames;
        };
        return CounterState;
    }());
    var ROMAN_UPPER = {
        integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    };
    var ARMENIAN = {
        integers: [
            9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70,
            60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ],
        values: [
            'Ք',
            'Փ',
            'Ւ',
            'Ց',
            'Ր',
            'Տ',
            'Վ',
            'Ս',
            'Ռ',
            'Ջ',
            'Պ',
            'Չ',
            'Ո',
            'Շ',
            'Ն',
            'Յ',
            'Մ',
            'Ճ',
            'Ղ',
            'Ձ',
            'Հ',
            'Կ',
            'Ծ',
            'Խ',
            'Լ',
            'Ի',
            'Ժ',
            'Թ',
            'Ը',
            'Է',
            'Զ',
            'Ե',
            'Դ',
            'Գ',
            'Բ',
            'Ա'
        ]
    };
    var HEBREW = {
        integers: [
            10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20,
            19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ],
        values: [
            'י׳',
            'ט׳',
            'ח׳',
            'ז׳',
            'ו׳',
            'ה׳',
            'ד׳',
            'ג׳',
            'ב׳',
            'א׳',
            'ת',
            'ש',
            'ר',
            'ק',
            'צ',
            'פ',
            'ע',
            'ס',
            'נ',
            'מ',
            'ל',
            'כ',
            'יט',
            'יח',
            'יז',
            'טז',
            'טו',
            'י',
            'ט',
            'ח',
            'ז',
            'ו',
            'ה',
            'ד',
            'ג',
            'ב',
            'א'
        ]
    };
    var GEORGIAN = {
        integers: [
            10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90,
            80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ],
        values: [
            'ჵ',
            'ჰ',
            'ჯ',
            'ჴ',
            'ხ',
            'ჭ',
            'წ',
            'ძ',
            'ც',
            'ჩ',
            'შ',
            'ყ',
            'ღ',
            'ქ',
            'ფ',
            'ჳ',
            'ტ',
            'ს',
            'რ',
            'ჟ',
            'პ',
            'ო',
            'ჲ',
            'ნ',
            'მ',
            'ლ',
            'კ',
            'ი',
            'თ',
            'ჱ',
            'ზ',
            'ვ',
            'ე',
            'დ',
            'გ',
            'ბ',
            'ა'
        ]
    };
    var createAdditiveCounter = function (value, min, max, symbols, fallback, suffix) {
        if (value < min || value > max) {
            return createCounterText(value, fallback, suffix.length > 0);
        }
        return (symbols.integers.reduce(function (string, integer, index) {
            while (value >= integer) {
                value -= integer;
                string += symbols.values[index];
            }
            return string;
        }, '') + suffix);
    };
    var createCounterStyleWithSymbolResolver = function (value, codePointRangeLength, isNumeric, resolver) {
        var string = '';
        do {
            if (!isNumeric) {
                value--;
            }
            string = resolver(value) + string;
            value /= codePointRangeLength;
        } while (value * codePointRangeLength >= codePointRangeLength);
        return string;
    };
    var createCounterStyleFromRange = function (value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
        var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
        return ((value < 0 ? '-' : '') +
            (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
                return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
            }) +
                suffix));
    };
    var createCounterStyleFromSymbols = function (value, symbols, suffix) {
        if (suffix === void 0) { suffix = '. '; }
        var codePointRangeLength = symbols.length;
        return (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) { return symbols[Math.floor(codePoint % codePointRangeLength)]; }) + suffix);
    };
    var CJK_ZEROS = 1 << 0;
    var CJK_TEN_COEFFICIENTS = 1 << 1;
    var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
    var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
    var createCJKCounter = function (value, numbers, multipliers, negativeSign, suffix, flags) {
        if (value < -9999 || value > 9999) {
            return createCounterText(value, 4 /* CJK_DECIMAL */, suffix.length > 0);
        }
        var tmp = Math.abs(value);
        var string = suffix;
        if (tmp === 0) {
            return numbers[0] + string;
        }
        for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
            var coefficient = tmp % 10;
            if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== '') {
                string = numbers[coefficient] + string;
            }
            else if (coefficient > 1 ||
                (coefficient === 1 && digit === 0) ||
                (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS)) ||
                (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100) ||
                (coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS))) {
                string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
            }
            else if (coefficient === 1 && digit > 0) {
                string = multipliers[digit - 1] + string;
            }
            tmp = Math.floor(tmp / 10);
        }
        return (value < 0 ? negativeSign : '') + string;
    };
    var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
    var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
    var JAPANESE_NEGATIVE = 'マイナス';
    var KOREAN_NEGATIVE = '마이너스';
    var createCounterText = function (value, type, appendSuffix) {
        var defaultSuffix = appendSuffix ? '. ' : '';
        var cjkSuffix = appendSuffix ? '、' : '';
        var koreanSuffix = appendSuffix ? ', ' : '';
        var spaceSuffix = appendSuffix ? ' ' : '';
        switch (type) {
            case 0 /* DISC */:
                return '•' + spaceSuffix;
            case 1 /* CIRCLE */:
                return '◦' + spaceSuffix;
            case 2 /* SQUARE */:
                return '◾' + spaceSuffix;
            case 5 /* DECIMAL_LEADING_ZERO */:
                var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
                return string.length < 4 ? "0" + string : string;
            case 4 /* CJK_DECIMAL */:
                return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
            case 6 /* LOWER_ROMAN */:
                return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
            case 7 /* UPPER_ROMAN */:
                return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix);
            case 8 /* LOWER_GREEK */:
                return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
            case 9 /* LOWER_ALPHA */:
                return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
            case 10 /* UPPER_ALPHA */:
                return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
            case 11 /* ARABIC_INDIC */:
                return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
            case 12 /* ARMENIAN */:
            case 49 /* UPPER_ARMENIAN */:
                return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix);
            case 35 /* LOWER_ARMENIAN */:
                return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
            case 13 /* BENGALI */:
                return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
            case 14 /* CAMBODIAN */:
            case 30 /* KHMER */:
                return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
            case 15 /* CJK_EARTHLY_BRANCH */:
                return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
            case 16 /* CJK_HEAVENLY_STEM */:
                return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
            case 17 /* CJK_IDEOGRAPHIC */:
            case 48 /* TRAD_CHINESE_INFORMAL */:
                return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 47 /* TRAD_CHINESE_FORMAL */:
                return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 42 /* SIMP_CHINESE_INFORMAL */:
                return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 41 /* SIMP_CHINESE_FORMAL */:
                return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 26 /* JAPANESE_INFORMAL */:
                return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
            case 25 /* JAPANESE_FORMAL */:
                return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 31 /* KOREAN_HANGUL_FORMAL */:
                return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 33 /* KOREAN_HANJA_INFORMAL */:
                return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
            case 32 /* KOREAN_HANJA_FORMAL */:
                return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 18 /* DEVANAGARI */:
                return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
            case 20 /* GEORGIAN */:
                return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3 /* DECIMAL */, defaultSuffix);
            case 21 /* GUJARATI */:
                return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
            case 22 /* GURMUKHI */:
                return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
            case 22 /* HEBREW */:
                return createAdditiveCounter(value, 1, 10999, HEBREW, 3 /* DECIMAL */, defaultSuffix);
            case 23 /* HIRAGANA */:
                return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
            case 24 /* HIRAGANA_IROHA */:
                return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
            case 27 /* KANNADA */:
                return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
            case 28 /* KATAKANA */:
                return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
            case 29 /* KATAKANA_IROHA */:
                return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
            case 34 /* LAO */:
                return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
            case 37 /* MONGOLIAN */:
                return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
            case 38 /* MYANMAR */:
                return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
            case 39 /* ORIYA */:
                return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
            case 40 /* PERSIAN */:
                return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
            case 43 /* TAMIL */:
                return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
            case 44 /* TELUGU */:
                return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
            case 45 /* THAI */:
                return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
            case 46 /* TIBETAN */:
                return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
            case 3 /* DECIMAL */:
            default:
                return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
        }
    };

    var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
    var DocumentCloner = /** @class */ (function () {
        function DocumentCloner(context, element, options) {
            this.context = context;
            this.options = options;
            this.scrolledElements = [];
            this.referenceElement = element;
            this.counters = new CounterState();
            this.quoteDepth = 0;
            if (!element.ownerDocument) {
                throw new Error('Cloned element does not have an owner document');
            }
            this.documentElement = this.cloneNode(element.ownerDocument.documentElement, false);
        }
        DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
            var _this = this;
            var iframe = createIFrameContainer(ownerDocument, windowSize);
            if (!iframe.contentWindow) {
                return Promise.reject("Unable to find iframe window");
            }
            var scrollX = ownerDocument.defaultView.pageXOffset;
            var scrollY = ownerDocument.defaultView.pageYOffset;
            var cloneWindow = iframe.contentWindow;
            var documentClone = cloneWindow.document;
            /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
             if window url is about:blank, we can assign the url to current by writing onto the document
             */
            var iframeLoad = iframeLoader(iframe).then(function () { return __awaiter(_this, void 0, void 0, function () {
                var onclone, referenceElement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.scrolledElements.forEach(restoreNodeScroll);
                            if (cloneWindow) {
                                cloneWindow.scrollTo(windowSize.left, windowSize.top);
                                if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                                    (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                                    this.context.logger.warn('Unable to restore scroll position for cloned document');
                                    this.context.windowBounds = this.context.windowBounds.add(cloneWindow.scrollX - windowSize.left, cloneWindow.scrollY - windowSize.top, 0, 0);
                                }
                            }
                            onclone = this.options.onclone;
                            referenceElement = this.clonedReferenceElement;
                            if (typeof referenceElement === 'undefined') {
                                return [2 /*return*/, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                            }
                            if (!(documentClone.fonts && documentClone.fonts.ready)) return [3 /*break*/, 2];
                            return [4 /*yield*/, documentClone.fonts.ready];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!/(AppleWebKit)/g.test(navigator.userAgent)) return [3 /*break*/, 4];
                            return [4 /*yield*/, imagesReady(documentClone)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (typeof onclone === 'function') {
                                return [2 /*return*/, Promise.resolve()
                                        .then(function () { return onclone(documentClone, referenceElement); })
                                        .then(function () { return iframe; })];
                            }
                            return [2 /*return*/, iframe];
                    }
                });
            }); });
            documentClone.open();
            documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
            // Chrome scrolls the parent document for some reason after the write to the cloned window???
            restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
            documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
            documentClone.close();
            return iframeLoad;
        };
        DocumentCloner.prototype.createElementClone = function (node) {
            if (isDebugging(node, 2 /* CLONE */)) {
                debugger;
            }
            if (isCanvasElement(node)) {
                return this.createCanvasClone(node);
            }
            if (isVideoElement(node)) {
                return this.createVideoClone(node);
            }
            if (isStyleElement(node)) {
                return this.createStyleClone(node);
            }
            var clone = node.cloneNode(false);
            if (isImageElement(clone)) {
                if (isImageElement(node) && node.currentSrc && node.currentSrc !== node.src) {
                    clone.src = node.currentSrc;
                    clone.srcset = '';
                }
                if (clone.loading === 'lazy') {
                    clone.loading = 'eager';
                }
            }
            if (isCustomElement(clone)) {
                return this.createCustomElementClone(clone);
            }
            return clone;
        };
        DocumentCloner.prototype.createCustomElementClone = function (node) {
            var clone = document.createElement('html2canvascustomelement');
            copyCSSStyles(node.style, clone);
            return clone;
        };
        DocumentCloner.prototype.createStyleClone = function (node) {
            try {
                var sheet = node.sheet;
                if (sheet && sheet.cssRules) {
                    var css = [].slice.call(sheet.cssRules, 0).reduce(function (css, rule) {
                        if (rule && typeof rule.cssText === 'string') {
                            return css + rule.cssText;
                        }
                        return css;
                    }, '');
                    var style = node.cloneNode(false);
                    style.textContent = css;
                    return style;
                }
            }
            catch (e) {
                // accessing node.sheet.cssRules throws a DOMException
                this.context.logger.error('Unable to access cssRules property', e);
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
            return node.cloneNode(false);
        };
        DocumentCloner.prototype.createCanvasClone = function (canvas) {
            var _a;
            if (this.options.inlineImages && canvas.ownerDocument) {
                var img = canvas.ownerDocument.createElement('img');
                try {
                    img.src = canvas.toDataURL();
                    return img;
                }
                catch (e) {
                    this.context.logger.info("Unable to inline canvas contents, canvas is tainted", canvas);
                }
            }
            var clonedCanvas = canvas.cloneNode(false);
            try {
                clonedCanvas.width = canvas.width;
                clonedCanvas.height = canvas.height;
                var ctx = canvas.getContext('2d');
                var clonedCtx = clonedCanvas.getContext('2d');
                if (clonedCtx) {
                    if (!this.options.allowTaint && ctx) {
                        clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                    }
                    else {
                        var gl = (_a = canvas.getContext('webgl2')) !== null && _a !== void 0 ? _a : canvas.getContext('webgl');
                        if (gl) {
                            var attribs = gl.getContextAttributes();
                            if ((attribs === null || attribs === void 0 ? void 0 : attribs.preserveDrawingBuffer) === false) {
                                this.context.logger.warn('Unable to clone WebGL context as it has preserveDrawingBuffer=false', canvas);
                            }
                        }
                        clonedCtx.drawImage(canvas, 0, 0);
                    }
                }
                return clonedCanvas;
            }
            catch (e) {
                this.context.logger.info("Unable to clone canvas as it is tainted", canvas);
            }
            return clonedCanvas;
        };
        DocumentCloner.prototype.createVideoClone = function (video) {
            var canvas = video.ownerDocument.createElement('canvas');
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
            var ctx = canvas.getContext('2d');
            try {
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    if (!this.options.allowTaint) {
                        ctx.getImageData(0, 0, canvas.width, canvas.height);
                    }
                }
                return canvas;
            }
            catch (e) {
                this.context.logger.info("Unable to clone video as it is tainted", video);
            }
            var blankCanvas = video.ownerDocument.createElement('canvas');
            blankCanvas.width = video.offsetWidth;
            blankCanvas.height = video.offsetHeight;
            return blankCanvas;
        };
        DocumentCloner.prototype.appendChildNode = function (clone, child, copyStyles) {
            if (!isElementNode(child) ||
                (!isScriptElement(child) &&
                    !child.hasAttribute(IGNORE_ATTRIBUTE) &&
                    (typeof this.options.ignoreElements !== 'function' || !this.options.ignoreElements(child)))) {
                if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                    clone.appendChild(this.cloneNode(child, copyStyles));
                }
            }
        };
        DocumentCloner.prototype.cloneChildNodes = function (node, clone, copyStyles) {
            var _this = this;
            for (var child = node.shadowRoot ? node.shadowRoot.firstChild : node.firstChild; child; child = child.nextSibling) {
                if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === 'function') {
                    var assignedNodes = child.assignedNodes();
                    if (assignedNodes.length) {
                        assignedNodes.forEach(function (assignedNode) { return _this.appendChildNode(clone, assignedNode, copyStyles); });
                    }
                }
                else {
                    this.appendChildNode(clone, child, copyStyles);
                }
            }
        };
        DocumentCloner.prototype.cloneNode = function (node, copyStyles) {
            if (isTextNode(node)) {
                return document.createTextNode(node.data);
            }
            if (!node.ownerDocument) {
                return node.cloneNode(false);
            }
            var window = node.ownerDocument.defaultView;
            if (window && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
                var clone = this.createElementClone(node);
                clone.style.transitionProperty = 'none';
                var style = window.getComputedStyle(node);
                var styleBefore = window.getComputedStyle(node, ':before');
                var styleAfter = window.getComputedStyle(node, ':after');
                if (this.referenceElement === node && isHTMLElementNode(clone)) {
                    this.clonedReferenceElement = clone;
                }
                if (isBodyElement(clone)) {
                    createPseudoHideStyles(clone);
                }
                var counters = this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
                var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
                if (isCustomElement(node)) {
                    copyStyles = true;
                }
                if (!isVideoElement(node)) {
                    this.cloneChildNodes(node, clone, copyStyles);
                }
                if (before) {
                    clone.insertBefore(before, clone.firstChild);
                }
                var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
                if (after) {
                    clone.appendChild(after);
                }
                this.counters.pop(counters);
                if ((style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) ||
                    copyStyles) {
                    copyCSSStyles(style, clone);
                }
                if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                    this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
                }
                if ((isTextareaElement(node) || isSelectElement(node)) &&
                    (isTextareaElement(clone) || isSelectElement(clone))) {
                    clone.value = node.value;
                }
                return clone;
            }
            return node.cloneNode(false);
        };
        DocumentCloner.prototype.resolvePseudoContent = function (node, clone, style, pseudoElt) {
            var _this = this;
            if (!style) {
                return;
            }
            var value = style.content;
            var document = clone.ownerDocument;
            if (!document || !value || value === 'none' || value === '-moz-alt-content' || style.display === 'none') {
                return;
            }
            this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
            var declaration = new CSSParsedPseudoDeclaration(this.context, style);
            var anonymousReplacedElement = document.createElement('html2canvaspseudoelement');
            copyCSSStyles(style, anonymousReplacedElement);
            declaration.content.forEach(function (token) {
                if (token.type === 0 /* STRING_TOKEN */) {
                    anonymousReplacedElement.appendChild(document.createTextNode(token.value));
                }
                else if (token.type === 22 /* URL_TOKEN */) {
                    var img = document.createElement('img');
                    img.src = token.value;
                    img.style.opacity = '1';
                    anonymousReplacedElement.appendChild(img);
                }
                else if (token.type === 18 /* FUNCTION */) {
                    if (token.name === 'attr') {
                        var attr = token.values.filter(isIdentToken);
                        if (attr.length) {
                            anonymousReplacedElement.appendChild(document.createTextNode(node.getAttribute(attr[0].value) || ''));
                        }
                    }
                    else if (token.name === 'counter') {
                        var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
                        if (counter && isIdentToken(counter)) {
                            var counterState = _this.counters.getCounterValue(counter.value);
                            var counterType = counterStyle && isIdentToken(counterStyle)
                                ? listStyleType.parse(_this.context, counterStyle.value)
                                : 3 /* DECIMAL */;
                            anonymousReplacedElement.appendChild(document.createTextNode(createCounterText(counterState, counterType, false)));
                        }
                    }
                    else if (token.name === 'counters') {
                        var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
                        if (counter && isIdentToken(counter)) {
                            var counterStates = _this.counters.getCounterValues(counter.value);
                            var counterType_1 = counterStyle && isIdentToken(counterStyle)
                                ? listStyleType.parse(_this.context, counterStyle.value)
                                : 3 /* DECIMAL */;
                            var separator = delim && delim.type === 0 /* STRING_TOKEN */ ? delim.value : '';
                            var text = counterStates
                                .map(function (value) { return createCounterText(value, counterType_1, false); })
                                .join(separator);
                            anonymousReplacedElement.appendChild(document.createTextNode(text));
                        }
                    }
                    else ;
                }
                else if (token.type === 20 /* IDENT_TOKEN */) {
                    switch (token.value) {
                        case 'open-quote':
                            anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
                            break;
                        case 'close-quote':
                            anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
                            break;
                        default:
                            // safari doesn't parse string tokens correctly because of lack of quotes
                            anonymousReplacedElement.appendChild(document.createTextNode(token.value));
                    }
                }
            });
            anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
            var newClassName = pseudoElt === PseudoElementType.BEFORE
                ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE
                : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
            if (isSVGElementNode(clone)) {
                clone.className.baseValue += newClassName;
            }
            else {
                clone.className += newClassName;
            }
            return anonymousReplacedElement;
        };
        DocumentCloner.destroy = function (container) {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
                return true;
            }
            return false;
        };
        return DocumentCloner;
    }());
    var PseudoElementType;
    (function (PseudoElementType) {
        PseudoElementType[PseudoElementType["BEFORE"] = 0] = "BEFORE";
        PseudoElementType[PseudoElementType["AFTER"] = 1] = "AFTER";
    })(PseudoElementType || (PseudoElementType = {}));
    var createIFrameContainer = function (ownerDocument, bounds) {
        var cloneIframeContainer = ownerDocument.createElement('iframe');
        cloneIframeContainer.className = 'html2canvas-container';
        cloneIframeContainer.style.visibility = 'hidden';
        cloneIframeContainer.style.position = 'fixed';
        cloneIframeContainer.style.left = '-10000px';
        cloneIframeContainer.style.top = '0px';
        cloneIframeContainer.style.border = '0';
        cloneIframeContainer.width = bounds.width.toString();
        cloneIframeContainer.height = bounds.height.toString();
        cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
        cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
        ownerDocument.body.appendChild(cloneIframeContainer);
        return cloneIframeContainer;
    };
    var imageReady = function (img) {
        return new Promise(function (resolve) {
            if (img.complete) {
                resolve();
                return;
            }
            if (!img.src) {
                resolve();
                return;
            }
            img.onload = resolve;
            img.onerror = resolve;
        });
    };
    var imagesReady = function (document) {
        return Promise.all([].slice.call(document.images, 0).map(imageReady));
    };
    var iframeLoader = function (iframe) {
        return new Promise(function (resolve, reject) {
            var cloneWindow = iframe.contentWindow;
            if (!cloneWindow) {
                return reject("No window assigned for iframe");
            }
            var documentClone = cloneWindow.document;
            cloneWindow.onload = iframe.onload = function () {
                cloneWindow.onload = iframe.onload = null;
                var interval = setInterval(function () {
                    if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
                        clearInterval(interval);
                        resolve(iframe);
                    }
                }, 50);
            };
        });
    };
    var ignoredStyleProperties = [
        'all',
        'd',
        'content' // Safari shows pseudoelements if content is set
    ];
    var copyCSSStyles = function (style, target) {
        // Edge does not provide value for cssText
        for (var i = style.length - 1; i >= 0; i--) {
            var property = style.item(i);
            if (ignoredStyleProperties.indexOf(property) === -1) {
                target.style.setProperty(property, style.getPropertyValue(property));
            }
        }
        return target;
    };
    var serializeDoctype = function (doctype) {
        var str = '';
        if (doctype) {
            str += '<!DOCTYPE ';
            if (doctype.name) {
                str += doctype.name;
            }
            if (doctype.internalSubset) {
                str += doctype.internalSubset;
            }
            if (doctype.publicId) {
                str += "\"" + doctype.publicId + "\"";
            }
            if (doctype.systemId) {
                str += "\"" + doctype.systemId + "\"";
            }
            str += '>';
        }
        return str;
    };
    var restoreOwnerScroll = function (ownerDocument, x, y) {
        if (ownerDocument &&
            ownerDocument.defaultView &&
            (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
            ownerDocument.defaultView.scrollTo(x, y);
        }
    };
    var restoreNodeScroll = function (_a) {
        var element = _a[0], x = _a[1], y = _a[2];
        element.scrollLeft = x;
        element.scrollTop = y;
    };
    var PSEUDO_BEFORE = ':before';
    var PSEUDO_AFTER = ':after';
    var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
    var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
    var PSEUDO_HIDE_ELEMENT_STYLE = "{\n    content: \"\" !important;\n    display: none !important;\n}";
    var createPseudoHideStyles = function (body) {
        createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
    };
    var createStyles = function (body, styles) {
        var document = body.ownerDocument;
        if (document) {
            var style = document.createElement('style');
            style.textContent = styles;
            body.appendChild(style);
        }
    };

    var CacheStorage = /** @class */ (function () {
        function CacheStorage() {
        }
        CacheStorage.getOrigin = function (url) {
            var link = CacheStorage._link;
            if (!link) {
                return 'about:blank';
            }
            link.href = url;
            link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
            return link.protocol + link.hostname + link.port;
        };
        CacheStorage.isSameOrigin = function (src) {
            return CacheStorage.getOrigin(src) === CacheStorage._origin;
        };
        CacheStorage.setContext = function (window) {
            CacheStorage._link = window.document.createElement('a');
            CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
        };
        CacheStorage._origin = 'about:blank';
        return CacheStorage;
    }());
    var Cache = /** @class */ (function () {
        function Cache(context, _options) {
            this.context = context;
            this._options = _options;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._cache = {};
        }
        Cache.prototype.addImage = function (src) {
            var result = Promise.resolve();
            if (this.has(src)) {
                return result;
            }
            if (isBlobImage(src) || isRenderable(src)) {
                (this._cache[src] = this.loadImage(src)).catch(function () {
                    // prevent unhandled rejection
                });
                return result;
            }
            return result;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cache.prototype.match = function (src) {
            return this._cache[src];
        };
        Cache.prototype.loadImage = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var isSameOrigin, useCORS, useProxy, src;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isSameOrigin = CacheStorage.isSameOrigin(key);
                            useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                            useProxy = !isInlineImage(key) &&
                                !isSameOrigin &&
                                !isBlobImage(key) &&
                                typeof this._options.proxy === 'string' &&
                                FEATURES.SUPPORT_CORS_XHR &&
                                !useCORS;
                            if (!isSameOrigin &&
                                this._options.allowTaint === false &&
                                !isInlineImage(key) &&
                                !isBlobImage(key) &&
                                !useProxy &&
                                !useCORS) {
                                return [2 /*return*/];
                            }
                            src = key;
                            if (!useProxy) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.proxy(src)];
                        case 1:
                            src = _a.sent();
                            _a.label = 2;
                        case 2:
                            this.context.logger.debug("Added image " + key.substring(0, 256));
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var img = new Image();
                                    img.onload = function () { return resolve(img); };
                                    img.onerror = reject;
                                    //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                                    if (isInlineBase64Image(src) || useCORS) {
                                        img.crossOrigin = 'anonymous';
                                    }
                                    img.src = src;
                                    if (img.complete === true) {
                                        // Inline XML images may fail to parse, throwing an Error later on
                                        setTimeout(function () { return resolve(img); }, 500);
                                    }
                                    if (_this._options.imageTimeout > 0) {
                                        setTimeout(function () { return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image"); }, _this._options.imageTimeout);
                                    }
                                })];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Cache.prototype.has = function (key) {
            return typeof this._cache[key] !== 'undefined';
        };
        Cache.prototype.keys = function () {
            return Promise.resolve(Object.keys(this._cache));
        };
        Cache.prototype.proxy = function (src) {
            var _this = this;
            var proxy = this._options.proxy;
            if (!proxy) {
                throw new Error('No proxy defined');
            }
            var key = src.substring(0, 256);
            return new Promise(function (resolve, reject) {
                var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        if (responseType === 'text') {
                            resolve(xhr.response);
                        }
                        else {
                            var reader_1 = new FileReader();
                            reader_1.addEventListener('load', function () { return resolve(reader_1.result); }, false);
                            reader_1.addEventListener('error', function (e) { return reject(e); }, false);
                            reader_1.readAsDataURL(xhr.response);
                        }
                    }
                    else {
                        reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                    }
                };
                xhr.onerror = reject;
                var queryString = proxy.indexOf('?') > -1 ? '&' : '?';
                xhr.open('GET', "" + proxy + queryString + "url=" + encodeURIComponent(src) + "&responseType=" + responseType);
                if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                    xhr.responseType = responseType;
                }
                if (_this._options.imageTimeout) {
                    var timeout_1 = _this._options.imageTimeout;
                    xhr.timeout = timeout_1;
                    xhr.ontimeout = function () { return reject("Timed out (" + timeout_1 + "ms) proxying " + key); };
                }
                xhr.send();
            });
        };
        return Cache;
    }());
    var INLINE_SVG = /^data:image\/svg\+xml/i;
    var INLINE_BASE64 = /^data:image\/.*;base64,/i;
    var INLINE_IMG = /^data:image\/.*/i;
    var isRenderable = function (src) { return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src); };
    var isInlineImage = function (src) { return INLINE_IMG.test(src); };
    var isInlineBase64Image = function (src) { return INLINE_BASE64.test(src); };
    var isBlobImage = function (src) { return src.substr(0, 4) === 'blob'; };
    var isSVG = function (src) { return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src); };

    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            this.type = 0 /* VECTOR */;
            this.x = x;
            this.y = y;
        }
        Vector.prototype.add = function (deltaX, deltaY) {
            return new Vector(this.x + deltaX, this.y + deltaY);
        };
        return Vector;
    }());

    var lerp = function (a, b, t) {
        return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    };
    var BezierCurve = /** @class */ (function () {
        function BezierCurve(start, startControl, endControl, end) {
            this.type = 1 /* BEZIER_CURVE */;
            this.start = start;
            this.startControl = startControl;
            this.endControl = endControl;
            this.end = end;
        }
        BezierCurve.prototype.subdivide = function (t, firstHalf) {
            var ab = lerp(this.start, this.startControl, t);
            var bc = lerp(this.startControl, this.endControl, t);
            var cd = lerp(this.endControl, this.end, t);
            var abbc = lerp(ab, bc, t);
            var bccd = lerp(bc, cd, t);
            var dest = lerp(abbc, bccd, t);
            return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
        };
        BezierCurve.prototype.add = function (deltaX, deltaY) {
            return new BezierCurve(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
        };
        BezierCurve.prototype.reverse = function () {
            return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
        };
        return BezierCurve;
    }());
    var isBezierCurve = function (path) { return path.type === 1 /* BEZIER_CURVE */; };

    var BoundCurves = /** @class */ (function () {
        function BoundCurves(element) {
            var styles = element.styles;
            var bounds = element.bounds;
            var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
            var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
            var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
            var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
            var factors = [];
            factors.push((tlh + trh) / bounds.width);
            factors.push((blh + brh) / bounds.width);
            factors.push((tlv + blv) / bounds.height);
            factors.push((trv + brv) / bounds.height);
            var maxFactor = Math.max.apply(Math, factors);
            if (maxFactor > 1) {
                tlh /= maxFactor;
                tlv /= maxFactor;
                trh /= maxFactor;
                trv /= maxFactor;
                brh /= maxFactor;
                brv /= maxFactor;
                blh /= maxFactor;
                blv /= maxFactor;
            }
            var topWidth = bounds.width - trh;
            var rightHeight = bounds.height - brv;
            var bottomWidth = bounds.width - brh;
            var leftHeight = bounds.height - blv;
            var borderTopWidth = styles.borderTopWidth;
            var borderRightWidth = styles.borderRightWidth;
            var borderBottomWidth = styles.borderBottomWidth;
            var borderLeftWidth = styles.borderLeftWidth;
            var paddingTop = getAbsoluteValue(styles.paddingTop, element.bounds.width);
            var paddingRight = getAbsoluteValue(styles.paddingRight, element.bounds.width);
            var paddingBottom = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
            var paddingLeft = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
            this.topLeftBorderDoubleOuterBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3, tlh - borderLeftWidth / 3, tlv - borderTopWidth / 3, CORNER.TOP_LEFT)
                    : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3);
            this.topRightBorderDoubleOuterBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 3, trh - borderRightWidth / 3, trv - borderTopWidth / 3, CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + borderTopWidth / 3);
            this.bottomRightBorderDoubleOuterBox =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 3, brv - borderBottomWidth / 3, CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
            this.bottomLeftBorderDoubleOuterBox =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + leftHeight, blh - borderLeftWidth / 3, blv - borderBottomWidth / 3, CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
            this.topLeftBorderDoubleInnerBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3, tlh - (borderLeftWidth * 2) / 3, tlv - (borderTopWidth * 2) / 3, CORNER.TOP_LEFT)
                    : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
            this.topRightBorderDoubleInnerBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + topWidth, bounds.top + (borderTopWidth * 2) / 3, trh - (borderRightWidth * 2) / 3, trv - (borderTopWidth * 2) / 3, CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
            this.bottomRightBorderDoubleInnerBox =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - (borderRightWidth * 2) / 3, brv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
            this.bottomLeftBorderDoubleInnerBox =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + leftHeight, blh - (borderLeftWidth * 2) / 3, blv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
            this.topLeftBorderStroke =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2, tlh - borderLeftWidth / 2, tlv - borderTopWidth / 2, CORNER.TOP_LEFT)
                    : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2);
            this.topRightBorderStroke =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 2, trh - borderRightWidth / 2, trv - borderTopWidth / 2, CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + borderTopWidth / 2);
            this.bottomRightBorderStroke =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 2, brv - borderBottomWidth / 2, CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
            this.bottomLeftBorderStroke =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + leftHeight, blh - borderLeftWidth / 2, blv - borderBottomWidth / 2, CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
            this.topLeftBorderBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT)
                    : new Vector(bounds.left, bounds.top);
            this.topRightBorderBox =
                trh > 0 || trv > 0
                    ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width, bounds.top);
            this.bottomRightBorderBox =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
            this.bottomLeftBorderBox =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left, bounds.top + bounds.height);
            this.topLeftPaddingBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + borderTopWidth, Math.max(0, tlh - borderLeftWidth), Math.max(0, tlv - borderTopWidth), CORNER.TOP_LEFT)
                    : new Vector(bounds.left + borderLeftWidth, bounds.top + borderTopWidth);
            this.topRightPaddingBox =
                trh > 0 || trv > 0
                    ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth), bounds.top + borderTopWidth, topWidth > bounds.width + borderRightWidth ? 0 : Math.max(0, trh - borderRightWidth), Math.max(0, trv - borderTopWidth), CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + borderTopWidth);
            this.bottomRightPaddingBox =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth), Math.max(0, brh - borderRightWidth), Math.max(0, brv - borderBottomWidth), CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + bounds.height - borderBottomWidth);
            this.bottomLeftPaddingBox =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth), Math.max(0, blh - borderLeftWidth), Math.max(0, blv - borderBottomWidth), CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left + borderLeftWidth, bounds.top + bounds.height - borderBottomWidth);
            this.topLeftContentBox =
                tlh > 0 || tlv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop, Math.max(0, tlh - (borderLeftWidth + paddingLeft)), Math.max(0, tlv - (borderTopWidth + paddingTop)), CORNER.TOP_LEFT)
                    : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop);
            this.topRightContentBox =
                trh > 0 || trv > 0
                    ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth + paddingLeft), bounds.top + borderTopWidth + paddingTop, topWidth > bounds.width + borderLeftWidth + paddingLeft ? 0 : trh - borderLeftWidth + paddingLeft, trv - (borderTopWidth + paddingTop), CORNER.TOP_RIGHT)
                    : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + borderTopWidth + paddingTop);
            this.bottomRightContentBox =
                brh > 0 || brv > 0
                    ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth + paddingLeft)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth + paddingTop), Math.max(0, brh - (borderRightWidth + paddingRight)), brv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_RIGHT)
                    : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
            this.bottomLeftContentBox =
                blh > 0 || blv > 0
                    ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth + paddingLeft)), blv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_LEFT)
                    : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
        }
        return BoundCurves;
    }());
    var CORNER;
    (function (CORNER) {
        CORNER[CORNER["TOP_LEFT"] = 0] = "TOP_LEFT";
        CORNER[CORNER["TOP_RIGHT"] = 1] = "TOP_RIGHT";
        CORNER[CORNER["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
        CORNER[CORNER["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
    })(CORNER || (CORNER = {}));
    var getCurvePoints = function (x, y, r1, r2, position) {
        var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
        var ox = r1 * kappa; // control point offset horizontal
        var oy = r2 * kappa; // control point offset vertical
        var xm = x + r1; // x-middle
        var ym = y + r2; // y-middle
        switch (position) {
            case CORNER.TOP_LEFT:
                return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
            case CORNER.TOP_RIGHT:
                return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
            case CORNER.BOTTOM_RIGHT:
                return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
            case CORNER.BOTTOM_LEFT:
            default:
                return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
        }
    };
    var calculateBorderBoxPath = function (curves) {
        return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
    };
    var calculateContentBoxPath = function (curves) {
        return [
            curves.topLeftContentBox,
            curves.topRightContentBox,
            curves.bottomRightContentBox,
            curves.bottomLeftContentBox
        ];
    };
    var calculatePaddingBoxPath = function (curves) {
        return [
            curves.topLeftPaddingBox,
            curves.topRightPaddingBox,
            curves.bottomRightPaddingBox,
            curves.bottomLeftPaddingBox
        ];
    };

    var TransformEffect = /** @class */ (function () {
        function TransformEffect(offsetX, offsetY, matrix) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.matrix = matrix;
            this.type = 0 /* TRANSFORM */;
            this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
        }
        return TransformEffect;
    }());
    var ClipEffect = /** @class */ (function () {
        function ClipEffect(path, target) {
            this.path = path;
            this.target = target;
            this.type = 1 /* CLIP */;
        }
        return ClipEffect;
    }());
    var OpacityEffect = /** @class */ (function () {
        function OpacityEffect(opacity) {
            this.opacity = opacity;
            this.type = 2 /* OPACITY */;
            this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
        }
        return OpacityEffect;
    }());
    var isTransformEffect = function (effect) {
        return effect.type === 0 /* TRANSFORM */;
    };
    var isClipEffect = function (effect) { return effect.type === 1 /* CLIP */; };
    var isOpacityEffect = function (effect) { return effect.type === 2 /* OPACITY */; };

    var equalPath = function (a, b) {
        if (a.length === b.length) {
            return a.some(function (v, i) { return v === b[i]; });
        }
        return false;
    };
    var transformPath = function (path, deltaX, deltaY, deltaW, deltaH) {
        return path.map(function (point, index) {
            switch (index) {
                case 0:
                    return point.add(deltaX, deltaY);
                case 1:
                    return point.add(deltaX + deltaW, deltaY);
                case 2:
                    return point.add(deltaX + deltaW, deltaY + deltaH);
                case 3:
                    return point.add(deltaX, deltaY + deltaH);
            }
            return point;
        });
    };

    var StackingContext = /** @class */ (function () {
        function StackingContext(container) {
            this.element = container;
            this.inlineLevel = [];
            this.nonInlineLevel = [];
            this.negativeZIndex = [];
            this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
            this.positiveZIndex = [];
            this.nonPositionedFloats = [];
            this.nonPositionedInlineLevel = [];
        }
        return StackingContext;
    }());
    var ElementPaint = /** @class */ (function () {
        function ElementPaint(container, parent) {
            this.container = container;
            this.parent = parent;
            this.effects = [];
            this.curves = new BoundCurves(this.container);
            if (this.container.styles.opacity < 1) {
                this.effects.push(new OpacityEffect(this.container.styles.opacity));
            }
            if (this.container.styles.transform !== null) {
                var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
                var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
                var matrix = this.container.styles.transform;
                this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
            }
            if (this.container.styles.overflowX !== 0 /* VISIBLE */) {
                var borderBox = calculateBorderBoxPath(this.curves);
                var paddingBox = calculatePaddingBoxPath(this.curves);
                if (equalPath(borderBox, paddingBox)) {
                    this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
                }
                else {
                    this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
                    this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
                }
            }
        }
        ElementPaint.prototype.getEffects = function (target) {
            var inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(this.container.styles.position) === -1;
            var parent = this.parent;
            var effects = this.effects.slice(0);
            while (parent) {
                var croplessEffects = parent.effects.filter(function (effect) { return !isClipEffect(effect); });
                if (inFlow || parent.container.styles.position !== 0 /* STATIC */ || !parent.parent) {
                    effects.unshift.apply(effects, croplessEffects);
                    inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(parent.container.styles.position) === -1;
                    if (parent.container.styles.overflowX !== 0 /* VISIBLE */) {
                        var borderBox = calculateBorderBoxPath(parent.curves);
                        var paddingBox = calculatePaddingBoxPath(parent.curves);
                        if (!equalPath(borderBox, paddingBox)) {
                            effects.unshift(new ClipEffect(paddingBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
                        }
                    }
                }
                else {
                    effects.unshift.apply(effects, croplessEffects);
                }
                parent = parent.parent;
            }
            return effects.filter(function (effect) { return contains(effect.target, target); });
        };
        return ElementPaint;
    }());
    var parseStackTree = function (parent, stackingContext, realStackingContext, listItems) {
        parent.container.elements.forEach(function (child) {
            var treatAsRealStackingContext = contains(child.flags, 4 /* CREATES_REAL_STACKING_CONTEXT */);
            var createsStackingContext = contains(child.flags, 2 /* CREATES_STACKING_CONTEXT */);
            var paintContainer = new ElementPaint(child, parent);
            if (contains(child.styles.display, 2048 /* LIST_ITEM */)) {
                listItems.push(paintContainer);
            }
            var listOwnerItems = contains(child.flags, 8 /* IS_LIST_OWNER */) ? [] : listItems;
            if (treatAsRealStackingContext || createsStackingContext) {
                var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
                var stack = new StackingContext(paintContainer);
                if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                    var order_1 = child.styles.zIndex.order;
                    if (order_1 < 0) {
                        var index_1 = 0;
                        parentStack.negativeZIndex.some(function (current, i) {
                            if (order_1 > current.element.container.styles.zIndex.order) {
                                index_1 = i;
                                return false;
                            }
                            else if (index_1 > 0) {
                                return true;
                            }
                            return false;
                        });
                        parentStack.negativeZIndex.splice(index_1, 0, stack);
                    }
                    else if (order_1 > 0) {
                        var index_2 = 0;
                        parentStack.positiveZIndex.some(function (current, i) {
                            if (order_1 >= current.element.container.styles.zIndex.order) {
                                index_2 = i + 1;
                                return false;
                            }
                            else if (index_2 > 0) {
                                return true;
                            }
                            return false;
                        });
                        parentStack.positiveZIndex.splice(index_2, 0, stack);
                    }
                    else {
                        parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                    }
                }
                else {
                    if (child.styles.isFloating()) {
                        parentStack.nonPositionedFloats.push(stack);
                    }
                    else {
                        parentStack.nonPositionedInlineLevel.push(stack);
                    }
                }
                parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
            }
            else {
                if (child.styles.isInlineLevel()) {
                    stackingContext.inlineLevel.push(paintContainer);
                }
                else {
                    stackingContext.nonInlineLevel.push(paintContainer);
                }
                parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
            }
            if (contains(child.flags, 8 /* IS_LIST_OWNER */)) {
                processListItems(child, listOwnerItems);
            }
        });
    };
    var processListItems = function (owner, elements) {
        var numbering = owner instanceof OLElementContainer ? owner.start : 1;
        var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
        for (var i = 0; i < elements.length; i++) {
            var item = elements[i];
            if (item.container instanceof LIElementContainer &&
                typeof item.container.value === 'number' &&
                item.container.value !== 0) {
                numbering = item.container.value;
            }
            item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
            numbering += reversed ? -1 : 1;
        }
    };
    var parseStackingContexts = function (container) {
        var paintContainer = new ElementPaint(container, null);
        var root = new StackingContext(paintContainer);
        var listItems = [];
        parseStackTree(paintContainer, root, root, listItems);
        processListItems(paintContainer.container, listItems);
        return root;
    };

    var parsePathForBorder = function (curves, borderSide) {
        switch (borderSide) {
            case 0:
                return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
            case 1:
                return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
            case 2:
                return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
            case 3:
            default:
                return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
        }
    };
    var parsePathForBorderDoubleOuter = function (curves, borderSide) {
        switch (borderSide) {
            case 0:
                return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
            case 1:
                return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
            case 2:
                return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
            case 3:
            default:
                return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
        }
    };
    var parsePathForBorderDoubleInner = function (curves, borderSide) {
        switch (borderSide) {
            case 0:
                return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
            case 1:
                return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
            case 2:
                return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
            case 3:
            default:
                return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
        }
    };
    var parsePathForBorderStroke = function (curves, borderSide) {
        switch (borderSide) {
            case 0:
                return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
            case 1:
                return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
            case 2:
                return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
            case 3:
            default:
                return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
        }
    };
    var createStrokePathFromCurves = function (outer1, outer2) {
        var path = [];
        if (isBezierCurve(outer1)) {
            path.push(outer1.subdivide(0.5, false));
        }
        else {
            path.push(outer1);
        }
        if (isBezierCurve(outer2)) {
            path.push(outer2.subdivide(0.5, true));
        }
        else {
            path.push(outer2);
        }
        return path;
    };
    var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
        var path = [];
        if (isBezierCurve(outer1)) {
            path.push(outer1.subdivide(0.5, false));
        }
        else {
            path.push(outer1);
        }
        if (isBezierCurve(outer2)) {
            path.push(outer2.subdivide(0.5, true));
        }
        else {
            path.push(outer2);
        }
        if (isBezierCurve(inner2)) {
            path.push(inner2.subdivide(0.5, true).reverse());
        }
        else {
            path.push(inner2);
        }
        if (isBezierCurve(inner1)) {
            path.push(inner1.subdivide(0.5, false).reverse());
        }
        else {
            path.push(inner1);
        }
        return path;
    };

    var paddingBox = function (element) {
        var bounds = element.bounds;
        var styles = element.styles;
        return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
    };
    var contentBox = function (element) {
        var styles = element.styles;
        var bounds = element.bounds;
        var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
        var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
        var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
        var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
        return bounds.add(paddingLeft + styles.borderLeftWidth, paddingTop + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft + paddingRight), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop + paddingBottom));
    };

    var calculateBackgroundPositioningArea = function (backgroundOrigin, element) {
        if (backgroundOrigin === 0 /* BORDER_BOX */) {
            return element.bounds;
        }
        if (backgroundOrigin === 2 /* CONTENT_BOX */) {
            return contentBox(element);
        }
        return paddingBox(element);
    };
    var calculateBackgroundPaintingArea = function (backgroundClip, element) {
        if (backgroundClip === 0 /* BORDER_BOX */) {
            return element.bounds;
        }
        if (backgroundClip === 2 /* CONTENT_BOX */) {
            return contentBox(element);
        }
        return paddingBox(element);
    };
    var calculateBackgroundRendering = function (container, index, intrinsicSize) {
        var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
        var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
        var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
        var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
        var position = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
        var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
        var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
        var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
        return [path, offsetX, offsetY, sizeWidth, sizeHeight];
    };
    var isAuto = function (token) { return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO; };
    var hasIntrinsicValue = function (value) { return typeof value === 'number'; };
    var calculateBackgroundSize = function (size, _a, bounds) {
        var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
        var first = size[0], second = size[1];
        if (!first) {
            return [0, 0];
        }
        if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
            return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
        }
        var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
        if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
            if (hasIntrinsicValue(intrinsicProportion)) {
                var targetRatio = bounds.width / bounds.height;
                return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER)
                    ? [bounds.width, bounds.width / intrinsicProportion]
                    : [bounds.height * intrinsicProportion, bounds.height];
            }
            return [bounds.width, bounds.height];
        }
        var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
        var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
        var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
        // If the background-size is auto or auto auto:
        if (isAuto(first) && (!second || isAuto(second))) {
            // If the image has both horizontal and vertical intrinsic dimensions, it's rendered at that size.
            if (hasIntrinsicWidth && hasIntrinsicHeight) {
                return [intrinsicWidth, intrinsicHeight];
            }
            // If the image has no intrinsic dimensions and has no intrinsic proportions,
            // it's rendered at the size of the background positioning area.
            if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
                return [bounds.width, bounds.height];
            }
            // TODO If the image has no intrinsic dimensions but has intrinsic proportions, it's rendered as if contain had been specified instead.
            // If the image has only one intrinsic dimension and has intrinsic proportions, it's rendered at the size corresponding to that one dimension.
            // The other dimension is computed using the specified dimension and the intrinsic proportions.
            if (hasIntrinsicDimensions && hasIntrinsicProportion) {
                var width_1 = hasIntrinsicWidth
                    ? intrinsicWidth
                    : intrinsicHeight * intrinsicProportion;
                var height_1 = hasIntrinsicHeight
                    ? intrinsicHeight
                    : intrinsicWidth / intrinsicProportion;
                return [width_1, height_1];
            }
            // If the image has only one intrinsic dimension but has no intrinsic proportions,
            // it's rendered using the specified dimension and the other dimension of the background positioning area.
            var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
            var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
            return [width_2, height_2];
        }
        // If the image has intrinsic proportions, it's stretched to the specified dimension.
        // The unspecified dimension is computed using the specified dimension and the intrinsic proportions.
        if (hasIntrinsicProportion) {
            var width_3 = 0;
            var height_3 = 0;
            if (isLengthPercentage(first)) {
                width_3 = getAbsoluteValue(first, bounds.width);
            }
            else if (isLengthPercentage(second)) {
                height_3 = getAbsoluteValue(second, bounds.height);
            }
            if (isAuto(first)) {
                width_3 = height_3 * intrinsicProportion;
            }
            else if (!second || isAuto(second)) {
                height_3 = width_3 / intrinsicProportion;
            }
            return [width_3, height_3];
        }
        // If the image has no intrinsic proportions, it's stretched to the specified dimension.
        // The unspecified dimension is computed using the image's corresponding intrinsic dimension,
        // if there is one. If there is no such intrinsic dimension,
        // it becomes the corresponding dimension of the background positioning area.
        var width = null;
        var height = null;
        if (isLengthPercentage(first)) {
            width = getAbsoluteValue(first, bounds.width);
        }
        else if (second && isLengthPercentage(second)) {
            height = getAbsoluteValue(second, bounds.height);
        }
        if (width !== null && (!second || isAuto(second))) {
            height =
                hasIntrinsicWidth && hasIntrinsicHeight
                    ? (width / intrinsicWidth) * intrinsicHeight
                    : bounds.height;
        }
        if (height !== null && isAuto(first)) {
            width =
                hasIntrinsicWidth && hasIntrinsicHeight
                    ? (height / intrinsicHeight) * intrinsicWidth
                    : bounds.width;
        }
        if (width !== null && height !== null) {
            return [width, height];
        }
        throw new Error("Unable to calculate background-size for element");
    };
    var getBackgroundValueForIndex = function (values, index) {
        var value = values[index];
        if (typeof value === 'undefined') {
            return values[0];
        }
        return value;
    };
    var calculateBackgroundRepeatPath = function (repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
        var x = _a[0], y = _a[1];
        var width = _b[0], height = _b[1];
        switch (repeat) {
            case 2 /* REPEAT_X */:
                return [
                    new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                    new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                    new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                    new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
                ];
            case 3 /* REPEAT_Y */:
                return [
                    new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                    new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                    new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                    new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
                ];
            case 1 /* NO_REPEAT */:
                return [
                    new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                    new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                    new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                    new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
                ];
            default:
                return [
                    new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                    new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                    new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                    new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
                ];
        }
    };

    var SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    var SAMPLE_TEXT = 'Hidden Text';
    var FontMetrics = /** @class */ (function () {
        function FontMetrics(document) {
            this._data = {};
            this._document = document;
        }
        FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
            var container = this._document.createElement('div');
            var img = this._document.createElement('img');
            var span = this._document.createElement('span');
            var body = this._document.body;
            container.style.visibility = 'hidden';
            container.style.fontFamily = fontFamily;
            container.style.fontSize = fontSize;
            container.style.margin = '0';
            container.style.padding = '0';
            container.style.whiteSpace = 'nowrap';
            body.appendChild(container);
            img.src = SMALL_IMAGE;
            img.width = 1;
            img.height = 1;
            img.style.margin = '0';
            img.style.padding = '0';
            img.style.verticalAlign = 'baseline';
            span.style.fontFamily = fontFamily;
            span.style.fontSize = fontSize;
            span.style.margin = '0';
            span.style.padding = '0';
            span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
            container.appendChild(span);
            container.appendChild(img);
            var baseline = img.offsetTop - span.offsetTop + 2;
            container.removeChild(span);
            container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
            container.style.lineHeight = 'normal';
            img.style.verticalAlign = 'super';
            var middle = img.offsetTop - container.offsetTop + 2;
            body.removeChild(container);
            return { baseline: baseline, middle: middle };
        };
        FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
            var key = fontFamily + " " + fontSize;
            if (typeof this._data[key] === 'undefined') {
                this._data[key] = this.parseMetrics(fontFamily, fontSize);
            }
            return this._data[key];
        };
        return FontMetrics;
    }());

    var Renderer = /** @class */ (function () {
        function Renderer(context, options) {
            this.context = context;
            this.options = options;
        }
        return Renderer;
    }());

    var MASK_OFFSET = 10000;
    var CanvasRenderer = /** @class */ (function (_super) {
        __extends(CanvasRenderer, _super);
        function CanvasRenderer(context, options) {
            var _this = _super.call(this, context, options) || this;
            _this._activeEffects = [];
            _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
            _this.ctx = _this.canvas.getContext('2d');
            if (!options.canvas) {
                _this.canvas.width = Math.floor(options.width * options.scale);
                _this.canvas.height = Math.floor(options.height * options.scale);
                _this.canvas.style.width = options.width + "px";
                _this.canvas.style.height = options.height + "px";
            }
            _this.fontMetrics = new FontMetrics(document);
            _this.ctx.scale(_this.options.scale, _this.options.scale);
            _this.ctx.translate(-options.x, -options.y);
            _this.ctx.textBaseline = 'bottom';
            _this._activeEffects = [];
            _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
            return _this;
        }
        CanvasRenderer.prototype.applyEffects = function (effects) {
            var _this = this;
            while (this._activeEffects.length) {
                this.popEffect();
            }
            effects.forEach(function (effect) { return _this.applyEffect(effect); });
        };
        CanvasRenderer.prototype.applyEffect = function (effect) {
            this.ctx.save();
            if (isOpacityEffect(effect)) {
                this.ctx.globalAlpha = effect.opacity;
            }
            if (isTransformEffect(effect)) {
                this.ctx.translate(effect.offsetX, effect.offsetY);
                this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
                this.ctx.translate(-effect.offsetX, -effect.offsetY);
            }
            if (isClipEffect(effect)) {
                this.path(effect.path);
                this.ctx.clip();
            }
            this._activeEffects.push(effect);
        };
        CanvasRenderer.prototype.popEffect = function () {
            this._activeEffects.pop();
            this.ctx.restore();
        };
        CanvasRenderer.prototype.renderStack = function (stack) {
            return __awaiter(this, void 0, void 0, function () {
                var styles;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            styles = stack.element.container.styles;
                            if (!styles.isVisible()) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.renderStackContent(stack)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderNode = function (paint) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (contains(paint.container.flags, 16 /* DEBUG_RENDER */)) {
                                debugger;
                            }
                            if (!paint.container.styles.isVisible()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.renderNodeBackgroundAndBorders(paint)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.renderNodeContent(paint)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing, baseline) {
            var _this = this;
            if (letterSpacing === 0) {
                this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
            }
            else {
                var letters = segmentGraphemes(text.text);
                letters.reduce(function (left, letter) {
                    _this.ctx.fillText(letter, left, text.bounds.top + baseline);
                    return left + _this.ctx.measureText(letter).width;
                }, text.bounds.left);
            }
        };
        CanvasRenderer.prototype.createFontStyle = function (styles) {
            var fontVariant = styles.fontVariant
                .filter(function (variant) { return variant === 'normal' || variant === 'small-caps'; })
                .join('');
            var fontFamily = fixIOSSystemFonts(styles.fontFamily).join(', ');
            var fontSize = isDimensionToken(styles.fontSize)
                ? "" + styles.fontSize.number + styles.fontSize.unit
                : styles.fontSize.number + "px";
            return [
                [styles.fontStyle, fontVariant, styles.fontWeight, fontSize, fontFamily].join(' '),
                fontFamily,
                fontSize
            ];
        };
        CanvasRenderer.prototype.renderTextNode = function (text, styles) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, font, fontFamily, fontSize, _b, baseline, middle, paintOrder;
                var _this = this;
                return __generator(this, function (_c) {
                    _a = this.createFontStyle(styles), font = _a[0], fontFamily = _a[1], fontSize = _a[2];
                    this.ctx.font = font;
                    this.ctx.direction = styles.direction === 1 /* RTL */ ? 'rtl' : 'ltr';
                    this.ctx.textAlign = 'left';
                    this.ctx.textBaseline = 'alphabetic';
                    _b = this.fontMetrics.getMetrics(fontFamily, fontSize), baseline = _b.baseline, middle = _b.middle;
                    paintOrder = styles.paintOrder;
                    text.textBounds.forEach(function (text) {
                        paintOrder.forEach(function (paintOrderLayer) {
                            switch (paintOrderLayer) {
                                case 0 /* FILL */:
                                    _this.ctx.fillStyle = asString(styles.color);
                                    _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                    var textShadows = styles.textShadow;
                                    if (textShadows.length && text.text.trim().length) {
                                        textShadows
                                            .slice(0)
                                            .reverse()
                                            .forEach(function (textShadow) {
                                            _this.ctx.shadowColor = asString(textShadow.color);
                                            _this.ctx.shadowOffsetX = textShadow.offsetX.number * _this.options.scale;
                                            _this.ctx.shadowOffsetY = textShadow.offsetY.number * _this.options.scale;
                                            _this.ctx.shadowBlur = textShadow.blur.number;
                                            _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                        });
                                        _this.ctx.shadowColor = '';
                                        _this.ctx.shadowOffsetX = 0;
                                        _this.ctx.shadowOffsetY = 0;
                                        _this.ctx.shadowBlur = 0;
                                    }
                                    if (styles.textDecorationLine.length) {
                                        _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                                        styles.textDecorationLine.forEach(function (textDecorationLine) {
                                            switch (textDecorationLine) {
                                                case 1 /* UNDERLINE */:
                                                    // Draws a line at the baseline of the font
                                                    // TODO As some browsers display the line as more than 1px if the font-size is big,
                                                    // need to take that into account both in position and size
                                                    _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1);
                                                    break;
                                                case 2 /* OVERLINE */:
                                                    _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1);
                                                    break;
                                                case 3 /* LINE_THROUGH */:
                                                    // TODO try and find exact position for line-through
                                                    _this.ctx.fillRect(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1);
                                                    break;
                                            }
                                        });
                                    }
                                    break;
                                case 1 /* STROKE */:
                                    if (styles.webkitTextStrokeWidth && text.text.trim().length) {
                                        _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                                        _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        _this.ctx.lineJoin = !!window.chrome ? 'miter' : 'round';
                                        _this.ctx.strokeText(text.text, text.bounds.left, text.bounds.top + baseline);
                                    }
                                    _this.ctx.strokeStyle = '';
                                    _this.ctx.lineWidth = 0;
                                    _this.ctx.lineJoin = 'miter';
                                    break;
                            }
                        });
                    });
                    return [2 /*return*/];
                });
            });
        };
        CanvasRenderer.prototype.renderReplacedElement = function (container, curves, image) {
            if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
                var box = contentBox(container);
                var path = calculatePaddingBoxPath(curves);
                this.path(path);
                this.ctx.save();
                this.ctx.clip();
                this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
                this.ctx.restore();
            }
        };
        CanvasRenderer.prototype.renderNodeContent = function (paint) {
            return __awaiter(this, void 0, void 0, function () {
                var container, curves, styles, _i, _a, child, image, image, iframeRenderer, canvas, size, _b, fontFamily, fontSize, baseline, bounds, x, textBounds, img, image, url, fontFamily, bounds;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.applyEffects(paint.getEffects(4 /* CONTENT */));
                            container = paint.container;
                            curves = paint.curves;
                            styles = container.styles;
                            _i = 0, _a = container.textNodes;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            child = _a[_i];
                            return [4 /*yield*/, this.renderTextNode(child, styles)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            if (!(container instanceof ImageElementContainer)) return [3 /*break*/, 8];
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.context.cache.match(container.src)];
                        case 6:
                            image = _c.sent();
                            this.renderReplacedElement(container, curves, image);
                            return [3 /*break*/, 8];
                        case 7:
                            _c.sent();
                            this.context.logger.error("Error loading image " + container.src);
                            return [3 /*break*/, 8];
                        case 8:
                            if (container instanceof CanvasElementContainer) {
                                this.renderReplacedElement(container, curves, container.canvas);
                            }
                            if (!(container instanceof SVGElementContainer)) return [3 /*break*/, 12];
                            _c.label = 9;
                        case 9:
                            _c.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this.context.cache.match(container.svg)];
                        case 10:
                            image = _c.sent();
                            this.renderReplacedElement(container, curves, image);
                            return [3 /*break*/, 12];
                        case 11:
                            _c.sent();
                            this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
                            return [3 /*break*/, 12];
                        case 12:
                            if (!(container instanceof IFrameElementContainer && container.tree)) return [3 /*break*/, 14];
                            iframeRenderer = new CanvasRenderer(this.context, {
                                scale: this.options.scale,
                                backgroundColor: container.backgroundColor,
                                x: 0,
                                y: 0,
                                width: container.width,
                                height: container.height
                            });
                            return [4 /*yield*/, iframeRenderer.render(container.tree)];
                        case 13:
                            canvas = _c.sent();
                            if (container.width && container.height) {
                                this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                            }
                            _c.label = 14;
                        case 14:
                            if (container instanceof InputElementContainer) {
                                size = Math.min(container.bounds.width, container.bounds.height);
                                if (container.type === CHECKBOX) {
                                    if (container.checked) {
                                        this.ctx.save();
                                        this.path([
                                            new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                                            new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                                            new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                                            new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                                            new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                                            new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                                            new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                                        ]);
                                        this.ctx.fillStyle = asString(INPUT_COLOR);
                                        this.ctx.fill();
                                        this.ctx.restore();
                                    }
                                }
                                else if (container.type === RADIO) {
                                    if (container.checked) {
                                        this.ctx.save();
                                        this.ctx.beginPath();
                                        this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                                        this.ctx.fillStyle = asString(INPUT_COLOR);
                                        this.ctx.fill();
                                        this.ctx.restore();
                                    }
                                }
                            }
                            if (isTextInputElement(container) && container.value.length) {
                                _b = this.createFontStyle(styles), fontFamily = _b[0], fontSize = _b[1];
                                baseline = this.fontMetrics.getMetrics(fontFamily, fontSize).baseline;
                                this.ctx.font = fontFamily;
                                this.ctx.fillStyle = asString(styles.color);
                                this.ctx.textBaseline = 'alphabetic';
                                this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                                bounds = contentBox(container);
                                x = 0;
                                switch (container.styles.textAlign) {
                                    case 1 /* CENTER */:
                                        x += bounds.width / 2;
                                        break;
                                    case 2 /* RIGHT */:
                                        x += bounds.width;
                                        break;
                                }
                                textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                                this.ctx.save();
                                this.path([
                                    new Vector(bounds.left, bounds.top),
                                    new Vector(bounds.left + bounds.width, bounds.top),
                                    new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                                    new Vector(bounds.left, bounds.top + bounds.height)
                                ]);
                                this.ctx.clip();
                                this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                                this.ctx.restore();
                                this.ctx.textBaseline = 'alphabetic';
                                this.ctx.textAlign = 'left';
                            }
                            if (!contains(container.styles.display, 2048 /* LIST_ITEM */)) return [3 /*break*/, 20];
                            if (!(container.styles.listStyleImage !== null)) return [3 /*break*/, 19];
                            img = container.styles.listStyleImage;
                            if (!(img.type === 0 /* URL */)) return [3 /*break*/, 18];
                            image = void 0;
                            url = img.url;
                            _c.label = 15;
                        case 15:
                            _c.trys.push([15, 17, , 18]);
                            return [4 /*yield*/, this.context.cache.match(url)];
                        case 16:
                            image = _c.sent();
                            this.ctx.drawImage(image, container.bounds.left - (image.width + 10), container.bounds.top);
                            return [3 /*break*/, 18];
                        case 17:
                            _c.sent();
                            this.context.logger.error("Error loading list-style-image " + url);
                            return [3 /*break*/, 18];
                        case 18: return [3 /*break*/, 20];
                        case 19:
                            if (paint.listValue && container.styles.listStyleType !== -1 /* NONE */) {
                                fontFamily = this.createFontStyle(styles)[0];
                                this.ctx.font = fontFamily;
                                this.ctx.fillStyle = asString(styles.color);
                                this.ctx.textBaseline = 'middle';
                                this.ctx.textAlign = 'right';
                                bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                                this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                                this.ctx.textBaseline = 'bottom';
                                this.ctx.textAlign = 'left';
                            }
                            _c.label = 20;
                        case 20: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderStackContent = function (stack) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
                return __generator(this, function (_p) {
                    switch (_p.label) {
                        case 0:
                            if (contains(stack.element.container.flags, 16 /* DEBUG_RENDER */)) {
                                debugger;
                            }
                            // https://www.w3.org/TR/css-position-3/#painting-order
                            // 1. the background and borders of the element forming the stacking context.
                            return [4 /*yield*/, this.renderNodeBackgroundAndBorders(stack.element)];
                        case 1:
                            // https://www.w3.org/TR/css-position-3/#painting-order
                            // 1. the background and borders of the element forming the stacking context.
                            _p.sent();
                            _i = 0, _a = stack.negativeZIndex;
                            _p.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            child = _a[_i];
                            return [4 /*yield*/, this.renderStack(child)];
                        case 3:
                            _p.sent();
                            _p.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                        // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                        return [4 /*yield*/, this.renderNodeContent(stack.element)];
                        case 6:
                            // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                            _p.sent();
                            _b = 0, _c = stack.nonInlineLevel;
                            _p.label = 7;
                        case 7:
                            if (!(_b < _c.length)) return [3 /*break*/, 10];
                            child = _c[_b];
                            return [4 /*yield*/, this.renderNode(child)];
                        case 8:
                            _p.sent();
                            _p.label = 9;
                        case 9:
                            _b++;
                            return [3 /*break*/, 7];
                        case 10:
                            _d = 0, _e = stack.nonPositionedFloats;
                            _p.label = 11;
                        case 11:
                            if (!(_d < _e.length)) return [3 /*break*/, 14];
                            child = _e[_d];
                            return [4 /*yield*/, this.renderStack(child)];
                        case 12:
                            _p.sent();
                            _p.label = 13;
                        case 13:
                            _d++;
                            return [3 /*break*/, 11];
                        case 14:
                            _f = 0, _g = stack.nonPositionedInlineLevel;
                            _p.label = 15;
                        case 15:
                            if (!(_f < _g.length)) return [3 /*break*/, 18];
                            child = _g[_f];
                            return [4 /*yield*/, this.renderStack(child)];
                        case 16:
                            _p.sent();
                            _p.label = 17;
                        case 17:
                            _f++;
                            return [3 /*break*/, 15];
                        case 18:
                            _h = 0, _j = stack.inlineLevel;
                            _p.label = 19;
                        case 19:
                            if (!(_h < _j.length)) return [3 /*break*/, 22];
                            child = _j[_h];
                            return [4 /*yield*/, this.renderNode(child)];
                        case 20:
                            _p.sent();
                            _p.label = 21;
                        case 21:
                            _h++;
                            return [3 /*break*/, 19];
                        case 22:
                            _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                            _p.label = 23;
                        case 23:
                            if (!(_k < _l.length)) return [3 /*break*/, 26];
                            child = _l[_k];
                            return [4 /*yield*/, this.renderStack(child)];
                        case 24:
                            _p.sent();
                            _p.label = 25;
                        case 25:
                            _k++;
                            return [3 /*break*/, 23];
                        case 26:
                            _m = 0, _o = stack.positiveZIndex;
                            _p.label = 27;
                        case 27:
                            if (!(_m < _o.length)) return [3 /*break*/, 30];
                            child = _o[_m];
                            return [4 /*yield*/, this.renderStack(child)];
                        case 28:
                            _p.sent();
                            _p.label = 29;
                        case 29:
                            _m++;
                            return [3 /*break*/, 27];
                        case 30: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.mask = function (paths) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(this.canvas.width, 0);
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.lineTo(0, 0);
            this.formatPath(paths.slice(0).reverse());
            this.ctx.closePath();
        };
        CanvasRenderer.prototype.path = function (paths) {
            this.ctx.beginPath();
            this.formatPath(paths);
            this.ctx.closePath();
        };
        CanvasRenderer.prototype.formatPath = function (paths) {
            var _this = this;
            paths.forEach(function (point, index) {
                var start = isBezierCurve(point) ? point.start : point;
                if (index === 0) {
                    _this.ctx.moveTo(start.x, start.y);
                }
                else {
                    _this.ctx.lineTo(start.x, start.y);
                }
                if (isBezierCurve(point)) {
                    _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
                }
            });
        };
        CanvasRenderer.prototype.renderRepeat = function (path, pattern, offsetX, offsetY) {
            this.path(path);
            this.ctx.fillStyle = pattern;
            this.ctx.translate(offsetX, offsetY);
            this.ctx.fill();
            this.ctx.translate(-offsetX, -offsetY);
        };
        CanvasRenderer.prototype.resizeImage = function (image, width, height) {
            var _a;
            if (image.width === width && image.height === height) {
                return image;
            }
            var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
            var canvas = ownerDocument.createElement('canvas');
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
            return canvas;
        };
        CanvasRenderer.prototype.renderBackgroundImage = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var index, _loop_1, this_1, _i, _a, backgroundImage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            index = container.styles.backgroundImage.length - 1;
                            _loop_1 = function (backgroundImage) {
                                var image, url, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position, x, y, _g, rx, ry, radialGradient_1, midX, midY, f, invF;
                                return __generator(this, function (_h) {
                                    switch (_h.label) {
                                        case 0:
                                            if (!(backgroundImage.type === 0 /* URL */)) return [3 /*break*/, 5];
                                            image = void 0;
                                            url = backgroundImage.url;
                                            _h.label = 1;
                                        case 1:
                                            _h.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this_1.context.cache.match(url)];
                                        case 2:
                                            image = _h.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            _h.sent();
                                            this_1.context.logger.error("Error loading background-image " + url);
                                            return [3 /*break*/, 4];
                                        case 4:
                                            if (image) {
                                                _c = calculateBackgroundRendering(container, index, [
                                                    image.width,
                                                    image.height,
                                                    image.width / image.height
                                                ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                                                pattern = this_1.ctx.createPattern(this_1.resizeImage(image, width, height), 'repeat');
                                                this_1.renderRepeat(path, pattern, x, y);
                                            }
                                            return [3 /*break*/, 6];
                                        case 5:
                                            if (isLinearGradient(backgroundImage)) {
                                                _d = calculateBackgroundRendering(container, index, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                                                _e = calculateGradientDirection(backgroundImage.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                                                canvas = document.createElement('canvas');
                                                canvas.width = width;
                                                canvas.height = height;
                                                ctx = canvas.getContext('2d');
                                                gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                                processColorStops(backgroundImage.stops, lineLength).forEach(function (colorStop) {
                                                    return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                });
                                                ctx.fillStyle = gradient_1;
                                                ctx.fillRect(0, 0, width, height);
                                                if (width > 0 && height > 0) {
                                                    pattern = this_1.ctx.createPattern(canvas, 'repeat');
                                                    this_1.renderRepeat(path, pattern, x, y);
                                                }
                                            }
                                            else if (isRadialGradient(backgroundImage)) {
                                                _f = calculateBackgroundRendering(container, index, [
                                                    null,
                                                    null,
                                                    null
                                                ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                                                position = backgroundImage.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage.position;
                                                x = getAbsoluteValue(position[0], width);
                                                y = getAbsoluteValue(position[position.length - 1], height);
                                                _g = calculateRadius(backgroundImage, x, y, width, height), rx = _g[0], ry = _g[1];
                                                if (rx > 0 && ry > 0) {
                                                    radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                                    processColorStops(backgroundImage.stops, rx * 2).forEach(function (colorStop) {
                                                        return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                    });
                                                    this_1.path(path);
                                                    this_1.ctx.fillStyle = radialGradient_1;
                                                    if (rx !== ry) {
                                                        midX = container.bounds.left + 0.5 * container.bounds.width;
                                                        midY = container.bounds.top + 0.5 * container.bounds.height;
                                                        f = ry / rx;
                                                        invF = 1 / f;
                                                        this_1.ctx.save();
                                                        this_1.ctx.translate(midX, midY);
                                                        this_1.ctx.transform(1, 0, 0, f, 0, 0);
                                                        this_1.ctx.translate(-midX, -midY);
                                                        this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                                        this_1.ctx.restore();
                                                    }
                                                    else {
                                                        this_1.ctx.fill();
                                                    }
                                                }
                                            }
                                            _h.label = 6;
                                        case 6:
                                            index--;
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            backgroundImage = _a[_i];
                            return [5 /*yield**/, _loop_1(backgroundImage)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderSolidBorder = function (color, side, curvePoints) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.path(parsePathForBorder(curvePoints, side));
                    this.ctx.fillStyle = asString(color);
                    this.ctx.fill();
                    return [2 /*return*/];
                });
            });
        };
        CanvasRenderer.prototype.renderDoubleBorder = function (color, width, side, curvePoints) {
            return __awaiter(this, void 0, void 0, function () {
                var outerPaths, innerPaths;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(width < 3)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.renderSolidBorder(color, side, curvePoints)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                        case 2:
                            outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
                            this.path(outerPaths);
                            this.ctx.fillStyle = asString(color);
                            this.ctx.fill();
                            innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
                            this.path(innerPaths);
                            this.ctx.fill();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (paint) {
            return __awaiter(this, void 0, void 0, function () {
                var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.applyEffects(paint.getEffects(2 /* BACKGROUND_BORDERS */));
                            styles = paint.container.styles;
                            hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                            borders = [
                                { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                                { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                                { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                                { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
                            ];
                            backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                            if (!(hasBackground || styles.boxShadow.length)) return [3 /*break*/, 2];
                            this.ctx.save();
                            this.path(backgroundPaintingArea);
                            this.ctx.clip();
                            if (!isTransparent(styles.backgroundColor)) {
                                this.ctx.fillStyle = asString(styles.backgroundColor);
                                this.ctx.fill();
                            }
                            return [4 /*yield*/, this.renderBackgroundImage(paint.container)];
                        case 1:
                            _a.sent();
                            this.ctx.restore();
                            styles.boxShadow
                                .slice(0)
                                .reverse()
                                .forEach(function (shadow) {
                                _this.ctx.save();
                                var borderBoxArea = calculateBorderBoxPath(paint.curves);
                                var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                                var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                                if (shadow.inset) {
                                    _this.path(borderBoxArea);
                                    _this.ctx.clip();
                                    _this.mask(shadowPaintingArea);
                                }
                                else {
                                    _this.mask(borderBoxArea);
                                    _this.ctx.clip();
                                    _this.path(shadowPaintingArea);
                                }
                                _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                                _this.ctx.shadowOffsetY = shadow.offsetY.number;
                                _this.ctx.shadowColor = asString(shadow.color);
                                _this.ctx.shadowBlur = shadow.blur.number;
                                _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : 'rgba(0,0,0,1)';
                                _this.ctx.fill();
                                _this.ctx.restore();
                            });
                            _a.label = 2;
                        case 2:
                            side = 0;
                            _i = 0, borders_1 = borders;
                            _a.label = 3;
                        case 3:
                            if (!(_i < borders_1.length)) return [3 /*break*/, 13];
                            border = borders_1[_i];
                            if (!(border.style !== 0 /* NONE */ && !isTransparent(border.color) && border.width > 0)) return [3 /*break*/, 11];
                            if (!(border.style === 2 /* DASHED */)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 2 /* DASHED */)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 5:
                            if (!(border.style === 3 /* DOTTED */)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 3 /* DOTTED */)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 7:
                            if (!(border.style === 4 /* DOUBLE */)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.renderSolidBorder(border.color, side, paint.curves)];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11:
                            side++;
                            _a.label = 12;
                        case 12:
                            _i++;
                            return [3 /*break*/, 3];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasRenderer.prototype.renderDashedDottedBorder = function (color, width, side, curvePoints, style) {
            return __awaiter(this, void 0, void 0, function () {
                var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
                return __generator(this, function (_a) {
                    this.ctx.save();
                    strokePaths = parsePathForBorderStroke(curvePoints, side);
                    boxPaths = parsePathForBorder(curvePoints, side);
                    if (style === 2 /* DASHED */) {
                        this.path(boxPaths);
                        this.ctx.clip();
                    }
                    if (isBezierCurve(boxPaths[0])) {
                        startX = boxPaths[0].start.x;
                        startY = boxPaths[0].start.y;
                    }
                    else {
                        startX = boxPaths[0].x;
                        startY = boxPaths[0].y;
                    }
                    if (isBezierCurve(boxPaths[1])) {
                        endX = boxPaths[1].end.x;
                        endY = boxPaths[1].end.y;
                    }
                    else {
                        endX = boxPaths[1].x;
                        endY = boxPaths[1].y;
                    }
                    if (side === 0 || side === 2) {
                        length = Math.abs(startX - endX);
                    }
                    else {
                        length = Math.abs(startY - endY);
                    }
                    this.ctx.beginPath();
                    if (style === 3 /* DOTTED */) {
                        this.formatPath(strokePaths);
                    }
                    else {
                        this.formatPath(boxPaths.slice(0, 2));
                    }
                    dashLength = width < 3 ? width * 3 : width * 2;
                    spaceLength = width < 3 ? width * 2 : width;
                    if (style === 3 /* DOTTED */) {
                        dashLength = width;
                        spaceLength = width;
                    }
                    useLineDash = true;
                    if (length <= dashLength * 2) {
                        useLineDash = false;
                    }
                    else if (length <= dashLength * 2 + spaceLength) {
                        multiplier = length / (2 * dashLength + spaceLength);
                        dashLength *= multiplier;
                        spaceLength *= multiplier;
                    }
                    else {
                        numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
                        minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
                        maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
                        spaceLength =
                            maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace)
                                ? minSpace
                                : maxSpace;
                    }
                    if (useLineDash) {
                        if (style === 3 /* DOTTED */) {
                            this.ctx.setLineDash([0, dashLength + spaceLength]);
                        }
                        else {
                            this.ctx.setLineDash([dashLength, spaceLength]);
                        }
                    }
                    if (style === 3 /* DOTTED */) {
                        this.ctx.lineCap = 'round';
                        this.ctx.lineWidth = width;
                    }
                    else {
                        this.ctx.lineWidth = width * 2 + 1.1;
                    }
                    this.ctx.strokeStyle = asString(color);
                    this.ctx.stroke();
                    this.ctx.setLineDash([]);
                    // dashed round edge gap
                    if (style === 2 /* DASHED */) {
                        if (isBezierCurve(boxPaths[0])) {
                            path1 = boxPaths[3];
                            path2 = boxPaths[0];
                            this.ctx.beginPath();
                            this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                            this.ctx.stroke();
                        }
                        if (isBezierCurve(boxPaths[1])) {
                            path1 = boxPaths[1];
                            path2 = boxPaths[2];
                            this.ctx.beginPath();
                            this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                            this.ctx.stroke();
                        }
                    }
                    this.ctx.restore();
                    return [2 /*return*/];
                });
            });
        };
        CanvasRenderer.prototype.render = function (element) {
            return __awaiter(this, void 0, void 0, function () {
                var stack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.options.backgroundColor) {
                                this.ctx.fillStyle = asString(this.options.backgroundColor);
                                this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
                            }
                            stack = parseStackingContexts(element);
                            return [4 /*yield*/, this.renderStack(stack)];
                        case 1:
                            _a.sent();
                            this.applyEffects([]);
                            return [2 /*return*/, this.canvas];
                    }
                });
            });
        };
        return CanvasRenderer;
    }(Renderer));
    var isTextInputElement = function (container) {
        if (container instanceof TextareaElementContainer) {
            return true;
        }
        else if (container instanceof SelectElementContainer) {
            return true;
        }
        else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
            return true;
        }
        return false;
    };
    var calculateBackgroundCurvedPaintingArea = function (clip, curves) {
        switch (clip) {
            case 0 /* BORDER_BOX */:
                return calculateBorderBoxPath(curves);
            case 2 /* CONTENT_BOX */:
                return calculateContentBoxPath(curves);
            case 1 /* PADDING_BOX */:
            default:
                return calculatePaddingBoxPath(curves);
        }
    };
    var canvasTextAlign = function (textAlign) {
        switch (textAlign) {
            case 1 /* CENTER */:
                return 'center';
            case 2 /* RIGHT */:
                return 'right';
            case 0 /* LEFT */:
            default:
                return 'left';
        }
    };
    // see https://github.com/niklasvh/html2canvas/pull/2645
    var iOSBrokenFonts = ['-apple-system', 'system-ui'];
    var fixIOSSystemFonts = function (fontFamilies) {
        return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
            ? fontFamilies.filter(function (fontFamily) { return iOSBrokenFonts.indexOf(fontFamily) === -1; })
            : fontFamilies;
    };

    var ForeignObjectRenderer = /** @class */ (function (_super) {
        __extends(ForeignObjectRenderer, _super);
        function ForeignObjectRenderer(context, options) {
            var _this = _super.call(this, context, options) || this;
            _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
            _this.ctx = _this.canvas.getContext('2d');
            _this.options = options;
            _this.canvas.width = Math.floor(options.width * options.scale);
            _this.canvas.height = Math.floor(options.height * options.scale);
            _this.canvas.style.width = options.width + "px";
            _this.canvas.style.height = options.height + "px";
            _this.ctx.scale(_this.options.scale, _this.options.scale);
            _this.ctx.translate(-options.x, -options.y);
            _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
            return _this;
        }
        ForeignObjectRenderer.prototype.render = function (element) {
            return __awaiter(this, void 0, void 0, function () {
                var svg, img;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
                            return [4 /*yield*/, loadSerializedSVG(svg)];
                        case 1:
                            img = _a.sent();
                            if (this.options.backgroundColor) {
                                this.ctx.fillStyle = asString(this.options.backgroundColor);
                                this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                            }
                            this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                            return [2 /*return*/, this.canvas];
                    }
                });
            });
        };
        return ForeignObjectRenderer;
    }(Renderer));
    var loadSerializedSVG = function (svg) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = reject;
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
        });
    };

    var Logger = /** @class */ (function () {
        function Logger(_a) {
            var id = _a.id, enabled = _a.enabled;
            this.id = id;
            this.enabled = enabled;
            this.start = Date.now();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.enabled) {
                // eslint-disable-next-line no-console
                if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
                    // eslint-disable-next-line no-console
                    console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                }
                else {
                    this.info.apply(this, args);
                }
            }
        };
        Logger.prototype.getTime = function () {
            return Date.now() - this.start;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.enabled) {
                // eslint-disable-next-line no-console
                if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
                    // eslint-disable-next-line no-console
                    console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                }
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.enabled) {
                // eslint-disable-next-line no-console
                if (typeof window !== 'undefined' && window.console && typeof console.warn === 'function') {
                    // eslint-disable-next-line no-console
                    console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                }
                else {
                    this.info.apply(this, args);
                }
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.enabled) {
                // eslint-disable-next-line no-console
                if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
                    // eslint-disable-next-line no-console
                    console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                }
                else {
                    this.info.apply(this, args);
                }
            }
        };
        Logger.instances = {};
        return Logger;
    }());

    var Context = /** @class */ (function () {
        function Context(options, windowBounds) {
            var _a;
            this.windowBounds = windowBounds;
            this.instanceName = "#" + Context.instanceCount++;
            this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
            this.cache = (_a = options.cache) !== null && _a !== void 0 ? _a : new Cache(this, options);
        }
        Context.instanceCount = 1;
        return Context;
    }());

    var html2canvas = function (element, options) {
        if (options === void 0) { options = {}; }
        return renderElement(element, options);
    };
    if (typeof window !== 'undefined') {
        CacheStorage.setContext(window);
    }
    var renderElement = function (element, opts) { return __awaiter(void 0, void 0, void 0, function () {
        var ownerDocument, defaultView, resourceOptions, contextOptions, windowOptions, windowBounds, context, foreignObjectRendering, cloneOptions, documentCloner, clonedElement, container, _a, width, height, left, top, backgroundColor, renderOptions, canvas, renderer, root, renderer;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    if (!element || typeof element !== 'object') {
                        return [2 /*return*/, Promise.reject('Invalid element provided as first argument')];
                    }
                    ownerDocument = element.ownerDocument;
                    if (!ownerDocument) {
                        throw new Error("Element is not attached to a Document");
                    }
                    defaultView = ownerDocument.defaultView;
                    if (!defaultView) {
                        throw new Error("Document is not attached to a Window");
                    }
                    resourceOptions = {
                        allowTaint: (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
                        imageTimeout: (_c = opts.imageTimeout) !== null && _c !== void 0 ? _c : 15000,
                        proxy: opts.proxy,
                        useCORS: (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false
                    };
                    contextOptions = __assign({ logging: (_e = opts.logging) !== null && _e !== void 0 ? _e : true, cache: opts.cache }, resourceOptions);
                    windowOptions = {
                        windowWidth: (_f = opts.windowWidth) !== null && _f !== void 0 ? _f : defaultView.innerWidth,
                        windowHeight: (_g = opts.windowHeight) !== null && _g !== void 0 ? _g : defaultView.innerHeight,
                        scrollX: (_h = opts.scrollX) !== null && _h !== void 0 ? _h : defaultView.pageXOffset,
                        scrollY: (_j = opts.scrollY) !== null && _j !== void 0 ? _j : defaultView.pageYOffset
                    };
                    windowBounds = new Bounds(windowOptions.scrollX, windowOptions.scrollY, windowOptions.windowWidth, windowOptions.windowHeight);
                    context = new Context(contextOptions, windowBounds);
                    foreignObjectRendering = (_k = opts.foreignObjectRendering) !== null && _k !== void 0 ? _k : false;
                    cloneOptions = {
                        allowTaint: (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
                        onclone: opts.onclone,
                        ignoreElements: opts.ignoreElements,
                        inlineImages: foreignObjectRendering,
                        copyStyles: foreignObjectRendering
                    };
                    context.logger.debug("Starting document clone with size " + windowBounds.width + "x" + windowBounds.height + " scrolled to " + -windowBounds.left + "," + -windowBounds.top);
                    documentCloner = new DocumentCloner(context, element, cloneOptions);
                    clonedElement = documentCloner.clonedReferenceElement;
                    if (!clonedElement) {
                        return [2 /*return*/, Promise.reject("Unable to find element in cloned iframe")];
                    }
                    return [4 /*yield*/, documentCloner.toIFrame(ownerDocument, windowBounds)];
                case 1:
                    container = _u.sent();
                    _a = isBodyElement(clonedElement) || isHTMLElement(clonedElement)
                        ? parseDocumentSize(clonedElement.ownerDocument)
                        : parseBounds(context, clonedElement), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                    backgroundColor = parseBackgroundColor(context, clonedElement, opts.backgroundColor);
                    renderOptions = {
                        canvas: opts.canvas,
                        backgroundColor: backgroundColor,
                        scale: (_o = (_m = opts.scale) !== null && _m !== void 0 ? _m : defaultView.devicePixelRatio) !== null && _o !== void 0 ? _o : 1,
                        x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
                        y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
                        width: (_r = opts.width) !== null && _r !== void 0 ? _r : Math.ceil(width),
                        height: (_s = opts.height) !== null && _s !== void 0 ? _s : Math.ceil(height)
                    };
                    if (!foreignObjectRendering) return [3 /*break*/, 3];
                    context.logger.debug("Document cloned, using foreign object rendering");
                    renderer = new ForeignObjectRenderer(context, renderOptions);
                    return [4 /*yield*/, renderer.render(clonedElement)];
                case 2:
                    canvas = _u.sent();
                    return [3 /*break*/, 5];
                case 3:
                    context.logger.debug("Document cloned, element located at " + left + "," + top + " with size " + width + "x" + height + " using computed rendering");
                    context.logger.debug("Starting DOM parsing");
                    root = parseTree(context, clonedElement);
                    if (backgroundColor === root.styles.backgroundColor) {
                        root.styles.backgroundColor = COLORS.TRANSPARENT;
                    }
                    context.logger.debug("Starting renderer for element at " + renderOptions.x + "," + renderOptions.y + " with size " + renderOptions.width + "x" + renderOptions.height);
                    renderer = new CanvasRenderer(context, renderOptions);
                    return [4 /*yield*/, renderer.render(root)];
                case 4:
                    canvas = _u.sent();
                    _u.label = 5;
                case 5:
                    if ((_t = opts.removeContainer) !== null && _t !== void 0 ? _t : true) {
                        if (!DocumentCloner.destroy(container)) {
                            context.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore");
                        }
                    }
                    context.logger.debug("Finished rendering");
                    return [2 /*return*/, canvas];
            }
        });
    }); };
    var parseBackgroundColor = function (context, element, backgroundColorOverride) {
        var ownerDocument = element.ownerDocument;
        // http://www.w3.org/TR/css3-background/#special-backgrounds
        var documentBackgroundColor = ownerDocument.documentElement
            ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor)
            : COLORS.TRANSPARENT;
        var bodyBackgroundColor = ownerDocument.body
            ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor)
            : COLORS.TRANSPARENT;
        var defaultBackgroundColor = typeof backgroundColorOverride === 'string'
            ? parseColor(context, backgroundColorOverride)
            : backgroundColorOverride === null
                ? COLORS.TRANSPARENT
                : 0xffffffff;
        return element === ownerDocument.documentElement
            ? isTransparent(documentBackgroundColor)
                ? isTransparent(bodyBackgroundColor)
                    ? defaultBackgroundColor
                    : bodyBackgroundColor
                : documentBackgroundColor
            : defaultBackgroundColor;
    };

    return html2canvas;

})));
//# sourceMappingURL=html2canvas.js.map

const SPOTFIX_INDEXED_DB_NAME = 'spotfix-localDB';
const spotfixIndexedDBVersion = 1;

const SPOTFIX_TABLE_USERS = 'users';
const SPOTFIX_TABLE_TASKS = 'tasks';
const SPOTFIX_TABLE_COMMENTS = 'comments';

const LOCAL_DATA_BASE_TABLE = [
    { name: SPOTFIX_TABLE_USERS, keyPath: 'user_id' },
    { name: SPOTFIX_TABLE_TASKS, keyPath: 'taskId' },
    { name: SPOTFIX_TABLE_COMMENTS, keyPath: 'commentId' },
];

const SPOTFIX_LAST_DB_KEY = 'spotfix_last_db_key';

let dbPromise = null;

function getSpotfixDBKey() {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const projectToken = localStorage.getItem('spotfix_project_token');

    if (sessionId) return `session:${sessionId}`;
    if (projectToken) return `project:${projectToken}`;

    return null;
}

function getDBNameByKey(dbKey) {
    return `${SPOTFIX_INDEXED_DB_NAME}_${dbKey}`;
}

function openIndexedDB(name, version) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            LOCAL_DATA_BASE_TABLE.forEach((item) => {
                if (!db.objectStoreNames.contains(item.name)) {
                    const store = db.createObjectStore(item.name, {
                        keyPath: item.keyPath,
                    });

                    if (item.name === SPOTFIX_TABLE_COMMENTS) {
                        store.createIndex('taskId', 'taskId');
                    }
                    if (item.name === SPOTFIX_TABLE_TASKS) {
                        store.createIndex('userId', 'userId');
                    }
                }
            });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getDB() {
    if (!dbPromise) {
        const dbKey = getSpotfixDBKey();
        if (!dbKey) return null;

        dbPromise = openIndexedDB(
            getDBNameByKey(dbKey),
            spotfixIndexedDBVersion
        );
    }
    return dbPromise;
}

async function deleteDBByKey(dbKey) {
    return new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(getDBNameByKey(dbKey));
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
        req.onblocked = () => resolve();
    });
}

const spotfixIndexedDB = {
    init: async () => {
        const currentKey = getSpotfixDBKey();

        if (!currentKey) {
            return { needInit: false };
        }

        const lastKey = localStorage.getItem(SPOTFIX_LAST_DB_KEY);

        if (lastKey && lastKey !== currentKey) {
            await deleteDBByKey(lastKey);
        }

        localStorage.setItem(SPOTFIX_LAST_DB_KEY, currentKey);

        dbPromise = null;
        await getDB();

        return { needInit: true };
    },

    withStore: async (table, mode = 'readwrite', callback) => {
        const db = await getDB();
        if (!db) return;

        return new Promise((resolve, reject) => {
            const tx = db.transaction(table, mode);
            const store = tx.objectStore(table);

            const result = callback(store);

            tx.oncomplete = () => resolve(result);
            tx.onerror = () => reject(tx.error);
        });
    },

    put: async (table, data) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            if (Array.isArray(data)) {
                data.forEach((item) => store.put(item));
            } else {
                store.put(data);
            }
        });
    },

    delete: async (table, key) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            store.delete(key);
        });
    },

    clearTable: async (table) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) =>
            store.clear()
        );
    },

    clearPut: async (table, data) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            store.clear();
            if (Array.isArray(data)) {
                data.forEach((item) => store.put(item));
            } else {
                store.put(data);
            }
        });
    },

    getAll: async (table, indexName, value) => {
        return spotfixIndexedDB.withStore(table, 'readonly', (store) => {
            return new Promise((resolve, reject) => {
                const req =
                    indexName && value !== undefined
                        ? store.index(indexName).getAll(value)
                        : store.getAll();

                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
        });
    },

    getTable: async (table) => {
        if (!getSpotfixDBKey()) {
            return [];
        }
        return spotfixIndexedDB.getAll(table);
    },
};

const SPOTFIX_DOBOARD_API_URL = 'https://api.doboard.com';

/**
 * Makes an API call to the DoBoard endpoint with form data
 *
 * @param {Object} data - The data to send in the request
 * @param {string} method - The API method to call
 * @param {string|number} accountId - Optional account ID for the endpoint
 *
 * @returns {Promise<Object>} The response data when operation_status is 'SUCCESS'
 */
const spotfixApiCall = async(data, method, accountId = undefined) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be a valid object');
    }

    if (!method || typeof method !== 'string') {
        throw new Error('Method must be a valid string');
    }

    if (accountId !== undefined && (typeof accountId !== 'string' && typeof accountId !== 'number')) {
        throw new Error('AccountId must be a string or number');
    }

    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] !== undefined && data[key] !== null) {
                formData.append(key, data[key]);
            }
        }
    }

    let endpointUrl;
    if (accountId !== undefined) {
        endpointUrl = `${SPOTFIX_DOBOARD_API_URL}/${accountId}/${method}`;
    } else {
        endpointUrl = `${SPOTFIX_DOBOARD_API_URL}/${method}`;
    }

    try {
        new URL(endpointUrl);
    } catch (error) {
        throw new Error(`Invalid endpoint URL: ${endpointUrl}`);
    }

    let response;
    try {
        response = await fetch(endpointUrl, {
            method: 'POST',
            body: formData,
        });
    } catch (networkError) {
        throw new Error(`Network error: ${networkError.message}`);
    }

    let responseBody;
    try {
        responseBody = await response.json();
    } catch (parseError) {
        throw new Error('Failed to parse JSON response from server');
    }

    if (!responseBody || typeof responseBody !== 'object') {
        throw new Error('Invalid response format from server');
    }

    if (!responseBody.data) {
        throw new Error('Missing data field in server response');
    }

    if (!responseBody.data.operation_status) {
        throw new Error('Missing operation_status in response data');
    }

    if (responseBody.data.operation_status === 'FAILED') {
        const errorMessage = responseBody.data.operation_message || 'Operation failed without specific message';
       if(responseBody?.data?.operation_message === 'session_id Unknown'){
            clearLocalstorageOnLogout();
            checkLogInOutButtonsVisible();
        }
        throw new Error(errorMessage);
    }

    if (responseBody.data.operation_status === 'SUCCESS') {
        return responseBody.data;
    }

    throw new Error(`Unknown operation status: ${responseBody.data.operation_status}`);
}

const spotFixUserConfirmEmailDoboard = async (emailConfirmationToken) => {
    const data = {
        email_confirmation_token: encodeURIComponent(emailConfirmationToken)
    }
    const result = await spotfixApiCall(data, 'user_confirm_email');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accounts: result.accounts,
        operationStatus: result.operation_status
    };
};

const createTaskDoboard = async (sessionId, taskDetails) => {
    const accountId = taskDetails.accountId;
    const data = {
        session_id: sessionId,
        project_token: taskDetails.projectToken,
        project_id: taskDetails.projectId,
        user_id: localStorage.getItem('spotfix_user_id'),
        name: taskDetails.taskTitle,
        comment: taskDetails.taskDescription,
        meta: taskDetails.taskMeta,
        task_type: 'PUBLIC'
    }
    const result = await spotfixApiCall(data, 'task_add', accountId);
    return {
        taskId: result.task_id,
    }
};

const createTaskCommentDoboard = async (accountId, sessionId, taskId, comment, projectToken, status = 'ACTIVE') => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        task_id: taskId,
        comment: comment,
        status: status
    }
    const result = await spotfixApiCall(data, 'comment_add', accountId);
    return {
        commentId: result.comment_id,
    };
};

const attachmentAddDoboard = async (fileData) => {
    const accountId = fileData.params.accountId;
    const data = {
        session_id: fileData.sessionId,
        project_token: fileData.params.projectToken,
        account_id: fileData.params.accountId,
        comment_id: fileData.commentId,
        filename: fileData.fileName,
        file: fileData.fileBinary,
        attachment_order: fileData.attachmentOrder
    }
    const result = await spotfixApiCall(data, 'attachment_add', accountId);
    // @ToDo need to handle result?
};

const registerUserDoboard = async (projectToken, accountId, email, nickname, pageURL) => {
    let data = {
        project_token: projectToken,
        account_id: accountId,
        confirmation_url: email,
    }
    if (email && nickname) {
        data.email = email;
        data.name = nickname;
    }

    if (localStorage.getItem('bot_detector_event_token')) {
        try {
            const botDetectorData = JSON.parse(localStorage.getItem('bot_detector_event_token'));
            if (botDetectorData?.value) {
                data.bot_detector_event_token = botDetectorData?.value;
            }
        } catch (error) {
            data.bot_detector_event_token = '';
        }
    }
    const result = await spotfixApiCall(data, 'user_registration');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accountExists: result.user_email_confirmed === 1,
        operationMessage: result.operation_message,
        operationStatus: result.operation_status,
        userEmailConfirmed: result.user_email_confirmed,
        accounts: result.accounts,
    };
};

const loginUserDoboard = async (email, password) => {
    const data = {
        email: email,
        password: password,
    }
    const result = await spotfixApiCall(data, 'user_authorize');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accountExists: result.user_email_confirmed === 1,
        operationMessage: result.operation_message,
        operationStatus: result.operation_status,
        userEmailConfirmed: result.user_email_confirmed,
        accounts: result.accounts
    }
}

const forgotPasswordDoboard = async (email) => {
    const data = {
        email: email
    }
    return await spotfixApiCall(data, 'user_password_reset');
}


const logoutUserDoboard = async (projectToken) => {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const accountsString = localStorage.getItem('spotfix_accounts');
    const accounts =  accountsString !== 'undefined' ? JSON.parse(accountsString || '[]') : [];
    const accountId = accounts.length > 0 ? accounts[0].account_id : 1;

    if(sessionId && accountId) {
        const data = {
            session_id: sessionId,
        };

        const email = localStorage.getItem('spotfix_email') || '';

        if (email && email.includes('spotfix_')) {
            data.project_token = projectToken;
        }

        const result = await spotfixApiCall(data, 'user_unauthorize', accountId);

        if (result.operation_status === 'SUCCESS') {
            clearLocalstorageOnLogout();
            checkLogInOutButtonsVisible();
        }
    }
}

const getTasksDoboard = async (projectToken, sessionId, accountId, projectId, userId) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        project_id: projectId,
        task_type: 'PUBLIC',
        status: 'ACTIVE,DONE',
    }
    if ( userId ) {
        data.user_id = userId;
    }
    const result = await spotfixApiCall(data, 'task_get', accountId);
    const tasks = result.tasks.map(task => ({
        taskId: task.task_id,
        taskTitle: task.name,
        userId: task.user_id,
        taskLastUpdate: task.updated,
        taskCreated: task.created,
        taskCreatorTaskUser: task.creator_user_id,
        taskMeta: task.meta,
        taskStatus: task.status,
    }));
    await spotfixIndexedDB.clearPut(SPOTFIX_TABLE_TASKS, tasks);
    storageSaveTasksCount(tasks);
    return tasks;
}


const getTasksCommentsDoboard = async (sessionId, accountId, projectToken, currentActiveTaskId, status = 'ACTIVE') => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        status: status,
        task_id: currentActiveTaskId
    }
    const result = await spotfixApiCall(data, 'comment_get', accountId);
    const comments = result.comments.map(comment => ({
        taskId: comment.task_id,
        commentId: comment.comment_id,
        userId: comment.user_id,
        commentBody: comment.comment,
        commentDate: comment.updated,
        status: comment.status,
        issueTitle: comment.task_name,
    }));
    await spotfixIndexedDB.clearPut(SPOTFIX_TABLE_COMMENTS, comments);
    return comments;
};

const getUserDoboard = async (sessionId, projectToken, accountId, userId) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
    }
    if (userId) data.user_id = userId;

    const result = await spotfixApiCall(data, 'user_get', accountId);
    if (data.user_id) {
        await spotfixIndexedDB.put(SPOTFIX_TABLE_USERS, result.users);
    } else {
        await spotfixIndexedDB.clearPut(SPOTFIX_TABLE_USERS, result.users);
    }
    return result.users;

    // @ToDo Need to handle these two different answers?
    /*// Format 1: users inside data
    if (responseBody.data && responseBody.data.operation_status) {
        if (responseBody.data.operation_status === 'FAILED') {
            throw new Error(responseBody.data.operation_message);
        }
        if (responseBody.data.operation_status === 'SUCCESS') {
            if (Array.isArray(responseBody.data.users)) {
                return responseBody.data.users;
            }
            return [];
        }
    }
    // Format 2: users at the top level
    if (responseBody.operation_status) {
        if (responseBody.operation_status === 'FAILED') {
            throw new Error(responseBody.operation_message);
        }
        if (responseBody.operation_status === 'SUCCESS') {
            if (Array.isArray(responseBody.users)) {
                return responseBody.users;
            }
            return [];
        }
    }*/
};

const userUpdateDoboard = async (projectToken, accountId, sessionId, userId, timezone) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        user_id: userId,
        timestamp: timezone
    }
    await spotfixApiCall(data, 'user_update', accountId);
    return {
        success: true
    };
}

const getReleaseVersion = async () => {
    try {
        const res = await fetch('https://api.github.com/repos/CleanTalk/SpotFix/tags');
        let data = await res.json();

        if (data.length > 0 && data[0].name) {
            storageSaveSpotfixVersion(data[0].name);
            return data[0].name;
        } else {
            const res = await fetch('https://api.github.com/repos/CleanTalk/SpotFix/releases');
            data = await res.json();
            if (data.length > 0 && data[0].tag_name) {
                storageSaveSpotfixVersion(data[0].tag_name);
                return data[0].tag_name;
            }
        }
        return null;
    } catch (err) {
        return null;
    }
};


let socket = null;
let heartbeatInterval = null;
let messageCallback = null;
let lastEventId = null;
let pendingUpdate = false;
let reconnectTimer = null;
let isIntentionalClose = false;

const WS_URL = 'wss://ws.doboard.com';

const getSessionId = () => localStorage.getItem('spotfix_session_id');

const buildMessage = (action) => ({
    channel: `account:${localStorage.getItem('spotfix_company_id')}`,
    action,
    account_id: localStorage.getItem('spotfix_company_id'),
    session_id: getSessionId(),
    project_token: localStorage.getItem('spotfix_project_token'),
});

const handleIncomingData = async (data) => {
    switch (data.object) {
    case 'users':
        await spotfixIndexedDB.put(SPOTFIX_TABLE_USERS, data.data);
        break;

    case 'tasks':
        if (data.data.status === 'REMOVED') {
            await spotfixIndexedDB.delete(SPOTFIX_TABLE_TASKS, data.data.task_id);
            const comments = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_COMMENTS);
            const filteredComments = comments.filter((comment) => +comment.taskId !== +data.data.task_id);
            await spotfixIndexedDB.clearPut(SPOTFIX_TABLE_COMMENTS, filteredComments);
            break;
        }

        await spotfixIndexedDB.put(SPOTFIX_TABLE_TASKS, {
            taskId: data.data.task_id,
            taskTitle: data.data.name,
            userId: data.data.user_id,
            taskLastUpdate: data.data.updated,
            taskCreated: data.data.created,
            taskCreatorTaskUser: data.data.creator_user_id,
            taskMeta: data.data.meta,
            taskStatus: data.data.status,
        });
        break;

    case 'comments':
        if (data.data.status === 'REMOVED') {
            await spotfixIndexedDB.delete(SPOTFIX_TABLE_COMMENTS, data.data.comment_id);
            break;
        }
        await spotfixIndexedDB.put(SPOTFIX_TABLE_COMMENTS, {
            taskId: data.data.task_id,
            commentId: data.data.comment_id,
            userId: data.data.user_id,
            commentBody: data.data.comment,
            commentDate: data.data.updated,
            status: data.data.status,
            issueTitle: data.data.task_name,
        });
        break;

    default:
        break;
    }
};


const wsSpotfix = {
    connect() {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }

        if ((socket && socket.readyState === WebSocket.OPEN) || !getSessionId()) {
            return;
        }

        isIntentionalClose = false;
        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            heartbeatInterval = setInterval(() => {
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send('heartbeat');
                }
            }, 50 * 1000);
            wsSpotfix.send(buildMessage('SUBSCRIBE'));
        };

        socket.onmessage = async (event) => {
            if (event.data === 'heartbeat') return;

            let data;
            try {
                data = JSON.parse(event.data);
            } catch {
                console.warn('WS non-JSON message:', event.data);
                return;
            }

            if (!['users', 'tasks', 'comments'].includes(data.object)) return;

            const eventId = data.id ? `${data.object}-${data.id}` : JSON.stringify(data);

            if (eventId === lastEventId) return;
            lastEventId = eventId;

            await handleIncomingData(data);
            if (!pendingUpdate) {
                pendingUpdate = true;
                setTimeout(() => {
                    pendingUpdate = false;
                    if (messageCallback) messageCallback();
                }, 3000);
            }
        };

        socket.onclose = () => {
            socket = null;
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
            }

            if (!isIntentionalClose) {
                reconnectTimer = setTimeout(() => {
                    wsSpotfix.connect();
                }, 2000);
            }
        };

        socket.onerror = (e) => {
            console.error('WS error:', e);
        };
    },

    send(data) {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        }
    },

    close() {
        isIntentionalClose = true;
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        socket?.close();
    },

    subscribe() {
        if (socket?.readyState === WebSocket.OPEN) {
            wsSpotfix.send(buildMessage('SUBSCRIBE'));
        }
    },

    unsubscribe() {
        if (socket?.readyState === WebSocket.OPEN) {
            wsSpotfix.send(buildMessage('UNSUBSCRIBE'));
        }
    },

    onMessage(cb) {
        messageCallback = cb;
    },
};

let spotFixCSS = `.doboard_task_widget-send_message_paperclip .doboard_task_widget-paperclip-tooltip::after{content:"";position:absolute;left:8%;top:100%;transform:translateX(-50%);pointer-events:none;background:0 0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #545b61;display:block}.doboard_task_widget-send_message_paperclip{position:relative}.doboard_task_widget-send_message_paperclip .doboard_task_widget-paperclip-tooltip{display:none;position:absolute;left:0;bottom:0;transform:translateX(-3%) translateY(-43px);background:#545b61;color:#FFF;border:none;border-radius:3px;padding:10px 16px;font-size:13px;line-height:1.4;z-index:100;min-width:220px;max-width:320px;text-align:left;pointer-events:none;text-transform:none}.doboard_task_widget-send_message_paperclip:hover .doboard_task_widget-paperclip-tooltip{display:block}.doboard_task_widget *{font-family:Inter,sans-serif;font-weight:400;font-size:14px;line-height:130%;color:#40484F}.doboard_task_widget-header *{color:#252A2F;margin:0}.doboard_task_widget-header-icons{display:flex;gap:12px}.doboard_task_widget-close_btn{transform:translateY(-2px)}#openUserMenuButton{transform:scale(.85)}#maximizeWidgetContainer{transform:scale(.8)}.doboard_task_widget a{text-decoration:underline;color:#2F68B7}.doboard_task_widget a:hover{text-decoration:none}.doboard_task_widget{position:fixed;right:50px;bottom:20px;z-index:9999;vertical-align:middle;transition:top .1s;transform:translateZ(0);-webkit-transform:translateZ(0);will-change:transform}.doboard_task_widget_cursor-pointer{cursor:pointer}.doboard_task_widget-container-maximize .doboard_task_widget-field{display:flex;justify-content:space-evenly;flex-wrap:wrap}.doboard_task_widget-input-container-textarea .tox-tinymce{position:absolute}.doboard_task_widget-container-maximize{width:80vw!important;max-width:1120px!important;max-height:75vh!important;min-height:75vh!important;display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-container{width:430px;max-height:calc(100vh - 40px);display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-header{display:flex;min-height:41px;padding:0 16px;background-color:#F3F6F9;border-radius:8px 8px 0 0;border:1px solid #BBC7D1;border-bottom:none;justify-content:space-between;align-items:center;color:#FFF}.doboard_task_widget-user_menu-header{display:flex;padding:16px;border:1px solid #BBC7D1;border-bottom-color:#EBF0F4;border-radius:8px 8px 0 0;flex-direction:column;align-items:center;color:#252A2F;background-color:#F3F6F9}.doboard_task_widget-user_menu-header-top{display:flex;height:fit-content;align-items:center;width:100%;justify-content:space-between}.doboard_task_widget-user_menu-header-avatar{max-width:60px;max-height:60px;width:60px;height:60px;border-radius:50%;margin-bottom:4px}.doboard_task_widget-user_menu-item{display:flex;align-items:center;border-bottom:1px #EBF0F4 solid;padding:0 16px;height:52px;margin-top:10px}.doboard_task_widget-content{flex:1;overflow-y:auto;background:#FFF;border-radius:0 0 8px 8px;border:1px #BBC7D1;border-style:none solid solid;box-shadow:0 4px 15px 8px #CACACA40;scrollbar-width:none;max-height:60vh}.doboard_task_widget-container-maximize .doboard_task_widget-content{max-height:inherit}.doboard_task_widget-element-container{margin-bottom:20px}.doboard_task_widget-element-container span{color:#707A83;font-size:12px;font-weight:400}.doboard_task_widget-wrap{box-shadow:none;position:fixed;right:-50px;padding:0;cursor:pointer;width:69px;height:52px;border-top-left-radius:4px;border-bottom-left-radius:4px;background-color:rgba(255,255,255,.9);border:1px solid #EBF0F4;display:flex;align-items:center;justify-content:center}.doboard_task_widget-hidden,.doboard_task_widget-input-container.hidden,.doboard_task_widget-login.hidden,.doboard_task_widget-wrap.hidden,.wrap_review::after{display:none}.doboard_task_widget-wrap img{width:32px;height:32px;transform:scaleX(-1)}.wrap_review{width:164px;min-width:164px;height:54px}.wrap_review img{width:28px;height:28px;transform:scaleX(-1)}.wrap_review:hover{background-color:#fff}@media (max-width:480px){.doboard_task_widget-wrap{right:-20px}}#review_content_button_text{color:#D5991A;margin-left:6px;font-weight:600;font-size:14px;text-transform:none!important}#doboard_task_widget-task_count{position:absolute;top:-12px;right:4px;width:22px;height:22px;opacity:1;background:#ef8b43;border-radius:50%;color:#FFF;text-align:center;line-height:22px}#doboard_task_widget-task_count.hidden{width:0;height:0;opacity:0}.doboard_task_widget-input-container{position:relative;margin-bottom:6px}.doboard_task_widget-input-container .doboard_task_widget-field{padding:0 8px;border-radius:4px;border:1px solid #BBC7D1;outline:0!important;appearance:none;width:100%;height:40px;background:#FFF;color:#000;max-width:-webkit-fill-available;max-width:-moz-available}.doboard_task_widget-field:focus{border-color:#2F68B7}.doboard_task_widget-input-container textarea.doboard_task_widget-field{min-height:94px;padding-top:11px;padding-bottom:11px}.doboard_task_widget-field+label{color:#252A2F;background:#fff;position:absolute;top:20px;left:8px;transform:translateY(-50%);transition:all .2s ease-in-out}.doboard_task_widget-field.has-value+label,.doboard_task_widget-field:focus+label{font-size:10px;top:0;left:12px;padding:0 4px;z-index:5}.doboard_task_widget-field:focus+label{color:#2F68B7}.doboard_task_widget-login{background:#F9FBFD;border:1px solid #BBC7D1;border-radius:4px;padding:11px 8px 8px;margin-bottom:24px}.doboard_task_widget-login .doboard_task_widget-accordion{height:0;overflow:hidden;opacity:0;transition:all .2s ease-in-out}.doboard_task_widget-login.active .doboard_task_widget-accordion{height:auto;overflow:visible;opacity:1}.doboard_task_widget-login .doboard_task_widget-input-container:last-child{margin-bottom:0}.doboard_task_widget-login .doboard_task_widget-login-icon{display:block;position:relative;padding-right:24px;cursor:pointer}.doboard_task_widget-login.active .doboard_task_widget-login-icon{margin-bottom:24px}.doboard_task_widget-login .doboard_task_widget-login-icon::after{position:absolute;top:0;right:4px;content:"";display:block;width:10px;height:10px;transform:rotate(45deg);border:2px solid #40484F;border-radius:1px;border-top:none;border-left:none;transition:all .2s ease-in-out}.doboard_task_widget-login.active .doboard_task_widget-login-icon::after{transform:rotate(-135deg);top:7px}.doboard_task_widget-login .doboard_task_widget-field+label,.doboard_task_widget-login .doboard_task_widget-input-container .doboard_task_widget-field{background:#F9FBFD}.doboard_task_widget-submit_button{min-height:48px;width:100%;max-width:400px;margin-bottom:10px;border-radius:6px;font-family:Inter,sans-serif;font-size:16px;line-height:150%;cursor:pointer;transition:all .2s ease-in-out;background:0 0;border:1px solid #22A475;color:#22A475;font-weight:600}.doboard_task_widget-submit_button:hover{background:#22A475;color:#FFF}.doboard_task_widget-submit_button:disabled{background:rgba(117,148,138,.92);color:#FFF;cursor:wait}.doboard_task_widget-login-buttons-wrapper{display:flex;gap:10px;margin-bottom:10px}.doboard_task_widget-login-buttons-wrapper .doboard_task_widget-submit_button{margin-bottom:0;width:auto;min-height:32px;font-size:14px;padding:4px 12px}.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-forgot_password-black,.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-on_phantom_login_page{flex:1;background:#FFF;border:1px solid #22A475;color:#22A475}.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-forgot_password-black:hover,.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-on_phantom_login_page:hover{background:#f0fdf4;color:#1C7857}.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-login_button,.doboard_task_widget-login-buttons-wrapper #doboard_task_widget-restore_password_button{flex:2}.doboard_task_widget-issue-title{display:inline-flex;flex-direction:column;transform:translateY(-2px);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.doboard_task_widget-issue-title>:last-child{color:#707A83;text-align:center;font-size:10px;font-weight:400}.doboard_task_widget-hidden_element{opacity:0}.doboard_task_widget-message-wrapper{border-radius:4px;padding:8px;margin-bottom:14px;display:grid;justify-items:center}.doboard_task_widget-error_message-wrapper.hidden,.doboard_task_widget-message-wrapper.hidden{display:none}.doboard_task_widget-error_message{background:#fdd;border:1px solid #cf6868}.doboard_task_widget-notice_message{background:#dde9ff;border:1px solid #68a6cf}#doboard_task_widget-error_message-header{font-weight:600}#doboard_task_widget-error_message{text-align:center}.doboard_task_widget-task_row{display:flex;max-height:55px;cursor:pointer;align-items:center;justify-content:space-between;padding:1px 15px}.doboard_task_widget-task_row:last-child{margin-bottom:0}.doboard_task_widget-task-text_bold{font-weight:700}.doboard_task_widget-element_selection,.doboard_task_widget-image_selection,.doboard_task_widget-text_selection,.doboard_task_widget-text_selection.image-highlight>img{background:rgba(208,213,127,.68)}.doboard_task_widget-issues_list_empty{text-align:center;margin:20px 0}.doboard_task_widget-avatar_container{display:flex;height:44px;width:44px;border-radius:50%;background-repeat:no-repeat;background-position:center;background-size:100%}.doboard_task_widget-comment_data_owner .doboard_task_widget-avatar_container{opacity:0}.doboard_task_widget-avatar_placeholder{min-height:44px;min-width:44px;border-radius:50%;font-size:24px;line-height:1.2083333333;padding:0;background:#1C7857;display:inline-grid;align-content:center;justify-content:center}.doboard_task_widget-avatar-initials{color:#FFF;width:inherit;text-align:center}.doboard_task_widget-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover}.doboard_task_widget-description_container{height:55px;width:calc(100% - 44px - 8px);border-bottom:1px solid #EBF0F4;display:block;margin-left:8px}.doboard_task_widget-task_row:last-child .doboard_task_widget-description_container{border-bottom:none}.doboard_task_widget-all_issues{padding-bottom:0}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{overflow:auto;max-height:85vh;display:none}.doboard_task_widget-task_last_message,.doboard_task_widget-task_page_url a,.doboard_task_widget-task_title span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.doboard_task_widget-all_issues-container{scrollbar-width:none;margin-top:10px;min-height:60vh}.doboard_task_widget-content.doboard_task_widget-concrete_issue{padding:0;display:flex;flex-direction:column}.doboard_task_widget-concrete_issues-container{padding:10px 16px 5px;flex-grow:1}.doboard_task_widget-all_issues-container::-webkit-scrollbar,.doboard_task_widget-all_issues::-webkit-scrollbar,.doboard_task_widget-concrete_issues-container::-webkit-scrollbar,.doboard_task_widget-content::-webkit-scrollbar{width:0}.doboard_task_widget-task_title{font-weight:700;display:flex;justify-content:space-between;align-items:center}.doboard_task_widget-task_title span{font-weight:700;display:inline-block}.doboard_task_widget-task_title-details{display:flex;max-width:calc(100% - 40px);align-items:center}.doboard_task_widget-task_title-unread_block{opacity:0;height:8px;width:8px;background:#f08c43;border-radius:50%;display:inline-block;font-size:8px;font-weight:600;position:relative}.doboard_task_widget-task_title-unread_block.unread{opacity:1}.doboard_task_widget-task_last_message{max-width:85%;height:36px}.doboard_task_widget-task_page_url{max-width:70%;height:36px;display:flex;align-items:center}.doboard_task_widget-task_page_url a{color:#40484F;text-decoration:none;margin-left:8px;max-width:100%}.doboard_task_widget-bottom{display:flex;justify-content:space-between}.doboard_task_widget-bottom-is-fixed{border-radius:10px;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik03LjA4MTE5IDAuMjIzNDM0QzguOTkxNjkgLTAuMjA4MTY3IDEwLjk5MTMgLTAuMDExMjE5NCAxMi43ODA0IDAuNzg1OTM0QzEzLjE1ODQgMC45NTQ2MjQgMTMuMzI4NiAxLjM5ODAzIDEzLjE2MDMgMS43NzYxN0MxMi45OTE3IDIuMTU0MTkgMTIuNTQ4MiAyLjMyNDI0IDEyLjE3MDEgMi4xNTYwNUMxMC42NzY0IDEuNDkwNTIgOS4wMDcyNiAxLjMyNiA3LjQxMjI1IDEuNjg2MzJDNS44MTcxNyAyLjA0NjcxIDQuMzgwOTcgMi45MTI5NiAzLjMxODUgNC4xNTYwNUMyLjI1NjIzIDUuMzk5MDEgMS42MjQ0MSA2Ljk1MjI5IDEuNTE2NzQgOC41ODM3OUMxLjQwOTI0IDEwLjIxNTQgMS44MzE4NCAxMS44MzkgMi43MjE4MiAxMy4yMTA3QzMuNjExNzkgMTQuNTgyMiA0LjkyMTY0IDE1LjYyOTQgNi40NTUyMSAxNi4xOTYxQzcuOTg5MDIgMTYuNzYyNiA5LjY2NTUzIDE2LjgxODkgMTEuMjMzNSAxNi4zNTUzQzEyLjgwMTYgMTUuODkxNiAxNC4xNzgzIDE0LjkzMzUgMTUuMTU3NCAxMy42MjM4QzE2LjEzNjQgMTIuMzE0MiAxNi42NjYxIDEwLjcyMjcgMTYuNjY3MSA5LjA4NzY5TDE4LjE2NzEgOS4wODg2N0MxOC4xNjU4IDExLjA0NzEgMTcuNTMxMiAxMi45NTM2IDE2LjM1ODUgMTQuNTIyM0MxNS4xODU5IDE2LjA5MDcgMTMuNTM3MyAxNy4yMzg0IDExLjY1OTMgMTcuNzkzN0M5Ljc4MTEgMTguMzQ5MSA3Ljc3MjkzIDE4LjI4MiA1LjkzNTY4IDE3LjYwMzNDNC4wOTg1IDE2LjkyNDYgMi41MjkxMiAxNS42NzAxIDEuNDYzMDMgMTQuMDI3MUMwLjM5NzAzNSAxMi4zODQxIC0wLjEwOTEwOSAxMC40Mzk1IDAuMDE5NjY4MyA4LjQ4NTE1QzAuMTQ4NjA3IDYuNTMwOCAwLjkwNjMyMyA0LjY3MDMzIDIuMTc4ODUgMy4xODE0NEMzLjQ1MTM2IDEuNjkyNjggNS4xNzA4OCAwLjY1NTE2MiA3LjA4MTE5IDAuMjIzNDM0WiIgZmlsbD0iIzIyQTQ3NSIvPg0KPHBhdGggZD0iTTE2Ljg4NTkgMS44OTA0M0MxNy4xNzg2IDEuNTk3NTMgMTcuNjUzNCAxLjU5Nzg0IDE3Ljk0NjQgMS44OTA0M0MxOC4yMzkzIDIuMTgzMTYgMTguMjQwMSAyLjY1Nzk2IDE3Ljk0NzQgMi45NTA5N0w5LjYxMzQyIDExLjI5MjhDOS40NzI4MiAxMS40MzMzIDkuMjgxOTYgMTEuNTEyNCA5LjA4MzE1IDExLjUxMjVDOC44ODQzMiAxMS41MTI1IDguNjkzNDggMTEuNDMzMyA4LjU1Mjg3IDExLjI5MjhMNi4wNTI4NyA4Ljc5Mjc3QzUuNzYwMTQgOC40OTk5IDUuNzYwMTEgOC4wMjUwOCA2LjA1Mjg3IDcuNzMyMjJDNi4zNDU3MiA3LjQzOTM3IDYuODIwNTEgNy40Mzk0NiA3LjExMzQyIDcuNzMyMjJMOS4wODIxNyA5LjcwMDk3TDE2Ljg4NTkgMS44OTA0M1oiIGZpbGw9IiMyMkE0NzUiLz4NCjxwYXRoIGQ9Ik0xNy40MTcxIDcuNTcxMDlDMTcuODMxIDcuNTcxNDQgMTguMTY3IDcuOTA3MTYgMTguMTY3MSA4LjMyMTA5VjkuMDg4NjdMMTcuNDE3MSA5LjA4NzY5SDE2LjY2NzFWOC4zMjEwOUMxNi42NjcyIDcuOTA2OTQgMTcuMDAzIDcuNTcxMDkgMTcuNDE3MSA3LjU3MTA5WiIgZmlsbD0iIzIyQTQ3NSIvPg0KPC9zdmc+) 8px center no-repeat #EBFAF4;padding:4px 7px 4px 30px}.doboard_task_widget-bottom-is-fixed-task-block{text-align:center}.doboard_task_widget-bottom-is-fixed-task{background:#F3F6F9;color:#1C7857;display:inline-block;border-radius:10px;padding:5px 8px;margin:0 auto}.doboard_task_widget-task_row-green{background:#EBF0F4}.doboard_task_widget_return_to_all{display:flex;gap:8px;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:wrap}.doboard_task_widget-task_title-last_update_time{font-family:Inter,serif;font-weight:400;font-style:normal;font-size:11px;leading-trim:NONE;line-height:100%}.doboard_task_widget-task_title_public_status_img{opacity:50%;margin-left:5px;scale:90%}.doboard_task_widget-description-textarea{resize:none}.doboard_task_widget-switch_row{display:flex;align-items:center;gap:12px;margin:16px 0;justify-content:space-between}.doboard_task_widget-switch-label{font-weight:600;font-size:16px;height:24px;align-content:center}.doboard_task_widget-switch{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0}.doboard_task_widget-switch input{opacity:0;width:0;height:0}.doboard_task_widget-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;border-radius:24px;transition:.2s}.doboard_task_widget-slider:before{position:absolute;content:"";height:20px;width:20px;left:2px;bottom:2px;background-color:#fff;border-radius:50%;transition:.2s}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider{background-color:#65D4AC}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider:before{transform:translateX(20px)}.doboard_task_widget-switch-img{width:24px;height:24px;flex-shrink:0}.doboard_task_widget-switch-center{display:flex;gap:2px;flex-direction:column;-moz-flex-direction:column;flex:1 1 auto;min-width:0}.doboard_task_widget-switch-desc{display:block;font-size:12px;color:#707A83;margin:0;line-height:1.2;max-width:180px;word-break:break-word}.doboard_task_widget-concrete_issue-day_content{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-concrete_issue_day_content-month_day{text-align:center;font-weight:400;font-size:12px;line-height:100%;padding:8px;opacity:.75}.doboard_task_widget-concrete_issue_day_content-messages_wrapper{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-comment_data_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;margin-bottom:15px;align-items:flex-end}.doboard_task_widget-comment_text_container{position:relative;width:calc(100% - 44px - 5px);height:auto;margin-left:5px;background:#F3F6F9;border-radius:16px}.doboard_task_widget-comment_text_container:after{content:"";position:absolute;bottom:0;left:-5px;width:13px;height:19px;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxMyAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTEyNTggMTkuMDMzNEM1LjI5NDg2IDE5LjgyMDEgMTAuNjEwNSAxNy45NzQxIDEyLjI3MTUgMTYuMTcxM0MxMi4yNzE1IDE2LjE3MTMgMTAuOTYyMyAtMi43ODEyNCA1LjA5NTU0IDAuMzQ5MDc5QzUuMDc0NCAxLjYxNDU0IDUuMDk1NTQgNS45OTQ5IDUuMDk1NTQgNi43NDA2OUM1LjA5NTU0IDE3LjA2NjIgLTAuODg0MDEyIDE4LjQ0MDEgMC4xMTI1OCAxOS4wMzM0WiIgZmlsbD0iI0YzRjZGOSIvPgo8L3N2Zz4K)}.doboard_task_widget-comment_data_owner .doboard_task_widget-comment_text_container{background:#EBFAF4}.doboard_task_widget-comment_data_owner .doboard_task_widget-comment_text_container:after{left:auto;right:-5px;height:13px;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMyAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjc3NzEgMTIuMzA2NkM3LjMzMTM1IDEzLjA5MzcgMS43NDU0NCAxMS4yNDY5IDAgOS40NDMxOUw3LjM5MTYgMEM3LjM5MTYgMTAuMzMwMyAxMy44MjQ0IDExLjcxMzEgMTIuNzc3MSAxMi4zMDY2WiIgZmlsbD0iI0VCRkFGNCIvPgo8L3N2Zz4K)}.doboard_task_widget-comment_body,.doboard_task_widget-comment_time{position:relative;z-index:1}.doboard_task_widget-comment_body{padding:6px 8px;min-height:30px}.doboard_task_widget-comment_body strong{font-variation-settings:"wght" 700}.doboard_task_widget-comment_body blockquote{margin:0;border-left:3px solid #22a475}.doboard_task_widget-comment_body blockquote p{margin:0 10px}.doboard_task_widget-comment_body details .mce-accordion-body{padding-left:20px}.doboard_task_widget-comment_body details .mce-accordion-summary{background:url("data:image/svg+xml;charset=utf-8,%3Csvg transform='rotate(180 0 0)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20' xml:space='preserve'%3E%3Cpath d='M10 13.3c-.2 0-.4-.1-.6-.2l-5-5c-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0l4.4 4.4 4.4-4.4c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-5 5c-.2.2-.4.2-.6.2z'/%3E%3C/svg%3E") 0 no-repeat;padding-left:20px}.doboard_task_widget-comment_body .mce-accordion[open] .mce-accordion-summary{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20' xml:space='preserve'%3E%3Cpath d='M10 13.3c-.2 0-.4-.1-.6-.2l-5-5c-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0l4.4 4.4 4.4-4.4c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-5 5c-.2.2-.4.2-.6.2z'/%3E%3C/svg%3E") 0 no-repeat}.doboard_task_widget-comment_body details .mce-accordion-summary::marker{content:""}.doboard_task_widget-comment_body pre{border:1px solid #d6dde3;border-left-width:8px;border-radius:4px;padding:13px 16px 14px 12px;white-space:pre-wrap}.doboard_task_widget-comment_time{font-weight:400;font-size:11px;opacity:.8;position:absolute;bottom:6px;right:6px}.doboard_task_widget-comment_body-img-strict{max-width:-webkit-fill-available;height:100px;margin-right:5px}.doboard_task_widget-send_message{border-top:1px solid #BBC7D1;position:sticky;background:#fff;bottom:0;z-index:4}.doboard_task_widget-send_message_elements_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:nowrap;justify-content:space-between;align-items:end}.doboard_task_widget-send_message_elements_wrapper img{margin:0}.doboard_task_widget-send_message_input_wrapper{position:relative;display:inline-grid;align-items:center;justify-items:center;flex-grow:1;padding:0 6px}.doboard_task_widget-send_message_input_wrapper textarea{position:relative;width:100%;height:37px;border:none;outline:0;box-shadow:none;border-radius:24px;background:#F3F6F9;resize:none;margin-bottom:0!important;transition:height .2s ease-in-out;padding:8px;box-sizing:border-box}.doboard_task_widget-send_message_input_wrapper textarea.high{height:170px}.doboard_task_widget-send_message_input_wrapper textarea:focus{background:#F3F6F9;border-color:#007bff;outline:0}.doboard_task_widget-send_message_button{display:inline-grid;border:none;cursor:pointer;padding:0;width:100%;align-items:center;margin:20px 0 0}.doboard_task_widget-send_message_paperclip{display:inline-grid;border:none;background:0 0;cursor:pointer;padding:0;align-items:center;margin:0}.doboard_task_widget-send_message_button:hover,.doboard_task_widget-send_message_paperclip:hover rect{fill:#45a049}.doboard_task_widget-send_message_button:active,.doboard_task_widget-send_message_paperclip:active{transform:scale(.98)}.doboard_task_widget-spinner_wrapper_for_containers{display:flex;justify-content:center;align-items:center;min-height:60px;width:100%}.spotfix_doboard_task_widget_url{background-color:#D6DDE3;padding:12px 16px;display:none}.doboard_task_widget-spinner_for_containers{width:40px;height:40px;border-radius:50%;background:conic-gradient(transparent,#1C7857);mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#fff 0);animation:spin 1s linear infinite}.doboard_task_widget-create_issue{padding:10px}.doboard_task_widget__file-upload__wrapper{display:none;border:1px solid #BBC7D1;margin-top:14px;padding:0 10px 10px;border-radius:4px}.doboard_task_widget__file-upload__list-header{text-align:left;font-size:.9em;margin:5px 0;color:#444c529e}.doboard_task_widget__file-upload__file-input-button{display:none}.doboard_task_widget__file-upload__file-list{border:1px solid #ddd;border-radius:5px;padding:6px;max-height:200px;overflow-y:auto;background:#f3f6f9}.doboard_task_widget__file-upload__file-item{display:flex;justify-content:space-between;align-items:center;padding:4px;border-bottom:1px solid #bbc7d16b}.doboard_task_widget__file-upload__file-item:last-child{border-bottom:none}.doboard_task_widget__file-upload__file_info{display:inline-flex;align-items:center}.doboard_task_widget__file-upload__file-name{font-weight:700;font-size:.9em}.doboard_task_widget__file-upload__file-item-content{width:100%}.doboard_task_widget__file-upload__file_size{color:#666;font-size:.8em;margin-left:6px}.doboard_task_widget__file-upload__remove-btn{background:#22a475;color:#fff;border:none;border-radius:3px;cursor:pointer}.doboard_task_widget__file-upload__error{display:block;margin:7px 0 0;padding:7px;border-radius:4px;background:#fdd;border:1px solid #cf6868}.doboard_task_widget-show_button{position:fixed;background:#1C7857;color:#FFF;padding:8px 12px;border-radius:4px;font-size:14px;z-index:10000;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);transform:translate(-50%,-100%);margin-top:-8px;white-space:nowrap;border:none;font-family:inherit}@keyframes spin{to{transform:rotate(1turn)}}@media (max-width:480px){.doboard_task_widget{position:fixed;right:0;top:auto;bottom:0;margin:0 20px 20px;box-sizing:border-box;transform:translateZ(0);-moz-transform:translateZ(0);will-change:transform;max-height:90vh}.doboard_task_widget-header{padding:8px}.doboard_task_widget-issue-title{max-width:70px}.doboard_task_widget-container,.doboard_task_widget-container-maximize{width:100%;max-width:290px;margin:0 auto;max-height:90vh}.doboard_task_widget-container{min-width:290px}.doboard_task_widget-content{height:auto;max-height:100%;min-height:100%;scrollbar-width:none}.doboard_task_widget-content::-webkit-scrollbar{display:none}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{max-height:80vh}}@supports (-webkit-overflow-scrolling:touch){.doboard_task_widget{position:fixed}}.doboard_task_widget_tasks_list{background-color:#fff;position:sticky;bottom:0;height:38px;display:flex;flex-direction:column-reverse;align-items:center;padding-bottom:8px}#doboard_task_widget-user_menu-logout_button{display:inline-flex;align-items:center}.doboard_task_widget-text_selection{position:relative;display:inline-block}.doboard_task_widget-see-task{cursor:pointer;text-decoration:underline}.doboard_task_widget-text_selection_tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#FFF;color:#000;padding:4px 8px;border-radius:4px;font-size:10px;white-space:nowrap;z-index:9000;border:1px solid #BBC7D1;margin-bottom:8px}.doboard_task_widget-text_selection_tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#FFF}.doboard_task_widget-text_selection_tooltip::before{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#BBC7D1;z-index:-1}.doboard_task_widget-text_selection_tooltip_icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDEwMyAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMyAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMxNzcyNTA7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MywwSDB2MTAwaDMwLjJINTNDMTE5LjYsMTAwLDExOS42LDAsNTMsMHogTTMwLjIsMTAwYy0xNi42LDAtMzAtMTMuNC0zMC0zMHMxMy40LTMwLDMwLTMwDQoJYzE2LjYsMCwzMCwxMy40LDMwLDMwUzQ2LjgsMTAwLDMwLjIsMTAweiIvPg0KPC9zdmc+DQo=);background-repeat:no-repeat;width:22px;height:22px;margin:5px 3px}.doboard_task_widget-text_selection_tooltip_element{display:flex;justify-content:space-between}.doboard_task_widget-content .tox .tox-toolbar__group{padding:0 8px!important}.doboard_task_widget-spotfix-editor .tox-tinymce{border:none!important}.doboard_task_widget-content .tox-tinymce{border:1px solid #BBC7D1;border-radius:4px}.doboard_task_widget-content ol,.doboard_task_widget-content ul{margin:0 0 0 1em!important}.toggle{position:relative;display:inline-block;width:46px;min-width:46px;height:20px}.toggle input{opacity:0;width:0;height:0;position:absolute}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#D6DDE3;border-radius:24px;transition:.3s;height:14px;width:37px}.slider:before{content:"";position:absolute;height:20px;width:20px;top:-3px;left:-2px;background-color:#FFF;border-radius:50%;transition:.3s;box-shadow:0 0 4px rgba(0,0,0,.21)}input:checked+.slider{background-color:#65D4AC80}input:checked+.slider:before{transform:translateX(20px);box-shadow:none;background-color:#65D4AC}.doboard_task_widget-bottom-eye-icon,.doboard_task_widget-bottom-eye-off-icon{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer;border-radius:50%;transition:all .2s ease;z-index:10}.logout_button{font-weight:500;font-size:14px;color:#707A83;cursor:pointer}.doboard_task_widget-forgot_password,.doboard_task_widget-on_phantom_login_page,.doboard_task_widget-show_login_form{display:inline-block;cursor:pointer;color:#2F68B7;margin-bottom:0}.doboard_task_widget-forgot_password{margin-bottom:20px}.doboard_task_widget-login-is-invalid{color:red}.doboard_task_widget-forgot_password_form-menu,.doboard_task_widget-input-container-login-menu{margin:20px}.doboard_task_widget-bottom-eye-icon{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjAgMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwIDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTAsMTcuNGMtNi4yLDAtOS43LTYuOC05LjgtNy4xYy0wLjEtMC4yLTAuMS0wLjUsMC0wLjdDMC4zLDkuNCwzLjgsMi42LDEwLDIuNmM2LjIsMCw5LjcsNi44LDkuOCw3LjENCgljMC4xLDAuMiwwLjEsMC41LDAsMC43QzE5LjcsMTAuNiwxNi4yLDE3LjQsMTAsMTcuNHogTTEuNywxMGMwLjgsMS4zLDMuNyw1LjksOC4zLDUuOWM0LjYsMCw3LjYtNC42LDguMy01LjkNCgljLTAuOC0xLjMtMy43LTUuOS04LjMtNS45QzUuNCw0LjEsMi40LDguNywxLjcsMTB6IE0xMCwxMy4zYy0xLjgsMC0zLjMtMS41LTMuMy0zLjNTOC4yLDYuOCwxMCw2LjhzMy4zLDEuNSwzLjMsMy4zDQoJUzExLjgsMTMuMywxMCwxMy4zeiBNMTAsOC4zQzksOC4zLDguMyw5LDguMywxMFM5LDExLjgsMTAsMTEuOHMxLjgtMC44LDEuOC0xLjhTMTEsOC4zLDEwLDguM3oiLz4NCjwvc3ZnPg0K) center center no-repeat #fff;background-size:16px 16px}.doboard_task_widget-bottom-eye-off-icon{background:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDIwIDIwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMCAyMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjgsMTMuMmMwLjEsMC4xLDAuMywwLjIsMC41LDAuMmMwLDAsMCwwLDAsMGMwLjIsMCwwLjQtMC4xLDAuNS0wLjNjMC43LTAuOSwxLjQtMS44LDEuOS0yLjgNCgljMC4xLTAuMiwwLjEtMC41LDAtMC43Yy0wLjEtMC4zLTMuNi03LjEtOS44LTcuMWMwLDAsMCwwLDAsMGMtMC42LDAtMS4zLDAuMS0xLjksMC4yQzcuOCwyLjksNy42LDMuMSw3LjUsMy4zczAsMC41LDAuMiwwLjcNCglMMTYuOCwxMy4yeiBNMTAsNC4xYzQuNiwwLDcuNiw0LjYsOC4zLDUuOWMtMC4zLDAuNS0wLjYsMS0xLDEuNUw5LjksNC4xQzkuOSw0LjEsMTAsNC4xLDEwLDQuMXogTTE5LjcsMTguNmwtNC4yLTQuMkw1LjYsNC41DQoJYzAsMCwwLDAsMCwwTDEuNCwwLjNDMS4xLDAsMC42LDAsMC4zLDAuM1MwLDEuMSwwLjMsMS40TDMuOSw1QzIuNCw2LjMsMS4xLDcuOSwwLjIsOS42Yy0wLjEsMC4yLTAuMSwwLjUsMCwwLjcNCgljMC4xLDAuMywzLjYsNy4xLDkuOSw3LjFjMS43LDAsMy40LTAuNSw0LjktMS41bDMuOCwzLjhjMC4xLDAuMSwwLjMsMC4yLDAuNSwwLjJzMC40LTAuMSwwLjUtMC4yQzIwLDE5LjQsMjAsMTguOSwxOS43LDE4LjZ6DQoJIE04LjMsOS40bDIuMywyLjNjLTAuMiwwLjEtMC40LDAuMS0wLjYsMC4xYy0wLjIsMC0wLjUsMC0wLjctMC4xYy0wLjItMC4xLTAuNC0wLjItMC42LTAuNGMtMC4yLTAuMi0wLjMtMC40LTAuNC0wLjYNCgljLTAuMS0wLjItMC4xLTAuNS0wLjEtMC43QzguMiw5LjgsOC4yLDkuNiw4LjMsOS40eiBNMTAsMTUuOWMtNC42LDAtNy42LTQuNi04LjMtNS45YzAuOS0xLjUsMi0yLjgsMy4zLTMuOWwyLjIsMi4yDQoJQzcuMSw4LjQsNyw4LjYsNyw4LjdDNi44LDkuMSw2LjcsOS42LDYuNywxMGMwLDAuNCwwLjEsMC45LDAuMiwxLjNjMC4yLDAuNCwwLjQsMC44LDAuNywxLjFjMC4zLDAuMywwLjcsMC42LDEuMSwwLjcNCgljMC40LDAuMiwwLjgsMC4yLDEuMywwLjJjMC40LDAsMC45LTAuMSwxLjMtMC4zYzAuMi0wLjEsMC4zLTAuMiwwLjUtMC4zbDIuMSwyLjFDMTIuNiwxNS41LDExLjMsMTUuOSwxMCwxNS45eiIvPg0KPC9zdmc+DQo=) center center no-repeat #fff;background-size:16px 16px;opacity:.5}.doboard_task_widget-input-container-textarea{position:relative;margin-top:20px}.doboard_task_widget-field-textarea-label{position:absolute;left:10px;top:10px;padding:0 5px;color:#666;background-color:#fff;transition:.2s ease all;pointer-events:none}.doboard_task_widget-input-container-textarea .doboard_task_widget-field~label{top:-10px;left:14px;font-size:10px;color:#252A2F}.doboard_task_widget-concrete_issue .tox-tinymce .tox-toolbar__group{display:inline-flex!important;width:100%!important;justify-content:space-evenly}.doboard_task_widget-container-maximize .doboard_task_widget-concrete_issue .tox-tinymce .tox-toolbar__group>:last-child{flex-grow:1;display:flex;justify-content:flex-end;padding-right:8px}`;
const SPOTFIX_VERSION = "1.1.13";


async function spotFixConfirmUserEmail(emailConfirmationToken, params) {
    const result = await spotFixUserConfirmEmailDoboard(emailConfirmationToken);
    // Save session data to LS
    localStorage.setItem('spotfix_email', result.email);
    localStorage.setItem('spotfix_session_id', result.sessionId);
    localStorage.setItem('spotfix_user_id', result.userId);
    localStorage.setItem('spotfix_widget_is_closed', '0');
    await spotfixIndexedDB.init();
    wsSpotfix.connect();
    wsSpotfix.subscribe();

    // Get pending task from LS
    const pendingTaskRaw = localStorage.getItem('spotfix_pending_task');
    if (!pendingTaskRaw) throw new Error('No pending task data');

    let pendingTask;
    try {
        pendingTask = JSON.parse(pendingTaskRaw);
    } catch (error) {
        throw new Error('Invalid pending task data');
    }

    // Form taskDetails for task creation
    const taskDetails = {
        taskTitle: pendingTask.selectedText || 'New Task',
        taskDescription: pendingTask.description || '',
        selectedData: pendingTask,
        projectToken: params.projectToken,
        projectId: params.projectId,
        accountId: params.accountId,
        taskMeta: JSON.stringify(pendingTask),
    };

    // Create task
    const createdTask = await handleCreateTask(result.sessionId, taskDetails);
    // Clear pending task
    localStorage.removeItem('spotfix_pending_task');

    // Return created task
    return createdTask;
}

async function getTasksFullDetails(params, tasks, currentActiveTaskId, nonRequesting = false) {
    if (tasks.length > 0) {
        const sessionId = localStorage.getItem('spotfix_session_id');
        if (!nonRequesting) {
            await getTasksCommentsDoboard(sessionId, params.accountId, params.projectToken, currentActiveTaskId);
        }
        const comments = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_COMMENTS);
        if (!nonRequesting) {
            await getUserDoboard(sessionId, params.projectToken, params.accountId);
        }
        const users = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_USERS);
        const foundTask = tasks.find((item) => +item.taskId === +currentActiveTaskId);

        return {
            comments: comments,
            users: users,
            taskStatus: foundTask?.taskStatus,
            taskName: foundTask?.taskTitle,
        };
    }
}

async function getUserDetails(params, nonRequesting = false) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const currentUserId = localStorage.getItem('spotfix_user_id');
    if (currentUserId) {
        if (!nonRequesting) {
            await getUserDoboard(sessionId, params.projectToken, params.accountId, currentUserId);
        }
        const users = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_USERS);
        return users.find((user) => +user.user_id === +currentUserId) || {};
    }
}

async function handleCreateTask(sessionId, taskDetails) {
    try {
        const result = await createTaskDoboard(sessionId, taskDetails);
        if (result && result.taskId && taskDetails.taskDescription) {
            const sign = `<br><br><br><em>The spot has been posted at the following URL <a href="${window.location.href}"><span class="task-link task-link--done">${window.location.href}</span></a></em>`;
            await addTaskComment({
                projectToken: taskDetails.projectToken,
                accountId: taskDetails.accountId,
            }, result.taskId, taskDetails.taskDescription+sign);
        }
        return result;
    } catch (err) {
        throw err;
    }
}

async function addTaskComment(params, taskId, commentText) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    if (!sessionId) throw new Error('No session');
    if (!params.projectToken || !params.accountId) throw new Error('Missing params');
    return await createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
}

async function getAllTasks(params, nonRequesting = false) {
    const projectToken = params.projectToken;
    const sessionId = localStorage.getItem('spotfix_session_id') || '';
    if (!nonRequesting) {
        await getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
    }
    const tasksData = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_TASKS);
    storageSaveTasksCount(tasksData);
    // Get only tasks with metadata
    const filteredTaskData = tasksData.filter((task) => {
        return task.taskMeta;
    });

    return filteredTaskData;
}

function formatDate(dateStr) {
	 const months = [
	 	'January', 'February', 'March', 'April', 'May', 'June',
	 	'July', 'August', 'September', 'October', 'November', 'December',
	 ];
	 // dateStr expected format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DDTHH:mm:ssZ'
	 if (!dateStr) return {date: '', time: ''};
	 let dateObj;
	 if (dateStr.includes('T')) {
	  dateObj = new Date(dateStr);
	 } else if (dateStr.includes(' ')) {
	  dateObj = new Date(dateStr.replace(' ', 'T'));
	 } else {
	  dateObj = new Date(dateStr);
	 }
	 if (isNaN(dateObj.getTime())) return {date: '', time: ''};

	 // Adjust to local timezone
	 const offsetMinutes = dateObj.getTimezoneOffset();
	 let localDateObj = new Date(dateObj.getTime() - offsetMinutes * 60000);

	 const month = months[localDateObj.getMonth()];
	 const day = localDateObj.getDate();
	 const date = `${month} ${day}`;
	 const hours = localDateObj.getHours().toString().padStart(2, '0');
	 const minutes = localDateObj.getMinutes().toString().padStart(2, '0');
	 const time = `${hours}:${minutes}`;
	 return {date, time};
}

function getTaskAuthorDetails(params, taskId) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const mockUsersData =
		[
		    {
		        'taskId': '1',
		        'taskAuthorAvatarImgSrc': 'https://s3.eu-central-1.amazonaws.com/cleantalk-ctask-atts/accounts/1/avatars/081a1b65d20fe318/m.jpg',
		        'taskAuthorName': 'Test All Issues Single Author Name',
		    },
		];

    const defaultData =
		{
		    'taskId': null,
		    'taskAuthorAvatarImgSrc': null,
		    'taskAuthorName': 'Task Author',
		};

    const data = mockUsersData.find((element) => element.taskId === taskId);
    return data === undefined ? defaultData : data;
}

function getIssuesCounterString(onPageSpotsCount, totalSpotsCount) {
    return ` (${onPageSpotsCount}/${totalSpotsCount})`;
}

// Get the author's avatar
function getAvatarSrc(author) {
    if (author && author.avatar) {
        if (typeof author.avatar === 'object' && author.avatar.m) {
            return author.avatar.m;
        } else if (typeof author.avatar === 'string') {
            return author.avatar;
        }
    }
    return null;
}

// Get the author's name
function getAuthorName(author) {
    if (author) {
        if (author.name && author.name.trim().length > 0) {
            return author.name;
        } else if (author.email && author.email.trim().length > 0) {
            return author.email;
        }
    }
    return 'Unknown Author';
}

function registerUser(taskDetails) {
    const userEmail = taskDetails.userEmail;
    const userName = taskDetails.userName;
    const projectToken = taskDetails.projectToken;
    const accountId = taskDetails.accountId;
    const pageURL = taskDetails.selectedData.pageURL ? taskDetails.selectedData.pageURL : window.location.href;

    const resultRegisterUser = (showMessageCallback) => registerUserDoboard(projectToken, accountId, userEmail, userName, pageURL)
        .then((response) => {
            if (response.accountExists) {
                document.querySelector('.doboard_task_widget-accordion>.doboard_task_widget-input-container').innerText = ksesFilter('Account already exists. Please, login usin your password.');
                document.querySelector('.doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden').classList.remove('hidden');
                document.getElementById('doboard_task_widget-user_password').focus();
            } else if (response.sessionId) {
                localStorage.setItem('spotfix_session_id', response.sessionId);
                localStorage.setItem('spotfix_user_id', response.userId);
                localStorage.setItem('spotfix_email', response.email);
                localStorage.setItem('spotfix_accounts', JSON.stringify(response.accounts));
                spotfixIndexedDB.init();
                localStorage.setItem('spotfix_widget_is_closed', '0');
                wsSpotfix.connect();
                wsSpotfix.subscribe();
                userUpdate(projectToken, accountId);
            } else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
                if (response.operationMessage == 'Waiting for email confirmation') {
                    response.operationMessage = 'Waiting for an email confirmation. Please check your Inbox.';
                	if (document.getElementById('doboard_task_widget-error_message').innerText === 'Waiting for an email confirmation. Please check your Inbox.') {
                        response.operationMessage = 'Incorrect email address. Please confirm your email to create the spot.';
                    }
                }
                if (typeof showMessageCallback === 'function') {
                    showMessageCallback(response.operationMessage, 'notice');
                }
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                submitButton.disabled = true;
                submitButton.innerText = ksesFilter('Create spot');
            } else {
                throw new Error('Session ID not found in response');
            }
        })
        .catch((error) => {
            throw error;
        });

    return resultRegisterUser;
}

function loginUser(taskDetails) {
    const userEmail = taskDetails.userEmail;
    const userPassword = taskDetails.userPassword;

    return (showMessageCallback) => loginUserDoboard(userEmail, userPassword)
        .then((response) => {
            if (response.sessionId) {
                localStorage.setItem('spotfix_session_id', response.sessionId);
                localStorage.setItem('spotfix_user_id', response.userId);
                localStorage.setItem('spotfix_email', userEmail);
                localStorage.setItem('spotfix_accounts', JSON.stringify(response.accounts));
                checkLogInOutButtonsVisible();
                localStorage.setItem('spotfix_widget_is_closed', '0');
                spotfixIndexedDB.init();
                wsSpotfix.connect();
                wsSpotfix.subscribe();
            } else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
                if (typeof showMessageCallback === 'function') {
                    showMessageCallback(response.operationMessage, 'notice');
                }
            } else {
                throw new Error('Session ID not found in response');
            }
        })
        .catch((error) => {
            throw error;
        });
}

function forgotPassword(userEmail) {
    return (showMessageCallback) => forgotPasswordDoboard(userEmail)
        .then((response) => {
            console.log('response ', response);
            if (response?.operation_status === 'SUCCESS') {
                showMessageCallback('New password sent to email', 'notice');
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.add('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.remove('doboard_task_widget-hidden');
                    if (submitButton) {
                        submitButton.closest('.doboard_task_widget-field').classList.add('doboard_task_widget-hidden');
                    }
                }
            } else {
                throw new Error('Response error');
            }
        })
        .catch((error) => {
            throw error;
        });
}

function userUpdate(projectToken, accountId) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const userId = localStorage.getItem('spotfix_user_id');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return userUpdateDoboard(projectToken, accountId, sessionId, userId, timezone);
}

function spotFixSplitUrl(url) {
    try {
        if (!url || url.trim() === '') {
            return '';
        }
        const u = new URL(url);
        const domain = u.host;

        const segments = u.pathname.split('/').filter(Boolean);

        if (segments.length === 0) {
            return domain;
        }

        const reversed = segments.reverse();
        reversed.push(domain);
        return reversed.join(' / ');
    } catch (error) {
        return '';
    }
}

function setToggleStatus(rootElement) {
    const clickHandler = () => {
        const timer = setTimeout(() => {
            localStorage.setItem('spotfix_widget_is_closed', '1');
            wsSpotfix.close();
            rootElement.hide();
            clearTimeout(timer);
        }, 300);
    };
    const toggle = document.getElementById('widget_visibility');
    if (toggle) {
        toggle.checked = true;
        toggle.addEventListener('click', clickHandler);
    }
}

function checkLogInOutButtonsVisible() {
    if (!localStorage.getItem('spotfix_session_id')) {
        const el = document.getElementById('doboard_task_widget-user_menu-logout_button')?.closest('.doboard_task_widget-user_menu-item');
        if (el) el.style.display = 'none';

        const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
        if (loginContainer) {
            loginContainer.classList.remove('doboard_task_widget-hidden');
        }
        clearUserMenuData();
    } else {
        const el = document.getElementById('doboard_task_widget-user_menu-logout_button')?.closest('.doboard_task_widget-user_menu-item');
        if (el) el.style.display = 'block';
        const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
        if (loginContainer) {
            loginContainer.classList.add('doboard_task_widget-hidden');
        }
    }
}

/**
 * Clear user menu data in menu
 */
async function clearUserMenuData() {
    const userNameElement = document.querySelector('.doboard_task_widget-user_menu-header-user-name');
    const emailElement = document.querySelector('.doboard_task_widget-user_menu-header-email');
    const avatarElement = document.querySelector('.doboard_task_widget-user_menu-header-avatar');

    if (userNameElement) {
        userNameElement.innerText = 'Guest';
    }
    if (emailElement) {
        emailElement.innerText = '';
    }
    if (avatarElement) {
        avatarElement.src = SpotFixSVGLoader.getAsDataURI('iconAvatar');
    }
}

function changeSize(container) {
    if (container && +localStorage.getItem('maximize')) {
        container.classList.add('doboard_task_widget-container-maximize');
    } else if (container) {
        container.classList.remove('doboard_task_widget-container-maximize');
    }
}
function addIconPack() {
    if (SpotFixTinyMCE?.IconManager) {
        SpotFixTinyMCE.IconManager.add('icon_pack_SpotFix', {
            icons: {
                'paperclip': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M14.4648 0.522461C15.6367 0.522493 16.7612 0.987773 17.5898 1.81641C18.4185 2.64507 18.8838 3.76952 18.8838 4.94141C18.8837 6.11309 18.4183 7.23685 17.5898 8.06543L9.15625 16.4902C8.6717 16.9747 8.01428 17.247 7.3291 17.2471C6.64372 17.2471 5.98563 16.9749 5.50098 16.4902C5.01634 16.0056 4.74414 15.3475 4.74414 14.6621C4.74422 13.9769 5.01652 13.3195 5.50098 12.835L13.2842 5.06152C13.5771 4.76897 14.052 4.7688 14.3447 5.06152C14.6374 5.35457 14.6377 5.83034 14.3447 6.12305L6.5625 13.8955C6.35922 14.0988 6.24422 14.3746 6.24414 14.6621C6.24414 14.9497 6.35916 15.2254 6.5625 15.4287C6.76585 15.632 7.04154 15.7471 7.3291 15.7471C7.61656 15.747 7.89243 15.632 8.0957 15.4287L16.5293 7.00488L16.7227 6.79102C17.1482 6.27169 17.3837 5.61868 17.3838 4.94141C17.3838 4.16735 17.0766 3.42431 16.5293 2.87695C15.982 2.32963 15.2389 2.02249 14.4648 2.02246C13.691 2.02253 12.9486 2.32984 12.4014 2.87695L3.97754 11.3018C3.08624 12.1931 2.58504 13.4016 2.58496 14.6621C2.58496 15.9227 3.08617 17.1321 3.97754 18.0234C4.86885 18.9146 6.0775 19.415 7.33789 19.415C8.59844 19.415 9.80788 18.9148 10.6992 18.0234L19.123 9.59961C19.4159 9.30678 19.8907 9.30674 20.1836 9.59961C20.4763 9.8925 20.4764 10.3673 20.1836 10.6602L11.7598 19.084C10.5871 20.2566 8.99626 20.915 7.33789 20.915C5.67955 20.915 4.08866 20.2566 2.91602 19.084C1.74348 17.9113 1.08496 16.3204 1.08496 14.6621C1.08504 13.004 1.74366 11.4138 2.91602 10.2412L11.3408 1.81641C12.1694 0.987987 13.2932 0.52253 14.4648 0.522461Z" fill="#707A83"/>\n' +
					'</svg>',
                'ordered-list': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M3.20117 15.0879C3.36239 15.0879 3.50533 15.1152 3.62891 15.1699C3.75311 15.2246 3.84938 15.3007 3.91895 15.3965C3.98914 15.4915 4.02406 15.6 4.02344 15.7227C4.02486 15.8447 3.98351 15.9453 3.89844 16.0234C3.81392 16.1016 3.70614 16.1479 3.57617 16.1621V16.1787C3.75221 16.1979 3.88486 16.2521 3.97363 16.3408C4.06241 16.4289 4.10591 16.5403 4.10449 16.6738C4.10511 16.8015 4.06658 16.9151 3.98926 17.0137C3.91259 17.1121 3.80577 17.1891 3.66895 17.2451C3.53262 17.3012 3.37547 17.3301 3.19727 17.3301C3.02548 17.3301 2.87273 17.3001 2.73926 17.2412C2.60645 17.1816 2.50178 17.0995 2.42578 16.9951C2.34979 16.8907 2.31126 16.7704 2.31055 16.6348H2.90723C2.90794 16.6766 2.92051 16.7147 2.94531 16.748C2.9708 16.7806 3.00596 16.8058 3.0498 16.8242C3.09379 16.8427 3.14444 16.8525 3.20117 16.8525C3.25586 16.8525 3.30478 16.8424 3.34668 16.8232C3.38835 16.8034 3.42099 16.7759 3.44434 16.7412C3.46765 16.7065 3.47922 16.6667 3.47852 16.6221C3.47919 16.5781 3.46516 16.5389 3.4375 16.5049C3.41056 16.471 3.373 16.4439 3.32422 16.4248C3.27521 16.4056 3.21822 16.3965 3.1543 16.3965H2.93262V15.9873H3.1543C3.213 15.9873 3.26495 15.978 3.30957 15.959C3.35485 15.9399 3.3902 15.9128 3.41504 15.8789C3.44055 15.8449 3.45378 15.8056 3.45312 15.7617C3.45384 15.7191 3.44318 15.6811 3.42188 15.6484C3.40057 15.6158 3.37036 15.5907 3.33203 15.5723C3.29442 15.5538 3.25083 15.5439 3.20117 15.5439C3.14728 15.544 3.0992 15.5541 3.05664 15.5732C3.01479 15.5924 2.98117 15.6183 2.95703 15.6523C2.93296 15.6863 2.92071 15.7257 2.91992 15.7695H2.35352C2.3543 15.6362 2.39053 15.5182 2.46289 15.416C2.53604 15.3138 2.63657 15.234 2.76367 15.1758C2.89074 15.1176 3.03649 15.0879 3.20117 15.0879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 15.75C19.6641 15.7502 20 16.0859 20 16.5C20 16.9141 19.6641 17.2498 19.25 17.25H7.33301C6.91896 17.2498 6.58301 16.9141 6.58301 16.5C6.58301 16.0859 6.91896 15.7502 7.33301 15.75H19.25Z" fill="#707A83"/>\n' +
					'<path d="M3.13965 9.58789C3.31434 9.5879 3.46593 9.61577 3.59375 9.67188C3.72211 9.72721 3.82106 9.80558 3.89062 9.90625C3.96094 10.0071 3.99609 10.1261 3.99609 10.2617C3.99606 10.3454 3.97904 10.4288 3.94434 10.5117C3.90959 10.594 3.84681 10.6852 3.75684 10.7852C3.66666 10.8853 3.53819 11.0051 3.37207 11.1436L3.16699 11.3145V11.3271H4.01953V11.7998H2.34473V11.374L3.15918 10.7002C3.21301 10.6556 3.2586 10.6132 3.29688 10.5742C3.33592 10.5345 3.36613 10.494 3.38672 10.4521C3.40803 10.4102 3.41895 10.3636 3.41895 10.3125C3.41893 10.2566 3.40684 10.2086 3.38281 10.1689C3.35938 10.1292 3.32608 10.0985 3.28418 10.0771C3.24235 10.0552 3.19421 10.044 3.13965 10.0439C3.0851 10.0439 3.03694 10.0552 2.99512 10.0771C2.95394 10.0992 2.92116 10.1312 2.89844 10.1738C2.87571 10.2164 2.86426 10.269 2.86426 10.3301H2.30176C2.30176 10.1768 2.33651 10.0443 2.40527 9.93359C2.47413 9.82286 2.57165 9.73739 2.69727 9.67773C2.82298 9.61808 2.97061 9.58789 3.13965 9.58789Z" fill="#707A83"/>\n' +
					'<path d="M19.25 10.25C19.6641 10.2502 20 10.5859 20 11C20 11.4141 19.6641 11.7498 19.25 11.75H7.33301C6.91896 11.7498 6.58301 11.4141 6.58301 11C6.58301 10.5859 6.91896 10.2502 7.33301 10.25H19.25Z" fill="#707A83"/>\n' +
					'<path d="M3.41406 6.2998H2.82227V4.66309H2.80957L2.33203 4.94922V4.44629L2.86914 4.11816H3.41406V6.2998Z" fill="#707A83"/>\n' +
					'<path d="M19.25 4.75C19.6641 4.75018 20 5.0859 20 5.5C20 5.9141 19.6641 6.24982 19.25 6.25H7.33301C6.91896 6.2498 6.58301 5.91409 6.58301 5.5C6.58301 5.08591 6.91896 4.7502 7.33301 4.75H19.25Z" fill="#707A83"/>\n' +
					'</svg>',
                'screenshot': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M14.667 13C15.352 13.0001 16.0088 13.2724 16.4932 13.7568C16.9776 14.2412 17.2499 14.898 17.25 15.583C17.25 16.2682 16.9776 16.9257 16.4932 17.4102C16.0088 17.8944 15.3519 18.1669 14.667 18.167C13.9818 18.167 13.3243 17.8946 12.8398 17.4102C12.3554 16.9257 12.083 16.2682 12.083 15.583C12.0831 14.8981 12.3556 14.2412 12.8398 13.7568C13.3243 13.2724 13.9818 13 14.667 13ZM14.667 14.5C14.3797 14.5 14.1036 14.6142 13.9004 14.8174C13.6974 15.0205 13.5831 15.2959 13.583 15.583C13.583 15.8703 13.6972 16.1464 13.9004 16.3496C14.1036 16.5528 14.3797 16.667 14.667 16.667C14.9541 16.6669 15.2295 16.5526 15.4326 16.3496C15.6358 16.1464 15.75 15.8703 15.75 15.583C15.7499 15.2958 15.6357 15.0205 15.4326 14.8174C15.2295 14.6143 14.9542 14.5001 14.667 14.5Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4551 9.34277C16.562 9.35633 16.6673 9.38342 16.7676 9.42285L16.915 9.49219L17.0518 9.57812C17.1393 9.6412 17.2188 9.71518 17.2881 9.79785L17.3848 9.92871L18.6504 11.8945H19.6172C19.745 11.8946 19.8722 11.9132 19.9941 11.9502L20.1143 11.9932L20.2295 12.0479C20.3045 12.088 20.3756 12.1355 20.4414 12.1895L20.5361 12.2754L20.6221 12.3691C20.676 12.4349 20.7236 12.506 20.7637 12.5811L20.8184 12.6963L20.8613 12.8174C20.8982 12.9393 20.917 13.0665 20.917 13.1943V19.6162C20.917 19.7869 20.8837 19.9566 20.8184 20.1143C20.7531 20.2717 20.6566 20.4146 20.5361 20.5352C20.4155 20.6558 20.2719 20.7521 20.1143 20.8174C19.9568 20.8826 19.7876 20.9159 19.6172 20.916H9.7168C9.54633 20.916 9.37725 20.8826 9.21973 20.8174C9.06208 20.7521 8.91853 20.6558 8.79785 20.5352C8.67731 20.4146 8.58092 20.2718 8.51562 20.1143C8.45029 19.9565 8.41699 19.7869 8.41699 19.6162V13.1943C8.41699 12.8496 8.55416 12.5192 8.79785 12.2754L8.89355 12.1885C9.12475 11.9993 9.41542 11.8946 9.7168 11.8945H10.6836L11.9492 9.92871L12.0459 9.79785C12.1498 9.67401 12.2763 9.57012 12.4189 9.49219C12.6096 9.38824 12.8239 9.33318 13.041 9.33301H16.293L16.4551 9.34277ZM11.8848 12.7988C11.7672 12.9812 11.6054 13.1313 11.415 13.2354C11.2245 13.3393 11.0101 13.3943 10.793 13.3945H9.91699V19.416H19.417V13.3945H18.541C18.3239 13.3944 18.1096 13.3393 17.9189 13.2354C17.7285 13.1314 17.5668 12.9812 17.4492 12.7988L16.1836 10.833H13.1504L11.8848 12.7988Z" fill="#707A83"/>\n' +
					'<path d="M2.75 15.75C3.16421 15.75 3.5 16.0858 3.5 16.5V18.5H5.04199C5.45606 18.5002 5.79199 18.8359 5.79199 19.25C5.79199 19.6641 5.45606 19.9998 5.04199 20H2.75C2.33579 20 2 19.6642 2 19.25V16.5C2 16.0858 2.33579 15.75 2.75 15.75Z" fill="#707A83"/>\n' +
					'<path d="M2.75 7.95801C3.1641 7.95801 3.49982 8.29394 3.5 8.70801V13.292C3.49982 13.7061 3.16411 14.042 2.75 14.042C2.33589 14.042 2.00018 13.7061 2 13.292V8.70801C2.00018 8.29394 2.3359 7.95801 2.75 7.95801Z" fill="#707A83"/>\n' +
					'<path d="M19.25 7.04199C19.6642 7.04199 20 7.37778 20 7.79199V9.16699C19.9998 9.58106 19.6641 9.91699 19.25 9.91699C18.8359 9.91699 18.5002 9.58106 18.5 9.16699V7.79199C18.5 7.37778 18.8358 7.04199 19.25 7.04199Z" fill="#707A83"/>\n' +
					'<path d="M5.5 2C5.91421 2 6.25 2.33579 6.25 2.75C6.25 3.16421 5.91421 3.5 5.5 3.5H3.5V5.5C3.5 5.91421 3.16421 6.25 2.75 6.25C2.33579 6.25 2 5.91421 2 5.5V2.75C2 2.33579 2.33579 2 2.75 2H5.5Z" fill="#707A83"/>\n' +
					'<path d="M19.25 2C19.6642 2 20 2.33579 20 2.75V5.04199C19.9998 5.45606 19.6641 5.79199 19.25 5.79199C18.8359 5.79199 18.5002 5.45606 18.5 5.04199V3.5H16.5C16.0858 3.5 15.75 3.16421 15.75 2.75C15.75 2.33579 16.0858 2 16.5 2H19.25Z" fill="#707A83"/>\n' +
					'<path d="M13.292 2C13.7061 2.00018 14.042 2.33589 14.042 2.75C14.042 3.16411 13.7061 3.49982 13.292 3.5H8.70801C8.29394 3.49982 7.95801 3.1641 7.95801 2.75C7.95801 2.3359 8.29394 2.00018 8.70801 2H13.292Z" fill="#707A83"/>\n' +
					'</svg>\n',
                'unordered-list': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M2.75879 15.75C3.17279 15.7502 3.50879 16.0859 3.50879 16.5C3.50879 16.9141 3.17279 17.2498 2.75879 17.25H2.75C2.33579 17.25 2 16.9142 2 16.5C2 16.0858 2.33579 15.75 2.75 15.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 15.75C19.6641 15.7502 20 16.0859 20 16.5C20 16.9141 19.6641 17.2498 19.25 17.25H7.33301C6.91896 17.2498 6.58301 16.9141 6.58301 16.5C6.58301 16.0859 6.91896 15.7502 7.33301 15.75H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 10.25C3.17279 10.2502 3.50879 10.5859 3.50879 11C3.50879 11.4141 3.17279 11.7498 2.75879 11.75H2.75C2.33579 11.75 2 11.4142 2 11C2 10.5858 2.33579 10.25 2.75 10.25H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 10.25C19.6641 10.2502 20 10.5859 20 11C20 11.4141 19.6641 11.7498 19.25 11.75H7.33301C6.91896 11.7498 6.58301 11.4141 6.58301 11C6.58301 10.5859 6.91896 10.2502 7.33301 10.25H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 4.75C3.17279 4.75025 3.50879 5.08594 3.50879 5.5C3.50879 5.91406 3.17279 6.24975 2.75879 6.25H2.75C2.33579 6.25 2 5.91421 2 5.5C2 5.08579 2.33579 4.75 2.75 4.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 4.75C19.6641 4.75018 20 5.0859 20 5.5C20 5.9141 19.6641 6.24982 19.25 6.25H7.33301C6.91896 6.2498 6.58301 5.91409 6.58301 5.5C6.58301 5.08591 6.91896 4.7502 7.33301 4.75H19.25Z" fill="#707A83"/>\n' +
					'</svg>',
                'bold': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"\n' +
					'xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd"\n' +
					'd="M12.833 2.91699C14.0044 2.91699 15.1278 3.38265 15.9561 4.21094C16.7843 5.03922 17.25 6.16261 17.25 7.33398C17.2499 8.50524 16.7843 9.62882 15.9561 10.457C15.8706 10.5424 15.7809 10.6226 15.6895 10.7002C16.1237 10.9126 16.5248 11.1957 16.873 11.5439C17.7012 12.3722 18.167 13.4957 18.167 14.667C18.1669 15.8382 17.7013 16.9618 16.873 17.79C16.0448 18.6182 14.9213 19.083 13.75 19.083H5.5C5.08579 19.083 4.75 18.7472 4.75 18.333V3.66699C4.75 3.25278 5.08579 2.91699 5.5 2.91699H12.833ZM6.25 17.583H13.75C14.5235 17.583 15.2655 17.2764 15.8125 16.7295C16.3594 16.1826 16.6669 15.4404 16.667 14.667C16.667 13.8935 16.3594 13.1515 15.8125 12.6045C15.2655 12.0575 14.5235 11.75 13.75 11.75H6.25V17.583ZM6.25 10.25H12.833C13.6064 10.25 14.3486 9.94326 14.8955 9.39648C15.4424 8.84958 15.7499 8.10741 15.75 7.33398C15.75 6.56044 15.4425 5.81847 14.8955 5.27148C14.3485 4.7245 13.6066 4.41699 12.833 4.41699H6.25V10.25Z"\n' +
					'fill="#707A83"/></svg>',
                'italic': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.417 2.91699C17.831 2.91719 18.167 3.2529 18.167 3.66699C18.167 4.08108 17.831 4.41679 17.417 4.41699H14.2695L9.33203 17.583H12.833C13.2472 17.583 13.583 17.9188 13.583 18.333C13.583 18.7472 13.2472 19.083 12.833 19.083H4.58301C4.16896 19.0828 3.83301 18.7471 3.83301 18.333C3.83301 17.9189 4.16896 17.5832 4.58301 17.583H7.73047L12.668 4.41699H9.16699C8.75278 4.41699 8.41699 4.08121 8.41699 3.66699C8.41699 3.25278 8.75278 2.91699 9.16699 2.91699H17.417Z" fill="#707A83"/>\n' +
					'</svg>',
                'strike-through': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.875 10.25C18.2892 10.25 18.625 10.5858 18.625 11C18.625 11.4142 18.2892 11.75 17.875 11.75H15.3926C16.1188 12.5542 16.5625 13.6179 16.5625 14.7812C16.5625 17.2751 14.5251 19.3124 12.0312 19.3125H9.96875C7.61343 19.3124 5.66563 17.4955 5.45605 15.1934C5.41856 14.781 5.72253 14.4157 6.13477 14.3779C6.54713 14.3404 6.91247 14.6443 6.9502 15.0566C7.09006 16.5946 8.39732 17.8124 9.96875 17.8125H12.0312C13.6966 17.8124 15.0625 16.4467 15.0625 14.7812C15.0625 13.1158 13.6966 11.7501 12.0312 11.75H4.125C3.71079 11.75 3.375 11.4142 3.375 11C3.375 10.5858 3.71079 10.25 4.125 10.25H17.875Z" fill="#707A83"/>\n' +
					'<path d="M12.0312 2.6875C14.3869 2.6875 16.3337 4.50478 16.5439 6.80664C16.5816 7.21903 16.2776 7.58424 15.8652 7.62207C15.4528 7.65973 15.0875 7.35577 15.0498 6.94336C14.9093 5.40491 13.6025 4.1875 12.0312 4.1875H9.96875C8.30328 4.1875 6.9375 5.55328 6.9375 7.21875C6.9375 7.71424 7.05778 8.18093 7.27051 8.59375C7.46023 8.96192 7.3154 9.41472 6.94727 9.60449C6.57909 9.79422 6.12628 9.6494 5.93652 9.28125C5.61713 8.66145 5.4375 7.95939 5.4375 7.21875C5.4375 4.72485 7.47485 2.6875 9.96875 2.6875H12.0312Z" fill="#707A83"/>\n' +
					'</svg>',
                'underline': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M18.334 18.5C18.7479 18.5004 19.084 18.836 19.084 19.25C19.084 19.664 18.7479 19.9996 18.334 20H3.66699C3.25278 20 2.91699 19.6642 2.91699 19.25C2.91699 18.8358 3.25278 18.5 3.66699 18.5H18.334Z" fill="#707A83"/>\n' +
					'<path d="M16.5 2C16.9142 2 17.25 2.33579 17.25 2.75V9.16699C17.2499 10.8245 16.591 12.4139 15.4189 13.5859C14.2469 14.7579 12.6575 15.417 11 15.417C9.34247 15.417 7.75314 14.7579 6.58105 13.5859C5.40903 12.4139 4.75009 10.8245 4.75 9.16699V2.75C4.75 2.33579 5.08579 2 5.5 2C5.91421 2 6.25 2.33579 6.25 2.75V9.16699C6.25009 10.4267 6.75088 11.6347 7.6416 12.5254C8.53238 13.4161 9.7403 13.917 11 13.917C12.2597 13.917 13.4676 13.4161 14.3584 12.5254C15.2491 11.6347 15.7499 10.4267 15.75 9.16699V2.75C15.75 2.33579 16.0858 2 16.5 2Z" fill="#707A83"/>\n' +
					'</svg>',
                'quote': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.7002 3.65039C8.21285 3.65046 8.69041 3.87329 9.03125 4.24512C9.36994 4.61478 9.5498 5.1036 9.5498 5.60059V11C9.5498 12.5956 9.25596 13.9528 8.46484 15.1611C7.68229 16.3563 6.4632 17.3296 4.75977 18.2588C4.39633 18.457 3.94071 18.3231 3.74219 17.96C3.54388 17.5964 3.67753 17.1408 4.04102 16.9424C5.63696 16.0718 6.61759 15.2444 7.20996 14.3398C7.68479 13.6146 7.93975 12.7885 8.01953 11.75H3.2998C2.78726 11.7499 2.31053 11.527 1.96973 11.1553C1.631 10.7857 1.45029 10.2977 1.4502 9.80078V5.60059C1.4502 5.10346 1.63083 4.61482 1.96973 4.24512C2.31052 3.87345 2.7873 3.6505 3.2998 3.65039H7.7002ZM3.2998 5.15039C3.2292 5.1505 3.14672 5.18082 3.0752 5.25879C3.00155 5.33918 2.9502 5.46125 2.9502 5.60059V9.80078C2.95029 9.94001 3.00158 10.0623 3.0752 10.1426C3.14668 10.2204 3.22927 10.2499 3.2998 10.25H8.0498V5.60059C8.0498 5.46127 7.99843 5.33918 7.9248 5.25879C7.85322 5.18075 7.77084 5.15046 7.7002 5.15039H3.2998Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7002 3.65039C19.2129 3.65046 19.6904 3.87329 20.0312 4.24512C20.3699 4.61478 20.5498 5.10361 20.5498 5.60059V11C20.5498 12.5956 20.256 13.9528 19.4648 15.1611C18.6823 16.3563 17.4632 17.3296 15.7598 18.2588C15.3963 18.457 14.9407 18.3231 14.7422 17.96C14.5439 17.5964 14.6775 17.1408 15.041 16.9424C16.637 16.0718 17.6176 15.2444 18.21 14.3398C18.6848 13.6146 18.9398 12.7885 19.0195 11.75H14.2998C13.7873 11.7499 13.3105 11.527 12.9697 11.1553C12.631 10.7857 12.4503 10.2977 12.4502 9.80078V5.60059C12.4502 5.10346 12.6308 4.61482 12.9697 4.24512C13.3105 3.87345 13.7873 3.6505 14.2998 3.65039H18.7002ZM14.2998 5.15039C14.2292 5.1505 14.1467 5.18082 14.0752 5.25879C14.0016 5.33918 13.9502 5.46125 13.9502 5.60059V9.80078C13.9503 9.94001 14.0016 10.0623 14.0752 10.1426C14.1467 10.2204 14.2293 10.2499 14.2998 10.25H19.0498V5.60059C19.0498 5.46127 18.9984 5.33918 18.9248 5.25879C18.8532 5.18075 18.7708 5.15046 18.7002 5.15039H14.2998Z" fill="#707A83"/>\n' +
					'</svg>',
                'sendComment': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M20.0693 0.0839539C21.2155 -0.316538 22.3165 0.784532 21.916 1.93073L15.2318 21.0302C14.7974 22.2689 13.0714 22.3389 12.5389 21.1397L9.31353 13.8834L13.8532 9.34265C14.0026 9.18225 14.084 8.97011 14.0801 8.75091C14.0763 8.53171 13.9875 8.32257 13.8325 8.16755C13.6774 8.01252 13.4683 7.92372 13.2491 7.91986C13.0299 7.91599 12.8178 7.99735 12.6574 8.14681L8.11657 12.6865L0.860336 9.4611C-0.338883 8.92749 -0.26781 7.20255 0.969766 6.76822L20.0693 0.0839539Z" fill="#22A475"/>'+
                '</svg>',
            },
        });
    }
}

/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};
    widgetElement = null;
    params = {};
    currentActiveTaskId = 0;
    savedIssuesQuantityOnPage = 0;
    savedIssuesQuantityAll = 0;
    allTasksData = {};
    srcVariables = {};

    /**
     * Constructor
     */
    constructor(selectedData, type) {
        this.selectedData = selectedData || '';
        this.selectedText = selectedData?.selectedText || '';
        this.descriptionText = localStorage.getItem('spotfix-description-ls') || '';
        this.srcVariables = {
            buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
            iconEllipsesMore: SpotFixSVGLoader.getAsDataURI('iconEllipsesMore'),
            iconPlus: SpotFixSVGLoader.getAsDataURI('iconPlus'),
            iconMaximize: SpotFixSVGLoader.getAsDataURI('iconMaximize'),
            iconPublic: SpotFixSVGLoader.getAsDataURI('iconPublic'),
            chevronBack: SpotFixSVGLoader.getAsDataURI('chevronBack'),
            buttonPaperClip: SpotFixSVGLoader.getAsDataURI('buttonPaperClip'),
            buttonSendMessage: SpotFixSVGLoader.getAsDataURI('buttonSendMessage'),
            logoDoBoardGreen: SpotFixSVGLoader.getAsDataURI('logoDoBoardGreen'),
            logoDoBoardWrap: SpotFixSVGLoader.getAsDataURI('logoDoBoardWrap'),
            iconSpotWidgetWrapPencil: SpotFixSVGLoader.getAsDataURI('iconSpotWidgetWrapPencil'),
            iconMarker: SpotFixSVGLoader.getAsDataURI('iconMarker'),
            iconSpotPublic: SpotFixSVGLoader.getAsDataURI('iconSpotPublic'),
            iconSpotPrivate: SpotFixSVGLoader.getAsDataURI('iconSpotPrivate'),
            iconLinkChain: SpotFixSVGLoader.getAsDataURI('iconLinkChain'),
        };
        this.fileUploader = new FileUploader(this.escapeHtml);
        this.init(type);
    }

    /**
     * Initialize the widget
     */
    async init(type) {
        this.params = this.getParams();

        // Check if email_confirmation_token is in URL
        const urlParams = new URLSearchParams(window.location.search);
        const emailToken = urlParams.get('email_confirmation_token');
        if (emailToken) {
            try {
                // Confirm email and create task
                const createdTask = await spotFixConfirmUserEmail(emailToken, this.params);
                this.allTasksData = await getAllTasks(this.params, this.nonRequesting);
                // Open task interface
                this.currentActiveTaskId = createdTask.taskId;
                type = 'concrete_issue';
                storageSetWidgetIsClosed(false);
                // Clear email_confirmation_token from URL
                urlParams.delete('email_confirmation_token');
                const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, document.title, newUrl);
            } catch (err) {
                this.registrationShowMessage('Error confirming email: ' + err.message, 'error');
            }
        } else {
            // Load all tasks
            const isWidgetClosed = localStorage.getItem('spotfix_widget_is_closed');
            if((isWidgetClosed && !this.selectedText) || !isWidgetClosed){
                this.allTasksData = await getAllTasks(this.params, this.nonRequesting);
            }
        }

        // Check if any task has updates
        let taskHasSiteOwnerUpdate;

        if (storageTasksHasUnreadUpdates()) {
            taskHasSiteOwnerUpdate = true;
        } else {
            if (type === 'wrap_review') {
                taskHasSiteOwnerUpdate = await checkIfTasksHasSiteOwnerUpdates(
                    this.allTasksData,
                    this.params
                );
            }
        }
        storageSaveTasksUpdateData(this.allTasksData);
        //check to hide on first run
        if (!storageWidgetCloseIsSet()) {
            storageSetWidgetIsClosed(true);
        }
        //check to show if any task has site owner updates
        if (taskHasSiteOwnerUpdate) {

            storageSetWidgetIsClosed(false);
        }
        this.widgetElement = await this.createWidgetElement(type);
        this.bindWidgetInputsInteractive();
    }

    getParams() {
        const script = document.querySelector(`script[src*="doboard-widget-bundle."]`);
        if ( ! script || ! script.src ) {
            throw new Error('Script not provided');
        }

        const url = new URL(script.src);
        let params = Object.fromEntries(url.searchParams.entries());
        if ( ! params ) {
            throw new Error('Script params not provided');
        }
        if ( ! params.projectToken || ! params.accountId || ! params.projectId ) {
            throw new Error('Necessary script params not provided');

        }
        if (params.accountId) {
            localStorage.setItem('spotfix_company_id', params.accountId);
        }
        if (params.projectToken) {
            localStorage.setItem('spotfix_project_token', params.projectToken);
        }
        return params;
    }

    /**
     * Binding events to create a task
     */
    bindCreateTaskEvents() {
        const submitButton = document.getElementById('doboard_task_widget-submit_button');

        if (submitButton) {
            submitButton.addEventListener('click', async () => {
                // Check required fields: Report about and Description
                const taskTitleElement = document.getElementById('doboard_task_widget-title');
                const taskTitle = taskTitleElement.value;
                if ( ! taskTitle ) {
                    taskTitleElement.style.borderColor = 'red';
                    taskTitleElement.focus();
                    taskTitleElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }
                const taskDescriptionElement = document.getElementById('doboard_task_widget-description')
                const taskDescription = taskDescriptionElement.value;
                if ( ! taskDescription ) {
                    taskDescriptionElement.style.borderColor = 'red';
                    taskDescriptionElement.focus();
                    taskDescriptionElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                // If login section is open, check required fields: Nickname, Email
                let userName = '';
                let userEmail = '';
                let userPassword = '';
                const loginSectionElement = document.querySelector('.doboard_task_widget-login');
                const sessionIdExists = !!localStorage.getItem('spotfix_session_id');

                if ( !sessionIdExists && loginSectionElement && loginSectionElement.classList.contains('active') ) {
                    const userEmailElement = document.getElementById('doboard_task_widget-user_email');
                    const userNameElement = document.getElementById('doboard_task_widget-user_name');
                    const userPasswordElement = document.getElementById('doboard_task_widget-user_password');

                    userEmail = userEmailElement.value;
                    if ( ! userEmail ) {
                        userEmailElement.style.borderColor = 'red';
                        userEmailElement.focus();
                        userEmailElement.addEventListener('input', function() {
                            this.style.borderColor = '';
                        });
                        return;
                    }

                    // This is the registration request
                    if ( userEmailElement && userNameElement ) {
                        userName = userNameElement.value;
                        if ( ! userName ) {
                            userNameElement.style.borderColor = 'red';
                            userNameElement.focus();
                            userNameElement.addEventListener('input', function() {
                                this.style.borderColor = '';
                            });
                            return;
                        }
                    }

                    // This is the login request
                    if ( userEmailElement && userPasswordElement && ! userNameElement ) {
                        userPassword = userPasswordElement.value;
                        if ( ! userPassword ) {
                            userPasswordElement.style.borderColor = 'red';
                            userPasswordElement.focus();
                            userPasswordElement.addEventListener('input', function() {
                                this.style.borderColor = '';
                            });
                            return;
                        }
                    }

                }

                // If it is the login request
                const userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userEmail = userEmailElement.value;

                // Make the submit button disable with spinner
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                submitButton.disabled = true;
                submitButton.innerText = ksesFilter('Creating spot...');

                let taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    //typeSend: typeSend,
                    selectedData: this.selectedData,
                    projectToken: this.params.projectToken,
                    projectId: this.params.projectId,
                    accountId: this.params.accountId,
                    taskMeta: JSON.stringify(this.selectedData ? this.selectedData : { pageURL: window.location.href }),
                };

                if ( userEmail ) {
                    taskDetails.userEmail = userEmail
                }
                if ( userName ) {
                    taskDetails.userName = userName
                }
                if ( userPassword ) {
                    taskDetails.userPassword = userPassword
                }

                // Save pending task in LS
                localStorage.setItem('spotfix_pending_task', JSON.stringify({
                    ...this.selectedData,
                    description: taskDescription
                }));

                let submitTaskResult;
                try {
                    submitTaskResult = await this.submitTask(taskDetails);
                } catch (error) {
                    this.registrationShowMessage(error.message);
                    return;
                }

                // Return the submit button normal state
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';

                if ( submitTaskResult.needToLogin ) {
                    // @ToDo Do not know what to de here: throw an error or pass log message?
                    return;
                }

                if ( submitTaskResult.isPublic !== undefined ) {
                    this.selectedData.isPublic = submitTaskResult.isPublic
                }

                // refersh tasks list after creation
                this.allTasksData = await getAllTasks(this.params, this.nonRequesting);
                // save updates
                storageSaveTasksUpdateData(this.allTasksData);

                this.selectedData = {};
                await this.createWidgetElement('all_issues');
                storageSetWidgetIsClosed(false);
                hideContainersSpinner(false);
            });
        }
    }


    resetLoginForm() {
        const loginContainer = document.querySelector('.doboard_task_widget-input-container-login');
        const phantomContainer = document.querySelector('.doboard_task_widget-input-container-phantom');
        const submitButton = document.getElementById('doboard_task_widget-submit_button');

        if (loginContainer) {
            loginContainer.classList.add('doboard_task_widget-hidden');
        }
        if (phantomContainer) {
            phantomContainer.classList.remove('doboard_task_widget-hidden');
        }
        if (submitButton) {
            submitButton.closest('.doboard_task_widget-field').classList.remove('doboard_task_widget-hidden');
        }
    }
    bindShowLoginFormEvents() {
        const showLoginButton = document.getElementById('doboard_task_widget-show_login_form');
        const showPhantomLoginButton = document.getElementById('doboard_task_widget-on_phantom_login_page');
        const forgotPasswordButton = document.getElementById('doboard_task_widget-forgot_password');
        const forgotPasswordButtonBlack = document.getElementById('doboard_task_widget-forgot_password-black');
        const loginButton = document.getElementById('doboard_task_widget-login_button');
        const restorePasswordButton = document.getElementById('doboard_task_widget-restore_password_button');

        if (showLoginButton) {
            showLoginButton.addEventListener('click', async () => {
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login');
                const phantomContainer = document.querySelector('.doboard_task_widget-input-container-phantom');
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                if (loginContainer) {
                    loginContainer.classList.toggle('doboard_task_widget-hidden');
                    if (submitButton) {
                        if (loginContainer.classList.contains('doboard_task_widget-hidden')) {
                            submitButton.closest('.doboard_task_widget-field').classList.remove('doboard_task_widget-hidden');
                        } else {
                            submitButton.closest('.doboard_task_widget-field').classList.add('doboard_task_widget-hidden');
                        }
                    }
                }
                if (phantomContainer) {
                    phantomContainer.classList.toggle('doboard_task_widget-hidden');
                }
            })
        }
        if (showPhantomLoginButton) {
            showPhantomLoginButton.addEventListener('click', async () => {
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login');
                const phantomContainer = document.querySelector('.doboard_task_widget-input-container-phantom');
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                if (loginContainer) {
                    loginContainer.classList.toggle('doboard_task_widget-hidden');
                    if (submitButton) {
                        if (loginContainer.classList.contains('doboard_task_widget-hidden')) {
                            submitButton.closest('.doboard_task_widget-field').classList.remove('doboard_task_widget-hidden');
                        } else {
                            submitButton.closest('.doboard_task_widget-field').classList.add('doboard_task_widget-hidden');
                        }
                    }
                }
                if (phantomContainer) {
                    phantomContainer.classList.toggle('doboard_task_widget-hidden');
                }
            })
        }
        if (forgotPasswordButton) {
            forgotPasswordButton.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.getElementById('doboard_task_widget-input-container-login');

                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.remove('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.add('doboard_task_widget-hidden');
                }
            })

            forgotPasswordButtonBlack.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
                const submitButton = document.getElementById('doboard_task_widget-submit_button');

                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.add('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.remove('doboard_task_widget-hidden');
                    if (submitButton) {
                        submitButton.closest('.doboard_task_widget-field').classList.add('doboard_task_widget-hidden');
                    }
                }
            })
        }
        const forgotPasswordButtonMenu = document.querySelector('.doboard_task_widget-input-container-login-menu #doboard_task_widget-forgot_password');
        if (forgotPasswordButtonMenu) {
            forgotPasswordButtonMenu.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login-menu');

                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.remove('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.add('doboard_task_widget-hidden');
                }
            });
        }
        const forgotPasswordButtonBlackMenu = document.querySelector('.doboard_task_widget-input-container-login-menu ~ #doboard_task_widget-container-login-forgot-password-form #doboard_task_widget-forgot_password-black');
        if (forgotPasswordButtonBlackMenu) {
             forgotPasswordButtonBlackMenu.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login-menu');

                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.add('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.remove('doboard_task_widget-hidden');
                }
            });
        }
        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                const userEmailElement = document.getElementById('doboard_task_widget-login_email');
                const userPasswordElement = document.getElementById('doboard_task_widget-login_password');
                document.querySelector('.doboard_task_widget-login-is-invalid').classList.add('doboard_task_widget-hidden');

                const userEmail = userEmailElement.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!userEmail) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (!emailRegex.test(userEmail)) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                const userPassword = userPasswordElement.value;
                if (!userPassword) {
                    userPasswordElement.style.borderColor = 'red';
                    userPasswordElement.focus();
                    userPasswordElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (userPassword.length < 6) {
                    userPasswordElement.style.borderColor = 'red';
                    userPasswordElement.focus();
                    userPasswordElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                try {
                    await loginUser({
                        userEmail: userEmail,
                        userPassword: userPassword
                    })(this.registrationShowMessage);
                        this.setUserMenuData();

                        const submitButton = document.getElementById('doboard_task_widget-submit_button');
                        if (submitButton) {
                            submitButton.closest('.doboard_task_widget-field').classList.remove('doboard_task_widget-hidden');
                        }

                } catch (error) {
                    document.querySelector('.doboard_task_widget-login-is-invalid').classList.remove('doboard_task_widget-hidden');
                }
                const sessionIdExists = !!localStorage.getItem('spotfix_session_id');
                const email = localStorage.getItem('spotfix_email');
                if (sessionIdExists && email && !email.includes('spotfix_')) {
                    const loginEl= document.querySelector('.doboard_task_widget-login');
                    loginEl?.classList?.add('doboard_task_widget-hidden');
                } else {
                    document.querySelector('.doboard_task_widget-login-is-invalid').classList.remove('doboard_task_widget-hidden');
                }
            })
        }
        const passwordToggle = document.getElementById('doboard_task_widget-password-toggle');
        const passwordInput = document.getElementById('doboard_task_widget-login_password');

        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', function() {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                this.classList.toggle('doboard_task_widget-bottom-eye-off-icon');
                this.classList.toggle('doboard_task_widget-bottom-eye-icon');
            });
        }
        if (restorePasswordButton) {
            restorePasswordButton.addEventListener('click', async () => {
                const userEmailElement = document.getElementById('doboard_task_widget-forgot_password_email');
                const userEmail = userEmailElement.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!userEmail) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (!emailRegex.test(userEmail)) {

                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();

                    return;
                }

                try {
                    await forgotPassword(userEmail)(this.registrationShowMessage);
                } catch (error) {
                    this.registrationShowMessage(error.message, 'error');
                }
            })
        }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    async createWidgetElement(type, nonRequesting = false, showOnlyCurrentPage = false) {
        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';

        if(!nonRequesting) {
            widgetContainer.innerHTML = ksesFilter('');
        }
        widgetContainer.removeAttribute('style');

        let templateName = '';
        let tasksFullDetails;

        let templateVariables = {};

        const config = window.SpotfixWidgetConfig;

        switch (type) {
            case 'create_issue':
                templateName = 'create_issue';
                this.type_name = templateName;
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                templateVariables = {
                    selectedText: this.selectedText || localStorage.getItem('spotfix-title-ls') || '',
                    currentDomain: document.location.hostname || '',
                    descriptionText: this.descriptionText || localStorage.getItem('spotfix-description-ls') || '',
                    buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
                    iconMaximize: SpotFixSVGLoader.getAsDataURI('iconMaximize'),
                    iconPublic: SpotFixSVGLoader.getAsDataURI('iconPublic'),
                    iconEllipsesMore: SpotFixSVGLoader.getAsDataURI('iconEllipsesMore'),
                    ...this.srcVariables
                };
                storageGetUserIsDefined() && storageSetWidgetIsClosed(false);
                break;
            case 'wrap':
                if (storageGetWidgetIsClosed()) {
                    return;
                }

                templateName = 'wrap';
                this.type_name = templateName;
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                templateVariables = {position: !Number.isNaN(Number(config?.verticalPosition))
                        ? `${Number(config?.verticalPosition)}vh` : '0vh', ...this.srcVariables};
                break;
            case 'wrap_review':
                templateName = 'wrap_review';
                this.type_name = templateName;
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                templateVariables = {position: !Number.isNaN(Number(config?.verticalPosition))
                        ? `${Number(config?.verticalPosition)}vh` : '0vh', ...this.srcVariables};
                break;
            case 'all_issues':
                templateName = 'all_issues';
                this.type_name = templateName;
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                templateVariables = {...this.srcVariables};
                break;
            case 'user_menu':
                templateName = 'user_menu';
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                const version = localStorage.getItem('spotfix_app_version') || SPOTFIX_VERSION;
                templateVariables = {
                    spotfixVersion: version ? 'Spotfix version ' + version + '.' : '',
                    avatar: SpotFixSVGLoader.getAsDataURI('iconAvatar'),
                    iconEye: SpotFixSVGLoader.getAsDataURI('iconEye'),
                    iconDoor: SpotFixSVGLoader.getAsDataURI('iconDoor'),
                    chevronBackDark: SpotFixSVGLoader.getAsDataURI('chevronBackDark'),
                    buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
                    userName: 'Guest',
                    email: localStorage.getItem('spotfix_email') || '',
                    ...this.srcVariables};
                break;
            case 'concrete_issue':
                templateName = 'concrete_issue';
                this.type_name = templateName;
                this.socket_type_name = templateName;
                this.nonRequesting = nonRequesting;
                // Update the number of tasks
                this.savedIssuesQuantityAll = Array.isArray(this.allTasksData) ? this.allTasksData.length : 0;
                // Calculate the number of issues on the current page
                this.savedIssuesQuantityOnPage = Array.isArray(this.allTasksData)
                    ? this.allTasksData.filter(task => {
                        try {
                            const meta = task.taskMeta ? JSON.parse(task.taskMeta) : {};
                            return meta.pageURL === window.location.href;
                        } catch (e) { return false; }
                    }).length
                    : 0;

                templateVariables = {
                    issueTitle: '...',
                    issueComments: [],
                    issuesCounter: getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll),
                    ...this.srcVariables,
                };
                break;
            default:
                break;
        }
        if(!nonRequesting) {
            widgetContainer.innerHTML = this.loadTemplate(templateName, templateVariables);
            document.body.appendChild(widgetContainer);

            // remove highlights before any screen called
            spotFixRemoveHighlights();
        }
        const container = document.querySelector('.doboard_task_widget-container');
        switch (type) {
            case 'create_issue':

                if(container && +localStorage.getItem('maximize')){
                    container.classList.add('doboard_task_widget-container-maximize');
                } else if(container) {
                    container.classList.remove('doboard_task_widget-container-maximize');
                }
                // highlight selected item during task creation
                const selection = window.getSelection();
                const sessionIdExists = !!localStorage.getItem('spotfix_session_id');
                const email = localStorage.getItem('spotfix_email');

                if (templateVariables.selectedText) {
                    document.querySelector('.spotfix_placeholder_title').style.display = 'none';
                }

                if (sessionIdExists && email && !email.includes('spotfix_')) {
                    document.querySelector('.doboard_task_widget-login').classList.add('hidden');
                }

                if (
                    selection.type === 'Range'
                ) {
                    const selectedData = spotFixGetSelectedData(selection);
                    if (selectedData) {
                        spotFixScrollToNodePath(selectedData.nodePath);
                        this.positionWidgetContainer();
                    }
                }
                // bind creation events
                this.bindCreateTaskEvents();
                this.bindShowLoginFormEvents();

                if (tinymce.get('doboard_task_widget-description')) {
                    tinymce.remove('#doboard_task_widget-description');
                }

                const savedDescription = localStorage.getItem('spotfix-description-ls') || '';

                SpotFixTinyMCE.init({
                    selector: '#doboard_task_widget-description',
                    plugins: 'link lists',
                    menubar: false,
                    statusbar: false,
                    toolbar_location: 'bottom',
                    height: '100%',
                    width: '100%',
                    toolbar: 'attachmentButton screenshotButton emoticons bullist numlist bold italic strikethrough underline blockquote',
                    icons: 'icon_pack_SpotFix',
                    file_picker_types: 'file image media',
                    setup: function (editor) {
                        editor.on('init', function() {
                            if (savedDescription) {
                                editor.setContent(savedDescription, { format: 'html' });
                            }

                            setTimeout(() => {
                                editor.save();
                            });
                        });
                        editor.on('change', function () {
                            editor.save();
                            const content = editor.getContent();
                            localStorage.setItem('spotfix-description-ls', content);
                        });
                        editor.ui.registry.addButton('attachmentButton', {
                            icon: 'paperclip',
                            tooltip: 'In development',
                            disabled: true,
                            onAction: (e) => {
                                // fileUploader?.fileInput?.click(e);
                            },
                        });
                        editor.ui.registry.addButton('screenshotButton', {
                            icon: 'screenshot',
                            tooltip: 'In development',
                            disabled: true,
                            onAction: (e) => {
                                // fileUploader?.makeScreenshot();
                            },
                        });
                     }
                    })

                break;
            case 'wrap':
                await this.getTaskCount();
                document.querySelector('.doboard_task_widget-wrap').addEventListener('click', (e) => {
                    const widgetElementClasses = e.currentTarget.classList;
                    if (widgetElementClasses && !widgetElementClasses.contains('hidden')) {
                        this.createWidgetElement('all_issues');
                    }
                });
                hideContainersSpinner(false);
                break;
            case 'wrap_review':
                document.querySelector('#doboard_task_widget_button').addEventListener('click', (e) => {
                    spotFixOpenWidget(this.selectedData, 'create_issue');
                });
                break;
            case 'all_issues':
                if (this.nonRequesting) {
                    hideContainersSpinner();
                } else {
                    changeSize(container);
                }
                    spotFixRemoveHighlights();
                let issuesQuantityOnPage = 0;
                this.allTasksData = await getAllTasks(this.params, this.nonRequesting);
                const tasks = this.allTasksData;
                tasksFullDetails = await getTasksFullDetails(this.params, tasks, this.currentActiveTaskId, this.nonRequesting);
                let spotsToBeHighlighted = [];
                if (tasks.length > 0) {
                    const currentURL = window.location.href;
                    const sortedTasks = tasks.sort((a, b) => {
                        const aIsHere = JSON.parse(a.taskMeta).pageURL === currentURL ? 1 : 0;
                        const bIsHere = JSON.parse(b.taskMeta).pageURL === currentURL ? 1 : 0;
                        return bIsHere - aIsHere;
                    });

                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';

                    for (let i = 0; i < sortedTasks.length; i++) {
                        const elTask = sortedTasks[i];

                        // Data from api
                        const taskId = elTask.taskId;
                        const taskTitle = elTask.taskTitle;
                        const taskMetaString = elTask.taskMeta;
                        let taskData = null;
                        if (taskMetaString) {
                            try {
                                taskData = JSON.parse(taskMetaString);
                                taskData.isFixed = elTask.taskStatus === 'DONE';
                                taskData.taskId = elTask.taskId;
                            } catch (error) {
                                taskData = null;
                            }
                        }
                        const currentPageURL = taskData ? taskData.pageURL : '';
                        let taskNodePath = ''; // nodePath need for only current page's spots

                        // Define publicity details
                        let taskPublicStatusImgSrc = '';
                        let taskPublicStatusHint = 'Task publicity is unknown'
                        if (taskData && taskData.isPublic !== undefined) {
                            if (taskData.isPublic) {
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPublic;
                                taskPublicStatusHint = 'The task is public';
                            } else {
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPrivate;
                                taskPublicStatusHint = 'The task is private and visible only for registered DoBoard users';
                            }
                        }

                        if(currentPageURL === window.location.href){
                            issuesQuantityOnPage++;
                            taskNodePath = taskData ? taskData.nodePath : '';
                        }

                        if (!showOnlyCurrentPage || currentPageURL === window.location.href) {

                            const taskFullDetails = getTaskFullDetails(tasksFullDetails, taskId)

                            const avatarData = getAvatarData(taskFullDetails);

                            const listIssuesTemplateVariables = {
                                taskTitle: taskTitle || '',
                                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                                taskAuthorName: taskFullDetails.taskAuthorName,
                                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                                taskPublicStatusHint: taskPublicStatusHint,
                                taskLastMessage: ksesFilter(taskFullDetails.lastMessageText),
                                taskPageUrlFull: currentPageURL,
                                iconLinkChain: this.srcVariables.iconLinkChain,
                                taskFormattedPageUrl: spotFixSplitUrl(currentPageURL),
                                taskPageUrl: localStorage.getItem('maximize') === '1' ? currentPageURL : spotFixSplitUrl(currentPageURL),
                                taskLastUpdate: taskFullDetails.lastMessageTime,
                                nodePath: this.sanitizeNodePath(taskNodePath),
                                taskId: taskId,
                                avatarCSSClass: avatarData.avatarCSSClass,
                                avatarStyle: avatarData.avatarStyle,
                                taskAuthorInitials: avatarData.taskAuthorInitials,
                                initialsClass: avatarData.initialsClass,
                                classUnread: '',
                                elementBgCSSClass: elTask.taskStatus !== 'DONE' ? '' : 'doboard_task_widget-task_row-green',
                                statusFixedHtml: elTask.taskStatus !== 'DONE' ? '' : this.loadTemplate('fixedHtml'),
                            };

                            const taskOwnerReplyIsUnread = storageProvidedTaskHasUnreadUpdates(taskFullDetails.taskId);
                            if (taskOwnerReplyIsUnread) {
                                listIssuesTemplateVariables.classUnread = 'unread';
                            }
                            document.querySelector(".doboard_task_widget-all_issues-container").innerHTML += this.loadTemplate('list_issues', listIssuesTemplateVariables);

                            if ( this.isSpotHaveToBeHighlighted(taskData) ) {
                                spotsToBeHighlighted.push(taskData);
                            }
                        }
                    }
                    this.savedIssuesQuantityOnPage = issuesQuantityOnPage;
                    this.savedIssuesQuantityAll = tasks.length;
                    spotFixHighlightElements(spotsToBeHighlighted, this);
                    document.querySelector('.doboard_task_widget-header span').innerHTML = ksesFilter('All spots ' + getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll));
                }

                if (tasks.length === 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = ksesFilter('<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>');
                }

                // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
                this.bindIssuesClick();
                hideContainersSpinner(false);
                break;
        case 'user_menu':

                setToggleStatus(this);
                checkLogInOutButtonsVisible();

                const user = await getUserDetails(this.params, this.nonRequesting);
                if(!this.nonRequesting) await getReleaseVersion();
                let spotfixVersion = '';
                const version = localStorage.getItem('spotfix_app_version') || SPOTFIX_VERSION;
                spotfixVersion = version ? `Spotfix version ${version}.` : '';

                templateVariables.spotfixVersion = spotfixVersion || '';

                if(user){
                    templateVariables.userName = user.name || 'Guest';
                    templateVariables.email = user.email || localStorage.getItem('spotfix_email') || '';
                    if(user?.avatar?.s) templateVariables.avatar = user?.avatar?.s;
                }

                widgetContainer.innerHTML = this.loadTemplate('user_menu', templateVariables);
                document.body.appendChild(widgetContainer);
                setToggleStatus(this);
                checkLogInOutButtonsVisible();
                this.bindShowLoginFormEvents();
                this.bindWidgetInputsInteractive();

                break;
        case 'concrete_issue':
                if(this.nonRequesting) {
                    hideContainersSpinner();
                    this.allTasksData = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_TASKS);
                } else {
                    changeSize(container);
                }
                tasksFullDetails = await getTasksFullDetails(this.params, this.allTasksData, this.currentActiveTaskId, this.nonRequesting);
                const taskDetails = await getTaskFullDetails(tasksFullDetails, this.currentActiveTaskId, this.nonRequesting);
                // Update issue title in the interface
                const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                    issueTitleElement.innerText = ksesFilter(tasksFullDetails.taskName || taskDetails?.issueTitle);
                }
                templateVariables.issueTitle = tasksFullDetails.taskName || taskDetails?.issueTitle;
                templateVariables.issueComments = taskDetails?.issueComments;
                templateVariables.amountOfComments = `${taskDetails?.issueComments.length || 0} messages`;
                // Highlight the task's selected text
                let nodePath = null;
                    const currentTaskData = this.allTasksData.find((element) => String(element.taskId) === String(taskDetails.taskId));
                    let meta = null;

                    if (currentTaskData && currentTaskData.taskMeta) {
                        try {
                            meta = JSON.parse(currentTaskData.taskMeta);
                            nodePath = meta.nodePath || null;
                        } catch (e) { nodePath = null; meta = null; }
                    }

            templateVariables.taskPageUrl = meta.pageURL;
            const taskFormattedPageUrl = meta.pageURL.replace(window.location.origin, '');
            templateVariables.taskFormattedPageUrl = taskFormattedPageUrl.length < 2
                ? meta.pageURL.replace(/^https?:\/\//, '') : taskFormattedPageUrl;

            const issueLinkElement = document.getElementById('spotfix_doboard_task_widget_url');
            if (issueLinkElement) {
                issueLinkElement.innerHTML = `<a rel="nofollow" href="${meta.pageURL}">${templateVariables.taskFormattedPageUrl}</a>`;
            }

            templateVariables.contenerClasess = +localStorage.getItem('maximize')
                ? 'doboard_task_widget-container-maximize doboard_task_widget-container' : 'doboard_task_widget-container'
            if (this.nonRequesting) {
                const containerEl = document.getElementById('doboard_task_widget_concrete-container');
                if (containerEl) {
                    containerEl.className = templateVariables.contenerClasess;
                }
            }
            if (!this.nonRequesting) {
                widgetContainer.innerHTML = this.loadTemplate('concrete_issue', templateVariables);
                document.body.appendChild(widgetContainer);
            }

                    // remove old highlights before adding new ones
                    spotFixRemoveHighlights();

                    if (meta && nodePath) {
                        // Pass the task meta object as an array
                        spotFixHighlightElements([meta], this);
                        if (typeof spotFixScrollToNodePath === 'function') {
                            spotFixScrollToNodePath(nodePath);
                        }
                    }

                const issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
                if (!issuesCommentsContainer) return;

                const currentScrollTop = issuesCommentsContainer.scrollTop;
                const wasAtBottom = currentScrollTop + issuesCommentsContainer.clientHeight >= issuesCommentsContainer.scrollHeight - 10;

                let dayMessagesData = [];
                const initIssuerID = localStorage.getItem('spotfix_user_id');
                let userIsIssuer = false;
                if ( taskDetails.issueComments.length > 0 ) {
                    storageRemoveUnreadUpdateForTaskID(taskDetails.taskId);
                    issuesCommentsContainer.innerHTML = ksesFilter('');
                    for (const comment of taskDetails.issueComments) {
                        userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                        const avatarData = getAvatarData({
                            taskAuthorAvatarImgSrc: comment.commentAuthorAvatarSrc,
                            taskAuthorName: comment.commentAuthorName,
                        });
                        const commentData = {
                            commentAuthorName: comment.commentAuthorName,
                            commentBody: comment.commentBody,
                            commentDate: comment.commentDate,
                            commentTime: comment.commentTime,
                            issueTitle: templateVariables.issueTitle,
                            avatarCSSClass: avatarData.avatarCSSClass,
                            avatarStyle: avatarData.avatarStyle,
                            taskAuthorInitials: avatarData.taskAuthorInitials,
                            initialsClass: avatarData.initialsClass,
                            issueMessageClassOwner: userIsIssuer ? 'owner' : 'guest',
                        };
                        if (dayMessagesData[comment.commentDate] === undefined) {
                            dayMessagesData[comment.commentDate] = [];
                            dayMessagesData[comment.commentDate].push(commentData);
                        } else {
                            dayMessagesData[comment.commentDate].push(commentData);
                        }
                    }
                    let daysWrapperHTML = '';

                    for (const day in dayMessagesData) {
                        let currentDayMessages = dayMessagesData[day];
                        let dayMessagesWrapperHTML = '';
                        currentDayMessages.sort((a, b) => a.commentTime.localeCompare(b.commentTime));
                        for (const messageId in currentDayMessages) {
                            let currentMessageTemplateVariables = currentDayMessages[messageId];
                            dayMessagesWrapperHTML += this.loadTemplate('concrete_issue_messages', currentMessageTemplateVariables);
                        }
                        daysWrapperHTML += this.loadTemplate('concrete_issue_day_content',
                            {
                                dayContentMonthDay: day,
                                dayContentMessages: dayMessagesWrapperHTML,
                                statusFixedHtml: tasksFullDetails?.taskStatus !== 'DONE' ? '' : this.loadTemplate('fixedTaskHtml')
                            },
                        );
                    }

                    if (!this.nonRequesting) {
                        issuesCommentsContainer.innerHTML = daysWrapperHTML;
                    } else {
                        if (issuesCommentsContainer.innerHTML !== daysWrapperHTML) {
                            issuesCommentsContainer.innerHTML = daysWrapperHTML;
                        }
                    }

                } else {
                    issuesCommentsContainer.innerHTML = ksesFilter('No comments');
                }

                // textarea (new comment) behaviour
                const textarea = document.querySelector('.doboard_task_widget-send_message_input');
                if (textarea) {
                    function handleTextareaChange() {
                        const triggerChars = 40;

                        if (this.value.length > triggerChars) {
                            this.classList.add('high');
                        } else {
                            this.classList.remove('high');
                        }
                    }
                    textarea.addEventListener('input', handleTextareaChange)
                    textarea.addEventListener('change', handleTextareaChange)

                    const fileUploader = this.fileUploader;

                    if (tinymce.get('doboard_task_widget-send_message_input_SpotFix')) {
                        tinymce.remove('#doboard_task_widget-send_message_input_SpotFix');
                    }

                    const mainThis = this;

                    SpotFixTinyMCE.init({
                        selector: '#doboard_task_widget-send_message_input_SpotFix',
                        plugins: 'link lists',
                        menubar: false,
                        placeholder: 'Write a message...',
                        content_style: `body[data-mce-placeholder]:not(.mce-content-body:not([data-mce-placeholder]))::before {
                                color: #707A83 !important;}`,
                        statusbar: false,
                        toolbar_location: 'bottom',
                        toolbar: 'attachmentButton screenshotButton emoticons bullist numlist bold italic strikethrough underline blockquote sendCommentButton',
                        height: 120,
                        icons: 'icon_pack_SpotFix',
                        file_picker_types: 'file image media',
                        setup: function (editor) {
                            editor.on('change', function () {
                                editor.save();
                            });
                            editor.on('init', () => {
                                // Scroll to the bottom comments
                                if(!this.nonRequesting) {
                                    const container = document.querySelector('.doboard_task_widget-concrete_issues-container');

                                    if (container) {
                                        setTimeout(() => {
                                            const scrollPosition = container.scrollHeight;
                                            container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                                        }, 50);
                                    }
                                }
                            });
                            editor.ui.registry.addButton('attachmentButton', {
                                icon: 'paperclip',
                                tooltip: 'Add file',
                                    onAction: (e) => {
                                       fileUploader?.fileInput?.click(e);

                                    },
                                });
                            editor.ui.registry.addButton('screenshotButton', {
                                icon: 'screenshot',
                                tooltip: 'Screenshot',
                                onAction: (e) => {
                                   fileUploader?.makeScreenshot();
                                },
                                });
                            editor.ui.registry.addButton('sendCommentButton', {
                                icon: 'sendComment',
                                tooltip: 'Send comment',
                                onAction: (e) => {
                                    clickHandler(mainThis, editor);
                                },
                            });
                            }
                        });
                    }

            if(this.nonRequesting) {
                const container = document.querySelector('.doboard_task_widget-concrete_issues-container');

                if (container) {
                    setTimeout(() => {
                        const scrollPosition = container.scrollHeight;
                        container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                    }, 50);
                }
            }

                // Hide spinner preloader
                hideContainersSpinner();

                const sendButton = document.querySelector('.doboard_task_widget-send_message_button');
                    this.fileUploader.init();

                    async function clickHandler(mainThis, editor)  {

                        const sendMessageContainer = sendButton?.closest('.doboard_task_widget-send_message');
                        const input = sendMessageContainer?.querySelector('.doboard_task_widget-send_message_input');

                        const commentText =  editor?.getContent({ format: 'html' })?.trim();

                            if (!commentText) return;

                        // Add other fields handling here

                        input.disabled = true;
                        sendButton.disabled = true;

                        let newCommentResponse = null;

                        try {
                            newCommentResponse = await addTaskComment(mainThis.params, mainThis.currentActiveTaskId, commentText);
                            input.value = '';
                            await mainThis.createWidgetElement('concrete_issue');
                            hideContainersSpinner(false);
                        } catch (err) {
                            alert('Error when adding a comment: ' + err?.message);
                        }

                        if (mainThis && mainThis?.fileUploader?.hasFiles() && newCommentResponse !== null && newCommentResponse?.hasOwnProperty('commentId')) {
                            const sessionId = localStorage.getItem('spotfix_session_id');
                            const attachmentsSendResult = await mainThis?.fileUploader?.sendAttachmentsForComment(mainThis?.params, sessionId, newCommentResponse?.commentId);
                            if (!attachmentsSendResult.success) {
                                mainThis?.fileUploader?.showError('Some files where no sent, see details in the console.');
                                const toConsole = JSON.stringify(attachmentsSendResult);
                                console.log(toConsole);
                            }
                        }

                        input.disabled = false;

                    };
                    // this._sendButtonClickHandler = clickHandler;
                    //
                    // sendButton.addEventListener('click', clickHandler);


                break;

            default:
                break;
        }

        const backToAllIssuesController = document.querySelector('.doboard_task_widget_return_to_all');
        const widgetClass = this;
        if ( backToAllIssuesController ) {
            backToAllIssuesController.addEventListener('click', function(e, self = widgetClass) {
                self.createWidgetElement('all_issues');
            });
        }

        const paperclipController = document.querySelector('.doboard_task_widget-send_message_paperclip');
        if ( paperclipController ) {
            this.fileUploader.bindPaperClipAction(paperclipController);
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', (e) => {
            const widgetContainer = e.target.closest('.doboard_task_widget-container');
            if (widgetContainer && widgetContainer.querySelector('.doboard_task_widget-create_issue')) {
                // If it Create issue interface - do not close widget
                storageSetWidgetIsClosed(false);
            }
            this.hide();
        }) || '';

        document.querySelector('#openUserMenuButton')?.addEventListener('click', () => {
            this.createWidgetElement('user_menu')
        }) || '';

        document.querySelector('#doboard_task_widget-user_menu-logout_button')?.addEventListener('click', () => {
            logoutUserDoboard(this.params.projectToken);
        }) || '';

        document.getElementById('addNewTaskButton')?.addEventListener('click', () => {
            spotFixShowWidget();
        }) || '';

        document.getElementById('maximizeWidgetContainer')?.addEventListener('click', () => {
            const container = document.querySelector('.doboard_task_widget-container');

            const isMaximized =
                +localStorage.getItem('maximize') &&
                container.classList.contains('doboard_task_widget-container-maximize');

            if (isMaximized) {
                localStorage.setItem('maximize', '0');
                container.classList.remove('doboard_task_widget-container-maximize');

                if (this.type_name === 'all_issues') {
                    document
                        .querySelectorAll('.spotfix_widget_task_url-full')
                        .forEach(el => (el.style.display = 'none'));
                    document
                        .querySelectorAll('.spotfix_widget_task_url')
                        .forEach(el => (el.style.display = 'none'));
                    document
                        .querySelectorAll('.spotfix_widget_task_url-short')
                        .forEach(el => (el.style.display = 'inline'));
                }
            } else {
                localStorage.setItem('maximize', '1');
                container.classList.add('doboard_task_widget-container-maximize');

                if (this.type_name === 'all_issues') {
                    document
                        .querySelectorAll('.spotfix_widget_task_url-full')
                        .forEach(el => (el.style.display = 'inline'));
                    document
                        .querySelectorAll('.spotfix_widget_task_url-short')
                        .forEach(el => (el.style.display = 'none'));
                    document
                        .querySelectorAll('.spotfix_widget_task_url')
                        .forEach(el => (el.style.display = 'none'));
                }
            }
        });


        document.querySelector('#doboard_task_widget-user_menu-signlog_button')?.addEventListener('click', () => {
            spotFixShowWidget();
        }) || '';

        document.querySelector('#spotfix_back_button')?.addEventListener('click', () => {
            this.createWidgetElement(this.type_name)
            this.bindWidgetInputsInteractive();
        }) || '';

        wsSpotfix.onMessage(() => {
            this.createWidgetElement(this.socket_type_name, true)
        });

        document.getElementById('doboard_task_widget-title')?.addEventListener('change', (e) => {
            localStorage.setItem('spotfix-title-ls', e.target.value);
            if (e.target.value.length < 1) {
                document.querySelector('.spotfix_placeholder_title').style.display = 'block';
            }
        });

        return widgetContainer;
    }



    bindIssuesClick() {
        document.querySelectorAll('.issue-item').forEach(item => {
            item.addEventListener('click', async (event) => {
                const titleEl = event.target.closest('.doboard_task_widget-task_title');

                if (!titleEl || !item.contains(titleEl)) {
                    return;
                }

                let nodePath = null;
                try {
                    nodePath = JSON.parse(item.getAttribute('data-node-path'));
                } catch (error) {
                    nodePath = null;
                }

                if (nodePath) {
                    spotFixScrollToNodePath(nodePath);
                }

                this.currentActiveTaskId = item.getAttribute('data-task-id');
                await this.showOneTask();
            });
        });
    }


    /**
     * Show one task
     *
     * @return {Promise<void>}
     *
     */
    async showOneTask() {
        await this.createWidgetElement('concrete_issue');
        const taskHighlightData = this.getTaskHighlightData(this.currentActiveTaskId)

        if (taskHighlightData) {
            spotFixRemoveHighlights();
            spotFixHighlightElements([taskHighlightData], this)
            this.positionWidgetContainer();
        }

        hideContainersSpinner(false);
    }

    /**
     * Load the template
     *
     * @param templateName
     * @param variables
     * @return {string}
     * @ToDo have to refactor templates loaded method: need to be templates included into the bundle
     *
     */
    loadTemplate(templateName, variables = {}) {
        let template = SpotFixTemplatesLoader.getTemplateCode(templateName);

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            let replacement;

            // 1) For attributes we MUST use escapeHtml!
            // 2) Only for HTML inserts we must clean data by ksesFilter
            // Check if placeholder is used in an attribute context
            if (this.isPlaceholderInAttribute(template, placeholder)) {
                // For attributes, use escapeHtml to prevent XSS
                replacement = this.escapeHtml(String(value));
            } else {
                // For HTML content, use ksesFilter to sanitize HTML
                replacement = ksesFilter(String(value), {template: templateName, imgFilter: true});
            }

            template = template.replaceAll(placeholder, replacement);
        }

        return ksesFilter(template, {template: templateName});
    }

    /**
     * Check if a placeholder is used inside an HTML attribute
     * @param {string} template - The template string
     * @param {string} placeholder - The placeholder to check (e.g., "{{key}}")
     * @return {boolean} - True if placeholder is in an attribute context
     */
    isPlaceholderInAttribute(template, placeholder) {
        // Escape special regex characters in placeholder
        const escapedPlaceholder = placeholder.replace(/[{}]/g, '\\$&');

        // Pattern to match attribute="..." or attribute='...' containing the placeholder
        // This regex looks for: word characters (attribute name) = " or ' followed by content including the placeholder
        // Matches patterns like: src="{{key}}", class="{{key}}", style="{{key}}", etc.
        const attributePattern = new RegExp(
            `[\\w-]+\\s*=\\s*["'][^"']*${escapedPlaceholder}[^"']*["']`,
            'g'
        );

        // Check if placeholder appears in any attribute context
        // If it does, we'll use escapeHtml for all occurrences (safer approach)
        return attributePattern.test(template);
    }

    escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    async getTaskCount() {
        if (!localStorage.getItem('spotfix_session_id')) {
            return {};
        }

        const projectToken = this.params.projectToken;
        const sessionId = localStorage.getItem('spotfix_session_id');

        const tasksCountLS = localStorage.getItem('spotfix_tasks_count');

        let tasksCount;

        if(tasksCountLS === undefined){
            if(!this.nonRequesting) {
                await getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
            }
            const tasks = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_TASKS);
            storageSaveTasksCount(tasks);
            const filteredTasks = tasks.filter(task => {
                return task.taskMeta;
            });
            tasksCount = filteredTasks.length;
        } else {
            if (this.nonRequesting) {
                const tasks = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_TASKS);
                storageSaveTasksCount(tasks);
                const filteredTasks = tasks.filter(task => {
                    return task.taskMeta;
                });
                tasksCount = filteredTasks.length;
            } else {
                tasksCount = tasksCountLS;
            }
        }

        const taskCountElement = document.getElementById('doboard_task_widget-task_count');
        if ( taskCountElement ) {
            taskCountElement.innerText = ksesFilter(tasksCount);
            taskCountElement.classList.remove('hidden');
        }
    }

    /**
     * Bind events to the widget
     */
    /*bindEvents() {
        this.submitButton.addEventListener('click', () => this.submitTask());
    }*/

    /**
     * Submit the task
     */
    async submitTask(taskDetails) {
        if (!localStorage.getItem('spotfix_session_id')) {
            await registerUser(taskDetails)(this.registrationShowMessage);
            if ( taskDetails.userPassword ) {
                await loginUser(taskDetails)(this.registrationShowMessage);
                checkLogInOutButtonsVisible();
            }
        }

        const sessionId = localStorage.getItem('spotfix_session_id');

        if ( ! sessionId ) {
            // @ToDo move this return in register block code
            return {needToLogin: true};
        }
        return await handleCreateTask(sessionId, taskDetails);
    }

    /**
     * Hide the widget
     */
    hide() {
        spotFixRemoveHighlights();
        this.createWidgetElement('wrap');
    }

    wrapElementWithSpotfixHighlight(element) {
        const newElement = element.cloneNode();
        const wrapper = document.createElement('span');
        wrapper.className = 'doboard_task_widget-text_selection image-highlight';

        element.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(newElement);

        return wrapper;
    }

    /**
     * Get task spot data for highlighting.
     * @param {string|int} taskIdToSearch
     * @returns {object|null}
     */
    getTaskHighlightData(taskIdToSearch) {
        const currentTaskData = this.allTasksData.find((element) => element.taskId.toString() === taskIdToSearch.toString());
        if (currentTaskData && currentTaskData.taskMeta !== undefined) {
            let currentTaskSpotData = null;
            try {
                currentTaskSpotData = JSON.parse(currentTaskData.taskMeta);
            } catch (error) {
                currentTaskSpotData = null;
            }
            if (currentTaskSpotData !== null && typeof currentTaskSpotData === 'object') {
                return currentTaskSpotData;
            }
        }
        return null;
    }

    bindWidgetInputsInteractive() {
        // Customising placeholders
        const inputs = document.querySelectorAll('.doboard_task_widget-field');
        inputs.forEach(input => {
            if (input.value) {
                input.classList.add('has-value');
            }

            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.classList.remove('has-value');
                }
            });
        });

        // Customising accordion dropdown
        const accordionController = document.querySelector('.doboard_task_widget-login span');
        if ( accordionController ) {
            const context = this;
            accordionController.addEventListener('click', function() {
                this.closest('.doboard_task_widget-login').classList.toggle('active');
                // Scroll
                context.positionWidgetContainer();
                setTimeout(() => {
                    const contentContainer = document.querySelector('.doboard_task_widget-content');
                    contentContainer.scrollTo({
                        top: contentContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 0);
            });
        }

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    registrationShowMessage(messageText, type = 'error') {
        const titleSpan = document.getElementById('doboard_task_widget-error_message-header');
        const messageDiv = document.getElementById('doboard_task_widget-error_message');
        const messageWrap = document.querySelector('.doboard_task_widget-message-wrapper');

        if (typeof messageText === 'string' && messageDiv !== null && messageWrap !== null) {
            messageDiv.innerText = ksesFilter(messageText);
            messageWrap.classList.remove('hidden');
            messageDiv.classList.remove('doboard_task_widget-notice_message', 'doboard_task_widget-error_message');
            if (type === 'notice') {
                titleSpan.innerText = ksesFilter('');
                messageWrap.classList.add('doboard_task_widget-notice_message');
                messageDiv.style.color = '#2a5db0';
            } else {
                titleSpan.innerText = ksesFilter('Registration error');
                messageWrap.classList.add('doboard_task_widget-error_message');
                messageDiv.style.color = 'red';
            }
        }
    }

    positionWidgetContainer() {
        const selection = document.querySelector('.doboard_task_widget-text_selection');
        const widget = document.querySelector('.doboard_task_widget')
        const widgetCreateIssue = document.querySelector('.doboard_task_widget-content.doboard_task_widget-create_issue')
        const widgetConcreteIssue = document.querySelector('.doboard_task_widget-concrete_issues-container')
        if ( ! ( ( widgetCreateIssue || widgetConcreteIssue ) && selection ) ) {
            // Skip if the widget is closed or highlight not exist
            return;
        }

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const selectionAbsoluteTop = selection.getBoundingClientRect().top + scrollY;

        const widgetHeight = widget.offsetHeight;

        let top;

        // Check selection position
        if (selectionAbsoluteTop - scrollY < 0) {
            // 1) The selection is above the viewport - stuck the widget on the top
            top = 10;
        } else if (selectionAbsoluteTop - scrollY > viewportHeight) {
            // 2) The selection is below the viewport - stuck the widget on the bottom
            top = viewportHeight - widgetHeight - 10;
        } else {
            // 3) The selection is on viewport - the widget aligned against the selection
            top = selectionAbsoluteTop - scrollY
            if ( selectionAbsoluteTop - scrollY > viewportHeight - widgetHeight ) {
                // 3.1) The selection is on viewport but is below than widget height - stuck the widget on the bottom
                top = viewportHeight - widgetHeight - 10;
            }
        }

        if(widget) {
            widget.style.top = `${top}px`;
            widget.style.bottom = 'auto';
        }
    }

    handleScroll() {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.positionWidgetContainer();
        }, 10);
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.positionWidgetContainer();
        }, 100);
    }

    /**
     * Check nodePath, selectedData against page source and return is the provided nodePath is correct and can be highlighted
     * @param taskData
     * @return {boolean}
     */
    isSpotHaveToBeHighlighted(taskData) {
        return true;
    }

    sanitizeNodePath(nodePath) {
    let str = Array.isArray(nodePath) ? JSON.stringify(nodePath) : String(nodePath);
    // Allow only digits, commas, spaces, and square brackets
    if (/^[\[\]0-9,\s]*$/.test(str)) {
        return str;
    }
    return '';
}

/**
 * Set user menu data with current user information
 */
async setUserMenuData() {
    const params = this.params;

    // Get user data
    let userData = null;
    if (localStorage.getItem('spotfix_session_id')) {
        try {
            userData = await getUserDetails(params);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    // Update user menu header
    const userNameElement = document.querySelector('.doboard_task_widget-user_menu-header span[style*="font-size: 16px"]');
    const emailElement = document.querySelector('.doboard_task_widget-user_menu-header span[style*="font-size: 12px"]');
    const avatarElement = document.querySelector('.doboard_task_widget-user_menu-header-avatar');

    if (userNameElement) {
        if (userData && userData.name) {
            userNameElement.innerText = userData.name;
        } else {
            userNameElement.innerText = 'Guest';
        }
    }

    if (emailElement) {
        if (userData && userData.email) {
            emailElement.innerText = userData.email;
        } else {
            const email = localStorage.getItem('spotfix_email') || '';
            emailElement.innerText = email.includes('spotfix_') ? '' : email;
        }
    }

    if (avatarElement) {
        if (userData && userData.avatar && userData.avatar.s) {
            avatarElement.src = userData.avatar.s;
        } else {
            // Reset to default avatar or remove src
            avatarElement.src = '';
        }
    }
}
}

var spotFixShowDelayTimeout = null;
const SPOTFIX_DEBUG = false;
const SPOTFIX_SHOW_DELAY = 1000;


if( document.readyState !== 'loading' ) {
    document.addEventListener('spotFixLoaded', spotFixInit);
} else {
    document.addEventListener('DOMContentLoaded', spotFixInit);
}

function spotFixInit() {
    spotfixIndexedDB.init();
    wsSpotfix.connect();
    wsSpotfix.subscribe();
    new SpotFixSourcesLoader();
    new CleanTalkWidgetDoboard({}, 'wrap');
    loadBotDetector();
    loadTinyMCE();
}

function loadBotDetector() {

    const detector = document.querySelectorAll('script[src*="fd.cleantalk.org/ct-bot-detector-wrapper.js"]');
    if (detector.length > 0 || document.getElementById('ct-bot-detector-script')) {
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://fd.cleantalk.org/ct-bot-detector-wrapper.js';
    script.async = true;
    script.id = 'ct-bot-detector-script';
    document.head.appendChild(script);
}

/**
 * Downloads TinyMCE script from doboard.com
 */
function loadTinyMCE() {
    return new Promise((resolve) => {
        const existingTinyMCE_temp = window.tinymce;
        window.tinymce = null;
        const script = document.createElement('script');
        script.src = 'https://doboard.com/tinymce/tinymce.min.js';
        script.async = true;

        script.onload = function () {
            try {
                window.SpotFixTinyMCE = window.tinymce;
                if (existingTinyMCE_temp) {
                    window.tinymce = existingTinyMCE_temp;
                }
                addIconPack();
                resolve(window.SpotFixTinyMCE);
            } catch (error) {
                if (existingTinyMCE_temp) {
                    window.tinymce = existingTinyMCE_temp;
                }
                console.error('Error loading TinyMCE:', error);
                resolve(null);
            }
        };

        script.onerror = function () {
            if (existingTinyMCE_temp) {
                window.tinymce = existingTinyMCE_temp;
            }
            console.error('Failed to load TinyMCE script');
            resolve(null);
        };

        document.head.appendChild(script);
    });
}

document.addEventListener('selectionchange', function(e) {
    // Do not run widget for non-document events (i.e. inputs focused)

    if (e.target !== document) {
        return;
    }

    const isWrapReviewWidgetExists = !!(document.getElementsByClassName('wrap_review')[0]);
    const sel = document.getSelection();

    if ((!sel || sel.toString() === "") && isWrapReviewWidgetExists) {
        new CleanTalkWidgetDoboard({}, 'wrap')
        return;
    }

    if (spotFixShowDelayTimeout) {
        clearTimeout(spotFixShowDelayTimeout);
    }

    spotFixShowDelayTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (
            selection.type === 'Range'
        ) {
            // Check if selection is inside the widget
            let anchorNode = selection.anchorNode;
            let focusNode = selection.focusNode;
            if (spotFixIsInsideWidget(anchorNode) || spotFixIsInsideWidget(focusNode)) {
                return;
            }
            const selectedData = spotFixGetSelectedData(selection);

             if ( selectedData ) {
                // spotFixOpenWidget(selectedData, 'create_issue');
                spotFixOpenWidget(selectedData, 'wrap_review');
            }
        }
    }, SPOTFIX_SHOW_DELAY);
});


/**
 * Shows the spot fix widget.
 */
function spotFixShowWidget() {
    new CleanTalkWidgetDoboard(null, 'create_issue');
}

/**
 * Check if a node is inside the task widget.
 * @param {*} node
 * @returns {boolean}
 */
function spotFixIsInsideWidget(node) {
    if (!node) return false;
    let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    while (el) {
        if (el.classList && el.classList.contains('doboard_task_widget')) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
}

/**
 * Open the widget to create a task.
 * @param {*} selectedData
 * @param {*} type
 */
function spotFixOpenWidget(selectedData, type) {
    if (selectedData) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

/**
 * Write message into the console.
 *
 * @param {string} message
 */
function spotFixDebugLog(message) {
    if ( SPOTFIX_DEBUG ) {
        console.log(message);
    }
}

function hideContainersSpinner() {
    const spinners = document.getElementsByClassName('doboard_task_widget-spinner_wrapper_for_containers');
    if (spinners.length > 0) {
        for (let i = 0; i < spinners.length ; i++) {
            spinners[i].style.display = 'none';
        }
    }

    const taskWidgetUrl = document.getElementsByClassName('spotfix_doboard_task_widget_url');
    if (taskWidgetUrl.length > 0) {
        for (let i = 0; i < taskWidgetUrl.length ; i++) {
            taskWidgetUrl[i].style.display = 'block';
        }
    }
    const containerClassesToShow = ['doboard_task_widget-all_issues-container', 'doboard_task_widget-concrete_issues-container'];
    for (let i = 0; i < containerClassesToShow.length ; i++) {
        const containers = document.getElementsByClassName(containerClassesToShow[i]);
        if (containers.length > 0) {
            for (let i = 0; i < containers.length ; i++) {
                containers[i].style.display = 'block';
            }
        }
    }
}

function getTaskFullDetails(tasksDetails, taskId) {
    const comments = tasksDetails.comments.filter(comment => {
        return comment?.taskId?.toString() === taskId?.toString()
    });
    const users = tasksDetails.users;
    // Last comment
    let lastComment = comments.length > 0 ? comments[0] : null;
    // Author of the last comment
    let author = null;
    if (lastComment && users && users.length > 0) {
        author = users.find(u => String(u.user_id) === String(lastComment.userId));
    }
    // Format date
    let date = '', time = '';
    if (lastComment) {
        const dt = formatDate(lastComment.commentDate);
        date = dt.date;
        time = dt.time;
    }
    // Get the avatar and the name through separate functions
    let avatarSrc = getAvatarSrc(author);
    let authorName = getAuthorName(author);

    return {
        taskId: taskId,
        taskAuthorAvatarImgSrc: avatarSrc,
        taskAuthorName: authorName,
        lastMessageText: lastComment ? lastComment.commentBody : 'No messages yet',
        lastMessageTime: time,
        issueTitle: comments.length > 0 ? comments[0].issueTitle : 'No Title',
        issueComments: comments
            .sort((a, b) => {
                return new Date(a.commentDate) - new Date(b.commentDate);
            })
            .map(comment => {
                const {date, time} = formatDate(comment.commentDate);
                let author = null;
                if (users && users.length > 0) {
                    author = users.find(u => String(u.user_id) === String(comment.userId));
                }
                return {
                    commentAuthorAvatarSrc: getAvatarSrc(author),
                    commentAuthorName: getAuthorName(author),
                    commentBody: comment.commentBody,
                    commentDate: date,
                    commentTime: time,
                    commentUserId: comment.userId || 'Unknown User',
                };
            })
    };
}

function getAvatarData(authorDetails) {
    let avatarStyle;
    let avatarCSSClass;
    let taskAuthorInitials =
        authorDetails.taskAuthorName && authorDetails.taskAuthorName != 'Anonymous'
            ? authorDetails.taskAuthorName.trim().charAt(0).toUpperCase()
            : null;
    let initialsClass = 'doboard_task_widget-avatar-initials';
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials !== null) {
        avatarStyle = 'display: flex;background-color: #f8de7e;justify-content: center;align-items: center;';
        avatarCSSClass = 'doboard_task_widget-avatar_container';
    }
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials === null) {
        avatarStyle = `background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMtOGVlZi00ZDUxLWJhNDEtZDk5M2U2ZjYzZjEyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMtOGVlZi00ZDUxLWJhNDEtZDk5M2U2ZjYzZjEyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHN0RXZ0OndoZW49IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuPRTtsAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAL0UExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKGw/wAAAAAAAAAAAAAAAAAAAAAAAAAAAKOy/6Sw/gAAAAAAAAAAAAAAAIKPz6Kw/6Cw/6Kx/6Gw/6Gw/6Gw/6Gv/qCw/6Gw/6i0/6Oy/67D/6Gw/6Gx/6ez/6u9/6Gw/6Kx/6i5/624/6Cy/wAAAJ6r/6Oy/6W1/qCv/4aR1LPE/4eU0o+d3qGw/6Sy/6Ku/6Cv/KGw/6Cu/4WT1KKr/5up9Q8RGhodK7jI/4mY1K27/6Cv/8PW/7LE/6Gw/7nL/1RchUVLbbnN/0pXfBQVHjY5U2Vwm2ZwnyMmNrDB/6e2/629/7XG/6Kw/6Kw/67A/629/3N+vKe3/77Q/52r7HmEtrPE/6Oz8RgaKbTF/7TG/xgaKnaCtsLV/6Sv/7TI/wCv/6Gw/wAAAKCv/6e2/73O/6a1/6Oz/6u7/7zN/6q5/7fJ/629/7PD/wAAAQwNE5+u/7DA/6S0/7bH/7XG/6Gx/6i4/yUoOQQFBwICA7HC/7nL/zM4UouY3RcaJK+//y4ySL7Q/ygsPx8iME9WfTA1TXJ8sp2s9VxkjoSQ0RESGl9ok5up9XR/t213rRQWHkRKbJKf53mEwUxSeKGv+qy8/5Ce4jk+WQkKDjxBYCouQpSh6lZfiEFHZVpijJ6t/GFqmWdxoT5DY4eU1mp0qXiDvHyHxZak5n2KxlFZg8LU/32Kv4mV2ZSj7FBYgJGe50VLbS7TJ5EAAACrdFJOUwAPCsvhFe/y+w0C/fc8LUGd9SWvHnW1BPOTw/7NCbtcyNpxsr+4WVKbIETkCOiij0d96tQGEhCmijeFGGxw0Gp6qZhKxmbeYCtNG9NMgKzX5iduYwXl2GVVAZNEVKrs9opx5j/ZFcMIER77LlsYnDAbbDlLDH3+/v2wIlDxy8E95PP9un2PvJ1Pv2VX9kmOqeG89a2m+efFg2aYq9fPqexM0cHR6vWeMdh9ztTtu0oAAA1/SURBVHja7FxnWBPZGs5SQoAAocMiJEjv0qQEpMhCgAVRUFFEaYq9d7f3vb333u99ZpIAafTQ24Jg13XtfV3b7t1d7/65cyaTBiFMkknbZ94f6DOZnG/eOd/56jmhUEiQIEGCBAkSJEiQIEGCBAkSJEiQIEGCBAkS1o6cUAeH0FVWT8OeBaNg2Vs3D6dlMIZlTlZNJAtwoNHB3xyrJmKLMAgqYYch/9haM49YBximp1AoKcicOMRaOxFfCsXX2omgqhVWUmL1qoUtdpr1L3YV87vOyh1igYxHgZU7RATZiGLRvL8NwRZiuRy+DTwcARFHckYsB6l+MOyXasUEUjwichM8C1bEBcBwQMWKAs+E3AiPQGsLTVwSy1fDcxGQ5FPmYjWhSmA4IwnWgjhGuI0V0HDxj1N/bhrdz49OV79GzXexcBrMF1XefFCCd7ULpyTV0TG1hONS7Z0QqjJTLzItmEZRsvwxVzOyXDWshVjXLEaF/J7kIgulESEPEO0S3FK0WLPoBDvsxkURFkhjTxj2dOURvgvd6xvhid0ctsfSeCRi9jXSFd/9rvkBsm+UWdZ0YGs80mO+O6qaDx5srlK9spKBrXpXC1rkaAoIh2Ro+GxXTX1d7ZbSho2vvLKxoXRLbV19zWY5fR+ZfbaYRe+PPk9M9VwSO9eXboLmYFPp+l9vQ2+ojkG/6m8RNGxkqzxvdgq4rf49DSTk2P5ePeCSmod+OcgCXD0b9R0BL826vKF2uxTSju3HPgBq6Yz6lBJz8/BCfUKhuhVdV1m6EAsUnaXfQRZ9MOp7oszLIwpV8lD1dKOyCcILbhNCBdXNCi+z1kjQWD1P7dqBV6UQfnC5/9lPyUeNhRnrLIGoVkSqXtpbK9WFB9Av4fsUbzDOCvMlKqFzeGzYCOkMLvSvf+aitsus/kNVr9bt5kKQPkz47/yDZj5/wkQDDJULx1/ViwdYKIK//BXEXmbJUaKAA4hR8WSNGyG90Tn8xzeBOzKHEUazj5Uqy0MKGYBOwWEwJcvMFLerhHuVkIH46FMwYq7JFQvNoQjkweUJRsCYplYukIBQlQtkA2QwOiWnboIowbQ8XgYvT5lxv94NEcDko8dg1OUmJVKo9u72bpISQITLE02CANSkKSF4dcq0tknKhYiYEtFXsImdiZ1aaLKbEBoIpPxbIKI3HY9q4LvYioVOFA+I2/u/dmToapMRWaQ6IVs3QYRByv8M1O1MxSNDzd4fI44HMiWjYGxTVe0iEVk+igirm0AiUGvPBDJ4vml4pDggstASlq9XdM4bbUQS4Q7PAE+bYppiNSJqTaDr2kyfGBp8Y4jQGYGE0rPI8MUmIVIOeh9YY639soRLKBGp4Js5VQCjqJVbYohq6+kzvpRQHhBX9AlafU10M2LNbmV2vHpbjVZ4hOAJQXSL24FMNOJOqHnZK41AwtctfYUqB3pheSaz5E8ionlArb03ZETQwkr6El9CabglxKhNRcjL9uim0T9AhBPhCkCC1aEQFZPgRphGJarMRTCDivzFwpNdnYTzgKChM4iAt34arJS5ItGDABrL8xQD+vnkZjiBfZZJ2B7eesgIED5ApuPmCYqrt4+7YqOBp6FZCpMlHyspMnwpuFKsUknbYgwivLbbiIjXwPhLwyMVDW2WIdF9uLxP6x4fLq9n5ioLabuMwQNqFX2MiPgCa2vFRsTL5yU5XE8a0fLmf0GOvXp5cbHsvzuNQgTi30dEfLNTWSnPKZBvMtBn3b+A9SrhNPVvhygTht3GISICqfvIb9SsZhr2MIwXdOWxBGvqMzizPgBvB9tIUmocIhLg2/t/ry6Wg71XuyW68cjFZmNOZrBuDXJZRm7zUeMQ6XqEiBg7unmWZA5mPnUq4aGdF9g2WoOHr0AiE9mSqTEOD0h8ZxCGzz5onLtobeE5fQztiEe/kKnpIyc7Ral5n9QoPDpFj5AAZYy7T4P0TPTB4nXqe1DnUcYg5LMEVMnqjEGEyx3/L8jbp4fqNC5dqg59+XC0Tztf5Jmj2Of+207iaUjH+eIvgISHw7UaxXsU4i59LQW9o9XseTMS1NeyXvKlvC0mmAXE6xl+dv8tMP4lYd+H8/T1wX4v2lIcRICdc9aSCbhhdjDzd72CcQLz3JYhft+X9wZkox8WdZbOF8OCBhNjYR5sMI7W03YR8g2K/aevdwm6eESE8i3j/K4jd6ewgTu+FHChhqp55K+ClfG3FoBO8ZoF4nq5n4UHJ06PXuP3ClsN4MJt7Rvii6+fvo0lU/DAvWfDyMtpmvecBojwFz41ALYhZC+YopQVyrm09598ckrCl7S16EWCJx4WdR++OzkoH2/s7rPhISTPkVbOK32xal1Na8MAx1YwJ2Y5TZGodNy4//l5sUAkFrbgN8lSnnBIIOq7/PDjMcVAgzdmugVdUi5ihX81v2xXXM0HPyQfx3e2wGtxgUr22zHxfOb6VbFgWCIW8lq1B+o8oVgiGG47debTb6YGlENMnr7eK+pDtIrb8O4OLYId6XiODeAnAlTMO5TWrnySwUvTVx4+vXy1TyIQiCRd4jZhH4/Ha2np7m5B/u0TCsVdkh6BQCK8evnJuSu3O1Tew2D/3VGxYBxdbFsqm7VKxUcEp2opUJLzwzcH1SoTA2cnb508/fjJmTunHiAvv+2aeHwc4cRr5Z668+jpxXMnb01eGlD7xs2Rc0euCbpagC9pqtuxkEh8qoVrsavj4Hd/8KNLg3M3wQ90XJrqn5yYmB4ZmZ643T811jGg4ab+KxfODwnGeUDpGtbXrKMseKoM32IH5jdYNyJOFErV/nd+/L3+DlgntJ8deT7zdZugpw31q6V1jVW45OEzvws7xPmweWfdaz+5MjLV0b4wh5tTt54/Hr06zu+5xgOGrmH3vuN45aAOEcfmLjRE4eiZ52/9/qFjb4xeOHfy3nQ/oknq+tY+0DHWP33v5LkLX53nSfiicWGLbM/pvh3N+EVwcIYosqAxzoDNklXbPjj0/i9/8XPo/NejZz7/5MLMxYsXZy48eXpm9M55qEXcyx/u7WrrQ7Rpe8OH6+trtoKUQAfjEoc3aJSF8XaGFpCb9zZWHnr3Z2//+W9/7+3p6e2VSIaA7eprObppY9OW2vX/rmzc26z7sCvRWgLOwpDWxEp3RluP79jfWHPgxIYTBw7U7N9xfGuz/oMtRxOrBAJSXfNCx1RXUXxYYlk0sOKDTq1SrByUZ0HHO/QqB6kU6CzkUIQrVqArjCaqZGoWKEum+hz6dZMXsVlZZj2Mbp/FMqSIPautwDTTwYjYiHi6oW0FzY0eU2Ipk0FMo0fWeguQj+Xuk5uRYioSKXtUW2/lRGwQ9EhMVgZ+MYzsDKNvxg/k5DBUziwHl3kQZjXU2tNJIWXF9r5GIsEuLgtRPbNsl0Cs1ZyzYcDOM5PJIdQC2HCYZWlr1I4nE75hAIs8s+Pj1I9BU1nxmVnRXgYunBS2y9rMeBZVbWh6knG2cMjhqSHdo8WxPP0T1y7fw7bR4Ue0nGzYe5avTfT3ZM16OzJ4GtkggteWXuTPcteUwNKphbZhaf5l3llF4cVuGa4eHlElbHtwDNyeXRLl4eGa4VYcXpTlXeafFmZbSNX0/LAfy78oHUy2cY096OnGoBGMy6rMEDua9sw8wNmZRqO7Ozi4u9NoNOcA7XfTKoLSs1zQti0wLSHG5JGhvpMcbAXMTLOl0mCD4Ey1TcvMUV1qYJMenGFEIos0bma1YWdELE5PC1oW567L87vHLQtKS88Nd4uywSmIMCz0omJTOS7FzKzE9Pz4cp9Q2+TgQruKJCr4ORFqUoVdYXCybahPeXx+emIWs9iFkxqLe+qJhs6q6+SbEsgGP/DCDkzxddJrMRoDoFQJ636AU6+f3PGCcZUT9fO87nqdsNPzR5BAKYdunN9OQoe2MRURR3djHUxEJ3sxxVREKNn/b+dsdhIGojBqoZRCY4QIgokSLUyCJSSQEONGFiILExZKoj4GT8Y7ynRouVBiMr93c09YsOrH7XSmZ4Z2rLxx1SnV+opv1ynvr8Wnp/1ayZw1PsXDsh9UFRtEvZB0bKkGfnkYm2iYj14EbJctXBWyYMCGI6b7tPxzwXavPReFGMg9XonJnr4FZ+exYr+QCnjqN1DMLSjPdjtob7hYh1Ox38ad/UJELptyG33ZtAcquZBluirGn2D0xaB+ma7ZLW0Xkufe7l+CU8mFlDO36uzuTmH6Y26kt1dVKCTPrUVim12VXLgqw3++6GOT8eck/eLtWrt7b7cQmDsaq+bCA3bzA17M9rMeJ4UYyT1t4pN/5p1dWtq5hU73Dva9E53u10ln1809O/xetTyvleyHQckToz786uWevzGFzWa2wvAjeWOq80Lq7nOP8YqqIGsbMz7VnbnPPWXFwGJPyFaSq6xxY84XH+aN+Mtl7nmNf+UaH/gPb7I6vWDwnMqas3ruvxMr+QmOCYNVyTVN3mGj9KNvsFiIIbS3TnYeHiTrnq7BYnEwZ75LuQGDxSI3WP76e6BvsFhAg/0eJQbED6sQ4waLeWkZNVjUzm7UYHGHX4MGi35DNGawWFgwWCwsGCwWVgyWIAiCIAiCIAiCIAiCIAiCIAgU/gAyRDCHjvicJQAAAABJRU5ErkJggg==');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass += ' doboard_task_widget-hidden_element';
    }
    if (authorDetails.taskAuthorAvatarImgSrc !== null) {
        avatarStyle = `background-image:url(\'${authorDetails.taskAuthorAvatarImgSrc}\');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass = 'doboard_task_widget-hidden_element';
    }
    return {
        avatarStyle: avatarStyle,
        avatarCSSClass: avatarCSSClass,
        taskAuthorInitials: taskAuthorInitials,
        initialsClass: initialsClass
    }
}

/**
 * Return first found updated task ID or false if no tasks were updated
 * @param allTasksData
 * @returns {string[]|false}
 */
function isAnyTaskUpdated(allTasksData) {
    let result = false;

    const updatedtasksIDS = [];

    for (let i = 0; i < allTasksData.length; i++) {
        const currentStateOfTask = allTasksData[i];
        const issuerId = localStorage.getItem('spotfix_user_id');
        if (
            currentStateOfTask.taskId &&
            currentStateOfTask.taskLastUpdate &&
            currentStateOfTask.taskCreatorTaskUser.toString() === issuerId.toString()
        ) {
            result = storageCheckTaskUpdate(currentStateOfTask.taskId, currentStateOfTask.taskLastUpdate);
            if (result) {
                updatedtasksIDS.push(currentStateOfTask.taskId.toString());
            }
        }
    }

    return updatedtasksIDS.length === 0 ? false : updatedtasksIDS;
}

/**
 * Check if any of the tasks has updates from site owner (not from the current user and not anonymous)
 * @returns {Promise<boolean>}
 */
async function checkIfTasksHasSiteOwnerUpdates(allTasksData, params) {
    const updatedTaskIDs = isAnyTaskUpdated(allTasksData);
    let result = false;
    if (!updatedTaskIDs) {
        return false;
    }
    for (let i = 0; i < updatedTaskIDs.length; i++) {
        const updatedTaskId = updatedTaskIDs[i];
        if (typeof updatedTaskId === 'string') {
            const updatedTaskData =  await getTasksFullDetails(params, [updatedTaskId]);
            if (updatedTaskData.comments) {
                const lastMessage = updatedTaskData.comments[0];
                if (
                    lastMessage.commentUserId !== undefined &&
                    lastMessage.commentUserId !== localStorage.getItem('spotfix_user_id') &&
                    lastMessage.commentAuthorName !== 'Anonymous'
                ) {
                    storageAddUnreadUpdateForTaskID(updatedTaskId);
                    result = true;
                }
            }
        }
    }
    return result;
}

/**
 * Check if the selection is correct - do not allow to select all page, or several different nesting nodes, or something else
 * @param selection
 * @return {boolean}
 */
function isSelectionCorrect(selection) {
    return true;
}

/**
 * Sanitize HTML
 * @param {*} html
 * @param {*} options
 * @returns
 */
function ksesFilter(html, options = false) {
    let allowedTags = {
        a: true,
        b: true,
        i: true,
        strong: true,
        em: true,
        ul: true,
        ol: true,
        li: true,
        p: true,
        s: true,
        br: true,
        span: true,
        blockquote: true,
        pre: true,
        div: true,
        img: true,
        input: true,
        label: true,
        textarea: true,
        button: true,
        blockquote: true,
        pre: true,
        details: true,
        summary: true,
    };
    let allowedAttrs = {
        a: ['href', 'title', 'target', 'rel', 'style', 'class'],
        span: ['style', 'class', 'id'],
        p: ['style', 'class'],
        div: ['style', 'class', 'id', 'data-node-path', 'data-task-id'],
        img: ['src', 'alt', 'title', 'class', 'style', 'width', 'height'],
        input: ['type', 'class', 'style', 'id', 'multiple', 'accept', 'value'],
        label: ['for', 'class', 'style'],
        textarea: ['class', 'id', 'style', 'rows', 'cols', 'readonly', 'required', 'name'],
        button: ['type', 'class', 'style', 'id'],
        details: ['class', 'style', 'open'],
        summary: ['class', 'style'],
    };

    if (options && options.template === 'list_issues') {
        allowedTags = { ...allowedTags, br: false };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    function clean(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            if (options) {
                if (allowedTags[tag]) {
                    // Special handling for images in 'concrete_issue_day_content' template (wrap img in link always)
                    if (tag === 'img' && options.template === 'concrete_issue_day_content' && options.imgFilter) {
                        const src = node.getAttribute('src') || '';
                        const alt = node.getAttribute('alt') || '[image]';
                        const link = doc.createElement('a');
                        link.href = src;
                        link.target = '_blank';
                        link.className = 'doboard_task_widget-img-link';
                        const img = doc.createElement('img');
                        img.src = src;
                        img.alt = alt;
                        img.className = 'doboard_task_widget-comment_body-img-strict';
                        link.appendChild(img);
                        node.parentNode.insertBefore(link, node);
                        node.remove();
                        return;
                    }
                }

                if (!allowedTags[tag]) {
                    // Special handling for images in 'list_issues' template
                    if (tag === 'img' && options.template === 'list_issues' && options.imgFilter) {
                        const src = node.getAttribute('src') || '';
                        const alt = node.getAttribute('alt') || '[image]';
                        const link = doc.createElement('a');
                        link.href = src;
                        link.target = '_blank';
                        link.textContent = alt;
                        node.parentNode.insertBefore(link, node);
                    }
                    node.remove();
                    return;
                }
            }

            // Remove disallowed attributes
            [...node.attributes].forEach(attr => {
                const attrName = attr.name.toLowerCase();
                if (!allowedAttrs[tag]?.includes(attrName) ||
                    attrName.startsWith('on') || // Remove event handlers
                    attr.value.toLowerCase().includes('javascript:')) {
                    node.removeAttribute(attr.name);
                }
            });
        }
        // Recursively clean children
        [...node.childNodes].forEach(clean);
    }
    [...doc.body.childNodes].forEach(clean);
    return doc.body.innerHTML;
}

/**
 * SELECTION will be grouped into three types:
 * 1 - Simple text within a single tag
 * 2 - Image tags
 * 3 - Any tag containing nested content
 * Each type will be processed differently.
 */
const SPOTFIX_SELECTION_TYPE_TEXT = 'text';
const SPOTFIX_SELECTION_TYPE_IMG = 'image';
const SPOTFIX_SELECTION_TYPE_ELEMENT = 'element';

/**
 * Determines the type of selection
 * @param {Selection} selection - The DOM Selection object
 * @returns {string|null} Selection type
 */
function spotFixGetSelectionType(selection) {
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // Case 1: Image selection
    if (spotFixGetSelectedImage(selection)) {
        return SPOTFIX_SELECTION_TYPE_IMG;
    }

    // Case 2: Element with nested content
    if (commonAncestor.nodeType === Node.ELEMENT_NODE &&
        commonAncestor.childNodes.length > 1 &&
        range.toString().trim() === '' &&
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE) {
        return SPOTFIX_SELECTION_TYPE_ELEMENT;
    }

    // Case 3: Simple text
    const hasTextContent = range.toString().trim().length > 0;
    const isTextNode = commonAncestor.nodeType === Node.TEXT_NODE;
    const isCollapsed = range.collapsed;

    if (hasTextContent && (isTextNode || !isCollapsed)) {
        return SPOTFIX_SELECTION_TYPE_TEXT;
    }

    return null;
}

/**
 * Extracts selection data from DOM Selection object
 * @param {Selection} selection - The DOM Selection object
 * @returns {Object|null} Selection data with text, positions, URL and node path OR null (nothing)
 */
function spotFixGetSelectedData(selection) {
    // Prechecks:
    // Selection not provided
    if (!selection) {spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection not provided`'); return null;  }
    // Range not provided
    if (selection.rangeCount === 0) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Range not provided`'); return null; }
    // Several ranges provided
    if (selection.rangeCount > 1) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Several ranges provided`'); return null; }

    const range = selection.getRangeAt(0);
    // Selection must be within a single DOM element.
    if (range.startContainer !== range.endContainer) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection within several tags nodes`'); return null; }

    // FIRST - check selection type
    const selectionType = spotFixGetSelectionType(selection);

    // Selection type not determined
    if (!selectionType) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection type not determined`'); return null; }

    // SECOND - generate selectedData for each selectionType
    let selectedText = '';
    let startSelectPosition = 0;
    let endSelectPosition = 0;
    let nodePath = '';
    let imageUrl = '';

    const commonNode = range.commonAncestorContainer;

    switch (selectionType) {
        case SPOTFIX_SELECTION_TYPE_TEXT:
            if (range.toString().trim().length === 0) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection text is empty`');
                return null;
            }
            const commonNodeElement = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            selectedText = range.toString();
            startSelectPosition = range.startOffset;
            endSelectPosition = range.endOffset;
            if ( startSelectPosition === 0 && selectedText.length > endSelectPosition ) {
                endSelectPosition = selectedText.length;
            }
            nodePath = spotFixCalculateNodePath(commonNodeElement);
            break;

        case SPOTFIX_SELECTION_TYPE_IMG:
            const imgElement = range.startContainer;
            const selectedImage = spotFixGetSelectedImage(selection);
            selectedText = `Image (${selectedImage.alt ? selectedImage.alt : 'no description'})`;
            nodePath = spotFixCalculateNodePath(selectedImage);
            // For images, positions represent the image element position in parent
            startSelectPosition = Array.from(imgElement.parentNode.children).indexOf(imgElement);
            endSelectPosition = startSelectPosition + 1;
            break;

        case SPOTFIX_SELECTION_TYPE_ELEMENT:
            const element = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            if (element.childNodes.length <= 1) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection have not inner data`');
                return null;
            }
            selectedText = element.textContent || '';
            nodePath = spotFixCalculateNodePath(element);
            // For elements, positions represent the element's position in parent
            startSelectPosition = Array.from(element.parentNode.children).indexOf(element);
            endSelectPosition = startSelectPosition + 1;
            break;
    }

    // Get page URL
    const pageURL = window.location.href;

    return {
        startSelectPosition,
        endSelectPosition,
        selectedText: selectedText.trim(),
        pageURL,
        nodePath,
        selectionType,
        imageUrl: selectionType === SPOTFIX_SELECTION_TYPE_IMG ? imageUrl : ''
    };
}

/**
 * Highlight elements.
 * @param {[object]} spotsToBeHighlighted
 * @param widgetInstance
 */
function spotFixHighlightElements(spotsToBeHighlighted, widgetInstance) {

    if (spotsToBeHighlighted.length === 0) return;

    const elementsMap = new Map();

    // Grouping elements with validation
    spotsToBeHighlighted.forEach(spot => {
        // nodePath validating: is array
        if (!spot?.nodePath || !Array.isArray(spot?.nodePath)) {
            spotFixDebugLog('Invalid spot: missing or invalid nodePath: ' + spot);
            return;
        }

        // nodePath validating: is valid indexes list
        if (!this.spotFixIsValidNodePath(spot.nodePath)) {
            spotFixDebugLog('Invalid nodePath format: ' + spot.nodePath);
            return;
        }

        const element = spotFixRetrieveNodeFromPath(spot.nodePath);
        if (!element) {
            spotFixDebugLog('Element not found for path: ' + spot.nodePath);
            return;
        }

        if ( ! spot.selectionType ) {
            // @ToDo need to apply backward capability here
            // just `spot.selectionType = 'text';` is not able, this opens ability to unauthorized modify website content
            spotFixDebugLog('Selection type is not provided.');
            return;
        }

        // selectionType parameter validating
        if (
            spot.selectionType &&
            ![
                SPOTFIX_SELECTION_TYPE_TEXT,
                SPOTFIX_SELECTION_TYPE_IMG,
                SPOTFIX_SELECTION_TYPE_ELEMENT
            ].includes(spot.selectionType)
        ) {
            spotFixDebugLog('Invalid selection type: ' + spot.selectionType);
            return;
        }

        if (!elementsMap.has(element)) {
            elementsMap.set(element, []);
        }
        elementsMap.get(element).push(spot);
    });

    elementsMap.forEach((spots, element) => {
        const selectionType = spots[0].selectionType;

        // MAIN LOGIC: highlight for the different types
        switch (selectionType) {
            case 'image':
                this.spotFixHighlightImageElement(element);
                break;

            case 'element':
                this.spotFixHighlightNestedElement(element);
                break;

            case 'text':
                this.spotFixHighlightTextInElement(element, spots, widgetInstance);
                break;

            default:
                spotFixDebugLog('Unknown selection type: ' + selectionType);
        }
    });
}

/**
 * Highlight image element by adding class
 * @param {Element} element
 */
function spotFixHighlightImageElement(element) {
    if (element.tagName !== 'IMG') {
        spotFixDebugLog('Expected IMG element for image highlight, got: ' + element.tagName);
        return;
    }
    element.classList.add('doboard_task_widget-image_selection');
}

/**
 * Highlight nested element by adding class
 * @param {Element} element
 */
function spotFixHighlightNestedElement(element) {
    element.classList.add('doboard_task_widget-element_selection');
}

/**
 * Highlight text in element with span wrapping
 * @param {Element} element
 * @param {Array} spots
 * @param widgetInstance
 */
function spotFixHighlightTextInElement(element, spots,widgetInstance) {
    let tooltipTitleText = '';
    if (spots[0].isFixed) {
        tooltipTitleText = `This issue already fixed.`;
    } else {
        tooltipTitleText = `We are already working on this issue.`;
    }

    const tooltip = `<div class="doboard_task_widget-text_selection_tooltip_element">
                            <span class="doboard_task_widget-text_selection_tooltip_icon"></span>
                            <span>
                                <div>${tooltipTitleText}</div>
                                <div>You can see history <span class="doboard_task_widget-see-task doboard_task_widget-see-task__task-id-${spots[0].taskId}">Here</span></div>
                            </span>
                        </div>`;

    const spotfixHighlightOpen = `<span class="doboard_task_widget-text_selection"><span class="doboard_task_widget-text_selection_tooltip">${tooltip}</span>`;
    const spotfixHighlightClose = `</span>`;

    let text = element.textContent;
    const spotSelectedText = spots[0].selectedText;

    // meta.selectedText can not be empty string
    if ( ! spotSelectedText ) {
        spotFixDebugLog('Provided metadata is invalid.');
        return;
    }

    const markers = [];

    // Mark positions for inserting
    spots.forEach(spot => {
        // Validating positions
        const startPos = parseInt(spot.startSelectPosition) || 0;
        const endPos = parseInt(spot.endSelectPosition) || 0;

        if (startPos < 0 || endPos > text.length || startPos > endPos) {
            spotFixDebugLog('Invalid text positions: ' + spot);
            return;
        }

        markers.push({ position: startPos, type: 'start' });
        markers.push({ position: endPos, type: 'end' });
    });

    if (markers.length === 0) return;

    // Sort markers backward
    markers.sort((a, b) => b.position - a.position);

    // Check here that element (from meta.nodePath) contains same inner text as in meta.selectedText
    // Is the `text` in the element equal to the selected text `spotSelectedText`
    if ( text.slice(markers[1].position, markers[0].position) !== spotSelectedText ) {
        spotFixDebugLog('It is not allow to highlight element by provided metadata.');
        return;
    }

    let result = text;
    markers.forEach(marker => {
        const insertText = marker.type === 'start'
            ? spotfixHighlightOpen
            : spotfixHighlightClose;

        result = result.slice(0, marker.position) + insertText + result.slice(marker.position);
    });

    // Safety HTML insert
    try {
        element.innerHTML = ksesFilter(result);
        document.querySelectorAll('.doboard_task_widget-see-task').forEach(link => {
            link.addEventListener('click', (e) => {

                e.preventDefault();
                const classList = link.className.split(' ');
                const idClass = classList.find(cls => cls.includes('__task-id-'));
                let taskId = null;
                if (idClass) {
                    taskId = idClass.split('__task-id-')[1];
                }
                if (taskId) {
                    widgetInstance.currentActiveTaskId = taskId;
                    widgetInstance.showOneTask();
                }
            });
        });
    } catch (error) {
        spotFixDebugLog('Error updating element content: ' + error);
    }
}

/**
 * Scroll to an element by tag, class, and text content
 * @param {array} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function spotFixScrollToNodePath(path) {
    const node = spotFixRetrieveNodeFromPath(path);
    if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    return false;
}

function spotFixRemoveHighlights() {
    const textSelectionclassName = 'doboard_task_widget-text_selection';
    const spans = document.querySelectorAll('.' + textSelectionclassName);
    const affectedParents = new Set(); // Track unique parents

    spans.forEach(span => {
        const parent = span.parentNode;
        affectedParents.add(parent); // Mark parent as affected
        const tooltip = span.querySelector('.doboard_task_widget-text_selection_tooltip');
        if (tooltip) tooltip.remove();

        // Move all child nodes out of the span and into the parent
        while (span.firstChild) {
            parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
    });

    // Normalize all affected parents to merge adjacent text nodes
    affectedParents.forEach(parent => parent.normalize());

    const elementSelectionClassName = 'doboard_task_widget-element_selection';
    const elements = document.querySelectorAll(`.${elementSelectionClassName}`);
    elements.forEach(element => {
        element.classList.remove(elementSelectionClassName);
    });
    const imageSelectionClassName = 'doboard_task_widget-image_selection';
    const images = document.querySelectorAll(`.${imageSelectionClassName}`);
    images.forEach(element => {
        element.classList.remove(imageSelectionClassName);
    });
}

/**
 * Validate nodePath as array of indices
 * @param {Array} nodePath
 * @returns {boolean}
 */
function spotFixIsValidNodePath(nodePath) {
    if (!Array.isArray(nodePath)) return false;
    if (nodePath.length === 0) return false;

    return nodePath.every(index => {
        return Number.isInteger(index) && index >= 0 && index < 1000;
    });
}

/**
 * Try to find selected image in selection.
 * @param selection
 * @returns {Node|*|null}
 */
function spotFixGetSelectedImage(selection) {

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return null;
    }

    const range = selection.getRangeAt(0);

    // Is current end container IMG
    if (range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE &&
        range.startContainer.tagName === 'IMG') {
        return range.startContainer;
    }

    // Get img in the range
    const walker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: function(node) {
                return node.tagName === 'IMG' &&
                spotFixIsElementInRange(node, range) ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_REJECT;
            }
        }
    );

    let imgNode = walker.nextNode();
    if (imgNode) {
        return imgNode;
    }

    // start/end containers
    const startElement = spotFixGetElementFromNode(range.startContainer);
    const endElement = spotFixGetElementFromNode(range.endContainer);

    // If selection starts on image
    if (startElement && startElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(startElement, range)) {
        return startElement;
    }

    if (endElement && endElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(endElement, range)) {
        return endElement;
    }

    // 4. Get closest IMG
    const nearbyElements = spotFixFindNearbyElements(range);
    for (const element of nearbyElements) {
        if (element.tagName === 'IMG') {
            return element;
        }
    }

    return null;
}

function spotFixIsElementInRange(element, range) {
    const elementRange = document.createRange();
    elementRange.selectNode(element);
    return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
}

function spotFixIsElementPartiallySelected(element, range) {
    const elementRect = element.getBoundingClientRect();
    const rangeRect = range.getBoundingClientRect();

    //  bounding rectangles is crossed
    return !(elementRect.right < rangeRect.left ||
        elementRect.left > rangeRect.right ||
        elementRect.bottom < rangeRect.top ||
        elementRect.top > rangeRect.bottom);
}

function spotFixGetElementFromNode(node) {
    return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
}

/**
 * Find nearby elements in the range.
 * @param range
 * @returns {*[]}
 */
function spotFixFindNearbyElements(range) {
    const elements = [];
    const container = range.commonAncestorContainer;

    // search elements
    const previousElement = container.previousElementSibling;
    const nextElement = container.nextElementSibling;

    if (previousElement) {
        elements.push(previousElement);
    }
    if (nextElement) {
        elements.push(nextElement);
    }

    // Also check child container
    if (container.nodeType === Node.ELEMENT_NODE) {
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            if (spotFixIsElementPartiallySelected(children[i], range)) {
                elements.push(children[i]);
            }
        }
    }

    return elements;
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function spotFixCalculateNodePath(node) {
    let path = [];
    while (node) {
        let index = 0;
        let sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === 1) {
                index++;
            }
            sibling = sibling.previousSibling;
        }
        path.unshift(index);
        node = node.parentNode;
    }

    // Hard fix - need to remove first element to work correctly
    path.shift();

    return path;
}

/**
 * Retrieve a DOM node from a path
 *
 * @param {int[]} path
 * @return {*|null}
 */
function spotFixRetrieveNodeFromPath(path) {
    // @ToDo check if the path is correct
    if ( ! path ) {
        return null;
    }

    let node = document;
    for (let i = 0; i < path.length; i++) {
        node = node.children[path[i]];
        if ( ! node ) {
            return null;
        }
    }
    return node;
}

/**
 * Return bool if widget is closed in local storage
 * @returns {boolean}
 */
function storageGetWidgetIsClosed() {
    return localStorage.getItem('spotfix_widget_is_closed') === '1';
}

/**
 * Return bool if widget closed state is defined in local storage
 * @returns {boolean}
 */
function storageWidgetCloseIsSet() {
    return localStorage.getItem('spotfix_widget_is_closed') !== null;
}

/**
 * Save widget closed state
 * @param visible
 */
function storageSetWidgetIsClosed(visible) {
    localStorage.setItem('spotfix_widget_is_closed', visible ? '1' : '0');
    if(visible) {
        wsSpotfix.close();
    } else {
        wsSpotfix.connect();
        wsSpotfix.subscribe();
    }
}

/**
 * Return bool if user is defined in local storage
 * @returns {boolean}
 */
function storageGetUserIsDefined() {
    return localStorage.getItem('spotfix_user_id') !== null;
}

/**
 * Save data for updates check
 * @param tasks
 */
function storageSaveTasksUpdateData(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }

    tasks.forEach(task => {
        if (task.taskId && task.taskLastUpdate) {
            storedTasks[task.taskId] = {
                taskId: task.taskId,
                taskLastUpdate: task.taskLastUpdate
            };
        }
    });

    localStorage.setItem('spotfix_task_updates', JSON.stringify(storedTasks));
}

function storageSaveTasksCount(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const count = tasks.filter(task => {
        return task.taskMeta;
    })?.length;

    localStorage.setItem('spotfix_tasks_count', `${count}`);
}

/**
 * Check if a specific task has been updated since last check
 * @param taskId
 * @param currentLastUpdate
 * @returns {boolean|null}
 */
function storageCheckTaskUpdate(taskId, currentLastUpdate) {
    if (!taskId || !currentLastUpdate) {
        return null;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }
    const storedTask = storedTasks[taskId];

    if (!storedTask) {
        return false;
    }

    const storedUpdate = new Date(storedTask.taskLastUpdate);
    const currentUpdate = new Date(currentLastUpdate);
    return currentUpdate > storedUpdate;
}

/**
 * Add unread update for a specific task
 * @param taskId
 */
function storageAddUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    if (!storedUnread.includes(taskId)) {
        storedUnread.push(taskId);
    }

    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Remove unread update for a specific task
 * @param taskId
 */
function storageRemoveUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }
    storedUnread = storedUnread.filter(id => id !== taskId);
    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Check if there are any unread updates
 * @returns {boolean}
 */
function storageTasksHasUnreadUpdates() {
    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.length > 0;
}

/**
 *  Check if a specific task has unread updates
 * @param taskId
 * @returns {boolean}
 */
function storageProvidedTaskHasUnreadUpdates(taskId) {
    if (!taskId) {
        return false;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.includes(taskId.toString());
}

function storageSaveSpotfixVersion (version) {
    if(version) {
        localStorage.setItem('spotfix_app_version', `${version}`);
    } else {
        localStorage.setItem('spotfix_app_version', '');
    }
}

function clearLocalstorageOnLogout () {
    localStorage.removeItem('spotfix_email');
    localStorage.removeItem('spotfix_session_id');
    localStorage.removeItem('spotfix_user_id');
    localStorage.removeItem('spotfix_accounts');
    localStorage.setItem('spotfix_widget_is_closed', '1');
    wsSpotfix.close();
}

/**
 * File uploader handler for managing file attachments with validation and upload capabilities
 */
class FileUploader {
    /**
     * Create a new FileUploader instance
     * @param {function} escapeHtmlHandler - Function to escape HTML strings for security
     */
    constructor(escapeHtmlHandler) {
        /** @type {Array<{id: string, file: File}>} */
        this.files = [];

        /** @type {number} Maximum allowed file size in bytes */
        this.maxFileSize = 5 * 1024 * 1024; // 5MB

        /** @type {number} Maximum total size for all files in bytes */
        this.maxTotalSize = 25 * 1024 * 1024; // 25MB

        /** @type {number} Maximum number of files allowed */
        this.maxFiles = 5;

        /** @type {string[]} Allowed MIME types for files */
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword'];

        /** @type {function} HTML escaping function for XSS protection */
        this.escapeHtmlHandler = escapeHtmlHandler;

        /** @type {string[]} File size units for display */
        this.SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'];
    }

    /**
     * Initialize elements and bindings. Should be called only for comments.
     * @returns {void}
     */
    init() {
        this.initializeElements();
        this.bindFilesInputChange();
    }

    /**
     * Define widget elements to work with uploader.
     * @returns {void}
     */
    initializeElements() {
        /** @type {HTMLInputElement|null} */
        this.fileInput = document.getElementById('doboard_task_widget__file-upload__file-input-button');

        /** @type {HTMLElement|null} */
        this.fileList = document.getElementById('doboard_task_widget__file-upload__file-list');

        this.uploaderWrapper = document.getElementById('doboard_task_widget__file-upload__wrapper');

        /** @type {HTMLElement|null} */
        this.errorMessage = document.getElementById('doboard_task_widget__file-upload__error');

        if (!this.fileInput || !this.fileList || !this.errorMessage || this.uploaderWrapper) {
            console.warn('File uploader elements not found');
        }
    }

    /**
     * Define hidden file input change to run uploader logic.
     * @returns {void}
     */
    bindFilesInputChange() {
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this.handleFileInputChange(e));
        }
    }

    /**
     * Bind action to paperclip button.
     * @param {HTMLElement} element - The paperclip button element
     * @returns {void}
     */
    bindPaperClipAction(element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.fileInput) {
                this.fileInput.click();
            }
        });
    }

    /**
     * Handle file input change event
     * @param {Event} event - File input change event
     * @returns {void}
     */
    handleFileInputChange(event) {
        this.clearError();

        const selectedFiles = Array.from(event.target.files);
        if (this.files.length + selectedFiles.length > this.maxFiles) {
            this.showError(`Maximum ${this.maxFiles} files can be attached.`);
            return;
        }
        const validFiles = selectedFiles.filter(file => this.validateFile(file));

        validFiles.forEach(file => this.addFile(file));

        // Reset input to allow selecting same files again
        event.target.value = '';

        // show wrapper
        this.uploaderWrapper.style.display = 'block';
    }

    /**
     * Validate a file against upload constraints
     * @param {File} file - File to validate
     * @returns {boolean} True if file is valid, false otherwise
     */
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            this.showError(`File "${file.name}" is too large. Maximum size: ${this.formatFileSize(this.maxFileSize)}`);
            return false;
        }

        // Check total size
        const totalSize = this.getTotalSize() + file.size;
        if (totalSize > this.maxTotalSize) {
            this.showError(`Total files size exceeded. Maximum: ${this.formatFileSize(this.maxTotalSize)}`);
            return false;
        }

        // Check file type
        if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(file.type)) {
            this.showError(`File type "${file.type}" for "${file.name}" is not supported.`);
            return false;
        }

        return true;
    }

    /**
     * Calculate total size of all files
     * @returns {number} Total size in bytes
     */
    getTotalSize() {
        return this.files.reduce((sum, fileData) => sum + fileData.file.size, 0);
    }

    /**
     * Add a file to the upload queue
     * @param {File} file - File to add
     * @returns {void}
     */
    addFile(file) {
        const fileWithId = {
            id: this.generateFileId(),
            file: file
        };

        this.files.push(fileWithId);
        this.renderFileList();
    }

    /**
     * Generate a unique file ID
     * @returns {string} Unique file identifier
     * @private
     */
    generateFileId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Remove a file from the upload queue
     * @param {string} fileId - ID of the file to remove
     * @returns {void}
     */
    removeFile(fileId) {
        this.files = this.files.filter(f => f.id !== fileId);
        this.renderFileList();
        this.clearError();
    }

    /**
     * Render the file list in the UI
     * @returns {void}
     */
    renderFileList() {
        if (!this.fileList) return;

        if (this.files.length === 0) {
            this.fileList.innerHTML = ksesFilter('<div style="text-align: center; color: #444c529e;">No files attached</div>');
            return;
        }

        const fileItems = this.files.map(fileData => this.createFileItem(fileData));
        this.fileList.innerHTML = ksesFilter('');
        fileItems.forEach(item => this.fileList.appendChild(item));
    }

    /**
     * Create file item element for display
     * @param {object} fileData - File data object
     * @param {string} fileData.id - File identifier
     * @param {File} fileData.file - File object
     * @returns {HTMLDivElement} File item DOM element
     */
    createFileItem(fileData) {
        const { file, id } = fileData;
        const fileItem = document.createElement('div');
        fileItem.className = 'doboard_task_widget__file-upload__file-item';

        fileItem.innerHTML = ksesFilter(`
            <div class="doboard_task_widget__file-upload__file-item-content">
                <div class="doboard_task_widget__file-upload__file_info">
                    <div class="doboard_task_widget__file-upload__file-name">${this.escapeHtmlHandler(String(file.name))}</div>
                    <div class="doboard_task_widget__file-upload__file_size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="doboard_task_widget__file-upload__remove-btn" data-file-id="${id}" aria-label="Remove file">×</button>
        `);

        const removeBtn = fileItem.querySelector('.doboard_task_widget__file-upload__remove-btn');
        removeBtn.addEventListener('click', () => this.removeFile(id));

        return fileItem;
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size string
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + this.SIZE_UNITS[i];
    }

    /**
     * Show uploader error message
     * @param {string} message - Error message to display
     * @returns {void}
     */
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
    }

    /**
     * Clear uploader error message
     * @returns {void}
     */
    clearError() {
        if (this.errorMessage) {
            this.errorMessage.textContent = '';
            this.errorMessage.style.display = 'none';
        }
    }

    /**
     * Check if there are files to send
     * @returns {boolean} True if files are present, false otherwise
     */
    hasFiles() {
        return this.files.length > 0;
    }

    /**
     * Clear all files from upload queue
     * @returns {void}
     */
    clearFiles() {
        this.files = [];
        this.renderFileList();
    }

    /**
     * Validate file data structure before upload
     * @param {object} fileData - File data object to validate
     * @param {string} fileData.sessionId - Session identifier
     * @param {object} fileData.params - Additional parameters
     * @param {string} fileData.params.accountId - Account identifier
     * @param {string} fileData.params.projectToken - Project token
     * @param {string} fileData.commentId - Comment identifier
     * @param {string} fileData.fileName - File name
     * @param {File} fileData.fileBinary - File binary data
     * @returns {object} Validated file data
     * @throws {Error} When file data validation fails
     */
    validateFileData(fileData) {
        const validations = [
            { field: 'sessionId', type: 'string', message: 'No valid session found.' },
            { field: 'params.accountId', type: 'string', message: 'No valid account ID found.' },
            { field: 'params.projectToken', type: 'string', message: 'No valid project token found.' },
            { field: 'commentId', type: 'string', message: 'No valid commentId found.' },
            { field: 'fileName', type: 'string', message: 'No valid filename found.' }
        ];

        for (const validation of validations) {
            const value = this.getNestedValue(fileData, validation.field);
            if (!value || typeof value !== validation.type) {
                throw new Error(validation.message);
            }
        }

        if (!fileData.fileBinary || !(fileData.fileBinary instanceof File)) {
            throw new Error('No valid file object found.');
        }

        return fileData;
    }

    /**
     * Helper to get nested object values
     * @param {object} obj - Object to traverse
     * @param {string} path - Dot notation path to value
     * @returns {*} Value at the specified path
     * @private
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Send single file attachment
     * @param {object} fileData - File data for upload
     * @returns {Promise<object>} Upload response
     */
    async sendSingleAttachment(fileData) {
        const validatedFileData = await this.validateFileData(fileData);
        return await attachmentAddDoboard(validatedFileData);
    }

    /**
     * Send all attachments for a comment
     * @param {object} params - Upload parameters
     * @param {string} sessionId - Session identifier
     * @param {string} commentId - Comment identifier
     * @returns {Promise<object>} Upload results
     */
    async sendAttachmentsForComment(params, sessionId, commentId) {
        /** @type {object} */
        const results = {
            preparedFilesCount: this.files.length,
            sentFilesCount: 0,
            fileResults: [],
            success: true
        };

        for (let i = 0; i < this.files.length; i++) {
            const fileData = this.files[i];
            /** @type {object} */
            const result = {
                success: false,
                response: null,
                error: null
            };

            try {
                const attachmentData = {
                    params,
                    sessionId,
                    commentId,
                    fileName: fileData.file.name,
                    fileBinary: fileData.file,
                    attachmentOrder: i
                };

                const response = await this.sendSingleAttachment(attachmentData);
                result.response = response;
                result.success = response.status === 200;

                if (result.success) {
                    results.sentFilesCount++;
                }
            } catch (error) {
                result.error = error.message;
            }

            results.fileResults.push(result);
        }

        results.success = results.preparedFilesCount === results.sentFilesCount;
        this.clearFiles();

        return results;
    }

     /**
     * Make a screenshot and add it as a file
     * @returns {Promise<void>}
     */
    async makeScreenshot() {
        if (typeof html2canvas === 'undefined') {
            console.error("SpotFix Error: in Screenshot Library");
            return null;
        }
        try {
            const canvas = await html2canvas(document.body, {
                useCORS: true,
                allowTaint: true,
                logging: false,
                scale: window.devicePixelRatio || 1
            });

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) return null;

            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();

            const fileName = `Screenshot_${hours}-${minutes}_${day}_${month}_${year}.png`;
            const file = new File([blob], fileName, {
                type: 'image/png',
                lastModified: Date.now()
            });

            if (this.uploaderWrapper && this.uploaderWrapper.style.display !== 'block') {
                this.uploaderWrapper.style.display = 'block';
            }

            this.clearError();
            this.addFile(file);

        } catch (err) {
            console.error("SpotFix Error: creating screenshot:", err);
            return null;
        }
    }
}
class SpotFixTemplatesLoader {
    static getTemplateCode(templateName) {
        const templateMethod = this[templateName];

        if (typeof templateMethod !== 'function') {
            throw new Error(`Template method '${templateName}' not found`);
        }

        let template = templateMethod.call(this).trim();

        return template;
    }

    static all_issues() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardGreen}}"  alt="">
            <span>All spots </span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="addNewTaskButton">
                <img src="{{iconPlus}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container">
        </div>
        <div class="doboard_task_widget_tasks_list">
            <span>doBoard / SpotFix</span>
        </div>
    </div>
</div>`;
    }

    static concrete_issue() {
        return `
<div id="doboard_task_widget_concrete-container" class="{{contenerClasess}}">
    <div class="doboard_task_widget-header" style="height: 42px; padding-top: 10px; align-items: flex-start">
        <div class="doboard_task_widget_return_to_all doboard_task_widget_cursor-pointer">
            <img src="{{chevronBack}}" alt="" title="Return to all spots list">
            <span title="Return to all spots list"> All {{issuesCounter}}</span>
        </div>
        <div class="doboard_task_widget-issue-title">
            <span>{{issueTitle}}</span>
            <span>{{amountOfComments}}</span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-concrete_issue">
        <div id="spotfix_doboard_task_widget_url" class="spotfix_doboard_task_widget_url">
                <a rel="nofollow" style="word-break: break-all" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
        </div>
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-concrete_issues-container">
        </div>
        <div class="doboard_task_widget-send_message doboard_task_widget-spotfix-editor">
             <textarea name="doboard_task_widget_message" id="doboard_task_widget-send_message_input_SpotFix" class="doboard_task_widget-send_message_input" placeholder="Write a message..."></textarea>
<!--            <div>-->
<!--              <div class="doboard_task_widget-field">-->
<!--                <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button doboard_task_widget-send_message_button">Submit</button>-->
<!--            </div>-->
            </div>
            <div class="doboard_task_widget__file-upload__wrapper" id="doboard_task_widget__file-upload__wrapper">
                <div class="doboard_task_widget__file-upload__list-header">Attached files</div>
                <div class="doboard_task_widget__file-upload__file-list" id="doboard_task_widget__file-upload__file-list"></div>
                <div class="doboard_task_widget__file-upload__error" id="doboard_task_widget__file-upload__error"></div>
                <input type="file" class="doboard_task_widget__file-upload__file-input-button" id="doboard_task_widget__file-upload__file-input-button" multiple accept="*/*">
            </div>
        </div>
    </div>
</div>
`;
    }

    static concrete_issue_day_content() {
        return `
<div class="doboard_task_widget-concrete_issue-day_content">
    <div class="doboard_task_widget-concrete_issue_day_content-month_day">{{dayContentMonthDay}}</div>
    <div class="doboard_task_widget-concrete_issue_day_content-messages_wrapper">{{dayContentMessages}}</div>
    {{statusFixedHtml}}
</div>
`;
    }

    static concrete_issue_messages() {
        return `
<div class="doboard_task_widget-comment_data_wrapper doboard_task_widget-comment_data_{{issueMessageClassOwner}}">
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-comment_text_container">
        <div class="doboard_task_widget-comment_body">{{commentBody}}</div>
        <div class="doboard_task_widget-comment_time">{{commentTime}}</div>
    </div>
</div>
`;
    }

    static create_issue() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardGreen}}"  alt="">
            <span>Report an issue</span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                 <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-create_issue" style="display: flex; flex-direction: column">

        <div class="doboard_task_widget-element-container">
            <span>
                Tell us about any issue you’re experiencing on <span style="text-decoration: underline">{{currentDomain}}</span>. 
                You’re also welcome to review spelling, grammar, or ask a question related to this page.
            </span>
        </div>

        <div class="doboard_task_widget-input-container">
            <input id="doboard_task_widget-title" class="doboard_task_widget-field" name="title" value="{{selectedText}}" required>
            <label class="spotfix_placeholder_title" for="doboard_task_widget-title">Report about</label>
        </div>

        <div class="doboard_task_widget-input-container doboard_task_widget-input-container-textarea" style="flex-grow: 1; min-height: 120px">
            <textarea id="doboard_task_widget-description" class="doboard_task_widget-field" name="description" placeholder=" " required></textarea>
            <label for="doboard_task_widget-description" class="doboard_task_widget-field-textarea-label" >Description</label>
        </div>

        <div class="doboard_task_widget-login" style="margin-top: 16px">

            <span  class="doboard_task_widget-login-icon" >If you want to receive notifications by email write here you email contacts.</span>

            <div class="doboard_task_widget-accordion">
            
                   <div class="doboard_task_widget-input-container-phantom">
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-user_name" class="doboard_task_widget-field" type="text" name="user_name">
                            <label for="doboard_task_widget-user_name">Nickname</label>
                        </div>
        
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-user_email" class="doboard_task_widget-field" type="email" name="user_email">
                            <label for="doboard_task_widget-user_email">Email</label>
                        </div>
        
                        <div class="doboard_task_widget-input-container hidden">
                            <input id="doboard_task_widget-user_password" class="doboard_task_widget-field" type="password" name="user_password">
                            <label for="doboard_task_widget-user_password">Password</label>
                        </div>
        
                        <i>Note about DoBoard register and accepting email notifications about tasks have to be here.</i>
                        </br>
                        <i>If you are a doBoard user, use same Email and password as at <a href="https://doboard.com" target="_blank" rel="nofollow">doboard.com</a>
                            on the <span id="doboard_task_widget-show_login_form" class="doboard_task_widget-show_login_form">login page</span>
                         </i>
                 </div> 
                     
                 <div id="doboard_task_widget-input-container-login" class="doboard_task_widget-input-container-login doboard_task_widget-hidden">
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-login_email" class="doboard_task_widget-field" type="email" name="login_email">
                            <label for="doboard_task_widget-login_email">Email</label>
                        </div>
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-login_password" class="doboard_task_widget-field" type="password" name="login_password">
                            <label for="doboard_task_widget-login_password">Password</label>
                            <span class="doboard_task_widget-bottom-eye-icon" id="doboard_task_widget-password-toggle"></span>
                        </div>
                        <div>  
                                <span id="doboard_task_widget-forgot_password" class="doboard_task_widget-forgot_password">Forgot Password?</span>
                        </div> 
                        <div class="doboard_task_widget-login-buttons-wrapper">
                            <button id="doboard_task_widget-on_phantom_login_page" class="doboard_task_widget-submit_button">Cancel</button>
                            <button id="doboard_task_widget-login_button" class="doboard_task_widget-submit_button">Log in</button>
                        </div>
                        <div>
                            <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Login or password is invalid </span></i>
                        </div>
                 </div>
                 <div id="doboard_task_widget-container-login-forgot-password-form" class="doboard_task_widget-forgot_password_form doboard_task_widget-hidden">
                     <div class="doboard_task_widget-input-container">
                         <input id="doboard_task_widget-forgot_password_email" class="doboard_task_widget-field" type="email" name="forgot_password_email">
                         <label for="doboard_task_widget-forgot_password_email">Email</label>
                     </div>
                     <div class="doboard_task_widget-login-buttons-wrapper">
                         <button id="doboard_task_widget-forgot_password-black" class="doboard_task_widget-submit_button">Cancel</button>
                         <button id="doboard_task_widget-restore_password_button" class="doboard_task_widget-submit_button">Restore password</button>
                     </div>
                </div>
            </div>

        </div>

        <div class="doboard_task_widget-field">
            <div style="display: flex; justify-content: space-between; align-items: center; min-width: 270px; max-width: 420px">
              <div style="display: flex; align-items: center">
                  <img src="{{iconPublic}}" alt="">
                  <span style="color: #252A2F; margin-left: 6px;">Public
                  <span style="color: #707A83; font-size: 12px; margin-left: 6px;">(your message will be public to all visitors)</span>
                  </span>
              </div>      
              <label class="toggle" style="margin-left: 8px; top: 4px">
                  <input id="spotfix-widget-create-task-visibility" type="checkbox">
                  <span class="slider"></span>
              </label>
            </div>
            <button id="doboard_task_widget-submit_button" style="min-width: 270px" class="doboard_task_widget-submit_button">Send report</button>
        </div>

        <div class="doboard_task_widget-message-wrapper hidden">
            <span id="doboard_task_widget-error_message-header"></span>
            <div id="doboard_task_widget-error_message"></div>
        </div>
    </div>
</div>
`;
    }

    static list_issues() {
        return `
<div class="doboard_task_widget-task_row issue-item {{elementBgCSSClass}}" data-node-path='[{{nodePath}}]' data-task-id='{{taskId}}'>
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-description_container" style="cursor: default">
        <div class="doboard_task_widget-task_title" style="cursor: pointer">
            <div class="doboard_task_widget-task_title-details">
                <span class="doboard_task_widget-task_title-text">{{taskTitle}}</span>
                <div class="doboard_task_widget-task_title_public_status_img">
                    <img src="{{taskPublicStatusImgSrc}}" alt="" title="{{taskPublicStatusHint}}">
                </div>
                <span class="doboard_task_widget-task_title-unread_block {{classUnread}}"></span>
            </div>
<!--            <div class="doboard_task_widget-task_title-last_update_time">{{taskLastUpdate}}</div>-->
        </div>
        <div class="doboard_task_widget-bottom">
            <div class="doboard_task_widget-task_page_url">
                <img src="{{iconLinkChain}}" />
                   <a class="spotfix_widget_task_url" title="The spot is located on this {{taskPageUrlFull}}">{{taskPageUrl}}</a>
                   <a class="spotfix_widget_task_url-short" style="display: none" title="The spot is located on this {{taskPageUrlFull}}">{{taskFormattedPageUrl}}</a>
                   <a class="spotfix_widget_task_url-full" style="display: none" title="The spot is located on this {{taskPageUrlFull}}">{{taskPageUrlFull}}</a>
             </div>
                {{statusFixedHtml}}
        </div>
    </div>
</div>
`;
    }

    static user_menu() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-user_menu-header">
        <div class="doboard_task_widget-user_menu-header-top">
            <div id="spotfix_back_button" class="doboard_task_widget_cursor-pointer" 
            style="display: flex;align-items: center;gap: 8px;">
                <img src="{{chevronBackDark}}" alt="">
                <span> Back</span>
            </div>
            <div>
                <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
            </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
             <img class="doboard_task_widget-user_menu-header-avatar" src="{{avatar}}" alt="">
             <span style="font-size: 16px; font-weight: 700">{{userName}}</span>
             <span style="font-size: 12px;">{{email}}</span>
             <span id="doboard_task_widget-user_menu-signlog_button">
                 <a style="cursor: pointer" rel="nofollow" target="_blank">Sign up or Log in</a>
             </span>
        </div>
    </div>
    <div class="doboard_task_widget-content" style="min-height:200px ">
        <div style="height: 392px">
        <div style="position: sticky; top: 0">
            <div class="doboard_task_widget-user_menu-item">
                <img src="{{iconEye}}" alt="" style="margin-right: 12px">
                <div style="display: flex; justify-content: space-between; flex-grow: 1; align-items: center">
                    <span style="display: inline-flex; flex-direction: column">
                        <span style="font-weight: 500; font-size: 14px; color: #252A2F; margin-bottom: 4px">
                        Show widget on my screen</span>
                        <span style="font-size: 10px; color: #40484F">
                        The widget will be visible again if you select any text on the site</span>
                    </span>
                    <label class="toggle" style="margin-left: 8px">
                      <input id="widget_visibility" type="checkbox">
                      <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="doboard_task_widget-user_menu-item">
                <span id="doboard_task_widget-user_menu-logout_button">
                    <img src="{{iconDoor}}" alt="" style="margin-right: 12px; cursor: pointer">
                    <span class="logout_button">Log out</span>
                </span>
            </div>
            
            <div id="doboard_task_widget-input-container-login" class="doboard_task_widget-input-container-login doboard_task_widget-input-container-login-menu ">
                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-login_email" class="doboard_task_widget-field" type="email" name="login_email">
                    <label for="doboard_task_widget-login_email">Email</label>
                </div>
                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-login_password" class="doboard_task_widget-field" type="password" name="login_password">
                    <label for="doboard_task_widget-login_password">Password</label>
                    <span class="doboard_task_widget-bottom-eye-icon" id="doboard_task_widget-password-toggle"></span>
                </div>
                <div>
                        <span id="doboard_task_widget-forgot_password" class="doboard_task_widget-forgot_password">Forgot Password?</span>
                </div>
                <div class="doboard_task_widget-field">
                    <button id="doboard_task_widget-login_button" class="doboard_task_widget-submit_button">Log in</button>
                </div>
                <div>
                    <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Login or password is invalid </span></i>
                </div>
             </div>
             <div id="doboard_task_widget-container-login-forgot-password-form" class="doboard_task_widget-forgot_password_form doboard_task_widget-forgot_password_form-menu doboard_task_widget-hidden">
                 <div class="doboard_task_widget-input-container">
                     <input id="doboard_task_widget-forgot_password_email" class="doboard_task_widget-field" type="email" name="forgot_password_email">
                     <label for="doboard_task_widget-forgot_password_email">Email</label>
                 </div>
                 <div class="doboard_task_widget-login-buttons-wrapper">
                     <button id="doboard_task_widget-forgot_password-black" class="doboard_task_widget-submit_button">Cancel</button>
                     <button id="doboard_task_widget-restore_password_button" class="doboard_task_widget-submit_button">Restore password</button>
                 </div>
            </div>
            
        </div>
        </div>
        <div style="padding: 16px; font-size: 13px; position: sticky; bottom: 0">
            <span>{{spotfixVersion}}</span>
            <span>Powered by
            <a rel="nofollow" target="_blank" href="https://doboard.com">
             doBoard
            </a></span>
        </div>
        <div class="doboard_task_widget-message-wrapper hidden">
            <span id="doboard_task_widget-error_message-header"></span>
        <div id="doboard_task_widget-error_message"></div>
    </div>
    </div>
</div>`;
    }

    static wrap() {
        return `
<div class="doboard_task_widget-wrap" style="bottom: {{position}}">
<img src="{{iconMarker}}" />
<!--    <img src="{{logoDoBoardWrap}}" alt="Doboard logo">-->
    <div id="doboard_task_widget-task_count" class="hidden"></div>
</div>`;
    }

    static wrap_review() {
        return `
<button id="doboard_task_widget_button" class="doboard_task_widget-wrap wrap_review" style="bottom: {{position}};">
<img src="{{iconMarker}}" />
<span id="review_content_button_text">Review content</span>
</button>`;
    }

    static fixedHtml() {
        return `<p><span class="doboard_task_widget-bottom-is-fixed">Finished</span></p>`;
    }
    static fixedTaskHtml() {
        return `<p class="doboard_task_widget-bottom-is-fixed-task-block"><span class="doboard_task_widget-bottom-is-fixed-task">This issue already fixed</span></p>`;
    }

}

class SpotFixSVGLoader {
    static loadSVG(svgName) {
        const svgMethod = this[svgName];

        if (typeof svgMethod !== 'function') {
            throw new Error(`Template method '${svgName}' not found`);
        }

        return svgMethod.call(this).trim();
    }

    static getAsRawSVG(svgName) {
        return this.loadSVG(svgName);
    }

    static getAsDataURI(svgName) {
        const svg = this.loadSVG(svgName);
        return this.svgToDataURI(svg);
    }

    static svgToDataURI(svgString) {
        const bytes = new TextEncoder().encode(svgString);
        const baseBtoa = btoa(String.fromCharCode(...bytes));
        return `data:image/svg+xml;base64,${baseBtoa}`;
    }

    static chevronBack() {
        return `
<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13L1 7L7 1" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static chevronBackDark() {
        return `
<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13L1 7L7 1" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static buttonCloseScreen() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6L18 18" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static buttonSendMessage() {
        return `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#22A475"/>
    <g clip-path="url(#clip0_458_94)">
        <path d="M22.3337 7.6665L13.167 16.8332" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22.3337 7.6665L16.5003 24.3332L13.167 16.8332L5.66699 13.4998L22.3337 7.6665Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
        <clipPath id="clip0_458_94">
            <rect width="20" height="20" fill="white" transform="translate(4 6)"/>
        </clipPath>
    </defs>
</svg>`;
    }

    static buttonPaperClip() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.4393 11.0499L12.2493 20.2399C11.1235 21.3658 9.5965 21.9983 8.00431 21.9983C6.41213 21.9983 4.88516 21.3658 3.75931 20.2399C2.63347 19.1141 2.00098 17.5871 2.00098 15.9949C2.00098 14.4027 2.63347 12.8758 3.75931 11.7499L12.9493 2.55992C13.6999 1.80936 14.7179 1.3877 15.7793 1.3877C16.8408 1.3877 17.8588 1.80936 18.6093 2.55992C19.3599 3.31048 19.7815 4.32846 19.7815 5.38992C19.7815 6.45138 19.3599 7.46936 18.6093 8.21992L9.40931 17.4099C9.03403 17.7852 8.52504 17.996 7.99431 17.996C7.46359 17.996 6.95459 17.7852 6.57931 17.4099C6.20403 17.0346 5.9932 16.5256 5.9932 15.9949C5.9932 15.4642 6.20403 14.9552 6.57931 14.5799L15.0693 6.09992" stroke="#707A83" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static logoDoBoardGreen() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3435 1.87294e-10H0V24H7.04064H12.3435C27.8855 24 27.8855 -7.7417e-05 12.3435 1.87294e-10ZM7.04064 24C3.18002 24 0.0503678 20.7764 0.0503678 16.8C0.0503678 12.8236 3.18002 9.6 7.04064 9.6C10.9012 9.6 14.0309 12.8236 14.0309 16.8C14.0309 20.7764 10.9012 24 7.04064 24Z" fill="#1C7857"/>
</svg>`;
    }

    static logoDoBoardWrap() {
        return `
<svg width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.113132 71.1182L0.109378 35.8851C0.106353 28.9195 2.16921 22.1096 6.03703 16.3165C9.90485 10.5235 15.4039 6.00773 21.8385 3.34038C28.2731 0.673036 35.3543 -0.0260367 42.1862 1.33159C49.0182 2.68922 55.2941 6.04255 60.22 10.9674C65.1459 15.8923 68.5006 22.1675 69.8597 28.9991C71.2188 35.8308 70.5212 42.9121 67.8552 49.3473C65.1893 55.7825 60.6746 61.2825 54.8824 65.1515C49.0903 69.0206 42.2807 71.0849 35.3151 71.0834L0.113132 71.1182Z" fill="#1C7857"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M37.5152 20H19V56H29.561H37.5152C60.8283 56 60.8283 19.9999 37.5152 20ZM29.561 56C23.77 56 19.0756 51.1647 19.0756 45.2C19.0756 39.2353 23.77 34.4 29.561 34.4C35.3519 34.4 40.0463 39.2353 40.0463 45.2C40.0463 51.1647 35.3519 56 29.561 56Z" fill="white"/>
</svg>`;
    }

    static iconSpotPublic() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0008 3.00027C7.17178 2.96187 2.97093 7.00382 3.00088 12.0003C2.91808 17.8096 8.71723 22.2578 14.3059 20.7002C24.3554 17.8039 22.5675 3.27107 12.0008 3.00027ZM17.2508 14.9653C16.9608 17.0153 15.9608 18.4703 14.8258 19.4853C14.6508 19.5503 14.4758 19.6103 14.2958 19.6603C14.1558 17.2853 13.0958 16.9203 12.0608 16.5603C10.7322 16.2243 9.99648 15.2916 9.96088 14.0202C9.89083 13.3953 9.82083 12.7453 9.14083 12.2903C8.43083 11.8203 7.81583 11.7753 7.27078 11.7303C6.62578 11.6803 6.15578 11.6453 5.71578 10.8753C4.81578 9.30527 5.90578 7.25027 7.28578 5.54027C8.61078 4.57527 10.2408 4.00027 12.0008 4.00027C12.8538 3.90392 14.0209 4.33902 14.2658 5.08032C14.5767 5.92247 13.1037 6.60767 12.7758 7.39027C12.4607 8.02027 12.6508 8.49527 12.7908 8.84027C12.9208 9.16027 12.9258 9.22027 12.8258 9.32527C12.5558 9.59027 12.1558 9.42527 11.5258 9.13527C10.8908 8.84527 10.1708 8.51527 9.42078 8.76527C7.72903 9.29942 8.01078 11.1962 9.50078 11.2503C9.94588 11.2463 10.8294 10.9818 11.1558 11.2353C11.1958 11.2703 11.2508 11.3353 11.2508 11.5003C11.3243 12.6158 12.6735 12.6987 13.6107 12.2253C14.4508 11.8053 14.5508 11.9053 15.3258 12.6752C16.081 13.5538 17.4843 13.5449 17.2508 14.9653Z" fill="#252A2F"/>
</svg>`;
    }

    static iconSpotPrivate() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0008 2.99978C7.17178 2.96138 2.97093 7.00333 3.00088 11.9998C2.91808 17.8091 8.71723 22.2573 14.3059 20.6997C24.3554 17.8034 22.5675 3.27058 12.0008 2.99978ZM17.2508 14.9648C16.9608 17.0148 15.9608 18.4698 14.8258 19.4848C14.6508 19.5498 14.4758 19.6098 14.2958 19.6598C14.1558 17.2848 13.0958 16.9198 12.0608 16.5598C10.7322 16.2238 9.99648 15.2911 9.96088 14.0197C9.89083 13.3948 9.82083 12.7448 9.14083 12.2898C8.43083 11.8198 7.81583 11.7748 7.27078 11.7298C6.62578 11.6798 6.15578 11.6448 5.71578 10.8748C4.81578 9.30478 5.90578 7.24978 7.28578 5.53978C8.61078 4.57478 10.2408 3.99978 12.0008 3.99978C12.8538 3.90343 14.0209 4.33853 14.2658 5.07983C14.5767 5.92198 13.1037 6.60718 12.7758 7.38978C12.4607 8.01978 12.6508 8.49478 12.7908 8.83978C12.9208 9.15978 12.9258 9.21978 12.8258 9.32478C12.5558 9.58978 12.1558 9.42478 11.5258 9.13478C10.8908 8.84478 10.1708 8.51478 9.42078 8.76478C7.72903 9.29893 8.01078 11.1957 9.50078 11.2498C9.94588 11.2458 10.8294 10.9813 11.1558 11.2348C11.1958 11.2698 11.2508 11.3348 11.2508 11.4998C11.3243 12.6153 12.6735 12.6982 13.6107 12.2248C14.4508 11.8048 14.5508 11.9048 15.3258 12.6747C16.081 13.5533 17.4843 13.5444 17.2508 14.9648Z" fill="#252A2F"/>
<path d="M4.5001 20.5L21.5 4.5" stroke="white" stroke-width="1.5"/>
<line x1="3.08787" y1="19.8516" x2="21.0879" y2="3.05161" stroke="#252A2F" stroke-width="1.5"/>
</svg>`;
    }

    static iconSpotWidgetWrapPencil() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 2.99981C17.2626 2.73717 17.5744 2.52883 17.9176 2.38669C18.2608 2.24455 18.6286 2.17139 19 2.17139C19.3714 2.17139 19.7392 2.24455 20.0824 2.38669C20.4256 2.52883 20.7374 2.73717 21 2.99981C21.2626 3.26246 21.471 3.57426 21.6131 3.91742C21.7553 4.26058 21.8284 4.62838 21.8284 4.99981C21.8284 5.37125 21.7553 5.73905 21.6131 6.08221C21.471 6.42537 21.2626 6.73717 21 6.99981L7.5 20.4998L2 21.9998L3.5 16.4998L17 2.99981Z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static iconLinkChain() {
        return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 5.25H13.5C13.9925 5.25 14.4801 5.347 14.9351 5.53545C15.39 5.72391 15.8034 6.00013 16.1517 6.34835C16.4999 6.69657 16.7761 7.10997 16.9645 7.56494C17.153 8.01991 17.25 8.50754 17.25 9C17.25 9.49246 17.153 9.98009 16.9645 10.4351C16.7761 10.89 16.4999 11.3034 16.1517 11.6517C15.8034 11.9999 15.39 12.2761 14.9351 12.4645C14.4801 12.653 13.9925 12.75 13.5 12.75H11.25M6.75 12.75H4.5C4.00754 12.75 3.51991 12.653 3.06494 12.4645C2.60997 12.2761 2.19657 11.9999 1.84835 11.6517C1.14509 10.9484 0.75 9.99456 0.75 9C0.75 8.00544 1.14509 7.05161 1.84835 6.34835C2.55161 5.64509 3.50544 5.25 4.5 5.25H6.75" stroke="#707A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 9H12" stroke="#707A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static iconEllipsesMore() {
        return `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static iconAvatar() {
        return `<svg viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="xxlarge">
    <g>
        <circle cx="64" cy="64" r="64" fill="#c1c7d0" />
        <g>
            <path fill="#fff"
                d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
            <path fill="#fff"
                d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
        </g>
    </g>
</svg>
`;
    }

    static iconEye() {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2194 15.0246C16.2119 17.3608 14.3025 19.2659 11.9713 19.2627C9.62876 19.2596 7.71314 17.3327 7.72876 14.9952C7.74439 12.6571 9.66064 10.7565 11.9888 10.7696C14.3275 10.7827 16.2269 12.6933 16.2194 15.0246Z" fill="#252A2F"/>
<path d="M5.06499 9.76998C4.65374 9.05685 4.24999 8.36435 3.85312 7.66748C3.67124 7.3481 3.71062 7.00623 3.94249 6.7581C4.16437 6.5206 4.53687 6.44123 4.81999 6.60935C4.96 6.69248 5.08749 6.82748 5.17249 6.9681C5.54249 7.58185 5.89374 8.20685 6.25249 8.82685C6.29124 8.89373 6.33249 8.95873 6.38124 9.03873C7.91124 8.2956 9.52062 7.87935 11.2256 7.76685C11.2256 7.02498 11.2237 6.3006 11.2262 5.57685C11.2275 5.1956 11.4331 4.90873 11.7619 4.81435C12.25 4.67435 12.715 5.02185 12.7212 5.54435C12.7287 6.19185 12.7231 6.83873 12.7231 7.48623C12.7231 7.57123 12.7231 7.6556 12.7231 7.76623C14.4225 7.87873 16.0331 8.28998 17.5725 9.04185C17.6937 8.83248 17.8094 8.63123 17.9256 8.4306C18.2144 7.93185 18.5 7.4306 18.7925 6.93435C19.0269 6.53685 19.465 6.40935 19.8331 6.6231C20.2019 6.83685 20.3137 7.27998 20.0875 7.67935C19.7337 8.3031 19.3719 8.92123 19.0144 9.54248C18.9725 9.6156 18.9337 9.68998 18.8969 9.7581C19.3437 10.1037 19.8069 10.4119 20.2106 10.785C20.9894 11.5037 21.74 12.2537 22.4906 13.0025C22.7912 13.3025 22.77 13.7669 22.4775 14.0531C22.1831 14.3406 21.7362 14.3456 21.4262 14.0437C20.8787 13.5106 20.3506 12.9581 19.8 12.4275C17.8019 10.5012 15.4112 9.42373 12.6444 9.27498C9.33875 9.09748 6.47437 10.1775 4.08812 12.4875C3.57249 12.9862 3.07062 13.4994 2.56437 14.0075C2.35687 14.2156 2.11374 14.3156 1.82187 14.2462C1.26124 14.1144 1.04187 13.4231 1.45249 13.01C2.56687 11.8887 3.62624 10.7037 4.97562 9.84185C5.00124 9.8256 5.02312 9.80435 5.06499 9.76998Z" fill="#252A2F"/>
</svg>
`;
    }

    static iconDoor() {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9287 10.734C22.882 10.6222 22.8151 10.5204 22.7298 10.4352L19.9807 7.68609C19.6223 7.32859 19.043 7.32859 18.6846 7.68609C18.3262 8.04449 18.3262 8.62474 18.6846 8.98224L19.8698 10.1675H14.7493C14.2424 10.1675 13.8326 10.5781 13.8326 11.0841C13.8326 11.5901 14.2424 12.0008 14.7493 12.0008H19.8698L18.6845 13.186C18.3261 13.5444 18.3261 14.1247 18.6845 14.4822C18.8633 14.6618 19.0979 14.7508 19.3326 14.7508C19.5673 14.7508 19.802 14.6619 19.9807 14.4822L22.7298 11.7331C22.8151 11.6487 22.882 11.547 22.9287 11.4343C23.0213 11.2107 23.0213 10.9577 22.9287 10.734Z" fill="#252A2F"/>
<path d="M16.5823 13.8333C16.0754 13.8333 15.6656 14.244 15.6656 14.75V19.3333H11.999V4.66665C11.999 4.2624 11.7332 3.9049 11.3454 3.78849L8.16181 2.83334H15.6656V7.41668C15.6656 7.92268 16.0754 8.33333 16.5823 8.33333C17.0892 8.33333 17.4989 7.92268 17.4989 7.41668V1.91669C17.4989 1.41065 17.0892 1 16.5823 1H1.91567C1.88267 1 1.85333 1.01375 1.82127 1.0174C1.77817 1.022 1.73877 1.0293 1.69752 1.0394C1.60127 1.06415 1.51417 1.10175 1.43262 1.15305C1.41247 1.1659 1.38772 1.1668 1.36847 1.18146C1.36108 1.187 1.35833 1.1971 1.35098 1.2026C1.25108 1.2814 1.16768 1.37765 1.10718 1.49225C1.09433 1.517 1.09158 1.5436 1.08152 1.56925C1.05218 1.6389 1.02012 1.70675 1.00912 1.78375C1.00452 1.81125 1.01277 1.8369 1.01187 1.8635C1.01097 1.88185 0.999023 1.89835 0.999023 1.91665V20.25C0.999023 20.6872 1.30793 21.0631 1.73602 21.1483L10.9027 22.9817C10.9623 22.9945 11.0228 23 11.0823 23C11.2922 23 11.4985 22.9276 11.6635 22.7919C11.8752 22.6178 11.999 22.3583 11.999 22.0833V21.1667H16.5823C17.0892 21.1667 17.4989 20.756 17.4989 20.25V14.75C17.4989 14.244 17.0892 13.8333 16.5823 13.8333Z" fill="#252A2F"/>
</svg>
`;
    }

    static iconPlus() {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4.58398V17.4173" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.58331 11H17.4166" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    }

    static iconMaximize() {
        return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 2.75H19.25V8.25" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 19.25H2.75V13.75" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.25 2.75L12.8333 9.16667" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.75 19.2507L9.16667 12.834" stroke="#252A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    }

    static iconMarker() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAMwElEQVR4AeydX2wcRx3Hf3P+m9hx4z9t0lS2U5FGgpSEOAFREKKBSiW0IChqH0AgQEFU0FIeEKgSLzzwEB55AOWhLxQJAaIpghbSVrRvICFVyQMVaqI2thM7se/893x/nLubznd9Y5/vdvf2z+zd7N5Y99vZnZ2dm9/397mZ2d3zXopa8Mcvf+9//PI5btmVc/P8T0922b0t55xlcnxGGIct5fhVu3ImT50CkQLAOTEEnYh/ZLvJnA7S0btK/P/f3bedJ1ZE8PuW8lQRq+PCrBcnOgIQ3uS828owC+UKRAYAgk9XziGg9o0upNYkBNXgF+wLEh3P0x0DgZM64fIjAaBp8GWbAcHchTHxyXcMvixqIJBKqE2VA+A5+NKPhf8uskrT+FulDQSWDEoXSgHwHfyqK8PXniUDQVWMFifKAAgafOmvXwjEvMH2TELWZ1JvCigBIGzwZVP9QCDmDSUzMZTK+U/lEaEBUBV82SA/EJg5gVQteBoKANXBl24YCKQS0aeBAYgq+NJlA4FUIto0EABRB1+6bCCQSkSX+gagVcGXLhsIpBLRpL4AaHXwpcsGAqmE+tQzAO0KvnTZQCCVUJt6AqDdwZcuGwikEsHT+iObAqBL8GXDtyAoyk3X1FwncJXH2ukKAIK/8dYTzrd0rSpavxi+9oy5d6BIdkcAEPz0Xx+p9A8OKXortdUMmxtISgR1BADBxztUSneQaGkGgvBhsQXg9kuff0hWvZ5Oy1Ut0y0IzJwgaHBsAUil2FdlhZVymQrr63JTy3TYmhMYCIIExxYARuzftZVlMxkqZOMAgflmUW3cvKzbAjD2ldcv1h+cTccBAvPNovq4yW2n1BYAq3C565CV1iwMBDViJGTVEYC7v3Zpnvf03lvvpwWB9nMC0xPUx81p2xEAHHDPY6/esoUAcwIDASSKvbkCAO9Wv/jK8s2P/hGru8yaGBoIdmkSxw1XAK5y3rc2S4VyzwgZCOIY3uZtdgRABl9WEXcIyPq3Q+mNc9ppN5AcAcAnv16mOEMw8u73691x3O4kCGwBeHuaP+KkTpwhGJo97+RWQ35SIGhwrC7DFoAKo0fryu3ajCsE3flr4jZybpcvbhudAIEtAIzoDTdhsC+uEOx//3k037MlHQJbAE5NsEteFIojBKzsvQeQGiQZAlsA4DjvpgGkzSyOEOxd/HMztxr2JxUCRwBOH2K5pELQv/xaQ4C9ZCQRAkcAIEiSIYB/QSxpELgCAIEAQXcvDZKHvzgOBx7caiiSJAiaAgDvTxxkG4kbDngZrgU23SHw6pgnAFAZeoIkQcB4+C+7JgECzwAkDQKe6odLoS3uEPgCAGqhJzBzAiixY3GGwDcAcDuRcwI4FsLiCkEgAKATeoLYzglYNA8YiyMEgQGQEMRxOMiNbf/bA9xQanGDIBQAUC6Ow0Fh2PVmJ9wKZXGCIDQAUCpOw0G58YvOcEG5tQsCv44oAQBvGhcIViZ/gea2xOIAgTIAoCggUDEnyK2soDrlttj3MDHGlNfrVqHuECgFAEKomBMAgJVb86hOmZV5Dy3u/4ay+vxUpDMEygGAMOgJwp4ilgpFSl+/TpVSCVWGsmw6TVdGf0MH7gpVTaiDdYUgEgCgFCDwMxzcOP4XHNZgSzduUGZmhsp3/F+7R0+SFhC9e/Qi9YhT/9Z2/g2uaPnLJ5EBAPf9DAeV7iGamXqdeKoPh+4yXqnQ8s2bVo+wMj9PxY2NXfvlBp5lgKBnpqetsmv5fqtO7L9vGMv2m249QaQAQG4/PQHKz37s77Q08WOs2lqpWKT1xUUrwPh019rS7CwBAM45LTzwK5o79qJVxwHNHnOkEwSRA4AI+OkJUD479pj1yV2aeA6bPoxR+v6fW8cW9p20jtsnbvrt6bVWtVqohiCocy0BAI3z2xPgmOzY41YwMTQsHvkl5UY+RyVcyGFbzS71HqSN0UfFp/18tdxrlBv+LA61bFAEf9TTd5ms4i1f6ADBlpItch09gdeJYX2T8kOfoPTh52nuwd/RzMlLVsDnHnyRMpM/ocK+qfridPc+ojGNgy8b3G4IWgoAnAYETqeIe3tpAWXCWEp4dHiMaKBxLhmm2kiPbScEQq5IfbOt3Gk4yG3SPWLM3rhXnK/7vWDXJTwZHyGaEGb7pppntgsCIVt7lEFPYDccrBdoQIBQnhwlwicZM/g9PY1tBCD4lB+8a6scgg8IGkvGJ6cdELQNAIQFENgNB6t56lqqnurvETN4XMEDDLUGQDDO99vAgbrjaLki0dAs3RGnsS27ZtVWABAkDAd2EKzliZarEKBc0g3BX6g+ivHtWaq0CoK2A4DAOkEgeoKOgKA2+NADBgiQNrOw+7UAAE50KgR2wYceGO4yOXFJExsRmjYAwMdOg8At+NADJiCoDgzYUm9aAQD3OgUCL8GHHsIGl3L8XyKN5KUdAPAy6RD4CD7kIE50JpPlX7A2FC+0BAA+JhUCv8GHFpal6B9WqnihLQDwM2kQBA4+xBAm5gPTIlH60hoAeJoUCMIGH1oIm8hyfkCkyl7aAwBP4w6BouBDCirk6T2sqLJYAABn4wqByuBDB3GNeO+bXFw7xYYCiw0A8DVuEKgOPjSAncjRC0hVWKwAgMNxgSCq4EMDzuhbSFVY7ACA07pDEGXw4b9KiyUAEEBXCFoV/LUCPwodwlpsAYDjukHQquDD980KPYE0rMUaADivCwStDD78FoH7NNKwJuoJW0X7j283BK0Mfo3aH65ZD7yaCADgfbsgaFPwcYOo4XcdoYNfSwwAcLzVELQr+PBV2B5hoV+JAgBqtAqCNgcfriqxxAEAVaKGICnBh1aJBACORQVBkoIPnRILAJxTDUHSgg+NEg0AHFQFQRKDD30SDwCcDAuBDsGHH1FYRwAA4YJCkOTgQ5eOAQDO+oVA9+AvbPCz8CuMdRQAEMorBLoHH750p+hnSMNYxwEAsZpBEIfgww/Oaed5OMgIYB0JAHRygmBmmdPlmxUU2WX4X71dGZpszHG+N0xTOhYAiAYIah9SsZLndH2pQotZTnNrOxDoGnz40JenfyINah0NAESTD6lA8KeXd4IOCGbEts7BR/uFfUZY4FfHAwDl0BNkrrA+rNfaxHCK5qJ5cHnt27iue9mZ2eCveilnV8YAUFXlqafY5uBM1zYEJw51WXs2S0TTaWtV3wWjs1c53267n4YaAGrUkhDI4MtdXKxcFxBsFMWKpq/RAq0GaZoBoE41QDA1Tra6LK5v9QblnalC3dHt2xSnhH1LBX7ebwtsHfVbSdLKM8b4qQnGiDd+qtAbzC5tgZDf1MtzXqGfzuf5YT+tMgC4qHVqku1nRH+wK8JF5u01IgwN0xmilRyRDj1DL6f3Oeee4+q5oPC3I19TE+zrxOgBN+dF92sBgJ4BQLjZjIBlXpxZ4BF4mGC61Rt031Keyl6PNQB4UOrUOLuGIUH0Br/1UNy1SEV0HUVxZoFH4OEUU8KC+YXY5Xqsn52ZHM96KW8A8KJStYzoDX5ggcDo19UsZQnOMHC6CUPPoKDigfQGv9WsHgNAM4Vs9k+Ns+cAAh+k/UR0QZiy8wL0AugZMK/A0CLqDvwS09gDoid40q0CA4CbOk32nR5hqwKEp4V1CWO11sNpRAwZ94n0Q3c4HUsxOlOp0DkRFPQe7zSpmhB8QIChoVlZt/3ifQdc97vtNPuCK3B8ki2LIWNOpO99cpK9c3KcvfXxw+yFau9xTMIiTt3wHz6ON3QwNGCegJ7Bb2tYZZP2X/nRS27HmR7ATZ0W7Dt9mM0LGM4KY+K6w5ed3hJzg6KPX85jvEjD135I1J9f5f951vFnswwAToq3IV9cd/hbFYRv2r39/CqRfIy+3X6Zh0/+8NVn5KYrBAaAHZm0WRMg/L4KwvX6RuEx+gChPl9uW8HHJ19myNShJzAASIE0TAUI94th4en6pmEouLFcn0vkGHyq/tlAYACoaqNLUt8OAcGF7k1qeDhkSVzrw1VFWZ5VCltjvsxwSusgMAA4CaVR/okjbGHK5g4lririDGF6oUjlN75EhXVPF/92zQkMABoF2q0pTN6hJNr1rQRWKdL45cetQ7OZtG8IDACWdPFZiMlhv7gmcLva4owMfnWb/EKQ4tlXDvKVi9xYfDQ4NfTygamhl0nY6MinviNjv536gSBFpc357SPNSuwUSPXupTAQmCEgdiFvbHAYCAwAjXrGMicoBAYATcKtohlBIDAAqFBeozr8QmAA0Ch4qpriBwIDgCrVNavHKwQGAM0Cp7I5XiAwAKhUXMO6mkFgANAwaKqb5AaBAUC12prWZ0Hw0LcbWpcizh9uyDUZLVOglW+U6hugkVoIOJ35AAAA//82+rYoAAAABklEQVQDAHW6rCby9TYeAAAAAElFTkSuQmCC" 
height="100%" width="100%"/></svg>`;
    }

    static iconPublic() {
        return `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.18778 0.00027617C4.25843 -0.0388043 -0.0296776 4.07477 0.000894517 9.15975C-0.0836253 15.072 5.83598 19.5991 11.5408 18.0138C21.799 15.0662 19.974 0.275875 9.18778 0.00027617ZM14.5468 12.1773C14.2508 14.2636 13.23 15.7444 12.0715 16.7774C11.8928 16.8435 11.7142 16.9046 11.5304 16.9555C11.3875 14.5384 10.3055 14.1669 9.24903 13.8005C7.89278 13.4586 7.1418 12.5094 7.10546 11.2155C7.03395 10.5795 6.9625 9.91795 6.26838 9.45489C5.54363 8.97661 4.91585 8.93076 4.35948 8.88496C3.70109 8.83408 3.22132 8.79846 2.77219 8.01482C1.85349 6.417 2.96613 4.32558 4.37479 2.58528C5.72732 1.60318 7.39117 1.018 9.18773 1.018C10.0584 0.919938 11.2498 1.36275 11.4998 2.11718C11.8171 2.97426 10.3135 3.6716 9.97883 4.46806C9.65723 5.10923 9.85123 5.59264 9.99414 5.94376C10.1268 6.26943 10.1319 6.33049 10.0299 6.43735C9.75426 6.70705 9.34595 6.53912 8.70286 6.24398C8.05467 5.94885 7.31972 5.613 6.55414 5.86743C4.82725 6.41104 5.11485 8.3414 6.6358 8.39651C7.09015 8.39244 7.992 8.12325 8.32518 8.38119C8.36601 8.41681 8.42215 8.48297 8.42215 8.65089C8.49723 9.78616 9.8744 9.87053 10.8311 9.38874C11.6886 8.9613 11.7907 9.06307 12.5818 9.84666C13.3527 10.7408 14.7852 10.7317 14.5468 12.1773Z" fill="#707A83"/>
</svg>`
    }
}


class SpotFixSourcesLoader {

    constructor() {
        this.loadAll();
    }

    getCSSCode() {
        // global gulp wrapper var
        return spotFixCSS;
    }

    loadAll() {
        this.loadFonts();
        this.loadCSS();
    };

    loadFonts() {
        const preconnect_first = document.createElement('link');
        preconnect_first.rel = 'preconnect';
        preconnect_first.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnect_first);

        const preconnect_second = document.createElement('link');
        preconnect_second.rel = 'preconnect';
        preconnect_second.href = 'https://fonts.gstatic.com';
        preconnect_second.crossOrigin = 'crossorigin';
        document.head.appendChild(preconnect_second);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
        document.head.appendChild(fontLink);
    }

    loadCSS() {
        const style = document.createElement('style');
        style.setAttribute('id', 'spotfix_css');
        style.textContent = this.getCSSCode();
        document.head.appendChild(style);
    }
}

document.dispatchEvent(new CustomEvent('spotFixLoaded', {
    detail: {
        timestamp: new Date().toISOString(),
        message: 'All scripts loaded successfully'
    }
}));
