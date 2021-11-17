function Star(){
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function(speed){
    this.z = this.z - speed;
    if(this.z < 1){
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function(){
    var rouge = color(255,0,0);
    var jaune = color(127,127,0);
    fill(rouge);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var rayon = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, rayon, rayon); //Ellipse

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(jaune);
    line(px, py, sx, sy); //Ligne derriere l'ellipse
  };
}