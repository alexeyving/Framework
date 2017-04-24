export const _u = {
	debounce: function (fn, time) {
		let firstRunTime = 0;
		let timeOut = 0;
		return () => {
			if (!firstRunTime) firstRunTime = Date.now();
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				firstRunTime = 0;
				fn();
			}, time)
		}
	},

	transliterate: function (word) {
		const a = _d.translit;

		return word.split('').map(function (char) {
			if (a[char] === void 0) return char;
			if (a[char].length === 0) return a[char];
			return a[char] || char;
		}).join("");
	},

	setCursor: function (incomeNode, pos) {
		const node = (typeof incomeNode == "string") ? document.querySelector(incomeNode) : incomeNode;

		if (!node) {
			return false;
		} else if (node.createTextRange) {
			let textRange = node.createTextRange();
			textRange.collapse(true);
			textRange.moveEnd(pos);
			textRange.moveStart(pos);
			textRange.select();
			return true;
		} else if (node.setSelectionRange) {
			node.setSelectionRange(pos, pos);
			return true;
		}
		return false;
	},

	getCardByNumber: function (value) {
		let number = (value + '').replace(/\D/g, '');
		for (let card of _d.CARDS) {
			for (let pattern of card.patterns) {
				let p = pattern + '';
				if (number.substr(0, p.length) == p) {
					return card;
				}
			}
		}
	},

	//TODO Alesha: I don't know why i write this sheet
	sortedObjectByValue: function (obj = {}) {
		const sorted = [];
		const result = {};
		for (let key in obj) {
			sorted.push([key, obj[key]]);
		}
		sorted.sort((a, b) => {
			return a[1].length - b[1].length;
		});

		sorted.forEach((val) => {
			result[val[0]] = val[1]
		});

		return result
	},

	getObjectKeyByMaxValue: function (obj = {}) {
		return Object.keys(obj).reduce(function (a, b) {
			return obj[a].length > obj[b].length ? a : b
		})
	},

	cleanArray: function (array = []) {
		if (array.length === 0) return array;
		let newArray = [];
		let oldArray = array.join(',').replace(/ /g, '').split(',');

		for (let i = 0; i <= oldArray.length; i++) {
			if (!!oldArray[i]) {
				newArray.push(oldArray[i])
			}
		}
		return newArray;
	},

	toggleFailedField(input, val) {
		!val ? $(input).attr('isFailed', true) : $(input).removeAttr('isFailed');
	},

	toggleErrorBlock(block, val) {
		if (!(block instanceof window.jQuery)) block = $(block);

		block.toggle(val);
	},

	animateScrollTo(el, targetScrollY, duration, easing) {
		let currentScrollY, currentTime, easingEquations, tick;
		if (targetScrollY == null) {
			targetScrollY = 0;
		}
		if (duration == null) {
			duration = 0.3;
		}
		if (easing == null) {
			easing = 'easeInOutSine';
		}
		if (!el) {
			return false;
		}
		if (!(el instanceof window.Element)) {
			return false;
		}
		currentScrollY = el.scrollTop;
		currentTime = 0;
		easingEquations = {
			easeOutSine: function (pos) {
				return Math.sin(pos * Math.PI / 2);
			},
			easeInOutSine: function (pos) {
				return -0.5 * (Math.cos(Math.PI * pos) - 1);
			},
			easeInOutQuint: function (pos) {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow(pos - 2, 5) + 2);
			},
			bounce: function (pos) {
				if (pos < (1 / 2.75)) {
					return 7.5625 * pos * pos;
				} else if (pos < (2 / 2.75)) {
					return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
				} else if (pos < (2.5 / 2.75)) {
					return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
				} else {
					return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
				}
			}
		};
		tick = function () {
			let percent, time;
			currentTime += 1 / 60;
			percent = currentTime / duration;
			time = easingEquations[easing](percent);
			if (percent < 1) {
				el.scrollTop = currentScrollY + (targetScrollY - currentScrollY) * time;
				requestAnimationFrame(tick);
			} else {
				el.scrollTop = targetScrollY;
			}
		};
		return tick();
	},

	isArray(val) {
		return Object.prototype.toString.call(val) === '[object Array]'
	},

	lastWord(val, split) {
		return val.split(split).pop()
	}
};

window._u = _u;