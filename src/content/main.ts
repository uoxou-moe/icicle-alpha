import { categorize } from "../logic/categorize";

console.log('[CRXJS] Hello world from content script!')

Array.from(document.getElementsByTagName("button")).forEach(element => {
	console.log('Button categorized:', `${element.id}`, categorize(getComputedStyle(element)));

	element.addEventListener('click', () => {
		const category = categorize(getComputedStyle(element));
		playSound(category);
	});
});

function playSound(category: string) {
	switch (category) {
		case "Snappy": {
			const ctx = new AudioContext();

			// ホワイトノイズバッファ作成
			const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
			const data = buffer.getChannelData(0);
			for (let i = 0; i < data.length; i++) {
				data[i] = (Math.random() * 2 - 1) * Math.exp(-50 * i / data.length);
			}

			const noise = ctx.createBufferSource();
			noise.buffer = buffer;

			// ローパスフィルターで「くぐもり」感
			const filter = ctx.createBiquadFilter();
			filter.type = 'lowpass';
			filter.frequency.value = 800;

			// 音量調整
			const gain = ctx.createGain();
			gain.gain.value = 1;

			// 接続と再生
			noise.connect(filter).connect(gain).connect(ctx.destination);
			noise.start();
			break;
		}
		case "Flat": {
			const ctx = new AudioContext();
			const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
			const data = buffer.getChannelData(0);

			// ランダムノイズにディケイをかける（石を叩いたような音）
			for (let i = 0; i < data.length; i++) {
				data[i] = (Math.random() * 2 - 1) * Math.exp(-30 * i / data.length);
			}

			const noise = ctx.createBufferSource();
			noise.buffer = buffer;

			const filter = ctx.createBiquadFilter();
			filter.type = 'lowpass';
			filter.frequency.value = 400; // くぐもった音にする

			const gain = ctx.createGain();
			gain.gain.value = 1;

			noise.connect(filter).connect(gain).connect(ctx.destination);
			noise.start();
			break;
		}
		case "Smooth-fade": {
			const ctx = new AudioContext();
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sine';
			osc.frequency.setValueAtTime(240, ctx.currentTime); // 低音で柔らかく

			gain.gain.setValueAtTime(0.3, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); // ゆっくり減衰

			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + 0.8);
			break;
		}

		default: {

		}
	}
}
