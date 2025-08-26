# Guardian Mobile A.I.

This is a Next.js application built with Firebase, designed as a "J.A.R.V.I.S."-style interface for vehicle monitoring and security.

## Getting Started

To run this application locally on your computer, you'll need to have [Node.js](https://nodejs.org/) installed.

1.  **Download the Code**: Download the source code from this environment.
2.  **Install Dependencies**: Open a terminal or command prompt in the project's root directory and run the following command to install the necessary packages:
    ```bash
    npm install
    ```
3.  **Run the Development Server**: Once the installation is complete, run this command:
    ```bash
    npm run dev
    ```
4.  **View the App**: Open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see your application in action.

## How This Project Handles Large Files

This project uses **Git LFS (Large File Storage)** to manage files larger than GitHub's 100 MB limit.

- **What is Git LFS?** It's a Git extension that replaces large files with small text pointers in your main repository, while storing the actual file content on a separate storage server.
- **How it Works Here:** When you `git push`, the small pointers are uploaded to GitHub, and the actual large files are uploaded to Firebase Storage. This process is handled automatically by the pre-push hook that is configured in this repository. You do not need to do anything extra.
- **What You Need to Do:** Simply `git add`, `git commit`, and `git push` as you normally would. Git LFS works in the background to handle the large files correctly. You do not need to worry about manually uploading folders.

## Publishing to GitHub

To share your code or collaborate with others, you can publish it to GitHub.

1.  **Create a GitHub Account**: If you don't already have one, sign up at [github.com](https://github.com).
2.  **Create a New Repository**: Go to [github.com/new](https://github.com/new) to create a new, empty repository. Do not initialize it with a README or .gitignore file, as your project already has these.
3.  **Initialize Git**: In your project's root directory, run the following commands. Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPOSITORY_NAME>` with your actual details.

    ```bash
    # Initialize a new Git repository
    git init

    # Add all files to be tracked
    git add .

    # Make your first commit
    git commit -m "Initial commit of Guardian Mobile A.I. project"

    # Set the main branch name (optional, but good practice)
    git branch -M main

    # Add your new GitHub repository as the remote origin
    git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

    # Push your code to GitHub
    git push -u origin main
    ```

## Deployment with Firebase App Hosting

Your application is set up for **Firebase App Hosting**, which will automatically build and deploy your app when you push changes to GitHub.

1.  **Navigate to Firebase Console**: Open the [Firebase Console](https://console.firebase.google.com/) and select your project (`guardian-mobile-d1jiu`).
2.  **Go to App Hosting**: In the "Build" section of the left-hand menu, click **App Hosting**.
3.  **Connect to GitHub**: Follow the guided workflow to connect your newly created GitHub repository. You will be asked to authorize Firebase to access your repository.
4.  **Deploy**: Once connected, Firebase will automatically initiate the first deployment. Every subsequent `git push` to your `main` branch will trigger a new build and deployment. You will be given a live URL where you can access your deployed application.
