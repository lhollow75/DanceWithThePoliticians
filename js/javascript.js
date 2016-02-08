var bras_d = document.getElementById('bras_droit');
var bras_g = document.getElementById('bras_gauche');
var jambe_d = document.getElementById('jambe_droite');
var jambe_g = document.getElementById('jambe_gauche');
var elt_tete = document.getElementById('tete');
var b = document.getElementsByTagName('body')[0];
var change_perso = document.getElementsByClassName('change')[0];
var elt_fleche = document.getElementById('fleche');
var elt_fleche_suivante = document.getElementById('fleche_suivante');

// Choix du perso
var elt_obama = document.getElementById('character_nice_1');
var elt_merkel = document.getElementById('character_nice_2');
var elt_hollande = document.getElementById('character_nice_3');
var elt_cameron = document.getElementById('character_nice_4');
var elt_poutine = document.getElementById('character_nice_5');

var move_tete;


// création d'un tableau qui rassemble les mouvements dispo dans le css (pour la fonction random notamment)
var position_membre = [-360, -315, -270, -225, -180, -135, -90, -45, 0, 45, 90, 135, 180, 225, 270, 315, 360, -50, 50];

// initialisation de la position des bras (pour la touche entrée et suppr)
var position_bras_droit = position_membre[3];
var position_bras_gauche = position_membre[4];
var position_jambe_droite = position_membre[3];
var position_jambe_gauche = position_membre[4];
var m=1;


// Mode jeu
var affiche_niveau = document.getElementById('niveau');
var affiche_point = document.getElementById('point');
var affiche_touche = document.getElementById('touche');
var affiche_fleche = document.getElementById('fleche');
var affiche_touche_suivante = document.getElementById('touche_suivante');
var affiche_fleche_suivante = document.getElementById('fleche_suivante');
var affiche_commentaire = document.getElementById('commentaire');
var affiche_chrono = document.getElementById('chrono');

var isPlaying = false;
var first_game = [37, 38, 39, 40, 39, 38, 37];
var second_game = [37,38,39,40];
var touche_attendue;
var prochaine_touche;
var frequence = 3000;
var touche_appuye;
var enchainement = [first_game, second_game];
var point = 0;
var vie = 3;

// Mouvement de la tête
function mouvement_tete(){
	move_tete = setInterval(function(){
		elt_tete.classList.remove('tete_move'+m);
		if (m==3)m=4; else m=3;
		elt_tete.classList.add('tete_move'+m);
	}, 400);
}

document.getElementById('game').style.display = 'none';

b.addEventListener('keyup',  function(e){
    if (isPlaying){
        play(e);
    } else {
        keyMoves(e);
    }
});

elt_obama.addEventListener('click', function(){
	changement_tete('teteObama');
});
elt_merkel.addEventListener('click', function(){
	changement_tete('teteMerkel');
});
elt_hollande.addEventListener('click', function(){
	changement_tete('teteHollande');
});
elt_cameron.addEventListener('click', function(){
	changement_tete('teteCameron');
});
elt_poutine.addEventListener('click', function(){
	changement_tete('tetePoutine');
});
change_perso.addEventListener('click', function(){
	document.getElementById('game').style.display = 'none';
	document.getElementById('intro').style.display = 'block';
	clearInterval(move_tete);
});

function changement_tete(nouvelle_tete){
	elt_tete.className = "tete_move1 "+ nouvelle_tete;
	document.getElementById('game').style.display = 'block';
	document.getElementById('intro').style.display = 'none';
	mouvement_tete();
}



// Permet de bouger le membre selon son côté et l'angle de destination
// Retour à la normal par la suite
function bouge_membre(elt, angle){
	// console.log(angle);
	// Selon l'angle de destination, le temps de retour n'est pas le même, ainsi que le traitement du retour
	elt.classList.add('move_' + angle);
    setTimeout(function(){
        elt.classList.remove('move_' + angle);
    }, (Math.abs(angle) > 180 || Math.abs(angle) < -180) ? 750 : 350);
    
}


// Activation des mouvements en fonction de la touche appuyée, dispo en mode jeu
function fleches(ev){ 
	clearInterval(move_tete);
	switch(ev.keyCode) {
		case 8: // return
			if (position_bras_droit == -135) {
				position_bras_droit = 135;
			} else if  (position_bras_gauche == -135) {
				position_bras_gauche = 135;
			} else {
				position_bras_droit = position_bras_droit - 45;
				position_bras_gauche = position_bras_gauche - 45;
			}   
			bouge_membre(bras_g, position_bras_gauche);
            bouge_membre(bras_d, position_bras_droit);
			
			break;
		case 13: // Entrée
			if (position_bras_droit == 135) {
				position_bras_droit = -135;
			} else if  (position_bras_gauche == 135) {
				position_bras_gauche = -135;
			} else {
				position_bras_droit = position_bras_droit + 45;
				position_bras_gauche = position_bras_gauche + 45;
			}
	
			bouge_membre(bras_g, position_bras_gauche);
            bouge_membre(bras_d, position_bras_droit);
			break;
		case 32: // Espace
			console.log("Saute");
			bouge_membre(bras_g, position_membre[11]);
			bouge_membre(bras_d, position_membre[5]);
			bouge_membre(jambe_g, position_membre[18]);
			bouge_membre(jambe_d, position_membre[17]);
			break;
		case 37: // Gauche
			console.log("A Gauche");
			bouge_membre(bras_g, position_membre[11]);
            bouge_membre(bras_d, position_membre[2]);

			break;
		case 38: // Haut
			console.log("En haut");
			bouge_membre(bras_g, position_membre[11]);
            bouge_membre(bras_d, position_membre[5]);

			break;
		case 39: // Droite
			console.log("A Droite");
			bouge_membre(bras_g, position_membre[14]);
            bouge_membre(bras_d, position_membre[5]);

			break;
		case 40: // Bas
			console.log("En bas");
			bouge_membre(bras_g, position_membre[9]);
            bouge_membre(bras_d, position_membre[7]);
			break;
		case 80: // P -> Play
			console.log("1: "+isPlaying);
			isPlaying = !isPlaying;
			if (isPlaying){
				console.log("Play Mode");
				console.log("2: "+isPlaying);
				reset_game();
				jouer_le_step(0, 0);
			}else{
				console.log("Quit playing mode");
				console.log("3: "+isPlaying);
				firstPlay = true;
			}
            break;
	}
	mouvement_tete();
}

// Réinitialisation des variables de jeu
function reset_game(){
	point = 0;
	vie = 3;
	frequence = 3000;
}

// Calcule d'un angle aléatoire entre -360 et 360, en multiple de 45
function angle_rdm(){
	var _rdm = Math.round((Math.random() * (8 - (-8)) + (-8))) * 45;
	return _rdm;
}

// Activation des mouvements en fonction de la touche appuyée, pas dispo en mode jeu
function keyMoves(ev) {
	// console.log(ev.keyCode);
	
	fleches(ev);
	switch (ev.keyCode) {
		case 65: // A
			console.log("A");
			break;
		case 69: // E
			console.log("E");
			break;
		case 82: // R -> Random position
			console.log("Random");
			bouge_membre(bras_g, angle_rdm());
			bouge_membre(bras_d, angle_rdm());
			bouge_membre(jambe_d, angle_rdm());
			bouge_membre(jambe_g, angle_rdm());
			break;
		case 84: // T
			console.log("Tout en haut");
			bouge_membre(bras_g, position_membre[12]);
			bouge_membre(bras_d, position_membre[4]);
			break;
		case 89: // Y
			console.log("Tour complet");
			bouge_membre(bras_g, position_membre[16]);
			setTimeout(function(){
				bouge_membre(bras_d, position_membre[0]);
			},50);
			break;
		case 90: // Z
			console.log("Z");
			break;
	}
}

function play(ev){

    fleches(ev);

    touche_appuye = true;
    // console.log('touche appuyée');

	// Comparaison de la touche appuyée avec la touche attendue
    if (ev.keyCode === touche_attendue){ // Si c'est ok, il gagne un point
		commentaire("Bravo");
        console.log('bravo');
		point++;
		affiche_point.innerHTML = "Score : "+point;
    } else { // Sinon il perd une vie
        // console.log('là');
        IlSEstTrompe();
    }

}

function change_fleche(sens, fleche){
	console.log("sens: "+sens);
	console.log("fleche: "+fleche);
	switch (sens){
		case 37:
			touche = "gauche";
			break;
		case 38:
			touche = "haut";
			break;
		case 39:
			touche = "droite";
			break;
		case 40:
			touche = "bas";
			break;
		default:
			touche = "defaut";
			break;
	}
	fleche.className = touche;
}

function jouer_le_step(pas, niveau){
	// console.log("tab:"+enchainement);
    niveauEnCours = enchainement[niveau];
	affiche_niveau.innerHTML = "Niveau: "+(niveau + 1);
	// console.log(niveauEnCours);
    touche_attendue = niveauEnCours[pas];
	

	affiche_touche.innerHTML = "Appuies sur la touche : ";
	
	
	// Affichage de la touche suivante
	if (pas + 1 < niveauEnCours.length) {
		prochaine_touche = niveauEnCours[pas+1];
	} else if (niveau + 1 < enchainement.length){
		niveau_suivant = enchainement[niveau + 1];
		prochaine_touche = niveau_suivant[0];
	} else {
		prochaine_touche = "";
	}
	console.log("debug: "+prochaine_touche);
	if (prochaine_touche == "") {
		affiche_touche_suivante.innerHTML = "";
	} else {
		affiche_touche_suivante.innerHTML = "Prochaine touche: ";
	}
	
	change_fleche(touche_attendue, elt_fleche);
	change_fleche(prochaine_touche, elt_fleche_suivante);
	
	
    touche_appuye = false;

    // console.log('Attendu', touche_attendue);
    // console.log('Niveau', niveau + 1);
	
	// Conversion de la fréquence ms->s pour l'affichage
	var compteur = frequence/1000;
	
	// Affichage du chrono pour chaque pas
	var timer = setInterval(function(){
		affiche_chrono.innerHTML = "Chrono: "+compteur;
		// console.log(compteur);
		compteur--;
	}, 1000);

	// Passage au niveau suivant ou fin du jeu après le temps imparti
    setTimeout(function(){
		
		// Suppression du timer à chaque passage à chaque fin de pas
		clearInterval(timer);
		
		// Si aucune touche n'a été appuyée 
        if (!touche_appuye){
            // console.log('ici');
            IlSEstTrompe();
        }
		
		// Tant qu'il y a des vies on avance dans le jeu
		if (vie >= 0) {
			
			if (pas + 1 < niveauEnCours.length) { // Si il y a encore des pas dans le niveau, on passe au pas suivant
				jouer_le_step(pas + 1, niveau);
			} else if (niveau + 1 < enchainement.length){ // Sinon si il y a un niveau supérieur on passe au niveau suivant
				commentaire("Passage au niveau supérieur");
				frequence = frequence - 1000;
				jouer_le_step(0, niveau+1)
			} else { // Sinon c'est la fin du jeu !
				console.log("Fin du jeu !");
				commentaire("Félicitation");
			}
		} else { // Si il n'y a plus de vie c'es la fin du jeu
			// console.log("Game Over");
			commentaire("Game Over");
			
			// Suppression de tous les affichages du mode jeu au bout de 5sec après la fin du jeu
			setTimeout(fin_jeu, 5000);
		}  
    }, frequence);
}

// Fin du jeu: Suppression de tous les affichages du mode jeu
function fin_jeu(){
	affiche_commentaire.innerHTML = "";
	affiche_chrono.innerHTML = "";
	affiche_touche_suivante.innerHTML = "";
	affiche_touche.innerHTML = "";
	affiche_point.innerHTML = "";
	affiche_niveau.innerHTML = "";
	elt_fleche.className = "";
	elt_fleche_suivante.className = "";
}


// Affiche le commentaire pendant le jeu, pendant 1sec
function commentaire(com){
	// console.log("commentaire: "+com);
	affiche_commentaire.innerHTML = com;
	setTimeout(function(){
		affiche_commentaire.innerHTML = "";
	}, 1000);
}


// Le mouvement n'a pas été effectué (pas de touche ou mauvaise touche appuyée)
function IlSEstTrompe(){
    // console.log('Erreur de mouvement');
	vie --;
	commentaire("Erreur");
}