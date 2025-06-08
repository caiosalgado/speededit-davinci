import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";

/**
 * Action to toggle between trim and selection modes in DaVinci Resolve
 * Alternates between T (trim) and A (selection) keys
 */
@action({ UUID: "com.caio.davinci.trim-clip" })
export class TrimClip extends SingletonAction {
	private currentMode: 'trim' | 'selection' = 'selection';

	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Toggles between trim (T) and selection (A) modes
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			if (this.currentMode === 'selection') {
				// Switch to trim mode
				streamDeck.logger.info("TrimClip: Switching to trim mode (T)");
				await sendKeyWithFocus("t");
				this.currentMode = 'trim';
			} else {
				// Switch to selection mode  
				streamDeck.logger.info("TrimClip: Switching to selection mode (A)");
				await sendKeyWithFocus("a");
				this.currentMode = 'selection';
			}
			
			streamDeck.logger.info(`TrimClip: Now in ${this.currentMode} mode`);
		} catch (error) {
			streamDeck.logger.error("Error toggling trim/selection mode:", error);
		}
	}
} 