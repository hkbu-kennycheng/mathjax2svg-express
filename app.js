const express = require("express");
const app = express();

app.get("*", (req, res) => {
    require('mathjax').init({
      loader: {load: ['input/tex', 'output/svg']}
    }).then((MathJax) => {
      console.log(decodeURIComponent(req.path.substr(1)));
      const svg = MathJax.tex2svg(decodeURIComponent(req.path.substr(1)));
      res.set('Content-Type', 'image/svg+xml');
      res.status(200).send(MathJax.startup.adaptor.outerHTML(svg).replace('<mjx-container class="MathJax" jax="SVG">','').replace('</mjx-container>',''));
    }).catch((err) => res.sendStatus(500));
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});