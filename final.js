// Create an array named "stars".
var stars = [];

// Create a variable "speed" to control the speed of stars.
var speed;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // Fill the array with a for loop; it creates a new star via new Star();
    for (var i = 0; i < window.innerWidth && window.innerHeight; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    // Link the value of the speed variable to the mouse position.
    // Added mouseY in place of 0: interactive experiment, move back and forth.
    speed = map(mouseX, mouseY, width, 0, 50);

    background(24, 24, 58);

    // Shift the entire composition.
    // So, move its centre from the default top left to the centre, i.e. height/2 and width/2.
    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {

        // Draw each star - stars[i] - by running the update method which will update its position.
        // The show method will show each star on the canvas.
        stars[i].update();
        stars[i].show();
    }
}

// Create a Star object.
function Star() {
    // Create variables to specify the x and y.
    // Width and height are the same: the canvas is a square.
    this.x = random(-width, width);
    this.y = random(-height, height);

    // "z" is a variable we'll use in a formula to manipulate the stars position.
    // Note: the z value can't exceed the width (and height) value.
    // As we'll use "z" as divisor of the "x" and "y" and its values are too between "0" and "width".
    this.z = random(width);

    // Store the previous value of the z variable in pz, i.e. the value of the z variable at the previous frame
    // We want our stars streaking;
    // So we need to know their previous z location, as this is what is changing and causing the change in movement.
    this.pz = this.z;
    //  this.showCircle = false;


    //  Create a formula to set the new star's coordinates by dividing a value for the "z" value.
    //  The outcome will be the star's new x and y coordinates, as "z" is our divisor.
    //  This means, if we decrease the value of "z", the outcome will be bigger.
    //  This means, the bigger the value of speed, the more the "z" will decrease,
    //  and the more the x and y coordinates wil increase, i.e. we'll get the illusion of stars passing past us, towards the border of the canvas
    //  Note: the "z" value is the first value we updated for the new frame.
    this.update = function () {
        //    this.z = this.z - 10; // Hardcoded: unresponsive
        this.z = this.z - speed;

        // When the "z" value equals 1, we can be sure the star have passed the
        // borders of the canvas( probably they're already far away from the borders),
        // so we can place the stars on more time in the canvas, with new x, y and z values.
        // So, when "z" gets back to 0, we want to reset the stars somewhere else in the canvas;
        // Otherwise, the stayrfield will be moving back and forth, not past us.
        // Note: < 1 is also to avoid the inifnity problem of dividing with 0.
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }
        //      if (speed < 20) {
        //      this.showCircle = true;
        //    } else if (speed > 20) {
        //      this.showCircle = false;
        //    }
    }

    // What to show in the canvas
    this.show = function () {
        fill(255);
        noStroke();

        // With these "map" functions, we get the new star positions.
        // The division this.x / this.z gives a number between 0 and a very high number.
        // We map this number (proportionally to a range of 0 - 1), inside a range of 0 - width.
        // This way, we are sure that the new coordinates "sx" and "sy" move faster at each frame.
        // And they finish their travel outside of the canvas (they finish when "z" is less than a).
        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        // We use the "z" value to increase the star size between a range from 0 to 6.
        var r = map(this.z, 0, width, 6, 0);
        //    if (this.showCircle) {
        //      ellipse(sx, sy, r, r);
        //    }
        fill(212, 175, 55);
        ellipse(sx, sy, r, r);

        // We use the "pz" value to get the previous position of the stars, i.e. we use previous "z" position "pz" as our divisor.
        // So we can draw a line from the previous position to the new (current) one, i.e. get the stars streaking.
        var px = map(this.x / this.pz, 0, 1, 0, width);
        var py = map(this.y / this.pz, 0, 1, 0, height);

        // Placing this line of code here, just to make sure that the "pz" values are updated after the
        // coordinates are already calculated; this way, the "pz" value always equals
        // the "z" value of the previous frame.
        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);

    }
}
