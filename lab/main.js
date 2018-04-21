/**
 * The test function for buttons in index.html to call.
 * 
 * IMPORTS
 * basic_utils.js
 * DFA.js
 * DFA_regex.js
 * automata.js
 */

const main = function (automaton, word) {
	var nums = word.split(" ");
	nums = nums.map((x) => parseInt(x, 0));
	if (automaton === "dfa") {
		alert(DFA_instance.accept(nums));
	}
	else if (automaton === "dpda") {
		//alert(DPDA_accept(DPDA, nums));
	}
};
