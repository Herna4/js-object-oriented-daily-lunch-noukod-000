// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

//has many deliveries
//has many customers, through deliveries
//has many meals, through deliveries
class Neighborhood {
    constructor(name) {
      this.name = name;
      this.id = ++neighborhoodId;
  
      store.neighborhoods.push(this)
    }
  
    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    }
  
    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id)
    }
  
    meals() {
      const meals = this.deliveries().map(delivery =>
        delivery.meal())
      return [...new Set(meals)]
    }
  }
  
  //belongs to a neighborhood
  //has many deliveries
  //has many meals, through deliveries
  class Customer {
    constructor(name, neighborhoodId) {
      this.name = name;
      this.id = ++customerId;
      this.neighborhoodId = neighborhoodId;
  
      store.customers.push(this)
    }
  
    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }
  
    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }
  
    totalSpent() {
      return this.meals().reduce((total, meal) => total + meal.price, 0)
    }
  }
  
  //has many customers
  class Meal {
    constructor(title, price){
      this.title = title;
      this.price = price;
      this.id = ++mealId;
  
      store.meals.push(this)
    }
  
    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }
  
    customers() {
      return this.deliveries().map(delivery => delivery.customer());
    }
    
    static byPrice() {
        return store.meals.sort((meal1, meal2 => meal1.price < meal2.price));
    }
    // static byPrice() {
    //   return store.meals.sort(function (meal1, meal2) {
    //     return meal2.price - meal1.price;
    //   })
    // }
  }
  
  //JOIN TABLE
  //belongs to meal
  //belongs to customer
  //belongs to neighborhood
  class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++deliveryId;
  
      store.deliveries.push(this)
    }
  
    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }
  
    customer() {
      return store.customers.find(customer => customer.id === this.customerId);
    }
  
    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }
  }



















// class Neighborhood{
//     constructor(name){
//         this.id =++neighborhoodId;
//         this.name = name;

//         store.neighborhoods.push(this);
//     }

//     deliveries() {
//         return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id ); 
//     }

//     customers() {
//         return store.customers.filter(customer => customer.neighborhoodId === this.id ); 
//     }

//     meals(){
//         return store.meals.filter(
//           function(meals) {
//             return this.deliveries().map(delivery => {
//               return delivery.meal();
//             })
//             return meals.neighborhoodId === this.id;
//           }.bind(this)
//         );
//     }
// }

// class Customer{
//     constructor(name){
//         this.id =++customer;
//         this.neighborhoodId = neighborhood.id;
//         this.name = name;

//         store.customers.push(this);
//     }

//     deliveries(){
//         return store.deliveries.filter(delivery => delivery.customerId === this.id)
//     }

//     meals() {
//         return this.deliveries().map(delivery => delivery.meals());
//     }

//     totalSpent() {
//         return this.meals.reducr((total, meal) => total + meal.price, 0)
//     }
// }


