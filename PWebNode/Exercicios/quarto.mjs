import fs from "fs"
import chalk from "chalk"

fs.readFile("./file.txt", "utf8", (err, data) =>{
    if(err){
        console.log(chalk.bgRed("Erro grave, seu computador será destruído"))
        return
    }
    console.log(data.toString())
})