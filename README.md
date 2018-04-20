# automata
A teaching software for studying automata theory

The software is bound for teachers and students to use as a reference for the aquisition of [automata theory](https://en.wikipedia.org/wiki/Automata_theory). It would include these and maybe more features:

* **Automata simulation** (produce result, and step-by-step demonstration)
  * [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton) simulator
  * [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton) simulator
  * [PDA](https://en.wikipedia.org/wiki/Pushdown_automaton) simulator
  * [Regex](https://en.wikipedia.org/wiki/Regular_expression) (Regular expressions) calculator
  * [CFG](https://en.wikipedia.org/wiki/Context-free_grammar) calculator


* **Automata conversion**
  * DFAs <= NFAs
  * DFAs <= ε-NFAs
  * DPDAs <= PDAs
* **Automata-Grammar conversion**
  * D/NFAs <=> Regexes
  * DPDAs <=> CFG
* **Simulate the Pumping Lemma**
* **An online/offline application with GUI**
  * Online
    * A Javascript implementation of the algorithms, using webpages to distribute, or
    * A client written with [Electron](https://electronjs.org/)
  * Offline
    * An offline client written with Electron

By default, automata are displayed in the form of **transformation diagram**, with circles indicate states, and arrows indicate letters (or *symbols*) *(figure 1)*. But you can choose to display them by **transformation table** *(figure 2)*, or both.

![figure 1: Transformation Diagram]()

![figure 2: Transformation Table]()





## Developer's Guide

We use [ESLint](https://blog.csdn.net/haoshidai/article/details/52833377) coding standard. It includes using `let/const` instead of `var`, using function statement instead of function expression, using lambda expression instead of function expression, using class instead of prototype, using 2 spaces to indent, using single-quote to quote a string, using LF to end a line, and so on.



### Examples

For convenience, all automata will use integers for states and letters of an automata.

#### 1. How to represent a DFA in JSON?

```JSON
// This DFA's language accept strings that end with "00"
{
    // States (q0, q1, ...)
    "Q": [0, 1, 2],
    // The alphabet (Σ)
    "S": [0, 1],
    // The transformation diagram (δ)
    "D": {
        "0 0": 1,
        "0 1": 0,
        "1 0": 2,
        "1 1": 0,
        "2 0": 2,
        "2 1": 0
    },
    // The entry state
    "q0": 0,
    // Final states
    "F": [2]
}
```

Note that comments are not recommended in JSON, and they have actually been removed in latest version of JSON. Comments in the script above are only for convenience.

#### 2. How to represent other automata?

```JSON
// This ε-NFA's language is equal to regex ((ε+b)c*(ε+(a+c)))*(ε+b)+c
{
    "Q": [0, 1, 2],
    "S": [0, 1, 2],
    // Use null to indicate null string (ε) and null set (Φ)
    "D": {
        "0 null": [1, 2],
        "0 0": null,
        "0 1": [1],
        "0 2": [2],
        "1 null": null,
        "1 0": [0],
        "1 1": [2],
        "1 2": [0, 1],
        "2 null": null,
        "2 0": null,
        "2 1": null,
        "2 2": null
    },
    "q0": 0,
    "F": [2]
}
```

```JSON
// A DPDA
```

