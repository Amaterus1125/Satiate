# Satiate

## Overview
**Satiate: Impulse Lockdown** is an SDG 3 (Good Health and Well-being) behavioral intervention tool. Designed as a Chrome extension, this repository contains the core codebase required to build, run, and extend the application to curb compulsive digital habits and foster mental clarity through real-time behavioral friction.

---

## Key Features
- **Active Lockdown Shield:** Monitors web activity to intercept pre-defined impulsive triggers immediately.
- **Customizable Friction Levels:** Users can configure how intense the behavioral intervention needs to be through a dedicated settings panel.
- **Seamless Browser Integration:** Runs silently in the background as a lightweight companion, stepping in only when digital well-being is at risk.

---

## Tech Stack
- **Language(s):** JavaScript, HTML, CSS
- **Framework(s):** Vanilla JS (Chrome Extension API)
- **Backend:** N/A (Client-side execution)
- **Frontend:** HTML/CSS (Options interface)
- **Database:** Chrome Local Storage (`chrome.storage`)
- **Infrastructure / Deployment:** Google Chrome (Developer Mode / Web Store)
- **Testing framework(s):** Manual browser testing

---

## Project Architecture
The repository follows a standard Chrome Extension Manifest V3 architecture, separating background permissions, content scripts, and user configurations. 

- **Entry points / Application bootstrap**
  - `manifest.json` (The Core: Manifest V3 architecture securely requesting declarative permissions)
- **Core domain / business logic**
  - `content.js` (The Gatekeeper: Programmatically injects behavioral scripts directly into target pages to catch impulses)
- **Configuration & User Interface**
  - `options.html` (The Control Center: A user-friendly dashboard allowing individuals to personalize blocklists and timers)

---

## Installation

### Prerequisites
- Install **Google Chrome** (or any modern Chromium-based browser like Brave or Edge)
- Ensure you have **Git** installed to clone the repository

### Setup Steps
```bash
# 1) Clone the repository
git clone [https://github.com/Amaterus1125/Satiate.git](https://github.com/Amaterus1125/Satiate.git)
cd Satiate

# 2) Open Chrome Extensions Manager
# Navigate to chrome://extensions/ in your browser address bar

# 3) Enable Developer Mode
# Toggle the "Developer mode" switch in the top right corner

# 4) Load the Extension
# Click "Load unpacked" and select the cloned "Satiate" folder

```
## Usage
### Running the Extension
Once loaded into Chrome as an unpacked extension, Satiate will automatically activate based on your manifest.json rules.
 * **Configure Settings:** Click the Satiate extension icon in your browser toolbar and open the options page to set your trigger sites and friction preferences.
 * **Trigger Interception:** Navigate to any of the domains you configured as "impulses." content.js will automatically deploy the behavioral friction protocols.
### Common Commands
 * **Refresh Extension:** If you edit content.js or manifest.json, return to chrome://extensions/ and click the refresh icon on the Satiate card.
 * **Inspect UI:** Right-click inside options.html and select "Inspect" to debug the frontend styling and storage logic.
## Contributing
To contribute to Satiate, please branch off of main and submit a Pull Request. Ensure that any new permissions added to manifest.json strictly align with user privacy and minimal-access principles.
## License
Please refer to the repository settings for specific licensing details regarding distribution and modification of this codebase.
*This README was generated with PresentMe. View the full presentation here -- https://www.presentmeapp.xyz/p/e5b21e13-ca6b-4868-b420-ac6cb06fe112.*

### MIT - do anything you like.
