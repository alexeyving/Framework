import { BaseView } from './common/BaseView';
import { Components } from '../components/Components';

export class PaletteView extends BaseView {
	constructor({ ctx }) {
		super();

		this.ui = {
			inputDefault: document.getElementById('input-default'),
			inputError: document.getElementById('input-error'),
			inputDisabled: document.getElementById('input-disabled'),
			buttonSubmitHover: document.getElementById('button-submit-hover'),
			buttonSubmitActive: document.getElementById('button-submit-active'),
			buttonSubmitDisabled: document.getElementById('button-submit-disabled'),
			buttonSubmitLoading: document.getElementById('button-submit-loading'),
			buttonDeleteHover: document.getElementById('button-delete-hover'),
			buttonDeleteActive: document.getElementById('button-delete-active'),
			buttonDeleteDisabled: document.getElementById('button-delete-disabled'),
			buttonDeleteLoading: document.getElementById('button-delete-loading'),
			checkBoxActive: document.getElementById('checkbox-active'),
			checkBoxHover: document.getElementById('checkbox-hover'),

		};
		this.initialize()
	}

	initialize() {
		new Components.Select();

		this.ui.inputError.setAttribute('isFailed', 'isFailed');
		this.ui.inputDisabled.setAttribute('disabled', 'disabled');
		this.ui.buttonSubmitHover.setAttribute('isHovered', 'isHovered');
		this.ui.buttonSubmitActive.setAttribute('isActive', 'isActive');
		this.ui.buttonSubmitDisabled.setAttribute('isDisabled', 'isDisabled');
		this.ui.buttonSubmitLoading.setAttribute('isLoading', 'isLoading');
		this.ui.buttonDeleteHover.setAttribute('isHovered', 'isHovered');
		this.ui.buttonDeleteActive.setAttribute('isActive', 'isActive');
		this.ui.buttonDeleteDisabled.setAttribute('isDisabled', 'isDisabled');
		this.ui.buttonDeleteLoading.setAttribute('isLoading', 'isLoading');
		this.ui.checkBoxHover.setAttribute('isHovered', 'isHovered');
		this.ui.checkBoxActive.setAttribute('checked', 'true');
	}
}