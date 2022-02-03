let form = document.getElementById('github-form')
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
  //GET RID OF v THIS AT THE END
  e.preventDefault()
  let searchInput = e.target[0].value
 // debugger
  let gitSearch = fetch(`https://api.github.com/search/users?q=${searchInput}`, {
    method: 'GET',
    headers: 
      {
          "Content-type": "application/json",
          Accept: "application/vnd.github.v3+json"
      }
  })
  
  .then (response => response.json())
  .then (function(data){
   
  let userName = data.items[0].login
  userArray.unshift(userName)
  let userAvatar = data.items[0].avatar_url
  let userList = document.getElementById("user-list")
  //adding username
  let userNameLi = document.createElement("li")
  userNameLi.style.color = "blue"
  userNameLi.textContent = `USERNAME: ` + userName + `--> (click Avatar below for Repos)`
  userList.appendChild(userNameLi)
  
  //adding avatar
  let userAvatarLi = document.createElement("li")
  let userAvatarImg = document. createElement("img")
  userAvatarImg.src = userAvatar
  userAvatarImg.style.width = "150px"
  userAvatarLi.style.textAlign = "center"
  userList.appendChild(userAvatarLi)
  userAvatarLi.appendChild(userAvatarImg)
  userAvatarImg.addEventListener("click", getRepos)
  }
  )
}
//array to push username to make it global
let userArray = []
let repoList = document.getElementById("repos-list")

function getRepos(){
  let gitSearchRepos = fetch(`https://api.github.com/users/${userArray[0]}/repos`, {
    method: 'GET',
    headers: 
      {
          "Content-type": "application/json",
          Accept: "application/vnd.github.v3+json"
      }
  })
  
  .then (response => response.json())
  .then (function(data){
let repoArray = data
for (let repo of repoArray){ 
  let repoLi = document.createElement('li')
  let repoLinkA = document.createElement('a')
  let link = document.createTextNode("  click here")
  repoLinkA.appendChild(link)
  repoLinkA.href = repo.archive_url
  repoLi.textContent = repo.name 
  repoList.appendChild(repoLi)
  repoList.appendChild(repoLinkA)}
})}

