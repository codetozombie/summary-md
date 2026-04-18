---
title: "Lecture 7 Notes"
---

### Lecture 7: Power, Sample Size, and Regression Modelling

#### Introduction: Closing Chapter 3 and Stepping into Regression

**[00:00:00 ~ 00:01:24]** This lecture wraps up the final topic of Chapter 3 — **power and sample size** — and then steps into **Chapter 4: Regression and Prediction**, which will occupy us through the remainder of the semester. Regression content is partly a revisiting of Stats 311 ideas (now grounded in the data we've learned to collect properly) and partly new statistical framing that classical statisticians bring to the same machinery.

By this point in the course, you should already have encountered a lot of the vocabulary that follows: some from the WQU entrance examination, some from the lab work, and some from the earlier lectures.

---

#### Section 1: Power and Sample Size — The Question

**[00:01:24 ~ 00:03:34]** Before you run an experiment, you have to decide how long to collect data for. Say you've put an advert on a web page and you want to know whether users will click. You cannot run the experiment on the entire world (the population), so you must **sample**. The question is:

> **How large should the sample be?**

Too small — you miss the real effect. Too large — you waste money and time. This is the question **power and sample size** are designed to answer.

If your sample is too small, your decision will lean toward $H_1$ when it shouldn't — which is a **Type II error** (from Lecture 6). The way to quantify "large enough" is through the concept of **power**.

---

#### Section 2: Effect Size and the Definition of Power

**[00:03:34 ~ 00:06:04]** Two linked concepts:

**Effect size.** The magnitude of the effect you want to be able to detect — for example, *"I want to detect at least a 10% click-through rate"*, or *"I want to see at least a 2% lift in revenue"*. The effect size is how large a real difference has to be before you would care about it.

**Power.** The probability of **detecting that effect size**, given the characteristics of your population. Formally:

> **Power** = probability of detecting a specified effect size, given the population characteristics and sample size.

If power is high, the test will reliably catch a real effect when one exists. If power is low, real effects will slip through undetected (and you commit Type II errors).

The goal of the sample-size calculation is: pick the smallest $n$ that gives you enough power to detect the effect size you care about.

---

#### Section 3: The Five-Step Power Procedure

**[00:06:04 ~ 00:11:07]** The lecturer's preferred data-science procedure — simulation-based, using the bootstrap you already know.

**Step 1 — Start with hypothetical data.** Construct a dataset that represents your **best guess** about the real world. For example, a "box" containing 20 ones (clicks) and 80 zeros (no-clicks) — an implicit click probability of:

$$
p \;=\; \frac{20}{20 + 80} \;=\; 0.2
$$

**Step 2 — Create a second sample with the desired effect added.** Build a second box that represents what the world would look like *if* your effect size were real. For example, 33 ones and 67 zeros — now the click probability has been inflated to reflect the effect you want to detect.

**Step 3 — Bootstrap-sample from each box.** Draw a sample of size $n$ from each box. The value of $n$ is what we are trying to determine.

**Step 4 — Run a permutation hypothesis test.** Compare the two samples and record the difference. Test for **significance** as covered in Lecture 6.

**Step 5 — Repeat many times.** The proportion of iterations in which the test correctly **detects the effect** is your estimate of **power**.

By varying $n$ and repeating, you find the smallest $n$ that achieves your target power (commonly 80% or 90%).

---

#### Section 4: Why Hypothetical Data Is Used

**[00:11:07 ~ 00:14:35]** A fair question: if we can collect real data, why bother with hypothetical data for power calculations?

Two reasons:

- **Real data is noisier than you think.** The fact that tomatoes cost 10 GHS at the market today does not mean they always cost 10 GHS. Real observations vary; what you actually want to know is what the *underlying* effect looks like once you've averaged out the noise.
- **You need to plan the study** *before* you collect the real data — otherwise there's no point in computing sample size at all. Hypothetical data lets you reason about *what sample size you would need* under plausible scenarios for the effect size.

The hypothetical construction represents what you *expect* to see; bootstrap resampling then tells you how many observations you'd need to detect it reliably.

---

#### Section 5: Why "Inclusive Data" Matters More Than Raw Volume

**[00:14:35 ~ 00:17:47]** Power calculations matter because collecting data is expensive — expensive in money, in time, and in computing resources. The guiding principle:

> A little **inclusive data** is worth more than a lot of uninclusive data.

"Inclusive" means the data actually reflects what you're trying to measure. Big data full of noise or irrelevant observations (chaff) can be worse than a small, focused sample. Every power calculation is, at root, an attempt to find the sweet spot between under- and over-collection.

This concept closes Chapter 3. Python and R both ship implementations of power and sample-size calculators — you invoke the function, feed in your effect size and target power, and read off $n$.

---

#### Section 6: Regression — The Goal

**[00:17:47 ~ 00:22:02]** We now open Chapter 4. **Regression** is about finding the **relation** (or **association**, in statistician terminology) between input variables $X$ and an output variable $Y$. Once we know the relation, we have a **model** — and with the model, we can make **predictions**:

> Regression → Model → Prediction.

**Two perspectives on the same machinery:**

- **The statistician** uses regression to **explain** the linear relationship between $X$ and $Y$. They care about which variables matter, how much, and why. Classical regression research was centred on understanding the data that was used to fit the model.
- **The data scientist** uses regression to **predict**. Given new values of $X$, what will $Y$ be? Explanation is secondary; *predictive accuracy on unseen data* is the primary goal.

In ML terms, regression is a **supervised learning** problem — each training row comes with both its input features $X$ and its known target $Y$. The machinery produces a **regressor**, a model that maps inputs to outputs.

---

#### Section 7: Regression vs Correlation

**[00:24:43 ~ 00:27:31]** Both tell us something about the relationship between $X$ and $Y$, but they answer different questions:

| Metric | What it measures |
| --- | --- |
| **Correlation** | The **strength** of association between $X$ and $Y$ |
| **Regression** | The **nature** of the relationship — i.e., the actual functional form |

Correlation gives you one number ($r \in [-1, +1]$) describing how tightly $X$ and $Y$ move together. Regression gives you an **equation** that lets you compute a predicted $Y$ from any given $X$.

---

#### Section 8: The Simple Linear Regression Equation

**[00:27:31 ~ 00:30:12]** From high-school algebra, the equation of a straight line is $y = mx + c$. In statistics — because 26 English letters aren't enough to name every variable in a model — we use subscripts:

$$
y \;=\; b_0 + b_1 x
$$

The naming convention used in this course:

- $b_0$ — the **constant** / **intercept**. The value of $y$ when $x = 0$. (Not called a "coefficient" in this course's convention.)
- $b_1$ — the **coefficient** of $x$. The slope of the line. Same thing as $m$ in high-school notation.

**Terminology map:**

| Role | Names you'll see |
| --- | --- |
| Input ($x$) | predictor, independent variable, feature, attribute |
| Output ($y$) | response, dependent variable, target, outcome |

---

#### Section 9: Fitting a Line — Residuals and the Error Term

**[00:30:12 ~ 00:37:21]** Collect real-world $(x, y)$ pairs — for instance, height vs age — and plot them. You get a **scatter plot**, and from high-school elective-maths days you'll remember how to draw a **line of best fit** through it by hand.

That best-fit line **is** the regression equation. But it will not pass exactly through every point. A given observation $y$ at input $x$ sits slightly above or below the line's predicted value.

**True model vs fitted model.** The *true* relationship in the world is:

$$
y \;=\; b_0 + b_1 x + \varepsilon
$$

where $\varepsilon$ is the (unknown) error term that captures everything we can't see. In practice we never see this model — we only have an **estimate**:

$$
\hat{y} \;=\; \hat{b_0} + \hat{b_1} x
$$

The "hat" on each symbol denotes that this is an **estimate**, not the true quantity. Notice that $x$ has no hat — it's the original, observed input.

**The residual.** The discrepancy between the actual observed $y$ and the fitted prediction $\hat{y}$ is called the **residual**:

$$
\varepsilon \;=\; y - \hat{y}
$$

We want this residual to be as small as possible for every observation. Perfect fit ($\varepsilon = 0$ everywhere) is essentially impossible in real data.

---

#### Section 10: Why We Square — RSS, MSE, and RMSE

**[00:37:21 ~ 00:42:59]** A naïve way to evaluate a model would be to add up all the residuals. But residuals come with signs — some observations sit above the line ($y > \hat{y}$, positive residual), some below ($y < \hat{y}$, negative residual). Summing them directly lets **positives and negatives cancel**, tricking you into thinking the model is perfect when it isn't.

The fix: **square the residuals** before summing. Squaring removes signs (since $(-2)^2 = 4 = (+2)^2$), so cancellation is impossible.

**The key quantities:**

- **Residual Sum of Squares (RSS):**

$$
\text{RSS} \;=\; \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

- **Mean Squared Error (MSE):**

$$
\text{MSE} \;=\; \frac{1}{n}\sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \;=\; \frac{\text{RSS}}{n}
$$

- **Root Mean Squared Error (RMSE):**

$$
\text{RMSE} \;=\; \sqrt{\text{MSE}} \;=\; \sqrt{\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}
$$

The RMSE is the most commonly reported regression metric because it is on the same scale as the original target variable (thanks to the square root).

---

#### Section 11: OLS and the Gradient-Descent Connection

**[00:42:59 ~ 00:46:16]** The classical method for finding the $\hat{b_0}$ and $\hat{b_1}$ that minimise the RSS is called **Ordinary Least Squares (OLS)**. In ML terms, the RSS is the **loss function**, and the problem becomes:

$$
\arg\min_{\mathbf{w}}\; L(\mathbf{x}) \;=\; \sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

where $\mathbf{w} = (\hat{b_0}, \hat{b_1})$. In Stats 311 you minimised this by **gradient descent**. In classical statistics, OLS has a **closed-form solution** — no iterative optimiser needed. Both produce the same coefficients for simple linear regression.

**Two caveats worth keeping in mind:**

- OLS was historically chosen for its **computational convenience**. Today, more robust alternatives exist and are often preferable.
- OLS is **sensitive to outliers** — a single extreme point can distort the fitted line noticeably, especially with small samples.

---

#### Section 12: Prediction vs Explanation

**[00:46:16 ~ 00:51:54]** A more principled statement of the statistician-vs-data-scientist split:

**Statisticians want to explain.** Given the fitted model, they ask: *which variables contribute most? What does this parameter mean? Which feature dominates the relationship?* The goal is a transparent, interpretable model — today's buzzword for this is **Explainable AI (XAI)**.

**Data scientists want to predict.** Given the fitted model and some new $x$, they ask: *what is $\hat{y}$, and how accurate will it be on data the model has never seen?*

These priorities shape the decisions you make downstream — which features to include, how to validate, which metrics to optimise. The "same" regression model serves two different masters depending on which goal you're chasing.

**Worked illustration — predicting university GPA from high-school results:**

- A student with a strong high-school record might hit university and fail spectacularly because the home-parental structure that propped them up is gone and they spend every night partying.
- A student with a modest high-school record might flourish at university because the fundamentals were weaker but the environment is better.

Both outcomes look like bias from the model's perspective, but they're the reality the data scientist is trying to predict from — which is why **data quality** matters so much.

---

#### Section 13: Multiple Linear Regression

**[00:51:54 ~ 00:54:14]** In the real world, one predictor is rarely enough. To predict house price, you don't just use location — you use location, age of building, square footage, number of bedrooms, number of bathrooms, presence of AC, and so on.

**Multiple linear regression** generalises the simple case to $n$ predictors:

$$
y \;=\; b_0 + b_1 x_1 + b_2 x_2 + b_3 x_3 + \cdots + b_n x_n + \varepsilon
$$

Every predictor $x_i$ has its own slope $b_i$, and the bias term $b_0$ is shared across the model. The fitted form replaces every $b_i$ with an estimate $\hat{b_i}$.

Visually, simple linear regression lives in 2D (a line through a scatter plot). Multiple regression lives in higher-dimensional space — you can't draw it, but the arithmetic works exactly the same, and the model still minimises RSS.

---

#### Section 14: Coefficients as Feature Importance — With One Big Caveat

**[00:54:14 ~ 00:56:19]** A natural temptation: use the magnitudes of the coefficients $b_1, b_2, \ldots, b_n$ as a ranking of feature importance — big coefficient, important feature.

**The condition for this to be valid:**

> Coefficients can only be interpreted as feature importance **if and only if** the features have been **standardised / normalised** first.

Without standardisation, a feature measured in kilograms and a feature measured in grams would have dramatically different coefficient magnitudes purely because of unit choice — even if they are equally predictive. After standardisation (mean 0, standard deviation 1), the coefficients are on a common scale and the comparison is meaningful.

If you've worked with **lasso regression** (which you covered in Stats 311) you'll recall it pushes non-essential coefficients toward zero, making it useful for feature reduction. **Ridge regression** shrinks all coefficients but doesn't zero them out — useful for generalisation. We'll revisit these when we get to penalised regression.

---

#### Section 15: Assessing the Model — RMSE, MSE, RSS

**[00:58:04 ~ 01:00:35]** To evaluate a fitted regression, the default metrics are the three you already know:

- **Sum of Squared Errors (SSE / RSS)** — absolute total error
- **Mean Squared Error (MSE)** — average squared error per observation
- **Root Mean Squared Error (RMSE)** — in the units of $y$

**Warning about adding features.** As you add more features to a model, the in-sample RMSE (and RSS and MSE) will tend to **decrease** — the model fits the training data ever more tightly. But that is not always a win. Beyond a point, you are modelling **noise** rather than signal. This is **overfitting** — the bias-variance trade-off from Stats 311. A model that fits training data perfectly but fails on new data has learned nothing useful.

---

#### Section 16: Residual Standard Error — Penalising for Predictors

**[01:00:35 ~ 01:02:31]** To guard against the "more features → lower error" trap, we can weight the error by the model's complexity. The **Residual Standard Error (RSE)** divides by degrees of freedom rather than sample size:

$$
\text{RSE} \;=\; \sqrt{\frac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{n - p - 1}}
$$

where $p$ is the number of predictors. The $(n - p - 1)$ in the denominator accounts for the degrees of freedom consumed by estimating $p$ slopes and 1 intercept. Adding more predictors increases $p$, shrinks the denominator, and makes the RSE *larger* if the added features don't genuinely reduce the numerator — a built-in penalty for complexity.

---

#### Section 17: The Coefficient of Determination — R²

**[01:04:45 ~ 01:07:06]** The **coefficient of determination**, $R^2$, measures the proportion of variation in $y$ that the model explains:

$$
R^2 \;=\; 1 - \frac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{\sum_{i=1}^{n}(y_i - \bar{y})^2}
$$

Unlike the correlation coefficient (which ranges $[-1, +1]$), $R^2$ ranges from **0 to 1**:

- $R^2 = 1$ means the model explains all of the variation.
- $R^2 = 0$ means the model explains none of it.

You can think of $R^2$ as a probability-like fraction: *of the total variance in $y$, what fraction has our model accounted for?*

---

#### Section 18: Adjusted R² — Penalising for More Features

**[01:07:06 ~ 01:18:41]** Just like RMSE, plain $R^2$ suffers from the "more features is better" illusion — adding any feature, even a useless one, will nudge $R^2$ upward. To correct for this, we use **Adjusted R²**:

$$
R^2_{\text{adj}} \;=\; 1 - \left(1 - R^2\right)\,\frac{n - 1}{n - p - 1}
$$

The adjustment inflates the gap between $1$ and $R^2$ by a factor related to the model's degrees of freedom. Adding a useless feature now *penalises* $R^2_{\text{adj}}$ rather than boosting it.

> In academic papers, **Adjusted R²** is preferred over plain $R^2$ precisely because it stays honest as the model grows.

---

#### Section 19: In-Sample vs Out-of-Sample Assessment

**[01:07:54 ~ 01:11:23]** Every metric we've discussed so far — RMSE, $R^2$, RSE, p-values from ANOVA — is an **in-sample** metric. It is computed on the **same data the model was fitted on**. That's not a test of whether the model will generalise. A model with a beautiful in-sample $R^2$ might fall apart on data it's never seen.

**Two remedies from Stats 311:**

- **Hold-out (validation) set.** Split the data: train on one part, evaluate on the other. Problem: you lose some of your already-scarce data for training.
- **K-fold cross-validation.** Split the data into $K$ folds, train on $K-1$ of them, test on the remaining one, rotate, average. This avoids "losing" data by systematically using every observation for both training and testing.

K-fold cross-validation gives you an **out-of-sample** performance estimate, which is the honest measure of whether the model will hold up in deployment.

---

#### Section 20: AIC and BIC — Information-Theoretic Model Selection

**[01:19:38 ~ 01:22:15]** Beyond adjusted $R^2$ there is a different family of model-selection criteria rooted in information theory:

- **AIC (Akaike Information Criterion)** — proposed by Japanese statistician Hirotugu Akaike. For a regression model:

$$
\text{AIC} \;=\; 2P - N + N \log\!\left(\frac{\text{RSS}}{N}\right)
$$

where $P$ is the number of variables in the model and $N$ is the number of observations. **Lower AIC is better.** The first term, $2P$, is the penalty for adding parameters — every extra predictor pushes AIC up.

- **BIC (Bayesian Information Criterion)** — similar in spirit to AIC but with a **harsher penalty** for parameter count. BIC therefore prefers simpler models than AIC does.

**The optimisation is a minimisation:**

> Choose the model that minimises AIC (or BIC) — equivalently, maximises adjusted $R^2$.

Both AIC and BIC show up routinely in the lab and in software output, so recognising them is important.

---

#### Section 21: Searching the Space of Models — All-Subsets vs Stepwise

**[01:22:15 ~ 01:26:26]** Given $p$ candidate predictors, how do you find the best subset? Two strategies:

**All-subsets regression.** Try every possible combination of predictors and pick the one with the best criterion (lowest AIC / highest adjusted $R^2$ / etc.). For $p$ predictors, there are $2^p$ subsets — the search space explodes quickly. With even 20 predictors, all-subsets is computationally prohibitive.

**Stepwise regression.** A greedy alternative:

- **Forward selection.** Start with *no* predictors. Add the predictor that most improves the criterion. Continue adding one at a time until no further improvement is possible. Start **simple**, grow **complex**.
- **Backward elimination.** Start with *all* predictors in the model. Drop the predictor whose removal most improves (or least degrades) the criterion. Continue removing until no further improvement is possible. Start **complex**, reduce to **simple**.
- **Hybrid / bidirectional stepwise.** Alternate forward and backward steps.

Stepwise regression is dramatically cheaper than all-subsets and usually produces a comparable model — but because it's greedy, it isn't guaranteed to find the global optimum.

---

#### Section 22: Occam's Razor — Start Simple

**[01:16:54 ~ 01:18:41]** Underlying both stepwise selection and the adjusted-$R^2$ / AIC penalties is a principle statisticians call **Occam's razor**:

> **Start with the simplest model you can, and only add complexity when it's genuinely justified.**

Why? Because complex models overfit. The more parameters you give a model, the more it can memorise the quirks of your training set without learning the underlying pattern. From Stats 311, this is the **bias-variance trade-off** — simple models have high bias but low variance; complex models have low bias but high variance. The sweet spot, **just right**, is where the total error is minimised and the model generalises.

---

#### Section 23: Preview — Weighted and Penalised Regression

**[01:26:26 ~ end]** The next lecture will pick up where this one stops:

- **Weighted regression** — when not all observations deserve equal influence on the fit. (We saw the general idea in Lecture 1 with the weighted mean.)
- **Penalised regression** — formalising the bias–variance trade-off directly into the loss function. This will cover **ridge** and **lasso** regression, which you encountered in Stats 311.

---

#### Key Takeaways for Revision

1. **Power** is the probability of detecting a real effect of a specified **effect size** given your population and sample size. Typical targets are 80% or 90%.
2. **Sample size** is chosen to achieve the desired power — not so small that effects slip through, not so large that resources are wasted.
3. The data-science approach to power: build **hypothetical data** with and without the effect → bootstrap → permutation hypothesis test → count the proportion of rejections → repeat for different $n$.
4. "Inclusive data" — data that genuinely represents the phenomenon — matters more than raw volume.
5. **Regression** finds the relationship between predictors $X$ and outcome $Y$. The fitted model enables prediction.
6. **Regression vs correlation:** correlation measures *strength*; regression measures the *nature* (the functional form) of the relationship.
7. **Simple linear regression:** $y = b_0 + b_1 x$. $b_0$ is the intercept (constant); $b_1$ is the slope (coefficient).
8. **Multiple linear regression:** $y = b_0 + b_1 x_1 + b_2 x_2 + \cdots + b_n x_n + \varepsilon$.
9. **True model vs fitted model:** the estimated version $\hat{y} = \hat{b_0} + \hat{b_1} x$ wears hats; the input $x$ does not.
10. **Residual:** $\varepsilon = y - \hat{y}$. We want these small.
11. We **square** residuals (rather than simply summing them) to prevent positive and negative values from cancelling.
12. **RSS** $= \sum (y_i - \hat{y}_i)^2$. **MSE** = RSS/$n$. **RMSE** = $\sqrt{\text{MSE}}$.
13. **OLS (Ordinary Least Squares)** minimises RSS. In ML, this becomes the **loss function** minimised by **gradient descent**. OLS is sensitive to outliers.
14. **Statisticians want to explain; data scientists want to predict.** Same mathematics, different goals.
15. **Coefficients as feature importance:** only valid if features are **standardised / normalised** first.
16. **In-sample metrics** (RMSE, $R^2$, etc.) all tend to improve as you add features — this is a trap that leads to **overfitting**.
17. **Residual Standard Error (RSE):** $\sqrt{\text{RSS} / (n - p - 1)}$ — penalises added predictors via degrees of freedom.
18. **Coefficient of determination** $R^2 \in [0, 1]$: the proportion of variance in $y$ explained by the model.
19. **Adjusted $R^2$** corrects $R^2$ for feature count — preferred over plain $R^2$ in publications.
20. **In-sample vs out-of-sample:** in-sample metrics are on training data; honest evaluation requires **hold-out** or **K-fold cross-validation**.
21. **AIC** = $2P - N + N\log(\text{RSS}/N)$; **BIC** is similar but penalises more harshly. **Minimise** either to select a model.
22. **All-subsets regression** examines every possible combination ($2^p$) — infeasible for large $p$. **Stepwise regression** (forward / backward / bidirectional) is a greedy alternative.
23. **Occam's razor:** start simple, and only add complexity when it's genuinely justified. Ties directly to the **bias–variance trade-off** from Stats 311.