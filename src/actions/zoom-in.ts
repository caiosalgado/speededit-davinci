import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action to zoom in in DaVinci Resolve using Command + = shortcut
 */
@action({ UUID: "com.caio.davinci.zoom-in" })
export class ZoomIn extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Command + = when the action is pressed to zoom in in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("ZoomIn: Sending Cmd + = (zoom in)");
			
			// Send Command + = to DaVinci Resolve (uses key code 24 for equal/plus)
			await sendCommandKey("=");
			
			streamDeck.logger.info("ZoomIn: Command sent successfully");
			
			// Visual feedback removed - just use the icon
		} catch (error) {
			streamDeck.logger.error("Error sending zoom in command:", error);
		}
	}
} 