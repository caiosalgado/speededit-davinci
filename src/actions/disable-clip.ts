import { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";

/**
 * Action to disable clip in DaVinci Resolve using D shortcut
 */
@action({ UUID: "com.caio.davinci.disable-clip" })
export class DisableClip extends SingletonAction {
	/**
	 * Sends D when the action is pressed to disable clip in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("DisableClip: Sending D key (without modifiers)");
			
			// Send D to DaVinci Resolve (without Command modifier)
			await sendKeyWithFocus("d");
			
			streamDeck.logger.info("DisableClip: Key sent successfully");
			
			// Visual feedback
			await ev.action.setTitle("Disabled!");
			
			// Reset title after a short delay
			setTimeout(async () => {
				await ev.action.setTitle("Disable");
			}, 1000);
		} catch (error) {
			streamDeck.logger.error("Error sending disable clip command:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle("Disable");
			}, 2000);
		}
	}
} 