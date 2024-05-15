var loadSplit;
var currentDataSet = "powerpoint"; //Data set initialize to powerpoint

var menuX, menuY;
var menu = document.getElementById("menu");
var menuText = document.getElementById("menu-text");
var currentUrlIndex = 0;

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
const menuUpdate = document.getElementById("menu-update");
const menuRollBack = document.getElementById("menu-roll-back");

//update data powepoint, doc, or excel data on click
function updateCurrentDataSet(dataset) {
  currentDataSet = dataset;
}

// create image canvas with grid
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

  this.createDivs = function () {
    var self = this;
    while (this.splitElement.firstChild) {
      this.splitElement.removeChild(this.splitElement.firstChild);
    }
    
    //include x and y offset so that image tiles correctly
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

  //activate a block
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

    //display menu
    menu.style.left = menuX + "px";
    menu.style.top = menuY + "px";

    currentUrlIndex = parseInt(div.dataset.urlIndex) || 0;

    this.updateMenuText(currentUrlIndex);

    if (div.classList.contains("active")) {
      menu.style.visibility = "visible";
      menuUpdate.style.visibility = "visible";
      menuRollBack.style.visibility = "visible";
    } else {
      menu.style.visibility = "hidden";
      menuUpdate.style.visibility = "hidden";
      menuRollBack.style.visibility = "hidden";
    }
  };
//close menu
  this.closeMenu = function () {
    var self = this;
    var closeButton = menu.querySelector(".close");
    closeButton.addEventListener("click", function () {
      menu.style.visibility = "hidden";
      menuUpdate.style.visibility = "hidden";
      menuRollBack.style.visibility = "hidden";
      if (self.currentActiveDiv) {
        self.currentActiveDiv.classList.remove("active");
      }
    });
  };

  this.closeMenu();

  //initialize current dataset based on global variable
  this.initializeDataSet = function () {
    if (currentDataSet === "powerpoint") {
      this.imageUrls = [
        "powerpoint1.png",
        "powerpoint2.png",
        "powerpoint3.png",
        "powerpoint4.png",
        "powerpoint5.png",
        "powerpoint6.png",
        "powerpoint7.png",
        "powerpoint8.png",
      ];
    } else if (currentDataSet === "word") {
      this.imageUrls = [
        "word1.png",
        "word2.png",
        "word3.png",
        "word4.png",
        "word5.png",
        "word6.png",
        "word7.png",
        "word8.png",
      ];
    } else if (currentDataSet === "excel") {
      this.imageUrls = [
        "excel1.png",
        "excel2.png",
        "excel3.png",
        "excel4.png",
        "excel5.png",
        "excel6.png",
        "excel7.png",
        "excel8.png",
      ];
    }

    var firstImageUrl = this.imageUrls[0];
    var divs = document.querySelectorAll(".split > div");
    divs.forEach(function (div) {
      div.style.backgroundImage = "url('" + firstImageUrl + "')";
      div.classList.remove("active");
    });
    menu.style.visibility = "hidden";
    menuUpdate.style.visibility = "hidden";
    menuRollBack.style.visibility = "hidden";
  };

  //update menu text based on the software selected
  this.updateMenuText = function (index) {
    var menuText = document.getElementById("menu-text");
    if (currentDataSet === "powerpoint") {
      if (index === 0) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 1.0 (Macintosh)</span> <br> Released November 1984<br> <br> <span style='font-weight: bold;'>Major updates: </span> The first 10.000 copies of the first version of PowerPoint for Macintosh shipped from manufacturing by Forethought Inc. It had a black-and-white user interface and 9 menus.";
      } else if (index === 1) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>First Windows version of PowerPoint</span> <br>Released May 1990<br> <br> <span style='font-weight: bold;'>Major updates: </span> Almost 3 years later, the presentation software was finally released for Windows PCs. It was using the same version number as the current Macintosh variant (2.0).";
      } else if (index === 2) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 3.0</span> <br>Relased September 1990<br> <br> <span style='font-weight: bold;'>Major updates: </span> Most of the features we use today were created for MS PowerPoint 3.0 – including audio, video, presentation templates, and full support for TrueType fonts. This version was the one to come up with slide transitions.";
      } else if (index === 3) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 4.0</span> <br>Released October 1994<br> <br> <span style='font-weight: bold;'>Major updates: </span> The new version included among others: Word tables, rehearsal mode, hidden slides. Moreover, Microsoft first introduced a standard Microsoft Office look and feel (shared with Word and Excel), with status bar, toolbars and tooltips.";
      } else if (index === 4) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 2007</span> <br>Released January 2007<br> <br> <span style='font-weight: bold;'>Major updates: </span> It brought a new user interface (a changeable ribbon of tools across the top to replace menus and toolbars), SmartArt graphics, many graphical improvements in text and drawing, improved Presenter View and widescreen slide formats.";
      } else if (index === 5) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 2010</span> <br>Released June 2010<br> <br> <span style='font-weight: bold;'>Major updates: </span> This release added sections within presentations, a reading view, save as video, insert video from web, embedding video and audio as well as enhanced editing for video and for pictures.";
      } else if (index === 6) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 2013 </span> <br>Released January 2013<br> <br> <span style='font-weight: bold;'>Major updates: </span> The first time ever, this version allows online collaboration by multiple authors. It also included user interface redesigned for multi-touch screens.";
      } else if (index === 7) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>PowerPoint 2019</span> <br>Releaesd September 2018<br> <br> <span style='font-weight: bold;'>Major updates: </span> New features included morph transition, inserting 3D models and SVG icons and a handy Zoom feature.";
      }
    } else if (currentDataSet === "word") {
      if (index === 0) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 1.0</span> <br>Released October 1983<br> <br> <span style='font-weight: bold;'>Major updates: </span>The first version of Microsoft Word was called Multi-Tool Word. It was a character cell / text mode based application, but can make use of a Microsoft mouse. It was designed for use on computers that ran the UNIX operating system.";
      } else if (index === 1) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 1.00 for Macintosh</span> <br>Released January 1985<br> <br> <span style='font-weight: bold;'>Major updates: </span>Over the following years, Microsoft re-coded the program a number of times so that it could work on different operating systems, including DOS (disk operating system) and Macintosh. The name was also changed to the shorter and more memorable ‘Word’.";
      } else if (index === 2) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 5.5</span> <br>Relesed 1989<br> <br> <span style='font-weight: bold;'>Major updates: </span> Word 5.5 significantly changed the user interface to better support graphics. It adds pulldown menus and overlapping windows. Other new features included Outline mode, table support, and Toolbar (formatting and editing tools).";
      } else if (index === 3) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'> Microsoft Word for Windows 1.0</span> <br>Released 1989<br> <br> <span style='font-weight: bold;'>Major updates: </span> In 1989, Microsoft released the first version of Word for Windows. Visually, Word for Windows had little in common with the DOS versions, more closely resembling the Mac version, and restarts the version numbering at '1.0'.";
      } else if (index === 4) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 1.1 for OS/2</span> <br>Released 1990<br> <br> <span style='font-weight: bold;'>Major updates: </span>Microsoft Word 1.1 for OS/2 is a part of the Windows version to 16-bit Presentation Manager OS/2. The interface continued to be refined to a modern look.";
      } else if (index === 5) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 2.0 for Windows</span> <br>Released 1991<br> <br> <span style='font-weight: bold;'>Major updates: </span>Word 2.0 was released together with Excel 4.0A and PowerPoint 4.0 in the MS Office suite. It allowed keyboard shortcuts, which was and continues to be a huge success.";
      } else if (index === 6) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 97</span> <br>Released 1997<br> <br> <span style='font-weight: bold;'>Major updates: </span> Word 97 was the second version to be named after their year of release. Word 97 added AutoCorrect feature, included spelling and grammar checking with the squiggles, and improved stability.";
      } else if (index === 7) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Word 2019</span> <br>Released 2019 <br> <br> <span style='font-weight: bold;'>Major updates: </span> Word 2019 had an enriched ribbon that is still being used today. It also supported touch screen on mobile devices and improved its collaboration features.";
      }
    } else if (currentDataSet === "excel") {
      if (index === 0) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Mircrosoft Multiplan</span> <br>Released 1982 (Macintosh) <br> <br> <span style='font-weight: bold;'>Major updates: </span>Before Microsoft Excel existed, there was Microsoft Multiplan, which was created to compete against Visicalc and Lotus, the popular spreadsheet apps at the time.";
      } else if (index === 1) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Mircrosoft Excel 1.0 for Mac</span> <br>Released 1985<br> <br> <span style='font-weight: bold;'>Major updates: </span>The first version of Microsoft Excel was written specifically for the Apple Macintosh computer. It replaced Microsoft's earlier Mutiplan spreadsheet product. It had a  user interface consistent with PowerPoint and Word at the time.";
      } else if (index === 2) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Mircrosoft Excel 2.0 for Windows</span> <br>Released October 1987 <br> <br> <span style='font-weight: bold;'>Major updates: </span>Excel 2.0 is the first version of Excel for the PC, with bright colors and clean typefaces.";
      } else if (index === 3) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Excel 97 </span> <br>Released 1997<br> <br> <span style='font-weight: bold;'>Major updates: </span> Excel 97 featured addition of various charts and graphs, with demonstration guides on how to create them.";
      } else if (index === 4) {
        menuText.innerHTML =
          "<span style='font-weight: bold;'>Microsoft Excel 2000</span> <br>Released 1999<br> <br> <span style='font-weight: bold;'>Major updates: </span>Among the many updates to previous versions, Excel 2000 achieved better user experience through smoother user interface and improved security.";
      } else if (index === 5) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>Microsoft Excel 2003</span> <br>Released 2003<br> <br> <span style='font-weight: bold;'>Major updates: </span> Blended with Windows XP completely, this version of Excel presented icons and toolbars with the same look as the operating system. Other than the looks, the rich feature arranged neatly under different menu tabs made it the most used version so far.";
      } else if (index === 6) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>Microsoft Excel 2008 for Mac</span> <br>Released 2007<br> <br> <span style='font-weight: bold;'>Major updates: </span>This Mac version of Excel included more robust formatting palette as well as customization on charts and graphs.";
      } else if (index === 7) {
        menuText.innerHTML =
        "<span style='font-weight: bold;'>Microsoft Excel 2019</span> <br>Released 2019<br> <br> <span style='font-weight: bold;'>Major updates: </span>Excel 2019 improved its function libarary,accessibility, and intergrated more seamlessly with other software. Users can now insert Scalable Vector Graphics (SVG) and prebuilt images.";
      }
    }
  };

  //update image inside the active block
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

    //update entire row to the next or previous version
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

    //update entire column to the next or previous version
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

    //update entire canvas to the next or previous version
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

    //check button visibility based on first/last version of the software
    this.checkButtonVisibility = function () {
      var activeDiv = document.querySelector(".active");
      if (activeDiv) {
        var currentImageUrl = activeDiv.style.backgroundImage.split('"')[1];
        var currentIndex = this.imageUrls.indexOf(currentImageUrl);

        // hide/show previous buttons
        if (currentIndex === -1 || currentIndex === 0) {
          prevBlockButton.style.display = "none";
          prevRowButton.style.display = "none";
          prevColumnButton.style.display = "none";
          prevCanvasButton.style.display = "none";
          menuRollBack.style.visibility = "hidden";
        } else {
          prevBlockButton.style.display = "block";
          prevRowButton.style.display = "block";
          prevColumnButton.style.display = "block";
          prevCanvasButton.style.display = "block";
          menuRollBack.style.visibility = "visible";
        }

        // hide/show next buttons
        if (currentIndex === -1 || currentIndex === this.imageUrls.length - 1) {
          nextBlockButton.style.display = "none";
          nextRowButton.style.display = "none";
          nextColumnButton.style.display = "none";
          nextCanvasButton.style.display = "none";
          menuUpdate.style.visibility = "hidden";
        } else {
          nextBlockButton.style.display = "block";
          nextRowButton.style.display = "block";
          nextColumnButton.style.display = "block";
          nextCanvasButton.style.display = "block";
          menuUpdate.style.visibility = "visible";
        }
      }
    };
  };
};
window.addEventListener("load", function () {
  loadSplit = new Split();
  console.log("content loaded");
  loadSplit.initializeDataSet();
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

//notes: event listener DOMContentloaded = html finishes loading
//notes: event listener load = everything finishes loading (except lazy, lay is not considered

powerpointButton.addEventListener("click", function () {
  wordButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  powerpointButton.classList.add("btn-default");
  updateCurrentDataSet("powerpoint");
  loadSplit.initializeDataSet();
  console.log("load powerpoint data");
});

wordButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  excelButton.classList.remove("btn-default");
  wordButton.classList.add("btn-default");
  updateCurrentDataSet("word");
  loadSplit.initializeDataSet();
  console.log("load word data");
});

excelButton.addEventListener("click", function () {
  powerpointButton.classList.remove("btn-default");
  wordButton.classList.remove("btn-default");
  excelButton.classList.add("btn-default");
  updateCurrentDataSet("excel");
  loadSplit.initializeDataSet();
  console.log("load excel data");
});
