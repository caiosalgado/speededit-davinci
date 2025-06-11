import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to play reverse in DaVinci Resolve using J key
 */
@action({ UUID: "com.caio.davinci.play-reverse" })
export class PlayReverse extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends J key to play reverse (press multiple times for speed)
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("PlayReverse: Sending J key");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send J key
			await execAsync(`osascript -e 'tell application "System Events" to keystroke "j"'`);
			
			streamDeck.logger.info("PlayReverse: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending play reverse:", error);
		}
	}
} 