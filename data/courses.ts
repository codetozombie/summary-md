export type Course = {
  id: string;
  title: string;
  content: string;
};

export const courses: Course[] = [
  {
    id: 'stats-testing',
    title: 'Statistical Significance & Hypothesis Testing',
    content: `### Summary of Video Content: Statistical Significance, Hypothesis Testing, and Experimental Design in Data Science

This session focuses on the key concepts of **statistical significance**, hypothesis testing, and practical approaches to validating experimental results using statistical methods relevant to data science. The instructor emphasizes the importance of lab work and analytical rigor throughout the learning process.

---

### Key Topics Covered

#### 1. **Statistical Significance and P-Value**
- **Statistical significance** helps determine if experimental results are meaningful or due to random chance.
- The **p-value** measures the probability that the observed result (or more extreme) happens under the null hypothesis (chance model).
- A common threshold (alpha) is **5% (0.05)**; if the p-value is less than alpha, the result is considered statistically significant.

#### 2. **Hypothesis Testing**
- Experiments test a null hypothesis (**H₀**) stating no effect exists, against an alternative hypothesis (**H₁**) indicating some effect.
- **Type I error**: Incorrectly rejecting H₀ (false positive).
- **Type II error**: Incorrectly failing to reject H₀ (false negative).

---

### Timeline Table: Key Concept Progression in the Session

| Time Range      | Topic                                      | Key Points                                                                                   |
|-----------------|--------------------------------------------|----------------------------------------------------------------------------------------------|
| 00:00–00:10     | Introduction and Lab Progress              | Emphasis on lab work and theory balance.                                                     |
| 00:10–00:20     | Statistical Significance and P-value       | Definition, calculation, interpretation, and software use.                                   |
| 00:20–00:35     | Hypothesis Testing and Errors              | Null hypothesis, Type I and II errors, practical implications.                               |
` // Note: I truncated the markdown here for brevity, paste your full string!
  },
  {
    id: 'intro-to-python',
    title: 'Intro to Python',
    content: `### Python Basics\n\nWelcome to the Python module. Content coming soon!`
  }
];