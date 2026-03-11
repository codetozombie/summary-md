---
title: "Lecture 8 Notes"
---

### [00:00:01] Introduction and Model Selection Overview
- The session revisits the critical topic of **model selection** in regression analysis, emphasizing its foundational role in predictive modeling.
- The discussion focuses on balancing model complexity and accuracy through methods such as **stepwise regression** and penalty-based model selection criteria.
- Understanding these concepts is vital because adding too many predictors risks **overfitting**, where the model learns noise instead of the underlying pattern.
- Central vocabulary includes **bias**, **variance**, **overfitting**, **underfitting**, and **predictors**.
- The chapter builds upon principles introduced in an earlier course (311), especially the trade-offs between bias and variance.

### [00:01:02] The Bias-Variance Trade-off and Overfitting
- When building predictive models, such as predicting house prices, more predictors added to a model reduce **bias** but increase **variance**.
- Using too few predictors results in a simple model with **high bias** and **low variance**, leading to underfitting.
- Conversely, too many predictors lead to **low bias** but **high variance**, causing overfitting.
- The goal is to find a balance to optimize predictive performance.
- Overfitting occurs when the model fits **noise** rather than the true signal, which degrades performance on new data.

### [00:03:42] Principles Guiding Model Selection — Occam's Razor and Metrics
- To avoid overfitting, **Occam's Razor** advises choosing simpler models before resorting to complex ones.
- Classic model performance metrics like **R squared (R²)** measure how well a model fits the data but can mislead if overfitting occurs.
- To address this, **Adjusted R²** penalizes models that add variables without sufficient explanatory power.
- Several penalization criteria are introduced:
  - **Akaike Information Criterion (AIC)**: Introduced in the 1970s, AIC penalizes additional predictors to discourage overfitting.
  - **Corrected AIC (AICc)**: Adjusts for small sample sizes to prevent misleading model choices.
  - **Bayesian Information Criterion (BIC)**: Imposes a harsher penalty than AIC for extra predictors.
- The formula for AIC is often represented as:

$$AIC = 2p + n \log\left(\frac{RSS}{n}\right)$$

- Where \(p\) is the number of predictors, \(n\) is sample size, and \(RSS\) is residual sum of squares.
- BIC acts as a "harsh punishment" to prevent overfitting, similar to severe consequences for cheating.

### [00:17:27] Model Search Strategies — Exhaustive and Stepwise Regression
- Selecting the best model often involves searching through combinations of predictors.
- **All subsets regression** (exhaustive search) tests every possible subset of predictors but is computationally feasible only for small datasets.
- **Stepwise regression** offers a practical compromise by iteratively adding or removing predictors based on improvement in model performance.
- Three variants exist:
  - **Forward selection**: Start with no predictors and add one at a time.
  - **Backward elimination**: Start with all predictors and remove the least useful one at a time.
  - **Bidirectional (stepwise) selection**: Combines adding and removing predictors dynamically.
- Stepwise regression helps find a near-optimal model efficiently, especially with larger datasets.

### [00:28:47] Penalized Regression Techniques — Ridge and Lasso
- Penalized regression methods add a penalty term to the loss function to control model complexity and improve prediction.
- **Ridge regression (L2 penalty)** shrinks coefficients but rarely sets them to zero, reducing multicollinearity but not performing feature selection automatically.
- **Lasso regression (L1 penalty)** can shrink some coefficients exactly to zero, effectively performing **feature selection** by removing irrelevant predictors.
- The penalty strength is controlled by a **regularization parameter (\(\lambda\))**, which must be tuned.
- These methods help avoid overfitting by discouraging overly complex models.
- In predictive modeling, regularization is crucial, while traditional statistics may focus more on interpretability.

### [00:33:58] Overfitting and Training vs. Testing Data
- Overfitting arises when models are evaluated only on the training data (**in-sample**) without testing on unseen data (**out-of-sample**).
- Memorizing training data ensures perfect fit but poor generalization.
- The analogy of confusing the letters "W" and "M" upside down illustrates how overfitting to the training set's "orientation" can lead to misclassification with new data.
- To combat this, models must be validated on new data to assess true predictive power.

### [00:36:45] Weighted Regression and Its Applications
- **Weighted regression** assigns weights to observations to handle heteroscedasticity or unbalanced data.
- **Inverse variance weighting** assigns lower weights to observations with higher variance, emphasizing more precise data points.
- Weights can also adjust for cases where rows represent multiple instances, balancing their influence.
- While statisticians favor weighted regression for **explanatory** purposes, data scientists use it primarily for **prediction**.
- Caution is issued on **extrapolation**: models should not predict beyond the range of the training data or with predictors not seen during training.

### [00:51:29] Confidence Intervals, Bootstrap, and Model Uncertainty
- Confidence intervals (CI) quantify uncertainty in regression coefficients and predictions, crucial for interpreting model reliability.
- The **bootstrap method** is highlighted as a powerful, non-parametric approach to estimate confidence intervals by resampling with replacement from the data multiple times.
- Each bootstrap sample produces estimates of parameters (e.g., intercept \(a\) and slope \(b\)), which are collected to form empirical distributions.
- Percentile intervals (e.g., 5th to 95th percentile) provide CI estimates.
- This process also extends to prediction intervals, capturing uncertainty in predicted values.

### [01:00:27] Handling Categorical Variables — Factor Variables and Encoding
- Regression requires numerical input, so **categorical variables** (or **factor variables**) must be encoded appropriately.
- Categories can be **unordered** (nominal) or **ordered** (ordinal).
- For unordered categories (e.g., gender: male/female), **binary dummy variables** or **one-hot encoding** are used.
- To avoid **multicollinearity**, only **p-1** dummy variables are included when there are \(p\) categories.
- When categories have many levels (e.g., thousands of towns), encoding all levels creates too many variables, causing overfitting.
- A practical solution is **consolidation**, such as grouping towns into broader regions to reduce dimensionality.
- Ordered categorical variables are better encoded as numeric values preserving the order rather than dummy variables.

### [01:16:31] Interpreting Regression Coefficients and Multicollinearity
- Coefficients reflect **feature importance** when data is normalized or standardized.
- Coefficients also indicate the **direction and strength of correlation** between predictors and output.
- **Multicollinearity** arises when predictors are highly correlated or redundant, impairing model interpretability and stability.
- Examples include redundant variables like gender and sex or including all dummy variables instead of \(p-1\).
- Multicollinearity is primarily a concern in **linear models**; non-linear models are less sensitive to it.
- Data scientists focused on prediction may tolerate correlated variables if it improves accuracy, but statisticians prioritize independence for interpretability.
- The next topic to be explored is **confounding variables**, which are omitted important predictors that can bias results.

---

### Summary Table: Key Regression Concepts and Metrics

| Concept                     | Definition / Formula                                                                 | Notes                                      |
|-----------------------------|--------------------------------------------------------------------------------------|--------------------------------------------|
| Bias-Variance Tradeoff      | Balance between model simplicity and complexity                                      | Avoid fitting noise (overfitting)          |
| AIC                         | \(2p + n \log(\frac{RSS}{n})\)                                                       | Balances fit with complexity               |
| BIC                         | Similar to AIC but harsher penalty                                                   | Stronger penalty for complexity            |
| Stepwise Regression         | Iterative process adding or removing predictors                                      | Forward, Backward, or Bidirectional        |
| Lasso Regression            | Regression with L1 penalty                                                           | Can shrink coefficients to zero            |
| Ridge Regression            | Regression with L2 penalty                                                           | Shrinks coefficients, keeps nonzero        |
| Bootstrap                   | Resampling technique with replacement                                                | Estimates variability and confidence intervals |
| Dummy Variable              | Binary indicator variable used to encode categorical data                            | Use *p-1* for *p* categories               |
| Multicollinearity           | High correlation among predictor variables                                           | Causes instability in coefficients         |
| Weighted Regression         | Assigns weights to observations                                                      | Handles heteroscedasticity                 |

---

### Key Insights

- **Model selection** balances **bias** and **variance** to avoid underfitting and overfitting.
- **Occam's Razor**: prefer simpler models unless complexity is justified.
- **Performance metrics**: **Adjusted \(R^2\)**, **AIC**, and **BIC** penalize model complexity; BIC penalizes more harshly.
- **Model search**: **Stepwise regression** (forward, backward, bidirectional) offers efficient variable selection compared to exhaustive search.
- **Penalized regression**: **Lasso (L1)** performs feature selection; **Ridge (L2)** shrinks coefficients without eliminating features.
- Overfitting arises when evaluating only **in-sample** data; must validate on **out-of-sample** data.
- **Weighted regression** adjusts for heteroscedasticity and unbalanced data via **inverse variance weighting**.
- Avoid **extrapolating** beyond training data range or with unseen predictors.
- Use **bootstrap** to estimate confidence intervals for coefficients and predictions by resampling with replacement.
- **Categorical variables** require encoding: **Dummy variables** for unordered, numeric for ordered, consolidate high cardinality.
- **Multicollinearity** harms model stability and interpretability; manage by removing or combining correlated variables.

---

### Recommendations for Students

- Engage actively with **R and Python** to practice encoding categorical variables and implementing stepwise regression.
- Review foundational concepts from prior courses (e.g., 311) as the current course builds on those concepts.
- Carefully consider **data quality and representativeness** when designing models to avoid bias and inefficient resource use.
- Balance model complexity with interpretability and predictive accuracy through informed feature selection and validation methodologies.
- Use **statistical evidence** (confidence intervals, bootstrap) to prove model improvements rather than relying on marginal accuracy gains.
- Prepare for the next topic on **confounding variables**, which complements the concept of collinearity.
