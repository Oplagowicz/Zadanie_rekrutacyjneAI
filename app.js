require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const apiKey = process.env.OPENAI_API_KEY;


// Note: There are several areas that could be further improved, such as handling
// multiple responses in the `choices` array, or implementing specific error handling
// for rate limits and API response types. Due to limited data and the need to avoid
// excessive API calls (and associated costs), I have not implemented these yet but 
// am aware of their importance in a fully robust solution.


async function getOpenAIResponse(articleText, prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `${articleText}\n\n${prompt}` }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      'Error calling OpenAI API:',
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

const articlePath = 'article.txt'; // Path to the article file

fs.readFile(articlePath, 'utf8', async (err, articleText) => {
  if (err) {
    console.error('Error reading article file:', err);
    return;
  }

  // Define the prompt for OpenAI
  const prompt =
    'Convert the above article into well-structured HTML, following these guidelines:\n' +
    '- Use appropriate HTML tags for structuring the content.\n' +
    '- Identify places to insert images, marked with <img> tags with src="image_placeholder_1.jpg", "image_placeholder_2.jpg", etc., increasing the number for each image sequentially.\n' +
    '- Add alt attributes to each image tag with a description for generating the images.\n' +
    '- Add captions below each image using appropriate HTML tags.\n' +
    '- For each image, create a <figcaption> tag below it. The content of <figcaption> should be taken from the alt attribute of the <img> tag and translated into Polish.\n' +
    '- Do not include any CSS or JavaScript.\n' +
    '- Return only the content without <html>, <head>, or <body> tags.\n';
    '- Create the file content EXCLUSIVELY IN POLISH.\n';

  // Get generated HTML content from OpenAI
  const htmlContent = await getOpenAIResponse(articleText, prompt);

  // Note: I'm aware that using the .then()/.catch() syntax could be an alternative here,
  // allowing for response handling in the .then() block and removing the if (htmlContent) check.
  // However, to avoid additional tests and save your budget, I opted not to experiment further.

  if (htmlContent) {
    console.log('HTML content successfully received from OpenAI');
    saveHtmlContent(htmlContent);
  } else {
    console.log('Failed to retrieve HTML content from OpenAI');
  }
});

function saveHtmlContent(htmlContent) {
  const outputPath = 'artykul.html';

  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error('Error saving HTML file:', err);
    } else {
      console.log(`HTML content saved to file ${outputPath}`);
    }
  });
}