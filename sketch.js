    var dog, dogImg, dogImg2, bgImg, bedroomimg, gardenimg, livingroomimg, washroomimg, milkimg;
    var database;
    var foodd, foodS, foodStock;
    var stock = 20;
    var feedbutton,addfoodbutton;
    var namee;
var lastFed,currentTime;
    function preload(){

    bgImg = loadImage("images/Ground.jpg");
    dogImg = loadImage("images/dogImg.png");
    dogImg2 = loadImage("images/dogImg1.png");
    bedroomimg = loadImage("images/Bed Room.png");
    gardenimg = loadImage("images/Garden.png");
    livingroomimg = loadImage("images/Living Room.png");
    washroomimg = loadImage("images/Wash Room.png");
    milkimg = loadImage("images/Milk.png");
    }



    function setup() {

    createCanvas(1000, 500);

    database=firebase.database();

    dog = createSprite(800,340,50,50);
    dog.addImage(dogImg);
    dog.scale=0.2;

    foodd = new Food();

   
    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    nameref=database.ref("name");
    nameref.on("value", function(data){
    namee =data.val();
})

    fedtime=database.ref('lastFed');
    fedtime.on("value",function(data){
        lastFed=data.val();
    })
    
    readState=database.ref('gameState');
    readState.on("value",function(data){
      gameState=data.val();
    })

    feedbutton = createButton("Feed The Dog Milk");
    feedbutton.position(200,100);
    feedbutton.mousePressed(feedDog);

    addfoodbutton = createButton("Add milk bottles to the stock");
    addfoodbutton.position(170,140);
    addfoodbutton.mousePressed(addFood);

    input=createInput();
    input.position(540,140);


    button=createButton("SUBMIT");
    button.position(670,140);
    button.mousePressed(renameDog);

    }






    function draw() {  

    background(bgImg);
    
    //foodd.display();

    currentTime=hour();
    if(currentTime===(lastFed+1)){
        update("Playing");
        foodd.garden();
     }else if(currentTime===(lastFed+2)){
      update("Sleeping");
        foodd.bedroom();
     }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
      update("Bathing");
        foodd.washroom();
     }else{
      update("Hungry")
      foodd.display();
     }
     
     if(gameState!="Hungry"){
       feedbutton.hide();
       addfoodbutton.hide();
       dog.remove();
     }else{
      feedbutton.show();
      addfoodbutton.show();
     // dog.addImage(dogImg2);
     }
   

 
//milk.visible=false;


    drawSprites();
    textSize(15);
    strokeWeight(3);
    fill("red");
    textFont("TimeS new Roman");
    text("Your Pet Dog a Name--",385,80);
    if(namee){
    text("Hello "+ namee,430,140);
}
    stroke("yellow");
    textSize(45);
    textFont("Chiller");
    text("Remaining Food Stock = "+ foodS+".",290,40);
  //  textSize(25);
 //   strokeWeight(5);
  //  fill("YELLOW")
  //  textFont("TIMES NEW ");
 //   stroke("RED");
   // text("Note : This is version 2.0 of Virtual Pet ! ",10,200);

    }




    function readStock(data){

    foodS = data.val();
    foodd.updateFoodStock(foodS);
    console.log(foodS);

    }

    function ShowError(){

    console.warn("Error is There in fetching Data")
    }

    function feedDog(){
    if(foodS>0){
    dog.addImage(dogImg2);
    foodd.x =300;
    foodd.updateFoodStock(foodd.getFoodStock()-1);
    database.ref('/').update({
    Food:foodd.getFoodStock()
    })
    milk = createSprite(600,350,20,20);
    milk.addImage(milkimg);
    milk.scale=0.07;
    //milk.visible=true;
    milk.velocityX = 5;
     if(milk.x<=700){
      milk.destroy();

     }
    }else{
    dog.addImage(dogImg);
  
    }
    }

    function addFood(){
    dog.addImage(dogImg);
    if(foodS>-1 && foodS<20){
    foodd.updateFoodStock(foodd.getFoodStock()+1);
    database.ref('/').update({
    Food:foodd.getFoodStock()
    })
    }
    }

    function renameDog(){

    Name=input.value();
    button.hide();
    input.hide();
    database.ref('/').update({
    name:Name
    })

    }


    function update(state){
        database.ref('/').update({
          gameState:state
        })
      }