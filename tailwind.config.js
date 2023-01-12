/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true ,
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#b6c2b7","100":"#97b498","200":"#75a478","300":"#519657","400":"#338a3e","500":"#087f23","600":"#00701a","700":"#00600f","800":"#005005","900":"#003300"}
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
