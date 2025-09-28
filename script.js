// Get references to DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const team = document.getElementById("teamSelect");

// Initialize counters
let count = 0;
const maxCount = 50;

// Function to handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the input values
  const name = nameInput.value;
  const teamValue = team.value;
  console.log(name, teamValue);

  // Increment the count and update the display
  count++;
  updateTotalAttendeeBox();
  updateProgressBar();
  console.log("Check-ins: ", count);

  // Calculate and display the percentage
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Percentage: ${percentage}`);

  // Update team counter
  const teamCounter = document.getElementById(teamValue + "Count");

  // Increment the team counter
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Display personalized greeting message
  const greeting = document.getElementById("greeting");
  if (name !== "") {
    greeting.textContent = `Welcome, ${name}! You are checked in.`;
  }

  console.log("Greeting text:", greeting.textContent);

  // Reset the form
  form.reset();
});

// Update total attendee count display
function updateTotalAttendeeBox() {
  const totalBox = document.getElementById("totalAttendeeBox");
  if (totalBox) {
    totalBox.textContent = count;
  }
}

// Update progress bar width based on count and goal
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  // Calculate percentage width
  percent = Math.min((count / maxCount) * 100, 100);
  // Update progress bar width
  if (progressBar) {
    progressBar.style.width = percent + "%";
  }
}

// Initialize total attendee box and progress bar on page load
updateTotalAttendeeBox();
updateProgressBar();
