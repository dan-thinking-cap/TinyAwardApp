#1. Make sure to add a local.properties file in the android folder with this line: sdk.dir=C:/Users/<UserName>/AppData/Local/Android/Sdk

#2. Make sure to replace the requestFrame method in node_modules\@azesmway\react-native-unity\android\src\main\java\com\azesmwayreactnativeunity\UPlayer.java with the following if using Unity 2023 and up:
    public FrameLayout requestFrame() {
        try {
            // Attempt to invoke getFrameLayout() for the newer UnityPlayer class
            Method getFrameLayout = unityPlayer.getClass().getMethod("getFrameLayout");
            return (FrameLayout) getFrameLayout.invoke(unityPlayer);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            // If it is old UnityPlayer, use isInstance() and cast() to bypass incompatible
            // type checks when compiling using newer versions of UnityPlayer
            if (FrameLayout.class.isInstance(unityPlayer)) {
                return FrameLayout.class.cast(unityPlayer);
            } else {
                return null;
            }
        }
    }