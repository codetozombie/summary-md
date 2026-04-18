---
title: "Lecture 4 Notes"
---

### Lecture 4: Probability Distributions for Data Science

#### Introduction: Course Reminders and Recap from the Previous Class

**[00:00:01 ~ 00:02:18]** The session opens with the usual reminders: the **labs are critical** and form part of the assessment, and a few students are already making good visible progress on the platform. The more labs that pile up unfinished, the less likely it is that they will ever be completed — so the stronger discipline is to do a little each day. We are in Week 4, which means there are roughly six weeks left; by mid-March the course content should be wrapping up and examination preparation will begin. Students are also reminded to include their **ID, name, and Telegram handle** when marking attendance in the chat.

This lecture is dedicated entirely to **probability distributions**. Next week's session will move on to applying these distributions within the main content of the course.

---

#### Section 1: Recap — Normal Distribution and the Empirical Rule

**[00:02:18 ~ 00:04:02]** In the previous class we distinguished between the **normal distribution** and the **standard normal distribution**, and described an informal way to compute a confidence interval: sample from the population, order the data, and compute the mean. The mean falls at the centre of the bell-shaped "dome". Adding and subtracting the standard deviation from the mean gives intervals that follow the **empirical rule** (also known as the 68–95–99.7 rule):

$$
\begin{aligned}
\mu \pm 1\sigma &\;\Rightarrow\; \approx 68\% \text{ of the data} \\
\mu \pm 2\sigma &\;\Rightarrow\; \approx 95\% \text{ of the data} \\
\mu \pm 3\sigma &\;\Rightarrow\; \approx 99.7\% \text{ of the data}
\end{aligned}
$$

These multipliers (1, 2, 3) are the same values that appear in the **z-score**, which is why the z-score provides an informal way of computing confidence intervals for normally distributed data.

---

#### Section 2: The Q-Q Plot — Testing Whether Data Follows a Distribution

**[00:04:52 ~ 00:08:10]** A **Q-Q (quantile–quantile) plot** is the visual tool we use to check whether a sample aligns with an assumed distribution. A common misconception is that Q-Q plots are only for the normal distribution — **they are not**. They work for *any* reference distribution. In practice, however, most textbooks and workflows use them for normality because that is the assumption most models rely on.

**How to build one:**

- **Y-axis:** the z-scores of your data.
- **X-axis:** the theoretical quantiles of the reference distribution.
- **Reference line:** the diagonal $y = x$.

If the data plotted against the reference quantiles stays close to the diagonal, the data matches the reference distribution. If the points drift systematically away from the diagonal, the data does **not** follow that distribution.

**A critical caveat:** computing z-scores does **not** make your raw data normally distributed. The z-transformation only puts the values on a comparable scale. The Q-Q plot merely reveals whether the *underlying raw data* is compatible with the reference distribution.

---

#### Section 3: The Z-Score — Refresher

**[00:11:22 ~ 00:13:31]** The **z-score** standardises a value by subtracting the mean and dividing by the standard deviation:

$$
z = \frac{x - \mu}{\sigma}
$$

If the original data has mean $\mu = 0$ and standard deviation $\sigma = 1$, then the transformed values already are a **standard normal** distribution. For any other dataset, standardisation places every observation onto a **common scale**, which is what makes ML models behave well across features.

**Why a common scale matters.** If one feature column contains weights in kilograms and another column contains heights in metres, the model sees two completely different magnitudes. Standardising each column puts them on the same comparable footing. (Of course, you cannot standardise weights that were recorded in *different units within the same column* — you would be smoothing over a genuine data-quality problem.)

---

#### Section 4: Long-Tailed (Skewed) Distributions — The Reality of Real-World Data

**[00:09:03 ~ 00:19:00]** As important as the normal distribution is in theory, the sad truth is that **most real-world data is not normally distributed**. Most data is **tailed / skewed / long-tailed** — these three names all refer to the same phenomenon. The distribution retains a bell-like peak but one side stretches out into a heavy tail.

Tails arise from the presence of **extreme values**. Knowing that your data contains extreme values lets you guard against them — but there is a crucial warning:

> **Not every extreme value is an outlier.** Some extreme values are legitimate, meaningful observations that your model needs to learn from. Cutting them off because they look "too big" or "too small" destroys real information.

**Stock markets** are a good illustration. Markets can crash or rally violently; these movements are not "bugs" in the data — they are part of the **stochastic nature** of trading. Treating them as outliers and removing them would distort the true behaviour of the market.

If a Q-Q plot of your data fails to form a straight line along the diagonal, that is a strong signal that your data is **not normally distributed** and may well be long-tailed.

---

#### Section 5: The Student's t-Distribution

**[00:19:44 ~ 00:23:07]** The **Student's t-distribution** is a bell-shaped distribution that looks broadly like the normal distribution. The essential difference is the **tails**:

> A t-distribution has **thicker and longer tails** than a normal distribution.

Because the tails are heavier, proportionally less of the data sits inside the $\mu \pm 1\sigma$, $\mu \pm 2\sigma$, $\mu \pm 3\sigma$ bands than in a normal distribution. More of the data lives further from the centre.

The t-distribution is the **go-to distribution for sample statistics**. Crucially, its shape depends on the **sample size** — specifically the **degrees of freedom** $df = n - 1$. As the sample grows, the t-distribution converges to the normal distribution:

$$
\text{As } n \to \infty,\quad t_{n-1} \to \mathcal{N}(0, 1)
$$

**Practical implication for data scientists:** if you have a large enough sample, you can legitimately use z-scores (i.e., treat the problem as normal) even though you are working with a sample. So if you see someone using the z-score rather than the t, don't assume they are wrong — first check how large their sample is. If you are unsure how large is "large enough", **stay safe and use the t-distribution**.

---

#### Section 6: Confidence Intervals from the t-Distribution

**[00:26:13 ~ 00:33:20]** The t-distribution lets us compute a confidence interval for a sample, analogously to how the z-score lets us compute one for a normal distribution. The classical formula is:

$$
\text{CI} = \bar{x} \;\pm\; t_{n-1,\,\alpha/2} \cdot \frac{s}{\sqrt{n}}
$$

Where:

- $\bar{x}$ is the **sample mean**.
- $t_{n-1,\,\alpha/2}$ is the critical t-value with $n-1$ **degrees of freedom** at the chosen significance level $\alpha/2$.
- $s$ is the **sample standard deviation** (use $\sigma$ only when you have the full population).
- $n$ is the **sample size**.

**Where the $\alpha/2$ value comes from.** For a **90%** confidence interval, 10% is left outside — **5% on each side** of the curve — so $\alpha/2 = 0.05$. For a **95%** confidence interval, 5% is left outside — **2.5% on each side** — so $\alpha/2 = 0.025$. The chosen confidence level is a **parameter** you set, driven by how sure you want to be given how much data you have.

**Where the critical value comes from.** Traditionally you look it up in a **t-table** using $n-1$ and the tail value. Today, any calculator or online tool will give it to you directly.

---

#### Section 7: Historical Aside — Who Was "Student"?

**[00:34:32 ~ 00:35:15]** The t-distribution was developed by **William Sealy Gosset**, a statistician working for the **Guinness Brewery**. Legend has it that because he did not want people to trace the distribution back to his day job at the brewery, he published under the pen name **"Student"** — and the name stuck. That is why we call it the **Student's t-distribution** today, rather than the "Gossian distribution" in the style of the Gaussian. *(You can verify the story online; the core fact of the Guinness connection is well-documented.)*

---

#### Section 8: Bootstrap — The Data Scientist's Preferred Route to a CI

**[00:35:15 ~ 00:37:30]** In an era with powerful computers, very few practitioners compute confidence intervals by hand using the t-formula. The **bootstrap** (introduced in the previous lecture) is the dominant approach:

1. **Resample** from your data with replacement.
2. **Order** the resampled data.
3. **Compute** the mean (or any other statistic of interest) for each resample.
4. To get a **90% CI**, simply cut off the bottom 5% and the top 5% of the resampled statistics — the middle 90% is your confidence interval.
5. For a **95% CI**, cut off 2.5% at each tail.

This procedure converges on the same answer as the classical formula because of the **Central Limit Theorem**: bootstrapped sample means tend towards a normal distribution. If the goal is to approximate the normal (i.e., push the t towards the z), and bootstrap does that for you directly from the data, then the mathematical machinery becomes optional. Many data scientists simply go straight to bootstrap.

---

#### Section 9: The Binomial Distribution

**[00:37:30 ~ 00:42:30]** Most of the target variables we predict in data science are **binary** (dichotomous): cholera or not, sick or well, will join or will not join, fraud or legitimate, yes or no. Any process with exactly two possible outcomes per trial follows a **binomial distribution**.

The textbook illustration is **tossing a coin** — two sides, head or tail. A common misunderstanding is that the two outcomes must have **equal probability**; this is true for a fair coin but is **not required** for a binomial distribution. The only rule is that the probabilities must sum to one:

$$
p + (1 - p) = 1
$$

For $n$ independent trials each with probability $p$ of "success", the probability of exactly $k$ successes is:

$$
P(X = k) \;=\; \binom{n}{k} p^k (1-p)^{n-k}
$$

**Synonym:** in some jurisdictions the **Bernoulli distribution** is used as the name for the binary case — this is the same underlying idea (strictly, the Bernoulli is a single binomial trial). Most of us are more accustomed to "binomial" than "Bernoulli".

---

#### Section 10: "Success" Is Whatever You Are Looking For

**[00:43:30 ~ 00:47:44]** The word **"success"** in statistics textbooks is easily misread. It does not mean "good" or "best" — it simply means **the outcome of interest**. The negation of the defined success becomes the "failure", but there is nothing inherently negative about failure either — you can rename the categories whatever makes sense. All that matters is that there are exactly two mutually exclusive possibilities.

**Real-world examples where "success" is the undesirable outcome:**

- **Bank lending.** Your interest is not in the customers who repay — it is in the customers who **default**. Success = default. The bank models the probability that accumulated defaults push the bank into bankruptcy.
- **Fintech / payments.** Your interest is not in the users who transact honestly. Success = **fraudulent transactions**. That is what you want to predict and block.
- **The lab's recruitment data.** The interesting group is not the people who like a post and then actually join a programme — it is the people who engage (like, follow, read) but **never attend**. Success = engaged-but-absent. Understanding this group is what allows the lab to plan programmes that convert interest into attendance.

---

#### Section 11: Using a Binomial to Simulate More Data

**[00:48:37 ~ 00:52:00]** Once you have a real dataset with a known probability of "success", you can **simulate additional data** from the same binomial distribution without destroying the underlying statistical properties of your data. For example, if the historical probability that an invited person actually joins a lab meeting is $p = 0.2$, you can simulate: *"given 100 people expressed interest, what is the probability that nobody actually joins?"*

In a recent lab invitation, 110 people liked the post and 106 applied to join — but the real question is how many show up on **Day 1**, and how many stay until the **final day**. If attendance falls from 120 on Day 1 to 60 on the final day (a 50% loss), that is a warning sign worth investigating — the content, the presenters, or the format may need to be revisited. A **post-event survey** helps diagnose the cause. When historical data is thin, simulation from an assumed binomial lets you reason about plausible scenarios ahead of time.

---

#### Section 12: The Chi-Squared ($\chi^2$) Distribution — Departure from Expectation

**[00:52:00 ~ 01:00:52]** The **chi-squared distribution** (written $\chi^2$ and sometimes transcribed as "K-squared") is used to measure the **departure of observed values from expected values** — in other words, it is the tool for answering *"are things turning out the way I predicted?"*

**The framing.** You postulate a **null hypothesis** — for example: *"80% of those who apply will attend on 2 February."* The $\chi^2$ test compares what you **observed** against what you **expected under the null**. The test statistic is:

$$
\chi^2 \;=\; \sum_{i} \frac{(O_i - E_i)^2}{E_i}
$$

Where $O_i$ is the **observed** count for category $i$ and $E_i$ is the **expected** count. Large values of $\chi^2$ indicate a big departure from expectation; small values mean the data is compatible with the null.

**Goodness of fit.** More generally, $\chi^2$ tests whether a set of observed categorical values fits a specified reference distribution — the null hypothesis *is* that reference distribution. If the data fits, the null holds. If the data does not fit, we have *deviated from expectation*.

**The HR interview case study.** Early this year an HR manager advertised a job slot and deliberately scheduled the interview on a public holiday, reasoning that unemployed youth would surely turn up in large numbers. She cancelled her own engagements that morning, dressed up for the interview panel — and only one or two people showed up. She posted about it online to suggest that unemployed youth are "lazy". A commenter then pointed out that the same day had been scheduled as the **military recruitment screening**, so most of the youth who applied for her job had gone to the military instead. Her **expectation** was dramatically different from the **observation** — and a $\chi^2$-style test is exactly what quantifies that departure from expectation.

As data scientists, we mainly care about *interpreting* the $\chi^2$ result; the library already has the computation.

---

#### Section 13: The F-Distribution — Chi-Squared for Continuous Data

**[01:00:52 ~ 01:08:29]** The **F-distribution** is closely related to the chi-squared: think of the F as **chi-squared for continuous measurements** instead of categorical counts. The F is the workhorse distribution in **scientific experimentation** — you will see it used heavily in the health sciences when comparing the efficacy of different treatments.

**Classic setup — drug efficacy.** Three antimalarial drugs are administered across three groups: Malafan, Chloroquine, and Artesunate (for example). Every patient has been exposed to the same dose of the parasite (100 doses each, say), and we are assuming that individual immune responses are equal — otherwise we would not be able to isolate the treatment effect.

- **Null hypothesis ($H_0$):** the three drugs have **equal strength**, so the means of the recovery measurements across the three groups are equal:

$$
H_0:\; \mu_1 = \mu_2 = \mu_3
$$

- **If $H_0$ holds:** any of the three drugs can be substituted for any other as a malaria treatment; the only remaining difference would be time-to-heal.
- **If $H_0$ is rejected:** at least one drug has a genuinely different effect, and we would investigate which.

The measurement here — for instance, the patient's temperature taken at intervals after dosing — is **continuous**, not binary, which is why $\chi^2$ is not appropriate and we use the F instead.

**ANOVA.** The test procedure you learned in Stats 111 for this situation is **Analysis of Variance (ANOVA)**, which produces an **F-score** from which the conclusion is drawn.

**Lab data example.** The same F-distribution logic applies to the lab's own recruitment data. Each student was invited to bring in (say) 30–40 IT / Computer Science / Data Science contacts to the lab. Who among the class has the social reach to actually pull the crowd? Measuring the numbers each student brings in produces continuous data across multiple groups (the students), and the F-distribution / ANOVA framework tells us whether the differences in recruitment ability are real.

---

#### Section 14: The Poisson Distribution

**[01:08:29 ~ 01:12:05]** The **Poisson distribution** models the **number of events that occur within a fixed interval** of time or space, given an average rate.

**The parameter.** The only parameter is $\lambda$ (lambda) — the **rate** at which events occur. For example, if the lab consistently observes *"every two days, two visitors arrive to watch what we do"*, then $\lambda = 2$ visitors per 2 days.

The probability of observing exactly $k$ events in the interval is:

$$
P(X = k) \;=\; \frac{\lambda^k\, e^{-\lambda}}{k!}
$$

**Practical use.** Once you know $\lambda$, you can answer questions like *"what is the probability of zero visitors on a given day?"* or *"what is the minimum attendance we should expect at any meeting, below which we need to be concerned?"* The Poisson is the foundation of **restocking models**, queueing theory, call-centre staffing, and any situation where arrivals happen at a roughly consistent rate.

---

#### Section 15: The Exponential Distribution

**[01:12:05 ~ 01:13:56]** Where the Poisson asks *"how many events in a fixed interval?"*, the **exponential distribution** asks the complementary question: *"how much time passes between events?"*

The probability density is:

$$
f(x) \;=\; \lambda e^{-\lambda x},\quad x \geq 0
$$

The exponential assumes the rate $\lambda$ is **constant** over time. That assumption is its main limitation — real-world rates rarely stay constant for long.

> If $\lambda$ genuinely stays constant for, say, six months, and then shifts to a new constant value for the next six months, you can model each window as its own exponential. But if $\lambda$ is changing continuously, the exponential distribution is no longer appropriate.

---

#### Section 16: The Weibull Distribution

**[01:13:56 ~ 01:14:47]** The **Weibull distribution** generalises the exponential for the case where the rate is **not constant over time**. Think of it as an **extension of the exponential** that accommodates a time-varying hazard rate. It is the distribution of choice in reliability engineering, survival analysis, and any setting where failure rates or event rates drift as a system ages.

---

#### Section 17: Summary of Distributions Covered

| Distribution | What it models | Key parameter(s) | Data type |
| --- | --- | --- | --- |
| **Normal** | Symmetric bell-shaped data | $\mu$, $\sigma$ | Continuous |
| **Standard Normal** | Normal with $\mu = 0, \sigma = 1$ | — | Continuous (standardised) |
| **Student's t** | Sample-based inference, heavier tails | $df = n - 1$ | Continuous |
| **Binomial** | Count of successes in $n$ binary trials | $n$, $p$ | Categorical (binary) |
| **Chi-squared ($\chi^2$)** | Departure from expected categorical counts; goodness of fit | $df$ | Categorical |
| **F** | Comparison of variances across groups; ANOVA | $df_1$, $df_2$ | Continuous |
| **Poisson** | Event counts per interval | $\lambda$ (rate) | Count |
| **Exponential** | Time between events at a **constant** rate | $\lambda$ | Continuous (time) |
| **Weibull** | Time between events with a **changing** rate | shape, scale | Continuous (time) |

---

#### Key Takeaways for Revision

1. The **empirical rule** ($\mu \pm 1\sigma \approx 68\%$, $\mu \pm 2\sigma \approx 95\%$, $\mu \pm 3\sigma \approx 99.7\%$) gives the informal link between standard deviations and confidence intervals for normal data.
2. The **z-score** $z = (x - \mu)/\sigma$ standardises data onto a common scale. Standardising does **not** make raw data normally distributed.
3. The **Q-Q plot** compares z-scores against theoretical quantiles. Points close to the diagonal mean the data fits the reference distribution; it works for any distribution, not just the normal.
4. Most real-world data is **long-tailed / skewed**. Not every extreme value is an outlier — stock-market jumps, for example, are legitimate stochastic behaviour.
5. The **Student's t-distribution** is used for sample-based inference. It has heavier tails than the normal and converges to the normal as the sample grows.
6. **Classical t-based CI:** $\bar{x} \pm t_{n-1,\,\alpha/2} \cdot s/\sqrt{n}$. **Bootstrap-based CI:** resample, sort, cut off the outer $\alpha/2$ on each side.
7. The t-distribution was developed by **W. S. Gosset** at Guinness, published under the pseudonym **"Student"**.
8. The **binomial distribution** models binary outcomes over $n$ trials; probabilities need not be equal, only sum to one: $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$.
9. **"Success"** in statistics means the **event of interest**, not the positive event. Loan defaults, fraud, and no-shows are all valid successes.
10. The **chi-squared ($\chi^2$) distribution** measures departure of observed categorical data from expected, $\chi^2 = \sum (O_i - E_i)^2 / E_i$. It's the basis for goodness-of-fit tests.
11. The **F-distribution** is the chi-squared analogue for **continuous** data and underlies **ANOVA** for comparing group means.
12. The **Poisson distribution** models event counts per interval: $P(X = k) = \lambda^k e^{-\lambda}/k!$.
13. The **exponential distribution** models **time between events** under a constant rate; the **Weibull distribution** generalises this to non-constant rates.
14. The four distributions emphasised as dominant for this course: **t, binomial, $\chi^2$, and F**. Poisson, exponential, and Weibull are secondary but worth knowing.