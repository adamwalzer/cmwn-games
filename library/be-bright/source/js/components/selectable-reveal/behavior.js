pl.game.component('selectable-reveal', function () {
	
	this.respond('select', function (_event) {
		var index, stateMethod;

		index = _event.message;
		stateMethod = this.properties.selectState || 'select';

		if (~index) {
			this[stateMethod](_event.behaviorTarget);
			this.reveal.item(index);
			this.features.correct.ready(index);
		}
	});

	this.entity('selectable', function () {
		
		this.shouldSelect = function (_$target) {
			if (_$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0 || _$target.is('[pl-always-selectable]')) {
				return !this.screen.state(this.STATE.VOICE_OVER);
			}

			return false; 
		};

	});

	this.entity('reveal', function () {
		this.on('ready', function (_event) {
			if (!this.is(_event.targetScope)) return;

			this.screen.on('audio-ended', this.bind(function (_event) {
				this.enable('.items .OPEN button.close-reveal');
			}));

		});
	});

	this.ready = function () {
		var correct;

		correct = pl.Queue.create();

		correct.on('complete', this.bind(function () {
			this.complete();
		}));

		this.features = this
			.find('.items li')
			.map(function (_index, _node) {
				correct.add(_index);
				return _index;
			})
			.toArray();

		this.features.correct = correct;
	};

});
