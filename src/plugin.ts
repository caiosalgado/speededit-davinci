import streamDeck, { LogLevel } from "@elgato/streamdeck";


import { CutClip } from "./actions/cut-clip";
import { MagneticToggle } from "./actions/magnetic-toggle";
import { ZoomControl } from "./actions/zoom-control";

import { PlayheadControl } from "./actions/playhead-control";
import { DisableClip } from "./actions/disable-clip";
import { EditPointsControl } from "./actions/edit-points-control";
import { TrimClip } from "./actions/trim-clip";
import { JumpControl } from "./actions/jump-control";
import { MoveClipUp } from "./actions/move-clip-up";
import { MoveClipDown } from "./actions/move-clip-down";
import { SelectRight } from "./actions/select-right";
import { SelectLeft } from "./actions/select-left";
import { CutDeleteRight } from "./actions/cut-delete-right";
import { CutDeleteLeft } from "./actions/cut-delete-left";


// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register all DaVinci Resolve actions
streamDeck.actions.registerAction(new CutClip());
streamDeck.actions.registerAction(new MagneticToggle());
streamDeck.actions.registerAction(new ZoomControl());

streamDeck.actions.registerAction(new PlayheadControl());
streamDeck.actions.registerAction(new DisableClip());
streamDeck.actions.registerAction(new EditPointsControl());
streamDeck.actions.registerAction(new TrimClip());
streamDeck.actions.registerAction(new JumpControl());
streamDeck.actions.registerAction(new MoveClipUp());
streamDeck.actions.registerAction(new MoveClipDown());
streamDeck.actions.registerAction(new SelectRight());
streamDeck.actions.registerAction(new SelectLeft());
streamDeck.actions.registerAction(new CutDeleteRight());
streamDeck.actions.registerAction(new CutDeleteLeft());


// Finally, connect to the Stream Deck.
streamDeck.connect();
