// alternative to DOMContentLoaded
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}

function initApplication() {
    const sectionHeading = document.getElementById("section-heading");

    /* slide in left side menu */
    const menuLeft = document.getElementById("side-menu-s1");
    const showLeftMenu = document.getElementById("showLeft");

    showLeftMenu.addEventListener("click", function() {
        classie.toggle( this, 'active' );
        classie.toggle( menuLeft, 'side-menu-open' );
    });

    /* load imagemap into canvas */
    const mapPath = "../maps/";
    const canvas = document.getElementById('map-canvas');
    const context = canvas.getContext('2d');


    document.querySelectorAll("#repositories button").forEach( function(element) {
        let attribute = element.getAttribute("data-image-file");
        element.addEventListener("click", function() {
            let imageObj = new Image();
            console.log(mapPath+attribute);
            imageObj.src = mapPath+attribute;
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
              };
            document.getElementById("display-map").scrollIntoView();
            sectionHeading.textContent = "Record Location";
        });
    });
    

}//end initApplication() function
