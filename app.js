// created 2 classes one for Hero Space Ship class  and the other for the Alien space ships with constructors
class Ship
 {
  constructor() // Ship has fixed values 
  {
    this.Hull = 20;
    this.Firepower = 5;
    this.Accuracy = .7;
  }
}

// Alien Ship
class Alien
{
  constructor()// Alien Ship has rnadom values
  {
    this.Hull = Math.floor(Math.random() * (7 - 3) + 3)
    this.Firepower = Math.floor(Math.random() * (5 - 2) + 2)
    this.Accuracy = (Math.random() * (.8 -.6) + .6).toFixed(1)
  }
}
 

// create instance of the Ship class
let spaceship = new Ship()
// create instances of the Alien class
let alien1 = new Alien()
let alien2 = new Alien()
let alien3 = new Alien()
let alien4 = new Alien()
let alien5 = new Alien()
let alien6 = new Alien()

// put Alien instances in an array to target 
let aliens = [alien1, alien2, alien3, alien4, alien5, alien6];


// function to start the Game with a little story beginning
function startGame () 
{
    alert(`MARS ATTACKS! YOU ARE BEING DRAFTED INTO YOUR OWN SPACESHIP WITH CREW ON HAND. YOUR SPECIAL PER SCHOLAS SKILLSET GIVES YOU THE RANK OF CAPTAIN OF THE SHIP! YOUR SHIP CREW TAKES THE FIRST SHOT!`)
    battle(aliens)   
}


// update enemy stats on DOM
function updateEnemy (enemy) {
    enemyStats.innerHTML = `Hull: ${enemy.Hull}<br> Firepower: ${enemy.Firepower}<br> Accuracy: ${enemy.Accuracy}<br>`
}

// update player stats on DOM
function updatePlayer () {
    stats.innerHTML = `Hull: ${spaceship.Hull}<br> Firepower: ${spaceship.Firepower}<br> Accuracy: ${spaceship.Accuracy}<br>`
}

// target alien array of ships
function battle (ships) {
    
    attack(ships[0])
}

// if any aliens are left after defeating enemy, 
// ask player if they want to engage or retreat, 
// if none left, game over, you win
// reload() to reload current webpage(the game)
function newBattle () 
{

    if (aliens.length != 0)
     {
        updateEnemy(aliens[0])
        setTimeout(() =>
         {
            if (confirm('HERE COMES ANOTHER SHIP, DO YOU WANT TO ENGAGE?'))
             {
                battle(aliens)
            }
             else
              {
                alert('HE WHO LIVES AND RUNS AWAY, LIVES TO FIGHT ANOTHER DAY.')

            }
          }, '1000')
    } 
    else // all aliens defeated
     {
       alert('CONGRATULATIONS, YOU DESTROYED ALL ALIEN SHIPS!')

        if(confirm('WOULD YOU LIKE TO PLAY AGAIN?'))
         {
            location.reload()   // The location reload() method in HTML DOM is used to reload the current document
        }
         else
          {
            alert('YALL COME BACK NOW HEAR?')
            window.close()
        }

    }

}


//  list all possible if scenarios when attacking alien 
// append animation  to image class name when damge is done, target is killed, or when all aliens are dead dead dead
function attack (enemy)
 {

    if(Math.random() < spaceship.Accuracy) // if hero accuracy is greater than random
    {
        enemy.Hull -= spaceship.Firepower;  // subtract damage dealt to enemy's lifeline hull
        updateEnemy(enemy);                 // update  enemy stats on  DOM

        if (enemy.Hull <= 0)               // if enemy ship is destroyed
         {
            enemyImg.classList.add('dead','sink')
            
            
            updateEnemy(enemy)

            setTimeout(() => {
                alert(`GREAT SHOT! ENEMY'S HULL TOOK ${spaceship.Firepower} DAMAGE! TARGET SHIP DESTROYED!`) 
                aliens.shift()
                newBattle(aliens)
            }, '1000')

            
            setTimeout(() => enemyImg.classList.remove('dead',), '2000')
            
            setTimeout(() => enemyImg.classList.remove('sink',), '3000')
            

        } 
         else {
            enemyImg.classList.add('hit')    // add 1 animation for being hit but not destroying the enemy ship
            
            setTimeout (() => {
                alert(`NICE SHOT! ENEMY TOOK  ${spaceship.Firepower} BUT THEY ARE STILL ALIVE. PREPARE FOR INCOMING ATTACK!`)
                attackHero(enemy)
            }, '1000')

            setTimeout(() => enemyImg.classList.remove('hit'), '1000')
        }
        
    } else {

        setTimeout (() => {
            alert('AWW SHUCKS, YOU MUST HAVE MISSED, NO DAMAGE TO TARGET!')
            attackHero(enemy)
        }, '1000')
    }

}

// enemy attack sequene with all if scenarios
function attackHero (enemy)
 {

    if(Math.random() < enemy.Accuracy){    // if enemy accuracy is greater than random
        spaceship.Hull -= enemy.Firepower  // hero health hull is decreased by firepower of current enemy ship
        updatePlayer()                     // update hero ship

        if (spaceship.Hull <= 0) {        // if hero ship is destroyed , 
            updatePlayer()                // update hero stats
            playerImg.classList.add('hit','dead')   // append 2 animations to class name of player image 

            setTimeout(() => {
                alert(`THAT LAST HIT DEALT ${enemy.Firepower} DAMAGE. YOUR SHIP IS DESTROYED! OH SWEET OBLIVION! OPEN YOUR ARMS! GAME OVER!`)
                if (confirm('SHALL WE TRY AGAIN?'))
                 {
                    alert('PREPARING ANOTHER SHIP TO DEPLOY...')
                    location.reload()
                 }
                  else
                  {
                    alert('THANKS FOR PLAYING. HAVE A NICE DAY!')
                    window.close()
                  }
            }, '1000')

            setTimeout(() => playerImg.classList.remove('hit'), '1000')
            
        }  else {

            playerImg.classList.add('hit')

            setTimeout (() => {
                alert(`WARNING! WARNING! SHIP HULL TOOK ${enemy.Firepower} DAMAGE! `)
                attack(enemy)
            }, '1000')

            setTimeout(() => playerImg.classList.remove('hit'), '2000')
        }
        
    } else {
        setTimeout (() => {
            alert('DODGED A BULLET! ENEMY MISSED US!')
                attack(enemy)
            }, '1000')
    }
    
}

//create variables to change DOM for player stats and enemy stats
// create variales to animate images of Hero ship and Enemy ship

let stats = document.querySelector('.playerStats')
let enemyStats = document.querySelector('.enemyStats')
let playerImg = document.querySelector('.playerImage')
let enemyImg = document.querySelector('.enemyImage')
let name = document.querySelector('.nameBox')

// start game with 1 second delay
setTimeout(() => 
{
startGame()
}, '1000');