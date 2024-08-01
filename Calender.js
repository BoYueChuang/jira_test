let current = new Date();                  // 完整時間
let todaysDate = current.getDate();        // 日期
let currentYear = current.getFullYear();   // 年
let currentMonth = current.getMonth() + 1; // 月

window.onload = function () {
    displayCurrentMonth();
    dayList(currentYear, currentMonth);

    document.querySelector(".next_btn").addEventListener("click", nextMonth);
    document.querySelector(".pre_btn").addEventListener("click", prevMonth);
    document.querySelector(".today_btn").addEventListener("click", goToToday);
};

function displayCurrentMonth() {
    document.querySelector('.p').innerHTML = `${currentYear}年${currentMonth}月`;
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }
    updateCalendar();
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    updateCalendar();
}

function goToToday() {
    currentMonth = current.getMonth() + 1;
    currentYear = current.getFullYear();
    updateCalendar();
}

function updateCalendar() {
    displayCurrentMonth();
    dayList(currentYear, currentMonth);
}


function dayList(year, month) {
    let startDay = new Date(year, month - 1, 1).getDay();
    let daysInMonth = new Date(year, month, 0).getDate();
    let grid = document.querySelector(".grid");

    grid.innerHTML = "";

    for (let i = 0; i < startDay; i++) {
        let card = document.createElement("div");
        card.className = "card";
        grid.appendChild(card);
    }

    for (let date = 1; date <= daysInMonth; date++) {
        let card = document.createElement("div");
        card.className = "card";
        card.textContent = date;
        grid.appendChild(card);
        card.addEventListener("click", () => openModal(card, year, month, date));
    }

    for (let i = daysInMonth + startDay; i < 35; i++) {
        let card = document.createElement("div");
        card.className = "card";
        grid.appendChild(card);
    }
}

function openModal(card, year, month, date) {
    let modal = document.querySelector(".modal");
    modal.classList.add("display_block");

    document.querySelector(".submit").onclick = function (event) {
        event.preventDefault();
        handleSubmit(modal, card, year, month, date);
    };

    document.querySelector(".close").onclick = function () {
        closeModal(modal);
    };
}

function handleSubmit(modal, card, year, month, date) {
    let timeInput = document.querySelector("#time");
    let titleInput = document.querySelector("#title");
    let time = timeInput.value;
    let title = titleInput.value;

    if (time === "" || title === "") {
        alert("請輸入時程及標題");
        return;
    };

    alert(`在${year}年${month}月${date}日${time}新增${title}`);

    let existingContent = card.querySelector(".card_content");
    if (existingContent) {
        existingContent.remove();
    };

    let cardContent = document.createElement("div");
    cardContent.className = "card_content";
    cardContent.textContent = `${time} ${title}`;

    let cardContentClose = document.createElement("span");
    cardContentClose.textContent = "X";
    cardContentClose.className = "card_content_close";
    cardContent.appendChild(cardContentClose);

    cardContentClose.addEventListener("click", (event) => {
        event.stopPropagation();
        cardContent.remove();
    });

    card.appendChild(cardContent);

    let cardContentTitle = card.querySelector(".card_content");
    cardContentTitle.addEventListener("click", (event) => {
        console.log('ss');
        event.stopPropagation(); // 防止冒泡
        modal.classList.add("display_block");
        console.log(cardContentTitle.textContent.split(" ")[0]);
        time.value = cardContentTitle.textContent.split(" ")[0];
        title.value = cardContentTitle.textContent.split(" ")[1];
    });

    modal.classList.remove("display_block");
}

function closeModal(modal) {
    document.querySelector("#time").value = "";
    document.querySelector("#title").value = "";
    modal.classList.remove("display_block");
}
