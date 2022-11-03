let paintingPreview = document.querySelector('[data-painting-preview]');
if (paintingPreview) {

    let myPanel = paintingPreview.querySelector('.painting-preview__wrap');
    let subpanel = paintingPreview.querySelector('.painting-preview__body');
    let parent = paintingPreview;
    let title = paintingPreview.querySelector('.painting-preview__title');

    myPanel.onmousemove = transformPanel;
    myPanel.onmouseenter = handleMouseEnter;
    myPanel.onmouseleave = handleMouseLeave;

    let mouseX, mouseY;

    let transformAmount = 2;

    function transformPanel(mouseEvent) {
        mouseX = mouseEvent.pageX;
        mouseY = mouseEvent.pageY;

        const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
        const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

        const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
        const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

        //subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
        gsap.to(subpanel, 1, {
            transformPerspective: 400,
            rotateY: percentX * transformAmount,
            rotateX: percentY * transformAmount,
        });
    }

    function handleMouseEnter() {
        parent.classList.add('hover');

        setTimeout(() => {
            subpanel.style.transition = "";
        }, 100);
        //subpanel.style.transition = "transform 0.1s";
    }

    function handleMouseLeave() {
        parent.classList.remove('hover');
        //subpanel.style.transition = "transform 0.1s";
        setTimeout(() => {
            subpanel.style.transition = "";
        }, 100);

        //subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
        gsap.to(subpanel, 1, {
            transformPerspective: 400,
            rotateY: 0,
            rotateX: 0,
        });
    }

    const setMinHeightByTitle = () => {
        if(document.documentElement.clientWidth > 767.98) {
            paintingPreview.style.minHeight = `calc(${title.clientHeight}px + 10rem)`;
        } else {
            paintingPreview.removeAttribute('style');
        }
    }

    let id = setInterval(() => {
        setMinHeightByTitle();
    },20)
    setTimeout(() => {
        clearInterval(id);
    },1000);

    window.addEventListener('resize', setMinHeightByTitle);
}