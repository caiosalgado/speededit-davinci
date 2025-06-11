import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to ripple delete in DaVinci Resolve using Shift + Delete
 */
@action({ UUID: "com.caio.davinci.ripple-delete" })
export class RippleDelete extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Shift + Delete to ripple delete selected clip
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("RippleDelete: Sending Shift + Delete");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send Shift + Delete using key code 51 with shift modifier
			await execAsync(`osascript -e 'tell application "System Events" to key code 51 using shift down'`);
			
			streamDeck.logger.info("RippleDelete: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending ripple delete:", error);
		}
	}
} 