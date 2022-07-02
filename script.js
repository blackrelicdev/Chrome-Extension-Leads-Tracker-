let myLeads = [];
const inputEl = document.querySelector("#input-el");
const button = document.querySelector(".save-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.querySelector(".delete-btn");
const LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.querySelector(".save-tab");

// console.log(Boolean(LeadsFromLocalStorage));
if (LeadsFromLocalStorage) {
    myLeads = LeadsFromLocalStorage;
    render(myLeads);
}

// console.log(LeadsFromLocalStorage);


tabBtn.addEventListener("click", function () {
    // console.log(tabs[0].url);
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    // });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        console.log(tabs);
    });
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);
        // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";

        // or use template strings

        listItems +=
            `<li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}
                </a>
            </li>`;
    };
    ulEl.innerHTML = listItems;
};

deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

button.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    // console.log(myLeads);
    inputEl.value = "";

    // experimenting on localStorage
    // localStorage.setItem("myLeads", "www.leads.com");
    // localStorage.clear()
    // console.log(localStorage);

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
});