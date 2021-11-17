function Feu(){
  if(random(1) > 0.5){
    this.couleur = "rouge";
  }else{
    this.couleur = "jaune";
  }
  this.feu = new Particule(random(width), height, this.couleur, true);
  this.mort = false;
  this.particules = [];
  this.acceleration_debris = random(0.6,0.9);

  this.finit = function(){
    if(this.mort && this.particules.length === 0){ //Fonction pour savoir si le feu d'artifice est termine
      return true;
    }else{
      return false;
    }
  };

  this.update = function(){
    if(!this.mort){
      this.feu.update_acceleration(gravite);
      this.feu.update();

      if(this.feu.vitesse.y >= 0){
        this.mort = true;
        this.explose();
      }
    }

    for(var i = this.particules.length - 1; i >= 0; i--){
      this.particules[i].update_acceleration(gravite);
      this.particules[i].update();

      if(this.particules[i].finit()){
        this.particules.splice(i, 1);
      }
    }
  };

  this.show = function(){
    if(!this.mort){
      this.feu.show();
    }
    for(var i = 0; i < this.particules.length; i++){
      this.particules[i].show();
    }
  };

  this.explose = function(){
    for(var i = 0; i < 100; i++){
      var debris = new Particule(this.feu.position.x, this.feu.position.y, this.couleur, false, this.acceleration_debris);
      this.particules.push(debris);
    }
  };
}