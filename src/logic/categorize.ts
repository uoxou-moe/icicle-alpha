// スタイルをもとにカテゴライズ。
// トランジション時間が 0.2 秒未満かつボックスシャドウがない場合は Flat、
// トランジション時間が 0.2 秒未満かつボックスシャドウがある場合は Snappy。
// トランジション時間が 0.2 秒以上なら Smooth-fade とする。
export function categorize(input: CSSStyleDeclaration): string {
	const transProps = input.transitionProperty;
	const transDur = input.transitionDuration;
	const transDurationSec = parseTransitionDuration(transDur);
	const hasShadow = input.boxShadow && input.boxShadow !== "none";

	if (!transProps || transDurationSec < 0.2) {
		if (hasShadow) {
			return "Snappy";
		} else {
			return "Flat";
		}
	} else if (transDurationSec >= 0.2) {
		return "Smooth-fade";
	}

	return "Flat";
}

// トランジションDurationを秒にパースする補助
function parseTransitionDuration(value: string): number {
	if (!value) return 0;
	// 例: "0.3s, 0.1s" の場合、最大値をとる
	const parts = value.split(",").map(s => s.trim());
	let max = 0;
	parts.forEach(p => {
		if (p.endsWith("ms")) {
			max = Math.max(max, parseFloat(p) / 1000);
		} else if (p.endsWith("s")) {
			max = Math.max(max, parseFloat(p));
		}
	});
	return max;
}
