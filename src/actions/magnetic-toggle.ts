import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";

/**
 * Action for magnetic timeline toggle in DaVinci Resolve using N key
 */
@action({ UUID: "com.caio.davinci.magnetic-toggle" })
export class MagneticToggle extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends N key to toggle magnetic timeline
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("MagneticToggle: Sending N key");
			
			// Send N key to toggle magnetic timeline
			await sendKeyWithFocus("n");
			
			streamDeck.logger.info("MagneticToggle: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error toggling magnetic timeline:", error);
		}
	}
} 