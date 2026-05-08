# InfoAtlas — Project Page

Static project page for the ICML 2026 paper
**"A Foundation-style Model for Zero-Shot Statistical Dependency Measurement"**.

No build step. Open `index.html` in a browser to preview, or serve locally and publish via GitHub Pages.

## Local preview

From this directory:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `InfoAtlas-page`, or rename to `<your-username>.github.io` for a user site).
2. Push the **contents of this folder** to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial project page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main` / **Folder**: `/ (root)`
4. Save. GitHub will build and serve the site at `https://<your-username>.github.io/<repo>/` within ~30 seconds.

The empty `.nojekyll` file ensures GitHub Pages serves all files literally (no Jekyll processing).

## Things to fill in before publishing

Search `index.html` for the following placeholders and update them:

| Placeholder | Where | Replace with |
| --- | --- | --- |
| Author profile links | hero `<a href="#">…</a>` | personal websites |
| `static/pdfs/paper.pdf` | "Paper" button | drop the camera-ready PDF in `static/pdfs/` |
| arXiv `href="#"` | "arXiv" button | `https://arxiv.org/abs/<id>` |
| `https://github.com/your-org/InfoAtlas` | "Code" button | real code repository URL |
| BibTeX entry | `#bibtex` section | update once ICML 2026 proceedings entry is finalised |

## File layout

```
project_page/
├── index.html
├── .nojekyll
├── README.md
└── static/
    ├── css/{bulma.min.css, index.css}
    ├── js/index.js
    ├── images/{teaser.png, pipeline.png, bmi.png}
    └── pdfs/                # drop paper.pdf here
```

Bulma is vendored locally; Font Awesome and Academicons load from jsDelivr.

## License & attribution

Layout and structural CSS adapted from the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(MIT, originally derived from [Nerfies](https://nerfies.github.io/)). Please keep the
attribution in the footer.
