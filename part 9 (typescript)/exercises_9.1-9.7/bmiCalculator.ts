type Operation = 'multiply' | 'add' | 'divide';

const calculatebmi = (a: number, b: number): string  => {

  var bmi = a/b;

  if (a<18) {
    return "meh"
  } else if (a>29) {
    return "fatty"
  } else {
    return "average";
  }
}
console.log(calculatebmi(18, 29))