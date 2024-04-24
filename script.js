var loadSplit;

var menuX, menuY;
var menu = document.getElementById("menu");
var menuText = document.getElementById("menu-text");

const powerpointButton = document.getElementById("powerpoint-button");
const wordButton = document.getElementById("word-button");
const excelButton = document.getElementById("excel-button");

const prevBlockButton = document.getElementById("prev-block");
const prevRowButton = document.getElementById("prev-row");
const prevColumnButton = document.getElementById("prev-column");
const prevCanvasButton = document.getElementById("prev-canvas");
const nextBlockButton = document.getElementById("next-block");
const nextRowButton = document.getElementById("next-row");
const nextColumnButton = document.getElementById("next-column");
const nextCanvasButton = document.getElementById("next-canvas");

var Split = function () {
  this.splitElement = document.querySelector(".split");
  this.gridX = 16;
  this.gridY = 10;
  this.width = this.splitElement.offsetWidth;
  this.height = this.splitElement.offsetHeight;
  this.imageSrc = this.splitElement.querySelector("img").getAttribute("src");
  this.delay = 0;
  this.currentActiveDiv = null;

  this.divs = {};

  // Define text for each block
  this.textMappings = {
    // div_0_0: "This is an apple",
    // div_1_0: "My name is Bob",
    // Add more mappings as needed...
  };

  this.createDivs = function () {
    var self = this;
    while (this.splitElement.firstChild) {
      this.splitElement.removeChild(this.splitElement.firstChild);
    }

    for (var x = 0; x < this.gridX; x++) {
      for (var y = 0; y < this.gridY; y++) {
        var width = ((this.width / this.gridX) * 101) / this.width + "%",
          height = ((this.height / this.gridY) * 101) / this.height + "%",
          top = ((this.height / this.gridY) * y * 100) / this.height + "%",
          left = ((this.width / this.gridX) * x * 100) / this.width + "%",
          bgPosX = -((this.width / this.gridX) * x) + "px",
          bgPosY = -((this.height / this.gridY) * y) + "px";

        var div = document.createElement("div");
        div.style.top = top;
        div.style.left = left;
        div.style.width = width;
        div.style.height = height;
        div.style.backgroundImage = "url(" + this.imageSrc + ")";
        div.style.backgroundPosition = bgPosX + " " + bgPosY;
        div.style.backgroundSize = this.width + "px";
        div.style.transitionDelay = x * this.delay + y * this.delay + "s";

        // Set ID for each div in the format "div_x_y"
        var divName = "div_" + x + "_" + y;
        div.setAttribute("id", divName);

        this.divs[divName] = div;

        this.splitElement.appendChild(div);

        div.addEventListener("click", function () {
          self.toggleActive(this);
        });
      }
    }
  };

  this.createDivs();

  this.toggleActive = function (div) {
    if (this.currentActiveDiv !== null && this.currentActiveDiv !== div) {
      this.currentActiveDiv.classList.remove("active");
    }
    this.currentActiveDiv = div;
    div.classList.toggle("active");

    var rect = div.getBoundingClientRect();
    menuX = rect.left + rect.width;
    menuY = rect.top + rect.height;

    if (rect.left + rect.width > this.width - (2 * this.width) / this.gridX) {
      menuX -= 500; //special case for the first two columns from the right
    }

    menu.style.left = menuX + "px";
    menu.style.top = menuY + "px";

    // Update text based on the clicked block's coordinates
    var divName = div.getAttribute("id");
    var newText = this.textMappings[divName] || "";
    var menuText = document.getElementById("menu-text");
    menuText.textContent = newText;

    if (div.classList.contains("active")) {
      menu.style.visibility = "visible";
    } else {
      menu.style.visibility = "hidden";
    }
  };

  this.closeMenu = function () {
    var self = this;
    var closeButton = menu.querySelector(".close");
    closeButton.addEventListener("click", function () {
      menu.style.visibility = "hidden";
      if (self.currentActiveDiv) {
        self.currentActiveDiv.classList.remove("active");
      }
    });
  };

  this.closeMenu();

  this.imageUrls = [
    "powerpoint1.png",
    "powerpoint2.png",
    "powerpoint3.png",
    "powerpoint4.png",
    "powerpoint5.png",
    "powerpoint6.png",
  ];

  // Function to update background image of active div
  this.updateActiveDivBackground = function (direction) {
    var activeDiv = document.querySelector(".active");
    if (activeDiv) {
      var currentImageUrl = activeDiv.style.backgroundImage.split('"')[1];
      var currentIndex = this.imageUrls.indexOf(currentImageUrl);
      var newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % this.imageUrls.length;
      } else if (direction === "prev") {
        newIndex =
          (currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      }

      activeDiv.style.backgroundImage =
        "url('" + this.imageUrls[newIndex] + "')";
    }

    // Function to update entire row to the next or previous version
    this.updateRow = function (direction) {
      var activeDiv = document.querySelector(".active");
      if (activeDiv) {
        var currentRow = activeDiv.id.split("_")[1]; // Get row number from div ID
        var rowDivs = document.querySelectorAll(
          '[id^="div_' + currentRow + '_"]'
        );
        var imageUrls = Array.from(rowDivs, function (div) {
          return div.style.backgroundImage.split('"')[1];
        });
        var isSameUrl = imageUrls.every(function (url) {
          return url === imageUrls[0];
        });

        if (isSameUrl) {
          var currentIndex = loadSplit.imageUrls.indexOf(imageUrls[0]);
          var newIndex;

          if (direction === "next") {
            newIndex = (currentIndex + 1) % loadSplit.imageUrls.length;
          } else if (direction === "prev") {
            newIndex =
              (currentIndex - 1 + loadSplit.imageUrls.length) %
              loadSplit.imageUrls.length;
          }

          rowDivs.forEach(function (div) {
            div.style.backgroundImage =
              "url('" + loadSplit.imageUrls[newIndex] + "')";
          });
        } else {
          var targetIndex;
          if (direction === "next") {
            targetIndex = Math.max.apply(
              null,
              imageUrls.map(function (url) {
                return loadSplit.imageUrls.indexOf(url);
              })
            );
          } else if (direction === "prev") {
            targetIndex = Math.min.apply(
              null,
              imageUrls.map(function (url) {
                return loadSplit.imageUrls.indexOf(url);
              })
            );
          }

          rowDivs.forEach(function (div) {
            div.style.backgroundImage =
              "url('" + loadSplit.imageUrls[targetIndex] + "')";
          });
        }
      }
    };

    // Function to update entire column to the next or previous version
    this.updateColumn = function (direction) {
      var activeDiv = document.querySelector(".active");
      if (activeDiv) {
        var currentColumn = activeDiv.id.split("_")[2]; // Get column number from div ID
        var columnDivs = document.querySelectorAll(
          '[id$="_' + currentColumn + '"]'
        );
        var imageUrls = Array.from(columnDivs, function (div) {
          return div.style.backgroundImage.split('"')[1];
        });
        var isSameUrl = imageUrls.every(function (url) {
          return url === imageUrls[0];
        });

        if (isSameUrl) {
          var currentIndex = loadSplit.imageUrls.indexOf(imageUrls[0]);
          var newIndex;

          if (direction === "next") {
            newIndex = (currentIndex + 1) % loadSplit.imageUrls.length;
          } else if (direction === "prev") {
            newIndex =
              (currentIndex - 1 + loadSplit.imageUrls.length) %
              loadSplit.imageUrls.length;
          }

          columnDivs.forEach(function (div) {
            div.style.backgroundImage =
              "url('" + loadSplit.imageUrls[newIndex] + "')";
          });
        } else {
          var targetIndex;
          if (direction === "next") {
            targetIndex = Math.max.apply(
              null,
              imageUrls.map(function (url) {
                return loadSplit.imageUrls.indexOf(url);
              })
            );
          } else if (direction === "prev") {
            targetIndex = Math.min.apply(
              null,
              imageUrls.map(function (url) {
                return loadSplit.imageUrls.indexOf(url);
              })
            );
          }

          columnDivs.forEach(function (div) {
            div.style.backgroundImage =
              "url('" + loadSplit.imageUrls[targetIndex] + "')";
          });
        }
      }
    };

    // Function to update entire canvas to the next or previous version
    this.updateCanvas = function (direction) {
      var divs = document.querySelectorAll(".split > div");
      var imageUrls = Array.from(divs, function (div) {
        return div.style.backgroundImage.split('"')[1];
      });
      var isSameUrl = imageUrls.every(function (url) {
        return url === imageUrls[0];
      });

      if (isSameUrl) {
        var currentIndex = loadSplit.imageUrls.indexOf(imageUrls[0]);
        var newIndex;

        if (direction === "next") {
          newIndex = (currentIndex + 1) % loadSplit.imageUrls.length;
        } else if (direction === "prev") {
          newIndex =
            (currentIndex - 1 + loadSplit.imageUrls.length) %
            loadSplit.imageUrls.length;
        }

        divs.forEach(function (div) {
          div.style.backgroundImage =
            "url('" + loadSplit.imageUrls[newIndex] + "')";
        });
      } else {
        var targetIndex;
        if (direction === "next") {
          targetIndex = Math.max.apply(
            null,
            imageUrls.map(function (url) {
              return loadSplit.imageUrls.indexOf(url);
            })
          );
        } else if (direction === "prev") {
          targetIndex = Math.min.apply(
            null,
            imageUrls.map(function (url) {
              return loadSplit.imageUrls.indexOf(url);
            })
          );
        }

        divs.forEach(function (div) {
          div.style.backgroundImage =
            "url('" + loadSplit.imageUrls[targetIndex] + "')";
        });
      }
    };

    // Function to check button visibility based on image URL of blocks
    this.checkButtonVisibility = function () {
      var activeDiv = document.querySelector(".active");
      if (activeDiv) {
        var currentImageUrl = activeDiv.style.backgroundImage.split('"')[1];
        var currentIndex = this.imageUrls.indexOf(currentImageUrl);

        // Hide/show previous buttons
        if (currentIndex === -1 || currentIndex === 0) {
          prevBlockButton.style.display = "none";
          prevRowButton.style.display = "none";
          prevColumnButton.style.display = "none";
          prevCanvasButton.style.display = "none";
        } else {
          prevBlockButton.style.display = "block";
          prevRowButton.style.display = "block";
          prevColumnButton.style.display = "block";
          prevCanvasButton.style.display = "block";
        }

        // Hide/show next buttons
        if (currentIndex === -1 || currentIndex === this.imageUrls.length - 1) {
          nextBlockButton.style.display = "none";
          nextRowButton.style.display = "none";
          nextColumnButton.style.display = "none";
          nextCanvasButton.style.display = "none";
        } else {
          nextBlockButton.style.display = "block";
          nextRowButton.style.display = "block";
          nextColumnButton.style.display = "block";
          nextCanvasButton.style.display = "block";
        }
      }
    };
  };
};
window.addEventListener("load", function () {
  loadSplit = new Split();
  console.log("content loaded");
});

prevBlockButton.addEventListener("click", function () {
  loadSplit.updateActiveDivBackground("prev");
  loadSplit.checkButtonVisibility();
});

prevRowButton.addEventListener("click", function () {
  loadSplit.updateRow("prev");
  loadSplit.checkButtonVisibility();
});

prevColumnButton.addEventListener("click", function () {
  loadSplit.updateColumn("prev");
  loadSplit.checkButtonVisibility();
});

prevCanvasButton.addEventListener("click", function () {
  loadSplit.updateCanvas("prev");
  loadSplit.checkButtonVisibility();
});

nextBlockButton.addEventListener("click", function () {
  loadSplit.updateActiveDivBackground("next");
  loadSplit.checkButtonVisibility();
});

nextRowButton.addEventListener("click", function () {
  loadSplit.updateRow("next");
  loadSplit.checkButtonVisibility();
});

nextColumnButton.addEventListener("click", function () {
  loadSplit.updateColumn("next");
  loadSplit.checkButtonVisibility();
});

nextCanvasButton.addEventListener("click", function () {
  loadSplit.updateCanvas("next");
  loadSplit.checkButtonVisibility();
});

//event listener DOMContentloaded = html finishes loading
//event listener load = everything finishes loading (except lazy, lay is not considered

powerpointButton.addEventListener("click", function () {
  wordButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  powerpointButton.classList.add("btn-default");
});

wordButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  wordButton.classList.add("btn-default");
});

excelButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  wordButton.classList.remove("btn-default");
  excelButton.classList.add("btn-default");
});
