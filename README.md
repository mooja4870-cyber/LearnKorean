# 🚀 Antigravity

> **"Break the gravity of language barriers!"**
>
> K-Culture 기반 한국어 학습 앱

[![React Native](https://img.shields.io/badge/React_Native-Expo-blue?logo=expo)](https://expo.dev)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?logo=firebase)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📖 프로젝트 소개

Antigravity는 **전 세계 외국인**을 위한 한국어 학습 앱입니다.  
K-Pop, K-Drama 등 **K-Culture 콘텐츠**를 활용하여 재미있게 한국어를 배울 수 있습니다.

**MVP (Phase 1)**에서는 **한글 자음·모음 학습 + 퀴즈**를 핵심 기능으로 제공합니다.

> 현재 개발 범위 고정: **Android 앱 전용 (Expo Go + Android Emulator)**  
> Web/iOS 구현은 현재 범위에서 제외하며, Android 완료 후 필요 시 진행합니다.

---

## ✨ 주요 기능 (MVP)

| 기능 | 설명 |
|------|------|
| 🔐 **인증 및 온보딩** | Welcome → 언어 선택 → 회원가입/로그인 (Firebase 연동 준비) |
| 🏠 **홈 대시보드** | 🔥 일일 스트릭, 📈 레벨 진행률, 🎯 오늘의 미션 안내 |
| 📚 **학습 로드맵** | 5단계 레벨 표시 (Level 1 오픈, 2~5 🔒) |
| 🔤 **한글 레슨** | 모음 6개 (ㅏ~ㅣ) + 자음 14개 (ㄱ~ㅎ), 소음/글자 학습 카드 |
| 📝 **확장형 퀴즈** | 4지선다, 소리맞추기, 짝맞추기, O/X 등 4가지 유형 (10문제) + 상세 오답노트 |
| 🎵 **K-Zone** | 6개 K-Culture 카테고리 로드맵 관리 (Coming Soon 알림) |
| 👤 **프로필** | 내 학습 통계 (스트릭, 퀴즈 정답률, 경험치), 퀴즈 히스토리 |
| ⚙️ **설정** | Zustand를 활용한 알림, 다크모드 등 앱 설정 관리 |
| 🌙 **테마 시스템** | 우주/중력 테마(Antigravity) 다크 앤 라이트 모드 |
| 🌍 **다국어 (i18n)** | 영어, 일본어 2개국어 완벽 지원 (확장 가능 구조) |

---

## 🛠️ 기술 스택

```
📱 Frontend    : React Native + Expo (TypeScript)
🔥 Backend     : Firebase (Auth + Firestore + Analytics) - 연동 준비
🗺  Navigation  : React Navigation (Bottom Tabs + Native Stack)
🧠 State       : Zustand (Store 관리)
🌍 i18n        : i18next + react-i18next
💾 Local Store : AsyncStorage
🎨 UI          : Custom Design System (Space/Gravity Theme)
```

---

## 📂 프로젝트 구조

```
Kor_study/
├── App.tsx                          # 앱 진입점
├── firebaseConfig.ts                # Firebase 설정 (예정)
├── src/
│   ├── theme/                       # 디자인 시스템
│   │   ├── colors.ts                #   색상 팔레트 (Light/Dark)
│   │   ├── typography.ts           #   폰트 사이즈/웨이트
│   │   ├── spacing.ts              #   간격/그림자/보더
│   │   └── ThemeContext.tsx        #   테마 Provider
│   │
│   ├── i18n/                        # 국제화 (영어/일본어)
│   │
│   ├── store/                       # Zustand 기반 전역 상태 관리
│   │   ├── useAuthStore.ts         #   인증 관리
│   │   ├── useUserStore.ts         #   유저 프로필
│   │   ├── useLearningStore.ts     #   학습 진도
│   │   └── useSettingsStore.ts     #   설정 관리
│   │
│   ├── data/
│   │   ├── hangulData.ts            # 한글 레슨 데이터
│   │   ├── quizData.ts              # 확장된 퀴즈 문제 (4유형)
│   │   └── menuData.ts              # 전체 앱 메뉴 / Coming Soon 통제
│   │
│   ├── components/                  # 리유저블 공통 컴포넌트 11종
│   │   ├── common/                  #   Button, Card, Header, Spinner 등
│   │   └── learn/                   #   LessonCard, QuizOption 등
│   │
│   ├── screens/                     # 총 17개 스크린 구성
│   │   ├── onboarding/              #   Welcome, Language, Login
│   │   ├── auth/                    #   SignUp, ForgotPassword
│   │   ├── home/                    #   HomeScreen
│   │   ├── learn/                   #   로드맵, 레슨, 퀴즈, 퀴즈 결과
│   │   ├── kzone/                   #   KZone, KPop 등
│   │   ├── profile/                 #   MyStats, Settings, Help
│   │   └── common/                  #   Loading, Error
│   │
│   └── navigation/
│       ├── RootNavigator.tsx        # 최상위 온보딩 분기
│       ├── MainTabNavigator.tsx     # 하단 4개 탭
│       ├── HomeStack, LearnStack, KZoneStack, ProfileStack
```

---

## 🚀 실행 방법

### 사전 준비

- [Node.js](https://nodejs.org/) 20 LTS 또는 22 LTS 설치 (권장)
- [Expo Go](https://expo.dev/go) 앱 (스마트폰에 설치)

### 설치 & 실행

```bash
# 1. 의존성 설치
cd /Users/mooja/AI_Study/Project/Kor_study
nvm use   # .nvmrc(22) 기준
npm install

# 2. Android SDK/에뮬레이터 자동 준비 (최초 1회)
npm run android:setup

# 3. Android 실기기(Expo Go) 실행
npm run start

# 4. Android 에뮬레이터 실행 (localhost)
npm run start:emulator

# 5. Android 강제 실행(비대화식, 프롬프트 방지)
npm run android
```

### 접속 규칙 (중요)

- `exp://...` 주소는 **Expo Go 앱 전용**입니다. 브라우저 주소창에 입력하면 안 됩니다.
- 현재는 **웹 구현/테스트를 진행하지 않습니다.** (`npm run web` 미사용)
- 실기기 실행 시 Metro 터미널에서 `a/i/w`를 누르지 말고 **QR 스캔만 사용**하세요.
- Expo 계정 로그인 프롬프트가 뜨면 `npm run android` 또는 `npm run start:emulator`를 사용하세요(비대화식 실행).

### 자주 쓰는 실행 명령

```bash
# Android 기본 실행 (LAN / 실기기 또는 에뮬레이터)
npm run start

# Tunnel 강제 사용 (외부망/특수 네트워크)
npm run start:tunnel

# Android 에뮬레이터 우선 실행 (localhost)
npm run start:emulator

# Android SDK + AVD 자동 설치/생성 (최초 1회)
npm run android:setup

# Android 강제 실행 (비대화식/프롬프트 방지)
npm run android
```

### 접속 실패 시 복구 순서

```bash
# 1) 기존 Metro 종료 + 포트 정리
npm run reset:metro

# 2) 의존성/버전 점검
npm run doctor

# 3) 다시 실행 (Expo Go)
npm run start

# 3-1) ngrok/tunnel 장애 시
npm run start:lan

# 4) Android SDK/AVD 재설정
npm run android:setup

# 5) 에뮬레이터 재실행
npm run start:emulator

# 6) 로그인 프롬프트 반복 시 강제 실행
npm run android
```

### AVD 생성 에러 즉시 대응

- `Error: Package path is not valid. Valid system image paths are: null` 에러가 뜨면 `npm run android:setup`만 다시 실행하세요.
- setup 스크립트가 자동으로 JDK 17 + SDK 내부 `cmdline-tools;latest`로 교정한 뒤 AVD를 재생성합니다.

### Android 에뮬레이터 운영 원칙

- 개발 완료 전까지 에뮬레이터는 **필수에 가깝습니다.**
- 권장: **실기기 1대 + 에뮬레이터 1대** 병행 테스트
- 이유: 재현성 있는 디버깅, 릴리즈 직전 회귀 테스트, 앱 시작/권한/알림 동작 검증

---

## 🏗️ 개발 원칙

| 원칙 | 설명 |
|------|------|
| 🐣 **MVP First** | 핵심 1개 기능 완성 → 출시 → 피드백 → 확장 |
| 🎨 **Frontend Full** | 전체 메뉴 구조 세팅, 미구현은 Coming Soon 🔒 |
| 📦 **모듈화** | 각 기능을 독립된 레고 블록처럼 구현 |
| 🌍 **글로벌 우선** | UI 영어 기본, 다국어 확장 구조 (i18n) |
| 📊 **데이터 기반** | Coming Soon 관심도 수집 → 우선순위 결정 |

---

## 📅 개발 로드맵

| Phase | 내용 | 기간 |
|-------|------|------|
| **Phase 1 ✅** | MVP — 한글 학습 + 퀴즈 + 전체 메뉴 구조 | 3~4개월 |
| Phase 2 | 복합모음, 단어장, XP/업적, TTS | 2개월 |
| Phase 3 | AI 챗봇, 문법, 검색 | 2~3개월 |
| Phase 4 | 발음평가, 프리미엄, 랭킹 | 2~3개월 |
| Phase 5 | K-Pop/K-Drama/K-SNS 콘텐츠 | 3개월 |
| Phase 6 | 고급 콘텐츠, 다국어 확장 | 3개월 |
| Phase 7 | 지속 운영 & 성장 | 계속 |

---

## 🔧 Firebase 연동 (Phase 1 확장)

현재 MVP는 **로컬 스토리지(AsyncStorage)**로 동작합니다.  
Firebase 연동 시 `firebaseConfig.ts`에 실제 키를 입력하세요:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

---

## 📊 DB 스키마 (Firestore)

- `users` — 유저 프로필, 설정, 레벨, 스트릭
- `hangulLessons` — 한글 레슨 (자음/모음 데이터)
- `quizzes` — 퀴즈 문제 + 정답
- `userProgress` — 일별 학습 기록
- `comingSoonInterest` — Coming Soon 알림 신청 데이터

---

## 🎨 디자인 시스템

- **테마**: Space/Gravity (우주/중력)
- **Primary**: Deep Purple `#6C5CE7` / Light Purple `#A29BFE`
- **Secondary**: Neon Cyan `#00CEFF`
- **Accent**: Starlight Gold `#FFD93D`
- **Dark Background**: Deep Space `#0F0E1A`

---

## 📝 라이센스

MIT License

---

<p align="center">
  🚀 <strong>Antigravity</strong> — Break the gravity of language barriers!
</p>
