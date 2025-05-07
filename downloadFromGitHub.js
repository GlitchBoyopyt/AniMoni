const downloadFromGitHub = async (rawFileUrl, fileName) => {
  try {
    const response = await fetch(rawFileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
    console.log('✅ Download started.');
  } catch (error) {
    console.error('❌ Download failed:', error);
  }
};

// Usage
downloadFromGitHub(
  'https://raw.githubusercontent.com/your-username/your-repo/main/uploads/video.mp4',
  'fan-dub.mp4'
);
