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
    const winnerDetailsGrid = document.getElementById('winnerDetailsGrid');
    const providerRanking = document.getElementById('providerRanking');
    const selectedCriteriaDisplay = document.getElementById('selectedCriteriaDisplay');

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
    let analysisTimeout = null;
    
    const availableCriteria = {
        price: "Price Sensitivity",
        efficiency: "Efficiency",
        speed: "Speed",
        reliability: "Reliability",
        security: "Security",
        scalability: "Scalability"
    };

    const KEYWORDS = {
        price: ['cheap', 'cost', 'budget', 'price', 'money', 'expensive', 'affordable', 'low cost', 'cheaper'],
        efficiency: ['efficient', 'green', 'energy', 'power', 'sustainable', 'eco'],
        speed: ['fast', 'speed', 'quick', 'performance', 'latency', 'rapid', 'compute'],
        reliability: ['reliable', 'uptime', 'stable', 'crash', 'down', 'availability'],
        security: ['secure', 'safe', 'hack', 'privacy', 'compliance', 'protect', 'data'],
        scalability: ['scale', 'grow', 'large', 'traffic', 'expand', 'big', 'load']
    };

    // Event delegation for sliders
    slidersContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('slider')) {
            e.target.nextElementSibling.textContent = e.target.value;

            // If user interacts, cancel auto-analysis and inform them
            if (analysisTimeout) {
                clearTimeout(analysisTimeout);
                analysisTimeout = null;
                addMessage("Great! Adjust the sliders as you see fit, then click 'Find Best Provider' when you're ready.", 'system');
            }
        }
    });


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
     * Detects criteria keys from user input text.
     */
    function getDetectedCriteria(text) {
        const lowerText = text.toLowerCase();
        const detected = [];
        Object.entries(KEYWORDS).forEach(([key, words]) => {
            if (words.some(word => lowerText.includes(word))) {
                detected.push(key);
            }
        });
        return detected;
    }

    /**
     * Renders a single slider HTML.
     */
    function renderSlider(key) {
        const label = availableCriteria[key];
        return `
            <div class="criteria-item" data-criteria="${key}">
                <label for="${key}Slider">
                    ${label}
                    <span class="recommendation-tag hidden" style="font-size: 0.8em; color: #2ecc71; margin-left: 10px;">Recommended: <span class="rec-value"></span></span>
                </label>
                <div class="slider-container">
                    <input type="range" min="0" max="100" value="50" class="slider" id="${key}Slider">
                    <span class="slider-value">50</span>
                </div>
            </div>`;
    }

    /**
     * Updates slider values based on detected keys.
     */
    function updateSlidersValues(keys) {
        let updated = false;
        keys.forEach(key => {
            const slider = document.getElementById(`${key}Slider`);
            if (slider) {
                let currentVal = parseInt(slider.value, 10);
                let newVal = (currentVal === 0 || currentVal === 50) ? 80 : Math.min(100, currentVal + 10);
                slider.value = newVal;
                slider.nextElementSibling.textContent = newVal;

                const container = slider.closest('.criteria-item');
                const recTag = container.querySelector('.recommendation-tag');
                const recValue = container.querySelector('.rec-value');
                if (recTag && recValue) {
                    recValue.textContent = newVal;
                    recTag.classList.remove('hidden');
                }

                updated = true;
            }
        });
        return updated;
    }

    /**
     * Starts the auto-analysis timer.
     */
    function startAnalysisTimer() {
        if (analysisTimeout) clearTimeout(analysisTimeout);
        analysisTimeout = setTimeout(() => {
            addMessage("You haven't made any changes, so I'll analyze with the current settings...", 'system');
            handleFormSubmit({ preventDefault: () => {} });
        }, 7000); // 7 seconds
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
            const detectedKeys = getDetectedCriteria(messageText);
            let responseText = "";
            let criteriaUpdated = false;
            const wasHidden = criteriaWidget.classList.contains('hidden');
            let shouldStartTimer = true;
            let suggestionData = null;

            if (detectedKeys.length > 0) {
                showCriteriaWidget(detectedKeys);
                criteriaUpdated = updateSlidersValues(detectedKeys);

                if (wasHidden) {
                    if (detectedKeys.length === 1) {
                        const keyName = availableCriteria[detectedKeys[0]];
                        const otherKeys = Object.keys(availableCriteria).filter(k => k !== detectedKeys[0]);
                        const randomKey = otherKeys[Math.floor(Math.random() * otherKeys.length)];
                        const suggestionName = availableCriteria[randomKey];
                        responseText = `I noticed you're interested in ${keyName}. What about ${suggestionName}?`;
                        shouldStartTimer = false;
                        suggestionData = { key: randomKey, name: suggestionName };
                    } else {
                        responseText = "I've analyzed your request and pre-configured the criteria below based on your description. Feel free to fine-tune them.";
                    }
                } else {
                    responseText = "I've updated the sliders based on your new input. Please verify they match your needs.";
                }
                
                addMessage(responseText, 'system');
                chatMessages.appendChild(criteriaWidget);

                // Inject buttons if a suggestion was made
                if (suggestionData) {
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'chat-actions';
                    actionsDiv.style.marginTop = '10px';
                    actionsDiv.style.marginBottom = '10px';
                    
                    const yesBtn = document.createElement('button');
                    yesBtn.textContent = 'Yes';
                    yesBtn.className = 'btn-view-details'; 
                    yesBtn.style.marginRight = '10px';
                    
                    const noBtn = document.createElement('button');
                    noBtn.textContent = 'No';
                    noBtn.className = 'btn-view-details';
                    
                    actionsDiv.appendChild(yesBtn);
                    actionsDiv.appendChild(noBtn);
                    // Insert buttons before the widget
                    chatMessages.insertBefore(actionsDiv, criteriaWidget);
                    
                    yesBtn.onclick = () => {
                        actionsDiv.remove();
                        addMessage("Yes", 'user');
                        
                        const newKeys = [...detectedKeys, suggestionData.key];
                        showCriteriaWidget(newKeys);
                        updateSlidersValues([suggestionData.key]);
                        
                        addMessage(`Great, I've added ${suggestionData.name} to the criteria.`, 'system');
                        startAnalysisTimer();
                    };

                    noBtn.onclick = () => {
                        actionsDiv.remove();
                        addMessage("No", 'user');
                        startAnalysisTimer();
                    };
                }
                chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                if (wasHidden) {
                    addMessage("I can help you find the best cloud provider. Please tell me what you are looking for (e.g., 'cheap', 'fast').", 'system');
                    shouldStartTimer = false;
                } else {
                    addMessage("I didn't detect specific criteria in your message. Feel free to adjust the sliders manually.", 'system');
                    chatMessages.appendChild(criteriaWidget);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }

            // Clear any previous timer and set a new one for auto-analysis
            if (analysisTimeout) clearTimeout(analysisTimeout);
            if (shouldStartTimer) {
                startAnalysisTimer();
            }

            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }, 1200);
    }

    /**
     * Shows and populates the criteria selection widget if it's not already visible.
     */
    function showCriteriaWidget(keysToShow = null) {
        const isHidden = criteriaWidget.classList.contains('hidden');
        
        if (isHidden) {
            slidersContainer.innerHTML = ''; // Clear previous sliders
            
            // If specific keys detected, show only those. Otherwise show all.
            const keys = (keysToShow && keysToShow.length > 0) ? keysToShow : Object.keys(availableCriteria);
            
            keys.forEach(key => {
                if (availableCriteria[key]) {
                    slidersContainer.insertAdjacentHTML('beforeend', renderSlider(key));
                }
            });
            
            chatMessages.appendChild(criteriaWidget);
            criteriaWidget.classList.remove('hidden');
        } else {
            // Widget already visible, add any new detected keys if missing
            const keys = (keysToShow && keysToShow.length > 0) ? keysToShow : [];
            keys.forEach(key => {
                if (!document.getElementById(`${key}Slider`) && availableCriteria[key]) {
                    slidersContainer.insertAdjacentHTML('beforeend', renderSlider(key));
                }
            });
        }
    }

    /**
     * Gathers criteria, calls the analysis API, and displays the result.
     * @param {Event} e The form submission event.
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Clear the auto-analysis timer if it's running
        if (analysisTimeout) {
            clearTimeout(analysisTimeout);
            analysisTimeout = null;
        }

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

        // Display selected criteria summary
        if (selectedCriteriaDisplay) {
            const criteriaHtml = Object.entries(selectedCriteria)
                .filter(([_, value]) => value > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([key, value]) => `<div class="criteria-tag">${key.charAt(0).toUpperCase() + key.slice(1)}: <span>${value}</span></div>`)
                .join('');
            
            selectedCriteriaDisplay.innerHTML = criteriaHtml || '<div class="criteria-tag">Default Settings</div>';
        }

        // Populate winner details dynamically based on selected criteria
        // Sort criteria by weight descending so the most important ones appear first
        const sortedCriteria = Object.entries(selectedCriteria)
            .sort(([, weightA], [, weightB]) => weightB - weightA);

        let winnerDetailsHtml = '';
        for (const [key, weight] of sortedCriteria) {
            if (providerDetails.scores[key] !== undefined && weight > 0) {
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                winnerDetailsHtml += `
                    <div class="detail-item"><span class="detail-label">${label}</span><span class="detail-value">${providerDetails.scores[key]}</span></div>
                `;
            }
        }
        winnerDetailsGrid.innerHTML = winnerDetailsHtml;

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
        
        // Sort criteria by weight descending
        const sortedCriteria = Object.entries(selectedCriteria)
            .sort(([, weightA], [, weightB]) => weightB - weightA);

        let detailsHtml = '';
        // Use the stored selectedCriteria to show only relevant scores
        for (const [key, weight] of sortedCriteria) {
            if (scores[key] !== undefined && weight > 0) {
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