// app.js or wherever you configure your Express.js app
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dofzdulgj',
  api_key: '976411492644911',
  api_secret: 'PphiifhrOwC40H3MzQRbz9D_08E'
});

module.exports = {cloudinary}