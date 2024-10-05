function detectSocialSignup() {
  const socialButtons = document.querySelectorAll('button, a');
  const socialKeywords = ['facebook', 'google', 'twitter', 'apple'];

  socialButtons.forEach((button) => {
    const buttonText = button.textContent?.toLowerCase() || '';
    const socialChoice = socialKeywords.find((keyword) => buttonText.includes(keyword));

    if (socialChoice) {
      button.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          action: 'saveSocialChoice',
          domain: window.location.hostname,
          choice: socialChoice
        });
      });
    }
  });
}

function checkForReminder() {
  chrome.runtime.sendMessage(
    { action: 'getSocialChoice', domain: window.location.hostname },
    (response) => {
      if (response.choice) {
        const reminder = document.createElement('div');
        reminder.textContent = `You previously signed up with ${response.choice}. Consider using that option to log in.`;
        reminder.style.cssText = `
          position: fixed;
          top: 10px;
          right: 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          z-index: 9999;
        `;
        document.body.appendChild(reminder);

        setTimeout(() => {
          reminder.remove();
        }, 5000);
      }
    }
  );
}

detectSocialSignup();
checkForReminder();