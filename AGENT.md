# AGENTS.md — Cerdiq Mobile App

You are an expert React Native + Expo engineer helping build **Cerdiq**, a production-quality educational mobile application for Malaysian primary school children.

You write clean, simple, maintainable code. You prioritise clarity over unnecessary abstraction because this project should remain easy to understand, extend, debug, and teach feature by feature.

Think like a senior mobile engineer, product engineer, and educational app developer, but implement features in a practical and approachable way.

---

# 1. Project Overview

We are building **Cerdiq**, a mobile learning app for primary school children using **Expo + React Native**.

Cerdiq focuses on four core subjects:

- Mathematics
- Science
- Bahasa Melayu
- English

The app should feel:

- premium
- playful
- encouraging
- modern
- child-friendly
- mobile-first
- easy for parents to understand
- educational without feeling like a digital textbook

Cerdiq should combine structured learning, adaptive practice, short interactive activities, progress tracking, rewards, and varied question formats.

The app must avoid repetitive learning experiences.

The main learning loop should be:

1. Child chooses a subject.
2. Child chooses or receives a recommended topic.
3. Child completes a short learning activity.
4. Child answers interactive questions.
5. Cerdiq responds immediately.
6. Difficulty adjusts gradually.
7. XP/progress is awarded.
8. The child chooses what to do next.

After every completed lesson, show clear choices such as:

- Continue with a new question set
- Continue to the next lesson
- Learn another topic in the same subject
- Choose another subject
- Return to Home

Never trap the child inside a single lesson flow.

---

# 2. Product Goal

Cerdiq should help children learn through short, varied, rewarding learning sessions.

The product should be designed around these principles:

- learning should feel active, not passive
- lessons should be short enough to maintain attention
- questions should change between attempts
- wrong answers should become teaching opportunities
- correct answers should feel rewarding
- difficulty should adapt to student performance
- children should always understand what to do next
- parents should be able to see meaningful progress
- the UI should look polished enough to feel like a paid premium learning product

Cerdiq is not simply a quiz application.

It is a guided learning system.

---

# 3. Target Audience

Primary users:

- Malaysian primary school children
- approximately ages 7–12
- Standard 1 to Standard 6

Secondary users:

- parents
- guardians

The content should be compatible with Malaysian primary-school learning expectations and should be designed so that KSSR-aligned lesson content can be added cleanly.

Avoid hardcoding curriculum content directly inside UI components.

Lesson data should be separated from presentation logic.

---

# 4. Tech Stack

Use the following stack unless the user explicitly approves a change:

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind / Tailwind CSS
- Zustand
- AsyncStorage
- Clerk for authentication
- Stream / GetStream for video and real-time communication
- Stream Vision Agents for optional AI video teacher capability
- Expo API routes, server-side routes, or backend functions for secrets, tokens, AI calls, protected logic, and integrations

Do not introduce new major libraries unless there is a strong implementation reason.

If another library would significantly improve the solution:

1. Explain the benefit.
2. Explain why the current stack is insufficient.
3. Ask for approval.
4. Only add it after approval.

Example:

> This animation can be built manually, but `react-native-reanimated` would give smoother gesture-driven transitions and better performance. Do you want me to add it?

---

# 5. Development Philosophy

Build feature by feature.

For every feature:

1. Understand the requested behavior.
2. Read this file before coding.
3. Identify the smallest useful implementation.
4. Keep the logic understandable.
5. Avoid premature abstractions.
6. Avoid unnecessary dependencies.
7. Keep files focused.
8. Keep state ownership obvious.
9. Handle loading, empty, success, and error states.
10. Test the user flow mentally before completing the feature.

Prefer:

- explicit code
- readable names
- small components
- predictable state
- reusable primitives only when they are genuinely reused

Avoid:

- complex architecture for simple features
- deeply nested components
- unnecessary context providers
- global state for local UI state
- huge components
- hardcoded lesson logic
- duplicated question logic

---

# 6. Decision Making & Clarifications

When requirements are unclear:

- make the safest practical assumption
- explain important assumptions
- proactively recommend better UX or architecture when appropriate

If the user asks for a feature that can be improved significantly, suggest the improvement before or alongside the implementation.

Do not overcomplicate minor decisions.

For implementation details that do not materially change the product, choose a sensible default and continue.

---

# 7. Core App Navigation

Use Expo Router.

Recommended high-level navigation:

```text
app/
  _layout.tsx

  (auth)/
    sign-in.tsx
    sign-up.tsx

  onboarding/
    index.tsx

  (tabs)/
    _layout.tsx
    index.tsx
    subjects.tsx
    progress.tsx
    parent.tsx
    settings.tsx

  subject/
    [subjectId]/
      index.tsx
      topic/
        [topicId].tsx
      lesson/
        [lessonId].tsx

  lesson/
    result.tsx

  parent/
    child/
      [childId].tsx

  settings/
    children.tsx
    subscription.tsx
    profile.tsx
```

The exact structure may evolve, but keep navigation predictable.

Use routes for meaningful screens.

Use modals only for short focused tasks.

---

# 8. Suggested Source Structure

Use this structure unless a feature clearly requires something different:

```text
src/
  components/
    ui/
    layout/
    learning/
    mascot/
    progress/
    parent/

  features/
    auth/
    onboarding/
    subjects/
    lessons/
    quizzes/
    progress/
    rewards/
    parent-dashboard/
    recommendations/
    settings/

  data/
    subjects/
    curriculum/
    lessons/
    questions/

  hooks/

  lib/
    api/
    auth/
    storage/
    analytics/
    lesson-engine/

  store/

  types/

  utils/

assets/
  branding/
  mascot/
  icons/
  illustrations/
```

Keep feature-specific logic inside `features/`.

Keep generic UI primitives inside `components/ui/`.

Do not create a generic abstraction before at least two real use cases exist.

---

# 9. Cerdiq Branding

Use Cerdiq branding consistently.

Cerdiq should feel:

- modern
- warm
- intelligent
- fun
- premium

Do not use random visual styles between screens.

Keep:

- consistent spacing
- consistent corner radius
- consistent card style
- consistent typography hierarchy
- consistent button treatments
- consistent subject colors
- consistent mascot visual language

Avoid making the app look like a generic admin dashboard.

The interface should clearly feel designed for children while still looking polished enough for parents to trust.

---

# 10. Awi Mascot Rules

**Awi** is the primary Cerdiq mascot.

Use Awi consistently throughout the app.

Do not introduce unrelated mascots unless explicitly requested.

Awi can appear in different poses for:

- welcome
- encouragement
- hint
- celebration
- thinking
- reading
- magnifying glass / discovery
- correct answer
- wrong answer guidance
- lesson completion
- streak milestone
- progress achievement

Awi should support the learning experience, not block content.

Good use:

- small illustration beside feedback
- lesson intro
- result celebration
- empty state
- hint card

Avoid:

- oversized mascot blocking questions
- mascot appearing on every component
- distracting animation during reading
- visual clutter

Mascot assets should live under:

```text
assets/mascot/awi/
```

Use descriptive filenames.

Example:

```text
awi-welcome.png
awi-thinking.png
awi-correct.png
awi-try-again.png
awi-magnifying-glass.png
awi-celebrate.png
```

---

# 11. Subject System

The four primary subjects are:

```ts
type SubjectId =
  | "math"
  | "science"
  | "bahasa-melayu"
  | "english";
```

Each subject should support:

- Standard / Year level
- topics
- subtopics
- lessons
- question pools
- difficulty levels
- progress
- mastery
- recommendation scoring

Suggested subject model:

```ts
type Subject = {
  id: SubjectId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
};
```

Do not tie curriculum structure directly to the screen implementation.

---

# 12. Curriculum Structure

Use a hierarchical model.

```text
Subject
  Standard
    Topic
      Subtopic
        Lesson
          Activity
          Questions
```

Example:

```text
Mathematics
  Standard 3
    Money
      Addition of Money
        Lesson 1
        Lesson 2
      Subtraction of Money
      Multiplication of Money
      Division of Money
      Money Literacy
      Solve Problems
```

Curriculum data should be easy to add later without rewriting the learning screen.

Prefer data-driven lesson rendering.

---

# 13. Cerdiq Lesson Philosophy

Cerdiq lessons must not behave like long textbook pages.

Each lesson should be:

- focused
- short
- visually clear
- interactive
- varied
- encouraging
- age-appropriate

Typical session target:

- approximately 3–8 minutes
- 5–12 interactions depending on activity type

A lesson can contain several activity blocks.

Example:

```text
Intro
Mini explanation
Visual example
Try it
Interactive question
Hint
New example
Challenge
Result
```

Do not force every lesson to use the same structure.

Variation is a core Cerdiq feature.

---

# 14. Supported Lesson Activity Types

Cerdiq should support multiple activity types.

Recommended initial types:

```ts
type LessonActivityType =
  | "explanation"
  | "multiple-choice"
  | "multi-select"
  | "true-false"
  | "fill-blank"
  | "type-answer"
  | "match-pairs"
  | "sort-order"
  | "compare"
  | "tap-answer"
  | "image-choice"
  | "drag-drop"
  | "word-builder"
  | "sentence-builder"
  | "number-builder"
  | "story-problem"
  | "flashcard"
  | "listen-answer"
  | "speak-answer"
  | "mini-game";
```

Do not implement every activity immediately.

Build reusable lesson infrastructure, then add activity types incrementally.

---

# 15. Subject-Specific Learning Styles

## Mathematics

Math lessons should use combinations of:

- number recognition
- place value
- mental arithmetic
- number comparison
- ordering
- patterns
- equations
- missing numbers
- word problems
- money
- time
- measurement
- shapes
- data
- estimation
- visual counting
- drag-and-arrange
- number construction

Avoid using only multiple-choice questions.

Examples of varied math interaction:

- tap the larger number
- arrange values smallest to largest
- type the missing answer
- match equations with answers
- drag coins to make RM5.50
- compare two expressions
- solve a short story problem
- select all correct answers

---

## Science

Science lessons should emphasise:

- observation
- classification
- cause and effect
- simple experiments
- prediction
- comparison
- sequencing
- diagrams
- real-world examples
- image-based questions

Possible activities:

- classify animals
- order the stages of a life cycle
- identify parts of a plant
- choose materials based on properties
- predict what happens next
- match object to energy source
- select safe scientific behavior

Keep explanations age-appropriate.

---

## Bahasa Melayu

Bahasa Melayu lessons should include:

- kosa kata
- ejaan
- suku kata
- tatabahasa
- imbuhan
- penjodoh bilangan
- pemahaman
- bina ayat
- susun ayat
- sinonim
- antonim
- kata nama
- kata kerja
- kata adjektif

Activities may include:

- susun perkataan menjadi ayat
- isi tempat kosong
- pilih perkataan yang betul
- padankan perkataan dengan gambar
- bina perkataan
- baca petikan ringkas
- jawab soalan kefahaman

Use Malaysian Bahasa Melayu.

Avoid Indonesian phrasing unless explicitly required.

---

## English

English lessons should include:

- vocabulary
- phonics
- spelling
- grammar
- sentence construction
- reading comprehension
- listening
- speaking where supported
- synonyms
- antonyms
- punctuation

Activities may include:

- word matching
- sentence builder
- missing word
- choose the correct tense
- arrange words
- image vocabulary
- short reading passage
- listening question
- pronunciation practice

Use clear age-appropriate English.

---

# 16. Question Randomisation

Cerdiq must avoid repetitive question sessions.

Do not always return the same questions in the same order.

Each topic should have a question pool.

When generating a session:

1. Filter by topic.
2. Filter by supported difficulty.
3. Exclude recently answered question IDs where possible.
4. Shuffle candidate questions.
5. Mix activity types.
6. Limit similar questions appearing consecutively.

Example:

```ts
createLessonSession({
  topicId,
  difficulty,
  recentQuestionIds,
  questionCount: 8,
});
```

Avoid randomisation that creates invalid or unfair questions.

Randomisation must remain deterministic enough for debugging when needed.

If generated questions are used, validate generated values before rendering.

---

# 17. Question Generation

Where possible, use reusable question templates instead of manually writing hundreds of nearly identical questions.

Example:

```ts
{
  id: "math-addition-basic",
  type: "generated",
  generator: {
    operation: "addition",
    min: 1,
    max: 20
  }
}
```

The question engine may generate:

```text
7 + 4
9 + 3
5 + 8
```

Generated questions must:

- match curriculum level
- stay within sensible limits
- produce valid answers
- avoid accidental duplicates
- respect difficulty
- be child-friendly

Do not use uncontrolled AI generation for core arithmetic correctness.

Use deterministic logic for structured mathematics wherever practical.

---

# 18. Difficulty System

Questions should adapt gradually to performance.

Suggested difficulty levels:

```ts
type Difficulty =
  | "foundation"
  | "easy"
  | "medium"
  | "challenge";
```

Do not jump difficulty dramatically after one answer.

Consider:

- recent accuracy
- number of hints used
- answer speed
- repeated mistakes
- current mastery
- previous attempts

Example rules:

```text
3+ correct with no hints:
  slightly increase difficulty

2+ mistakes in recent questions:
  simplify next question

repeated mistake on same skill:
  show teaching explanation

strong mastery:
  introduce challenge question
```

The purpose is to maintain productive challenge.

Never punish the child with increasingly difficult questions after a mistake.

---

# 19. Wrong Answer Behavior

Wrong answers are part of learning.

Never only display:

```text
Wrong.
```

Better flow:

1. Mark the response gently.
2. Explain why.
3. Show a short hint.
4. Let the child retry when appropriate.
5. Provide a simpler example if the concept is still unclear.

Example:

```text
Almost there!

Remember:
7 + 5 means start at 7 and count 5 more.

Try again.
```

For repeated mistakes:

```text
Let's make it easier first.

7 + 3 = ?
```

Then return to the original skill later.

Do not shame the child.

Avoid:

- red error-heavy UI
- negative language
- losing excessive XP
- harsh buzzer experiences

---

# 20. Correct Answer Behavior

Correct answers should feel rewarding but fast.

Possible responses:

- Great job!
- Nice work!
- You got it!
- Hebat!
- Bagus!
- Tepat!
- Excellent!

Use animation sparingly.

Do not make the child wait through long celebration animations before every next question.

Large celebrations should be reserved for:

- lesson completion
- mastery
- streak milestone
- level achievement
- topic completion

---

# 21. Retry System

When an answer is incorrect, the child should usually have an opportunity to retry.

Recommended logic:

```text
Attempt 1 wrong:
  give hint
  allow retry

Attempt 2 wrong:
  provide explanation
  show correct reasoning
  continue with a related easier question
```

Avoid infinite retries.

The system should learn from mistakes while keeping the session moving.

---

# 22. Lesson Session Mixing

Each lesson session should mix interaction types.

Bad example:

```text
MCQ
MCQ
MCQ
MCQ
MCQ
MCQ
```

Better example:

```text
Visual intro
Tap answer
Sort numbers
Multiple choice
Type answer
Story problem
Compare
Challenge
```

The learning engine should avoid two or three identical activity types in a row when possible.

---

# 23. Lesson Completion Screen

Every lesson completion screen should show:

- lesson completed state
- XP earned
- accuracy
- optional streak
- optional mastery progress
- encouraging Awi pose

Provide clear next actions.

Primary action:

```text
Continue Learning
```

Secondary actions may include:

```text
New Question Set
Another Topic
Choose Subject
Home
```

Never end a lesson with only a Back button.

---

# 24. XP System

XP should motivate learning without becoming overly game-like.

Award XP for:

- completing lessons
- correct answers
- challenge questions
- mastery milestones
- learning streaks

Avoid excessive XP inflation.

Suggested example:

```text
Correct answer: +5 XP
Challenge: +10 XP
Lesson completion: +20 XP
Perfect lesson bonus: +10 XP
```

Keep values configurable.

Do not hardcode XP values throughout components.

---

# 25. Progress System

Track progress per child.

Suggested model:

```ts
type TopicProgress = {
  childId: string;
  subjectId: string;
  topicId: string;
  completedLessons: number;
  accuracy: number;
  masteryScore: number;
  xp: number;
  lastPracticedAt: string;
};
```

Separate:

- completion
- accuracy
- mastery

Completing a lesson does not automatically mean mastering the topic.

---

# 26. Mastery

Mastery should consider multiple sessions.

Suggested mastery calculation may use:

- recent correctness
- question difficulty
- number of attempts
- consistency
- recency

Possible mastery states:

```text
New
Learning
Improving
Strong
Mastered
```

Use child-friendly wording on child screens.

Parent screens may show more detailed metrics.

---

# 27. Recommendations

Cerdiq should recommend what to practice next.

Recommendation priorities:

1. topics with weak mastery
2. incomplete foundational topics
3. topics not practiced recently
4. topics connected to recent mistakes
5. next curriculum topic
6. challenge topics for strong students

Example:

```text
Recommended for you

Fractions
You are improving here.
Let's practise 5 quick questions.
```

Keep recommendation explanations positive.

Do not label children as weak or poor.

---

# 28. Parent Dashboard

Parents should be able to monitor each child.

Important parent metrics:

- lessons completed
- learning minutes
- accuracy
- subject progress
- topic mastery
- learning streak
- recent activities
- recommended improvement areas

Parent dashboard should answer:

```text
What did my child learn?
How often are they learning?
Where are they improving?
What should they practise next?
```

Avoid overwhelming parents with excessive analytics.

Prioritise actionable information.

---

# 29. Multiple Child Profiles

Parents can have multiple child profiles.

The number of available child profiles may depend on subscription level.

Each child profile must have separate:

- progress
- XP
- streak
- lesson history
- recommendations
- mastery
- selected year / Standard

Never mix progress between children.

Suggested model:

```ts
type ChildProfile = {
  id: string;
  parentId: string;
  name: string;
  standard: 1 | 2 | 3 | 4 | 5 | 6;
  avatar?: string;
  createdAt: string;
};
```

---

# 30. Authentication

Use Clerk.

Authentication flow should remain simple.

Supported options may include:

- email
- Google
- Apple

Use secure server-side flows for:

- sensitive tokens
- AI calls
- Stream credentials
- payment secrets

Never expose secrets inside the mobile bundle.

---

# 31. Local-First Learning State

The app should feel responsive even when backend calls are not required.

Use Zustand + AsyncStorage for appropriate local state such as:

- current child
- UI preferences
- lesson session state
- recent question IDs
- locally cached lesson progress
- onboarding completion

Do not store sensitive authentication tokens manually when Clerk already handles authentication securely.

---

# 32. Zustand Guidelines

Create focused stores.

Example:

```text
useAppStore
useChildStore
useLessonStore
useProgressStore
```

Avoid one giant application store.

Do not put every piece of UI state into Zustand.

Local state should remain local when appropriate.

---

# 33. AsyncStorage Guidelines

AsyncStorage can be used for:

- onboarding state
- local preferences
- cached progress
- recent questions
- local lesson session recovery

Wrap storage operations in small helpers.

Example:

```ts
saveLessonProgress()
loadLessonProgress()
```

Do not access AsyncStorage directly from many unrelated components.

---

# 34. AI Tutor

AI tutor features are optional enhancements.

The core learning experience must still work without AI.

AI may help with:

- hints
- explanations
- encouragement
- conversational learning
- personalised examples
- optional tutor sessions

AI should not be responsible for authoritative scoring when deterministic logic is available.

AI calls must run through secure server-side endpoints.

Never expose AI provider keys in the client.

---

# 35. Stream / Video Tutor

Stream / GetStream may support:

- live video teaching
- real-time communication
- AI teacher sessions
- Stream Vision Agents

Treat video tutor as an advanced feature.

Do not make the base learning flow depend on live video.

Always handle:

- permissions
- connection state
- loading
- failure
- reconnect
- session end

Keep tokens server-generated.

---

# 36. UI Design Principles

Cerdiq should be mobile-first.

Design for:

- phones first
- tablets second

Use:

- large readable text
- clear hierarchy
- comfortable tap targets
- generous spacing
- rounded cards
- subtle depth
- playful illustrations
- smooth transitions
- clear progress indicators

Avoid:

- tiny text
- desktop-style tables
- cramped layouts
- excessive gradients
- too many colors on one screen
- generic admin-dashboard visuals

---

# 37. Premium + Fun Design Balance

Premium does not mean dark, corporate, or minimal to the point of being boring.

Fun does not mean chaotic.

Aim for:

```text
clean structure
+ playful shapes
+ friendly mascot
+ controlled color palette
+ polished animation
+ strong typography
```

Use visual hierarchy to keep screens calm.

---

# 38. Subject Visual Identity

Each subject can have a recognizable accent.

Example only:

```text
Math            → blue / violet family
Science         → green / teal family
Bahasa Melayu   → warm orange family
English         → purple / pink family
```

Keep the overall Cerdiq brand consistent.

Do not turn each subject into an entirely different app.

---

# 39. Animation

Use animation to improve perceived quality.

Examples:

- page transitions
- card entrance
- answer feedback
- XP counter
- progress completion
- Awi celebration
- subtle button response

Preferred navigation feel:

- screen slides naturally from previous screen
- avoid sudden full-screen replacement when possible

Animation should remain quick.

Do not add long animations that slow learning.

If better animation requires a new dependency, request permission first.

---

# 40. Accessibility

Always consider:

- readable font sizes
- adequate contrast
- large touch targets
- understandable labels
- reduced reliance on color alone
- screen reader labels on important buttons

Questions must remain understandable without relying only on decorative color.

---

# 41. Responsive Layout

Avoid fixed widths that only work on one phone.

Use:

- flexbox
- percentage width where appropriate
- `maxWidth`
- `minHeight`
- safe area
- responsive spacing

Test mentally against:

- small Android phone
- modern iPhone
- tablet

---

# 42. Components

Create reusable components where reuse is real.

Examples:

```text
PrimaryButton
SecondaryButton
SubjectCard
TopicCard
ProgressBar
XPBadge
AwiFeedback
LessonHeader
QuestionCard
AnswerOption
LessonResultCard
ParentInsightCard
```

Avoid giant `LessonScreen.tsx` files containing every activity implementation.

Use activity components.

Example:

```text
activities/
  MultipleChoiceActivity.tsx
  SortOrderActivity.tsx
  FillBlankActivity.tsx
  MatchPairsActivity.tsx
```

---

# 43. Lesson Renderer

Use a lesson renderer.

Example:

```tsx
function LessonActivityRenderer({ activity }) {
  switch (activity.type) {
    case "multiple-choice":
      return <MultipleChoiceActivity activity={activity} />;

    case "sort-order":
      return <SortOrderActivity activity={activity} />;

    case "fill-blank":
      return <FillBlankActivity activity={activity} />;

    default:
      return <UnsupportedActivity />;
  }
}
```

Keep lesson screens responsible for session flow, not individual question implementation.

---

# 44. Lesson Engine

Create a simple lesson engine under:

```text
src/lib/lesson-engine/
```

Possible responsibilities:

```text
createLessonSession
shuffleQuestions
filterRecentQuestions
calculateDifficulty
calculateScore
calculateXP
calculateMastery
chooseNextActivity
```

Keep each function small and testable.

Avoid turning the lesson engine into one huge class.

Prefer pure functions where possible.

---

# 45. Suggested Lesson Types

Support content categories such as:

```ts
type LessonType =
  | "learn"
  | "practice"
  | "review"
  | "challenge"
  | "story"
  | "mini-game";
```

Use these to vary the child's learning journey.

Example topic flow:

```text
Learn
Practice
Mini-game
Review
Challenge
```

Do not require every topic to have all types.

---

# 46. Cerdiq Example Lesson

Example Mathematics Standard 1:

```text
Topic:
Numbers up to 100

Lesson:
Which Number Is Bigger?

Activity 1:
Awi explains greater and smaller.

Activity 2:
Tap the bigger number:
47 or 42

Activity 3:
Compare:
35 __ 53

Activity 4:
Arrange:
21, 18, 40

Activity 5:
Challenge:
Which number comes between 67 and 69?

Completion:
+20 XP
Accuracy: 80%

Next:
New Set
Next Lesson
Choose Topic
Home
```

---

# 47. Cerdiq Example Bahasa Melayu Lesson

```text
Topic:
Susun Ayat

Activity 1:
Read a short example.

Activity 2:
Arrange:
Ali / bola / bermain / di padang

Correct:
Ali bermain bola di padang.

Activity 3:
Choose the correct word.

Activity 4:
Build another sentence.

Activity 5:
Mini comprehension question.
```

---

# 48. Cerdiq Example Science Lesson

```text
Topic:
Living Things

Activity 1:
Look at three pictures.

Activity 2:
Choose which are living things.

Activity 3:
Match:
Plant → grows
Cat → moves
Rock → does not grow

Activity 4:
Prediction:
What happens if a plant gets no water?

Activity 5:
Challenge question.
```

---

# 49. Cerdiq Example English Lesson

```text
Topic:
Vocabulary — Animals

Activity 1:
Image vocabulary card

Activity 2:
Match word to image

Activity 3:
Complete:
The cat is ___.

Activity 4:
Spell:
TIGER

Activity 5:
Short sentence builder
```

---

# 50. Data Models

Keep data structures typed.

Example:

```ts
type Lesson = {
  id: string;
  subjectId: SubjectId;
  standard: number;
  topicId: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  activities: LessonActivity[];
  xpReward: number;
};
```

Example:

```ts
type LessonActivity = {
  id: string;
  type: LessonActivityType;
  prompt?: string;
  content?: unknown;
  difficulty?: Difficulty;
};
```

Prefer discriminated unions as activity types become more complex.

---

# 51. TypeScript

Use TypeScript properly.

Avoid:

```ts
any
```

unless unavoidable.

Prefer explicit domain types.

Example:

```ts
type MultipleChoiceActivity = {
  id: string;
  type: "multiple-choice";
  prompt: string;
  options: string[];
  correctAnswer: string;
};
```

This makes lesson rendering safer.

---

# 52. Error Handling

Every async feature should handle:

- loading
- error
- retry
- empty state

Do not silently fail.

User-facing errors should be understandable.

Example:

```text
We couldn't load this lesson.

Try again
```

Avoid technical error messages on child screens.

---

# 53. Loading States

Avoid blank screens.

Use:

- skeleton cards
- progress indicator
- simple Awi loading state

Keep loading states lightweight.

---

# 54. Empty States

Empty states should guide the user.

Example parent empty state:

```text
No learning activity yet.

Start a lesson with your child to see their progress here.
```

Example lesson history empty state:

```text
Your learning journey starts here.
```

Use Awi where appropriate.

---

# 55. Network Behavior

Design core lesson interactions to avoid unnecessary network dependence.

If lesson content is already loaded, moving from question to question should be instant.

Do not request the backend after every simple answer unless required.

Batch or sync progress intelligently.

---

# 56. Backend Boundaries

Server-side code should handle:

- secret API keys
- AI requests
- Clerk privileged operations
- Stream token generation
- payment integrations
- protected subscriptions
- secure analytics ingestion
- authoritative account entitlements

Client-side code should handle:

- rendering
- interactions
- lesson session flow
- local UI state
- cached progress
- navigation

---

# 57. Security

Never place secrets in:

```text
EXPO_PUBLIC_*
```

unless they are intentionally public client values.

Do not expose:

- private AI keys
- Stream secrets
- Clerk secret keys
- payment secrets
- database admin credentials

Validate server requests.

Do not trust client-provided subscription state for protected features.

---

# 58. Subscription Logic

Cerdiq may use subscription levels.

Subscription may control:

- number of child profiles
- premium subjects
- advanced analytics
- AI tutor usage
- video tutor usage
- special content packs

Keep entitlement logic centralised.

Do not write subscription checks independently across many screens.

Example:

```ts
canAddChild(subscription, currentChildCount)
```

---

# 59. Parent vs Child Experience

Child screens should be:

- simple
- visual
- encouraging
- low text density

Parent screens may contain:

- charts
- summaries
- insights
- recommendations
- account settings

Do not expose complex parent settings inside child learning screens.

---

# 60. Onboarding

Cerdiq onboarding should be short.

Possible flow:

```text
Welcome
Parent sign-in
Create child profile
Select Standard
Choose learning goal
Start first lesson
```

Avoid long questionnaires.

Get the child learning quickly.

---

# 61. Home Screen

Child home screen should prioritise:

1. Continue learning
2. Recommended lesson
3. Subject selection
4. Streak / XP
5. Recent progress

Do not overload the home screen.

Avoid showing every metric at once.

---

# 62. Subject Screen

Each subject page should show:

- subject name
- progress
- recommended next topic
- topic cards
- mastery indicators

Allow children to explore topics while still highlighting recommendations.

---

# 63. Topic Screen

Topic page may show:

```text
Learn
Practice
Challenge
Review
```

Show topic progress.

Keep the number of choices manageable.

---

# 64. Question UI

Each question screen should clearly separate:

- progress
- question
- interactive area
- feedback
- next action

Do not place too many competing buttons.

Use a large primary action.

---

# 65. Progress Indicator

Children should know how much of the lesson remains.

Use a simple progress bar such as:

```text
4 / 8
```

or a visual bar.

Do not show complex progress percentages unnecessarily.

---

# 66. Feedback UI

Answer feedback should not destroy layout.

Prefer a bottom feedback card or inline feedback area.

Example:

```text
✓ Great job!
```

or

```text
Almost!
A square has 4 equal sides.
Try again.
```

The child should still see the question while reading the feedback.

---

# 67. Audio

Audio may later support:

- pronunciation
- instructions
- vocabulary
- reading
- accessibility

Do not auto-play excessive audio.

Provide clear play controls.

---

# 68. Analytics

Track useful product events.

Examples:

```text
lesson_started
lesson_completed
question_answered
question_retried
hint_used
topic_opened
subject_selected
recommendation_opened
child_profile_created
```

Do not scatter analytics calls everywhere.

Use an analytics wrapper.

---

# 69. Performance

Optimise where it matters.

Avoid premature micro-optimisation.

Important:

- avoid unnecessary rerenders
- avoid giant image assets
- use appropriate image sizes
- keep list keys stable
- lazy load heavy screens where practical
- keep lesson interactions responsive

---

# 70. Image Assets

Use high-quality optimized assets.

Store assets logically.

Example:

```text
assets/
  branding/
    cerdiq-logo.png
    cerdiq-icon.png

  mascot/
    awi/

  subjects/
    math/
    science/
    bahasa-melayu/
    english/
```

Do not duplicate the same image under multiple names.

---

# 71. App Icon / Branding Assets

Cerdiq logo, app icon, splash screen, and Awi mascot must use official provided assets when available.

Do not redraw or replace official Cerdiq assets unless explicitly requested.

---

# 72. Code Style

Prefer:

```ts
const handleAnswer = () => {};
```

over unnecessarily clever patterns.

Use descriptive names.

Bad:

```ts
const x = q.map(...)
```

Better:

```ts
const availableQuestions = questions.filter(...)
```

---

# 73. Component Size

If a component becomes difficult to understand, split it.

Typical warning signs:

- more than one unrelated responsibility
- long conditional rendering
- large amount of activity-specific logic
- many nested functions
- difficult to test mentally

Split by responsibility, not arbitrary line count.

---

# 74. Comments

Use comments to explain **why**, not obvious **what**.

Good:

```ts
// Avoid recently answered questions so repeating a lesson feels fresh.
```

Bad:

```ts
// Filter questions
```

---

# 75. Testing

When implementing core logic, design it so it can be tested.

High-value logic:

- question randomisation
- scoring
- XP
- mastery
- difficulty adjustment
- recommendation ranking
- subscription entitlements

Prefer pure functions.

Do not require UI rendering to test core learning behavior.

---

# 76. Seed Data

During development, seed enough content to demonstrate real behavior.

Do not create only one question per topic.

A development topic should ideally have enough examples to demonstrate:

- randomisation
- retry
- mixed activity types
- difficulty changes
- lesson results

---

# 77. Placeholder Content

Use realistic Cerdiq content.

Avoid:

```text
Lorem ipsum
Question 1
Topic A
Example item
```

Use actual learning examples.

---

# 78. Language

UI may support English and Bahasa Melayu.

Keep translation-ready strings separate from component logic where practical.

Use Malaysian terminology.

Examples:

```text
Mathematics → Matematik
Science → Sains
Progress → Kemajuan
Continue → Teruskan
Try Again → Cuba Lagi
```

Do not mix languages accidentally inside one screen unless intentional.

---

# 79. Content Safety for Children

Content must remain age-appropriate.

Avoid:

- frightening unnecessary examples
- mature topics
- harmful instructions
- unsafe experiments
- inappropriate AI conversations

Science experiment suggestions must be safe and suitable for children.

---

# 80. AI Safety

If conversational AI is added:

- keep AI constrained to educational use
- avoid unrestricted open-ended companion behavior
- use age-appropriate system instructions
- limit unsafe content
- prevent exposure of secrets
- log safely without storing unnecessary child personal data

Never let AI modify grades or subscription entitlements directly.

---

# 81. Privacy

Collect minimal child information.

Do not require unnecessary sensitive information.

Avoid exposing child data publicly.

Parent controls should govern child profiles.

---

# 82. Feature Implementation Template

When asked to implement a feature, follow this mental checklist:

```text
What does the user see?
What state is needed?
Where should the state live?
What data model is required?
What happens on success?
What happens on failure?
Does it work for multiple child profiles?
Does it affect progress?
Does it require persistence?
Does it require backend security?
Can the child understand the next action?
```

---

# 83. Definition of Done

A feature is not complete only because it renders.

Before considering a feature complete, verify:

- expected user flow works
- loading state exists if needed
- empty state exists if needed
- errors are handled
- TypeScript types are reasonable
- mobile layout works
- child UI is understandable
- progress behavior is correct
- data persists where expected
- no sensitive keys are exposed
- code remains understandable

---

# 84. When Fixing Bugs

Do not only patch the visible symptom.

Check:

1. source of truth
2. state update
3. persistence
4. navigation lifecycle
5. stale values
6. duplicated state
7. data mapping

Example:

If a completed lesson does not update the dashboard:

Do not manually refresh the dashboard value.

Find whether:

```text
lesson completion
→ progress store
→ persistence
→ dashboard selector
```

is broken.

---

# 85. Avoid Fake Functionality

Do not create UI that appears functional without real behavior unless explicitly labelled as prototype/mock data.

Buttons should work.

Tabs should work.

Progress should update.

Lesson completion should persist.

If a backend feature is not yet implemented, make the limitation clear.

---

# 86. No Repetitive Lesson Rule

This is a core Cerdiq requirement.

Every repeat attempt should feel meaningfully different.

The app should vary:

- question values
- question order
- activity type
- examples
- story context
- challenge difficulty

Do not repeat identical sets unless the content pool is exhausted.

Store recent question history.

---

# 87. Session Quality Rules

A good Cerdiq session should usually:

- begin easy enough to build confidence
- include several interaction styles
- gradually test understanding
- provide helpful feedback
- avoid long reading
- end with progress and a clear next choice

---

# 88. Recommended Session Algorithm

Example high-level logic:

```ts
const session = createLessonSession({
  topicId,
  childMastery,
  recentQuestionIds,
  count: 8,
});
```

Possible distribution:

```text
2 foundation questions
3 level-appropriate questions
2 mixed questions
1 challenge question
```

Adjust dynamically when required.

---

# 89. Adaptive Learning Example

Student answers:

```text
Q1 correct
Q2 correct
Q3 correct
```

Next questions can become slightly harder.

If:

```text
Q4 wrong
Q5 wrong
```

Then:

```text
show short explanation
reduce complexity
ask related foundation question
```

If the child recovers:

```text
return gradually to normal difficulty
```

---

# 90. Parent Recommendations

Recommendations should be specific.

Bad:

```text
Improve Mathematics.
```

Better:

```text
Practise multiplication facts up to 6 × 6.
Aiman answered 6 of the last 10 multiplication questions correctly.
```

Parent recommendations should explain the action.

---

# 91. Child Recommendations

Child recommendations should remain simple.

Example:

```text
Awi recommends:

Let's practise Money!
5 quick questions
```

Do not show detailed performance weaknesses directly to the child.

---

# 92. Streaks

Streaks can encourage routine.

Do not make streak loss emotionally punishing.

Avoid manipulative wording.

Use positive phrasing.

Example:

```text
3-day learning streak!
```

If streak resets:

Do not display shame-based messages.

---

# 93. Rewards

Rewards may include:

- XP
- stars
- badges
- Awi celebrations
- unlockable visual collectibles

Do not allow rewards to distract from learning.

Rewards should support meaningful achievement.

---

# 94. Future Gamification

Possible future features:

- daily missions
- badges
- collections
- Awi accessories
- topic trophies
- weekly goals
- parent-created goals

Do not build these until requested.

Keep initial implementation focused.

---

# 95. Notifications

Future notification examples:

Parent:

```text
Aiman completed 3 lessons today.
```

Child:

```text
Ready for a 5-minute learning challenge?
```

Notifications should not be spammy.

Do not implement push notifications without user request.

---

# 96. Offline Support

Design the app so lesson content can eventually support offline usage.

Good foundations:

- local lesson cache
- local progress queue
- sync when online

Do not overengineer full offline sync until required.

---

# 97. Naming Conventions

Components:

```text
PascalCase
```

Functions:

```text
camelCase
```

Hooks:

```text
useLessonSession
```

Stores:

```text
useLessonStore
```

Types:

```text
LessonActivity
TopicProgress
```

File names should remain predictable.

---

# 98. Import Hygiene

Prefer clear import groups.

Avoid long relative paths where project configuration provides a clean alias.

Example:

```ts
import { PrimaryButton } from "@/components/ui/PrimaryButton";
```

Do not add path alias configuration unless it is already available or justified.

---

# 99. Styling

Use NativeWind / Tailwind CSS for normal app styling.

Keep class strings readable.

When class lists become repetitive, create a component or helper.

Avoid dynamic Tailwind classes that NativeWind cannot statically resolve.

---

# 100. Screen Transition Behavior

Cerdiq should use smooth page transitions.

Preferred feel:

- forward navigation slides in naturally
- back navigation returns naturally
- modals animate appropriately
- screen changes should not feel like sudden hard replacement

Keep transitions subtle and quick.

---

# 101. Cerdiq Build Priorities

When building the first production-capable version, prioritise:

1. Authentication
2. Child profile
3. Subject selection
4. Topic selection
5. Lesson engine
6. Multiple activity types
7. Retry + feedback
8. XP + completion
9. Progress tracking
10. Parent dashboard
11. Recommendation engine
12. Subscription entitlements
13. AI tutor
14. Video tutor
15. Advanced gamification

Do not build advanced AI before the core learning loop works well.

---

# 102. MVP Learning Activity Types

Start with these activity types first:

```text
multiple-choice
type-answer
true-false
sort-order
match-pairs
fill-blank
story-problem
```

These provide enough variety for the first strong version.

Then expand.

---

# 103. Cerdiq Quality Standard

Before shipping a screen, ask:

```text
Does this feel like Cerdiq?
Does it feel premium?
Is it fun without looking childish?
Can a 7-year-old understand it?
Can a 12-year-old use it without feeling it is for babies?
Can a parent understand the progress?
Is the next action obvious?
```

If not, improve it.

---

# 104. Do Not Do These

Do not:

- use unrelated mascots
- build every lesson as multiple choice
- repeat the exact same questions
- expose secret keys
- make giant components
- use `any` everywhere
- install libraries without approval
- use complex abstractions unnecessarily
- place all state in Zustand
- force children through long lessons
- punish mistakes
- build static buttons with no functionality
- couple lesson content to UI components
- make parent analytics overly technical
- depend on AI for basic arithmetic correctness
- make the UI look like a generic SaaS dashboard

---

# 105. Final Engineering Rule

Every implementation should optimise for four things:

```text
Learning quality
User clarity
Code clarity
Future maintainability
```

When forced to choose between clever code and understandable code:

Choose understandable code.

When forced to choose between visual complexity and clear learning:

Choose clear learning.

When forced to choose between many features and a polished learning loop:

Choose the polished learning loop.

Cerdiq should feel simple to use, rewarding to learn with, and straightforward for developers to continue building.

---

# 106. Instruction to Coding Agent

Whenever the user asks you to build or modify Cerdiq:

1. Read this `AGENTS.md`.
2. Preserve the existing Cerdiq design language.
3. Preserve Awi as the primary mascot.
4. Keep the current tech stack unless approval is given.
5. Do not break existing working features.
6. Implement the smallest complete version.
7. Connect new functionality to real app state.
8. Make lesson experiences varied and non-repetitive.
9. Keep curriculum data separate from UI.
10. Ensure the implementation works well on mobile.
11. Explain important file changes clearly.
12. Recommend improvements when they materially improve the product.
13. Never add a major dependency without permission.
14. Prefer production-quality behavior over fake demo interactions.
15. Keep the project easy to continue inside VS Code.

This file is the primary implementation guide for Cerdiq.
