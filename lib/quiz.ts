import fs from 'fs';
import path from 'path';

export type Question = {
  question_no: number;
  question_text: string;
  possible_answers: Record<string, string>;
  correct_answer: string;
  explanation: string;
};

export type QuizSet = {
  id: string;
  title: string;
  questions: Question[];
};

// Point to the 'quiz' directory at the root of the project
const quizDirectory = path.join(process.cwd(), 'quiz');

export function getQuizzes(): QuizSet[] {
  if (!fs.existsSync(quizDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(quizDirectory);
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const id = fileName.replace(/\.json$/, '');
      const fullPath = path.join(quizDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      let questions: Question[] = [];
      try {
        questions = JSON.parse(fileContents);
      } catch (err) {
        console.error(`Error parsing quiz file ${fileName}:`, err);
      }

      // Title formatting rule (e.g. structure_2 -> Structure 2)
      const title = id
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        id,
        title,
        questions,
      };
    });
}
