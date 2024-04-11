/**
 * Let the Navi bar show which page the user is visitiong
 */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.navigation a');
  const currentUrl = window.location.href;
  // console.log(currentUrl);
  navLinks.forEach(link => {
    console.log(link.href);
    if (link.href === currentUrl) {
      link.classList.add('active');
    }else{
      link.classList.remove('active');
    }
  });
});
