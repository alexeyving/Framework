import { Mask } from '../../services/Mask';
import Template from '../../../html/includes/emptyCards.pug';

export class EmptyCards {
	constructor(model) {
		this.model = model;
	}

	render(element) {
		let el = !(element instanceof window.jQuery) ? $(element) : element;
		el.append(Template);
		this.initialize();
	}

	initialize() {
		this.ui = {
			inputCardNumber: document.getElementById('number-card'),
			inputMonth: document.getElementById('date-month'),
			inputYear: document.getElementById('date-year'),
			inputName: document.getElementById('cardHolder-name'),
			inputCVC: document.getElementById('number-cvv'),
			inputEmail: document.getElementById('email'),
			inputPhone: document.getElementById('phone')
		};
		this.initMasks();
		this.modelListeners();
	}

	initMasks() {
		Mask.maskCardNumber(this.ui.inputCardNumber, (val) => {
			this.model.number = val.replace(/\s|_/g, '');
		});

		Mask.maskDataNumber(this.ui.inputMonth, this.ui.inputYear, (val) => {
			this.model.month = val.month;
			this.model.year = val.year;
		});

		Mask.maskCardHolderName(this.ui.inputName, (val) => {
			this.model.cardHolderName = val;
		});

		Mask.maskCVCFourChar(this.ui.inputCVC, (val) => {
			this.model.cvc = val;
		});

		Mask.maskPhone(this.ui.inputPhone, (val) => {
			this.model.phone = '7'.concat(val.slice(3).replace(/[+ ()-]/g, ''));
		});

		Mask.maskEmail(this.ui.inputEmail, (val) => {
			this.model.email = val;
		});
	}

	formatPhone(val) {
		return '7'.concat(val.slice(3).replace(/[+ ()-]/g, ''));
	}

	modelListeners() {

		let CARDSTYPE = _d.CARDSTYPE;
		let clearClass = () => {
			$(this.ui.inputCardNumber).removeClass(`${CARDSTYPE.visa} ${CARDSTYPE.mastercard} ${CARDSTYPE.maestro}`);
		};

		this.model.on('change:number', () => {
			_u.toggleFailedField(this.ui.inputCardNumber, true);
			switch (this.model.type) {
				case CARDSTYPE.visa:
					clearClass();
					$(this.ui.inputCardNumber).addClass(CARDSTYPE.visa);
					break;
				case CARDSTYPE.mastercard:
					clearClass();
					$(this.ui.inputCardNumber).addClass(CARDSTYPE.mastercard);
					break;
				case CARDSTYPE.maestro:
					clearClass();
					$(this.ui.inputCardNumber).addClass(CARDSTYPE.maestro);
					break;
				default:
					clearClass();
			}
		});

		this.model.on('change:type', (field) => {
			if (!field) return void 0;
			let val = field.newValue;
			for (let card of _d.CARDS) {
				if (val === card.type) {
					if (card.cvcLength.length > 1) {
						Mask.maskCVCFourChar(this.ui.inputCVC, (val) => {
							this.model.cvc = val;
						})
					} else {
						Mask.maskCVCThreeChar(this.ui.inputCVC, (val) => {
							this.model.cvc = val;
						})
					}
				}
			}
		});

		this.model.on('change:month', () => {
			_u.toggleFailedField(this.ui.inputMonth, true);
		});
		this.model.on('change:year', () => {
			_u.toggleFailedField(this.ui.inputYear, true);
		});
		this.model.on('change:cardHolderName', () => {
			_u.toggleFailedField(this.ui.inputName, true);
		});
		this.model.on('change:cvc', () => {
			_u.toggleFailedField(this.ui.inputCVC, true);
		});
		this.model.on('change:phone', () => {
			_u.toggleFailedField(this.ui.inputPhone, true);
		});
		this.model.on('change:email', () => {
			_u.toggleFailedField(this.ui.inputEmail, true);
		});
	}

	validate() {
		_u.toggleFailedField(this.ui.inputCardNumber, this.model.numberIsValid);
		_u.toggleFailedField(this.ui.inputMonth, this.model.dateIsValid);
		_u.toggleFailedField(this.ui.inputYear, this.model.dateIsValid);
		_u.toggleFailedField(this.ui.inputName, this.model.nameIsValid);
		_u.toggleFailedField(this.ui.inputCVC, this.model.cvcIsValid);
		_u.toggleFailedField(this.ui.inputPhone, this.model.phoneIsValid);
		_u.toggleFailedField(this.ui.inputEmail, this.model.emailIsValid);
	}
}