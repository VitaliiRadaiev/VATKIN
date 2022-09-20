{
    let dataExhibition = document.querySelector('[data-exhibition]');
    if(dataExhibition) {
        let listItems = dataExhibition.querySelectorAll('[data-exhibition-img]');
        if(listItems.length) {
            listItems.forEach(item => {
                let parentRow = item.closest('.exhibition__row');
                let imgWrap = parentRow.querySelector('.exhibition__preview-img');

                item.addEventListener('mouseenter', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        imgWrap.innerHTML = `<img src="${item.dataset.exhibitionImg}" alt="">`
                    }
                })

                parentRow.addEventListener('mouseleave', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        imgWrap.innerHTML = '';
                    }
                })
            })
        }
    }
}