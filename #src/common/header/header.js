{
    let header = document.querySelector('[data-header]');
    if(header) {
        if(header.classList.contains('header--dark')) {
            document.body.classList.add('logo-white');
            document.querySelector('.main-logo').classList.add('cursor-light');
        }
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
            header.classList.toggle('cursor-light', window.pageYOffset <= 50);
            document.body.classList.toggle('header-is-scroll', window.pageYOffset > 50);
            document.querySelector('.main-logo').classList.toggle('cursor-light', window.pageYOffset <= 50);
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
            })
        })

        buttonsCloseMenu.forEach(btn => {
            btn.addEventListener('click', () => {
                menu.classList.remove('menu--open');
                document.documentElement.classList.remove('overflow-hidden');
            })
        })
    }
}