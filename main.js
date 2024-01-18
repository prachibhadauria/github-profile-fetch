document.getElementById('fetchBtn').addEventListener('click', () => {
  let username = document.getElementById('username').value;
  fetchGitHubData(username);
});

function fetchGitHubData(username) {
  fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
          displayUserData(data);
      })
      .catch(error => console.error('Error:', error));
}

function displayUserData(user) {
  let userDataDiv = document.getElementById('userData');
  userDataDiv.innerHTML = `
      <div class="bg-white stack-shadow-lg p-6">
          <div class="flex items-center space-x-6 mb-4">
              <img class="h-16 w-16 rounded-full" src="${user.avatar_url}" alt="Avatar">
              <div>
                  <p class="text-xl text-gray-700 font-bold">${user.name || user.login || 'N/A'}</p>
                  ${user.bio && `<p class="text-gray-500">${user.bio}</p>`}
                  <p class="text-gray-500">Followers: ${user.followers} - Following: ${user.following}</p>
                  <p class="text-gray-500">Location: ${user.location}</p>
                  ${user.twitter_username && `<p class="text-gray-500">Twitter: ${user.twitter_username}</p>`}
              </div>
          </div>
          <p><strong>Repositories:</strong></p>
          <div id="repoList"></div>
      </div>
  `;
  fetch(user.repos_url)
      .then(response => response.json())
      .then(repos => {
          displayRepos(repos);
      })
      .catch(error => console.error('Error:', error));
}

function displayRepos(repos) {
  let repoListDiv = document.getElementById('repoList');
  repoListDiv.innerHTML = repos.map(repo => `
  <a href="${repo.html_url}" target="_blank">
    <p class="border-b py-2">
      ${repo.name}
      </p>
    </a>
  `).join('');
}
