document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.github.com/search/users?q')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  const form = document.getElementById('github-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const search = document.getElementById('search').value;

    let originalName = search.split(' ').join('');

    document.getElementById('user-list').innerHTML = '';
    document.getElementById('repos-list').innerHTML = ''; // Clear previous repository list

    fetch('https://api.github.com/users/' + originalName)
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);

        // Display user information
        const userListItem = document.createElement('li');
        userListItem.innerHTML = `
          <a href="${userData.html_url}" target="_blank">${userData.html_url}</a>
          <br><br>
          <a href="https://www.github.com/${originalName}" target="_blank">https://www.github.com/${originalName}</a>
          <br><br>
          ${originalName}
          <br><br>
          <img src='${userData.avatar_url}'/>
        `;
        document.getElementById('user-list').appendChild(userListItem);

        // Fetch and display user's repositories
        fetch(userData.repos_url)
          .then((res) => res.json())
          .then((reposData) => {
            console.log(reposData);

            const reposList = document.getElementById('repos-list');
            reposData.forEach((repo) => {
              const repoListItem = document.createElement('li');
              repoListItem.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              `;
              reposList.appendChild(repoListItem);
            });
          })
          .catch((reposError) => {
            console.error('Error fetching user repositories:', reposError);
          });
      })
      .catch((userError) => {
        console.error('Error fetching user data:', userError);
      });
  });
});











