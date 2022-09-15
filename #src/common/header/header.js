{
    let menu = document.querySelector('[data-menu]');
    if(menu) {
        console.log(menu);
        let buttonsOpenMenu = document.querySelectorAll('[data-action="open-menu"]');
        let buttonsCloseMenu = document.querySelectorAll('[data-action="close-menu"]');

        buttonsOpenMenu.forEach(btn => {
            console.log(btn);
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