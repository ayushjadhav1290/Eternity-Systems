/**
 * Cloud Selector MVP - Frontend JavaScript
 * Handles form interaction and API communication
 */

// DOM Elements
const form = document.getElementById('criteriaWidget');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const loadingSection = document.getElementById('loadingSection');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const criteriaWidget = document.getElementById('criteriaWidget');

// Slide elements
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');
let currentSlide = 0; // Start on form slide
let resultsAvailable = false; // Tracks if analysis results exist

// Criteria options (full label, short label, key)
const CRITERIA_OPTIONS = [
  { key: 'price', label: 'Is it affordable? (Price)', short: 'Price', keywords: ['price', 'cost', 'cheap', 'expensive', 'budget', 'money', 'affordable', 'pricing'] },
  { key: 'speed', label: 'Will it run fast? (Performance)', short: 'Performance', keywords: ['speed', 'fast', 'quick', 'slow', 'latency', 'performance', 'compute', 'cpu'] },
  { key: 'reliability', label: "Can I trust it won't go down? (Reliability)", short: 'Reliability', keywords: ['reliability', 'reliable', 'uptime', 'stable', 'crash', 'down', 'availability'] },
  { key: 'security', label: 'Is my data safe? (Security)', short: 'Security', keywords: ['security', 'secure', 'safe', 'hack', 'privacy', 'compliance', 'protection'] },
  { key: 'scalability', label: 'Can it grow with me? (Scalability)', short: 'Scalability', keywords: ['scalability', 'scale', 'grow', 'expand', 'traffic', 'load'] },
  { key: 'global_reach', label: 'Does it work where I operate? (Global reach)', short: 'Global reach', keywords: ['global', 'reach', 'world', 'location', 'region', 'country'] },
  { key: 'support', label: 'Will I get help when needed? (Support)', short: 'Support', keywords: ['support', 'help', 'service', 'customer', 'chat'] },
  { key: 'service_variety', label: 'Does it offer what I need? (Service variety)', short: 'Service variety', keywords: ['variety', 'services', 'features', 'tools', 'products'] },
  { key: 'ease_of_use', label: 'Is it easy to use? (Ease of use)', short: 'Ease of use', keywords: ['easy', 'simple', 'hard', 'complex', 'user', 'friendly'] },
  { key: 'sustainability', label: 'Does it align with my values? (Sustainability)', short: 'Sustainability', keywords: ['sustainability', 'green', 'eco', 'carbon', 'environment'] },
  { key: 'efficiency', label: 'Efficiency', short: 'Efficiency', keywords: ['efficiency', 'efficient', 'power', 'resource', 'optimization'] }
];

// Default selected criteria
let selectedCriteria = new Set(['price', 'efficiency', 'speed', 'reliability']);

// Slider elements
let sliders = [];
const sliderValues = {};
const slidersContainer = document.getElementById('slidersContainer');
const criteriaCheckboxes = document.getElementById('criteriaCheckboxes');

// Result display elements
const bestProviderName = document.getElementById('bestProviderName');
const bestProviderDescription = document.getElementById('bestProviderDescription');
const bestScore = document.getElementById('bestScore');
const reasoning = document.getElementById('reasoning');
const providerRanking = document.getElementById('providerRanking');


// Detail elements
const detailElements = {
  price: document.getElementById('detailPrice'),
  efficiency: document.getElementById('detailEfficiency'),
  speed: document.getElementById('detailSpeed'),
  reliability: document.getElementById('detailReliability')
};

/**
 * Update slider value display
 */
function updateSliderDisplay(slider) {
  const sliderName = slider.id;
  sliderValues[sliderName].textContent = slider.value;
}

function createSliderElement(key) {
  const id = key;
  const opt = CRITERIA_OPTIONS.find(c => c.key === key) || { short: key, label: key };
  const labelText = opt.short;

  const wrapper = document.createElement('div');
  wrapper.className = 'criteria-item';
  wrapper.dataset.criterion = key;

  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  label.title = opt.label; // full descriptive sentence as tooltip

  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  const input = document.createElement('input');
  input.type = 'range';
  input.id = id;
  input.className = 'slider';
  input.min = 0;
  input.max = 100;
  input.value = 25;

  const span = document.createElement('span');
  span.className = 'slider-value';
  span.id = id + 'Value';
  span.textContent = input.value;

  sliderContainer.appendChild(input);
  sliderContainer.appendChild(span);
  wrapper.appendChild(label);
  wrapper.appendChild(sliderContainer);

  // wire events
  input.addEventListener('input', (e) => {
    sliderValues[id].textContent = e.target.value;
  });

  return { wrapper, input, span };
}

function renderCriteriaCheckboxes(showAll = true) {
  // Render as three table-like columns
  criteriaCheckboxes.innerHTML = '';
  
  const visibleOptions = showAll 
    ? CRITERIA_OPTIONS 
    : CRITERIA_OPTIONS.filter(opt => selectedCriteria.has(opt.key));

  const total = visibleOptions.length;
  const perCol = Math.ceil(total / 3);
  for (let col = 0; col < 3; col++) {
    const start = col * perCol;
    const slice = visibleOptions.slice(start, start + perCol);
    if (slice.length === 0) continue;

    const colDiv = document.createElement('div');
    colDiv.className = 'criteria-column';
    slice.forEach(opt => {
      const cbWrap = document.createElement('label');
      cbWrap.className = 'criteria-checkbox-wrap';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = opt.key;
      cb.checked = selectedCriteria.has(opt.key);
      cb.title = opt.label;
      cb.addEventListener('change', (e) => {
        if (e.target.checked) selectedCriteria.add(opt.key);
        else selectedCriteria.delete(opt.key);
        renderSliders();
      });
      cbWrap.appendChild(cb);
      cbWrap.appendChild(document.createTextNode(' ' + opt.short));
      colDiv.appendChild(cbWrap);
    });
    criteriaCheckboxes.appendChild(colDiv);
  }
}

function renderSliders() {
  slidersContainer.innerHTML = '';
  sliders = [];
  // ensure selectedCriteria order matches CRITERIA_OPTIONS
  CRITERIA_OPTIONS.forEach(opt => {
    if (!selectedCriteria.has(opt.key)) return;
    const { wrapper, input, span } = createSliderElement(opt.key);
    slidersContainer.appendChild(wrapper);
    sliders.push(input);
    sliderValues[opt.key] = span;
  });
}

/**
 * Hide all result sections
 */
function hideAllSections() {
  // This is now handled by slide navigation
}

/**
 * Navigate to a specific slide
 */
function goToSlide(slideIndex) {
  // Ensure index is within bounds
  if (slideIndex < 0 || slideIndex >= slides.length) return;
  
  // Remove active class from current slide
  slides[currentSlide].classList.remove('active');
  
  // Set new slide
  currentSlide = slideIndex;
  slides[currentSlide].classList.add('active');
  
  // Update button states
  updateSlideButtons();
}

/**
 * Update slide button states
 */
function updateSlideButtons() {
  // Previous button: disabled on first slide (form)
  prevSlideBtn.disabled = currentSlide === 0;

  // Next button logic:
  // - on form (0): enabled and visible only if we have results to show
  // - on results (1): hidden (no further slide)
  let nextEnabled = false;
  if (currentSlide === 0) {
    nextEnabled = resultsAvailable;
  }

  nextSlideBtn.disabled = !nextEnabled;

  // Update button visibility
  prevSlideBtn.style.visibility = currentSlide > 0 ? 'visible' : 'hidden';
  nextSlideBtn.style.visibility = nextEnabled ? 'visible' : 'hidden';
}

/**
 * Show loading state - navigate to loading slide
 */
function showLoading() {
  goToSlide(3); // Loading slide is index 3
}

/**
 * Show results - navigate to results slide
 */
function showResults(data) {
  const provider = data.providerDetails;
  const score = data.score.toFixed(2);
  
  // Update main result display
  bestProviderName.textContent = provider.name;
  bestProviderDescription.textContent = provider.description;
  bestScore.textContent = score;
  reasoning.textContent = data.reasoning;
  
  // Update detail cards
  detailElements.price.textContent = provider.price + '/100';
  detailElements.efficiency.textContent = provider.efficiency + '/100';
  detailElements.speed.textContent = provider.speed + '/100';
  detailElements.reliability.textContent = provider.reliability + '%';
  
  // Display provider ranking
  displayProviderRanking(data.allScores);
  
  // Navigate to results slide
  resultsAvailable = true;
  goToSlide(1);

  // No debug panel
}

/**
 * Display provider ranking comparison
 */
function displayProviderRanking(scores) {
  providerRanking.innerHTML = '';
  
  const table = document.createElement('table');
  table.className = 'provider-table';
  
  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Rank</th>
    <th>Provider</th>
    <th>Score</th>
  `;
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement('tbody');
  scores.forEach((item, index) => {
    const rank = index + 1;
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
    const row = document.createElement('tr');
    row.className = rank === 1 ? 'winner-row' : '';
    row.innerHTML = `
      <td class="rank-cell">${rankEmoji}</td>
      <td class="provider-cell">${item.provider}</td>
      <td class="score-cell">${item.score}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  
  providerRanking.appendChild(table);
}

/**
 * Show error message
 */
function showError(message) {
  const errorMsg = message || 'An unknown error occurred. Please try again.';
  document.getElementById('errorMessage').textContent = errorMsg;
  goToSlide(2); // Navigate to error slide
}

/**
 * Get form data as JSON
 */
function getFormData() {
  const data = {};
  // read current rendered sliders
  const activeSliders = slidersContainer.querySelectorAll('.slider');
  activeSliders.forEach(slider => {
    const value = parseInt(slider.value);
    if (value > 0) data[slider.id] = value;
  });
  return data;
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();
  
  const criteria = getFormData();
  console.log('Form data:', criteria);
  
  // Validate that at least one criteria is selected
  if (Object.keys(criteria).length === 0) {
    showError('Please select at least one criteria before analyzing.');
    return;
  }
  
  showLoading();
  
  try {
    let data;
    try {
      // Try actual API first
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(criteria)
      });
      
      if (!response.ok) throw new Error('API response not ok');
      data = await response.json();
    } catch (apiError) {
      // Fallback to mock data if API fails (e.g. static file hosting)
      console.warn('API unavailable, using mock data:', apiError);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      data = {
        success: true,
        providerDetails: {
          name: "AWS (Amazon Web Services)",
          description: "The leading cloud provider with the most extensive set of services, ideal for your high-performance needs.",
          price: 65,
          efficiency: 85,
          speed: 95,
          reliability: 99.99
        },
        score: 92.5,
        reasoning: "Based on your requirements for high speed and reliability, AWS scores the highest despite the higher cost factor.",
        allScores: [
          { provider: "AWS", score: 92.5 },
          { provider: "Google Cloud", score: 88.4 },
          { provider: "Azure", score: 85.1 },
          { provider: "DigitalOcean", score: 72.0 }
        ]
      };
    }

    if (data.success) {
      showResults(data);
    } else {
      showError(data.error || 'Analysis failed.');
    }
  } catch (error) {
    console.error('Request error:', error);
    showError('An error occurred during analysis.');
  }
}

/**
 * Handle Chat Input
 */
function handleChatSubmit() {
  const text = chatInput.value.trim();
  if (!text) return;

  // 1. Add User Message
  addMessage(text, 'user');
  chatInput.value = '';
  chatInput.style.height = 'auto'; // Reset height

  // 2. Analyze Text for Keywords
  const foundCriteria = new Set();
  const lowerText = text.toLowerCase();

  CRITERIA_OPTIONS.forEach(opt => {
    if (opt.keywords.some(k => lowerText.includes(k))) {
      foundCriteria.add(opt.key);
    }
  });

  // Default if nothing found, or update selection
  let showAll = true;
  if (foundCriteria.size > 0) {
    selectedCriteria = foundCriteria;
    showAll = false;
  } else {
    // If vague, maybe keep defaults or add generic ones
    selectedCriteria = new Set(['price', 'reliability', 'speed']);
    showAll = true;
  }

  // 3. Render System Response with Widget
  setTimeout(() => {
    // Re-render the form components based on new selection
    renderCriteriaCheckboxes(showAll);
    renderSliders();
    
    // Prevent empty bubbles: Hide previous message if it held the widget
    if (criteriaWidget.parentNode && criteriaWidget.parentNode.classList.contains('message-content')) {
      const prevMsg = criteriaWidget.parentNode.parentNode;
      if (prevMsg) prevMsg.style.display = 'none';
    }

    // Move the widget into the chat
    criteriaWidget.classList.remove('hidden');
    
    // Create a container for the system message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message system';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Append the widget to this message
    contentDiv.appendChild(criteriaWidget);
    msgDiv.appendChild(contentDiv);
    chatMessages.appendChild(msgDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500); // Fake "thinking" delay
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;
  msgDiv.appendChild(contentDiv);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
  // Form submission (Analyze button inside widget)
  if (form) form.addEventListener('submit', handleSubmit);
  
  // Chat interactions
  sendBtn.addEventListener('click', handleChatSubmit);
  
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  });

  // Auto-resize textarea
  chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
  
  // Slider updates are handled in createSliderElement
  
  // Slide navigation
  prevSlideBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });
  
  nextSlideBtn.addEventListener('click', () => {
    // If on the form slide and results exist, go to results
    if (currentSlide === 0 && resultsAvailable) {
      goToSlide(1);
      return;
    }

    // Otherwise, if on results and there's a next slide (not used currently), advance
    if (currentSlide < slides.length - 1 && currentSlide === 1) {
      goToSlide(currentSlide + 1);
    }
  });
}

/**
 * Initialize the application
 */
function initialize() {
  // Initial render (hidden)
  // renderCriteriaCheckboxes();
  // renderSliders();
  initializeEventListeners();
  updateSlideButtons();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
