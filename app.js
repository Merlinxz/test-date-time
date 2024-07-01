document.addEventListener('DOMContentLoaded', function() {
  var daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  
  function populateOptions(selectId, start, end) {
    var selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';
    for (var i = start; i <= end; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.textContent = i < 10 ? '0' + i : i;
      selectElement.appendChild(option);
    }
  }

  populateOptions('hoursSelect', 0, 23); // Populate hours from 00 to 23
  populateOptions('minutesSelect', 0, 59); // Populate minutes from 00 to 59
  populateOptions('secondsSelect', 0, 59); // Populate seconds from 00 to 59

  function updateCountdown() {
    var dayIndex = document.getElementById('daySelect').value;
    var hours = parseInt(document.getElementById('hoursSelect').value);
    var minutes = parseInt(document.getElementById('minutesSelect').value);
    var seconds = parseInt(document.getElementById('secondsSelect').value);
    
    var now = new Date();
    var dayOfWeek = now.getDay(); // 0 (Sunday) ถึง 6 (Saturday)
    var targetDay = dayOfWeek <= dayIndex ? dayIndex : dayIndex + 7; // ถ้าเลือกวันที่เป็นวันถัดไป
    var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (targetDay - dayOfWeek), hours, minutes, seconds);
  
    var timeRemaining = targetDate - now;
    if (timeRemaining < 0) {
      targetDate.setDate(targetDate.getDate() + 7); // เพิ่ม 7 วันถ้าเลยเวลา
      timeRemaining = targetDate - now;
    }
  
    var secondsRemaining = Math.floor((timeRemaining / 1000) % 60);
    var minutesRemaining = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hoursRemaining = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    var daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  
    var countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = `
      <p>วันที่เลือก: ${daysOfWeek[dayIndex]}</p>
      <p>เวลาที่เหลือจนถึงเวลาที่กำหนด:</p>
      <p>${daysRemaining} วัน ${hoursRemaining} ชั่วโมง ${minutesRemaining} นาที ${secondsRemaining} วินาที</p>
    `;
  }

  // Update countdown on input change
  document.getElementById('daySelect').addEventListener('change', updateCountdown);
  document.getElementById('hoursSelect').addEventListener('change', updateCountdown);
  document.getElementById('minutesSelect').addEventListener('change', updateCountdown);
  document.getElementById('secondsSelect').addEventListener('change', updateCountdown);

  // Update countdown every second
  setInterval(updateCountdown, 1000);

  // Initial update
  updateCountdown();
});
