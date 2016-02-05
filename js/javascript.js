var bras_d = document.getElementById('bras_droit');
var bras_g = document.getElementById('bras_gauche');
var jambe_d = document.getElementById('jambe_droite');
var jambe_g = document.getElementById('jambe_gauche');
var affiche_niveau = document.getElementById('niveau');
var affiche_point = document.getElementById('point');
var affiche_touche = document.getElementById('touche');
var affiche_touche_suivante = document.getElementById('touche_suivante');
var affiche_commentaire = document.getElementById('commentaire');
var affiche_chrono = document.getElementById('chrono');
var b = document.getElementsByTagName('body')[0];


// création d'un tableau qui rassemble les mouvements dispo dans le css (pour la fonction random notamment)
var position_bras = [-360, -315, -270, -225, -180, -135, -90, -45, 0, 45, 90, 135, 180, 225, 270, 315, 360];

// initialisation de la position des bras (pour la touche entrée et suppr)
var position_bras_droit = position_bras[3];
var position_bras_gauche = position_bras[4];


// Mode jeu
var isPlaying = false;
var listeEnchainements = [37,38,39,40];
var first_game = [37, 38, 39, 40, 30, 38, 37];
var touche_attendue;
var prochaine_touche;
var frequence = 5000;
var ATIlAppuye;
var enchainement = [listeEnchainements, first_game];
var point = 0;
var vie = 3;
		

$(function() {
	$('#interface').css('display', 'none');
	$('#game').css('display', 'block');

	
	b.addEventListener('keyup',  function(e){
		if (isPlaying){
			play(e);
		} else {
			keyMoves(e);
		}
	});

var audio = $('audio');
var playlist = $('#playlist'); 
var tracks = playlist.find('li a');
var current = 0;
		

$(function() {
	$('[id*="interface"]').css('display', 'none');
	$('#game').css('display', 'none');
	$('#player').css('display', 'none');
	b.addEventListener('keyup',  keyd);

	
	// Choix du bouton "tu es gentil" avec affichage du slider des gentils
	$('#good_character').click(function(){
		$('#interface_nice').css('display', 'block');
		$('#caroussel_nice').addClass('active');
		$('#caroussel_bad').removeClass('active');
		$('#choice').css('display', 'none');
	});

	// Choix du bouton "tu es méchant" avec affichage du slider des méchants
	$('#bad_character').click(function(){
		$('#interface_bad').css('display', 'block');
		$('#caroussel_bad').addClass('active');
		$('#caroussel_nice').removeClass('active');
		$('#choice').css('display', 'none');
	});

	// Liste des personnages présent sur le caroussel
	$(".prev").click(function(){
			$(".active ul li:first").before(
				$(".active ul li:last"));
			$(".active ul").css({left:-300});
			$(".active ul").animate({left:0}, 1000);
	});

	$(".next").click(function(){
		$(".active ul").animate({left:-300},1000, function (){
			$(".active ul li:last").after(
				$(".active ul li:first"));
				$(this).css({left:0});
		});
	});

	// Changer la class du personnage pour changer son visage

	// Gentil
	$('#character_nice_1').click(function(){
		$('#tete').addClass('teteDora');
		$('#tete').removeClass('teteDefault');
	});

	$('#character_nice_2').click(function(){
		$('#tete').addClass('teteBisounours');
		$('#tete').removeClass('teteDefault');
	});

	$('#character_nice_3').click(function(){
		$('#tete').addClass('teteSchtroumph');
		$('#tete').removeClass('teteDefault');
	});

	// Méchant
	$('#character_bad_1').click(function(){
		$('#tete').addClass('teteHitler');
		$('#tete').removeClass('teteDefault');
	});

	$('#character_bad_2').click(function(){
		$('#tete').addClass('teteStaline');
		$('#tete').removeClass('teteDefault');
	});

	$('#character_bad_3').click(function(){
		$('#tete').addClass('teteObama');
		$('#tete').removeClass('teteDefault');
	});

	// Lancer le jeu
	$('.play').click(function(){
		$('[id*="interface"]').css('display', 'none');
		$('#game').css('display', 'block');
		$('#player').css('display', 'block');
	});

	
	$('#change').click(function(){
		$('#game').css('display', 'none');
		$('#player').css('display', 'none');
		$('#choice').css('display', 'block');
		$('#audio').off('play');
	});

	init();

});

function init(){
    len = tracks.length - 1;
    audio[0].volume = 1;
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}

// Permet de bouger les bras selon son côté et l'angle de destination
// Retour à la normal par la suite
function bougeBras(elt, angle){
	
	// Selon l'angle de destination, le temps de retour n'est pas le même, ainsi que le traitement du retour
	elt.classList.add('bras_move_' + angle);
    setTimeout(function(){
        elt.classList.remove('bras_move_' + angle);
    }, (Math.abs(angle) > 180 || Math.abs(angle) < -180) ? 750 : 350);
    
}


// Activation des mouvements en fonction de la touche appuyée, dispo en mode jeu
function fleches(ev){ 
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
			bougeBras(bras_g, position_bras_gauche);
            bougeBras(bras_d, position_bras_droit);
			
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
	
			bougeBras(bras_g, position_bras_gauche);
            bougeBras(bras_d, position_bras_droit);
			break;
		case 32: // Espace
			console.log("Saute");
			if (isPlaying && !firstPlay) {
				console.log("Espace");
			} else if (isPlaying){
				firstPlay =! firstPlay;
				playingMode(ev);
			} else {
				bougeBras(bras_g, position_bras[11]);
				bougeBras(bras_d, position_bras[5]);
			}
			break;
		case 37: // Gauche
			console.log("A Gauche");
			bougeBras(bras_g, position_bras[11]);
            bougeBras(bras_d, position_bras[2]);

			break;
		case 38: // Haut
			console.log("En haut");
			bougeBras(bras_g, position_bras[11]);
            bougeBras(bras_d, position_bras[5]);

			break;
		case 39: // Droite
			console.log("A Droite");
			bougeBras(bras_g, position_bras[14]);
            bougeBras(bras_d, position_bras[5]);

			break;
		case 40: // Bas
			console.log("En bas");
			bougeBras(bras_g, position_bras[9]);
            bougeBras(bras_d, position_bras[7]);
			break;
		case 80: // P -> Play
			if (isPlaying) {}
			console.log("1: "+isPlaying);
			isPlaying = !isPlaying;
			if (isPlaying){
				console.log("Play Mode");
				console.log("2: "+isPlaying);
				point = 0;
				vie = 3;
				frequence = 5000;
				jouerLeStep(0, 0);
			}else {
				console.log("Quit playing mode");
				console.log("3: "+isPlaying);
				firstPlay = true;
			}
            break;
	}
}

// Calcule d'un angle aléatoire entre -360 et 360, en multiple de 45
function angle_rdm(){
	var _rdm = Math.round((Math.random() * (8 - (-8)) + (-8))) * 45;
	return _rdm;
}

// Activation des mouvements en fonction de la touche appuyée, pas dispo en mode jeu
function keyMoves(ev) {
	console.log(ev.keyCode);
	
	fleches(ev);
	switch (ev.keyCode) {
		case 65: // A
			console.log("A");
			break;
		case 69: // E
			console.log("E");
			break;
		case 82: // R -> Random positiion
			console.log("Random");
			bougeBras(bras_g, angle_rdm());
			bougeBras(bras_d, angle_rdm());
			break;
		case 84: // T
			console.log("Tout en haut");
			bougeBras(bras_g, position_bras[12]);
			bougeBras(bras_d, position_bras[4]);
			break;
		case 89: // Y
			console.log("Tour complet");
			bougeBras(bras_g, position_bras[16]);
			setTimeout(function(){
				bougeBras(bras_d, position_bras[0]);
			},50);
			break;
		case 90: // Z
			console.log("Z");
			break;
	}
}

function play(ev){

    fleches(ev);

    ATIlAppuye = true;
    console.log('touche appuyée');

    if (ev.keyCode === touche_attendue){
        console.log('bravo');
		point++;
		affiche_point.innerHTML = point;
    } else {
        console.log('là');
        IlSEstTrompe();
    }

}

function jouerLeStep(pas, niveau){
	// console.log("tab:"+enchainement);
    niveauEnCours = enchainement[niveau];
	affiche_niveau.innerHTML = "Niveau: "+niveau + 1;
	// console.log(niveauEnCours);
    touche_attendue = niveauEnCours[pas];
	affiche_touche.innerHTML = "Appuies sur la touche : "+touche_attendue;
	
	if (pas + 1 < niveauEnCours.length) {
		prochaine_touche = niveauEnCours[pas+1];
	} else if (niveau + 1 < enchainement.length){
		niveau_suivant = enchainement[niveau + 1];
		prochaine_touche = niveau_suivant[0];
	} else {
		prochaine_touche = "";
	}
	affiche_touche_suivante.innerHTML = "Prochaine touche: "+prochaine_touche;
	
    ATIlAppuye = false;

    console.log('Attendu', touche_attendue);
    console.log('Niveau', niveau + 1);
	var compteur = frequence/1000;
	affiche_chrono.innerHTML = "Chrono: "+compteur;
	var timer = setInterval(function(){
		affiche_chrono.innerHTML = "Chrono: "+compteur;
		compteur--;
	}, 1000);

    setTimeout(function(){
        if (!ATIlAppuye){
            console.log('ici');
            IlSEstTrompe();
        }
		if (vie >= 0) {
			if (pas + 1 < niveauEnCours.length) {
				jouerLeStep(pas + 1, niveau);
			} else if (niveau + 1 < enchainement.length){
				affiche_commentaire.innerHTML = "Passage au niveau supérieur";
				frequence = frequence - 1000;
				jouerLeStep(0, niveau+1)
			} else {
				console.log("Fin du jeu !");
				affiche_commentaire.innerHTML = "Félicitation";
			}
		} else {
			console.log("Game Over");
			affiche_commentaire.innerHTML = "Game Over";
			clearInterval(timer);
		}
        
    }, frequence);
}

function IlSEstTrompe(){
    console.log('Erreur de mouvement');
	vie --;
	affiche_commentaire.innerHTML = "Erreur !";
}