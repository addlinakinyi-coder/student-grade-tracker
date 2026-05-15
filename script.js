// Array to keep track of all entered marks for average calculation
let allMarks = [];

// Get references to DOM elements
const studentNameInput = document.getElementById('studentName');
const studentMarksInput = document.getElementById('studentMarks');
const addBtn = document.getElementById('addBtn');
const studentTableBody = document.getElementById('studentTableBody');
const classAverageSpan = document.getElementById('classAverage');

// Function to calculate letter grade based on marks
function calculateGrade(marks) {
    if (marks >= 80 && marks <= 100) {
        return "A";
    } else if (marks >= 70 && marks < 80) {
        return "B";
    } else if (marks >= 60 && marks < 70) {
        return "C";
    } else if (marks >= 50 && marks < 60) {
        return "D";
    } else {
        return "E/Fail";
    }
}

// Function to update the running class average display
function updateClassAverage() {
    if (allMarks.length === 0) {
        classAverageSpan.textContent = "0";
        return;
    }
    
    let total = 0;
    for (let i = 0; i < allMarks.length; i++) {
        total += allMarks[i];
    }
    
    let average = total / allMarks.length;
    classAverageSpan.textContent = average.toFixed(1); // Formats to 1 decimal place
}

// Handle the button click event
addBtn.addEventListener('click', function() {
    const name = studentNameInput.value.trim();
    const marksText = studentMarksInput.value.trim();
    const marks = Number(marksText);

    // Simple validation checks
    if (name === "" || marksText === "") {
        alert("Please enter both a student name and marks.");
        return;
    }

    if (marks < 0 || marks > 100 || isNaN(marks)) {
        alert("Please enter a valid mark between 0 and 100.");
        return;
    }

    // Determine the letter grade
    const grade = calculateGrade(marks);

    // Add marks to our tracking array
    allMarks.push(marks);

    // Create a new row for our data table
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${marks}</td>
        <td><strong>${grade}</strong></td>
    `;

    // Append the row into the table body view
    studentTableBody.appendChild(row);

    // Update the class average calculation
    updateClassAverage();

    // Clear input fields for the next entry
    studentNameInput.value = "";
    studentMarksInput.value = "";
});
