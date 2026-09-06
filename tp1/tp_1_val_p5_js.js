let fondo;
let stella =[];
let estado ="tranquila";
let frameActual=0;
let tiempoAnterior =0;
let tiempoEstado =0;
let tiempoSalto =0;
let velocidadNormal =700;
let velocidadRapida =300;
let xStella =170;
let yStella =470;
let anchoStella =180;
let altoStella =180;
let xInicioSalto=0;
let movimientoX=0;
let movimientoY=0;

function preload() {
  fondo = loadImage("data/Fondo0.png");

   for (let i=0;i<5;i++) {
    stella[i] =loadImage("data/Stella"+i+".png");
  }
}
function setup() {
  createCanvas(800, 600);
  tiempoAnterior = millis();
  tiempoEstado = millis();
}
function draw() {
  imageMode(CORNER);
  image(fondo,0,0,width,height);

  if (estado == "tranquila") {
    dibujarStella(stella[0],xStella,yStella,anchoStella,altoStella);
    if (millis()-tiempoEstado>2200) {
      estado = "emociones";
     frameActual =0;
    tiempoAnterior =millis();
    tiempoEstado =millis();
    }
  }

  else if (estado=="emociones") {
    xStella=xStella+0.3;
    
    dibujarStella(stella[frameActual],xStella,yStella,anchoStella,altoStella);

    if (millis() -tiempoAnterior>velocidadNormal) {
      frameActual =frameActual +1;
      tiempoAnterior =millis();
   if (terminoSecuencia(frameActual,stella.length)) {
estado="nerviosa";
frameActual=0;
tiempoAnterior=millis();
tiempoEstado=millis();
   }
    }
  }
    

else if (estado=="nerviosa"){
  if (millis() -tiempoAnterior>velocidadRapida) {

      frameActual =frameActual+1;
      if (frameActual>=stella.length) {
        frameActual = 0;
      }
  tiempoAnterior=millis();
  }
    
    
  
  movimientoX=random(-2,2);
  movimientoY=random(-2,2);
 

    dibujarStella(stella[frameActual],xStella+movimientoX,yStella+movimientoY,anchoStella,altoStella );

    if (millis()-tiempoEstado>2500) {
    estado ="salto";
    xInicioSalto=xStella;
    tiempoEstado=millis();
    
    }
  }

  else if (estado == "salto") {
     tiempoSalto =millis() -tiempoEstado;
 xStella=map(tiempoSalto,0,1200,xInicioSalto,xInicioSalto+260);

    if (tiempoSalto<600){
      yStella=map(tiempoSalto,0,600,470,350);
    }else{
      yStella=map(tiempoSalto,600,1200,350,470);
      
  }
   dibujarStella( stella[4],xStella,yStella,anchoStella,altoStella);
   if(tiempoSalto>1200){
     yStella=470
  estado ="alegre";
  tiempoEstado=millis();
   }
 }
 else if(estado=="alegre"){
   
    dibujarStella(stella[4],xStella,yStella,anchoStella,altoStella);
    if (millis() - tiempoEstado>1800){
      estado="seVa";
      
    }
  }
  else if (estado=="seVa"){
    xStella=xStella+2;
   
 dibujarStella(stella[4],xStella,yStella,anchoStella,altoStella);
 if(xStella>width+100){
   estado="final";
 }
  }
  else if(estado=="final"){ 
   
 fill(0);
   textAlign(CENTER);
  textSize(38);
  text("FIN",width/2,280);
  textSize(22);
    text("PRESIONA R PARA REINICIAR",width/2,530);
  }
}
function dibujarStella(imagen,x,y,ancho,alto) {
  imageMode(CENTER);
  image(imagen,x,y,ancho,alto);
  imageMode(CORNER);
}
function terminoSecuencia(frame,cantidadFrames){
  if (frame>= cantidadFrames){
    return true;
  } else{
    return false;
  }
}


function keyPressed() {
  if (key =="r" || key =="R") {
    estado = "tranquila";
    frameActual =0;
    xStella =170;
    yStella =470;
    tiempoSalto=0;
    xInicioSalto=0;
    tiempoAnterior=millis();
    tiempoEstado=millis();
  }
}
