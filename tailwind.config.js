/** @type {import('tailwindcss').Config} */

module.exports = {
  // content: ['./*.html'],
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        onest: ['Onest Variable'],
      },
      colors: {
        firstColor: '#f15a5c',
        secondColor: '#dddde0',
        thirdColor: '#ececee',
        fourthColor: '#f15a5c',
        back: '#fff',
        hoverColor: '#a8a9b2',
        aprobadaColor: '#092a13',
        aprobadaColorFondo: '#57d176',
        cursandoColor: '#1D24CA',
        cursandoColorFondo: '#008eda5f',
        recursarColor: '#E8751A',
        recursarColorFondo: '#e6cf7b80',
        regularColor: '#401F71',
        regularColorFondo: '#7d27ff81',
      },
    },
  },
  plugins: [],
}
