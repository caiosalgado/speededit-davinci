import { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action to cut clip in DaVinci Resolve using Command + B shortcut
 */
@action({ UUID: "com.caio.davinci.cut-clip" })
export class CutClip extends SingletonAction {
	/**
	 * Sends Command + B when the action is pressed to cut clip in DaVinci Resolve
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			// Send Command + B to DaVinci Resolve
			await sendCommandKey("b");
			
			// Visual feedback
			await ev.action.setTitle("Cut!");
			
			// Reset title after a short delay
			setTimeout(async () => {
				await ev.action.setTitle("Cut Clip");
			}, 1000);
		} catch (error) {
			console.error("Error sending cut clip command:", error);
			await ev.action.setTitle("Error!");
			setTimeout(async () => {
				await ev.action.setTitle("Cut Clip");
			}, 2000);
		}
	}
} 