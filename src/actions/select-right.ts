import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyCommand } from "../utils/keyboard";

/**
 * Action for select right in DaVinci Resolve using Option + Y
 */
@action({ UUID: "com.caio.davinci.select-right" })
export class SelectRight extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Option + Y to extend selection to the right
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("SelectRight: Sending Option + Y");
			
			// Send Option + Y for extending selection right
			await sendKeyCommand("y", ["option"]);
			
			streamDeck.logger.info("SelectRight: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending select right command:", error);
		}
	}
} 