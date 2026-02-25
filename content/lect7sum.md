---
title: "Lecture 7 Summary"
---

### [00:00:00] Introduction and Course Progress
- The session begins by recapping prior topics covered about understanding data comprehensively.
- The instructor expresses hope to complete the syllabus this semester, emphasizing that this week's focus will be on power and sample size, followed by two more chapters.
- The upcoming section promises flexibility, revisiting some previously introduced concepts, and incorporating student experiences from entrance examinations.

### [00:02:19] Power and Sample Size in Experiments
- When conducting experiments (e.g., testing a new web application to measure user clicks or purchases), it's crucial to understand how long to run the experiment and how many participants to sample.
- Since surveying the entire population is impractical, **sampling** becomes necessary, and determining the **sample size** depends on the population characteristics and desired effect detection.
- The instructor introduces **power**, defined as the **probability of detecting a specified effect size** (e.g., 10% click rate).

- Power analysis helps estimate the sample size needed to confidently detect the effect without committing Type II errors.

### [00:06:04] Estimating Power and Sample Size Using Hypothetical Data
- The approach involves:
  1. Creating **hypothetical data** representing the best guess of the expected population behavior.
  2. Generating a second sample by adding the desired effect size to the first sample.
  3. Using **bootstrap sampling** to repeatedly sample from these datasets.
  4. Conducting **permutation hypothesis tests** between these samples to assess significance.
  5. Repeating this process multiple times to estimate power, which guides sample size decisions.
- Hypothetical data mimics real data but is constructed from informed assumptions, especially useful when real-world data is unavailable or noisy.
- The instructor emphasizes the importance of **inclusive data**—data that truly represents the population—balancing quantity and quality to avoid bias and resource waste.
- Tools in R and Python exist to facilitate such analyses.

### [00:18:32] Transition to Regression and Prediction
- With data collection and cleaning concepts covered, the class transitions to **regression analysis**, revisiting its introduction from a prior course (311).
- Regression models the **relationship between input variables (X)** and an **output variable (Y)**, enabling prediction.
- Statisticians focus on explaining **associations** or dependencies, while data scientists emphasize prediction accuracy.

### [00:20:16] Core Concept: Regression and Prediction
- Regression is used to find relations between predictor variables (inputs) and response variables (outputs).
- By building a model, one can predict the output for unseen input data.
- This is a form of **supervised learning** where the model is trained on known input-output pairs.
- Regression models can also highlight **anomalies** and guide model improvement through parameter updates.

### [00:23:50] Simple Linear Regression Basics
- Simple linear regression involves one predictor variable (X) and one response variable (Y).
- The relationship is often represented by a line, where:
  - **Slope (B1)** indicates how changes in X affect Y (positive slope means both increase together; negative slope indicates inverse relation).
  - **Intercept (B0)** is the constant term representing Y when X=0.
- The regression equation is:

$$y = b_0 + b_1 x$$

- The class clarifies terminology:
  - $b_0$ is the **intercept (constant)**, not a coefficient.
  - $b_1$ is the **coefficient** of X.
- Predictor variables (X) are also called independent variables, features, or attributes.
- The output variable (Y) is also known as dependent, response, or target variable.

### [00:30:57] Data Visualization and Line of Best Fit
- Data points (X, Y pairs) can be plotted as a **scatter plot**.

- The regression line is the **line of best fit** minimizing the distance from all points.
- This line represents the estimated model for prediction.
- Practical implementations are available in R and Python, and options exist to include or exclude the intercept term based on model design.

### [00:34:06] Prediction Errors and Residuals
- The regression line typically does not pass through all points exactly, resulting in **prediction errors**.
- The **residual** is the difference between the observed and predicted values:

$$\epsilon = y - \hat{y}$$


- Residuals can be positive or negative, and simply summing them may misleadingly suggest zero total error due to cancellation.
- To avoid this, the **sum of squared errors (SSE)** is used:

$$SSE = \sum (y_i - \hat{y}_i)^2$$

- This approach penalizes larger errors more heavily and removes the cancellation effect of signs.

### [00:42:00] Error Metrics and Model Evaluation
- The **mean squared error (MSE)** and **root mean squared error (RMSE)** are derived from SSE:

$$MSE = \frac{SSE}{n}, \quad RMSE = \sqrt{MSE}$$

- These metrics measure how well the model fits the data.
- In machine learning contexts, the residual is often called the **loss function**.
- Parameters $b_0$ and $b_1$ are estimated by minimizing this loss, often via **gradient descent** or **ordinary least squares (OLS)**.
- OLS is computationally convenient but sensitive to outliers, especially in small datasets.

### [00:48:06] Prediction vs Explanation in Regression
- Statisticians often emphasize **explanation**: understanding the nature and strength of relationships within the fitted data.
- Data scientists prioritize **prediction**: estimating future outcomes based on input variables.
- This distinction influences model design and evaluation strategies.
- The rise of **explainable AI (XAI)** bridges these perspectives by making predictive models interpretable.

### [00:52:37] Multiple Linear Regression
- Extends simple regression to multiple predictor variables:

$$y = b_0 + b_1 x_1 + b_2 x_2 + \cdots + b_n x_n + \epsilon$$

- This allows modeling complex phenomena (e.g., house price depending on location, size, age).
- Coefficients $b_1, b_2, ..., b_n$ represent the importance and effect size of each predictor.
- Feature importance interpretation is valid **only if features are standardized or normalized**.
- Penalized regressions such as **Lasso** and **Ridge** further refine feature selection and model robustness.

### [00:58:04] Model Evaluation Metrics for Regression
- Common evaluation metrics include:
  - **Sum of Squared Errors (SSE)**
  - **Mean Squared Error (MSE)**
  - **Root Mean Squared Error (RMSE)**
- Increasing the number of features tends to reduce error but risks **overfitting**, where the model learns noise rather than signal.
- To adjust for this, **Residual Standard Error (RSE)** accounts for degrees of freedom:

$$RSE = \sqrt{\frac{SSE}{n-p}}$$

  Where $p$ is the number of predictors.
- These metrics help balance model complexity and predictive accuracy.

### [01:05:46] Coefficient of Determination (R²) and Adjusted R²
- **R²** measures the proportion of variance in the dependent variable explained by the model:

$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$

- Ranges from 0 to 1; higher values indicate better fit.
- Unlike correlation (-1 to 1), R² cannot be negative.
- Adding predictors always increases R², even if they are irrelevant, leading to potential overfitting.
- **Adjusted R²** penalizes adding unnecessary predictors, providing a more balanced measure:

$$R^2_{adj} = 1 - (1-R^2) \times \frac{n-1}{n-p-1}$$

- Adjusted R² is preferred for model comparison.

### [01:07:54] In-Sample vs Out-of-Sample Evaluation and Cross-Validation
- Metrics like R² and p-values are **in-sample** metrics, computed on training data.
- Performance on unseen data (out-of-sample) may differ, risking model misbehavior.
- To address this, data is split into training and validation sets, or **K-fold cross-validation** is employed to maximize data usage and obtain robust performance estimates.

- K-fold cross-validation partitions data into k subsets, iteratively training on k-1 folds and validating on the remaining fold.

### [01:11:23] Model Selection and Stepwise Regression
- Real-world regression often involves many predictor variables.
- Adding more variables does not always improve models due to risks of overfitting and complexity.
- **Stepwise regression** is a strategy for model selection:
  - **Forward selection:** start with a simple model, add variables one by one, assessing improvement.
  - **Backward elimination:** start with all variables, remove the least useful iteratively.
  - **Hybrid approach:** combines forward and backward steps.
- The goal is to find a parsimonious model balancing complexity and predictive performance.

### [01:19:38] Information Criteria for Model Evaluation: AIC and BIC
- **Akaike Information Criterion (AIC)** and **Bayesian Information Criterion (BIC)** introduce penalties for model complexity, helping prevent overfitting.
- AIC formula:

$$AIC = 2p - 2 \ln(L)$$

  Where $p$ is the number of parameters and $L$ is the likelihood (often related to RSS).
- BIC imposes a harsher penalty on complexity than AIC.
- Minimizing AIC or BIC leads to selecting the model with the best trade-off between fit and simplicity.

### [01:24:03] Exhaustive Search vs Stepwise and Practical Considerations
- Searching all possible subsets of predictors (all-subset regression) is computationally expensive and impractical for large feature sets.
- Stepwise regression provides a more efficient heuristic to find a good model.
- Model selection techniques should be combined with domain knowledge and validation results.

### [01:27:16] Closing Remarks and Next Steps
- The session concludes with a brief pause for questions.
- Future classes will explore penalized regression techniques in more detail.
- Students are encouraged to keep up with assignments and revision, as the course content builds progressively on prior foundations.
- Emphasis on the importance of continuous practice and engagement with both theoretical concepts and practical coding exercises in R and Python.

---

### Summary Table: Key Regression Concepts and Metrics

| Concept                   | Definition / Formula                                                 | Notes                                   |
|---------------------------|----------------------------------------------------------------------|-----------------------------------------|
| Simple Linear Regression  | $y = b_0 + b_1 x$                                                    | $b_0$: intercept (constant), $b_1$: coefficient |
| Residual                  | $\epsilon = y - \hat{y}$                                             | Error between observed and predicted   |
| Sum of Squared Errors (SSE) | $\sum (y_i - \hat{y}_i)^2$                                           | Measures model fit error                 |
| Mean Squared Error (MSE)  | $\frac{SSE}{n}$                                                      | Average squared error                    |
| Root Mean Squared Error (RMSE) | $\sqrt{MSE}$                                                         | Error in original units                  |
| Residual Standard Error (RSE) | $\sqrt{\frac{SSE}{n-p}}$                                             | Adjusted for number of predictors       |
| Coefficient of Determination (R²) | $1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$        | Proportion variance explained           |
| Adjusted R²               | $1 - (1-R^2) \times \frac{n-1}{n-p-1}$                               | Penalizes model complexity               |
| Akaike Information Criterion (AIC) | $2p - 2 \ln(L)$                                                      | Model selection with complexity penalty |
| Bayesian Information Criterion (BIC) | Similar to AIC but harsher penalty                                  | Preferred for stricter model selection  |

---

### Key Insights

- **Power analysis and sample size estimation** are critical for designing experiments with sufficient sensitivity to detect desired effects.
- **Regression models** provide a fundamental method to describe and predict relationships between variables, transitioning from simple to multiple inputs.
- **Error metrics** like SSE, MSE, RMSE, and residuals are essential to evaluate model quality, with squared errors preventing cancellation of positive and negative residuals.
- The distinction between **explanation (statistical focus)** and **prediction (machine learning focus)** guides how models are interpreted and used.
- **Feature scaling (standardization/normalization)** is necessary for interpreting coefficient importance in multiple regression.
- **Overfitting** is a key risk when adding too many predictors, necessitating metrics like **adjusted R²**, **AIC**, and **BIC** that penalize model complexity.
- **Stepwise regression** offers a computationally feasible approach to model selection compared to exhaustive subset searches.
- Proper **model validation techniques**, including **cross-validation**, are vital to ensure model generalization beyond training data.

---

### Recommendations for Students

- Engage actively with the provided **R and Python code repositories** to practice regression modeling and power/sample size estimation.
- Review foundational concepts from prior courses (e.g., 311) to solidify understanding of regression and supervised learning.
- Carefully consider **data quality and representativeness** when designing studies and models to avoid bias and inefficient resource use.
- Balance model complexity with interpretability and predictive accuracy through informed feature selection and validation methodologies.