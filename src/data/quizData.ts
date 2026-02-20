// Expanded Quiz Data — 4 question types, 10 questions each
import { basicVowels, basicConsonants1, basicConsonants2 } from './hangulData';

export type QuestionType = 'multipleChoice' | 'charFromSound' | 'matching' | 'trueFalse';

export interface QuizQuestionExpanded {
    id: string;
    type: QuestionType;
    question_en: string;
    question_ja: string;
    displayChar?: string;
    displaySound?: string;
    options?: string[];
    correctIndex?: number;
    correctAnswer?: boolean; // for trueFalse
    pairs?: { char: string; sound: string }[];
    explanation_en: string;
    explanation_ja: string;
    xpReward: number;
}

export interface QuizData {
    quizId: string;
    title_en: string;
    title_ja: string;
    relatedUnit: string;
    totalQuestions: number;
    passingScore: number;
    xpReward: number;
    questions: QuizQuestionExpanded[];
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ========== VOWEL QUIZ (10 questions, mixed types) ==========
export function generateExpandedVowelQuiz(): QuizData {
    const vowels = basicVowels;
    const questions: QuizQuestionExpanded[] = [];

    // Type 1: multipleChoice — "What sound does this make?" (3 questions)
    for (let i = 0; i < 3; i++) {
        const v = vowels[i];
        const others = vowels.filter(x => x.char !== v.char).map(x => x.romanization);
        const opts = shuffle([v.romanization, ...shuffle(others).slice(0, 3)]);
        questions.push({
            id: `vq_mc_${i + 1}`,
            type: 'multipleChoice',
            question_en: 'What sound does this make?',
            question_ja: 'この文字の音は？',
            displayChar: v.char,
            options: opts,
            correctIndex: opts.indexOf(v.romanization),
            explanation_en: `${v.char} makes the "${v.romanization}" sound — ${v.pronunciation_en}`,
            explanation_ja: `${v.char}は「${v.romanization}」— ${v.pronunciation_ja}`,
            xpReward: 10,
        });
    }

    // Type 2: charFromSound — "Which character makes this sound?" (3 questions)
    for (let i = 3; i < 6; i++) {
        const v = vowels[i % vowels.length];
        const others = vowels.filter(x => x.char !== v.char).map(x => x.char);
        const opts = shuffle([v.char, ...shuffle(others).slice(0, 3)]);
        questions.push({
            id: `vq_cs_${i + 1}`,
            type: 'charFromSound',
            question_en: `Which character makes the "${v.romanization}" sound?`,
            question_ja: `「${v.romanization}」の音の文字は？`,
            displaySound: v.romanization,
            options: opts,
            correctIndex: opts.indexOf(v.char),
            explanation_en: `${v.char} = "${v.romanization}" — ${v.pronunciation_en}`,
            explanation_ja: `${v.char} = 「${v.romanization}」— ${v.pronunciation_ja}`,
            xpReward: 10,
        });
    }

    // Type 3: trueFalse (2 questions)
    const tf1 = vowels[0];
    questions.push({
        id: 'vq_tf_1',
        type: 'trueFalse',
        question_en: `"${tf1.char}" makes the "${tf1.romanization}" sound`,
        question_ja: `「${tf1.char}」は「${tf1.romanization}」の音`,
        displayChar: tf1.char,
        correctAnswer: true,
        explanation_en: `Correct! ${tf1.char} = "${tf1.romanization}" — ${tf1.pronunciation_en}`,
        explanation_ja: `正解！ ${tf1.char} = 「${tf1.romanization}」`,
        xpReward: 10,
    });

    const tf2 = vowels[2];
    const wrongSound = vowels[4].romanization;
    questions.push({
        id: 'vq_tf_2',
        type: 'trueFalse',
        question_en: `"${tf2.char}" makes the "${wrongSound}" sound`,
        question_ja: `「${tf2.char}」は「${wrongSound}」の音`,
        displayChar: tf2.char,
        correctAnswer: false,
        explanation_en: `Incorrect! ${tf2.char} = "${tf2.romanization}", not "${wrongSound}"`,
        explanation_ja: `不正解！ ${tf2.char} = 「${tf2.romanization}」`,
        xpReward: 10,
    });

    // Type 4: matching (2 questions)
    const matchVowels1 = shuffle(vowels.slice(0, 4));
    questions.push({
        id: 'vq_match_1',
        type: 'matching',
        question_en: 'Match the character with its sound',
        question_ja: '文字と音を合わせてください',
        pairs: matchVowels1.map(v => ({ char: v.char, sound: v.romanization })),
        explanation_en: 'Great matching!',
        explanation_ja: 'よくできました！',
        xpReward: 20,
    });

    const matchVowels2 = shuffle(vowels.slice(2, 6));
    questions.push({
        id: 'vq_match_2',
        type: 'matching',
        question_en: 'Match the character with its sound',
        question_ja: '文字と音を合わせてください',
        pairs: matchVowels2.map(v => ({ char: v.char, sound: v.romanization })),
        explanation_en: 'Great matching!',
        explanation_ja: 'よくできました！',
        xpReward: 20,
    });

    return {
        quizId: 'quiz_vowel_expanded',
        title_en: 'Basic Vowels Quiz',
        title_ja: '基本母音クイズ',
        relatedUnit: 'unit_1_vowels',
        totalQuestions: 10,
        passingScore: 70,
        xpReward: 100,
        questions: shuffle(questions),
    };
}

// ========== CONSONANT QUIZ (10 questions, mixed types) ==========
export function generateExpandedConsonantQuiz(): QuizData {
    const consonants = [...basicConsonants1, ...basicConsonants2];
    const questions: QuizQuestionExpanded[] = [];

    // Type 1: multipleChoice (3 questions)
    for (let i = 0; i < 3; i++) {
        const c = consonants[i];
        const others = consonants.filter(x => x.char !== c.char).map(x => x.romanization);
        const opts = shuffle([c.romanization, ...shuffle(others).slice(0, 3)]);
        questions.push({
            id: `cq_mc_${i + 1}`,
            type: 'multipleChoice',
            question_en: 'What sound does this make?',
            question_ja: 'この文字の音は？',
            displayChar: c.char,
            options: opts,
            correctIndex: opts.indexOf(c.romanization),
            explanation_en: `${c.char} = "${c.romanization}" — ${c.pronunciation_en}`,
            explanation_ja: `${c.char} = 「${c.romanization}」— ${c.pronunciation_ja}`,
            xpReward: 10,
        });
    }

    // Type 2: charFromSound (3 questions)
    for (let i = 3; i < 6; i++) {
        const c = consonants[i];
        const others = consonants.filter(x => x.char !== c.char).map(x => x.char);
        const opts = shuffle([c.char, ...shuffle(others).slice(0, 3)]);
        questions.push({
            id: `cq_cs_${i + 1}`,
            type: 'charFromSound',
            question_en: `Which character makes the "${c.romanization}" sound?`,
            question_ja: `「${c.romanization}」の音の文字は？`,
            displaySound: c.romanization,
            options: opts,
            correctIndex: opts.indexOf(c.char),
            explanation_en: `${c.char} = "${c.romanization}" — ${c.pronunciation_en}`,
            explanation_ja: `${c.char} = 「${c.romanization}」— ${c.pronunciation_ja}`,
            xpReward: 10,
        });
    }

    // Type 3: trueFalse (2 questions)
    const tf1 = consonants[6]; // ㅅ
    questions.push({
        id: 'cq_tf_1',
        type: 'trueFalse',
        question_en: `"${tf1.char}" makes the "${tf1.romanization}" sound`,
        question_ja: `「${tf1.char}」は「${tf1.romanization}」の音`,
        displayChar: tf1.char,
        correctAnswer: true,
        explanation_en: `Correct! ${tf1.char} = "${tf1.romanization}"`,
        explanation_ja: `正解！`,
        xpReward: 10,
    });

    const tf2 = consonants[8]; // ㅈ
    const wrong = consonants[10].romanization; // ㅋ
    questions.push({
        id: 'cq_tf_2',
        type: 'trueFalse',
        question_en: `"${tf2.char}" makes the "${wrong}" sound`,
        question_ja: `「${tf2.char}」は「${wrong}」の音`,
        displayChar: tf2.char,
        correctAnswer: false,
        explanation_en: `Incorrect! ${tf2.char} = "${tf2.romanization}", not "${wrong}"`,
        explanation_ja: `不正解！`,
        xpReward: 10,
    });

    // Type 4: matching (2 questions)
    const match1 = shuffle(consonants.slice(0, 4));
    questions.push({
        id: 'cq_match_1',
        type: 'matching',
        question_en: 'Match the character with its sound',
        question_ja: '文字と音を合わせてください',
        pairs: match1.map(c => ({ char: c.char, sound: c.romanization })),
        explanation_en: 'Great matching!',
        explanation_ja: 'よくできました！',
        xpReward: 20,
    });

    const match2 = shuffle(consonants.slice(7, 11));
    questions.push({
        id: 'cq_match_2',
        type: 'matching',
        question_en: 'Match the character with its sound',
        question_ja: '文字と音を合わせてください',
        pairs: match2.map(c => ({ char: c.char, sound: c.romanization })),
        explanation_en: 'Great matching!',
        explanation_ja: 'よくできました！',
        xpReward: 20,
    });

    return {
        quizId: 'quiz_consonant_expanded',
        title_en: 'Basic Consonants Quiz',
        title_ja: '基本子音クイズ',
        relatedUnit: 'unit_2_consonants',
        totalQuestions: 10,
        passingScore: 70,
        xpReward: 100,
        questions: shuffle(questions),
    };
}

// ========== DAILY MIXED QUIZ ==========
export function generateExpandedDailyQuiz(): QuizData {
    const vq = generateExpandedVowelQuiz();
    const cq = generateExpandedConsonantQuiz();
    const mixed = shuffle([
        ...vq.questions.slice(0, 5),
        ...cq.questions.slice(0, 5),
    ]);

    return {
        quizId: 'quiz_daily_expanded',
        title_en: 'Daily Hangul Quiz',
        title_ja: 'デイリーハングルクイズ',
        relatedUnit: 'daily',
        totalQuestions: 10,
        passingScore: 70,
        xpReward: 100,
        questions: mixed,
    };
}
