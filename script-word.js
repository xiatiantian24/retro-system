var loadSplit;

var menuX, menuY;
var menu = document.getElementById("menu");
var menuText = document.getElementById("menu-text");
var currentUrlIndex = 0;

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

  // Function to handle block activation
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
      menuX -= 550; //special case for the first two columns from the right
    }

    menu.style.left = menuX + "px";
    menu.style.top = menuY + "px";

    // Get the URL index of the active div and update the global variable
    currentUrlIndex = parseInt(div.dataset.urlIndex) || 0;

    // Update menu text based on the URL index
    this.updateMenuText(currentUrlIndex);

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
    "word1.png",
    "word2.png",
    "powerpoint3.png",
    "powerpoint4.png",
    "powerpoint5.png",
    "powerpoint6.png",
    "powerpoint7.png",
    "powerpoint8.png",
  ];

  this.updateMenuText = function (index) {
    var menuText = document.getElementById("menu-text");
    if (index === 0) {
      menuText.innerHTML =
        "<span style='font-weight: bold;'>November 1984: </span> <br> PowerPoint 1.0 (Macintosh) <br> <br> <span style='font-weight: bold;'>Major updates: </span> The first 10.000 copies of the first version of PowerPoint for Macintosh shipped from manufacturing by Forethought Inc. It had a black-and-white user interface and 9 menus.";
    } else if (index === 1) {
      menuText.innerHTML =
        "<span style='font-weight: bold;'>May 1990: </span> <br> First Windows version of PowerPoint  <br> <br> <span style='font-weight: bold;'>Major updates: </span> Almost 3 years later, the presentation software was finally released for Windows PCs. It was using the same version number as the current Macintosh variant (2.0).";
    } else if (index === 2) {
      menuText.innerHTML =
        "<span style='font-weight: bold;'>September 1990:  </span> <br> PowerPoint 3.0 <br> <br> <span style='font-weight: bold;'>Major updates: </span> Most of the features we use today were created for MS PowerPoint 3.0 – including audio, video, presentation templates, and full support for TrueType fonts. This version was the one to come up with slide transitions.";
    } else if (index === 3) {
      menuText.innerHTML =
        "<span style='font-weight: bold;'>October 1994: </span> <br> PowerPoint 4.0 <br> <br> <span style='font-weight: bold;'>Major updates: </span> The new version included among others: Word tables, rehearsal mode, hidden slides. Moreover, Microsoft first introduced a standard Microsoft Office look and feel (shared with Word and Excel), with status bar, toolbars and tooltips.";
    } else if (index === 4) {
      menuText.innerHTML =
        "<span style='font-weight: bold;'>January 2007: </span> <br> PowerPoint 2007 <br> <br> <span style='font-weight: bold;'>Major updates: </span> It brought a new user interface (a changeable ribbon of tools across the top to replace menus and toolbars), SmartArt graphics, many graphical improvements in text and drawing, improved Presenter View and widescreen slide formats.";
    } else if (index === 5) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>June 2010: </span> <br> PowerPoint 2010 <br> <br> <span style='font-weight: bold;'>Major updates: </span> This release added sections within presentations, a reading view, save as video, insert video from web, embedding video and audio as well as enhanced editing for video and for pictures.";    
    } else if (index === 6) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>January 2013: </span> <br> PowerPoint 2013 <br> <br> <span style='font-weight: bold;'>Major updates: </span> The first time ever, this version allows online collaboration by multiple authors. It also included user interface redesigned for multi-touch screens.";   
    } else if (index === 7) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>September 2018:  </span> <br> PowerPoint 2019 <br> <br> <span style='font-weight: bold;'>Major updates: </span> New features included morph transition, inserting 3D models and SVG icons and a handy Zoom feature.";  
    }
  };

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

      activeDiv.dataset.urlIndex = newIndex;

      this.updateMenuText(newIndex);
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

        this.updateMenuText(newIndex);
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

        this.updateMenuText(newIndex);
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
      this.updateMenuText(newIndex);
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
