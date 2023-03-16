import {tweetsData} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-area')


// click events for the tweet handle

document.addEventListener("click", (e)=>{
    if(e.target.dataset.like){
        handleClick(e.target.dataset.like);
    } 
    else if(e.target.dataset.retweet){
        handleRetweet(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})

// handleClick function to control the like tweet icon

function handleClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0]
    
    if(targetTweetObj.isLiked){
     targetTweetObj.likes--
     targetTweetObj.isLiked = false
    }else{
     targetTweetObj.likes++
     targetTweetObj.isLiked = true
    }
    render()
}

// handleRetweet function to control the retweet function

function handleRetweet(tweetId){
    const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    }else{
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    }
    render()
}

// toggle replies to hide/unhide

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

// add a tweet

function handleTweetBtnClick(){
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
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }  
}

// tweet function to display tweet data

function getFeedHtml(){
    let feedHtml = ``
    for(let tweet of tweetsData){

        let likeIconClass = ''
        let retweetIconClass = ''

        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        // showing replies from the tweets data

        let repliesHtml = ``

        if(tweet.replies.length > 0){
            tweet.replies.forEach((reply)=>{
                repliesHtml += 
                `
                <div class="tweet-reply">
                <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
                </div>
                </div>
                </div>
                `
            })
        }

        // showing tweets data

    feedHtml +=
        `
    <div class="tweet">
      <div class="tweet-inner">
        <img src=${tweet.profilePic} class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots " data-reply="${tweet.uuid}"></i>
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
            </div>   
        </div>            
      </div>
   </div>
   <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
    </div>
    `
    }
    return feedHtml
}

// render the elements of the tweet on the browser

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()