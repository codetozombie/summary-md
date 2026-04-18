---
title: "Lecture 8 Notes"
---

### Lecture 8: Model Selection, Penalised & Weighted Regression, Bootstrap CIs, and Factor Variables

#### Introduction: Continuing from Model Selection

**[00:00:01 ~ 00:01:02]** This lecture picks up directly from the end of Lecture 7, re-emphasising **model selection** and the **stepwise regression** ideas, and extending into **penalised regression**, **weighted regression**, **bootstrap-based confidence intervals for regression**, and how to **encode categorical variables** (factor variables) properly.

---

#### Section 1: Why Model Selection Is Necessary — The Overfitting Risk

**[00:01:02 ~ 00:04:38]** In many real problems, **many candidate variables** could serve as predictors. From Stats 311 you already know the consequence:

> The more predictors you add, the more you are prone to **overfitting**.

Consider predicting a house price. The target is the price; the predictors are the features of the house. If you use only one feature, the model is **too simple** — high bias, low variance. As you add features, **variance goes up while bias comes down**. Push too far and you overfit — the model memorises the training data rather than learning a generalisable pattern.

The trade-off:

| Model complexity | Bias | Variance | Outcome |
| --- | --- | --- | --- |
| Too simple (few features) | High | Low | Underfits |
| Just right | Balanced | Balanced | Generalises |
| Too complex (many features) | Low | High | Overfits |

**Occam's razor** is the guiding principle:

> **All things being equal, prefer the simpler model.**

Even with GPUs available, having resources is not licence to waste them. More importantly, the statistical reason — overfitting — is independent of computing power.

---

#### Section 2: Measuring Model Performance — A Quick Recap

**[00:05:27 ~ 00:07:49]** The metrics from Lecture 7 that we use to decide which model to keep:

- **RMSE** — decreases as you add features (beware — improvement here does not always mean a better model).
- **$R^2$** — increases as you add features.

Both in-sample metrics can be fooled by extra features. To penalise for added parameters, we use:

- **Adjusted $R^2$:**

$$
R^2_{\text{adj}} \;=\; 1 - \left(1 - R^2\right)\,\frac{n - 1}{n - p - 1}
$$

where $p$ is the number of predictors.

---

#### Section 3: AIC and BIC Revisited — and AIC_c for Small Samples

**[00:07:49 ~ 00:15:37]** Beyond adjusted $R^2$, the information-theoretic criteria introduced in Lecture 7 deserve a closer look.

**AIC (Akaike Information Criterion).** Proposed in the 1970s by **Hirotugu Akaike**. The "A" stands for Akaike, the "I" for Information, the "C" for Criterion. For a regression model:

$$
\text{AIC} \;=\; 2P + N\log\!\left(\frac{\text{RSS}}{N}\right)
$$

where $P$ is the number of variables and $N$ is the number of observations. The roots of AIC lie in **asymptotics** (used in statistics to prove model reliability) and **information theory**, a subject CS students will recognise from older syllabi.

**AIC_c (Corrected AIC).** When the sample size is small, plain AIC can mislead. The corrected version **AIC_c** is more appropriate when $N$ is small. As $N$ grows, AIC_c converges to AIC.

**BIC (Bayesian Information Criterion).** The "B" stands for Bayesian. BIC keeps the "Information Criterion" framing but applies a **harsher penalty** for extra parameters than AIC does.

A useful analogy: if the penalty for cheating in the examination hall is merely cancellation of the paper, some students will still cheat. If the penalty is cancellation plus rustication for two years plus being blacklisted from industry, the deterrent is much stronger. BIC is the harsher punishment; AIC is the milder one. Which to use depends on how aggressively you want to discourage model complexity.

> **Whichever criterion you use, you minimise it.** The model with the lowest AIC (or BIC) is the preferred model. Minimising AIC is equivalent to maximising adjusted $R^2$.

---

#### Section 4: Searching the Model Space — All-Subsets vs Stepwise

**[00:16:27 ~ 00:22:27]** Given $p$ candidate predictors, how do you find the best subset? Two routes:

**All-subsets regression.** Try every possible combination. For $p$ predictors, there are $2^p$ subsets — this is an **exhaustive search** (in algorithm-course terminology). For small $p$ it's fine; for large $p$ it is **infeasible**.

**Stepwise regression.** A greedy alternative that searches far more cheaply. Three flavours:

- **Forward selection.** Start with **nothing** (zero features). Add the feature that most improves the criterion. Keep adding one at a time until no addition improves the model. Starts simple, grows complex.
- **Backward elimination.** Start with the **full model** (all $P$ features). Drop the feature whose removal most improves (or least hurts) the criterion. Keep dropping until any further removal would make the model worse. Starts complex, reduces to simple.
- **Bidirectional / hybrid stepwise.** At each step, consider both adding and dropping. If adding a feature fails to improve the model, drop it immediately rather than keeping it around; alternate additions and deletions.

> Note: **"backward elimination" in regression** is a different concept from the "backward substitution" step in Gaussian elimination (Stats 212). Same words, different process.

---

#### Section 5: Stepwise Regression vs Early Stopping — A Clarification

**[00:23:13 ~ 00:26:36]** It's tempting to relate stepwise regression to **early stopping** or **feature ablation** from deep learning, but they are distinct:

- **Early stopping** fixes the model architecture and monitors whether the **parameters** are still improving across training epochs. When improvement plateaus beyond a patience threshold, training halts. The model itself never changes.
- **Stepwise regression** keeps the training procedure fixed but changes **which features are in the model**. Features are added or removed based on whether they improve the fit.
- **Ablation** is closer in spirit — evaluating the effect of adding or removing a component — but in ML usage "ablation" typically refers to entire architectural components (layers, modules), not individual features.

The cleanest framing for stepwise regression is **feature selection**, not early stopping or ablation.

---

#### Section 6: Penalised Regression — Ridge and Lasso

**[00:28:47 ~ 00:33:58]** There is another route to controlling model complexity that does not involve adding or dropping features one at a time — **penalised regression**. You encountered this in Stats 311 under two names:

- **Ridge regression** — adds an **$L_2$ penalty** (sum of squared coefficients) to the loss function. Shrinks all coefficients toward zero, but does not force any of them to be exactly zero.
- **Lasso regression** — adds an **$L_1$ penalty** (sum of absolute coefficients) to the loss function. Can push coefficients **exactly to zero**, which is why lasso is commonly used for **feature selection** / **feature reduction**.

The modified loss function has the general form:

$$
L_{\text{penalised}} \;=\; \text{RSS} + \lambda \cdot \text{penalty}
$$

where $\lambda$ is the **regularisation parameter** — a hyperparameter that controls how aggressively the model is penalised. Larger $\lambda$ forces simpler models.

**When to use which:**

- For **predictive performance** in a regression setting, practitioners often prefer **ridge** — it retains all features with shrunken coefficients, which tends to generalise well.
- For **feature reduction**, **lasso** is the natural choice because it zeroes out the irrelevant coefficients automatically.
- Ridge can also be used for feature reduction if you are willing to set a **threshold** below which coefficients are considered zero — but that threshold is itself a hyperparameter you have to tune.

---

#### Section 7: In-Sample Training Is Still the Core Limitation

**[00:33:58 ~ 00:36:45]** Every model-selection criterion we have covered so far operates on **in-sample** data — the same data the model was fitted on. That has a fundamental limitation:

> If you train and test on the same sample, you cannot meaningfully diagnose overfitting. Your model may have **memorised** the training set rather than learned the underlying pattern.

The Stats 311 analogy: consider a child learning the letters **W** and **M**. If the child has only ever seen W drawn one way, flipping it upside down to look like M will confuse them — they've memorised the orientation rather than learned the geometry. An adult who has generalised past raw orientation can identify both regardless of how they are rotated.

Overfit models fail the same test. On unfamiliar data they "see W where there is M" — they misclassify because they memorised surface features, not underlying structure.

**The remedy (from Lecture 7 and Stats 311):** hold-out validation or K-fold cross-validation, so that evaluation happens on data the model has **never seen** during training.

---

#### Section 8: Weighted Regression — When Observations Deserve Unequal Influence

**[00:36:45 ~ 00:40:25]** So far every observation has contributed equally to the fit. **Weighted regression** changes that — different rows carry different weights in the least-squares calculation. Data scientists use it for two main reasons.

**Reason 1 — Inverse variance weighting.** Use when different observations were measured with **different precision**. The rule is:

> Observations with **higher variance** get **lower weight**. Observations with **lower variance** get **higher weight**.

The word "inverse" is literal: the weight is inversely related to the variance. Measurements you trust more influence the fit more; noisy measurements are dialled down.

**Reason 2 — When each row represents multiple cases.** If one row of your data summarises the outcome for many underlying observations, it deserves more weight than a row that represents a single observation.

**A related practical use:** weighting can sometimes serve as an alternative to oversampling techniques for **imbalanced datasets**. Rather than duplicating underrepresented cases, you up-weight them — giving more influence to rare observations and less to common ones — so that the model's attention reflects the balance you actually want it to learn.

---

#### Section 9: Regression for Prediction — The Extrapolation Warning

**[00:40:25 ~ 00:45:50]** For data scientists, the purpose of regression is **prediction**, not interpretation. This shifts the practical constraints on how regression can be used — particularly around **extrapolation**.

**Rule 1 — Don't extrapolate beyond the range of your data.**

From Stats 212 (Newton–Lagrange interpolation), recall the two-point trap: given only two data points, you would draw a straight line and predict forward. But add more data and you might discover that one of the two original points was an outlier, or that the true relationship is exponential — and suddenly your "straight-line" extrapolation is completely wrong.

Time-series practitioners sometimes claim they can project months or years into the future. They can — within the limits of the model's assumptions — but you should be sceptical of any extrapolation that reaches far beyond the observed range.

**Rule 2 — Use only the predictors the model was trained on for extrapolation.**

If you fit a housing-price model on **East Legon** data, with location as a feature, you cannot deploy that model on **North Legon** data. The location feature played a critical role in the training — and the model has no reason to believe its learned behaviour will transfer. The exception is a model explicitly designed to be **location-independent** from the start; otherwise, the features available at prediction time must match the features used during training.

---

#### Section 10: Prediction Intervals and Confidence Around Predictions

**[00:45:50 ~ 00:49:37]** A point prediction of $\hat{y}$ on its own is not enough. You also need to know how **uncertain** that prediction is — this is what **prediction intervals** (for $\hat{y}$) and **confidence intervals** (for the coefficients) capture.

This matters especially when comparing models. If your model is 1% better than someone else's but costs $100,000 more to train and run, while the cheaper model can be trained in five days — **the 1% improvement may not be worth the energy**. Always report not just point accuracy but also the **uncertainty margin** and the **resource cost** of a model.

Classical statistics reports these uncertainties via **t-statistics** and **p-values** on the coefficients. In ML and feature selection, coefficient p-values were historically used to decide which features were worth keeping — before big data made more flexible non-linear approaches dominant.

---

#### Section 11: Bootstrap Confidence Intervals for Regression Coefficients

**[00:51:29 ~ 00:57:01]** The classical machinery for CIs on regression coefficients assumes certain distributional properties. The data-science-friendly alternative is **bootstrap** — and the procedure needs a small adaptation for regression because our target is now numeric, not categorical.

**The setup.** We want a confidence interval for the coefficient $b_1$ (and intercept $b_0$) in the fitted model $\hat{y} = b_0 + b_1 x$.

**The key trick: bootstrap whole rows, not individual values.** Treat each row of the dataset as an indivisible unit. If row 1 contains a particular combination of $(x, y)$, it travels as a single ticket. Label row 1 as "1", row 2 as "2", and so on. Put the 300 row-tickets into a conceptual box.

**Step by step:**

1. **Shuffle** the 300 row-tickets to randomise.
2. **Draw one ticket** (e.g. you draw row 1). Record it. **Put it back.**
3. **Repeat step 2** 300 times with replacement. The resulting set of 300 drawn rows is your **first bootstrap sample**. Because of replacement, some rows may appear multiple times and others not at all — that is the point.
4. **Fit the regression** on this first bootstrap sample. Record the estimated $b_0$ and $b_1$.
5. **Repeat steps 1–4** $R$ times (e.g. 1,000 times). You now have 1,000 values of $\hat{b_0}$ and 1,000 values of $\hat{b_1}$.
6. **Sort** the 1,000 $\hat{b_1}$ values and take the **percentile-based CI**. For a 90% CI, take the 5th and 95th percentiles. For a 95% CI, take the 2.5th and 97.5th. Do the same for $\hat{b_0}$.

The result is a confidence interval for each regression coefficient — computed entirely from your sample, with no appeal to distributional assumptions.

---

#### Section 12: Bootstrap Confidence Intervals for Predictions ($\hat{y}$)

**[00:57:01 ~ 01:00:27]** The procedure for a CI on the **prediction** $\hat{y}$ itself is similar but introduces a twist involving **residuals**.

Recall from Lecture 7: the **residual** is the vertical distance between an observed point and the fitted line:

$$
\varepsilon_i \;=\; y_i - \hat{y}_i
$$

**The procedure:**

1. Fit the model on all your data and compute the **residuals** for every observation.
2. For each bootstrap replicate $r$ (from 1 to $R$):
   - Draw a new bootstrap sample of rows (as in Section 11).
   - Fit the model to it, producing a coefficient set $(\hat{b_0}^r, \hat{b_1}^r)$.
   - For each observation $x_i$ in the original data, compute the bootstrap prediction $\hat{y}_i^r = \hat{b_0}^r + \hat{b_1}^r x_i$ and **add a randomly drawn residual** to capture the noise around the fit.
3. Repeat for $R$ iterations.
4. For a target $x$, you now have $R$ values of $\hat{y}$. Sort them.
5. Pick the percentiles matching your desired CI (5% and 95% for 90%, 2.5% and 97.5% for 95%).

This gives you a **prediction interval** — a range in which you expect the actual $y$ to lie, accounting for both coefficient uncertainty and the inherent noise in the data.

Both Python and R implement these procedures directly; you invoke a function rather than writing the resampling loop by hand.

---

#### Section 13: Factor Variables — Handling Categorical Predictors

**[01:00:27 ~ 01:03:26]** Regression equations only work on numeric inputs. When an input is **categorical** (e.g. male/female, or the colour red/yellow/green), you cannot simply plug it in — you have to **encode** it. In regression terminology, categorical predictors are called **factor variables**.

There are two kinds of factor variables and they demand different treatment:

- **Unordered factor variables** — e.g. mango / orange / pear. There is no inherent ranking between the categories.
- **Ordered factor variables** — e.g. first / second / third, or red / yellow / green in a traffic-light context where red is more severe than yellow is more severe than green.

The encoding you choose must preserve whatever structure exists in the variable, and must not invent structure that isn't there.

---

#### Section 14: One-Hot Encoding for Unordered Factors

**[01:03:26 ~ 01:07:41]** For **unordered** factor variables, the standard encoding is **binary dummy variables** — which in ML is called **one-hot encoding**. Both terms refer to the same procedure; "dummy" refers to the *names* of the new columns, "binary" refers to the *values* (every new column takes only 0 or 1).

**How it works.** A gender column with two possible values (male, female) is split into two new columns:

| Original Gender | dummy_male | dummy_female |
| --- | --- | --- |
| Male | 1 | 0 |
| Female | 0 | 1 |

The interpretation: *dummy_male = 1* means this row is male; *dummy_female = 1* means this row is female; exactly one of them is 1 in any given row. No ordering is implied — neither value dominates the other.

This approach works well when the number of categories ("levels") is **small**.

---

#### Section 15: The $P - 1$ Rule and Multicollinearity

**[01:07:41 ~ 01:09:57]** A subtle but important constraint: for a factor with $P$ levels, we only introduce $P - 1$ dummy variables — **not all $P$**. The omitted level becomes the **reference level**, implicitly captured by the intercept (bias) term.

**Why?** If you include all $P$ dummies, they are linearly dependent — knowing $P - 1$ of them perfectly determines the last one. This is called **multicollinearity**, and it destabilises the regression.

- **R** handles this automatically by default — it drops one dummy for you.
- **Python** does not. It is your responsibility to drop one dummy column (e.g. `pd.get_dummies(..., drop_first=True)`) when you want proper statistical modelling.

Python was designed for the data-science and ML worlds, where multicollinearity is often ignored (more on this below), rather than for classical statistics, so the defaults reflect a different philosophy.

---

#### Section 16: Factor Variables with Many Levels — The Consolidation Strategy

**[01:09:57 ~ 01:13:36]** What happens when the factor has **many** levels? Consider a "town" feature covering every town in Ghana. If there are, say, 1,000 towns, one-hot encoding would introduce 999 dummy variables — a disaster for overfitting and for computational cost.

**The strategy: consolidate to a higher-level grouping.** If the categorical variable has a natural hierarchy, roll it up. For Ghanaian towns:

> Roll 1,000 towns up to **16 regions**. Now there are only 15 dummy variables — manageable, interpretable, and far less prone to overfitting.

This is rarely as tidy as the towns-to-regions example in practice. You have to look at the structure of your data and find the right consolidation level — maybe by geography, maybe by frequency (rare categories collapsed into an "Other" bucket), maybe by domain knowledge. The principle is the same: **find an intelligent way to reduce the number of levels before encoding.**

---

#### Section 17: Encoding Ordered Factor Variables

**[01:13:36 ~ 01:16:31]** For **ordered** factor variables, one-hot encoding is wrong — it destroys the ordering that is part of the signal.

Take traffic lights: red is more severe than yellow is more severe than green. If we one-hot encode as $(1,0,0), (0,1,0), (0,0,1)$, the regression sees three unrelated categories of equal standing — the severity ordering has been thrown away.

**The right approach: assign ordered numeric values directly.** For example:

| Light | Encoding |
| --- | --- |
| Green | 0 |
| Yellow | 1 |
| Red | 2 |

Or, if you want to express that red is *much* more severe than yellow, you can use non-equally-spaced values like $(0, 10, 20)$. The exact numbers are up to you; what matters is that the **ordering is preserved**.

Other examples of ordered factors: loan default risk (low / medium / high), satisfaction ratings, school rankings, severity classifications. In every case, encode directly with numeric values that respect the order — do not one-hot encode.

---

#### Section 18: Interpreting the Regression Equation

**[01:16:31 ~ 01:19:20]** Even for data scientists focused on prediction, the fitted equation can tell us useful things about the data — *if* we set it up correctly.

For the fitted model $\hat{y} = b_0 + b_1 x_1 + b_2 x_2 + \cdots + b_n x_n$:

- **Each coefficient $b_i$** indicates the contribution of feature $x_i$ to the prediction.
- **If features are standardised / normalised**, the magnitude of $b_i$ is a valid **feature importance** measure (from Lecture 7).
- The **sign** of $b_i$ tells you the direction of the relationship between $x_i$ and $y$ — positive means $y$ rises with $x_i$, negative means the opposite.
- **Correlation between features matters.** If two input features are highly correlated, they produce **redundancy** in the model and **degrade its predictive power**. In statistics, this is why predictors are required to be **independent** — independence in the statistical sense translates to **non-correlation** in practice.

The practical instruction: before or during model building, **check for and remove highly correlated features**.

---

#### Section 19: Multicollinearity — The Extreme Case of Correlation

**[01:19:20 ~ 01:24:20]** When correlation between predictors becomes extreme, it has a name: **multicollinearity** — a condition of **redundancy among predictor variables**.

**Perfect multicollinearity** occurs when one predictor can be expressed as a **linear combination** of others. A physics example makes it concrete: velocity $v$, time $t$, and acceleration $a$ are related by $a = v/t$. If all three are included as features:

$$
a \;=\; \frac{v}{t}
$$

Then $a$ is deterministically a function of $v$ and $t$ — the three are perfectly multicollinear. You don't need all three; you can include any two and express the third via the relationship.

**Common sources of multicollinearity in practice:**

- **A variable accidentally included twice** — e.g. "gender" and "sex" as two separate columns, when they contain the same information under different names.
- **All $P$ dummies included for a $P$-level factor** — exactly the issue Section 15 flagged. R drops one automatically; Python doesn't.
- **Two features that are near-perfectly correlated** — slightly different values but essentially carrying the same signal.

**Scope of the concern.** Multicollinearity matters for **linear models**. For **non-linear models** (trees, neural networks, kernel methods), correlated features are a much smaller concern because the model has more flexibility and can handle redundant signals without becoming unstable.

Also worth noting: in **data science / ML on large data**, the practical problem multicollinearity creates in classical statistics is often absent — there is enough data for the model to cope, and we often *want* all the $P$ dummies for computational reasons. Python reflects this by not auto-dropping dummies.

---

#### Section 20: Preview — Confounding Variables

**[01:24:20 ~ end]** The next lecture will pick up the topic of **confounding variables** — and set them against multicollinearity.

> **Multicollinearity** says: *"You included redundant variables; one of us has to go."*
>
> **Confounding** says the opposite: *"You omitted an important variable. I was supposed to be part of the model and I wasn't."*

Both are forms of model misspecification — one from over-inclusion, one from under-inclusion.

---

#### Key Takeaways for Revision

1. More predictors → lower bias but higher variance, with overfitting beyond the optimal point.
2. **Occam's razor** — prefer the simpler model all else being equal.
3. **Adjusted $R^2$** penalises added predictors: $R^2_{\text{adj}} = 1 - (1 - R^2)(n-1)/(n-p-1)$.
4. **AIC** = $2P + N \log(\text{RSS}/N)$. **AIC_c** is the small-sample correction. **BIC** penalises complexity even harder than AIC.
5. **Minimise AIC/BIC** to choose a model — equivalent to maximising adjusted $R^2$.
6. **All-subsets regression** ($2^p$ subsets) is infeasible for large $p$. **Stepwise regression** (forward / backward / bidirectional) is the greedy alternative.
7. Stepwise regression is **feature selection**, not early stopping — the model stays fixed; the feature set changes.
8. **Ridge regression** ($L_2$ penalty) shrinks coefficients but never zeroes them. **Lasso regression** ($L_1$ penalty) can zero them out — making lasso the natural tool for feature reduction.
9. Penalised regression uses a modified loss: $L_{\text{penalised}} = \text{RSS} + \lambda \cdot \text{penalty}$, where $\lambda$ controls the strength.
10. All in-sample metrics can be fooled; honest evaluation requires **out-of-sample** validation via hold-out or K-fold cross-validation.
11. **Weighted regression** uses unequal weights — e.g. **inverse variance weighting** (noisier observations get less weight) or row-level case weighting.
12. **Don't extrapolate beyond the range of your data**, and **only use predictors the model was trained on** at prediction time.
13. Point predictions without **uncertainty intervals** are not enough — always report CIs on coefficients and prediction intervals on $\hat{y}$.
14. **Bootstrap CIs for regression** resample entire **rows** of the dataset, refit the model each time, and take percentiles of the resulting coefficient distribution.
15. **Prediction intervals** additionally sample residuals to capture noise around the fit.
16. **Factor variables = categorical predictors** in regression. Encoding depends on whether they are ordered or unordered.
17. **Unordered factors**: use **one-hot / dummy encoding** (binary 0/1 columns).
18. For a $P$-level factor, include only $P - 1$ dummies to avoid multicollinearity. R handles this automatically; Python doesn't.
19. **Many-level factors** require **consolidation** — e.g. 1,000 towns → 16 regions.
20. **Ordered factors** should be encoded with numeric values that preserve the ordering — never one-hot encoded.
21. Coefficient signs and magnitudes (when features are standardised) indicate the direction and importance of each feature's contribution.
22. **Multicollinearity** is extreme correlation between predictors — it destabilises linear models but is less of a concern for non-linear ones.
23. Common sources of multicollinearity: duplicate variables under different names, including all $P$ dummies, and near-perfect correlation between two features.
24. **Coming up — confounding variables**: the opposite problem, where an important variable has been **omitted** from the model.