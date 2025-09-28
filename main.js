const windowInnerHeight = window.innerHeight

const body = document.body
const userImages = document.querySelectorAll('.img-user')
const robotImageContainer = document.querySelector('.img-container-robot')
const robotImage = document.querySelector('.img-robot')
const delayP = document.querySelector('.delay')
const winner = document.querySelector('.winner')

const robotWin = document.querySelector('.robot-win')
const userWin = document.querySelector('.user-win')

let blocked = false
let robotWinInt = 0
let userWinInt = 0

body.style.height = `${windowInnerHeight}px`

function choosingRobot(userInt) {
  let robotInt = Math.floor(Math.random() * 3)
  
  if (robotInt == 0) {
    robotImage.setAttribute('src', '/img/камень.png')
  } else if (robotInt == 1) {
    robotImage.setAttribute('src', '/img/ножницы.png')
  } else {
    robotImage.setAttribute('src', '/img/бумага.png')
  }
  delayP.style.opacity = '100%'
  delayP.textContent = 'Думает...'
  
  const delay = setTimeout(() => {
    robotImageContainer.style.opacity = '100%'
    if (robotInt == 0 && userInt == 2 
        || robotInt == 1 && userInt == 0
        || robotInt == 2 && userInt == 1) {
      winner.textContent = 'Вы победитель'
      userWinInt++
      userWin.textContent = userWinInt
    } else if (robotInt == 1 && userInt == 2 
               || robotInt == 0 && userInt == 1 
               || robotInt == 2 && userInt == 0) {
      winner.textContent = 'Робот победитель'
      robotWinInt++
      robotWin.textContent = robotWinInt
    } else {
      winner.textContent = 'Ничья'
    }
    
    delayP.style.opacity = '0%'
  }, 3000)
  
  const newGame = setTimeout(() => {
    blocked = false
    userImages[0].classList.remove('not-active')
    userImages[1].classList.remove('not-active')
    userImages[2].classList.remove('not-active')
    robotImageContainer.style.opacity = '0%'
    winner.textContent = ''
    
  }, 7000)
  
}

userImages.forEach( (userImage, i) => {
  userImage.addEventListener('click', () => {
    if (!blocked) {
      blocked = true
      if(i == 0) {
        userImage.classList.remove('not-active')
        userImages[1].classList.add('not-active')
        userImages[2].classList.add('not-active')
      } else if (i == 1) {
        userImage.classList.remove('not-active')
        userImages[0].classList.add('not-active')
        userImages[2].classList.add('not-active')
      } else {
        userImage.classList.remove('not-active')
        userImages[0].classList.add('not-active')
        userImages[1].classList.add('not-active')
      }
      choosingRobot(i)
    }
    
      
  })
})
