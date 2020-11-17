// bloco de constantes que armazenam elementos html
const postsContainer = document.querySelector('#posts-container') 
const loaderContainer = document.querySelector('.loader') 
const filterInput = document.querySelector("#filter")

// let que possui um valor que vai ser alterado
let page = 1

// inicio das funções
/*
  A API Fetch fornece uma interface JavaScript para acessar e 
  manipular partes do pipeline HTTP, tais como os pedidos e respostas. 
  Ela também fornece o método global fetch() que fornece uma maneira 
  fácil e lógica para buscar recursos de forma assíncrona através da rede.

  https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
*/
const getPosts = async () => {
  // metodo que ao ser invocado faz uma 
  //requizição http com os dados solicitados por argumento.
  const response = await 
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
  return response.json()
}

/*
  Uso de closures para acessar uma varialvel que estava em um escopor fora da function generatePostsTemplate()
  "posts", estava sendo referenciada dentro da função addPostsIntoDOM(); mas utilizando da closure a generatePostsTemplate()
  pode acessa-la e na const postTemplate recebe uma function que por sua vez recebe "posts" como parametro.
*/
const generatePostsTemplate = posts => posts.map(({ id, title, body }) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
    </div>
  `).join("")

const addPostsIntoDOM = async () => {
  const posts = await getPosts()
  const postTemplate = generatePostsTemplate(posts)
  postsContainer.innerHTML += postTemplate
}


const getNextPosts = () => {
  setTimeout(() => {
    page++
    addPostsIntoDOM()
  }, 300)
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

const handleScrollToPageBottom = () => {
  // document.documentElement.scrollTop => numero de pixels entre o top e o fim da pagina
  // document.documentElement.scrollHeight => numero total da pagina, incluindo a parte não visivel
  // document.documentElement.clientHeight => numero em pixels a altura entre o top e a parte final da pagina
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >=scrollHeight - 10

  if(isPageBottomAlmostReached){
    showLoader()
  }
}

/*
  mesmo exemplo da function generatePostsTemplate().
  Nesse caso, a function showPostIfMatchInputValue() acessa a propriedade "inputValue"
  que esta no escopo da function handleInputValue(), que por sua vez invoca o metodo
  forEach() que precisa de um paramtro, que no caso é o inputValue.
*/

const showPostIfMatchInputValue = inputValue => post => {
  const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
  const postBody = post.querySelector('.post-body').textContent.toLowerCase()
  const postContainsInpuValue = postTitle.includes(inputValue) 
  || postBody.includes(inputValue)
  
  if(postContainsInpuValue) {
    post.style.display = 'flex'
    return
  }

  post.style.display = 'none'
}

const handleInputValue = event => {
  const inputValue = event.target.value.toLowerCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach(showPostIfMatchInputValue(inputValue))
}

addPostsIntoDOM()
// fim das funções 

// eventos DOM
window.addEventListener('scroll', handleScrollToPageBottom)
filterInput.addEventListener('input', handleInputValue)
