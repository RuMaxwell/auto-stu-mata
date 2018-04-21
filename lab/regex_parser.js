/*
 * Parse regexes to s-object for convience of later converting them to automata.
 * s-object means a tree-like list that if traversed inorderedly, will produce the same string as the regex
 * 
 * Example:
 * (0+1)*1*(0+1+2) => (0+1)*-1-(0+1+2) => '(- (- (* (+ 0 1)) (* 1)) (+ (+ 0 1) 2))'
 *  => ['-', ['-', ['*', ['+', '0', '1']], ['*', '1']], ['+', ['+', '0', '1'], '2']]
 */

/**
 * Add '-' between the consecutive parts
 * e.g. 01*(0+1) => 0-1*-(0+1)
 * 
 * @param {string} regex The regex
 * @returns {string} The modified regex
 */
function regex_justify(regex) {
  var res = '';

  (function concat(i) {
    var item = (function sub(item) {
      if (item.length === 0) {
        return;
      }
      else if (item.length === 1) {
        if (is_symbol(item)) {
          return item;
        }
      }
    })(regex);
    res += '-' + item;
  })(0);

  res.slice(1);
  return res;
}

/**
 * Parse a given regex to s-expression
 * 
 * @param {string} regex The regex
 * @returns {Array} s-object
 */
function regex_parse(regex) {
  const is_oprtor = char => {
    return (char === '-' || char === '*' || char === '+');
  };

  var oprtor_stack = [];
  var oprand_stack = [];
  var operator = '';
  var oprds = [];

  var phcnt = 0;

  var s_obj = [];

  for (var i = 0; i < regex.length; i++) {
    if (regex[i] === '(') {
      phcnt++;
    }
    else if (regex[i] === ')') {
      phcnt--;
      operator = oprtor_stack.pop();
      if (operator == '+') {
        oprds = [oprand_stack.pop(), oprand_stack.pop()];
        // Generate string "['+', operand1, operand2]"
        var selector = `[\'+\', ${[...oprds]}]`;
        oprand_stack.push(`${selector}`);
      }
    }
    else if (is_symbol(regex[i])) {
      oprand_stack.push(regex[i]);
    }
    else if (is_oprtor(regex[i])) {
      oprtor_stack.push(regex[i]);
    }
    else {
      console.error('Regex parser error: cannot resolve symbol \'' + regex[i] + '\'');
    }
  }
}
