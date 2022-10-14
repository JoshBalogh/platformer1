export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
  }

  preload() {
    console.log("loading MainLevel");
  }

  create() {
    // this runs once when the scene is created
    // initialize variables and create object here

    // create colliders after all objects exist
    this.createColliders();
  }

  update(timestamp, delta) {
    // this runs every frame
    // delta can be used to determine the number of milliseconds since the last update
  }

  
  createColliders() {
    // one per colliding pair
    // this.physics.add.collider(
    //   this.group1,
    //   this.group2,
    //   this.functionToHandleCollision,  // expects item from group1 and group2 that collided
    //   null,
    //   this
    // );

  }
}
