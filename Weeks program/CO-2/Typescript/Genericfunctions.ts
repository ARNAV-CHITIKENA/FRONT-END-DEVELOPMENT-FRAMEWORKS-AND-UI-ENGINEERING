function genericFunction<T>(item: T): T {
    return item;
}
console.log(genericFunction<string>("Hello, World!")); // Output: Hello, World!
console.log(genericFunction<number>(42)); // Output: 42