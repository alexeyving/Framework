import './vendor'
import '../scss/index.scss';
import './services/utils/utils';
import './services/utils/dictionaries'
import { Views } from './views/Views'

let app = null;

export class App {
	constructor() {
		if (!app) {
			app = this
		}

		return app;
	}

	initialize() {
		this.views = new Views();
		this.views.initialize();
	}

}