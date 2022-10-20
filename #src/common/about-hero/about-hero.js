{
    let aboutHero = document.querySelector('[data-about-hero]');
    if (aboutHero) {
        let anchor = aboutHero.querySelector('.about-hero__anchor');
        let bgItems = aboutHero.querySelectorAll('.about-hero__bg-item');
        let nextElement = aboutHero.nextElementSibling;

        aboutHero.addEventListener('mousemove', (e) => {
            anchor.hidden = true;
            let hoverItem = document.elementFromPoint(e.clientX, e.clientY).closest('.about-hero__bg-item');
            anchor.hidden = false;

            if (hoverItem) {
                if (bgItems.length) {
                    hoverItem.classList.add('hover');
                    bgItems.forEach(i => {
                        if (i === hoverItem) return;
                        i.classList.remove('hover');
                    })
                }
            }
        })

        let ts;
        document.addEventListener('touchstart', (e) => {
            ts = e.touches[0].clientY;
        })

        aboutHero.addEventListener('touchmove', (e) => {
            e.preventDefault()
        })

        aboutHero.addEventListener('touchend', (e) => {
            let te = e.changedTouches[0].clientY;
            
            if (ts > te + 5) {
                // down
                setTimeout(() => {
                    anchor.click();
                }, 30)

            } else if (ts < te - 5) {
                // up
               
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }, 30)

            }
        })

        // nextElement.addEventListener('touchmove', (e) => {
        //     if(nextElement.getBoundingClientRect().top > 69) {
        //         e.preventDefault();
        //     }
        // })

        // nextElement.addEventListener('touchend', (e) => {
        //     let te = e.changedTouches[0].clientY;
        //     if (ts > te + 5) {
        //         // down
        //         if(nextElement.getBoundingClientRect().top < 69) {
        //             setTimeout(() => {
        //                 anchor.click();
        //             }, 30)
        //         }

        //     } else if (ts < te - 5) {
        //         // up
        //         if(nextElement.getBoundingClientRect().top > 69) {

        //             setTimeout(() => {
        //                 window.scrollTo({
        //                     top: 0,
        //                     behavior: 'smooth',
        //                 })
        //             }, 30)
        //         }
        //     }
        // })
    }
}