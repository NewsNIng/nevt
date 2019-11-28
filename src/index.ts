

interface IOptions {
	lazy?: boolean; // 是否支持惰性离线消息，（先发布，后订阅也能收到事件，需要发布和订阅同时设置此值）
}

export default class Events {
	// normal events
	private events: { [key: string]: any };
	// once events
	private eventsOne: { [key: string]: any };
	// lazy events
	private eventsLazy: { [key: string]: any };

	constructor() {
		this.events = Object.create(null);
		this.eventsOne = Object.create(null);
		this.eventsLazy = Object.create(null);
	}

	/**
	 * 事件监听
	 * @param {String} eventName 事件名称
	 * @param {Function} callback 事件触发后执行的回调函数
	 */
	public on(eventName: string, callback: (data?: any) => void, option?: IOptions): () => void {
		// 获取已存在的单次事件列表
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		// 添加至数组
		this.events[eventName].push(callback);
		if(option && option.lazy) {
			// 处理惰性事件
			this.execLazyEvents(eventName, callback);
		}
		return callback;
	}


	private execLazyEvents(eventName: string, callback: (data?: any) => void) {
		const lazys = this.eventsLazy[eventName] || [];
		for (let i = 0, l = lazys.length; i < l; i += 1) {
			callback.call(callback, lazys[i]);
		}
	}

	/**
	 * 事件监听 (单次)
	 * @param {String} eventName 事件名称
	 * @param {Function} callback 事件触发后执行的回调函数
	 */
	public once(eventName: string, callback: (data?: any) => void, option?: IOptions): () => void {
		// 获取已存在的单次事件列表
		if (!this.eventsOne[eventName]) {
			this.eventsOne[eventName] = [];
		}
		// 添加至数组
		this.eventsOne[eventName].push(callback);
		if(option && option.lazy) {
			// 处理惰性事件
			this.execLazyEvents(eventName, callback);
		}
		return callback;
	}

	/**
	 * 事件触发
	 * @param {String} eventName 事件名称
	 * @param {Object} data 传参参数值
	 */
	public emit(eventName: string, data?: any, option?: IOptions) {
		// 获取全部事件列表 和 单次事件列表，并且合并
		const es = [
			...(this.events[eventName] || []),
			...(this.eventsOne[eventName] || [])
		];
		// 遍历触发
		// for (let f of es) {
		//     f && f.call(f, data)
		// }
		for (let i = 0, l = es.length; i < l; i += 1) {
			const f = es[i];
			if (f) {
				f.call(f, data);
			}
		}
		// 单次事件清空
		this.eventsOne[eventName] = [];

		if(option && option.lazy) {
			// 处理惰性事件
			if(!this.eventsLazy[eventName]) {
				this.eventsLazy[eventName] = [data];
			}else {
				this.eventsLazy[eventName].push(data);
			}
		}
	}

	/**
	 * 关闭事件
	 * @param {String} eventName 事件名称
     * @param {Function | Boolean} 事件函数 或者 为true时 去除所有事件
	 */
	public off(eventName: string, callback?: (data?: any) => void) {
		if (callback && typeof callback === "function") {
			this.events[eventName] = (this.events[eventName] || []).filter((func: any) => {
				return func !== callback;
			});
			this.eventsOne[eventName] = (this.events[eventName] || []).filter((func: any) => {
				return func !== callback;
			});
		} else if(typeof callback === 'boolean' && callback === true) {
			// 清空事件列表
			this.events[eventName] = [];
			this.eventsOne[eventName] = [];
		}
	}

	/**
	 * 移除页面单次事件
	 * @param {String} eventName 事件名称
     * @param {Function | Boolean} 事件函数 或者 为true时 去除所有事件
	 */
	public offOnce(eventName: string, callback?: (data?: any) => void) {
		if (callback && typeof callback === "function") {

			this.eventsOne[eventName] = (this.events[eventName] || []).filter((func: any) => {
				return func !== callback;
			});
		} else if(typeof callback === 'boolean' && callback === true) {
			// 清空事件列表
			this.eventsOne[eventName] = [];
		}
	}

    /**
     * 获取所有事件列表
     * @param eventName 
     */
	// public getEvents(eventName: string) {
	// 	return {
	// 		events: this.events[eventName],
	// 		eventsOne: this.eventsOne[eventName]
	// 	};
	// }
}

