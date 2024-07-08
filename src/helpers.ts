import { CardType } from './api/cards';

export const generateSlug = (link: string) => {
  return link.split(' ').join('-').toLowerCase();
};

export const ungenerateSlug = (link: string) => {
  return link.split('-').join(' ');
};

export const generateName = (email: string) => {
  const index = email.indexOf('@');

  return email.slice(0, index);
};

export const shortenDescription = (description: string, count: number) => {
  return description.slice(0, count) + '...';
};

export const setLocalWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl,
  }

  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalWithExpiry = (key: string) => {
  const now = new Date().getTime();
  const itemStr = localStorage.getItem(key);

  if (!itemStr) return '';

  const item = JSON.parse(itemStr);
  const expired = now > item?.expiry;

  if (expired) {
    localStorage.removeItem(key);
  }

  return expired ? '' : item;
}

export const profileImages = [1, 2, 3, 4, 5];

export interface CardSettings {
  isGrid?: boolean;
  bgColor: string;
  hasButton: boolean;
}

export const cardContext: CardType[] = [
  {
    id: 0,
    title: 'The science of skin color',
    imageUrl: '/images/card-3.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'grammar',
  },
  {
    id: 1,
    title: 'The science of skin color',
    imageUrl: '/images/card-2.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'video',
  },
  {
    id: 2,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 3,
    title: 'The science of skin color',
    imageUrl: '/images/card-3.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'grammar',
  },
  {
    id: 4,
    title: 'The science of skin color',
    imageUrl: '/images/card-2.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'video',
  },
  {
    id: 5,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 6,
    title: 'The science of skin color',
    imageUrl: '/images/card-3.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'grammar',
  },
  {
    id: 7,
    title: 'The science of skin color',
    imageUrl: '/images/card-2.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'video',
  },
  {
    id: 8,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
];

export const resourceCards = [
  {
    id: 0,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 1,
    title: 'The science of skin color',
    imageUrl: '/images/card-2.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 2,
    title: 'The science of skin color',
    imageUrl: '/images/card-3.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 3,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 4,
    title: 'The science of skin color',
    imageUrl: '/images/card-2.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 5,
    title: 'The science of skin color',
    imageUrl: '/images/card-3.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
  {
    id: 6,
    title: 'The science of skin color',
    imageUrl: '/images/card-1.png',
    description: `When ultraviolet sunlight hits our skin, it affects each of us differently. Depending on skin color, it'll take only minutes of exposure to turn one...`,
    href: 'https://www.youtube.com',
    type: 'resources',
  },
];

const grammarScheme = [
  {
    h1: 'main title',
    s1: 'main sub-title',
    h2: 'second title',
    list: 'list of items under the second title',
    h3: 'third title',
    s3: 'third sub-title',
    h4: 'fourth title',
    s4: 'fourth subtitle',
  },
];

const nouns = {
  h1: 'Mastering Nouns in English Grammar',
  s1: `Nouns are fundamental building blocks of English sentences. They represent people, places, things, or ideas, and can be found in almost every sentence you write or say. <br />
    <br /> This guide delves into the different types of nouns and their proper usage, ensuring you understand how to use them effectively in various contexts.`,
  h2: 'Types of Nouns',
  list: [
    'Common Nouns: General names for a person, place, or thing (e.g., "city", "dog").',
    'Proper Nouns: Specific names that are capitalized (e.g., "New York", "Rover").',
    'Abstract Nouns: Names for ideas or concepts that are not tangible (e.g., "freedom", "love").',
    'Concrete Nouns: Names for physical objects that can be perceived by the senses (e.g., "apple", "music").',
    'Countable Nouns: Nouns that can be counted and have both singular and plural forms (e.g., "book/books").',
    'Uncountable Nouns: Nouns that cannot be counted and typically do not have a plural form (e.g., "water", "information").',
    'Collective Nouns: Words that refer to a group of entities (e.g., "team", "flock").',
    'Compound Nouns: Nouns made up of two or more words (e.g., "toothpaste", "mother-in-law").',
  ],
  h3: 'Common Mistakes with Nouns',
  s3: `Misusing common and proper nouns is a frequent mistake in English writing. <br />
    <br /> Another common error involves the use of countable and uncountable nouns, particularly when it comes to using articles or quantifiers. <strong>Always remember</strong> to use appropriate plural forms and possessives for nouns to convey clear meaning in your sentences.`,
  h4: 'Advanced Noun Usage:',
  s4: `In advanced English, understanding the nuances of noun usage is crucial. For example, pluralization rules can vary between regular and irregular nouns. <br />
    <br /> Additionally, mastering possessive forms can help in constructing more precise sentences. <strong>Explore compound nouns</strong> to see how combining words can create new meanings and enrich your vocabulary.`,
};

const verbs = {
  h1: 'Mastering Verbs in English Grammar',
  s1: `Verbs are action words that are crucial in expressing what the subject of a sentence does, experiences, or is. They form the heart of a sentence, indicating actions, states, or occurrences. <br />
    <br /> This guide will help you explore the different types of verbs and their correct usage, enhancing your ability to construct clear and dynamic sentences.`,
  h2: 'Types of Verbs',
  list: [
    'Action Verbs: Words that express physical or mental actions (e.g., "run", "think").',
    'Linking Verbs: Verbs that connect the subject with more information about the subject (e.g., "is", "seem").',
    'Helping (Auxiliary) Verbs: Verbs used with main verbs to indicate tense, mood, or voice (e.g., "have", "do", "can").',
    'Modal Verbs: Auxiliary verbs that express necessity or possibility (e.g., "must", "might").',
    'Transitive Verbs: Verbs that require a direct object to complete their meaning (e.g., "kick", "eat").',
    'Intransitive Verbs: Verbs that do not require a direct object (e.g., "sleep", "arrive").',
    'Regular Verbs: Verbs that form their past tense and past participle by adding "-ed" (e.g., "walk", "talked").',
    'Irregular Verbs: Verbs that do not follow the standard "-ed" rule (e.g., "go", "went", "gone").',
  ],
  h3: 'Common Mistakes with Verbs',
  s3: `A common mistake is using the wrong tense or form of a verb, especially in complex sentences. <br />
    <br /> Misplacing helping verbs or confusing transitive and intransitive verbs can also lead to unclear or incorrect sentences. <strong>Always double-check</strong> verb agreements with their subjects to maintain proper sentence structure.`,
  h4: 'Advanced Verb Usage:',
  s4: `Understanding the subtleties of verb conjugations and the perfect tenses is vital for advanced learners. Additionally, mastering the use of modal verbs can greatly enhance the depth and clarity of your writing. <br />
    <br /> <strong>Explore phrasal verbs</strong> and their idiomatic meanings to further expand your grasp of English verbs.`,
};

const adjectives = {
  h1: 'Mastering Adjectives in English Grammar',
  s1: `Adjectives are descriptive words that modify nouns or pronouns, providing additional detail and clarity to sentences. They help paint a more vivid picture by specifying characteristics, quantities, or qualities. <br />
    <br /> This guide will cover the different types of adjectives and how to use them effectively to enrich your communication.`,
  h2: 'Types of Adjectives',
  list: [
    'Descriptive Adjectives: Words that describe the qualities or states of being of nouns (e.g., "happy", "blue").',
    'Quantitative Adjectives: Adjectives that indicate quantity (e.g., "some", "many", "few").',
    'Demonstrative Adjectives: Words that point out specific nouns (e.g., "this", "that", "these", "those").',
    'Possessive Adjectives: Adjectives that show ownership or possession (e.g., "my", "your", "his", "her").',
    'Interrogative Adjectives: Used to ask questions about nouns (e.g., "which", "what").',
    'Comparative Adjectives: Used to compare two things (e.g., "bigger", "smarter").',
    'Superlative Adjectives: Used to describe the highest degree of something (e.g., "biggest", "smartest").',
    'Proper Adjectives: Adjectives derived from proper nouns (e.g., "American", "Shakespearean").',
  ],
  h3: 'Common Mistakes with Adjectives',
  s3: `One common mistake is the improper use of comparative and superlative adjectives, especially when following irregular forms. <br />
    <br /> Another error involves the incorrect placement of adjectives, which can change the meaning of a sentence. <strong>Ensure adjectives</strong> are correctly placed and agree with the nouns they modify.`,
  h4: 'Advanced Adjective Usage:',
  s4: `In advanced grammar, understanding the order of adjectives when multiple are used together is crucial. Additionally, mastering the subtle differences between gradable and non-gradable adjectives can enhance the precision of your descriptions. <br />
    <br /> <strong>Explore compound adjectives</strong> to create more detailed and nuanced expressions in your writing.`,
};

const adverbs = {
  h1: 'Understanding Adverbs in English Grammar',
  s1: `Adverbs are versatile words that modify verbs, adjectives, or other adverbs, providing more information about how, when, where, or to what extent something happens. <br />
    <br /> This guide explores the various types of adverbs and how they can enhance your sentences by adding depth and detail.`,
  h2: 'Types of Adverbs',
  list: [
    'Adverbs of Manner: Describe how something is done (e.g., "quickly", "carefully").',
    'Adverbs of Time: Indicate when something happens (e.g., "now", "yesterday").',
    'Adverbs of Place: Describe where something happens (e.g., "here", "everywhere").',
    'Adverbs of Frequency: Indicate how often something happens (e.g., "always", "sometimes").',
    'Adverbs of Degree: Describe the intensity or degree of an action (e.g., "very", "extremely").',
    'Interrogative Adverbs: Used to ask questions (e.g., "how", "when", "why").',
    'Relative Adverbs: Used to connect clauses or sentences (e.g., "where", "when", "why").',
    'Conjunctive Adverbs: Join two independent clauses (e.g., "however", "therefore").',
  ],
  h3: 'Common Mistakes with Adverbs',
  s3: `A frequent mistake is the overuse of adverbs, which can make writing seem cluttered or redundant. <br />
    <br /> Another issue is the improper placement of adverbs, which can lead to ambiguity or awkward sentence structure. <strong>Ensure adverbs</strong> are placed correctly to maintain clarity and flow.`,
  h4: 'Advanced Adverb Usage:',
  s4: `In more advanced English, understanding the subtle differences between similar adverbs and their appropriate contexts can significantly improve your writing. Additionally, learning to use adverbial phrases can help in creating more nuanced sentences. <br />
    <br /> <strong>Master adverb placement</strong> to control emphasis and pacing in your writing.`,
};

const pronouns = {
  h1: 'Mastering Pronouns in English Grammar',
  s1: `Pronouns are essential words used to replace nouns and avoid repetition, making sentences clearer and more concise. They help streamline communication and can refer to people, objects, places, or ideas. <br />
    <br /> This guide covers the various types of pronouns and their proper usage, ensuring you use them effectively in your writing.`,
  h2: 'Types of Pronouns',
  list: [
    'Personal Pronouns: Refer to specific people or things (e.g., "I", "you", "he", "she", "it").',
    'Possessive Pronouns: Indicate ownership or possession (e.g., "mine", "yours", "his", "hers").',
    'Reflexive Pronouns: Refer back to the subject of the sentence (e.g., "myself", "yourself", "themselves").',
    'Relative Pronouns: Introduce relative clauses and link them to a noun (e.g., "who", "which", "that").',
    'Demonstrative Pronouns: Point out specific things (e.g., "this", "that", "these", "those").',
    'Indefinite Pronouns: Refer to non-specific people or things (e.g., "someone", "anything", "nobody").',
    'Interrogative Pronouns: Used to ask questions (e.g., "who", "what", "which").',
    'Reciprocal Pronouns: Indicate a mutual relationship (e.g., "each other", "one another").',
  ],
  h3: 'Common Mistakes with Pronouns',
  s3: `A common mistake is the incorrect use of pronouns, especially when it comes to pronoun-antecedent agreement. <br />
    <br /> Another frequent issue is using vague or ambiguous pronouns that can confuse the reader. <strong>Always ensure</strong> that pronouns clearly refer to the correct nouns to maintain clarity in your writing.`,
  h4: 'Advanced Pronoun Usage:',
  s4: `In more advanced grammar, pronouns can be used to add sophistication to your writing by varying sentence structure and avoiding repetition. Understanding pronoun case and consistency is crucial for accuracy. <br />
    <br /> <strong>Explore the nuanced use</strong> of reflexive and indefinite pronouns to add depth and precision to your sentences.`,
};

const conjunctions = {
  h1: 'Mastering Conjunctions in English Grammar',
  s1: `Conjunctions are words that connect clauses, sentences, or words, allowing for more complex and fluid sentence structures. They are crucial for creating relationships between ideas and enhancing the coherence of your writing. <br />
    <br /> This guide explores different types of conjunctions and their proper usage in English.`,
  h2: 'Types of Conjunctions',
  list: [
    'Coordinating Conjunctions: Join words, phrases, or clauses of equal importance (e.g., "and", "but", "or", "nor", "for", "yet", "so").',
    'Subordinating Conjunctions: Connect a dependent clause to an independent clause, showing the relationship between them (e.g., "because", "although", "since", "unless").',
    'Correlative Conjunctions: Paired conjunctions that work together to connect equal elements in a sentence (e.g., "either...or", "neither...nor", "both...and").',
    'Conjunctive Adverbs: Link independent clauses together, showing cause and effect, contrast, or other relationships (e.g., "however", "therefore", "moreover").',
  ],
  h3: 'Common Mistakes with Conjunctions',
  s3: `One common mistake is misusing coordinating conjunctions, especially in compound sentences, which can lead to run-on sentences or comma splices. <br />
    <br /> Another frequent issue is the improper use of subordinating conjunctions, which can cause confusion in complex sentences. <strong>Ensure you understand</strong> the relationship between the clauses to use conjunctions correctly.`,
  h4: 'Advanced Conjunction Usage:',
  s4: `In advanced English, conjunctions are used to create sophisticated sentence structures that enhance clarity and style. Understanding how to vary conjunction usage can improve the flow of your writing. <br />
    <br /> <strong>Explore conjunctive adverbs</strong> to add emphasis and nuance to your sentences, and master the use of correlative conjunctions for balanced sentence construction.`,
};

const prepositions = {
  h1: 'Understanding Prepositions in English Grammar',
  s1: `Prepositions are essential words in English that show relationships between other words in a sentence, typically indicating direction, place, time, or method. They are often small words, but they carry a significant impact on the meaning of a sentence. <br />
    <br /> This guide provides a comprehensive overview of prepositions, their types, and how to use them effectively.`,
  h2: 'Types of Prepositions',
  list: [
    'Prepositions of Place: Indicate the location or position of something (e.g., "in", "on", "at", "under").',
    'Prepositions of Time: Describe when something happens (e.g., "before", "after", "during", "at").',
    'Prepositions of Direction: Show movement toward or away from something (e.g., "to", "from", "into", "over").',
    'Prepositions of Method: Explain how something is done (e.g., "by", "with", "via").',
    'Prepositions of Agent: Indicate who or what caused something to happen (e.g., "by").',
    'Prepositions of Instrument: Refer to the tool or means by which something is done (e.g., "with", "by").',
  ],
  h3: 'Common Mistakes with Prepositions',
  s3: `Prepositions are often misused, particularly when translating from other languages, as prepositional usage can vary widely across languages. <br />
    <br /> Another common error is using incorrect prepositions in fixed expressions or phrasal verbs, which can change the meaning of a sentence. <strong>Practice and familiarity</strong> with common phrases and contexts can help avoid these mistakes.`,
  h4: 'Advanced Preposition Usage:',
  s4: `In advanced English, prepositions are used to create more complex and nuanced sentences. Mastering prepositions in idiomatic expressions and phrasal verbs can significantly enhance your fluency. <br />
    <br /> <strong>Explore compound prepositions</strong> and prepositional phrases to add depth and clarity to your writing, and understand how prepositions can alter the meaning of verbs and adjectives.`,
};

const interjections = {
  h1: 'Exploring Interjections in English Grammar',
  s1: `Interjections are words or phrases that express strong emotion or sudden exclamations. They are unique in that they do not fit neatly into other parts of speech and are often used to convey feelings or reactions. <br />
    <br /> This guide delves into the role of interjections in English, their types, and how they can be used effectively in communication.`,
  h2: 'Types of Interjections',
  list: [
    'Emotional Interjections: Express feelings like joy, surprise, or frustration (e.g., "Wow!", "Ouch!", "Hooray!").',
    'Greeting Interjections: Used to greet or address someone (e.g., "Hello!", "Hi!", "Hey!").',
    'Attention-getting Interjections: Used to capture someone\'s attention (e.g., "Listen!", "Look!").',
    'Filler Interjections: Used to fill pauses in speech or add emphasis (e.g., "Um", "Ah", "Well").',
    'Interjections of Disgust or Annoyance: Convey displeasure or discomfort (e.g., "Ugh!", "Yuck!").',
  ],
  h3: 'Common Mistakes with Interjections',
  s3: `Interjections are often overused or misused, particularly when trying to convey emotions in writing. <br />
    <br /> A common mistake is placing interjections improperly in sentences or using them too frequently, which can disrupt the flow of the text. <strong>Use interjections sparingly</strong> and appropriately to maintain effective communication.`,
  h4: 'Advanced Interjection Usage:',
  s4: `Advanced usage of interjections involves understanding their impact on tone and style. <br />
    <br /> <strong>Explore how interjections can add personality</strong> and emphasis to dialogue, particularly in creative writing and informal contexts. Understanding their role can enhance expressiveness and engagement in your writing.`,
};

const sentenceStructure = {
  h1: 'Mastering Sentence Structure in English',
  s1: `Sentence structure is the foundation of clear and effective communication. Understanding how to construct sentences properly can greatly improve your writing and speaking skills. <br />
    <br /> This guide explores the different types of sentence structures, their components, and how to use them to create well-formed and impactful sentences.`,
  h2: 'Types of Sentence Structures',
  list: [
    'Simple Sentences: Contain a single independent clause with a subject and predicate (e.g., "The cat sleeps.").',
    'Compound Sentences: Combine two or more independent clauses using coordinating conjunctions (e.g., "I wanted to go for a walk, but it started raining.").',
    'Complex Sentences: Include one independent clause and at least one dependent clause (e.g., "Although it was raining, I went for a walk.").',
    'Compound-Complex Sentences: Feature multiple independent clauses and at least one dependent clause (e.g., "I went for a walk because it was sunny, and I enjoyed the fresh air.").',
    'Declarative Sentences: Make a statement and end with a period (e.g., "She enjoys reading books.").',
    'Interrogative Sentences: Ask a question and end with a question mark (e.g., "Do you like reading books?").',
    'Imperative Sentences: Give a command or request and usually end with a period or exclamation mark (e.g., "Please close the door.").',
    'Exclamatory Sentences: Express strong emotions and end with an exclamation mark (e.g., "What a beautiful sunset!").',
  ],
  h3: 'Common Mistakes with Sentence Structure',
  s3: `Common errors in sentence structure include run-on sentences, sentence fragments, and misplaced modifiers. <br />
    <br /> <strong>Run-on sentences</strong> occur when two independent clauses are joined without proper punctuation or conjunctions. <strong>Sentence fragments</strong> are incomplete sentences that lack a main clause. <strong>Misplaced modifiers</strong> lead to confusion about what is being described.`,
  h4: 'Advanced Sentence Structure Techniques:',
  s4: `To enhance your writing, focus on using varied sentence structures to add complexity and interest. <br />
    <br /> <strong>Experiment with different sentence lengths and types</strong> to achieve a balanced and engaging style. Understanding advanced structures like parallelism and subordination can help you craft more sophisticated and nuanced sentences.`,
};

const verbTenses = {
  h1: 'Understanding Verb Tenses in English',
  s1: `Verb tenses are essential for indicating the time of an action or event in English. Mastering tenses allows you to communicate more clearly and accurately. <br />
    <br /> This guide provides a comprehensive overview of the different verb tenses, their forms, and how to use them effectively in various contexts.`,
  h2: 'Main Types of Verb Tenses',
  list: [
    'Present Simple: Describes habitual actions or general truths (e.g., "She writes every day.").',
    'Present Continuous: Indicates actions happening right now or around the present time (e.g., "She is writing now.").',
    'Present Perfect: Refers to actions that have occurred at an unspecified time before now (e.g., "She has written several books.").',
    'Present Perfect Continuous: Highlights actions that started in the past and are still continuing or recently finished (e.g., "She has been writing for two hours.").',
    'Past Simple: Describes actions that were completed in the past (e.g., "She wrote yesterday.").',
    'Past Continuous: Indicates actions that were ongoing at a specific time in the past (e.g., "She was writing when I called.").',
    'Past Perfect: Refers to actions that were completed before another action in the past (e.g., "She had written the letter before I arrived.").',
    'Past Perfect Continuous: Highlights actions that were ongoing in the past up to a certain point (e.g., "She had been writing for two hours before I arrived.").',
    'Future Simple: Describes actions that will happen in the future (e.g., "She will write tomorrow.").',
    'Future Continuous: Indicates actions that will be ongoing at a specific time in the future (e.g., "She will be writing when I arrive.").',
    'Future Perfect: Refers to actions that will be completed before another action or time in the future (e.g., "She will have written the report by tomorrow.").',
    'Future Perfect Continuous: Highlights actions that will be ongoing up to a specific point in the future (e.g., "She will have been writing for two hours by the time you arrive.").',
  ],
  h3: 'Common Mistakes with Verb Tenses',
  s3: `Misusing verb tenses can lead to confusion about the timing and nature of actions. <br />
    <br /> <strong>Common errors</strong> include mixing tenses incorrectly, using the wrong tense for the time of action, and forgetting to maintain tense consistency within sentences. Always ensure that your tense usage aligns with the time frame you are describing.`,
  h4: 'Advanced Verb Tense Usage:',
  s4: `For more nuanced writing, understanding <strong>perfect tenses</strong> and <strong>continuous tenses</strong> is crucial. <br />
    <br /> Explore how combining different tenses can create more complex sentence structures and convey precise timing and duration. Mastering these tenses will enhance your ability to express detailed and sophisticated ideas.`,
};

const modalsAndAuxiliaries = {
  h1: 'Understanding Modals and Auxiliaries in English',
  s1: `Modals and auxiliaries are crucial components of English grammar that help express mood, ability, necessity, and other nuances in communication. <br />
    <br /> This guide explores the different types of modals and auxiliaries, their uses, and how they can affect the meaning of sentences.`,
  h2: 'Types of Modals and Auxiliaries',
  list: [
    'Modals of Ability: Indicate capability or possibility (e.g., "can", "could").',
    'Modals of Permission: Express whether something is allowed (e.g., "may", "might").',
    'Modals of Obligation: Show necessity or duty (e.g., "must", "should").',
    'Modals of Prohibition: Denote what is not allowed (e.g., "cannot", "must not").',
    'Modals of Advice: Offer suggestions or recommendations (e.g., "should", "ought to").',
    'Auxiliary Verbs: Help form different tenses, questions, and negatives (e.g., "be", "have", "do").',
    'Perfect Modals: Combine with perfect tenses to express past actions (e.g., "might have", "should have").',
    'Continuous Modals: Indicate ongoing actions with modals (e.g., "could be", "might be").',
  ],
  h3: 'Common Mistakes with Modals and Auxiliaries',
  s3: `Errors with modals and auxiliaries often involve incorrect use or misinterpretation of meaning. <br />
    <br /> <strong>Common mistakes</strong> include mixing up similar modals, using incorrect forms of auxiliary verbs, and confusing modals with their associated meanings. Ensure clarity by understanding the specific function of each modal or auxiliary.`,
  h4: 'Advanced Usage of Modals and Auxiliaries:',
  s4: `Mastering advanced usage involves understanding <strong>subtle differences</strong> between modals and their effects on meaning. <br />
    <br /> Explore how different modals can change the tone of your statements and how auxiliary verbs can be used to create complex sentence structures, including passive voice and conditional sentences.`,
};

const activeAndPassiveVoice = {
  h1: 'Understanding Active and Passive Voice',
  s1: `Active and passive voices are essential aspects of sentence construction in English. <br />
    <br /> This guide covers how to use active and passive voice effectively, the differences between them, and their impact on the focus and clarity of your sentences.`,
  h2: 'Active Voice vs. Passive Voice',
  list: [
    'Active Voice: The subject performs the action of the verb (e.g., "The chef cooked the meal").',
    'Passive Voice: The subject receives the action of the verb (e.g., "The meal was cooked by the chef").',
    'Formation of Passive Voice: Use the verb "to be" + past participle of the main verb (e.g., "is eaten", "was written").',
    'Usage in Writing: Active voice is often preferred for its clarity and directness, while passive voice can be used to emphasize the action or the receiver of the action.',
    'Transforming Sentences: Convert active voice to passive voice by changing the object of the active sentence to the subject of the passive sentence.',
    'Avoiding Overuse: While passive voice can be useful, excessive use may lead to less engaging or harder-to-follow writing.',
  ],
  h3: 'Common Mistakes with Voice',
  s3: `Errors often involve incorrect or awkward use of passive voice. <br />
    <br /> <strong>Common issues</strong> include creating overly complex sentences and failing to clearly state the actor in passive constructions. Ensure that passive voice is used appropriately to maintain clarity and readability in your writing.`,
  h4: 'Advanced Voice Usage:',
  s4: `Understanding advanced usage involves recognizing when passive voice is more effective for emphasizing certain parts of a sentence. <br />
    <br /> Explore how shifting between active and passive voice can change the focus of your writing and how to balance their usage for varied and engaging prose.`,
};

const conditionalSentences = {
  h1: 'Mastering Conditional Sentences',
  s1: `Conditional sentences express hypothetical situations and their possible outcomes. <br />
    <br /> Understanding the different types of conditional sentences helps in forming clear and precise statements about what might happen under certain conditions.`,
  h2: 'Types of Conditional Sentences',
  list: [
    'Zero Conditional: Used for general truths or scientific facts (e.g., "If you heat ice, it melts").',
    'First Conditional: Used for real and possible situations in the future (e.g., "If it rains, we will cancel the picnic").',
    'Second Conditional: Used for hypothetical or unlikely situations in the present or future (e.g., "If I won the lottery, I would travel the world").',
    'Third Conditional: Used for hypothetical situations in the past (e.g., "If I had studied harder, I would have passed the exam").',
    'Mixed Conditionals: Combine different times in conditional sentences (e.g., "If I had studied harder, I would be successful now").',
  ],
  h3: 'Common Mistakes with Conditionals',
  s3: `Errors often include mixing up the tenses or using incorrect forms of the verb. <br />
    <br /> <strong>Ensure correct tense usage</strong> in each type of conditional to accurately convey the intended meaning. Pay attention to verb forms and the correct use of "if" and "would".`,
  h4: 'Advanced Conditional Usage:',
  s4: `Advanced use of conditionals involves understanding subtle differences in meaning and formality. <br />
    <br /> Explore how mixed conditionals can reflect complex relationships between past actions and present situations, and how to use conditional sentences to express nuanced hypothetical scenarios.`,
};

const articles = {
  h1: 'Understanding Articles in English Grammar',
  s1: `Articles are used to define nouns and can provide clarity and specificity in sentences. <br />
    <br /> There are two types of articles in English: definite and indefinite. Mastering their usage will enhance your writing and speaking by helping you convey precise meanings.`,
  h2: 'Types of Articles',
  list: [
    'Definite Article: "The" is used to refer to a specific noun that is known to both the speaker and the listener (e.g., "the book on the table").',
    'Indefinite Articles: "A" and "an" are used to refer to non-specific nouns or when mentioning something for the first time (e.g., "a cat" or "an apple").',
    'Zero Article: Sometimes no article is used, particularly with plural and uncountable nouns when referring to general concepts (e.g., "Cats are friendly", "Information is power").',
  ],
  h3: 'Common Mistakes with Articles',
  s3: `Common errors include using the wrong article or omitting an article when one is needed. <br />
    <br /> <strong>Always check</strong> if the noun is specific or general to choose between "the" and "a/an". Remember that some nouns do not require an article, especially with general plural and uncountable nouns.`,
  h4: 'Advanced Article Usage:',
  s4: `Advanced usage involves understanding subtle rules and exceptions, such as when to use articles with abstract nouns or geographic names. <br />
    <br /> Explore how different contexts can affect article usage and how mastering these nuances can improve your fluency and precision in English.`,
};

const phrasalVerbs = {
  h1: 'Mastering Phrasal Verbs in English Grammar',
  s1: `Phrasal verbs are expressions that combine a verb with a preposition or adverb to create a new meaning. They are common in everyday English and can significantly impact the meaning of a sentence. <br />
    <br /> Understanding and using phrasal verbs correctly will enhance your fluency and comprehension in both spoken and written English.`,
  h2: 'Types of Phrasal Verbs',
  list: [
    'Transitive Phrasal Verbs: These require a direct object to complete their meaning (e.g., "give up" in "He gave up smoking").',
    'Intransitive Phrasal Verbs: These do not require a direct object and are complete on their own (e.g., "wake up" in "I wake up early").',
    'Separable Phrasal Verbs: The verb and the particle can be separated by the object (e.g., "turn off the light" or "turn the light off").',
    'Inseparable Phrasal Verbs: The verb and the particle cannot be separated (e.g., "run into" in "She ran into an old friend").',
  ],
  h3: 'Common Mistakes with Phrasal Verbs',
  s3: `A common mistake is using the wrong particle or misplacing it in a sentence. <br />
    <br /> <strong>Practice</strong> to ensure that you use the correct particle and understand whether the phrasal verb is separable or inseparable. Pay attention to the context in which these verbs are used to avoid confusion.`,
  h4: 'Advanced Phrasal Verbs Usage:',
  s4: `Advanced usage involves mastering idiomatic phrasal verbs that may not follow standard rules. For example, understanding the nuanced differences between similar phrasal verbs can greatly improve your proficiency. <br />
    <br /> Explore various contexts and practice using phrasal verbs in different situations to deepen your understanding and enhance your fluency.`,
};

const gerundInfinitive = {
  h1: 'Understanding Gerunds and Infinitives in English Grammar',
  s1: `Gerunds and infinitives are verb forms that can function as nouns in sentences. Understanding when to use each form can be challenging but is crucial for mastering English grammar. <br />
    <br /> This guide will help you differentiate between gerunds and infinitives and use them correctly in various contexts.`,
  h2: 'Gerunds vs. Infinitives',
  list: [
    'Gerunds: The -ing form of a verb used as a noun (e.g., "Reading is fun").',
    'Infinitives: The base form of a verb preceded by "to" (e.g., "To read is enjoyable").',
    'Certain verbs are followed by gerunds (e.g., "enjoy", "avoid"), while others are followed by infinitives (e.g., "want", "need").',
    'Some verbs can be followed by either gerunds or infinitives, with a change in meaning (e.g., "stop smoking" vs. "stop to smoke").',
  ],
  h3: 'Common Mistakes with Gerunds and Infinitives',
  s3: `Confusing gerunds with infinitives is a frequent error. <br />
    <br /> <strong>Always</strong> check the verb that precedes them to ensure you use the correct form. Practice identifying which verbs are followed by gerunds or infinitives to avoid mistakes.`,
  h4: 'Advanced Usage of Gerunds and Infinitives:',
  s4: `Advanced usage involves understanding nuanced differences and specific cases where gerunds and infinitives are used. For instance, gerunds can function as subjects or objects, while infinitives often express purpose. <br />
    <br /> Explore various examples and contexts to refine your understanding and enhance your grammatical accuracy.`,
};

const commonGrammarMistakes = {
  h1: 'Common Grammar Mistakes in English',
  s1: `Even native speakers make grammar mistakes from time to time. Recognizing and correcting these errors can significantly improve your writing and speaking skills. <br />
    <br /> This guide outlines some of the most frequent grammar mistakes and offers tips for avoiding them.`,
  h2: 'Frequent Grammar Errors',
  list: [
    'Subject-Verb Agreement: Ensuring that subjects and verbs agree in number (e.g., "He go" vs. "He goes").',
    'Incorrect Use of Tenses: Mixing up past, present, and future tenses improperly (e.g., "I have went" vs. "I have gone").',
    'Misplaced Modifiers: Placing descriptive words or phrases incorrectly (e.g., "She almost drove her kids to school every day" vs. "She drove her kids to school almost every day").',
    'Run-On Sentences: Combining multiple sentences without proper punctuation or conjunctions (e.g., "I like coffee I like tea" vs. "I like coffee, and I like tea").',
    'Fragmented Sentences: Incomplete sentences that lack a main clause (e.g., "While I was walking" without a main clause).',
    'Confusing Homophones: Using words that sound the same but have different meanings (e.g., "their" vs. "there" vs. "they’re").',
    'Incorrect Apostrophe Usage: Misusing apostrophes for possession or contractions (e.g., "It’s time to get the dogs toy" vs. "It’s time to get the dog’s toy").',
    'Overusing Commas: Placing commas unnecessarily or incorrectly (e.g., "She went to the store, and bought milk" vs. "She went to the store and bought milk").',
  ],
  h3: 'Tips for Avoiding Common Mistakes',
  s3: `Proofreading your work carefully can help identify and correct common errors. <br />
    <br /> <strong>Regular practice</strong> and reading can also enhance your understanding of proper grammar usage. Tools like grammar checkers can provide additional assistance but always review their suggestions critically.`,
  h4: 'Resources for Improvement:',
  s4: `Consider using grammar guides, online exercises, and educational apps to further improve your grammar skills. <br />
    <br /> Engaging with educational content and seeking feedback from others can also help you refine your grammar and writing abilities.`,
};
