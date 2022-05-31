This is **Plix** a clone project of [Plex](https://app.plex.tv/desktop/#!/) a desktop app created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![img](./public/plix-logo-w.png)

## Sort presentation

[video presentation](https://www.loom.com/share/94bf6a2376c646969b5225dd73a5f20a)


## Information

- Functional clone of [Plex Tv](https://www.plex.tv/) app, for learning purposes.
- This app can manage local media.
- It is intended to be used on Computers. No mobile or tablet!
- Uses only movie TMDB API at the moment.

## To Do!

- add media player :check:
- add Movies TMDB API :check:
- add Tv Series TMDB API
- add Music TMDB API
- add subtitles functionality :working:
- add header search functionality according to page
- set app image background according to media :check:
- add slide bar to resize media :check:
- add slide bar to change the opacity of bgImage :check:
- create firebase database per user (data are lost on refresh)

## Status

- in progress.

## Build with

- NEXT.js
- React.js
- Tailwind-css
- NextAuth
- Firebase
- React-Media
- Recoil

## Getting Started

clone the project:

```
git clone https://github.com/pountzas/Plix.git
```

install dependencies:

```
npm install
```

<p>add .env.local variables as such:
<p>GOOGLE_CLIENT_ID= **create and add from firebase
<p>GOOGLE_CLIENT_SECRET= **create and add from firebase
<p>NEXTAUTH_URL=http://localhost:3000
<p>TMDB_API_KEY= **create and add from TMDB
<p>NEXTAUTH_SECRET= **your password for this app

run the development server:

```
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<!-- ## Deploy on Vercel

My Next.js app is to deployed on [Vercel Platform](https://pountzas-portfolio.vercel.app/) -->
