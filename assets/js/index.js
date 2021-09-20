// this.I18n = function (defaultLang) {
//     var lang = defaultLang || 'en';
//     this.language = lang;
// }
// this.I18n();
// console.log()
//
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
