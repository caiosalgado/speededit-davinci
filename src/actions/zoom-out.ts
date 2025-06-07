import { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action to zoom out in DaVinci Resolve using Command + - shortcut
 */
@action({ UUID: "com.caio.davinci.zoom-out" })
export class ZoomOut extends SingletonAction {
	/**
	 * Sends Command + - when the action is pressed to zoom out in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("ZoomOut: Attempting to send Cmd + - using key code 27");
			
			// Send Command + - to DaVinci Resolve (now uses key code 27 for hyphen)
			await sendCommandKey("-");
			
			streamDeck.logger.info("ZoomOut: Command sent successfully");
			
			// Visual feedback
			await ev.action.setTitle("Zoom -");
			
			// Reset title after a short delay
			setTimeout(async () => {
				await ev.action.setTitle("Zoom Out");
			}, 1000);
		} catch (error) {
			streamDeck.logger.error("Error sending zoom out command:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle("Zoom Out");
			}, 2000);
		}
	}
} 