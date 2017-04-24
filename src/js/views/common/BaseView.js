import { Regions } from './Regions';

export class BaseView extends Regions {
	constructor() {
		super();
		window[this.constructor.name] = this;
		this.initScrollTop();
	}

	initScrollTop() {
		window.addEventListener('scroll', () => {
			let parentHeight = document.body.offsetHeight;
			let scrollTop = document.body.scrollTop;

			if (parentHeight / 2 < scrollTop) {
				$('.scroll-top').addClass('active')
			} else {
				$('.scroll-top').removeClass('active')
			}
		});

		$('.scroll-top').click(() => {
			_u.animateScrollTo(document.body, 0, 1)
		});
	}

	toJSON() {
		if (!!this.model) {
			let model = this.model._state;
			console.log(JSON.stringify(model, null, 2));
			return model;
		} else {
			console.warn("View don't exist model");
			console.log(this.toJSON());
			return this.toJSON();
		}
	}
}