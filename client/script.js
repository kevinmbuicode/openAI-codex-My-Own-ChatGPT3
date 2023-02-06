import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;


// Loading while waiting to find text
function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '....') {
      element.textContent= '';
    }
  }, 300)
}


// InterActive typing.
function typeText(element, index) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval)
    }
  }, 20)
}

// generate uniqueId on every message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// chatStripe - style on both user and Ai on view screen
function chatStripe(isAi, value, uniqueId) {
  return 
  (`
      <div class='wrapper ${isAi && 'ai'}' >
        <div class='chat'>
          <div class='profile'>
            <img 
              src="${isAi} ? ${bot} : ${user}"
              alt="${isAi} ? 'bot' : 'user' "/>
          </div>
          <div class"message" id=${uniqueId}>${value}</div>
        </div>
      </div>
  `)
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = FormData(form);

  // user's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // Ai's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

// Event Listeners for handleSubmit button and enter key press
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    handleSubmit(e);
  }
}
) 