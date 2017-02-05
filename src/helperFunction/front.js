window.onload = (function () {
    footerDown();
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
