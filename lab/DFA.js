class DFA {
  constructor (dfa_obj) {
    this.Q = dfa_obj.Q;
    this.S = dfa_obj.S;
    this.D = dfa_obj.D;
    this.q0 = dfa_obj.q0;
    this.F = dfa_obj.F;
  }

  transd (q, a) {
    if (has(this.Q, q) && has(this.S, a)) {
      var key = q.toString() + ' ' + a.toString();
      return this.D.get(key);
    }
    else {
      return undefined;
    }
  }

  xtransd (q, w) {
    var wf = w.slice(0, w.length - 1);
    var a = w[w.length - 1];
    return w.length === 0 ? q : this.transd(this.xtransd(q, wf), a);
  }

  accept (w) {
    return has(this.F, this.xtransd(this.q0, w)) ? true : false;
  }
}