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
                speed: 300,
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
}