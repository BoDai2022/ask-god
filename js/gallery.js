/**
 * Open modal for the gallery when users click on pictures.
 * @param {Element} element 
 * @param {int} imageIndex
 */
function openModal(element, imageIndex) {
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");

    modal.style.display = "block";
    let low_src = element.children[0].src
    // modalImg.src = low_src.split(".")[0] + "_large." + low_src.split(".")[1];
    modalImg.src = low_src.replace(".png","_large.png")
    // console.log(modalImg.src)
    captionText.innerHTML = element.children[0].alt;
    imageIndex = imageIndex;
    console.log(imageIndex)
}
/**
 * close the Modal
 */
function closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}

let imageIndex = 1;
// showImages(imageIndex);

// Next/previous controls
function changeImage(n) {
    showImages(imageIndex += n);
    console.log(imageIndex)
}
/**
 * change the image according to selection
 * @param {int} n 
 */
function showImages(n) {
    let images = document.querySelectorAll(".gallery .img-wrap img"); // Select all images inside .img-wrap
    if (n > images.length) { imageIndex = 1 }
    if (n < 1) { imageIndex = images.length }
    console.log(imageIndex-1)
    console.log(images[imageIndex - 1])
    if(typeof images[imageIndex - 1] == "undefined"){
        return;
    }
    // Show the current image in the modal
    let modalImage = document.querySelector(".modal-content");
    low_src = images[imageIndex - 1].src;
    modalImage.src = low_src.replace(".png","_large.png")
    document.getElementById("caption").innerHTML = images[imageIndex - 1].alt;

}
