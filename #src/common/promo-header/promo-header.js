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
                        // autoplay: {
                        //     delay: 3000,
                        //     disableOnInteraction: false,
                        // },
                        observer: true,
                        observeParents: true,
                        speed: 600,
                        watchSlidesProgress: true,
                        preloadImages: false,
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: true,
                    });

                    let buttonsPrev = promoHeader.querySelectorAll('[data-action="slide-prev"]');
                    let buttonsNext = promoHeader.querySelectorAll('[data-action="slide-next"]');

                    if (buttonsPrev.length) {
                        buttonsPrev.forEach(btn => {
                            btn.addEventListener('click', () => {
                                sliderData.slidePrev();
                            })
                        })
                    }
                    if (buttonsNext.length) {
                        buttonsNext.forEach(btn => {
                            btn.addEventListener('click', () => {
                                sliderData.slideNext();
                            })
                        })
                    }

                    slider.dataset.mobile = 'true';

                    //mySwiper.slideNext(0);
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
        }

        // slidesWrapper.addEventListener('scroll', (e) => {
        //     if((slidesWrapper.scrollTop + slidesWrapper.clientHeight) > (slidesWrapper.scrollHeight - 5)) {
        //         slidesWrapper.classList.add('last-slide');
        //     } else {
        //         slidesWrapper.classList.remove('last-slide');
        //     }
        // })

        window.addEventListener('scroll', () => {
            if (document.documentElement.clientWidth < 768) {
                if (window.pageYOffset <= 0) {
                    slidesWrapper.classList.remove('last-slide');
                } else {
                    slidesWrapper.classList.add('last-slide');
                }
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
    
                    subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
                }
    
                function handleMouseEnter() {
                    parent.classList.add('hover');
    
                    setTimeout(() => {
                        subpanel.style.transition = "";
                    }, 100);
                    subpanel.style.transition = "transform 0.1s";
                }
    
                function handleMouseLeave() {
                    parent.classList.remove('hover');
                    subpanel.style.transition = "transform 0.1s";
                    setTimeout(() => {
                        subpanel.style.transition = "";
                    }, 100);
    
                    subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
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