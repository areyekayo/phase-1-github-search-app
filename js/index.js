document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.querySelector("form");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchInput = document.querySelector('input[name="search"]').value;

        fetch(`https://api.github.com/search/users?q=${searchInput}`)
            .then((res) => res.json())
            .then((json) => {
                let results = json.items
                results.forEach((user) => {
                    const li = document.createElement("li");
                    const userName = document.createElement("p");
                    const img = document.createElement("img");
                    const p2 = document.createElement("p");
                    const profileLink = document.createElement("a");
                    p2.append(profileLink);
                    profileLink.href = `${user.url}`
                    profileLink.textContent = "Profile Link"
                    img.src = `${user["avatar_url"]}`
                    userName.textContent = user.login;
                    li.append(userName, img, p2)
                    userList.append(li)

                    userName.addEventListener("click", () => {
                        fetch(`https://api.github.com/users/${user.login}/repos`)
                            .then((res) => res.json())
                            .then((json) => {
                                json.forEach((repo) => {
                                    const repoLi = document.createElement("li")
                                    repoLi.textContent = repo.name;
                                    repoList.append(repoLi);
                                }
                            )})
                    })

                })
            })
    })

})