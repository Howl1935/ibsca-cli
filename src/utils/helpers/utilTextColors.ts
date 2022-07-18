import chalk from 'chalk';

export function red(text : string){
    return process.stdout.write(chalk.red(text + '\n'))
}
export function white(text : string){
    return process.stdout.write(chalk.white(text + '\n'))
}
export function yellow(text : string){
    return process.stdout.write(chalk.yellow(text + '\n'))
}
export function blue(text : string){
    return process.stdout.write(chalk.blue(text + '\n'))
}
export function green(text : string){
    return process.stdout.write(chalk.green(text + '\n'))
}