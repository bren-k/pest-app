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

    let photo_input = document.getElementById("pest_photo");
    let photo_preview = document.qgetElementById("preview");


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
                //para.textContent = 'File name ' + curFiles[0].name + ', file size ' + returnFileSize(curFiles[0].size) + '.';
                var image = document.createElement("img");
                image.src = window.URL.createObjectURL(curFiles[0]);

                photo_preview.appendChild(image);
            } 
            else {
                console.log("File name " + curFiles[0].name + ": Not a valid file type.");
            }
        }
    }//end displayPreview() function

let fileTypes = [
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
