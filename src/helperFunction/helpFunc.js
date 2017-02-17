window.onload = (function () {
    footerDown();
    btnUp();
});
window.onresize = function () {
    footerDown();
};

function footerDown() {
    let headerHeight =  document.getElementsByClassName("header")[0].offsetHeight;
    let footerHeight =  document.getElementsByClassName("footer")[0].offsetHeight;
    let window =  document.documentElement.clientHeight;
    let h = window - (headerHeight + footerHeight);
    document.getElementsByClassName("mainContent")[0].style.minHeight = h + 'px';
}
function btnUp() {
    let btn = document.querySelector('.btnUp');
    btn.addEventListener('click', toTop)
    function toTop() {
        let timer = setInterval( () => {
            if (document.body.scrollTop >0){
                window.scrollBy(0, -25);
            }
            else {
                clearInterval(timer);
            }
        }, 5);
    }
    window.onscroll = () => {
        if (document.body.scrollTop > 300){
            btn.style.display = 'block';
        }
        else {
            btn.style.display = 'none';
        }
    };
}
