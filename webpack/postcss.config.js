const autoPrefixer = require('autoprefixer')
module.exports = {
  plugins: [
    autoPrefixer({
      remove: false,
      browsers: ['last 5 versions'],
    }),
  ],
}
