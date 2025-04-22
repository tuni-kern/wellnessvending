# Wellness Vending Solutions Website

A redesigned website for Wellness Vending Solutions using Next.js, Tailwind CSS, and modern UI/UX principles.

## Features

- Responsive design that works on all device sizes
- Modern, clean interface with the company's brand colors
- Interactive contact form that sends emails to the company
- Easy navigation with smooth scrolling to page sections
- Mobile-friendly layout with hamburger menu

## Technology Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd wellnessvending
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

Then, you can start the production server with:

```bash
npm run start
# or
yarn start
```

## Contact Form Configuration

The contact form is configured to send emails to tuni@wellnessvendingsolutions.com using SendGrid. To set up the email functionality:

1. Sign up for a free SendGrid account at https://sendgrid.com/
   
2. Create and verify a sender identity:
   - Go to Settings > Sender Authentication
   - Verify a Single Sender or set up Domain Authentication for your domain
   - Ideally, verify `website@wellnessvendingsolutions.com` or a similar address

3. Create an API key:
   - Go to Settings > API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the generated API key (you'll only see it once)

4. Update your `.env.local` file with:
   ```
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_FROM_EMAIL=website@wellnessvendingsolutions.com
   ```

5. Restart your server, and the contact form will now:
   - Send emails directly to tuni@wellnessvendingsolutions.com
   - Store a backup copy of all submissions in the contacts folder
   - Allow you to view all submissions in the admin panel at /admin (password: wellnessvending)

## Admin Panel

The website includes a secure admin panel to view all contact form submissions:

1. Access the admin panel at: `/admin`
2. Use the password: `wellnessvending` (you can change this in `src/app/admin/page.tsx`)
3. View all submissions, sorted by date (newest first)
4. Click on email addresses to reply directly to customers

## Customization

- Brand colors can be adjusted in the `tailwind.config.js` file
- To replace images, add them to the `public` directory
- Update content in the `src/app/page.tsx` file 