function checkEvenOdd(num: number): string {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(checkEvenOdd(10)); // Output: Even
console.log(checkEvenOdd(7));  // Output: Odd