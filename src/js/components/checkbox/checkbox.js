export class Checkbox {
	constructor(ctx = $('body')) {
		//emulate space bar/enter for tabbed navigation between inputs
		let trueLabel = ctx.find('.true-label');
		let spaceKeyCode = 32;
		let enterKeyCode = 13;
		trueLabel.keyup(function (e) {
			if (e.which === spaceKeyCode || e.which === enterKeyCode) {
				$(this).siblings('input[type=checkbox]').click();
			}
		});
		trueLabel.keydown(function (e) {
			if (e.which === spaceKeyCode) {
				e.preventDefault(); //to negate space scrolling
			}
		});
		//we only want focus-like styles when tab navigating
		trueLabel.click(function () {
			$(this).addClass('clicked');
		});
		trueLabel.blur(function () {
			$(this).removeClass('clicked');
		});
	}
}
