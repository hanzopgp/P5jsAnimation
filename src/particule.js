function Particule(x, y, couleur, feu, acceleration_debris, bouquet_final){
  this.position = createVector(x, y);
  this.feu = feu;
  this.duree_vie = 255; //Duree de vie a 255 pour jouer avec l'opacite
  this.couleur = couleur;
  this.acceleration = createVector(0, 0);
  this.acceleration_debris = acceleration_debris;
  this.bouquet_final = bouquet_final;

  if(this.feu){ //Si la particule est un feu d'artifice
    this.vitesse = createVector(0, random(-12, -8)); //Vitesse negative pour que le feu monte vers le haut de l'ecran
  }else{ //Si la particule est un debris du feu d'artifice
    this.vitesse = p5.Vector.random2D();
    this.vitesse.mult(random(2, 10));
  }

  this.update_acceleration = function(gravite){
    this.acceleration.add(gravite); //On ajoute la gravite pour simuler l'effet que les particules retombent
  };

  this.update = function(){
    if(!this.feu){
      this.vitesse.mult(this.acceleration_debris); //Vitesse des petites particules
      this.duree_vie -= 2; //Fade des petites particules
    }
    this.vitesse.add(this.acceleration); //Mise a jour de base des vecteurs vitesse
    this.position.add(this.vitesse); //position
    this.acceleration.mult(0); //et acceleration
  };

  this.finit = function(){ //Fonction pour savoir quand la particule est morte
    if(this.duree_vie < 0){
      return true;
    }else{
      return false;
    }
  };

  this.show = function(){
    if(!this.feu){ //Si c'est une particule debris
      strokeWeight(2); //Elle est petite
      if(this.couleur == "blanc"){
        stroke(color(this.duree_vie, this.duree_vie, this.duree_vie));
      }else if(this.couleur == "rose"){
        stroke(this.duree_vie*(R1/255),this.duree_vie*(R2/255),this.duree_vie*(R3/255));
      }
    }

    else{ //Si c'est une particule feu d'artifice
      if(this.bouquet_final == true){
        strokeWeight(12); //Enorme bouquet final
        this.acceleration_debris = 1;
      }else{
        strokeWeight(4); //Elle est plus grosse 
      }
      if(this.couleur == "blanc"){
        stroke(color(255,255,255));
      }
      else if(this.couleur == "rose"){
        stroke(color(R1,R2,R3));
      }
    }

    point(this.position.x, this.position.y);
  };
}