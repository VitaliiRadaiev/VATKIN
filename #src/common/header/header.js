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
}