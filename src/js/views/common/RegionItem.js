const MEDIA_MEDIUM = 'medium';
const MEDIA_SMALL = 'small';
export class Region {
	constructor() {
		this.currentElem = null;
		this.elements = {};
	}

	_moveElements(classesArray, template, e) {
		if (_u.isArray(classesArray)) {
			classesArray.forEach((val, i) => {
				this.elements[`${_u.lastWord(val, '-')}`] = document.getElementsByClassName(val)[0]
			})
		}
		this.currentElem = this.currentElem === null ? $(template())[0] : document.getElementById(this.currentElem.id);

		let move = (media, movedElem, method) => {
			let nameMethod = method === 'append' ? 'appendChild' : 'innerHTML';
			Object.keys(this.elements).forEach((val) => {
				switch (media) {
					case _u.lastWord(val, '-'):
						if (nameMethod !== 'appendChild') {
							this.elements[val][nameMethod] = template();
						} else {
							this.elements[val][nameMethod](movedElem);
						}
						break;
				}
			});
		};

		if (!document.body.contains(this.currentElem)) {
			if (e.matches) {
				move(MEDIA_MEDIUM, '', 'inner')
			} else {
				move(MEDIA_SMALL, '', 'inner')
			}
		} else {
			if (e.matches) {
				move(MEDIA_MEDIUM, this.currentElem, 'append')
			} else {
				move(MEDIA_SMALL, this.currentElem, 'append')
			}
		}
	};
}