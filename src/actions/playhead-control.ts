import { action, DialRotateEvent, DialDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Action for playhead control using dial rotation and press in DaVinci Resolve
 * Rotate: Move playhead left/right (arrow keys)
 * Press: Toggle between normal and fast mode (with shift)
 */
@action({ UUID: "com.caio.davinci.playhead-control" })
export class PlayheadControl extends SingletonAction {
	private isFastMode = false; // Initial state: normal mode

	/**
	 * Set initial feedback when action appears
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		if (ev.action.isDial()) {
			const mode = this.isFastMode ? "Fast" : "Normal";
			return ev.action.setFeedback({
				title: "Playhead",
				value: mode
			});
		}
	}

	/**
	 * Toggle between normal and fast mode when dial is pressed
	 */
	override async onDialDown(ev: DialDownEvent): Promise<void> {
		if (ev.action.isDial()) {
			try {
				this.isFastMode = !this.isFastMode;
				const mode = this.isFastMode ? "Fast" : "Normal";
				
				streamDeck.logger.info(`PlayheadControl: Mode toggled to ${mode}`);
				
				// Visual feedback
				await ev.action.setFeedback({
					title: "Playhead",
					value: mode
				});
			} catch (error) {
				streamDeck.logger.error("Error toggling playhead mode:", error);
				if (ev.action.isDial()) {
					await ev.action.setFeedback({
						title: "Error",
						value: "!"
					});
				}
			}
		}
	}

	/**
	 * Move playhead left/right based on dial rotation
	 * ticks > 0 = move right (arrow right)
	 * ticks < 0 = move left (arrow left)
	 * Fast mode = add shift modifier
	 */
	override async onDialRotate(ev: DialRotateEvent): Promise<void> {
		if (ev.action.isDial()) {
			try {
				const ticks = ev.payload.ticks;
				const isRight = ticks > 0;
				const direction = isRight ? "right" : "left";
				const keyCode = isRight ? 124 : 123; // 124: right arrow, 123: left arrow
				const modifier = this.isFastMode ? "using shift down" : "";
				const mode = this.isFastMode ? "Fast" : "Normal";

				streamDeck.logger.info(`PlayheadControl: Move ${direction} (${mode} mode) - key code ${keyCode}`);

				// Focus DaVinci Resolve first
				await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
				await new Promise(resolve => setTimeout(resolve, 100));

				// Send arrow key command
				const script = `tell application "System Events" to key code ${keyCode} ${modifier}`;
				await execAsync(`osascript -e '${script}'`);

				// Visual feedback
				const arrow = isRight ? "→" : "←";
				await ev.action.setFeedback({
					title: `Move ${direction}`,
					value: `${arrow} ${mode}`
				});

				// Reset feedback after delay
				setTimeout(async () => {
					if (ev.action.isDial()) {
						const currentMode = this.isFastMode ? "Fast" : "Normal";
						await ev.action.setFeedback({
							title: "Playhead",
							value: currentMode
						});
					}
				}, 800);

			} catch (error) {
				streamDeck.logger.error("Error moving playhead:", error);
				if (ev.action.isDial()) {
					await ev.action.setFeedback({
						title: "Error",
						value: "!"
					});
				}
			}
		}
	}
} 