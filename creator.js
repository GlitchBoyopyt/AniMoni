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
async function uploadVideo() {
  const file = document.getElementById('videoInput').files[0];
  const title = document.getElementById('title').value;
  const desc = document.getElementById('description').value;
  const repoUrl = document.getElementById('repoUrl').value;
  const adType = document.querySelector('input[name="adType"]:checked').value;

  if (!file || !title || !repoUrl) return alert('Fill all fields');

  const formData = new FormData();
  formData.append('video', file);
  formData.append('title', title);
  formData.append('description', desc);
  formData.append('adType', adType);
  formData.append('repoUrl', repoUrl);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const json = await res.json();
  alert(json.success ? "🎉 Uploaded!" : "❌ Failed!");
  }
const durationInput = document.getElementById('duration');
const earningPreview = document.getElementById('earningPreview');

durationInput.addEventListener('input', () => {
  const duration = parseInt(durationInput.value);
  const baseAmount = 100; // Assume Rs.100 fixed revenue per video (for demo)

  let cut = 0;
  if (duration <= 30) cut = 0.05;
  else if (duration <= 60) cut = 0.09;
  else cut = 0.15;

  const creatorEarning = Math.round(baseAmount * (1 - cut));
  earningPreview.textContent = `💰 Creator earns: ₹${creatorEarning} (Platform cut: ₹${Math.round(baseAmount * cut)})`;
});
