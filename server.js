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
// that's 2
app.post('/upload', upload.single('video'), async (req, res) => {
  const { title, repoUrl } = req.body;
  const filePath = req.file.path;

  // Parse GitHub repo owner and name
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return res.json({ success: false, error: "Invalid repo URL" });

  const [_, username, repoName] = match;
  const branch = 'main'; // or user input
  const uploadPath = `videos/${title.replace(/\s/g, "_") + path.extname(req.file.originalname)}`;

  try {
    await uploadToGitHub(filePath, uploadPath, username, repoName, branch);
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});
