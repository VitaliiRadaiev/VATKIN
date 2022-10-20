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

        // window.addEventListener('scroll', () => {
        //     if (document.documentElement.clientWidth < 768) {
        //         if (window.pageYOffset <= 0) {
        //             slidesWrapper.classList.remove('last-slide');
        //         } else {
        //             slidesWrapper.classList.add('last-slide');
        //         }
        //     }
        // })
        let lastSlide = document.querySelector('.promo-header .swiper-slide:last-child');
        let footer = document.querySelector('footer.footer.footer--mob');

        let ts;
        document.addEventListener('touchstart', (e) => {
            ts = e.touches[0].clientY;
        })

        document.addEventListener('touchend', (e) => {
            let te = e.changedTouches[0].clientY;
            if (ts > te + 5) {
                // down
                    if(lastSlide.getBoundingClientRect().top <= 0) {
                        let top = Math.abs(document.body.getBoundingClientRect().top) + footer.getBoundingClientRect().top;
                        window.scrollTo({
							top: top,
							behavior: 'smooth',
						})
                        slidesWrapper.classList.add('last-slide');
                        footer.classList.add('footer--visible');
                    }
            } else if (ts < te - 5) {
                // up
                if(footer.classList.contains('footer--visible')) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })

                    slidesWrapper.classList.remove('last-slide');
                    footer.classList.remove('footer--visible');
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

}