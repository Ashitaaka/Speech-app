import {postList} from "./js/postList.js"
import {postCreate} from "./js/postCreate.js"
import {likeStatusSwitch} from "./js/likeStatusSwitch.js"
import {addNewPost} from "./js/addNewPost.js"
import {autoResizeArea} from "./js/autoResizeArea.js"

/*----------------VARIABLES DECLARATION----------------*/

//post array copy
const postListCopy = [...postList];

//variable to label each post
let dataId = 0;

//Menu burger mobile variables
const menuBurger = document.getElementById("menu-burger");
const menuContainer = document.querySelector(".burger-container");
const navbarIcons = document.querySelector(".nav-items-mobile");
const icons = navbarIcons.getElementsByClassName("icons");

//Menu burger Desktop variables
const deskBurger = document.getElementById("profile-menu");
const deskContainer = document.querySelector(".desk-container");
const desktop = document.querySelector(".nav-items");
const deskIcons = desktop.querySelectorAll(".desk-icons");

// Show/hide desktop nav on scroll
const deskNavbar = document.querySelector(".navbar-desktop");
let lastScroll;

//Post variables
const postButton = document.querySelector('button[type="submit"]');

//post-container
const postContainer = document.querySelector(".post-container");



/*----------------- EVENTS ----------------*/

// showing / hidding menu on scroll
window.addEventListener('scroll', function(){
  let scrollUp = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollUp > lastScroll) {
    deskNavbar.style.top = '-150px'
  } else {
    deskNavbar.style.top = '0'
  }
  lastScroll = scrollUp
});

// opening the menu by clicking on the burger
menuBurger.onclick = function () {
  menuContainer.classList.toggle("mobile-menu");
  menuBurger.classList.toggle("mobile-menu");
};

//remove menu when clicking outside (mobile)
document.onclick = function clickOutside(e) {
  if (!menuBurger.contains(e.target) && !menuContainer.contains(e.target)) {
    menuContainer.classList.remove("mobile-menu");
    menuBurger.classList.remove("mobile-menu");
  }
};

//to make icon active (mobile)
for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

//to make icon active (desktop)
for (let j = 0; j < deskIcons.length; j++) {
  deskIcons[j].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// opening the menu by clicking profile picture
deskBurger.onclick = function () {
  deskContainer.classList.toggle("desktop-menu");
  deskBurger.classList.toggle("desktop-menu");
};

//remove menu when clicking outside
document.onclick = function clickOutside(e) {
  if (!deskBurger.contains(e.target) && !deskContainer.contains(e.target)) {
    deskContainer.classList.remove("desktop-menu");
    deskBurger.classList.remove("desktop-menu");
  }
};

//Loading Textarea auto-resize function
window.addEventListener("load", autoResizeArea());

//Create posts feed 
postListCopy.forEach(post =>{
  postCreate(post, dataId);
  dataId++;
});
dataId=0;
//adding the eventListener 
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach((button) => {
  button.addEventListener("click", addLikeNumber);
  button.addEventListener("click", likeStatusSwitch);
});
//comment inputs
const commentInputs = document.querySelectorAll(".comment-input");
commentInputs.forEach(input => {
  input.addEventListener("change", addComment);
}) 


//Adding a Post and recreating the new posts feed
postButton.addEventListener("click", function(e) {
  e.preventDefault();
  postListCopy.unshift(addNewPost(dataId));
  postListCopy.forEach(post =>{
    postCreate(post, dataId);
    dataId++;
  });
  //adding the eventListener 
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", addLikeNumber);
    button.addEventListener("click", likeStatusSwitch);
  });
  //reseting dataId variable
  dataId=0;

  //comment inputs
  const commentInputs = document.querySelectorAll(".comment-input");
  commentInputs.forEach(input => {
    input.addEventListener("change", addComment);
  }) 
});

//function to increment like counter when liking
function addLikeNumber(){
    let postDataId = this.dataset.id;
    if (postListCopy[postDataId].likeStatus === false){
      postListCopy[postDataId].likeStatus = true;
      postListCopy[postDataId].likeNumber++;
    }else if(postListCopy[postDataId].likeStatus === true){
      postListCopy[postDataId].likeStatus = false;
      postListCopy[postDataId].likeNumber--;
    }
    //resetting the feed container
    postContainer.innerHTML ="";

    //Create posts feed 
    postListCopy.forEach(post =>{
      postCreate(post, dataId);
      dataId++;
    });
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((button) => {
    button.addEventListener("click", addLikeNumber);
    button.addEventListener("click", likeStatusSwitch);
    });
     dataId=0;

    //comment inputs
    const commentInputs = document.querySelectorAll(".comment-input");
    commentInputs.forEach(input => {
      input.addEventListener("change", addComment);
    }); 
}

function addComment(e){
    e.preventDefault();
    let postDataId = this.dataset.id;
    let postComment = commentInputs[postDataId].value;
    let post ={};
    post.commentFirst = 'olive';
    post.commentContent = postComment;
    postListCopy[postDataId].postComments.unshift(post,);
    //resetting the feed container
    postContainer.innerHTML ="";

   //Create posts feed 
    postListCopy.forEach(post =>{
      postCreate(post, dataId);
      dataId++;
    });
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((button) => {
    button.addEventListener("click", addLikeNumber);
    button.addEventListener("click", likeStatusSwitch);
  });
  dataId=0;

  //comment inputs
  commentInputs.forEach(input => {
    input.addEventListener("change", addComment);
  }); 
}