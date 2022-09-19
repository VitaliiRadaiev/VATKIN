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
}