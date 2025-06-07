import { exec } from 'child_process';
import { promisify } from 'util';
import streamDeck from "@elgato/streamdeck";

const execAsync = promisify(exec);

/**
 * Send a key combination using AppleScript (macOS only)
 */
export async function sendKeyCommand(key: string, modifiers: string[] = []): Promise<void> {
    try {
        let modifierString = '';
        
        // Handle modifier keys (can be combined)
        const modKeys = [];
        if (modifiers.includes('command') || modifiers.includes('cmd')) {
            modKeys.push('command down');
        }
        if (modifiers.includes('shift')) {
            modKeys.push('shift down');
        }
        if (modifiers.includes('ctrl') || modifiers.includes('control')) {
            modKeys.push('control down');
        }
        if (modifiers.includes('alt') || modifiers.includes('option')) {
            modKeys.push('option down');
        }
        modifierString = modKeys.join(', ');
        
        // Create AppleScript command
        const script = `tell application "System Events" to keystroke "${key}" using {${modifierString}}`;
        
        // Execute the command
        await execAsync(`osascript -e '${script}'`);
        
    } catch (error) {
        streamDeck.logger.error('Error sending key command:', error);
        throw error;
    }
}

/**
 * Send a simple key press using AppleScript
 */
export async function sendKey(key: string): Promise<void> {
    try {
        const script = `tell application "System Events" to keystroke "${key}"`;
        await execAsync(`osascript -e '${script}'`);
    } catch (error) {
        streamDeck.logger.error('Error sending key:', error);
        throw error;
    }
}

/**
 * Send key combination with Command modifier
 */
export async function sendCommandKey(key: string): Promise<void> {
    try {
        // First ensure DaVinci Resolve is focused
        await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
        
        let script = '';
        
        // Check for special keys that need key codes for better compatibility
        if (key === '-') {
            // Use key code for hyphen/minus (more reliable across keyboard layouts)
            script = `tell application "System Events" to key code 27 using command down`;
        } else if (key === '=') {
            // Use key code for equal/plus (more reliable across keyboard layouts)
            script = `tell application "System Events" to key code 24 using command down`;
        } else {
            // Use keystroke for other keys
            script = `tell application "System Events" to keystroke "${key}" using command down`;
        }
        
        streamDeck.logger.info(`Executing AppleScript: ${script}`);
        await execAsync(`osascript -e '${script}'`);
    } catch (error) {
        streamDeck.logger.error('Error sending command key:', error);
        throw error;
    }
}

/**
 * Send zoom out command with alternative approaches
 */
export async function sendZoomOutCommand(): Promise<void> {
    try {
        // First ensure DaVinci Resolve is focused
        await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try different approaches for minus key
        const alternatives = [
            'tell application "System Events" to key code 27 using command down', // Key code for minus (most reliable)
            'tell application "System Events" to keystroke "-" using command down',
            'tell application "System Events" to keystroke (ASCII character 45) using command down' // ASCII for minus
        ];
        
        streamDeck.logger.info('Trying zoom out alternatives...');
        
        for (const script of alternatives) {
            try {
                streamDeck.logger.info(`Trying: ${script}`);
                await execAsync(`osascript -e '${script}'`);
                streamDeck.logger.info('Success with:', script);
                return; // Exit on first success
            } catch (err) {
                streamDeck.logger.warn(`Failed with ${script}:`, err);
                continue;
            }
        }
        
        throw new Error('All zoom out alternatives failed');
        
    } catch (error) {
        streamDeck.logger.error('Error sending zoom out command:', error);
        throw error;
    }
}

/**
 * Send key with explicit application focus
 */
export async function sendKeyWithFocus(key: string): Promise<void> {
    try {
        // Ensure DaVinci Resolve is focused
        await execAsync(`osascript -e 'tell application "DaVinci Resolve" to activate'`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
        
        const script = `tell application "System Events" to keystroke "${key}"`;
        await execAsync(`osascript -e '${script}'`);
    } catch (error) {
        streamDeck.logger.error('Error sending key with focus:', error);
        throw error;
    }
} 