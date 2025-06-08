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

/**
 * Check mapping exercise answers for Step 2
 */
function checkMappingAnswers() {
    const feedback = document.getElementById('mapping-feedback');
    if (feedback) {
        feedback.style.display = 'block';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Update mapping assessment score for Step 2
 */
function updateMappingAssessmentScore() {
    const checkedItems = document.querySelectorAll('.mapping-assessment input[type="checkbox"]:checked').length;
    const totalItems = document.querySelectorAll('.mapping-assessment input[type="checkbox"]').length;
    const scoreElement = document.getElementById('mapping-assessment-score');
    
    if (scoreElement && totalItems > 0) {
        const percentage = Math.round((checkedItems / totalItems) * 100);
        let message = '';
        
        if (percentage === 100) {
            message = `🎉 Perfect! ${percentage}% - You've mastered interconnection mapping!`;
        } else if (percentage >= 80) {
            message = `🌟 Great work! ${percentage}% - You're seeing the connections!`;
        } else if (percentage >= 60) {
            message = `👍 Good progress! ${percentage}% - Keep mapping those relationships!`;
        } else if (percentage >= 40) {
            message = `📝 Getting there! ${percentage}% - Review the mapping framework above.`;
        } else {
            message = `🔄 ${percentage}% - Take time to practice the 5-step mapping process.`;
        }
        
        scoreElement.textContent = message;
    }
}

/**
 * Initialize Step 2 interactive network visualization
 */
function initializeStep2Interactions() {
    // Network node interaction
    const networkNodes = document.querySelectorAll('.network-node');
    const connectionDetails = document.getElementById('connection-details');
    const connectionSvg = document.getElementById('connection-svg');
    
    // Network connection data with node positioning
    const nodePositions = {
        leadership: { x: 50, y: 50 }, // Center hub
        culture: { x: 25, y: 20 },     // Top left
        processes: { x: 75, y: 20 },   // Top right
        people: { x: 25, y: 80 },      // Bottom left
        results: { x: 90, y: 50 },     // Right
        customers: { x: 75, y: 80 }    // Bottom right
    };
    
    const connectionData = {
        leadership: {
            title: 'Leadership Connections',
            connections: [
                { target: 'culture', strength: 'strong', description: 'Leaders shape values and behaviors', icon: '➜' },
                { target: 'processes', strength: 'strong', description: 'Sets priorities and resource allocation', icon: '➜' },
                { target: 'people', strength: 'medium', description: 'Hiring, promotion, and development decisions', icon: '➜' },
                { target: 'results', strength: 'weak', description: 'Indirect through culture and processes', icon: '〰️' }
            ]
        },
        culture: {
            title: 'Culture Connections',
            connections: [
                { target: 'people', strength: 'strong', description: 'Culture attracts and shapes behavior', icon: '➜' },
                { target: 'processes', strength: 'medium', description: 'Influences how work gets done', icon: '➜' },
                { target: 'customers', strength: 'medium', description: 'Culture affects customer experience', icon: '➜' },
                { target: 'leadership', strength: 'medium', description: 'Culture can influence leadership decisions', icon: '↔️' }
            ]
        },
        processes: {
            title: 'Process Connections',
            connections: [
                { target: 'results', strength: 'strong', description: 'Processes directly drive outcomes', icon: '➜' },
                { target: 'people', strength: 'medium', description: 'Processes shape daily work experience', icon: '➜' },
                { target: 'customers', strength: 'strong', description: 'Processes create customer experience', icon: '➜' },
                { target: 'culture', strength: 'weak', description: 'Processes can reinforce cultural values', icon: '〰️' }
            ]
        },
        people: {
            title: 'People Connections',
            connections: [
                { target: 'results', strength: 'strong', description: 'People execute and deliver outcomes', icon: '➜' },
                { target: 'customers', strength: 'strong', description: 'People directly interact with customers', icon: '➜' },
                { target: 'culture', strength: 'medium', description: 'People both shape and reflect culture', icon: '↔️' },
                { target: 'processes', strength: 'medium', description: 'People can improve or work around processes', icon: '↔️' }
            ]
        },
        results: {
            title: 'Results Connections',
            connections: [
                { target: 'leadership', strength: 'medium', description: 'Results influence leadership decisions', icon: '➜' },
                { target: 'customers', strength: 'strong', description: 'Results affect customer satisfaction', icon: '➜' },
                { target: 'people', strength: 'weak', description: 'Results impact morale and motivation', icon: '〰️' },
                { target: 'processes', strength: 'weak', description: 'Results may trigger process changes', icon: '〰️' }
            ]
        },
        customers: {
            title: 'Customer Connections',
            connections: [
                { target: 'results', strength: 'strong', description: 'Customer satisfaction drives business results', icon: '➜' },
                { target: 'leadership', strength: 'weak', description: 'Customer feedback influences strategy', icon: '〰️' },
                { target: 'processes', strength: 'medium', description: 'Customer needs shape process design', icon: '➜' },
                { target: 'people', strength: 'medium', description: 'Customer interactions affect employee experience', icon: '↔️' }
            ]
        }
    };
    
    // Initialize SVG connections
    function initializeConnections() {
        if (!connectionSvg) return;
        
        // Create arrow markers for different connection strengths
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        const markers = ['strong', 'medium', 'weak'];
        markers.forEach(type => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', `arrow-${type}`);
            marker.setAttribute('viewBox', '0 0 10 10');
            marker.setAttribute('refX', '9');
            marker.setAttribute('refY', '3');
            marker.setAttribute('markerWidth', '6');
            marker.setAttribute('markerHeight', '6');
            marker.setAttribute('orient', 'auto');
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M0,0 L0,6 L9,3 z');
            path.classList.add('connection-arrow', type);
            
            marker.appendChild(path);
            defs.appendChild(marker);
        });
        
        connectionSvg.appendChild(defs);
        
        // Draw initial connections for leadership (hub)
        drawConnectionsForNode('leadership');
    }
    
    // Function to get node center position in SVG coordinates
    function getNodeCenter(nodeType) {
        const node = document.querySelector(`[data-node="${nodeType}"]`);
        if (!node) return { x: 0, y: 0 };
        
        const visual = document.querySelector('.network-visual');
        const rect = node.getBoundingClientRect();
        const visualRect = visual.getBoundingClientRect();
        
        return {
            x: rect.left + rect.width / 2 - visualRect.left,
            y: rect.top + rect.height / 2 - visualRect.top
        };
    }
    
    // Function to draw connections for a specific node
    function drawConnectionsForNode(nodeType) {
        if (!connectionSvg || !connectionData[nodeType]) return;
        
        // Clear existing connections
        const existingLines = connectionSvg.querySelectorAll('.connection-line');
        existingLines.forEach(line => line.remove());
        
        const sourcePos = getNodeCenter(nodeType);
        const connections = connectionData[nodeType].connections;
        
        connections.forEach((conn, index) => {
            const targetPos = getNodeCenter(conn.target);
            
            // Create connection line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sourcePos.x);
            line.setAttribute('y1', sourcePos.y);
            line.setAttribute('x2', targetPos.x);
            line.setAttribute('y2', targetPos.y);
            line.classList.add('connection-line', conn.strength);
            line.setAttribute('marker-end', `url(#arrow-${conn.strength})`);
            
            // Add animation delay
            line.style.animationDelay = `${index * 0.2}s`;
            
            connectionSvg.appendChild(line);
            
            // Animate line drawing
            setTimeout(() => {
                line.classList.add('highlighted');
                setTimeout(() => {
                    line.classList.remove('highlighted');
                }, 1000);
            }, index * 200);
        });
    }
    
    // Node click handlers
    networkNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove active class from all nodes
            networkNodes.forEach(n => n.classList.remove('active'));
            
            // Add active class to clicked node
            node.classList.add('active');
            
            // Get node data
            const nodeType = node.getAttribute('data-node');
            const data = connectionData[nodeType];
            
            if (data && connectionDetails) {
                // Update connection details
                const connectionsHTML = data.connections.map(conn => `
                    <div class="connection-item ${conn.strength}">
                        <span class="connection-icon">${conn.icon}</span>
                        <span><strong>${conn.target.charAt(0).toUpperCase() + conn.target.slice(1)}:</strong> ${conn.description}</span>
                    </div>
                `).join('');
                
                connectionDetails.innerHTML = `
                    <div class="connection-info">
                        <h4>${data.title}</h4>
                        <div class="connection-list">
                            ${connectionsHTML}
                        </div>
                    </div>
                `;
            }
            
            // Draw connections for selected node
            drawConnectionsForNode(nodeType);
        });
        
        // Add hover effects
        node.addEventListener('mouseenter', () => {
            if (!node.classList.contains('active')) {
                node.style.transform = 'scale(1.05)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (!node.classList.contains('active')) {
                node.style.transform = '';
            }
        });
    });
    
    // Initialize the network visualization
    setTimeout(() => {
        initializeConnections();
    }, 100); // Small delay to ensure DOM is ready
    
    // Handle window resize to redraw connections
    window.addEventListener('resize', () => {
        const activeNode = document.querySelector('.network-node.active');
        if (activeNode) {
            const nodeType = activeNode.getAttribute('data-node');
            drawConnectionsForNode(nodeType);
        }
    });
    
    // Mapping assessment checklist handlers
    const mappingAssessmentCheckboxes = document.querySelectorAll('.mapping-assessment input[type="checkbox"]');
    mappingAssessmentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateMappingAssessmentScore);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeStep1Interactions();
    initializeStep2Interactions();
});

// Make functions globally available for onclick handlers
window.checkPracticeAnswers = checkPracticeAnswers;
window.updateAssessmentScore = updateAssessmentScore;
window.checkMappingAnswers = checkMappingAnswers;
window.updateMappingAssessmentScore = updateMappingAssessmentScore;
