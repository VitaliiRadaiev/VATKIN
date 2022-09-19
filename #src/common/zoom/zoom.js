{
    let zoomContainer = document.querySelector('[data-zoom]');
    if (zoomContainer) {
        let cursor = zoomContainer.querySelector('.zoom__cursor');
        let zoomZone = zoomContainer.querySelector('[data-zoom-zone]');

        function moveAt(pageX, pageY) {
            cursor.style.left = pageX - cursor.offsetWidth / 2 + 'px';
            cursor.style.top = pageY - cursor.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        zoomContainer.addEventListener('mouseenter', () => {
            cursor.classList.add('d-block');
        })
        zoomContainer.addEventListener('mouseleave', () => {
            cursor.classList.remove('d-block');
        })

        zoomContainer.addEventListener('click', (e) => {
            if(zoomContainer.classList.contains('zoom-show')) {
                zoomContainer.classList.remove('zoom-show');
            } else {
                setZoomPosition(e);
            }
        })
        zoomContainer.addEventListener('mousemove', (e) => {
            if(zoomContainer.classList.contains('zoom-show')) {
                setZoomPosition(e);
            }
        })

        function setZoomPosition(e) {
            zoomContainer.classList.add('zoom-show');
            let width = zoomContainer.offsetWidth;
            let height = zoomContainer.offsetHeight;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;

            let bgPosX = (mouseX / width * 100);
            let bgPosY = (mouseY / height * 100);

            zoomZone.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
        }
    }
}