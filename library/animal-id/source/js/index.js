/**
 * Index script
 * @module
 */
import './testPlatformIntegration';
import 'js-interactive-library';
import './config.game';

import './components/screen-basic/behavior';
import './components/screen-quit/behavior';
import './components/title/behavior';
import './components/frame/behavior';
import './components/score/behavior';
import './components/reveal/behavior';
import './components/multiple-choice/behavior';
import './components/selectable/behavior';
import './components/selectable-all/behavior';
import './components/selectable-reveal/behavior';
import './components/class-switcher/behavior';
import './components/match-game/behavior';

pl.game('animal-id', function () {

	this.screen('title', function () {
		
		this.ready = function () {
			this.open();
		};

		this.on('ui-open', function (_event) {
			if (this === _event.targetScope) {
				this.title.start();
			}
		});

 		this.on('ready', function (_event) {
 			// Screens are display:none then when READY get display:block.
 			// When a screen is OPEN then it transitions a transform,
 			// the delay is to prevent the transition failing to play
 			// because of collision of these styles.
 			// 
 			if (this.is(_event.target)) this.delay(0, this.open);
  		});

	});

	this.defineRule = function (_selector_scope, _selector_def, _definition) {
		var _scope, _selector, source, prop, value;
		// Resolve arguments.
		_selector_scope.$els ? // (A) if we are a scope
			(_scope = _selector_scope, // assign scope arg...
			typeof _selector_def === 'string' ? // ...also, (B) if arg 2 is a string
				_selector = _scope.address() + _selector_def: // assing selector arg with scope address:
				(_selector = _scope.address(), _definition = _selector_def)): // (B) otherwise, assign selector arg to scope address, also assing definition arg
			(_selector = _selector_scope, _definition = _selector_def); // (A) otherwise, assing selector and definition args.

		source = _selector+' {';

		for (prop in _definition) {
			if (!_definition.hasOwnProperty(prop)) continue;
			value = _definition[prop];
			source += prop.replace(/([A-Z]+)/g, '-$1').toLowerCase()+': '+value+';'
		}

		source += '}'

		$('<style type="text/css" class="dynanic-styles">'+source+'</style>')
			.appendTo(document.body);

		return source;
	};

});
