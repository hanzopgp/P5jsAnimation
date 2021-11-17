//Variables generales
var frameCount; //Nombre de frame de l'animation
var windowWidth; //Largeur de la fenetre
var windowHeight; //Hauteur de la fenetre
var img_index = 0;
var gif_rate = 20;
var pause = false;

//Variables fractales
var type = "eventail"; //cerveau / eventail / quatre / ronde
var angles = [];
var size_angles = 396;
var index = 0;
var vitesse_fractale_anim = 20;
var taille_arbre = 90; 
var etincelle_proportion = 0.02;
var epaisseur_branche = 3; //epaisseur des lignes ou des points suivant le type
var epaisseur_cercle = 7; //epaisseur cercle central quand type normal

//Variables pointilles
var type_line = "pointille"; //normal / pointille
var nb_pointille = 100;

//Variable sauveguarde
var sauvegarde = false;

//Preparation de base
function setup(){	
	createCanvas(windowWidth,windowHeight); //Canvas a la taille de la fenetre
	background(255); //Fond blanc
	for(let i = 0; i < size_angles; i++) { //On cree les differents angles pour nos fractales
		angles[i] = i/PI/vitesse_fractale_anim;
	}
  }

//Boucle d'animation
function draw(){

	background(255); //Fond blanc

	//Preparation des angles
	angle = angles[index];
	index++;
	if(angle == angles[angles.length]){
		index = 0;
	}
	
	translate(windowWidth/2, height/2); //On translate toutes les positions au milieu de l'ecran par soucis de simplicite
	if(type_line == "normal"){
		ellipse(0, -3, epaisseur_cercle, epaisseur_cercle);
	}
	fill(0);
	strokeWeight(epaisseur_branche);

	if(type == "cerveau"){
		push();
		rotate(-90);
		branche(taille_arbre);
		pop();

		push();
		branche(taille_arbre);
		pop();

		push();
		rotate(90);
		branche(taille_arbre);
		pop();
	}
	
	if(type == "eventail"){
		push();
		rotate(-100);
		branche(taille_arbre);
		pop();

		push();
		rotate(-50);
		branche(taille_arbre);
		pop();

		push();
		rotate(0);
		branche(taille_arbre);
		pop();

		push();
		rotate(50);
		branche(taille_arbre);
		pop();

		push();
		rotate(100);
		branche(taille_arbre);
		pop();
	}

	if(type == "quatre"){
		push();
		rotate(0);
		branche(taille_arbre);
		pop();

		push();
		rotate(PI/2);
		branche(taille_arbre);
		pop();

		push();
		rotate(-PI);
		branche(taille_arbre);
		pop();

		push();
		rotate(-PI/2);
		branche(taille_arbre);
		pop();
	}

	if(type == "ronde"){
		push();
		rotate(0);
		branche(taille_arbre);
		pop();

		push();
		rotate(1.12);
		branche(taille_arbre);
		pop();

		push();
		rotate(2.12);
		branche(taille_arbre);
		pop();

		push();
		rotate(3.12);
		branche(taille_arbre);
		pop();

		push();
		rotate(4.12);
		branche(taille_arbre);
		pop();

		push();
		rotate(5.12);
		branche(taille_arbre);
		pop();
	}

	//Permet de sauvegarder des images toutes les (gif_rate) images
	if(sauvegarde == true){
		saveFrames("img"+img_index,"png",1,gif_rate);
		img_index++;
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

//Applique les pointilles aux lignes
function setLineDash(list) {
  drawingContext.setLineDash(list);
}

//Creer les branches
function branche(taille_arbre) {

	//Type des lignes
	if(type_line == "normal"){
		line(0, 0, 0, -taille_arbre);
	}else if(type_line == "pointille"){
		setLineDash([0, nb_pointille, 0, 0]);
  		line(0, 0, 0, -taille_arbre);
	}

	//Construction de la fractale
	translate(0, -taille_arbre);
	if (taille_arbre > 4){ //Condition d'arret de production des branches
		
		//Recursion branche gauche
		push();
		rotate(angle); //Rotation avant creation de nouvelle branche
		branche(taille_arbre * 0.67); //Reduction de la taille des lignes de 2/3
		pop();

		//Recursion branche droite
		push();
		rotate(-angle);
		branche(taille_arbre * 0.67);
		pop();
	}
}

