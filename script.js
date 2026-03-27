// DOM Elements
const dob = document.getElementById("dob");
const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");
const output = document.getElementById("output");
const nextBirthday = document.getElementById("nextBirthday");
const liveClock = document.getElementById("liveClock");

// Event Listeners
calcBtn.addEventListener("click", calculateAge);
resetBtn.addEventListener("click", resetAll);

// AGE CALCULATION
function calculateAge() {
    if (!dob.value) {
        output.innerText = "⚠ Please select your DOB!";
        return;
    }

    let birthDate = new Date(dob.value);
    let today = new Date();

    if (birthDate > today) {
        output.innerText = "⚠ Future date not allowed!";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    output.innerHTML = `🎉 <b>${years}</b> Years, <b>${months}</b> Months, <b>${days}</b> Days`;

    calculateNextBirthday(birthDate);
}

// NEXT BIRTHDAY FUNCTION
function calculateNextBirthday(birthDate) {
    let today = new Date();
    let next = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (next < today) {
        next.setFullYear(today.getFullYear() + 1);
    }

    let diff = next - today;
    let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    nextBirthday.innerHTML = `🎂 Next Birthday in <b>${daysLeft}</b> days`;
}

// RESET FUNCTION
function resetAll() {
    dob.value = "";
    output.innerText = "";
    nextBirthday.innerText = "";
}

// LIVE CLOCK (DOM Update every second)
function updateClock() {
    let now = new Date();
    liveClock.innerText = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);