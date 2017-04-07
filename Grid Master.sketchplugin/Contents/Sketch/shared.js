// Check if selected layer is an artboard
function artboardOf(layer) {
    if (layer.isMemberOfClass(MSArtboardGroup)) {
        return layer
    } else {
        return layer.parentArtboard()
    }
}

// Returns grid or layout objects for target artboard if assigned
function targetOf(artboard, isLayout) {
    return isLayout ? artboard.layout() : artboard.grid()
}
