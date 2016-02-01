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
	
	if(ev.keyCode === 37){
		console.log("Gauche");
		// bras_g.className= "move2"; 
	} else if(ev.keyCode === 39) {
		console.log("Droite");
		bras_d.className= "bras_droit_move2"; 
		setTimeout(retourNormal, 350);
	}
}

function retourNormal(){
	bras_d.className= "bras_droit_move1";
}