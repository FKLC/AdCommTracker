const navbarDOM = document.getElementById("navbar");

function toggleNavbar (el) {
    el.classList.toggle('is-active');
    navbarDOM.classList.toggle('is-active');
}

const chestCycleDOM = document.getElementById("chestCycle");
const icon = document.createElement("img");
icon.setAttribute("class", "is-inline");
var chests = [];

for (let i = 0; i < chestCycle.length; i++) {
    let chestIcon = icon.cloneNode();
    chestIcon.setAttribute("src", `img/${chestCycle[i]}.png`);
    chestCycleDOM.append(chestIcon);
    chests.push(chestIcon);
}


const chestHistoryDOM = document.getElementById("chestHistory");
var chestHistory = "";

function addChest (chestType) {
    let chestIcon = icon.cloneNode();
    let src = chestType == "." ? `img/q.png` : `img/${chestType}.png`
    chestIcon.setAttribute("src", src);
    chestIcon.setAttribute("index", chestHistory.length);
    chestIcon.setAttribute("onclick", "removeChest(this)");
    chestHistoryDOM.append(chestIcon);
    chestHistory += chestType;
    search();
}

const tableDOM = [
    document.getElementById("wood"),
    document.getElementById("stone"),
    document.getElementById("iron"),
    document.getElementById("epic"),
    document.getElementById("supreme")
].filter(function (el) {
    return el != null;
});
function search () {
    clear();
    saveChestHistory();
    if (chestHistory == "")
        return
    let re = new RegExp(chestHistory, 'g');
    while ((match = re.exec(chestCycle)) != null) {
        if (re.lastIndex == chestCycle.length)
            return
        chests[re.lastIndex].style.backgroundColor = "red";
        tableDOM[tableDOM.length == 2 ? chestCycle[re.lastIndex] - 5 : chestCycle[re.lastIndex]].innerHTML -= -1;
    }
}

function clear () {
    for (let i = 0; i < chestCycle.length; i++) {
        chests[i].style.backgroundColor = "";
    }
    for (let i = 0; i < tableDOM.length; i++) {
        tableDOM[i].innerHTML = "0";
    }
}

function removeChest (el) {
    chestHistory = removeByIndex(chestHistory, el.getAttribute("index"))
    let nextEl = el;
    while ((nextEl = nextEl.nextElementSibling)) {
        nextEl.setAttribute("index", nextEl.getAttribute("index") - 1);
    }
    chestHistoryDOM.removeChild(el);
    search();
}

function removeByIndex (str, index) {
    str = str.split("");
    str.splice(index, 1);
    return str.join("");
}

function saveChestHistory () {
    if (tableDOM.length == 2) {
        localStorage.eventChestHistory = chestHistory;
    } else {
        localStorage.mainChestHistory = chestHistory;
    }
}

function loadChestHistory () {
    if (tableDOM.length == 2) {
        chestHistory = localStorage.eventChestHistory || "";
    } else {
        chestHistory = localStorage.mainChestHistory || "";
    }
    for (let i = 0; i < chestHistory.length; i++) {
        let chestIcon = icon.cloneNode();
        let src = chestHistory[i] == "." ? `img/q.png` : `img/${chestHistory[i]}.png`
        chestIcon.setAttribute("src", src);
        chestIcon.setAttribute("index", i);
        chestIcon.setAttribute("onclick", "removeChest(this)");
        chestHistoryDOM.append(chestIcon);
    }
    search();
}
loadChestHistory();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}