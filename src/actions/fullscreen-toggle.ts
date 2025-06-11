import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Action to toggle fullscreen in DaVinci Resolve using Cmd + F
 */
@action({ UUID: "com.caio.davinci.fullscreen-toggle" })
export class FullscreenToggle extends SingletonAction {
	/**
	 * Clear title when action appears to prevent text overlay on icon
	 */
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setTitle("");
	}

	/**
	 * Sends Cmd + F to toggle fullscreen
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			streamDeck.logger.info("FullscreenToggle: Sending Cmd + F");
			
			// Focus DaVinci Resolve
			await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Send Cmd + F
			await execAsync(`osascript -e 'tell application "System Events" to keystroke "f" using command down'`);
			
			streamDeck.logger.info("FullscreenToggle: Command sent successfully");
		} catch (error) {
			streamDeck.logger.error("Error sending fullscreen toggle:", error);
		}
	}
} 