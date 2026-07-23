document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Estimator Logic
    const textInput = document.getElementById('textInput');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const charCountDisplay = document.getElementById('charCount');
    const estCostDisplay = document.getElementById('estCost');

    if (textInput && fileInput) {
        const RATE_PER_CHAR = 49 / 600000;

        function calculateCost(text) {
            const charCount = text.length;
            const cost = charCount * RATE_PER_CHAR;
            
            charCountDisplay.textContent = charCount.toLocaleString();
            
            if (charCount === 0) {
                estCostDisplay.textContent = "$0.00";
            } else if (cost < 0.01) {
                estCostDisplay.textContent = "<$0.01";
            } else {
                estCostDisplay.textContent = "$" + cost.toFixed(2);
            }
        }

        textInput.addEventListener('input', (e) => {
            calculateCost(e.target.value);
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                const reader = new FileReader();
                reader.onload = function(event) {
                    textInput.value = event.target.result;
                    calculateCost(event.target.result);
                };
                reader.readAsText(file);
            } else {
                fileNameDisplay.textContent = '';
            }
        });
    }
});
