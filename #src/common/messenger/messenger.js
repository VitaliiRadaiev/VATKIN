{
    let messenger = document.querySelector('[data-messenger]');
    if(messenger) {
        let footer = document.querySelector('.footer');

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
            
            let footerPositionY = footer.getBoundingClientRect().top - document.documentElement.clientHeight;
            if(footerPositionY < 0) {
                messenger.classList.add('messenger--hide');
            } else {
                messenger.classList.remove('messenger--hide');
            }
        })

    }
}