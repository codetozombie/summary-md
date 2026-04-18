---
title: "Lecture 1 Notes"
---

### Lecture 1: Course Introduction, Data Types, and Estimates of Location & Variability

#### Introduction: Why This Course Exists

**[00:00:01 ~ 00:02:29]** DCIT 405 — *Statistics for Data Scientists* — is the final formal statistics-for-DS course most of this cohort will take together. The framing that separates it from **Stats 311** is important:

- In **Stats 311**, the focus was on **building and evaluating models**. Data was usually pulled pre-packaged from sources like Kaggle — the data itself was assumed.
- In **DCIT 405**, the focus shifts to **the data itself**: how to collect it, how to evaluate whether it is fit for purpose, and how to understand its distribution *before* any model touches it.

The core principle: **the distribution of your data determines what you can legitimately do with it.** If you don't understand the distribution, you don't know which manipulations, transformations, or models are appropriate. If the data is irrelevant to the question you're trying to answer, no modelling trick will rescue it — so you have to learn to **let the data speak**.

---

#### Section 1: Course Structure — The Four Phases

**[00:03:15 ~ 00:05:26]** The course is organised into a natural pipeline that mirrors real-world data-science work:

1. **Exploratory Data Analysis (EDA)** — plotting, summarising, and understanding the data you have (this lecture and the next).
2. **Sampling and Distributions** — drawing samples from a population such that the sample distribution matches the population.
3. **Statistical Experiments and Significance Testing** — verifying that what you are doing with the data actually works, and that observed effects are real.
4. **Regression and Classification** — the modelling content from Stats 311, now grounded on properly prepared data.

The lecturer's stated goal is to reach at least **Chapter 6** (regression/classification) by the end of the semester, because that is where the applied content lives. Holidays, power cuts, and pace slippage occasionally get in the way — so progress is prioritised.

---

#### Section 2: Assessment and Grading

**[00:07:23 ~ 00:08:46]** The grading structure:

- **No IA (internal assessment)** in the traditional sense.
- **Quizzes** — held **bi-weekly** (one week on, one week off). Content is drawn from what is covered in class.
- **Lab Assignment (20%)** — delivered via **WorldQuant University** (see next section).
- **Attendance and participation** — tracked every session.
- **Final examination** — content drawn from **both** the class lectures **and** the lab modules, so shortcutting the labs with GPT will simply surface later as poor exam performance.

The lecturer's repeated theme: **come to learn, not to chase an A.** If you learn the content, the grade follows automatically.

---

#### Section 3: The Lab — WorldQuant University Applied Data Science

**[00:09:35 ~ 00:17:31]** The lab assignment is delivered through **WorldQuant University (WQU)** — an open, free institution offering an **Applied Data Science Lab**.

**Registration workflow:**

- Register using your **UG email** (not personal email — UG email is needed so progress can be tracked).
- Account creation can take up to ~48 hours.
- Pass the **entrance examination** (unlimited attempts; algebra, basic numerical methods, and some Python).
- Complete the **orientation** (this first week).
- Then work through **eight modules**, one per week.

**Weekly submission routine:**

- Every **Friday by 23:59** (11:59 PM), complete that week's module.
- Download your **unofficial transcript** from WQU.
- Submit it on the Sakai platform.

**Do not wait until Friday to start** — these modules will crash on you if you leave them to the last day. Do a little each evening. Upon full completion, WQU issues a **digital badge** which you attach to your **LinkedIn**, share the link with the instructor, and it is converted into the 20% lab mark.

The practical upside: in addition to the course mark, you walk away with a **legitimate data-science certificate** from WQU — real, verifiable hands-on experience.

---

#### Section 4: From Data Source to Model — Why Data Matters

**[00:38:21 ~ 00:44:30]** A consistent message threaded through the lecture: the fancy vocabulary of *big data*, *data science*, and *AI* rests on statistical foundations that have been around for decades. **John Tukey** proposed the idea of **data analysis** back in **1962**, and most of the "new" visualisations (box plots, scatter plots, etc.) are direct descendants of ideas from that era. What makes them feel new is that we now have **computational tools** to deploy them at scale.

As a data scientist:

- It is easy to **apply** tools (especially with GPT providing code).
- The real value you provide is **explaining the tools and interpreting their output**.
- No code generator can tell your company what the numbers *mean* in context.

---

#### Section 5: Sources of Data

**[00:44:30 ~ 00:50:02]** Data reaches you through many channels. The lecture highlights:

- **Events** — clicks on a website, user actions on a system.
- **Text** — documents, messages, reviews.
- **Images and video** — photos, streams (this is Prof's image-processing domain).
- **Sensors / IoT** — phones carry **gyroscopes** that can detect speed, traffic, road conditions; homes deploy fire, door, light, weather, and presence sensors for smart-home automation and consumption tracking.
- **Census data** — formal population data collection.
- **Geospatial data** — e.g. Google Maps inferring bad roads from low traffic volume, because few people drive roads full of potholes.

**Insight:** most of this data arrives in **unstructured** form. Part of the data scientist's job is transforming it into something usable.

---

#### Section 6: Structured vs Unstructured Data

**[00:42:51 ~ 00:44:30]** From a computer-science perspective:

- **Structured data** — **tabular** data, arranged into rows and columns.
- **Unstructured data** — images, audio, free text, sensor streams, network graphs.

A frequently misunderstood point: **even for models that work on unstructured inputs (NLP, computer vision), the model internally converts the input into a structured representation before performing computations.** The unstructured-friendly appearance is only at the input/output layer. Under the hood, the AI model still works with structured numerical representations.

---

#### Section 7: Types of Structured Data — Numeric and Categorical

**[00:50:53 ~ 00:54:56]** Once data is structured, each column falls into one of two top-level types:

**Numeric** — which further splits into:

- **Continuous** — can take any value in a range. Examples: age, wind speed, time.
- **Discrete** — countable values, typically integers. Examples: number of items, counts of events.

**Categorical** — values fall into groups. Examples: traffic light states (red, amber, green), days of the week, regions of Ghana, types of television.

Within categorical, two important special cases:

- **Binary** — exactly two states. Examples: male/female, yes/no, true/false, tall/short. Binary is the most common target type in classification problems.
- **Ordinal** — categorical data where the categories have a meaningful **order**. Examples: first / second / third place; {bad, worse, disgusting} where *disgusting* is stronger than *worse* which is stronger than *bad*; class ranking. Ordinal data is particularly important in **NLP** for sentiment and severity ratings.

**Why does type matter?** Because the type of a column determines which models, tests, and visualisations are appropriate. You cannot feed raw categorical labels ("male", "female") into many models — you must **encode** them (e.g. male = 1, female = 0). Once encoded numerically they are still categorical; they have simply been mapped to numbers for computation.

---

#### Section 8: Rectangular (Tabular) Data

**[00:58:52 ~ 01:01:49]** When structured data is arranged as a grid, we call it **rectangular data** — a 2D matrix with rows and columns. In Stats 211/212, matrices were introduced as rectangular data, and in Python this format is handled by **pandas** as a `DataFrame`.

For a rectangular matrix $A$, an individual element is written:

$$
a_{ij}
$$

where $i$ is the row index and $j$ is the column index.

**Terminology:**

| Role | Possible names |
| --- | --- |
| **Rows** | records, observations, examples, instances, samples, cases (public health) |
| **Columns** | features (ML), attributes, input variables, predictors (stats) |

A student example with rows as records and columns as attributes:

| Student ID | Program | CGPA |
| --- | --- | --- |
| … | … | … |

---

#### Section 9: Features vs Outcome — The Two Halves of a Dataset

**[01:04:43 ~ 01:06:11]** When a dataset will be used for modelling, the columns split into two groups:

- **Features** — the columns used as **input** to the model. Also called **predictors**, **independent variables**, or **attributes**.
- **Outcome** — the single column we want to **predict**. Also called the **target variable**, the **dependent variable**, or the **response** (from statistics).

If we were predicting CGPA from Student ID and Program, those first two columns would be the features and CGPA would be the outcome.

---

#### Section 10: Non-Rectangular Data

**[01:06:11 ~ 01:13:50]** Not all data fits a neat table. Common non-rectangular structures:

- **Spatial data (maps).** Defined by **latitude and longitude** coordinates. Election results plotted onto a Ghana map with bubble sizes representing party dominance are a spatial visualisation. Spatial data can still be stored in tabular form and plotted as heatmaps or choropleths.
- **Time-series data.** Measurements taken at regular time intervals. Much modern time-series data comes from **IoT sensors** — e.g. tracking the gait of a stroke-rehabilitation patient over time.
- **Networks.** Nodes and edges — typical of social networks. LinkedIn's "mutual connections" and Facebook's "People you may know" are network inferences. A real-world anecdote from the lecturer: a stranger called claiming to be a friend of a "Simon". The lecturer didn't recognise the name — but after the call, checking with a mutual contact revealed that "Simon" was actually known to him as "Pablo". Had this been a digital social network, a one-click shared-friends lookup would have resolved it immediately.

---

#### Section 11: Estimates of Location

**[01:13:50 ~ 01:17:00]** An **estimate of location** is a single-number summary that tells you where the data is **centred**. The word *location* here is a statistical metric, not a geographic one.

Why does a "location" matter? A location estimate tells you, at a glance, what is **typical** about the data. If the average age in a community is 28, these are young adults. If it is 55, these are mature people. If it is 85, these are the elderly. The single summary number tells you something meaningful about the whole group.

The four main location estimates covered:

1. **Mean** (simple average)
2. **Trimmed mean** (robust to outliers)
3. **Weighted mean** (accounts for unequal importance)
4. **Median** (50th percentile)

---

#### Section 12: The Mean

**[01:18:44 ~ 01:19:34]** The **sample mean** is denoted $\bar{x}$ and computed as:

$$
\bar{x} \;=\; \frac{1}{n}\sum_{i=1}^{n} x_i
$$

**Worked example.** For $n = 4$ values $x_1 = 5, x_2 = 3, x_3 = 4, x_4 = 1$:

$$
\bar{x} \;=\; \frac{5 + 3 + 4 + 1}{4} \;=\; \frac{13}{4} \;=\; 3.25
$$

The mean's weakness is that it is **very sensitive to outliers** — the "Bill Gates" problem (see Section 15).

---

#### Section 13: The Trimmed Mean

**[01:19:34 ~ 01:21:29]** A **trimmed mean** addresses outlier sensitivity by cutting off the extreme values at both ends of the sorted data *before* averaging:

$$
\bar{x}_{\text{trim}} \;=\; \frac{\sum_{i = p+1}^{n - p} x_i}{n - 2p}
$$

where $p$ is the number of values trimmed **from each end**.

**Interpreting the formula:**

- The summation runs from index $p + 1$ to $n - p$ — i.e. the smallest $p$ and largest $p$ values are skipped.
- The divisor is $n - 2p$ because $p$ values were removed from each of the two ends.

**Example.** If you trim 3 values from each end of a sorted dataset, you lose $2p = 6$ values total, and the sum starts from index 4.

---

#### Section 14: The Weighted Mean

**[01:21:29 ~ 01:27:18]** The **weighted mean** assigns different **weights** $w_i$ to each observation, reflecting unequal importance:

$$
\bar{x}_w \;=\; \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}
$$

This corresponds to the $\bar{x} = \dfrac{\sum f x}{\sum f}$ formula from high school, with $f$ being frequency.

**Key observation:** if all weights are equal, the weighted mean **collapses to the simple mean**. Weights only matter when the observations are not drawn from comparable conditions.

**Worked reasoning from the lecture — the "different schools" illustration.** Suppose two students report exam scores:

- Student A attended a top-tier senior high school (a *prec / adisco / pesco*-style school) and scored **85**.
- Student B attended a rural, under-resourced school — no name, no national ranking — and scored **80**.

The simple mean treats these two results as equivalent. That is misleading because the **environments were different**:

- Student A had every advantage — books, teachers, exposure — and produced a score only marginally above Student B.
- Student B walked ten miles to school, read by lantern, and still produced 80.

The **weighted mean** lets us express the fact that Student B's 80 represents **more genuine achievement** than Student A's 85. By giving Student B a higher weight, we correct for the disparity in environment. The same logic underpins **"less-endowed school" admission schemes** (e.g. KNUST's policy) where a student from a disadvantaged school with Aggregate 10 can be admitted to medicine while a student from an elite school with Aggregate 8 cannot — because what those numbers *represent* is not the same.

---

#### Section 15: The Median

**[01:27:18 ~ 01:28:52]** The **median** is the middle value of the sorted data. To compute it:

1. **Sort** the data.
2. Pick the **middle element**.
3. If $n$ is **odd**, take the single middle element. If $n$ is **even**, take the **average of the two middle elements**.

The median is equivalent to the **50th percentile** — exactly half the values lie below it and half above.

**Why image processing prefers the median over the mean.** In image processing, pixel values are **integers**. Consider:

- Mean of $\{1, 2, 3, 4, 5\}$ is $3$ (integer — lucky).
- Mean of $\{2, 4, 5, 7, 9\}$ is $5.4$ — **not an integer**, not even a pixel value that exists in the image. You are forced to round or truncate, introducing error.
- Median of $\{2, 4, 5, 7, 9\}$ is $5$ — always a value that was actually in the original set.

Since image data must stay as valid integer pixel values, the **median** is safer: it never invents a value that didn't exist.

---

#### Section 16: Outliers — The "Bill Gates Effect"

**[01:28:52 ~ 01:30:25]** A recurring example throughout the course: imagine Bill Gates moves into your community. Now:

- The **mean income** explodes — suddenly the community appears to be very wealthy.
- As a result, the whole community could be taxed at a higher rate.
- This is grossly unfair to the actual residents, whose incomes have not changed.

Solution: use the **median** income, not the mean. Because Bill Gates is a single point at the top end of the sorted data, he barely moves the median at all. The median reflects the true typical resident.

**Outliers are also called:** anomalies, nuances. They are identified visually via the **box plot**, and trimmed or handled explicitly in analysis.

---

#### Section 17: Estimates of Variability (Dispersion)

**[01:31:19 ~ 01:36:49]** Once you know where the data is centred, the next question is: **how spread out is it?** This is called **variability** or **dispersion**.

Key measures — most of which build on **residuals / deviations** (how far each observation falls from a reference point):

- **Deviation** — the individual differences from a reference (typically the mean). These are the "errors" or "residuals".
- **Mean Absolute Deviation (MAD)** — average absolute deviation.
- **Variance** — average squared deviation.
- **Standard Deviation** — square root of variance.
- **Median Absolute Deviation** — robust alternative to MAD.
- **Range** — max minus min.
- **Order statistics and ranks** — percentile-based spread measures (covered more in Lecture 2).
- **Percentiles / IQR** — also covered in Lecture 2.

All variability measures are, at heart, **measures of residuals or error**. The variance, for example, is sometimes referred to as the **Mean Squared Error (MSE)** — a direct link to Stats 311.

---

#### Section 18: Mean Absolute Deviation (MAD)

**[01:36:49 ~ 01:37:49]** The **Mean Absolute Deviation** is:

$$
\text{MAD} \;=\; \frac{\sum_{i=1}^{n} |x_i - \bar{x}|}{n}
$$

Take each observation's deviation from the mean, strip the sign with absolute value, sum, and divide by $n$. The absolute value is what removes the cancellation of positive and negative deviations.

In vector/ML language, this is the **$L_1$ norm** — also called the **Manhattan norm** (introduced in Stats 212 when discussing Gauss–Seidel, Jacobi, and SOR methods, where norms help compute the condition number to judge whether a matrix is **ill-posed** or **well-posed**).

---

#### Section 19: Variance and Standard Deviation

**[01:37:49 ~ 01:38:49]** The **variance** $s^2$ (sample version) is:

$$
s^2 \;=\; \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}
$$

The **standard deviation** $s$ is simply the square root:

$$
s \;=\; \sqrt{s^2} \;=\; \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}
$$

**Why squaring?** Just like the absolute value in MAD, squaring removes signs (since $(-2)^2 = 4 = (+2)^2$). Both $|\cdot|$ and $(\cdot)^2$ are valid sign-eliminating operations; they simply give rise to different metrics (MAD vs standard deviation).

The **$L_2$ norm** — the Euclidean distance from Stats 212 — is the direct vector-space counterpart of standard deviation.

---

#### Section 20: Why $n - 1$? Degrees of Freedom

**[01:38:49 ~ 01:40:57]** A classic question: why divide by $n - 1$ rather than $n$? The $n - 1$ is called the **degrees of freedom**. The technical answer involves keeping the estimate **unbiased** when working with a sample rather than the full population. The practical answer for data scientists:

> For large $n$, the difference between dividing by $n$ and dividing by $n - 1$ is negligible.

Because data-science work usually operates in the regime where the **Central Limit Theorem** has long since kicked in (large samples), the $n$ vs $n - 1$ choice does not materially affect results. For rigour, use $n - 1$ for samples and $n$ for full populations — but do not lose sleep over the distinction in practice.

---

#### Section 21: Median Absolute Deviation

**[01:40:57 ~ 01:41:55]** A robust-to-outliers variant of MAD uses the **median** in two places instead of the mean:

$$
\text{Median MAD} \;=\; \text{median}\!\left(|x_1 - \tilde{x}|,\; |x_2 - \tilde{x}|,\; \ldots,\; |x_n - \tilde{x}|\right)
$$

where $\tilde{x}$ is the median of the data. You:

1. Compute the median.
2. Compute the absolute deviation of each point from that median.
3. Take the **median** of those absolute deviations.

Because the median is unaffected by outliers (Section 16), Median MAD is itself much more robust than standard MAD or standard deviation.

---

#### Key Takeaways for Revision

1. **DCIT 405's focus is the data itself** — how it is collected, structured, and understood — not just the models built on top of it.
2. The course flows through **four phases**: EDA → Sampling → Experiments & Significance → Regression/Classification.
3. Grading: bi-weekly **quizzes**, **20% lab** via WorldQuant University's Applied Data Science course, attendance, and a final exam drawing from both class and lab content.
4. Register for WQU using your **UG email**, pass the entrance exam, and submit one module's transcript per Friday for eight weeks.
5. Data arrives from many sources — events, text, images, IoT sensors, census, geospatial — and mostly in **unstructured form**.
6. Models on unstructured inputs still perform **structured** computations internally.
7. Structured data splits into **numeric** (continuous / discrete) and **categorical** (binary / ordinal).
8. **Rectangular data** is a 2D grid: rows = observations/records/instances; columns = features/attributes/predictors. In Python, represented as a pandas `DataFrame`.
9. For modelling, columns split into **features** and the **outcome** (target, response, dependent variable).
10. **Non-rectangular data**: spatial (latitude/longitude maps), time-series (often from sensors), and networks (nodes and edges).
11. **Estimates of location** tell you where the data is centred: mean, trimmed mean, weighted mean, median.
12. **Mean:** $\bar{x} = \sum x_i / n$. Sensitive to outliers.
13. **Trimmed mean:** $\sum_{i = p+1}^{n-p} x_i / (n - 2p)$. Robust by design.
14. **Weighted mean:** $\sum w_i x_i / \sum w_i$. Collapses to simple mean when weights are equal.
15. **Median:** the 50th percentile. Preferred in image processing (always returns a value actually present in the data) and anywhere outliers (the "Bill Gates effect") distort the mean.
16. **Estimates of variability** measure spread: MAD, variance, standard deviation, median MAD, range, IQR.
17. **MAD** = $\sum |x_i - \bar{x}| / n$ (the $L_1$ / Manhattan norm).
18. **Variance** $s^2 = \sum (x_i - \bar{x})^2 / (n - 1)$; **standard deviation** $s = \sqrt{s^2}$ (related to the $L_2$ / Euclidean norm).
19. **$n - 1$ (degrees of freedom)** corrects sample variance to be unbiased — but for large $n$, the adjustment is negligible.
20. **Median absolute deviation** — the median of $|x_i - \tilde{x}|$ — is the most outlier-robust spread measure covered.