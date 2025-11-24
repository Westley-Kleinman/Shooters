# Shooters II Website

This is a static website for Shooters II, a nightclub in Durham, NC. It is built with HTML, CSS, and vanilla JavaScript.

## Project Structure

- `index.html`: Home page with hero section and carousel.
- `events.html`: List of upcoming events.
- `gallery.html`: Photo gallery with lightbox.
- `about.html`: Venue information and contact form.
- `assets/css/style.css`: Main stylesheet.
- `assets/js/script.js`: JavaScript for interactivity (carousel, mobile menu, lightbox, age verification).
- `assets/images/`: Directory for image assets.

## Deployment Instructions (GitHub Pages)

1.  **Push to GitHub**:
    -   Initialize a git repository if you haven't already: `git init`
    -   Add all files: `git add .`
    -   Commit changes: `git commit -m "Initial commit"`
    -   Create a new repository on GitHub.
    -   Link your local repository to the remote: `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
    -   Push to the main branch: `git push -u origin main`

2.  **Configure GitHub Pages**:
    -   Go to your repository on GitHub.
    -   Click on **Settings**.
    -   Scroll down to the **Pages** section (left sidebar).
    -   Under **Source**, select `Deploy from a branch`.
    -   Under **Branch**, select `main` and `/ (root)`.
    -   Click **Save**.

3.  **Verify Deployment**:
    -   Wait a few minutes for the site to build.
    -   Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

## Updating Content

-   **Events**: Edit `events.html` to add or remove event cards.
-   **Gallery**: Add new images to `assets/images/` and add new `<img>` tags inside `.gallery-item` divs in `gallery.html`.
-   **Images**: Replace the placeholder images in `assets/images/` with real photos. Ensure filenames match those in the HTML or update the HTML `src` attributes.

## Features

-   **Responsive Design**: Works on mobile, tablet, and desktop.
-   **Neon Aesthetic**: Custom CSS variables for easy color theming.
-   **Carousel**: Auto-playing image slider on the home page.
-   **Lightbox**: Click on gallery images to view them full size.
-   **Age Verification**: Simple modal that checks for age (stores preference in local storage).
