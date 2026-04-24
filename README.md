# Portfolio — React + Headless WordPress (GraphQL)

A personal portfolio website built with **React** and a **Headless WordPress** backend, consuming content via **GraphQL**.

## Live API Endpoint

- Base URL: `https://api.othmanewp.com/`
- GraphQL endpoint (typical WPGraphQL path): `https://api.othmanewp.com/graphql`

> If your GraphQL path is different (e.g. `/index.php?graphql`), update the environment variable accordingly.

## Tech Stack

- **Frontend:** React
- **Backend (CMS):** WordPress (Headless)
- **Data layer:** GraphQL (commonly provided by the WPGraphQL plugin)
- **Styling:** CSS

## How It Works

1. Content is managed in WordPress (pages, projects/posts, media, etc.).
2. WordPress exposes that content through GraphQL.
3. The React app queries GraphQL and renders the portfolio.

## Getting Started (Local)

### 1) Clone & install

```bash
git clone https://github.com/ibndahouothmane/portfolio.git
cd portfolio
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
REACT_APP_WORDPRESS_GRAPHQL_ENDPOINT=https://api.othmanewp.com/graphql
```

### 3) Run the dev server

```bash
npm start
```

Open: `http://localhost:3000`

## Build

```bash
npm run build
```

This outputs a production build (commonly in `build/`).

## Example GraphQL Query

```graphql
query GetHomeAndProjects {
  pages(where: { title: "Home" }) {
    nodes {
      title
      content
    }
  }
  posts(first: 10) {
    nodes {
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
```

## Deployment

You can deploy the frontend as a static site (Netlify, Vercel, GitHub Pages, etc.).  
Ensure the WordPress GraphQL endpoint remains reachable:

- `https://api.othmanewp.com/graphql`

## License

Add your preferred license (MIT, etc.) or keep it private / “All rights reserved”.

---

**Author:** [ibndahouothmane](https://github.com/ibndahouothmane)
