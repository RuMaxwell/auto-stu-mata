const DFA = {
	"Q": [0, 1, 2],
	"S": [0, 1],
	"D": {
		"0 0": 1,
		"0 1": 0,
		"1 0": 2,
		"1 1": 0,
		"2 0": 2,
		"2 1": 0
	},
	"q0": 0,
	"F": [2]
};

const has = function (arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
};

DFA.transd = function (q, a) {
	if (has(DFA["Q"], q) && has(DFA["S"], a)) {
		var key = q.toString() + " " + a.toString();
		return DFA["D"][key];
	}
	else {
		return undefined;
	}
};

DFA.xtransd = function (q, w) {
	var wf = w.slice(0, w.length - 1);
	var a = w[w.length - 1];
	return w.length === 0 ? q : DFA.transd(DFA.xtransd(q, wf), a);
};

DFA.accept = function (w) {
	return has(DFA["F"], DFA.xtransd(DFA["q0"], w)) ? true : false;
};

// const main = function (word) {
// 	var nums = word.split(" ");
// 	nums = nums.map((x) => parseInt(x, 0));
// 	alert(DFA.accept(nums));
// };