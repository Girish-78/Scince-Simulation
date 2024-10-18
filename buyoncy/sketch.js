 let sphereDensitySlider, liquidDensitySlider;
let sphereRadius = 30; // 3 cm radius in pixels
let cubeSide = 160;    // 8 cm side length of the cube in pixels
let waterHeight = 80;  // 4 cm water height in pixels

function setup() {
  createCanvas(400, 400);
  
  // Use the default font, no need to load any external font
  textFont('Helvetica');
  
  // Create sliders for adjusting density of the sphere and liquid
  sphereDensitySlider = createSlider(1, 3, 1, 0.1);
  sphereDensitySlider.position(20, 350);
  liquidDensitySlider = createSlider(1, 3, 1, 0.1);
  liquidDensitySlider.position(220, 350);
}

function draw() {
  background(220);
  
  // Get density values from the sliders
  let sphereDensity = sphereDensitySlider.value();
  let liquidDensity = liquidDensitySlider.value();
  
  // Display slider values
  textSize(16);
  fill(0);
  text("Sphere Density: " + sphereDensity, 20, 340);
  text("Liquid Density: " + liquidDensity, 220, 340);
  
  // Draw the cube (tank)
  fill(180);
  stroke(0);
  rect(120, 100, cubeSide, cubeSide);
  
  // Draw the water
  fill(0, 0, 255, 100);
  rect(120, 100 + cubeSide - waterHeight, cubeSide, waterHeight);
  
  // Calculate if the sphere is floating or sinking
  let sphereY = 100 + (cubeSide - waterHeight);
  
  if (sphereDensity > liquidDensity) {
    // Sphere sinks (touches the bottom of the tank)
    sphereY = 100 + cubeSide - sphereRadius;
  } else {
    // Sphere floats (partially submerged)
    let submergedDepth = map(sphereDensity / liquidDensity, 1, 0, 0, sphereRadius * 2);
    sphereY = 100 + (cubeSide - waterHeight) + (sphereRadius - submergedDepth / 2);
  }
  
  // Draw the sphere
  fill(200, 0, 0);
  ellipse(200, sphereY, sphereRadius * 2, sphereRadius * 2);
}
