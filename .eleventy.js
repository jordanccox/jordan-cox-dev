const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const postcssFilter = (cssCode, done) => {
  postCss([
    tailwind(require("./tailwind.config")),
    autoprefixer(),
    cssnano({ preset: "default" }),
  ])
    .process(cssCode, {
      from: "./src/_includes/styles/tailwind.css",
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    );
};

module.exports = function (config) {
  config.addWatchTarget("./src/_includes/styles/tailwind.css");
  config.addNunjucksAsyncFilter("postcss", postcssFilter);
  config.addPassthroughCopy("./media");
  config.addPassthroughCopy("./src/bundle.js");
  config.addPassthroughCopy("./src/fslightbox.js");
  config.addPlugin(eleventyNavigationPlugin);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    }
  };
};