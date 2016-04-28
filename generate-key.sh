rm fleetany.keystore
keytool -genkey -v -keystore fleetany.keystore -alias fleetany-key -keyalg RSA -keysize 2048 -validity 10000