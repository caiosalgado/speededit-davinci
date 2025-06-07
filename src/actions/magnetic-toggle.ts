import { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKey } from "../utils/keyboard";

/**
 * Action to toggle magnetic on/off in DaVinci Resolve
 */
@action({ UUID: "com.caio.davinci.magnetic-toggle" })
export class MagneticToggle extends SingletonAction {
	/**
	 * Toggles magnetic on/off when pressed
	 * Note: You may need to map this to a specific key in DaVinci Resolve preferences
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			// Send a key to toggle magnetic (you may need to configure this in DaVinci)
			// This is typically mapped to 'N' key in DaVinci Resolve
			await sendKey("n");
			
			// Visual feedback
			await ev.action.setTitle("Magnetic!");
			
			// Reset title after a short delay
			setTimeout(async () => {
				await ev.action.setTitle("Magnetic");
			}, 1000);
		} catch (error) {
			console.error("Error sending magnetic toggle command:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle("Magnetic");
			}, 2000);
		}
	}
} 