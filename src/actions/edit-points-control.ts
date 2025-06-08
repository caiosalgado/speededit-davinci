import { action, DialDownEvent, DialRotateEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to control edit points in DaVinci Resolve
 * Click: Toggle edit mode (U key)
 * Rotate Left: Shift + , (previous edit point)
 * Rotate Right: Shift + . (next edit point)
 */
@action({ UUID: "com.caio.davinci.edit-points-control" })
export class EditPointsControl extends SingletonAction {
	private currentMode = "Both Sides";
	private readonly modes = [
		"Both Sides",
		"Left Side Only", 
		"Right Side Only"
	];

	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		if (ev.action.isDial()) {
			await ev.action.setFeedback({
				title: "Edit Points",
				value: this.currentMode
			});
		}
	}

	/**
	 * Handle dial rotation for moving between edit points
	 */
	override async onDialRotate(ev: DialRotateEvent): Promise<void> {
		if (ev.action.isDial()) {
			const ticks = ev.payload.ticks;
			const isRight = ticks > 0;
			
			try {
				// First ensure DaVinci Resolve is focused
				await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
				await new Promise(resolve => setTimeout(resolve, 100));
				
				if (isRight) {
					// Rotate right: Shift + . (next edit point) - key code 47
					streamDeck.logger.info("EditPointsControl: Moving to next edit point (Shift + . / key code 47)");
					await execAsync(`osascript -e 'tell application "System Events" to key code 47 using shift down'`);
					
					await ev.action.setFeedback({
						title: "Next Point",
						value: "→"
					});
				} else {
					// Rotate left: Shift + , (previous edit point) - key code 43
					streamDeck.logger.info("EditPointsControl: Moving to previous edit point (Shift + , / key code 43)");
					await execAsync(`osascript -e 'tell application "System Events" to key code 43 using shift down'`);
					
					await ev.action.setFeedback({
						title: "Prev Point", 
						value: "←"
					});
				}
				
				// Reset display after short delay
				setTimeout(async () => {
					await ev.action.setFeedback({
						title: "Edit Points",
						value: this.currentMode
					});
				}, 1000);
				
			} catch (error) {
				streamDeck.logger.error("Error moving between edit points:", error);
				await ev.action.setFeedback({
					title: "Error",
					value: "!"
				});
			}
		}
	}

	/**
	 * Handle dial press to toggle edit mode
	 */
	override async onDialDown(ev: DialDownEvent): Promise<void> {
		if (ev.action.isDial()) {
			try {
				streamDeck.logger.info("EditPointsControl: Toggling edit mode (U key)");
				
				// Send U key to toggle edit mode
				await sendKeyWithFocus("u");
				
				// Cycle through modes for display feedback
				const currentIndex = this.modes.indexOf(this.currentMode);
				const nextIndex = (currentIndex + 1) % this.modes.length;
				this.currentMode = this.modes[nextIndex];
				
				await ev.action.setFeedback({
					title: "Mode Toggle",
					value: this.currentMode
				});
				
				streamDeck.logger.info(`EditPointsControl: Mode changed to ${this.currentMode}`);
				
				// Reset display after delay
				setTimeout(async () => {
					await ev.action.setFeedback({
						title: "Edit Points",
						value: this.currentMode
					});
				}, 2000);
				
			} catch (error) {
				streamDeck.logger.error("Error toggling edit mode:", error);
				await ev.action.setFeedback({
					title: "Error",
					value: "!"
				});
			}
		}
	}
} 