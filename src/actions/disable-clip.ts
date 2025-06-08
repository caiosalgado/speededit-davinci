import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";

/**
 * Action to disable clip in DaVinci Resolve using D shortcut
 */
@action({ UUID: "com.caio.davinci.disable-clip" })
export class DisableClip extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends D when the action is pressed to disable clip in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("DisableClip: Sending D key (without modifiers)");
			
			// Send D to DaVinci Resolve (without Command modifier)
			await sendKeyWithFocus("d");
			
			streamDeck.logger.info("DisableClip: Key sent successfully");
			
			// Visual feedback removed - just use the icon
		} catch (error) {
			streamDeck.logger.error("Error sending disable clip command:", error);
		}
	}
} 