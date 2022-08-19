const juego = {
  timerId: 0,
  timerObstaculos: 0,
  gravity: 2,
  efectoGravedad: function () {
    bird.birdBottom -= juego.gravity;
    bird.div.style.bottom = bird.birdBottom + "px";
  },

  aleatorio: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  verificaColision: function () {
    if (bird.colision()) {
      juego.terminar();
    }
  },

  loop: function () {
    juego.efectoGravedad();
    juego.verificaColision();
    obstaculos.mover();
  },

  iniciar: function () {
    document.addEventListener("keyup", bird.mover);
    bird.dibujar();
    juego.timerObstaculos = setInterval(obstaculos.crearObstaculo, 3000);
    juego.timerId = setInterval(juego.loop, 20);
  },

  terminar: function () {
    clearInterval(juego.timerId);
    clearInterval(juego.timerObstaculos);
  },
};

const bird = {
  birdBottom: juego.aleatorio(10, 570),
  div: document.querySelector(".bird"),
  left: 250,

  dibujar: function () {
    bird.div.style.bottom = bird.birdBottom + "px";
    bird.div.style.left = bird.left + "px";
  },

  mover: function () {
    bird.birdBottom += 40;
    bird.div.style.bottom = bird.birdBottom + "px";
  },

  colision: function () {
    if (bird.birdBottom < 0) {
      return true;
    }
  },
};



const obstaculos = {
  obstacleContainer: document.querySelector(".obstacles"),
  velocidad: 1,
  gap: 60,
  maxHeight: 300,
  lista: [],

  crearObstaculo() {
    const topObstacle = document.createElement("div");
    const bottomObstacle = document.createElement("div");
    topObstacle.classList.add("topObstacle");
    bottomObstacle.classList.add("bottomObstacle");
    obstaculos.obstacleContainer.appendChild(topObstacle);
    obstaculos.obstacleContainer.appendChild(bottomObstacle);

    topObstacleHeight = Math.random() * obstaculos.maxHeight;
    bottomObstacleHeight = topObstacleHeight - obstaculos.gap;
    topObstacle.style.height = topObstacleHeight + "px";
    bottomObstacle.style.height = bottomObstacleHeight + "px";
    topObstacle.style.left = "900px";
    bottomObstacle.style.left = "900px";

    const parObstaculos = {
      topObstacle: topObstacle,
      bottomObstacle: bottomObstacle,
      left: 900,
      topObstacleHeight: topObstacleHeight,
      bottomObstacleHeight: bottomObstacleHeight,
    };
    obstaculos.dibujar(parObstaculos);
    obstaculos.lista.push(parObstaculos);
  },

  mover: function () {
    for (var i = 0; i < obstaculos.lista.length; i++) {
      obstaculos.lista[i].left -= obstaculos.velocidad;
      obstaculos.dibujar(obstaculos.lista[i]);

      // if (obstaculos.lista[i].colision(bird)) {
      //     console.log("COLISION")
      // }

      obstaculos.colision(obstaculos.lista[i]);
    }
  },

  dibujar: function (parObstaculos) {
    parObstaculos.topObstacle.style.left = parObstaculos.left + "px";
    parObstaculos.bottomObstacle.style.left = parObstaculos.left + "px";
  },


  //obstacle div height is 580
  colision: function (parObstaculos) {
    if (
      (bird.birdBottom < parObstaculos.bottomObstacleHeight ||
        bird.birdBottom > 580 - parObstaculos.topObstacleHeight) &&
      parObstaculos.left === bird.left
    ) {
      console.log("COLISION");
    }
  },
};

juego.iniciar();
