@import "shared.js"

// Handlers

// on Selection
var toggleGridOnSelection = function(context) {
    var selection = context.selection
    var isLayout = false
    toggle(selection, isLayout)
}

var toggleLayoutOnSelection = function(context) {
    var selection = context.selection
    var isLayout = true
    toggle(selection, isLayout)
}

// on All
var toggleGridOnAllArtboards = function(context) {
    var artboards = context.document.artboards()
    var isLayout = false
    toggle(artboards, isLayout)
}

var toggleLayoutOnAllArtboards = function(context) {
    var artboards = context.document.artboards()
    var isLayout = true
    toggle(artboards, isLayout)
}

// Functions

function toggle(layers, isLayout) {
    
    // Check that any layers given
    if (!layers.count) {
        document.showMessage("No layers selected")
        return
    }
    
    var newValue
    
    var loop = layers.objectEnumerator()
    while (item = loop.nextObject()) {
        
        // If selected layer neither artboard nor artboard child, skip
        if (artboardOf(item)) {
            item = artboardOf(item)
        } else {
            continue
        }
        
        // Access item grid or layout objects if assigned
        var target = targetOf(item, isLayout)
        
        // Use grid visiblity value of first given aartboard to create an initial value
        if (newValue == nil) {
            // If target loaded already, inverse value. Otherwise set true because target newer been presented before.
            newValue = target ? !target.isEnabled() : true
        }
        
        // Check if artboard have grid or layout and applying a default one if not
        if (!target) {
            isLayout ? item.layout = MSDefaultLayoutGrid.defaultLayout() : item.grid = MSDefaultGrid.defaultGrid()
        }

        target.setIsEnabled(newValue)
    }
}
