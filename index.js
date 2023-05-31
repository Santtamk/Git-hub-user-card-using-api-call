class GitHub {
    constructor(url) {
      this.url = url;
    }
    async getUserDetails(username) {
      try {
        const response = await fetch(`${this.url}/${username}`);
        const data = await response.json();
        console.log(data);
  
        this.createUserCard(data);
        // return data
      } catch (error) {
        console.error("error");
        throw new Error("An error occurred while fetching data.");
      }
    }
    createUserCard(data) {
      const main = document.querySelector("#main");
      const card = `<div class="card" >
      <div>
          <img src="${data.avatar_url}" alt="${data.login}" class="avatar">
      </div>    
      <div class="user-info">
          <h3>${data.login}</h3>
          <p>${data.bio}</p>
          
          <ul>
              <li>Followers:${data.followers}</li>
              <li>Following:${data.following}</li>
              <li>Repos:${data.public_repos}</li>
          </ul>
          
          <ul>
              <li>Twitter:${data.twitter_username}</li>
              <li>Location:${data.location}</li>
          </ul>
      </div>
  </div>`;
      main.innerHTML = card;
    }
  }
  
  const url = "https://api.github.com/users";
  const users = new GitHub(url);
  
  const input = document.querySelector("#search");
  input.addEventListener("input", async () => {
    const username = input.value.trim();
    if (username !== "") {
      await users.getUserDetails(username);
    } else {
      const main = document.querySelector("#main");
      main.innerHTML = "";
    }
  });
  // console.log(username);
  