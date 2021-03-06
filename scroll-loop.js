var doc = window.document,
context = doc.querySelector('.js-loop'),
clones = context.querySelectorAll('.is-clone'),
disableScroll = false,
scrollHeight = 0,
scrollPos = 0,
clonesHeight = 0,
i = 0;
isScrollBehaviourSupported = 'scrollBehavior' in doc.documentElement.style;


if(!isScrollBehaviourSupported) {
    // if scrollBehaviour is not supported, then don't show the clones
    clones.forEach(function(element){
        element.style.display = "none";
    });
    document.getElementById('last-tile').style.paddingBottom = "15%"
}

function getScrollPos() {
    return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
    if(isScrollBehaviourSupported) {
    // if scrollBehaviour is not supported, then don't execute scroll loop  
    context.scroll({top: pos, left: 0, behavior: 'auto'});
}
}

function getClonesHeight() {
    clonesHeight = 0;

    for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
    }

    return clonesHeight;
}

function reCalc() {
    scrollPos = getScrollPos();
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();

    if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
}


function scrollUpdate() {
    if (!disableScroll) {
    scrollPos = getScrollPos();

    if (isScrollBehaviourSupported && (clonesHeight + scrollPos) >= scrollHeight) {
        // Scroll to the top when you’ve reached the bottom
        setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
        disableScroll = true;
    } else if (isScrollBehaviourSupported && scrollPos <= 0) {
        // Scroll to the bottom when you reach the top
        setScrollPos(scrollHeight - clonesHeight);
        disableScroll = true;
    }
    }

    if (isScrollBehaviourSupported && disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
        disableScroll = false;
    }, 100);
    }
}

function init() {
    reCalc();

    context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
    }, false);
}

if (document.readyState !== 'loading') {
    init();
} else {
    doc.addEventListener('DOMContentLoaded', init, false);
}

//Center the middle block on page load
window.onload = function () {
    setScrollPos(Math.round(clones[0].getBoundingClientRect().top + getScrollPos() - (context.offsetHeight - clones[0].offsetHeight) / 4));
};