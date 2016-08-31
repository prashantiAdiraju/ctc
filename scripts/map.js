var isActive = '4';
var isAct = '4';
var currReg;
//var currCt;
var currAct;
var active;
var fact = "http://www.easeus.com/images/actregs/";
var ext = ".gif";
var bigr = "R-";
var firstLoad = 0;
function chopReg(reg){
el('imb').src = fact + reg + ext; 
active = reg;
return;
}
function MakeActive(reg){
if(currAct){
if(active){
if(active == reg){return;}
else{
el('map_actregs').style.backgroundImage = 'url(' + fact + reg + ext + ')'; 
currAct = reg;
return;
}
}
else{
el('map_actregs').style.backgroundImage = 'url(' + fact + reg + ext + ')';
//el(bigr + reg).className="ract"; 
currAct = reg;
return;
}
}
else{
el('map_actregs').style.backgroundImage = 'url(' + fact + reg + ext + ')'; 
//el(bigr + reg).className="ract";
currAct = reg;
return;
}
}
function MakeInActive(reg){
if(active){
if(active == reg){return;}
}
el('map_actregs').style.backgroundImage = 'url(/images/actregs/0.gif)'; 
//el(bigr + reg).className="regarr";
return;
}

function el(o){
return document.getElementById(o);
}