// Translation utility using MyMemory API
const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

let translationCache = {};

const getTargetCode = (language) => {
  const codeMap = {
    'fr': 'fr',
    'en': 'en',
    'es': 'es',
    'de': 'de'
  };
  return codeMap[language?.toLowerCase()] || language;
};

// Strip HTML tags but keep text
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Extract text nodes and translate while preserving HTML structure
const translateHtmlContent = async (html, targetLanguage) => {
  if (!html) return html;
  
  // Split by HTML tags and keep them
  const parts = html.split(/(<[^>]+>)/);
  const translated = [];
  
  for (const part of parts) {
    if (!part) continue;
    
    // Check if it's an HTML tag
    if (part.startsWith('<')) {
      translated.push(part);
    } else {
      // It's text - translate it
      const translatedPart = await translateText(part, targetLanguage);
      translated.push(translatedPart);
    }
  }
  
  return translated.join('');
};

export const translateText = async (text, targetLanguage = 'fr') => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  const lang = getTargetCode(targetLanguage);
  
  if (lang === 'en') {
    return text;
  }

  // Clean text for API call
  const cleanText = text.trim();
  
  if (!cleanText || cleanText.length === 0) {
    return text;
  }

  const cacheKey = `${cleanText}-${lang}`;
  if (translationCache[cacheKey]) {
    console.log('[Translator] Cache hit:', cleanText.substring(0, 30));
    return translationCache[cacheKey];
  }

  try {
    const url = new URL(MYMEMORY_API);
    url.searchParams.append('q', cleanText);
    url.searchParams.append('langpair', `en|${lang}`);
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('[Translator] API error:', response.status);
      return text;
    }
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translatedText = data.responseData.translatedText;
      
      if (translatedText && translatedText !== cleanText) {
        translationCache[cacheKey] = translatedText;
        console.log('[Translator] Translated:', cleanText.substring(0, 30), '→', translatedText.substring(0, 30));
        return translatedText;
      }
    }
    
    return text;
  } catch (error) {
    console.error('[Translator] Error:', error);
    return text;
  }
};

// Translate HTML content while preserving HTML structure
export const translateHtml = async (html, targetLanguage = 'fr') => {
  if (!html || typeof html !== 'string') return html;
  
  const lang = getTargetCode(targetLanguage);
  if (lang === 'en') return html;

  console.log('[Translator] Translating HTML content...');
  
  try {
    const result = await translateHtmlContent(html, lang);
    console.log('[Translator] HTML translation complete');
    return result;
  } catch (error) {
    console.error('[Translator] HTML translation error:', error);
    return html;
  }
};

export const translatePosts = async (posts, language) => {
  const lang = getTargetCode(language);
  
  if (lang === 'en' || !posts || !Array.isArray(posts)) {
    return posts;
  }

  if (posts.length === 0) {
    return posts;
  }

  try {
    console.log('[Translator] Translating', posts.length, 'posts');
    
    const translatedPosts = await Promise.all(
      posts.map(async (post) => {
        const titleTrans = await translateText(post.title, lang);
        const excerptTrans = await translateText(post.excerpt, lang);
        
        return {
          ...post,
          title: titleTrans,
          excerpt: excerptTrans
        };
      })
    );
    
    return translatedPosts;
  } catch (error) {
    console.error('[Translator] Error translating posts:', error);
    return posts;
  }
};
