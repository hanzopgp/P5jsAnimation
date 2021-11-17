//Variable generales
p5.disableFriendlyErrors = true; //Supprime les friendly errors de la console
var frameCount; //Nombre de frame de l'animation
var pause = false;

//Variables pour etoiles
var nb_etoiles = 300;
var vitesse_etoiles = 10;
let etoiles = [];

//Variables pour les fractales
var rouge_tmp = 0;
var angles = [];
var size_angles = 1000;
var index = 0;
var vitesse_fractale_anim = 35;
var taille_arbre = 190;

//Variables pour feu d'artificies
var feux = [];
var proportion_feu = 0.1;
var gravite;
var force_gravite = 0.1;

function setup(){	
	//Partie generale
	createCanvas(windowWidth,windowHeight); //Canvas a la taille de la fenetre
	background(0); //Fond noir

	//Partie etoiles
	for(let i = 0; i < nb_etoiles; i++) { //On cree les nouvelles etoiles
		etoiles[i] = new Etoile();
	}

	//Partie fractale
	for(let i = 0; i < size_angles; i++) { //On cree les differents angles pour nos fractales
		angles[i] = i/PI/vitesse_fractale_anim;
	}

  	//Partie feux d'artifices
  	gravite = createVector(0, force_gravite);
  }

  function draw(){
	if(frameCount < 300){ //Pendant les 3 premieres secondes on affiche les etoiles
		background(0); //On remet le fond noir pour que les etoiles ne fasse pas de trace
		for(let i = 0; i < nb_etoiles; i++) { //On met a jour les etoiles et on les affiche
			etoiles[i].update(vitesse_etoiles);
			etoiles[i].show();
		}
	}



	else if(frameCount < 990){ //Ensuite on affiche les fractales pendant 6.9 secondes
		if(frameCount < 645){
			rouge_tmp++;
		}else{
			rouge_tmp--;
		}
	  	var rouge = color(rouge_tmp,0,0);
	  	index++;
	  	background(0);
		angle = angles[index];
		stroke(rouge);
		translate(windowWidth/2, height);
		branche(taille_arbre);
	}



	else if(frameCount < 1800){ //Puis on affiche les feux d'artifices pendant 8 secondes
		background(0);
		//On creer directement nos feux ici aleatoirement, mais on arrete 
		//d'en creer avant la fin pour meilleure transition
		if(frameCount < 1500 && random(1) < proportion_feu){
	    	feux.push(new Feu());
	    }
	  	//La boucle est ici a l'envers car on supprime des elements a l'interieur
	  	for(var i = feux.length - 1; i >= 0; i--){ //On met a jour et affiche les feux
	  		feux[i].update();
	  		feux[i].show();
			   if(feux[i].finit()){ //Si le feu a finit son animation
			     feux.splice(i, 1); //Alors on supprime cet objet de la liste d'objet
			 }
			}
		if(frameCount > 1500){ //Pour les 2.5 dernieres secondes on affiche le nom
			var jaune = color(127,127,0);
		  	stroke(0);
		  	fill(jaune)
			textSize(30);
			text("CECILE ARIOLI", windowWidth/2-100, windowHeight/2-100);
			text("EPSAA PARIS", windowWidth/2-100, windowHeight/2-100+50)
		}
	}



	else{ //A la fin on remet le fond en noir et on affiche plus rien
		background(0);
	}
}

function branche(taille_arbre) {
	line(0, 0, 0, -taille_arbre);
	translate(0, -taille_arbre);
	if (taille_arbre > 4) {
		push();
		rotate(angle);
		branche(taille_arbre * 0.67);
		pop();
		push();
		rotate(-angle);
		branche(taille_arbre * 0.67);
		pop();
	}
}

function keyPressed(){ //Fonction pour agir si il y a des actions au clavier
	if(key == "p"){ //Met pause si on appuit sur la touche "p"
		if(pause == false){
			noLoop();
			pause = true;
		}
		else{
			loop();
			pause = false;
		}
	}
}


