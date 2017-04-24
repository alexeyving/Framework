import { PaymentProcessView } from './PaymentProcessView';
import { AddCard } from './AddCard';
import { SavedCards } from './SavedCards';
import { PaletteView } from './PaletteView'

let views = null;
export class Views {
	constructor() {
		if (!views) {
			views = this
		}
		return views;
	}

	initialize() {
		this.paletteView = PaletteView;
		this.paymentProcessView = PaymentProcessView;
		this.addCard = AddCard;
		this.savedCards = SavedCards;
	}
}