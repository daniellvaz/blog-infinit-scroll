const postsContainer = document.querySelector('#posts-container') 
const loaderContainer = document.querySelector('.loader') 
const filterInput = document.querySelector("#filter")

let page = 1

const getPosts = async () => {
  // metodo que ao ser invocado faz uma 
  //requizição http com os dados solicitados por argumento.
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
  return response.json()
}
const addPostsIntoDOM = async () => {
  const posts = await getPosts()
  const postTemplate = posts.map(({ id, title, body }) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
    </div>
  `).join("")
  
  postsContainer.innerHTML += postTemplate
}

addPostsIntoDOM()

const getNextPosts = () => {
  page++
  addPostsIntoDOM()
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show');
    getNextPosts()
  }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoader()
}

window.addEventListener('scroll', () => {
  // document.documentElement.scrollTop => numero de pixels entre o top e o fim da pagina
  // document.documentElement.scrollHeight => numero total da pagina, incluindo a parte não visivel
  // document.documentElement.clientHeight => numero em pixels a altura entre o top e a parte final da pagina
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >=scrollHeight - 10

  if(isPageBottomAlmostReached){
    showLoader()
  }
})

filterInput.addEventListener('input', event => {
  const inputValue = event.target.value
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const postTitle = post.querySelector('.post-title').textContent
    const postBody = post.querySelector('.post-body').textContent
    
    if() {

    }
  })
  console.log(posts);
})