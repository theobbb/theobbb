const players = new Map();

let raf_id: number | null = null;

function loop(time: number) {
	if (players.size === 0) {
		raf_id = null; // Stop loop
		return;
	}

	players.forEach((player, key) => {
		const frameInterval = 1000 / player.fps;
		if (time - player.lastFrameTime >= frameInterval) {
			player.current_frame = (player.current_frame + 1) % player.frame_count;

			player.ref.frame = player.current_frame;
			player.lastFrameTime = time;

			if (!player.looping && player.current_frame == player.frame_count - 1) {
				stop_sprite(key);
				return;
			}
		}
	});

	raf_id = requestAnimationFrame(loop);
}

export function play_sprite(ref, { key, fps, frame_count, looping }) {
	console.log('play sprite');
	const new_player = {
		ref,
		looping,
		fps,
		frame_count,
		current_frame: 0,
		lastFrameTime: performance.now()
	};
	players.set(key, new_player);

	if (!raf_id) {
		raf_id = requestAnimationFrame(loop);
	}
}
export function stop_sprite(key: string) {
	players.delete(key);
}
