import { Container, filters } from 'pixi.js';
import gsap from 'gsap';

// fade in a provided component with provided delay and duration values
export function showComponent(pixiComponent, duration = 0.3, delay = 0, y = null) {
	console.log('show');
	const parent = pixiComponent.parent;
	const holder = new Container(); //{resolution: devicePixelRatio, roundPixels: true});
	const filter = new filters.AlphaFilter(0);
	holder.filters = [filter];
	holder.addChild(pixiComponent);
	parent.addChild(holder);
	gsap.to(filter, {
		alpha: 1,
		delay,
		duration,
		onComplete: function () {
			holder.filters = null;
		},
	});
	if (y !== null) {
		gsap.to(pixiComponent, { y, delay, duration });
	}
}

// hide: function(duration = 0.3, delay=0) {
//     console.log('hide');
//     buttonHolder.filters = [filter];
//     gsap.to(filter, { alpha: 0, delay, duration, onComplete: function() {
//         buttonHolder.filters = null;
//     } });
// },
// }
