rm fleetany-mobile.apk
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore fleetany.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk fleetany-key
~/Library/Android/sdk/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk fleetany-mobile.apk