// This is an example of a function definition. This function is called by the
// underlying animation framework thanks to the call to animate below. This
// function is responsible for drawing one frame of the animation. You can
// change the code in here using the same functions you had in the simple
// drawing exercise to draw shapes. The argument to this function, time, is the
// number of milliseconds (one millionth of a second) since the program started.
const drawFrame = (time) => {
    clear();
    drawLine(0, height/2, width, height/2, 'white');
    drawFilledCircle(ballX(time), height/2, 10, 'blue');
    //drawFallingTriangle(width * 0.14, time);
}

const ballX = (time) => {
    let i = time / 3;
    let c = Math.floor(i / width) % 2;
    return c === 0 ? i % width : width - (i % width);
};

// This is a function that we define to make it easier to draw a triangle. You
// may want to experiment with writing your own functions using this one as a
// model to draw other shapes.
const drawTriangle = (x1, y1, x2, y2, x3, y3, color, width=1) => {
    drawLine(x1, y1, x2, y2, color, width);
    drawLine(x2, y2, x3, y3, color, width);
    drawLine(x3, y3, x1, y1, color, width);
}

// This draws a falling trangle of a particular shape whose bottom point is
// positioned at x and whose y is a function of time.
const drawFallingTriangle = (x, time) => {

    // Figure out the x values relative to the passed in x
    let x1 = x - 50;
    let x2 = x;
    let x3 = x + 50;

    // Figure out the y values as a function of time.
    let y1 = (time / 4) % height;
    let y2 = y1 + 63;
    let y3 = y1 - 13;

    // Actually draw the triangle.
    drawTriangle(x1, y1, x2, y2, x3, y3, 'pink', 3);
}

// Leave this code here or the animation won't run. Also don't change the name
// of drawFrame either here or where it is defined. (Or, if you must, change it
// the same way in both places.)
animate(drawFrame);
