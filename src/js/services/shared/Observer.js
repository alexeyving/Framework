import { EventEmitter } from './EventEmitter'

export class Observer extends EventEmitter {
	constructor(base) {
		super();

		this._state = {};
		this._computeds = {};
		this._changes = {};
		this._registeredFields = Object.keys(this).concat(["_registeredFields"]);
		Object.keys(base).forEach((key) => {
			if (key === 'computed') {
				Object.keys(base[key]).forEach((computedKey) => {
					if (typeof base[key][computedKey] !== 'object' &&
						typeof base[key][computedKey] !== 'function') {
						this[computedKey] = base[key][computedKey];
						this._computeds[computedKey] = base[key];
					}
				});
			} else {
				this[key] = base[key];
			}
		});
		this.mergeFields();
		this.computedFields();
	}

	computedFields() {
		Object.keys(this._computeds).forEach((val) => {
			if (this[val] !== void 0) {
				let dependencies = {};

				this._computeds[val].dependencies.forEach((depVal) => {
					dependencies[depVal] = ''
				});

				this._computeds[val].dependencies.forEach((depVal) => {
					this.on(`change:${depVal}`, (field) => {
						dependencies[depVal] = field.newValue;
						dependencies._model = this;
						this._computeds[val].func(dependencies)
					})
				})
			}
		});
	}

	mergeFields() {
		let newFields = Object.keys(this).filter((key) => {
			return this._registeredFields.indexOf(key) === -1;
		});

		let newFieldsDefinition = {};

		newFields = newFields.map((key) => {
			let val = this[key];
			if (typeof val === 'function') {
				val = val.bind(this);
			}

			newFieldsDefinition[key] = {
				get: () => {
					return this._state[key];
				},
				set: (newVal) => {
					if (typeof newVal === 'function') {
						newVal = newVal.bind(this);
					}
					this._addChange(key, this._state[key], newVal);
					this._state[key] = newVal;
					return newVal;
				}
			};

			return {
				field: key,
				value: val
			}
		});

		Object.defineProperties(this, newFieldsDefinition);

		newFields.forEach((row) => {
			this._registeredFields.push(row.field);
			this[row.field] = row.value;
		});
	}

	_addChange(key, oldValue, newValue) {
		let currentChange = {
			field: key,
			oldValue: oldValue,
			newValue: newValue
		};

		let changes = this._changes[key];
		if (!changes) {
			this._changes[key] = changes = [];
		}
		changes.push(currentChange);

		this._emitChanges();
	}

	_emitChanges() {
		let changes = this._changes;
		this._changes = {};

		Object.keys(changes).forEach((key) => {
			this.emit('change:' + key, changes[key][0]);
		});
	}

}