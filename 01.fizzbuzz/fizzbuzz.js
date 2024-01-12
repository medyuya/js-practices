for (let i = 1; i <= 20; i++) {
  let output = '';
  if (i % 5 === 0 && i % 3 === 0) output += 'FizzBuzz';
  if (i % 3 === 0) output += 'Fizz';
  if (i % 5 === 0) output += 'Buzz';
  console.log(output || i);
}
