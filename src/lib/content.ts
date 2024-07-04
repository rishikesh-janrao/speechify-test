const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const ssmlTemplateRaw = await fetch(API_URL);
  const { content } = await ssmlTemplateRaw.json();
  return content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): Array<string> => {
  if (content.includes("<speak>") && content.includes("</speak>")) {
    const ssml = document.createElement("speak");
    const withoutSpeakTag = content
      .replace("<speak>", "")
      .replace("</speak>", "");
    const withoutPtag = withoutSpeakTag.includes("<p>")
      ? withoutSpeakTag.replaceAll("<p>", "").replaceAll("</p>", "")
      : withoutSpeakTag;
    ssml.innerHTML = withoutPtag;
    let sentences: string[] = [];
    let totalSentences = ssml.children.length;
    while (totalSentences !== 0) {
      totalSentences--;
      const text = ssml.children.item(totalSentences)?.textContent;
      text?.replaceAll("<s>", "").replaceAll("</s>", "\n");
      if (text) sentences.push(text);
    }
    sentences = sentences.reverse();

    return sentences;
  }
  else {
    const error = new Error("This is not valid ssml")
    throw(error)
  }
};

export { fetchContent, parseContentIntoSentences };
