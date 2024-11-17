let input = document.querySelector(".search")
let cont = document.getElementsByClassName("cont")[0]
let textarea = document.getElementById("floatingTextarea")
input.addEventListener("input", (e) => {
    let cards = document.querySelectorAll(".card")
    let searchitem = e.target.value.toLowerCase()
    cards.forEach((value) => {
        let title = value.querySelector(".card-text").textContent.toLowerCase()
        let fotter = value.querySelector(".card-footer").textContent.toLocaleLowerCase()
        if (title.includes(searchitem) || fotter.includes(searchitem)) {
            value.style.display = "block"
        }
        else {
            value.style.display = "none"
        }
    })
})
let add = document.getElementById("add")
let data_array = []
//Local storage
if(localStorage.getItem("Notes")){
JSON.parse(localStorage.getItem("Notes")).forEach((value)=>{
    creatingdiv(value)
})
}
function creatingdiv(data) {
    let div = document.createElement("div")
    div.className = ("user-box")
    div.innerHTML = `  <div class="card bg-warning w-50">
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
  <div class="card-footer text-body-secondary">
  </div>
</div>`
    cont.append(div)
    textarea.value=" "
    div.querySelector(".del").addEventListener("click", ()=>{
        div.remove();
        data_array= data_array.filter((value)=>{
            return value.message!==div.querySelector(".card-text").innerHTML
        })
        localStorage.setItem("Notes", JSON.stringify(data_array));
    })

    function colapsed() {
        let cards = div.querySelector(".card")
        cards.classList.toggle("drop");
    }
    div.querySelector(".colap").addEventListener("click", colapsed);
}
function Takingdata() {
    const d = new Date()
    // Get individual date components
    const day = d.toLocaleString('en-us', { weekday: 'long' })
    const month = d.toLocaleString('en-us', { month: 'long' })
    const date = d.getDate()
    const year = d.getFullYear()
    const time = d.toLocaleTimeString()

    //inserting the created notes
    let notes = textarea.value
    let object={d:day,m:month,da:date,y:year,t:time ,message:notes}
    data_array.push(object)
    localStorage.setItem("Notes",JSON.stringify(data_array))
    console.table(data_array);
    creatingdiv(object)
   
}
add.addEventListener("click", Takingdata)


