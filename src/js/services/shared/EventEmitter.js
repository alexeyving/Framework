export class EventEmitter {
	constructor() {
		this._listeners = {};
		this._events = [];
	}

	on(type, listener) {
		if (this._events.indexOf(type) === -1) {
			this._listeners[type] = [{
				fn: listener
			}];
			this._events.push(type);
		} else {
			this._listeners[type].push({
				fn: listener
			})
		}
	}

	off(type, listener) {
		let typeIndex = this._events.indexOf(type);
		let hasType = type && typeIndex !== -1;

		if (hasType) {
			if (!listener) {
				delete this._listeners[type];
				this._events.splice(typeIndex, 1);
			} else {
				let removedEvents = [];
				let typeListeners = this._listeners['eventType'];

				typeListeners.forEach(function (fn, i) {
					if (fn.fn === listener) {
						removedEvents.push(i);
					}
				});

				removedEvents.forEach(function (i) {
					typeListeners.splice(i, 1);
				});

				if (!typeListeners.length) {
					this._events.splice(typeIndex, 1);
					delete this._listeners[type];
				}
			}
		}
	}

	emit(type, ...args) {
		this._applyEvents(type, args)
	}

	_applyEvents(type, args) {
		let typeListeners = this._listeners[type];

		if (!typeListeners || !typeListeners.length) {
			return void 0;
		}

		let removableListeners = [];
		typeListeners.forEach(function (eeListener, i) {
			eeListener.fn.apply(null, args);
		});

		removableListeners.forEach(function (i) {
			typeListeners.splice(i, 1);
		});
	}
}