let days = []
let nights = []

let fra = 0
let isNight = false
let daySound, nightSound
let soundLevel = 0.5;
let tailX = [], tailY = []

let tailSize = 40;
function preload() {
  days[0] = loadImage("day1.png")
  days[1] = loadImage("day2.png")
  days[2] = loadImage("day3.png")
  nights[0] = loadImage("night1.png")
  nights[1] = loadImage("night2.png")
  daySound = loadSound("白天.mp3")
  nightSound = loadSound("晚上.mp3")

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  days[0].resize(width, height)
  days[1].resize(width, height)
  days[2].resize(width, height)
  nights[0].resize(width, height)
  nights[1].resize(width, height)
  noCursor()
  daySound.loop()
}
function draw() {
  noCursor()

  if (isNight) {
    image(nights[fra], 0, 0)
  } else {
    image(days[fra], 0, 0)
  }
  if (frameCount % 30 == 0) {
    fra++
  }
  if (isNight) {
    if (fra == 2) {
      fra = 0
    }
  } else {
    if (fra == 3) {
      fra = 0
    }
  }
  tailX.push(mouseX)
  tailY.push(mouseY)
  for (let i = 0; i < tailX.length; i++) {
    let alpha = map(i, 0, tailSize, 0, 255)
    fill(255, 255, 0, alpha)
    ellipse(tailX[i], tailY[i], 25)
  }
  if (tailX.length > tailSize) {
    tailX.shift()
    tailY.shift()
  }
  if (dist(mouseX, mouseY, width * 0.73, height * 0.25) < 100) {
    fill(255, 100, 0)
  } else {
    fill(255, 255, 0)
  }
  noStroke()
  ellipse(mouseX, mouseY, 25)
  daySound.setVolume(soundLevel)
  nightSound.setVolume(soundLevel)

}
function keyPressed() {
  if (keyCode == UP_ARROW) {
    soundLevel += 0.1

    if (soundLevel > 1) {
      soundLevel = 1
    }
  } else if (keyCode == DOWN_ARROW) {
    soundLevel -= 0.1
    if (soundLevel < 0) {
      soundLevel = 0
    }
  }

}
function mousePressed() {
  if (dist(mouseX, mouseY, width * 0.73, height * 0.25) < 100) {
    isNight = !isNight
    fra = 0
    if (isNight) {
      daySound.stop()
      nightSound.loop()
    } else {
      nightSound.stop()
      daySound.loop()
    }
  }
}