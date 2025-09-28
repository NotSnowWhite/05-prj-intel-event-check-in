// Get references to DOM elements
const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('nameInput');
const team = document.getElementById('teamSelect');

// Initialize counters
let count = 0;
const maxCount = 80;

// Function to handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

  // Get the input values
  const name = nameInput.value;
  const teamValue = team.value;
  console.log(name, teamValue);
  
  // Increment the count and update the display
  count++;
  console.log('Check-ins: ', count);

  // Calculate and display the percentage
  const percentage = Math.round((count / maxCount) * 100 + '%');
  console.log(`Percentage: ${percentage}`);

  // Update team counter
  const teamCounter = document.getElementById(teamValue + 'Count');

  // Increment the team counter
  teamCounter.textContent = parseInt(teamCounter.textContent) +1;

  // Display welcome message
  const message = `Welcome, ${name} from ${teamValue}`;
  console.log(message);

  // Reset the form
  form.reset();
  });