"use strict"

window.addEventListener("load", start)

function start() {
    registerButtonClicks()

    currentScene = scene1
    showScene(currentScene)
}

let currentScene
let sandwich = true


const scene6A = {
    title: "The Magical Door opens",
    text: /*html*/`<p>You start playing guitar. The giant magical door slowly opens. You start seeing sunlight through the cracks.</p>
    <p>you exit the cave.</p>
    <p>you survived :) </p>`,

    choices: [

    ]
}

const scene5A = {
    title: "Magical Door",
    text: /*html*/`<p>You continue left and walk into a giant magical door. The door is filled with engravings of music notes</p>`,


    choices: [
        {
            name: "Start playing guitar",
            node: scene6A
        }
    ]
}

const scene4C = {
    title: "Try to throw sandwich",
    text: /*html*/`<p>You forgot you ate your sandwich</p>
    <p>The giant wolf runs towards you.</p>
    <p>It runs over and chomps you down in one bite</p>`,


    choices: [

    ]
}

const scene4B = {
    title: "Throw sandwich at wolf",
    text: /*html*/`<p>You throw your sandwich at the giant wolf. It runs over and chomps it down in one bite. it runs away</p>`,


    choices: [
        {
            name: "Continue left",
            node: scene5A
        }
    ]
}

const scene4A = {
    title: "Play Guitar for the wolf",
    text: /*html*/`<p>You start playing guitar. Unfortunately the wolf doesn’t like it, and start running towards you.</p>
    
    <p>you die</p>`,
    choices: [

    ]
}

const scene2B = {
    title: "Go Right",
    text: /*html*/`<p>You go right… You walk into a giant cave wolf. It looks at you with foam in it’s mouth. It howls </p>`,


    choices: [
        {
            name: "Start playing guitar for the wolf",
            node: scene4A
        },
        {
            name: "Throw your sandwich",
            node: (sandwich ? scene4B : scene4C)
        }
    ]
}

const scene3C = {
    title: "Play Guitar",
    text: /*html*/`<p>You start playing guitar. Suddenly out of nowhere a goblin appears. 
    <p>He helps you out without saying a word. He points towards the right tunnel and runs away, wiggling his arms above his head</p>`,

    choices: [
        {
            name: "Trust the goblin - Go Right",
            node: scene2B
        },
        {
            name: "Continue left",
            node: scene5A
        }
    ]
}

const scene3B = {
    title: "Wiggle around",
    text: /*html*/`<p>You wiggle around in hopes of getting out. It doesn't work. You almost instantly drop down in the quicksand.</p>
    <p>you die</p>`,
    choices: [

    ]
}

const scene3A = {
    title: "Stay still",
    text: /*html*/`<p>You stay still. Nothing happens, you slowly get submerged in the quicksand. </p>
    <p>you die</p>`,
    choices: [

    ]
}



const scene2A = {
    title: "Go left",
    text: /*html*/`<p>You go left…</p>
    <p>You walk for a couple of minutes, but then you feel a weird sensation on your toes. </p>
    <p>You look down and realize… you just stepped in quicksand. You’re stuck</p>`,
    choices: [
        {
            name: "Stay still in hopes of help",
            node: scene3A
        },
        {
            name: "Start wiggling around to get out",
            node: scene3B
        },
        {
            name: "You realize your doom and start playing guitar",
            node: scene3C
        }
    ]
}

const scene1A = {
    title: "Flashlight",
    text: /*html*/`<p>You turn on your flashlight and the cave lights up. You take look around…</p>
    <p>the cave continues left and right</p>`,
    choices: [
        {
            name: "Go left",
            node: scene2A
        },
        {
            name: "Go right",
            node: scene2B
        }
    ]
}
const scene1C = {
    title: "Guitar",
    text: /*html*/`<p>You start playing guitar. but suddenly you hear steps coming towards you. something takes a bite of you
    </p>
    <p>you die</p>`,
    choices: [

    ]
}
const scene1B = {
    title: "Sandwich",
    text: /*html*/`<p>You eat the sandwich</p>
    <p>You liked it. now back to escaping</p>`,
    choices: [
        {
            name: "Turn on your flashlight",
            node: scene1A
        },
        {
            name: "Start playing guitar",
            node: scene1C
        }
    ]
}
const scene1 = {
    title: "Story begins",
    text: /*html*/`<p>You’re stuck in a cave. it’s dark. You need to get out. You have a: </p> 
     <p> Flashlight, Sandwich, and Guitar</p> `,
    choices: [
        {
            name: "Turn on your flashlight",
            node: scene1A
        },
        {
            name: "Eat the sandwich",
            node: scene1B
        },
        {
            name: "Start playing guitar",
            node: scene1C
        }
    ]
}
function registerButtonClicks() {
    document.querySelector("main").addEventListener("click", userClicked)

    function userClicked(event) {
        const target = event.target
        if (target.tagName === "BUTTON") {
            buttonClicked(target)
        }
    }
}
function buttonClicked(button) {
    button.parentElement.remove()

    const index = Number(button.id.substring(11))

    const choice = currentScene.choices[index]

    currentScene = choice.node

    if(currentScene == scene1B){
        sandwich = false
        scene2B.choices[1].node = scene4C
    }

    showScene(currentScene)
}

function showScene(scene) {
    const html = /*html*/ `<div class="scene">
    <h2>${scene.title}</h2>
    <div class="text">
    ${scene.text}
    </div>
    <div class="choices">
    ${scene.choices.map((choice, i) => `<button id="btn-choices${i}"> ${choice.name} </button>`).join(" ")}
    </div>
  </div>`
    document.querySelector("main").insertAdjacentHTML("afterbegin", html)
}
