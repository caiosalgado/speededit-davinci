import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action to cut clip in DaVinci Resolve using Command + B shortcut
 */
@action({ UUID: "com.caio.davinci.cut-clip" })
export class CutClip extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Command + B when the action is pressed to cut clip in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			// Send Command + B to DaVinci Resolve
			await sendCommandKey("b");
			
			// Visual feedback removed - just use the icon
		} catch (error) {
			console.error("Error sending cut clip command:", error);
		}
	}
} 