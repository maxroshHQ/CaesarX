***Caesar***


Caesar is a minimal, single-page web app for encrypting and decrypting text using the Caesar cipher. Built with pure HTML, CSS, and JavaScript.

🚀 Features
✨ Encrypt & Decrypt modes via a single toggle

🔢 Variable Shift (positive/negative) with correct modulo 26 wrapping

🅰️ Case Preservation (e.g., HeLlO → KhOoR)

#️⃣ Character Passthrough (non-letters like !, 1, are ignored)

⚡ Live Update as you type (can be toggled off)

📋 One-click Copy to Clipboard with visual feedback

⌨️ Fully accessible (keyboard-navigable and screen-reader friendly)

🚫 No backend or dependencies

🛠 Tech Stack
HTML5 (semantic, with ARIA attributes)

CSS3 (custom properties, animations, flexbox/grid)

JavaScript (Vanilla ES6+) (core logic, DOM manipulation)

📂 Project Structure

```bash

$> tree -L 3
caesar/
├─ index.html       # The main web app page
├─ style.css        # All styles (hacker theme, layout)
├─ script.js        # Core cipher logic & UI controls
├─ /assets
│  ├─ github.png    # Header icon
│  ├─ help.png      # Header icon
│  └─ logo.png      # Repo/favicon logo
├─ README.md        # Project documentation
├─ LICENSE          # MIT License
```
🎯 Usage
Clone the repo:

```bash

git clone https://github.com/YOUR_USERNAME/caesar.git
cd caesar
Open index.html in your browser (no server needed).
```

Enter text, set the shift, and toggle the mode.

🧑‍💻 Author
Built with love by **V0!D**

[![GitHub](https://img.shields.io/badge/GitHub-maxroshHQ-50207A?style=flat&logo=github)](https://github.com/maxroshHQ)

📜 License
This project is released under the MIT License — free to remix, improve, and share.
