const inputs = document.querySelectorAll(".form-input");
const submit = document.querySelector(".btn-submit");

function Article(title, subTitle, category, description, release, time) {
    this.title = title;
    this.subTitle = subTitle;
    this.category = category;
    this.description = description;
    this.release = release;
    this.time = time;
}

Article.prototype.add = (e) => {
    e.preventDefault();

    // check and assign array to localstorage
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    // declare variable for input value
    let title;
    let subTitle;
    let category;
    let description;

    // get the input element
    inputs.forEach(input => {
        // check the input's attribute
        const attribute = input.getAttribute("name");
        if (attribute === "title") {
            title = input.value;
        } else if (attribute === "sub-title") {
            subTitle = input.value;
        } else if (attribute === "categories") {
            category = input.value;
        } else if (attribute === "desc") {
            description = input.value;
        }

        input.value = "";
    });

    // get the date and month now
    const d = new Date();
    const date = d.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const release = `${date} ${months[d.getMonth()]}`;

    // get time now
    const time = Date.now();

    // send to constructor
    const newData = new Article(title, subTitle, category, description, release, time);

    // add to localstorage array
    data.push(newData);

    // create the card component
    Article.prototype.newCard([newData]);

    localStorage.setItem("data", JSON.stringify(data));
}

Article.prototype.newCard = (data) => {
    // get time now
    const timeNow = Date.now();

    // loop data to card component
    data.forEach(value => {
        // calculate time in milisecond
        const minutes = 1000 * 60;
        const hours = minutes * 60;
        const days = hours * 24;
        const months = days * 30;
        const years = months * 12;

        let timeAgo = timeNow - value.time;

        if (timeAgo < minutes) {
            timeAgo = "Just now";
        } else if ((timeAgo > minutes - 1) && (timeAgo < hours)) {
            timeAgo = `${Math.floor(timeAgo / minutes)} minutes ago`;
        } else if ((timeAgo > hours - 1) && (timeAgo < days)) {
            timeAgo = `${Math.floor(timeAgo / hours)} hours ago`;
        } else if ((timeAgo > days - 1)&& (timeAgo < months)) {
            timeAgo = `${Math.floor(timeAgo / days)} days ago`;
        } else if ((timeAgo > months - 1)&& (timeAgo < years)) {
            timeAgo = `${Math.floor(timeAgo / months)} months ago`;
        } else {
            timeAgo = `${Math.floor(timeAgo / years)} years ago`;
        }

        console.log(timeAgo)
        const cardContainer = document.querySelector(".card-container");
        const newA = document.createElement("a");
        newA.classList.add("card");
        newA.setAttribute("href", "#");
        newA.innerHTML = `<div class="card-img">
                                <img src="./assets/img/amazon.jpg" alt="img">
                                <div class="date">
                                        ${value.release.split(" ")[0]}
                                        ${value.release.split(" ")[1].split("").slice(0,3).join("")}</div>
                                <div class="category">${value.category}</div>
                            </div>
                            <div class="card-title">
                                <h2 class="title">${value.title}</h2>
                                <h4 class="sub-title">${value.subTitle}</h4>
                            </div>
                            <div class="card-description">
                                <p>${value.description}</p>
                            </div>
                            <div class="card-footer">
                                <p class="time"><i class="far fa-clock"></i>${timeAgo}</p>
                            </div>`

        cardContainer.appendChild(newA);
    })
}

Article.prototype.get = () => {
    // check and assign array to localstorage
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }

    Article.prototype.newCard(data);
}

submit.addEventListener("click", Article.prototype.add);
window.addEventListener("DOMContentLoaded", Article.prototype.get);