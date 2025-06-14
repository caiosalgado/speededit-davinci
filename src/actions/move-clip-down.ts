import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to move clip down in timeline using Option + Down Arrow
 */
@action({ UUID: "com.caio.davinci.move-clip-down" })
export class MoveClipDown extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Option + Down Arrow to move selected clip to track below
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("MoveClipDown: Sending Option + Down Arrow");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send Option + Down Arrow using key code 125 for down arrow
			await execAsync(`osascript -e 'tell application "System Events" to key code 125 using option down'`);
			
			streamDeck.logger.info("MoveClipDown: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error moving clip down:", error);
		}
	}
} 