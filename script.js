/**
 * Systems Thinking Navigation Script
 * Handles step navigation, progress tracking, and user interactions
 */

// Navigation state
let currentStep = 1;
const totalSteps = 6;

// DOM elements
let stepMenuItems;
let stepContents;
let progressIndicator;
let prevBtn;
let nextBtn;

/**
 * Initialize the navigation system
 */
function initializeNavigation() {
    // Get DOM elements
    stepMenuItems = document.querySelectorAll('.step-menu-item');
    stepContents = document.querySelectorAll('.step-content');
    progressIndicator = document.querySelector('.current-step');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');

    // Set up event listeners
    setupEventListeners();
    
    // Initialize with first step
    showStep(1);
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Menu item click handlers
    stepMenuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showStep(index + 1);
        });
    });

    // Navigation button handlers
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Show a specific step
 * @param {number} stepNumber - The step number to display (1-6)
 */
function showStep(stepNumber) {
    // Validate step number
    if (stepNumber < 1 || stepNumber > totalSteps) {
        console.warn(`Invalid step number: ${stepNumber}`);
        return;
    }

    // Update current step
    currentStep = stepNumber;
    
    // Update menu active state
    updateMenuActiveState(stepNumber);
    
    // Update content visibility
    updateContentVisibility(stepNumber);
    
    // Update progress indicator
    updateProgressIndicator(stepNumber);
    
    // Update navigation buttons
    updateNavigationButtons(stepNumber);
    
    // Scroll to top of content
    scrollToTop();
}

/**
 * Update the active state of menu items
 * @param {number} stepNumber - The active step number
 */
function updateMenuActiveState(stepNumber) {
    stepMenuItems.forEach(item => item.classList.remove('active'));
    if (stepMenuItems[stepNumber - 1]) {
        stepMenuItems[stepNumber - 1].classList.add('active');
    }
}

/**
 * Update content visibility
 * @param {number} stepNumber - The step to show
 */
function updateContentVisibility(stepNumber) {
    stepContents.forEach(content => content.classList.remove('active'));
    const targetContent = document.getElementById(`step-${stepNumber}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

/**
 * Update the progress indicator
 * @param {number} stepNumber - The current step number
 */
function updateProgressIndicator(stepNumber) {
    if (progressIndicator) {
        progressIndicator.textContent = stepNumber;
    }
}

/**
 * Update navigation button visibility and state
 * @param {number} stepNumber - The current step number
 */
function updateNavigationButtons(stepNumber) {
    if (prevBtn) {
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'flex';
    }
    if (nextBtn) {
        nextBtn.style.display = stepNumber === totalSteps ? 'none' : 'flex';
    }
}

/**
 * Scroll content area to top
 */
function scrollToTop() {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.scrollTop = 0;
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardNavigation(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
            break;
        case 'ArrowRight':
            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
            break;
        case 'Home':
            showStep(1);
            break;
        case 'End':
            showStep(totalSteps);
            break;
        default:
            // Check for number keys (1-6)
            const numberKey = parseInt(event.key);
            if (numberKey >= 1 && numberKey <= totalSteps) {
                showStep(numberKey);
            }
            break;
    }
}

/**
 * Navigate to the next step
 */
function nextStep() {
    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

/**
 * Navigate to the previous step
 */
function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

/**
 * Get the current step number
 * @returns {number} The current step number
 */
function getCurrentStep() {
    return currentStep;
}

/**
 * Check if there is a next step available
 * @returns {boolean} True if next step is available
 */
function hasNextStep() {
    return currentStep < totalSteps;
}

/**
 * Check if there is a previous step available
 * @returns {boolean} True if previous step is available
 */
function hasPreviousStep() {
    return currentStep > 1;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeStep1Interactions();
});

/**
 * Check practice exercise answers
 */
function checkPracticeAnswers() {
    const feedback = document.getElementById('practice-feedback');
    if (feedback) {
        feedback.style.display = 'block';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Update assessment score based on checked items
 */
function updateAssessmentScore() {
    const checkedItems = document.querySelectorAll('.assessment-checklist input[type="checkbox"]:checked').length;
    const totalItems = document.querySelectorAll('.assessment-checklist input[type="checkbox"]').length;
    const scoreElement = document.getElementById('assessment-score');
    
    if (scoreElement && totalItems > 0) {
        const percentage = Math.round((checkedItems / totalItems) * 100);
        let message = '';
        
        if (percentage === 100) {
            message = `🎉 Perfect! ${percentage}% - You've mastered system definition!`;
        } else if (percentage >= 80) {
            message = `🌟 Great work! ${percentage}% - You're on the right track!`;
        } else if (percentage >= 60) {
            message = `👍 Good progress! ${percentage}% - Keep refining your approach!`;
        } else if (percentage >= 40) {
            message = `📝 Getting there! ${percentage}% - Review the key concepts above.`;
        } else {
            message = `🔄 ${percentage}% - Take time to go through the framework again.`;
        }
        
        scoreElement.textContent = message;
    }
}

/**
 * Initialize Step 1 interactive elements
 */
function initializeStep1Interactions() {
    // Assessment checklist handlers
    const assessmentCheckboxes = document.querySelectorAll('.assessment-checklist input[type="checkbox"]');
    assessmentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAssessmentScore);
    });
    
    // Practice exercise validation
    const practiceCheckboxes = document.querySelectorAll('.boundary-checklist input[type="checkbox"]');
    practiceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Visual feedback for correct/incorrect selections
            const parentLabel = checkbox.closest('.checklist-item');
            if (parentLabel) {
                if (checkbox.classList.contains('inside-item') && checkbox.checked) {
                    parentLabel.style.background = 'rgba(34, 197, 94, 0.2)';
                } else if (checkbox.classList.contains('outside-item') && checkbox.checked) {
                    parentLabel.style.background = 'rgba(239, 68, 68, 0.2)';
                } else {
                    parentLabel.style.background = '';
                }
            }
        });
    });
    
    // Element tooltips for boundary visual (simple implementation)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = e.target.getAttribute('data-tooltip');
            e.target.title = tooltip;
        });
    });
}

/**
 * Enhanced initialization that includes Step 1 interactions
 */
function initializeNavigationEnhanced() {
    // Call original initialization
    initializeNavigation();
    
    // Initialize Step 1 specific interactions
    initializeStep1Interactions();
}

// Export functions for potential external use
window.SystemsThinking = {
    showStep,
    nextStep,
    previousStep,
    getCurrentStep,
    hasNextStep,
    hasPreviousStep,
    checkPracticeAnswers,
    updateAssessmentScore
};

// Make functions globally available for onclick handlers
window.checkPracticeAnswers = checkPracticeAnswers;
window.updateAssessmentScore = updateAssessmentScore;
