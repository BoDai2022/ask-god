function openModal(element) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    let low_src = element.children[0].src
    modalImg.src = low_src.split(".")[0] + "_large." + low_src.split(".")[1];
    // console.log(modalImg.src)
    captionText.innerHTML = element.children[0].alt;
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

var imageIndex = 1;
showImages(imageIndex);

// Next/previous controls
function changeImage(n) {
    showImages(imageIndex += n);
}

function showImages(n) {
    var i;
    var images = document.querySelectorAll(".gallery .img-wrap img"); // Select all images inside .img-wrap
    if (n > images.length) { imageIndex = 1 }
    if (n < 1) { imageIndex = images.length }

    // Show the current image in the modal
    var modalImage = document.querySelector(".modal-content");
    low_src = images[imageIndex - 1].src;
    modalImage.src = low_src.split(".")[0] + "_large." + low_src.split(".")[1];
}
