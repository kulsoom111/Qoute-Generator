const qouteContainer = document.getElementById('qoute-container');
const qouteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQouteBtn = document.getElementById('new-qoute');
const pageLoader = document.getElementById('loader');


// show loading
function loading(){
  pageLoader.hidden = false;
  qouteContainer.hidden = true;
 }

// hide loading
function complete(){
  qouteContainer.hidden = false;
  pageLoader.hidden = true;
}
// get new quotes
function newQuote(){
  loading();
  const qoute = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// check if author field is blank and replace it with 'unknown'
if (!qoute.author){
  authorText.textContent='Unknown'
}else{
  authorText.textContent = qoute.author;
}
  // check if text length is too long and change css
  if(qoute.text.length > 120){
    qouteText.classList.add('long-qoute')
  }else{
    qouteText.classList.remove('long-qoute')
  }
  // set qoute and hide loader
  complete();
  qouteText.textContent = qoute.text;
}

// get quotes from API
async function getQuotes() {
  loading();
  const apiUrl ='https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote(); // Call newQuote() after quotes have been fetched
  } catch (error) {
    // handle error
  }
}

// tweet qoute
function tweetQoute(){
  const twitterUrl =`https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// event Listener
newQouteBtn.addEventListener('click', newQuote);
twitter.addEventListener('click', tweetQoute);

 // onload
getQuotes();

