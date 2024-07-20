document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const app = document.getElementById('app');
    const habitForm = document.getElementById('habitForm');
    const habitNameInput = document.getElementById('habitName');
    const habitFrequencySelect = document.getElementById('habitFrequency');
    const habitList = document.getElementById('habitList');
    const pointsSpan = document.getElementById('points');
    const leaderboardList = document.getElementById('leaderboardList');

    let points = parseInt(localStorage.getItem('points')) || 0;
    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            li.textContent = habit.name;
            if (habit.completedToday) {
                li.style.backgroundColor = '#d4edda';
            }
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => markHabitComplete(index);
            li.appendChild(completeButton);
            habitList.appendChild(li);
        });
    }

    function markHabitComplete(index) {
        const habit = habits[index];
        habit.completedToday = true;
        localStorage.setItem('habits', JSON.stringify(habits));
        updatePoints();
        renderHabits();
    }

    function updatePoints() {
        points += 10; // 10 points for each habit completed
        pointsSpan.textContent = points;
        localStorage.setItem('points', points);
        updateLeaderboard();
    }

    function updateLeaderboard() {
        // For simplicity, just add points to leaderboard
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ name: 'User', points });
        leaderboard.sort((a, b) => b.points - a.points);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        renderLeaderboard();
    }

    function renderLeaderboard() {
        leaderboardList.innerHTML = '';
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.name}: ${entry.points} points`;
            leaderboardList.appendChild(li);
        });
    }

    habitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = habitNameInput.value;
        const frequency = habitFrequencySelect.value;
        habits.push({ name, frequency, completedToday: false });
        localStorage.setItem('habits', JSON.stringify(habits));
        habitNameInput.value = '';
        renderHabits();
    });

    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        app.classList.remove('hidden');
        renderHabits();
        renderLeaderboard();
    });

    pointsSpan.textContent = points;
});
