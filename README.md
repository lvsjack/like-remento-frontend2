&nbsp;

<p align="center">
  <a href="https://horizon-ui.com/boilerplate-shadcn" target="_blank">
    <img src="https://i.ibb.co/DGSsjWL/top-boilerplate-shadcn-readme.png" alt="Horizon AI Boilerplate Admin Dashboard NextJS Shadcn UI" width="300px" max-width="400px">
  </a>
</p>

<p align="center">
    <a style="color: #09090B; text-decoration: underline;" target="_blank" href="https://horizon-ui.com/boilerplate-shadcn">Website</a> •
    <a style="color: #09090B; text-decoration: underline;" target="_blank" href="https://horizon-ui.com/docs-boilerplate/shadcn-components/auth-UI">Documentation</a> •
    <a style="color: #09090B; text-decoration: underline;" target="_blank" href="https://horizon-ui.com/boilerplate-shadcn">PRO Version</a> •
    <a style="color: #09090B; text-decoration: underline;" target="_blank" href="https://github.com/horizon-ui/shadcn-nextjs-boilerplate">Free Template</a> •
    <a style="color: #09090B; text-decoration: underline;" target="_blank" href="https://twitter.com/horizon_ui">Twitter</a>
<p align="center" style="max-width: 500px; margin: auto;">
  Launch your SaaS startup within a few days with the first Admin Dashboard Shadcn UI NextJS boilerplate. Get started with Horizon AI Boilerplate today!

</p>

&nbsp;

<p align="center" style="width: 100%;">
<a style="display:flex; justify-content: center; width: 100%;" href="https://horizon-ui.com/boilerplate-shadcn" target="_blank"><img style="border-radius: 10px; width: 100%;" src="https://i.ibb.co/72bXVwG/horizon-free-boilerplate-shadcn-image-readme-2.png" alt="Horizon AI Boilerplate NextJS Shadcn UI" /></a>
</p>

&nbsp;

### Introduction

Horizon AI Boilerplate is the first open-source Admin Dashboard OpenAI ChatGPT AI Template made for Shadcn UI, NextJS, and Tailwind CSS! Start creating outstanding Chat AI SaaS Apps faster.

It comes with over 30+ dark/light frontend individual elements, like buttons, inputs, navbars, nav tabs, cards, or alerts, giving you the freedom of choosing and combining.

### Documentation

Each element is well presented in a very complex documentation. You can read more about the <a href="https://horizon-ui.com/docs-boilerplate/shadcn-components/chat" target="_blank">documentation here.</a>

### Quick Start

Install Horizon ChatGPT AI Template by running either of the following:

- Install NodeJS LTS from [NodeJs Official Page](https://nodejs.org/en/?ref=horizon-documentation) (NOTE: Product only works with LTS version)

<br />

Clone the repository with the following command:

```bash
git clone https://github.com/horizon-ui/shadcn-nextjs-boilerplate.git
```

Run in the terminal this command:

```
npm install
```

<br />

```
npm run init
```

<br />

Then run this command to start your local server:

```
npm run dev
```

### Supabase Authentication Setup

#### 1. Environment Configuration

First, set up your Supabase environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 2. Local Development Setup

a) Start local Supabase services:

```bash
supabase start
```

b) The local services will be available at:

- Studio: http://localhost:54323
- API: http://localhost:54321
- DB: http://localhost:54322
- Email testing: http://localhost:54324

#### 3. Authentication Methods

The boilerplate supports multiple authentication methods:

##### Email/Password Login

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email: 'your@email.com',
  password: 'your-password'
});
```

##### Magic Link Login

```typescript
const { error } = await supabase.auth.signInWithOtp({
  email: 'your@email.com'
});
```

##### OAuth Login (e.g., Google)

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback'
  }
});
```

#### 4. Development Notes

- Email notifications in development are captured by the local email testing server (http://localhost:54324)
- OAuth providers need to be configured in your Supabase Dashboard
- Default auth endpoints:
  - Sign In: `/dashboard/signin`
  - Sign Up: `/dashboard/signin/signup`
  - Password Reset: `/dashboard/signin/forgot_password`
  - Callback: `/auth/callback`

#### 5. Debugging Tips

- Check browser console for auth-related errors
- Verify network requests in browser dev tools
- Ensure redirect URLs are properly configured
- Monitor auth logs in Supabase Dashboard

For more detailed information about Supabase authentication, visit the [Supabase Auth Documentation](https://supabase.com/docs/guides/auth).

### Example Sections

If you want to get inspiration for your startup project or just show something directly to your clients, you can jump-start your development with our pre-built example sections. You will be able to quickly set up the basic structure for your web project.

View <a href="https://horizon-ui.com/boilerplate-shadcn#pages" target="_blank">example sections here</a>

---

# PRO Version

Unlock a huge amount of components and pages with our PRO version - <a href="https://horizon-ui.com/boilerplate-shadcn#pricing" target="_blank">Learn more</a>

<p align="center" style="width: 100%;">
<a style="display:flex; justify-content: center; width: 100%;" href="https://horizon-ui.com/boilerplate-shadcn#pricing" target="_blank"><img style="border-radius: 10px; width: 100%;" src="https://i.ibb.co/Q8jNqWJ/horizon-boilerplate-shadcn-image-readme-2.png" alt="Horizon AI Boilerplate NextJS Shadcn UI" /></a>
</p>

---

# Reporting Issues

We use GitHub Issues as the official bug tracker for the Horizon UI. Here are
some advice for our users who want to report an issue:

1. Make sure that you are using the latest version of the Horizon UI Boilerplate. Check the CHANGELOG for your dashboard on our [CHANGE LOG File](https://github.com/horizon-ui/shadcn-nextjs-boilerplate/blob/main/CHANGELOG.md).
   <br />

1. Providing us with reproducible steps for the issue will shorten the time it takes for it to be fixed.
   <br />

1. Some issues may be browser-specific, so specifying in what browser you encountered the issue might help.

---

# Community

Connect with the community! Feel free to ask questions, report issues, and meet new people who already use Horizon UI!

💬 [Join the #HorizonUI Discord Community!](https://discord.gg/f6tEKFBd4m)

### Copyright and license

⭐️ [Copyright 2024 Horizon UI](https://www.horizon-ui.com/?ref=readme-horizon)

📄 [Horizon UI License](https://horizon-ui.notion.site/End-User-License-Agreement-8fb09441ea8c4c08b60c37996195a6d5)

---

# Credits

Special thanks to the open-source resources that helped us create this awesome boilerplate package, including:

- [Shadcn UI Library](https://ui.shadcn.com/)
- [NextJS Subscription Payments](https://github.com/vercel/nextjs-subscription-payments)
- [ChatBot UI by mckaywrigley](https://github.com/mckaywrigley/chatbot-ui)
