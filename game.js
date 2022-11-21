const readline = require("readline-sync");


//greeting
const name = readline.question("Please input a username to begin: ", {
    //hideEchoBack: true,
   });
    console.log(`Hello ${name}, welcome to the Starwars Universe!`)
    console.log("")
    console.log("In this game you will fight enemies and collect credits to aid the rebellion. ")
    console.log("(You can check how many you have in your inventory by pressing 'p', as well as your health)")
    console.log("")
    console.log("But be careful.. the empire is near.")
    console.log("")

   if(readline.keyInYNStrict("Are you ready to start?")){
    console.log("")
    console.log("Press 'w' to walk")
    }else{
    console.log("Okay, maybe next time.")
    return
    }

    let hp = 100

    let inventory = []    

    takeDamage = () =>{
        hp -= Math.floor(Math.random() * 30) + 10;
        console.log("You got shot!")
        if(hp >= 0){
        console.log("Current Health: " + hp) 
        }else{
            console.log("Current Health: 0")}
    }


    die = () =>{
        console.log("YOU DIED")
        console.log("")
        console.log("GAME OVER")
        console.log("")
        console.log("Enter 'node game.js' in the terminal to try again")
        hp = 0
        return
    }

    if(hp <= 0){
        die()
    }


    //random enemy genorator
    randEnemies = (enemy) =>{
        var randomIndex = Math.floor(Math.random() * enemy.length)
        var item = enemy[randomIndex]
        return item
    }


    var enemies = ["Stormtrooper", "Imperial Guard", "Scout Trooper"]
    randEnemy = randEnemies(enemies)


    gainItem = () =>{
        inventory.push("credit ")
        console.log("You got a credit!")
        if(inventory.length == 1){
            console.log(`Inventory: ${inventory.length} credit`)
            }else if(inventory.length == 8){
                console.log("")
                console.log("YOU WIN")
                console.log("Good work! The rebellion thanks you for your efforts")
            }else{
                console.log(`Inventory: ${inventory.length} credits`)
            }
        }   



    gainHp = () =>{
        hp += 50
        console.log("You gained heath back!")
        console.log(`Current health: ${hp}`)
    }

    gain = () =>{
        gainHp()
        console.log("")
        gainItem()
        return
    }


    fight = () =>{
        var enemyHp = 50
        dealDamage = () =>{
            enemyHp -= Math.floor(Math.random() * 20) + 10;
            if(enemyHp >= 0){
                console.log("Enemy Health: " + enemyHp)
                console.log(`The ${randEnemy} attacked back!`)
                }else{ console.log("Enemy Health: 0")}
        }



    while(enemyHp || hp > 0){
        attacks = ["Shoot", "Punch", "Throw a rock"]
        index = readline.keyInSelect(attacks, "Choose an attack!");
        console.clear()
        console.log("__________________________________")
        console.log("")
        console.log(`You chose to ${attacks[index]}`)
        console.log("")

        if(attacks[0]){
            dealDamage()
            takeDamage()
        }else if(attacks[1]){
            dealDamage()
             takeDamage()
        }else if(attacks[2]){
            dealDamage()
            takeDamage()
        }else{takeDamage()}


        if( enemyHp <= 0 && hp > 0){
            console.log(`You beat the ${randEnemy}!`)
            console.log("")
            gain()
            console.log("")
            console.log("press 'w' to walk")
            return
            }else if(hp <= 0){
                die()
                return
            }
    }
}

    flee = () =>{
        if(Math.random() * 2 < 1){
            console.log("")
            console.log("You got away!")
        }else{
            console.log("")
            console.log("You tried to flee, but")
            console.log("couldn't get away"),
        fight()}
    }

   encounter = () =>{
        console.log(`It's a ${randEnemy}`)
        if(readline.keyInYNStrict("Fight it?")){
            fight()
            return
        }else{
            flee()}
    }



    walk = () =>{
        console.log("walking...")
        if(Math.random() * 3 < 1){
            console.log("")
            console.log("Oh no you've been spotted!")
            encounter()
        }else if(Math.random() * 4 < 1){
            console.log("")
            console.log("You found a health container!")
            hp += 25
            console.log("+25")
            console.log(`Your health is now: ${hp}`)
        }
    }


    while( hp > 0){
       var user = readline.prompt("press 'w' to walk");
       if(user === "w"){
        walk()
        console.log("")
       }else if(user === "p"){
        if(inventory.length == 1){
            console.clear()
            console.log(name)
            console.log(`Inventory: ${inventory.length} credit`)
            console.log(`Current health: ${hp}`)
            console.log("")
            console.log("Press 'w' to walk")
        }else{
            console.clear()
            console.log(name)
            console.log(`Inventory: ${inventory.length} credits`)
            console.log(`Current health: ${hp}`)}
       }else if(user === "x"){
        console.clear()
        if(readline.keyInYNStrict("Are you sure you want to exit?")){
            return
        }else{
            console.log("")
            console.log("Press 'w' to walk")}
       }else{
        console.log("press 'w' to walk")}
    }
