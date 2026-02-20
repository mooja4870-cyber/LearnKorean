// Greetings & Essential Phrases Data — Unit 4
import { HangulCharacter } from './hangulData';

export interface PhraseItem {
    korean: string;
    romanization: string;
    meaning_en: string;
    meaning_ja: string;
    usage_en: string;
    category: 'greeting' | 'thanking' | 'apology' | 'farewell' | 'essential';
    audioURL?: string;
}

export const greetingsPhrases: PhraseItem[] = [
    // Greetings
    {
        korean: '안녕하세요',
        romanization: 'annyeonghaseyo',
        meaning_en: 'Hello (formal)',
        meaning_ja: 'こんにちは（丁寧）',
        usage_en: 'The most common greeting. Use in any formal or polite situation.',
        category: 'greeting',
    },
    {
        korean: '안녕',
        romanization: 'annyeong',
        meaning_en: 'Hi / Bye (casual)',
        meaning_ja: 'やあ / じゃあね（カジュアル）',
        usage_en: 'Casual greeting among friends. Also used as a casual goodbye.',
        category: 'greeting',
    },
    {
        korean: '처음 뵙겠습니다',
        romanization: 'cheoeum boepgesseumnida',
        meaning_en: 'Nice to meet you (very formal)',
        meaning_ja: '初めまして（とても丁寧）',
        usage_en: 'Used when meeting someone for the first time in formal settings.',
        category: 'greeting',
    },
    {
        korean: '만나서 반갑습니다',
        romanization: 'mannaseo bangapseumnida',
        meaning_en: 'Nice to meet you',
        meaning_ja: 'お会いできて嬉しいです',
        usage_en: 'Polite expression when meeting new people.',
        category: 'greeting',
    },
    // Thanking
    {
        korean: '감사합니다',
        romanization: 'gamsahamnida',
        meaning_en: 'Thank you (formal)',
        meaning_ja: 'ありがとうございます',
        usage_en: 'Formal thank you. Most commonly used in daily life.',
        category: 'thanking',
    },
    {
        korean: '고마워요',
        romanization: 'gomawoyo',
        meaning_en: 'Thank you (polite casual)',
        meaning_ja: 'ありがとう（丁寧カジュアル）',
        usage_en: 'Slightly less formal but still polite.',
        category: 'thanking',
    },
    {
        korean: '고마워',
        romanization: 'gomawo',
        meaning_en: 'Thanks (casual)',
        meaning_ja: 'ありがとう（カジュアル）',
        usage_en: 'Casual thanks among close friends.',
        category: 'thanking',
    },
    // Apology
    {
        korean: '죄송합니다',
        romanization: 'joesonghamnida',
        meaning_en: 'I\'m sorry (formal)',
        meaning_ja: '申し訳ございません',
        usage_en: 'Formal apology. Use with elders or in professional settings.',
        category: 'apology',
    },
    {
        korean: '미안해요',
        romanization: 'mianhaeyo',
        meaning_en: 'Sorry (polite)',
        meaning_ja: 'すみません',
        usage_en: 'Polite apology in everyday situations.',
        category: 'apology',
    },
    {
        korean: '실례합니다',
        romanization: 'sillyehamnida',
        meaning_en: 'Excuse me',
        meaning_ja: '失礼します',
        usage_en: 'Used when interrupting or passing by someone.',
        category: 'apology',
    },
    // Farewell
    {
        korean: '안녕히 가세요',
        romanization: 'annyeonghi gaseyo',
        meaning_en: 'Goodbye (to person leaving)',
        meaning_ja: 'さようなら（去る人へ）',
        usage_en: 'Said to someone who is leaving (you stay).',
        category: 'farewell',
    },
    {
        korean: '안녕히 계세요',
        romanization: 'annyeonghi gyeseyo',
        meaning_en: 'Goodbye (to person staying)',
        meaning_ja: 'さようなら（残る人へ）',
        usage_en: 'Said to someone who is staying (you leave).',
        category: 'farewell',
    },
    {
        korean: '또 만나요',
        romanization: 'tto mannayo',
        meaning_en: 'See you again',
        meaning_ja: 'また会いましょう',
        usage_en: 'Friendly way to say "see you later".',
        category: 'farewell',
    },
    // Essential
    {
        korean: '네 / 예',
        romanization: 'ne / ye',
        meaning_en: 'Yes',
        meaning_ja: 'はい',
        usage_en: 'Both mean "yes." 예 is slightly more formal.',
        category: 'essential',
    },
    {
        korean: '아니요',
        romanization: 'aniyo',
        meaning_en: 'No',
        meaning_ja: 'いいえ',
        usage_en: 'Polite way to say no.',
        category: 'essential',
    },
    {
        korean: '잠시만요',
        romanization: 'jamsimaneyo',
        meaning_en: 'Just a moment, please',
        meaning_ja: '少々お待ちください',
        usage_en: 'Ask someone to wait a moment.',
        category: 'essential',
    },
    {
        korean: '수고하셨습니다',
        romanization: 'sugohasyeosseumnida',
        meaning_en: 'Good work / Well done',
        meaning_ja: 'お疲れ様でした',
        usage_en: 'Said after work or when someone finishes a task. Very Korean!',
        category: 'essential',
    },
    {
        korean: '잘 먹겠습니다',
        romanization: 'jal meokgesseumnida',
        meaning_en: 'I will eat well (before eating)',
        meaning_ja: 'いただきます',
        usage_en: 'Said before eating. Shows gratitude for the meal.',
        category: 'essential',
    },
    {
        korean: '잘 먹었습니다',
        romanization: 'jal meogeosseumnida',
        meaning_en: 'I ate well (after eating)',
        meaning_ja: 'ごちそうさまでした',
        usage_en: 'Said after eating. Shows appreciation.',
        category: 'essential',
    },
    {
        korean: '사랑해요',
        romanization: 'saranghaeyo',
        meaning_en: 'I love you',
        meaning_ja: '愛してます',
        usage_en: 'Polite way to express love. Very popular in K-dramas!',
        category: 'essential',
    },
];

// Convert to HangulCharacter-like for lesson card compatibility
export function greetingsToLessonChars(): HangulCharacter[] {
    return greetingsPhrases.map(p => ({
        char: p.korean,
        romanization: p.romanization,
        pronunciation_en: p.meaning_en,
        pronunciation_ja: p.meaning_ja,
        exampleWord: p.korean,
        exampleMeaning_en: p.usage_en,
        exampleMeaning_ja: p.meaning_ja,
        mnemonicHint_en: `Category: ${p.category}`,
    }));
}
