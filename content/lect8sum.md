---
title: "Lecture 8 Summary"
---

### [00:00:00] Model Selection and Bias-Variance Tradeoff
- The session revisits **model selection** and **stepwise regression**, emphasizing foundational concepts from previous courses (e.g., 311).
- The lecture covers theoretical principles, model evaluation metrics, variable encoding, and practical considerations for predictive modeling.
- **Bias-Variance Tradeoff**:
  - Increasing the number of predictors reduces bias but increases variance, risking **overfitting**.
  - Simpler models have higher bias but lower variance; complex models have low bias but high variance.
  - The goal is to find an optimal balance to avoid fitting noise in the data.
- **Occam's Razor Principle**:
  - Prefer simpler models before moving to complex ones to avoid unnecessary use of computational resources and overfitting.

### [00:04:30] Model Performance Metrics
- Various metrics are used to evaluate model fit and complexity:
  - **R-squared (R²)**: Measures explained variance; higher is better but can be misleading with many predictors.
  - **Adjusted R-squared**: Penalizes for added variables to prevent overfitting.
  - **Akaike Information Criterion (AIC)**: Penalizes model complexity, balancing fit and simplicity. Designed in the 1970s by Akaike.
  - **Corrected AIC (AICc)**: Adjusts AIC for small sample sizes.
  - **Bayesian Information Criterion (BIC)**: Imposes a harsher penalty on extra variables, often leading to simpler models.
- Standard formulas for evaluation include:

$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$

$$AIC = 2p - 2 \ln(L)$$

- Where $p$ is the number of parameters and $L$ is the likelihood.
- BIC imposes a stronger penalty on complexity than AIC, suitable for larger penalties on variable count.

### [00:11:00] Stepwise Regression Techniques
- **Model Selection Techniques**:
  - **All-subsets regression**: Exhaustive search of all variable combinations; computationally expensive and feasible only for small datasets.
  - **Stepwise regression**: Balances feasibility and model performance for larger datasets.
    - *Forward selection*: Start with no variables, add one at a time if beneficial.
    - *Backward elimination*: Start with full model, remove variables iteratively.
    - *Bidirectional (add and drop)*: Add or remove variables dynamically based on improvement.
- Stepwise regression helps find a parsimonious model balancing complexity and predictive performance.

### [00:20:00] Penalized Regression Methods
- **Penalized Regression**:
  - **Ridge Regression (L2 penalty)** and **Lasso Regression (L1 penalty)** are used to control overfitting and perform feature selection.
  - **Lasso** can shrink coefficients to zero, effectively removing irrelevant features.
  - **Ridge** requires tuning hyperparameters (e.g., lambda) to control penalty strength but keeps coefficients nonzero.
- These methods are powerful for feature selection and controlling model complexity when dealing with many predictors.

### [00:32:00] Weighted Regression and Data Variance
- **Weighted Regression**:
  - Useful when observations have different variances or represent multiple cases.
  - **Inverse variance weighting** assigns lower weights to noisy data and higher weights to precise data.
- This approach handles imbalanced data and ensures that reliable observations influence the model more heavily.

### [00:42:00] Prediction vs. Explanation and Extrapolation
- **Prediction vs. Explanation**:
  - Statisticians often focus on model interpretability; data scientists prioritize **prediction accuracy**.
  - The rise of **explainable AI (XAI)** bridges these perspectives by making predictive models interpretable.
- **Cautions**:
  - Caution against extrapolation beyond the data range and using predictors different from those used in training.
  - Avoid extrapolating predictions beyond the training data's feature distribution or geographic domain.
- Prediction accuracy should be supported by statistical evidence, not just marginal improvements.

### [00:50:00] Confidence Intervals and Bootstrap Methods
- **Confidence Intervals and Bootstrap**:
  - Use **bootstrap sampling** with replacement for estimating confidence intervals of regression coefficients and predictions.
  - Involves repeated resampling, fitting, and ordering coefficients to find percentile-based intervals.
- The importance of **randomization** in bootstrap sampling ensures variability in resamples.
- Stress on proving model improvements with statistical evidence (e.g., p-values, confidence intervals).

### [00:59:00] Handling Categorical Variables in Regression
- **Categorical variables** cannot be directly used; require encoding:
  - **Dummy variables (one-hot encoding)** for unordered categories (e.g., gender: male/female).
  - For **k categories**, create *k-1* dummy variables to avoid **multicollinearity**.
  - In **R**, this is handled automatically; in **Python**, the user must manage dummy variables carefully.
- **Handling many levels (e.g., towns or regions)**:
  - High cardinality leads to many dummy variables, risking overfitting.
  - Strategy: **Group categories** (e.g., convert towns into fewer regions) to reduce dimensionality.
- **Ordered categorical variables**:
  - Encode with numeric values preserving order (e.g., traffic lights: red=2, amber=1, green=0).
  - Avoid one-hot encoding for ordered factors to preserve meaningful order information.

### [01:09:00] Multicollinearity and Correlation Among Predictors
- **Multicollinearity**: Occurs when predictors are highly correlated or one is a linear combination of others.
- Leads to redundancy and instability in coefficient estimates.
- Examples: Including both gender and sex variables or using all dummy variables instead of *k-1* causes perfect multicollinearity.
- In machine learning, multicollinearity is less problematic for prediction but critical in interpretability-focused statistical models.
- Understanding and managing **multicollinearity** is critical for reliable and interpretable linear models.

---

### Summary Table: Key Regression Concepts and Metrics

| Concept                     | Definition / Formula                                                                 | Notes                                      |
|-----------------------------|--------------------------------------------------------------------------------------|--------------------------------------------|
| Bias-Variance Tradeoff      | Balance between model simplicity and complexity                                      | Avoid fitting noise (overfitting)          |
| R² (Coefficient of Determination) | $1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$                       | Proportion variance explained              |
| Adjusted R²                 | Penalizes for number of predictors                                                   | Preferred for model comparison             |
| AIC (Akaike Info Criterion) | $2p - 2 \ln(L)$                                                                      | Balances fit with complexity               |
| BIC (Bayesian Info Criterion) | Similar to AIC but harsher penalty                                                 | Stronger penalty for complexity            |
| Stepwise Regression         | Iterative process adding or removing predictors                                      | Forward, Backward, or Bidirectional        |
| Lasso Regression            | Regression with L1 penalty                                                           | Can shrink coefficients to zero            |
| Ridge Regression            | Regression with L2 penalty                                                           | Shrinks coefficients, keeps nonzero        |
| Bootstrap                   | Resampling technique with replacement                                                | Estimates variability and confidence intervals |
| Dummy Variable              | Binary indicator variable used to encode categorical data                            | Use *k-1* for *k* categories               |
| Multicollinearity           | High correlation among predictor variables                                           | Causes instability in coefficients         |

---

### Key Insights

- **Effective model selection balances bias and variance**, penalizes complexity, and avoids overfitting using metrics like AIC, BIC, and adjusted R².
- **Stepwise regression** is a practical approach to variable selection when exhaustive search is infeasible.
- **Penalized regressions (Lasso and Ridge)** are powerful for feature selection and controlling model complexity.
- Proper **encoding of categorical variables** is essential, especially when dealing with many categories or ordered factors.
- Understanding and managing **multicollinearity** is critical for reliable and interpretable linear models.
- Use **bootstrap methods** to quantify uncertainty in model coefficients and predictions.
- Avoid extrapolation beyond training data range and use only predictors included in model training for forecasting.
- Prediction accuracy should be supported by statistical evidence, not just marginal improvements.

---

### Recommendations for Students

- Engage actively with **R and Python** to practice encoding categorical variables and implementing stepwise regression.
- Review foundational concepts from prior courses (e.g., 211, 311) as the current course builds on those concepts.
- Carefully consider **data quality and representativeness** when designing models to avoid bias and inefficient resource use.
- Balance model complexity with interpretability and predictive accuracy through informed feature selection and validation methodologies.
- Use **statistical evidence** (p-values, confidence intervals) to prove model improvements rather than relying on marginal accuracy gains.