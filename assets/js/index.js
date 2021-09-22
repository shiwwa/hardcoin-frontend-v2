

var state = 'close';
var sidebar = document.querySelector('.sidebar');
var link = document.querySelectorAll('.menu-link');
function init() {
    link.forEach(function(el){
        el.addEventListener('click', function (e) {
            closeSidebar();
        })
    });
    window.addEventListener('scroll', function(e) {
        closeSidebar();
    })

    var lastTouch = null
    var target = document.querySelector('.scrollable');
    window.addEventListener('touchstart', function (event) {
        lastTouch = event.touches[0]
    })

    window.addEventListener('touchend', function (event) {
        lastTouch = null
    })

    window.addEventListener('touchmove', function (event) {
        var currentTouch = event.changedTouches[0]

        if (lastTouch) {
            target.scrollLeft += currentTouch.clientX - lastTouch.clientX
        }

        lastTouch = currentTouch
    })

}
function changeStyle() {
    if(state === 'close') {
        state = 'open';
        sidebar.style.display = 'block'
    } else {
        closeSidebar();
    }
}

function closeSidebar() {
    state = 'close';
    sidebar.style.display = 'none'
}
init();
