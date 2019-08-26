var touchStartX = 0;
var touchStartX = 0;
var touchEndX = 0;
var touchEndY = 0;

var bg = document.querySelector('.fullpage');

const fadeOut = el => {
        el.style.opacity = 1;

        (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                        el.style.display = "none";
                } else {
                        requestAnimationFrame(fade);
                }
        })();
};

const fadeIn = (el, display) => {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .1) > 1)) {
                        el.style.opacity = val;
                        requestAnimationFrame(fade);
                }
        })();
};

let slideData = {
        0: {
                bg_class: "gray",
                slideName: '',
                headColor: 'white',
                className: '.mainSlide'
        },
        1: {
                bg_class: 'lightGray',
                slideName: 'Портфолио',
                headColor: 'black',
                className: '.portfolio'
        },
        2: {
                bg_class: 'gray',
                slideName: 'Услуги',
                headColor: 'white',
                className: '.services'
        },
        3: {
                bg_class: 'lightGray',
                slideName: 'О студии',
                headColor: 'black',
                className: '.aboutUs'
        },
        4: {
                bg_class: "gray",
                slideName: 'Блог',
                headColor: 'white',
                className: '.blog'
        }
};

const bgClass = (bgId, current) => {

        let {
                bg_class,
                slideName,
                headColor,
                className
        } = slideData[bgId];
        let curSlide = document.querySelector(slideData[current].className)
        let nextSldie = document.querySelector(className);
        fadeOut(curSlide)
        setTimeout(() => {

                fadeIn(nextSldie)

        }, 500);

        document.querySelector('header').style.color = headColor;
        document.querySelector('.slideName').innerHTML = slideName;

        document.querySelector('.slide_' + current).classList.remove('active_slide');
        document.querySelector('.slide_' + bgId).classList.add('active_slide');

        bg.classList.remove(bg.classList[1]);
        bg.classList.add(bg_class);
}

window.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
}, false);

window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleGesure();
})

const handleGesure = () => {
        let bgId = parseInt(bg.id);
        if (touchEndY < touchStartX) {
                if (bgId < 4) {
                        let nextBg = bgId + 1;
                        bgClass(nextBg, bgId);
                        bg.id = nextBg;
                }
        }
        if (touchEndY > touchStartX) {
                if (bgId > 0) {
                        let nextBg = bgId - 1;
                        bgClass(nextBg, bgId);
                        bg.id = nextBg;
                }
        }
}

document.querySelector('.portfolioWrapper').addEventListener("wheel", event => {

})

// let portfolioWrapper = document.querySelector(".portfolioWrapper");
// portfolioWrapper.mouseIsOver = false;
// portfolioWrapper.onmouseover = () => {
//         portfolioWrapper.mouseIsOver = true;
// };
// portfolioWrapper.onmouseout = () =>  {
//         portfolioWrapper.mouseIsOver = false;
// };

document.querySelector('.fullpage').addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        let bgId = parseInt(bg.id);

        if (delta == 1) {
                if (bgId < 4) {
                        let nextBg = bgId + 1;
                        bgClass(nextBg, bgId);
                        bg.id = nextBg;
                }
        } else {
                if (bgId > 0) {
                        let nextBg = bgId - 1;
                        bgClass(nextBg, bgId);
                        bg.id = nextBg;
                }
        }

});

{
        const slider = document.querySelector('.portfolioWrapper');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
        });
}