var bgImage, cityBg;
var balloon, balloonImage, balloonImage_end;
var obsTop1Image, obsTop2Image;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState= PLAY;

function preload(){
    bgImage= loadImage("assets/cityImage.png");
    balloonImage= loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    balloonImage_end= loadAnimation("assets/balloon1.png");
    obsTop1Image= loadImage("assets/obsTop1.png");
    obsTop2Image= loadImage("assets/obsTop2.png");
}

function setup(){
    createCanvas(700,560);

    //imagem de fundo
    cityBg= createSprite(350,280);
    cityBg.addImage(bgImage);
    cityBg.scale= 0.4;

    //personagem principal
    balloon= createSprite(100,200,20,50);
    balloon.addAnimation("balloon", balloonImage);
    balloon.addAnimation("collided", balloonImage_end);
    balloon.scale= 0.35;

    //grupo dos obstaculos
    obstaclesGroup= new Group();
}

function draw() {
    background("black");

    if(gameState==PLAY){

        //movendo o fundo
        cityBg.velocityX= -2;
        if(cityBg.x<200){
            cityBg.x=cityBg.width/2-750;
        }

        //movendo o personagem principal
        if(keyDown(UP_ARROW)){
            balloon.velocityY= -4;
        }
        //gravidade
        balloon.velocityY+= 0.4;

        //chamada da função dos obstaculos
        spawObstacles();

        //função para mudar de estado
        if(obstaclesGroup.isTouching(balloon)){
            gameState=END;
        }
    }

    if(gameState==END){
        //parando o personagem principal
        balloon.velocityX= 0;
        balloon.velocityY= 0;
        
        //parando o fundo
        cityBg.velocityX= 0;

        //alterando a animação
        balloon.changeAnimation("collided", balloonImage_end);

        //parando os obstaculos
        obstaclesGroup.setVelocityXEach(0);

        //tempo de vida para que subtraindo 1 nunca chegue em zero
        obstaclesGroup.setLifetimeEach(-1);
    }
 
    drawSprites();
   
}

//função para gerar os obstáculos
function spawObstacles(){
    if(frameCount%60==0){//%: analisa o resto da divisão, ou seja, o multiplo
        var obstacle= createSprite(650,50,40,50);
        obstacle.velocityX= -4;
        obstacle.y= Math.round(random(20,550));

        //gerando os obstaculos aleatorios
        var rand= Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(obsTop1Image);
            obstacle.scale= 0.2;
            break;

            case 2: obstacle.addImage(obsTop2Image);
            obstacle.scale= 0.1;
            break;

            default: break;
        }

        //lifetime: distância percorrida/velocidade
        obstacle.lifetime= 200;

        //adiconando no grupo
        obstaclesGroup.add(obstacle);
    }
}
