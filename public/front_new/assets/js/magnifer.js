

const someFunctiontocall = () => {
  let imageTags = document.querySelectorAll("img.magnify-image");

  imageTags.forEach(function (img) {
      magnify(img, 3); // Pass the image element directly instead of id

      img.addEventListener("mouseenter", function (e) {
          e.preventDefault();
          var glass = img.parentElement.querySelector(".img-magnifier-glass");
          if (glass) {
              glass.style.display = "block";
          }
      });

      img.addEventListener("mouseleave", function (e) {
          e.preventDefault();
          var glass = img.parentElement.querySelector(".img-magnifier-glass");
          if (glass) {
              glass.style.display = "none";
          }
      });
  });
}

function changeImageOnClick(newSrc){
  document.querySelector("#mainImage").src = newSrc;
  console.log({newSrc})
  someFunctiontocall()
}


function func(){
//   console.log("Ran")
someFunctiontocall()
}
setInterval(func,10000)


document.addEventListener("DOMContentLoaded", function () {
  someFunctiontocall()
});

// Define the magnify function
function magnify(img, zoom) {
  if (!img) {
      console.error("Image element not found.");
      return;
  }

  var imgParent = img.parentElement;
  if (!imgParent) {
      console.error("Parent element of image not found.");
      return;
  }

  // Check and remove existing magnifier glass if present
  var existingGlass = imgParent.querySelector(".img-magnifier-glass");
  if (existingGlass) {
      imgParent.removeChild(existingGlass);
  }

  // Create and set up the new magnifying glass
  var glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  glass.style.display = "none"; // Initially hidden
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = img.width * zoom + "px " + img.height * zoom + "px";
  imgParent.insertBefore(glass, img);

  var bw = 3; // border width for the magnifying glass effect
  var w = glass.offsetWidth / 2;
  var h = glass.offsetHeight / 2;

  img.addEventListener("mouseenter", function (e) {
      e.preventDefault();
      glass.style.display = "block";
  });

  img.addEventListener("mousemove", function (e) {
      e.preventDefault();
      moveMagnifier(e);
  });
  glass.addEventListener("mousemove", function (e) {
      e.preventDefault();
      moveMagnifier(e);
  });

  glass.addEventListener("mouseleave", function (e) {
      e.preventDefault();
      glass.style.display = "none";
  });

  function moveMagnifier(e) {
      e.preventDefault();
      glass.style.display = "block";

      var pos = getCursorPos(e);
      var x = pos.x;
      var y = pos.y;

      if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
      }
      if (x < w / zoom) {
          x = w / zoom;
      }
      if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
      }
      if (y < h / zoom) {
          y = h / zoom;
      }

      glass.style.left = x - w + "px";
      glass.style.top = y - h + "px";
      glass.style.backgroundPosition = "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
  }

  function getCursorPos(e) {
      e.preventDefault();
      var a,
          x = 0,
          y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
  }
} 