import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// click events for the tweet handle

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleClick(e.target.dataset.like)
  } 
  else if (e.target.dataset.retweet) {
    handleRetweet(e.target.dataset.retweet)
  } 
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  } 
  else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } 
  else if (e.target.id === "reply-tweet-btn") {
    handleReplyBtnClick(e.target.dataset.replytext)
  }
  else if(e.target.dataset.delete){
    handleDeleteBtn(e.target.dataset.delete)
  }
  else if(e.target.dataset.deletereply){
    handleReplyDeleteBtn(e.target.dataset.deletereply)
  }
})

// handleClick function to control the like tweet icon

function handleClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0]

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--
    targetTweetObj.isLiked = false
  } else {
    targetTweetObj.likes++
    targetTweetObj.isLiked = true
  }
  render()
}

// handleRetweet function to control the retweet function

function handleRetweet(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0]

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--
    targetTweetObj.isRetweeted = false
  } else {
    targetTweetObj.retweets++
    targetTweetObj.isRetweeted = true
  }
  render();
}

// toggle replies to hide/unhide

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

// add a tweet

function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-area")

    if(tweetInput.value){
    tweetsData.unshift({
      handle: `@twimbabot000000`,
      profilePic: `images/logo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    })
    render()
    tweetInput.value = ""
  }
}

// add a reply

function handleReplyBtnClick(tweetId) {
  const replyTweet = document.getElementById(`reply-tweet-${tweetId}`)

  const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0]

  if (replyTweet.value.length >= 1) {
    targetTweetObj.replies.push({
      handle: `@Trollbot00000`,
      profilePic: `images/logo.png`,
      tweetText: replyTweet.value,
      uuid: uuidv4()
    })
    render()
    handleReplyClick(tweetId)
  }
}

// delete a tweet

function handleDeleteBtn(tweetId){

  const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0]

  tweetsData.splice(tweetsData.indexOf(targetTweetObj), 1)

  render()
}

// delete a reply of a tweet 

function handleReplyDeleteBtn(replyId){

  const targetTweetObj = tweetsData.filter((tweet) => tweet.replies.find((reply) => reply.uuid === replyId))[0].replies

  const targetReplyObj = targetTweetObj.find((comment)=> comment.uuid === replyId)

  targetTweetObj.splice(targetTweetObj.indexOf(targetReplyObj), 1)

  render()
}

// tweet function to display tweet data

function getFeedHtml() {

  let feedHtml = ``

  tweetsData.forEach((tweet) => {

    // rendering like and retweet icons to like or retweet a tweet and add css class to it.

    const likeIconClass = tweet.isLiked ? "liked" : ""

    const retweetIconClass = tweet.isRetweeted ? "retweeted" : ""

    // showing replies from the tweets data

    let repliesHtml = ``

    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
                </div>
                <i class="fa-solid fa-trash-can" data-deletereply="${reply.uuid}"></i>
                </div>
                </div>
                `
      })
    }

    // showing tweets data

    feedHtml += `
    <div class="tweet">
      <div class="tweet-inner">
        <img src=${tweet.profilePic} class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet = "${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-trash-can" data-delete="${tweet.uuid}"></i>
                </span>
            </div>   
        </div>            
      </div>
   </div>
   <div class="hidden reply-section" id="replies-${tweet.uuid}">
        ${repliesHtml}
        <div class="tweet-input reply-tweet-input">
        <img src="images/logo.png" alt="tweet logo" class="logo-img reply-logo-img">
        <textarea placeholder="Tweet your Reply" class="tweet-area reply-tweet-area" id="reply-tweet-${tweet.uuid}"></textarea>
        <button class="tweet-btn reply-tweet-btn" id="reply-tweet-btn" data-replytext = "${tweet.uuid}">Reply</button>
        </div>     
    </div>   
    </div>
    `
  })
  return feedHtml
}

// render the elements of the tweet on the browser

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml()
}
render()
