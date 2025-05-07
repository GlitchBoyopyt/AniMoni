document.getElementById('themeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

async function loadVideos() {
  const repoUrl = document.getElementById('repoUrl').value;
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return alert("Invalid repo URL!");

  const [_, user, repo] = match;
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/videos`;

  const res = await fetch(apiUrl);
  const files = await res.json();

  const videoList = document.getElementById('videoList');
  videoList.innerHTML = "";

  if (Array.isArray(files)) {
    files.forEach(file => {
      if (file.name.endsWith(".mp4") || file.name.endsWith(".mkv")) {
        const videoUrl = `https://raw.githubusercontent.com/${user}/${repo}/main/videos/${file.name}`;
        const videoBlock = `
          <div class="video">
            <h3>${file.name}</h3>
            <video controls src="${videoUrl}"></video>
            <a href="${videoUrl}" download>⬇ Download</a>
          </div>
        `;
        videoList.innerHTML += videoBlock;
      }
    });
  } else {
    videoList.innerHTML = "<p>No videos found.</p>";
  }
}
