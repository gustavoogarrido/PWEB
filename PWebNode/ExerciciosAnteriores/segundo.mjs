import chalk from "chalk";

console.log(chalk.green("1"))
f()
console.log(chalk.red("3"))

function f(){
    setTimeout(() => {
        console.log(chalk.black("2"))
    }, 20);
}