import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendKeyWithFocus } from "../utils/keyboard";

/**
 * Action to toggle between Trim Mode (T) and Selection Mode (A) in DaVinci Resolve
 */
@action({ UUID: "com.caio.davinci.trim-clip" })
export class TrimClip extends SingletonAction {
	private isTrimMode = false; // Start in Selection Mode
	
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		// Set initial title
		await ev.action.setTitle("Selection");
	}

	/**
	 * Toggles between Trim Mode (T) and Selection Mode (A)
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			if (this.isTrimMode) {
				// Currently in Trim Mode, switch to Selection Mode
				streamDeck.logger.info("TrimClip: Switching to Selection Mode (A key)");
				await sendKeyWithFocus("a");
				
				await ev.action.setTitle("Selection!");
				this.isTrimMode = false;
				
				// Reset title after delay
				setTimeout(async () => {
					await ev.action.setTitle("Selection");
				}, 1000);
			} else {
				// Currently in Selection Mode, switch to Trim Mode
				streamDeck.logger.info("TrimClip: Switching to Trim Mode (T key)");
				await sendKeyWithFocus("t");
				
				await ev.action.setTitle("Trim!");
				this.isTrimMode = true;
				
				// Reset title after delay
				setTimeout(async () => {
					await ev.action.setTitle("Trim");
				}, 1000);
			}
			
			streamDeck.logger.info(`TrimClip: Mode toggled, now in ${this.isTrimMode ? 'Trim' : 'Selection'} mode`);
			
		} catch (error) {
			streamDeck.logger.error("Error toggling trim/selection mode:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle(this.isTrimMode ? "Trim" : "Selection");
			}, 2000);
		}
	}
} 