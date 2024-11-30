# QuoteShare - Social Quote Sharing Platform

A modern web application built with Next.js for sharing and discovering quotes with images.

## Demo

Live Demo: [https://quote-share.vercel.app](https://quote-share.vercel.app)

## Features

- 🔐 User authentication with OTP
- 📝 Create and share quotes
- 🖼️ Image upload with drag & drop
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form & Zod
- Axios
- React Icons
- React Hot Toast
- React Dropzone

## Prerequisites

Before you begin, ensure you have installed:

- Node.js 18.0 or higher
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/Mriganka5137/quote-share.git
cd quote-share
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a .env.local file in the root directory and add your environment variables

```env
NEXT_PUBLIC_API_URL=https://assignment.stage.crafto.app
NEXT_PUBLIC_UPLOAD_URL=https://crafto.app/crafto/v1.0/media/assignment/upload
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
├───
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities and config
│   └── types/              # TypeScript types
├── public/                  # Static assets
├── tailwind.config.js      # Tailwind configuration
└── next.config.js          # Next.js configuration
```

## API Endpoints

The application uses the following endpoints:

- **Authentication**
  - POST `/login` - User login with OTP
- **Quotes**
  - GET `/getQuotes` - Get paginated quotes
  - POST `/postQuote` - Create a new quote
- **Media**
  - POST `/media/assignment/upload` - Upload images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Your Name - [@Mriganka5137](https://github.com/Mriganka5137)

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com) for hosting
