// Korean Numbers Data — Unit 5
import { HangulCharacter } from './hangulData';

export interface NumberItem {
    korean: string;
    romanization: string;
    value: number;
    system: 'native' | 'sino';
    usage_en: string;
    usage_ja: string;
}

// Native Korean Numbers (하나, 둘, 셋...) — used for counting items, age, hours
export const nativeNumbers: NumberItem[] = [
    { korean: '하나', romanization: 'hana', value: 1, system: 'native', usage_en: 'one (counting)', usage_ja: 'ひとつ' },
    { korean: '둘', romanization: 'dul', value: 2, system: 'native', usage_en: 'two', usage_ja: 'ふたつ' },
    { korean: '셋', romanization: 'set', value: 3, system: 'native', usage_en: 'three', usage_ja: 'みっつ' },
    { korean: '넷', romanization: 'net', value: 4, system: 'native', usage_en: 'four', usage_ja: 'よっつ' },
    { korean: '다섯', romanization: 'daseot', value: 5, system: 'native', usage_en: 'five', usage_ja: 'いつつ' },
    { korean: '여섯', romanization: 'yeoseot', value: 6, system: 'native', usage_en: 'six', usage_ja: 'むっつ' },
    { korean: '일곱', romanization: 'ilgop', value: 7, system: 'native', usage_en: 'seven', usage_ja: 'ななつ' },
    { korean: '여덟', romanization: 'yeodeol', value: 8, system: 'native', usage_en: 'eight', usage_ja: 'やっつ' },
    { korean: '아홉', romanization: 'ahop', value: 9, system: 'native', usage_en: 'nine', usage_ja: 'ここのつ' },
    { korean: '열', romanization: 'yeol', value: 10, system: 'native', usage_en: 'ten', usage_ja: 'とお' },
];

// Sino-Korean Numbers (일, 이, 삼...) — used for dates, money, phone numbers, minutes
export const sinoNumbers: NumberItem[] = [
    { korean: '일', romanization: 'il', value: 1, system: 'sino', usage_en: 'one (sino)', usage_ja: 'いち' },
    { korean: '이', romanization: 'i', value: 2, system: 'sino', usage_en: 'two', usage_ja: 'に' },
    { korean: '삼', romanization: 'sam', value: 3, system: 'sino', usage_en: 'three', usage_ja: 'さん' },
    { korean: '사', romanization: 'sa', value: 4, system: 'sino', usage_en: 'four', usage_ja: 'し' },
    { korean: '오', romanization: 'o', value: 5, system: 'sino', usage_en: 'five', usage_ja: 'ご' },
    { korean: '육', romanization: 'yuk', value: 6, system: 'sino', usage_en: 'six', usage_ja: 'ろく' },
    { korean: '칠', romanization: 'chil', value: 7, system: 'sino', usage_en: 'seven', usage_ja: 'しち' },
    { korean: '팔', romanization: 'pal', value: 8, system: 'sino', usage_en: 'eight', usage_ja: 'はち' },
    { korean: '구', romanization: 'gu', value: 9, system: 'sino', usage_en: 'nine', usage_ja: 'きゅう' },
    { korean: '십', romanization: 'sip', value: 10, system: 'sino', usage_en: 'ten', usage_ja: 'じゅう' },
    { korean: '백', romanization: 'baek', value: 100, system: 'sino', usage_en: 'hundred', usage_ja: 'ひゃく' },
    { korean: '천', romanization: 'cheon', value: 1000, system: 'sino', usage_en: 'thousand', usage_ja: 'せん' },
    { korean: '만', romanization: 'man', value: 10000, system: 'sino', usage_en: 'ten thousand', usage_ja: 'まん' },
];

// Convert to HangulCharacter-like for lesson card compatibility
export function nativeNumbersToLessonChars(): HangulCharacter[] {
    return nativeNumbers.map(n => ({
        char: n.korean,
        romanization: n.romanization,
        pronunciation_en: `${n.value} — ${n.usage_en}`,
        pronunciation_ja: n.usage_ja,
        exampleWord: n.korean,
        exampleMeaning_en: `Native Korean number: ${n.value}`,
        exampleMeaning_ja: `固有韓国語数詞: ${n.value}`,
        mnemonicHint_en: `Used for counting items, age, hours: "${n.korean}" = ${n.value}`,
    }));
}

export function sinoNumbersToLessonChars(): HangulCharacter[] {
    return sinoNumbers.map(n => ({
        char: n.korean,
        romanization: n.romanization,
        pronunciation_en: `${n.value} — ${n.usage_en}`,
        pronunciation_ja: n.usage_ja,
        exampleWord: n.korean,
        exampleMeaning_en: `Sino-Korean number: ${n.value}`,
        exampleMeaning_ja: `漢字語数詞: ${n.value}`,
        mnemonicHint_en: `Used for dates, money, phone numbers: "${n.korean}" = ${n.value}`,
    }));
}
