// When the user scrolls the page, execute myFunction 
window.onscroll = function () { myFunction() };


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    // Get the header
    var header = document.getElementById("header");
    // console.log("header:", header);

    if (!header) {
        return;
    }

    // Get the offset position of the navbar
    // var sticky = header.offsetTop;


    if (window.pageYOffset > 390) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky");
    }
}
