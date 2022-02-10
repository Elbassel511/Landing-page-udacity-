/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 */
const sections = document.querySelectorAll("section");
let navList = document.querySelector("#navbar__list");
let listItems = [];
const headerNavBar = document.querySelector(".page__header");
const scrollTopBtn = document.querySelector(".btn-scrl-top")
// nav animation to be used for set time out and clear time out 
let navAnimation;
let sectionHeadings = document.querySelectorAll("section h2");


/**
 * End Global Variables
 */



// build the nav

sections.forEach((section) => {
    let sectionNavData = section.getAttribute("data-nav");
    let item = `<li class="menu__link" data-section="${sectionNavData}">${sectionNavData}</li>`;
    listItems.push(item);
});
navList.innerHTML = listItems.join("\n");
let navItems = document.querySelectorAll(".menu__link");

// Add class 'active' to section when near top of viewport

document.addEventListener("scroll", () => {
    headerNavBar.classList.remove("hidden");
    clearTimeout(navAnimation);
    // Hide fixed navigation bar while not scrolling
    navAnimation = setTimeout(() => headerNavBar.classList.add("hidden"), 1500);
    // setting active section   
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 200 &&
            section.getBoundingClientRect().bottom >= 200) {
            section.classList.add("your-active-class");
            // setting active tab
            navItems.forEach(item => {
                if (item.getAttribute("data-section") === section.getAttribute("data-nav")) {
                    item.classList.add("active");
                } else item.classList.remove("active");
            });
        } else section.classList.remove("your-active-class");
    });
    // remmove all active nav links status and nav animation at top
    if (window.scrollY < 200) {
        navItems.forEach(item => item.classList.remove("active"));
        clearTimeout(navAnimation);
    };
    //  show scroll to top btn
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show")
    } else scrollTopBtn.classList.remove("show")
});

// scrolling by nav links
navItems.forEach(item => {
    item.addEventListener("click",(event => {
        event.preventDefault();
        let sectionSelected = event.target.getAttribute("data-section");
        let sec = document.querySelector(`[data-nav="${sectionSelected}"]`);
        sec.scrollIntoView({behavior: "smooth"})  
    }))
}) 


// scroll to top buttun

scrollTopBtn.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// append collapse button to sections heading 
function generateCollaseIcon(id) {

    /* <button id="btn-(id)" class="collapse-icon"><img src="minus.png" alt="collapse"></button> */

    let collapseIcon = document.createElement("button");
    collapseIcon.classList.add("collapse-icon");
    if (id % 2) collapseIcon.classList.add("collapse-icon__left");
    collapseIcon.setAttribute("id", `sectionBtn-${id + 1}`);
    let collapseIconImg = document.createElement("img");
    collapseIconImg.setAttribute("src", "minus.png");
    collapseIconImg.setAttribute("alt", "collapse icon");
    collapseIcon.appendChild(collapseIconImg);
    return collapseIcon
}

sectionHeadings.forEach((head, index) => {
    let collapseIcon = generateCollaseIcon(index);
    head.appendChild(collapseIcon);
})

// collapse Icons 

let collapseIcons = document.querySelectorAll(".collapse-icon")

collapseIcons.forEach(icon => {
    let isCollased = true;
    icon.addEventListener("click", event => {
        event.preventDefault();
        let btnId = event.target.id;
        if (isCollased) {
            document.querySelector(`#${btnId} img`).setAttribute("src", "add-button.png")
            isCollased = false
        } else {
            document.querySelector(`#${btnId} img`).setAttribute("src", "minus.png")
            isCollased = true
        }
        btnNum = btnId.split("-")[1];
        sections.forEach(section => {
            if (section.id === `section${btnNum}`) {
                section.classList.toggle("hidden")
            }
        })
    })
})


