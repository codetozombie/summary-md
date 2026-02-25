---
title: "Lecture 7 Notes"
---

### Lecture 7: Power, Sample Size, and Regression Modeling in Data Science

#### Introduction: Understanding Power and Sample Size in Experimental Design and Regression Analysis

**[00:00:00 ~ 00:04:12]** This chapter concludes a critical phase in the data science curriculum by delving into two foundational concepts: **power and sample size** in experimental design, and **regression modeling** for prediction and explanation. The significance of these topics lies in their capacity to guide data scientists on how to design experiments effectively and how to build models that capture relationships between variables for forecasting or insight.

* **Power** is defined as the *probability of detecting a specified effect size* within a population given a particular sample size.
* **Effect size** refers to the magnitude of the phenomenon or difference one expects to observe, such as 10% of users clicking on an ad.
* The chapter also revisits key statistical concepts such as **hypothesis testing**, **sampling**, **type II error**, and **bootstrapping**, which collectively influence how data is gathered, analyzed, and interpreted.
* The transition into **regression and prediction** introduces the fundamental statistical and machine learning technique of modeling the relationship between an input variable(s) and an output variable to make informed predictions.

---

#### Section 1: Power and Sample Size - Designing Effective Experiments

**[00:03:11 ~ 00:08:26]** When running experiments, such as measuring user clicks on a new web application, one cannot test the entire population; instead, a **sample** must be drawn to infer behavior. The question arises: *how large should this sample be to confidently detect an effect?*

* The answer involves understanding the **power** of a test: the probability that the experiment detects the effect size (e.g., 10% click-through rate) if it truly exists. 

* To estimate power, one must:
    * Create **hypothetical data** representing best guesses of the population.
    * Generate a second sample by adding the desired effect to the first sample.
    * Use **bootstrapping** and **permutation hypothesis testing** to repeatedly sample and test for significant differences.
    * Calculate the proportion of tests where the effect is detected, which estimates power.
* This process informs the **sample size** required to detect the effect reliably without wasting resources.
* A balance is needed: too small a sample risks **type II error** (false negatives), while too large a sample wastes money and computational effort.
* The emphasis is on collecting **inclusive data**—data that comprehensively represents the population of interest, avoiding "chaff" or irrelevant information.

**Key Points:**
* Power quantifies the likelihood of detecting an effect given sample and effect size.
* Hypothetical and synthetic data can simulate real-world scenarios to estimate power.
* Bootstrapping and permutation tests underpin power estimation.
* Efficient sampling balances cost, accuracy, and representativeness.

---

#### Section 2: Regression and Prediction - Modeling Relationships Between Variables

**[00:18:32 ~ 00:25:38]** Regression techniques aim to uncover the **relationship (association)** between an **input variable (X)** and an **output variable (Y)**.

* The goal is to create a **model** that allows prediction of Y given X. This is a cornerstone of **supervised learning** in machine learning.
* In the simplest case, **simple linear regression** models the relationship with the equation:

$$y = b_0 + b_1 x + \epsilon$$

Where:
* $b_0$ is the **intercept** (constant term).
* $b_1$ is the **coefficient** (slope) indicating the magnitude and direction of X's effect on Y.
* $\epsilon$ is the **error term**, accounting for deviations between observed and predicted values.

* The slope $b_1$ can be interpreted as:
    * Positive slope: Y increases as X increases.
    * Negative slope: Y decreases as X increases.
* The distinction between **correlation** and **regression** is highlighted:
    * Correlation measures the *strength* of association (range from -1 to 1).
    * Regression quantifies the *nature* of the relationship (direction and magnitude).
* The **regression equation** is visualized as a **line of best fit** through scatter plot data points, minimizing deviations.

* Residuals, defined as the difference between observed and predicted values, are crucial for assessing model performance.

**Key Points:**
* Regression creates a predictive model linking inputs to outputs.
* Simple linear regression focuses on one input variable.
* The error term captures unexplained variation.
* Understanding regression coefficients is essential for interpretation.

---

#### Section 3: Error Measurement and Model Evaluation

**[00:34:49 ~ 01:03:53]** A key challenge in regression is quantifying how well the model fits the data, given that predicted values rarely match observed values perfectly.

* The **residual** (error) is calculated as:

$$\epsilon_i = y_i - \hat{y}_i$$

Where $y_i$ is the observed value and $\hat{y}_i$ is the predicted value. 


* Simply summing residuals is flawed because positive and negative errors can cancel out.
* To avoid this, the **Residual Sum of Squares (RSS)** or **Sum of Squared Errors (SSE)** is used:

$$RSS = \sum_{i=1}^n (y_i - \hat{y}_i)^2$$

* This squares the errors to ensure positivity and penalizes larger errors more heavily.
* Related metrics include:
    * **Mean Squared Error (MSE)**: Average squared error.
    * **Root Mean Squared Error (RMSE)**: Square root of MSE, in original units of Y, often more interpretable.
    * **Residual Standard Error (RSE)**: Adjusts error by degrees of freedom (number of predictors and samples).
* The **loss function** in machine learning is essentially the measure of error (often MSE) minimized during model training, e.g., via **gradient descent**.
* The classical method to estimate regression coefficients minimizing squared errors is called **Ordinary Least Squares (OLS)**.
* Limitations of OLS include sensitivity to **outliers** and computational cost in large datasets, prompting alternative methods.

**Key Points:**
* Residuals quantify model prediction errors.
* RSS and its derivatives provide robust error metrics.
* Minimizing error metrics is central to model fitting.
* OLS is foundational but has practical limitations.

---

#### Section 4: Prediction vs. Explanation in Regression

**[00:48:06 ~ 01:01:21]** Regression serves two main purposes:
1.  **Explanation** – Understanding the relationship between variables and interpreting coefficients, favored by statisticians.
2.  **Prediction** – Accurately forecasting outcomes for new data, favored by data scientists and machine learning practitioners.

* For example, predicting university GPA based on high school scores involves acknowledging external factors (e.g., lifestyle changes) that can cause deviations between expected and actual outcomes.
* The chapter stresses the importance of data quality and variability in making accurate predictions, noting that a model explaining past data well may not generalize to unseen data.

**Key Points:**
* Explanation focuses on interpreting model parameters.
* Prediction focuses on accuracy on new data.
* Both require careful consideration of data and model fit.
* Real-world factors can complicate predictive accuracy.

---

#### Section 5: Multiple Linear Regression and Feature Importance

**[00:52:37 ~ 00:58:58]** Extending simple linear regression, **multiple linear regression** models the output as a function of several input variables:

$$y = b_0 + b_1 x_1 + b_2 x_2 + \cdots + b_p x_p + \epsilon$$

* Each $b_i$ coefficient represents the effect of the corresponding feature $x_i$ on the target variable.
* The model can incorporate diverse variables such as location, building age, and room size in housing price prediction.
* **Feature importance** can be inferred from the magnitude of coefficients but only when input features are **standardized or normalized** – otherwise, coefficient scales may be misleading.
* Encoding categorical variables into numeric values (e.g., male = 0, female = 1) is necessary for regression algorithms; **one-hot encoding** expands categorical variables into multiple binary features.
* The addition of more features generally reduces error but risks **overfitting**, where the model learns noise rather than signal.

**Key Points:**
* Multiple regression models multiple predictors simultaneously.
* Standardization is crucial for meaningful coefficient interpretation.
* Encoding categorical variables is required for numerical modeling.
* Overfitting is a key risk with many features.

---

#### Section 6: Model Assessment Metrics and Overfitting

**[00:58:04 ~ 01:11:20]** Model evaluation metrics for regression include:
* **Root Mean Square Error (RMSE)** and **Mean Square Error (MSE)**—measuring average prediction error.
* **Coefficient of Determination (R²)**—indicates the proportion of variance explained by the model, ranging from 0 to 1.
* **Adjusted R²**—modifies R² to penalize models with many predictors to avoid overfitting.

* Despite good in-sample performance, models can perform poorly on unseen data, necessitating **validation techniques** like:
    * **Hold-out validation** – reserving a portion of data for testing.
    * **K-Fold cross-validation** – partitioning data into K subsets for training and testing in rotation, reducing bias from data splitting.
* These validation methods assess **out-of-sample performance**, crucial for trustworthy predictions.

**Key Points:**
* Evaluation metrics measure model fit and predictive accuracy.
* Adjusted R² accounts for feature count to prevent overfitting illusions.
* Cross-validation provides robust model assessment beyond training data.

---

#### Section 7: Model Selection and Stepwise Regression

**[01:13:15 ~ 01:28:02]** Selecting the best regression model involves balancing complexity and performance:
* Adding more variables can reduce error but risks overfitting and increased computational cost.
* The **Akaike Information Criterion (AIC)** and **Bayesian Information Criterion (BIC)** are metrics used to penalize model complexity and guide selection toward parsimonious models.
    * AIC formula:

$$AIC = 2p - N + N \log\left(\frac{RSS}{N}\right)$$

Where $p$ is the number of predictors, $N$ is sample size, and $RSS$ is residual sum of squares.
    * BIC penalizes model complexity more harshly than AIC.
* **All-subset regression** explores every possible combination of predictors but is computationally expensive with many features.
* **Stepwise regression** offers a practical alternative:
    * **Forward selection** starts with a simple model and adds variables if they improve fit.
    * **Backward elimination** starts with a full model and removes variables that contribute little.
    * **Hybrid approaches** combine both strategies.
* The goal is to identify a model minimizing AIC (or maximizing adjusted R²) while maintaining interpretability and avoiding overfitting.

**Key Points:**
* Model selection balances fit and complexity.
* Information criteria like AIC/BIC guide penalized model evaluation.
* Stepwise regression provides efficient variable selection.
* Parsimonious models are preferred to avoid overfitting and enhance interpretability.

---

### Conclusion: Integrating Experimental Design and Regression Modeling for Effective Data Science

* This chapter has woven together the critical concepts of **power analysis, sample size determination, regression modeling, error measurement, model evaluation, and selection**.
* Understanding **power** ensures experiments are designed with enough data to detect meaningful effects without waste.
* **Regression**, both simple and multiple, remains a fundamental tool for modeling relationships and making predictions, with attention to proper error metrics and validation techniques essential for trustworthy outcomes.
* The tension between **explanation and prediction** highlights the dual roles of regression in statistics and machine learning.
* Techniques such as **standardization, encoding, regularization, and penalized model selection** safeguard against common pitfalls like overfitting and misinterpretation.
* Practical advice on **stepwise regression and information criteria** empowers data scientists to navigate model complexity effectively.
* The chapter encourages continuous practice with computational tools like R and Python, emphasizing hands-on experimentation to solidify theoretical concepts.
* As the course advances, these foundations will support more advanced methods in regression and classification, rounding out a robust data science toolkit.

**Final takeaway bullet points:**
* Power and sample size calculation are vital for valid experimental conclusions.
* Regression models quantify and predict relationships between variables.
* Residuals and sum-of-squares metrics measure model accuracy.
* Overfitting is mitigated by penalization and validation strategies.
* Model selection balances fit, complexity, interpretability, and computational feasibility.
* Integration of statistical theory and computational practice is key to effective data science.