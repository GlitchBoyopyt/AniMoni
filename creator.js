document.getElementById('themeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});

async function uploadVideo() {
  const file = document.getElementById('videoInput').files[0];
  const title = document.getElementById('title').value;
  const desc = document.getElementById('description').value;
  const adType = document.querySelector('input[name="adType"]:checked').value;

  if (!file || !title) return alert('Fill all fields');

  const formData = new FormData();
  formData.append('video', file);
  formData.append('title', title);
  formData.append('description', desc);
  formData.append('adType', adType);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const json = await res.json();
  if (json.success) {
    alert("🧃 Uploaded successfully!");
  } else {
    alert("🌀 Upload failed.");
  }
}
<!-- GitHub Repo Input -->
<div class="section">
  <h2>GitHub Repository</h2>
  <input type="text" id="repoUrl" placeholder="https://github.com/yourname/yourrepo" />
</div>
