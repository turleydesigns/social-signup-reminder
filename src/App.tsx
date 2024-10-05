import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

interface SocialChoice {
  domain: string;
  choice: string;
}

function App() {
  const [socialChoices, setSocialChoices] = useState<SocialChoice[]>([]);

  useEffect(() => {
    chrome.storage.local.get(null, (result) => {
      const choices = Object.entries(result).map(([domain, choice]) => ({ domain, choice: choice as string }));
      setSocialChoices(choices);
    });
  }, []);

  const handleDelete = (domain: string) => {
    chrome.storage.local.remove(domain, () => {
      setSocialChoices(socialChoices.filter(choice => choice.domain !== domain));
    });
  };

  return (
    <div className="p-4 w-80">
      <h1 className="text-2xl font-bold mb-4">Social Sign-up Choices</h1>
      {socialChoices.length === 0 ? (
        <p>No social sign-up choices saved yet.</p>
      ) : (
        <ul>
          {socialChoices.map(({ domain, choice }) => (
            <li key={domain} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
              <div>
                <span className="font-semibold">{domain}</span>: {choice}
              </div>
              <button onClick={() => handleDelete(domain)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App