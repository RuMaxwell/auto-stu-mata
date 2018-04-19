# automata
A teaching software for studying automata theory

The software is bound for teachers and students to use as a reference for the aquisition of [automata theory](https://en.wikipedia.org/wiki/Automata_theory). It would include these and maybe more features:
* Automata conversion
  * [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton)s <=> [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton)s
  * DFAs <=> ε-NFAs
  * DPDAs <=> [PDA](https://en.wikipedia.org/wiki/Pushdown_automaton)s
* Automata-Grammar conversion
  * DFAs <=> Regexes ([Regular expression](https://en.wikipedia.org/wiki/Regular_expression)s)
  * DPDAs <=> [CFG](https://en.wikipedia.org/wiki/Context-free_grammar)
* An online/offline application with GUI
  * Online
    * A Javascript implementation of the algorithms, using webpages to distribute, or
    * A client written with [Electron](https://electronjs.org/)
  * Offline
    * A offline client written with Electron
