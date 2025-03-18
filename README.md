# Frontend Competency EMS

## Project Setup

Follow the steps below to set up and run the project:

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Android Studio](https://developer.android.com/studio) and set up an emulator

### Steps to Setup and Run

1. Clone the repository:
   ```sh
   git clone https://github.com/adityanashtech/eventxui.git
   ```
2. Navigate to the project directory:
   ```sh
   cd frontend-competency-ems
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Install `eas-cli` globally:
   ```sh
   npm install --global eas-cli
   ```
5. Get access to the Nastech EAS.
6. Login to EAS:
   ```sh
   eas login
   ```
7. Set up Android environment variables (for macOS/Linux users):
   ```sh
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH
   ```
8. Start the development server:
   ```sh
   npm run start
   ```
9. Once the server starts, press `a` to open the app in the emulator.

### Notes
- Ensure your Android emulator is running before launching the app.
- If you encounter issues, verify your `ANDROID_HOME` path and restart the terminal.