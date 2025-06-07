import { action, DialRotateEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import streamDeck from "@elgato/streamdeck";
import { sendCommandKey } from "../utils/keyboard";

/**
 * Action for zoom control using dial rotation (Cmd + / Cmd -) in DaVinci Resolve
 */
@action({ UUID: "com.caio.davinci.zoom-control" })
export class ZoomControl extends SingletonAction {
	/**
	 * Set initial feedback when action appears
	 */
	override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
		if (ev.action.isDial()) {
			return ev.action.setFeedback({
				title: "Zoom",
				value: "Ready"
			});
		}
	}

	/**
	 * Handle dial rotation for zoom in/out
	 * ticks > 0 = zoom in (Cmd + =)
	 * ticks < 0 = zoom out (Cmd + -)
	 */
	override async onDialRotate(ev: DialRotateEvent): Promise<void> {
		if (ev.action.isDial()) {
			try {
				const ticks = ev.payload.ticks;
				const isZoomIn = ticks > 0;
				
				if (isZoomIn) {
					streamDeck.logger.info(`ZoomControl: Dial rotate up (${ticks} ticks) - zoom in (key code 24)`);
					
					// Send Command + = for zoom in (uses key code 24)
					await sendCommandKey("=");
					
					// Visual feedback
					await ev.action.setFeedback({
						title: "Zoom In",
						value: "+"
					});
				} else {
					streamDeck.logger.info(`ZoomControl: Dial rotate down (${ticks} ticks) - zoom out (key code 27)`);
					
					// Send Command + - for zoom out (uses key code 27)
					await sendCommandKey("-");
					
					// Visual feedback
					await ev.action.setFeedback({
						title: "Zoom Out",
						value: "-"
					});
				}

				// Reset feedback after delay
				setTimeout(async () => {
					if (ev.action.isDial()) {
						await ev.action.setFeedback({
							title: "Zoom",
							value: "Ready"
						});
					}
				}, 800);
			} catch (error) {
				streamDeck.logger.error("Error in zoom control:", error);
				if (ev.action.isDial()) {
					await ev.action.setFeedback({
						title: "Error",
						value: "!"
					});
				}
			}
		}
	}
} 