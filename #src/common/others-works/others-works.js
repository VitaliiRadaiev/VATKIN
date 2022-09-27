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
}