// api key is sj45IrzGgXwufmOCBgqyMg==hcgotOdGM3pBDFLb

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyQuoteBtn = document.getElementById('copy-quote');

let apiQuotes = [];

function newQuote() {
  // Ensure apiQuotes has data
  if (apiQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomIndex];

    // Update the text content
    authorText.textContent = quote.author || 'Unknown';

    if (quote.quote.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.quote || 'No quote available.';
  }
}

// Get quotes from API
async function getQuotes() {
  const apiURL = 'https://api.api-ninjas.com/v1/quotes';
  const apiKey = 'sj45IrzGgXwufmOCBgqyMg==hcgotOdGM3pBDFLb'; // Replace with your API key

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'sj45IrzGgXwufmOCBgqyMg==hcgotOdGM3pBDFLb', // Add the API key to the request headers
      },
    });

    if (response.ok) {
      apiQuotes = await response.json();
      //   console.log(apiQuotes); // Output the quotes to the console
      newQuote();
    } else {
      throw new Error('Failed to fetch quotes');
    }
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

//copy text to clipboard
function copyToClipboard() {
  const textToCopy = `${quoteText.textContent}-${authorText.textContent}`;

  // Use the Clipboard API to copy text
  navigator.clipboard.writeText(textToCopy).then(
    () => {
      alert('Quote copied to clipboard!');
    },
    (err) => {
      console.error('Failed to copy text: ', err);
    }
  );
}

//Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Even listener
newQuoteBtn.addEventListener('click', getQuotes);
copyQuoteBtn.addEventListener('click', copyToClipboard);
twitterBtn.addEventListener('click', tweetQuote);

// On page load
getQuotes();
