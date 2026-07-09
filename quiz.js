// Wait for DOM to load fully
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quiz-form");
    const resetBtn = document.getElementById("reset-btn");
    const submitBtn = document.getElementById("submit-btn");
    const resultsPanel = document.getElementById("results-panel");
    const scoreDisplay = document.getElementById("score-display");
    const statusDisplay = document.getElementById("status-display");

    // Form submission event
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop standard page reload

        let score = 0;
        const totalQuestions = 5;

        // --- Q1: Fill in the blank ---
        const q1Input = document.getElementById("q1").value.trim().toLowerCase();
        const q1Feedback = document.getElementById("q1-feedback");
        if (q1Input === "secure") {
            score++;
            showFeedback(q1Feedback, "Correct! (Answer: Secure)", true);
        } else {
            showFeedback(q1Feedback, "Incorrect. Correct Answer: Secure", false);
        }

        // --- Q2: Radio Button ---
        const q2Radio = document.querySelector('input[name="q2"]:checked');
        const q2Feedback = document.getElementById("q2-feedback");
        if (q2Radio && q2Radio.value === "DNS") {
            score++;
            showFeedback(q2Feedback, "Correct! (Answer: DNS)", true);
        } else {
            showFeedback(q2Feedback, "Incorrect. Correct Answer: DNS", false);
        }

        // --- Q3: Radio Button ---
        const q3Radio = document.querySelector('input[name="q3"]:checked');
        const q3Feedback = document.getElementById("q3-feedback");
        if (q3Radio && q3Radio.value === "C") {
            score++;
            showFeedback(q3Feedback, "Correct! (Answer: Distribute inbound traffic)", true);
        } else {
            showFeedback(q3Feedback, "Incorrect. Correct Answer: To distribute inbound traffic across multiple servers", false);
        }

        // --- Q4: Radio Button ---
        const q4Radio = document.querySelector('input[name="q4"]:checked');
        const q4Feedback = document.getElementById("q4-feedback");
        if (q4Radio && q4Radio.value === "RAM") {
            score++;
            showFeedback(q4Feedback, "Correct! (Answer: High-speed RAM)", true);
        } else {
            showFeedback(q4Feedback, "Incorrect. Correct Answer: High-speed RAM", false);
        }

        // --- Q5: Multi-Selection (Checkboxes) ---
        const q5Checkboxes = document.querySelectorAll('input[name="q5"]:checked');
        const q5Feedback = document.getElementById("q5-feedback");
        
        // Map out selected values into an array
        const q5Values = Array.from(q5Checkboxes).map(cb => cb.value);
        
        // Exact criteria: 'caching' and 'obfuscation' checked, but 'domain' NOT checked
        const isQ5Correct = q5Values.includes("caching") && q5Values.includes("obfuscation") && q5Values.length === 2;

        if (isQ5Correct) {
            score++;
            showFeedback(q5Feedback, "Correct! (Answers: Security caching & Identity obfuscation)", true);
        } else {
            showFeedback(q5Feedback, "Incorrect. Correct Answers: Security caching & Identity obfuscation", false);
        }

        // --- DISPLAY SCORE & OVERALL RESULTS ---
        resultsPanel.classList.remove("hidden");
        scoreDisplay.textContent = `Total Score: ${score} / ${totalQuestions}`;

        // Pass/Fail calculations (Passing standard: 60% / at least 3 correct)
        if (score >= 3) {
            statusDisplay.textContent = "Result: PASSED";
            statusDisplay.className = "pass-text";
        } else {
            statusDisplay.textContent = "Result: FAILED";
            statusDisplay.className = "fail-text";
        }

        // Disable input text field & form controls after submit
        disableInputs(true);
        submitBtn.classList.add("hidden");
        resetBtn.classList.remove("hidden");
    });

    // Reset button event handler
    resetBtn.addEventListener("click", () => {
        form.reset(); // Standard input reset
        
        // Clear all feedback text strings
        document.querySelectorAll(".feedback").forEach(div => {
            div.textContent = "";
            div.className = "feedback";
        });

        // Clear dynamic tracking elements
        resultsPanel.classList.add("hidden");
        disableInputs(false);
        submitBtn.classList.remove("hidden");
        resetBtn.classList.add("hidden");
    });

    // Helper: Style inline feedback text blocks
    function showFeedback(element, text, isCorrect) {
        element.textContent = text;
        element.className = isCorrect ? "feedback correct-text" : "feedback incorrect-text";
    }

    // Helper: Lock inputs down upon grading evaluation
    function disableInputs(status) {
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => input.disabled = status);
    }
});