# 🖼️ Image Structure for DaVinci Resolve Stream Deck Plugin

## 📁 Directory Structure

```
imgs/actions/
├── buttons/                    # Button (Keypad) images
│   ├── cut-clip/
│   │   ├── icon.png           # Plugin icon (28x28)
│   │   └── key.png            # Button image (72x72)
│   ├── disable-clip/
│   │   ├── icon.png
│   │   └── key.png
│   ├── trim-selection-toggle/
│   │   ├── icon.png
│   │   └── key.png
│   ├── zoom-out/
│   │   ├── icon.png
│   │   └── key.png
│   └── zoom-in/
│       ├── icon.png
│       └── key.png
│
└── dials/                      # Dial (Encoder) images
    ├── zoom-control/
    │   ├── icon.png           # Plugin icon (28x28)
    │   └── key.png            # Dial image (200x200)
    ├── playhead-control/
    │   ├── icon.png
    │   └── key.png
    ├── edit-points-control/
    │   ├── icon.png
    │   └── key.png
    └── jump-control/
        ├── icon.png
        └── key.png
```

## 🎨 Image Specifications

### **Button Images (Keypad)**
- **icon.png**: 28x28 pixels (Plugin list icon)
- **key.png**: 72x72 pixels (Button display)
- **Format**: PNG with transparency
- **Style**: Clear, simple icons that represent the function

### **Dial Images (Encoder)**
- **icon.png**: 28x28 pixels (Plugin list icon)
- **key.png**: 200x200 pixels (Dial background)
- **Format**: PNG with transparency
- **Style**: Circular or round-friendly designs

## 🎯 Design Guidelines

### **Color Scheme**
- Use DaVinci Resolve's color palette
- Dark backgrounds work best
- High contrast for visibility
- Consider the Stream Deck's button backlighting

### **Icon Suggestions**

#### **Buttons**
- **Cut Clip**: Scissors or blade icon
- **Disable Clip**: Eye with slash or disabled symbol
- **Trim/Selection**: Toggle switch or T/A letters
- **Zoom Out**: Magnifying glass with minus
- **Zoom In**: Magnifying glass with plus

#### **Dials**
- **Zoom Control**: Magnifying glass with rotation arrows
- **Playhead Control**: Play head with left/right arrows
- **Edit Points Control**: Timeline with edit points marked
- **Jump Control**: Up/down arrows with V symbol

## 📝 Notes

1. **Current State**: All actions currently use placeholder images from `counter/`
2. **Transparency**: Use PNG format for clean backgrounds
3. **Scalability**: Design should be clear at small sizes
4. **Consistency**: Maintain visual consistency across all controls
5. **Testing**: Test images on actual Stream Deck hardware for best results

## 🔄 Updating Images

After adding new images, the manifest.json paths should be updated from:
```json
"Icon": "imgs/actions/counter/icon"
"Image": "imgs/actions/counter/key"
```

To:
```json
"Icon": "imgs/actions/buttons/cut-clip/icon"
"Image": "imgs/actions/buttons/cut-clip/key"
``` 