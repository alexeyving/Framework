import template from './template.pug';
import templateSelected from './templateSelected.pug';
import { DATA } from '../../mock';
export class Select {

	constructor() {

		this.listeners = {};

		const params = {
			templateResult: this.getTemplate,
			templateSelection: (data) => {
				let tmp = this.getSelectedTemplate(data);
				return tmp;
			},
			minimumResultsForSearch: Infinity,
			data: DATA.data
		};
		const select = $('select').select2(params);
		const stopPropagation = (e) => {
			e.stopPropagation();
			e.preventDefault();
		};

		select.on('select2:opening', (e) => {

			if (typeof e.params.args.evt === 'undefined') return true;

			let eventTarget = e.params.args.evt.target;
			let deleteButton = document.getElementsByClassName('js-remove-card')[0];
			let confirmationYesButton = document.getElementById('js-confirmation-yes');
			let confirmationNoButton = document.getElementById('js-confirmation-no');
			let confirmationBlock = document.getElementsByClassName('confirmation')[0];
			let confirmationHolder = document.getElementsByClassName('confirmation__holder')[0];
			let confirmationSpan = document.querySelectorAll('.confirmation span')[0];

			if (eventTarget == deleteButton) {
				$('.selection-inner').addClass('confirmation-wrapper');
				stopPropagation(e)
			}
			if (eventTarget == confirmationYesButton) {
				$('.selection-inner').removeClass('confirmation-wrapper');
				this.emitDelete(select.select2('data'));
				stopPropagation(e)
			}
			if (eventTarget == confirmationNoButton) {
				$('.selection-inner').removeClass('confirmation-wrapper');
				stopPropagation(e)
			}
			if (eventTarget == confirmationBlock
				|| eventTarget == confirmationSpan
				|| eventTarget == confirmationHolder
			) {
				stopPropagation(e)
			}
		}).on('select2:select', function (e) {

			//adjust select triangle
			let selectedText = $('.select2-selected__text');
			let selectedTextWidth = selectedText.outerWidth();
			let selectedTextMaxWidth = parseInt(selectedText.css('max-width'));
			let condition = selectedTextWidth >= selectedTextMaxWidth;
			if (condition) {
				selectedText.addClass('select2-selected__text--wide');
			} else {
				selectedText.removeClass('select2-selected__text--wide');
			}
		});

		//TODO: refactor eto nemedlenno
		setTimeout(function () {
			let selectSelection = $('.select2-selection');
			let selectSelectionRendered = $('.select2-selection__rendered');
			selectSelection.prop('tabindex', 3); //for proper tab navigation

			//we only want focus-like styles when tab navigating
			selectSelection.keyup(function (e) {
				if (e.which === 9) {
					selectSelectionRendered.addClass('tabbed');
				}
			});
			selectSelection.blur(function () {
				selectSelectionRendered.removeClass('tabbed');
			});
		}, 100);

	}

	emitDelete(data) {
		this.listeners['delete'](data)
	}

	onDelete(cb) {
		this.listeners = { 'delete': cb }
	}

	getSelectedTemplate(state) {
		return $(templateSelected(state))
	}

	getTemplate(state) {
		return $(template(state))
	}
}