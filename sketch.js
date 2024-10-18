 let earthRadius = 50;  // Earth radius in pixels (representing 5 cm)
let centerX, centerY;  // Center of the Earth on canvas
let g0 = 9.8;          // Acceleration due to gravity at Earth's surface (m/s^2)
let R = 6371;          // Radius of Earth in km (real-world units)
let pointX, pointY;    // Position of the movable point
let dragging = false;  // To track if the point is being dragged

function setup() {
  createCanvas(600, 600);
  centerX = width / 2;
  centerY = height / 2;
  
  // Initialize the point to be at Earth's surface
  let angle = PI / 4;  // Start at a 45 degree angle for visualization
  pointX = centerX + earthRadius * cos(angle);
  pointY = centerY + earthRadius * sin(angle);
}

function draw() {
  background(255);
  
  // Draw Earth as a sphere
  fill(100, 150, 255);
  ellipse(centerX, centerY, 2 * earthRadius, 2 * earthRadius);
  
  // Calculate distance r from center of Earth
  let r = dist(centerX, centerY, pointX, pointY);
  
  // Calculate gravity based on distance r
  let g = calculateGravity(r);
  
  // Draw movable point
  fill(255, 0, 0);
  ellipse(pointX, pointY, 10, 10);  // Point representing the object
  
  // Draw a line connecting the center of Earth to the point
  stroke(0);
  line(centerX, centerY, pointX, pointY);
  
  // Display information
  fill(0);
  textSize(16);
  let realR = r * R / earthRadius;  // Convert pixel distance to real-world km
  text("Distance from center r: " + nf(realR, 1, 2) + " km", 10, 20);
  text("Acceleration due to gravity g(r): " + nf(g, 1, 2) + " m/s^2", 10, 40);
}

// Function to calculate gravity based on distance r from center
function calculateGravity(r) {
  let realR = r * R / earthRadius;  // Convert pixel distance to real distance in km
  
  if (realR < R) {
    // Inside Earth
    return g0 * realR / R;
  } else {
    // Outside Earth
    return g0 * (R * R) / (realR * realR);
  }
}

// Function to detect if the mouse is pressed near the movable point
function mousePressed() {
  let d = dist(mouseX, mouseY, pointX, pointY);
  if (d < 10) {
    dragging = true;
  }
}

// Function to drag the point
function mouseDragged() {
  if (dragging) {
    pointX = mouseX;
    pointY = mouseY;
    
    // Limit the point to move within a certain range
    let r = dist(centerX, centerY, pointX, pointY);
    if (r > width / 2) {
      let angle = atan2(mouseY - centerY, mouseX - centerX);
      pointX = centerX + (width / 2) * cos(angle);
      pointY = centerY + (width / 2) * sin(angle);
    }
  }
}

// Function to stop dragging
function mouseReleased() {
  dragging = false;
}
