let input = document.querySelector(".search");
let cont = document.getElementsByClassName("cont")[0];
let textarea = document.getElementById("floatingTextarea");
let data_array = JSON.parse(localStorage.getItem("Notes"))
data_array.forEach((value) => {
    creatingdiv(value);
});

input.addEventListener("input", (e) => {
    let cards = document.querySelectorAll(".card");
    let searchitem = e.target.value.toLowerCase();
    cards.forEach((value) => {
        let title = value.querySelector(".card-text").textContent.toLowerCase();
        let footer = value.querySelector(".card-footer").textContent.toLowerCase();
        if (title.includes(searchitem) || footer.includes(searchitem)) {
            value.style.display = "block";
        } else {
            value.style.display = "none";
        }
    });
});

let add = document.getElementById("add");

// Function to create and add a new note element to the DOM
function creatingdiv(data) {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-warning w-50">
            <div class="but">
                <button type="button" class="btn btn-warning del"><i class="fa-solid fa-trash-can"></i></button>
                <button type="button" class="btn btn-warning colap"><i class="fa-solid fa-chevron-up"></i></button>
            </div>
            <div class="card-header">
                ${data.d}, ${data.m} ${data.da}, ${data.y} - ${data.t};
            </div>
            <div class="card-body">
                <p class="card-text">${data.message}</p>
            </div>
            <div class="card-footer text-body-secondary"></div>
        </div>`;
    cont.append(div);
    textarea.value = " ";

    // Delete function
    div.querySelector(".del").addEventListener("click", () => {
        div.remove();
        data_array = data_array.filter((value) =>{ 
        return value.message !== data.message
    });
        localStorage.setItem("Notes", JSON.stringify(data_array));
    });

    // Collapse function
    div.querySelector(".colap").addEventListener("click", () => {
        let cards = div.querySelector(".card");
        cards.classList.toggle("drop");
    });
}

// Function to capture the new note data and add it
function Takingdata() {
    const d = new Date();
    const day = d.toLocaleString('en-us', { weekday: 'long' });
    const month = d.toLocaleString('en-us', { month: 'long' });
    const date = d.getDate();
    const year = d.getFullYear();
    const time = d.toLocaleTimeString();

    let notes = textarea.value;
    let object = { d: day, m: month, da: date, y: year, t: time, message: notes };
    data_array.push(object);
    localStorage.setItem("Notes", JSON.stringify(data_array));
    creatingdiv(object);
}

add.addEventListener("click", Takingdata);
