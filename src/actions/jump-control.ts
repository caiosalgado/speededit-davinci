import { action, DialDownEvent, DialRotateEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to control jump navigation in DaVinci Resolve
 * Rotate Left: Up Arrow (jump up)
 * Rotate Right: Down Arrow (jump down)
 */
@action({ UUID: "com.caio.davinci.jump-control" })
export class JumpControl extends SingletonAction {

	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		if (ev.action.isDial()) {
			await ev.action.setFeedback({
				title: "Jump",
				value: "↕"
			});
		}
	}

	/**
	 * Handle dial rotation for jump navigation
	 */
	override async onDialRotate(ev: DialRotateEvent): Promise<void> {
		if (ev.action.isDial()) {
			const ticks = ev.payload.ticks;
			const isDown = ticks > 0; // Right rotation = Down
			
			try {
				// First ensure DaVinci Resolve is focused
				await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
				await new Promise(resolve => setTimeout(resolve, 100));
				
				if (isDown) {
					// Rotate right: Down Arrow (key code 125)
					streamDeck.logger.info("JumpControl: Jump down (Down Arrow / key code 125)");
					await execAsync(`osascript -e 'tell application "System Events" to key code 125'`);
					
					await ev.action.setFeedback({
						title: "Jump Down",
						value: "↓"
					});
				} else {
					// Rotate left: Up Arrow (key code 126)
					streamDeck.logger.info("JumpControl: Jump up (Up Arrow / key code 126)");
					await execAsync(`osascript -e 'tell application "System Events" to key code 126'`);
					
					await ev.action.setFeedback({
						title: "Jump Up", 
						value: "↑"
					});
				}
				
				// Reset display after short delay
				setTimeout(async () => {
					await ev.action.setFeedback({
						title: "Jump",
						value: "↕"
					});
				}, 1000);
				
			} catch (error) {
				streamDeck.logger.error("Error in jump navigation:", error);
				await ev.action.setFeedback({
					title: "Error",
					value: "!"
				});
			}
		}
	}

	/**
	 * Handle dial press to enter V mode
	 */
	override async onDialDown(ev: DialDownEvent): Promise<void> {
		if (ev.action.isDial()) {
			try {
				streamDeck.logger.info("JumpControl: Entering V mode (V key)");
				
				// Send V key to DaVinci Resolve
				await sendKeyWithFocus("v");
				
				await ev.action.setFeedback({
					title: "V Mode",
					value: "V"
				});
				
				streamDeck.logger.info("JumpControl: V mode activated");
				
				// Reset display after delay
				setTimeout(async () => {
					await ev.action.setFeedback({
						title: "Jump",
						value: "↕"
					});
				}, 2000);
				
			} catch (error) {
				streamDeck.logger.error("Error entering V mode:", error);
				await ev.action.setFeedback({
					title: "Error",
					value: "!"
				});
			}
		}
	}
} 