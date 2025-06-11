import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to play forward in DaVinci Resolve using L key
 */
@action({ UUID: "com.caio.davinci.play-forward" })
export class PlayForward extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends L key to play forward (press multiple times for speed)
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("PlayForward: Sending L key");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send L key
			await execAsync(`osascript -e 'tell application "System Events" to keystroke "l"'`);
			
			streamDeck.logger.info("PlayForward: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending play forward:", error);
		}
	}
} 