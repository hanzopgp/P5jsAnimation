function Etoile(){
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;
  this.duree_vie = 0;

  this.update = function(speed){
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.fade = function(){
    if(this.duree_vie <= 0){
      this.duree_vie = 0;
    }else{
      this.duree_vie -= 3;
    }
  };

  this.apparait = function(){
    if(this.duree_vie >= 255){
      this.duree_vie = 255;
    }else{
      this.duree_vie += 3;
    }
  };

  this.show = function(){
    var red = color(this.duree_vie,0,0);
    var yellow = color(this.duree_vie/2,this.duree_vie/2,0);

    fill(red);
    noStroke();

    var sx = map(this.x/this.z, 0, 1, 0, width);
    var sy = map(this.y/this.z, 0, 1, 0, height);

    var rayon = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, rayon, rayon); //Ellipse

    var px = map(this.x/this.pz, 0, 1, 0, width);
    var py = map(this.y/this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(yellow);
    line(px, py, sx, sy); //Ligne derriere l'ellipse
  };
}