/*
 * Instances of every automaton and grammar, used for testing and debugging.
 * 
 *  IMPORTS
 * basic_utils.js
 * DFA.js
 * DFA_regex.js
 */

const DFA_instance = new DFA({
  Q: [
    { value: 'q0', final: false },
    { value: 'q1', final: false },
    { value: 'q2', final: true }
  ],
  S: [
    { value: '0' },
    { value: '1' }
  ],
  D: [
    { value: 'q0 0', result: 'q1' },
    { value: 'q0 1', result: 'q0' },
    { value: 'q1 0', result: 'q2' },
    { value: 'q1 1', result: 'q0' },
    { value: 'q2 0', result: 'q2' },
    { value: 'q2 1', result: 'q0' }
  ],
  q0: { value: 'q0' },
});

const NFA_parse = function (nfa_raw_obj) {
  //
};

// const NFA_instance = new NFA(NFA_parse({
//   Q: [
//     { value: 'p', final: false },
//     { value: 'q', final: true },
//     { value: 'r', final: false },
//     { value: 's', final: true }
//   ],
//   S: [
//     { value: '0' },
//     { value: '1' }
//   ],
//   D: [
//     { value: 'p 0', result: 'q' },
//     { value: 'p 0', result: 's' },
//     { value: 'p 1', result: 'q' },
//     { value: 'q 0', result: 'r' },
//     { value: 'q 1', result: 'q' },
//     { value: 'q 1', result: 'r' },
//     { value: 'r 0', result: 's' },
//     { value: 'r 1', result: 'p' },
//     { value: 's 0', result: '*' },
//     { value: 's 1', result: 'p' }
//   ],
//   q0: { value: 'p' }
// }));
