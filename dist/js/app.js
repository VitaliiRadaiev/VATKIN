class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}

	replaceToInlineSvg(query) {
		const images = document.querySelectorAll(query);

		if(images.length) {
			images.forEach(img => {
					let xhr = new XMLHttpRequest();
					xhr.open('GET', img.src);
					xhr.onload = () => {
						if (xhr.readyState === xhr.DONE) {
							if (xhr.status === 200) {
								let svg = xhr.responseXML.documentElement;
								svg.classList.add('_svg');
								img.parentNode.replaceChild(svg, img);
							}
						}
					}
					xhr.send(null);
			})
		}
	}

	setSameHeight() {
		let elements = document.querySelectorAll('[data-set-same-height]');
		if(elements.length) {
			const getGropus = (elements) => {
				let obj = {};

				elements.forEach(el => {
					let id = el.dataset.setSameHeight;
					if(obj.hasOwnProperty(id)) {
						obj[id].push(el);
					} else {
						obj[id] = [el];
					}
				})

				return obj;
			}
			const setMinHeight = (groups) => {
				for(let key in groups) {
					let maxHeight = Math.max(...groups[key].map(i => i.clientHeight));
					
					groups[key].forEach(el => {
						el.style.minHeight = maxHeight + 'px';
					})
				}
			}

			let groups = getGropus(elements);

			if(document.documentElement.clientWidth > 767.98) {
				setMinHeight(groups);
			}
		}
	}

	setFullHeaghtSize() {
		let elments = document.querySelectorAll('[data-full-min-height]');
		if(elments.length) {
			elments.forEach(el => {
				const setSize = () => {
					el.style.minHeight = document.documentElement.clientHeight + 'px';
				}

				setSize();

				window.addEventListener('resize', setSize);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.оbjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	  });
  
	  this.arraySort(this.оbjects);
  
	  this.mediaQueries = this.оbjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const оbjectsFilter = this.оbjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, оbjects) {
	  if (matchMedia.matches) {
		оbjects.forEach((оbject) => {
		  оbject.index = this.indexInParent(оbject.parent, оbject.element);
		  this.moveTo(оbject.place, оbject.element, оbject.destination);
		});
	  } else {
		оbjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-is-load');


			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			this.utils.replaceToInlineSvg('.img-svg');
			this.utils.setFullHeaghtSize();
			this.dynamicAdapt.init();
			this.slidersInit();
			this.headerHandler();
			this.componentsBeforeLoad();
			this.cursorhandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.initScrollParallax();
		});



		window.addEventListener('load', () => {
			setTimeout(() => {
				document.body.classList.add('page-is-full-load');
			}, 3000);
			//this.initLocomotiveScroll();
			//this.setPaddingTopHeaderSize();
			this.componentsAfterLoad();
			//this.setFontSize();
		});

	}

	cursorhandler() {
		let mouseCursor = document.querySelector('[data-cursor]');
		let links = document.querySelectorAll('a, button, [data-cursor-hover]');
		let anchors = document.querySelectorAll('.anchor');
		let cursorHidden = document.querySelectorAll('.cursor-hidden');
		let cursorLight = document.querySelectorAll('.cursor-light');

		window.addEventListener('mousemove', cursor);

		function cursor(e) {
			gsap.to(mouseCursor, 0.2, {
				x: e.clientX,
				y: e.clientY
			});
		}
		if (links.length) {
			links.forEach(link => {
				link.addEventListener("mouseleave", () => {
					mouseCursor.classList.remove("hover");
					gsap.to(mouseCursor, 0.2, {
						scale: 1,
						background: "currentColor",
					});
				});

				link.addEventListener("mouseover", () => {
					mouseCursor.classList.add("hover");
					gsap.to(mouseCursor, 0.2, {
						scale: 2,
						background: "transparent",
					});
				});
			});
		}

		if (anchors.length) {
			anchors.forEach(anchor => {
				anchor.addEventListener("mouseleave", () => {
					mouseCursor.classList.remove("show-arrow");
				});

				anchor.addEventListener("mouseover", () => {
					mouseCursor.classList.add("show-arrow");
				});
			})
		}

		if (cursorHidden.length) {
			cursorHidden.forEach(el => {
				el.addEventListener("mouseleave", () => {
					mouseCursor.classList.remove("hidden");
				});

				el.addEventListener("mouseover", () => {
					mouseCursor.classList.add("hidden");
				});
			})
		}
		if (cursorLight.length) {
			cursorLight.forEach(el => {
				el.addEventListener("mouseleave", () => {
					if (el.classList.contains("cursor-light")) {
						mouseCursor.classList.remove("cursor-light");
					}
				});

				el.addEventListener("mouseover", () => {
					if (el.classList.contains("cursor-light")) {
						mouseCursor.classList.add("cursor-light");
					}
				});
			})
		}
	}

	headerHandler() {
		{
    let header = document.querySelector('[data-header]');
    if(header) {
        let isScroll = window.pageYOffset;

        if(header.classList.contains('header--dark')) {
            document.body.classList.add('logo-white');
            document.querySelector('.main-logo').classList.add('cursor-light');
        }

        window.addEventListener('scroll', () => {
            header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
            header.classList.toggle('cursor-light', window.pageYOffset <= 50);
            document.body.classList.toggle('header-is-scroll', window.pageYOffset > 50);
            document.querySelector('.main-logo').classList.toggle('cursor-light', window.pageYOffset <= 50);

            if(window.pageYOffset > 50) {
                if(window.pageYOffset > isScroll) {
                    header.classList.add('header--hide');
                    document.body.classList.add('logo-is-hide');
                } else if(window.pageYOffset < isScroll) {
                    header.classList.remove('header--hide');
                    document.body.classList.remove('logo-is-hide');
                }
            }

            isScroll = window.pageYOffset;
        })
    }

    let menu = document.querySelector('[data-menu]');
    if(menu) {
        let buttonsOpenMenu = document.querySelectorAll('[data-action="open-menu"]');
        let buttonsCloseMenu = document.querySelectorAll('[data-action="close-menu"]');

        buttonsOpenMenu.forEach(btn => {
            btn.addEventListener('click', () => {
                menu.classList.add('menu--open');
                document.documentElement.classList.add('overflow-hidden');
                document.body.classList.add('menu-is-open');
            })
        })

        buttonsCloseMenu.forEach(btn => {
            btn.addEventListener('click', () => {
                menu.classList.remove('menu--open');
                document.documentElement.classList.remove('overflow-hidden');
                document.body.classList.remove('menu-is-open');
            })
        })
    }
};
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}
;
	}

	slidersInit() {
		{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: carousel.querySelector('[data-action="btn-next"]'),
                    prevEl: carousel.querySelector('[data-action="btn-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                },
            });
        })
    }
};
		{
    let seriesCards = document.querySelectorAll('[data-series-card]');
    if(seriesCards.length) {
        seriesCards.forEach(card => {
            let sliderData = new Swiper(card.querySelector('.swiper'), {
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 10,
                speed: 1000,
                watchSlidesProgress: true,
                loop: true,
                preloadImages: false,
                lazy: {
                	loadPrevNext: true,
                },

                on: {
                    init: (swiper) => {
                        swiper.autoplay.stop();
                    }
                }
            });

            card.addEventListener('mouseenter', () => {
                if (!this.utils.isMobile()) {
                    sliderData.autoplay.start();
                    sliderData.slideNext();
                }
            })
            card.addEventListener('mouseleave', () => {
                if (!this.utils.isMobile()) {
                    sliderData.autoplay.stop();
                }
            })
        })
    }
};
		{
    let paintingInfoSlider = document.querySelector('[data-slider="painting-info-slider"]');
    if(paintingInfoSlider) {
        let sliderData = new Swiper(paintingInfoSlider.querySelector('.swiper'), {
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            pagination: {
            	el: paintingInfoSlider.querySelector('.swiper-pagination'),
            	clickable: true,
            }
        });
        
    }
};
		{
    let otherWorks = document.querySelector('[data-slider="others-works"]');
    if(otherWorks) {
        let sliderData = new Swiper(otherWorks.querySelector('.swiper'), {
            observer: true,
            observeParents: true,
            speed: 600,
            loop: true,
            navigation: {
                nextEl: otherWorks.querySelector('.others-works__btn.next'),
                prevEl: otherWorks.querySelector('.others-works__btn.prev'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                }
            },
        });
    }
};
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

							// update locomotive scroll
							let id = setInterval(() => {
								window.locomotivePageScroll.update();
							}, 20);
							setTimeout(() => {
								clearInterval(id);
							}, 200)
						})
					})
				}

				if (select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if (getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						// if (header) {
						// 	top = top - header.clientHeight;
						// }

						window.scrollTo({
							top: top,
							behavior: 'smooth',
						})
					} else {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options">' + select_get_options(select_options) + '</div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 100);
                }
            }
            _slideToggle(select_body_options, 100);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					let value = 10 / 1400 * el.clientWidth;
					el.style.fontSize = value + 'px';
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}


	componentsBeforeLoad() {
		{
    let promoHeader = document.querySelector('[data-promo-header]');
    if (promoHeader) {
        const slider = promoHeader.querySelector(".swiper");
        let slidesWrapper = promoHeader.querySelector(".swiper-wrapper");

        if (slider) {
            let sliderData;
            function mobileSlider() {
                if (document.documentElement.clientWidth > 767 && slider.dataset.mobile == 'false') {
                    sliderData = new Swiper(slider, {
                        initialSlide: window.startHomePageSlide,
                        observer: true,
                        observeParents: true,
                        speed: 1500,
                        watchSlidesProgress: true,
                        preloadImages: false,
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: true,
                        on: {
                            slideChange: (e) => {
                                let prevSlide = slider.querySelector('.swiper-slide.is-hover');
                                if (prevSlide) {
                                    prevSlide.classList.remove('is-hover');
                                }
                                setTimeout(() => {
                                    let activeSlide = slider.querySelector('.swiper-slide.swiper-slide-active');
                                    if (activeSlide) {
                                        activeSlide.classList.add('is-hover');
                                    }
                                }, 1500)
                            },

                            afterInit: () => {
                                let buttonsPrev = promoHeader.querySelectorAll('[data-action="slide-prev"]');
                                let buttonsNext = promoHeader.querySelectorAll('[data-action="slide-next"]');
                    
                                if (buttonsPrev.length) {
                                    buttonsPrev.forEach(btn => {
                                        btn.addEventListener('click', () => {
                                            if (sliderData) sliderData.slidePrev();
                                        })
                                    })
                                }
                                if (buttonsNext.length) {
                                    buttonsNext.forEach(btn => {
                                        btn.addEventListener('click', () => {
                                            if (sliderData) sliderData.slideNext();
                                        })
                                    })
                                }
                            }
                        }
                    });

                    slider.dataset.mobile = 'true';
                }

                if (document.documentElement.clientWidth < 768) {
                    slider.dataset.mobile = 'false';

                    if (slider.classList.contains('swiper-initialized')) {
                        sliderData.destroy();
                    }
                }
            }

            mobileSlider();

            window.addEventListener('resize', () => {
                mobileSlider();
            })



            const sliderAutoplay = {
                value: 10,
                currentTime: 0,

                _tick() {
                    setInterval(() => {
                        this.currentTime++

                        if (this.currentTime >= this.value) {
                            this.currentTime = 0;
                            if (sliderData) sliderData.slideNext();
                        }
                    }, 1000)
                },

                init() {
                    this._tick();
                },

                reset() {
                    this.currentTime = 0;
                }
            }

            sliderAutoplay.init();

            document.addEventListener('keydown', (e) => {
                if (e.code === 'ArrowLeft') {
                    if (sliderData) sliderData.slidePrev();
                    sliderAutoplay.reset();
                }
                if (e.code === 'ArrowRight') {
                    if (sliderData) sliderData.slideNext();
                    sliderAutoplay.reset();
                }
            });

            document.addEventListener('mousemove', (e) => {
                sliderAutoplay.reset();
            })

            document.addEventListener('click', () => {
                sliderAutoplay.reset();
            })
        }


        let isScroll = window.pageYOffset;


        window.addEventListener('scroll', () => {
            if (document.documentElement.clientWidth < 768) {
                if (window.pageYOffset <= 0) {
                    slidesWrapper.classList.remove('last-slide');
                } else {
                    slidesWrapper.classList.add('last-slide');
                }
            }
        })

        let menu = document.querySelector('[data-menu]');

        window.addEventListener('wheel', (onWeel) => {
            if (onWeel.deltaY > 0) {
                menu.classList.add('menu--open');
                document.documentElement.classList.add('overflow-hidden');
                document.body.classList.add('menu-is-open');
            }
        })

        let cards = document.querySelectorAll('[data-promo-header-card]');
        if (cards.length) {
            cards.forEach(card => {
                let myPanel = card;
                let subpanel = card.querySelector('.promo-header-card__inner');
                let parent = card.closest('.swiper-slide');

                myPanel.onmousemove = transformPanel;
                myPanel.onmouseenter = handleMouseEnter;
                myPanel.onmouseleave = handleMouseLeave;

                let mouseX, mouseY;

                let transformAmount = 2;

                function transformPanel(mouseEvent) {
                    mouseX = mouseEvent.pageX;
                    mouseY = mouseEvent.pageY;

                    const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
                    const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

                    const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
                    const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

                    //subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
                    gsap.to(subpanel, 1, {
                        transformPerspective: 400,
                        rotateY: percentX * transformAmount,
                        rotateX: percentY * transformAmount,
                    });
                }

                function handleMouseEnter() {
                    parent.classList.add('hover');

                    setTimeout(() => {
                        subpanel.style.transition = "";
                    }, 100);
                    //subpanel.style.transition = "transform 0.1s";
                }

                function handleMouseLeave() {
                    parent.classList.remove('hover');
                    //subpanel.style.transition = "transform 0.1s";
                    setTimeout(() => {
                        subpanel.style.transition = "";
                    }, 100);

                    //subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
                    gsap.to(subpanel, 1, {
                        transformPerspective: 400,
                        rotateY: 0,
                        rotateX: 0,
                    });
                }
            })
        }

        const setHeight = () => {
            if (document.documentElement.clientWidth < 768) {
                promoHeader.style.height = document.documentElement.clientHeight + 'px';
            } else {
                promoHeader.removeAttribute('style');
            }
        }

        setHeight();

        window.addEventListener('resize', setHeight);

    }

};
		{
    let zoomContainer = document.querySelector('[data-zoom]');
    if (zoomContainer) {
        let cursor = zoomContainer.querySelector('.zoom__cursor');
        let zoomZone = zoomContainer.querySelector('[data-zoom-zone]');

        function moveAt(pageX, pageY) {
            cursor.style.left = pageX - cursor.offsetWidth / 2 + 'px';
            cursor.style.top = pageY - cursor.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        zoomContainer.addEventListener('mouseenter', () => {
            cursor.classList.add('d-block');
        })
        zoomContainer.addEventListener('mouseleave', () => {
            cursor.classList.remove('d-block');
        })

        zoomContainer.addEventListener('click', (e) => {
            if(zoomContainer.classList.contains('zoom-show')) {
                zoomContainer.classList.remove('zoom-show');
            } else {
                setZoomPosition(e);
            }
        })
        zoomContainer.addEventListener('mousemove', (e) => {
            if(zoomContainer.classList.contains('zoom-show')) {
                setZoomPosition(e);
            }
        })

        function setZoomPosition(e) {
            zoomContainer.classList.add('zoom-show');
            let width = zoomContainer.offsetWidth;
            let height = zoomContainer.offsetHeight;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;

            let bgPosX = (mouseX / width * 100);
            let bgPosY = (mouseY / height * 100);

            zoomZone.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
        }
    }
};
		{
    let aboutHero = document.querySelector('[data-about-hero]');
    if(aboutHero) {
        let anchor = aboutHero.querySelector('.about-hero__anchor');
        let bgItems = aboutHero.querySelectorAll('.about-hero__bg-item');

        aboutHero.addEventListener('mousemove', (e) => {
            anchor.hidden = true;
            let hoverItem = document.elementFromPoint(e.clientX, e.clientY).closest('.about-hero__bg-item');
            anchor.hidden = false;

            if(hoverItem) {
                if(bgItems.length) {
                    hoverItem.classList.add('hover');
                    bgItems.forEach(i => {
                        if(i === hoverItem) return;
                        i.classList.remove('hover');
                    })
                }
            }
        })
    }
};
		{
    let dataExhibition = document.querySelector('[data-exhibition]');
    if(dataExhibition) {
        let listItems = dataExhibition.querySelectorAll('[data-exhibition-img]');
        if(listItems.length) {
            listItems.forEach(item => {
                let parentRow = item.closest('.exhibition__row');
                let imgWrap = parentRow.querySelector('.exhibition__preview-img');

                item.addEventListener('mouseenter', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        imgWrap.innerHTML = `<img src="${item.dataset.exhibitionImg}" alt="">`
                    }
                })

                parentRow.addEventListener('mouseleave', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        imgWrap.innerHTML = '';
                    }
                })
            })
        }
    }
};
		function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


const $cookieEl = document.getElementById('cookieMessage');
if ($cookieEl) {
    let closeButtons = document.querySelectorAll('[data-action="close-cookies-message"]');
    if(closeButtons.length) {
        closeButtons.forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                $cookieEl.classList.remove('show');
        
                document.cookie = encodeURIComponent('hide-cookie') + "=" + encodeURIComponent('true') + "; path=/; max-age=86400";
            })
        })
    }




    if (!getCookie('hide-cookie')) {
        setTimeout(() => {
            $cookieEl.classList.add('show');
        }, 1000);
    }

};
		{
    let portfolioList = document.querySelector('[data-portfolio-list]');
    if(portfolioList) {
        let children = Array.from(portfolioList.children);

        if(portfolioList.dataset.portfolioList === 'all') {
            let elementsNum = 10;
            let count = 1;

            children.forEach((el, index) => {
                if(count == 1) {
                    el.classList.add('one');
                }

                if(count === 2) {
                    el.setAttribute('data-scroll-speed', '0.25');
                }

                if(count === 5 || count === 8) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }

                if(count === 6) {
                    el.setAttribute('data-scroll-speed', '0.1');
                }
                if(count === 10) {
                    el.setAttribute('data-scroll-speed', '0.2');
                }

                el.classList.add(`item-${count++}`);
                if(count > elementsNum) {
                    count = 1;
                }
            })

            children.forEach(el => {
                if(el.classList.contains('one')) {
                    let li = document.createElement('li');
                    li.className = 'list-br';
    
                    el.after(li);
                }
            })
        }

        if(portfolioList.dataset.portfolioList === 'short') {
            let elementsNum = 12;
            let count = 1;

            children.forEach((el, index) => {

                if(count === 4) {
                    el.setAttribute('data-scroll-speed', '0.15');
                }

                if(count === 7 || count === 10) {
                    el.setAttribute('data-scroll-speed', '0.25');
                }

                if(count === 2 || count === 5 || count === 9 || count === 12) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }
                if(count === 6) {
                    el.setAttribute('data-scroll-speed', '0.45');
                }

                count++;
                if(count > elementsNum) {
                    count = 1;
                }
            })
        }

        if(portfolioList.dataset.portfolioList === 'long') {
            let elementsNum = 38;
            let count = 1;

            children.forEach((el) => {
                if(count == 5 || count == 24 || count == 31 || count == 34 || count == 37 || count == 38) {
                    el.classList.add('one');
                }

                if(count === 28) {
                    el.setAttribute('data-scroll-speed', '0.05');
                }

                if(count === 2) {
                    el.setAttribute('data-scroll-speed', '0.1');
                }

                if(count === 20 || count === 26) {
                    el.setAttribute('data-scroll-speed', '0.15');
                }


                if(count === 14 || count === 17 || count === 29 || count === 32) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }
                if(count === 4 || count === 6 || count === 9 || count === 11 || count === 21 || count === 23 || count === 27 || count === 36 || count === 38) {
                    el.setAttribute('data-scroll-speed', '0.45');
                }


                el.classList.add(`item-${count++}`);
                if(count > elementsNum) {
                    count = 1;
                }
            })
    
            children.forEach(el => {
                if(el.classList.contains('one')) {
                    let li = document.createElement('li');
                    li.className = 'list-br';
    
                    el.after(li);
                }
            })
        }
    }
};
		{
    let messenger = document.querySelector('[data-messenger]');
    if(messenger) {

        const toggleLightMode = () => {
            let x = messenger.offsetLeft;
            let y = messenger.offsetTop;
            messenger.hidden = true;
            let el = document.elementFromPoint(x, y).closest('.cursor-light');
            messenger.hidden = false;
            if(el) {
                messenger.classList.add('messenger--white');
            } else {
                messenger.classList.remove('messenger--white');
            }
        }

        let id = setInterval(() => {
            toggleLightMode();
        },20)
        setTimeout(() => {
            clearInterval(id);
        }, 2000)

        window.addEventListener('load', () => {
            let id = setInterval(() => {
                toggleLightMode();
            },20)
            setTimeout(() => {
                clearInterval(id);
            }, 2000)
		});

        document.addEventListener('scroll', (e) => {
            toggleLightMode();
        })

    }
};
	}

	componentsAfterLoad() {
	}

	initLocomotiveScroll() {
		if (window.LocomotiveScroll) {
			let header = document.querySelector('[data-header]')

			const scroll = new LocomotiveScroll({
				el: document.querySelector('[data-scroll-container]'),
				smooth: true,
				repeat: true,
				direction: 'vertical',
				reloadOnContextChange: true,
				gestureDirection: 'both',
				multiplier: 0.7,
				lerp: 0.05,
			});

			let id = setInterval(() => {
				scroll.update();
			}, 200);
			setTimeout(() => {
				clearInterval(id);
			}, 1000)

			let isScroll = 0;
			let scrollUpdate = true;

			scroll.on('scroll', (e) => {
				if(e.scroll.y > (e.limit.y - 300)) {
					if(scrollUpdate) {
						scroll.update();
						scrollUpdate = false;
					}
				}
				if (e.scroll.y > 50) {
					if (e.scroll.y > isScroll) {
						header.classList.add('header--hide');
						document.body.classList.add('logo-is-hide');
					} else if (e.scroll.y < isScroll) {
						header.classList.remove('header--hide');
						document.body.classList.remove('logo-is-hide');
					}
				}

				isScroll = e.scroll.y;
			})

			scroll.on("call", (func, state, event) => {
				switch (func) {
					case "lazyLoad":
						if (state === "enter") {
							event.el.src = event.el.dataset.src;
						} else {
							
						}
						break;
				}
			});
		}
	}

	initScrollParallax() {
		let elements = document.querySelectorAll('[data-scroll-speed]');

		window.addEventListener('scroll', (e) => {
			elements.forEach(el => {
				if(document.documentElement.clientWidth >= 768) {
					if ((el.getBoundingClientRect().top <= (window.innerHeight * 1.5 ) && el.getBoundingClientRect().bottom >= (window.innerHeight * 0.5))) {
						let value = (el.getBoundingClientRect().top - (window.innerHeight / 2)) * 0.5;
						let speed = el.dataset.scrollSpeed;
						el.style.transform = `translateY(${value * speed}px)`;
					}
				} else {
					if(el.hasAttribute('style')) {
						el.removeAttribute('style');
					}
				}
			})
		})
	}
}

let app = new App();
app.init();


