const inputs = document.querySelectorAll(".form-input");
const submit = document.querySelector(".btn-submit");
const filter = document.querySelector(".filter");
const cards = document.querySelector(".card-container");
const search = document.querySelector(".search-input");

function Article(title, subTitle, category, description, date) {
    this.title = title;
    this.subTitle = subTitle;
    this.category = category;
    this.description = description;
    this.date = date;
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

    // simple validation
    if ((title === "") || (subTitle === "") || (category === "") || (description === "")) {
        const element = alertMessage("Insert data correctly", "");
        cards.insertBefore(element, cards.firstChild);

        return setTimeout(() => {
            cards.firstChild.style.opacity = "0";
            cards.firstChild.style.transition = "1s";

            setTimeout(() => {
                cards.firstChild.remove();
            }, 800)
        }, 2000);
    }

    // get date now
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    // send to constructor
    const newData = new Article(title, subTitle, category, description, date);

    // add to localstorage array
    data.push(newData);

    // create the card component
    Article.prototype.newCard([newData]);

    localStorage.setItem("data", JSON.stringify(data));
}

Article.prototype.timeAgo = (date) => {
    // get time now
    const nowDate = Date.now();
    const dataDate = new Date(date);

    let timeAgo = nowDate - dataDate;

    // calculate time in milisecond
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30;
    const years = months * 12;

    if (timeAgo < minutes) {
        timeAgo = "Just now";
    } else if ((timeAgo > minutes - 1) && (timeAgo < hours)) {
        timeAgo = `${Math.floor(timeAgo / minutes)} minutes ago`;
    } else if ((timeAgo > hours - 1) && (timeAgo < days)) {
        timeAgo = `${Math.floor(timeAgo / hours)} hours ago`;
    } else if ((timeAgo > days - 1) && (timeAgo < months)) {
        timeAgo = `${Math.floor(timeAgo / days)} days ago`;
    } else if ((timeAgo > months - 1) && (timeAgo < years)) {
        timeAgo = `${Math.floor(timeAgo / months)} months ago`;
    } else {
        timeAgo = `${Math.floor(timeAgo / years)} years ago`;
    }

    return timeAgo;
}

Article.prototype.getDate = (date) => {
    // get date and month
    const dataDate = new Date(date);
    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember"]
    const month = monthsArr[dataDate.getMonth()];

    return date = `${dataDate.getDate()} ${month.split("").slice(0,3).join("")}`;
}

Article.prototype.newCard = (data) => {
    data.forEach(value => {
        const cardContainer = document.querySelector(".card-container");
        const newA = document.createElement("a");
        newA.classList.add("card");
        newA.setAttribute("href", "#");
        newA.innerHTML = `<div class="card-img">
                                <img src="./assets/img/amazon.jpg" alt="img">
                                <div class="date">${Article.prototype.getDate(value.date)}</div>
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
                                <p class="time"><i class="far fa-clock"></i>${Article.prototype.timeAgo(value.date)}</p>
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

Article.prototype.filter = (e) => {
    cards.innerHTML = "";
    if (e.target.value == "nature") {
        Article.prototype.newCard(data.filter(item => item.category == "nature"));
    } else if (e.target.value == "sport") {
        Article.prototype.newCard(data.filter(item => item.category == "sport"));
    } else {
        Article.prototype.newCard(data);
    }
}

Article.prototype.search = () => {
    cards.innerHTML = "";
    cards.appendChild(alertMessage(search.value, "not found!"));

    Article.prototype.newCard(data.filter(item => {
        const dataTitle = item.title.toLowerCase();
        const searchValue = search.value.toLowerCase();

        if (dataTitle.includes(searchValue)) {
            cards.innerHTML = "";
            return item.title.toLowerCase().includes(search.value.toLowerCase())
        }
    }));
}

const alertMessage = (object, message) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("alert");

    const newP = document.createElement("p");
    newP.classList.add("message");
    newP.innerText = `"${object}" ${message}`;

    newDiv.appendChild(newP);

    return newDiv;
}

submit.addEventListener("click", Article.prototype.add);
window.addEventListener("DOMContentLoaded", Article.prototype.get);
filter.addEventListener("change", Article.prototype.filter);
search.addEventListener("input", Article.prototype.search);