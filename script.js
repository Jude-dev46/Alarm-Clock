const selectMenu = document.querySelectorAll("select");
const curTime = document.querySelector("h1");
const alarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime = "",
  isAlarmSet = false,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;

  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;

  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";
  let option = `<option value="${amPm}">${amPm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  amPm = "AM";

  if (hrs > 12) {
    hrs = hrs - 12;
    amPm = "PM";
  } else if (hrs == 0) {
    hrs = 12;
  }

  hrs = hrs < 10 ? "0" + hrs : hrs;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  curTime.innerHTML = `${hrs}:${min}:${sec} ${amPm}`;

  if (alarmTime == `${hrs}:${min} ${amPm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

alarmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    alarmBtn.innerText = "Set Alarm";

    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  alarmBtn.innerText = "Clear Alarm";
});
