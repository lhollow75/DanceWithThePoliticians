var bras_d = document.getElementById('bras_droit');
var bras_g = document.getElementById('bras_gauche');
var jambe_d = document.getElementById('jambe_droite');
var jambe_g = document.getElementById('jambe_gauche');
var b = document.getElementsByTagName('body')[0];
		

$(function() {
	b.addEventListener('keydown',  keyd);
});

function keyd(ev) {
	console.log(ev.keyCode);
	
	switch (ev.keyCode) {
		case 37:
			console.log("Gauche");
			bras_g.className= "bras_move4"; 
			setTimeout(retourNormal_bras_gauche, 350);
			break;
		case 38:
			console.log("Droite");
			bras_d.className= "bras_move1"; 
			bras_g.className= "bras_move6"; 
			setTimeout(retourNormal_bras_droit, 350);
			setTimeout(retourNormal_bras_gauche, 350);
			break;
		case 39:
			console.log("Droite");
			bras_d.className= "bras_move3"; 
			setTimeout(retourNormal_bras_droit, 350);
			break;
	}
}

function retourNormal_bras_droit(){
	bras_d.className= "bras_move2";
}

function retourNormal_bras_gauche(){
	bras_g.className= "bras_move5";
}