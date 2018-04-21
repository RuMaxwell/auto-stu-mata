/**
 * DFA main logic. DFA class definition.
 * 
 * IMPORTS
 * basic_utils.js
 */

 /**
  * Deterministic Finite Automaton
  * 
  * @property {string[]} Q The states set
  * @property {string[]} S The alphabet
  * @property {Map<string, string>} D The Transfer diagram
  * @property {string} q0 The entry state
  * @property {string[]} F The final state set
  */
class DFA {
  /**
   * Initialize a DFA instance with appropriate object
   * @param {object} dfa_obj An object represent DFA without using Map for Transfer diagram
   */
  constructor (dfa_obj) {
    this.Q = dfa_obj.Q;
    this.S = dfa_obj.S;
    this.D = dfa_obj.D;
    this.q0 = dfa_obj.q0;
    this.F = this.Q.filter(x => x.final);
  }

  /**
   * Transfer function
   * @param {*} q Current state { value: string, final: bool }
   * @param {string} a The input symbol
   * @returns {string} The result state
   */
  transd(q, a) {
    if (hasValue(this.Q, q.value) && hasValue(this.S, a)) {
      var key = q.value + ' ' + a;
      // This could return undefined
      return getObjFromValue(this.Q, getObjFromValue(this.D, key).result);
    }
    else {
      return undefined;
    }
  }

  /**
   * The extended transfer function
   * @param {*} q Current state { value: string, final: bool }
   * @param {string[]} w The input string of symbols
   * @returns {string} The result state
   */
  xtransd(q, w) {
    var wf = w.slice(0, w.length - 1);
    var a = w[w.length - 1];
    return w.length === 0 ? q : this.transd(this.xtransd(q, wf), a);
  }

  /**
   * Test if a string is accepted by the DFA
   * @param {string[]} w The tested string
   * @returns {boolean} The result
   */
  accept(w) {
    return hasValue(this.F, this.xtransd(this.q0, w)) ? true : false;
  }
}
