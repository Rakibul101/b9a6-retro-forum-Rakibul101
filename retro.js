const loadAllPost = async (query = "") => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts${query}`
    const res = await fetch(url);
    const data = await res.json();
    const post = data.posts;
    //   console.log(post);
    displayPosts(post);
}
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const value = document.getElementById('search-input').value;
    loadAllPost(`?category=${value}`)
    console.log(value);
}
const displayPosts = post => {
    // console.log(post);
    const postContainer = document.getElementById('cart-container')
    postContainer.innerHTML = "";
    post.forEach(posts => {
        console.log(posts);
        const postCard = document.createElement('div');
        postCard.classList = `flex bg-[#797dfc1a] gap-4 md:gap-8 w-full  rounded-xl mb-6 p-8`;
        postCard.innerHTML = `
        
        <div class='relative w-[100px] h-[100px]'>
        <img class="bg-base-300 rounded-lg"  src=${posts.image} alt="" />
        <span class="-top-1 -right-1 absolute  w-3.5 h-3.5  border-2 border-white ${posts.isActive?'bg-green-500':'bg-red-500'} rounded-full"></span>
        </div>
        
        <div class='w-3/4 md:w-2/3 space-y-6'>
            <div class='flex gap-4'>
            <h3><span>#<span>${posts.category}</h3>
            <p>Author:${posts.author.name}</p>
            </div>
            <h2 class='text-2xl text-black font-semibold'>${posts.title}</h2>
            <p>${posts.description}</p>
            <hr class='border-dashed bg-gray-400'/>
            <div class='flex md:gap-32'>
            <div class='flex gap-2 md:gap-6'>
                <div class='flex gap-1 md:gap-3'>
                <p><i class="fa-regular fa-message"></i></p>
                <p>${posts.comment_count}</p>
                </div>
                <div class='flex gap-1 md:gap-3'>
                <p><i class="fa-regular fa-eye"></i></p>
                <p>${posts.view_count}</p>
                </div>
                <div class='flex gap-1 md:gap-3'>
                <p><i class="fa-regular fa-clock"></i></p>
                <p>${posts.posted_time}</p>
                </div>
            </div>

            <div class='bg-gray-300 rounded-full'>
                <button id="increment" onclick="addToCart('${posts.title}','${posts.view_count}')" class='px-2 py-1'><i class="fa-regular fa-envelope"></i></button>
            </div>
            </div>
        </div>
        `;
        postContainer.appendChild(postCard);
    })
    setTimeout(() => {
        toggleLoadingSpinner(false);
    }, 2000);
}

let counter = 0;
const addToCart = (title,view_count) =>{
    
    counter++;
    
    // Update the counter display
    const counterElement = document.getElementById('counter');
    counterElement.textContent = `(${counter})`;
    // console.log(name,view_count);
    const cartInfo = document.getElementById('cart-info')
    const cardInfo = document.createElement('div');
    cardInfo.classList = `flex justify-around p-8 gap-6 mx-8 rounded-xl mb-4 bg-base-100`;
    cardInfo.innerHTML = `
    <h2>${title}</h2>
    <div class='flex gap-2'>
    <span><i class="fa-regular fa-eye"></i></span>
    <p>${view_count}</p>
    </div>
    `;
    cartInfo.appendChild(cardInfo);
}

const toggleLoadingSpinner= (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
    
}

loadAllPost();
const handleCardLoad = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
    const res = await fetch(url);
    const data = await res.json();
    const cart = data;
    // console.log(cart);
    displayCard(cart);

}
const displayCard = cart =>{
    const cardContainer = document.getElementById('show-card')

    cart.forEach(carts=>{
        console.log(carts);
        const cardItems = document.createElement('div');
        cardItems.classList = `card card-compact mb-4 p-8 bg-base-100 border border-gray-200`;
        cardItems.innerHTML = `
        <figure><img src=${carts.cover_image} class='rounded-xl' alt="" /></figure>
        <div class='flex items-center gap-4'>
        <p><i class="fa-regular fa-calendar"></i></p>
        <h4>${carts.author.posted_date?carts.author.posted_date:'No published date'}</h4>
        </div>
        <h2 class='text-2xl font-semibold'>${carts.title}</h2>
        <p>${carts.description}</p>
        <div class='flex mt-3 gap-5'>
            <div class='h-[60px] w-[60px] '>
            <figure><img class='w-full rounded-full' src=${carts.profile_image} alt="" /></figure>
            </div>
            <div>
                <h5>${carts.author.name}</h5>
                <p>${carts.author.designation?carts.author.designation:'Unknown'}</p>
            </div>
        </div>
      `;
      cardContainer.appendChild(cardItems)
    })
}
handleCardLoad();