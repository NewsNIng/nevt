"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Events = /** @class */ (function () {
    function Events() {
        this.events = Object.create(null);
        this.eventsOne = Object.create(null);
        this.eventsLazy = Object.create(null);
    }
    /**
     * 事件监听
     * @param {String} eventName 事件名称
     * @param {Function} callback 事件触发后执行的回调函数
     */
    Events.prototype.on = function (eventName, callback, option) {
        // 获取已存在的单次事件列表
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        // 添加至数组
        this.events[eventName].push(callback);
        if (option && option.lazy) {
            // 处理惰性事件
            this.execLazyEvents(eventName, callback);
        }
        return callback;
    };
    Events.prototype.execLazyEvents = function (eventName, callback) {
        var lazys = this.eventsLazy[eventName] || [];
        for (var i = 0, l = lazys.length; i < l; i += 1) {
            callback.call(callback, lazys[i]);
        }
    };
    /**
     * 事件监听 (单次)
     * @param {String} eventName 事件名称
     * @param {Function} callback 事件触发后执行的回调函数
     */
    Events.prototype.once = function (eventName, callback, option) {
        // 获取已存在的单次事件列表
        if (!this.eventsOne[eventName]) {
            this.eventsOne[eventName] = [];
        }
        // 添加至数组
        this.eventsOne[eventName].push(callback);
        if (option && option.lazy) {
            // 处理惰性事件
            this.execLazyEvents(eventName, callback);
        }
        return callback;
    };
    /**
     * 事件触发
     * @param {String} eventName 事件名称
     * @param {Object} data 传参参数值
     */
    Events.prototype.emit = function (eventName, data, option) {
        // 获取全部事件列表 和 单次事件列表，并且合并
        var es = __spreadArrays((this.events[eventName] || []), (this.eventsOne[eventName] || []));
        // 遍历触发
        // for (let f of es) {
        //     f && f.call(f, data)
        // }
        for (var i = 0, l = es.length; i < l; i += 1) {
            var f = es[i];
            if (f) {
                f.call(f, data);
            }
        }
        // 单次事件清空
        this.eventsOne[eventName] = [];
        if (option && option.lazy) {
            // 处理惰性事件
            if (!this.eventsLazy[eventName]) {
                this.eventsLazy[eventName] = [data];
            }
            else {
                this.eventsLazy[eventName].push(data);
            }
        }
    };
    /**
     * 关闭事件
     * @param {String} eventName 事件名称
     * @param {Function | Boolean} 事件函数 或者 为true时 去除所有事件
     */
    Events.prototype.off = function (eventName, callback) {
        if (callback && typeof callback === "function") {
            this.events[eventName] = (this.events[eventName] || []).filter(function (func) {
                return func !== callback;
            });
            this.eventsOne[eventName] = (this.events[eventName] || []).filter(function (func) {
                return func !== callback;
            });
        }
        else if (typeof callback === 'boolean' && callback === true) {
            // 清空事件列表
            this.events[eventName] = [];
            this.eventsOne[eventName] = [];
        }
    };
    /**
     * 移除页面单次事件
     * @param {String} eventName 事件名称
     * @param {Function | Boolean} 事件函数 或者 为true时 去除所有事件
     */
    Events.prototype.offOnce = function (eventName, callback) {
        if (callback && typeof callback === "function") {
            this.eventsOne[eventName] = (this.events[eventName] || []).filter(function (func) {
                return func !== callback;
            });
        }
        else if (typeof callback === 'boolean' && callback === true) {
            // 清空事件列表
            this.eventsOne[eventName] = [];
        }
    };
    return Events;
}());
exports["default"] = Events;
