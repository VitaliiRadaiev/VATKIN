@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

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
			this.selectInit();
			this.cursorhandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
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
		let links = document.querySelectorAll('a, button, .cursor-hover, [data-cursor-hover], .swiper-pagination-bullet, input, label, textarea, .select__option, .select__title');
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
		@@include('../common/header/header.js');
	}

	popupHandler() {
		@@include('../common/popup/popup.js');
	}

	slidersInit() {
		@@include('../common/carousel/carousel.js');
		@@include('../common/series/series.js');
		@@include('../common/painting-info/painting-info.js');
		@@include('../common/others-works/others-works.js');
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
		@@include('../common/select/select.js');
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
		@@include('../common/promo-header/promo-header.js');
		@@include('../common/zoom/zoom.js');
		@@include('../common/about-hero/about-hero.js');
		@@include('../common/exhibition/exhibition.js');
		@@include('../common/cookies-message/cookies-message.js');
		@@include('../common/portfolio-list/portfolio-list.js');
		@@include('../common/messenger/messenger.js');
		@@include('../common/quantity/quantity.js');
		@@include('../common/painting-preview/painting-preview.js');
	}

	componentsAfterLoad() {
		let linksHoverWeight = document.querySelectorAll('.painting-info__bottom-buttons .painting-info__link');
		if(linksHoverWeight.length) {
			linksHoverWeight.forEach(link => {
				const setMinWidth = () => {
					link.style.minWidth = `calc(${link.clientWidth}px + ${link.innerHTML.length * 0.19}px)`;
					link.style.marginRight = `-${link.innerHTML.length * 0.19}px`;
				}

				setMinWidth();

				window.addEventListener('resize', setMinWidth);
			})
		}
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


