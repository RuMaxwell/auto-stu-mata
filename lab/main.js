const main = function (automaton, word) {
	var nums = word.split(" ");
	nums = nums.map((x) => parseInt(x, 0));
	if (automaton === "DFA") {
		alert(DFA_accept(DFA, nums));
	}
	else if (automaton === "DPDA") {
		alert(DPDA_accept(DPDA, nums));
	}
};