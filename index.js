// Helper function to select elements by ID
const selectById = (id) => document.getElementById(id);

// Select relevant elements
const firstInput = selectById('a1');
const calculateBtn = selectById('calculate');
const clearBtn = selectById('clear');
const inputs = document.querySelectorAll('input[type="number"]');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const percentile = {
    'a': [1, 2, 3, 8, 12, 19, 29, 37, 45, 54, 63, 70, 79, 86, 91, 95, 98],
    'b': [1, 2, 2, 5, 8, 11, 16, 26, 36, 49, 64, 75, 85, 90, 94, 97, 99],
    'c': [1, 2, 3, 6, 8, 12, 15, 24, 34, 44, 54, 61, 72, 81, 88, 93, 97],
    'd': [1, 2, 5, 9, 13, 19, 27, 35, 44, 52, 60, 68, 78, 86, 91, 95, 98],
    'e': [1, 3, 6, 9, 14, 21, 31, 39, 48, 57, 66, 75, 84, 89, 94, 96, 98],
    'f': [2, 4, 7, 9, 12, 14 , 21, 38, 45, 55, 63, 72, 80, 79, 93, 97],
    'g': [1, 4, 8, 15, 23, 32, 43, 53, 63, 72, 81, 86, 90, 93, 95, 97, 99],
    'h': [1, 2, 4, 7, 9, 13, 18, 24, 34, 39, 45, 54, 64, 73, 84, 91, 96]
};

let scores = [];
let percentileScores = [];

// Attach event listeners to inputs for focus management
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value !== '') {
            moveToNextInput(index);
        }
    });
});

// Calculate button click handler
calculateBtn.addEventListener('click', () => {
    calculateScores();
    displayResults();
    resetScores();
});

// Clear button click handler
clearBtn.addEventListener('click', clearInputs);

function calculateScores() {
    letters.forEach((letter) => {
        const totalScore = calculateTotalScore(letter);
        scores.push(totalScore);
    });
}

function displayResults() {
    letters.forEach((letter, index) => {
        const score = scores[index];
        selectById(letter).textContent = score;
        
        const percentileScore = percentile[letter][score];
        selectById(`${letter}-percentile`).textContent = percentileScore;
        percentileScores.push(percentileScore);
        
        const rating = calculateRating(percentileScore);
        selectById(`${letter}-rating`).textContent = rating;
    });
}

function resetScores() {
    scores = [];
    percentileScores = [];
}

function calculateTotalScore(letter) {
    let totalScore = 0;
    for (let i = 1; i <= 4; i++) {
        const score = parseInt(selectById(`${letter}${i}`).value) || 0;
        totalScore += score;
    }
    return totalScore;
}

function moveToNextInput(index) {
    if (index + 1 < inputs.length) {
        inputs[index + 1].focus();
    }
}

function calculateRating(percentileScore) {
    const ratings = [
        { min: 95, max: 100, rating: 'Very High' },
        { min: 76, max: 94, rating: 'High' },
        { min: 26, max: 75, rating: 'Average' },
        { min: 7, max: 24, rating: 'Low' },
        { min: 1, max: 6, rating: 'Very Low' }
    ];

    for (const range of ratings) {
        if (percentileScore >= range.min && percentileScore <= range.max) {
            return range.rating;
        }
    }

    return 'Invalid Score';
}

function clearInputs() {
    inputs.forEach((input) => {
        input.value = '';
    });

    // Scrolls back into the first input
    firstInput.scrollIntoView({behavior: 'smooth', block: 'center'})
}
