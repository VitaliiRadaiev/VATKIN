{
    let dataExhibition = document.querySelector('[data-exhibition]');
    if(dataExhibition) {
        let listItems = dataExhibition.querySelectorAll('[data-exhibition-img]');
        if(listItems.length) {
            listItems.forEach(item => {
                let parentRow = item.closest('.exhibition__row');
                let imgWrap = document.createElement('div');
                imgWrap.className = 'exhibition__preview-img';
                imgWrap.innerHTML = `<img src="${item.dataset.exhibitionImg}" alt="">`
                item.append(imgWrap);


                item.addEventListener('mouseenter', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        item.classList.add('show-img');

                        listItems.forEach(i => {
                            if(i === item) return;
                            i.classList.remove('show-img');
                        })
                    }
                })

                parentRow.addEventListener('mouseleave', () => {
                    if(document.documentElement.clientWidth >= 992) {
                        listItems.forEach(i => {
                            i.classList.remove('show-img');
                        })
                    }
                })
            })
        }
    }
}