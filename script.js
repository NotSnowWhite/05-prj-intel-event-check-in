// Get references to DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const team = document.getElementById("teamSelect");

// Initialize counters
let count = 0;
const maxCount = 50;

// Load counts from localStorage if available
function loadCounts() {
  const savedCount = localStorage.getItem("totalAttendance");
  if (savedCount !== null) {
    count = parseInt(savedCount);
  }
  const teams = ["water", "zero", "power"];
  teams.forEach(function (team) {
    const savedTeam = localStorage.getItem(team + "Count");
    const teamCounter = document.getElementById(team + "Count");
    if (savedTeam !== null && teamCounter) {
      teamCounter.textContent = savedTeam;
    }
  });
}

// Save counts to localStorage
function saveCounts() {
  localStorage.setItem("totalAttendance", count);
  const teams = ["water", "zero", "power"];
  teams.forEach(function (team) {
    const teamCounter = document.getElementById(team + "Count");
    if (teamCounter) {
      localStorage.setItem(team + "Count", teamCounter.textContent);
    }
  });
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the input values
  const name = nameInput.value;
  const teamValue = team.value;
  console.log(name, teamValue);

  // Increment the count and update the display
  count++;
  // Initialize total attendee box on page load
  updateTotalAttendeeBox();
  updateAttendeeCountDisplay();
  updateProgressBar();
  console.log("Check-ins: ", count);

  // Calculate and display the percentage
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Percentage: ${percentage}`);

  // Update team counter
  const teamCounter = document.getElementById(teamValue + "Count");

  // Increment the team counter
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Add attendee name to the correct team list
  let teamList = JSON.parse(localStorage.getItem(teamValue + 'List') || '[]');
  teamList.push(name);
  localStorage.setItem(teamValue + 'List', JSON.stringify(teamList));
  renderTeamLists();

  // Save updated counts
  saveCounts();

  // Display personalized greeting message
  const greeting = document.getElementById("greeting");
  if (name !== "") {
    greeting.textContent = `Welcome, ${name}! You are checked in.`;
  }
  console.log("Greeting text:", greeting.textContent);

  // Reset the form
  form.reset();
  // If goal reached, show celebration message
  if (count >= maxCount) {
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);
    let winner = "";
    if (water >= zero && water >= power) {
      winner = "Team Water Wise";
    } else if (zero >= water && zero >= power) {
      winner = "Team Net Zero";
    } else {
      winner = "Team Renewables";
    }
    const celebration = document.getElementById("celebration");
    if (celebration) {
      celebration.style.display = "block";
      celebration.innerHTML = `<b>🎉 ${winner} wins! 🎉</b>`;
    }
  }

  // Reset the form
  form.reset();
});

// Render all team attendee lists from localStorage
function renderTeamLists() {
  ['water', 'zero', 'power'].forEach(function(team) {
    const listElem = document.getElementById(team + 'List');
    if (listElem) {
      let names = [];
      try {
        names = JSON.parse(localStorage.getItem(team + 'List')) || [];
      } catch (e) {}
      listElem.innerHTML = '';
      names.forEach(function(n) {
        const li = document.createElement('li');
        li.textContent = n;
        listElem.appendChild(li);
      });
    }
  });
}

// Update attendee count above progress bar (0/50)
function updateAttendeeCountDisplay() {
  const attendeeCount = document.getElementById("attendeeCount");
  if (attendeeCount) {
    attendeeCount.textContent = count >= maxCount ? maxCount : count;
  }
}


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

// On page load, restore counts and update UI
loadCounts();
updateAttendeeCountDisplay();
updateTotalAttendeeBox();
updateProgressBar();
renderTeamLists();
