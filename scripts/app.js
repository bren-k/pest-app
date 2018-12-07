// alternative to DOMContentLoaded
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}

////////////////////////////////// initApplication() function //////////////////////////////////

function initApplication() {
    const sectionHeading = document.getElementById("section-heading");

    /* slide in left side menu */
    const menuLeft = document.getElementById("side-menu-s1");
    const showLeftMenu = document.getElementById("showLeft");

    showLeftMenu.addEventListener("click", function() {
        classie.toggle( this, "active" );
        classie.toggle( menuLeft, "side-menu-open" );
    });

    /* load map image into canvas */
    const dummy_image = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Maps.me_screenshot_7.0.5.png";

    const mapPath = "../maps/";
    let canvas = document.getElementById("map-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext("2d");
    //store currently loaded image so that we can redraw it when dragging marker
    let loadedImageObj;
    //initialise our drag object
    let dragObj = { x: 50, y: 50, w: 70, h: 70 };

    /* add events to buttons */
    document.querySelectorAll("#repositories button").forEach( function(element) {
        const fileName = element.getAttribute("data-image-file");
        element.addEventListener("click", function() {
            let imageObj = new Image();
            //console.log(mapPath+fileName);
            imageObj.addEventListener("load", function() {
                //context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
                drawOnCanvas(context, imageObj, dragObj);
            }, false);
            //imageObj.src = mapPath+fileName;
            imageObj.src = dummy_image;
            document.getElementById("display-map").scrollIntoView();
            sectionHeading.textContent = "Record Location";
            loadedImageObj = imageObj;
            //context.fillStyle = 'blue';
            //draw our object in its new position
            //context.fillRect(dragObj.x, dragObj.y, dragObj.w, dragObj.h);
            //draw();
        });
    });

    /* drag and drop functionality */
    //add eventlistener to canvas
    canvas.addEventListener("touchmove", function () {
        //assume only one touch/only process one touch even if there's more
        let touch = event.targetTouches[0];

        //is touch close enough to our object?
        if (detectHit(dragObj.x, dragObj.y, touch.pageX, touch.pageY, dragObj.w, dragObj.h)) {
            //assign new coordinates to our object
            dragObj.x = touch.pageX;
            dragObj.y = touch.pageY;
            //redraw the canvas
            drawOnCanvas(context, loadedImageObj, dragObj);
        }
        event.preventDefault();
    }, false);

    function detectHit(x1, y1, x2, y2, w, h) {
        //very simple detection here
        if (x2 - x1 > w) return false;
        if (y2 - y1 > h) return false;
        return true;
    }

    function drawOnCanvas(ctx, image, obj) {
        console.log(obj);
        //clear the current canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //redraw the image
        //ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = "blue";
        //redraw our object in its new position
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* camera and preview functionality */
    let photo_input = document.getElementById("pest_photo");
    let photo_preview = document.getElementById("preview");


    photo_input.addEventListener("change", displayPreview);

    function displayPreview() {
        //remove existing preview (if any)
        if (photo_preview.firstChild) {
            photo_preview.removeChild(photo_preview.firstChild);
        }

        let curFiles = photo_input.files;
        if(curFiles.length === 0) {
            photo_preview.textContent = "No Photo";
        } 
        else {
            photo_preview.textContent = "";
            if(validFileType(curFiles[0])) {
                console.log("File name " + curFiles[0].name + ", file size " + returnFileSize(curFiles[0].size));
                let image = document.createElement("img");
                image.src = window.URL.createObjectURL(curFiles[0]);

                photo_preview.appendChild(image);
            } 
            else {
                console.log("File name " + curFiles[0].name + ": Not a valid file type.");
            }
        }
    }//end displayPreview() function

const fileTypes = [
  "image/jpeg",
  "image/png"
]

function validFileType(file) {
  for(let i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + "bytes";
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + "KB";
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + "MB";
  }
}
    

}//end initApplication() function
