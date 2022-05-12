let page = document.querySelector("#page");

const RRG2Page = () => {
  let rrg2 = `
        
            <div id="RRG2">
                <nav class="navbar navbar-inverse">
                    <div class="container">
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li class="active"><a href="/vilmedicRRG2">Vision Transformer</a></li>
                                <li><a href="/vilmedicRRG3">CNN + Transformer</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="error"></div>

                <h1 class="text-center">Visualisation des cartes d'attentions produites par le modèle Vision Transformer</h1>

                <div class="vilmedic" id="square">
                    <div id="loading" class="parent">
                        <img class="center child" src="../images/Preloader_7.gif" />
                        <div class="child" id="countLoad">Un peu de patience, les images se chargent : 1/196</div>
                    </div>

                </div>

                
            </div>
        
    `;
  page.innerHTML = rrg2;
  const vilmedic = new Vilmedic();
  window.localStorage.clear();
  let pixels_number = "196";
  for (let i = "1"; i <= pixels_number; i++) {
    let pathRRG2 = "../images/RRG2/pixelsImages/pixel" + i + ".jpg";
    vilmedic.imagesRRG2.push(pathRRG2);
  }
  loadImages(vilmedic.imagesRRG2, 0, (imagesRRG2) => {
    window.localStorage.setItem("imagesRRG2", imagesRRG2);
    vilmedic.display();
  });
};

class Vilmedic {
  constructor() {
    this.errorMessage = "";
    this.imagesRRG2 = [];
  }

  imagePixelSelection() {
    var interactiveImage = document.getElementById("square");
    var htmlInteractiveImage = `
                <svg id="svg" width="196" height="196">
                    <image width="196" height="196" href="../images/imageGrid.jpg"
                        style="outline: none; opacity: 1;">
                    </image>
                 </svg>
                 <div class="containerImg"></div>
            `;
    interactiveImage.innerHTML = htmlInteractiveImage;
    var svg = document.getElementById("svg");
    var buttonsPixels = "";
    let id = 0;
    for (var x = 0; x < 14; x++) {
      for (var y = 0; y < 14; y++) {
        buttonsPixels +=
          `
                    <rect name="onePixel" id="` +
          id +
          `" x="` +
          14 * y +
          `" y="` +
          14 * x +
          `" width="14" height="14" class="btn" >
                    </rect>`;
        id++;
      }
    }
    svg.innerHTML += buttonsPixels;
    document.getElementsByName("onePixel").forEach((e) => {
      e.addEventListener("mouseover", () =>
        this.onDisplayHeatMaps(parseInt(e.id))
      );
    });
  }

  display() {
    this.imagePixelSelection();
  }

  onDisplayHeatMaps(pixel) {
    pixel = pixel + 1;
    let errorBalise = document.querySelector(".error");
    let heatmap = document.querySelector(".containerImg");
    errorBalise.innerHTML = "";
    heatmap.innerHTML = "";
    if (!pixel || pixel < 1 || pixel > 196) {
      this.errorMessage = "Le numéro du pixel doit être compris entre 1 et 196";
      errorBalise.innerHTML =
        '<div class="alert alert-danger" role="alert">' +
        this.errorMessage +
        "</div>";
      console.log(this.errorMessage);
      return;
    }
    let pathImageToLoad = "../images/RRG2/pixelsImages/pixel" + pixel + ".jpg";
    heatmap.innerHTML =
      '<img src="' +
      pathImageToLoad +
      '" id="myImage" name="myImage" class="myImage" alt="heatmaps" />';
  }
}

function loadImages(images, index, callback) {
  let counter = document.getElementById("countLoad");
  let counterText = index + 1;
  counter.innerText =
    "Un peu de patience, les images se chargent : " + counterText + "/196";
  if (index < images.length) {
    let img = new Image();
    img.src = images[index];
    images[index] = img;
    images[index].onload = function () {
      loadImages(images, ++index, callback);
    };
  } else {
    callback(images);
  }
}

export default RRG2Page;
