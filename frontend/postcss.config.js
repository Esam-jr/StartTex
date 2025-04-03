import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";

export default {
  plugins: [postcssNesting(), tailwindcss(), autoprefixer()],
};
