/* global p5 */
/*
1. Additional coins. (COMPLETE)
2. Coins of varying values. (COMPLETE)
3. Colors and decorations for coins. (COMPLETE)
4. Time-extending powerups.
5. Coins that expire / move after a certain length of time.
6. A player token that grows or shrinks as coins are collected. (COMPLETE)
7. Coins that bounce around screen like the DVD logo did.
8. Coins that simulate the rotating motion of Mario coins.
9. A “restart” button or click function.
10. A larger, more pronounced “game over” proclamation.
11. A score rater (i.e. okay, good, great, outstanding!)
12. A high score over multiple plays. (COMPLETE)
*/

let p = new p5(() => {});

let brushHue, backgroundColor, coin1, coin2, coin3, score, time, gameIsOver, hit, player, highScore;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  time = 1000;
  gameIsOver = false;
  score = 0;
  highScore = 0;
  coin1 = {
    "x": p.random(p.width),
    "y": p.random(p.height),
    "r": 20,
    "c": p.color(0, 100, 100),
  }
  coin2 = {
    "x": p.random(p.width),
    "y": p.random(p.height),
    "r": 10,
    "c": p.color(65, 100, 100),
  }
  coin3 = {
    "x": p.random(p.width),
    "y": p.random(p.height),
    "r": 5,
    "c": p.color(115, 100, 100),
  }
  player = {
    "r": 20,
    "c": p.color(235, 100, 100),
  }
}

p.draw = function () {
  p.background(backgroundColor);
  p.fill(0);
  p.text(`Time remaining: ${time} || Score: ${score} || High Score: ${highScore}`, 20, 40);
  if(!gameIsOver){
    p.fill(player["c"]);
    p.ellipse(p.mouseX, p.mouseY, player["r"]);
    //stuff for coin1
    p.fill(coin1["c"]);
    p.ellipse(coin1["x"], coin1["y"], coin1["r"]);
    let isCollision = handleCollision(coin1["x"], coin1["y"], 2*coin1["r"]);
    if(isCollision){
      score++;
      coin1["x"] = p.random(p.width);
      coin1["y"] = p.random(p.height);
    }
    //stuff for coin 2
    p.fill(coin2["c"]);
    p.ellipse(coin2["x"], coin2["y"], coin2["r"]);
    isCollision = handleCollision(coin2["x"], coin2["y"], 2*coin2["r"]);
    if(isCollision){
      score+=5;
      player["r"]+=1;
      coin2["x"] = p.random(p.width);
      coin2["y"] = p.random(p.height);
    }
    //stuff for coin 3
    p.fill(coin3["c"]);
    p.ellipse(coin3["x"], coin3["y"], coin3["r"]);
    isCollision = handleCollision(coin3["x"], coin3["y"], 2*coin3["r"]);
    if(isCollision){
      score+=10;
      player["r"]+=2;
      coin3["x"] = p.random(p.width);
      coin3["y"] = p.random(p.height);
    }
    time--;
    handleTime();
  }
  else{
    if(score>highScore){
      highScore=score;
    }
    p.fill(300, 100, 100);
    p.rect(150, 150, 100, 100);
    p.fill(100);
    p.text('Press the space bar', 150, 200);
    p.text('to play again', 150, 213);
  }
}

function handleCollision(cX, cY, cD) {
  // We'll write code for what happens if your character hits a coin.
  let hit = p.collideCircleCircle(cX, cY, cD, p.mouseX, p.mouseY, 2*player["r"]);
  return hit;
}

function handleTime() {
  if(time<=0){
    gameIsOver=true;
  }
}

p.keyPressed = function(){
  let key = event.keyCode;
  if(key == 32 && gameIsOver){
    gameIsOver = false;
    
    coin1["x"] = p.random(p.width);
    coin1["y"] = p.random(p.height);
    
    coin2["x"] = p.random(p.width);
    coin2["y"] = p.random(p.height);
    
    coin3["x"] = p.random(p.width);
    coin3["y"] = p.random(p.height);
    
    player["r"] = 20;
    
    score = 0;
    time = 1000;
  }
}
