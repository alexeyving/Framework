import { BaseView } from './common/BaseView';
import { CardModel } from '../model/Card';
import { Components } from '../components/Components';
import { Mask } from '../services/Mask';
import contactsTemplate from '../../html/includes/contacts.pug';
import submitButtonTemplate from '../../html/includes/submitButton.pug';
const MEDIA_QUERY = '992px';

export class SavedCards extends BaseView {
	constructor() {
		super();

		this.ui = {
			inputCVC: document.getElementById('number-cvv'),
			inputEmail: document.getElementById('email'),
			inputPhone: document.getElementById('phone'),
			submitBtn: $('.submit')
		};
		this.model = new CardModel();
		this.initialize();
		this.initMasks();
		this.modelListeners();
	}

	static queryRegion() {
		return {
			contacts: {
				regions: ['js-placeholder-contacts-medium', 'js-placeholder-contacts-small'],
				mediaQuery: MEDIA_QUERY,
				template: contactsTemplate
			},
			submitButton: {
				regions: ['js-placeholder-submitButton-medium', 'js-placeholder-submitButton-small'],
				mediaQuery: MEDIA_QUERY,
				template: submitButtonTemplate
			}
		}
	};

	initMasks() {
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

	initialize() {
		let select = new Components.Select();
		select.onDelete((data) => {
			console.log('onDelete data: ', data);
		});
		new Components.Button();

		this.ui.submitBtn.click(() => {
			if (!this.model.isValid) {
				this.validate();
				this.model.on('change:isValid', (field) => {
					if (field.newValue !== field.oldValue) {
						this.model.off('change:isValid');
					}
				});
			} else {
				this.model.off('change:isValid');
			}
		})
	}

	modelListeners() {
		this.model.on('change:cvc', () => {
			_u.toggleFailedField(this.ui.inputCVC, true);
		});
		this.model.on('change:phone', (field) => {
			_u.toggleFailedField(this.ui.inputPhone, true);
		});
		this.model.on('change:email', (field) => {
			_u.toggleFailedField(this.ui.inputEmail, true);
		});

	}

	validate() {
		_u.toggleFailedField(this.ui.inputCVC, this.model.cvcIsValid);
		_u.toggleFailedField(this.ui.inputPhone, this.model.phoneIsValid);
		_u.toggleFailedField(this.ui.inputEmail, this.model.emailIsValid);
	}
}
;