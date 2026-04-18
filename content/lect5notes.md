---
title: "Lecture 5 Notes"
---

### Lecture 5: Statistical Experiments and Significance Testing

#### Introduction: Course Reminders and the Case for Experimental Design

**[00:00:00 ~ 00:05:48]** The course is an **elective**, which means students are expected to engage with it out of genuine interest rather than simply to pad their transcripts. A recurring concern is that some students are lagging behind on the **lab work**, which is itself part of the assessment — alongside attendance and the final examination. Labs should be tackled in small daily increments: write a little code, tweak a few parameters, observe the behaviour. Shortcuts through tools like GPT will not substitute for the underlying programming competence the labs demand.

The final examination is most likely to be administered on **Sakai**, drawing from both in-class content and lab content. The assessment breakdown given in class was: **Labs 20%, Quiz 20%, Attendance and Participation 10%**, with the balance on the final examination. By Week 5, students should already be working on **Lab 4**, since Week 1 was consumed by the entrance examination.

A brief Telegram housekeeping note was also made: students who were unintentionally removed from the class group should contact the TAs to be re-added, since attendance on the group is used to track active class membership.

---

#### Section 1: What a Statistical Experiment Is and Why It Matters

**[00:05:48 ~ 00:10:11]** This lecture begins **Chapter 3** of the notes, which covers **statistical experiments** and **significance testing**. In statistics, this topic is substantial enough to form a full course of its own, variously called **Experimental Design** or **Design of Experiments**. It appears in virtually every research field but is especially prominent in **health research**.

The core reason experiments matter is simple: **they are the mechanism by which a hypothesis is confirmed or rejected.** Without a proper experiment, we generalise recklessly — declaring that "all men are bad" or "all women are bad" on the strength of one unpleasant encounter. That kind of statement is a hypothesis, not a fact, and it only becomes a defensible claim once it has been tested against a broad, randomised sample of the population.

For data scientists, experiments answer a very practical question: **will this product, feature, or model actually succeed with real users?** Market surveys and requirements gathering are not enough on their own; the finished product still has to be tested in the conditions it will face.

---

#### Section 2: The QR Code Case Study — Testing Real End-User Behaviour

**[00:10:11 ~ 00:14:09]** A recent real-world example from the lab illustrates the point. The lab was promoting an upcoming workshop on LinkedIn, and the flyer included a **QR code** leading to the registration form. A user sent a direct message asking how to scan the QR code. Internally, the team initially treated the question as trivial — until they realised the flyer (and therefore the QR code) was being viewed **on the same phone** a user would normally scan with. You cannot scan a QR code that is inside the device you would scan it with.

The team had unconsciously assumed every user would open the flyer on a laptop and scan with a phone. That was a silent, untested hypothesis baked into the design. The fix was to include the registration **link** alongside the QR code, so that users viewing on a phone could simply tap it. The broader lesson: "obvious" questions from users — *where do I login? where do I click? how do I enter this?* — are not dumb, they are symptoms of engineering that failed to consider the end user. Running experiments on real users before launch is how those failures surface before they matter.

---

#### Section 3: The Experimental Design Pipeline

**[00:14:09 ~ 00:20:55]** Every experiment, whether in medicine, agriculture, software, or data science, follows the same pipeline:

1. **Formulate a hypothesis.** State clearly what you expect — for example, "Drug B is better than Drug A at treating malaria." In practice this step is frequently silent: we already carry an assumption in our heads before we act. The discipline is to make it explicit. An everyday example: choosing *waakye* over *kenkey* because you believe kenkey will not keep you full for long. That belief is a hypothesis — one you only confirm or reject by actually testing how long each one satisfies you.
2. **Design the experiment.** Statisticians may call this "designing the instrument"; in social science the instrument is usually a **questionnaire**.
3. **Deploy the experiment.** Run the design in the field to gather real responses.
4. **Collect data.** Record outcomes from every group.
5. **Analyse the data.** In a machine-learning context this analysis typically produces a **model**.
6. **Build the inference (conclusion).** Use the analysed data to decide whether the hypothesis is supported. The word *inference* also carries the idea of **generalisation** — moving from what we saw in the sample to a claim about the wider population.

---

#### Section 4: A/B Testing — The Two-Group Experiment

**[00:20:55 ~ 00:23:24]** An **A/B test** is an experiment that involves two groups — Group A and Group B — designed to determine which is superior. In software, Group A is typically the **system currently in use**, and Group B is a **proposed replacement**. As an IT person, you would prefer to continue using A if A is working well; the question "is B really better?" is itself a hypothesis that demands evidence before any switch is justified.

---

#### Section 5: Control Group vs Treatment Group

**[00:23:24 ~ 00:27:35]** Every A/B test has two distinct roles:

- **Control group** — the current practice, the baseline against which change is measured. In software, the system already in use. In medicine, patients continuing on the current drug (e.g. Malafan for malaria). In agriculture, the field treated with the fertiliser you already trust. In pricing, the current price of the product.
- **Treatment group** — the new intervention being tested. In software, the new application. In medicine, the new experimental drug in a clinical trial. In agriculture, the field treated with the new formula (e.g. NPK being evaluated). In pricing, the proposed new price point.

The **purpose of the control group** is to give us something trustworthy to compare the treatment against. Without a baseline that was measured under the same conditions, we cannot honestly claim that the treatment "works better" — we only know that *something* happened.

---

#### Section 6: Conducting a Proper A/B Test

**[00:27:35 ~ 00:31:18]** For an A/B test to be trustworthy, three ingredients are non-negotiable:

- **Subject.** You must clearly identify the subject of the experiment — the **plant** in agriculture, the **patient** in medicine, the **user** in software, or the **seed** in a planting trial.
- **Randomisation.** Subjects must be assigned to groups at **random**. Without this, any difference you observe could simply reflect bias in who ended up where. A biased process — for example, an interview whose outcome is already known in advance — is not a randomised trial, and you cannot legitimately conclude that one option outperforms another from it.
- **Test statistic.** Use an appropriate statistic — mean, median, standard deviation, or another relevant test — to compare groups.

When these three are in place, any difference you observe can legitimately be attributed to **either a real effect of the treatment or to chance**, and you can reason about which.

---

#### Section 7: A Warning About Software Packages

**[00:31:18 ~ 00:34:52]** Data scientists rely heavily on **Python** and **R** to run their tests. The caution here is that you must never over-depend on the numbers the package spits out. A value is only meaningful when it makes sense in the real-world context of your work.

**Example:** if you are calculating revenue and, as part of your statistics, you compute a deviation that drags the result into negative numbers, you do not report a negative revenue. **Revenue in principle cannot be negative** — its floor is zero (you simply earned nothing). A *loss* is negative by sign, but revenue and loss are different quantities. Always sense-check the output of your package before reporting it.

---

#### Section 8: Why You Cannot Skip the Control Group

**[00:34:52 ~ 00:39:26]** A tempting shortcut is: *"we already know the old system is bad, the new one seems to work, just ship it."* The danger in that shortcut is a hidden and very damaging assumption — that **"all things are equal"**. The conditions, the environment, the ecosystem, the users, the timing — they are almost never genuinely equal. That assumption quietly introduces **bias** into your conclusion.

A useful framing from the class itself: *this class* could be treated as a control group in an experiment on whether a different lecturer teaches better. You would randomly split the students — some remain with the current lecturer (control), some go to the new lecturer (treatment) — and only after both groups sit the same examination can you honestly compare performance. Without the control group, you cannot separate the effect of the new lecturer from everything else that might have varied.

In statistical language, what the control group gives us is the ability to measure the **variance** — the **difference** — between the two conditions in a meaningful way.

---

#### Section 9: Blind and Double-Blind Studies

**[00:39:26 ~ 00:43:09]** Experiments differ in **who knows what** about the group assignments:

- **Blind study.** The **subjects** do not know which group they are in (i.e., they do not know which treatment they are receiving). In the lecture example, students are randomly assigned to a lecturer but have no advance knowledge of who that lecturer will be.
- **Double-blind study.** **Neither the subjects nor the implementers** know who has been assigned where. Both sides are kept in the dark until the experiment is under way.

The type of blinding you choose depends on the type of **bias** you are trying to guard against. A blind study controls for subject behaviour (they cannot adjust to meet expectations). A double-blind study also removes the implementer's ability to steer results consciously or unconsciously.

---

#### Section 10: When Blinding Is Not Possible — Transparency and the Turing Test

**[00:43:09 ~ 00:48:34]** Some experiments are **inherently transparent** and cannot be blinded. **Cognitive therapy** is the textbook example: the therapist must engage directly with the patient to try, test, record, try again. There is no way for the two parties to be blind to each other. In those cases, you rely on other protections — clear protocols and **ethical oversight** — to limit bias.

The **Turing Test** was discussed as a worked example. A question is posed to both a machine and a human; both respond in writing, and an observer has to decide which answer came from which:

- If the observer posing the question does not know whose answer is whose, that is a **blind** study.
- If a **third party** is also involved so that no single participant knows who asked, who answered, or which response is which, that is **double-blind**.

---

#### Section 11: Why A/B and Not A/B/C/D?

**[00:48:34 ~ 00:52:31]** The letters A and B simply stand for *groups*. There is nothing stopping you from running A, B, C, D, E, F — **only one of them can be the control group; all the others are treatment groups**. A/B testing dominates in practice because two-group comparisons are easier to design and interpret, which is why the name has stuck.

An important caveat raised in the Q&A: you cannot meaningfully compare two treatment groups *against each other* in this framework — they are not controls for each other. Every treatment group is compared back to the single control. If you want to judge *which of several product variants* wins, you compare each variant against the control baseline.

---

#### Section 12: Classical Statistics vs Data Science — Two Different Questions

**[00:52:31 ~ 00:55:24]** Classical statisticians and data scientists ask subtly different questions of the same A/B test:

- The **statistician** asks: *"Is the difference between A and B statistically significant?"* The concern is the **p-value** and whether the observed difference could plausibly have arisen by chance.
- The **data scientist** asks: *"Which out of my multiple tests is the best?"* Whether that best option is formally statistically significant is, to the data scientist, a secondary concern — we mainly want to know which option is winning in practice.

Because the two questions do not align, data scientists reach for a different experimental form, the **multi-arm bandit**, which answers "which option is best?" across many candidates simultaneously. Until we cover the multi-arm bandit in depth, we **complement** our work with the classical statistical tests.

---

#### Section 13: Ethics in Data Collection

**[00:55:24 ~ 00:59:24]** A serious warning: never collect people's information, analyse it, and publish the results **without their consent**. Nobody raises objections while the work is uncommercial — but the moment money or reputation is involved, the lawsuits follow.

**The ignorant-consent trap.** Students at matriculation sign forms in Year 1, often in a rush to secure admission, and that process frequently includes broad consent clauses authorising the university to use student data to "improve the system". Because that consent was given — however ignorantly — the institution cannot be easily sued for later producing charts, p-values, or research from that data. The same trap appears in online forms that demand a consent tick to proceed. If you need the service badly enough, you click; and once you click, you have authorised open-ended use of your data, with no regional boundary.

**The practical rule is simple: always ask for explicit permission before using someone else's data, and read what you are consenting to before you agree to it.**

---

#### Section 14: Hypothesis Testing — Null and Alternative

**[00:59:24 ~ 01:05:22]** Because every experiment begins with a hypothesis, we need a formal way to test hypotheses. This is where **significance testing** enters. Two types of hypothesis are defined:

- **Null Hypothesis (H₀).** The **baseline** hypothesis — it states that chance is to be blamed, that the treatments are **equivalent**. For example: "There is no difference between the mean of Group A and the mean of Group B." Equivalent framing: A = B, so it does not matter which you choose.
- **Alternative Hypothesis (H₁).** The **negation** of the null — it states that a real difference exists. For example: "There is a difference between the mean of Group A and the mean of Group B," or A > B, or A ≤ B.

**Framing matters.** We **postulate H₀** (a claim of equivalence) and then test whether the data allow us to reject it. In principle, every comparative test can be reduced to a test of equivalence. If equivalence is rejected, a real difference must exist.

Whether the test is **one-way** or **two-way** depends on the alternative:

- A **one-way (one-sided)** test is directional — it only asks about an effect in one direction (e.g., is B better than A?).
- A **two-way (two-sided)** test is non-directional — it asks whether there is any difference in either direction. This is the **default** in most R and Python libraries.

Classical statisticians prefer two-way tests because they refuse to "let chance off the hook" by ignoring one side. Data scientists tend not to obsess over the exact p-value, so the one-way/two-way distinction is of less practical consequence — *interpretation* is what matters, not the precise value 2.1 vs 2.3.

---

#### Section 15: Why We Need a Null Hypothesis at All

**[01:05:22 ~ 01:14:59]** Why not simply observe the outcome and declare the winner? Because humans systematically misjudge this. Three specific failures justify the formal null hypothesis:

1. **We underestimate the scope of random behaviour.** The fact that two or three things happened to work out does not mean the effect is real. Samples that are not properly randomised make "the treatment working" indistinguishable from simple luck.
2. **We cannot foresee extreme events.** Long-tailed distributions produce **black swans** — extreme outcomes that everyday observation does not flag as outliers but which dominate the real behaviour of the system.
3. **We misread randomness as pattern.** If a coin lands heads, heads, heads, heads, we naturally predict heads next — and are caught off-guard when tails arrives. We have treated random behaviour as if it were a pattern, and once again underestimated randomness.

A properly designed A/B test with randomised subjects protects against all three. Any difference observed after a good design can then be honestly attributed either to a **true difference** or to **chance**, and the two can be told apart.

---

#### Section 16: The Null Hypothesis as a Test of Equivalence

**[01:14:59 ~ 01:22:25]** Restated formally: **the null hypothesis is a baseline assumption that the treatments are the same**. Whether you go for price A or price B, whether you use software A or software B, whether you apply fertiliser A or fertiliser B — *it does not matter*. That equivalence claim is what the test is really examining.

Framing every test as a test of equivalence is powerful: if equivalence fails, then a real difference exists, and we can investigate in which direction (A > B or B > A). Examples of alternative hypotheses that follow from this framing:

- H₀: the mean of A equals the mean of B; H₁: the means differ.
- H₀: A ≤ B; H₁: A > B.

---

#### Section 17: Resampling Methods — Bootstrap vs Permutation

**[01:22:25 ~ 01:31:40]** Rather than rely on the full mathematical machinery of the classical t-test, we can compute significance **directly from the data** using **resampling**. Modern computing power makes this often easier and more defensible — especially since the exact p-value is not our primary concern.

**Resampling** means repeatedly sampling values from the observed data in order to **assess the random variability** in a statistic (such as the mean). Two techniques dominate:

- **Bootstrap.** Sampling **with replacement**. Used to assess the **reliability of an estimate** — how reliable is our mean? our standard deviation? Bootstrapping also underlies the **cross-validation** procedure covered in ML 311.
- **Permutation Test.** Sampling **without replacement**. Used for **hypothesis testing** across two or more groups — directly answering: "Is the difference between A and B real, or the kind of thing that could happen by chance alone?"

---

#### Section 18: The Permutation Test — Step by Step

**[01:31:40 ~ 01:47:35]** Suppose you have run an A/B test. Group A produced **250 "yes"** responses and **50 "no"** responses (total 300). Group B produced **300 "yes"** responses and **20 "no"** responses (total 320). The question: **is B really better, or could this pattern have arisen by chance if A and B were equivalent?**

*Note: in class the combined total was first spoken as 520 and then corrected to 620 (250 + 50 + 300 + 20). The corrected figure is used below.*

1. **Combine.** Pool all **620** responses from A and B into one set. Under H₀ it does not matter who was in A and who was in B, so merging is legitimate. The combined pool contains **550 "yes"** (250 + 300) and **70 "no"** (50 + 20).
2. **Shuffle.** Mix the 620 values thoroughly so any original group identity is lost.
3. **Draw — without replacement.** Randomly draw a resampled "A" of the same size as the original A (**300**). The remaining **320** automatically form the resampled "B". Because this is a permutation, no value can appear in both resampled groups.
4. **Compute the statistic.** For this resample, count how many "yes" and "no" appear in each group and compute your statistic of interest (mean, proportion, or difference between groups).
5. **Repeat.** Put all values back into the combined pool, reshuffle, redraw, and recompute — hundreds or thousands of times. The accumulated statistics form a **permutation distribution** (a type of sampling distribution).
6. **Compare.** Overlay the statistic from the **original, observed** A vs B data on top of the permutation distribution. Two possibilities follow:
   - If the observed statistic falls **inside the bulk** of the permutation distribution, the difference between A and B is the kind of thing chance alone produces. There is no justification for switching from A to B.
   - If the observed statistic falls **far away** from the distribution, the difference is unlikely to be chance. B (or whichever is better) is genuinely different, and the switch is justified.

**A common point of confusion:** after drawing the resampled groups, you do *not* ask respondents anything new. The experiment is already over; the respondents are gone. All the shuffling, drawing and counting is performed on **the data you already have**. That is the entire point of resampling — extracting what we need from the existing sample, instead of running a fresh experiment every time.

---

#### Key Takeaways for Revision

1. Experiments are the mechanism by which hypotheses are confirmed or rejected; data scientists run them to verify that products and models actually work for real users.
2. The experimental pipeline runs: **Hypothesis → Design → Deploy → Collect → Analyse → Infer**.
3. An **A/B test** compares a **control group** (current practice) to a **treatment group** (new intervention); **randomisation is essential**.
4. The control group defends against the fatal assumption that "all things are equal" — they never are.
5. **Blind** = subjects don't know their group. **Double-blind** = both subjects and implementers don't know.
6. Classical statisticians test for **statistical significance**; data scientists focus on **which option performs best** and, for many-option comparisons, reach for the **multi-arm bandit**.
7. Always obtain **explicit, informed consent** before using anyone's data. Ignorant consent is still consent — read before you sign.
8. **H₀** = no difference / equivalence. **H₁** = a real difference. We postulate H₀ and attempt to reject it.
9. We need a formal null because humans underestimate randomness, miss extreme events, and see patterns in noise.
10. **One-way** tests are directional; **two-way** tests are non-directional. Most software defaults to two-way.
11. **Bootstrap** (with replacement) assesses reliability of an estimate. **Permutation** (without replacement) is for hypothesis testing across groups.
12. A permutation test: **combine → shuffle → draw → compute statistic → repeat → compare observed to the permutation distribution**.
13. Never blindly trust the number your R or Python library produces. Sense-check it against the real-world context — revenue, for example, cannot be negative.