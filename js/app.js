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
        }
};

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
        fadeOut(curSlide)
        setTimeout(() => {
                fadeIn(nextSldie)
        }, 500);

        setTimeout(() => {
                isAnimating = false;
        }, 1000);

        document.querySelector('header').style.color = headColor;
        document.querySelector('.slideName').innerHTML = slideName;

        document.querySelector('.slide_' + current).classList.remove('active_slide');
        document.querySelector('.slide_' + bgId).classList.add('active_slide');

        bg.classList.remove(bg.classList[1]);
        bg.classList.add(bg_class);
}

let isAnimating = false;

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
const jellyClick = document.querySelector('canvas').addEventListener('click', () => {
        requestAnimationFrame(animate);  
})

document.querySelector('.fullpage').addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        let bgId = parseInt(bg.id);
        if (isAnimating) return;
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


var jelly=document.getElementById("jelly");
var ctx=jelly.getContext("2d");
var cw=jelly.width;
var ch=jelly.height;

var duration=0.5;

// starting and ending colors
var rgbStart='#6F787A';
var rgbEnd='#2b2b2b';
// calculate the # of frames that requestAnimationFrame can
// draw during the duration
var opacitySteps=parseInt(60*duration);
// set the current opacity step at its starting number (0)
var opacityStep=0;

// start the 2.5 second animation
requestAnimationFrame(animate);


function animate(time){

  // calculate the current opacity as a percentage
  //     of opacityStep/opacitySteps
  var opacity=100*(opacityStep/opacitySteps);
  if(opacityStep>=opacitySteps-1){ opacity=100; }

  // clear the canvas
  ctx.clearRect(0,0,cw,ch);

  // draw with the starting color using a lessening opacity
  ctx.globalAlpha=(100-opacity)/100;
  ctx.fillStyle=rgbStart;
  ctx.fillRect(20,20,100,75);
  ctx.strokeRect(20,20,100,75);

  // draw with the ending color using a increasing opacity
  ctx.globalAlpha=(opacity)/100;
  ctx.fillStyle=rgbEnd;
  ctx.fillRect(20,20,100,75);
  ctx.strokeRect(20,20,100,75);

  // clean up, reset globalAlpha to it's default of 1.00
  ctx.globalAlpha=1.00;

  // return if all steps have been played
  if(++opacityStep>=opacitySteps){return;}

  // otherwise request another frame
  requestAnimationFrame(animate);
}