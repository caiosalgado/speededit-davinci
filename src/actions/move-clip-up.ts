import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';
import { sendKeyCommand } from "../utils/keyboard";

const execAsync = promisify(exec);

/**
 * Action to move clip up in timeline using Option + Up Arrow
 */
@action({ UUID: "com.caio.davinci.move-clip-up" })
export class MoveClipUp extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Option + Up Arrow to move selected clip to track above
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("MoveClipUp: Sending Option + Up Arrow");
			
			// Send Option + Up Arrow to move clip up (using key code 126 for up arrow)
			await sendKeyCommand(String.fromCharCode(126), ["option"]);
			
			streamDeck.logger.info("MoveClipUp: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error moving clip up:", error);
		}
	}
} 