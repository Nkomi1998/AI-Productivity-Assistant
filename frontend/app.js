// AI Productivity Assistant - Frontend

// Feature Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const feature = this.dataset.feature;
        switchFeature(feature);
    });
});

function switchFeature(feature) {
    // Hide all sections
    document.querySelectorAll('.feature-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(feature).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.feature === feature) {
            link.classList.add('active');
        }
    });
}

// Email Generator
document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const purpose = document.getElementById('emailPurpose').value;
    const tone = document.getElementById('emailTone').value;
    const details = document.getElementById('emailDetails').value;

    showLoader('emailLoader');
    hideOutput('emailOutput');

    try {
        const response = await fetch('/api/generate-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ purpose, tone, details })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('emailResult').textContent = data.email;
            showOutput('emailOutput');
        } else {
            showError(data.error || 'Failed to generate email');
        }
    } catch (error) {
        showError('Error: ' + error.message);
    } finally {
        hideLoader('emailLoader');
    }
});

// Meeting Notes Summarizer
document.getElementById('notesForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const notes = document.getElementById('meetingNotes').value;

    showLoader('notesLoader');
    hideOutput('notesOutput');

    try {
        const response = await fetch('/api/summarize-notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('notesSummary').textContent = data.summary;
            document.getElementById('notesActions').innerHTML = formatList(data.actionItems);
            document.getElementById('notesDeadlines').innerHTML = formatList(data.deadlines);
            document.getElementById('notesDecisions').innerHTML = formatList(data.decisions);
            showOutput('notesOutput');
        } else {
            showError(data.error || 'Failed to summarize notes');
        }
    } catch (error) {
        showError('Error: ' + error.message);
    } finally {
        hideLoader('notesLoader');
    }
});

// Task Planner
document.getElementById('plannerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tasks = document.getElementById('tasks').value;
    const period = document.getElementById('plannerPeriod').value;

    showLoader('plannerLoader');
    hideOutput('plannerOutput');

    try {
        const response = await fetch('/api/plan-tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks, period })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('plannerPriority').innerHTML = formatList(data.priority);
            document.getElementById('plannerSchedule').textContent = data.schedule;
            showOutput('plannerOutput');
        } else {
            showError(data.error || 'Failed to create plan');
        }
    } catch (error) {
        showError('Error: ' + error.message);
    } finally {
        hideLoader('plannerLoader');
    }
});

// Utility Functions
function showLoader(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hideLoader(id) {
    document.getElementById(id).classList.add('hidden');
}

function showOutput(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hideOutput(id) {
    document.getElementById(id).classList.add('hidden');
}

function formatList(items) {
    if (Array.isArray(items)) {
        return '<ul>' + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
    }
    return items;
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

function showError(message) {
    alert(message);
}
