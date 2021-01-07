class Food{

   constructor(){
      this.foodStock = 20;
      this.lastfed;
    this.image = loadImage("images/Milk.png");
    
  }
   updateFoodStock(foodStock){
      this.foodStock=foodStock;

   }

   getFoodStock(){
      return this.foodStock;
   }

   getFedTime(lastFed){
      this.lastFed=lastFed;
   }

   deductFood(){
      if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
   }

   }
   display(){
      fill(255,255,254);
      textSize(15);
      fill(0)
      if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 50,30);
      }else if(lastFed==0){
          text("Last Feed : 12 PM",50,30);
      }else{
          text("Last Feed : "+ lastFed + " PM", 50,30);
      }
      var x = 40;
      var y = 310;

      imageMode(CENTER);
      if(this.foodStock!=0){

         for(var i =0; i<this.foodStock; i++){

            if(i%10===0){
               x=40;
               y=y+50;
            }
            image(this.image,x,y,50,50);
            x = x+40;
            }

         }

   }
   bedroom(){
      background(bedroomimg);  
  }
    
  garden(){
      background(gardenimg);  
  } 

  washroom(){
      background(washroomimg); 
  }
}
