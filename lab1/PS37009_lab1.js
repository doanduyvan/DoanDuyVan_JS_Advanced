// lab1.1


// api
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scorers: {
        Davies : 1,
        Muller : 1,
        Lewandowski : 2,
        Kimmich: 3
    },
    scored: ['Davies', 'Muller', 'Lewandowski', 'Kimmich'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// lab1.1

// bai 1: Tạo ra 1 mảng cầu thủ cho mỗi đội (variables 'players1' and 'players2')

const [players1,players2] = game.players;
console.log("Bài 1:");
console.log(players1);
console.log(players2);


// bai 2: Phần tử đầu tiên trong mảng là Thủ môn, các phần tử còn lại sẽ là các cầu thủ ở
// các vị trí khác. Ví dụ, Bayern Munich (team 1) bạn sẽ tạo 1 biến ('gk') với tên của
// thủ môn, and one array ('fieldPlayers') with all the remaining 10 field players

const [gk,...fieldPlayers] = players1;
console.log("Bài 2: ");
console.log(gk);
console.log(fieldPlayers);

// bai3: Tạo 1 mảng 'allPlayers' bao gồm toàn bộ 22 cầu thủ trên sân

const allPlayers = [...players1,...players2];
console.log("Bài 3:");
console.log(allPlayers);

// bai4: Trong trận đấu, Bayern Munich (team 1) sử dụng 3 quyền thay người. Hãy tạo 1
// mảng mới ('players1Final') gôm các cầu thủ ban đầu của Bayern rồi thêm vào
// 'Thiago', 'Coutinho' và 'Perisic'

const players1Final = [...players1,"Thiago","Coutinho","Perisic"];
console.log("Bài 4:");
console.log(players1Final);

// bai5 : Dựa vào object game.odds, tạo một biến thể hiện tỉ lệ kết quả trận đấu (gọi là
// 'team1', 'draw' và 'team2')

const {odds : {team1,x : draw , team2}} = game;
console.log("Bài 5:");
console.log(team1,draw,team2);

// bai6 : Viết 1 hàm ('printGoals') nhận vào 1 số tên cầu thủ đã ghi bàn (sử dụng toán tử
// spread) và in ra console tên những cầu thủ đó cùng với số cầu thủ đã ghi bàn

function printGoals(...ArrScored){
    console.log(`Có ${ArrScored.length} cầu thủ đã ghi bàn đó là ${ArrScored}`);
}
console.log("Bài 6:");
printGoals(...game.scored);

// bai7 : Đội có tỷ lệ chấp thấp hơn sẽ dành chiến thắng . In ra đội chiến thắng đó mà
// không sử dụng if/else hoặc toán tử 3 ngôi.


console.log("Bài 7:");
team1 < team2 && console.log("Đội dành chiến thắng là : ", game.team1);
team1 > team2 && console.log("Đội dành chiến thắng là : ", game.team2);
team1 == team2 && console.log("Cả hai đội hòa nhau");



console.log("");
console.log("Lab 1.2: ");
console.log("");



// lab 1.2


// bài 1: Lặp mảng game.scored array và in ra cầu thủ cùng với số bàn thắng đã ghi (Ví
// dụ: "Goal 1: Lewandowski")


// vì chưa hiểu đề nên em làm 2 kết quả, 1 cái lặp mảng game.scored
// và 1 cái lặp object chứa cầu thủ và kết quả ghi bàn trong phần thêm dưới cuối bài là tạo ra đối tượng game.scorers 
//1
console.log("Bài 1:");
for(let [i,player] of game.scored.entries()){
    // console.log(i,player);
    console.log(`Goal ${i+1}: ${player}`);
}

//2
for(let player in game.scorers){
    console.log(`Cầu thủ ${player} đã ghi ${game.scorers[player]} bàn thắng`);
}


// bài 2: Sử dụng vòng lặp để tính tỉ lệ kết quả trận đấu và in ra console (Chúng ta đã
// học cách tính trung bình tổng ở phần trước, các bạn có thể xem lại nếu không
// nhớ)

console.log("Bài 2:");

const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log("Tỉ lệ kết quá trận đấu là: ", average);


// bài 3: Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
console.log("Bài 3:");

for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team === 'x' ? 'hòa of draw: ' : `Thắng của ${game[team]}: `;
    console.log(`Tỷ lệ ${teamStr} ${odd}`);
}
