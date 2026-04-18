---
title: "Lecture 3 Notes"
---

### Lecture 3: Data and Sampling Distributions

#### Introduction: Why Sampling Still Matters in the Big-Data Era

**[00:00:04 ~ 00:03:34]** This lecture opens the **second chapter** of the book, covering **data and sampling distributions**. A common misconception is that the rise of **big data** has made traditional sampling irrelevant — after all, if you already have all the data, why sample? The answer is that **big data is not the same as quality data**. Large volume does not automatically confer quality, and even if every row of a huge dataset were clean, the time and computing resources needed to *understand* data at that scale are resources most of us simply do not have. Sampling is still critical because:

- It lets you reason about the data quickly enough to draw meaningful inferences.
- It gives you a tractable subset on which to compute statistics, model behaviour, and test ideas.
- The goal of analysis is **understanding** — and you cannot understand what you cannot inspect.

So even in an age of abundant data, the practical workflow remains: take a **fair sample**, analyse it, and **generalise** carefully back to the population.

---

#### Section 1: Population, Sample, and the Empirical Distribution

**[00:03:34 ~ 00:07:13]** The terminology that underpins the rest of the lecture:

- **Population** — the full body of data you care about. Almost always too large to capture in full.
- **Sample** — a subset drawn from the population. This is what we actually analyse.
- **Sampling** — the *act* of pulling a subset out of the population.
- **Empirical distribution** — the distribution we build from the sample. It is called "empirical" because we are not certain it perfectly mirrors the true (unknown) population distribution — it is our best approximation built from observed evidence.

The guiding idea is that the sample, if drawn well, should be **fair enough** to allow us to infer properties of the population from it.

---

#### Section 2: Random Sampling — With and Without Replacement

**[00:07:13 ~ 00:09:13]** In **random sampling**, every element of the population has an **equal probability** of being selected. Random sampling comes in two flavours:

- **With replacement.** You record the value you drew and then put it back into the population before drawing again. The same element can be selected multiple times.
- **Without replacement.** Once an element has been drawn, it is removed from the population. This is how a traditional **lottery** works — a number, once drawn, cannot reappear.

Which you choose depends on your objective.

---

#### Section 3: Why Replacement Does Not Make the Data "Messy"

**[00:11:56 ~ 00:14:40]** A natural worry is that sampling *with replacement* introduces duplicates and therefore "redundancy" in the data. The answer is that this is **not an error** — it is the design of the sampling process.

Think of it concretely: if you are sampling people in a community and three people who happen to look similar to you appear in your sample, that is not the same person being drawn three times — it is three different, genuine members of the community. The duplication reflects the real frequency of that *type* of observation in the population. **With replacement gives every population member the *same* equal chance on every draw**, which is precisely what "equal probability of selection" means. The replacement also handles a hard practical constraint: you usually cannot go back to the field to collect new data, so reusing what you have — under the assumption that the characteristics are preserved — is a pragmatic necessity.

---

#### Section 4: Data Quality Over Quantity — With One Exception

**[00:09:13 ~ 00:10:10, 00:24:10 ~ 00:25:58]** Whatever you draw from the population is only useful if it meets **data-quality** standards. The properties to check:

- **Completeness** — no missing values where they matter.
- **Consistency of format** — dates in one format, units uniform, and so on.
- **Cleanliness** — no noise or garbage values.
- **Accuracy** — values reflect what they claim to measure.
- **Representativeness** — the sample actually reflects the population it is meant to describe. A dataset whose faces are all light-skinned is not a representative sample of humanity, and models trained on it will fail on the underrepresented groups.

The general rule is therefore **quality over quantity**. There is one clear exception: when your data is both **huge and sparse** — as is common in real big-data settings — most of the cells are empty, and random sampling mostly just pulls out zeros. In that specific case, you need enough **quantity** to surface any meaningful signal at all. This is the one setting, for now, where quantity is prioritised over quality.

---

#### Section 5: Notation — Greek Letters for Population, English for Sample

**[00:25:58 ~ 00:30:44]** A convention you need to recognise at sight:

| Quantity | Population | Sample |
| --- | --- | --- |
| Size | $N$ | $n$ |
| Mean | $\mu$ | $\bar{x}$ |
| Standard deviation | $\sigma$ | $s$ |

In statistics, **Greek letters denote population metrics** and **English letters denote sample metrics**. One rationalisation is that population metrics are *inferred* while sample metrics are *observed*, but honestly it is best treated simply as **notation convention** — see a Greek letter, think "population"; see an English letter, think "sample".

---

#### Section 6: Stratified Sampling

**[00:14:40 ~ 00:17:44]** When a population contains clear **homogeneous subgroups**, random sampling alone may under-represent some of them. The solution is **stratified sampling**:

1. Divide the population into **strata** (plural) — each **stratum** (singular) being one homogeneous subgroup.
2. Perform random sampling **within each stratum**.

A practical example: Ghana is administratively divided into **regions** (Volta, Eastern, Northern, Upper East, Ashanti, and so on), and the cultural behaviours of these regions differ enough that blanket random sampling across the country would miss the variation. By sampling *within* each region, you ensure every region is represented in proportion to what you care about. Each region plays the role of a stratum.

---

#### Section 7: Simple Random Sample, Sample Bias, and Selection Bias

**[00:17:44 ~ 00:21:11]** A **simple random sample** is what you get when random sampling is used under the assumption that the sample satisfies the population's distribution. Even then, you are not automatically safe — any irregularity in how the data was collected introduces **sample bias**.

Note: we usually do not speak of bias in the *population* itself, because the population is the full membership and is simply what it is.

**Selection bias** is the most common form. Examples:

- **The constituency politician.** A politician asked to distribute money to the constituency naturally starts from family and close circles first. If funds run out before reaching the wider constituency, the "sample" of beneficiaries is heavily biased.
- **Self-selection bias.** Paid reviewers or paid social-media "serial callers" all praising a product are not a representative sample of users — they were selected specifically because they benefit from praising it. Any conclusions drawn from their testimony are not generalisable.

**Visual test for bias.** A truly random sample plotted on a scatter plot should show **no pattern** — the points should look evenly scattered. If your scatter reveals a clear linear or systematic shape where you did not expect one, that is a sign your sampling procedure has introduced **systemic bias**.

---

#### Section 8: Random Selection as the Defence — and Its Limits

**[00:22:04 ~ 00:24:10]** The cure for sample bias is **random selection**, but performing true randomisation in practice is hard. Classical techniques include:

- Assigning numbers to every candidate at random so the selector does not know which candidate corresponds to which number.
- Writing numbers onto paper balls, shuffling them in a bag, and drawing — the approach traditional lotteries used.
- **Spinning wheels** — the spin's physical randomness determines the outcome independently of any human preference.

Even **stratified sampling** is not immune — achieving true randomness within each stratum requires genuine effort.

---

#### Section 9: Data Snooping

**[00:33:44 ~ 00:35:15]** **Data snooping** is the practice of hunting extensively through data in search of "something interesting" until you find a result you like. A concrete pattern, especially common in final-year projects:

> You run the model — it gives 30% accuracy. You refuse to accept it, so you start "tricking things": add a feature, drop a column, try a different target encoding, resample, rerun — repeatedly — until the number reads 99%. That entire interrogation process is data snooping.

The danger: if you keep hunting long enough, you *will* find something that looks good on the data you have. In machine-learning terms, this is **overfitting** — the model has been tuned to the idiosyncrasies of this sample rather than to a generalisable pattern. It will not hold up on new data.

---

#### Section 10: The Vast Search Effect

**[00:38:12 ~ 00:40:21]** Related to data snooping, the **vast search effect** is a bias that arises from **repeatedly modelling data with large numbers of predictor variables**. The process looks like:

1. Try predictor $X_1$. Not working.
2. Switch to $X_2$. Also not working.
3. Try $X_3$, then $X_4$, then $X_5$ — trial and error.
4. Eventually, *some* combination produces a good-looking result.

The problem: when you search across a large enough space of predictors, some combination is bound to look good by pure chance. The result is not necessarily a real finding — it is a statistical artefact of having looked in too many places. Like data snooping, the vast search effect is deeply linked to **overfitting**.

---

#### Section 11: Regression to the Mean

**[00:40:21 ~ 00:46:16]** **Regression to the mean** is a phenomenon in which extreme observations tend to be followed by observations closer to the long-run average. The word *regression* here simply means *to go back* — back to the average.

**Everyday examples:**

- A tall man marries a short woman hoping their children will be tall, and their children turn out shorter than him — the outcome has regressed to the mean of the family.
- A Year 1 student who came from a secondary school with a strong exposure to the course material (Prempeh, PRESEC, Adisco, Pesco, etc.) scores 90% because of that prior knowledge. In Year 2, the playing field levels out and the same student scores 60–70%. They have **regressed to the mean** — not because they became worse, but because their Year 1 score was inflated by prior exposure, not genuine underlying ability.
- The student who scored 60% in Year 1 because they lacked fundamentals may jump to 90% in Year 2 once those fundamentals are filled in.

**The general principle:** regression to the mean happens when **skill + luck** produce an extreme result. When the luck disappears, the observation falls back towards the true mean. In sampling and modelling, this means early "superb" results that arose partly from chance will look much more ordinary on new data — echoing the **overfitting** problem from Sections 9 and 10.

Note: "regression to the mean" in this sense is **not the same** as "regression" the ML technique.

---

#### Section 12: Data Distribution vs Sampling Distribution

**[00:47:03 ~ 00:51:26]** A critical distinction. Two similar-sounding but different concepts:

- **Data distribution.** You take your raw data points, count the frequency of each value, and plot the result. This is the distribution of the **raw data itself**.
- **Sampling distribution.** You take repeated samples from your data, **compute a statistic** (e.g. the mean) on each sample, and plot the distribution of those statistics. This is the distribution of a *metric* — not of the raw data.

Whenever you hear the word **statistics**, the speaker is referring to a property computed on a *sample*. So:

> Raw data → frequency distribution → **data distribution**.
>
> Statistics computed on repeated samples → frequency distribution → **sampling distribution**.

---

#### Section 13: The Central Limit Theorem (CLT)

**[00:51:26 ~ 00:52:17]** When you plot a sampling distribution and it takes on a **bell shape**, the **Central Limit Theorem** has been satisfied. Informally:

> The sampling distribution of the mean tends towards a **normal distribution** as the sample size grows, regardless of the original shape of the data.

This is powerful. Raw data in the real world often arrives in skewed or long-tailed forms, but the distribution of *sample means* taken from that data will still trend towards a normal shape. Because the normal distribution is extremely well studied, anything we can reduce to it unlocks a vast toolkit. The CLT is one of the foundations that makes the bootstrap work.

---

#### Section 14: Standard Error vs Standard Deviation

**[00:52:17 ~ 00:55:31]** Another distinction that students constantly confuse. Both measure variability, but on **different objects**:

| Measure | Computed on | Tells you about |
| --- | --- | --- |
| **Standard Deviation (SD)** | the raw data itself | spread of individual data points |
| **Standard Error (SE)** | a **statistic** (e.g. the mean) computed across samples | spread / reliability of the statistic |

So if you compute the mean for many samples and then take the standard deviation of those means, the value you get is the **standard error of the mean** — not the standard deviation of the data.

> **SD** measures how scattered the raw observations are.
> **SE** measures how scattered the sample statistics are.

---

#### Section 15: The Standard Error Formula and the Square Root of n Rule

**[00:59:58 ~ 01:02:30]** The standard error of the mean has a clean formula:

$$
SE \;=\; \frac{s}{\sqrt{n}}
$$

where $s$ is the sample standard deviation and $n$ is the sample size. This relationship is known as the **square-root-of-$n$ rule**.

**Implication for study design.** SE and $n$ are inversely related — but through a square root, not a linear factor. So:

- To **halve** the standard error, you must **quadruple** the sample size.
- To **reduce SE by a factor of 2**, increase $n$ by a factor of 4.

Practical use: if you go into the field with a planned $n$, analyse what you have, and decide you need a smaller error than you are currently getting, you can use this rule to calculate how much *more* data you need.

---

#### Section 16: The Bootstrap — Step by Step

**[01:04:18 ~ 01:11:47]** The naïve procedure for estimating SE would be: *collect many brand-new samples, compute the statistic on each, and take the standard deviation of those statistics*. Unfortunately, collecting brand-new samples over and over is usually not feasible. The **bootstrap** is the workaround.

**Definition.** A **bootstrap sample** is a sample redrawn **with replacement** from an observed data set. The act of drawing repeated samples from existing data is called **resampling**.

Important hierarchy:

> **Resampling** is the umbrella. Under it sit the **bootstrap** (always with replacement) and the **permutation test** (usually without replacement).

**The bootstrap procedure for estimating a statistic (e.g. the mean):**

1. **Draw** a value from your observed sample, record it, and **put it back**.
2. **Repeat step 1** $n$ times — this gives you one bootstrap sample. Note: $n$ here should be *smaller* than your full sample size, so you can generate many distinct bootstrap samples.
3. **Compute** the statistic of interest (e.g. the mean) on this bootstrap sample.
4. **Repeat steps 1–3** $R$ times. The more $R$, the more reliably the sampling distribution emerges — and the closer it converges to a bell shape, per the CLT.
5. Use the $R$ statistics to build your sampling distribution. From this you can:
   - Plot a histogram or box plot,
   - Compute the **standard error** (the SD of the $R$ statistics),
   - Compute a **confidence interval** (see Section 19).

---

#### Section 17: What the Bootstrap Is Not For

**[01:11:47 ~ 01:16:18]** The bootstrap is often misunderstood. It is **not**:

- A way to **compensate for a small sample**. If your original sample is too small or biased, the bootstrap carries that problem forward — you will not fix it by resampling.
- A way to **create new, genuine data**. The bootstrap reuses what you already have.
- A way to **fill in missing values**.

What the bootstrap *does* is help you **infer** how the population might look, based on the sample you actually have. Bootstrap assumes that the characteristics of the people you already have are representative of the community they came from — so duplicating those people in resampling is equivalent to asking more people who would have given similar answers.

> Bootstrapping **you** does not give a new person; it gives you **more of you** to stabilise estimates about your community.

---

#### Section 18: Bootstrap vs Resampling vs Oversampling — Clearing Up the Confusion

**[01:16:18 ~ 01:20:38]** In ML literature the words *resampling* and *oversampling* are sometimes used interchangeably. The nuance to hold onto:

- **Bootstrapping** — strictly **with replacement**. Does not produce new data; it stabilises estimates about the population.
- **Resampling** — the umbrella. Allows **with replacement** (bootstrap) *or* **without replacement** (permutation).
- **Oversampling** (in the ML sense) — used to address **class imbalance**; the outputs are often *treated as* new data points for training purposes, even though mechanically the procedure may overlap with resampling.

The overlap is real: a single procedure can technically be called all three depending on the context and the intent. What matters is that you are clear about which interpretation applies to what you are doing.

---

#### Section 19: Confidence Intervals — Why and How

**[01:20:38 ~ 01:31:27]** A **confidence interval (CI)** is another way to characterise the error in an estimate obtained from a sample. It has two components:

- **Confidence level** — the percentage, e.g. 90%, 95%.
- **Interval end points** — the lower and upper bounds of the interval.

**Why use a CI instead of just the mean?** Because point estimates are fragile. A single value — a mean or a standard deviation — invites decisions hinged on one number. It is like trusting exactly one person's opinion. A **range** provides a boundary within which you can operate; three or four or five consistent opinions are a much richer basis for decisions than one.

**How to compute a CI using the bootstrap:**

1. You know your sample size $n$ and the statistic you care about (say the mean).
2. Draw a bootstrap sample of size $n$ (with replacement) and compute the statistic.
3. Repeat step 2 $R$ times. This gives you the **sampling distribution** of the statistic.
4. Pick your confidence level $x\%$. Compute the tail proportion to trim on each side:

$$
\frac{100 - x}{2} \;\%\; \text{on each tail}
$$

For a **90%** CI, trim **5%** from each tail. For a **95%** CI, trim **2.5%** from each tail.

5. Sort the $R$ statistics. The values at the two trimming boundaries become the **end points** of your CI. Everything between those two values is your confidence interval.

> **Relation to outlier trimming:** the mechanics are the same — you cut values off the ends of a sorted distribution. But the *intent* is different. Outlier trimming removes values you do not trust. CI trimming defines a region within which you are confident the true value lies.

---

#### Section 20: The Normal Distribution and the Empirical Rule

**[01:32:12 ~ 01:41:57]** The lecture closes with a first pass at the **normal distribution** (also called the **Gaussian distribution** in Stats 301), which will be extended in Lecture 4.

**Shape.** A symmetric **bell curve** (or "dome shape"). Extraordinarily powerful because most classical statistical methods were designed around it, so whenever data is normal (or can be made normal), a vast toolkit becomes available.

**The standard normal distribution.** A normal distribution with **mean $0$** and **standard deviation $1$** — the distribution you get after standardising via the z-score:

$$
z \;=\; \frac{x - \mu}{\sigma}
$$

> **Important caveat:** converting data to z-scores (standardising) does **not** make the data normally distributed. It only places the data on a **common scale** (mean 0, SD 1). If the raw data was skewed, the z-scores will still be skewed — just recentred and rescaled. Python exposes this transformation via a `scale` / `StandardScaler` utility.

**The empirical rule (68–95–99.7).** For genuinely normally distributed data:

$$
\begin{aligned}
\mu \pm 1\sigma &\;\Rightarrow\; \approx 68\% \text{ of the data} \\
\mu \pm 2\sigma &\;\Rightarrow\; \approx 95\% \text{ of the data} \\
\mu \pm 3\sigma &\;\Rightarrow\; \approx 99.7\% \text{ of the data}
\end{aligned}
$$

These multipliers (1, 2, 3) map directly onto **standard z-scores** that you can memorise and reuse for computing informal confidence intervals.

**Checking normality visually — the Q-Q plot.** Plot your data and draw a diagonal reference line $y = x$. If the data hugs the diagonal, it is approximately normal. This is covered in more detail in Lecture 4, and the same tool can check fit against *any* distribution — not just the normal.

---

#### Key Takeaways for Revision

1. **Big data ≠ quality data.** Sampling remains essential even in the big-data era because understanding requires tractable datasets.
2. **Population → sample → empirical distribution.** We build the empirical distribution from the sample because the true population distribution is usually unknown.
3. **Random sampling** gives every element equal probability of selection; it can be **with** or **without** replacement.
4. **Replacement does not introduce errors** — it preserves equal probability and handles real-world data-collection constraints.
5. **Quality beats quantity** — except when data is **huge and sparse**, in which case you need quantity to surface signal.
6. **Notation:** Greek letters (e.g. $\mu$, $\sigma$, $N$) for the population; English letters (e.g. $\bar{x}$, $s$, $n$) for the sample.
7. **Stratified sampling** — split the population into homogeneous strata, then sample randomly within each stratum.
8. **Sample / selection bias** arises from systematic choices in how data is collected. Random selection is the defence, but true randomisation is hard.
9. **Data snooping, the vast search effect, and regression to the mean** are all cousins of **overfitting** — they all arise when you chase results on one dataset too hard.
10. **Data distribution** = distribution of raw values. **Sampling distribution** = distribution of a *statistic* computed over repeated samples.
11. **Central Limit Theorem:** sampling distributions of the mean tend toward a normal shape as sample size grows.
12. **Standard Deviation (SD)** measures spread of raw data. **Standard Error (SE)** measures spread of a statistic: $SE = s/\sqrt{n}$.
13. **Square-root-of-$n$ rule:** to halve the SE, quadruple the sample size.
14. **Bootstrap** = resampling *with replacement*. **Permutation** = resampling *without replacement*. Both are techniques for extracting more inference from a fixed sample.
15. The bootstrap is **not** a way to fabricate new data, fix small samples, or fill missing values.
16. **Confidence Intervals** give you a range rather than a single point — trim $(100-x)/2\%$ from each tail of the bootstrap distribution to get an $x\%$ CI.
17. **Normal distribution** is the cornerstone of classical statistics; the **standard normal** has $\mu = 0$, $\sigma = 1$ and is obtained via the z-score $z = (x-\mu)/\sigma$.
18. Z-score standardisation puts data on a **common scale** — it does *not* make non-normal data normal.
19. The **empirical rule** (68–95–99.7) gives the informal bridge between standard deviations and confidence intervals for normal data.