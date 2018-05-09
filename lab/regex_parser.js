/*
 * Parse regexes to s-expression for convience of later converting them to automata.
 * s-expression is a type of prefix notation with parentheses to mark the start and end point of each layer.
 * It precisely represent a tree that if traversed inorderedly, will produce the same string as the infix regex.
 * 
 * Example:
 * (00+001)*+1*(0+1+2) => (+ (* (+ (, 0 0) (, (, 0 0) 1))) (, (* 1) (+ (+ 0 1) 2)))
 * 
 * How it works:
 *  It is similiar to the resolving of an arithmetic expression.
 *  This parser bases on two stacks. One is for the operators (initialized with a #), and the other is for the operands.
 * 
 *  When working, it scans the regex string one char by one char. Whenever it comes up with:
 *    [+,*()#]    => These are operators
 *    [0-9a-zA-Z] => These are symbols
 *
 *  The operators have their priority order, and this is represented as the priority table:
 * ┌───┬───┬───┬───┬───┬───┬───┐
 * │   │ + │ , │ * │ ( │ ) │ # │  This table's first line (FL) and the first column (FC) contain
 * ├───┼───┼───┼───┼───┼───┼───┤  all the six operators. When scanning, the operator in FC is
 * │ + │ 1 │ 2 │ 2 │ 2 │ 1 │ 1 │  before the operator in FL. The numbers are:
 * ├───┼───┼───┼───┼───┼───┼───┤  - 0: Syntax error.
 * │ , │ 1 │ 1 │ 2 │ 2 │ 1 │ 1 │  - 1: FC > FL. The newly scanned operator is to be pushed after
 * ├───┼───┼───┼───┼───┼───┼───┤                the current-top operator is calculated.
 * │ * │ 1 │ 1 │ 1 │ 2 │ 1 │ 1 │  - 2: FC < FL. The newly scanned operator can be directly pushed
 * ├───┼───┼───┼───┼───┼───┼───┤                into the operator stack.
 * │ ( │ 2 │ 2 │ 2 │ 2 │ 3 │ 0 │  - 3: FC = FL. Both of the two operators will be thrown.
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │ ) │ 1 │ 1 │ 1 │ 0 │ 1 │ 1 │  e.g. )( => 0 => syntax error, we don't expect two operands to
 * ├───┼───┼───┼───┼───┼───┼───┤                  be directly concatinated.
 * │ # │ 2 │ 2 │ 2 │ 2 │ 0 │ 3 │       #) => 0 => syntax error, an unbalanced parenthesis.
 * └───┴───┴───┴───┴───┴───┴───┘
 * 
 *  The way to deal with an operator when get 1 from the priority table:
 *  1) Calculate the current-top operator and pop it. Push the result to the operand stack.
 *  2) Continue to compare the current scanned operator and the current-top operator. Repeat the match.
 */

/**
 * Add '-' between the consecutive parts and parentheses to make clear the operator priority ( * > - > + )
 * e.g. '(00+01)+1*(0+1)' => '(0-0+0-1)+1*-(0+1)' => '((0-0)+(0-1))+(1*-(0+1))'
 * 
 * @param {string} regex The regex
 * @returns {string} The modified regex
 */
function regex_justify(regex) {
  const is_oprtor = char => {
    return (char === ',' || char === '*' || char === '+'
         || char === '(' || char === ')' || char === '#');
  };

  // Remove whitespaces from the regex and add a terminate symbol to the end
  regex = (() => {
    let res = '';
    for (let i = 0; i < regex.length; i++) {
      if (regex[i] !== ' ' &&  regex[i] !== '\t' && regex[i] !== '\n' && regex[i] !== '\r') {
        res += regex[i];
      }
    }
    return res + '#';
  })();

  const insertConcat = (str, i) => str.slice(0, i + 1) + ',' + str.slice(i + 1);
  for (let i = 0; i < regex.length - 1; i++) {
    if ((is_symbol(regex[i]) && is_symbol(regex[i + 1]))
    || (is_symbol(regex[i]) && regex[i + 1] === '(')
    || (regex[i] === ')' && is_symbol(regex[i + 1]))
    || (regex[i] === ')' && regex[i + 1] === '(')
    || (regex[i] === '*' && is_symbol(regex[i + 1]))
    || (regex[i] === '*' && regex[i + 1] === '(')) {
      regex = insertConcat(regex, i);
    }
  };

  var oprt_id = {
    '+': 0,
    ',': 1,
    '*': 2,
    '(': 3,
    ')': 4,
    '#': 5
  };

  var priorityTable = [
  // +  ,  *  (  )  #
    [1, 2, 2, 2, 1, 1], // +
    [1, 1, 2, 2, 1, 1], // ,
    [1, 1, 1, 2, 1, 1], // *
    [2, 2, 2, 2, 3, 0], // (
    [1, 1, 1, 0, 1, 1], // )
    [2, 2, 2, 2, 0, 3]  // #
  ];

  const getPriority = (oprt1, oprt2) => priorityTable[oprt_id[oprt1]][oprt_id[oprt2]];

  regex = (() => {
    let m = [ '#' ];
    let n = [];
    const top = lst => lst[lst.length - 1];

    const dealWithOprt = (op) => {
      if (op === '+' || op === ',') {
        let b = n.pop();
        let a = n.pop();
        if (b === undefined || a === undefined) {
          console.error(`Syntax error in regex: cannot get enough operands for operator ${op}.`);
          return undefined;
        }
        return `(${op} ${a} ${b})`;
      }
      else if (op === '*') {
        let a = n.pop();
        if (a === undefined) {
          console.error('Syntax error in regex: no operand for operator *.');
          return undefined;
        }
        return `(* ${a})`;
      }
    };

    let i = 0;
    while (regex[i] !== '#' || top(m) !== '#') {
      if (is_symbol(regex[i])) {
        n.push(regex[i]);
        i++;
      }
      else if (is_oprtor(regex[i])) {
        let cur = top(m);
        let prio = getPriority(cur, regex[i]);
        if (prio === 0) {
          console.error(`Syntax error in regex at ${i} (${regex[i]}).`);
          return undefined;
        }
        else if (prio === 1) {
          let res = dealWithOprt(cur);
          if (res === undefined) {
            return undefined;
          }
          else {
            n.push(res);
          }
          m.pop();
        }
        else if (prio === 2) {
          m.push(regex[i]);
          i++;
        }
        else if (prio === 3) {
          m.pop();
          i++;
        }
      }
      else {
        console.error(`Cannot resolve symbol at ${i} (${regex[i]})`);
        return undefined;
      }
    }

    return top(n);
  })();

  return regex;
}
