{
    let paintingInfoSlider = document.querySelector('[data-slider="painting-info-slider"]');
    if(paintingInfoSlider) {
        let sliderData = new Swiper(paintingInfoSlider.querySelector('.swiper'), {
            effect: 'fade',
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false,
            // },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            autoHeight: true,
            pagination: {
            	el: paintingInfoSlider.querySelector('.swiper-pagination'),
            	clickable: true,
            }
        });
        
    }
}