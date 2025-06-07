import { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action to zoom in in DaVinci Resolve using Command + = shortcut
 */
@action({ UUID: "com.caio.davinci.zoom-in" })
export class ZoomIn extends SingletonAction {
	/**
	 * Sends Command + = when the action is pressed to zoom in in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("ZoomIn: Attempting to send Cmd + = using key code 24");
			
			// Send Command + = to DaVinci Resolve (uses key code 24 for equal/plus)
			await sendCommandKey("=");
			
			streamDeck.logger.info("ZoomIn: Command sent successfully");
			
			// Visual feedback
			await ev.action.setTitle("Zoom +");
			
			// Reset title after a short delay
			setTimeout(async () => {
				await ev.action.setTitle("Zoom In");
			}, 1000);
		} catch (error) {
			streamDeck.logger.error("Error sending zoom in command:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle("Zoom In");
			}, 2000);
		}
	}
} 