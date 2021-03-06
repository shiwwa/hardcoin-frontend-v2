

var state = 'close';
var sidebar = document.querySelector('.sidebar');
var link = document.querySelectorAll('.menu-link');
// var whitepaperPopup = document.querySelector('.whitepaper-popup');
var subscribePopup = document.querySelector('.subscribe-popup');

function init() {
    link.forEach(function(el){
        el.addEventListener('click', function (e) {
            closeSidebar();
        })
    });
    window.addEventListener('scroll', function(e) {
        closeSidebar();
    })
    window.addEventListener('click', function(e) {
        closeSidebar();
    })

    // if(!localStorage.getItem('isWhitepaper')) {
    //     whitepaperPopup.style.display = 'flex';
    // }

}

init();

function isMenu(event) {
    event.stopPropagation();
    if(state === 'close') {
        state = 'open';
        sidebar.style.display = 'block';
    } else {
        closeSidebar();
    }
}

function eventStop (event) {
    event.stopPropagation();
}

function closeSidebar() {
    state = 'close';
    sidebar.style.display = 'none';
}

// function closeWhitepaperPopup() {
//     localStorage.setItem('isWhitepaper', 'true');
//     whitepaperPopup.style.display = 'none';
// }

function closeSuscbribePopup() {
    subscribePopup.style.display = 'none';
}

function sendEmail() {
    var error = document.querySelector('.error');
    var email = document.getElementById('email');
    var regex = /\S+@\S+\.\S+/;

    if(!email.value.length || (email.value.length && !regex.test(email.value))) {
       error.style.display = 'block';
    } else {
        error.style.display = 'none'
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://api-hardcoin.ml/v1/mail', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({mail: email.value}))
        subscribePopup.style.display = 'flex';
        email.value = '';
    }
}
