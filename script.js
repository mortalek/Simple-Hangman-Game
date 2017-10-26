var entries = [
    'Bend the knee',
    'Biednemu zawsze wiatr w oczy',
    'Co głupi straci tym się mądry wzbogaci',
    'Co ma wisieć nie utonie',
    'Gdy kota nie ma myszy harcują',
    'Grosz do grosza a będzie kokosza',
    'Krowa która dużo ryczy mało mleka daje',
    'Nie chwal dnia przed zachodem słońca',
    'Lepiej ze swoimi płakać niż z obcymi skakać'
]
// all entries without digits

var entry = entries[Math.floor((Math.random() * entries.length))].toUpperCase();
var entry_mask = entry.replace(/[A-Z]|[ĄĘŁĆŃÓŚŻŹ]/g,'-');
var category = "Przysłowie";
var wrong_guess = 0;

var win = new Audio("win.mp3");
var lose = new Audio("lose.mp3");		
			

var alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ'.split('');


function wypisz_entry()
{
	document.getElementById("board").innerHTML = entry_mask;
}
function wypisz_kategorie()
{
	document.getElementById("category").innerHTML = category;
}
window.onload = start;

function start()
{	
	var tresc_diva ="";
	for (i=0; i<=34; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+alphabet[i]+'</div>';
		if ((i+1) % 7 ==0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}
	document.getElementById("alphabet").innerHTML = tresc_diva;
	wypisz_entry();
}

String.prototype.setSign = function(miejsce, znak)
{
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function check(nr)
{
	
	var correct = false;
	
	for(i=0; i<entry.length; i++)
	{
		if (entry.charAt(i) == alphabet[nr]) 
		{
			entry_mask = entry_mask.setSign(i,alphabet[nr]);
			correct = true;
		}
	}
	
	if(correct == true)
	{
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		wypisz_entry();
	}
	else
	{
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");		
		
		//guess
		wrong_guess++;
		var obraz = "img/s"+ wrong_guess + ".jpg";
		document.getElementById("hangman").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	//win
    if (entry == entry_mask)
	document.getElementById("alphabet").innerHTML  = "Podano prawidłowe hasło: "+entry+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    if (entry == entry_mask)
    win.play();
	//lose
	if (wrong_guess>=9)
	document.getElementById("alphabet").innerHTML  = "Przegrana! Prawidłowe hasło: "+entry+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    if (wrong_guess>=9)
    lose.play();
}