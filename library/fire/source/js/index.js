/**
 * Index script
 * @module
 */
// import 'js-interactive-library';
import '../../../../../js-interactive-library';
import './config.game';

import '../../../shared/js/screen-ios-splash';
import './components/screen-basic/behavior';
import './components/screen-quit/behavior';
import './components/background/behavior';
import './components/title/behavior';
import './components/slides/behavior';
import './components/dropzone/behavior';
import './components/frame/behavior';
import './components/multiple-choice/behavior';
import './components/selectable/behavior';
import './components/modal/behavior';
import './components/reveal/behavior';
import './components/smoke/behavior';
import './components/audio-sequence/behavior';

pl.game('fire', function () {

	var self = this;

	// the following is the mouse smoke js
	(function() {
	var canvas = document.createElement('canvas');
	var w = canvas.width = 960,
		h = canvas.height = 540;
	var c = canvas.getContext('2d');

	var img = new Image();
	img.src = 'http://oi41.tinypic.com/4i2aso.jpg';

	var position = {x : w/2, y : h/2};

	document.body.appendChild(canvas);

	var particles = [];
	var random = function(min, max){
		return Math.random()*(max-min)*min;
	};

	document.body.onmousemove = function(e){
		position.x = e.clientX/self.zoom;
		position.y = e.clientY/self.zoom;
	};
	function Particle(x, y){
		this.x = x;
		this.y = y;
		this.velY = -2;
		this.velX = (random(1, 10)-5)/10;
		this.size = random(3, 5)/10;
		this.alpha = 1;
		this.update = function(){
			this.y += this.velY;
			this.x += this.velX;
			this.velY *= 0.99;
			if(this.alpha < 0) this.alpha = 0;
			c.globalAlpha = this.alpha;
			c.save();
			c.translate(this.x, this.y);
			c.scale(this.size, this.size);
			c.drawImage(img, -img.width/2, -img.height/2);
			c.restore();
			this.alpha *= 0.96;
			this.size += 0.02;
		};
	}

	var draw = function(){
		var p = new Particle(position.x, position.y);
		particles.push(p);
		
		while(particles.length > 500) particles.shift();
		
		c.globalAlpha = 1;
		c.fillStyle = '#000';
		c.fillRect(0,0,w,h);
		
		for(var i = 0; i < particles.length; i++)
		{
			particles[i].update();
		}
	};

	setInterval(draw, 1000/60);
	})();
	// end of the mouse smoke js

	var soundClasses = function() {
		var classes = "";

		this.on('audio-play', function(_event) {
			var id = _event.target.getAttribute('pl-id');
			if(id) {
				id = id.toUpperCase()
				this.addClass(id);
				classes += " "+id;
			}
		});

		this.on('ui-close', function() {
			this.removeClass(classes);
			classes = "";
		});
	};

	this.screen('title', function () {

		this.on('ready', function(_event) {
			if(!this.is(_event.target)) return;

			if(this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
		});

		this.on('ui-open', this.complete);

		this.startAudio = function () {
			this.title.audio.background.play();
			this.title.audio.voiceOver.play();
		};
	});

	this.screen('info-chemical', soundClasses);
	this.screen('info-fuel-oxygen', soundClasses);

	this.screen('alarm', function() {

		this.ready = function() {
			if (this.audio) {
				this.audio.voiceOver.on('ended', function (_event) {
					if (_event.target.id() === 'title') this.audio.voiceOver.directions.play();
				}.bind(this));
			}
		};

		this.pushDown = function() {
			if (this.audio) this.audio.sfx.play();
			this.screen.next();
		};
	});

	this.screen('who', function() {
		
		this.entity('slides', function () {
			
			this.entity('mc-frame', function () {
				
				this.respond('answer', function(_event) {
					if(_event.message === this.properties.answer) {
						this.delay('2s', function() {
							this.screen.next();
						});
					}
				});

				this.on('ready', function(_event) {
					var sequence = 'title police plumber firefighter chef'.split(' ');

					if (!this.is(_event.target)) return;

					if (this.audio) {
						this.audio.voiceOver.on('ended', function (_event) {
							var i, next;

							i = sequence.indexOf(_event.target.id()) + 1;
							next = this.audio.voiceOver[sequence[i]];

							if (next) next.play();
						}.bind(this));
					}
				});
			});
		});
	});

	this.screen('menAndWomen', function() {

		this.on('ready', function(_event) {
			if (!this.is(_event.target)) return;

			if (this.audio) {
				this.audio.voiceOver.on('ended', function (_event) {
					if (_event.target.id() === 'title') this.audio.voiceOver.subtitle.play();
				}.bind(this));
			}
		});
	});

	this.screen('triangle', function() {

		this.startAudio = function () {
			this.dropzone.audio.background.play();
			this.dropzone.audio.voiceOver.play();
		};

		this.stopAudio = function () {
			this.dropzone.audio.voiceOver.stop('@ALL');
		};

		this.entity('dropzone', function () {
		
			this.entity('.area', function () {

				this.cache = null;

				this.respond('grab', function () {
					this.audio.sfx.drag.play();
					this.cache = {
						position: this.absolutePosition().dec(this.game.absolutePosition()),
						size: this.size().scale(this.game.transformScale().x)
					};
				});
				
				this.respond('release', function (_event) {
					var point, scale;

					if((scale = this.game.transformScale().x) !== 1) {
						point = [
									_event.state.start.point[0] + scale * _event.state.progress.distance[0],
									_event.state.start.point[1] + scale * _event.state.progress.distance[1]
								];
					} else {
						point = _event.state.progress.point;
					}

					if (point && this.isPointInBounds(point)) {

						if(this.audio.voiceOver[_event.state.$draggable.id()]) this.audio.voiceOver[_event.state.$draggable.id()].play();

						if (this.takes(_event.state.$draggable.id())) {
							_event.state.$draggable.removeClass('PLUCKED').addClass('COMPLETE').attr('pl-draggable',null);
							_event.state.$helper.addClass('DROPED');
							
							this.drop(_event.state.$draggable);
							this.open(this[_event.state.$draggable.id()]);
							this.open(this[_event.state.$draggable.id()+'Side']);
							this.audio.sfx.correct.play();
							if(this.isComplete) {
								this.delay('.75s', function() {
									this.audio.sfx.complete.play();
								});
							}
							
							return;
						}

						else {
							this.audio.sfx.incorrect.play()
						}

					}

					_event.state.$helper.addClass('RETURN').css('transform', 'translateX(0px) translateY(0px)');
				});
			});

			this.on('ready', function(_event) {
				if (!this.is(_event.target)) return;

				if (this.audio) {
					this.audio.voiceOver.on('ended', function(_event) {
						if (_event.target.id() === 'title') this.audio.voiceOver.directions.play();
					}.bind(this));
				}
			});
		});
	});

	this.screen('break-triangle', function() {
		this.on('audio-play', function(_event) {
			var id = _event.target.getAttribute('pl-id');
			if(id) this.addClass(id.toUpperCase());
		});

		this.on('ready', function(_event) {
			var sequence = 'title heat air fuel'.split(' ');

			if (!this.is(_event.target)) return;

			if (this.audio) {
				this.audio.voiceOver.on('ended', function(_event) {
					var i, next;

					i = sequence.indexOf(_event.target.id()) + 1;
					next = this.audio.voiceOver[sequence[i]]

					if (next) next.play();
				}.bind(this));
			}
		});

		this.on('audio-ended', function(_event) {
			var id = _event.target.getAttribute('pl-id');
			if(id) this.removeClass(id.toUpperCase());
		});
	});

	this.screen('dress', function() {
		this.respond('select', function(_event) {
			// this removes any screen class that starts with the same thing as the event message
			// and then adds the event message as a class to the screen
			if(!_event.message) return;
			var regexp = new RegExp("(^|\\s)"+_event.message.split("-")[0]+"-\\S+");
			this.screen.removeClass(function(index, className) {
				return (className.match(regexp) || []).join(' ');
			}).addClass(_event.message);
			this.screen.next();
		});

		this.entity('slides', function() {

			this.entity('need', function() {
				
				this.entity('dropzone', function () {
				
					this.entity('.area', function () {

						this.cache = null;

						this.respond('grab', function () {
							this.audio.sfx.drag.play();
							this.cache = {
								position: this.absolutePosition().dec(this.game.absolutePosition()),
								size: this.size().scale(this.game.transformScale().x)
							};
						});
						
						this.respond('release', function (_event) {
							var point, scale;

							if((scale = this.game.transformScale().x) !== 1) {
								point = [
											_event.state.start.point[0] + scale * _event.state.progress.distance[0],
											_event.state.start.point[1] + scale * _event.state.progress.distance[1]
										];
							} else {
								point = _event.state.progress.point;
							}

							if (point && this.isPointInBounds(point)) {

								if (this.takes(_event.state.$draggable.id())) {
									_event.state.$draggable.removeClass('PLUCKED').addClass('COMPLETE').attr('pl-draggable',null);
									_event.state.$helper.addClass('DROPED');
									
									this.drop(_event.state.$draggable);
									this.find('.'+_event.state.$draggable.id()).addClass('show');
									this.audio.sfx.correct.play();
									
									return;
								}

								else {
									this.audio.sfx.incorrect.play();
								}

							}

							_event.state.$helper.addClass('RETURN').css('transform', 'translateX(0px) translateY(0px)');
						});
					});
				});

				this.respond('drop', function(_event) {
					this.modal.item(_event.message);
				});
			});
		});
	});

	this.screen('flip', function () {
		this.next = function () {
			this.game.quit.okay();
		};

		this.complete = function (_event) {
			var eventCategory = (['game', this.game.id(), this.id()+'('+(this.index()+1)+')']).join(' ');

			ga('send', 'event', eventCategory, 'complete');

			return this.proto();
		};
	});

	this.exit = function () {
		var screen, eventCategory;

		screen = this.findOwn(pl.game.config('screenSelector')+'.OPEN:not(#quit)').scope();
		eventCategory = (['game', this.id(), screen.id()+'('+(screen.index()+1)+')']).join(' ');

		ga('send', 'event', eventCategory, 'quit');

		return this.proto();
	};
});
