import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';
import { sendKeyCommand } from "../utils/keyboard";

const execAsync = promisify(exec);

/**
 * Action to cut and delete left side of timeline using Cmd + Shift + [
 */
@action({ UUID: "com.caio.davinci.cut-delete-left" })
export class CutDeleteLeft extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Cmd + Shift + [ to cut and delete everything to the left of playhead
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("CutDeleteLeft: Sending Cmd + Shift + [");
			
			// Send Cmd + Shift + [ to cut and delete left (using key code 33 for left bracket)
			await sendKeyCommand(String.fromCharCode(33), ["command", "shift"]);
			
			streamDeck.logger.info("CutDeleteLeft: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error cutting and deleting left:", error);
		}
	}
} 