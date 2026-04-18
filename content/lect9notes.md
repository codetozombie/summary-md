---
title: "Lecture 9 Notes"
---

### Lecture 9: Interpreting Regression, Regression Diagnostics, and Non-Linear Regression

#### Introduction: Stepping Back to Interpret the Regression Equation

**[00:00:00 ~ 00:02:03]** This lecture steps back from model-building mechanics and focuses on **interpreting the regression equation** itself — what each piece of the fitted model is telling you. While the data scientist's primary use of regression is **prediction** of the target variable $y$, there is still useful insight to be drawn from looking at the equation directly.

Consider the fitted form:

$$
y \;=\; mx + c
$$

or in multiple regression, $y = b_0 + b_1 x_1 + \cdots + b_n x_n$. The mapping $f(x)$ from input $x$ to output $y$ **is** your regression line. The question now is: what can the equation itself tell us about the relationship between $x$ and $y$?

---

#### Section 1: Correlated Predictors — Why Interpretability Suffers

**[00:02:03 ~ 00:04:40]** In multiple regression, the predictor variables are often **correlated** with one another. From Stats 311 you already know the consequence: if your input variables are correlated, your model tends to perform badly. That's the predictive cost.

There is also an **interpretive cost**: highly correlated predictors make it very difficult to explain what the model is doing.

- You lose the ability to say confidently which variable is driving the prediction.
- Negative correlations between predictors can produce coefficient signs that contradict intuition, and you can't tell whether the counter-intuitive direction is real or an artefact of the correlation structure.

Recall the condition from Lecture 7: **standardised features + independent predictors** are what make coefficients valid as feature-importance measures. When predictors are correlated, that condition is violated, and coefficient magnitudes become unreliable guides to importance.

The practical instruction: identify correlated predictors and **deal with them** — either by removing redundancies or by reformulating the feature set.

---

#### Section 2: Multicollinearity — The Extreme Case of Correlation

**[00:05:25 ~ 00:06:37]** **Multicollinearity** is the formal name for the extreme case:

> A condition in which there is **redundancy among the predictor variables**.

If two variables are highly correlated, one of them is effectively redundant — it carries no information the other didn't already provide. Redundancy in features:

- Violates the independence assumption.
- Creates **unstable coefficient estimates** — small changes to the data produce large changes to the fitted coefficients.
- Combines with **overfitting** since each redundant variable still adds to the parameter count.

A data set stuffed with redundant predictors is an overfitting risk where many of the "extra" features aren't even adding signal.

---

#### Section 3: Three Common Sources of Multicollinearity

**[00:06:37 ~ 00:12:31]** How does redundancy sneak into a data set in the first place?

**1. The same variable included under two different names.** The classic example is having both **gender** and **sex** as columns. They mean the same thing — either both are male/female, or both are something else the analyst has renamed. A historical anecdote worth noting: on older census forms, the field labelled "Sex" was sometimes filled in with responses like "6", "7", or "4" by respondents who interpreted the word differently than the form designer intended. That's a data-collection bias from ambiguous instrument wording. Pilot-testing your survey and using explicit checkbox options for fields like "Sex: ☐ Male ☐ Female" prevents this and also prevents the accidental duplication that creates multicollinearity.

**2. Including all $P$ dummy variables for a $P$-level categorical.** From Lecture 8 — if a factor has $P$ levels, encode $P - 1$ dummies and let the omitted level be absorbed by the intercept. Including all $P$ creates perfect multicollinearity. R drops one for you by default; Python doesn't.

**3. Two variables that are near-perfectly correlated by nature.** Even when they're measuring different things, the values may move together. The lecture's example: the presence of a **bathroom** in a bedroom is strongly correlated with the total **bedroom** count in modern houses. Both are independently meaningful, but their correlation creates redundancy.

**Important caveat on scope.** Multicollinearity is a concern for **linear models**. For **non-linear models** — decision trees, random forests, neural networks — redundant or correlated features do not destabilise the fit in the same way, because the model has the flexibility to handle them.

---

#### Section 4: Confounding Variables — The Opposite Problem

**[00:13:16 ~ 00:17:26]** Where multicollinearity is an **error of commission** (you included too much), **confounding** is an **error of omission** — you left out a variable that mattered.

- **Multicollinearity:** *"You included redundant variables; one of us has to go."*
- **Confounding:** *"You omitted an important variable. I should have been in the model."*

**Example.** Predicting house prices using only the **size** of the facility and the **number of bedrooms** — but omitting **location**. Location is enormously predictive of price. If two houses have identical size and identical bedroom counts, but one is in a premium area and one is not, they will have very different prices — and your model has no way to capture that. The result: a **six-bedroom apartment in an expensive neighbourhood** and a **six-bedroom apartment in a modest one** both get the same predicted price of (say) 10,000 per month, which is wildly wrong for both.

Omitting a confounding variable biases the coefficients of the included variables — they pick up, in a distorted way, the effect that the missing variable would have carried.

---

#### Section 5: Identifying Confounding Variables

**[00:17:26 ~ 00:20:13]** A natural question: *how do we know a variable is confounding? For a correlation we compute the Pearson correlation, but how do we detect what we've omitted?*

The honest answer: **domain knowledge**. Correlation is a statistic you can compute. Confounding is a property of the phenomenon you are modelling, and you can only detect it by knowing the domain — or consulting someone who does.

**Worked illustration — medication dosage.** An AI model might suggest dropping the **age** feature from a prediction of drug dosage because the signal looks weak statistically. A medical doctor would strongly disagree: for **under-five toddlers**, dosage depends critically on body weight and height, which themselves scale with age. For adults (12+), age matters less — dosage is more uniform. A machine-learning-only analysis misses this non-linear, age-dependent structure and might strip out a variable that is *confounding* for the paediatric population.

The practical instruction: when making decisions about which variables to include or drop, **involve the subject-matter experts**. In health AI especially, do not remove variables because the statistics alone suggest they're uninformative.

---

#### Section 6: Interactions and Main Effects

**[00:20:13 ~ 00:23:47]** An **interaction** occurs when two variables together produce an effect that is stronger than either one alone — their combined influence is not simply the sum of their individual contributions.

**Main effects** are the predictor variables themselves — each $x_i$ considered in isolation. In the context of interactions, the "main effect" is the standalone contribution of the variable.

**Analogy — bread, butter, and tea.** Consider three main effects: **bread**, **butter**, and **tea**.

- You can have bread with tea — fine combination.
- You can have bread with tea *and butter* — a different, stronger effect. The butter interacts with the bread/tea pairing.
- But eating butter alone, or eating butter with just tea, doesn't produce a coherent meal. Butter on its own is essentially not a main effect.

So the **bread**, **butter**, and **tea** are main effects (each meaningful as a predictor), but the **interaction** between them — specifically, bread + tea + butter — produces an effect neither bread nor butter alone could generate. This is what "interaction" means in regression: $x_i \cdot x_j$ terms that capture joint effects.

In Stats 311, this phenomenon appeared with **lasso regression**: some variables looked irrelevant individually, but removing them hurt the model because they interacted with other variables to produce predictive power.

---

#### Section 7: The Independence Assumption

**[00:33:13 ~ 00:35:39]** Regression as a procedure assumes that **predictors and the response are independent** of each other (in the statistical sense), and that predictors are independent of each other. In reality, that assumption frequently fails:

- Predictors interact, violating independence between them.
- Some interactions are obvious domain-wise (medication + body weight); others are not.

**How to find interactions when domain knowledge is limited:**

- **Lasso regression.** By pushing non-essential coefficients to zero, lasso implicitly tests whether features carry independent signal. Features that only matter in interaction can get surfaced in the model's behaviour.
- **Stepwise selection** (from Lecture 7). Adding a feature that only improves the model marginally on its own, but makes a bigger difference when combined with others, hints at an interaction.
- **Domain experience.** Still the first recommendation — subject-matter experts know the interactions the data alone cannot reveal.

---

#### Section 8: Regression Diagnostics — Why They Matter

**[00:35:39 ~ 00:40:15]** The final phase of regression work is **diagnostics**: checking whether the fitted model is actually doing a good job on the data it was fitted to, and whether the assumptions behind the model are satisfied.

The core question: *how well does my model fit my data?*

Diagnostics do **not directly address the accuracy** of the model — they don't tell you your final predictive accuracy. What they provide is **useful insight into how the predictive environment has been set up**: whether the residuals look reasonable, whether outliers are distorting the fit, whether the assumptions of the regression are respected.

Diagnostics rely on analysing the **residuals** — from Lecture 7, the residual is $\varepsilon_i = y_i - \hat{y}_i$, the difference between the observed value and the fitted prediction. If the residuals are well-behaved, the regression is internally healthy.

---

#### Section 9: Outliers in Regression

**[00:40:15 ~ 00:42:19]** The first diagnostic check: **outliers** — observations whose values are far from the bulk of the data. The Bill Gates example from Lecture 1 applies here too: if Bill Gates lives in your sample community, the regression line is pulled toward him, distorting the whole model. Outliers in regression work the same way — one or two extreme points can materially shift the fit.

Outliers must be identified and handled. Options: remove them, down-weight them (weighted regression from Lecture 8), or transform them to fall within the expected range.

---

#### Section 10: Standardised Residuals

**[00:42:19 ~ 00:44:51]** To detect outliers numerically, we look at the **standardised residual** — the raw residual divided by its standard error:

$$
e_i^* \;=\; \frac{\varepsilon_i}{\text{SE}(\varepsilon_i)}
$$

By standardising, we put every residual on the same scale. Large standardised residuals — typically those with absolute value greater than 2 or 3 — flag observations that are poorly fit by the model and are candidates for investigation as outliers.

There is no hard theoretical cutoff that says "this is definitely an outlier". What we have is a **rule of thumb**.

---

#### Section 11: The Box Plot Rule of Thumb

**[00:44:51 ~ 00:46:35]** The standard visual test for outliers uses the **box plot** from Lecture 2. Recall its components: the median, the box (spanning $Q_1$ to $Q_3$), and whiskers extending outward.

The outlier rule of thumb:

> Any observation more than **1.5 × IQR** above $Q_3$ or below $Q_1$ is flagged as an outlier.

In R this calculation is done automatically. The same logic applies to residuals: if the residuals for a point sit far outside the bulk of the residual distribution, that point is likely an outlier. Once flagged, you decide — based on domain knowledge — whether to remove, re-weight, or retain them.

---

#### Section 12: Influential Values (Leverage)

**[00:49:47 ~ 00:52:32]** An **influential value** is a data point whose **absence would cause a significant change in your regression model**. Remove it, and the fitted line shifts substantially.

Not every influential point is an outlier, and not every outlier is influential. The thin line:

- **Outliers** are usually caused by **errors in measurement** — bad data.
- **Influential values** are not necessarily errors. They may be legitimate observations that simply happen to exert strong pull on the regression line.

This distinction matters a lot in practice. Before you remove a point on outlier grounds, visualise and think: is this point *bad data*, or is it *rare but real data* that the model needs to account for? The same Bill Gates figure could, depending on context, be an outlier you remove or an influential value you keep (and perhaps weight differently).

---

#### Section 13: The Hat Value

**[00:55:14 ~ 00:56:00]** A common metric for identifying leverage points is the **hat value** (named because it comes from the "hat matrix" that maps observed $y$ to predicted $\hat{y}$). The rule-of-thumb threshold is:

$$
\text{hat value threshold} \;=\; \frac{2(p + 1)}{n}
$$

where $p$ is the number of predictors and $n$ is the number of observations. Any point whose hat value exceeds this threshold is considered a leverage point — it has enough influence on the fit to deserve a closer look.

---

#### Section 14: Cook's Distance

**[00:56:00 ~ 00:57:34]** Another widely-used influence metric is **Cook's distance**, which measures the combined effect of a point being both a large residual *and* a high-leverage point. The threshold commonly used is:

$$
\text{Cook's distance threshold} \;=\; \frac{4}{n - p - 1}
$$

An informal rule of thumb is that a Cook's distance exceeding approximately **0.08** signals an influential point worth investigating. The wider the Cook's distance, the greater the leverage.

---

#### Section 15: Bubble Plots for Leverage

**[00:57:34 ~ 00:58:19]** Rather than eyeballing numeric thresholds, a **bubble plot** visualises leverage directly. Each observation appears as a point; the **size of the bubble** reflects the leverage (Cook's distance, for example). **Bigger bubbles = higher leverage.**

Some books refer to this same plot as an **influence plot** — terminology varies but the visualisation is the same.

---

#### Section 16: Heteroscedasticity

**[00:58:19 ~ 01:00:35]** **Heteroscedasticity** (also spelt *heteroskedasticity*) is a condition where the **variance of the residuals is not constant across the range of fitted values**. Decompose the word:

- "Hetero-" = different
- "-scedasticity" = spread / variance

Classical regression assumes that residuals have the **same variance everywhere** — that's **homoscedasticity**. When variance changes with the fitted value, you have heteroscedasticity, and some of the theoretical guarantees of OLS break down.

Why does this matter differently for statisticians vs data scientists?

- **Statisticians** are centrally concerned with the distribution of errors — their inferences (confidence intervals, p-values) depend on it.
- **Data scientists**, especially those working with large data, are more focused on predictive performance. The OLS estimator remains *unbiased* even under heteroscedasticity, so for prediction the practical effect is often modest.

Still, every data scientist should recognise and check for heteroscedasticity — particularly when computing prediction intervals.

---

#### Section 17: Three Assumptions for Formal Inference

**[01:03:09 ~ 01:06:02]** For formal statistical inference from a regression to be fully valid, three conditions on the residuals must hold:

1. **Residuals are normally distributed.**
2. **Residuals have the same variance** across the range of the predictions — homoscedasticity.
3. **Residuals are independent** of each other.

If all three hold, the fitted coefficients can be used for confidence intervals, p-values, and hypothesis tests in the classical sense. If any of them fails, those inferences become unreliable — you may still have a useful predictive model, but you cannot make strict inferential claims about it.

---

#### Section 18: Why Heteroscedasticity Matters for Confidence Intervals

**[01:06:02 ~ 01:09:01]** One area where data scientists genuinely need to care about distributional assumptions is **confidence intervals on the predicted values** — the prediction intervals from Lecture 8. Heteroscedasticity directly corrupts these:

> Heteroscedasticity is nothing but the **lack of a constant residual variance across some portion of the range of predictions**.

Visualise residuals plotted against fitted values. Under homoscedasticity, the residual cloud looks like a uniform band. Under heteroscedasticity, it looks like a **funnel** — narrow at one end, wider at the other. Many textbooks use exactly this funnel image to depict the problem.

Why does this matter? Because the prediction error you report depends on an assumed constant variance. If the real variance is larger at one end of the prediction range than the other, your confidence bounds are too tight in one region and too loose in the other. Same prediction, very different uncertainty — and you can't tell from a single number.

---

#### Section 19: Diagnosing Residual Distributions

**[01:14:44 ~ 01:15:35]** Practical diagnostic workflow:

- **Histogram of residuals** — check for symmetry and normality. A skewed histogram is a warning sign.
- **Scatter plot of residuals vs fitted values** — look for the funnel shape that indicates heteroscedasticity.
- **Q-Q plot of residuals** (from Lecture 4) — check whether residuals fall along the diagonal for normality.

If any of these visualisations reveals a pattern, the model is probably incomplete — possibly missing a confounding variable, possibly needing a transformation of the target.

---

#### Section 20: Correlated Errors and the Durbin-Watson Statistic

**[01:15:35 ~ 01:18:13]** The third assumption — **error independence** — is especially important for **time-series data**, where residuals from consecutive time points can be correlated (autocorrelation).

A classical test is the **Durbin-Watson statistic**, which detects significant autocorrelation in regression residuals.

**Why care?** Correlated errors tell you that part of the signal in the data has not been captured by the model — consecutive points are systematically related in a way the fitted regression isn't accounting for. In time-series forecasting, that correlation can be exploited for **short-term predictions** (a few hours or days ahead) but will fail for long-term extrapolation.

This ties directly back to Lecture 7's warning: **don't extrapolate beyond the range of your data**. If your residuals are correlated, your extrapolation range is even more restricted than the raw data range suggests.

---

#### Section 21: When to Care About Distribution Assumptions

**[01:18:13 ~ 01:19:11]** A pragmatic summary for data scientists on which assumptions genuinely matter:

- **For prediction accuracy alone:** the assumptions matter less. OLS remains unbiased; you can often get away with moderate violations.
- **For prediction intervals:** heteroscedasticity matters because it distorts uncertainty estimates.
- **For formal hypothesis tests on coefficients:** all three assumptions matter, because classical inference depends on them.

If you have **large data**, you can often side-step the rigorous hypothesis testing and let the data speak — the Central Limit Theorem and bootstrap methods take care of most concerns. If you have **small data**, you are pushed back into theoretical statistics, and the assumptions become critical again. The bootstrap helps only when the underlying sample is valid; if the sample has errors, the bootstrap carries them forward.

---

#### Section 22: Polynomial Regression — Moving Beyond Linearity

**[01:19:11 ~ 01:23:26]** Not all relationships are linear. Drug response is not linear with dosage. Supply and demand curves are not linear with price. For these cases we extend regression to **non-linear** forms.

The first extension is **polynomial regression**. Where linear regression is:

$$
y \;=\; b_0 + b_1 x + \varepsilon
$$

polynomial regression adds non-linear terms:

$$
y \;=\; b_0 + b_1 x + b_2 x^2 + \cdots + b_n x^n + \varepsilon
$$

The simplest non-linear case is **quadratic**: $y = b_0 + b_1 x + b_2 x^2$. From calculus you know the shape is **parabolic**, opening upward or downward depending on the sign of $b_2$.

**Standard form of a general polynomial.** In descending or ascending order:

$$
y \;=\; a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0
$$

---

#### Section 23: The Problem with High-Order Polynomials

**[01:27:03 ~ 01:29:42]** Higher-order polynomials can capture more curvature — but at a cost.

**Number of turning points.** A polynomial of degree $n$ has **$n - 1$** turning points:

- Quadratic ($n = 2$) → 1 turning point
- Cubic ($n = 3$) → 2 turning points
- Quartic ($n = 4$) → 3 turning points

As $n$ grows, the function **wiggles more**. Fitting a high-order polynomial to data that isn't truly wiggly produces a curve that bends up and down to fit every point in the training data — and extrapolates disastrously.

Polynomial regression is useful for capturing **moderate** amounts of curvature. Beyond that, you need a smoother alternative — which is where **splines** come in.

---

#### Section 24: Splines — Piecewise Polynomial Regression

**[01:29:42 ~ end]** A **spline** is a series of **piecewise continuous polynomials** joined together at points called **knots**. Instead of fitting one high-order polynomial across the whole data range, you fit several **low-order polynomials**, each covering only a section of the range, and stitch them together smoothly at the knots.

**Intuition.** Suppose your data has a complicated shape no single polynomial can capture cleanly:

- Divide the range of $x$ into intervals using knots.
- In each interval, fit a simple polynomial — maybe a parabola in one interval, a line in another, a decay curve in a third.
- Ensure the polynomials meet smoothly at the knots (continuity, and often smoothness of derivatives).

The result is a **collection of polynomials** that together describe a shape no single polynomial could. Because each local polynomial is low-order, the wiggle problem is avoided.

**Historical note.** The term "spline" originally came from draftsmen. To draw a smooth curve by hand, they would bend thin strips of wood along a template, using weights to hold the strip in place at specific points. Those weights were called **ducks**. In mathematics we call them **knots**. The analogy also shows up in visual-arts grid drawing: dividing a picture into a grid and copying it cell-by-cell is the same idea — small local approximations stitched together produce a faithful global result.

**Formal definition:**

> A **spline** is a series of **piecewise continuous polynomials**.

Splines are the standard tool when you want **smooth non-linear fits** without committing to a single high-order polynomial. They are widely used in function smoothing, interpolation, and flexible regression.

---

#### Key Takeaways for Revision

1. Even for prediction-focused data scientists, interpreting the fitted equation helps diagnose what the model is really doing.
2. **Correlated predictors** destroy coefficient interpretability and degrade predictive performance. Identify and remove them.
3. **Multicollinearity** is the extreme case of correlation — redundancy among predictors.
4. Three common sources of multicollinearity: variable-name duplication (gender vs sex), including all $P$ dummies, and near-perfect correlation between two features.
5. Multicollinearity is a **linear-model problem**; non-linear models handle correlated features better.
6. **Confounding variables** are the opposite problem: *omission* of an important variable. Domain expertise is how you detect them.
7. **Interactions** are multi-variable effects not captured by main effects alone. Detect them via domain knowledge, lasso, or stepwise selection.
8. **Regression diagnostics** analyse residuals to verify whether the model's assumptions are satisfied.
9. **Standardised residual:** $e_i^* = \varepsilon_i / \text{SE}(\varepsilon_i)$ — flags outliers when large.
10. **Box-plot rule of thumb:** points more than 1.5 × IQR outside the quartiles are flagged as outliers.
11. **Outliers vs influential values:** outliers are usually measurement errors; influential values may be real data with strong pull on the fit. Not every outlier is influential, and not every influential point is an outlier.
12. **Hat value threshold:** $2(p+1)/n$. Points above this are high-leverage.
13. **Cook's distance** measures combined leverage and residual influence. Threshold ≈ $4/(n - p - 1)$, with a rule-of-thumb cutoff near 0.08.
14. **Bubble plots / influence plots** visualise leverage, with larger bubbles indicating more influential points.
15. **Heteroscedasticity** is non-constant residual variance — detected visually via a funnel shape in residuals-vs-fitted plots.
16. **Three assumptions for formal inference**: residuals are **normal**, **homoscedastic**, and **independent**.
17. For data scientists, heteroscedasticity matters most for **prediction intervals** — it distorts uncertainty estimates around $\hat{y}$.
18. **Durbin-Watson statistic** detects autocorrelation in residuals — especially important for time-series data.
19. **Correlated errors** limit your extrapolation horizon to short-term predictions.
20. **Polynomial regression** adds non-linear terms ($x^2, x^3, \ldots$). A polynomial of degree $n$ has $n - 1$ turning points — high degrees wiggle too much.
21. **Splines** are piecewise polynomials joined at **knots**. Each local polynomial is low-order, avoiding the wiggle problem while capturing complex shapes smoothly.
22. The term "spline" came from draftsmen bending strips of wood with weights (ducks) — the mathematical equivalent of weights is the knot.