# Golden Retriever Website

Website about Golden Retrievers featuring a responsive design, image gallery, and GDPR-compliant cookie consent.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Image gallery with hover effects
- GDPR-compliant cookie consent banner
- Google Analytics 4 integration with custom event tracking
- Privacy policy page

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Google Analytics 4

## Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/l3blonde/golden-retriever-website.git
   \`\`\`

2. Open the project in your preferred code editor

3. Replace the Google Analytics ID in `analytics.js` with your own:
   \`\`\`javascript
   // Replace G-XXXXXXXXXX with your actual GA4 ID
   script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
   gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
   \`\`\`

4. Test locally by opening `index.html` in your browser

## Deployment

This project is deployed using Vercel:
- Live site: https://school-retriever-project.vercel.app

## Google Analytics Events

The website tracks the following custom events:
- `gallery_image_click`: When a user clicks on a gallery image
- `gallery_image_view`: When a gallery image comes into view
- `navigation_click`: When a user clicks on a navigation link
- `external_link_click`: When a user clicks on an external link
- `scroll_depth`: When a user scrolls to certain depths of the page
- `time_on_page`: Time spent on the page at various intervals
- `page_exit`: When a user leaves the page

## Custom Dimensions

The following custom dimensions are used in Google Analytics:
- `image_index`: The position index of the clicked gallery image
- `image_alt`: The alt text of the clicked gallery image

## Project Structure

- `index.html` - Home page
- `contact.html` - Contact page
- `privacy-policy.html` - Privacy policy page
- `styles.css` - Main stylesheet
- `analytics.js` - Google Analytics implementation
- `images/` - Image directory containing gallery photos
- `favicon.ico` - Website favicon

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Acknowledgments

- Created as a student project at Thomas More University, Belgium
- Student ID: r1004473 Marianne Poliakov 
