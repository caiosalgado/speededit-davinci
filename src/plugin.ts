import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";
import { CutClip } from "./actions/cut-clip";
import { MagneticToggle } from "./actions/magnetic-toggle";
import { ZoomControl } from "./actions/zoom-control";
import { ZoomOut } from "./actions/zoom-out";
import { ZoomIn } from "./actions/zoom-in";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register all DaVinci Resolve actions
streamDeck.actions.registerAction(new IncrementCounter());
streamDeck.actions.registerAction(new CutClip());
streamDeck.actions.registerAction(new MagneticToggle());
streamDeck.actions.registerAction(new ZoomControl());
streamDeck.actions.registerAction(new ZoomOut());
streamDeck.actions.registerAction(new ZoomIn());

// Finally, connect to the Stream Deck.
streamDeck.connect();
