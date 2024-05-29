
// lab 3.2

console.log("Lab 3.2");
console.log("");
function checkDongs(dogsJulia, dogsKate) {
    // loại bỏ 2 con mèo đầu mảng và 2 con mèo cuối mảng
    let tempdogsJulia = dogsJulia.slice(2, -2);
    // nối 2 mảng chó lại với nhau
    let dogsfull = tempdogsJulia.concat(dogsKate);

    // in ra tuổi chó
    dogsfull.forEach((dog, i) => {
        if (dog >= 3) {
            console.log(`Chó số ${i + 1} là chó trưởng thành và ${dog} tuổi`);
        } else {
            console.log(`Chó số ${i + 1} vẫn là chó con 🐶`);
        }
    });
}

let data1 = {
    Julia: [3, 5, 2, 12, 7],
    Kate: [4, 1, 15, 8, 3]
}
let data2 = {
    Julia: [9, 16, 6, 8, 3],
    Kate: [10, 5, 6, 1, 4]
}

console.log("Data 1:");
checkDongs(data1.Julia, data1.Kate);
console.log("Data 2:");
checkDongs(data2.Julia, data2.Kate);


console.log("");
console.log("Lab 3.3");
console.log("");


function calcAverageHumanAge(ages) {

    // chuyển tuổi chó sang tuổi người
    let personAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    // lọc ra chó lớn hơn 18 tuổi
    let adultDogs = personAge.filter(age => age >= 18);
    // tính trung bình tuổi chó bằng tuổi người
    let average = adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;

    console.log(`Tuổi chó sang tuổi người: ${personAge}`);
    console.log(`Tuổi chó lớn hơn 18: ${adultDogs}`);
    console.log(`Tuổi chó trung bình: ${average}`);

}

let data3 = [5, 2, 4, 1, 15, 8, 3];
let data4 = [16, 6, 10, 5, 6, 1, 4];

console.log("Data 1:");
calcAverageHumanAge(data3);
console.log("Data 2:");
calcAverageHumanAge(data4);


console.log("");
console.log("Lab 3.4");
console.log("");


const dogs = [
    { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
    { weight: 8, curFood: 200, owners: ["Matilda"] },
    { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
    { weight: 32, curFood: 340, owners: ["Michael"] }
];

// 1 tạo thêm thuộc tính đề xuất khẩu phần ăn cho những con chó dựa trên cân nặng
dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));

// 2 // tìm chủ cho chó
const sarahDog = dogs.find(dog => dog.owners.includes("Sarah"));
let dogSarahEat = sarahDog.curFood > sarahDog.recommendedFood ? "nhiều" : "ít";
console.log(`Chó của Sarah ăn ${dogSarahEat} hơn cần thiết`);

// 3
// tìm chủ chó ăn quá nhiều

let ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recommendedFood)
    .flatMap(dog => dog.owners); 
// tìm chủ chó ăn quá ít
let ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recommendedFood)
    .flatMap(dog => dog.owners);


console.log("Chủ có ăn nhiều: ",ownersEatTooMuch);
console.log("Chủ chó ăn ít",ownersEatTooLittle);

// ------------


//  4: In ra chuỗi tương ứng
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//  5: Kiểm tra xem có chú chó nào có khẩu phần ăn chính xác với khẩu phần đề nghị
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//  6: Kiểm tra xem có chú chó nào có khẩu phần ăn hợp lý (không >10% hoặc <10% mức đề nghị)
const checkEatingOkay = dog => dog.curFood > dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//  7: In ra tất cả các chú chó có khẩu phần ăn hợp lý
console.log(dogs.filter(checkEatingOkay));

//  8: Tạo mảng chứa các chú chó mới và sắp xếp theo khẩu phần ăn đề nghị tăng dần
const dogsSorted = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);