var touchStartX = 0;
var touchStartX = 0;
var touchEndX = 0;
var touchEndY = 0;

const bg = document.querySelector('.fullpage');
const portfolio = document.querySelector('.portfolioWrapper');
const blog = document.querySelector('.blogWrapper')

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
        },
        5 : {
                bg_class : 'lightGray',
                slideName : 'Контакты',
                headColor : 'black',
                className : '.contacts'
        }
};

const bgClass = (bgId, current) => {
        console.log(bgId, current)
        isAnimating = true;
        let {
                bg_class,
                slideName,
                headColor,
                className
        } = slideData[bgId];
        let curSlide = document.querySelector(slideData[current].className)
        let nextSldie = document.querySelector(className);
        curSlide.classList.remove('activeSlide')
        nextSldie.classList.add('activeSlide')
        fadeOut(curSlide)
        setTimeout(() => {
                fadeIn(nextSldie)
        }, 1000);

        setTimeout(() => {
                isAnimating = false;
        }, 1300);

        document.querySelector('header').style.color = headColor;
        document.querySelector('.slideName').innerHTML = slideName;

        document.querySelector('.slide_' + current).classList.remove('active_slide');
        document.querySelector('.slide_' + bgId).classList.add('active_slide');

        bg.classList.remove(bg.classList[1]);
        bg.classList.add(bg_class);
}

let isAnimating = false;

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;  

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}; 

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    let bgId = parseInt(bg.id);                                    
    var yUp = evt.touches[0].clientY;
    var yDiff = yDown - yUp;


        if ( yDiff > 0 ) {
        /* up swipe */ 
        if (bgId < 5) {
                console.log('up')
                let nextBg = bgId + 1;
                bgClass(nextBg, bgId);
                bg.id = nextBg;
        }
        } else { 
        /* down swipe */
        if (bgId > 0) {
                let nextBg = bgId - 1;
                bgClass(nextBg, bgId);
                bg.id = nextBg;
        }
        }      
        
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

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
        if (isAnimating) return;
        if (delta == 1) {
                if (bgId < 5) {
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
                console.log(el.classList[0])
                let active = document.querySelector("#" + document.querySelector('.active_description').id)
                let next = document.querySelector("#" + el.classList[0])
                active.classList.remove('active_description')
                next.classList.add('active_description')
                console.log(active.id)
                fadeOut(active)
                active.style.display = "none";
                setTimeout(() => {
                        fadeIn(next)
                }, 500);
        })
})

const slideChanger = slider => {
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

slideChanger(portfolio);
slideChanger(blog)

const listCount = document.querySelectorAll('.slides_counter li');

listCount.forEach(el => {
        el.addEventListener('click', () => {
                if (el.classList[1] != undefined) return;
                let current = document.querySelector('.fullpage')
                bgClass(parseInt(el.classList[0][6]), parseInt(current.id))
                current.id = parseInt(el.classList[0][6]);
        })
});

const input = document.querySelectorAll('.input2')

input.forEach(el => {
    el.addEventListener('blur', () => {
            console.log(el.value);
            
        if (el.value != '') {
            el.classList.add('has-val')
        } else {
            el.classList.remove('has-val')
        }
    })
})