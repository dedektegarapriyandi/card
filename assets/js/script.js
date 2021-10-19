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
    const hour = d.getHours();
    const min = d.getMinutes();
    const time = `${hour}:${min}`;

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
    const d = new Date();

    // convert hours now to minutes
    const hoursNow = d.getHours() * 60;

    // get minutes now
    const minutesNow = d.getMinutes();

    const time = `${hoursNow}:${minutesNow}`;

    // increase time (hours + minutes)
    const timeNow = time.split(":").map(time => time * 1000).reduce((acc, curr) => acc + curr);

    // loop data to card component
    data.forEach(value => {
        // get data time
        const hoursToMinutes = parseInt(value.time.split(":")[0]) * 60;
        const minutes = value.time.split(":");

        minutes.splice(0, 1, hoursToMinutes);
        const dataTime = minutes.map(minute => parseInt(minute) * 1000).reduce((acc, curr) => acc + curr);

        // calculate
        // const minute = 1000 * 60;
        // const hour = minute * 60;
        // const day = hour * 24;
        // const year = day * 365;

        let timeAgo = `${Math.round((timeNow - dataTime) / 1000)} minutes ago`;

        if(parseInt(timeAgo) > 60) {
            timeAgo = `${Math.round((timeNow - dataTime) / 60000)} hours ago`;
        }

        console.log(parseInt(timeAgo) > 60);

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