/* ---
   Project: Caesar
   File: script.js
   --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DOM Element Selection ---
    const shiftInput = document.getElementById('shift-input');
    const btnShiftMinus = document.getElementById('btn-shift-minus');
    const btnShiftPlus = document.getElementById('btn-shift-plus');
    const modeToggle = document.getElementById('mode-toggle');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const metadataDisplay = document.getElementById('metadata-display');
    const liveUpdateToggle = document.getElementById('live-update-toggle');
    const copyBtn = document.getElementById('btn-copy');
    const copyToast = document.getElementById('copy-toast');
    const ariaLiveRegion = document.querySelector('.aria-live-region');

    
    // --- 2. Core Cipher Logic ---
    
    /**
     * Performs a Caesar cipher shift on a single character.
     * @param {string} char - The character to shift.
     * @param {number} shift - The amount to shift (can be negative).
     * @returns {string} The shifted character.
     */
    function shiftChar(char, shift) {
        const code = char.charCodeAt(0);

        // Uppercase letters (A-Z: 65-90)
        if (code >= 65 && code <= 90) {
            // 1. Normalize to 0-25: (code - 65)
            // 2. Apply shift:         (... + shift)
            // 3. Handle wrap-around:  (... % 26)
            // 4. Handle negative %:   ((... % 26) + 26) % 26
            // 5. Convert back to ASCII: (... + 65)
            return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
        }
        
        // Lowercase letters (a-z: 97-122)
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
        }

        //

        // Not a letter, return as-is
        return char;
    }

    /**
     * Applies the Caesar cipher to a full string.
     * @param {string} text - The input text.
     * @param {number} shift - The shift value.
     * @returns {string} The processed text.
     */
    function caesarCipher(text, shift) {
        // Normalize the shift to be within the 0-25 range
        const normalizedShift = ((shift % 26) + 26) % 26;
        
        if (normalizedShift === 0) return text;
        
        return text
            .split('')
            .map(char => shiftChar(char, normalizedShift))
            .join('');
    }

    
    // --- 3. Main Update Function ---

    /**
     * Reads all inputs, processes the text, and updates the UI.
     */
    function updateApp() {
        // Get values from UI
        const text = inputText.value;
        const shift = parseInt(shiftInput.value || 0);
        const isDecryptMode = modeToggle.checked;
        
        // Determine the final shift
        // If decrypting, we shift backwards
        const finalShift = isDecryptMode ? -shift : shift;
        
        // Process the text
        const processedText = caesarCipher(text, finalShift);
        
        // Update the output
        outputText.value = processedText;
        
        // Update metadata
        const mode = isDecryptMode ? 'Decrypt' : 'Encrypt';
        const displayShift = ((shift % 26) + 26) % 26; // Show positive modulo
        metadataDisplay.textContent = `Shift = ${displayShift} · Mode = ${mode} · Letters only (A–Z) · Case preserved`;
    }

    
    // --- 4. Event Listeners ---

    // Update on input/shift changes (if "Live Update" is on)
    function handleLiveUpdate() {
        if (liveUpdateToggle.checked) {
            updateApp();
        }
    }
    
    inputText.addEventListener('input', handleLiveUpdate);
    shiftInput.addEventListener('input', handleLiveUpdate);
    modeToggle.addEventListener('change', handleLiveUpdate);

    // Shift buttons always trigger an update
    btnShiftMinus.addEventListener('click', () => {
        shiftInput.value = parseInt(shiftInput.value || 0) - 1;
        updateApp();
    });

    btnShiftPlus.addEventListener('click', () => {
        shiftInput.value = parseInt(shiftInput.value || 0) + 1;
        updateApp();
    });

    // Handle "Live Update" toggle itself
    // If user just turned it ON, run an update
    liveUpdateToggle.addEventListener('change', () => {
        if (liveUpdateToggle.checked) {
            updateApp();
        }
    });

    // Copy to Clipboard
    let toastTimer;
    copyBtn.addEventListener('click', () => {
        if (!outputText.value) return; // Don't copy empty text

        navigator.clipboard.writeText(outputText.value)
            .then(() => {
                // Show toast
                copyToast.classList.add('show');
                
                // Announce to screen readers
                ariaLiveRegion.textContent = 'Copied to clipboard!';

                // Hide toast after a delay
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => {
                    copyToast.classList.remove('show');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                ariaLiveRegion.textContent = 'Failed to copy text.';
            });
    });

    
    // --- 5. Initialization ---
    // Run once on load to populate default example
    inputText.value = 'HELLO';
    updateApp();
});