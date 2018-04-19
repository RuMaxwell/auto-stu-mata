const main = function (word) {
	var nums = word.split(" ");
	nums = nums.map((x) => parseInt(x, 0));
	alert(DFA.accept(nums));
};