// ตัวแปรสำหรับเก็บสถิติ (ประกาศไว้ด้านบนสุด)
let blackCount = 0;
let redCount = 0;

const btn = document.getElementById('btn-submit');
const display = document.getElementById('display');
const blackDisplay = document.getElementById('black-count');
const redDisplay = document.getElementById('red-count');

btn.addEventListener('click', function () {
    btn.disabled = true
    let counter = 3
    display.innerText = counter

    const timer = setInterval(() => {
        counter--
        if (counter > 0) {
            display.innerText = counter
        } else {
            clearInterval(timer);
            ShowResult();
            btn.disabled = false
        }
    }, 1000);
})

function ShowResult() {
    const results = ["ดำ มึงรอด", "แดง มึงไม่รอด"];
    const randomIndex = Math.floor(Math.random() * results.length);
    const finalResult = results[randomIndex];

    display.innerText = finalResult;
    display.classList.remove('black-result', 'red-result');

    // ส่วนของการนับสถิติ
    if (finalResult.includes("แดง")) {
        display.classList.add('red-result');
        redCount++; // เพิ่มค่าแดง
        redDisplay.innerText = redCount; // อัปเดตตัวเลขบนหน้าเว็บ
    } else {
        display.classList.add('black-result');
        blackCount++; // เพิ่มค่าดำ
        blackDisplay.innerText = blackCount; // อัปเดตตัวเลขบนหน้าเว็บ
    }
}


const modal = document.getElementById('modal-overlay');
const btnConfirm = document.getElementById('modal-confirm');
const btnCancel = document.getElementById('modal-cancel');

// ฟังก์ชันเดิมที่ผูกกับปุ่ม "ล้างสถิติ"
function resetStats() {
    modal.style.display = 'flex'; // แสดง Modal
}
// เมื่อกดยืนยันใน Modal
btnConfirm.addEventListener('click', function () {
    blackCount = 0;
    redCount = 0;
    localStorage.setItem('blackCount', 0);
    localStorage.setItem('redCount', 0);
    blackDisplay.innerText = 0;
    redDisplay.innerText = 0;

    modal.style.display = 'none'; // ปิด Modal
});
// เมื่อกดทำการยกเลิก
btnCancel.addEventListener('click', function () {
    modal.style.display = 'none';
});
// ปิด Modal เมื่อคลิกพื้นที่ว่างรอบๆ
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

musicBtn.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        musicIcon.innerText = "volume_up"; // เปลี่ยนไอคอนเป็นเปิดเสียง
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicIcon.innerText = "volume_off"; // เปลี่ยนไอคอนเป็นปิดเสียง
        musicBtn.classList.remove('playing');
    }
});