function Particule(x, y, couleur, feu){
  this.position = createVector(x, y);
  this.feu = feu;
  this.duree_vie = 255;
  this.couleur = couleur;
  this.acceleration = createVector(0, 0);

  if(this.feu){
    this.vitesse = createVector(0, random(-12, -8));
  }else{
    this.vitesse = p5.Vector.random2D();
    this.vitesse.mult(random(2, 10));
  }

  this.update_acceleration = function(gravite) {
    this.acceleration.add(gravite);
  };

  this.update = function(){
    if(!this.feu){
      this.vitesse.mult(0.9);
      this.duree_vie -= 4;
    }

    this.vitesse.add(this.acceleration);
    this.position.add(this.vitesse);
    this.acceleration.mult(0);
  };

  this.finit = function(){
    if(this.duree_vie < 0){
      return true;
    }else{
      return false;
    }
  };

  this.show = function(){
    if(!this.feu){
      strokeWeight(2);
      stroke(this.couleur, this.duree_vie);
    }else{
      strokeWeight(4);
      stroke(this.couleur);
    }

    point(this.position.x, this.position.y);
  };
}