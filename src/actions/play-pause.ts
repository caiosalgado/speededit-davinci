import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to play/pause in DaVinci Resolve using Space key
 */
@action({ UUID: "com.caio.davinci.play-pause" })
export class PlayPause extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Space key to play/pause
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("PlayPause: Sending Space key");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send Space key using key code 49
			await execAsync(`osascript -e 'tell application "System Events" to key code 49'`);
			
			streamDeck.logger.info("PlayPause: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending play pause:", error);
		}
	}
} 