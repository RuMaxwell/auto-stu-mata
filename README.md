# study-automata: core algorithm
#### This is the core algorithm library for [study-automata](https://github.com/Swenb/study-automata) application.

The software is bound for teachers and students to use as a reference for the acquisition of [automata theory](https://en.wikipedia.org/wiki/Automata_theory). It would include these and maybe more features:



## Authors

- Zongxing Wei https://github.com/RuMaxwell
- Wenbo Shi https://github.com/Swenb



## Languages

- Chinese
- English (future)



## Features

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



## Developer's tips for using this library

We use [ESLint](https://blog.csdn.net/haoshidai/article/details/52833377) coding standard. It includes using `let/const` instead of `var`, using function statement instead of function expression, using lambda expression instead of function expression, using class instead of prototype, using 2 spaces to indent, using single-quote to quote a string, using LF to end a line, and so on.



### Examples

For convenience, all automata will use integers for states and letters/symbols of an automata.

#### 1. How to represent a DFA in JSON?

```JSON
{
    "Q": [0, 1, 2],
    "S": [0, 1],
    "D": [
        ["0 0", 1],
        ["0 1", 0],
        ["1 0", 2],
        ["1 1", 0],
        ["2 0", 2],
        ["2 1", 0]
    ],
    "q0": 0,
    "F": [2]
}
```

**Description**: This DFA's language accept strings that end with "00", where
	"Q" is the states (q0, q1, ...),
	"S" is the alphabet (Σ),
	"D" is the transformation diagram (δ),
	"q0" is the entry state,
	"F" is the final states.
This will be parsed into an instance of DFA class, and the transformation diagram will be passed directly to construct a new Map instance.

#### 2. How to represent other automata?

```JSON
{
    "Q": [0, 1, 2],
    "S": [0, 1, 2],
    "D": [
        ["0 null", [1, 2]],
        ["0 0", null],
        ["0 1", [1]],
        ["0 2", [2]],
        ["1 null", null],
        ["1 0", [0]],
        ["1 1", [2]],
        ["1 2", [0, 1]],
        ["2 null", null],
        ["2 0", null],
        ["2 1", null],
        ["2 2", null]
    ],
    "q0": 0,
    "F": [2]
}
```

**Description**: This ε-NFA's language is equal to regex `((ε+b)c*(ε+(a+c)))*(ε+b)+c`. In the transformation diagram, we use `null` to represent null string (ε) and null set (Φ).



```JSON
// A DPDA
```

