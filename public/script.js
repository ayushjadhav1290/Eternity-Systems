document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const criteriaWidget = document.getElementById('criteriaWidget');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const slidersContainer = document.getElementById('slidersContainer');
    const slides = document.querySelectorAll('.slide');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');

    // Result slide elements
    const bestProviderName = document.getElementById('bestProviderName');
    const bestProviderDescription = document.getElementById('bestProviderDescription');
    const bestScore = document.getElementById('bestScore');
    const reasoning = document.getElementById('reasoning');
    const detailPrice = document.getElementById('detailPrice');
    const detailEfficiency = document.getElementById('detailEfficiency');
    const detailSpeed = document.getElementById('detailSpeed');
    const detailReliability = document.getElementById('detailReliability');
    const providerRanking = document.getElementById('providerRanking');

    // Slide 3 elements
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsDescription = document.getElementById('detailsDescription');
    const detailsContent = document.getElementById('detailsContent');
    const backToResultsBtn = document.getElementById('backToResultsBtn');

    // Error slide elements
    const errorMessage = document.getElementById('errorMessage');

    // State
    let currentSlideId = 'slide-form';
    let selectedCriteria = {};


    /**
     * Shows a specific slide by its ID and hides others.
     * @param {string} slideId The ID of the slide to show.
     */
    function showSlide(slideId) {
        slides.forEach(slide => {
            slide.classList.toggle('active', slide.id === slideId);
        });
        currentSlideId = slideId;
        updateNavButtons();
    }

    /**
     * Adds a message to the chat interface.
     * @param {string} text The message content.
     * @param {string} sender 'user' or 'system'.
     */
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    }

    /**
     * Handles sending a user message and triggering the criteria widget.
     */
    function handleSendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        addMessage(messageText, 'user');
        chatInput.value = '';
        chatInput.disabled = true;
        sendBtn.disabled = true;

        // Simulate bot thinking and showing the widget
        setTimeout(() => {
            addMessage("Interesting. Based on that, I've prepared some criteria for you to adjust. Please refine them below.", 'system');
            showCriteriaWidget();
            chatInput.disabled = false;
            sendBtn.disabled = false;
        }, 1200);
    }

    /**
     * Shows and populates the criteria selection widget if it's not already visible.
     */
    function showCriteriaWidget() {
        if (criteriaWidget.classList.contains('hidden')) {
            const availableCriteria = {
                price: "Price Sensitivity",
                efficiency: "Efficiency",
                speed: "Speed",
                reliability: "Reliability",
                security: "Security",
                scalability: "Scalability"
            };

            slidersContainer.innerHTML = ''; // Clear previous sliders

            Object.entries(availableCriteria).forEach(([key, label]) => {
                const sliderHTML = `
                    <div class="criteria-item" data-criteria="${key}">
                        <label for="${key}Slider">${label}</label>
                        <div class="slider-container">
                            <input type="range" min="0" max="100" value="50" class="slider" id="${key}Slider">
                            <span class="slider-value">50</span>
                        </div>
                    </div>`;
                slidersContainer.insertAdjacentHTML('beforeend', sliderHTML);
            });
            
            chatMessages.appendChild(criteriaWidget);
            criteriaWidget.classList.remove('hidden');
            setupSliderListeners();
        }
    }

    /**
     * Sets up 'input' event listeners for dynamically added sliders to update their value display.
     */
    function setupSliderListeners() {
        slidersContainer.querySelectorAll('.slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                e.target.nextElementSibling.textContent = e.target.value;
            });
        });
    }

    /**
     * Gathers criteria, calls the analysis API, and displays the result.
     * @param {Event} e The form submission event.
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        showSlide('slide-loading');

        const criteria = {};
        slidersContainer.querySelectorAll('.criteria-item').forEach(item => {
            const key = item.dataset.criteria;
            const value = item.querySelector('.slider').value;
            criteria[key] = parseInt(value, 10);
        });
        selectedCriteria = criteria; // Store criteria for the details view

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(criteria)
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const result = await response.json();
            displayResults(result);
            showSlide('slide-results');
        } catch (error) {
            console.error('Analysis failed:', error);
            displayError(error.message);
            showSlide('slide-error');
        }
    }

    /**
     * Populates the results slide with data from the API.
     * @param {object} data The analysis result object.
     */
    function displayResults({ providerDetails, score, reasoning: reasoningText, allScores }) {
        bestProviderName.textContent = providerDetails.name;
        bestProviderDescription.textContent = providerDetails.description;
        bestScore.textContent = `${score}%`;
        reasoning.textContent = reasoningText;
        detailPrice.textContent = providerDetails.price;
        detailEfficiency.textContent = providerDetails.efficiency;
        detailSpeed.textContent = providerDetails.speed;
        detailReliability.textContent = providerDetails.reliability;

        let tableHtml = `<table class="provider-table"><thead><tr><th>Rank</th><th>Provider</th><th style="text-align: right;">Score</th><th>Details</th></tr></thead><tbody>`;
        allScores.forEach((item, index) => {
            const scoresJson = JSON.stringify(item.scores).replace(/'/g, '&apos;');
            const description = item.description ? item.description.replace(/'/g, '&apos;').replace(/"/g, '&quot;') : '';
            tableHtml += `<tr class="${index === 0 ? 'winner-row' : ''}">
                <td class="rank-cell">${index + 1}</td>
                <td class="provider-cell">${item.provider}</td>
                <td class="score-cell">${item.score}%</td>
                <td class="details-cell">
                    <button class="btn-view-details" data-provider='${item.provider}' data-scores='${scoresJson}' data-description='${description}'>View</button>
                </td>
            </tr>`;
        });
        tableHtml += `</tbody></table>`;
        providerRanking.innerHTML = tableHtml;

        // Add event listeners for the new "View" buttons
        providerRanking.querySelectorAll('.btn-view-details').forEach(button => {
            button.addEventListener('click', handleViewDetailsClick);
        });
    }

    function handleViewDetailsClick(e) {
        const button = e.currentTarget;
        const providerName = button.dataset.provider;
        const scores = JSON.parse(button.dataset.scores);
        const description = button.dataset.description;
        showProviderDetailsSlide(providerName, scores, description);
    }

    function showProviderDetailsSlide(providerName, scores, description) {
        detailsTitle.textContent = providerName;
        detailsDescription.textContent = description;
        
        let detailsHtml = '';
        // Use the stored selectedCriteria to show only relevant scores
        for (const key in selectedCriteria) {
            if (Object.hasOwnProperty.call(selectedCriteria, key) && scores[key] !== undefined) {
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                detailsHtml += `
                    <div class="detail-item"><span class="detail-label">${label}</span><span class="detail-value">${scores[key]}</span></div>
                `;
            }
        }
        detailsContent.innerHTML = detailsHtml;
        showSlide('slide-details');
    }

    /**
     * Displays an error message on the error slide.
     * @param {string} message The error message to display.
     */
    function displayError(message) {
        errorMessage.textContent = `An unexpected error occurred. Please try again. Details: ${message}`;
    }
    
    /**
     * Updates the state of the main navigation buttons.
*/
    function updateNavButtons() {
        if (currentSlideId === 'slide-form') {
            prevSlideBtn.disabled = true;
        } else {
            prevSlideBtn.disabled = false;
        }
        nextSlideBtn.disabled = true; // 'Next' is not used in this flow
    }

    // --- Event Listeners ---
    if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
    if (chatInput) chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    if (criteriaWidget) criteriaWidget.addEventListener('submit', handleFormSubmit);
    if (analyzeBtn) analyzeBtn.addEventListener('click', handleFormSubmit);
    prevSlideBtn.addEventListener('click', () => {
        if (currentSlideId === 'slide-details') {
            showSlide('slide-results');
        } else {
            showSlide('slide-form');
        }
    });

    // Initial setup
    showSlide('slide-form');
});