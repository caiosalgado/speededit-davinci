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
import { FullscreenToggle } from "./actions/fullscreen-toggle";
import { PlayReverse } from "./actions/play-reverse";
import { PlayForward } from "./actions/play-forward";
import { PlayPause } from "./actions/play-pause";
import { DeleteClip } from "./actions/delete-clip";
import { RippleDelete } from "./actions/ripple-delete";


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
streamDeck.actions.registerAction(new FullscreenToggle());
streamDeck.actions.registerAction(new PlayReverse());
streamDeck.actions.registerAction(new PlayForward());
streamDeck.actions.registerAction(new PlayPause());
streamDeck.actions.registerAction(new DeleteClip());
streamDeck.actions.registerAction(new RippleDelete());


// Finally, connect to the Stream Deck.
streamDeck.connect();
