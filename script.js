var Split = function() {
    this.$t = document.querySelector(".split");
    this.gridX = 8;
    this.gridY = 6;
    this.w = this.$t.offsetWidth;
    this.h = this.$t.offsetHeight;
    this.img = this.$t.querySelector("img").getAttribute("src");
    this.delay = 0.05;

    this.create = function() {
        var self = this;
        while (this.$t.firstChild) {
            this.$t.removeChild(this.$t.firstChild);
        }

        for (var x = 0; x < this.gridX; x++) {
            for (var y = 0; y < this.gridY; y++) {
                var width = (this.w / this.gridX * 101 / this.w) + "%",
                    height = (this.h / this.gridY * 101 / this.h) + "%",
                    top = (this.h / this.gridY * y * 100 / this.h) + "%",
                    left = (this.w / this.gridX * x * 100 / this.w) + "%",
                    bgPosX = -(this.w / this.gridX * x) + "px",
                    bgPosY = -(this.h / this.gridY * y) + "px";

                var div = document.createElement("div");
                div.style.top = top;
                div.style.left = left;
                div.style.width = width;
                div.style.height = height;
                div.style.backgroundImage = "url(" + this.img + ")";
                div.style.backgroundPosition = bgPosX + " " + bgPosY;
                div.style.backgroundSize = this.w + "px";
                div.style.transitionDelay = x * this.delay + y * this.delay + "s";

                this.$t.appendChild(div);
            }
        }
    };

    this.create();

    var self = this;
    this.$t.addEventListener("click", function() {
        self.$t.classList.toggle("active");
    });
};

new Split();
console.log("tes");



//event listener DOMContentloaded = html finishes loading
//event listener load = everything finishes loading (except lazy, lay is not considered


//calculate the position of the div that's clicked on
//update global variable of tooltip top left position
//show tooltip
//toggle class for button
