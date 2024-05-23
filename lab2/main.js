
// lab2.1

// mảng sảy ra các sự kiện

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);



// 1: Hãy tạo ra 1 mảng các sự kiện khác nhau xảy ra trong suốt trận đấu (lưu ý là
// không trùng nhau)
console.log("Bài 1: ");
const event = [...new Set(gameEvents.values())];
console.log(event);
// 2:  Sau khi trò chơi kết thúc, phát hiện ra rằng thẻ vàng phút 64 là không đúng. Hãy
// xóa nó khỏi danh sách sự kiện trong trận đấu.
console.log("Bài 2: ");

gameEvents.delete(64);
console.log(gameEvents);


// 3: In ra console theo định dang như sau:"1 sự kiện xảy ra, trung bình mỗi 9 phút".
// Lưu ý răng mỗi trận đấu có 90 phút.
console.log("Bài 3: ");

const totalEvents = gameEvents.size;
const totalMinutes = 90;
console.log(`1 sự kiện xảy ra, trung bình mỗi ${totalMinutes / totalEvents} phút`);

// 4. Lặp toàn bộ mảng sự kiện và in ra màn hình, đánh dấu đối với mỗi sự kiện trong
// trận đấu diễn ra trong hiệp 1 hay hiệp 2,
console.log("Bài 4: ");

for (let [key, value] of gameEvents) {
  const half = key < 54 ? "[FIRST HALF]" : "[SECOND HALF]";
  console.log(`${half} ${key} : ${value}`);
}


// lab 2.2:

console.log("");
console.log("Lab 2.2");
console.log("");


// Viết 1 chương trình nhận vào 1 danh sách các biến được viết theo kiểu
// underscore (ví dụ: ten_bien) và chuyển nó sang dạng camelCase (ví dụ: tenBien)
// Đầu vào sẽ đến từ một vùng văn bản được chèn vào DOM (xem mã bên dưới) và
// chuyển đổi sẽ xảy ra khi nhấn nút.

console.log('Bài 1');

const text21 = document.getElementById('text21');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let temp2 = text21.value;

next.addEventListener('click', () => {
  text21.value = '';
  const valueText21 = temp2;
  const arrText21 = valueText21.split('\n');
  for (const [index, value] of arrText21.entries()) {
    const [temp, ...rest] = value.toLowerCase().split('_');
    const second = rest.map(function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    first = temp.trim();
    const arrVar = first + second.join('');
    console.log(arrVar);

    text21.value += arrVar + '\n';
    next.classList.add('none');
    prev.classList.remove('none');
  }
});

prev.addEventListener('click',()=>{
  text21.value = temp2;
  next.classList.remove('none');
  prev.classList.add('none');
});


// lab 2.3
console.log("");
console.log("Lab 2.3");
console.log("");


console.log('Bài 1: ')

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}

// lab2.4

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();