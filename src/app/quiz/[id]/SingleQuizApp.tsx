'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { QuizSet } from '../../../../lib/quiz';

type QuizState = {
  answers: Record<number, string>;
};

export default function SingleQuizApp({ quiz }: { quiz: QuizSet }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({ answers: {} });
  const [isLoaded, setIsLoaded] = useState(false);

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Ref for swipe handling
  const touchStartX = useRef<number | null>(null);

  // Score tracking
  const score = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.entries(quizState.answers).forEach(([idx, ans]) => {
      const q = questions[Number(idx)];
      if (q) {
        total++;
        if (ans === q.correct_answer) correct++;
      }
    });
    return { correct, total };
  }, [quizState.answers, questions]);

  useEffect(() => {
    if (!quiz.id) return;
    const cacheKey = `quiz-progress-${quiz.id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setQuizState(parsed.quizState || { answers: {} });
        setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
      } catch (e) {
        console.error('Failed to parse cache', e);
      }
    } else {
      setQuizState({ answers: {} });
      setCurrentQuestionIndex(0);
    }
    setIsLoaded(true);
  }, [quiz.id]);

  useEffect(() => {
    if (!isLoaded || !quiz.id) return;
    const cacheKey = `quiz-progress-${quiz.id}`;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ quizState, currentQuestionIndex })
    );
  }, [quizState, currentQuestionIndex, quiz.id, isLoaded]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleAnswerSelect = (answerKey: string) => {
    if (quizState.answers[currentQuestionIndex]) return;
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestionIndex]: answerKey }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const resetCache = () => {
    if (!quiz.id) return;
    const cacheKey = `quiz-progress-${quiz.id}`;
    localStorage.removeItem(cacheKey);
    setQuizState({ answers: {} });
    setCurrentQuestionIndex(0);
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Swipe left -> Next
    if (diff > 50) {
      handleNext();
    } 
    // Swipe right -> Prev
    else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!isLoaded) return null;

  const selectedAnswer = quizState.answers[currentQuestionIndex];
  const isAnswered = !!selectedAnswer;
  const progressPct = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Header Controls */}
      <div className="clean-card p-4 sm:p-5 animate-fade-in-up flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {quiz.title}
          </h1>

          <div className="flex items-center gap-3">
            {score.total > 0 && (
              <div className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                {score.correct}/{score.total} correct
              </div>
            )}
            <button
              onClick={resetCache}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors border border-rose-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
           <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-slate-500">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-100">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div 
          key={currentQuestionIndex} 
          className="clean-card p-5 sm:p-8 min-h-[420px] flex flex-col animate-scale-in"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
              Q{currentQuestion.question_no}
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400 sm:hidden flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              Swipe
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold leading-relaxed mb-6 text-slate-900">
            {currentQuestion.question_text}
          </h2>

          <div className="flex flex-col gap-3 flex-grow stagger">
             {Object.entries(currentQuestion.possible_answers).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrectAnswer = currentQuestion.correct_answer === key;

              let buttonStyles = "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50";
              let letterStyles = "bg-slate-100 text-slate-600";

              if (isAnswered) {
                if (isCorrectAnswer) {
                  buttonStyles = "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm";
                  letterStyles = "bg-emerald-500 text-white";
                } else if (isSelected) {
                  buttonStyles = "border-rose-300 bg-rose-50 text-rose-900 shadow-sm";
                  letterStyles = "bg-rose-500 text-white";
                } else {
                  buttonStyles = "border-slate-100 text-slate-400 bg-white opacity-50";
                  letterStyles = "bg-slate-50 text-slate-400";
                }
              }

              return (
                <button
                  key={key}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(key)}
                  className={`animate-fade-in-up group flex items-center p-4 rounded-xl text-left transition-all duration-200 font-medium border ${buttonStyles} ${!isAnswered ? 'cursor-pointer active:scale-[0.99] hover:shadow-sm' : 'cursor-default'}`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg mr-4 text-sm font-bold transition-colors ${letterStyles}`}>
                    {key}
                  </span>
                  <span className="flex-grow text-sm sm:text-base">{value}</span>

                  {isAnswered && isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <svg className="w-5 h-5 ml-2 flex-shrink-0 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <div className="min-h-[80px] mt-6">
            {isAnswered && (
              <div className={`p-4 rounded-xl text-sm leading-relaxed animate-scale-in border ${
                  selectedAnswer === currentQuestion.correct_answer 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                <p className="font-semibold mb-1 flex items-center gap-2">
                  {selectedAnswer === currentQuestion.correct_answer ? '✓ Correct' : '✗ Incorrect'}
                </p>
                {currentQuestion.explanation && (
                  <p className="mt-1.5 text-sm opacity-90">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border ${
                currentQuestionIndex === 0 
                  ? 'bg-slate-50 text-slate-400 border-transparent cursor-not-allowed hidden sm:flex' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>

            <div className="text-xs hidden sm:flex items-center gap-1.5 text-slate-400">
              <kbd className="px-1.5 py-0.5 rounded text-xs font-mono bg-slate-100 border border-slate-200">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded text-xs font-mono bg-slate-100 border border-slate-200">→</kbd>
              <span className="ml-1">to navigate</span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                currentQuestionIndex === questions.length - 1 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed hidden sm:flex' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
