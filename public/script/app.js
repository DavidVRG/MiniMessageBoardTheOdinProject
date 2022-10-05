/* VARIABLES */
const boardMessages = document.querySelector('.boardMessages');
const messages = []

async function getMessages(){
    await fetch('/messages')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            messages.push(element)
        })
    }).catch((error) => {console.log(error)})


    const sortedMessages = await messages.sort(
        (objA, objB) => Number(objA.time) - Number(objB.time)
    )

    sortedMessages.forEach(element => {
        const date = new Date(element.date)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const sec = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()



        const message = document.createElement('div')
            message.setAttribute('class', 'message')

            const name = document.createElement('div')
            name.setAttribute('class', 'name')
            name.innerHTML = element.name

            const text = document.createElement('div')
            text.setAttribute('class', 'text')
            text.innerHTML = element.message

            const time = document.createElement('div')
            time.setAttribute('class', 'time')
            time.innerHTML = `${year}.${month}.${day} - ${hours}:${min}:${sec}`;
    
            message.appendChild(name)
            message.appendChild(text)
            message.appendChild(time)

            boardMessages.append(message)
    })
}
getMessages()