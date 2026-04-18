---
title: "Lecture 6 Notes"
---

### Lecture 6: Statistical Significance, P-values, ANOVA, and the Multi-Arm Bandit

#### Introduction: From Experiment Design to Testing for Significance

**[00:00:24 ~ 00:04:40]** In the previous lecture we looked at how to tell whether an **experiment is valid** — whether it was designed well, randomised properly, and set up to answer the right question. This lecture turns to the complementary question: once the experiment has run, **is the result actually significant**, or could it have been produced by chance?

This is the strongest single concept in classical statistics:

> A result is **statistically significant** when it goes **beyond what chance alone would produce** under the null hypothesis.

If the effect is within the realm of chance, we stay with the current system (don't switch from A to B). If it's beyond chance, the null hypothesis is rejected and we act on the alternative.

---

#### Section 1: The A/B Test Setup — A Conversion Example

**[00:04:40 ~ 00:07:35]** The book gives an A/B test comparing two prices. The conversion counts are tabulated:

| Outcome | Price A | Price B |
| --- | --- | --- |
| Converted | 200 | 182 |
| Did not convert | 23,539 | 22,406 |
| **Total** | 23,739 | 22,588 |

Computing the conversion **proportion** for each group:

$$
p_A \;=\; \frac{200}{200 + 23{,}539} \;=\; \frac{200}{23{,}739} \;\approx\; 0.84\%
$$

$$
p_B \;=\; \frac{182}{182 + 22{,}406} \;=\; \frac{182}{22{,}588} \;\approx\; 0.81\%
$$

$$
p_A - p_B \;\approx\; 0.0368\%
$$

**Interpretation.** If we set our significance threshold at **5%**, the observed difference of ~0.04 percentage points is nowhere near the threshold. So on this evidence alone, there is no justification for switching from A to B.

> A frequent point of confusion: the numbers 200 and 182 are **counts of people** who converted, not prices. Price A and Price B are the *treatments*; "converted" and "did not convert" is the *outcome*.

---

#### Section 2: The Classical Statistician vs the Data Scientist

**[00:08:32 ~ 00:12:37]** Classical statistics computes significance using specific mathematical distributions and strict assumptions — partly because, historically, there was no computing power available for anything else. Data scientists, with modern computers, take a different route:

- The **statistician** asks: *"What is the precise p-value?"* and computes it using t-tests, F-tests, chi-squared tests, and their associated distributions.
- The **data scientist** asks: *"Is the difference real enough to act on?"* and computes it through **bootstrapping and permutation** — simulating the chance distribution directly from the data.

We don't need the *exact* p-value; we need enough information to make a decision. And simulation is perfectly adequate for that.

---

#### Section 3: The Permutation Test for A/B Significance — Step by Step

**[00:12:37 ~ 00:17:46]** Instead of invoking a t-distribution, we can simulate the null hypothesis directly.

**Setup.** Under $H_0$, Price A and Price B produce identical conversion rates — the split into "A" and "B" is irrelevant.

1. **Combine** all observations into a single pool. Pool size = 23,739 + 22,588 = 46,327. The pool contains 382 "ones" (converters: 200 + 182) and the rest are "zeros" (non-converters).
2. **Compute the pooled proportion:**

$$
p_{\text{pool}} \;=\; \frac{382}{46{,}327} \times 100\%
$$

3. **Shuffle** the pool so all group identity is destroyed.
4. **Draw without replacement** a resampled "A" of size 23,739; the remaining 22,588 become resampled "B".
5. For each resampled group, count the number of ones and zeros, compute the proportion, and compute the difference $p_A^* - p_B^*$.
6. **Return everything to the pool, reshuffle, redraw, recompute.** Repeat $R$ times (typically 1,000 to 10,000).
7. Plot the distribution of the $R$ simulated differences.

**The p-value from the simulation:**

> The p-value is the **proportion of simulated differences that are as extreme as, or more extreme than, the observed difference** of 0.0368%.

If that proportion is above the threshold (e.g. 5%), the observed effect is typical of pure chance — **not significant**. If below the threshold, the observed effect is rare under $H_0$ — **significant**.

---

#### Section 4: The P-value — Formal Definition

**[00:17:46 ~ 00:21:45]** The **p-value** is defined as:

> The probability that the **chance model** (the null hypothesis $H_0$) would produce a result **at least as extreme** as the observed value.

The chance model is the null hypothesis. If the null is true and we re-ran the world many times, the p-value tells us how often we would see something this surprising by sheer luck.

Statisticians formalise this as an **objective** value rather than leaving the reader to eyeball a distribution plot and make a subjective call. Both Python and R ship the relevant tests, so in practice you call a function and read the output.

**Caveat.** There is an active controversy in the profession over whether the p-value is trustworthy, whether it communicates what people think it communicates, and whether it is overused. Data scientists can navigate this by treating the p-value as an **input to a decision** rather than the answer itself.

---

#### Section 5: Alpha — The Significance Threshold

**[00:21:45 ~ 00:25:33]** The threshold to which we compare the p-value is called **alpha ($\alpha$)** and is chosen *by you* based on context. Common choices:

| $\alpha$ | Corresponding confidence level |
| --- | --- |
| 0.01 | 99% |
| 0.05 | 95% |
| 0.10 | 90% |

**0.05 (5%) is the de facto default in practice.** The stricter the alpha, the more evidence we demand before rejecting $H_0$.

Historically, statisticians chose strict alphas because they lacked the computing resources to verify results directly — the strictness compensated for that uncertainty. With modern compute, we have more latitude to choose alpha based on the decision context rather than from tradition.

The framing data scientists prefer is not *"what is the probability this happens by chance?"* but rather *"given a hypothesis, what is the probability the observed result is extreme?"* — and "extreme" is defined by alpha.

---

#### Section 6: Type I and Type II Errors

**[00:25:33 ~ 00:31:12]** Any hypothesis test exposes you to two kinds of mistake:

| Reality | Decision: Reject $H_0$ | Decision: Keep $H_0$ |
| --- | --- | --- |
| $H_0$ is TRUE (no real effect) | **Type I error** — False Positive | Correct |
| $H_0$ is FALSE (real effect) | Correct | **Type II error** — False Negative |

- **Type I error** — concluding there *is* an effect when there isn't. This is a **false positive**. In biometrics terminology, it corresponds to the **False Acceptance Rate (FAR)**.
- **Type II error** — concluding there *isn't* an effect when there is. This is a **false negative**. In biometrics, the **False Rejection Rate (FRR)**.

This is the same confusion-matrix vocabulary from Stats 311 (TP, FP, TN, FN).

---

#### Section 7: Which Error Matters More Depends on Context

**[00:31:12 ~ 00:32:43]** A guiding principle from biometrics:

> **It is usually safer to falsely reject than to falsely accept.** A false acceptance lets the wrong person into the building; a false rejection sends a legitimate person to a second check. The consequences are not symmetric.

The same asymmetric reasoning applies to A/B tests on software or pricing:

- **Type I error** — you conclude B is better than A when it isn't. You **deploy the new system at a cost** — and the cost was not justified.
- **Type II error** — you conclude B is no better, and you keep using A. If B was in fact marginally better, you lost a small gain, but no real harm was done.

In this setup, **Type I is more expensive** than Type II, and we design our tests (alpha selection, adjustment, etc.) to guard against Type I first.

---

#### Section 8: The t-Test for Two-Sample Comparison

**[00:32:43 ~ 00:36:10]** When the data is a single **A/B** comparison, the classical tool is the **t-test**, named after the **t-distribution** (covered in Lecture 4). Recall that the t-distribution is shaped like the normal but has **heavier tails**, and converges to the normal as sample size grows.

**Scope:** the t-test is for **two-sample comparisons**. Any binary A/B test where you want to check significance has the t-test as the default option. Python/R expose it as a ready-made function — you call it, you read the p-value, you decide.

---

#### Section 9: The Multiple-Testing Problem and Alpha Inflation

**[00:36:10 ~ 00:40:24]** What happens when you move beyond A/B to **A/B/C** or A/B/C/D? You could run pairwise t-tests — A vs B, A vs C, B vs C — but doing so introduces a serious problem.

**The statistician's warning:**

> *"Torture the data long enough and it will confess."*

The more tests you run on the same data, the more likely you are to find a "significant" result **by chance alone**. With 20 tests at $\alpha = 0.05$, you would **expect one of them to come out significant even if nothing real is happening**. This is called **alpha inflation**.

Data scientists and ML engineers commit this error routinely: try this feature, try that encoding, try another model, try yet another — eventually something looks great. You deploy it, and it fails in production. The "significance" was an artefact of the search.

---

#### Section 10: Alpha Adjustment — Bonferroni and Tukey HSD

**[00:40:24 ~ 00:42:59]** To counter alpha inflation, classical statistics offers two main **p-value adjustments**:

- **Bonferroni correction.** Divide alpha by the number of comparisons $m$:

$$
\alpha_{\text{adj}} \;=\; \frac{\alpha}{m}
$$

With $m = 10$ comparisons and $\alpha = 0.05$, the adjusted threshold becomes $0.005$. Only results that beat this much stricter bar are declared significant. Bonferroni is conservative — it protects strongly against Type I error but can increase Type II.

- **Tukey HSD (Honest Significant Difference).** A different correction, used when you want to compare all pairs of group means after an ANOVA.

In this course we will not dwell on these corrections — instead we handle multiple-group testing with ANOVA directly.

---

#### Section 11: Degrees of Freedom

**[00:42:59 ~ 00:46:20]** Before moving to ANOVA, a quick conceptual aside on **degrees of freedom (df)**:

$$
df \;=\; n - 1
$$

**Why $n - 1$?** Intuition via an example. Suppose you have 10 data points and you want the mean to equal some target value (say 20). If you fix 9 of the 10 values freely, **the 10th value is completely determined** — it has no freedom to vary, because it must be whatever makes the average come out to 20. So with a constraint (the known mean), only $n - 1$ of the values are independently free to vary.

That "one value used up" by the constraint is why the divisor in the sample variance is $n - 1$ rather than $n$. The same idea reappears across every test that estimates a parameter from data.

---

#### Section 12: ANOVA — Analysis of Variance

**[00:46:20 ~ 00:52:15]** When you have **more than two groups**, the tool is **ANOVA** (**Analysis of Variance**), and it works off the **F-distribution** rather than the t-distribution.

**When to use what:**

| Comparison | Test | Distribution |
| --- | --- | --- |
| 2 groups | t-test | t-distribution |
| ≥ 3 groups | ANOVA | F-distribution |

**What ANOVA is looking for.** ANOVA asks a single overall question: *"Across all these group means, is there any difference worth caring about?"* It collapses the entire multi-group comparison into **one statistic** — the F-statistic — so that you avoid the alpha-inflation trap of running every pairwise t-test.

**Omnibus test.** Books sometimes call ANOVA an **omnibus test** — "omnibus" means "for all", because it tests all groups simultaneously.

**Data-science bonus.** Even when we don't care about publication-style significance, ANOVA's machinery is useful for **feature importance / feature reduction** — if a feature doesn't explain any between-group variance, it can be dropped.

---

#### Section 13: The Permutation Approach to ANOVA

**[00:52:15 ~ 00:57:09]** You can run ANOVA manually, but here is the preferred data-science approach — permutation, applied to multi-group testing. Suppose the groups are four web pages, A/B/C/D.

1. **Combine** all observations into one pool.
2. **Shuffle** the pool to destroy group identity.
3. **Draw** four samples (one per group), preserving the original group sizes.
4. For each of the four resampled groups, record the **mean** and the **variance**. (Unlike the t-test, ANOVA cares about **variance across groups**, not just means.)
5. Repeat steps 2–4 $R$ times — typically **1,000 to 10,000 trials**.
6. Plot the resulting **sampling distribution** of the F-statistic.
7. Overlay the **observed** F-value. The proportion of simulated F-values at least as extreme as the observed F-value is your p-value.
8. Compare the p-value to $\alpha$ to decide.

---

#### Section 14: The ANOVA Table and the F-Statistic

**[00:57:09 ~ 01:00:24]** Software packages produce an **ANOVA table** containing several columns, but the two most important quantities are:

- **MS_T** — Mean Square for **Treatment** (between-group variance).
- **MS_E** — Mean Square for **Error** (within-group variance / residual).

The **F-statistic** is their ratio:

$$
F \;=\; \frac{MS_T}{MS_E}
$$

A large F means the variation *between* groups is big compared to the variation *within* groups — evidence of a real effect. A small F means group-to-group differences are no bigger than noise within groups — no real effect.

The F-value is then compared to the standard F-distribution (parameterised by the appropriate degrees of freedom) to produce a p-value, which is compared to alpha.

---

#### Section 15: One-way vs Two-way ANOVA

**[01:00:24 ~ 01:02:00]** Similar to the one-sided / two-sided distinction for t-tests:

- **One-way ANOVA** — tests the effect of **one** factor on a response variable. Focus is only on one direction of effect.
- **Two-way ANOVA** — tests the effect of **two** factors and their interaction; protects against being fooled from either side.

Classical statisticians prefer two-way by default because they want to be protected from errors on both sides (proving $H_1$ and simultaneously not letting $H_0$ sneak in by chance). Most software defaults to **two-way ANOVA**; you pass a parameter to get the one-way version.

---

#### Section 16: The Chi-Squared Test — For Contingency Tables

**[01:02:00 ~ 01:05:32]** Where ANOVA/F handles **continuous** outcomes across multiple groups, the **chi-squared ($\chi^2$) test** is the analogue for **categorical count data** in a **contingency table** — rows and columns of counts.

**Setup.** Instead of an A/B binary test, you might have A and B crossed against **multiple categorical outcomes** simultaneously (for instance: clicked / didn't click / bounced / converted). The chi-squared test asks whether the counts in the contingency table could have arisen from the null hypothesis of independence between the two variables.

The Pearson chi-squared statistic (revisited from Lecture 4):

$$
\chi^2 \;=\; \sum_{i} \frac{(O_i - E_i)^2}{E_i}
$$

where $O_i$ is the observed count in cell $i$ and $E_i$ is the count expected under $H_0$.

---

#### Section 17: The Permutation Approach to Chi-Squared

**[01:05:32 ~ 01:14:26]** Just as with the t-test and ANOVA, we can compute significance through resampling instead of invoking the $\chi^2$ distribution.

**Use case — web click experiment.** Does sending a link produce clicks? What proportion click, and what proportion don't? The lecturer's own lab observed that even when a link was shared ("professor has sent out something"), many people clicked **without reading**, just because the source was trusted. Similarly, a Telegram group once attracted 200+ "joiners" who never actually read the content. In cybersecurity, this same click-without-reading behaviour is the attack vector for phishing and virus distribution.

**The resampling procedure for chi-squared:**

1. **Combine** all observations into one pool (e.g. all "click" and "no click" outcomes across groups).
2. **Shuffle** to randomise group identity.
3. **Resample** groups of the same sizes as the original.
4. **Compute the squared-difference statistic** — NOT just a difference, but the squared difference between the shuffled count and the expected count, summed across all cells. This is the chi-squared statistic for the resample.
5. Repeat steps 2–4 $R$ times.
6. The resulting distribution can be compared to the **observed** chi-squared value: the proportion of resampled values as extreme as the observed value is the p-value.

The key step that distinguishes chi-squared from t and F permutation tests is **step 4** — the statistic being recorded is the squared, summed deviation from expected values, not a plain difference.

---

#### Section 18: Fisher's Exact Test — When Counts Are Very Small

**[01:14:26 ~ 01:17:18]** The chi-squared distribution is a **good approximation** for significance testing when counts are large, but it performs poorly when counts are very small. A rough rule:

> If any cell has a count of **5 or fewer**, $\chi^2$ is no longer reliable. Use **Fisher's exact test** instead.

Fisher's exact test answers the same question as chi-squared but does so with a combinatorial calculation that is valid even when cell counts are tiny. Both Python and R expose it as a function. Which one to use is entirely determined by the size of the counts, not by any theoretical preference.

---

#### Section 19: The Data Scientist's Real Goal — Not Significance, but Decision

**[01:17:18 ~ 01:21:17]** A philosophical pause. In classical statistics, significance testing is geared toward **publication** — researchers need a p-value below $\alpha$ to claim a finding. For data scientists, **publication is not the goal**. The goal is to **make a decision about the best treatment**.

> We don't care so much whether the difference is "statistically significant" in the classical sense. We care whether we are picking the best option and whether the effect is real enough to act on.

This reframing opens the door to a completely different family of methods — ones that don't end the experiment just because a p-value was computed, but instead **learn as they go**.

---

#### Section 20: The Multi-Arm Bandit — A Different Way to Test

**[01:21:17 ~ 01:25:58]** The **multi-arm bandit** algorithm takes its name from casino slot machines — a "one-armed bandit" because pulling the lever tends to steal your money. A **multi-armed bandit** is a row of slot machines, each with its own (unknown) payout rate. Your goal is to maximise winnings over time.

**The translation to A/B testing.** Each "arm" is a variant of your system (web page A, B, C, D). Each round, you pick an arm and observe an outcome (click / no-click, for instance). The algorithm is allowed to **change its arm choice over time as evidence accumulates**.

The bandit is **not** looking for a statistically rigorous p-value. It is making a **decision-focused** trade-off:

- **Exploitation:** stick with the arm that has performed best so far.
- **Exploration:** occasionally try other arms to check that you aren't missing a better one.

Because precision is not the goal, **greedy algorithms** (from DCIT 304 — Algorithms and Data Structures) work here. Greedy methods don't guarantee the optimal answer — only a **sub-optimal, efficient** one — but "sub-optimal and fast" is exactly the regime the bandit lives in.

---

#### Section 21: The Three Dangers of Traditional A/B Testing

**[01:27:43 ~ 01:32:38]** When you compare the bandit to the traditional A/B approach, three serious weaknesses of the classical method stand out:

1. **The answer may be inconclusive.** You collect a fixed sample, you run the t-test, and the p-value is above alpha. You don't have a conclusion — and you've spent the entire experimental budget.
2. **You take advantage of partial results prematurely.** Suppose you toss a coin: heads, heads, heads. Based on those three tosses, you start betting on heads. But the experiment was nowhere near complete, and the appearance of "pattern" has fooled you. Data scientists are particularly prone to this — we watch a dashboard converge and jump to conclusions before significance is actually reached.
3. **You are coerced into changing your mind.** You expected tails, but the data keep producing heads, and eventually you give up and agree with the data — not because the evidence was sufficient, but because the experiment wore you down. The structure of classical A/B testing gives you no principled way to resist this.

The bandit, by design, sidesteps all three by continuously learning rather than waiting for a conclusive end-of-experiment verdict.

---

#### Section 22: Greedy Algorithms and the Epsilon-Greedy Method

**[01:32:38 ~ 01:44:36]** A **greedy algorithm** always picks the option that looks best given information so far. Applied naively, this would be dangerous — you would commit to a winner too early and never give the other arms a chance. The fix is the **epsilon-greedy** algorithm, which adds a small amount of deliberate exploration.

**The procedure.**

1. Generate a random number $x$ uniform on $[0, 1]$.
2. Pick a small value $\epsilon > 0$ (for example, $\epsilon = 0.1$).
3. **Decision rule:**
   - If $x < \epsilon$ — **explore**: pick an arm **at random**. This keeps the algorithm honest by occasionally sampling the other options.
   - If $x \geq \epsilon$ — **exploit**: pick the arm that has **performed best so far**.
4. Record the outcome and update the estimated performance of the chosen arm.

**Teaching analogy used in the lecture.** Suppose I decide as a lecturer to give extra attention to one student I believe is most likely to get an A. That's pure greedy — I favour my chosen candidate. Then on the next quiz, a different student (one I had dismissed as a latecomer or a phone-user) scores 10/10, while my favourite drops to 7. I now shift attention to the newcomer. That shifting, driven by observed performance, is still greedy — but by being willing to update, I am approximating the epsilon-greedy behaviour. Whoever keeps performing best eventually earns the most of my attention.

The multi-arm bandit formalises this: **favour what's working, but keep a small channel open to discover that something else might be better.**

---

#### Section 23: Power and Sample Size — Preview

**[01:44:36 ~ end]** The lecture ends with a preview rather than a full treatment. The remaining question is: **how large a sample do I need to collect in the first place?** Too much data is wasted money. Too little and the null hypothesis survives purely because we couldn't detect the real effect.

The concept that formalises this is **statistical power** — the probability that a test will correctly detect a real effect when one exists. Power depends on sample size, effect size, and alpha. This will open the next lecture.

---

#### Key Takeaways for Revision

1. **Statistical significance** means the observed effect is beyond what chance alone would produce under $H_0$.
2. For A/B conversion data, the proportion is $p = \text{conversions} / \text{total}$ per group, and we compare the difference $|p_A - p_B|$ to a chosen threshold.
3. Data scientists compute significance by **permutation**, not by invoking a formal distribution — shuffle the pooled data, resample groups, recompute the statistic $R$ times, and compare the observed value to the simulated distribution.
4. The **p-value** is the probability that $H_0$ produces a result at least as extreme as what was observed. Compare it to **alpha ($\alpha$)**, typically 0.05.
5. **Type I error** = false positive (reject $H_0$ when it's true). **Type II error** = false negative (keep $H_0$ when it's false). Type I is usually the more expensive mistake to guard against.
6. The **t-test** is the go-to for two-sample (A/B) comparisons, based on the t-distribution.
7. Running many pairwise tests causes **alpha inflation** — "torture the data long enough and it will confess."
8. **Bonferroni** adjusts alpha by dividing by the number of comparisons: $\alpha_{\text{adj}} = \alpha / m$. **Tukey HSD** is another correction.
9. **Degrees of freedom ($df = n - 1$)** represent the number of values free to vary after a constraint (like the mean) is fixed.
10. For **three or more groups**, use **ANOVA** with the **F-distribution**: $F = MS_T / MS_E$.
11. ANOVA's permutation version: pool → shuffle → resample groups → record variance + mean → repeat 1,000–10,000 times → compare observed F.
12. **One-way ANOVA** tests one factor; **two-way ANOVA** tests two and their interaction. Software defaults to two-way.
13. **Chi-squared ($\chi^2$) test**: for categorical count data in a contingency table. $\chi^2 = \sum (O_i - E_i)^2 / E_i$.
14. The permutation approach to $\chi^2$ uses **squared** differences (not plain differences) summed across cells.
15. **Fisher's exact test** replaces chi-squared when cell counts are very small (≤ 5).
16. Classical significance tests aim for **publication**; data scientists aim for **decisions** — this opens the door to alternative methods.
17. The **multi-arm bandit** learns continuously instead of waiting for the end of a fixed experiment.
18. Traditional A/B testing's three dangers: **inconclusive results**, **premature advantage-taking**, and **being coerced into changing your mind** by the experiment itself.
19. **Epsilon-greedy algorithm:** with probability $\epsilon$ explore a random arm, with probability $1 - \epsilon$ exploit the best arm so far. Small $\epsilon$ (e.g. 0.1) keeps the balance sane.
20. Power and sample size (next lecture) formalise how much data you need to detect a real effect without waste.