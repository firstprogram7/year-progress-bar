function updateYearProgress() {
  const now = new Date(); // Current exact moment
  const currentYear = now.getFullYear();
  const month = now.getMonth();
  // -----------------------------------------------------
  // MONTH PROGRESS BAR
  // Start of THIS month (e.g., April 1st, 00:00:00)
  const startOfThisMonth = new Date(currentYear, month, 1);

  // Start of NEXT month (e.g., May 1st, 00:00:00)
  const startOfNextMonth = new Date(currentYear, month + 1, 1);

  const msTotal = startOfNextMonth.getTime() - startOfThisMonth.getTime();
  const msLeft = startOfNextMonth.getTime() - now.getTime();

  // DEBUGGING: If msLeft is 0, these two will be identical
  console.log("Now: ", now.toLocaleString());
  console.log("Next Month Start: ", startOfNextMonth.toLocaleString());
  console.log("MS Left: ", msLeft);

  if (msTotal > 0) {
    const percentageMonthLeft = (msLeft / msTotal) * 100;
    const displayMonthPercentage = percentageMonthLeft.toFixed(2);

    const progressMonthText = document.getElementById("progressMonthText");
    const monthProgress = document.getElementById("monthProgress");

    // 1. Update Text and Width
    progressMonthText.textContent = displayMonthPercentage + "%";
    monthProgress.style.width = displayMonthPercentage + "%";

    // 2. Color Logic (Compare against a number, not a string)
    const percentNum = parseFloat(displayMonthPercentage);

    if (percentNum < 30) {
      monthProgress.style.backgroundColor = "#e01e37";
        progressMonthText.style.color = "#6e1423";
        progressMonthText.style.fontSize = "0.7rem";
        progressMonthText.style.fontWeight = "900";
    } else if (percentNum < 50) {
      monthProgress.style.backgroundColor = "#fcbf49";
      progressMonthText.style.color = "white"; // Reset color if needed
    } else {
      monthProgress.style.backgroundColor = "#9fbf6a";
      progressMonthText.style.color = "white"; // Reset color if needed
    }
  }

  //-----------------------------------------------------------

  // Find the exact start of the current year
  const startOfYear = new Date(currentYear, 0, 1);

  // Calculate the difference in milliseconds, then convert to days
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Check if it's a leap year to get total days
  const isLeapYear =
    (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0;
  const totalDaysInYear = isLeapYear ? 366 : 365;

  // Calculate remaining days and percentage
  const daysRemaining = totalDaysInYear - dayOfYear;

  // Prevent percentage from going below 0 at the very end of the year
  const rawPercentage = (daysRemaining / totalDaysInYear) * 100;
  const percentageRemaining = Math.max(0, rawPercentage);

  // Get DOM elements
  const progressBar = document.getElementById("yearProgress");
  const progressText = document.getElementById("progressText");
  const dayLeft = document.getElementById("dayLeft");
  const dateToday = document.getElementById("dateToday");
  // Format the percentage to 2 decimal places (e.g., 75.34%)
  const displayPercent = percentageRemaining.toFixed(2) + "%";

  // Update the UI
  progressBar.style.width = displayPercent;
  progressText.textContent = displayPercent;
  dayLeft.textContent =
    "Days Left: " + daysRemaining + " of " + totalDaysInYear + " days";

  displayPercent < 30
    ? (dayLeft.style.color = "red")
    : displayPercent < 50
    ? (dayLeft.style.color = "yellow")
    : (dayLeft.style.color = "green");
  dateToday.textContent = now.toDateString();
  dateToday.style.color = "gray";
  // If the bar gets too small, keep the text visible by pushing it outside or hiding it
  if (percentageRemaining < 5) {
    progressText.style.color = "#333";
    progressText.style.paddingRight = "0";
    progressText.style.transform = "translateX(120%)"; // Push text outside the bar
  }
}

// Run the function immediately when the page loads
updateYearProgress();

// Optional: Update the bar every hour so it stays accurate without refreshing
setInterval(updateYearProgress, 1000 * 60 * 60);


// Goal setter 
const targetSelect = document.getElementById("target");
const targetLabel = document.getElementById("target-label");
const targetInput = document.getElementById("target-inp");
const targetBtn = document.getElementById("target-btn");
const targetDisplay = document.getElementById("target_display");
console.log(targetInput);
// Create a function to update the label
function updateLabel() {
  const selectedValue = targetSelect.value;
  if (selectedValue === "days") {
   
   let timer; // Variable to hold our interval

   // --- 1. FUNCTION TO START THE TIMER ---
   function startCountdown(endTime) {
     // Clear any existing timer first to avoid overlaps
     clearInterval(timer);

     timer = setInterval(() => {
       const now = new Date().getTime();
       const distance = endTime - now;

       if (distance <= 0) {
         clearInterval(timer);
         targetDisplay.innerText = "Time Up!";
         localStorage.removeItem("savedTargetTime"); // Clean up memory
         return;
       }

       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
       const hours = Math.floor(
         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
       );

       targetDisplay.innerText = `${days}d ${hours}h Left`;
     }, 1000);
   }

   // --- 2. CHECK MEMORY ON PAGE LOAD ---
   const savedTime = localStorage.getItem("savedTargetTime");
   if (savedTime) {
     // Convert string back to number and start
     startCountdown(parseInt(savedTime));
   }

   // --- 3. HANDLE BUTTON CLICK ---
   targetBtn.addEventListener("click", (e) => {
     e.preventDefault();

     const daysInput = parseFloat(targetInput.value.trim());
     if (isNaN(daysInput)) return;

     const durationMs = daysInput * 24 * 60 * 60 * 1000;
     const targetTime = new Date().getTime() + durationMs;

     // Save to localStorage (only strings allowed)
     localStorage.setItem("savedTargetTime", targetTime);

     // Start the countdown
     startCountdown(targetTime);
   }); 

  } else if (selectedValue === "hours") {
    targetLabel.textContent = "Set Target in Hrs";
  } else {
    targetLabel.textContent = "Invalid input!";
  }
}

// 1. Listen for changes when the user clicks the dropdown
targetSelect.addEventListener("change", updateLabel);

// 2. Run the function once on page load to set the initial state
updateLabel();
