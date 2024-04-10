class NameSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'NameSelect' });
        this.playerName = '';
        this.inputText = '';
        this.inputElement = null;
    }

    preload() {}

    create() {
        window.removeEventListener('orientationchange', this.handleResizeOnReorientation);

            const vw = window.innerWidth;
            const xMid = vw * .5;
            const vh = window.innerHeight;

        const background = this.add.image(xMid, vh * .8, 'background').setOrigin(0.5);

        const backdrop = this.add.graphics();
        backdrop.fillStyle(0xE6E6FA, .7);
        backdrop.lineStyle(4, 0x000000, 1);
        backdrop.fillRect(vw * .15, vh * .05, vw * .7, vh * .85);

        // Create an input element
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.placeholder = 'Enter your name';
        this.inputElement.style = 'position: absolute; top: 10vh; left: 50vw; width: 50%; height: 10%; transform: translateX(-50%); font-size: 24px; border: 1px solid black; background: cerulean; color: black;';
        this.inputElement.readOnly = true; // Prevent native keyboard from appearing

        // Append the input element to the document body
        document.body.appendChild(this.inputElement);

        // Create virtual keyboard
        this.createVirtualKeyboard();

        // Handle input change event
        this.inputElement.addEventListener('input', () => this.handleInputChange());

  const continueButton = this.add.text(xMid, vh * .3, 'Continue', {
        fontSize: '36px',
        fontFamily: 'knewave',
        fill: '#c92b23',
        padding: { x: 20, y: 20 },
    })
    .setOrigin(0.5)
    .setInteractive();

    // Initially hide the continue button
    continueButton.visible = false;
        

  // Set a callback function for the button click event
    continueButton.on('pointerdown', function () {
        // Check if both character and name are selected
        if (this.inputText.trim() !== '') {
            // Transition to the main scene when the conditions are met
            this.scene.start('CharSelect');
            this.inputElement.style.display = 'none';
            document.querySelectorAll('.keyboard-button').forEach(button => {
                button.style.display = 'none';
            });
            gameManager.playerName = this.inputText.trim();
        } else {
            // Display alert for incomplete conditions
            alert('Please enter a valid name.');
        }
    }, this);

    // Handle input change event
    this.inputElement.addEventListener('input', () => {
        // Toggle visibility of the continue button based on input content
        continueButton.visible = this.inputText.trim() !== '';
        this.handleInputChange();
    });

    }

createVirtualKeyboard() {
    // Create virtual keyboard buttons
    // Example: Create a button for each letter
    // ID of individual buttons for individual styling follows convention of:
    //letter "A" button will have the ID keyboard-button-a, the letter "B" button will have the ID keyboard-button-b, and so on.
    //The space button will have the ID keyboard-button-space, and the backspace button will have the ID keyboard-button-backspace.
    //The classes for the overall keyboard are 
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keyboardContainer = document.createElement('div');
    keyboardContainer.style = 'position: absolute; bottom: 5vh; left: 50vw; width: 50%; height: 50%; transform: translateX(-50%);';
    document.body.appendChild(keyboardContainer);

    for (let letter of letters) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.id = `keyboard-button-${letter.toLowerCase()}`;
        button.classList.add('keyboard-button'); // Add class for styling
        button.style = 'font-size: 24px; padding: 10px;';
        button.addEventListener('touchstart', () => this.updateInputText(letter));
        button.addEventListener('click', () => this.updateInputText(letter));
        keyboardContainer.appendChild(button);
    }

    // Create space button
    const spaceButton = document.createElement('button');
    spaceButton.textContent = 'Space';
    spaceButton.id = 'keyboard-button-space';
    spaceButton.classList.add('keyboard-button'); // Add class for styling
    spaceButton.style = 'font-size: 24px; padding: 10px;';
    spaceButton.addEventListener('touchstart', () => this.updateInputText(' '));
     spaceButton.addEventListener('click', () => this.updateInputText(' '));
    keyboardContainer.appendChild(spaceButton);

    // Create backspace button
    const backspaceButton = document.createElement('button');
    backspaceButton.textContent = '\u2190';
    backspaceButton.id = 'keyboard-button-backspace';
    backspaceButton.classList.add('keyboard-button'); // Add class for styling
    backspaceButton.style = 'font-size: 24px; padding: 10px;';
    backspaceButton.addEventListener('touchstart', () => this.handleBackspace());
     backspaceButton.addEventListener('click', () => this.handleBackspace());
    keyboardContainer.appendChild(backspaceButton);
}


    
handleBackspace() {
    this.inputText = this.inputText.slice(0, -1);
    this.inputElement.value = this.inputText;
    this.inputElement.dispatchEvent(new Event('input'));
}

    updateInputText(letter) {
        this.inputText += letter;
        this.inputElement.value = this.inputText;
        this.inputElement.dispatchEvent(new Event('input'));
    }

    handleInputChange() {
        // Update the Phaser Text object with the input value
        this.inputText = this.inputElement.value;
        console.log(`Input Text: ${this.inputText}`);
    }
}

window.NameSelect = NameSelect;
