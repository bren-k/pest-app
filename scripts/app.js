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
    
    /* camera */
    // Set constraints for the video stream
    var constraints = { video: { facingMode: "environment" }, audio: false }; //"user" for front camera
    // Define constants
    const camera = document.querySelector("#camera"),
        cameraView = document.querySelector("#camera--view"),
        cameraOutput = document.querySelector("#camera--output"),
        cameraSensor = document.querySelector("#camera--sensor"),
        cameraTrigger = document.querySelector("#camera--trigger");

    // Access the device camera and stream  the video to cameraView
    function cameraStart() {
        camera.style.display = "block";
        camera.scrollIntoView();
        sectionHeading.textContent = "Take Photo";
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
            //track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
    };

    // Take a picture when cameraTrigger is tapped
    cameraTrigger.addEventListener("click", function() {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");
    });

    // Start the video stream when the camera icon is clicked
    const cameraIcon = document.getElementById('camera-icon');
    cameraIcon.addEventListener("click", cameraStart, false);

}//end initApplication() function
