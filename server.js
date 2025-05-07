const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadToGitHub = require('./backend/uploadToGitHub');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('frontend'));

app.post('/upload', upload.single('video'), async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.body.title.replace(/\s/g, '_') + path.extname(req.file.originalname);
  try {
    await uploadToGitHub(filePath, `videos/${fileName}`);
    fs.unlinkSync(filePath); // cleanup
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log('AniMoni Creator Dashboard running on http://localhost:3000'));
