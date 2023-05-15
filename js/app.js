let isAnimating = false;

let xDown = null;
let yDown = null;

const bg = document.querySelector('.fullpage');

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
        el.style.display = display || "flex";

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
        // 3: {
        //         bg_class: 'lightGray',
        //         slideName: 'О студии',
        //         headColor: 'black',
        //         className: '.aboutUs'
        // },
        3: {
                bg_class: "gray",
                slideName: 'Блог',
                headColor: 'white',
                className: '.blog'
        },
        4: {
                bg_class: 'lightGray',
                slideName: 'Контакты',
                headColor: 'black',
                className: '.contacts'
        }
};

const portfolio = () => {
        document.querySelector('.portfolioWrapper').style.width = parseInt(document.querySelector('.slide_content').clientWidth / 372) * 372 + 'px';
        
}

portfolio()

const bgClass = (bgId, current) => {
        isAnimating = true;
        let {
                bg_class,
                slideName,
                headColor,
                className
        } = slideData[bgId];
        let curSlide = document.querySelector(slideData[current].className)
        let nextSldie = document.querySelector(className);

        if (className == '.mainSlide') {
                fadeOut(document.querySelector('.progressBar'));
        } else {
                fadeIn(document.querySelector('.progressBar'));
        }

        curSlide.classList.remove('activeSlide');
        nextSldie.classList.add('activeSlide');
        
        fadeOut(curSlide)
        setTimeout(() => {
                fadeIn(nextSldie);
        }, 1000);

        setTimeout(() => {
                isAnimating = false;
        }, 1300);

        document.querySelector('header').style.color = headColor;
        document.querySelectorAll('.menu path').forEach(el => {
                el.style.fill = headColor;
        })
        document.querySelector('.slideName').innerHTML = slideName;

        document.querySelector('.slide_' + current).classList.remove('active_slide');
        document.querySelector('.slide_' + bgId).classList.add('active_slide');

        bg.classList.remove(bg.classList[1]);
        bg.classList.add(bg_class);
}

const handleTouchStart = evt => {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
};

const handleTouchMove = evt => {
        if (!xDown || !yDown) return
        if (isAnimating) return
        let bgId = parseInt(bg.id);
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) < Math.abs(yDiff)) {
                if (yDiff > 0) {
                        if (bgId < Object.keys(slideData).length) {
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
        }
        xDown = null;
        yDown = null;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);


document.querySelector('.fullpage').addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        let bgId = parseInt(bg.id);
        if (isAnimating) return;
        if (delta == 1) {
                if (bgId < Object.keys(slideData).length) {
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

let aboutUs = document.querySelectorAll('.headings li');

aboutUs.forEach(el => {
        el.addEventListener('click', () => {
                let active = document.querySelector("#" + document.querySelector('.active_description').id);
                let next = document.querySelector("#" + el.classList[0]);
                active.classList.remove('active_description');
                next.classList.add('active_description');
                document.querySelector('.' + el.classList[0]).classList.add('active_heading');
                document.querySelector('.' + active.id).classList.remove('active_heading');
                fadeOut(active);
                active.style.display = "none";
                setTimeout(() => {
                        fadeIn(next);
                }, 500);
        })
})

const listCount = document.querySelectorAll('.slides_counter li');

listCount.forEach(el => {
        el.addEventListener('click', () => {
                if (el.classList[1] != undefined || isAnimating) return;
                let current = document.querySelector('.fullpage');
                bgClass(parseInt(el.classList[0][6]), parseInt(current.id));
                current.id = parseInt(el.classList[0][6]);
        })
});

const input = document.querySelectorAll('.input2');

input.forEach(el => {
        el.addEventListener('blur', () => {
                if (el.value != '') {
                        el.classList.add('has-val')
                } else {
                        el.classList.remove('has-val')
                }
        })
})
















// let portfolioWrapper = document.querySelector(".portfolioWrapper");
// portfolioWrapper.mouseIsOver = false;
// portfolioWrapper.onmouseover = () => {
//         portfolioWrapper.mouseIsOver = true;
// };
// portfolioWrapper.onmouseout = () =>  {
//         portfolioWrapper.mouseIsOver = false;
// };