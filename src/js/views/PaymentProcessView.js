import { BaseView } from './common/BaseView';
import { CardModel } from '../model/Card';
import { Components } from '../components/Components';
import contactsTemplate from '../../html/includes/contacts.pug';
import submitButtonTemplate from '../../html/includes/submitButton.pug';
const MEDIA_QUERY = '992px';

export class PaymentProcessView extends BaseView {
	constructor() {
		super();
		this.ui = {
			submitBtn: $('.submit'),
			cards: $('.cards-render')
		};

		this.model = new CardModel();
		this.emptyCards = new Components.EmptyCards(this.model);
		this.initialize();
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

	initialize() {
		this.emptyCards.render(this.ui.cards);
		new Components.Checkbox();
		new Components.Button();

		this.ui.submitBtn.click(() => {
			if (!this.model.isValid) {
				this.emptyCards.validate();
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
}