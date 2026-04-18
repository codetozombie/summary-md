---
title: "Lecture 2 Notes"
---

### Lecture 2: Exploring Data — Order Statistics, Distributions, and Correlation

#### Introduction: From Algorithm-Focused to Data-Focused Thinking

**[00:00:01 ~ 00:01:25]** A helpful framing to open the course: in **Stats 311** the emphasis was on **algorithms and methods** — you coded them, ran them on datasets pulled from Kaggle, and submitted them as assignments. The data itself was a given; the focus was on what you did with it.

In **DCIT 405**, the emphasis flips. The concern now is the **quality and shape of the data you collect** before it ever reaches a machine-learning model, because:

> How good your **data** is determines how good your **model** can become.

This lecture begins building the toolkit for examining data — estimating its spread, exploring its distribution visually and numerically, and measuring how variables relate to one another.

---

#### Section 1: Order Statistics — Range, Minimum, and Maximum

**[00:01:25 ~ 00:03:22]** When we sort or rank a dataset and compute summaries from the sorted values, statisticians call those summaries **order statistics**. The most basic ones are:

- **Range** — the difference between the largest and smallest values in the dataset:

$$
\text{Range} \;=\; \max(x) - \min(x)
$$

- **Minimum and Maximum** — the extreme endpoints of the sorted data. They are the first tool used to flag **outliers**.

**Outlier warning.** The range is extremely sensitive to outliers. If Bill Gates were placed in our community dataset on income, the maximum would explode and the range would suggest everyone here is wealthy — leading to the absurd conclusion that everyone should pay a "rich person's" tax. Because of this sensitivity, we need ways of measuring spread that **trim off the extremes**. That leads us to percentiles.

---

#### Section 2: Percentiles and Quantiles

**[00:04:07 ~ 00:06:13]** The **$p$-th percentile** of a sorted dataset is the value below which $p\%$ of the observations fall, and at or above which at least $(100-p)\%$ of the observations sit. In other words, it is the cut-point that splits the sorted data into "the bottom $p\%$" and "the rest".

**How to compute the $p$-th percentile** — say the **80th percentile**:

1. **Sort** the data from smallest to largest.
2. Start at the smallest and walk **80% of the way** along the sorted sequence.
3. The value you land on is the 80th percentile.

**Quantiles are the same idea in decimal form.** The $0.8$ quantile is identical to the 80th percentile; multiply a quantile by 100 to get the percentile.

**A notable special case.** When $p = 50$, you have the **median** — the midpoint of the sorted data.

---

#### Section 3: The Interquartile Range (IQR)

**[00:06:13 ~ 00:08:06]** The **Interquartile Range** is a spread measure that is **robust to outliers** because it ignores the extremes entirely:

$$
\text{IQR} \;=\; Q_3 - Q_1 \;=\; P_{75} - P_{25}
$$

So the IQR is the difference between the **75th percentile** (third quartile, $Q_3$) and the **25th percentile** (first quartile, $Q_1$). The middle 50% of the data lives inside this interval. Because outliers sit in the top or bottom tails, they do not distort the IQR — which is exactly why it is preferred over the range for real-world datasets.

All of these measures are already implemented in the standard statistics packages (Python, R), so in practice you call a function rather than computing by hand.

---

#### Section 4: Exploring Data Distribution — Visual and Numeric Approaches

**[00:08:06 ~ 00:10:14]** To understand how your data is distributed, there are two complementary routes:

- **Visual approach:** **box plot**, **histogram**, **density plot**.
- **Numeric approach:** the **frequency table** — which, in fact, is the underlying structure that the visual tools are generated from. Every chart needs numeric values behind it, so these two routes are really the same information in different presentations.

---

#### Section 5: The Box Plot

**[00:10:14 ~ 00:11:48]** A **box plot** compresses the distribution of a numeric variable into a single compact picture. The features it shows:

- The **box** spans the **IQR** (from $Q_1$ to $Q_3$).
- A line inside the box marks the **median** (50th percentile, $Q_2$).
- **Whiskers** extend out to the **minimum** and **maximum** within the non-outlier range.
- Any points **beyond the whiskers** are flagged as **outliers**.

At a single glance a box plot tells you:

- Where the middle of the data sits (median).
- How spread out the middle 50% is (box width).
- How symmetric the distribution is (where the median sits inside the box).
- Whether outliers are present, and how many.

---

#### Section 6: The Histogram and Binning

**[00:11:48 ~ 00:14:51]** A **histogram** is built from a **frequency table**. Continuous values are grouped into **bins** — for example, values from 0 to 10 go into bin 1, values from 10 to 20 into bin 2, and so on. The height of each bar is the number of observations falling into that bin.

**Who decides the bin size?** You, the developer. But there is one strict rule:

> **All bins must have the same width.**

You cannot use a bin of width 10, then a bin of width 20, then a bin of width 70 — doing so would distort the visual comparison between bars. The data itself guides how wide the bins should be, but they must remain **uniform**.

**Frequency tables in practice.** You build them the same way as in senior-high school: list the unique values (or bin boundaries), **tally** the occurrences (in groups of five, crossed through on paper), and count. The resulting counts feed directly into the histogram.

---

#### Section 7: Histogram vs Bar Chart — Why One Has Spaces

**[00:14:00 ~ 00:15:00]** A subtle but important convention:

- In a **histogram**, bars touch each other — **no gaps** between them. Why? Because a bin *could legitimately have zero observations*, and a zero-frequency bin is represented by a bar of height zero. If you introduced a visual gap between bars, you could no longer distinguish "zero-frequency bin" from "visual separator".
- In a **bar chart**, bars are **separated** by gaps. Bar charts are used for **categorical data**, where the categories are discrete and unrelated on a continuous axis, so a gap between them carries no ambiguity.

The underlying rule: **histograms for continuous data; bar charts for categorical data.**

---

#### Section 8: The Density Plot

**[00:15:37 ~ 00:16:25]** A **density plot** is, informally, the **continuous equivalent** of a histogram — imagine smoothing the tops of the histogram bars into a continuous curve. It shows the same distributional information but without depending on bin boundaries, which can make it easier to compare shapes across datasets.

---

#### Section 9: Exploring Categorical and Binary Data — The Mode

**[00:16:25 ~ 00:18:14]** When the data is **categorical** (or binary), the key summary becomes the **mode** — the most frequently occurring value. For example: "How many First-Class students did Computer Science produce this year?" The answer is a count of the most common degree classification, which is a mode computation on a categorical variable.

---

#### Section 10: Bar Chart vs Pie Chart for Categorical Data

**[00:18:14 ~ 00:18:57]** Two common chart types for categorical data:

- **Pie chart** — best when you have **a very small number of categories**, ideally **no more than four**. Beyond that, the slices become hard to compare visually.
- **Bar chart** — preferred when you have **more categories**, because it scales gracefully and makes comparisons between categories easy.

The rule of thumb: if in doubt, reach for a bar chart.

---

#### Section 11: The Expected Value

**[00:17:27 ~ 00:22:06]** For categorical data with associated probabilities, we can still compute a **numerical summary** — the **expected value**.

$$
E[X] \;=\; \sum_{i} p_i \cdot x_i
$$

where $p_i$ is the probability of category $i$ and $x_i$ is the value associated with that category.

**Worked example from the lecture.** A telecoms provider (e.g. CWESI / DSTV) is launching new package tiers. A market survey estimates the share of customers who will choose each tier:

| Package | Probability |
| --- | --- |
| Package A | 50% |
| Package B | 10% |
| Package C | 30% |
| Package D | 10% |

These survey-derived probabilities let us compute an **expected revenue** or **expected uptake** by weighting the value of each package by its probability — translating purely categorical preferences into a single numerical forecast.

**Airlines delay example.** Another categorical-data use case mentioned in the lecture: airlines track delays by cause — carrier delay, weather delay, security delay, inbound delay — and count occurrences. The **mode** of this distribution (which cause occurs most often) points directly to where the airline is bleeding money. If the mode is "inbound delay", that is where mitigation should be targeted. As data scientists, we act as the **seer** of the company — surfacing where the organisation is losing revenue and where it should focus.

---

#### Section 12: Correlation — Linear Association Between Two Variables

**[00:20:31 ~ 00:24:28]** **Correlation** measures the strength of the **linear association** between two variables. The key word is *linear* — the correlation coefficient only captures the degree to which the variables move together **along a straight line**.

- Your **independent variable** sits on the **x-axis**.
- Your **dependent variable** sits on the **y-axis**.

As $x$ moves in one direction, $y$ either moves with it or against it — and that behaviour is what the correlation measures.

---

#### Section 13: Positive, Negative, and Perfect Correlation

**[00:22:52 ~ 00:26:54]** The correlation coefficient $r$ is bounded between $-1$ and $+1$:

$$
-1 \;\leq\; r \;\leq\; +1
$$

| Value | Meaning |
| --- | --- |
| $r = +1$ | **Perfect positive** correlation — all points lie exactly on an upward-sloping straight line |
| $0 < r < +1$ | Positive correlation — $y$ tends to rise as $x$ rises |
| $r = 0$ | No **linear** association (see caveat below) |
| $-1 < r < 0$ | Negative correlation — $y$ tends to fall as $x$ rises |
| $r = -1$ | **Perfect negative** correlation — all points lie exactly on a downward-sloping straight line |

> A critical distinction: **"positive"** refers to the **direction** of the association. **"Perfect"** refers to whether every point lies exactly on the line. You can have a *perfect positive* correlation ($r = +1$) or a *perfect negative* correlation ($r = -1$).

---

#### Section 14: Why a Zero Correlation Does NOT Mean No Relationship

**[00:26:54 ~ 00:28:26]** This is one of the most commonly misunderstood points in statistics:

> $r = 0$ means there is **no linear association** — it does **not** mean there is no relationship at all.

The relationship might be perfectly deterministic — just not linear. The classic counter-example is a **circle**:

$$
x^2 + y^2 = r^2
$$

Every point on a circle is perfectly determined by the equation, yet you cannot draw a single straight line through the points, so the Pearson correlation coefficient comes out as zero. The data points are related in a precise, rigorous way — the relationship is just **curved**, not linear. This is why a strong background in basic mathematics is needed to interpret results correctly.

---

#### Section 15: The Sum-of-Products — A Pre-Pearson Approach

**[00:30:42 ~ 00:32:21]** Before Karl Pearson formalised his coefficient, an intuitive way to detect a perfect relationship was the **sum of products**.

**Worked example.** Take a variable $X = (1, 2, 3)$ and a variable $Y = (4, 5, 6)$. This is clearly a perfect linear relationship — each step of $X$ is matched by a step of $Y$.

| $x_i$ | $y_i$ | $x_i \cdot y_i$ |
| --- | --- | --- |
| 1 | 4 | 4 |
| 2 | 5 | 10 |
| 3 | 6 | 18 |

$$
\sum x_i y_i = 4 + 10 + 18 = 32
$$

The claim is that **altering any value** in $X$ or $Y$ so that the pair is no longer perfectly linearly related will produce a sum of products that is **strictly less than 32**. Only a perfect relationship achieves the maximum sum-of-products for that configuration.

**The limitation.** This approach is not rigorous — it is not scale-invariant, and the "maximum value" depends on the specific numbers involved, making it unfit for general use. That is exactly why Pearson introduced a standardised formulation.

---

#### Section 16: The Pearson Correlation Coefficient

**[00:32:21 ~ 00:33:19]** The **Pearson correlation coefficient** $r$ is the standardised, generalised version of the sum-of-products idea:

$$
r \;=\; \frac{\displaystyle\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{(n - 1)\, s_x\, s_y}
$$

where:

- $\bar{x}, \bar{y}$ are the means of $X$ and $Y$,
- $s_x, s_y$ are the sample standard deviations of $X$ and $Y$,
- $(n - 1)$ is the degrees of freedom.

**Don't memorise the formula.** The lecturer's guidance is explicit here: the value of the formula is in **knowing how to use it and interpret the result**, not in reciting it. If a question needs the formula, it will be provided.

---

#### Section 17: Other Correlation Measures — Kendall's Tau and Spearman's Rho

**[00:33:19 ~ 00:34:08]** Pearson is the default, but it is not the only option. Two alternatives that appear in the labs:

- **Spearman's rho ($\rho$)** — a rank-based correlation. It computes Pearson's coefficient on the **ranks** of the data rather than the raw values, which makes it robust to outliers and able to detect monotonic (but not necessarily linear) relationships.
- **Kendall's tau ($\tau$)** — another rank-based correlation, based on counting **concordant and discordant pairs** of observations.

Each has its own appropriate use cases, demonstrated in the lab work.

---

#### Section 18: The Correlation Matrix — More Than Two Variables

**[00:24:28 ~ 00:25:23]** With **more than two variables**, a single correlation coefficient is insufficient. Instead, we compute a **correlation matrix** — a square table where each cell $(i, j)$ holds the correlation between variable $i$ and variable $j$.

Key properties of a correlation matrix:

- The **diagonal is always $1$** — every variable is perfectly correlated with itself.
- The matrix is **symmetric**: $\text{corr}(X, Y) = \text{corr}(Y, X)$.
- Off-diagonal values lie in the range $[-1, +1]$.

A correlation matrix is the standard tool for getting a quick, simultaneous view of how every variable in a dataset relates to every other.

---

#### Section 19: Visualising Two-Variable Relationships

**[00:25:23 ~ 00:36:42]** The go-to visual for two numeric variables is the **scatter plot** — each observation is a point at coordinates $(x_i, y_i)$, and the overall cloud shape reveals the relationship's direction, strength, and linearity.

When datasets get very large, scatter plots become cluttered. Alternatives include:

- **Hexagonal binning plot.** The 2D plane is divided into hexagonal bins, and the count of points in each bin is shown by colour intensity. Best for **large numeric-vs-numeric** datasets.
- **Contour plot.** Shows 2D density as contour lines, similar to elevation on a topographic map.
- **Violin plot.** Combines a **box plot** with a **density plot** — the shape of the "violin" is the density (mirrored on both sides for symmetry), and you can still read off the median, $Q_1$, and $Q_3$ just as you would from a box plot. Best for comparing **distributions across groups**.

---

#### Section 20: Contingency Tables — For Two Categorical Variables

**[00:34:08 ~ 00:36:42]** When **both** variables are categorical, the right tool is the **contingency table** — a cross-tabulation where rows represent categories of one variable, columns represent categories of the other, and each cell holds the count of observations falling into that combination.

A summary of which visualisation or table to reach for based on your data types:

| Data Type | Best Tool |
| --- | --- |
| Single numeric variable | Histogram, density plot, box plot |
| Single categorical variable | Bar chart (or pie chart for ≤ 4 categories) |
| Two numeric variables | Scatter plot, hexagonal binning, contour plot |
| Two categorical variables | Contingency table |
| One numeric + one categorical | Violin plot, grouped box plot |
| Many variables together | Correlation matrix |

---

#### Key Takeaways for Revision

1. The focus in this course is **data quality and structure**, not algorithms — good data is what makes good models possible.
2. **Order statistics** are summaries built on sorted data: **range**, **min**, **max**.
3. **Range = max − min** is intuitive but **very sensitive to outliers**.
4. The **$p$-th percentile** splits sorted data so that $p\%$ falls below it. The **median** is the 50th percentile.
5. **Quantiles** are percentiles expressed as fractions (0.8 quantile = 80th percentile).
6. **IQR = $Q_3 - Q_1 = P_{75} - P_{25}$** is a **robust** measure of spread that ignores outliers by design.
7. **Box plot** = median + IQR + whiskers + outliers, all in one compact visual.
8. **Histograms** have **no gaps** (continuous data, zero-frequency bins must remain legible). **Bar charts** have **gaps** (categorical data).
9. All bins in a histogram **must be the same width**.
10. The **density plot** is the continuous-curve equivalent of a histogram.
11. For categorical data: the **mode** is the key summary; use **bar charts** (or **pie charts** for ≤ 4 categories).
12. **Expected value:** $E[X] = \sum p_i \cdot x_i$ — lets you extract a numeric summary from categorical-plus-probability data.
13. **Correlation** measures **linear** association only, $-1 \leq r \leq +1$.
14. **Positive vs perfect:** *positive* is direction (up-sloping); *perfect* means every point lies exactly on the line.
15. **$r = 0$ does NOT mean no relationship** — it means no *linear* relationship. A circle $x^2 + y^2 = r^2$ has perfect structure but zero Pearson correlation.
16. **Pearson correlation formula** uses standardised deviations from the mean — you do not need to memorise it, but you must know how to interpret its output.
17. **Spearman's rho** and **Kendall's tau** are **rank-based** alternatives to Pearson, useful when relationships are monotonic but not linear, or when outliers are a concern.
18. **Correlation matrices** generalise $r$ to multiple variables — diagonals are always 1, and the matrix is symmetric.
19. Visualising pairs: **scatter plot** for small numeric pairs; **hexagonal binning / contour** for big numeric pairs; **violin plot** for mixed categorical–numeric; **contingency table** for categorical pairs.