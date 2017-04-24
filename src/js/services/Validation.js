export const Validation = {
	// https://gist.github.com/DiegoSalazar/4075533
	validateCardNumber: function (value) {
		// accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;

		// The Luhn Algorithm. It's so pretty.
		let nCheck = 0;
		let nDigit = 0;
		let bEven = false;
		value = value.replace(/\D/g, "");

		for (let n = value.length - 1; n >= 0; n--) {
			let cDigit = value.charAt(n);
			let nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) == 0;
	},

	validateMonth: function (value) {
		if (!value) return false;
		let month = value.trim();

		return (1 <= month && month <= 12);
	},

	validateYear: function (value) {
		if (!value) return false;
		let year = value.trim();
		year = `20${year}`;

		return new Date(year) > new Date()
	},

	validateCardExpiry: function (mm, yy) {
		//check isExsist
		if (!mm && !yy) {
			return false
		}

		let month = mm.trim();
		let year = yy.trim();

		if (!(1 <= month && month <= 12)) {
			return false
		}

		year = `20${year}`;

		let expiry = new Date(year, month);
		let currentTime = new Date();

		expiry.setMonth(expiry.getMonth() - 1);
		expiry.setMonth(expiry.getMonth() + 1, 1);

		return expiry > currentTime;
	},

	validateCardCVC: function (value) {
		if (!value) return false;
		let val = value.trim();
		if (val.length === 3 || val.length === 4) {
			return true;
		} else {
			return false;
		}
	},

	validatePhone: function (value) {
		if (!value) return false;
		if (value.length < 11) return false;
		//Int and positive number
		let x = Number(value);
		return !!parseInt(Math.abs(x).toString(), 10);
	},

	validateEmail: function (value) {
		if (!value) return false;
		if (value.length > 254) return false;

		let regexr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([а-яА-ЯЁёa-zA-Z\-0-9]+\.)+[а-яА-ЯЁёa-zA-Z]{2,}))$/;

		return regexr.test(value);
	},

	validateCardHolderName: function (value) {
		if (!value) return false;
		let val = value.trim();
		if (val.length < 2) {
			return false;
		}
		return /^[A-Z-'\.\s]{2,}$/.test(value);
	},

	validateCardNumberLengthByType: function (value) {
		if (!value) return false;
		if (!!value) {
			const card = $.grep(_d.CARDS, (card) => card.type === value)[0];
			return card.length.reduce((a, b) => a < b ? a : b);
		}

		const cardWithinMinlLength = _d.CARDS.reduce((a, b) => {
			let x = a.length.reduce((a, b) => a < b ? a : b);
			let y = b.length.reduce((a, b) => a < b ? a : b);
			return x < y ? a : b;
		});
		const minLength = cardWithinMinlLength.length.reduce((a, b) => a < b ? a : b);
		return value.length >= minLength;
	},

	validateTransliterate: function (str) {
		if (!str) return false;
		//http://kourge.net/projects/regexp-unicode-block
		//Cyrillic and Cyrillic Supplement: [\u0400-\u04FF\u0500-\u052F]
		return /[\u0400-\u04FF\u0500-\u052F]+/g.test(str);
	}
};