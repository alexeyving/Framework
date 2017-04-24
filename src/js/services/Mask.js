import { Validation } from './Validation';
const vanillaTextMask = window.vanillaTextMask;

export const Mask = {

	maskCardNumber: function (input, cb) {

		const getFormat = function (formats = {}, val) {
			let cleanVal = val.replace(/ /g, '');
			for (let key in formats) {
				let cleanArray = _u.cleanArray(formats[key]);
				//if length is more then max value in formats return max.length format
				if (cleanVal.length <= cleanArray.length) {
					return formats[key];
				} else if (cleanVal.length >= 19) {
					let formatsKey = _u.getObjectKeyByMaxValue(formats);
					return formats[formatsKey];
				}
			}
		};

		const maskFunc = function (val) {
			let card = _u.getCardByNumber(val);
			if (card === void 0) {
				return _d.defaultFormat;
			} else {
				if (Object.prototype.toString.call(card.format) === '[object Object]') {
					return getFormat(card.format, val);
				} else {
					return card.format;
				}
			}
		};

		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: input,
			mask: maskFunc,
			keepCharPositions: false,
			guide: false
		});

		input.addEventListener('input', (e) => {
			cb(e.currentTarget.value);
		});
	},

	maskDataNumber: function (inputMonth, inputYear, cb) {
		const maskMonthFunc = function (value) {
			if (!parseInt(value)) return [/\d/];
			if (parseInt(value) >= 10) {
				return [/1/, /[0-9]/];
			} else {
				return ['0', /[1-9]/];
			}
		};
		const maskedInputMonthController = vanillaTextMask.maskInput({
			inputElement: inputMonth,
			mask: maskMonthFunc,
			keepCharPositions: true,
			guide: false,
			pipe: (val) => {
				const indexesOfPipedChars = [];
				const valueArray = val.split('');
				let confirmedVal = val;

				valueArray.forEach((value) => {
					const position = val.indexOf(value);
					indexesOfPipedChars.push(position)
				});

				if (parseInt(confirmedVal, 10) > 12) {
					return {
						value: '12',
						indexesOfPipedChars
					}
				}
				return confirmedVal;
			}
		});
		const maskedInputYearController = vanillaTextMask.maskInput({
			inputElement: inputYear,
			mask: [/\d/, /\d/],
			keepCharPositions: false,
			guide: false,
			pipe: (val) => {
				const indexesOfPipedChars = [];
				const valueArray = val.split('');
				let confirmedVal = val;
				let currentYear = new Date().getFullYear().toString().substr(-2);

				valueArray.forEach((value) => {
					const position = val.indexOf(value);
					indexesOfPipedChars.push(position)
				});

				if (confirmedVal < currentYear && confirmedVal.length > 1) {
					return {
						value: currentYear,
						indexesOfPipedChars
					}
				}
				return confirmedVal;
			}
		});

		let resultValue = {
			month: '',
			year: ''
		};

		inputMonth.addEventListener('input', (e) => {
			resultValue.month = e.currentTarget.value;
			cb(resultValue);
		});
		inputYear.addEventListener('input', (e) => {
			resultValue.year = e.currentTarget.value;
			cb(resultValue);
		});

	},

	maskPhone: function (input, cb) {
		const mask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
		const MINIMALREQUIREDCHARACTERS = '+7 (';
		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: input,
			mask: mask,
			keepCharPositions: false,
			guide: false,
		});

		input.addEventListener('focus', (e) => {
			if (e.currentTarget.value.length === 0) {
				e.currentTarget.value = MINIMALREQUIREDCHARACTERS;
			}
		});

		input.addEventListener('blur', (e) => {
			if (e.currentTarget.value === MINIMALREQUIREDCHARACTERS) {
				e.currentTarget.value = '';
			}
		});

		input.addEventListener('input', (e) => {
			// if(e.currentTarget.value.length <= MINIMALREQUIREDCHARACTERS.length) {
			// 	e.currentTarget.value = MINIMALREQUIREDCHARACTERS;
			// 	cb(e.currentTarget.value);
			// } else {
			cb(e.currentTarget.value);
			// }
		});
	},

	maskCardHolderName: function (input, cb) {
		const inputNode = input;

		let maskFunc = (rawVal) => {
			let array = [];
			for (let i in rawVal) {
				array.push(/[а-яА-ЯЁёa-zA-Z'\s.-]/);
			}
			return array;
		};

		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: inputNode,
			mask: maskFunc,
			keepCharPositions: false,
			guide: false,
		});

		let transliterate = (e) => {
			let val = e.target.value;
			let valIsValid = Validation.validateTransliterate(val);
			setTimeout(() => {
				if (valIsValid) {
					let currentCaretPos = input.selectionEnd;
					let rawValue = input.value;
					let transliterateValue = _u.transliterate(rawValue);
					let diffLength = Math.abs(transliterateValue.length - rawValue.length);
					let offsetCaret = currentCaretPos === rawValue.length ? transliterateValue.length : currentCaretPos + diffLength;
					input.value = transliterateValue;
					_u.setCursor(input, offsetCaret);

				}
			}, 0)
		};

		function inputListener(e) {
			let event = e;
			return _u.debounce((e = event) => {
				transliterate(e);
				e.target.value = e.target.value.toUpperCase();
				cb(e.target.value);
			}, 1000)();
		};

		inputNode.addEventListener('input', inputListener);
	},

	maskCVCThreeChar: function (input, cb) {
		const mask = [/\d/, /\d/, /\d/];
		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: input,
			mask: mask,
			keepCharPositions: false,
			guide: false
		});

		input.addEventListener('input', (e) => {
			cb(e.currentTarget.value);
		});
	},

	maskCVCFourChar: function (input, cb) {
		const mask = [/\d/, /\d/, /\d/, /\d/];
		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: input,
			mask: mask,
			keepCharPositions: false,
			guide: false
		});

		input.addEventListener('input', (e) => {
			cb(e.currentTarget.value);
		});
	},

	maskEmail: function (input, cb) {
		let maskFunc = function (rawVal) {
			let array = [];

			for (let i in rawVal) {
				array.push(/[а-яА-ЯЁёa-zA-Z\d'\@.!#$%&'*+-/=?^_`{|}~]/);
			}
			return array;
		};
		const maskedInputController = vanillaTextMask.maskInput({
			inputElement: input,
			mask: maskFunc,
			keepCharPositions: false,
			guide: false
		});

		input.addEventListener('input', (e) => {
			cb(e.currentTarget.value);
		});
	},
};
