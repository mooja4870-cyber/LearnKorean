// Antigravity - Hangul Learning Data
// Complete data for Korean vowels and consonants
import { greetingsToLessonChars } from './greetingsData';
import { nativeNumbersToLessonChars, sinoNumbersToLessonChars } from './numbersData';

export interface HangulCharacter {
    char: string;
    romanization: string;
    pronunciation_en: string;
    pronunciation_ja: string;
    exampleWord: string;
    exampleMeaning_en: string;
    exampleMeaning_ja: string;
    mnemonicHint_en: string;
    audioURL?: string;
    strokeOrder?: string;
}

export interface HangulLesson {
    lessonId: string;
    type: 'vowel' | 'consonant';
    category: 'basic' | 'double' | 'complex';
    order: number;
    title_en: string;
    title_ja: string;
    characters: HangulCharacter[];
    isLocked: boolean;
}

export interface QuizQuestion {
    questionId: string;
    questionType: 'charToSound' | 'soundToChar' | 'matching';
    displayChar?: string;
    displaySound?: string;
    options: string[];
    correctAnswer: string;
    explanation_en: string;
    explanation_ja: string;
    xpReward: number;
}

export interface Quiz {
    quizId: string;
    relatedLesson: string;
    title_en: string;
    title_ja: string;
    type: 'hangul';
    difficulty: number;
    questions: QuizQuestion[];
    isLocked: boolean;
}

// ===== BASIC VOWELS =====
export const basicVowels: HangulCharacter[] = [
    {
        char: 'ㅏ', romanization: 'a',
        pronunciation_en: '"ah" as in "father"',
        pronunciation_ja: '「あ」の音',
        exampleWord: '아이', exampleMeaning_en: 'child', exampleMeaning_ja: '子供',
        mnemonicHint_en: 'A vertical line with a stroke to the right — like opening your mouth wide: "Ahhh!"',
    },
    {
        char: 'ㅓ', romanization: 'eo',
        pronunciation_en: '"uh" as in "bus"',
        pronunciation_ja: '「お」に近い音',
        exampleWord: '어머니', exampleMeaning_en: 'mother', exampleMeaning_ja: 'お母さん',
        mnemonicHint_en: 'Stroke to the left — your mouth is less open, like saying "uh"',
    },
    {
        char: 'ㅗ', romanization: 'o',
        pronunciation_en: '"oh" as in "go"',
        pronunciation_ja: '「お」の音',
        exampleWord: '오리', exampleMeaning_en: 'duck', exampleMeaning_ja: 'アヒル',
        mnemonicHint_en: 'Stroke pointing up — your lips round up to say "oh!"',
    },
    {
        char: 'ㅜ', romanization: 'u',
        pronunciation_en: '"oo" as in "moon"',
        pronunciation_ja: '「う」の音',
        exampleWord: '우유', exampleMeaning_en: 'milk', exampleMeaning_ja: '牛乳',
        mnemonicHint_en: 'Stroke pointing down — like a raindrop falling: "oooo"',
    },
    {
        char: 'ㅡ', romanization: 'eu',
        pronunciation_en: '"uh" — between "oo" and "ee", no lip rounding',
        pronunciation_ja: '口を横に引いた「う」',
        exampleWord: '으리', exampleMeaning_en: 'dignity', exampleMeaning_ja: '威厳',
        mnemonicHint_en: 'A flat horizontal line — keep your mouth flat and say "uh"',
    },
    {
        char: 'ㅣ', romanization: 'i',
        pronunciation_en: '"ee" as in "see"',
        pronunciation_ja: '「い」の音',
        exampleWord: '이름', exampleMeaning_en: 'name', exampleMeaning_ja: '名前',
        mnemonicHint_en: 'A vertical line — thin like the "ee" sound!',
    },
];

// ===== BASIC CONSONANTS 1 =====
export const basicConsonants1: HangulCharacter[] = [
    {
        char: 'ㄱ', romanization: 'g/k',
        pronunciation_en: '"g" as in "go" (beginning) or "k" (end)',
        pronunciation_ja: '「か」行の子音',
        exampleWord: '가방', exampleMeaning_en: 'bag', exampleMeaning_ja: 'かばん',
        mnemonicHint_en: 'Looks like a gun — "G" for Gun!',
    },
    {
        char: 'ㄴ', romanization: 'n',
        pronunciation_en: '"n" as in "nose"',
        pronunciation_ja: '「な」行の子音',
        exampleWord: '나비', exampleMeaning_en: 'butterfly', exampleMeaning_ja: '蝶',
        mnemonicHint_en: 'Looks like a nose in profile — "N" for Nose!',
    },
    {
        char: 'ㄷ', romanization: 'd/t',
        pronunciation_en: '"d" as in "door" or "t" at the end',
        pronunciation_ja: '「た」行の子音',
        exampleWord: '다리', exampleMeaning_en: 'leg/bridge', exampleMeaning_ja: '足/橋',
        mnemonicHint_en: 'Looks like a door frame — "D" for Door!',
    },
    {
        char: 'ㄹ', romanization: 'r/l',
        pronunciation_en: 'Between "r" and "l" — tongue flap',
        pronunciation_ja: '「ら」行の子音（舌先ではじく）',
        exampleWord: '라면', exampleMeaning_en: 'ramen', exampleMeaning_ja: 'ラーメン',
        mnemonicHint_en: 'Curvy like a rattlesnake — "R/L" sound!',
    },
    {
        char: 'ㅁ', romanization: 'm',
        pronunciation_en: '"m" as in "mom"',
        pronunciation_ja: '「ま」行の子音',
        exampleWord: '마음', exampleMeaning_en: 'heart/mind', exampleMeaning_ja: '心',
        mnemonicHint_en: 'A box shape — looks like a Mail box: "M"!',
    },
    {
        char: 'ㅂ', romanization: 'b/p',
        pronunciation_en: '"b" as in "boy" or "p" at the end',
        pronunciation_ja: '「ば」行の子音',
        exampleWord: '바다', exampleMeaning_en: 'sea', exampleMeaning_ja: '海',
        mnemonicHint_en: 'Looks like a Bucket — "B" for Bucket!',
    },
    {
        char: 'ㅅ', romanization: 's',
        pronunciation_en: '"s" as in "sun"',
        pronunciation_ja: '「さ」行の子音',
        exampleWord: '산', exampleMeaning_en: 'mountain', exampleMeaning_ja: '山',
        mnemonicHint_en: 'Like a Sun hat or tent — "S" for Sun!',
    },
];

// ===== BASIC CONSONANTS 2 =====
export const basicConsonants2: HangulCharacter[] = [
    {
        char: 'ㅇ', romanization: 'ng (silent at start)',
        pronunciation_en: 'Silent at the beginning, "ng" at the end',
        pronunciation_ja: '初声では無音、終声では「ん」',
        exampleWord: '아침', exampleMeaning_en: 'morning', exampleMeaning_ja: '朝',
        mnemonicHint_en: 'A circle — like zero! Zero sound at the beginning!',
    },
    {
        char: 'ㅈ', romanization: 'j',
        pronunciation_en: '"j" as in "juice"',
        pronunciation_ja: '「じゃ」行の子音',
        exampleWord: '지도', exampleMeaning_en: 'map', exampleMeaning_ja: '地図',
        mnemonicHint_en: 'Like a Jug pouring — "J" for Jug!',
    },
    {
        char: 'ㅊ', romanization: 'ch',
        pronunciation_en: '"ch" as in "church"',
        pronunciation_ja: '「ちゃ」行の子音',
        exampleWord: '치즈', exampleMeaning_en: 'cheese', exampleMeaning_ja: 'チーズ',
        mnemonicHint_en: 'ㅈ with a hat — extra air makes it "CH"!',
    },
    {
        char: 'ㅋ', romanization: 'k',
        pronunciation_en: '"k" as in "kite" — with a puff of air',
        pronunciation_ja: '「か」行の激音',
        exampleWord: '커피', exampleMeaning_en: 'coffee', exampleMeaning_ja: 'コーヒー',
        mnemonicHint_en: 'ㄱ with an extra line — like a Key: "K"!',
    },
    {
        char: 'ㅌ', romanization: 't',
        pronunciation_en: '"t" as in "top" — with a puff of air',
        pronunciation_ja: '「た」行の激音',
        exampleWord: '토끼', exampleMeaning_en: 'rabbit', exampleMeaning_ja: 'ウサギ',
        mnemonicHint_en: 'ㄷ with an extra line — like the letter "T"!',
    },
    {
        char: 'ㅍ', romanization: 'p',
        pronunciation_en: '"p" as in "pie" — with a puff of air',
        pronunciation_ja: '「ぱ」行の激音',
        exampleWord: '포도', exampleMeaning_en: 'grape', exampleMeaning_ja: 'ブドウ',
        mnemonicHint_en: 'Looks like a Pi (π) symbol — "P"!',
    },
    {
        char: 'ㅎ', romanization: 'h',
        pronunciation_en: '"h" as in "hat"',
        pronunciation_ja: '「は」行の子音',
        exampleWord: '하늘', exampleMeaning_en: 'sky', exampleMeaning_ja: '空',
        mnemonicHint_en: 'A person wearing a Hat — "H" for Hat!',
    },
];

// ===== COMPLEX VOWELS =====
export const complexVowels: HangulCharacter[] = [
    {
        char: 'ㅐ', romanization: 'ae',
        pronunciation_en: '"e" as in "bed"',
        pronunciation_ja: '「え」に近い音',
        exampleWord: '개', exampleMeaning_en: 'dog', exampleMeaning_ja: '犬',
        mnemonicHint_en: 'ㅏ + ㅣ combined — mouth open like "ah" but slides to "eh"',
    },
    {
        char: 'ㅔ', romanization: 'e',
        pronunciation_en: '"e" as in "yes"',
        pronunciation_ja: '「え」の音',
        exampleWord: '세계', exampleMeaning_en: 'world', exampleMeaning_ja: '世界',
        mnemonicHint_en: 'ㅓ + ㅣ combined — very similar to ㅐ in modern Korean',
    },
    {
        char: 'ㅑ', romanization: 'ya',
        pronunciation_en: '"ya" as in "yard"',
        pronunciation_ja: '「や」の音',
        exampleWord: '야구', exampleMeaning_en: 'baseball', exampleMeaning_ja: '野球',
        mnemonicHint_en: 'Two strokes to the right — double stroke = add "y" sound!',
    },
    {
        char: 'ㅕ', romanization: 'yeo',
        pronunciation_en: '"yuh" — y + the "eo" sound',
        pronunciation_ja: '「よ」に近い音',
        exampleWord: '여자', exampleMeaning_en: 'woman', exampleMeaning_ja: '女性',
        mnemonicHint_en: 'Two strokes to the left — double stroke = add "y" sound!',
    },
    {
        char: 'ㅛ', romanization: 'yo',
        pronunciation_en: '"yo" as in "yoga"',
        pronunciation_ja: '「よ」の音',
        exampleWord: '요리', exampleMeaning_en: 'cooking', exampleMeaning_ja: '料理',
        mnemonicHint_en: 'Two strokes pointing up — double stroke = add "y"!',
    },
    {
        char: 'ㅠ', romanization: 'yu',
        pronunciation_en: '"you" as in "you"',
        pronunciation_ja: '「ゆ」の音',
        exampleWord: '유리', exampleMeaning_en: 'glass', exampleMeaning_ja: 'ガラス',
        mnemonicHint_en: 'Two strokes pointing down — double stroke = add "y"!',
    },
    {
        char: 'ㅒ', romanization: 'yae',
        pronunciation_en: '"ye" as in "yeah"',
        pronunciation_ja: '「いぇ」に近い音',
        exampleWord: '얘기', exampleMeaning_en: 'story/talk', exampleMeaning_ja: '話',
        mnemonicHint_en: 'ㅑ + ㅣ — y + ae sound',
    },
    {
        char: 'ㅖ', romanization: 'ye',
        pronunciation_en: '"ye" as in "yes"',
        pronunciation_ja: '「いぇ」の音',
        exampleWord: '예쁘다', exampleMeaning_en: 'pretty', exampleMeaning_ja: 'きれい',
        mnemonicHint_en: 'ㅕ + ㅣ — y + e sound',
    },
    {
        char: 'ㅘ', romanization: 'wa',
        pronunciation_en: '"wa" as in "wand"',
        pronunciation_ja: '「わ」の音',
        exampleWord: '과일', exampleMeaning_en: 'fruit', exampleMeaning_ja: '果物',
        mnemonicHint_en: 'ㅗ + ㅏ — the lips round then open: "wa!"',
    },
    {
        char: 'ㅝ', romanization: 'wo',
        pronunciation_en: '"wuh" — w + eo sound',
        pronunciation_ja: '「うぉ」に近い音',
        exampleWord: '원', exampleMeaning_en: 'won (currency)', exampleMeaning_ja: 'ウォン',
        mnemonicHint_en: 'ㅜ + ㅓ — lips round then relax',
    },
    {
        char: 'ㅟ', romanization: 'wi',
        pronunciation_en: '"wee" as in "week"',
        pronunciation_ja: '「うぃ」の音',
        exampleWord: '위', exampleMeaning_en: 'above/top', exampleMeaning_ja: '上',
        mnemonicHint_en: 'ㅜ + ㅣ — round lips then smile: "wee!"',
    },
    {
        char: 'ㅢ', romanization: 'ui',
        pronunciation_en: '"oo-ee" said quickly together',
        pronunciation_ja: '「うい」と素早く発音',
        exampleWord: '의사', exampleMeaning_en: 'doctor', exampleMeaning_ja: '医者',
        mnemonicHint_en: 'ㅡ + ㅣ — flat then smile: "eui"',
    },
];

// ===== DOUBLE CONSONANTS =====
export const doubleConsonants: HangulCharacter[] = [
    {
        char: 'ㄲ', romanization: 'kk',
        pronunciation_en: 'Tense "k" — stronger than ㄱ, no air puff',
        pronunciation_ja: '「か」行の濃音（力を入れて）',
        exampleWord: '까치', exampleMeaning_en: 'magpie', exampleMeaning_ja: 'カササギ',
        mnemonicHint_en: 'Double ㄱ = tense your throat and say "k" with force!',
    },
    {
        char: 'ㄸ', romanization: 'tt',
        pronunciation_en: 'Tense "t" — no air puff',
        pronunciation_ja: '「た」行の濃音',
        exampleWord: '딸기', exampleMeaning_en: 'strawberry', exampleMeaning_ja: 'イチゴ',
        mnemonicHint_en: 'Double ㄷ = tense "t" like stopping mid-word',
    },
    {
        char: 'ㅃ', romanization: 'pp',
        pronunciation_en: 'Tense "p" — no air puff',
        pronunciation_ja: '「ぱ」行の濃音',
        exampleWord: '빵', exampleMeaning_en: 'bread', exampleMeaning_ja: 'パン',
        mnemonicHint_en: 'Double ㅂ = tense "p" — press your lips tight!',
    },
    {
        char: 'ㅆ', romanization: 'ss',
        pronunciation_en: 'Tense "s" — sharper hissing sound',
        pronunciation_ja: '「さ」行の濃音',
        exampleWord: '쌀', exampleMeaning_en: 'rice (uncooked)', exampleMeaning_ja: '米',
        mnemonicHint_en: 'Double ㅅ = extra sharp "ss" like a snake!',
    },
    {
        char: 'ㅉ', romanization: 'jj',
        pronunciation_en: 'Tense "j" — no air puff',
        pronunciation_ja: '「じゃ」行の濃音',
        exampleWord: '찌개', exampleMeaning_en: 'stew', exampleMeaning_ja: 'チゲ',
        mnemonicHint_en: 'Double ㅈ = tense "j" — clench and release!',
    },
];

// ===== LESSONS =====
export const hangulLessons: HangulLesson[] = [
    {
        lessonId: 'vowel_basic_01',
        type: 'vowel',
        category: 'basic',
        order: 1,
        title_en: 'Basic Vowels',
        title_ja: '基本母音',
        characters: basicVowels,
        isLocked: false,
    },
    {
        lessonId: 'consonant_basic_01',
        type: 'consonant',
        category: 'basic',
        order: 2,
        title_en: 'Basic Consonants 1',
        title_ja: '基本子音 1',
        characters: basicConsonants1,
        isLocked: false,
    },
    {
        lessonId: 'consonant_basic_02',
        type: 'consonant',
        category: 'basic',
        order: 3,
        title_en: 'Basic Consonants 2',
        title_ja: '基本子音 2',
        characters: basicConsonants2,
        isLocked: false,
    },
    {
        lessonId: 'vowel_complex_01',
        type: 'vowel',
        category: 'complex',
        order: 4,
        title_en: 'Complex Vowels',
        title_ja: '複合母音',
        characters: complexVowels,
        isLocked: false,
    },
    {
        lessonId: 'consonant_double_01',
        type: 'consonant',
        category: 'double',
        order: 5,
        title_en: 'Double Consonants',
        title_ja: '双子音',
        characters: doubleConsonants,
        isLocked: false,
    },
    {
        lessonId: 'greetings_01',
        type: 'vowel' as const,
        category: 'basic' as const,
        order: 6,
        title_en: 'Essential Greetings',
        title_ja: '基本の挨拶',
        characters: greetingsToLessonChars(),
        isLocked: false,
    },
    {
        lessonId: 'numbers_native_01',
        type: 'vowel' as const,
        category: 'basic' as const,
        order: 7,
        title_en: 'Native Korean Numbers',
        title_ja: '固有韓国語数詞',
        characters: nativeNumbersToLessonChars(),
        isLocked: false,
    },
    {
        lessonId: 'numbers_sino_01',
        type: 'vowel' as const,
        category: 'basic' as const,
        order: 8,
        title_en: 'Sino-Korean Numbers',
        title_ja: '漢字語数詞',
        characters: sinoNumbersToLessonChars(),
        isLocked: false,
    },
];

// ===== QUIZ DATA =====
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function generateVowelQuiz(): Quiz {
    const questions: QuizQuestion[] = basicVowels.map((v, i) => ({
        questionId: `vq_${i + 1}`,
        questionType: 'charToSound' as const,
        displayChar: v.char,
        options: shuffle([
            v.romanization,
            ...basicVowels.filter(x => x.char !== v.char).slice(0, 3).map(x => x.romanization),
        ]),
        correctAnswer: v.romanization,
        explanation_en: `${v.char} sounds like "${v.romanization}" — ${v.pronunciation_en}`,
        explanation_ja: `${v.char}は「${v.romanization}」— ${v.pronunciation_ja}`,
        xpReward: 10,
    }));

    return {
        quizId: 'quiz_vowel_basic',
        relatedLesson: 'vowel_basic_01',
        title_en: 'Basic Vowel Quiz',
        title_ja: '基本母音クイズ',
        type: 'hangul',
        difficulty: 1,
        questions: shuffle(questions).slice(0, 5),
        isLocked: false,
    };
}

export function generateConsonantQuiz(): Quiz {
    const allConsonants = [...basicConsonants1, ...basicConsonants2];
    const questions: QuizQuestion[] = allConsonants.map((c, i) => ({
        questionId: `cq_${i + 1}`,
        questionType: 'charToSound' as const,
        displayChar: c.char,
        options: shuffle([
            c.romanization,
            ...allConsonants.filter(x => x.char !== c.char).slice(0, 3).map(x => x.romanization),
        ]),
        correctAnswer: c.romanization,
        explanation_en: `${c.char} sounds like "${c.romanization}" — ${c.pronunciation_en}`,
        explanation_ja: `${c.char}は「${c.romanization}」— ${c.pronunciation_ja}`,
        xpReward: 10,
    }));

    return {
        quizId: 'quiz_consonant_basic',
        relatedLesson: 'consonant_basic_01',
        title_en: 'Basic Consonant Quiz',
        title_ja: '基本子音クイズ',
        type: 'hangul',
        difficulty: 1,
        questions: shuffle(questions).slice(0, 5),
        isLocked: false,
    };
}

export function generateMixedQuiz(): Quiz {
    const vQuiz = generateVowelQuiz();
    const cQuiz = generateConsonantQuiz();
    const mixed = shuffle([...vQuiz.questions.slice(0, 3), ...cQuiz.questions.slice(0, 2)]);

    return {
        quizId: 'quiz_daily_hangul',
        relatedLesson: 'vowel_basic_01',
        title_en: 'Daily Hangul Quiz',
        title_ja: 'デイリーハングルクイズ',
        type: 'hangul',
        difficulty: 1,
        questions: mixed,
        isLocked: false,
    };
}

export function generateComplexVowelQuiz(): Quiz {
    const questions: QuizQuestion[] = complexVowels.map((v, i) => ({
        questionId: `cvq_${i + 1}`,
        questionType: 'charToSound' as const,
        displayChar: v.char,
        options: shuffle([
            v.romanization,
            ...complexVowels.filter(x => x.char !== v.char).slice(0, 3).map(x => x.romanization),
        ]),
        correctAnswer: v.romanization,
        explanation_en: `${v.char} sounds like "${v.romanization}" — ${v.pronunciation_en}`,
        explanation_ja: `${v.char}は「${v.romanization}」— ${v.pronunciation_ja}`,
        xpReward: 15,
    }));

    return {
        quizId: 'quiz_vowel_complex',
        relatedLesson: 'vowel_complex_01',
        title_en: 'Complex Vowel Quiz',
        title_ja: '複合母音クイズ',
        type: 'hangul',
        difficulty: 2,
        questions: shuffle(questions).slice(0, 6),
        isLocked: false,
    };
}

export function generateDoubleConsonantQuiz(): Quiz {
    const allChars = [...doubleConsonants, ...basicConsonants1.slice(0, 3)];
    const questions: QuizQuestion[] = doubleConsonants.map((c, i) => ({
        questionId: `dcq_${i + 1}`,
        questionType: 'charToSound' as const,
        displayChar: c.char,
        options: shuffle([
            c.romanization,
            ...allChars.filter(x => x.char !== c.char).slice(0, 3).map(x => x.romanization),
        ]),
        correctAnswer: c.romanization,
        explanation_en: `${c.char} sounds like "${c.romanization}" — ${c.pronunciation_en}`,
        explanation_ja: `${c.char}は「${c.romanization}」— ${c.pronunciation_ja}`,
        xpReward: 15,
    }));

    return {
        quizId: 'quiz_consonant_double',
        relatedLesson: 'consonant_double_01',
        title_en: 'Double Consonant Quiz',
        title_ja: '双子音クイズ',
        type: 'hangul',
        difficulty: 2,
        questions: shuffle(questions),
        isLocked: false,
    };
}

// ===== LEARNING PATH DATA =====
export interface LearningUnit {
    unitId: string;
    unitNumber: number;
    title_en: string;
    title_ja: string;
    emoji: string;
    lessons: string[];  // lesson IDs
    quizId?: string;
    isLocked: boolean;
    phase: number;
}

export interface LearningLevel {
    levelId: string;
    levelNumber: number;
    title_en: string;
    title_ja: string;
    color: string;
    emoji: string;
    units: LearningUnit[];
    isLocked: boolean;
}

export const learningPath: LearningLevel[] = [
    {
        levelId: 'level_1',
        levelNumber: 1,
        title_en: 'Hangul Master',
        title_ja: 'ハングルマスター',
        color: '#10B981',
        emoji: '🟢',
        isLocked: false,
        units: [
            {
                unitId: 'unit_1', unitNumber: 1,
                title_en: 'Vowels', title_ja: '母音', emoji: '🔤',
                lessons: ['vowel_basic_01'],
                quizId: 'quiz_vowel_basic',
                isLocked: false, phase: 1,
            },
            {
                unitId: 'unit_2', unitNumber: 2,
                title_en: 'Consonants', title_ja: '子音', emoji: '🔤',
                lessons: ['consonant_basic_01', 'consonant_basic_02'],
                quizId: 'quiz_consonant_basic',
                isLocked: false, phase: 1,
            },
            {
                unitId: 'unit_3', unitNumber: 3,
                title_en: 'Combining Letters', title_ja: '文字の組み合わせ', emoji: '🧩',
                lessons: ['vowel_complex_01', 'consonant_double_01'],
                quizId: 'quiz_vowel_complex',
                isLocked: false, phase: 2,
            },
            {
                unitId: 'unit_4', unitNumber: 4,
                title_en: 'Greetings', title_ja: '挨拶', emoji: '👋',
                lessons: ['greetings_01'],
                quizId: undefined,
                isLocked: false, phase: 3,
            },
            {
                unitId: 'unit_5', unitNumber: 5,
                title_en: 'Numbers', title_ja: '数字', emoji: '🔢',
                lessons: ['numbers_native_01', 'numbers_sino_01'],
                quizId: undefined,
                isLocked: false, phase: 3,
            },
            {
                unitId: 'unit_6', unitNumber: 6,
                title_en: 'Basic 100 Words', title_ja: '基本100単語', emoji: '📝',
                lessons: [], quizId: undefined,
                isLocked: true, phase: 3,
            },
            {
                unitId: 'unit_7', unitNumber: 7,
                title_en: 'Basic Sentences', title_ja: '基本文章', emoji: '💬',
                lessons: [], quizId: undefined,
                isLocked: true, phase: 3,
            },
        ],
    },
    {
        levelId: 'level_2',
        levelNumber: 2,
        title_en: 'Daily Korean',
        title_ja: '日常韓国語',
        color: '#3B82F6',
        emoji: '🔵',
        isLocked: true,
        units: [],
    },
    {
        levelId: 'level_3',
        levelNumber: 3,
        title_en: 'K-Culture Korean',
        title_ja: 'K-Culture韓国語',
        color: '#F59E0B',
        emoji: '🟡',
        isLocked: true,
        units: [],
    },
    {
        levelId: 'level_4',
        levelNumber: 4,
        title_en: 'Intermediate',
        title_ja: '中級',
        color: '#F97316',
        emoji: '🟠',
        isLocked: true,
        units: [],
    },
    {
        levelId: 'level_5',
        levelNumber: 5,
        title_en: 'Advanced',
        title_ja: '上級',
        color: '#EF4444',
        emoji: '🔴',
        isLocked: true,
        units: [],
    },
];
