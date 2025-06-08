import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action for retime in DaVinci Resolve using Cmd + R
 */
@action({ UUID: "com.caio.davinci.retime" })
export class Retime extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Cmd + R to open retime controls
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("Retime: Sending Cmd + R");
			
			// Send Cmd + R for retime
			await sendCommandKey("r");
			
			streamDeck.logger.info("Retime: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error opening retime controls:", error);
		}
	}
} 