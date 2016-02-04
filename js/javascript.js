var bras_d = document.getElementById('bras_droit');
var bras_g = document.getElementById('bras_gauche');
var jambe_d = document.getElementById('jambe_droite');
var jambe_g = document.getElementById('jambe_gauche');
var b = document.getElementsByTagName('body')[0];

// création d'un tableau qui rassemble les mouvements dispo dans le css (pour la fonction random notamment)
var position_bras = [180, -135, -90, -45, 45, 90, 135, -180, -360, 360, 0];

// initialisation de la position des bras (pour la touche entrée et suppr)
var position_bras_droit = position_bras[3];
var position_bras_gauche = position_bras[4];
		

$(function() {
	$('[id*="interface"]').css('display', 'none');
	$('#game').css('display', 'none');
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
	});

	$('#character_nice_2').click(function(){
		$('#tete').addClass('teteBisounours');
	});

	$('#character_nice_3').click(function(){
		$('#tete').addClass('teteSchtroumph');
	});

	// Méchant
	$('#character_bad_1').click(function(){
		$('#tete').addClass('teteHitler');
	});

	$('#character_bad_2').click(function(){
		$('#tete').addClass('teteStaline');
	});

	$('#character_bad_3').click(function(){
		$('#tete').addClass('teteObama');
	});

	// Lancer le jeu
	$('.play').click(function(){
		$('[id*="interface"]').css('display', 'none');
		$('#game').css('display', 'block');
	});

	
	$('#change').click(function(){
		$('#game').css('display', 'none');
		$('#choice').css('display', 'block');
	});

});

// Permet de bouger les bras selon son côté et l'angle de destination
// Retour à la normal par la suite
function bougeBras(elt, angle){

    elt.classList.add('bras_move_' + angle);
	
	// Selon l'angle de destination, le temps de retour n'est pas le même, ainsi que le traitement du retour
	if (angle>-360 && angle<360) {
		setTimeout(function(){
			elt.classList.remove('bras_move_' + angle);
		},350);
	} else {
		setTimeout(function(){
			elt.classList.remove('bras_move_' + angle);
			bougeBras(elt, 0);
		},750);
	}
    
}

// Activation des mouvements en fonction de la touche appuyée
function keyd(ev) {
	console.log(ev.keyCode);
	
	switch (ev.keyCode) {
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
			break;
		case 37: // Gauche
			console.log("A Gauche");
			bougeBras(bras_g, position_bras[6]);
            bougeBras(bras_d, position_bras[5]);

			break;
		case 38: // Haut
			console.log("En haut");
			bougeBras(bras_g, position_bras[6]);
            bougeBras(bras_d, position_bras[1]);

			break;
		case 39: // Droite
			console.log("A Droite");
			bougeBras(bras_g, position_bras[2]);
            bougeBras(bras_d, position_bras[1]);

			break;
		case 40: // Bas
			console.log("En bas");
			bougeBras(bras_g, position_bras[4]);
            bougeBras(bras_d, position_bras[3]);

		case 65: // A
			console.log("A");
			break;
		case 69: // E
			console.log("E");
			break;
		case 82: // R -> Random positiion
			console.log("Random");
			bougeBras(bras_g, position_bras[Math.floor(Math.random()*position_bras.length)]);
			bougeBras(bras_d, position_bras[Math.floor(Math.random()*position_bras.length)]);
			break;
		case 84: // T
			console.log("Tout en haut");
			bougeBras(bras_g, position_bras[0]);
			bougeBras(bras_d, position_bras[7]);
			break;
		case 89: // Y
			console.log("Tour complet");
			bougeBras(bras_g, position_bras[8]);
			setTimeout(function(){
				bougeBras(bras_d, position_bras[9]);
			},50);
			break;
		case 90: // Z
			console.log("Z");
			break;
	}
}
