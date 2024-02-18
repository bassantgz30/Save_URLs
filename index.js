 
let myData = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.querySelector("#save-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulistEl = document.getElementById("ulist-el")

const dataFromLocalStorage = JSON.parse( localStorage.getItem("myData") )

if (dataFromLocalStorage) {
    myData = dataFromLocalStorage
    showData(myData)
}

saveBtn.addEventListener("click", () => {
    myData.push(inputEl.value)
    inputEl.value = ""
    // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
    localStorage.setItem("myData", JSON.stringify(myData))
    showData(myData)
    
})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myData.push(tabs[0].url)
        localStorage.setItem("myData", JSON.stringify(myData) )
        showData(myData)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myData = []
    showData(myData)
})


/*
for (let i = 0; i < myData.length; i++) {
    ulistEl.innerHTML += "<li>" + myData[i] + "</li>"

    // create element
    // set text content
    // append to ul
    //const li = document.createElement("li")
    //li.textContent = myData[i]
    //ulistEl.append(li)
}
*/

function showData(dataItems) {
    let listItems = ""
    for (let i = 0; i < dataItems.length; i++) {
        //listItems += "<li>" + "<a href=" + myData[i] + " target='_blank'>" + myData[i] + "</a>" + "</li>"
        listItems += `<li>
                        <a href="${dataItems[i]}" target="_blank">${dataItems[i]}</a>
                      </li>
                     `

    }
    ulistEl.innerHTML = listItems
}