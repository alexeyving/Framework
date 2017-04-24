export class Button {
	constructor() {
		// TODO: add template
		//Edge fix: button blur after click
		$('button').click(function () {
			$(this).blur();
		})
	}
}
