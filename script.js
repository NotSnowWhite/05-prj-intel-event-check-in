const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const team = document.getElementById('teamSelect');

// Function to handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get input values
    const nameValue = nameInput.value;
    const teamValue = team.value;
    console.log(nameValue, teamValue);
  
    // Validate inputs
    if (nameValue === '') {
        alert('Please enter your name.');
        return;
    }
  
    if (teamValue === '') {
        alert('Please select a team.');
        return;
    }
  
    // // Process the form data (e.g., send to server or display a message)
    // alert(`Thank you for checking in, ${nameValue} from ${teamValue} team!`);
  
    // // Reset the form
    // form.reset();
  
  });