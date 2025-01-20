/*//String,Number,Boolean,Object,Array



//String
let firstname = 'John';
console.log(firstname);
const idcard = '1234';

//Number
let age = 25;
let height = 5.0;

//Boolean
let isMarried = false;
firstname = 'xxx';

console.log('My name is ' + firstname,' and I am  ' + age + ' year old ',);
/*
= เท่ากัน
!= ไม่เท่ากัน
> มากกว่า
< น้อยกว่า
>= มากกว่าหรือเท่ากับ
<= น้อยกว่าหรือเท่ากับ


let number1 = 5;
let number2 = 5;

let condition1 = number1 >= number2;//Boolean ค่าที่ได้จะเป็น true หรือ false
console.log('result of condition is ',condition1);*/
/*เกรด
>= 80 เป็นเกรด A
.>= 70 เป็นเกรด B
>= 60 เป็นเกรด C
>= 50 เป็นเกรด D


let score = prompt('Enter your Score: ');
console.log('your score is '+ score);
//if - else condition
if (score >= 80){ //ตรวจสอบถ้าเป็นเท็จไปอันถัดไป
    console.log('you are grade A'); //false
}else if(score >= 70){
    console.log('you are grade B'); //false
}else if(score >= 60){
    console.log('you are grade C'); //true
}else if(score >= 50){
    console.log('you are grade D');
}else if(score >= 50){
    console.log('you are grade F');
}*/
/*
&& และ
|| หรือ
! not หรือ ไม่


let number = 25;

if (!(number % 2 == 0)){
    console.log('your are even number');
}*/
/* Loop
while loop
for

let counter = 0;
console.log('while loop');

while (counter <= 10) {//เงื่อนไขต้องเป็นจริง
    console.log('while loop');
    counter = counter + 1;
}

for (let counter = 0; counter <10; counter = counter + 1){
    console.log('for loop');
}
*/
/* Array


let ages = [60,40,50,30];
console.log(ages);
ages.sort();//จัดเรียง
console.log(ages);

let name_list = ['John','Bob','Alice','Mary'];
name_list.push('Mike');
console.log(name_list.length);
console.log(name_list[0]);
console.log(name_list[1]);
console.log(name_list[2]);

for (let index =0; index < name_list.length; index++){
    console.log('names list',name_list[index]);
}


//1.แทนที่ค่าใน array
ages = [45,50];
console.log('new age', ages);

//2.ต่อ array
ages.push(55);
console.log('new age', ages);
*/
/* object

let student = [{
    name: 'zz',
    age: 90,
    grade: 'A'
}, {
    name: 'aa',
    age: 66,
    grade: 'B'
}];


for (let index =0; index < student.length; index++) { 
    console.log('Student number', (index + 1));
    console.log('name',student[index].name);
    console.log('age',student[index].name);
    console.log('grade',student[index].name);
}*/
/* object + array


let scores1 = 50
let scores2 = 90
let grade =''
//ประกาศ function คือ calculateGrade มี parameter เป็น scores
//Arrow funtion
let calculateGrade = (scores) =>{
if(scores >=80) {
    grades = 'A'
}else if(scores >=70){
    grades = 'B'
}else if(scores >=60){
    grades = 'C'
}else if(scores >=50){
    grades = 'D'
} else {
    grades = 'F'
}
return grades
}


let student1 = calculateGrade(scores1)
let student2 = calculateGrade(scores2)
console.log('grade:',student1,student2)
*/
/*Array 2

let scores = [10,20,30,40,];
let newScores = []

for (let index =0; index < scores.length; index++) {
    console.log('Score',scores[index]);
    /*
    if (scores[index] >=30) {
        newScores.push(scores[index]);
    }
        
}

let newScorse = scores.filter((s) => {
    return s >=20;
})

newScores.forEach((ns) => {
    console.log('New Score',ns);
})
*/
/*Object2


let students = [
    {
        name: 'John',
        score: 90,
        grade: 'A'
    },
    {
        name: 'Jane',
        score: 75,
        grade: 'B'
    },
    {
        name: 'Jim',
        score: 60,
        grade: 'C'
    }
]
let student = students.find((s) =>{
    if(s.name == 'Jane'){
        return true
    }
})
let doublescore_student = students.map((s)=>{
    s.score = s.score *2
})
let highscore_student = students.filter((s)=>{
    if(s.score >80){
        return true
    }
})
console.log('student',student)
console.log('highscore_student',highscore_student)
*/
let ages = [60,40,50,30];
console.log(ages);
ages.sort();//จัดเรียง
console.log(ages);

let name_list = ['John','Bob','Alice','Mary'];
name_list.push('Mike');
console.log(name_list.length);
console.log(name_list[0]);
console.log(name_list[1]);
console.log(name_list[2]);

for (let index =0; index < name_list.length; index++){
    console.log('names list',name_list[index]);
}


//1.แทนที่ค่าใน array
ages = [45,50];
console.log('new age', ages);

//2.ต่อ array
ages.push(55);
console.log('new age', ages);