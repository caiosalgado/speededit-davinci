import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyCommand } from "../utils/keyboard";

/**
 * Action for select left in DaVinci Resolve using Option + Cmd + Y
 */
@action({ UUID: "com.caio.davinci.select-left" })
export class SelectLeft extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Option + Cmd + Y to extend selection to the left
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("SelectLeft: Sending Option + Cmd + Y");
			
			// Send Option + Cmd + Y for extending selection left
			await sendKeyCommand("y", ["option", "command"]);
			
			streamDeck.logger.info("SelectLeft: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending select left command:", error);
		}
	}
} 