
// Background Option
let backgroundOption = true;

let backgroundIntervel;

// LocalStorage Background Option

let mainBackground = localStorage.getItem("background-option");

if(mainBackground !== null) {

    if(mainBackground === "true") {
        
        backgroundOption = true;

        document.querySelector(".random-background .yes").classList.add("active")

        document.querySelector(".random-background .no").classList.remove("active")

    } else {

        backgroundOption = false;

        document.querySelector(".random-background .no").classList.add("active")

        document.querySelector(".random-background .yes").classList.remove("active")

    }
}

// LocalStorage Color Option

let mainColor = localStorage.getItem("color_option")

if(mainColor !== null) {
    
    document.documentElement.style.setProperty("--main-color", mainColor)
    
    let colors = document.querySelectorAll(".colors li")

    colors.forEach((e) => {
        
        e.classList.remove("active")

        if(e.getAttribute("data-color") == mainColor) {

            e.classList.add("active")
    
        }
    
    })
}

// LocalStorage  (Show Option)

let bulletsContent = document.querySelector(".bullets")

let mainShow = localStorage.getItem("show-option");

if(mainShow !== null) {

    bulletsContent.style.display = mainShow;

    document.querySelectorAll(".show-option span").forEach((e) => {
    
        e.classList.remove("active")

        if(e.getAttribute("data-display") === mainShow) {

            e.classList.add("active")

        }
    
    })

}

// Click On Toggle Setting Gear

document.querySelector(".toggle-setting").onclick = function() {
    // Toggle .fa-spin For Rotation On Self
    document.querySelector(".gear").classList.toggle("fa-spin")

    // Toggle Class Open Or Close Setting Box
    document.querySelector(".setting-box").classList.toggle("open")

}
// Get All Colors
let colors = document.querySelectorAll(".colors li")

colors.forEach( color => {

    color.addEventListener("click", (li) => {

        // Add Active To Color 
        
        handleActive(li)

        document.documentElement.style.setProperty("--main-color", li.target.dataset.color);

        // document.documentElement.style.setProperty("--main-color", color.getAttribute("data-color") )

        localStorage.setItem("color_option", color.getAttribute("data-color"));

    })

})

// Give Toggle(active) to Background Option

let randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach( span => {

    span.addEventListener("click", ()=> {

        randomBackEl.forEach((c)=>{ 

            c.classList.remove("active")

        })

        span.classList.add("active")

        if (span.classList.item(0) === "yes") {

            backgroundOption = true;

            randomizeImg()

            localStorage.setItem("background-option", true)

        } else {

            backgroundOption = false;

            randomizeImg()

            localStorage.setItem("background-option", false)

        }

    })

})

// Background Random Images 

let landingPage = document.querySelector(".landing-page");

let imgArray = ['bg-1', 'bg-2', 'bg-3', 'bg-4'];

function randomizeImg() {
    if(backgroundOption === true) {
        backgroundIntervel = setInterval(()=> {

                let changeNumber = Math.floor(Math.random() * imgArray.length) + 1;
            
                landingPage.style.backgroundImage = `${"url(../images/bg-"+changeNumber+".jpg"})`

            
            }, 4000)
    } else {
        clearInterval(backgroundIntervel)
    }
} 

randomizeImg()

// Our Skills 

let skills = document.querySelector(".skills");

window.onscroll = function() {

//  Up Botton
    if(window.scrollY >= 450) {
        document.querySelector(".up").style.opacity = 1
    } else {
        document.querySelector(".up").style.opacity = 0
    }

    let skillsOffsetTop = skills.offsetTop;

    let skillsHeight = skills.offsetHeight - 175;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop >= (skillsOffsetTop + skillsHeight - windowHeight)) {

        let skill = document.querySelectorAll(".skill-progress span");


        for(i = 0; i < skill.length; i++) {

            let skillEx = skill[i].dataset.progress

            skill[i].style.width = `${skillEx}`

        }
    
    }

}


// Start Gallery

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // Create Overlay Element

        let popupOverlay = document.createElement("div");

        // Give Class To Overlay 

        popupOverlay.className = "popup-overlay";

        // append overlay to body

        document.body.appendChild(popupOverlay);

        // Create Popup Box

        let popupBox = document.createElement("div");

        // Add class To Popup Box

        popupBox.className = "popup-box";

        let boxImg = document.createElement("div");

        // Add class TO Image Box 

        boxImg.className = "image-box";

        // Create Image

        let imgBox = document.createElement("img");

        if(img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Add Class To img Heading
            imgHeading.className = "img-heading"

            // Create Text
            let imgText = document.createTextNode(img.alt);
            
            // append text To img Heading
            imgHeading.appendChild(imgText);

            boxImg.appendChild(imgHeading)

        }

        imgBox.src = img.src

        boxImg.appendChild(imgBox);

        document.body.appendChild(boxImg)

        let boxClose = document.createElement("div")

        boxClose.className = "box-close"

        let iClose = document.createElement("i")

        iClose.className = 'fa-solid fa-xmark'

        boxClose.appendChild(iClose)

        boxImg.appendChild(boxClose)

        boxClose.onclick = () => {

            popupOverlay.remove()

            boxImg.remove()

        }

    })

})
//  Select All Bullets 
let bullets = document.querySelectorAll(".bullets .bullet");

// Select All Links
let link = document.querySelectorAll(".links a")

// Scroll To AnyWhere

function ScrollToSectiones(element) {

    element.forEach(ele => {
        
        ele.addEventListener("click", e => {

        document.querySelector(e.target.dataset.section).scrollIntoView({behavior : "smooth"})
        
        })

    })

}

ScrollToSectiones(bullets)

ScrollToSectiones(link)

// Show Or Hide Bullets 

document.querySelectorAll(".show-option span").forEach( span => {

    span.addEventListener("click", e => {


        bulletsContent.style.display = e.target.dataset.display

        if(e.target.dataset.display === "block") {
            
            localStorage.setItem("show-option", "block")

        } else{ 

            localStorage.setItem("show-option", "none")

        }
        
        handleActive(e)

    })
})

// Function To Handle Active
function handleActive(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    })

    e.target.classList.add("active")
}

// Reset Option
document.querySelector(".reset-option").onclick = () => {

    localStorage.clear()

    window.location.reload()

}


// Select Toggle Menu 

document.querySelector(".links-content .toggle").onclick = (e) =>{
    
    e.stopPropagation()
    
    document.querySelector(".links").classList.toggle("active") 

}

document.addEventListener("click", (e) => {

    if(e.target !== document.querySelector(".links-content .toggle") && e.target !== document.querySelector(".links")) {

        if(document.querySelector(".links").classList.contains("active")) {

            document.querySelector(".links").classList.remove("active")

        }

    } 

})

// Up Button 

document.querySelector(".up").onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// Scroll Reveal 

const sr = ScrollReveal({
    duration : 900,
    
    delay : 300,
    
    distance : "50px"

})     

sr.reveal(".main-title",{delay : 100, origin : "top"})
sr.reveal(".introduction-text",{delay : 130, origin : "bottom"})
sr.reveal(".bullets", {delay: 150, origin: "right"})
sr.reveal(".info-image", {delay: 100, origin: "left"})
sr.reveal(".info-box", {origin: "left", delay: 100})
sr.reveal(".images img", {origin: "left", interval: 50})
sr.reveal(".left", {origin: "left", delay: 100})
sr.reveal(".right", {origin: "right", delay: 100})
sr.reveal(".feat-box", {origin: "top", interval :50})
sr.reveal(".ts-box", {origin: "left", interval : 50, delay : 100})


