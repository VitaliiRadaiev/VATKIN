{
    let portfolioList = document.querySelector('[data-portfolio-list]');
    if(portfolioList) {
        let children = Array.from(portfolioList.children);

        if(portfolioList.dataset.portfolioList === 'all') {
            let elementsNum = 10;
            let count = 1;

            children.forEach((el, index) => {
                if(count == 1) {
                    el.classList.add('one');
                }

                if(count === 2) {
                    el.setAttribute('data-scroll-speed', '0.25');
                }

                if(count === 5 || count === 8) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }

                if(count === 6) {
                    el.setAttribute('data-scroll-speed', '0.1');
                }
                if(count === 10) {
                    el.setAttribute('data-scroll-speed', '0.2');
                }

                el.classList.add(`item-${count++}`);
                if(count > elementsNum) {
                    count = 1;
                }
            })

            children.forEach(el => {
                if(el.classList.contains('one')) {
                    let li = document.createElement('li');
                    li.className = 'list-br';
    
                    el.after(li);
                }
            })
        }

        if(portfolioList.dataset.portfolioList === 'short') {
            let elementsNum = 12;
            let count = 1;

            children.forEach((el, index) => {

                if(count === 4) {
                    el.setAttribute('data-scroll-speed', '0.15');
                }

                if(count === 7 || count === 10) {
                    el.setAttribute('data-scroll-speed', '0.25');
                }

                if(count === 2 || count === 5 || count === 9 || count === 12) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }
                if(count === 6) {
                    el.setAttribute('data-scroll-speed', '0.45');
                }

                count++;
                if(count > elementsNum) {
                    count = 1;
                }
            })
        }

        if(portfolioList.dataset.portfolioList === 'long') {
            let elementsNum = 38;
            let count = 1;

            children.forEach((el) => {
                if(count == 5 || count == 24 || count == 31 || count == 34 || count == 37 || count == 38) {
                    el.classList.add('one');
                }

                if(count === 28) {
                    el.setAttribute('data-scroll-speed', '0.05');
                }

                if(count === 2) {
                    el.setAttribute('data-scroll-speed', '0.1');
                }

                if(count === 20 || count === 26) {
                    el.setAttribute('data-scroll-speed', '0.15');
                }


                if(count === 14 || count === 17 || count === 29 || count === 32) {
                    el.setAttribute('data-scroll-speed', '0.35');
                }
                if(count === 4 || count === 6 || count === 9 || count === 11 || count === 21 || count === 23 || count === 27 || count === 36 || count === 38) {
                    el.setAttribute('data-scroll-speed', '0.45');
                }


                el.classList.add(`item-${count++}`);
                if(count > elementsNum) {
                    count = 1;
                }
            })
    
            children.forEach(el => {
                if(el.classList.contains('one')) {
                    let li = document.createElement('li');
                    li.className = 'list-br';
    
                    el.after(li);
                }
            })
        }
    }
}