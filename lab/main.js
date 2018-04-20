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
