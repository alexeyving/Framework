import { Validation } from '../services/Validation';
import { Observer } from '../services/shared/Observer';

const cardModelFields = {
	number: '',
	phone: '',
	email: '',
	month: '',
	year: '',
	cardHolderName: '',
	cvc: '',
	computed: {
		isValid: false,
		dependencies: ['cvcIsValid', 'dateIsValid', 'numberIsValid', 'nameIsValid', 'phoneIsValid', 'emailIsValid'],
		func: function (ctx) {
			if (!!ctx.cvcIsValid && !!ctx.dateIsValid && !!ctx.numberIsValid && !!ctx.nameIsValid && !!ctx.emailIsValid && !!ctx.phoneIsValid) {
				ctx._model.isValid = true
			} else {
				ctx._model.isValid = false
			}
		}
	},
	cvcIsValid: false,
	dateIsValid: false,
	numberIsValid: false,
	nameIsValid: false,
	phoneIsValid: false,
	emailIsValid: false,
	type: '',
	img: ''
};

let cardModel = null;
export class CardModel extends Observer {
	constructor() {
		super(cardModelFields);
		this._listenToModel();

		if (!cardModel) {
			cardModel = this;
		}
		return cardModel;
	}

	/*
	 * Валидация уже встроенная в модель
	 * Она работает исключительно с моделью и всеми данными которые есть в модели
	 * Все мутации в доме должны происходить во вьюхе
	 * */
	_listenToModel() {
		this.on('change:number', (field) => {
			if (!field) return void 0;
			let val = field.newValue;

			let card = _u.getCardByNumber(val);
			this.type = card ? card.type : void 0;

			let condition = Validation.validateCardNumberLengthByType(this.type);
			if (condition) {
				this.numberIsValid = Validation.validateCardNumber(val);
			} else {
				this.numberIsValid = false
			}
		});

		let date = {
			month: '',
			year: ''
		};
		this.on('change:month', (field) => {
			let val = field.newValue;
			date.month = val;
			if (!!date.month && !!date.year) {
				this.dateIsValid = Validation.validateCardExpiry(date.month, date.year);
			} else {
				this.dateIsValid = false;
			}
		});

		this.on('change:year', (field) => {
			let val = field.newValue;
			date.year = val;
			if (!!date.month && !!date.year) {
				this.dateIsValid = Validation.validateCardExpiry(date.month, date.year);
			} else {
				this.dateIsValid = false;
			}
		});

		this.on('change:cardHolderName', (field) => {
			let val = String(field.newValue);
			console.log(val);
			this.nameIsValid = Validation.validateCardHolderName(val);
		});

		this.on('change:cvc', (field) => {
			let val = field.newValue;
			this.cvcIsValid = Validation.validateCardCVC(val);
		});

		this.on('change:email', (field) => {
			let val = field.newValue;
			this.emailIsValid = Validation.validateEmail(val);
		});

		this.on('change:phone', (field) => {
			let val = field.newValue;
			this.phoneIsValid = Validation.validatePhone(val);
		});
	}
}