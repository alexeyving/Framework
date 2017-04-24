import { Region } from './RegionItem';

export class Regions {
	constructor() {
		//TODO Alesha: remove this code. Direct inheritance
		if (this.__proto__.constructor.queryRegion()) {
			let region = this.__proto__.constructor.queryRegion();
			for (let key in region) {
				let newRegion = new Region();
				this.watchMediaQuery(newRegion, region[key].regions, region[key].template, region[key].mediaQuery);
			}
		}
	}

	watchMediaQuery(region, classesArray, template, mediaQuery) {
		const mq = window.matchMedia(`(min-width: ${mediaQuery})`);
		mq.addListener((e) => {
			region._moveElements(classesArray, template, e);
		});
		region._moveElements(classesArray, template, mq)
	};
};