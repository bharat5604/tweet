//variables
let tweetList = document.getElementById('tweet-list'),
    noOfItem = document.querySelector('.fixedln p')

    noOfItem.textContent=getTweetLocalStorage().length

  function backgroundC(){
    if(noOfItem.textContent==0){
        noOfItem.style.background='red';
    }else{
        noOfItem.style.background=''; 
    }
  }
  backgroundC()

//Listener
eventListener()

function eventListener(){
    //Submit new tweet
    document.getElementById('form').addEventListener('submit', newTweet);
    
    //Remove listner
    tweetList.addEventListener('click', removeTweet);

    //document
    document.addEventListener('DOMContentLoaded', localStorageTweets)
}

//function
function newTweet(){
    let tweet = document.getElementById('tweetmsg').value;
 
   //create an <li> element
   let li = document.createElement('li');
   li.textContent = tweet;
   noOfItem.textContent=getTweetLocalStorage().length+1
   backgroundC()
   //Create Remove Button
   let removeBtn = document.createElement('a');
   removeBtn.classList='remove-tweet';
   removeBtn.href='#';
   removeBtn.textContent="X";
   li.appendChild(removeBtn);
    if(tweet === ''){
        let textstyle = document.getElementById('tweetmsg');
        textstyle.style.borderColor="red";
        return  
    }else{
        let textstyle = document.getElementById('tweetmsg');
        textstyle.style.borderColor="#999";
    }
   //append li 
   tweetList.appendChild(li);

   //setTweetLocalStorage
   setTweetLocalStorage(tweet);
   this.reset();
   
}

function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove()
        noOfItem.textContent=getTweetLocalStorage().length-1
        backgroundC()
    }

    //removeLocalStorage
    removeLocalStorage(e.target.parentElement.textContent);
}

//setTweetLocalStorage
function setTweetLocalStorage(tweet){
    let tweets = getTweetLocalStorage();

    tweets.push(tweet)
    //convert value into string
    localStorage.setItem('tweets', JSON.stringify( tweets ))
}

//getTweetLocalStorage
function getTweetLocalStorage(){
    let tweets;
    if(localStorage.getItem('tweets')===null){
        tweets =[];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets;
}

//localStorageTweets
function localStorageTweets(){
    let tweets = getTweetLocalStorage();

    tweets.forEach(function(tweet){
        //create an <li> element
        let li = document.createElement('li');
        li.textContent = tweet;

        //Create Remove Button
        let removeBtn = document.createElement('a');
        removeBtn.classList='remove-tweet';
        removeBtn.href='#';
        removeBtn.textContent="X";
        li.appendChild(removeBtn);

        //append li 
        tweetList.appendChild(li);
    })
}

//removeLocalStorage
function removeLocalStorage(tweet){
    let tweets = getTweetLocalStorage();
    
    //remove last charachter i.e = 'X'
    let deleteTweet = tweet.substring(0, tweet.length-1);
    
    tweets.forEach(function(tweetLS, index){
        if(deleteTweet === tweetLS){
            tweets.splice(index,1)
        }
        localStorage.setItem('tweets', JSON.stringify( tweets ))
    })
}
