var bras_d = document.getElementById('bras_droit');
var bras_g = document.getElementById('bras_gauche');
var jambe_d = document.getElementById('jambe_droite');
var jambe_g = document.getElementById('jambe_gauche');
var b = document.getElementsByTagName('body')[0];
var position_bras_droit = 2;
var position_bras_gauche = 5;
		

$(function() {
	b.addEventListener('keyup',  keyd);

	// Liste des personnages présent sur le caroussel
	$("#prev").click(function(){
			$("#caroussel ul li:first").before(
				$("#caroussel ul li:last"));
			$("#caroussel ul").css({left:-300});
			$("#caroussel ul").animate({left:0}, 1000);
	});

	$("#next").click(function(){
		$("#caroussel ul").animate({left:-300},1000, function (){
			$("#caroussel ul li:last").after(
				$("#caroussel ul li:first"));
				$(this).css({left:0});
		});
	});

	// Changer la class du personnage pour changer son visage
	$('#character1').click(function(){
		document.getElementById('tete').className='teteHitler';
	});

	$('#character2').click(function(){
		document.getElementById('tete').className='teteStaline';
	});

	$('#character3').click(function(){
		document.getElementById('tete').className='teteObama';
	});

	// Lancer le jeu
	$('#play').click(function(){
		$('#interface').css('display', 'none');
		$('#game').css('display', 'block');
	});

});

function keyd(ev) {
	console.log(ev.keyCode);
	
	switch (ev.keyCode) {
		case 8: // return
			if (position_bras_droit == 1) {
				position_bras_droit = 6;
			} else if  (position_bras_gauche == 1) {
				position_bras_gauche = 6;
			} else {
				position_bras_droit --;
				position_bras_gauche --;
			}
			bras_g.className= "bras_move"+position_bras_gauche; 
			bras_d.className= "bras_move"+position_bras_droit;
			break;
		case 13: // Entrée
			if (position_bras_droit == 6) {
				position_bras_droit = 1;
			} else if  (position_bras_gauche == 6) {
				position_bras_gauche = 1;
			} else {
				position_bras_droit ++;
				position_bras_gauche ++;
			}
			bras_g.className= "bras_move"+position_bras_gauche; 
			bras_d.className= "bras_move"+position_bras_droit;
			break;
		case 32: // Espace
			break;
		case 37: // Gauche
			console.log("A Gauche");
			bras_g.className= "bras_move6"; 
			bras_d.className= "bras_move5";
			setTimeout(retourNormal_bras_gauche, 350);
			setTimeout(retourNormal_bras_droit, 350);
			break;
		case 38: // Haut
			console.log("En haut");
			bras_d.className= "bras_move1"; 
			bras_g.className= "bras_move6"; 
			setTimeout(retourNormal_bras_droit, 350);
			setTimeout(retourNormal_bras_gauche, 350);
			break;
		case 39: // Droite
			console.log("A Droite");
			bras_d.className= "bras_move1"; 
			bras_g.className= "bras_move2"; 
			setTimeout(retourNormal_bras_droit, 350);
			setTimeout(retourNormal_bras_gauche, 350);
			break;
		case 40: // Bas
			console.log("En bas");
			bras_d.className= "bras_move3";
			bras_g.className= "bras_move4";
			setTimeout(retourNormal_bras_droit, 350);
			setTimeout(retourNormal_bras_gauche, 350); 	
		case 65: // A
			console.log("A");
			break;
		case 69: // E
			console.log("E");
			break;
		case 82: // R
			console.log("R");
			break;
		case 84: // T
			console.log("T");
			break;
		case 89: // Y
			console.log("Y");
			break;
		case 90: // Z
			console.log("Z");
			break;
	}
}

function retourNormal_bras_droit(){
	bras_d.className= "bras_move2";
}

function retourNormal_bras_gauche(){
	bras_g.className= "bras_move5";
}