

// lab 7.1
console.log('Lab 7.1: ');

function FCar(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  
  FCar.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  };
  
  FCar.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  };
  
  // Khởi tạo 2 đối tượng ô tô
  const car1 = new FCar('BMW', 120);
  const car2 = new FCar('Mercedes', 95);
  
  // Gọi phương thức accelerate và brake
  car1.accelerate();
  car1.brake();
  car2.accelerate();
  car2.brake();
  


  // lab 7.2

console.log('');
console.log('Lab 7.2: ');
console.log('');


  class Car {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
  
    accelerate() {
      this.speed += 10;
      console.log(`${this.make} going at ${this.speed} km/h`);
    }
  
    brake() {
      this.speed -= 5;
      console.log(`${this.make} going at ${this.speed} km/h`);
    }
  
    get speedUS() {
      return this.speed / 1.6;
    }
  
    set speedUS(speed) {
      this.speed = speed * 1.6;
    }
  }
  
  // Khởi tạo đối tượng ô tô
  const ford = new Car('Ford', 120);
  
  // Thực hiện các phương thức
  ford.accelerate();
  ford.brake();
  console.log(ford.speedUS); // Getter
  ford.speedUS = 50; // Setter
  console.log(ford.speed); // Kiểm tra lại tốc độ sau khi dùng setter

  

  // lab 7.3
  console.log('');
  console.log('Lab 7.3: ');
  console.log('');

  function ElectricCar(make, speed, charge) {
    FCar.call(this, make, speed);
    this.charge = charge;
  }
  
  // Kế thừa prototype của Car
  ElectricCar.prototype = Object.create(FCar.prototype);
  
  ElectricCar.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
  };
  
  ElectricCar.prototype.accelerate = function() {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
  };
  
  // Khởi tạo đối tượng ElectricCar
  const tesla = new ElectricCar('Tesla', 120, 23);
  
  // Thực hiện các phương thức
  tesla.accelerate();
  tesla.brake();
  tesla.chargeBattery(90);
  console.log(tesla);

  

    // lab 7.4

    console.log('');
    console.log('Lab 7.4: ');
    console.log('');

    class Account {
        // Public fields (instances)
        locale = navigator.language;
        
        // Private fields (instances)
        #movements = [];
        #pin;
        
        constructor(owner, currency, pin) {
          this.owner = owner;
          this.currency = currency;
          this.#pin = pin;
          console.log(`Thanks for opening an account, ${owner}`);
        }
      
        // Public methods
        getMovements() {
          return this.#movements;
        }
      
        deposit(val) {
          this.#movements.push(val);
          return this;
        }
      
        withdraw(val) {
          this.deposit(-val);
          return this;
        }
      
        requestLoan(val) {
          if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
            return this;
          }
        }
      
        static helper() {
          console.log('Helper');
        }
      
        // Private methods
        _approveLoan(val) {
          return true;
        }
      }
      
      const acc1 = new Account('Jonas', 'EUR', 1111);
      
      // Thực hiện các phương thức
      acc1.deposit(250);
      acc1.withdraw(140);
      acc1.requestLoan(1000);
      console.log(acc1.getMovements());
      Account.helper();
      
      // Chaining
      acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
      console.log(acc1.getMovements());

      
        // lab 7.5

        console.log('');
        console.log('Lab 7.5: ');
        console.log('');

        class CarCl {
            constructor(make, speed) {
              this.make = make;
              this.speed = speed;
            }
          
            accelerate() {
              this.speed += 10;
              console.log(`${this.make} going at ${this.speed} km/h`);
            }
          
            brake() {
              this.speed -= 5;
              console.log(`${this.make} going at ${this.speed} km/h`);
            }
          }
          
          class EVCL extends CarCl {
            #charge;
            
            constructor(make, speed, charge) {
              super(make, speed);
              this.#charge = charge;
            }
          
            chargeBattery(chargeTo) {
              this.#charge = chargeTo;
            }
          
            accelerate() {
              this.speed += 20;
              this.#charge -= 1;
              console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
            }
          }
          
          // Khởi tạo đối tượng EVCL
          const rivian = new EVCL('Rivian', 120, 23);
          
          // Thực hiện các phương thức
          rivian.accelerate();
          rivian.brake();
          rivian.chargeBattery(90);
          console.log(rivian);
          