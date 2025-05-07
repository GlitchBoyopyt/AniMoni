const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'your-username';
const REPO_NAME = 'your-repo';
const BRANCH = 'main';
const TOKEN = 'your-github-personal-access-token';

const uploadFile = async (filePath, uploadPath) => {
  const fileContent = fs.readFileSync(filePath, { encoding: 'base64' });

  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${uploadPath}`;

  try {
    const response = await axios.put(
      url,
      {
        message: `Upload ${uploadPath}`,
        content: fileContent,
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `token ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Uploaded successfully:', response.data.content.download_url);
  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
  }
};

// Usage
uploadFile('./video.mp4', 'uploads/video.mp4');
