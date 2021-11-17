//Variable generales
p5.disableFriendlyErrors = true; //Supprime les friendly errors de la console
var frameCount; //Nombre de frame de l'animation
var pause = false;
var windowWidth;
var windowHeight;

//Variables pour etoiles
var nb_etoiles = 500;
var vitesse_etoiles = 15;
let etoiles = [];

//Variables pour les fractales
var rose_tmp = 0;
var blanc_tmp = 0;
var angles = [];
var size_angles = 1000;
var index = 0;
var vitesse_fractale_anim = 20; //35
var taille_arbre = 150; //80

//Variables pour feu d'artificies
var feux = [];
var proportion_feu = 0.17;
var gravite;
var force_gravite = 0.1;
var n_bouquet_final = 0;
var etincelle_proportion = 0.05;

//Variables pour le texte
var taille_texte = 60;
var opacite_text = 0;
var vitesse_rotation_texte = 20.;

//Variables couleurs
var R1 = 235;
var R2 = 164;
var R3 = 235;

function preload(){ //Charge la police avant de lancer les animations
    font = loadFont('./font/Bullpen3D.ttf')
}

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

  	//Partie nom
    textFont(font);
    textSize(taille_texte);
	msg = "CECILE ARIOLI";
    points = font.textToPoints(msg, 0, 0, taille_texte, {
        sampleFactor: 0.15, //Nombre de points echantillones
       	simplifyThreshold: 0.0
    });
    msg2 = "EPSAA PARIS";
    points2 = font.textToPoints(msg2, 0, 0, taille_texte, {
        sampleFactor: 0.15, //Nombre de points echantillones
       	simplifyThreshold: 0.0
    });
  }

  function draw(){
	if(frameCount < 300){ //Pendant les 3 premieres secondes on affiche les etoiles
		background(0); //On remet le fond noir pour que les etoiles ne fasse pas de trace
		for(let i = 0; i < nb_etoiles; i++) { //On met a jour les etoiles et on les affiche
			if(frameCount > 220){
				etoiles[i].fade();
			}else{
				etoiles[i].apparait();
			}
			etoiles[i].update(vitesse_etoiles);
			etoiles[i].show();
		}
	}

	else if(frameCount < 900){ //Ensuite on affiche les fractales pendant 5 secondes
		if(frameCount < 600){ //On gere l'opacite suivant le nombre de frame
			blanc_tmp++;
		}else{
			blanc_tmp--;
		}
		angle = angles[index];
		index++;
	  	background(0);
	  	translate(windowWidth/2, height/2);
	  	var rose = color(R1,R2,R3);
	  	var blanc = color(blanc_tmp, blanc_tmp, blanc_tmp);
	  	stroke(blanc);

		push()
		rotate(-90);
		branche(taille_arbre);
		pop()

		push()
		branche(taille_arbre);
		pop()

		push()
		rotate(90);
		branche(taille_arbre);
		pop()
	}

	else if(frameCount < 1900){ //Puis on affiche les feux d'artifices pendant 9 secondes
		background(0);
		//On creer directement nos feux ici aleatoirement, mais on arrete 
		//d'en creer avant la fin pour meilleure transition
		if(frameCount < 1500 && random(1) < proportion_feu){
	    	feux.push(new Feu(false));
	    }
	    if(frameCount > 1750 && n_bouquet_final < 5){
	    	feux.push(new Feu(true));
	    	n_bouquet_final++;
	    }
	  	//La boucle est ici a l'envers car on supprime des elements a l'interieur
	  	for(var i = feux.length-1; i >= 0; i--){ //On met a jour et affiche les feux
	  		feux[i].update();
	  		feux[i].show();
			   if(feux[i].finit()){ //Si le feu a finit son animation
			     feux.splice(i, 1); //Alors on supprime cet objet de la liste d'objet
			 }
		}
		if(frameCount > 1500){ //Pour les 2.5 dernieres secondes on affiche le nom
			if(frameCount < 1700){ //On gere l'opacite suivant le nombre de frame
				opacite_text++;
			}else{
				opacite_text--;
			}
			push();
		  	stroke(opacite_text,opacite_text,opacite_text);
		    strokeWeight(2);
		    noFill();
		  	var d = 10 + sin(frameCount/vitesse_rotation_texte) * 10; //Ici pour gerer l'animation, vitesse, largeur...
		    var an = frameCount/100.;
		    translate(windowWidth/2-220, windowHeight/2-100); //Ici on gere le placement du texte 1
		    for (let i = 0; i < points.length; i++) {
		        var point = points[i];
		        push();
		        translate(point.x, point.y);
		        rotate(an);
		        line(-d, -d, +d, +d);
		        pop();
		    }
		    pop();
		    push();
		    stroke(opacite_text*(R1/255),opacite_text*(R2/255),opacite_text*(R3/255));
		    strokeWeight(2);
		    noFill();
		  	d = 10 + sin(frameCount/vitesse_rotation_texte) * 10;
		    an = frameCount/100.;
		    translate(windowWidth/2-220, windowHeight/2+100-100); //Ici on gere le placement du texte 2
		    for (let i = 0; i < points2.length; i++) {
		        var point2 = points2[i];
		        push();
		        translate(point2.x, point2.y);
		        rotate(an);
		        line(-d, -d, +d, +d);
		        pop();
		    }
		    pop();
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
		if(frameCount > 500 && frameCount < 700){
			if(random(1) > etincelle_proportion){
				stroke(255,255,255);
			}else{
				stroke(R1,R2,R3);
			}
		}
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



