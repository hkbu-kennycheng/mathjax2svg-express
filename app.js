const express = require("express");
const app = express();

app.get("*", (req, res) => {
    require('mathjax').init({
      loader: {load: ['input/tex', 'output/svg']}
    }).then((MathJax) => {
      const tex = decodeURIComponent(req.path.substr(1)) || 'x^2';
      const svg = MathJax.tex2svg(tex);
      res.set('Content-Type', 'image/svg+xml');
      res.status(200).send(MathJax.startup.adaptor.outerHTML(svg).replace('<mjx-container class="MathJax" jax="SVG" display="true">','').replace('</mjx-container>',''));
    }).catch((err) => res.sendStatus(500));
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});