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
    const release = `${date} ${months[d.getMonth()].split("").slice(0, 3).join("")}`;

    // get time now
    const hour = d.getHours();
    const min = d.getMinutes();
    const time = `${hour}:${min}`;

    // send to constructor
    const newData = new Article(title, subTitle, category, description, release, time);

    // add to localstorage array
    data.push(newData);

    localStorage.setItem("data", JSON.stringify(data));
}

submit.addEventListener("click", Article.prototype.add);