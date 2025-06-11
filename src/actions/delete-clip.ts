import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to delete clip in DaVinci Resolve using Delete key
 */
@action({ UUID: "com.caio.davinci.delete-clip" })
export class DeleteClip extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Delete key to delete selected clip
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("DeleteClip: Sending Delete key");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send Delete key using key code 51
			await execAsync(`osascript -e 'tell application "System Events" to key code 51'`);
			
			streamDeck.logger.info("DeleteClip: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending delete clip:", error);
		}
	}
} 