let {
  load,
  setImagePath,
  imageAssets,
  init,
  Sprite,
  GameLoop,
  SpriteSheet,
  Animation,
  initKeys,
  keyPressed
} = kontra;

let lastKeyPressed = "r";

initKeys();
let { canvas } = init();

setImagePath("assets/images");

load("map3.png", "knight.png").then(function() {
  let background = Sprite({
    x: 0, // starting x,y position of the sprite
    y: 0,
    // animations: spriteSheet.animations
    image: imageAssets["map3"]
  });

  let spriteSheet = SpriteSheet({
    image: imageAssets["knight"],
    frameWidth: 16,
    frameHeight: 22,
    animations: {
      walkright: {
        frames: "4..7",
        frameRate: 8
      },
      walkleft: {
        frames: "0..3",
        frameRate: 8
      },
      idleleft: {
        frames: 1
      },
      idleright: {
        frames: 7
      }
    }
  });

  //   let spriteSheet1 = SpriteSheet({
  //     image: imageAssets["runleft"],
  //     frameWidth: 16,
  //     frameHeight: 22,
  //     animations: {
  //       walk: {
  //         frames: "0..2",
  //         frameRate: 8
  //       },
  //       idle: {
  //         frames: 1
  //       }
  //     }
  //   });

  let knight = Sprite({
    x: 20,
    y: 40,
    animations: spriteSheet.animations
  });

  let loop = GameLoop({
    // create the main game loop
    update: function() {
      // update the game state
      if (keyPressed("right")) {
        knight.playAnimation("walkright");
        knight.x += 2;
        lastKeyPressed = "r";
      } else if (keyPressed("left")) {
        knight.playAnimation("walkleft");
        knight.x -= 2;
        lastKeyPressed = "l";
      } else {
        if (lastKeyPressed == "r") {
          knight.playAnimation("idleright");
        } else {
          knight.playAnimation("idleleft");
        }
      }

      if (keyPressed("up")) {
        knight.y -= 2;
      } else if (keyPressed("down")) {
        knight.y += 2;
      }

      background.update();
      knight.update();
    },
    render: function() {
      // render the game state
      background.render();
      knight.render();
    }
  });
  loop.start();
});
