# Next.js Authentication Project

## [LIVE Demo](https://socialxnext.vercel.app/)

🚀 ## Overview

This is a simple authentication project built using Next.js and NextAuth.js. Users can sign in using Google or Facebook. The UI is built with Tailwind CSS and uses Lucide icons.

📌 ## Features

* Google and Facebook authentication using NextAuth.js.
* Responsive design with Tailwind CSS.
* Server-side authentication handling.


🛠️ ## Installation & Setup to run Locally :

1️⃣ **Clone the Repository**

* git clone https://github.com/prakshh/Next.js.git
* cd Next.js/auth/auth5

2️⃣ **Install Dependencies**

* npm install

3️⃣ **Set Up Environment Variables**

Create a .env file in the project root (auth5) and add the following:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret

Replace the values with your actual API credentials from Google and Facebook Developer Console.

4️⃣ **Run the Development Server**

* npm run dev

**If you have followed the above steps, your project should be running on localhost (http://localhost:3000)**


✅ ## Notes

* Ensure that Google OAuth and Facebook OAuth are properly set up in their respective developer consoles.

* Use NEXTAUTH_SECRET for security in production.
* If you use Vercel for your hosting, you can generate a secret at https://generate-secret.vercel.app/32

* NEXTAUTH_URL can be set as http://localhost:3000 if you want to run locally.
* After deployment, NEXTAUTH_URL can be set as the URL of deployed site.

* If you face login issues, check the OAuth redirect URIs in Google/Facebook settings.

## Can I contribute?

Sure, open an issue, point out errors, and what not? Wanna fix something yourselves? You're welcome to open a PR.

## Contributor -

**Developer** - Prakash Das [Github](https://github.com/prakshh) 